
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    
    P4_FunkcnyTestB.STAV.Tester_ON:= TRUE;
    P4_FunkcnyTestB.OUT.HorneKontakty_ZASUN_YV185:= TRUE;
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
    OvlHornychKontaktov;
    OvlSpodnychKontaktov;
    OvlTestera;
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P4_FunkcnyTestB);
	
	
	
    //Pr�znak funk�n� test A v�chodzia poz�cia//
    IF P4_FunkcnyTestB.IN.Centrovanie_ZASUNUTE_MS28 AND P4_FunkcnyTestB.IN.HorneKontakty_ZASUNUTE_MS24 AND P4_FunkcnyTestB.IN.SpodneKontakty_ZASUNUTE_MS32 THEN
        P4_FunkcnyTestB_VychodziaPozicia:= TRUE;
    ELSE
        P4_FunkcnyTestB_VychodziaPozicia:= FALSE;
    END_IF	
	
	
    //Reset sekcie //
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        SC_P4_FunkcnyTestB.Step:= 0;
    ELSIF P4_FunkcnyTestB.Reset THEN
        SC_P4_FunkcnyTestB.Step:= 0;
        P4_FunkcnyTestB.Reset:= FALSE;
    END_IF	
	
    
    //Porucha stanice//
    IF P4_PoruchaST2 AND NOT Triger_0 THEN
        Triger_0:= TRUE;
        SC_P4_FunkcnyTestB.Step:= 0;
     END_IF   
    
    IF NOT P4_PoruchaST2 THEN
        Triger_0:= FALSE;
    END_IF 
    
    
    
    //�as testovania//
    CasTestovania.PT:= T#5M;
    CasTestovania();
    NameranyCasTestovania;
    
    
    
    CASE SC_P4_FunkcnyTestB.Step OF 
	
	
        0:
            SC_P4_FunkcnyTestB.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            SC_OvlHornychKontaktov.Step:= 0;
            SC_OvlSpodnychKontaktov.Step:= 0;
            P4_FunkcnyTestB.Automat:= FALSE;
            P4_FunkcnyTestB.KoniecCyklu:= FALSE;
            P4_FunkcnyTestB.Manual:= FALSE;
            P4_FunkcnyTestB.STAV.PoINIT:= FALSE;
            P4_FunkcnyTestB.OUT.KontaktyTestera_VYSUN_YV172:= FALSE;
            P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_VYPNI_YV188:= TRUE;
            P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_ZAPNI_YV187:= FALSE;
            P4_FunkcnyTestB.OUT.ZasunStoper_YV164:= FALSE;
            PrecitaneCisloPaletky:= '';
            FV_Test_START:= FALSE;
            FV_Test_UKONCENY:= FALSE;
            Taktime_FunkcnyTestB.CMD.START_Merania_1:= FALSE;
            Taktime_FunkcnyTestB.CMD.START_Merania_2:= FALSE;
			P4_FunkcnyTestB.STAV.PrebiehaVyvezeniePaletky:= FALSE;
			P4_FunkcnyTestB_ZATVOR:= FALSE;
			P4_FunkcnyTestB_OTVOR:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P4_FunkcnyTestB.OUT.KOM_StanicaA_StartTestovania:= FALSE;
            CasTestovania.IN:= FALSE;
            P4_FunkcnyTestB.RR_TestovanieFunkcnehoTestu:= FALSE;
            P4_FunkcnyTestB.RR_VysunKontaktyTestera:= FALSE;
            P4_FunkcnyTestB.RR_ZapniOdpruzenieKontaktov:= FALSE;
            P4_FunkcnyTestB.RR_OtvorTester:= FALSE;
            P4_FunkcnyTestB.RR_ZatvorTester:= FALSE;
            PocetOpakovaniTestu:= 0;
            OpakovanyTest:= FALSE;
            
            IF Safety.STAV.P4_ZonaBunky_AKTIVNA AND NOT P4_Pracovisko.STAV.PORUCHA AND P4_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S15 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 1;
            END_IF
	
        1:
            SC_P4_FunkcnyTestB.StepName:='1 - Cakam na spustenie vyroby';
            P4_FunkcnyTestB.KoniecCyklu:= FALSE;
            IF P4_FunkcnyTestB.Automat THEN
                SC_P4_FunkcnyTestB.Step:= 2;
            ELSIF P4_FunkcnyTestB.Manual THEN
				SC_P4_FunkcnyTestB.Step:= 700;
			ELSIF P4_FunkcnyTestB_ZATVOR THEN
				SC_P4_FunkcnyTestB.Step:= 720;
			ELSIF P4_FunkcnyTestB_OTVOR THEN
				SC_P4_FunkcnyTestB.Step:= 750;
            END_IF
			
		
            //********************************************************Inicializ�cia****************************************************************************//	
	
	
        2:
            SC_P4_FunkcnyTestB.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#2s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
									
            IF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 3;
            END_IF
	
        3:
            SC_P4_FunkcnyTestB.StepName:='3 - Inicializacia - zasunutie hornych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#2s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                HorneKontakty_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.HorneKontakty_ZASUNUTE_MS24 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 5;
            END_IF	
			
        5:
            SC_P4_FunkcnyTestB.StepName:='5 - Inicializacia - zasunutie spodnych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#2s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                SpodneKontakty_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.SpodneKontakty_ZASUNUTE_MS32 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 8;
            END_IF	
				
	
        8:
            SC_P4_FunkcnyTestB.StepName:='8 - Inicializacia - zasunutie centrovacky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#4s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.Centrovanie_ZASUNUTE_MS28 AND P4_Dopravniky.STAV.PoINIT THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 10;
            END_IF	
	
			
        10:
            SC_P4_FunkcnyTestB.StepName:='10 - Inicializacia - kontrola kontaktov funkcneho testu';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#4s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
			
            IF Linka.PAR.ZvolenyModel = '4F' AND P4_FunkcnyTestB.IN.TypSpodnychKontaktov_4F THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 13;
            ELSIF Linka.PAR.ZvolenyModel = '5F' AND P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 13;	
            ELSIF Linka.PAR.ZvolenyModel = '5H'AND P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 13; 
            ELSE
                P34_Alarmy[438]:= TRUE;
                P4_PoruchaST2:= TRUE;
            END_IF
			
			
			
			
			
        13:
            SC_P4_FunkcnyTestB.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
	
            IF P4_FunkcnyTestB.IN.PritomnostPaletky_S11 THEN
                P4_FunkcnyTestA.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 20;		 
            ELSIF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 100;
            END_IF	
		
        20:
            SC_P4_FunkcnyTestB.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
		
            IF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P4_FunkcnyTestB.IN.PrecitaneCisloPaletky_S11);
                i:= 0;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 23;
            END_IF	 
            
        23:
            SC_P4_FunkcnyTestB.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF PrecitaneCisloPaletky = '171' THEN
                i:= 1;
            ELSIF PrecitaneCisloPaletky = '164' THEN
                i:= 2;	
            ELSIF PrecitaneCisloPaletky = '181' THEN
                i:= 3;
            ELSIF PrecitaneCisloPaletky = '168' THEN
                i:= 4;
            ELSIF PrecitaneCisloPaletky = '140' THEN
                i:= 5;
            ELSIF PrecitaneCisloPaletky = '110' THEN
                i:= 6;
            ELSIF PrecitaneCisloPaletky = '156' THEN
                i:= 7;
            ELSIF PrecitaneCisloPaletky = '127' THEN
                i:= 8;
            ELSIF PrecitaneCisloPaletky = '139' THEN
                i:= 9;
            ELSIF PrecitaneCisloPaletky = '131' THEN
                i:= 10;
            ELSIF PrecitaneCisloPaletky = '178' THEN
                i:= 11;
            ELSIF PrecitaneCisloPaletky = '206' THEN
                i:= 12;
            ELSIF PrecitaneCisloPaletky = '119' THEN
                i:= 13;
            ELSIF PrecitaneCisloPaletky = '163' THEN
                i:= 14;
            ELSIF PrecitaneCisloPaletky = '128' THEN
                i:= 15;
            ELSIF PrecitaneCisloPaletky = '175' THEN
                i:= 16;
            ELSIF PrecitaneCisloPaletky = '138' THEN
                i:= 17;
            ELSE
                P34_Alarmy[429]:= TRUE;
                P4_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                PrecitaneCisloPaletky:= '';
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 30;
            END_IF	
		
        30:
            SC_P4_FunkcnyTestB.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_FT1,FT2' THEN
                IF P4_FunkcnyTestB.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 118;
                ELSE
                    P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_FT1,FT2' THEN 
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_FT1,FT2' THEN
                IF P4_FunkcnyTestB.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 105;
                ELSE
                    P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_FT1,FT2' THEN  
                Revork:= FALSE;
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            END_IF	
            
            
        33:
            SC_P4_FunkcnyTestB.StepName:='33 - Inicializacia - kontrola ukoncenia testu'; 
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.FunkcnyTest_Ukonceny THEN
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSE
                P4_FunkcnyTestB.STAV.PoINIT:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 100;
            END_IF   
            
            
            
               
            
            
            //********************************************************Automatick� re�im****************************************************************************//
	
        100:  
            SC_P4_FunkcnyTestB.StepName:='100 - Automaticky Rezim - cakam na pr�chod paletky na stoper';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF P4_FunkcnyTestB.IN.PritomnostPaletky_S11 THEN
                P4_FunkcnyTestA.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
            
            SC_P4_FunkcnyTestB.IdleTime.IN:= P4_FunkcnyTestB.IN.PritomnostPaletky_S11;
			
            IF EDGEPOS(P4_FunkcnyTestB.IN.PritomnostPaletky_S11)THEN
                IF NOT Taktime_FunkcnyTestB.CMD.START_Merania_1 THEN
                    Taktime_FunkcnyTestB.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_FunkcnyTestB.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            
            
            IF P4_FunkcnyTestB.KoniecCyklu THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 0;
            ELSIF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 101;
            END_IF
		
	
			
			
        101:
            SC_P4_FunkcnyTestB.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#500ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
		
            PrecitaneCisloPaletky:= USINT_TO_STRING(P4_FunkcnyTestB.IN.PrecitaneCisloPaletky_S11);
            i:= 0;
            SC_P4_FunkcnyTestB.ResetStep:= TRUE;
            SC_P4_FunkcnyTestB.Step:= 102;
           
	
	
        102:
            SC_P4_FunkcnyTestB.StepName:='102 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF PrecitaneCisloPaletky = '171' THEN
                i:= 1;
            ELSIF PrecitaneCisloPaletky = '164' THEN
                i:= 2;	
            ELSIF PrecitaneCisloPaletky = '181' THEN
                i:= 3;
            ELSIF PrecitaneCisloPaletky = '168' THEN
                i:= 4;
            ELSIF PrecitaneCisloPaletky = '140' THEN
                i:= 5;
            ELSIF PrecitaneCisloPaletky = '110' THEN
                i:= 6;
            ELSIF PrecitaneCisloPaletky = '156' THEN
                i:= 7;
            ELSIF PrecitaneCisloPaletky = '127' THEN
                i:= 8;
            ELSIF PrecitaneCisloPaletky = '139' THEN
                i:= 9;
            ELSIF PrecitaneCisloPaletky = '131' THEN
                i:= 10;
            ELSIF PrecitaneCisloPaletky = '178' THEN
                i:= 11;
            ELSIF PrecitaneCisloPaletky = '206' THEN
                i:= 12;
            ELSIF PrecitaneCisloPaletky = '119' THEN
                i:= 13;
            ELSIF PrecitaneCisloPaletky = '163' THEN
                i:= 14;
            ELSIF PrecitaneCisloPaletky = '128' THEN
                i:= 15;
            ELSIF PrecitaneCisloPaletky = '175' THEN
                i:= 16;
            ELSIF PrecitaneCisloPaletky = '138' THEN
                i:= 17;
            ELSE
                P34_Alarmy[429]:= TRUE;
                P4_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                PrecitaneCisloPaletky:= '';
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 103;
            END_IF	
		
		
        103:
            SC_P4_FunkcnyTestB.StepName:='103 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_FT1,FT2' THEN
                IF P4_FunkcnyTestB.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 118;
                ELSE
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 560;
                END_IF    
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_FT1,FT2' THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_FT1,FT2' THEN
                IF P4_FunkcnyTestB.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 105;
                ELSE
                    SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                    SC_P4_FunkcnyTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_FT1,FT2' THEN 
                Revork:= FALSE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND P4_FunkcnyTestB.STAV.Tester_ON THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 105;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND NOT P4_FunkcnyTestB.STAV.Tester_ON THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            END_IF		
				
		
        105:
            SC_P4_FunkcnyTestB.StepName:='105 - Automaticky Rezim - kontrola ukoncenia funkcneho testu'; 
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.FunkcnyTest_Ukonceny THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 560;
            ELSE
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 110;
            END_IF   
            
        110:
            SC_P4_FunkcnyTestB.StepName:='110 - Automaticky Rezim - cakam na prichod paletky na stanicu A a spustenie testovania'; 
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#10s;
            SC_P4_FunkcnyTestB.AlarmTime.IN:= TRUE;
            
            IF NOT P3_LeakageTestA.IN.PritomnostPaletky_S23 AND
                NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 AND
                NOT P4_FunkcnyTestA.IN.PritomnostPaletky_S10 THEN
                SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
            ELSE
                SC_P4_FunkcnyTestB.IdleTime.IN:= FALSE;
            END_IF    
            
            
            (*SC_P4_FunkcnyTestB.IdleTime.IN:= NOT P4_FunkcnyTestA.IN.PritomnostPaletky_S10;*)
            
            IF P4_FunkcnyTestB.KoniecCyklu THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF SC_P4_FunkcnyTestA.Step = 110 AND P4_FunkcnyTestA.IN.PritomnostPaletky_S10 THEN
                P4_FunkcnyTestB.OUT.KOM_StanicaA_StartTestovania:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF SC_P4_FunkcnyTestA.Step = 560 AND P4_FunkcnyTestA.IN.PritomnostPaletky_S10 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF NOT P4_FunkcnyTestA.STAV.Tester_ON THEN  
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF SC_P4_FunkcnyTestB.AlarmTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            END_IF    
				
		
        118:
            SC_P4_FunkcnyTestB.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.Centrovanie_VYSUNUTE_MS30 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 120;
            END_IF	
		
		
        120:
            SC_P4_FunkcnyTestB.StepName:='120 - Automaticky Rezim - zapnutie pruzenia vrchnych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_VYPNI_YV188:= FALSE;
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_ZAPNI_YV187:= TRUE;
                SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 123;
            END_IF	
			
			
		
        123:
            SC_P4_FunkcnyTestB.StepName:='123 - Automaticky Rezim - vysunutie hornych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                HorneKontakty_VYSUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.HorneKontakty_VYSUNUTE_MS26 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 125;
            END_IF	
		
        125:
            SC_P4_FunkcnyTestB.StepName:='125 - Automaticky Rezim - vysunutie spodnych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                SpodneKontakty_VYSUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.SpodneKontakty_VYSUNUTE_MS34 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 127;
            END_IF	
		
        127:
            SC_P4_FunkcnyTestB.StepName:='127 - Automaticky Rezim - pritlacenie kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P4_FunkcnyTestB.OUT.KontaktyTestera_VYSUN_YV172:= TRUE;
                SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P4_FunkcnyTestB.OUT.KontaktyTestera_VYSUN_YV172:= TRUE;	
                SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 130;
            END_IF
		
            IF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 130;
            END_IF
		
        130:
            SC_P4_FunkcnyTestB.StepName:='130 - Automaticky Rezim - spustenie testovania';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                FV_Test_UKONCENY:= FALSE;
                FV_Test_START:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF	
						
            IF FV_Test_START AND FV_Test_UKONCENY THEN
                FV_Test_START:= FALSE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 140;
            END_IF
			
			

		
		
        140:
            SC_P4_FunkcnyTestB.StepName:='140 - Automaticky Rezim - vyhodnotenie testovania';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF P4_FunkcnyTestB.STAV.Vysledok_FV_Testu = 'OK' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].PAR.StavPaletky:= 'OK';
                Paletka[i].VnutornyStav.FunkcnyTest_Ukonceny:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 145;
            ELSIF P4_FunkcnyTestB.STAV.Vysledok_FV_Testu = 'NG' THEN
                IF NOT Revork THEN
                    OpakovanyTest:= TRUE;
                END_IF    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 145;
            END_IF	
			
			
			
			
			
		
        145:
            SC_P4_FunkcnyTestB.StepName:='127 - Automaticky Rezim - vypnutie pritlacenie kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            P4_FunkcnyTestB.OUT.KontaktyTestera_VYSUN_YV172:= FALSE;
            SC_P4_FunkcnyTestB.ResetStep:= TRUE;
            SC_P4_FunkcnyTestB.Step:= 148;
			
		
        148:
            SC_P4_FunkcnyTestB.StepName:='148 - Automaticky Rezim - zasunutie spodnych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                SpodneKontakty_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.SpodneKontakty_ZASUNUTE_MS32 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 150;
            END_IF	
		
        150:
            SC_P4_FunkcnyTestB.StepName:='150 - Automaticky Rezim - zasunutie hornych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                HorneKontakty_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.HorneKontakty_ZASUNUTE_MS24 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 153;
            END_IF	
		
        153:
            SC_P4_FunkcnyTestB.StepName:='153 - Automaticky Rezim - vypnutie pruzenia vrchnych kontaktov';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_ZAPNI_YV187:= FALSE;
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_VYPNI_YV188:= TRUE;
                SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF SC_P4_FunkcnyTestB.IdleTime.Q THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 545;
            END_IF	
		
		
		
		
            //Odcentrovanie paletky//			
		
        545:
            SC_P4_FunkcnyTestB.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
		
            IF P4_FunkcnyTestB.IN.Centrovanie_ZASUNUTE_MS28 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 554;
            END_IF			
		
        554:
            SC_P4_FunkcnyTestB.StepName:='554 - Automaticky Rezim - kontrola poctu testovani';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#1s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
            SC_P4_FunkcnyTestB.IdleTime.IN:= TRUE;
            
            IF NOT SC_P4_FunkcnyTestB.Switch1 THEN
                PocetOpakovaniTestu:= PocetOpakovaniTestu + 1;
                SC_P4_FunkcnyTestB.Switch1:= TRUE;
            END_IF
            
            IF OpakovanyTest AND PocetOpakovaniTestu < 2 AND SC_P4_FunkcnyTestB.IdleTime.Q AND NOT TestovaciKus THEN
                OpakovanyTest:= FALSE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 118;
            ELSIF OpakovanyTest AND PocetOpakovaniTestu >= 2 AND NOT TestovaciKus THEN
                Paletka[i].VnutornyStav.FunkcnyTest_Ukonceny:= TRUE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 555;
            ELSIF NOT OpakovanyTest OR TestovaciKus THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 555;
            END_IF       
                
            
            
            
            
            
            
			
        555:
            SC_P4_FunkcnyTestB.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;    
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
                     
            SC_P4_FunkcnyTestB.ResetStep:= TRUE;
            SC_P4_FunkcnyTestB.Step:= 560;		
		
			

            //Vyvezenie paletky//			
			
        560:
            SC_P4_FunkcnyTestB.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper etiketovacky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
                        
            IF P4_FunkcnyTestB.KoniecCyklu THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 0;		
            ELSIF (NOT P4_Etiketovacka.IN.PritomnostPaletky_S12 AND Safety.STAV.P4_VstupBunky_Bariera_AKTIVNA AND SC_P4_Etiketovacka.Step = 100) AND NOT P4_FunkcnyTestB.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P4_FunkcnyTestB.OUT.ZasunStoper_YV164:= TRUE;
                P4_FunkcnyTestB.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 561;
            END_IF	
		
		
        561:
            SC_P4_FunkcnyTestB.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper etiketovacky';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#200ms;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#10s;
	
            SC_P4_FunkcnyTestB.IdleTime.IN:= NOT P4_FunkcnyTestB.IN.PritomnostPaletky_S11;
            SC_P4_FunkcnyTestB.AlarmTime.IN:= P4_FunkcnyTestB.IN.PritomnostPaletky_S11;
            
            IF NOT P4_FunkcnyTestB.IN.PritomnostPaletky_S11 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                P4_FunkcnyTestB.OUT.ZasunStoper_YV164:= FALSE;
                TestovaciKus:= FALSE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
            END_IF    
            
			
            IF SC_P4_FunkcnyTestB.IdleTime.Q AND NOT P4_FunkcnyTestB.OUT.ZasunStoper_YV164 THEN
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 100;
            ELSIF SC_P4_FunkcnyTestB.AlarmTime.Q THEN
                P34_Alarmy[451]:= TRUE;
                P4_Pracovisko.KoniecCyklu:= TRUE;
                SC_P4_FunkcnyTestB.ResetStep:= TRUE;
                SC_P4_FunkcnyTestB.Step:= 0;    
            END_IF	
					
		
			
		
            //*******************************************************Manu�lny re�im*******************************************************************************//
        700:
            SC_P4_FunkcnyTestB.StepName:='700 - Manualny Rezim';
            SC_P4_FunkcnyTestB.IdleTime.PT:= T#8s;
            SC_P4_FunkcnyTestB.AlarmTime.PT:= T#5s;
		
		
            //Ovl�danie odpru�enia kontaktov//
            IF P4_FunkcnyTestB.RR_ZapniOdpruzenieKontaktov THEN
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_VYPNI_YV188:= FALSE;
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_ZAPNI_YV187:= TRUE;
            ELSE
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_ZAPNI_YV187:= FALSE;
                P4_FunkcnyTestB.OUT.OdpruzenieKontaktov_VYPNI_YV188:= TRUE;
            END_IF
        
            //Ovl�danie vysunutia kontaktov testera//
            P4_FunkcnyTestB.OUT.KontaktyTestera_VYSUN_YV172:= P4_FunkcnyTestB.RR_VysunKontaktyTestera;
				
		
	
	
    END_CASE
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


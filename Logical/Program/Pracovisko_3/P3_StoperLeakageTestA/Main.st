
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
   
    P3_LeakageTestA.STAV.Tester_ON:= TRUE;
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
    OvlPritlaku;
    TesterKomunikacia;
	
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P3_LeakageTestA);
	
	
    //Príznak leakage test A východzia pozícia//
    IF P3_LeakageTestA.IN.Centrovanie_ZASUNUTE_IS72 AND P3_LeakageTestA.IN.Pritlak_ZASUNUTY_MS46 AND P3_LeakageTestA.IN.Kopito_ZASUNUTE_IS68 THEN
        P3_LeakageTestA_VychodziaPozicia:= TRUE;
    ELSE
        P3_LeakageTestA_VychodziaPozicia:= FALSE;
    END_IF	
	
	
	
    //Reset sekcie //
    IF P3_LeakageTestA.Reset THEN
        SC_P3_LeakageTestA.Step:= 0;
        P3_LeakageTestA.Reset:= FALSE;
    END_IF	

    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_LeakageTestA.Automat THEN
        SC_P3_LeakageTestA.Step:= 0;
    END_IF 
    
    
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN 
        Triger_0:= TRUE;
        IF P3_LeakageTestA.IN.PritomnostPaletky_S23 AND P3_LeakageTestA.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P3_LeakageTestA.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 550;
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF 
   
    
    
    
    
    //Porucha stanice//
    IF P3_PoruchaST2 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P3_LeakageTestA.IN.PritomnostPaletky_S23 AND P3_LeakageTestA.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P3_LeakageTestA.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 550;
            END_IF
        ELSE
            SC_P3_LeakageTestA.ResetStep:= TRUE;
            SC_P3_LeakageTestA.Step:= 0;
        END_IF 
    END_IF   
    
    IF NOT P3_PoruchaST2 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
    
	
    CASE SC_P3_LeakageTestA.Step OF 
	
	
        0:
            SC_P3_LeakageTestA.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            SC_OvlPritlaku.Step:= 0;
            P3_LeakageTestA.Automat:= FALSE;
            P3_LeakageTestA.KoniecCyklu:= FALSE;
            P3_LeakageTestA.Manual:= FALSE;
            P3_LeakageTestA.STAV.PoINIT:= FALSE;
            P3_LeakageTestA.OUT.Kopito_VYSUN_YV141:= FALSE;
            P3_LeakageTestA.OUT.Kopito_ZASUN_YV142:= TRUE;
            P3_LeakageTestA.OUT.ZasunStoper_YV134:= FALSE;
            (*P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= FALSE;*)
            P3_LeakageTestA.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P3_LeakageTestA.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P3_LeakageTestA_ST8A.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P3_LeakageTestA_ST8A.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P3_LeakageTestA_ST8A.CMD.OdosliStavPaletky_TYP2:= FALSE;
            AteqLeakageTester_A.CitajParametreTestera:= FALSE;			
            PrecitaneCisloPaletky:= '';
            AteqLeakageTester_A.START_Testovania:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_LeakageTestA_ST8A.CMD.START_Merania_1:= FALSE;
            Taktime_LeakageTestA_ST8A.CMD.START_Merania_2:= FALSE;
            PaletkaPrechadza:= FALSE;
            P3_LeakageTestA.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P3_LeakageTestA.RR_TestovanieLeakageTestu:= FALSE;
            P3_LeakageTestA.RR_VysunSpodneKopito:= FALSE;
            P3_LeakageTestA.RR_TestovaciaSekvencia:= FALSE;
            P3_LeakageTestA.STAV.TestovaciaSekvencia_BUSY:= FALSE;
            PocetOpakovaniTestu:= 0;
            OpakovanyTest:= FALSE;
            P34_Vizu.ZobrazHL1_ST8:= FALSE;
            TRCB_P3_LeakTestA_OpatovnyDopyt:= FALSE;
            TRCB_P3_LeakTestA_PaletkaNG:= FALSE;
            
            
            IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 1;
            END_IF
	
        1:
            SC_P3_LeakageTestA.StepName:='1 - Cakam na spustenie vyroby';
            P3_LeakageTestA.KoniecCyklu:= FALSE;
            IF P3_LeakageTestA.Automat THEN
                SC_P3_LeakageTestA.Step:= 2;
            ELSIF P3_LeakageTestA.Manual THEN
                SC_P3_LeakageTestA.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
	
        2:
            SC_P3_LeakageTestA.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P3_LeakageTestA.IdleTime.PT:= T#2s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
									
            IF SC_P3_LeakageTestA.IdleTime.Q THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 3;
            END_IF
	
        3:
            SC_P3_LeakageTestA.StepName:='3 - Inicializacia - zasunutie pritlaku';
            SC_P3_LeakageTestA.IdleTime.PT:= T#2s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= TRUE;
                Pritlak_ZASUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestA.IN.Pritlak_ZASUNUTY_MS46 THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 8;
            END_IF	
	
	
        8:
            SC_P3_LeakageTestA.StepName:='8 - Inicializacia - zasunutie centrovacky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#4s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestA.IN.Centrovanie_ZASUNUTE_IS72 AND P3_Dopravniky.STAV.PoINIT THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 10;
            END_IF	
	
			
        10:
            SC_P3_LeakageTestA.StepName:='10 - Inicializacia - kontrola typu zalozeneho kopita';
            SC_P3_LeakageTestA.IdleTime.PT:= T#4s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' AND P3_LeakageTestA.IN.PritomnostKopita_IS67 AND P3_LeakageTestA.IN.Tester_TypKonektoru_4F THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 13;
            ELSIF Linka.PAR.ZvolenyModel = '5F' AND P3_LeakageTestA.IN.PritomnostKopita_IS67 AND P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 13;
            ELSIF Linka.PAR.ZvolenyModel = '5H' AND P3_LeakageTestA.IN.PritomnostKopita_IS67 AND P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 13;	
            ELSE
                P34_Alarmy[314]:= TRUE;
                P3_PoruchaST2:= TRUE;
            END_IF	
			
			
			
        13:
            SC_P3_LeakageTestA.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#5s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
	
            IF P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                P3_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 20;		 
            ELSIF SC_P3_LeakageTestA.IdleTime.Q THEN
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 100;
            END_IF	
		
        20:
            SC_P3_LeakageTestA.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
		
            IF SC_P3_LeakageTestA.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P3_LeakageTestA.IN.PrecitaneCisloPaletky_S23);
                i:= 0;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 23;
            END_IF	
	
	
        23:
            SC_P3_LeakageTestA.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[310]:= TRUE;
                P3_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_LeakageTestA.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_LeakageTestA.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 30;
            END_IF	
            
        
        30:
            SC_P3_LeakageTestA.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestA.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    P3_LeakageTestA.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 113;
                ELSE
                    P3_LeakageTestA.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 560;
                END_IF  
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_8A,8B' THEN 
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestA.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    P3_LeakageTestA.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 105;
                ELSE
                    P3_LeakageTestA.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 560;
                END_IF   
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_8A,8B' THEN 
                Revork:= FALSE;
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;     
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            END_IF	
        
                 
            
            
        33:
            SC_P3_LeakageTestA.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            ELSE
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 35;
            END_IF
			
        35:
            SC_P3_LeakageTestA.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 118;
            ELSE
                P3_LeakageTestA.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 100;
            END_IF	
			
		     
            
		
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P3_LeakageTestA.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            IF P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                P3_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
                
            SC_P3_LeakageTestA.IdleTime.IN:= P3_LeakageTestA.IN.PritomnostPaletky_S23;
			
            IF EDGEPOS(P3_LeakageTestA.IN.PritomnostPaletky_S23)THEN
                IF NOT Taktime_LeakageTestA_ST8A.CMD.START_Merania_1 THEN
                    Taktime_LeakageTestA_ST8A.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_LeakageTestA_ST8A.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
                
            
            IF P3_LeakageTestA.KoniecCyklu THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF SC_P3_LeakageTestA.IdleTime.Q THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 101;
            END_IF
		
			
		
			
			
			
			
        101:
            SC_P3_LeakageTestA.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#500ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
		
            
            PrecitaneCisloPaletky:= USINT_TO_STRING(P3_LeakageTestA.IN.PrecitaneCisloPaletky_S23);
            i:= 0;
            SC_P3_LeakageTestA.ResetStep:= TRUE;
            SC_P3_LeakageTestA.Step:= 102;
           	
	
	
        102:
            SC_P3_LeakageTestA.StepName:='102 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[310]:= TRUE;
                P3_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_LeakageTestA.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_LeakageTestA.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 103;
            END_IF	
		
			
        103:
            SC_P3_LeakageTestA.StepName:='103 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_8A,8B' THEN 
                IF P3_LeakageTestA.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 113;
                ELSE
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 560;
                END_IF    
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_8A,8B' THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_8A,8B' THEN 
                IF P3_LeakageTestA.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 105;
                ELSE
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 560;
                END_IF    
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_8A,8B' THEN
                Revork:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND P3_LeakageTestA.STAV.Tester_ON THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 105;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND NOT P3_LeakageTestA.STAV.Tester_ON THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            END_IF	
			
        
        105:
            SC_P3_LeakageTestA.StepName:='105 - Automaticky Rezim - kontrola zapnutia testovacej stanice B';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            IF P3_LeakageTestB.STAV.Tester_ON THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 107;
            ELSE
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 113;
            END_IF	     
            
        107:
            SC_P3_LeakageTestA.StepName:='107 - Automaticky Rezim - kontrola paletky v testovacej stanic1 B';
            SC_P3_LeakageTestA.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
            
            IF P3_LeakageTestA.KoniecCyklu THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 113;
            ELSIF SC_P3_LeakageTestB.Step = 100 AND NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            ELSIF SC_P3_LeakageTestB.Step = 110 AND P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 110;
            END_IF    
                  
            
            
        110:
            SC_P3_LeakageTestA.StepName:='110 - Automaticky Rezim - cakam na spustenie testovania';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s; 
            
            IF P3_LeakageTestB.OUT.KOM_StanicaA_StartTestovania THEN
                P3_LeakageTestB.OUT.KOM_StanicaA_StartTestovania:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 113;
            END_IF    
            
            
            
				
        113:
            SC_P3_LeakageTestA.StepName:='113 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky'; 
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;	
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
			
                        
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                TRCB_P3_LeakageTestA_ST8A.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_LeakageTestA_ST8A.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 114;
            ELSIF TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaError THEN	
                TRCB_P3_LeakageTestA_ST8A.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 115;
            END_IF	
			
				
		
			
        114:
            SC_P3_LeakageTestA.StepName:='114 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;		
			
            IF NOT TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaUkoncena AND P3_LeakageTestA.IN.Centrovanie_VYSUNUTE_IS71 THEN
                IF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.DruhCinnostiNaPaletke  = 'PRD;ST8A' THEN
                        SC_P3_LeakageTestA.ResetStep:= TRUE;
                        SC_P3_LeakageTestA.Step:= 118;
                    ELSIF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.DruhCinnostiNaPaletke  = 'SMP;ST8A,ST8B' THEN
                        SC_P3_LeakageTestA.ResetStep:= TRUE;
                        SC_P3_LeakageTestA.Step:= 118; 
                    ELSIF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.DruhCinnostiNaPaletke  = 'PRD;ST8A,ST8B' THEN
                        SC_P3_LeakageTestA.ResetStep:= TRUE;
                        SC_P3_LeakageTestA.Step:= 118; 
                    ELSE
                        Paletka[i].PAR.StavPaletky := 'NG';
                        SC_P3_LeakageTestA.ResetStep:= TRUE;
                        SC_P3_LeakageTestA.Step:= 116;
                    END_IF    
                ELSIF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 115;
                END_IF	
            END_IF
		
      
        115:
            SC_P3_LeakageTestA.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            
            
            P34_Vizu.ZobrazHL1_ST8:= TRUE;
            
            IF TRCB_P3_LeakTestA_OpatovnyDopyt THEN
                TRCB_P3_LeakTestA_OpatovnyDopyt:= FALSE; 
                P34_Vizu.ZobrazHL1_ST8:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 113;
            ELSIF TRCB_P3_LeakTestA_PaletkaNG THEN
                TRCB_P3_LeakTestA_PaletkaNG:= FALSE;
                P34_Vizu.ZobrazHL1_ST8:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 116;
            END_IF   
            
            
            
            
        116:
            SC_P3_LeakageTestA.StepName:='116 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestA.IN.Centrovanie_ZASUNUTE_IS72 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 560;
            END_IF			
		
         
        118:
            SC_P3_LeakageTestA.StepName:='118 - Automaticky Rezim - zacentrovanie paletky ';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestA.IN.Centrovanie_VYSUNUTE_IS71 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 120;
            END_IF	   
            
            
        		
		
		
        120:
            SC_P3_LeakageTestA.StepName:='120 - Automaticky Rezim - vysunutie horneho pritlaku ';
            SC_P3_LeakageTestA.IdleTime.PT:= T#3s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
                        
            
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= TRUE;
                Pritlak_VYSUN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
					
            IF P3_LeakageTestA.IN.Pritlak_VYSUNUTY_MS47 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 123;
            END_IF	
		
        123:
            SC_P3_LeakageTestA.StepName:='123 - Automaticky Rezim - vysunutie spodneho kopita';
            SC_P3_LeakageTestA.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
	
            IF P3_LeakageTestA.IN.PritomnostKopita_IS67 AND P3_LeakageTestA.IN.Kopito_ZASUNUTE_IS68 THEN
                P3_LeakageTestA.OUT.Kopito_ZASUN_YV142:= FALSE;
                P3_LeakageTestA.OUT.Kopito_VYSUN_YV141:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 125;
            END_IF
			
                   
            
        125:
            SC_P3_LeakageTestA.StepName:='125 - Automaticky Rezim - cakam na spustenie testera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#300ms;
	
			
            SC_P3_LeakageTestA.IdleTime.IN:= NOT P3_LeakageTestA.IN.Kopito_ZASUNUTE_IS68;
			
            IF SC_P3_LeakageTestA.IdleTime.Q THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 130;
            END_IF		
		
		
        130:
            SC_P3_LeakageTestA.StepName:='130 - Automaticky Rezim - spustenie testera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#4s800ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		    
                     
		
            IF NOT SC_P3_LeakageTestA.Switch1 AND AteqLeakageTester_A.Stav_READY THEN
                AteqLeakageTester_A.START_Testovania:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF	
		
                
            IF NOT AteqLeakageTester_A.Stav_READY AND AteqLeakageTester_A.Stav_START_DONE AND NOT AteqLeakageTester_A.VysledokTestovania_OK AND NOT AteqLeakageTester_A.VysledokTestovania_NG AND SC_P3_LeakageTestA.IdleTime.Q THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= FALSE;
                P3_LeakageTestA.OUT.Pritlak_VYSUN_YV157:= FALSE; 
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 133;
            END_IF	
		
        133:
            SC_P3_LeakageTestA.StepName:='130 - Automaticky Rezim - nacitanie parametrov testera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#500ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF AteqLeakageTester_A.Stav_READY THEN
                AteqLeakageTester_A.START_Testovania:= FALSE;
                AteqLeakageTester_A.CitajParametreTestera:= TRUE;
            END_IF    
                
            SC_P3_LeakageTestA.IdleTime.IN:= AteqLeakageTester_A.Stav_CitanieParametrov_OK;
            
            IF AteqLeakageTester_A.Stav_CitanieParametrov_OK AND SC_P3_LeakageTestA.IdleTime.Q THEN    
                Reports.LeakageTest.CasPlnenia.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.CasPnenia);
                Reports.LeakageTest.CasStabilizacie.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.CasStabilizacie);
                Reports.LeakageTest.TlakPlnenia.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.TlakPlnenia);
                Reports.LeakageTest.ToleranciaPritlaku_MIN.StanicaA:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MAX.StanicaA:= '';
                Reports.LeakageTest.TlakPritlaku.StanicaA:= REAL_TO_STRING(P3_LeakageTestA.IN.PreratanyVyrovnavaciTlak_Bar);
                Reports.LeakageTest.TlakUniku.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.TlakUniku);
                Reports.LeakageTest.ToleranciaTlakUniku_MIN.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.Tolerancia * -1);
                Reports.LeakageTest.ToleranciaTlakUniku_MAX.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.Tolerancia);
                Reports.LeakageTest.Tolerancia.StanicaA:= REAL_TO_STRING(AteqLeakageTester_A.Tolerancia);
                AteqLeakageTester_A.CitajParametreTestera:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 135;
            END_IF	
		
            
        135:
            SC_P3_LeakageTestA.StepName:='135 - Automaticky Rezim - kontrola výsledku testu';
            SC_P3_LeakageTestA.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            
            IF AteqLeakageTester_A.VysledokTestovania_OK THEN
                Paletka[i].VnutornyStav.LeakageTest_Ukonceny:= TRUE;
                Reports.LeakageTest.VyslednyReport.StanicaA:= 'PASS';
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 140;
            ELSE 
                IF NOT Revork THEN
                    OpakovanyTest:= TRUE;
                END_IF    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Reports.LeakageTest.VyslednyReport.StanicaA:= 'FAIL';
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 140;
            END_IF
		
        140:
            SC_P3_LeakageTestA.StepName:='140 - Automaticky Rezim - cakam na ukoncenie testovania testera stanice B';
            SC_P3_LeakageTestA.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            
            IF NOT AteqLeakageTester_B.START_Testovania THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 150;
            ELSIF P3_LeakageTestA.RR_TestovaciaSekvencia THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 150;
            END_IF
            
            
		
        150:
            SC_P3_LeakageTestA.StepName:='150 - Automaticky Rezim - zasunutie spodneho kopita ';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
	
            
            P3_LeakageTestA.OUT.Kopito_VYSUN_YV141:= FALSE;
            P3_LeakageTestA.OUT.Kopito_ZASUN_YV142:= TRUE;
            
            IF P3_LeakageTestA.IN.Kopito_ZASUNUTE_IS68 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 153;
            END_IF    
           
		
        153:
            SC_P3_LeakageTestA.StepName:='153 - Automaticky Rezim - zasunutie horneho pritlaku';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= TRUE;
                Pritlak_ZASUN:= TRUE;
                SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
		
				
			
            IF SC_P3_LeakageTestA.IdleTime.Q THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 545;
            END_IF	
		
		
		
            //Odcentrovanie paletky//			
		
        545:
            SC_P3_LeakageTestA.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            
            Centrovacku_ZASUN:= TRUE;
            IF P3_LeakageTestA.RR_TestovaciaSekvencia THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 558;
            ELSE    
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 550;
            END_IF
			
			
            //Odoslanie dát na server//			
		
        550:
            SC_P3_LeakageTestA.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                TRCB_P3_LeakageTestA_ST8A.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_LeakageTestA_ST8A.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 553;
            ELSIF TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaError THEN
                //                P34_Alarmy[311]:= TRUE;
                //                P3_PoruchaST2:= TRUE;
            END_IF
			
		
        553:
            SC_P3_LeakageTestA.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P3_LeakageTestA_ST8A.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 554;
                ELSIF TRCB_P3_LeakageTestA_ST8A.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 554;
                END_IF	
            END_IF
		
        554:
            SC_P3_LeakageTestA.StepName:='554 - Automaticky Rezim - kontrola poctu testovani';
            SC_P3_LeakageTestA.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestA.IdleTime.IN:= TRUE;
            
            IF NOT SC_P3_LeakageTestA.Switch1 THEN
                PocetOpakovaniTestu:= PocetOpakovaniTestu + 1;
                SC_P3_LeakageTestA.Switch1:= TRUE;
            END_IF
            
            IF OpakovanyTest AND PocetOpakovaniTestu < 2 AND SC_P3_LeakageTestA.IdleTime.Q AND NOT TestovaciKus THEN
                OpakovanyTest:= FALSE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 113;
            ELSIF OpakovanyTest AND PocetOpakovaniTestu >= 2 AND NOT TestovaciKus THEN
                Paletka[i].VnutornyStav.LeakageTest_Ukonceny:= TRUE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 555;
            ELSIF NOT OpakovanyTest OR TestovaciKus THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 555;
            END_IF    
                
                       
            
            
            
            
        555:
            SC_P3_LeakageTestA.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;    
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
         
            SC_P3_LeakageTestA.ResetStep:= TRUE;
            SC_P3_LeakageTestA.Step:= 558;
            
            
            
            
            
            
            
        558:
            SC_P3_LeakageTestA.StepName:='558 - Automaticky Rezim - kontrola otvorenia testera';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
			
            IF P3_LeakageTestA.IN.Centrovanie_ZASUNUTE_IS72 AND P3_LeakageTestA.IN.Pritlak_ZASUNUTY_MS46 AND P3_LeakageTestA.IN.Kopito_ZASUNUTE_IS68 THEN
                P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= FALSE;
                IF P3_LeakageTestA.RR_TestovaciaSekvencia THEN
                    P3_LeakageTestA.RR_TestovaciaSekvencia:= FALSE;
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 700;
                ELSE    
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 560;
                END_IF    
            END_IF
            	
			
			
			
			
			

            //Vyvezenie paletky//			
			
        560:
            SC_P3_LeakageTestA.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper leakage testu B';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            					
            IF P3_LeakageTestA.KoniecCyklu THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            ELSIF ((NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 AND SC_P3_LeakageTestB.Step = 100) OR (P3_LeakageTestB.OUT.ZasunStoper_YV135 AND SC_P3_LeakageTestB.Step = 561)) AND NOT P3_LeakageTestA.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P3_LeakageTestA.OUT.ZasunStoper_YV134:= TRUE;
                P3_LeakageTestA.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 561;
            END_IF	
		
		
        561:
            SC_P3_LeakageTestA.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper leakage testu B';
            SC_P3_LeakageTestA.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#10s;
		
            SC_P3_LeakageTestA.IdleTime.IN:= NOT P3_LeakageTestA.IN.PritomnostPaletky_S23;
            SC_P3_LeakageTestA.AlarmTime.IN:= P3_LeakageTestA.IN.PritomnostPaletky_S23;
           
            IF NOT P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                P3_LeakageTestA.OUT.ZasunStoper_YV134:= FALSE;
                TestovaciKus:= FALSE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.LeakageTest.CasPlnenia.StanicaA:= '';
                Reports.LeakageTest.VyslednyReport.StanicaA:= '';
                Reports.LeakageTest.CasStabilizacie.StanicaA:= '';
                Reports.LeakageTest.TlakPlnenia.StanicaA:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MIN.StanicaA:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MAX.StanicaA:= '';
                Reports.LeakageTest.TlakPritlaku.StanicaA:= '';
                Reports.LeakageTest.TlakUniku.StanicaA:= '';
                Reports.LeakageTest.Tolerancia.StanicaA:= '';
            END_IF    
            
            
          	
            IF SC_P3_LeakageTestA.IdleTime.Q AND NOT P3_LeakageTestA.OUT.ZasunStoper_YV134 THEN
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 100;
            ELSIF SC_P3_LeakageTestA.AlarmTime.Q THEN
                P34_Alarmy[357]:= TRUE;
                P3_Pracovisko.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestA.ResetStep:= TRUE;
                SC_P3_LeakageTestA.Step:= 0;
            END_IF    
           
					
		
			
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P3_LeakageTestA.StepName:='700 - Manualny Rezim';
            SC_P3_LeakageTestA.IdleTime.PT:= T#8s;
            SC_P3_LeakageTestA.AlarmTime.PT:= T#5s;
		
            P3_LeakageTestA.OUT.PneuZamok_ODOMKNI_YV159:= TRUE;
		
	
            //Vysunutie spodného kopita//
            IF P3_LeakageTestA.RR_VysunSpodneKopito THEN
                P3_LeakageTestA.OUT.Kopito_ZASUN_YV142:= FALSE;
                P3_LeakageTestA.OUT.Kopito_VYSUN_YV141:= TRUE;
            ELSE    
                P3_LeakageTestA.OUT.Kopito_VYSUN_YV141:= FALSE;
                P3_LeakageTestA.OUT.Kopito_ZASUN_YV142:= TRUE;
            END_IF
        
            //Spustenie testovacej sekvencie//
            P3_LeakageTestA.STAV.TestovaciaSekvencia_BUSY:= P3_LeakageTestA.RR_TestovaciaSekvencia;
            
            IF P3_LeakageTestA.RR_TestovaciaSekvencia THEN
                IF P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                    SC_P3_LeakageTestA.ResetStep:= TRUE;
                    SC_P3_LeakageTestA.Step:= 118;
                ELSE    
                    P3_LeakageTestA.RR_TestovaciaSekvencia:= FALSE;
                END_IF  
            END_IF   
        
	
    END_CASE
	
	 
				END_PROGRAM

PROGRAM _EXIT
				(* Insert code here *)
	 
				END_PROGRAM


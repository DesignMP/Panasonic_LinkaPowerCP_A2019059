
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    
    P3_LeakageTestB.STAV.Tester_ON:= TRUE;
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
    OvlPritlaku;
    TesterKomunikacia;
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P3_LeakageTestB);
	
	
    //Príznak leakage test B východzia pozícia//
    IF P3_LeakageTestB.IN.Centrovanie_ZASUNUTE_IS74 AND P3_LeakageTestB.IN.Pritlak_ZASUNUTY_MS48 AND P3_LeakageTestB.IN.Kopito_ZASUNUTE_IS70 THEN
        P3_LeakageTestB_VychodziaPozicia:= TRUE;
    ELSE
        P3_LeakageTestB_VychodziaPozicia:= FALSE;
    END_IF	
	
     
	
	
    //Reset sekcie //
    IF P3_LeakageTestB.Reset THEN
        SC_P3_LeakageTestB.Step:= 0;
        P3_LeakageTestB.Reset:= FALSE;
    END_IF	
	
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_LeakageTestB.Automat THEN
        SC_P3_LeakageTestB.Step:= 0;
    END_IF 
    
   
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN 
        Triger_0:= TRUE;
        IF P3_LeakageTestB.IN.PritomnostPaletky_S24 AND P3_LeakageTestB.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P3_LeakageTestB.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 550;
            END_IF
        END_IF
    END_IF    
    
    IF Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF  
    
    
    
    //Porucha stanice//
    IF P3_PoruchaST3 AND NOT Triger_1  THEN
        Triger_1:= TRUE;
        IF P3_LeakageTestB.IN.PritomnostPaletky_S24 AND P3_LeakageTestB.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P3_LeakageTestB.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 550;
            END_IF
        ELSE
            SC_P3_LeakageTestB.ResetStep:= TRUE;
            SC_P3_LeakageTestB.Step:= 0;
        END_IF  
    END_IF   
    
	
    IF NOT P3_PoruchaST3 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
    
    CASE SC_P3_LeakageTestB.Step OF 
	
	
        0:
            SC_P3_LeakageTestB.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            SC_OvlPritlaku.Step:= 0;
            P3_LeakageTestB.Automat:= FALSE;
            P3_LeakageTestB.KoniecCyklu:= FALSE;
            P3_LeakageTestB.Manual:= FALSE;
            P3_LeakageTestB.STAV.PoINIT:= FALSE;
            P3_LeakageTestB.OUT.Kopito_VYSUN_YV145:= FALSE;
            P3_LeakageTestB.OUT.Kopito_ZASUN_YV146:= TRUE;
            P3_LeakageTestB.OUT.ZasunStoper_YV135:= FALSE;
            (*P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= FALSE;*)
            P3_LeakageTestB.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P3_LeakageTestB.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2:= FALSE;
            AteqLeakageTester_B.CitajParametreTestera:= FALSE;
            PrecitaneCisloPaletky:= '';
            AteqLeakageTester_B.START_Testovania:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_LeakageTestB_ST8B.CMD.START_Merania_1:= FALSE;
            Taktime_LeakageTestB_ST8B.CMD.START_Merania_2:= FALSE;
            P3_LeakageTestB.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P3_LeakageTestB.OUT.KOM_StanicaA_StartTestovania:= FALSE;
            P3_LeakageTestB.RR_TestovanieLeakageTestu:= FALSE;
            P3_LeakageTestB.RR_VysunSpodneKopito:= FALSE;
            P3_LeakageTestB.RR_TestovaciaSekvencia:= FALSE;
            P3_LeakageTestB.STAV.TestovaciaSekvencia_BUSY:= FALSE;
            PocetOpakovaniTestu:= 0;
            OpakovanyTest:= FALSE;
            P34_Vizu.ZobrazHL2_ST8:= FALSE; 
            TRCB_P3_LeakTestB_OpatovnyDopyt:= FALSE;
            TRCB_P3_LeakTestB_PaletkaNG:= FALSE;
            
            
            IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 1;
            END_IF
	
        1:
            SC_P3_LeakageTestB.StepName:='1 - Cakam na spustenie vyroby';
            P3_LeakageTestB.KoniecCyklu:= FALSE;
            IF P3_LeakageTestB.Automat THEN
                SC_P3_LeakageTestB.Step:= 2;
            ELSIF P3_LeakageTestB.Manual THEN
                SC_P3_LeakageTestB.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
	
        2:
            SC_P3_LeakageTestB.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P3_LeakageTestB.IdleTime.PT:= T#2s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
									
            IF SC_P3_LeakageTestB.IdleTime.Q THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 3;
            END_IF
	
        3:
            SC_P3_LeakageTestB.StepName:='3 - Inicializacia - zasunutie pritlaku';
            SC_P3_LeakageTestB.IdleTime.PT:= T#2s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= TRUE;
                Pritlak_ZASUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestB.IN.Pritlak_ZASUNUTY_MS48 THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 8;
            END_IF	
	
	
        8:
            SC_P3_LeakageTestB.StepName:='8 - Inicializacia - zasunutie centrovacky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#4s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestB.IN.Centrovanie_ZASUNUTE_IS74 AND P3_Dopravniky.STAV.PoINIT THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 10;
            END_IF	
	
        10:
            SC_P3_LeakageTestB.StepName:='10 - Inicializacia - kontrola typu zalozeneho kopita';
            SC_P3_LeakageTestB.IdleTime.PT:= T#4s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' AND P3_LeakageTestB.IN.PritomnostKopita_IS69 AND P3_LeakageTestB.IN.Tester_TypKonektoru_4F THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 13;
            ELSIF Linka.PAR.ZvolenyModel = '5F' AND P3_LeakageTestB.IN.PritomnostKopita_IS69 AND P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 13;
            ELSIF Linka.PAR.ZvolenyModel = '5H' AND P3_LeakageTestB.IN.PritomnostKopita_IS69 AND P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 13;	
            ELSE
                P34_Alarmy[315]:= TRUE;
                P3_PoruchaST3:= TRUE;
            END_IF		
			
			
			
			
			
			
        13:
            SC_P3_LeakageTestB.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#5s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
	
            IF P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                P3_LeakageTestA.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 20;		 
            ELSIF SC_P3_LeakageTestB.IdleTime.Q THEN
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 100;
            END_IF	
		
            
        20:
            SC_P3_LeakageTestB.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
		
            IF SC_P3_LeakageTestB.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P3_LeakageTestB.IN.PrecitaneCisloPaletky_S24);
                i:= 0;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 23;
            END_IF	   
            
         
        23:
            SC_P3_LeakageTestB.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[312]:= TRUE;
                P3_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_LeakageTestB.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_LeakageTestB.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 30;
            END_IF	
            
        
        30:
            SC_P3_LeakageTestB.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestB.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    P3_LeakageTestB.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 113;
                ELSE
                    P3_LeakageTestB.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_8A,8B' THEN  
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestB.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    P3_LeakageTestB.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 105;
                ELSE
                    P3_LeakageTestB.STAV.PoINIT:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_8A,8B' THEN  
                Revork:= FALSE;
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            END_IF	  
        
        33:
            SC_P3_LeakageTestB.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            ELSE
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 35;
            END_IF 
            
               
        35:
            SC_P3_LeakageTestB.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            
            
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 118;
            ELSE
                P3_LeakageTestB.STAV.PoINIT:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 100;
            END_IF
			
			
			
			
			
			
			
            
		
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P3_LeakageTestB.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
            IF P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                P3_LeakageTestA.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF    
            
            SC_P3_LeakageTestB.IdleTime.IN:= P3_LeakageTestB.IN.PritomnostPaletky_S24;
			
            IF EDGEPOS(P3_LeakageTestB.IN.PritomnostPaletky_S24)THEN
                IF NOT Taktime_LeakageTestB_ST8B.CMD.START_Merania_1 THEN
                    Taktime_LeakageTestB_ST8B.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_LeakageTestB_ST8B.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            IF P3_LeakageTestB.KoniecCyklu THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            ELSIF SC_P3_LeakageTestB.IdleTime.Q THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 101;
            END_IF
		
		
			
        101:
            SC_P3_LeakageTestB.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#500ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
		
            PrecitaneCisloPaletky:= USINT_TO_STRING(P3_LeakageTestB.IN.PrecitaneCisloPaletky_S24);
            i:= 0;
            SC_P3_LeakageTestB.ResetStep:= TRUE;
            SC_P3_LeakageTestB.Step:= 102;
           
	
	
        102:
            SC_P3_LeakageTestB.StepName:='102 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_LeakageTestB.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[312]:= TRUE;
                P3_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_LeakageTestB.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_LeakageTestB.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 103;
            END_IF	
		
			
			
			
        103:
            SC_P3_LeakageTestB.StepName:='103 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestB.STAV.Tester_ON THEN
                    TestovaciKus:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 113;
                ELSE
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_8A,8B' THEN  
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_8A,8B' THEN
                IF P3_LeakageTestB.STAV.Tester_ON THEN
                    Revork:= TRUE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 105;
                ELSE
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 560;
                END_IF 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_8A,8B' THEN  
                Revork:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND P3_LeakageTestB.STAV.Tester_ON THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 105;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' AND NOT P3_LeakageTestB.STAV.Tester_ON THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            END_IF		
		
        		
        105:
            SC_P3_LeakageTestB.StepName:='105 - Automaticky Rezim - kontrola ukoncenia leakage testu'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].VnutornyStav.LeakageTest_Ukonceny THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            ELSE
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 110;
            END_IF    
		
                 
            
        110:
            SC_P3_LeakageTestB.StepName:='110 - Automaticky Rezim - cakam na prichod paletky na stanicu A a spustenie testovania'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#5s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#1M;
            SC_P3_LeakageTestB.AlarmTime.IN:= TRUE;
            
            
            IF NOT P3_StoperSrobovania.IN.PritomnostPaletky_S22 AND
                NOT P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 AND
                NOT P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
            ELSE
                SC_P3_LeakageTestB.IdleTime.IN:= FALSE;
            END_IF    
            
            
            (*SC_P3_LeakageTestB.IdleTime.IN:= NOT P3_LeakageTestA.IN.PritomnostPaletky_S23;*)
            
            IF P3_LeakageTestB.KoniecCyklu THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF SC_P3_LeakageTestA.Step = 110 AND P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN  
                P3_LeakageTestB.OUT.KOM_StanicaA_StartTestovania:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF SC_P3_LeakageTestA.Step = 560 AND P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF NOT P3_LeakageTestA.STAV.Tester_ON THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF SC_P3_LeakageTestB.IdleTime.Q THEN    
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF SC_P3_LeakageTestB.AlarmTime.Q THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            END_IF    
            
                   
				
        113:
            SC_P3_LeakageTestB.StepName:='113 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky'; 
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;	
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
            
                       
            
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 114;
            ELSIF TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError THEN	
                TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 115;
            END_IF	
			
			
		
		
			
        114:
            SC_P3_LeakageTestB.StepName:='114 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena AND P3_LeakageTestB.IN.Centrovanie_VYSUNUTE_IS73 THEN
                IF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.DruhCinnostiNaPaletke  = 'PRD;ST8B' THEN
                        SC_P3_LeakageTestB.ResetStep:= TRUE;
                        SC_P3_LeakageTestB.Step:= 118;
                    ELSIF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.DruhCinnostiNaPaletke  = 'PRD;ST8A,ST8B' THEN
                        SC_P3_LeakageTestB.ResetStep:= TRUE;
                        SC_P3_LeakageTestB.Step:= 118;    
                    ELSIF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.DruhCinnostiNaPaletke  = 'SMP;ST8A,ST8B' THEN
                        SC_P3_LeakageTestB.ResetStep:= TRUE;
                        SC_P3_LeakageTestB.Step:= 118;
                    ELSE
                        Paletka[i].PAR.StavPaletky := 'NG';
                        SC_P3_LeakageTestB.ResetStep:= TRUE;
                        SC_P3_LeakageTestB.Step:= 116;
                    END_IF 
                ELSIF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 115;
                END_IF	
            END_IF
			
       
        115:
            SC_P3_LeakageTestB.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            
            
            P34_Vizu.ZobrazHL2_ST8:= TRUE;
            
            IF TRCB_P3_LeakTestB_OpatovnyDopyt THEN
                TRCB_P3_LeakTestB_OpatovnyDopyt:= FALSE; 
                P34_Vizu.ZobrazHL2_ST8:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF TRCB_P3_LeakTestB_PaletkaNG THEN
                TRCB_P3_LeakTestB_PaletkaNG:= FALSE;
                P34_Vizu.ZobrazHL2_ST8:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 116;
            END_IF
            
            
            
		
        116:
            SC_P3_LeakageTestB.StepName:='116 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestB.IN.Centrovanie_ZASUNUTE_IS74 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 560;
            END_IF			
		
		
        118:
            SC_P3_LeakageTestB.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
            IF P3_LeakageTestB.IN.Centrovanie_VYSUNUTE_IS73 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 120;
            END_IF
            
            
            
		
		
        120:
            SC_P3_LeakageTestB.StepName:='120 - Automaticky Rezim - vysunutie horneho pritlaku';
            SC_P3_LeakageTestB.IdleTime.PT:= T#3s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
                       
            
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= TRUE;
                Pritlak_VYSUN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
           			
			
            IF P3_LeakageTestB.IN.Pritlak_VYSUNUTY_MS49 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 123;
            END_IF	
		
        123:
            SC_P3_LeakageTestB.StepName:='123 - Automaticky Rezim - vysunutie spodneho kopita';
            SC_P3_LeakageTestB.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
	
            IF P3_LeakageTestB.IN.PritomnostKopita_IS69 AND P3_LeakageTestB.IN.Kopito_ZASUNUTE_IS70 THEN
                P3_LeakageTestB.OUT.Kopito_ZASUN_YV146:= FALSE;
                P3_LeakageTestB.OUT.Kopito_VYSUN_YV145:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 125;
            END_IF
			
        125:
            SC_P3_LeakageTestB.StepName:='125 - Automaticky Rezim - cakam na spustenie testera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
	
						
            SC_P3_LeakageTestB.IdleTime.IN:= NOT P3_LeakageTestB.IN.Kopito_ZASUNUTE_IS70;
			
            IF SC_P3_LeakageTestB.IdleTime.Q  THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 130;
            END_IF		
		
		
        130:
            SC_P3_LeakageTestB.StepName:='130 - Automaticky Rezim - spustenie testera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#4s800ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
		
            IF NOT SC_P3_LeakageTestB.Switch1 AND AteqLeakageTester_B.Stav_READY THEN
                AteqLeakageTester_B.START_Testovania:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF	
		
            IF NOT AteqLeakageTester_B.Stav_READY AND AteqLeakageTester_B.Stav_START_DONE AND NOT AteqLeakageTester_B.VysledokTestovania_OK AND NOT AteqLeakageTester_B.VysledokTestovania_NG AND SC_P3_LeakageTestB.IdleTime.Q THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= FALSE;
                P3_LeakageTestB.OUT.Pritlak_VYSUN_YV161:= FALSE; 
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 133;
            END_IF	
		
		
        133:
            SC_P3_LeakageTestB.StepName:='130 - Automaticky Rezim - nacitanie parametrov testera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#500ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF AteqLeakageTester_B.Stav_READY THEN
                AteqLeakageTester_B.START_Testovania:= FALSE;
                AteqLeakageTester_B.CitajParametreTestera:= TRUE;
            END_IF            
            
            SC_P3_LeakageTestB.IdleTime.IN:= AteqLeakageTester_B.Stav_CitanieParametrov_OK;
            
            
            IF AteqLeakageTester_B.Stav_CitanieParametrov_OK AND SC_P3_LeakageTestB.IdleTime.Q THEN    
                Reports.LeakageTest.CasPlnenia.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.CasPnenia);
                Reports.LeakageTest.CasStabilizacie.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.CasStabilizacie);
                Reports.LeakageTest.TlakPlnenia.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.TlakPlnenia);
                Reports.LeakageTest.ToleranciaPritlaku_MIN.StanicaB:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MAX.StanicaB:= '';
                Reports.LeakageTest.TlakPritlaku.StanicaB:= REAL_TO_STRING(P3_LeakageTestB.IN.PreratanyVyrovnavaciTlak_Bar);
                Reports.LeakageTest.TlakUniku.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.TlakUniku);
                Reports.LeakageTest.ToleranciaTlakUniku_MIN.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.Tolerancia * -1);
                Reports.LeakageTest.ToleranciaTlakUniku_MAX.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.Tolerancia);
                Reports.LeakageTest.Tolerancia.StanicaB:= REAL_TO_STRING(AteqLeakageTester_B.Tolerancia);
                AteqLeakageTester_B.CitajParametreTestera:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 135;
            END_IF	
                
                
                
                
                
                
        135:
            SC_P3_LeakageTestB.StepName:='135 - Automaticky Rezim - kontrola výsledku testu';
            SC_P3_LeakageTestB.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
                    
            IF AteqLeakageTester_B.VysledokTestovania_OK THEN
                Paletka[i].VnutornyStav.LeakageTest_Ukonceny:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Reports.LeakageTest.VyslednyReport.StanicaB:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 140;
            ELSE 
                IF NOT Revork THEN
                    OpakovanyTest:= TRUE;
                END_IF    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Reports.LeakageTest.VyslednyReport.StanicaB:= 'FAIL';
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 140;
            END_IF
           			
		
        140:
            SC_P3_LeakageTestB.StepName:='140 - Automaticky Rezim - cakam na ukoncenie testovania testera stanice A';
            SC_P3_LeakageTestB.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            
            IF NOT AteqLeakageTester_A.START_Testovania THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 150;
            ELSIF P3_LeakageTestB.RR_TestovaciaSekvencia THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 150;    
            END_IF    
            
            
            
			
			
			
        150:
            SC_P3_LeakageTestB.StepName:='150 - Automaticky Rezim - zasunutie spodneho kopita';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
	
            P3_LeakageTestB.OUT.Kopito_VYSUN_YV145:= FALSE;
            P3_LeakageTestB.OUT.Kopito_ZASUN_YV146:= TRUE;
            
            IF P3_LeakageTestB.IN.Kopito_ZASUNUTE_IS70 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 153;
            END_IF    
		
				
		
        153:
            SC_P3_LeakageTestB.StepName:='153 - Automaticky Rezim - zasunutie horneho pritlaku';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= TRUE;
                Pritlak_ZASUN:= TRUE;
                SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
		
					
			
            IF SC_P3_LeakageTestB.IdleTime.Q THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 545;
            END_IF	
		
		
		
            //Odcentrovanie paletky//			
		
        545:
            SC_P3_LeakageTestB.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
          
            Centrovacku_ZASUN:= TRUE;
            IF P3_LeakageTestB.RR_TestovaciaSekvencia THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 558;
            ELSE   
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 550;
            END_IF		
		
			
			
            //Odoslanie dát na server//			
		
        550:
            SC_P3_LeakageTestB.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF	
			
			
            IF TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 553;
            ELSIF TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError THEN
                //                P34_Alarmy[313]:= TRUE;
                //                P3_PoruchaST3:= TRUE;
            END_IF
			
		
        553:
            SC_P3_LeakageTestB.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 554;
                ELSIF TRCB_P3_LeakageTestB_ST8B.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 554;
                END_IF	
            END_IF
		
        554:
            SC_P3_LeakageTestB.StepName:='554 - Automaticky Rezim - kontrola poctu testovani';
            SC_P3_LeakageTestB.IdleTime.PT:= T#1s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
            SC_P3_LeakageTestB.IdleTime.IN:= TRUE;
            
            IF NOT SC_P3_LeakageTestB.Switch1 THEN
                PocetOpakovaniTestu:= PocetOpakovaniTestu + 1;
                SC_P3_LeakageTestB.Switch1:= TRUE;
            END_IF
            
            IF OpakovanyTest AND PocetOpakovaniTestu < 2 AND SC_P3_LeakageTestB.IdleTime.Q AND NOT TestovaciKus THEN
                OpakovanyTest:= FALSE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 113;
            ELSIF OpakovanyTest AND PocetOpakovaniTestu >= 2 AND NOT TestovaciKus THEN
                Paletka[i].VnutornyStav.LeakageTest_Ukonceny:= TRUE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 555;
            ELSIF NOT OpakovanyTest OR TestovaciKus THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 555;
            END_IF       
            
            
            
            
            
            
        555:
            SC_P3_LeakageTestB.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;    
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
         
            SC_P3_LeakageTestB.ResetStep:= TRUE;
            SC_P3_LeakageTestB.Step:= 558;
                
            
            
            
            
            
        558:
            SC_P3_LeakageTestB.StepName:='558 - Automaticky Rezim - kontrola otvorenia testera';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
			
            IF P3_LeakageTestB.IN.Centrovanie_ZASUNUTE_IS74 AND P3_LeakageTestB.IN.Pritlak_ZASUNUTY_MS48 AND P3_LeakageTestB.IN.Kopito_ZASUNUTE_IS70 THEN
                P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= FALSE;
                IF P3_LeakageTestB.RR_TestovaciaSekvencia THEN
                    P3_LeakageTestB.RR_TestovaciaSekvencia:= FALSE;
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 700;
                ELSE
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 560;
                END_IF
            END_IF
          
            
            
            
				

            //Vyvezenie paletky//			
			
        560:
            SC_P3_LeakageTestB.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper funkcneho testu A';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
                        
            IF P3_LeakageTestB.KoniecCyklu THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;		
            ELSIF ((NOT P4_FunkcnyTestA.IN.PritomnostPaletky_S10 AND SC_P4_FunkcnyTestA.Step = 100) OR (P4_FunkcnyTestA.OUT.ZasunStoper_YV163 AND SC_P4_FunkcnyTestA.Step = 561)) AND NOT P3_LeakageTestB.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P3_LeakageTestB.OUT.ZasunStoper_YV135:= TRUE;
                P3_LeakageTestB.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 561;
            END_IF	
		
		
        561:
            SC_P3_LeakageTestB.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper funkcneho testu A';
            SC_P3_LeakageTestB.IdleTime.PT:= T#200ms;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#10s;
		
            SC_P3_LeakageTestB.IdleTime.IN:= NOT P3_LeakageTestB.IN.PritomnostPaletky_S24;
            SC_P3_LeakageTestB.AlarmTime.IN:= P3_LeakageTestB.IN.PritomnostPaletky_S24;
            
            IF NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                P3_LeakageTestB.OUT.ZasunStoper_YV135:= FALSE;
                TestovaciKus:= FALSE;
                OpakovanyTest:= FALSE;
                PocetOpakovaniTestu:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.LeakageTest.CasPlnenia.StanicaB:= '';
                Reports.LeakageTest.VyslednyReport.StanicaB:= '';
                Reports.LeakageTest.CasStabilizacie.StanicaB:= '';
                Reports.LeakageTest.TlakPlnenia.StanicaB:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MIN.StanicaB:= '';
                Reports.LeakageTest.ToleranciaPritlaku_MAX.StanicaB:= '';
                Reports.LeakageTest.TlakPritlaku.StanicaB:= '';
                Reports.LeakageTest.TlakUniku.StanicaB:= '';
                Reports.LeakageTest.Tolerancia.StanicaB:= '';
            END_IF    
            
            IF SC_P3_LeakageTestB.IdleTime.Q AND NOT P3_LeakageTestB.OUT.ZasunStoper_YV135 THEN
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 100;
            ELSIF SC_P3_LeakageTestB.AlarmTime.Q THEN
                P34_Alarmy[358]:= TRUE;
                P3_Pracovisko.KoniecCyklu:= TRUE;
                SC_P3_LeakageTestB.ResetStep:= TRUE;
                SC_P3_LeakageTestB.Step:= 0;
            END_IF	
					
		
			
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P3_LeakageTestB.StepName:='700 - Manualny Rezim';
            SC_P3_LeakageTestB.IdleTime.PT:= T#8s;
            SC_P3_LeakageTestB.AlarmTime.PT:= T#5s;
		
            P3_LeakageTestB.OUT.PneuZamok_ODOMKNI_YV160:= TRUE;
		
	
            //Vysunutie spodného kopita//
            IF P3_LeakageTestB.RR_VysunSpodneKopito THEN
                P3_LeakageTestB.OUT.Kopito_ZASUN_YV146:= FALSE;
                P3_LeakageTestB.OUT.Kopito_VYSUN_YV145:= TRUE;
            ELSE    
                P3_LeakageTestB.OUT.Kopito_VYSUN_YV145:= FALSE;
                P3_LeakageTestB.OUT.Kopito_ZASUN_YV146:= TRUE;
            END_IF
        
            //Spustenie testovacej sekvencie//
            P3_LeakageTestB.STAV.TestovaciaSekvencia_BUSY:= P3_LeakageTestB.RR_TestovaciaSekvencia;
            
            IF P3_LeakageTestB.RR_TestovaciaSekvencia THEN
                IF P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
                    SC_P3_LeakageTestB.ResetStep:= TRUE;
                    SC_P3_LeakageTestB.Step:= 118;
                ELSE    
                    P3_LeakageTestB.RR_TestovaciaSekvencia:= FALSE;
                END_IF  
            END_IF   
        
        
        
        
        
        
	
    END_CASE
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


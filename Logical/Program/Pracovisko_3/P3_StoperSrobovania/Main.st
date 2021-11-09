
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
   
END_PROGRAM

PROGRAM _CYCLIC
	
   		
		
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P3_StoperSrobovania);
	
    //Volanie podprogramov//
    IOLinkKomunikacia;
    OvlCentrovacky;
	

    //Zapnutie osvetlenia kamery KAM13//
    IF P3_StoperSrobovania.Automat THEN
        P3_Pracovisko.OUT.Osvetlenie_CAM13:= TRUE;
    ELSE
        P3_Pracovisko.OUT.Osvetlenie_CAM13:= FALSE;
    END_IF    
    
    //Ukonèenie odosielania fotiek na server//
    IF FTP_CAM13.CMD.OdosliFotku THEN
        IF FTP_CAM13.STATUS.KomunikaciaUkoncena THEN
            FTP_CAM13.CMD.OdosliFotku:= FALSE;
            Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
        ELSIF FTP_CAM13.STATUS.KomunikaciaError THEN
            P34_Alarmy[323]:= TRUE;
            P3_PoruchaST1:= TRUE;
        END_IF	
    END_IF
	
	
    //Reset sekcie //
    IF P3_StoperSrobovania.Reset THEN
        SC_P3_StoperSrobovania.Step:= 0;
        P3_StoperSrobovania.Reset:= FALSE;
    END_IF
	
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_StoperSrobovania.Automat THEN
        SC_P3_StoperSrobovania.Step:= 0;
    END_IF 
    
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT Triger_0  THEN  
        Triger_0:= TRUE;
        IF P3_StoperSrobovania.IN.PritomnostPaletky_S22 AND P3_StoperSrobovania.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                UkoncenieCykluBezOdparkovania:= TRUE;
                P3_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                UkoncenieCykluBezOdparkovania:= TRUE;
                P3_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 550;
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF
    
    
    
    
    
    
    //Porucha stanice//
    IF P3_PoruchaST1 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P3_StoperSrobovania.IN.PritomnostPaletky_S22 AND P3_StoperSrobovania.Automat THEN
            SC_P3_Srobovanie.Step:= 0;
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                UkoncenieCykluBezOdparkovania:= TRUE;
                P3_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN    
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                UkoncenieCykluBezOdparkovania:= TRUE;
                P3_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 550;
            END_IF
        ELSE
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 0;
        END_IF    
    END_IF   
    
    IF NOT P3_PoruchaST1 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
	
    CASE SC_P3_StoperSrobovania.Step OF 
	
        0:
            SC_P3_StoperSrobovania.StepName:='0 - Nulovanie';
            P3_StoperSrobovania.Automat:= FALSE;
            P3_StoperSrobovania.KoniecCyklu:= FALSE;
            P3_StoperSrobovania.Manual:= FALSE;
            P3_StoperSrobovania.STAV.PoINIT:= FALSE;
            P3_StoperSrobovania.OUT.ZasunStoper_YV132:= FALSE;
            P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky:= FALSE;
            P3_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutku:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Presun_PozFotenia:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= FALSE;
            P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
            P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
            P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
            P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= FALSE;
            CAM13.CMD.Triger:= FALSE;
            CAM13.STAV.Results_READY:= FALSE;
            FTP_CAM13.CMD.OdosliFotku:= FALSE;
            FTP_CAM13.CMD.VymazFotku:= FALSE;
            P3_StoperSrobovania.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P3_StoperSrobovania.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P3_Srobovanie_ST7.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P3_Srobovanie_ST7.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= FALSE;
            PrecitaneCisloPaletky:= '';
            PocetDopytovNaServer:= 0;
            Taktime_Srobovanie_ST7.CMD.START_Merania_1:= FALSE;
            Taktime_Srobovanie_ST7.CMD.START_Merania_2:= FALSE;
            P3_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P3_Srobov_KAM_Result_Ignoruj:= FALSE;
            P3_Srobov_CakaNaKameru:= FALSE;
            P3_StoperSrobovania.STAV.Porucha:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            RevorkTestu:= FALSE;
            SkrutkaM5_Zahodena:= FALSE;
            UkoncenieCykluBezOdparkovania:= FALSE;
            CisloFotky:= 0;
            P34_Vizu.ZobrazHL1_ST7:= FALSE;
            TRCB_P3_Srobov_OpatovnyDopyt:= FALSE;
            TRCB_P3_Srobov_PaletkaNG:= FALSE;
            VysunutieSkrutkovacky_OK:= FALSE;
            PocetTrigrovKamery:= 0;
            
            
            IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA  AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 1;
            END_IF
	
        1:
            SC_P3_StoperSrobovania.StepName:='1 - Cakam na spustenie vyroby';
            P3_StoperSrobovania.KoniecCyklu:= FALSE;
            IF P3_StoperSrobovania.Automat THEN
                SC_P3_StoperSrobovania.Step:= 2;
            ELSIF P3_StoperSrobovania.Manual THEN
                SC_P3_StoperSrobovania.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
        2:
            SC_P3_StoperSrobovania.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
									
            IF P3_Srobovanie.STAV.PoINIT THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 3;
            END_IF
		
			
        3:
            SC_P3_StoperSrobovania.StepName:='3 - Inicializacia - vymazanie adresara kamery';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                FTP_CAM13.CMD.VymazFotku:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM13.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM13.CMD.VymazFotku:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 5;
            ELSIF FTP_CAM13.STATUS.KomunikaciaError THEN
                P34_Alarmy[320]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF		
			
		
        5:
            SC_P3_StoperSrobovania.StepName:='5 - Inicializacia - zasunutie centrovacky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P3_StoperSrobovania.IN.Centrovanie_ZASUNUTE_MS42 AND P3_Dopravniky.STAV.PoINIT THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 8;
            END_IF		
		
			
        8:
            SC_P3_StoperSrobovania.StepName:='8 - Inicializacia - kontrola kontaktov HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' AND P3_Srobovanie.IN.HVTest_TypKonektoru_4F THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 10;
            ELSIF Linka.PAR.ZvolenyModel = '5F' AND P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 10; 	
            ELSIF Linka.PAR.ZvolenyModel = '5H'AND P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 10;  
            ELSE
                P34_Alarmy[326]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF
			
			
        10:
            SC_P3_StoperSrobovania.StepName:='10 - Inicializacia - hladanie paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
	
            IF P3_StoperSrobovania.IN.PritomnostPaletky_S22 THEN
                P3_VstupnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 20;		
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 100;
            END_IF
	
			
        20:
            SC_P3_StoperSrobovania.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
		
            IF SC_P3_StoperSrobovania.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P3_StoperSrobovania.IN.PrecitaneCisloPaletky_S22);
                i:= 0;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 23;
            END_IF	
	
	
        23:
            SC_P3_StoperSrobovania.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[321]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 30;//
            END_IF	
			
		
        30:
            SC_P3_StoperSrobovania.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_7' THEN
                TestovaciKus:= TRUE;
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 118;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_7' THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_7_HV' THEN  
                RevorkTestu:= TRUE;
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 118; 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_7' THEN  
                Revork:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 33;     
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_7' THEN
                Revork:= FALSE;
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            END_IF	
            
            
        33:
            SC_P3_StoperSrobovania.StepName:='33 - Inicializacia - kontrola ukoncenia HV testu'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.HV_Test_Ukonceny THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 545;
            ELSE
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 35;
            END_IF	
			
        35:
            SC_P3_StoperSrobovania.StepName:='35 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 168;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 288;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 388;
                END_IF	
            ELSE
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 38;
            END_IF
			
        38:
            SC_P3_StoperSrobovania.StepName:='38 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 40;
            ELSE
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 100;
            END_IF
			
		
        40:
            SC_P3_StoperSrobovania.StepName:='40 - Inicializacia - kontrola odoslania fotiek';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 160;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 280;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 380;
                END_IF
            ELSE
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 43;
            END_IF
            
        43:
            SC_P3_StoperSrobovania.StepName:='43 - Inicializacia - zacentrovanie paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P3_StoperSrobovania.IN.Centrovanie_VYSUNUTE_MS43 THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 45;
            END_IF	
            
        45:
            SC_P3_StoperSrobovania.StepName:='45 - Inicializacia - presun manipulatora vzad';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM13.STAV.Results_READY:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 48;
            END_IF 
            
        48:
            SC_P3_StoperSrobovania.StepName:='48 - Inicializacia - kamerova kontrola paletky'; //CAM 13//
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND CAM13.STAV.Command_READY THEN
                CAM13.CMD.Triger:= TRUE;
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM13.STAV.Results_READY AND CAM13.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM13.STAV.Results_READY:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 53;
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM13.STAV.Results_READY:= FALSE;
                CAM13.CMD.Triger:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 50;
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[359]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF
		
                       
            
            
            
        50:
            SC_P3_StoperSrobovania.StepName:='50 - Inicializacia - cakam na opatovny triger kamery';//CAM 13//
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P3_StoperSrobovania.IdleTime.Q THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 48;
            END_IF	
			
			
			   
        53:
            SC_P3_StoperSrobovania.StepName:='53 - Inicializacia - kontrola vysledku kamery podla typu modelu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
			
            IF NOT CAM13.STAV.BUSY THEN
                CAM13.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF NOT CAM13.RESULT.Pritomn_SkrutkyK40_TopCover_4F5F AND
                        NOT CAM13.RESULT.Pritomn_SkrutkyM5_TopCover THEN
                        CAM13.PAR.ResultFotky:= 'PASS';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    ELSE
                        CAM13.PAR.ResultFotky:= 'FAIL';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    END_IF 
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF NOT CAM13.RESULT.Pritomn_SkrutkyK40_TopCover_4F5F AND
                        NOT CAM13.RESULT.Pritomn_SkrutkyM5_TopCover THEN
                        CAM13.PAR.ResultFotky:= 'PASS';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    ELSE
                        CAM13.PAR.ResultFotky:= 'FAIL';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF NOT CAM13.RESULT.Pritomn_SkrutkyM5_TopCover THEN
                        CAM13.PAR.ResultFotky:= 'PASS';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    ELSE
                        CAM13.PAR.ResultFotky:= 'FAIL';
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 55;
                    END_IF	
                END_IF
            END_IF   
            
        55:
            SC_P3_StoperSrobovania.StepName:='55 - Inicializacia - vymazanie adresara kamery';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                FTP_CAM13.CMD.VymazFotku:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM13.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM13.CMD.VymazFotku:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 58;
            ELSIF FTP_CAM13.STATUS.KomunikaciaError THEN
                P34_Alarmy[320]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF	
            
            
        58:
            SC_P3_StoperSrobovania.StepName:='58 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            	
				
            IF CAM13.PAR.ResultFotky = 'PASS' THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 130;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 250;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 350;  
                END_IF    
            ELSIF CAM13.PAR.ResultFotky = 'FAIL' THEN
                P3_StoperSrobovania.STAV.PoINIT:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 545;
            END_IF
            
            
            
            
            
            
			
		
            //********************************************************Automatický režim****************************************************************************//
        100:
            SC_P3_StoperSrobovania.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            SC_P3_StoperSrobovania.AlarmTime.IN:= P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29;
		
            IF P3_StoperSrobovania.IN.PritomnostPaletky_S22 THEN
                P3_VstupnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
                
            SC_P3_StoperSrobovania.IdleTime.IN:= P3_StoperSrobovania.IN.PritomnostPaletky_S22;
			
            IF EDGEPOS(P3_StoperSrobovania.IN.PritomnostPaletky_S22)THEN
                IF NOT Taktime_Srobovanie_ST7.CMD.START_Merania_1 THEN
                    Taktime_Srobovanie_ST7.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Srobovanie_ST7.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            
            IF P3_StoperSrobovania.KoniecCyklu THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 600;
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q THEN
                SkrutkaM5_Zahodena:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 102;
            END_IF
	
            
        101:
            SC_P3_StoperSrobovania.StepName:='101 - Automaticky Rezim - zahodenie skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF    
            
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SkrutkaM5_Zahodena:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 100;
            END_IF
            
            
		
        102:
            SC_P3_StoperSrobovania.StepName:='102 - Automaticky Rezim - precitanie cisla paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
		            
               
            PrecitaneCisloPaletky:= USINT_TO_STRING(P3_StoperSrobovania.IN.PrecitaneCisloPaletky_S22);
            i:= 0;
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 103;
          
	
	
        103:
            SC_P3_StoperSrobovania.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[321]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P3_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P3_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 104;
            END_IF	
		
					
			
        104:
            SC_P3_StoperSrobovania.StepName:='104 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_7' THEN
                TestovaciKus:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 118;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_7' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_7_HV' THEN  
                RevorkTestu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 118; 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_7' THEN  
                Revork:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 108;       
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_7' THEN
                Revork:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            END_IF		
					
            		
		
				
        108:
            SC_P3_StoperSrobovania.StepName:='108 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1M;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;	
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                TRCB_P3_Srobovanie_ST7.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_Srobovanie_ST7.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 110;
            ELSIF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaError THEN	
                TRCB_P3_Srobovanie_ST7.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 115;
            END_IF	
			
			
			
						
			
		
			
        110:
            SC_P3_StoperSrobovania.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena AND P3_StoperSrobovania.IN.Centrovanie_VYSUNUTE_MS43 THEN
                IF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P3_Srobovanie_ST7.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST7' THEN
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 118;
                    END_IF    
                ELSIF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 115;
                END_IF	
            END_IF
			
        115:
            SC_P3_StoperSrobovania.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;	
             
            
            P34_Vizu.ZobrazHL1_ST7:= TRUE;
            
            IF TRCB_P3_Srobov_OpatovnyDopyt THEN
                TRCB_P3_Srobov_OpatovnyDopyt:= FALSE; 
                P34_Vizu.ZobrazHL1_ST7:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 108;
            ELSIF TRCB_P3_Srobov_PaletkaNG THEN
                TRCB_P3_Srobov_PaletkaNG:= FALSE;
                P34_Vizu.ZobrazHL1_ST7:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 116;
            END_IF   
            
            
            
            
            
	
        116:
            SC_P3_StoperSrobovania.StepName:='118 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#10s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
				
            IF P3_StoperSrobovania.IN.Centrovanie_ZASUNUTE_MS42 THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 560;
            END_IF    
          		
         
        118:
            SC_P3_StoperSrobovania.StepName:='118 - Automaticky Rezim - zacentrovanie paletky ';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#10s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
				
            IF P3_StoperSrobovania.IN.Centrovanie_VYSUNUTE_MS43 THEN
                IF TestovaciKus THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 128;
                ELSIF RevorkTestu THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 128;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 125;
                END_IF    
            END_IF       
            
            
            
            
			
			
        125:
            SC_P3_StoperSrobovania.StepName:='125 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            SC_P3_StoperSrobovania.IdleTime.IN:= NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29;
            
                      
            IF P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 130;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 250;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 350; 
                END_IF
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 126;
            END_IF
           
		
        126:
            SC_P3_StoperSrobovania.StepName:='126 - Automaticky Rezim - odobratie skrutky M5 z podavaca';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
                         
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF    
            
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 125;
            END_IF
            
            
            
            
            
        128:
            SC_P3_StoperSrobovania.StepName:='128 - Automaticky Rezim - testovací kus rozhodnutie podla typu modelu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 168;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 288;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 388;
            END_IF
            
            
            
            
            
            
            
            //********************************************Model 4F**************************************************************//
		     			
        130:
            SC_P3_StoperSrobovania.StepName:='130 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj skrutky K40 A M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P3_StoperSrobovania.Switch1  THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                IF P3_StoperSrobovania.STAV.Porucha THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 600;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 140;
                END_IF	
            END_IF
			
        140:
            SC_P3_StoperSrobovania.StepName:='140 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania skrutiek K40 a M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                      
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_DosiahnutyUhol);
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyUhol);
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Skrutk_4F_StredK40_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaK40);
                P3_Skrutk_4F_StredM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5);
                IF (P3_Skrutk_4F_StredK40_Vysunutie <= P34_RemPremenne.P3_Srob4F_K40_Vysunutie_HI) AND
                    (P3_Skrutk_4F_StredK40_Vysunutie >= P34_RemPremenne.P3_Srob4F_K40_Vysunutie_LO) AND
                    (P3_Skrutk_4F_StredM5_Vysunutie <= P34_RemPremenne.P3_Srob4F_M5_Vysunutie_HI) AND
                    (P3_Skrutk_4F_StredM5_Vysunutie >= P34_RemPremenne.P3_Srob4F_M5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF 
              
            
            
            
            IF P3_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'PASS';
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 160;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                    IF P3_Srobov_K40_Result_OFF THEN
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 160;	
                    ELSE 	
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 500;
                    END_IF    
                END_IF 
            ELSIF P3_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN  
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                IF P3_Srobov_K40_Result_OFF THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 160;	
                ELSE 	
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 500;
                END_IF    
            END_IF
		
         
		
                       
            
			
        160:
            SC_P3_StoperSrobovania.StepName:='160 - Automaticky Rezim - model 4F odoslanie stavu paletky na server, zatvorenie HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= TRUE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena AND P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= FALSE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 163;
            ELSIF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaError THEN	
                //                P34_Alarmy[325]:= TRUE;
                //                P3_PoruchaST1:= TRUE;
            END_IF
			
			
        163:
            SC_P3_StoperSrobovania.StepName:='163 - Automaticky Rezim - model 4F kontrola odpovede servera';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN 
                IF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 164;
                ELSIF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 164;
                END_IF	
            END_IF
		
        164:
            SC_P3_StoperSrobovania.StepName:='164 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 170;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 166;
            END_IF    
            
       
        166:
            SC_P3_StoperSrobovania.StepName:='166 - Automaticky Rezim - model 4F otvorenie HV testu po odpovedi servera paletka NG';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
                       
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 545;
            END_IF  
            
            
		
        168:
            SC_P3_StoperSrobovania.StepName:='168 - Automaticky Rezim - model 4F zatvorenie HV Testu pre testovaci kus ';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 170;
            END_IF    
		   
                   
            
        170:
            SC_P3_StoperSrobovania.StepName:='170 - Automaticky Rezim - model 4F vystavenie signalu spusti HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1M;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= '';
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.STAV.HV_Test_Ukonceny THEN
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 172;
            END_IF
		
        172:
            SC_P3_StoperSrobovania.StepName:='172 - Automaticky Rezim - model 4F vystavenie signalu otvor HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF NOT P3_Srobovanie.IN.HVTest_VYSUNUTY_MS50 THEN
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
            END_IF     
            
            IF EDGEPOS(SC_P3_StoperSrobovania.IdleTime.Q) THEN
                Centrovacku_ZASUN:= TRUE;
            END_IF    
            
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                IF TestovaciKus THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 545;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 173;
                END_IF    
            END_IF  
            
            
            
        173:	
            SC_P3_StoperSrobovania.StepName:='173 - Automaticky Rezim - model 4F kontrola vysledku HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'OK' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 175;
            ELSIF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'NG' THEN	
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 175;
            END_IF
		
        175:
            SC_P3_StoperSrobovania.StepName:='175 - Automaticky Rezim - model 4F odobratie skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= TRUE;
            END_IF    
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 545;
            
		
			
            //********************************************Model 5F**************************************************************//
				
        250:
            SC_P3_StoperSrobovania.StepName:='250 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj skrutky K40 A M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P3_StoperSrobovania.Switch1  THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                IF P3_StoperSrobovania.STAV.Porucha THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 600;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 260;
                END_IF	
            END_IF
			
            
              
            
            
            
        260:
            SC_P3_StoperSrobovania.StepName:='260 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania skrutiek K40 a M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		          
            
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.STAV.K40_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaK40:= UDINT_TO_STRING(P3_Srobovanie.STAV.K40_DosiahnutyUhol);
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyUhol); 
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Skrutk_5F_StredK40_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaK40);
                P3_Skrutk_5F_StredM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5);
                IF (P3_Skrutk_5F_StredK40_Vysunutie <= P34_RemPremenne.P3_Srob5F_K40_Vysunutie_HI) AND
                    (P3_Skrutk_5F_StredK40_Vysunutie >= P34_RemPremenne.P3_Srob5F_K40_Vysunutie_LO) AND
                    (P3_Skrutk_5F_StredM5_Vysunutie <= P34_RemPremenne.P3_Srob5F_M5_Vysunutie_HI) AND
                    (P3_Skrutk_5F_StredM5_Vysunutie >= P34_RemPremenne.P3_Srob5F_M5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF 
            
            
            
            IF P3_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'PASS';
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 280;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                    IF P3_Srobov_K40_Result_OFF THEN
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 280;	
                    ELSE
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 500;
                    END_IF    
                END_IF
            ELSIF P3_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                IF P3_Srobov_K40_Result_OFF THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 280;	
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 500;
                END_IF    
            END_IF
            
       		
            
            
        280:
            SC_P3_StoperSrobovania.StepName:='280 - Automaticky Rezim - model 5F odoslanie stavu paletky na server, zatvorenie HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= TRUE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena AND P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= FALSE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 283;
            ELSIF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaError THEN	
                //                P34_Alarmy[325]:= TRUE;
                //                P3_PoruchaST1:= TRUE;
            END_IF
			
			
        283:
            SC_P3_StoperSrobovania.StepName:='283 - Automaticky Rezim - model 5F kontrola odpovede servera';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 284;
                ELSIF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 284;
                END_IF		
            END_IF
		
            
        284:
            SC_P3_StoperSrobovania.StepName:='284 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 290;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 286;
            END_IF    
            
        286:
            SC_P3_StoperSrobovania.StepName:='286 - Automaticky Rezim - model 5F vystavenie signalu otvor HV test po odpovedi servera paletka NG';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
                      
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 545;
            END_IF  
            
      
		
            
        288:
            SC_P3_StoperSrobovania.StepName:='288 - Automaticky Rezim - model 5F zatvorenie HV Testu pre testovaci kus ';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 290;
            END_IF        
            
			
		
        290:
            SC_P3_StoperSrobovania.StepName:='290 - Automaticky Rezim - model 5F vystavenie signalu spusti HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1M;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
						
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= '';
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.STAV.HV_Test_Ukonceny THEN
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 292;
            END_IF
	
		
        292:
            SC_P3_StoperSrobovania.StepName:='292 - Automaticky Rezim - model 5F vystavenie signalu otvor HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF NOT P3_Srobovanie.IN.HVTest_VYSUNUTY_MS50 THEN
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
            END_IF     
            
            IF EDGEPOS(SC_P3_StoperSrobovania.IdleTime.Q) THEN
                Centrovacku_ZASUN:= TRUE;
            END_IF    
            
            
            
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                IF TestovaciKus THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 545;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 293;
                END_IF    
            END_IF  
            
            
            
			
        293:	
            SC_P3_StoperSrobovania.StepName:='293 - Automaticky Rezim - model 5F kontrola vysledku HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'OK' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 295;
            ELSIF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'NG' THEN	
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 295;
            END_IF
		
        295:
            SC_P3_StoperSrobovania.StepName:='295 - Automaticky Rezim - model 5F odobratie skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= TRUE;
            END_IF    
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 545;
			
			
            //********************************************Model 5H**************************************************************//
				
        		
        350:	
            SC_P3_StoperSrobovania.StepName:='350 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj skrutku M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P3_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutku:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutku:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                IF P3_StoperSrobovania.STAV.Porucha THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 600;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 360;
                END_IF	
            END_IF	
	            
            
            
        360:
            SC_P3_StoperSrobovania.StepName:='360 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
                      
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaM5:= UDINT_TO_STRING(P3_Srobovanie.STAV.M5_DosiahnutyUhol);
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Skrutk_5H_StredM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5);
                IF (P3_Skrutk_5H_StredM5_Vysunutie <= P34_RemPremenne.P3_Srob5H_M5_Vysunutie_HI) AND
                    (P3_Skrutk_5H_StredM5_Vysunutie >= P34_RemPremenne.P3_Srob5H_M5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            IF P3_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 380;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                    IF P3_Srobov_M5_Result_OFF THEN
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 380;	
                    ELSE	
                        SC_P3_StoperSrobovania.ResetStep:= TRUE;
                        SC_P3_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P3_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                IF P3_Srobov_M5_Result_OFF THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 380;	
                ELSE	
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
                
                        
          
			
        380:
            SC_P3_StoperSrobovania.StepName:='380 - Automaticky Rezim - model 5H odoslanie stavu paletky na server, zatvorenie HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= TRUE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena AND P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= FALSE;
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 383;
            ELSIF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaError THEN	
                //                P34_Alarmy[325]:= TRUE;
                //                P3_PoruchaST1:= TRUE;
            END_IF
			
			
        383:
            SC_P3_StoperSrobovania.StepName:='383 - Automaticky Rezim - model 5H kontrola odpovede servera';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 384;
                ELSIF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 384;
                END_IF		
            END_IF
		
            
        384:
            SC_P3_StoperSrobovania.StepName:='384 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 390;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 386;
            END_IF    
            
        386:
            SC_P3_StoperSrobovania.StepName:='386 - Automaticky Rezim - model 5H vystavenie signalu otvor HV test po odpovedi servera paletka NG';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
                       
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 545;
            END_IF  
        
          
            
        388:
            SC_P3_StoperSrobovania.StepName:='388 - Automaticky Rezim - model 5H zatvorenie HV Testu pre testovaci kus ';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF P3_Srobovanie.STAV.HV_Test_Zatvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 390;
            END_IF         
            
            
            
        390:
            SC_P3_StoperSrobovania.StepName:='390 - Automaticky Rezim - model 5H vystavenie signalu spusti HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1M;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= '';
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.STAV.HV_Test_Ukonceny THEN
                P3_StoperSrobovania.OUT.KOM_Urob_HV_Test:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 392;
            END_IF
		
       	
		
        392:
            SC_P3_StoperSrobovania.StepName:='392 - Automaticky Rezim - model 5H vystavenie signalu otvor HV test';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#100ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            IF NOT P3_Srobovanie.IN.HVTest_VYSUNUTY_MS50 THEN
                SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
            END_IF     
            
            IF EDGEPOS(SC_P3_StoperSrobovania.IdleTime.Q) THEN
                Centrovacku_ZASUN:= TRUE;
            END_IF   
            
            
            IF P3_Srobovanie.STAV.HV_Test_Otvoreny THEN
                P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test:= FALSE;
                IF TestovaciKus THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 545;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 393;
                END_IF    
            END_IF  
              
             
			
        393:	
            SC_P3_StoperSrobovania.StepName:='393 - Automaticky Rezim - model 5H kontrola vysledku HV testu';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'OK' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 395;
            ELSIF P3_Srobovanie.STAV.Vysledok_HV_Testu = 'NG' THEN	
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 395;
            END_IF
		
        395:
            SC_P3_StoperSrobovania.StepName:='395 - Automaticky Rezim - model 5H odobratie skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= TRUE;
            END_IF    
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 545;
            
			
			
			
		
		
		
		
            //Vyfotenie paletky po zlom skrutkovaní//			
			
			
			
        500:
            SC_P3_StoperSrobovania.StepName:='500 - Automaticky Rezim - presun manipulatora vzad';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
			Paletka[i].PAR.StavPaletky:= 'NG';
			
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                CAM13.STAV.Results_READY:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 505;
            END_IF
		
			
	
			
			
			
        505:
            SC_P3_StoperSrobovania.StepName:='505 - Automaticky Rezim - kamerova kontrola paletky CAM13';//CAM 13//
            SC_P3_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF NOT SC_P3_StoperSrobovania.Switch1 AND CAM13.STAV.Command_READY THEN
                CAM13.CMD.Triger:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
			
            IF CAM13.STAV.Results_READY AND CAM13.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM13.STAV.Results_READY:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                CAM13.PAR.ResultFotky:= 'FAIL';
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 540;
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM13.STAV.Results_READY:= FALSE;
                CAM13.CMD.Triger:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 508;
            ELSIF SC_P3_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[359]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF    
           
        508:
            SC_P3_StoperSrobovania.StepName:='508 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 13//
            SC_P3_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P3_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P3_StoperSrobovania.IdleTime.Q THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 505;
            END_IF	   
            
            
            
            
			
					
            //Odoslanie fotiek na server//			
			
			
		
        540:
            SC_P3_StoperSrobovania.StepName:='540 - Automaticky Rezim - odoslanie fotiek na server';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
					
            FTP_CAM13.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
            CisloFotky:= CisloFotky + 1;
            FTP_CAM13.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
            FTP_CAM13.INPUTS.Result:= CAM13.PAR.ResultFotky;
            Reports.Kamery.P3_CAM13_KontrolaPaletky:= CAM13.PAR.ResultFotky;				
			
            
            
            FTP_CAM13.CMD.OdosliFotku:= TRUE;
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 545;
			
		
		
			
        			
			
			
            //Odcentrovanie paletky//				
        545:
            SC_P3_StoperSrobovania.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P3_StoperSrobovania.IN.Centrovanie_ZASUNUTE_MS42 THEN
                IF TestovaciKus THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 560;
                ELSIF RevorkTestu THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 560;
                ELSE
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 550;
                END_IF    
            END_IF	
		
				
            //Odoslanie dát na server//			
		
        550:
            SC_P3_StoperSrobovania.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
			
            IF NOT Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                IF NOT SC_P3_StoperSrobovania.Switch1 THEN
                    TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= TRUE;
                    SC_P3_StoperSrobovania.Switch1:= TRUE;
                END_IF   
            ELSE
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 555;
            END_IF	
			
			
            IF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN
                TRCB_P3_Srobovanie_ST7.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 553;
            ELSIF TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaError THEN
                //                P34_Alarmy[325]:= TRUE;
                //                P3_PoruchaST1:= TRUE;
            END_IF
			
		
        553:
            SC_P3_StoperSrobovania.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT TRCB_P3_Srobovanie_ST7.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 555;
                ELSIF TRCB_P3_Srobovanie_ST7.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 555;
                END_IF	
            END_IF
		
          
        555:
            SC_P3_StoperSrobovania.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P3_StoperSrobovania.ResetStep:= TRUE;
            SC_P3_StoperSrobovania.Step:= 560;
            
            
            
			
			

            //Vyvezenie paletky//			
			
        560:
            SC_P3_StoperSrobovania.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper leakage testu A';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            IF UkoncenieCykluBezOdparkovania THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0; 
            ELSIF P3_StoperSrobovania.KoniecCyklu THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 600;
            ELSIF P3_StoperSrobovania.STAV.Porucha THEN
                Paletka[i].PAR.StavPaletky:= 'NG';
                P3_PoruchaST1:= TRUE;	
            ELSIF ((NOT P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 AND SC_P3_AkumulacnyStoper.Step = 100) OR (P3_AkumulacnyStoper.OUT.ZasunStoper_YV133 AND SC_P3_AkumulacnyStoper.Step = 105)) AND NOT P3_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky THEN
                P3_StoperSrobovania.OUT.ZasunStoper_YV132:= TRUE;
                P3_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 561;
            END_IF	
		
		
        561:
            SC_P3_StoperSrobovania.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper leakage testu A';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#10s;
		
            SC_P3_StoperSrobovania.IdleTime.IN:= NOT P3_StoperSrobovania.IN.PritomnostPaletky_S22;
            SC_P3_StoperSrobovania.AlarmTime.IN:= P3_StoperSrobovania.IN.PritomnostPaletky_S22;
            
            IF NOT P3_StoperSrobovania.IN.PritomnostPaletky_S22 THEN
                TestovaciKus:= FALSE;
                IF RevorkTestu OR Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    RevorkTestu:= FALSE;
                    Revork:= FALSE;
                END_IF
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaK40:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P3_SkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5:= '';
                Reports.Kamery.P3_CAM13_KontrolaPaletky:= '';
            END_IF
            
            IF SC_P3_StoperSrobovania.IdleTime.Q THEN
                P3_StoperSrobovania.OUT.ZasunStoper_YV132:= FALSE;
            END_IF	
            
            IF P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5 THEN
                IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                    P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= FALSE;
                    P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                END_IF
            END_IF    
            
            IF NOT P3_StoperSrobovania.OUT.ZasunStoper_YV132 AND NOT P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5 THEN
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 100;
            ELSIF SC_P3_StoperSrobovania.AlarmTime.Q THEN
                P34_Alarmy[355]:= TRUE;
                P3_Pracovisko.KoniecCyklu:= TRUE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            END_IF
            
            //Odparkovanie manipulátora pri ukonèení výroby// 
            
            
        600:
            SC_P3_StoperSrobovania.StepName:='600 - Automaticky Rezim - zahodenie skrutky M5';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5 THEN
                IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                    P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5:= FALSE;
                    P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                END_IF
            END_IF    
                                    
            
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF    
            
            IF P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5 THEN
                IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                    P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5:= FALSE;
                    P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                    SC_P3_StoperSrobovania.ResetStep:= TRUE;
                    SC_P3_StoperSrobovania.Step:= 603;
                END_IF   
            END_IF
            
			
        603:
            SC_P3_StoperSrobovania.StepName:='603 - Automaticky Rezim - presun manipulatora vzad';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_StoperSrobovania.Switch1 AND SC_P3_Srobovanie.Step = 100 THEN
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P3_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena THEN
                P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_StoperSrobovania.ResetStep:= TRUE;
                SC_P3_StoperSrobovania.Step:= 0;
            END_IF
            
            
					
		
				
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P3_StoperSrobovania.StepName:='700 - Manualny Rezim';
            SC_P3_StoperSrobovania.IdleTime.PT:= T#8s;
            SC_P3_StoperSrobovania.AlarmTime.PT:= T#5s;
		
		
		
		
		
		
		
		
		
		
		
		
	
    END_CASE
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


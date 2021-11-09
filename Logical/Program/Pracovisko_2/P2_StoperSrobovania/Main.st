
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_StoperSrobovania);
	
	
    //Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
	
	
    
    
    
	
    //Reset sekcie //
    IF P2_StoperSrobovania.Reset THEN
        SC_P2_StoperSrobovania.Step:= 0;
        P2_StoperSrobovania.Reset:= FALSE;
    END_IF	
	
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_StoperSrobovania.Automat THEN
        SC_P2_StoperSrobovania.Step:= 0;
    END_IF 
    
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN   
        Triger_0:= TRUE;
        IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND P2_StoperSrobovania.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 550;
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF  
    
    
    
    //Porucha stanice//
    IF P2_PoruchaST3 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND P2_StoperSrobovania.Automat THEN
            SC_P2_Srobovanie.Step:= 0;
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 550;
            END_IF
        ELSE
            SC_P2_StoperSrobovania.ResetStep:= TRUE;
            SC_P2_StoperSrobovania.Step:= 0;
        END_IF    
    END_IF   
	
    
    IF NOT P2_PoruchaST3 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
    
	
    CASE SC_P2_StoperSrobovania.Step OF 
	
        0:
            SC_P2_StoperSrobovania.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            P2_StoperSrobovania.Automat:= FALSE;
            P2_StoperSrobovania.KoniecCyklu:= FALSE;
            P2_StoperSrobovania.Manual:= FALSE;
            P2_StoperSrobovania.STAV.PoINIT:= FALSE;
            P2_StoperSrobovania.OUT.ZasunStoper_YV56:= FALSE;
            P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM4:= FALSE;
            P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM4:= FALSE;
            P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM6:= FALSE;
            P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM6:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM4:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM4:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM6:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM6:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutkuM5:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutkuM5:= FALSE;
            P2_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutkuM4:= FALSE;
            P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
            P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
            P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
            P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
            P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
            P2_Robot.KOM_OUT.Odober_Busbary4F:= FALSE;
            P2_Robot.KOM_OUT.Odober_Busbary5F:= FALSE;
            P2_Robot.KOM_OUT.Odober_Busbary5H:= FALSE;
            P2_Robot.KOM_OUT.Poloz_Busbary4F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_Busbary5F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_Busbary5H:= FALSE;
            P2_Robot.KOM_OUT.Dotlac_Filter5H:= FALSE;
            P2_Robot.KOM_OUT.Odparkovanie:= FALSE;
            P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
            P2_Robot.KOM_OUT.UvolniBusbary:= FALSE;
            P2_Robot.KOM_OUT.Dotlac_Filter5H:= FALSE;
            P2_Robot.KOM_OUT.ZmenaGripra_Cistenie:= FALSE;
            CAM10.CMD.Triger:= FALSE;
            CAM10.STAV.Results_READY:= FALSE;
            FTP_CAM10.CMD.OdosliFotku:= FALSE;
            FTP_CAM10.CMD.VymazFotku:= FALSE;
            P2_StoperSrobovania.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P2_StoperSrobovania.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P2_Srobovanie_ST5.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P2_Srobovanie_ST5.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P2_Srobovanie_ST5.CMD.OdosliStavPaletky_TYP2:= FALSE;
            PrecitaneCisloPaletky:= '';
            P2_Srobov_ManipulaciaUkoncena:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_Srobovanie_ST5.CMD.START_Merania_1:= FALSE;
            Taktime_Srobovanie_ST5.CMD.START_Merania_2:= FALSE;
            P2_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P2_Srobov_KAM_Result_Ignoruj:= FALSE;
            P2_Srobov_CakaNaKameru:= FALSE;
            P2_StoperSrobovania.STAV.Porucha:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= FALSE;
            CisloFotky:= 0;
            P2_Srobov_KAM_Result_OK:= FALSE;
            P2_Srobov_KAM_Result_NG:= FALSE;
            P2_Vizu.ZobrazHL1_ST5:= FALSE;
            P2_Vizu.ZobrazHL2_ST5:= FALSE;
            P2_Vizu.ZobrazHL3_ST5:= FALSE;
            P2_Vizu.ZobrazHL4_ST5:= FALSE;
            TRCB_P2_Srobov_OpatovnyDopyt:= FALSE;
            TRCB_P2_Srobov_PaletkaNG:= FALSE;
            VysunutieSkrutkovacky_OK:= FALSE;
            PocetTrigrovKamery:= 0;
            DoskrutkovaniePriPoruche:= FALSE;
			
            IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 1;
            END_IF
	
        1:
            SC_P2_StoperSrobovania.StepName:='1 - Cakam na spustenie vyroby';
            P2_StoperSrobovania.KoniecCyklu:= FALSE;
            IF P2_StoperSrobovania.Automat THEN
                SC_P2_StoperSrobovania.Step:= 2;
            ELSIF P2_StoperSrobovania.Manual THEN
                SC_P2_StoperSrobovania.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//
	
	
        2:
            SC_P2_StoperSrobovania.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
			
									
            IF P2_Srobovanie.STAV.PoINIT AND P2_Srobovacky_VychodziaPozicia THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 3;
            END_IF
		
			
        3:
            SC_P2_StoperSrobovania.StepName:='3 - Inicializacia - vymazanie adresara kamery';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                FTP_CAM10.CMD.VymazFotku:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM10.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM10.CMD.VymazFotku:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 5;
            ELSIF FTP_CAM10.STATUS.KomunikaciaError THEN
                P2_Alarmy[232]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF	
			
			
		
        5:
            SC_P2_StoperSrobovania.StepName:='5 - Inicializacia - kontrola pozicie robota';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 10;
            END_IF	
			
		
			
        10:
            SC_P2_StoperSrobovania.StepName:='10 - Inicializacia - zasunutie centrovacky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperSrobovania.IN.Centrovanie_ZASUNUTE_IS15 AND P2_Dopravniky.STAV.PoINIT THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 13;
            END_IF		
			
			
		
        13:
            SC_P2_StoperSrobovania.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
	
            IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                P2_StoperMaticovacky.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 20;		
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q THEN
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 100;
            END_IF
		
		
        20:
            SC_P2_StoperSrobovania.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
		
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperSrobovania.IN.PrecitaneCisloPaletky_S8);
                i:= 0;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 23;
            END_IF	
			
        23:
            SC_P2_StoperSrobovania.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[214]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 30;
            END_IF	
			
	
			
        30:
            SC_P2_StoperSrobovania.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_5' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_5' THEN  
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_5' THEN
                Revork:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 33;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_5' THEN
                Revork:= FALSE;
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            END_IF	
            
                      
            
            
        33:
            SC_P2_StoperSrobovania.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            ELSE
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 35;
            END_IF	
					
        35:
            SC_P2_StoperSrobovania.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 38;
            ELSE
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 100;
            END_IF	
			
        38:
            SC_P2_StoperSrobovania.StepName:='38 - Inicializacia - kontrola odoslania fotiek';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 550;
            ELSE
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 40;
            END_IF
            
            
        40:
            SC_P2_StoperSrobovania.StepName:='40 - Inicializacia - zacentrovanie paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperSrobovania.IN.Centrovanie_VYSUNUTE_IS14 THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 43;
            END_IF	   
            
            
        43:
            SC_P2_StoperSrobovania.StepName:='43 - Inicializacia - presun manipulatora vzad';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 45;
            END_IF   
            
            
        45:
            SC_P2_StoperSrobovania.StepName:='45 - Inicializacia - kamerova kontrola paletky'; //CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
           			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND CAM10.STAV.Command_READY THEN
                CAM10.CMD.Triger:= TRUE;
                SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM10.STAV.Results_READY AND CAM10.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 50;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM10.STAV.Results_READY:= FALSE;
                CAM10.CMD.Triger:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 48;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[295]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
		
                     
            
            
        48:
            SC_P2_StoperSrobovania.StepName:='48 - Inicializacia - cakam na opatovny triger kamery';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 45;
            END_IF	
			
			
			   
        50:
            SC_P2_StoperSrobovania.StepName:='50 - Inicializacia - kontrola vysledku kamery podla typu modelu';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
			
            IF NOT CAM10.STAV.BUSY THEN
                CAM10.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM10.RESULT.Paletka.Pritomn_Busbarov_4F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_LavejM4_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_LavejSkrutkyM6_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_PravejM4_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_PravejSkrutkyM6_4F5F THEN
                        CAM10.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    ELSE
                        CAM10.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM10.RESULT.Paletka.Pritomn_Busbarov_5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_LavejM4_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_LavejSkrutkyM6_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_PravejM4_4F5F AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_PravejSkrutkyM6_4F5F THEN
                        CAM10.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    ELSE
                        CAM10.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM10.RESULT.Paletka.Pritomn_Busbarov_5H AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_LavejSkrutkyM5_5H AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_PravejSkrutkyM5_5H AND
                        NOT CAM10.RESULT.PowerCP.Pritomn_SkrutkyM4_Filtra_5H THEN
                        CAM10.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    ELSE
                        CAM10.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 53;
                    END_IF  
                END_IF   
            END_IF
			
			
        53:
            SC_P2_StoperSrobovania.StepName:='53 - Inicializacia - vymazanie adresara kamery';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                FTP_CAM10.CMD.VymazFotku:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM10.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM10.CMD.VymazFotku:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 55;
            ELSIF FTP_CAM10.STATUS.KomunikaciaError THEN
                P2_Alarmy[232]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF	
            
            
        55:
            SC_P2_StoperSrobovania.StepName:='55 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            	
				
            IF CAM10.PAR.ResultFotky = 'PASS' THEN
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 138;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 258;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 358;  
                END_IF    
            ELSIF CAM10.PAR.ResultFotky = 'FAIL' THEN
                P2_StoperSrobovania.STAV.PoINIT:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 545;
            END_IF
            
               
            
			
					
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P2_StoperSrobovania.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= TRUE;
                P2_StoperMaticovacky.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF    
                
            SC_P2_StoperSrobovania.IdleTime.IN:= P2_StoperSrobovania.IN.PritomnostPaletky_S8;
			
            IF EDGEPOS(P2_StoperSrobovania.IN.PritomnostPaletky_S8)THEN
                IF NOT Taktime_Srobovanie_ST5.CMD.START_Merania_1 THEN
                    Taktime_Srobovanie_ST5.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Srobovanie_ST5.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            
            
            IF P2_StoperSrobovania.KoniecCyklu THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 101;
            END_IF
		
        101:
            SC_P2_StoperSrobovania.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
                         
            PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperSrobovania.IN.PrecitaneCisloPaletky_S8);
            i:= 0;
            SC_P2_StoperSrobovania.ResetStep:= TRUE;
            SC_P2_StoperSrobovania.Step:= 103;
           
			
        103:
            SC_P2_StoperSrobovania.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[214]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 104;
            END_IF	
		
			
        104:
            SC_P2_StoperSrobovania.StepName:='104 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_5' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_5' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_5' THEN
                Revork:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 108;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_5' THEN
                Revork:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;  
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            END_IF		
			
			
			
        108:
            SC_P2_StoperSrobovania.StepName:='108 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#10s;	
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
            
            
            IF NOT SC_P2_StoperSrobovania.Switch1  THEN
                TRCB_P2_Srobovanie_ST5.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Srobovanie_ST5.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 110;
            ELSIF TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaError THEN	
                TRCB_P2_Srobovanie_ST5.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 115;
            END_IF	
			
			
			
		
			
			
        110:
            SC_P2_StoperSrobovania.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;		
			
            IF NOT TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaUkoncena AND P2_StoperSrobovania.IN.Centrovanie_VYSUNUTE_IS14 THEN
                IF TRCB_P2_Srobovanie_ST5.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P2_Srobovanie_ST5.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST5' THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 118;
                    END_IF   
                ELSIF TRCB_P2_Srobovanie_ST5.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 115;
                END_IF	
            END_IF
		
            
        115:
            SC_P2_StoperSrobovania.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;	
            
       
            P2_Vizu.ZobrazHL4_ST5:= TRUE;
            
            IF TRCB_P2_Srobov_OpatovnyDopyt THEN
                TRCB_P2_Srobov_OpatovnyDopyt:= FALSE; 
                P2_Vizu.ZobrazHL4_ST5:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 108;
            ELSIF TRCB_P2_Srobov_PaletkaNG THEN
                TRCB_P2_Srobov_PaletkaNG:= FALSE;
                P2_Vizu.ZobrazHL4_ST5:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 116;
            END_IF   
            
            
            
            
            
        116:
            SC_P2_StoperSrobovania.StepName:='116 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperSrobovania.IN.Centrovanie_ZASUNUTE_IS15 THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 560;
            END_IF	    
            
			
		
        118:
            SC_P2_StoperSrobovania.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperSrobovania.IN.Centrovanie_VYSUNUTE_IS14 THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 125;
            END_IF	
		
       
            
            
        125:
            SC_P2_StoperSrobovania.StepName:='125 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 138;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 258;	
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 358; 
            END_IF
            
		            
		
			
            //******************************************Model 4F*************************************************//			
                
			
        138:
            SC_P2_StoperSrobovania.StepName:='120 - Automaticky Rezim - model 4F presun manipulatora vpred';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND NOT P2_Robot.KOM_IN.Stav_Busbary4F_Odobrate THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 140;
            END_IF	
		
				
			
        140:
            SC_P2_StoperSrobovania.StepName:='140 - Automaticky Rezim - modwel 4F odober vrchne busbary';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND NOT P2_Robot.STAV.Zvaranie_PrebiehaManipulacia THEN
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P2_Robot.KOM_OUT.Odober_Busbary4F:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF    
            
			
            IF P2_Robot.KOM_IN.Stav_Busbary4F_Odobrate AND NOT P2_Robot.KOM_IN.Stav_Busbary4F_Polozene THEN
                P2_Robot.KOM_OUT.Odober_Busbary4F:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 143;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
			
        143:
            SC_P2_StoperSrobovania.StepName:='143 - Automaticky Rezim - modwel 4F poloz vrchne busbary';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Poloz_Busbary4F:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_Busbary4F_Polozene THEN
                P2_Robot.KOM_OUT.Poloz_Busbary4F:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 145;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;    
            END_IF
			
			
        145:
            SC_P2_StoperSrobovania.StepName:='145 - Automaticky Rezim - modwel 4F zaskrutkuj lavu skrutku M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM6:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM6:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 148;
                END_IF	
            END_IF
		
					
			
        148:
            SC_P2_StoperSrobovania.StepName:='148 - Automaticky Rezim - modwel 4F kontrola vysledku zaskrutkovania lavej skrutky M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyUhol);
            
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_4F_LavaM6_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM6);
                IF (P2_Skrutk_4F_LavaM6_Vysunutie <= P2_RemPremenne.P2_Srob4F_LavaM6_Vysunutie_HI) AND (P2_Skrutk_4F_LavaM6_Vysunutie >= P2_RemPremenne.P2_Srob4F_LavaM6_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF    
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 150;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'FAIL';
                    IF P2_Srobov_M6_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 150;
                    ELSE 	
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF    
                END_IF 
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN    
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'FAIL';
                IF P2_Srobov_M6_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 150;
                ELSE 	
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF    
            END_IF
			
			
        150:
            SC_P2_StoperSrobovania.StepName:='150 - Automaticky Rezim - modwel 4F zaskrutkuj pravu skrutku M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
				
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM6:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM6:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 153;
                END_IF		
            END_IF
			
	
						
			
        153:
            SC_P2_StoperSrobovania.StepName:='151 - Automaticky Rezim - modwel 4F kontrola vysledku zaskrutkovania pravej skrutky M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_4F_PravaM6_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM6);
                IF (P2_Skrutk_4F_PravaM6_Vysunutie <= P2_RemPremenne.P2_Srob4F_PravaM6_Vysunutie_HI) AND (P2_Skrutk_4F_PravaM6_Vysunutie >= P2_RemPremenne.P2_Srob4F_PravaM6_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF 
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 155;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'FAIL';
                    IF P2_Srobov_M6_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 155;
                    ELSE 
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF    
                END_IF 
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'FAIL';
                IF P2_Srobov_M6_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 155;
                ELSE 
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF    
            END_IF
			
	
        155:
            SC_P2_StoperSrobovania.StepName:='155 - Automaticky Rezim - modwel 4F presun manipulatora vpred';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND NOT P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 158;
            END_IF	
		
					
        158:
            SC_P2_StoperSrobovania.StepName:='158 - Automaticky Rezim - model 4F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= FALSE;
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 160;
            END_IF
			
				
			
        160:
            SC_P2_StoperSrobovania.StepName:='160 - Automaticky Rezim - modwel 4F zaskrutkuj lavu skrutku M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM4:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM4:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 163;
                END_IF		
            END_IF
			
			
			
			
			
        163:
            SC_P2_StoperSrobovania.StepName:='163 - Automaticky Rezim - modwel 4F kontrola vysledku zaskrutkovania lavej skrutky M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_4F_LavaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM4);
                IF (P2_Skrutk_4F_LavaM4_Vysunutie <= P2_RemPremenne.P2_Srob4F_LavaM4_Vysunutie_HI) AND (P2_Skrutk_4F_LavaM4_Vysunutie >= P2_RemPremenne.P2_Srob4F_LavaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF         
            
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 165;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'FAIL';
                    IF P2_Srobov_M4_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 165;
                    ELSE 
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF    
                END_IF 
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'FAIL';
                IF P2_Srobov_M4_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 165;
                ELSE 
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF    
            END_IF
			
			
        165:
            SC_P2_StoperSrobovania.StepName:='165 - Automaticky Rezim - modwel 4F zaskrutkuj pravu skrutku M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM4:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM4:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 168;
                END_IF	
            END_IF
			
	
			
			
        168:
            SC_P2_StoperSrobovania.StepName:='168 - Automaticky Rezim - modwel 4F kontrola vysledku zaskrutkovania pravej skrutky M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_4F_PravaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM4);
                IF (P2_Skrutk_4F_PravaM4_Vysunutie <= P2_RemPremenne.P2_Srob4F_PravaM4_Vysunutie_HI) AND (P2_Skrutk_4F_PravaM4_Vysunutie >= P2_RemPremenne.P2_Srob4F_PravaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
           
            
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 170;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'FAIL';
                    IF P2_Srobov_M4_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 170;
                    ELSE  
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF 
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'FAIL';
                IF P2_Srobov_M4_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 170;
                ELSE  
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
			
			
        170:
            SC_P2_StoperSrobovania.StepName:='170 - Automaticky Rezim - modwel 4F presun manipulatora vzad';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 173;
            END_IF	
		
			
        173:
            SC_P2_StoperSrobovania.StepName:='173 - Automaticky Rezim - modwel 4F kamerova kontrola paletky CAM10';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND CAM10.STAV.Command_READY THEN
                CAM10.CMD.Triger:= TRUE;
                SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM10.STAV.Results_READY AND CAM10.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 175;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM10.STAV.Results_READY:= FALSE;
                CAM10.CMD.Triger:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 174;    
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[295]:= TRUE;
                P2_PoruchaST3:= TRUE;    
            END_IF	
		
            
                  
            
            
            
        174:
            SC_P2_StoperSrobovania.StepName:='174 - Automaticky Rezim - modwel 4F cakam na opatovny triger kamery';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 173;
            END_IF	
            
        175:
            SC_P2_StoperSrobovania.StepName:='175 - Automaticky Rezim - model 4F kontrola vysledku kamery';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF NOT CAM10.STAV.BUSY THEN
                CAM10.CMD.Triger:= FALSE;
                IF NOT CAM10.RESULT.Paletka.Pritomn_Busbarov_4F	THEN
					CAM10.PAR.ResultFotky:= 'PASS';
					SC_P2_StoperSrobovania.ResetStep:= TRUE;
					SC_P2_StoperSrobovania.Step:= 180;
                ELSE
                    CAM10.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 180;
                END_IF
            END_IF
			
				
	
	
        180:
            SC_P2_StoperSrobovania.StepName:='135 - Automaticky Rezim - model 4F rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            P2_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM10.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Srobov_CakaNaKameru:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 540;
            ELSIF CAM10.PAR.ResultFotky = 'FAIL' THEN
                P2_Vizu.ZobrazHL1_ST5:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Srobov_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Vizu.ZobrazHL1_ST5:= FALSE;
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;	
                ELSIF P2_Srobov_KAM_Result_OK THEN
                    P2_Srobov_KAM_Result_OK:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    CAM10.PAR.ResultFotky:= 'PASS';
                    P2_Vizu.ZobrazHL1_ST5:= FALSE;
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;
                ELSIF P2_Srobov_KAM_Result_NG THEN
                    P2_Srobov_KAM_Result_NG:= FALSE;    
                    P2_Vizu.ZobrazHL1_ST5:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;
                END_IF
            END_IF				
					
					
	
			
            //********************************************Model 5F**************************************************************//	
		
       			
	
        258:
            SC_P2_StoperSrobovania.StepName:='120 - Automaticky Rezim - model 5F presun manipulatora vpred';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.STAV.OsY_AktualnaPozicia > 250 THEN
                P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
                P2_Robot.KOM_OUT.Odober_Busbary5F:= TRUE;
            END_IF    
                
            
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND NOT P2_Robot.KOM_IN.Stav_Busbary5F_Odobrate THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 260;
            END_IF		
			
			
				
			
        260:
            SC_P2_StoperSrobovania.StepName:='260 - Automaticky Rezim - modwel 5F odober vrchne busbary';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND NOT P2_Robot.STAV.Zvaranie_PrebiehaManipulacia THEN
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P2_Robot.KOM_OUT.Odober_Busbary5F:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF  	
			
            IF P2_Robot.KOM_IN.Stav_Busbary5F_Odobrate AND NOT P2_Robot.KOM_IN.Stav_Busbary5F_Polozene THEN
                P2_Robot.KOM_OUT.Odober_Busbary5F:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 263;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
			
        263:
            SC_P2_StoperSrobovania.StepName:='263 - Automaticky Rezim - modwel 5F poloz vrchne busbary';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Poloz_Busbary5F:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_Busbary5F_Polozene THEN
                P2_Robot.KOM_OUT.Poloz_Busbary5F:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 265;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
			
        265:
            SC_P2_StoperSrobovania.StepName:='265 - Automaticky Rezim - modwel 5F zaskrutkuj lavu skrutku M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM6:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM6:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 268;
                END_IF	
            END_IF
			
						
			
        268:
            SC_P2_StoperSrobovania.StepName:='268 - Automaticky Rezim - modwel 5F kontrola vysledku zaskrutkovania lavej skrutky M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyUhol);
            
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5F_LavaM6_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM6);
                IF (P2_Skrutk_5F_LavaM6_Vysunutie <= P2_RemPremenne.P2_Srob5F_LavaM6_Vysunutie_HI) AND (P2_Skrutk_5F_LavaM6_Vysunutie >= P2_RemPremenne.P2_Srob5F_LavaM6_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            
                
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 270;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'FAIL';
                    IF P2_Srobov_M6_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 270;
                    ELSE	
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF  
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= 'FAIL';
                IF P2_Srobov_M6_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 270;
                ELSE	
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
			
        270:
            SC_P2_StoperSrobovania.StepName:='270 - Automaticky Rezim - modwel 5F zaskrutkuj pravu skrutku M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM6:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM6:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 273;
                END_IF	
            END_IF
			
	
						
			
        273:
            SC_P2_StoperSrobovania.StepName:='273 - Automaticky Rezim - modwel 5F kontrola vysledku zaskrutkovania pravej skrutky M6';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM6:= UDINT_TO_STRING(P2_Srobovanie.STAV.M6_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5F_PravaM6_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM6);
                IF (P2_Skrutk_5F_PravaM6_Vysunutie <= P2_RemPremenne.P2_Srob5F_PravaM6_Vysunutie_HI) AND (P2_Skrutk_5F_PravaM6_Vysunutie >= P2_RemPremenne.P2_Srob5F_PravaM6_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
            
            
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 275;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'FAIL';
                    IF P2_Srobov_M6_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 275;
                    ELSE
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= 'FAIL';
                IF P2_Srobov_M6_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 275;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
	
        275:
            SC_P2_StoperSrobovania.StepName:='275 - Automaticky Rezim - modwel 5F presun manipulatora vpred';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND NOT P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 278;
            END_IF	
		
					
        278:
            SC_P2_StoperSrobovania.StepName:='278 - Automaticky Rezim - model 5F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 280;
            END_IF
			
				
			
        280:
            SC_P2_StoperSrobovania.StepName:='280 - Automaticky Rezim - modwel 5F zaskrutkuj lavu skrutku M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM4:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM4:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 283;
                END_IF	
            END_IF
			
						
			
			
        283:
            SC_P2_StoperSrobovania.StepName:='283 - Automaticky Rezim - modwel 5F kontrola vysledku zaskrutkovania lavej skrutky M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                       
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5F_LavaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM4);
                IF (P2_Skrutk_5F_LavaM4_Vysunutie <= P2_RemPremenne.P2_Srob5F_LavaM4_Vysunutie_HI) AND (P2_Skrutk_5F_LavaM4_Vysunutie >= P2_RemPremenne.P2_Srob5F_LavaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF       
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 285;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'FAIL';
                    IF P2_Srobov_M4_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 285;
                    ELSE	
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF 
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= 'FAIL';
                IF P2_Srobov_M4_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 285;
                ELSE	
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
			
        285:
            SC_P2_StoperSrobovania.StepName:='285 - Automaticky Rezim - modwel 5F zaskrutkuj pravu skrutku M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM4:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM4:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 288;
                END_IF	
            END_IF
		
			
			
	
			
        288:
            SC_P2_StoperSrobovania.StepName:='288 - Automaticky Rezim - modwel 5F kontrola vysledku zaskrutkovania pravej skrutky M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
          
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5F_PravaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM4);
                IF (P2_Skrutk_5F_PravaM4_Vysunutie <= P2_RemPremenne.P2_Srob5F_PravaM4_Vysunutie_HI) AND (P2_Skrutk_5F_PravaM4_Vysunutie >= P2_RemPremenne.P2_Srob5F_PravaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF 
                     
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 290;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'FAIL';
                    IF P2_Srobov_M4_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 290;
                    ELSE 
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN 
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= 'FAIL';
                IF P2_Srobov_M4_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 290;
                ELSE 
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
			
			
        290:
            SC_P2_StoperSrobovania.StepName:='290 - Automaticky Rezim - modwel 5F presun manipulatora vzad';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 293;
            END_IF	
		
			
        293:
            SC_P2_StoperSrobovania.StepName:='293 - Automaticky Rezim - modwel 5F kamerova kontrola paletky CAM10';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND CAM10.STAV.Command_READY THEN
                CAM10.CMD.Triger:= TRUE;
                SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM10.STAV.Results_READY AND CAM10.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 295;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM10.STAV.Results_READY:= FALSE;
                CAM10.CMD.Triger:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 294;  
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[295]:= TRUE;
                P2_PoruchaST3:= TRUE;    
            END_IF	
			
            
                       
            
            
		
        294:
            SC_P2_StoperSrobovania.StepName:='294 - Automaticky Rezim - modwel 5F cakam na opatovny triger kamery';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 293;
            END_IF	
            
            
            
            
        295:
            SC_P2_StoperSrobovania.StepName:='295 - Automaticky Rezim - model 5F kontrola vysledku kamery';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
            
            IF NOT CAM10.STAV.BUSY THEN
                CAM10.CMD.Triger:= FALSE;
				IF NOT CAM10.RESULT.Paletka.Pritomn_Busbarov_5F THEN
					CAM10.PAR.ResultFotky:= 'PASS';
					SC_P2_StoperSrobovania.ResetStep:= TRUE;
					SC_P2_StoperSrobovania.Step:= 300;
				ELSE
                    CAM10.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 300;
                END_IF
            END_IF
			
				
		
        300:
            SC_P2_StoperSrobovania.StepName:='300 - Automaticky Rezim - model 5F rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            P2_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM10.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                P2_Srobov_CakaNaKameru:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 540;
            ELSIF CAM10.PAR.ResultFotky = 'FAIL' THEN    
                P2_Vizu.ZobrazHL2_ST5:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Srobov_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Vizu.ZobrazHL2_ST5:= FALSE;
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;	
                ELSIF P2_Srobov_KAM_Result_OK THEN
                    P2_Srobov_KAM_Result_OK:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    CAM10.PAR.ResultFotky:= 'PASS';
                    P2_Srobov_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL2_ST5:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;
                ELSIF P2_Srobov_KAM_Result_NG THEN
                    P2_Srobov_KAM_Result_NG:= FALSE;    
                    P2_Vizu.ZobrazHL2_ST5:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;
                END_IF    
            END_IF
		
			
            
                       
            
            
			
			
            //********************************************Model 5H**************************************************************//	
		
       		
        358:
            SC_P2_StoperSrobovania.StepName:='358 - Automaticky Rezim - model 5H presun manipulatora vpred a odobratie vrchnych busbarov';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
            
            
            IF P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie AND NOT P2_Robot.KOM_IN.Stav_Busbary5H_Odobrate AND NOT P2_Robot.STAV.Zvaranie_PrebiehaManipulacia AND SC_P2_Srobovanie.Step = 100  THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                P2_Robot.KOM_OUT.Odober_Busbary5H:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 360;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;     
            END_IF
			
            	
		
				
        360:
            SC_P2_StoperSrobovania.StepName:='360 - Automaticky Rezim - modwel 5H cakam na polozenie vrchnych busbarov';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND P2_Robot.KOM_IN.Stav_Busbary5H_Odobrate AND NOT P2_Robot.KOM_IN.Stav_Busbary5H_Polozene THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                P2_Robot.KOM_OUT.Odober_Busbary5H:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 363;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;    
            END_IF
            
                 
			
        363:
            SC_P2_StoperSrobovania.StepName:='363 - Automaticky Rezim - modwel 5H poloz vrchne busbary';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND NOT P2_Robot.KOM_IN.Stav_Busbary5H_Odobrate THEN
                P2_Robot.KOM_OUT.Poloz_Busbary5H:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_Busbary5H_Polozene THEN
                P2_Robot.KOM_OUT.Poloz_Busbary5H:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 365;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
	
			
        365:
            SC_P2_StoperSrobovania.StepName:='365 - Automaticky Rezim - modwel 5H zaskrutkuj skrutku M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutkuM4:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND NOT P2_Robot.KOM_IN.Stav_Filter5H_Dotlaceny THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutkuM4:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;//500
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 368;
                END_IF	
            END_IF	
			
			
					
			
        368:
            SC_P2_StoperSrobovania.StepName:='368 - Automaticky Rezim - modwel 5H kontrola vysledku zaskrutkovania skrutky M4';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                       
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_StrednaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_StrednaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_StrednaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_StrednaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_StrednaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_StrednaSkrutkaM4:= UDINT_TO_STRING(P2_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5H_StrednaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_StrednaSkrutkaM4);
                IF (P2_Skrutk_5H_StrednaM4_Vysunutie <= P2_RemPremenne.P2_Srob5H_StrednaM4_Vysunutie_HI) AND (P2_Skrutk_5H_StrednaM4_Vysunutie >= P2_RemPremenne.P2_Srob5H_StrednaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF        
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_StrednaSkrutkaM4:= 'PASS';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 370;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_StrednaSkrutkaM4:= 'FAIL';
                    IF P2_Srobov_M4_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 370;
                    ELSE
                        DoskrutkovaniePriPoruche:= TRUE;
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 370;//500
                    END_IF
                END_IF	
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_StrednaSkrutkaM4:= 'FAIL';
                IF P2_Srobov_M4_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 370;
                ELSE
                    DoskrutkovaniePriPoruche:= TRUE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 370;//500
                END_IF
            END_IF	
			
		
        370:
            SC_P2_StoperSrobovania.StepName:='370 - Automaticky Rezim - modwel 5H dotlac filter';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Dotlac_Filter5H:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_Filter5H_Dotlaceny THEN
                P2_Robot.KOM_OUT.Dotlac_Filter5H:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 375;
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
			
        375:
            SC_P2_StoperSrobovania.StepName:='375 - Automaticky Rezim - modwel 5H zaskrutkuj lavu skrutku M5';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutkuM5:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutkuM5:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 378;
                END_IF	
            END_IF
			
						
			
        378:
            SC_P2_StoperSrobovania.StepName:='378 - Automaticky Rezim - modwel 5H kontrola vysledku zaskrutkovania lavej skrutky M5';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                  
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5H_LavaM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM5);
                IF (P2_Skrutk_5H_LavaM5_Vysunutie <= P2_RemPremenne.P2_Srob5H_LavaM5_Vysunutie_HI) AND (P2_Skrutk_5H_LavaM5_Vysunutie >= P2_RemPremenne.P2_Srob5H_LavaM5_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF         
            
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    IF NOT DoskrutkovaniePriPoruche THEN
                        Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM5:= 'PASS';
                    ELSE
                        Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM5:= 'FAIL';
                    END_IF    
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 380;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM5:= 'FAIL';
                    IF P2_Srobov_M5_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 380;
                    ELSE
                        DoskrutkovaniePriPoruche:= TRUE;
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 380;//500
                    END_IF
                END_IF
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN   
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM5:= 'FAIL';
                IF P2_Srobov_M5_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 380;
                ELSE
                    DoskrutkovaniePriPoruche:= TRUE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 380;//500
                END_IF
            END_IF
			
			
        380:
            SC_P2_StoperSrobovania.StepName:='380 - Automaticky Rezim - modwel 5H zaskrutkuj pravu skrutku M5';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
						
            IF NOT SC_P2_StoperSrobovania.Switch1  THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutkuM5:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P2_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutkuM5:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 383;
                END_IF	
            END_IF
			
	
						
			
        383:
            SC_P2_StoperSrobovania.StepName:='383 - Automaticky Rezim - modwel 5H kontrola vysledku zaskrutkovania pravej skrutky M5';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                       
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM5:= UDINT_TO_STRING(P2_Srobovanie.STAV.M5_DosiahnutyUhol);
            
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Skrutk_5H_PravaM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM5);
                IF (P2_Skrutk_5H_PravaM5_Vysunutie <= P2_RemPremenne.P2_Srob5H_PravaM5_Vysunutie_HI) AND (P2_Skrutk_5H_PravaM5_Vysunutie >= P2_RemPremenne.P2_Srob5H_PravaM5_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF  
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF 
            
            IF P2_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    IF NOT DoskrutkovaniePriPoruche THEN
                        Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM5:= 'PASS';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 385;
                    ELSE
                        Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM5:= 'FAIL';
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF    
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM5:= 'FAIL';
                    IF P2_Srobov_M5_Result_OFF THEN
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 385;
                    ELSE
                        SC_P2_StoperSrobovania.ResetStep:= TRUE;
                        SC_P2_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P2_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM5:= 'FAIL';
                IF P2_Srobov_M5_Result_OFF THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 385;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
	
        385:
            SC_P2_StoperSrobovania.StepName:='385 - Automaticky Rezim - modwel 5H presun manipulatora vpred, vystavenie signalu pre robota chod do cakacej pozicie ';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
            
            IF NOT P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 388;
            END_IF
			
            
		
					
        388:
            SC_P2_StoperSrobovania.StepName:='388 - Automaticky Rezim - model 5H cakam na presunutie robota do cakacej pozicie';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			       
					
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny AND P2_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= FALSE;
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 390;
            END_IF	
			
        390:
            SC_P2_StoperSrobovania.StepName:='390 - Automaticky Rezim - modwel 5H presun manipulatora vzad';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie AND SC_P2_Srobovanie.Step = 100 THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 393;
            END_IF	
		
			
        393:
            SC_P2_StoperSrobovania.StepName:='393 - Automaticky Rezim - modwel 5H kamerova kontrola paletky CAM10';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND CAM10.STAV.Command_READY THEN
                CAM10.CMD.Triger:= TRUE;
                SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM10.STAV.Results_READY AND CAM10.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM10.STAV.Results_READY:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 395;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM10.STAV.Results_READY:= FALSE;
                CAM10.CMD.Triger:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 394;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[295]:= TRUE;
                P2_PoruchaST3:= TRUE;    
            END_IF	
		
            
                     
            
            
            
        394:
            SC_P2_StoperSrobovania.StepName:='394 - Automaticky Rezim - modwel 5H cakam na opatovny triger kamery';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 393;
            END_IF	
            
            
        395:
            SC_P2_StoperSrobovania.StepName:='395 - Automaticky Rezim - model 5H kontrola vysledku kamery';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF NOT CAM10.STAV.BUSY  THEN
                CAM10.CMD.Triger:= FALSE;
				IF NOT CAM10.RESULT.Paletka.Pritomn_Busbarov_5H THEN
					CAM10.PAR.ResultFotky:= 'PASS';
					SC_P2_StoperSrobovania.ResetStep:= TRUE;
					SC_P2_StoperSrobovania.Step:= 400;
                ELSE
                    CAM10.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 400;
                END_IF
            END_IF
			
				
					
        	
	
        400:
            SC_P2_StoperSrobovania.StepName:='400 - Automaticky Rezim - model 5H rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            P2_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM10.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Srobov_CakaNaKameru:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 540;
            ELSIF CAM10.PAR.ResultFotky = 'FAIL' THEN
                P2_Vizu.ZobrazHL3_ST5:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Srobov_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Vizu.ZobrazHL3_ST5:= FALSE;
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;	
                ELSIF P2_Srobov_KAM_Result_OK THEN
                    P2_Srobov_KAM_Result_OK:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    CAM10.PAR.ResultFotky:= 'PASS';
                    P2_Srobov_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL3_ST5:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;
                ELSIF P2_Srobov_KAM_Result_NG THEN
                    P2_Srobov_KAM_Result_NG:= FALSE;    
                    P2_Vizu.ZobrazHL3_ST5:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Srobov_CakaNaKameru:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 540;    
                END_IF
            END_IF	
			
		         
            
            
            
            
			
		
	
			
            //****************************************Uvolnenie robota a vyfotenie paletky po zlom skrutkovaní************************************************//			
			
			
			
        500:
            SC_P2_StoperSrobovania.StepName:='500 - Automaticky Rezim - presun manipulatora vpred';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
			Paletka[i].PAR.StavPaletky:= 'NG';
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 503;
            END_IF
		
			
        503:
            SC_P2_StoperSrobovania.StepName:='503 - Automaticky Rezim - vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 505;
            END_IF
			
		
        505:
            SC_P2_StoperSrobovania.StepName:='505 - Automaticky Rezim - presun manipulatora vzad';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    CAM10.STAV.Results_READY:= FALSE;
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 545;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 508;
                END_IF    
            END_IF
			
        508:
            SC_P2_StoperSrobovania.StepName:='508 - Automaticky Rezim - kamerova kontrola paletky CAM10';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF NOT SC_P2_StoperSrobovania.Switch1 AND CAM10.STAV.Command_READY THEN
                CAM10.CMD.Triger:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
						
            IF CAM10.STAV.Results_READY AND CAM10.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM10.STAV.Results_READY:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                CAM10.PAR.ResultFotky:= 'FAIL';
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 540;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM10.STAV.Results_READY:= FALSE;
                CAM10.CMD.Triger:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 510;
            ELSIF SC_P2_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[295]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF    
           
	      
			
		
        510:
            SC_P2_StoperSrobovania.StepName:='510 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 10//
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P2_StoperSrobovania.IdleTime.Q THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 508;
            END_IF	   
            
            
            
            
			
			
            //Odoslanie fotiek na server//			
			
			
		
        540:
            SC_P2_StoperSrobovania.StepName:='540 - Automaticky Rezim - odoslanie fotiek na server';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                FTP_CAM10.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM10.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM10.INPUTS.Result:= CAM6.PAR.ResultFotky;
                Reports.Kamery.P2_CAM10_KontrolaPaletky:= CAM10.PAR.ResultFotky;
                       
                FTP_CAM10.CMD.OdosliFotku:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
            	
			
            IF FTP_CAM10.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM10.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 545;
            ELSIF FTP_CAM10.STATUS.KomunikaciaError THEN
                P2_Alarmy[232]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF	
		
			
       		
			
            //Odcentrovanie paletky//				
        545:
            SC_P2_StoperSrobovania.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperSrobovania.IN.Centrovanie_ZASUNUTE_IS15 THEN
                IF P2_StoperSrobovania.STAV.Porucha THEN
                    P2_PoruchaST3:= TRUE;
                ELSE
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 550;
                END_IF    
            END_IF	
		
				
            //Odoslanie dát na server//			
		
        550:
            SC_P2_StoperSrobovania.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#10s;
			
			
            IF NOT SC_P2_StoperSrobovania.Switch1 THEN
                TRCB_P2_Srobovanie_ST5.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P2_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Srobovanie_ST5.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 553;
            ELSIF TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaError THEN
                //                P2_Alarmy[233]:= TRUE;
                //                P2_PoruchaST3:= TRUE;
            END_IF
			
			
		
        553:
            SC_P2_StoperSrobovania.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#10s;
			
            IF NOT TRCB_P2_Srobovanie_ST5.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_Srobovanie_ST5.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 555;
                ELSIF TRCB_P2_Srobovanie_ST5.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P2_StoperSrobovania.ResetStep:= TRUE;
                    SC_P2_StoperSrobovania.Step:= 555;
                END_IF	
            END_IF
			
			
        555:
            SC_P2_StoperSrobovania.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P2_StoperSrobovania.ResetStep:= TRUE;
            SC_P2_StoperSrobovania.Step:= 560;	
            
            
            
            
            
			
			
			

            //Vyvezenie paletky//			
			
        560:
            SC_P2_StoperSrobovania.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper zvarania';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            P2_Robot.STAV.Srobovanie_PrebiehaManipulacia:= FALSE;
            
                        
            IF P2_StoperSrobovania.KoniecCyklu THEN
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            ELSIF P2_StoperSrobovania.STAV.Porucha THEN
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_PoruchaST3:= TRUE;
            ELSIF ((NOT P2_StoperZvarania.IN.PritomnostPaletky_S9 AND SC_P2_StoperZvarania.Step = 100) OR (P2_StoperZvarania.OUT.ZasunStoper_YV59 AND SC_P2_StoperZvarania.Step = 561)) AND NOT P2_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky THEN
                P2_StoperSrobovania.OUT.ZasunStoper_YV56:= TRUE;
                P2_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 561;
            END_IF	
		
		
        561:
            SC_P2_StoperSrobovania.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper zvarania';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#1300ms;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#10s;
		
            SC_P2_StoperSrobovania.AlarmTime.IN:= P2_StoperSrobovania.IN.PritomnostPaletky_S8;
            SC_P2_StoperSrobovania.IdleTime.IN:= NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8;
            
            IF NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                TestovaciKus:= FALSE;
                DoskrutkovaniePriPoruche:= FALSE;
                CisloFotky:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM6:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_StrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_StrednaSkrutkaM4:= '';
                Reports.Kamery.P2_CAM10_KontrolaPaletky:= '';
                P2_Srobov_ManipulaciaUkoncena:= FALSE; 
            END_IF
            
            IF SC_P2_StoperSrobovania.IdleTime.Q  THEN
                P2_StoperSrobovania.OUT.ZasunStoper_YV56:= FALSE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 100;
            ELSIF SC_P2_StoperSrobovania.AlarmTime.Q THEN
                P2_Alarmy[288]:= TRUE;
                P2_Pracovisko.KoniecCyklu:= TRUE;
                SC_P2_StoperSrobovania.ResetStep:= TRUE;
                SC_P2_StoperSrobovania.Step:= 0;
            END_IF	
		
	
            
                     
            
			
			
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P2_StoperSrobovania.StepName:='700 - Manualny Rezim';
            SC_P2_StoperSrobovania.IdleTime.PT:= T#8s;
            SC_P2_StoperSrobovania.AlarmTime.PT:= T#5s;
		
		
		
		
		
    END_CASE
	
	 
				END_PROGRAM

PROGRAM _EXIT
				(* Insert code here *)
	 
				END_PROGRAM


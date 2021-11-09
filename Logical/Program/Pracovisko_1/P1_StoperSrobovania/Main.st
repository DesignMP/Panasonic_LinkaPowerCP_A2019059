
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	
	
			
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P1_StoperSrobovania);
	
	
    //Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
	
    
    
    	
	
		
    //Reset sekcie //
    IF P1_StoperSrobovania.Reset THEN
        SC_P1_StoperSrobovania.Step:= 0;
        P1_StoperSrobovania.Reset:= FALSE;
    END_IF	
	
    
    IF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_StoperSrobovania.Automat THEN
        SC_P1_StoperSrobovania.Step:= 0;
    END_IF    
    
    IF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN     
        Triger_0:= TRUE;
        IF P1_StoperSrobovania.IN.PritomnostPaletky_S16 AND P1_StoperSrobovania.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;    
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN 
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P1_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 550;   
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P1_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 550;    
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF    
    
    
    
                

    //Porucha stanice//
    IF P1_PoruchaST2 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P1_StoperSrobovania.IN.PritomnostPaletky_S16 AND P1_StoperSrobovania.Automat THEN
            SC_P1_Srobovanie.Step:= 0;
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;    
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN 
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P1_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 550;   
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P1_StoperSrobovania.KoniecCyklu:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 550;    
            END_IF
        ELSE
            SC_P1_StoperSrobovania.ResetStep:= TRUE;
            SC_P1_StoperSrobovania.Step:= 0;
        END_IF
    END_IF   
	
    IF NOT P1_PoruchaST2 THEN
        Triger_1:= FALSE;
    END_IF    
    
    
    
    CASE SC_P1_StoperSrobovania.Step OF 
	
        0:
            SC_P1_StoperSrobovania.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            P1_StoperSrobovania.Automat:= FALSE;
            P1_StoperSrobovania.KoniecCyklu:= FALSE;
            P1_StoperSrobovania.Manual:= FALSE;
            P1_StoperSrobovania.STAV.PoINIT:= FALSE;
            P1_StoperSrobovania.OUT.ZasunStoper_YV110:= FALSE;
            P1_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPrednuSkrutku_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_4F_ZasrobujZadnuSkrutku_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_4F_ZasrobujSkrutkuDPS_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPrednuSkrutku_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5F_ZasrobujZadnuSkrutku_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5F_ZasrobujSkrutkuDPS_M4:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_K30:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_M5:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_M5:= FALSE;
            P1_StoperSrobovania.OUT.KOM_5H_ZasrobujStrednuSkrutku_M5:= FALSE;
            P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU:= FALSE;
            P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
            P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
            P1_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= FALSE;
            P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
            P1_Robot.KOM_OUT.OdoberDPS_4F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberDPS_5F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberFoam4F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberFoam5F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberSpodnyBusbar4F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberSpodnyBusbar5F_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.OdoberSpodnyBusbar5H_z_Paletky:= FALSE;
            P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP:= FALSE;
            P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
            P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            P1_Robot.KOM_OUT.Odparkovanie:= FALSE;
            CAM6.CMD.Triger:= FALSE;
            CAM6.STAV.Results_READY:= FALSE;
            FTP_CAM6.CMD.OdosliFotku:= FALSE;
            FTP_CAM6.CMD.VymazFotku:= FALSE;
            P1_StoperSrobovania.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P1_StoperSrobovania.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2:= FALSE;
            PrecitaneCisloPaletky:= '';
            PocetDopytovNaServer:= 0;
            Taktime_Srobovanie_ST2.CMD.START_Merania_1:= FALSE;
            Taktime_Srobovanie_ST2.CMD.START_Merania_2:= FALSE;
            P1_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P1_Srobov_KAM_Result_OK:= FALSE;
            P1_Srobov_KAM_Result_NG:= FALSE;
            P1_Srobov_CakaNaKameru:= FALSE;
            P1_StoperSrobovania.STAV.Porucha:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P1_Robot.STAV.DrziBusbar_4F:= FALSE;
            P1_Robot.STAV.DrziBusbar_5F:= FALSE;
            P1_Robot.STAV.DrziBusbar_5H:= FALSE;
            P1_Robot.STAV.DrziDPS_4F:= FALSE;
            P1_Robot.STAV.DrziDPS_5F:= FALSE;
            P1_Robot.STAV.DrziFoamy_4F:= FALSE;
            P1_Robot.STAV.DrziFoamy_5F:= FALSE;
            CisloFotky:= 0;
            P1_Vizu.ZobrazHL1_ST2:= FALSE;
            P1_Vizu.ZobrazHL2_ST2:= FALSE;
            P1_Vizu.ZobrazHL3_ST2:= FALSE;
            P1_Vizu.ZobrazHL4_ST2:= FALSE;
            P1_Vizu.ZobrazHL5_ST2:= FALSE;
            P1_Vizu.ZobrazHL6_ST2:= FALSE;
            P1_Vizu.ZobrazHL7_ST2:= FALSE;
            P1_Vizu.ZobrazHL8_ST2:= FALSE;
            P1_Vizu.ZobrazHL9_ST2:= FALSE;
            TRCB_P1_Srobov_OpatovnyDopyt:= FALSE;
            TRCB_P1_Srobov_PaletkaNG:= FALSE;
            VysunutieSkrutkovacky_OK:= FALSE;
            PocetTrigrovKamery:= 0;
            PocetZopakovaniOdobratia:= 0;
            
            
            IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.PORUCHA AND P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 1;
            END_IF
	
        1:
            SC_P1_StoperSrobovania.StepName:='1 - Cakam na spustenie vyroby';
            P1_StoperSrobovania.KoniecCyklu:= FALSE;
            IF P1_StoperSrobovania.Automat THEN
                SC_P1_StoperSrobovania.Step:= 2;
            ELSIF P1_StoperSrobovania.Manual THEN
                SC_P1_StoperSrobovania.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//
	
        2:
            SC_P1_StoperSrobovania.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
									
            IF P1_Srobovanie.STAV.PoINIT THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 3;
            END_IF
		
			
        3:
            SC_P1_StoperSrobovania.StepName:='3 - Inicializacia - vymazanie adresara kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.CMD.VymazFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.VymazFotku:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 5;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF	
			
	
            
            
		
        5:
            SC_P1_StoperSrobovania.StepName:='5 - Inicializacia - kontrola pozicie robota';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 10;
            END_IF	
			
		
			
        10:
            SC_P1_StoperSrobovania.StepName:='10 - Inicializacia - zasunutie centrovacky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#4s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P1_StoperSrobovania.IN.Centrovanie_ZASUNUTE_IS63 AND P1_Dopravniky.STAV.PoINIT THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 13;
            END_IF		
		
        13:	
            SC_P1_StoperSrobovania.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
	
            IF P1_StoperSrobovania.IN.PritomnostPaletky_S16 THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 20;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 100;
            END_IF
		
		
        20:
            SC_P1_StoperSrobovania.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
		
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P1_StoperSrobovania.IN.PrecitaneCisloPaletky_S16);
                i:= 0;
                P1_StoperSrobovania.PAR.IndexPaletky_STRING:= '';    
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 23;
            END_IF	
			
        23:
            SC_P1_StoperSrobovania.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P1_Alarmy[113]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P1_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P1_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 30;
            END_IF		
				
		
        30:
            SC_P1_StoperSrobovania.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_2' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_2' THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_2' THEN
                Revork:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 33;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_2' THEN
                Revork:= FALSE;
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            END_IF	
            
       				
        33:
            SC_P1_StoperSrobovania.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
			
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            ELSE
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 35;
            END_IF	
			
			
        35:
            SC_P1_StoperSrobovania.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
		
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 38;
            ELSE
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 100;
            END_IF	
		
            
        38:
            SC_P1_StoperSrobovania.StepName:='38 - Inicializacia - kontrola odoslania fotiek';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 550;
            ELSE
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 40;
            END_IF
            
       
        40:
            SC_P1_StoperSrobovania.StepName:='40 - Inicializacia - zacentrovanie paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P1_StoperSrobovania.IN.Centrovanie_VYSUNUTE_IS62 THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 43;
            END_IF	
            
        43:
            SC_P1_StoperSrobovania.StepName:='43 - Inicializacia - presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 AND P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 45;
            END_IF
            
            
            
            
        45:
            SC_P1_StoperSrobovania.StepName:='45 - Inicializacia - kamerova kontrola paletky'; //CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;   
            
           			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 50;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 48;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
		
            
            
            
            
            
            
            
            
        48:
            SC_P1_StoperSrobovania.StepName:='48 - Inicializacia - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 45;
            END_IF	
			
			
			
        50:
            SC_P1_StoperSrobovania.StepName:='50 - Inicializacia - kontrola vysledku kamery podla typu modelu';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
		
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM6.RESULT.Paletka.Pritom_LavyFoam_4F5F AND
                        CAM6.RESULT.Paletka.Pritom_PravyFoam_4F5F AND
                        CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_4F AND
                        NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                        NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                        CAM6.PAR.ResultFotky:= 'PASS';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    ELSE
                        CAM6.PAR.ResultFotky:= 'FAIL';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM6.RESULT.Paletka.Pritom_LavyFoam_4F5F AND
                        CAM6.RESULT.Paletka.Pritom_PravyFoam_4F5F AND
                        CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_5F AND
                        NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                        NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                        CAM6.PAR.ResultFotky:= 'PASS';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    ELSE 
                        CAM6.PAR.ResultFotky:= 'FAIL';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM6.RESULT.Paletka.Pritom_KrytuBusbarov_5H AND
                        CAM6.RESULT.Paletka.Pritom_SpodnychBusbarov_5H AND
                        NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyM5_5H AND
                        NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyM5_5H AND
                        NOT CAM6.RESULT.PowerCP.Pritom_StrednejSkrutkyM5_5H AND
                        NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                        NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                        CAM6.PAR.ResultFotky:= 'PASS';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    ELSE 
                        CAM6.PAR.ResultFotky:= 'FAIL';
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 53;
                    END_IF
                END_IF
            END_IF
            
                 
            
        53:			
            SC_P1_StoperSrobovania.StepName:='53 - Inicializacia - vymazanie fotky CAM6';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
         			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.CMD.VymazFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.VymazFotku:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 55;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF		
        
       	
             
            
            
            
            
        55:
            SC_P1_StoperSrobovania.StepName:='55 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 138;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 258;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 360;  
                END_IF    
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_StoperSrobovania.STAV.PoINIT:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 545;
            END_IF
                 
                 
            
					
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P1_StoperSrobovania.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            SC_P1_StoperSrobovania.IdleTime.IN:= P1_StoperSrobovania.IN.PritomnostPaletky_S16;
			
            IF EDGEPOS(P1_StoperSrobovania.IN.PritomnostPaletky_S16) THEN
                IF NOT Taktime_Srobovanie_ST2.CMD.START_Merania_1 THEN
                    Taktime_Srobovanie_ST2.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Srobovanie_ST2.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            IF P1_StoperSrobovania.KoniecCyklu THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 101;
            END_IF
		
        101:
            SC_P1_StoperSrobovania.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#500ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            PrecitaneCisloPaletky:= USINT_TO_STRING(P1_StoperSrobovania.IN.PrecitaneCisloPaletky_S16);
            i:= 0;
            SC_P1_StoperSrobovania.ResetStep:= TRUE;
            SC_P1_StoperSrobovania.Step:= 103;
          
			
        103:
            SC_P1_StoperSrobovania.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
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
                P1_Alarmy[113]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P1_StoperSrobovania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P1_StoperSrobovania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 104;
            END_IF		
		
		
        104:
            SC_P1_StoperSrobovania.StepName:='104 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_2' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_2' THEN 
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_2' THEN
                Revork:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 108;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_2' THEN
                Revork:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;      
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            END_IF		
		
                      
            
            
		
        108:
            SC_P1_StoperSrobovania.StepName:='108 - Automaticky Rezim - vyziadanie stavu paletky zo servera'; 
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;	
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF   
            
			
            IF TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena THEN
                TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 110;
            ELSIF TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError THEN	
                TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 115;
            END_IF	
			
		
			
			
        110:
            SC_P1_StoperSrobovania.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;		
			
            IF NOT TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P1_Srobovanie_ST2.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P1_Srobovanie_ST2.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST2' THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 118;
                    END_IF   
                ELSIF TRCB_P1_Srobovanie_ST2.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 115;
                END_IF	
            END_IF
			
		
        115:
            SC_P1_StoperSrobovania.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;	
		
            P1_Vizu.ZobrazHL9_ST2:= TRUE;
            
            IF TRCB_P1_Srobov_OpatovnyDopyt THEN
                TRCB_P1_Srobov_OpatovnyDopyt:= FALSE; 
                P1_Vizu.ZobrazHL9_ST2:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 108;
            ELSIF TRCB_P1_Srobov_PaletkaNG THEN
                TRCB_P1_Srobov_PaletkaNG:= FALSE;
                P1_Vizu.ZobrazHL9_ST2:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 560;
            END_IF    
            
            
            
		
        118:
            SC_P1_StoperSrobovania.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P1_StoperSrobovania.IN.Centrovanie_VYSUNUTE_IS62 THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 120;
            END_IF	
		
        120:
            SC_P1_StoperSrobovania.StepName:='120 - Automaticky Rezim - presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 AND P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 123;
            END_IF
		
	
        123:
            SC_P1_StoperSrobovania.StepName:='123 - Automaticky Rezim - kamerova kontrola paletky';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 125;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 124;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;    
            END_IF
		
            
                 
            
            
            
        124:
            SC_P1_StoperSrobovania.StepName:='123 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 123;
            END_IF	
			
			
			
        125:
            SC_P1_StoperSrobovania.StepName:='125 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
		
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 130;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 250;  	
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 350;  
                END_IF
            END_IF
			
            
            
            
            
            
            
            
            //********************************************Model 4F**************************************************************//
			
        130:
            SC_P1_StoperSrobovania.StepName:='130 - Automaticky Rezim - model 4F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            		
            IF NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                CAM6.PAR.ResultFotky:= 'PASS';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 132;
            ELSE 
                CAM6.PAR.ResultFotky:= 'FAIL';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 132;
            END_IF
			
       
        132:
            SC_P1_StoperSrobovania.StepName:='132 - Automaticky Rezim - model 4F rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 135;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL1_ST2:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Vizu.ZobrazHL1_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 135;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL1_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 135;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    P1_Vizu.ZobrazHL1_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;    
                END_IF 
            END_IF
                
                     
					
        135:			
            SC_P1_StoperSrobovania.StepName:='135 - Automaticky Rezim - model 4F vymazanie fotky CAM6';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
         			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.CMD.VymazFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.VymazFotku:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 138;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF				
					
        
            
                  
            
			
        138:
            SC_P1_StoperSrobovania.StepName:='138 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj lavú skrutku K30, odober foamy';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#7s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= P1_Robot.KOM_IN.Stav_RobotOdoberaFoamy;
						
            IF NOT SC_P1_StoperSrobovania.Switch1 AND P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutku_K30:= TRUE;
                P1_Robot.KOM_OUT.OdoberFoam4F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF EDGEPOS(SC_P1_StoperSrobovania.IdleTime.Q)THEN
                IF PocetZopakovaniOdobratia <= 3 THEN
                    P1_Robot.KOM_OUT.ZopakujOdoberanie:= TRUE;
                END_IF    
                PocetZopakovaniOdobratia:= PocetZopakovaniOdobratia + 1;
            END_IF
            
            IF NOT P1_Robot.KOM_IN.Stav_RobotOdoberaFoamy THEN
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            END_IF    
            
            
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND P1_Robot.KOM_IN.Stav_Foam4F_Odobraty THEN
                P1_Robot.KOM_OUT.OdoberFoam4F_z_Paletky:= FALSE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutku_K30:= FALSE;
                P1_Robot.STAV.DrziFoamy_4F:= TRUE;
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
                PocetZopakovaniOdobratia:= 0;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 140;
                END_IF
            ELSIF PocetZopakovaniOdobratia > 3 THEN
                P1_Alarmy[159]:= TRUE;
                P1_PoruchaST2:= TRUE;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;       
            END_IF
		
		
            
			
			
        140:
            SC_P1_StoperSrobovania.StepName:='140 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania lavej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_4F_LavaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30);
                IF (P1_Skrutk_4F_LavaK30_Vysunutie <= P1_RemPremenne.P1_Srob4F_LavaK30_Vysunutie_HI) AND (P1_Skrutk_4F_LavaK30_Vysunutie >= P1_RemPremenne.P1_Srob4F_LavaK30_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF    
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF    
            
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 143;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 143;
                    ELSE	
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500; 
                    END_IF
                END_IF   
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 143;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500; 
                END_IF
            END_IF
		
			
        143:
            SC_P1_StoperSrobovania.StepName:='143 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj pravu skrutku K30, odober spodny busbar';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
						
            IF NOT SC_P1_StoperSrobovania.Switch1 AND P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P1_Robot.KOM_OUT.OdoberFoam4F_z_Paletky:= FALSE;
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutku_K30:= TRUE;
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar4F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Odobraty THEN
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar4F_z_Paletky:= FALSE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutku_K30:= FALSE;
                P1_Robot.STAV.DrziBusbar_4F:= TRUE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 145;
                END_IF
            END_IF
			
			
           					
        145:
            SC_P1_StoperSrobovania.StepName:='145 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania pravej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
                       
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_4F_PravaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30);
                IF (P1_Skrutk_4F_PravaK30_Vysunutie <= P1_RemPremenne.P1_Srob4F_PravaK30_Vysunutie_HI) AND (P1_Skrutk_4F_PravaK30_Vysunutie >= P1_RemPremenne.P1_Srob4F_PravaK30_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF   
            
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 148;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 148;
                    ELSE	
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF    
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 148;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
                     
            
           
			
        148:
            SC_P1_StoperSrobovania.StepName:='148 - Automaticky Rezim - model 4F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 AND P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_Foam4F_Polozeny THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 153;
            END_IF
			
		
			
        153:
            SC_P1_StoperSrobovania.StepName:='153 - Automaticky Rezim - model 4F vystavenie signalu pre robota poloz foam na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_Foam4F_Polozeny AND NOT P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Polozeny THEN
                P1_Robot.STAV.DrziFoamy_4F:= FALSE;
                P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 158;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;    
            END_IF
			
		
            
            
        158:
            SC_P1_StoperSrobovania.StepName:='158 - Automaticky Rezim - model 4F vystavenie signalu pre robota poloz spodny busbar na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Polozeny THEN
                P1_Robot.STAV.DrziBusbar_4F:= FALSE;
                P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 160;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
		
       
            
            
       
        160:
            SC_P1_StoperSrobovania.StepName:='160 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj prednu skrutku M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPrednuSkrutku_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPrednuSkrutku_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 163;
                END_IF		
            END_IF
			
			
					
			
        163:
            SC_P1_StoperSrobovania.StepName:='163 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania prednej skrutky M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
          
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_4F_PrednaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4);
                IF (P1_Skrutk_4F_PrednaM4_Vysunutie <= P1_RemPremenne.P1_Srob4F_PrednaM4_Vysunutie_HI) AND (P1_Skrutk_4F_PrednaM4_Vysunutie >= P1_RemPremenne.P1_Srob4F_PrednaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF   
            
                       
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 165;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 165;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF    
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 165;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF     
            
             
            
            
            
        165:
            SC_P1_StoperSrobovania.StepName:='165 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj zadnu skrutku M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujZadnuSkrutku_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujZadnuSkrutku_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 168;
                END_IF		
            END_IF
		
			
					
			
			
        168:
            SC_P1_StoperSrobovania.StepName:='168 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania zadnej skrutky M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
           
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_4F_ZadnaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4);
                IF (P1_Skrutk_4F_ZadnaM4_Vysunutie <= P1_RemPremenne.P1_Srob4F_ZadnaM4_Vysunutie_HI) AND (P1_Skrutk_4F_ZadnaM4_Vysunutie >= P1_RemPremenne.P1_Srob4F_ZadnaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 170;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 170;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF 
                END_IF   
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 170;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF 
            END_IF
			
		
       
			
			
        170:
            SC_P1_StoperSrobovania.StepName:='170 - Automaticky Rezim - model 4F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 173;
            END_IF
			
			
        173:
            SC_P1_StoperSrobovania.StepName:='173 - Automaticky Rezim - model 4F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania AND NOT P1_Robot.KOM_IN.Stav_DPS_4F_Odobraty THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 175;
            END_IF
	
            
        175:
            SC_P1_StoperSrobovania.StepName:='175 - Automaticky Rezim - model 4F kamerova kontrola polozenia foamov';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 178;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 176;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;      
            END_IF
            
            
                  
            
            
		
        176:
            SC_P1_StoperSrobovania.StepName:='176 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 175;
            END_IF	
            
            
        178:
            SC_P1_StoperSrobovania.StepName:='178 - Automaticky Rezim - model 4F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF NOT CAM6.RESULT.PowerCP.Nepritom_LavyFoam_4F5F AND
                    NOT CAM6.RESULT.PowerCP.Nepritom_PravyFoam_4F5F THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 180;
                ELSE 
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 180;
                END_IF
            END_IF
       
        180:
            SC_P1_StoperSrobovania.StepName:='180 - Automaticky Rezim - model 4F rozhodnutie podla kamerovej kontroly foamov';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 183;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL2_ST2:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL2_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 183;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL2_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 183;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    P1_Vizu.ZobrazHL2_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 545;    
                END_IF 
            END_IF
            
                     
        183:
            SC_P1_StoperSrobovania.StepName:='183 - Automaticky Rezim - odoslanie fotky na server Panasonic';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
                       
            
            FTP_CAM6.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
            CisloFotky:= CisloFotky + 1;
            FTP_CAM6.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
            FTP_CAM6.INPUTS.Result:= CAM6.PAR.ResultFotky;
            Reports.Kamery.P1_CAM6_KontrolaPaletky:= CAM6.PAR.ResultFotky;
            
            FTP_CAM6.CMD.OdosliFotku:= TRUE;
            SC_P1_StoperSrobovania.ResetStep:= TRUE;
            SC_P1_StoperSrobovania.Step:= 185;
            
            
			                
        185:
            SC_P1_StoperSrobovania.StepName:='185 - Automaticky Rezim - model 4F vystavenie signalu pre robota odober DPS z paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.OdoberDPS_4F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_DPS_4F_Odobraty AND NOT P1_Robot.KOM_IN.Stav_DPS_4F_Polozeny THEN
                P1_Robot.STAV.DrziDPS_4F:= TRUE;
                P1_Robot.KOM_OUT.OdoberDPS_4F_z_Paletky:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 188;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
		
           
            
            
			
        188:
            SC_P1_StoperSrobovania.StepName:='188 - Automaticky Rezim - model 4F vystavenie signalu pre robota poloz DPS na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_DPS_4F_Polozeny AND FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.OdosliFotku:= FALSE;
                P1_Robot.STAV.DrziDPS_4F:= FALSE;
                P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 190;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;      
            END_IF
			
             
           
            
            
            
        190:
            SC_P1_StoperSrobovania.StepName:='190 - Automaticky Rezim - model 4F vystavenie signalu zaskrutkuj skrutku M4 pre DPS';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujSkrutkuDPS_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_4F_ZasrobujSkrutkuDPS_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 193;
                END_IF	
            END_IF
			
			
		
			
        193:
            SC_P1_StoperSrobovania.StepName:='193 - Automaticky Rezim - model 4F kontrola stavu zaskrutkovania skrutky M4 pre DPS';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_4F_DPS_M4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4);
                IF (P1_Skrutk_4F_DPS_M4_Vysunutie <= P1_RemPremenne.P1_Srob4F_DPS_M4_Vysunutie_HI) AND (P1_Skrutk_4F_DPS_M4_Vysunutie >= P1_RemPremenne.P1_Srob4F_DPS_M4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF         
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 195;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 195;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 195;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
			
			
        195:
            SC_P1_StoperSrobovania.StepName:='195 - Automaticky Rezim - model 4F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 198;
            END_IF
			
			
        198:
            SC_P1_StoperSrobovania.StepName:='198 - Automaticky Rezim - model 4F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 200;
            END_IF
			
			
        200:
            SC_P1_StoperSrobovania.StepName:='200 - Inicializacia - model 4F kamerova kontrola paletky';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 203;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 202;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;     
            END_IF	
		
            
                    
            
            
            
        202:
            SC_P1_StoperSrobovania.StepName:='202 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 200;
            END_IF		
			
			
			
        203:
            SC_P1_StoperSrobovania.StepName:='203 - Automaticky Rezim - model 4F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
            
			
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF NOT CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_4F AND
//                    NOT CAM6.RESULT.PowerCP.Nepritom_PrednejSkrutkyM4_4F AND
//                    NOT CAM6.RESULT.PowerCP.Nepritom_ZadnejSkrutkyM4_4F AND
//                    CAM6.RESULT.PowerCP.Pritom_SkrutkyDPS_4F5F AND
                    CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                    CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 208;
                ELSE
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 208;
                END_IF	
            END_IF
       			
		
        208:
            SC_P1_StoperSrobovania.StepName:='208 - Automaticky Rezim - model 4F rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 540;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL3_ST2:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL3_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL3_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    P1_Vizu.ZobrazHL3_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;    
                END_IF
            END_IF  
                
                
                     
            
			
			
		
            //********************************************Model 5F**************************************************************//
			
        250:
            SC_P1_StoperSrobovania.StepName:='250 - Automaticky Rezim - model 5F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            				
            IF NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                CAM6.PAR.ResultFotky:= 'PASS';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 253;
            ELSE
                CAM6.PAR.ResultFotky:= 'FAIL';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 253;
            END_IF
			
          
            
        253:
            SC_P1_StoperSrobovania.StepName:='253 - Automaticky Rezim - model 5F rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 255;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL4_ST2:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL4_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 255;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL4_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 255;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P1_Vizu.ZobrazHL4_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                END_IF
            END_IF    
                
          	
						
        255:			
            SC_P1_StoperSrobovania.StepName:='255 - Automaticky Rezim - model 5F vymazanie fotky CAM6';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.CMD.VymazFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.VymazFotku:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 258;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF				
		
                     
         
			
        258:
            SC_P1_StoperSrobovania.StepName:='258 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj lavú skrutku K30,odober foamy';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#7s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= P1_Robot.KOM_IN.Stav_RobotOdoberaFoamy;
					
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutku_K30:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P1_Robot.KOM_OUT.OdoberFoam5F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF EDGEPOS(SC_P1_StoperSrobovania.IdleTime.Q)THEN
                IF PocetZopakovaniOdobratia <= 3 THEN
                    P1_Robot.KOM_OUT.ZopakujOdoberanie:= TRUE;
                END_IF    
                PocetZopakovaniOdobratia:= PocetZopakovaniOdobratia + 1;
            END_IF
            
            IF NOT P1_Robot.KOM_IN.Stav_RobotOdoberaFoamy THEN
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            END_IF
            
            
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND P1_Robot.KOM_IN.Stav_Foam5F_Odobraty THEN
                P1_Robot.KOM_OUT.OdoberFoam5F_z_Paletky:= FALSE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutku_K30:= FALSE;
                P1_Robot.KOM_OUT.OdoberFoam5F_z_Paletky:= FALSE;
                P1_Robot.STAV.DrziFoamy_5F:= TRUE;
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
                PocetZopakovaniOdobratia:= 0;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 260;
                END_IF
            ELSIF PocetZopakovaniOdobratia > 3 THEN
                P1_Alarmy[159]:= TRUE;
                P1_PoruchaST2:= TRUE;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;    
            END_IF
			
       
            
			
			
			
        260:
            SC_P1_StoperSrobovania.StepName:='260 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania lavej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5F_LavaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30);
                IF (P1_Skrutk_5F_LavaK30_Vysunutie <= P1_RemPremenne.P1_Srob5F_LavaK30_Vysunutie_HI) AND (P1_Skrutk_5F_LavaK30_Vysunutie >= P1_RemPremenne.P1_Srob5F_LavaK30_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF 
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 263;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 263;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 263;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
			
        263:
            SC_P1_StoperSrobovania.StepName:='263 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj pravu skrutku K30,odober spodny busbar';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutku_K30:= TRUE;
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar5F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Odobraty THEN
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar5F_z_Paletky:= FALSE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutku_K30:= FALSE;
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar5F_z_Paletky:= FALSE;
                P1_Robot.STAV.DrziBusbar_5F:= TRUE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 265;
                END_IF		
            END_IF
			
		            
            
			
        265:
            SC_P1_StoperSrobovania.StepName:='265 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania pravej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                      
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5F_PravaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30);
                IF (P1_Skrutk_5F_PravaK30_Vysunutie <= P1_RemPremenne.P1_Srob5F_PravaK30_Vysunutie_HI) AND (P1_Skrutk_5F_PravaK30_Vysunutie >= P1_RemPremenne.P1_Srob5F_PravaK30_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF 
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 268;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 268;
                    ELSE	
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 268;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
			
        268:
            SC_P1_StoperSrobovania.StepName:='268 - Automaticky Rezim - model 5F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_Foam5F_Polozeny THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 273;
            END_IF
			
					
        273:
            SC_P1_StoperSrobovania.StepName:='273 - Automaticky Rezim - model 5F vystavenie signalu pre robota poloz foam na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_Foam5F_Polozeny AND NOT P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Polozeny THEN
                P1_Robot.STAV.DrziFoamy_5F:= FALSE;
                P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 278;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
            
	
			
        278:
            SC_P1_StoperSrobovania.StepName:='278 - Automaticky Rezim - model 5F vystavenie signalu pre robota poloz spodny busbar na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Polozeny THEN
                P1_Robot.STAV.DrziBusbar_5F:= FALSE;
                P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 280;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
	
           
            
        280:
            SC_P1_StoperSrobovania.StepName:='280 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj prednu skrutku M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
						
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPrednuSkrutku_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPrednuSkrutku_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 283;
                END_IF	
            END_IF
	
            
            
        283:
            SC_P1_StoperSrobovania.StepName:='283 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania prednej skrutky M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PrednaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5F_PrednaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4);
                IF (P1_Skrutk_5F_PrednaM4_Vysunutie <= P1_RemPremenne.P1_Srob5F_PrednaM4_Vysunutie_HI) AND (P1_Skrutk_5F_PrednaM4_Vysunutie >= P1_RemPremenne.P1_Srob5F_PrednaM4_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF 
                       
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 285;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 285;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF  
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 285;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF    
            
                 
            
        285:
            SC_P1_StoperSrobovania.StepName:='285 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj zadnu skrutku M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujZadnuSkrutku_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujZadnuSkrutku_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 288;
                END_IF		
            END_IF
			
				
			
        288:
            SC_P1_StoperSrobovania.StepName:='288 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania zadnej skrutky M4';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
                        
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_ZadnaSkrutkaM4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5F_ZadnaM4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4);
                IF (P1_Skrutk_5F_ZadnaM4_Vysunutie <= P1_RemPremenne.P1_Srob5F_ZadnaM4_Vysunutie_HI) AND (P1_Skrutk_5F_ZadnaM4_Vysunutie >= P1_RemPremenne.P1_Srob5F_ZadnaM4_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF           
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 290;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 290;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 290;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
		
        
			
			
        290:
            SC_P1_StoperSrobovania.StepName:='290 - Automaticky Rezim - model 5F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 293;
            END_IF
			
	
			
        293:
            SC_P1_StoperSrobovania.StepName:='293 - Automaticky Rezim - model 5F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania AND NOT P1_Robot.KOM_IN.Stav_DPS_5F_Odobraty THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 295;
            END_IF
			
		
            
            
            
        295:
            SC_P1_StoperSrobovania.StepName:='295 - Automaticky Rezim - model 5F kamerova kontrola polozenia foamov';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 298;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 296;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;     
            END_IF
		
            
             
                      
            
            
        296:
            SC_P1_StoperSrobovania.StepName:='296 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 295;
            END_IF	
            
            
        298:
            SC_P1_StoperSrobovania.StepName:='298 - Automaticky Rezim - model 5F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF NOT CAM6.RESULT.PowerCP.Nepritom_LavyFoam_4F5F AND
                    NOT CAM6.RESULT.PowerCP.Nepritom_PravyFoam_4F5F THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 300;
                ELSE 
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 300;
                END_IF
            END_IF
       
        300:
            SC_P1_StoperSrobovania.StepName:='300 - Automaticky Rezim - model 5F rozhodnutie podla kamerovej kontroly foamov';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 303;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL5_ST2:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL5_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 303;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    P1_Vizu.ZobrazHL5_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 303;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    P1_Vizu.ZobrazHL5_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 545;    
                END_IF 
            END_IF
            
                     
        303:
            SC_P1_StoperSrobovania.StepName:='303 - Automaticky Rezim - odoslanie fotky na server Panasonic';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
                       
            
            FTP_CAM6.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
            CisloFotky:= CisloFotky + 1;
            FTP_CAM6.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
            FTP_CAM6.INPUTS.Result:= CAM6.PAR.ResultFotky;
            Reports.Kamery.P1_CAM6_KontrolaPaletky:= CAM6.PAR.ResultFotky;
            
            FTP_CAM6.CMD.OdosliFotku:= TRUE;
            SC_P1_StoperSrobovania.ResetStep:= TRUE;
            SC_P1_StoperSrobovania.Step:= 305;    
            
            
        305:
            SC_P1_StoperSrobovania.StepName:='305 - Automaticky Rezim - model 5F vystavenie signalu pre robota odober DPS z paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.OdoberDPS_5F_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_DPS_5F_Odobraty AND NOT P1_Robot.KOM_IN.Stav_DPS_5F_Polozeny THEN
                P1_Robot.STAV.DrziDPS_5F:= TRUE;
                P1_Robot.KOM_OUT.OdoberDPS_5F_z_Paletky:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 308;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
		
           
            
			
			
        308:
            SC_P1_StoperSrobovania.StepName:='308 - Automaticky Rezim - model 5F vystavenie signalu pre robota poloz DPS na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_DPS_5F_Polozeny AND FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.OdosliFotku:= FALSE;
                P1_Robot.STAV.DrziDPS_5F:= FALSE;
                P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 310;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;    
            END_IF
			
           
                             
                  
        310:
            SC_P1_StoperSrobovania.StepName:='310 - Automaticky Rezim - model 5F vystavenie signalu zaskrutkuj skrutku M4 pre DPS';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujSkrutkuDPS_M4:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5F_ZasrobujSkrutkuDPS_M4:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 313;
                END_IF	
            END_IF
			
						
			
			
        313:
            SC_P1_StoperSrobovania.StepName:='313 - Automaticky Rezim - model 5F kontrola stavu zaskrutkovania skrutky M4 pre DPS';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_SkrutkaDPS_M4:= UDINT_TO_STRING(P1_Srobovanie.STAV.M4_DosiahnutyUhol);
            
                   
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5F_DPS_M4_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4);
                IF (P1_Skrutk_5F_DPS_M4_Vysunutie <= P1_RemPremenne.P1_Srob5F_DPS_M4_Vysunutie_HI) AND (P1_Skrutk_5F_DPS_M4_Vysunutie >= P1_RemPremenne.P1_Srob5F_DPS_M4_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF          
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 315;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'FAIL';
                    IF P1_Srobov_M4_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 315;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= 'FAIL';
                IF P1_Srobov_M4_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 315;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
			
			
        315:
            SC_P1_StoperSrobovania.StepName:='315 - Automaticky Rezim - model 5F presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 318;
            END_IF
			
			
        318:
            SC_P1_StoperSrobovania.StepName:='318 - Automaticky Rezim - model 5F vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 320;
            END_IF
			
			
        320:
            SC_P1_StoperSrobovania.StepName:='320 - Inicializacia - model 5F kamerova kontrola paletky';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 323;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 322;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;     
            END_IF	
		
            
                   
            
            
            
        322:
            SC_P1_StoperSrobovania.StepName:='322 - Automaticky Rezim - model 5F cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 320;
            END_IF		
			
		
        323:
            SC_P1_StoperSrobovania.StepName:='323 - Automaticky Rezim - model 5F kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
            
				
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF NOT CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_5F AND
//                    NOT CAM6.RESULT.PowerCP.Nepritom_PrednejSkrutkyM4_5F AND
//                    NOT CAM6.RESULT.PowerCP.Nepritom_ZadnejSkrutkyM4_5F AND
//                    CAM6.RESULT.PowerCP.Pritom_SkrutkyDPS_4F5F AND
                    CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                    CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 328;
                ELSE 
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 328;
                END_IF
            END_IF
			
       	
		
			
        328:
            SC_P1_StoperSrobovania.StepName:='328 - Automaticky Rezim - model 5F rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
				
           
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 540;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL6_ST2:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL6_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL6_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    P1_Vizu.ZobrazHL6_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;    
                END_IF
            END_IF  
            
            
               
				
			
					
			
            //********************************************Model 5H**************************************************************//
			
        350:
            SC_P1_StoperSrobovania.StepName:='350 - Automaticky Rezim - model 5H kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;	
            
                        
			IF NOT CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
				NOT CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                CAM6.PAR.ResultFotky:= 'PASS';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 353;
            ELSE 
                CAM6.PAR.ResultFotky:= 'FAIL';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 353;
            END_IF
            
		
        353:
            SC_P1_StoperSrobovania.StepName:='353 - Automaticky Rezim - model 5H rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;    	
		         
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 355;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL7_ST2:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Vizu.ZobrazHL7_ST2:= FALSE;
                    P1_Srobov_CakaNaKameru:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 355;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL7_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 355;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P1_Vizu.ZobrazHL7_ST2:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;    
                END_IF
            END_IF    
			           
            
					
        355:			
            SC_P1_StoperSrobovania.StepName:='355 - Automaticky Rezim - model 5H vymazanie fotky CAM6';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.CMD.VymazFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.VymazFotku:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 360;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF				
					
       
       	
			
        360:
            SC_P1_StoperSrobovania.StepName:='360 - Automaticky Rezim - model 5H vystavenie signalu pre robota odober spodny busbar z paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#7s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= P1_Robot.KOM_IN.Stav_RobotOdoberaBusbary;
            
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar5H_z_Paletky:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF EDGEPOS(SC_P1_StoperSrobovania.IdleTime.Q)THEN
                IF PocetZopakovaniOdobratia <= 3 THEN
                    P1_Robot.KOM_OUT.ZopakujOdoberanie:= TRUE;
                END_IF     
                PocetZopakovaniOdobratia:= PocetZopakovaniOdobratia + 1;
            END_IF    
            
            IF NOT P1_Robot.KOM_IN.Stav_RobotOdoberaBusbary THEN
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            END_IF    
            
            
            IF P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Odobraty AND NOT P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Polozeny THEN
                P1_Robot.STAV.DrziBusbar_5H:= TRUE;
                P1_Robot.KOM_OUT.OdoberSpodnyBusbar5H_z_Paletky:= FALSE;
                P1_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
                PocetZopakovaniOdobratia:= 0;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 363;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            ELSIF PocetZopakovaniOdobratia > 3 THEN
                P1_Alarmy[160]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
                       
            
        363:
            SC_P1_StoperSrobovania.StepName:='363 - Automaticky Rezim - model 5H vystavenie signalu pre robota poloz spodny busbar na PowerCP';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Polozeny THEN
                P1_Robot.STAV.DrziBusbar_5H:= FALSE;
                P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 365;
            ELSIF NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Alarmy[145]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF		
			
           
			
			
			
        365:
            SC_P1_StoperSrobovania.StepName:='365 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj lavú skrutku K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_K30:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_K30:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 368;
                END_IF		
            END_IF
			
						
			
        368:
            SC_P1_StoperSrobovania.StepName:='360 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania lavej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                         
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5H_LavaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30);
                IF (P1_Skrutk_5H_LavaK30_Vysunutie <= P1_RemPremenne.P1_Srob5H_LavaK30_Vysunutie_HI) AND (P1_Skrutk_5H_LavaK30_Vysunutie >= P1_RemPremenne.P1_Srob5H_LavaK30_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 370;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 370;
                    ELSE	
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 370;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
	
				
        370:
            SC_P1_StoperSrobovania.StepName:='370 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj pravu skrutku K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
		
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_K30:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_K30:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 373;
                END_IF		
            END_IF
		
			
				
			
			
        373:
            SC_P1_StoperSrobovania.StepName:='373 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania pravej skrutky K30';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                       
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN); 
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaK30:= UDINT_TO_STRING(P1_Srobovanie.STAV.K30_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5H_PravaK30_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30);
                IF (P1_Skrutk_5H_PravaK30_Vysunutie <= P1_RemPremenne.P1_Srob5H_PravaK30_Vysunutie_HI) AND (P1_Skrutk_5H_PravaK30_Vysunutie >= P1_RemPremenne.P1_Srob5H_PravaK30_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF      
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 375;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                    IF P1_Srobov_K30_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 375;
                    ELSE	
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF 
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= 'FAIL';
                IF P1_Srobov_K30_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 375;
                ELSE	
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
			
			
        375:
            SC_P1_StoperSrobovania.StepName:='375 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj strednu skrutku M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujStrednuSkrutku_M5:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND NOT TEST THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujStrednuSkrutku_M5:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 378;
                END_IF		
            END_IF
			
						
			
			
        378:
            SC_P1_StoperSrobovania.StepName:='378 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania strednej skrutky M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
                 
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_StrednaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_StrednaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_StrednaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_StrednaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_StrednaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_StrednaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyUhol);
                        
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5H_StrednaM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_StrednaSkrutkaM5);
                IF (P1_Skrutk_5H_StrednaM5_Vysunutie <= P1_RemPremenne.P1_Srob5H_StrednaM5_Vysunutie_HI) AND (P1_Skrutk_5H_StrednaM5_Vysunutie >= P1_RemPremenne.P1_Srob5H_StrednaM5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF   
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 380;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5:= 'FAIL';
                    IF P1_Srobov_M5_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 380;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF	
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5:= 'FAIL';
                IF P1_Srobov_M5_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 380;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF	
			
			
			
			
			
        380:
            SC_P1_StoperSrobovania.StepName:='380 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj lavú skrutku M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_M5:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene AND NOT TEST THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_M5:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 383;
                END_IF	
            END_IF
			
			
			
			
			
        383:
            SC_P1_StoperSrobovania.StepName:='383 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania lavej skrutky M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyUhol);
           
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5H_LavaM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaM5);
                IF (P1_Skrutk_5H_LavaM5_Vysunutie <= P1_RemPremenne.P1_Srob5H_LavaM5_Vysunutie_HI) AND (P1_Skrutk_5H_LavaM5_Vysunutie >= P1_RemPremenne.P1_Srob5H_LavaM5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 385;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5:= 'FAIL';
                    IF P1_Srobov_M5_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 385;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5:= 'FAIL';
                IF P1_Srobov_M5_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 385;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF
		
	
		
			
        385:
            SC_P1_StoperSrobovania.StepName:='385 - Automaticky Rezim - model 5H vystavenie signalu zaskrutkuj pravu skrutku M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
						
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= '';
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_M5:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_M5:= FALSE;
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 387;
                END_IF		
            END_IF
		
			
			
			
			
        387:
            SC_P1_StoperSrobovania.StepName:='387 - Automaticky Rezim - model 5H kontrola stavu zaskrutkovania pravej skrutky M5';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            
            
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL);
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaM5:= UDINT_TO_STRING(P1_Srobovanie.STAV.M5_DosiahnutyUhol);
            
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Skrutk_5H_PravaM5_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaM5);
                IF (P1_Skrutk_5H_PravaM5_Vysunutie <= P1_RemPremenne.P1_Srob5H_PravaM5_Vysunutie_HI) AND (P1_Skrutk_5H_PravaM5_Vysunutie >= P1_RemPremenne.P1_Srob5H_PravaM5_Vysunutie_LO) THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF  
            
            
            
            IF P1_Srobovanie.STAV.Vysledok_Srobovania = 'OK' THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 390;
                ELSE
                    Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5:= 'FAIL';
                    IF P1_Srobov_M5_Result_OFF THEN
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 390;
                    ELSE
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 500;
                    END_IF
                END_IF	
            ELSIF P1_Srobovanie.STAV.Vysledok_Srobovania = 'NG' THEN
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5:= 'FAIL';
                IF P1_Srobov_M5_Result_OFF THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 390;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 500;
                END_IF
            END_IF	
				
			
        390:
            SC_P1_StoperSrobovania.StepName:='390 - Automaticky Rezim - model 5H presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1  THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny AND NOT P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 393;
            END_IF
			
			
        393:
            SC_P1_StoperSrobovania.StepName:='393 - Automaticky Rezim - model 5H vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 395;
            END_IF	
			
			
			
			
        395:
            SC_P1_StoperSrobovania.StepName:='395 - Inicializacia - model 5H kamerova kontrola paletky';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY AND NOT Kamery_PAUZA THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
		
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 398;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 397;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;    
            END_IF	
            
            
                    
            
		
        397:
            SC_P1_StoperSrobovania.StepName:='397 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
			
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 395;
            END_IF			
			
			
			
		
        398:
            SC_P1_StoperSrobovania.StepName:='398 - Automaticky Rezim - model 5H kontrola vysledku kamery';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;	
            
            
            IF NOT CAM6.STAV.BUSY THEN
                CAM6.CMD.Triger:= FALSE;
                IF NOT CAM6.RESULT.Paletka.Pritom_KrytuBusbarov_5H AND
                    NOT CAM6.RESULT.Paletka.Pritom_SpodnychBusbarov_5H AND
//                    CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyM5_5H AND
//                    CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyM5_5H AND
//                    CAM6.RESULT.PowerCP.Pritom_StrednejSkrutkyM5_5H AND
                    CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30 AND
                    CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30 THEN
                    CAM6.PAR.ResultFotky:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 403;
                ELSE 
                    CAM6.PAR.ResultFotky:= 'FAIL';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 403;
                END_IF
            END_IF
			
       
			
        403:
            SC_P1_StoperSrobovania.StepName:='403 - Automaticky Rezim - model 5H rozhodnutie podla kamerovej kontroly paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            P1_Srobov_CakaNaKameru:= TRUE;	
					
            IF CAM6.PAR.ResultFotky = 'PASS' THEN
                P1_Srobov_CakaNaKameru:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 540;
            ELSIF CAM6.PAR.ResultFotky = 'FAIL' THEN
                P1_Vizu.ZobrazHL8_ST2:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P1_Srobov_KAM_Result_OFF THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Vizu.ZobrazHL8_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_OK THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_OK:= FALSE;
                    P1_Vizu.ZobrazHL8_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;
                ELSIF P1_Srobov_KAM_Result_NG THEN
                    P1_Srobov_CakaNaKameru:= FALSE;
                    P1_Srobov_KAM_Result_NG:= FALSE;
                    P1_Vizu.ZobrazHL8_ST2:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 540;    
                END_IF
            END_IF  
					
			
			
            //**************************Uvolnenie robota a vyfotenie paletky po zlom skrutkovaní*****************************************************//			
			
			
			
        500:
            SC_P1_StoperSrobovania.StepName:='500 - Automaticky Rezim - presun manipulatora vzad';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
			Paletka[i].PAR.StavPaletky:= 'NG';
            
			IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny  THEN
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= FALSE;
                P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 503;
            END_IF
		
        503:
            SC_P1_StoperSrobovania.StepName:='503 - Automaticky Rezim - kontrola ci robot drzi foamy';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                IF P1_Robot.STAV.DrziFoamy_4F THEN
                    P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_Foam4F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 505;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 505;
                END_IF
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                IF P1_Robot.STAV.DrziFoamy_5F THEN
                    P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_Foam5F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 505;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 505;
                END_IF 
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN  
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 505;
            END_IF    
                
           
           
            
        505:
            SC_P1_StoperSrobovania.StepName:='505 - Automaticky Rezim - kontrola ci robot drzi busbary';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                IF P1_Robot.STAV.DrziBusbar_4F THEN
                    P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 508;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 508;
                END_IF
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                IF P1_Robot.STAV.DrziBusbar_5F THEN
                    P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 508;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 508;
                END_IF   
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                IF P1_Robot.STAV.DrziBusbar_5H THEN
                    P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 510;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 510;
                END_IF 
            END_IF    
            
            
        508:
            SC_P1_StoperSrobovania.StepName:='508 - Automaticky Rezim - kontrola ci robot drzi DPS';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                IF P1_Robot.STAV.DrziDPS_4F THEN
                    P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_DPS_4F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 510;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 510;
                END_IF
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                IF P1_Robot.STAV.DrziDPS_5F THEN
                    P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP:= TRUE;
                    IF P1_Robot.KOM_IN.Stav_DPS_5F_Polozeny THEN
                        P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP:= FALSE;
                        SC_P1_StoperSrobovania.ResetStep:= TRUE;
                        SC_P1_StoperSrobovania.Step:= 510;
                    END_IF
                ELSE    
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 510;
                END_IF   
            END_IF    
            
            
            
        510:	
            SC_P1_StoperSrobovania.StepName:='510 - Automaticky Rezim - vystavenie signalu pre robota chod do cakacej pozicie';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF	
			
            IF P1_Robot.KOM_IN.Stav_RobotPoziciaCakania THEN
                P1_Robot.KOM_OUT.Presun_CakaciaPozicia:= FALSE;
                IF NOT P1_StoperSrobovania.STAV.Porucha THEN
                    CAM6.STAV.Results_READY:= FALSE;
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 513;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 545;
                END_IF    
            END_IF	
			
			
			
        513:
            SC_P1_StoperSrobovania.StepName:='513 - Automaticky Rezim - kamerova kontrola paletky';//CAM 6//
            SC_P1_StoperSrobovania.IdleTime.PT:= T#5s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P1_StoperSrobovania.Switch1 AND CAM6.STAV.Command_READY THEN
                CAM6.CMD.Triger:= TRUE;
                SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
			
			
            IF CAM6.STAV.Results_READY AND CAM6.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM6.STAV.Results_READY:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                CAM6.PAR.ResultFotky:= 'FAIL';
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 540;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM6.STAV.Results_READY:= FALSE;
                CAM6.CMD.Triger:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 515;
            ELSIF SC_P1_StoperSrobovania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P1_Alarmy[168]:= TRUE;
                P1_PoruchaST2:= TRUE;      
            END_IF	
			
            
                 
            
            
            
            
        515:
            SC_P1_StoperSrobovania.StepName:='506 - Automaticky Rezim - cakam na opatovny triger kamery CAM6';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#1s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
            SC_P1_StoperSrobovania.IdleTime.IN:= TRUE;
            
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 513;
            END_IF	
		
        
					
			
			
					
            //Odoslanie fotiek na server//			
			
			
		
        540:
            SC_P1_StoperSrobovania.StepName:='540 - Automaticky Rezim - odoslanie fotiek na server Panasonic';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
                       
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                FTP_CAM6.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM6.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM6.INPUTS.Result:= CAM6.PAR.ResultFotky;
                Reports.Kamery.P1_CAM6_KontrolaPaletky:= CAM6.PAR.ResultFotky;
                FTP_CAM6.CMD.OdosliFotku:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
            
			
            IF FTP_CAM6.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM6.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 545;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P1_Alarmy[116]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF	
		
                  
               
				
			
			
            //Odcentrovanie paletky//				
        545:
            SC_P1_StoperSrobovania.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF
		
            IF P1_StoperSrobovania.IN.Centrovanie_ZASUNUTE_IS63 THEN
                IF P1_StoperSrobovania.STAV.Porucha THEN
                    P1_PoruchaST2:= TRUE;
                ELSE
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 550;
                END_IF   
            END_IF	
		
				
            //Odoslanie dát na server//			
		
        550:
            SC_P1_StoperSrobovania.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P1_StoperSrobovania.Switch1 THEN
                TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P1_StoperSrobovania.Switch1:= TRUE;
            END_IF			
			
            IF TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena THEN
                TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 553;
            ELSIF TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError THEN	
                //                P1_Alarmy[114]:= TRUE;
                //                P1_PoruchaST2:= TRUE;
            END_IF
			
        553:
            SC_P1_StoperSrobovania.StepName:='553 - Automaticky Rezim - kontrola odpovede servera'; 
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
	
            IF NOT TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P1_Srobovanie_ST2.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 555;
                ELSIF TRCB_P1_Srobovanie_ST2.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P1_StoperSrobovania.ResetStep:= TRUE;
                    SC_P1_StoperSrobovania.Step:= 555;
                END_IF	
            END_IF
			
		
        555:
            SC_P1_StoperSrobovania.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P1_StoperSrobovania.ResetStep:= TRUE;
            SC_P1_StoperSrobovania.Step:= 560;	
			
			

            //Vyvezenie paletky//			
			
        560:
            SC_P1_StoperSrobovania.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na akumulacny stoper';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
            
            
            
            IF P1_StoperSrobovania.KoniecCyklu THEN
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;
            ELSIF P1_StoperSrobovania.STAV.Porucha THEN
                Paletka[i].PAR.StavPaletky:= 'NG';
                P1_PoruchaST2:= TRUE;
            ELSIF ((NOT P1_AkumulacnyStoper.IN.PritomnPaletky_IS45 AND SC_P1_AkumulacnyStoper.Step = 100) OR (P1_AkumulacnyStoper.OUT.ZasunStoper_YV74 AND SC_P1_AkumulacnyStoper.Step = 105)) AND NOT P1_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky  THEN
                P1_StoperSrobovania.OUT.ZasunStoper_YV110:= TRUE;
                P1_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 561;
            END_IF	
		
		
        561:
            SC_P1_StoperSrobovania.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na akumulacny stoper';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#200ms;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#10s;
		
            SC_P1_StoperSrobovania.AlarmTime.IN:= P1_StoperSrobovania.IN.PritomnostPaletky_S16;
            
            
            SC_P1_StoperSrobovania.IdleTime.IN:= NOT P1_StoperSrobovania.IN.PritomnostPaletky_S16;
			
            IF NOT P1_StoperSrobovania.IN.PritomnostPaletky_S16 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                TestovaciKus:= FALSE;
                CisloFotky:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P1_StrednaSkrutkaM5:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_StrednaSkrutkaM5:= '';
                Reports.Kamery.P1_CAM6_KontrolaPaletky:= '';
                P1_Robot.STAV.DrziBusbar_4F:= FALSE;
                P1_Robot.STAV.DrziBusbar_5F:= FALSE;
                P1_Robot.STAV.DrziBusbar_5H:= FALSE;
                P1_Robot.STAV.DrziDPS_4F:= FALSE;
                P1_Robot.STAV.DrziDPS_5F:= FALSE;
                P1_Robot.STAV.DrziFoamy_4F:= FALSE;
                P1_Robot.STAV.DrziFoamy_5F:= FALSE;
            END_IF     
                         
            
            IF SC_P1_StoperSrobovania.IdleTime.Q THEN
                P1_StoperSrobovania.OUT.ZasunStoper_YV110:= FALSE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 100;
            ELSIF SC_P1_StoperSrobovania.AlarmTime.Q THEN
                P1_Alarmy[161]:= TRUE;
                P1_Pracovisko.KoniecCyklu:= TRUE;
                SC_P1_StoperSrobovania.ResetStep:= TRUE;
                SC_P1_StoperSrobovania.Step:= 0;
            END_IF		
			
			
                    
					
		
				
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P1_StoperSrobovania.StepName:='700 - Manualny Rezim';
            SC_P1_StoperSrobovania.IdleTime.PT:= T#8s;
            SC_P1_StoperSrobovania.AlarmTime.PT:= T#5s;
		
		
		
		
		
		
		
	
	
	
    END_CASE
	
	
	
                END_PROGRAM

PROGRAM _EXIT
                (* Insert code here *)
	 
                END_PROGRAM



PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    
END_PROGRAM

PROGRAM _CYCLIC

	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_StoperZvarania);
	
    //Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
	
	
	
    //Reset sekcie //
    IF P2_StoperZvarania.Reset THEN
        SC_P2_StoperZvarania.Step:= 0;
        P2_StoperZvarania.Reset:= FALSE;
    END_IF	
	
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_StoperZvarania.Automat THEN
        SC_P2_StoperZvarania.Step:= 0;
    END_IF 
    
    
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN  
        Triger_0:= TRUE;
        IF P2_StoperZvarania.IN.PritomnostPaletky_S9 AND P2_StoperZvarania.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperZvarania.KoniecCyklu:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN     
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperZvarania.KoniecCyklu:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF  
    
    
    
    
    //Porucha stanice//
    IF P2_PoruchaST4 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P2_StoperZvarania.IN.PritomnostPaletky_S9 AND P2_StoperZvarania.Automat THEN
            SC_P2_Zvaranie.Step:= 0;
            SC_P2_Cistenie.Step:= 0;
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperZvarania.KoniecCyklu:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN     
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperZvarania.KoniecCyklu:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            END_IF
        ELSE
            SC_P2_StoperZvarania.ResetStep:= TRUE;
            SC_P2_StoperZvarania.Step:= 0;
        END_IF    
    END_IF   
    
    
    IF NOT P2_PoruchaST4 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
	
    CASE SC_P2_StoperZvarania.Step OF 
	
	
        0:
            SC_P2_StoperZvarania.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            P2_StoperZvarania.Automat:= FALSE;
            P2_StoperZvarania.KoniecCyklu:= FALSE;
            P2_StoperZvarania.Manual:= FALSE;
            P2_StoperZvarania.STAV.PoINIT:= FALSE;
            P2_StoperZvarania.OUT.ZasunStoper_YV59:= FALSE;
            P2_StoperZvarania.OUT.KOM_Zvaranie_START:= FALSE;
            P2_Zvaranie.OUT.KOM_ZavaranieUkoncene:= FALSE;
            P2_StoperZvarania.OUT.KOM_Cistenie_START:= FALSE;
            P2_Cistenie.OUT.KOM_CistenieUkoncene:= FALSE;
            P2_StoperZvarania.OUT.KOM_Zatlacanie_START:= FALSE;
            P2_Zvaranie.OUT.KOM_ZatlacanieUkoncene:= FALSE;
            CAM11.CMD.Triger:= FALSE;
            CAM11.STAV.Results_READY:= FALSE;
            FTP_CAM11.CMD.OdosliFotku:= FALSE;
            FTP_CAM11.CMD.VymazFotku:= FALSE;
            CAM12.CMD.Triger:= FALSE;
            CAM12.STAV.Results_READY:= FALSE;
            FTP_CAM12.CMD.OdosliFotku:= FALSE;
            FTP_CAM12.CMD.VymazFotku:= FALSE;
            P2_Zvaranie_ManipulaciaUkoncena:= FALSE;
            P2_StoperZvarania.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P2_StoperZvarania.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2:= FALSE;
					
            PrecitaneCisloPaletky:= '';
            P2_Robot.KOM_OUT.Odober_LavyMvCase4F:= FALSE;
            P2_Robot.KOM_OUT.Odober_LavyMvCase5F:= FALSE;
            P2_Robot.KOM_OUT.Odober_LavyMvCase5H:= FALSE;
            P2_Robot.KOM_OUT.Odober_PravyMvCase4F:= FALSE;
            P2_Robot.KOM_OUT.Odober_PravyMvCase5F:= FALSE;
            P2_Robot.KOM_OUT.Odober_PravyMvCase5H:= FALSE;
            P2_Robot.KOM_OUT.Odober_TopCover4F:= FALSE;
            P2_Robot.KOM_OUT.Odober_TopCover5F:= FALSE;
            P2_Robot.KOM_OUT.Odober_TopCover5H:= FALSE;
            P2_Robot.KOM_OUT.Poloz_LavyMvCase4F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_PravyMvCase4F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_LavyMvCase5F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_PravyMvCase5F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_LavyMvCase5H:= FALSE;
            P2_Robot.KOM_OUT.Poloz_PravyMvCase5H:= FALSE;
            P2_Robot.KOM_OUT.Poloz_TopCover4F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_TopCover5F:= FALSE;
            P2_Robot.KOM_OUT.Poloz_TopCover5H:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_4F:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5F:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5H:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_OtacajPowerCP:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_4F:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5F:= FALSE;
            P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5H:= FALSE;
            P2_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            P2_Robot.KOM_OUT.ZmenaGripra_4F5F:= FALSE;
            P2_Robot.KOM_OUT.ZmenaGripra_5H:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_Zvaranie_ST6.CMD.START_Merania_1:= FALSE;
            Taktime_Zvaranie_ST6.CMD.START_Merania_2:= FALSE;
            P2_StoperZvarania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P2_Zvaranie_KAM_Result_OK:= FALSE;
            P2_Zvaranie_KAM_Result_NG:= FALSE;
            P2_Zvaranie_CakaNaKameru:= FALSE;	
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= FALSE;
            CisloFotky:= 0;
            P2_Zvaranie_KAM_Result_OK:= FALSE;
            P2_Zvaranie_KAM_Result_NG:= FALSE;
            P2_Vizu.ZobrazHL1_ST6:= FALSE;
            P2_Vizu.ZobrazHL2_ST6:= FALSE;
            P2_Vizu.ZobrazHL3_ST6:= FALSE;
            P2_Vizu.ZobrazHL4_ST6:= FALSE;
            P2_Vizu.ZobrazHL5_ST6:= FALSE;
            P2_Vizu.ZobrazHL6_ST6:= FALSE;
            P2_Vizu.ZobrazHL7_ST6:= FALSE;
            P2_Vizu.ZobrazHL8_ST6:= FALSE;
            TRCB_P2_Zvaranie_OpatovnyDopyt:= FALSE;
            TRCB_P2_Zvaranie_PaletkaNG:= FALSE;
            PocetZopakovaniOdobratia:= 0;
            PocetTrigrovKamery:= 0;
            
            
            IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 1;
            END_IF
	
        1:
            SC_P2_StoperZvarania.StepName:='1 - Cakam na spustenie vyroby';
            P2_StoperZvarania.KoniecCyklu:= FALSE;
            IF P2_StoperZvarania.Automat THEN
                SC_P2_StoperZvarania.Step:= 2;
            ELSIF P2_StoperZvarania.Manual THEN
                SC_P2_StoperZvarania.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//
		
		
        2:
            SC_P2_StoperZvarania.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_StoperZvarania.IdleTime.PT:= T#4s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
									
            IF P2_Zvaranie.STAV.PoINIT AND P2_Cistenie.STAV.PoINIT AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 3;
            END_IF
		
        3:
            SC_P2_StoperZvarania.StepName:='3 - Inicializacia - vymazanie adresarov kamier';
            SC_P2_StoperZvarania.IdleTime.PT:= T#4s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;	
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.CMD.VymazFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.VymazFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 10;
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
			
	
        10:
            SC_P2_StoperZvarania.StepName:='10 - Inicializacia - zasunutie centrovacky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#4s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperZvarania.IN.Centrovanie_ZASUNUTE_IS17 AND P2_Dopravniky.STAV.PoINIT THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 13;
            END_IF	
			
			
			
	
	
        13:
            SC_P2_StoperZvarania.StepName:='6 - Inicializacia - hladanie paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
	
            IF P2_StoperZvarania.IN.PritomnostPaletky_S9 THEN
                P2_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 20;		 
            ELSIF SC_P2_StoperZvarania.IdleTime.Q THEN
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 100;
            END_IF
		
		
        20:
            SC_P2_StoperZvarania.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperZvarania.IN.PrecitaneCisloPaletky_S9);
                i:= 0;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 23;
            END_IF	
			
        23:
            SC_P2_StoperZvarania.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[219]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperZvarania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperZvarania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 30;
            END_IF	
		
        30:
            SC_P2_StoperZvarania.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_6' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_6' THEN 
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_6' THEN
                Revork:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 33;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_6' THEN
                Revork:= FALSE;
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            END_IF	
            
        33:
            SC_P2_StoperZvarania.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            ELSE
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 35;
            END_IF	
			
        35:
            SC_P2_StoperZvarania.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 38;
            ELSE
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 100;
            END_IF	
			
        38:
            SC_P2_StoperZvarania.StepName:='38 - Inicializacia - kontrola odoslania fotiek';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;   
            
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            ELSE
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 40;
            END_IF	
            
         
        40:
            SC_P2_StoperZvarania.StepName:='40 - Inicializacia - zacentrovanie paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperZvarania.IN.Centrovanie_VYSUNUTE_IS16 THEN
                CAM12.STAV.Results_READY:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 45;
            END_IF	    
            
            
        45:
            SC_P2_StoperZvarania.StepName:='45 - Inicializacia - kamerova kontrola paletky CAM12'; //CAM 12//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;      
            
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM12.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM12.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM12.STAV.Results_READY AND CAM12.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM12.STAV.Results_READY:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 50;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM12.STAV.Results_READY:= FALSE;
                CAM12.CMD.Triger:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 48;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[297]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
		
            
            
            
            
            
            
        48:
            SC_P2_StoperZvarania.StepName:='48 - Inicializacia - cakam na opatovny triger kamery CAM12';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;   
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 45;
            END_IF
            
            
        50:
            SC_P2_StoperZvarania.StepName:='50 - Inicializacia - kamerova kontrola PowerCP CAM11';//CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
		
            IF NOT CAM12.STAV.BUSY THEN
                CAM12.CMD.Triger:= FALSE;
                IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                    CAM11.CMD.Triger:= TRUE;
                    SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                    SC_P2_StoperZvarania.Switch1:= TRUE;
                END_IF
            END_IF
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 55;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 53;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
			
            
                
            
            
            
        53:
            SC_P2_StoperZvarania.StepName:='53 - Inicializacia - cakam na opatovny triger kamery CAM11';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;   
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 50;
            END_IF
       
            
        55:
            SC_P2_StoperZvarania.StepName:='50 - Inicializacia - kontrola vysledku kamery podla typu modelu';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            IF NOT CAM11.STAV.BUSY THEN
                CAM11.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_TopCover_4F AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_4F AND
                        CAM11.RESULT.PowerCP.Pritomn_PowerCP_4F THEN
                        CAM11.PAR.ResultFotky:= 'PASS';
                        CAM12.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58; 
                    ELSE
                        CAM11.PAR.ResultFotky:= 'FAIL';
                        CAM12.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58;
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_TopCover_5H5F AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_5F AND
                        CAM11.RESULT.PowerCP.Pritomn_PowerCP_5F THEN
                        CAM11.PAR.ResultFotky:= 'PASS';
                        CAM12.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58;
                    ELSE
                        CAM11.PAR.ResultFotky:= 'FAIL';
                        CAM12.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58;
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                        CAM12.RESULT.Paletka.Pritomn_TopCover_5H5F AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                        NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_5H AND
                        CAM11.RESULT.PowerCP.Pritomn_PowerCP_5H THEN
                        CAM11.PAR.ResultFotky:= 'PASS';
                        CAM12.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58; 
                    ELSE
                        CAM11.PAR.ResultFotky:= 'FAIL';
                        CAM12.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 58;
                    END_IF	
                END_IF
            END_IF    
            
            
        58:
            SC_P2_StoperZvarania.StepName:='58 - Inicializacia - vymazanie adresarov kamier';
            SC_P2_StoperZvarania.IdleTime.PT:= T#4s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;	
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.CMD.VymazFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.VymazFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 60;
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
            
            
        60:
            SC_P2_StoperZvarania.StepName:='60 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            
            IF CAM11.PAR.ResultFotky = 'PASS' AND CAM12.PAR.ResultFotky = 'PASS' THEN
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 208;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 308;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 407;
                END_IF    
            ELSIF (CAM11.PAR.ResultFotky = 'FAIL' OR CAM12.PAR.ResultFotky = 'FAIL') THEN
                P2_StoperZvarania.STAV.PoINIT:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 545;
            END_IF
            
                
		
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P2_StoperZvarania.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF P2_StoperZvarania.IN.PritomnostPaletky_S9 THEN
               P2_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
                
            SC_P2_StoperZvarania.IdleTime.IN:= P2_StoperZvarania.IN.PritomnostPaletky_S9;
			
            IF EDGEPOS(P2_StoperZvarania.IN.PritomnostPaletky_S9)THEN
                IF NOT Taktime_Zvaranie_ST6.CMD.START_Merania_1 THEN
                    Taktime_Zvaranie_ST6.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Zvaranie_ST6.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            
            
            IF P2_StoperZvarania.KoniecCyklu THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q THEN
                P2_Zvaranie_ManipulaciaUkoncena:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 101;
            END_IF
           
		
        101:
            SC_P2_StoperZvarania.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#500ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            
            PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperZvarania.IN.PrecitaneCisloPaletky_S9);
            i:= 0;
            SC_P2_StoperZvarania.ResetStep:= TRUE;
            SC_P2_StoperZvarania.Step:= 103;
           
			
        103:
            SC_P2_StoperZvarania.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[219]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperZvarania.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperZvarania.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 104;
            END_IF	
		
        104:
            SC_P2_StoperZvarania.StepName:='104 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_6' THEN
                TestovaciKus:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 108;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_6' THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_6' THEN
                Revork:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 108;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_6' THEN
                Revork:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            END_IF		
			
		
			
        108:
            SC_P2_StoperZvarania.StepName:='108 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky '; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 110;
            ELSIF TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError THEN	
                TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 115;
            END_IF	
					
		
			
        110:
            SC_P2_StoperZvarania.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena AND P2_StoperZvarania.IN.Centrovanie_VYSUNUTE_IS16 THEN
                IF TRCB_P2_Zvaranie_ST6.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P2_Zvaranie_ST6.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST6' THEN
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 118;
                    ELSIF TRCB_P2_Zvaranie_ST6.OUTPUTS.DruhCinnostiNaPaletke = 'SMP;ST6' THEN
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 118;    
                    END_IF    
                ELSIF TRCB_P2_Zvaranie_ST6.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 115;
                END_IF	
            END_IF
		
            
        115:
            SC_P2_StoperZvarania.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            
            
            P2_Vizu.ZobrazHL8_ST6:= TRUE;
            
            IF TRCB_P2_Zvaranie_OpatovnyDopyt THEN
                TRCB_P2_Zvaranie_OpatovnyDopyt:= FALSE; 
                P2_Vizu.ZobrazHL8_ST6:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 108;
            ELSIF TRCB_P2_Zvaranie_PaletkaNG THEN
                TRCB_P2_Zvaranie_PaletkaNG:= FALSE;
                P2_Vizu.ZobrazHL8_ST6:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 116;
            END_IF   
            
            
            
            
            
        116:
            SC_P2_StoperZvarania.StepName:='116 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperZvarania.IN.Centrovanie_ZASUNUTE_IS17 THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 560;
            END_IF	       
            
		
	
        118:
            SC_P2_StoperZvarania.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperZvarania.IN.Centrovanie_VYSUNUTE_IS16 THEN
                IF TestovaciKus THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 130;
                ELSE    
                    CAM12.STAV.Results_READY:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 120;
                END_IF
            END_IF		
			
			
		
        120:
            SC_P2_StoperZvarania.StepName:='120 - Automaticky Rezim - kamerova kontrola paletky CAM12';//CAM 12//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM12.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM12.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM12.STAV.Results_READY AND CAM12.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM12.STAV.Results_READY:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 125;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM12.STAV.Results_READY:= FALSE;
                CAM12.CMD.Triger:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 122;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[297]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
		
               
            
            
        122:
            SC_P2_StoperZvarania.StepName:='122 - Automaticky Rezim - cakam na opatovny triger kamery CAM12';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;   
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 120;
            END_IF
            
            
        125:
            SC_P2_StoperZvarania.StepName:='125 - Automaticky Rezim - kamerova kontrola PowerCP CAM11';//CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
		
            IF NOT CAM12.STAV.BUSY THEN
                CAM12.CMD.Triger:= FALSE;
                IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                    CAM11.CMD.Triger:= TRUE;
                    SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                    SC_P2_StoperZvarania.Switch1:= TRUE;
                END_IF
            END_IF
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 128;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 126;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
			
            
                       
            
            
        126:
            SC_P2_StoperZvarania.StepName:='126 - Automaticky Rezim - cakam na opatovny triger kamery CAM11';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;   
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 125;
            END_IF
       
            
            
            
            
        128:
            SC_P2_StoperZvarania.StepName:='128 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
			
            IF NOT CAM11.STAV.BUSY AND NOT CAM12.STAV.BUSY THEN
                CAM11.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F'  THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 200;     
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 300;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 400; 
                END_IF	
            END_IF
			

        130:
            SC_P2_StoperZvarania.StepName:='130 - Automaticky Rezim - testovanie rozhodnutie podla typu modelu';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            
            IF Linka.PAR.ZvolenyModel = '4F'  THEN
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 210;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                CAM11.STAV.Results_READY:= FALSE; 
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 310;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 545; 
            END_IF	
         
            
            
            
            
            

			
			
            //*************************Model 4F*********************************//				
		
        200:
            SC_P2_StoperZvarania.StepName:='200 - Automaticky Rezim - model 4F, kontrola vysledkov kamier';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
				
            
            IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_TopCover_4F AND
                NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_4F AND
                CAM11.RESULT.PowerCP.Pritomn_PowerCP_4F THEN
                CAM11.PAR.ResultFotky:= 'PASS';
                CAM12.PAR.ResultFotky:= 'PASS';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 203; 
            ELSE
                CAM11.PAR.ResultFotky:= 'FAIL';
                CAM12.PAR.ResultFotky:= 'FAIL';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 203;
            END_IF	
            
			
        203:
            SC_P2_StoperZvarania.StepName:='203 - Automaticky Rezim - model 4F,rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' AND CAM12.PAR.ResultFotky = 'PASS' THEN
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 205;
            ELSIF (CAM11.PAR.ResultFotky = 'FAIL' OR CAM12.PAR.ResultFotky = 'FAIL') THEN    
                P2_Vizu.ZobrazHL1_ST6:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL1_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 205;
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL1_ST6:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    CAM12.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 205;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL1_ST6:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;    
                END_IF    
            END_IF
            
             
			
        205:
            SC_P2_StoperZvarania.StepName:='205 - Automaticky Rezim - model 4F, vymazanie fotiek CAM11 a CAM12';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.CMD.VymazFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.VymazFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 208;
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
			
			
       
			
        208:
            SC_P2_StoperZvarania.StepName:='208 - Automaticky Rezim - model 4F,vystavenie signalu start zvarania';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
												
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P2_StoperZvarania.OUT.KOM_Zvaranie_START:= TRUE;
                P2_Zvaranie.STAV.Vysledok_Zvarania:= '';
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.OUT.KOM_ZavaranieUkoncene THEN
                P2_Zvaranie.OUT.KOM_ZavaranieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Zvaranie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 210;
            END_IF
			
		
        210:
            SC_P2_StoperZvarania.StepName:='210 - Automaticky Rezim - model 4F,kamerova kontrola paletky po zvarani CAM11 '; //CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM11.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 213;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 212;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
		
            
                      
            
            
            
            
        212:
            SC_P2_StoperZvarania.StepName:='212 - Automaticky Rezim - cakam na opatovny triger kamery CAM11 ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 210;
            END_IF
            
            
            
        213:
            SC_P2_StoperZvarania.StepName:='213 - Automaticky Rezim - model 4F,vysledok kamerovej kontroly paletky po zvarani';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT CAM11.STAV.BUSY THEN
                CAM11.CMD.Triger:= FALSE;
                IF CAM11.RESULT.PowerCP.LavyBusbar_Zvaranie_OK AND
                    CAM11.RESULT.PowerCP.PravyBusbar_Zvaranie_OK THEN
                    CAM11.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 215;
                ELSE
                    CAM11.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 215;
                END_IF
            END_IF
		
            
        215:
            SC_P2_StoperZvarania.StepName:='215 - Automaticky Rezim - model 4F,kontrola vysledku zvarania';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;
			
			
            IF CAM11.PAR.ResultFotky = 'PASS' THEN
                Reports.Zvaranie.VyslednyReport:= 'PASS';
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 218;
            ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN
                P2_Vizu.ZobrazHL4_ST6:= TRUE;
                IF TestovaciKus THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 218;
                ELSIF P2_Zvaranie_KAM_Result_OFF THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 218;
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    Reports.Zvaranie.VyslednyReport:= 'PASS';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 218;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;
                END_IF
            END_IF    
                     
             
					
			
            
        218:
            SC_P2_StoperZvarania.StepName:='218 - Automaticky Rezim - model 4F, odoslanie fotky na server Panasonic, ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM11.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM11.INPUTS.Result:= CAM11.PAR.ResultFotky;
                Reports.Kamery.P2_CAM11_KontrolaZvaru:= CAM11.PAR.ResultFotky;
            
                FTP_CAM11.CMD.OdosliFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.OdosliFotku:= FALSE;
                IF CAM11.PAR.ResultFotky = 'PASS' THEN
                    IF TestovaciKus THEN
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 545; 
                    ELSE    
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 219;
                    END_IF    
                ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN
                    IF TestovaciKus THEN
                        Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 545;
                    ELSE
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 219;
                    END_IF    
                END_IF 
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF		
			
        219:
            SC_P2_StoperZvarania.StepName:='219 - Automaticky Rezim - model 4F,cakam na spustenie cistenia';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            IF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND
                NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            ELSE
                SC_P2_StoperZvarania.IdleTime.IN:= FALSE;
            END_IF    
            
                       
            IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND NOT P2_Robot.STAV.Srobovanie_PrebiehaManipulacia THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 220;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 220;
            END_IF    
            
            
            
					
        220:
            SC_P2_StoperZvarania.StepName:='220 - Automaticky Rezim - model 4F,vystavenie signalu start cistenia, ulozenie MV case a Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#10s;
			
           	SC_P2_StoperZvarania.AlarmTime.IN:= P2_Robot.KOM_IN.Stav_RobotOdoberaCover;
           
            
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= TRUE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= TRUE;
                SC_P2_StoperZvarania.AlarmTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF P2_Cistenie.OUT.KOM_CistenieUkoncene THEN
                P2_Cistenie.OUT.KOM_CistenieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 248;
            ELSIF SC_P2_StoperZvarania.AlarmTime.Q THEN
                P2_Alarmy[285]:= TRUE;
                P2_PoruchaST4:= TRUE;  
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST4:= TRUE;     
            END_IF	
			
		
			
        248:
            SC_P2_StoperZvarania.StepName:='248 - Automaticky Rezim - model 4F,kamerova kontrola polozeneho Top Coveru CAM11, zmena gripra';//CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie  THEN
                CAM11.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= FALSE;
                P2_Robot.KOM_OUT.ZmenaGripra_4F5F:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 250;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 249;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
		
                     
            
            
        249:
            SC_P2_StoperZvarania.StepName:='249 - Automaticky Rezim - model 4F cakam na opatovny triger kamery CAM11 ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 248;
            END_IF    
            
            
            
			
        250:
            SC_P2_StoperZvarania.StepName:='250 - Automaticky Rezim - model 4F,vysledok kamerovej kontroly polozeneho Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT CAM11.STAV.BUSY  THEN
                CAM11.CMD.Triger:= FALSE;
                IF CAM11.RESULT.PowerCP.Pritomn_TopCover_4F THEN
                    CAM11.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 255;
                ELSE
                    CAM11.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 255;
                END_IF	
            END_IF
			
	
		
		
        255:
            SC_P2_StoperZvarania.StepName:='255 - Automaticky Rezim - model 4F, rozhodnutie podla kamerovej kontroly PowerCP';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 540;
            ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN 
                P2_Vizu.ZobrazHL5_ST6:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL5_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;		
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Vizu.ZobrazHL5_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL5_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;      
                END_IF
            END_IF	
			
		   
               
            
            
			
			
            //*************************Model 5F*********************************//				
		
        300:
            SC_P2_StoperZvarania.StepName:='300 - Automaticky Rezim - model 5F, kontrola vysledkov kamier';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
				
            
            IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_TopCover_5H5F AND
                NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_5F AND
                CAM11.RESULT.PowerCP.Pritomn_PowerCP_5F THEN
                CAM11.PAR.ResultFotky:= 'PASS';
                CAM12.PAR.ResultFotky:= 'PASS';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 303;
            ELSE
                CAM11.PAR.ResultFotky:= 'FAIL';
                CAM12.PAR.ResultFotky:= 'FAIL';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 303;
            END_IF	
            
            
        303:
            SC_P2_StoperZvarania.StepName:='303 - Automaticky Rezim - model 5F,rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' AND CAM12.PAR.ResultFotky = 'PASS' THEN
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 305;
            ELSIF (CAM11.PAR.ResultFotky = 'FAIL' OR CAM12.PAR.ResultFotky = 'FAIL') THEN     
                P2_Vizu.ZobrazHL2_ST6:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 305;
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL2_ST6:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    CAM12.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 305;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL2_ST6:= FALSE;
                    Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;      
                END_IF
            END_IF	
			  
					
        305:
            SC_P2_StoperZvarania.StepName:='305 - Automaticky Rezim - model 5F, vymazanie fotiek CAM11 a CAM12';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.CMD.VymazFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.VymazFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 308;
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
			
        308:
            SC_P2_StoperZvarania.StepName:='308 - Automaticky Rezim - model 5F,vystavenie signalu start zvarania';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
												
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                P2_StoperZvarania.OUT.KOM_Zvaranie_START:= TRUE;
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P2_Zvaranie.STAV.Vysledok_Zvarania:= '';
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.OUT.KOM_ZavaranieUkoncene THEN
                P2_Zvaranie.OUT.KOM_ZavaranieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Zvaranie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 310;
            END_IF
		
      
		
        310:
            SC_P2_StoperZvarania.StepName:='310 - Automaticky Rezim - model 5F,kamerova kontrola PowerCP po zvarani CAM11'; //CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM11.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 313;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 311;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
		
                        
            
            
        311:
            SC_P2_StoperZvarania.StepName:='311 - Automaticky Rezim - cakam na opatovny triger kamery CAM11 ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 310;
            END_IF    
                
            
            
            
        313:
            SC_P2_StoperZvarania.StepName:='313 - Automaticky Rezim - model 5F,vysledok kamerovej kontroly PowerCP po zvarani';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT CAM11.STAV.BUSY  THEN
                CAM11.CMD.Triger:= FALSE;
                IF CAM11.RESULT.PowerCP.LavyBusbar_Zvaranie_OK AND
                    CAM11.RESULT.PowerCP.PravyBusbar_Zvaranie_OK THEN
                    CAM11.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 315;
                ELSE
                    CAM11.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 315;
                END_IF	
            END_IF
					
			
			
            
        315:
            SC_P2_StoperZvarania.StepName:='315 - Automaticky Rezim - model 5F,kontrola vysledku zvarania';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;
			
               
            IF CAM11.PAR.ResultFotky = 'PASS' THEN
                Reports.Zvaranie.VyslednyReport:= 'PASS';
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 318;
            ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN
                P2_Vizu.ZobrazHL4_ST6:= TRUE;
                IF TestovaciKus THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 318;
                ELSIF P2_Zvaranie_KAM_Result_OFF THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 318;
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Reports.Zvaranie.VyslednyReport:= 'PASS';
                    CAM11.PAR.ResultFotky:= 'PASS';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 318;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Reports.Zvaranie.VyslednyReport:= 'FAIL';
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL4_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;    
                END_IF
            END_IF    
            
                 
            
        318:
            SC_P2_StoperZvarania.StepName:='318 - Automaticky Rezim - model 5F, odoslanie fotky na server Panasonic';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM11.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM11.INPUTS.Result:= CAM11.PAR.ResultFotky;
                Reports.Kamery.P2_CAM11_KontrolaZvaru:= CAM11.PAR.ResultFotky;
            
                FTP_CAM11.CMD.OdosliFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            
            
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.OdosliFotku:= FALSE;
                IF CAM11.PAR.ResultFotky = 'PASS' THEN
                    IF TestovaciKus THEN
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 545;
                    ELSE    
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 319;
                    END_IF    
                ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN
                    IF TestovaciKus THEN
                        Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 545;
                    ELSE
                        SC_P2_StoperZvarania.ResetStep:= TRUE;
                        SC_P2_StoperZvarania.Step:= 319;
                    END_IF    
                END_IF 
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF			
			
        
        319:
            SC_P2_StoperZvarania.StepName:='319 - Automaticky Rezim - model 5F,cakam na spustenie cistenia';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            IF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND
                NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            ELSE
                SC_P2_StoperZvarania.IdleTime.IN:= FALSE;
            END_IF   
            
            
            
           
            IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND NOT P2_Robot.STAV.Srobovanie_PrebiehaManipulacia THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 320;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 320;
            END_IF     
			
                     
					
        320:
            SC_P2_StoperZvarania.StepName:='320 - Automaticky Rezim - model 5F,vystavenie signalu start cistenia, ulozenie MV case a Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#10s;
			
            SC_P2_StoperZvarania.AlarmTime.IN:= P2_Robot.KOM_IN.Stav_RobotOdoberaCover;
												
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= TRUE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF P2_Cistenie.OUT.KOM_CistenieUkoncene THEN
                P2_Cistenie.OUT.KOM_CistenieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 350;
            ELSIF SC_P2_StoperZvarania.AlarmTime.Q THEN
                P2_Alarmy[285]:= TRUE;
                P2_PoruchaST4:= TRUE; 
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST4:= TRUE;   
            END_IF	
			
		
			
        350:
            SC_P2_StoperZvarania.StepName:='350 - Automaticky Rezim - model 5F,kamerova kontrola polozeneho Top Coveru CAM11, zmena gripra';//CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM11.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= FALSE;
                P2_Robot.KOM_OUT.ZmenaGripra_4F5F:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 353;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.STAV.Results_READY:= FALSE;
                CAM11.CMD.Triger:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 351;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;    
            END_IF	
		
            
                       
            
            
            
        351:
            SC_P2_StoperZvarania.StepName:='351 - Automaticky Rezim - cakam na opatovny triger kamery CAM11 ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 350;
            END_IF    
                    
            
            
			
        353:
            SC_P2_StoperZvarania.StepName:='353 - Automaticky Rezim - model 5F,vysledok kamerovej kontroly polozeneho Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT CAM11.STAV.BUSY THEN
                CAM11.CMD.Triger:= FALSE;
                IF CAM11.RESULT.PowerCP.Pritomn_TopCover_5F THEN
                    CAM11.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 358;
                ELSE
                    CAM11.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 358;
                END_IF	
            END_IF
			
			
        358:
            SC_P2_StoperZvarania.StepName:='358 - Automaticky Rezim - model 5F, rozhodnutie podla kamerovej kontroly PowerCP';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 540;
            ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN  
                P2_Vizu.ZobrazHL6_ST6:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL6_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;	
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Vizu.ZobrazHL6_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL6_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;  
                END_IF    
            END_IF	
			
			
				
		
            //*************************Model 5H*********************************//		
        400:
            SC_P2_StoperZvarania.StepName:='400 - Automaticky Rezim - model 5H, kontrola vysledkov kamier';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;	
				
            
            IF CAM12.RESULT.Paletka.Pritomn_LavyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_PravyMVcase AND
                CAM12.RESULT.Paletka.Pritomn_TopCover_5H5F AND
                NOT CAM11.RESULT.PowerCP.Pritomn_LavyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_PravyMVcase AND
                NOT CAM11.RESULT.PowerCP.Pritomn_TopCover_5H AND
                CAM11.RESULT.PowerCP.Pritomn_PowerCP_5H THEN
                CAM11.PAR.ResultFotky:= 'PASS';
                CAM12.PAR.ResultFotky:= 'PASS';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 403; 
            ELSE
                CAM11.PAR.ResultFotky:= 'FAIL';
                CAM12.PAR.ResultFotky:= 'FAIL';
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 403;
            END_IF	
            
		
            
        403:
            SC_P2_StoperZvarania.StepName:='403 - Automaticky Rezim - model 5H,rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' AND CAM12.PAR.ResultFotky = 'PASS' THEN
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 405;
            ELSIF (CAM11.PAR.ResultFotky = 'FAIL' OR CAM12.PAR.ResultFotky = 'FAIL') THEN     
                P2_Vizu.ZobrazHL3_ST6:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL3_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 405;	
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    CAM11.PAR.ResultFotky:= 'PASS';
                    CAM12.PAR.ResultFotky:= 'PASS';
                    P2_Vizu.ZobrazHL3_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 405;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                    P2_Vizu.ZobrazHL3_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;  
                END_IF    
            END_IF		
			     
              
			
			
				
        405:
            SC_P2_StoperZvarania.StepName:='405 - Automaticky Rezim - model 5H, vymazanie fotiek CAM11 a CAM12';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.CMD.VymazFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.VymazFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 407;
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
			
			
        407:
            SC_P2_StoperZvarania.StepName:='407 - Automaticky Rezim - model 5H,cakam na spustenie cistenia';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            IF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND
                NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            ELSE
                SC_P2_StoperZvarania.IdleTime.IN:= FALSE;
            END_IF   
            
            
           
           
            IF P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND NOT P2_Robot.STAV.Srobovanie_PrebiehaManipulacia THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 408;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 408;
            END_IF     
			
				
			
			
        408:
            SC_P2_StoperZvarania.StepName:='408 - Automaticky Rezim - model 5H,vystavenie signalu start cistenia,  ulozenia MV Case a Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#10s;
			
			SC_P2_StoperZvarania.IdleTime.IN:= P2_Robot.KOM_IN.Stav_RobotOdoberaCover;
            
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= TRUE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            
            IF EDGEPOS(SC_P2_StoperZvarania.IdleTime.Q)THEN
                IF PocetZopakovaniOdobratia <= 3 THEN
                    P2_Robot.KOM_OUT.ZopakujOdoberanie:= TRUE;
                END_IF    
                PocetZopakovaniOdobratia:= PocetZopakovaniOdobratia + 1;
            END_IF
            
            IF NOT P2_Robot.KOM_IN.Stav_RobotOdoberaCover THEN
                P2_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
            END_IF    
            
            IF P2_Cistenie.OUT.KOM_CistenieUkoncene THEN
                P2_Cistenie.OUT.KOM_CistenieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Cistenie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                P2_Robot.KOM_OUT.ZopakujOdoberanie:= FALSE;
                PocetZopakovaniOdobratia:= 0;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 410;
            ELSIF PocetZopakovaniOdobratia > 3 THEN
                P2_Alarmy[285]:= TRUE;
                P2_PoruchaST4:= TRUE; 
            ELSIF NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
                P2_Alarmy[271]:= TRUE;
                P2_PoruchaST4:= TRUE;      
            END_IF	
			
	
        
            
            
        
			
        410:
            SC_P2_StoperZvarania.StepName:='410 - Automaticky Rezim - model 5H,vystavenie signalu start zatlacania';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
												
            IF NOT SC_P2_StoperZvarania.Switch1 AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                P2_StoperZvarania.OUT.KOM_Zatlacanie_START:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.OUT.KOM_ZatlacanieUkoncene THEN
                P2_Zvaranie.OUT.KOM_ZatlacanieUkoncene:= FALSE;
                P2_StoperZvarania.OUT.KOM_Zatlacanie_START:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 435;
            END_IF    
            
             
            
            
			
        435:
            SC_P2_StoperZvarania.StepName:='435 - Automaticky Rezim - model 5H,kamerova kontrola polozeneho Top Coveru CAM11, zmena gripra';//CAM 11//
            SC_P2_StoperZvarania.IdleTime.PT:= T#5s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 AND CAM11.STAV.Command_READY AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie THEN
                CAM11.CMD.Triger:= TRUE;
                SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF	
		
            IF CAM11.STAV.Results_READY AND CAM11.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM11.STAV.Results_READY:= FALSE;
                P2_Robot.STAV.Zvaranie_PrebiehaManipulacia:= FALSE;
                P2_Robot.KOM_OUT.ZmenaGripra_5H:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 438;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM11.CMD.Triger:= FALSE;
                CAM11.STAV.Results_READY:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 436;
            ELSIF SC_P2_StoperZvarania.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[296]:= TRUE;
                P2_PoruchaST4:= TRUE;      
            END_IF	
		
            
                        
            
            
        436:
            SC_P2_StoperZvarania.StepName:='436 - Automaticky Rezim - cakam na opatovny triger kamery CAM11 ';
            SC_P2_StoperZvarania.IdleTime.PT:= T#1s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 435;
            END_IF    
                        
			
        438:
            SC_P2_StoperZvarania.StepName:='438 - Automaticky Rezim - model 5H,vysledok kamerovej kontroly polozeneho Top Coveru';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            SC_P2_StoperZvarania.IdleTime.IN:= TRUE;
		
            IF NOT CAM11.STAV.BUSY THEN
                CAM11.CMD.Triger:= FALSE;
                IF CAM11.RESULT.PowerCP.Pritomn_TopCover_5H THEN
                    CAM11.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 443;
                ELSE
                    CAM11.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 443;
                END_IF	
            END_IF
			
			
		
        443:
            SC_P2_StoperZvarania.StepName:='443 - Automaticky Rezim - model 5H, rozhodnutie podla kamerovej kontroly PowerCP';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
            P2_Zvaranie_CakaNaKameru:= TRUE;	
				
            IF CAM11.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Zvaranie_CakaNaKameru:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 540;
            ELSIF CAM11.PAR.ResultFotky = 'FAIL' THEN  
                P2_Vizu.ZobrazHL7_ST6:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Zvaranie_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    P2_Vizu.ZobrazHL7_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;	
                ELSIF P2_Zvaranie_KAM_Result_OK THEN
                    P2_Zvaranie_KAM_Result_OK:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    CAM11.PAR.ResultFotky:= 'PASS';
                    P2_Vizu.ZobrazHL7_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;
                ELSIF P2_Zvaranie_KAM_Result_NG THEN
                    P2_Zvaranie_KAM_Result_NG:= FALSE;
                    P2_Zvaranie_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Vizu.ZobrazHL7_ST6:= FALSE;
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 540;  
                END_IF    
            END_IF	
			
				
			
            //Odoslanie fotiek na server//				
			
        540:
            SC_P2_StoperZvarania.StepName:='540 - Automaticky Rezim - odoslanie fotky CAM11 a vymazanie fotky CAM12 na server Panasonic';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;		
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                FTP_CAM11.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM11.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM11.INPUTS.Result:= CAM11.PAR.ResultFotky;
                Reports.Kamery.P2_CAM11_KontrolaPowerCP:= CAM11.PAR.ResultFotky;
                       
                FTP_CAM11.CMD.OdosliFotku:= TRUE;
                FTP_CAM12.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
           
				
			
            IF FTP_CAM11.STATUS.KomunikaciaUkoncena AND FTP_CAM12.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM11.CMD.OdosliFotku:= FALSE;
                FTP_CAM12.CMD.VymazFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 545; 
            ELSIF FTP_CAM11.STATUS.KomunikaciaError THEN
                P2_Alarmy[234]:= TRUE;
                P2_PoruchaST4:= TRUE;
            ELSIF FTP_CAM12.STATUS.KomunikaciaError THEN
                P2_Alarmy[235]:= TRUE;
                P2_PoruchaST4:= TRUE;
            END_IF	
			
		
       		
			
            //Odcentrovanie paletky//			
		
        545:
            SC_P2_StoperZvarania.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperZvarania.IN.Centrovanie_ZASUNUTE_IS17 THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 550;
            END_IF
          			
		
			
			
            //Odoslanie dát na server//			
		
        550:
            SC_P2_StoperZvarania.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P2_StoperZvarania.Switch1 THEN
                TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P2_StoperZvarania.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 553;
            ELSIF TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError THEN	
                //                P2_Alarmy[236]:= TRUE;
                //                P2_PoruchaST4:= TRUE;
            END_IF
			
		
        553:
            SC_P2_StoperZvarania.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
			
            IF NOT TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_Zvaranie_ST6.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 555;
                ELSIF TRCB_P2_Zvaranie_ST6.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P2_StoperZvarania.ResetStep:= TRUE;
                    SC_P2_StoperZvarania.Step:= 555;
                END_IF
            END_IF
			
		
        555:
            SC_P2_StoperZvarania.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P2_StoperZvarania.ResetStep:= TRUE;
            SC_P2_StoperZvarania.Step:= 560;   
            
            
            
            
            
			
		
            //Vyvezenie paletky//			
			
        560:
            SC_P2_StoperZvarania.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na vstupny stoper bunky 3';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
            					
            IF P2_StoperZvarania.KoniecCyklu THEN
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            ELSIF ((NOT P3_VstupnyStoper.IN.PritomnPaletky_IS85 AND SC_P3_VstupnyStoper.Step = 100) OR (P3_VstupnyStoper.OUT.ZasunStoper_YV193 AND SC_P3_VstupnyStoper.Step = 105)) AND NOT P2_StoperZvarania.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P2_StoperZvarania.OUT.ZasunStoper_YV59:= TRUE;
                P2_StoperZvarania.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 561;
            END_IF	
		
		
        561:
            SC_P2_StoperZvarania.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na vstupny stoper bunky 3';
            SC_P2_StoperZvarania.IdleTime.PT:= T#200ms;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#10s;
		
            SC_P2_StoperZvarania.AlarmTime.IN:= P2_StoperZvarania.IN.PritomnostPaletky_S9;
            SC_P2_StoperZvarania.IdleTime.IN:= NOT P2_StoperZvarania.IN.PritomnostPaletky_S9;
			            
            
            IF NOT P2_StoperZvarania.IN.PritomnostPaletky_S9 THEN
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
                Reports.Zvaranie.Moment.LavyZvar:= '';
                Reports.Zvaranie.VyslednyReport:= '';
                Reports.Zvaranie.Vyska.LavyZvar:= '';
                Reports.Zvaranie.Frekvencia:= '';
                Reports.Zvaranie.Moment.PravyZvar:= '';
                Reports.Zvaranie.Vyska.PravyZvar:= '';
                Reports.Kamery.P2_CAM11_KontrolaZvaru:= '';
                Reports.Kamery.P2_CAM11_KontrolaPowerCP:= '';
            END_IF    
           
            
                       
            IF SC_P2_StoperZvarania.IdleTime.Q THEN
                P2_StoperZvarania.OUT.ZasunStoper_YV59:= FALSE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 100;
            ELSIF SC_P2_StoperZvarania.AlarmTime.Q THEN
                P2_Alarmy[289]:= TRUE;
                P2_Pracovisko.KoniecCyklu:= TRUE;
                SC_P2_StoperZvarania.ResetStep:= TRUE;
                SC_P2_StoperZvarania.Step:= 0;
            END_IF	
					
			
			
			
			
			
	
			
			
			
			
		
		
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P2_StoperZvarania.StepName:='700 - Manualny Rezim';
            SC_P2_StoperZvarania.IdleTime.PT:= T#8s;
            SC_P2_StoperZvarania.AlarmTime.PT:= T#5s;
		
		
		
		
		
		
		
		
		
		
	
    END_CASE
	
	 
                END_PROGRAM

PROGRAM _EXIT
                (* Insert code here *)
	 
                END_PROGRAM


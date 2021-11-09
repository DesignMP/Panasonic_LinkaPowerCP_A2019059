
PROGRAM _INIT
    Triger_0:= FALSE; 
    Triger_1:= FALSE;
    Triger_2:= FALSE;
END_PROGRAM

PROGRAM _CYCLIC
	
	//*******************************Stav zásobník matíc M4 je prázdny********************//
    CasKontrolyZasobMatic_M4.IN:= P2_SkrutkovacMatic.IN.ZasobMatic_PRAZDNY_IS23;
	
    IF CasKontrolyZasobMatic_M4.Q THEN
        P2_SkrutkovacMatic.STAV.Zasobnik_Matic_M4_Prazdny:= TRUE;
        P2_SkrutkovacMatic.OUT.ZasobMatic_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P2_SkrutkovacMatic.STAV.Zasobnik_Matic_M4_Prazdny:= FALSE;
        P2_SkrutkovacMatic.OUT.ZasobMatic_Banner_CervenaLED:= FALSE;
    END_IF	
	
    CasKontrolyZasobMatic_M4.PT:= T#10s;
    CasKontrolyZasobMatic_M4();
	
	
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_StoperMaticovacky);
	
	
    //Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
    AtlasCopcoKomunikacia;
	
	
	
    //Reset sekcie //
    IF P2_StoperMaticovacky.Reset THEN
        SC_P2_StoperMaticovacky.Step:= 0;
        P2_StoperMaticovacky.Reset:= FALSE;
    END_IF	
	
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_StoperMaticovacky.Automat THEN
        SC_P2_StoperMaticovacky.Step:= 0;
    END_IF 
    
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT Triger_1 THEN     
        Triger_1:= TRUE;
        IF P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND P2_StoperMaticovacky.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN 
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG'; 
                P2_StoperMaticovacky.KoniecCyklu:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperMaticovacky.KoniecCyklu:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            END_IF
        END_IF
    END_IF   
            
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        Triger_1:= FALSE;
    END_IF    
            
            
    
    //Porucha stanice//
    IF P2_PoruchaST2 AND NOT Triger_2 THEN
        Triger_2:= TRUE;
        IF P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND P2_StoperMaticovacky.Automat THEN
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN 
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG'; 
                P2_StoperMaticovacky.KoniecCyklu:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_StoperMaticovacky.KoniecCyklu:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            END_IF
        ELSE
            SC_P2_StoperMaticovacky.ResetStep:= TRUE;
            SC_P2_StoperMaticovacky.Step:= 0;
        END_IF   
    END_IF
    
    IF NOT P2_PoruchaST2 THEN
        Triger_2:= FALSE;
    END_IF    
    
    
    
	
    CASE SC_P2_StoperMaticovacky.Step OF 
	
        0:
            SC_P2_StoperMaticovacky.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            P2_StoperMaticovacky.Automat:= FALSE;
            P2_StoperMaticovacky.KoniecCyklu:= FALSE;
            P2_StoperMaticovacky.Manual:= FALSE;
            P2_StoperMaticovacky.STAV.PoINIT:= FALSE;
            P2_StoperMaticovacky.OUT.ZasunStoper_YV52:= FALSE;
            P2_SkrutkovacMatic.OUT.SkrutkMatic_PrisavMatic_RUN_YV67:= FALSE;
            P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= FALSE;
            P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= FALSE;
            IF NOT Triger_0 THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Reset:= TRUE;
                Triger_0:= TRUE;
            END_IF
            P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Automat:= FALSE;
            P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Manual:= FALSE;
            P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Odobrata:= FALSE;
            P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.UkoncenieCyklu:= FALSE;
            P2_SkrutkovacMatic.Maticovacka_M4.RESET_Poruchy:= FALSE;
            P2_SkrutkovacMatic.Maticovacka_M4.RESET_Vysledkov:= FALSE;
            P2_SkrutkovacMatic.Maticovacka_M4.START_Skrutkovania:= FALSE;
            P2_SkrutkovacMatic.Maticovacka_M4.START_Utahovania:= FALSE;
            CAM9.CMD.Triger:= FALSE;
            CAM9.STAV.Results_READY:= FALSE;
            FTP_CAM9.CMD.OdosliFotku:= FALSE;
            FTP_CAM9.CMD.VymazFotku:= FALSE;
            P2_StoperMaticovacky.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P2_StoperMaticovacky.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P2_Maticovacka_ST4.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P2_Maticovacka_ST4.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P2_Maticovacka_ST4.CMD.OdosliStavPaletky_TYP2:= FALSE;
            PrecitaneCisloPaletky:= '';
            PocetDopytovNaServer:= 0;
            Taktime_Maticovacka_ST4.CMD.START_Merania_1:= FALSE;
            Taktime_Maticovacka_ST4.CMD.START_Merania_2:= FALSE;
            P2_StoperMaticovacky.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P2_SkrutkovacMatic.STAV.PoruchaPodaniaMatice:= FALSE;
            P2_Maticov_KAM_Result_Ignoruj:= FALSE;
            P2_Maticov_CakaNaKameru:= FALSE;
            P2_StoperMaticovacky.STAV.Porucha:= FALSE;
            FazaNavratu:= 0;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            P2_SkrutkovacMatic.RR_PodajMaticu:= FALSE;
            P2_SkrutkovacMatic.RR_ZapniHrniec:= FALSE;
            P2_SkrutkovacMatic.RR_Maticovacku_VYSUN:= FALSE;
            CisloFotky:= 0;
            P2_Maticov_KAM_Result_OK:= FALSE;
            P2_Maticov_KAM_Result_NG:= FALSE;
            P2_Vizu.ZobrazHL1_ST4:= FALSE;
            P2_Vizu.ZobrazHL2_ST4:= FALSE;
            P2_Vizu.ZobrazHL3_ST4:= FALSE;
            TRCB_P2_Maticov_OpatovnyDopyt:= FALSE;
            TRCB_P2_Maticov_PaletkaNG:= FALSE;
            VysunutieSkrutkovacky_OK:= FALSE;
            PocetTrigrovKamery:= 0;
            
            
            IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
                Triger_0:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 1;
            END_IF
	
        1:
            SC_P2_StoperMaticovacky.StepName:='1 - Cakam na spustenie vyroby';
            P2_StoperMaticovacky.KoniecCyklu:= FALSE;
            IF P2_StoperMaticovacky.Automat THEN
                SC_P2_StoperMaticovacky.Step:= 2;
            ELSIF P2_StoperMaticovacky.Manual THEN
                SC_P2_StoperMaticovacky.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
        
         
        
        2:
            SC_P2_StoperMaticovacky.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#4s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= FALSE;
            P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= TRUE;
            
									
            IF P2_SkrutkovacMatic.IN.SkrutkMatic_ZASUNUTY_MS9 THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Automat:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 3;
            END_IF
		
        3:	
            SC_P2_StoperMaticovacky.StepName:='3 - Inicializacia - vymazanie adresara kamery';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#4s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;	
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                FTP_CAM9.CMD.VymazFotku:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
			
					
            IF FTP_CAM9.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM9.CMD.VymazFotku:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 10;
            ELSIF FTP_CAM9.STATUS.KomunikaciaError THEN
                P2_Alarmy[229]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
					
		
				
				
        10:
            SC_P2_StoperMaticovacky.StepName:='10 - Inicializacia - zasunutie centrovacky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#4s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperMaticovacky.IN.Centrovanie_ZASUNUTE_IS13 AND P2_Dopravniky.STAV.PoINIT THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 13;
            END_IF	
			
		
        13:
            SC_P2_StoperMaticovacky.StepName:='13 - Inicializacia - hladanie paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
	
            IF P2_StoperMaticovacky.IN.PritomnostPaletky_S7 THEN
                P2_StoperZaklTesnenia.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 20;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 100;
            END_IF
		
			
			
        20:
            SC_P2_StoperMaticovacky.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
		
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                PrecitaneCisloPaletky:= UDINT_TO_STRING(P2_StoperMaticovacky.IN.PrecitaneCisloPaletky_S7);
                i:= 0;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 23;
            END_IF	
			
        23:
            SC_P2_StoperMaticovacky.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#1s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[211]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperMaticovacky.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperMaticovacky.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 30;
            END_IF	
		
			
        30:
            SC_P2_StoperMaticovacky.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_4' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_4' THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_4' THEN
                Revork:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 33; 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_4' THEN
                Revork:= FALSE;
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;     
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            END_IF	
		
                  
            
            
            
        33:
            SC_P2_StoperMaticovacky.StepName:='33 - Inicializacia - rozhodnutie podla typu modelu';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;		
				
			
            IF Linka.PAR.ZvolenyModel = '5H' THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 35;
            ELSE 
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;   
                SC_P2_StoperMaticovacky.Step:= 560;         
            END_IF		 
			
        35:
            SC_P2_StoperMaticovacky.StepName:='35 - Inicializacia - kontrola uzavretia komunikacie';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            ELSE
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 38;
            END_IF	
		
        38:
            SC_P2_StoperMaticovacky.StepName:='38 - Inicializacia - kontrola otvorenia komunikacie';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;     
            
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 40;
            ELSE
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 100;
            END_IF    
            
			
        40:
            SC_P2_StoperMaticovacky.StepName:='40 - Inicializacia - kontrola odoslania fotiek';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            ELSE
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 43;
            END_IF 
			
        43:
            SC_P2_StoperMaticovacky.StepName:='43 - Inicializacia - zacentrovanie paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperMaticovacky.IN.Centrovanie_VYSUNUTE_IS12 THEN
                CAM9.STAV.Results_READY:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 45;
            END_IF	
            
        45:
            SC_P2_StoperMaticovacky.StepName:='45 - Inicializacia - vstupna kamerova kontrola paletky CAM9';//CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                CAM9.CMD.Triger:= TRUE;
                SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
		
            IF CAM9.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM9.STAV.Results_READY:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 50;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM9.STAV.Results_READY:= FALSE;
                CAM9.CMD.Triger:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 48;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[294]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
		
            
            
            
                  
            
            
            
        48:
            SC_P2_StoperMaticovacky.StepName:='48 - Inicializacia - cakam na opatovny triger kamery';//CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#1s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 45;
            END_IF
            
            
		
        50:
            SC_P2_StoperMaticovacky.StepName:='50 - Inicializacia - vysledok kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
		
            IF NOT CAM9.STAV.BUSY AND SC_P2_StoperMaticovacky.IdleTime.Q THEN
                CAM9.CMD.Triger:= FALSE;
                IF CAM9.RESULT.PowerCP.NepritomMatice AND
                    CAM9.RESULT.PowerCP.PritomnBusbaru_5H THEN
                    CAM9.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 53;
                ELSE	
                    CAM9.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 53;	
                END_IF
            END_IF
	
        53:
            SC_P2_StoperMaticovacky.StepName:='53 - Inicializacia - vymazanie fotky CAM9';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                FTP_CAM9.CMD.VymazFotku:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM9.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM9.CMD.VymazFotku:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 55;
            ELSIF FTP_CAM9.STATUS.KomunikaciaError THEN
                P2_Alarmy[229]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
            
            
        55:
            SC_P2_StoperMaticovacky.StepName:='55 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            
				
            IF CAM9.PAR.ResultFotky = 'PASS' THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 135;
            ELSIF CAM9.PAR.ResultFotky = 'FAIL' THEN
                P2_StoperMaticovacky.STAV.PoINIT:= TRUE;
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 540;
            END_IF    
            
          
		
        
			
            
            
            
            
		
            
			
			
		
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P2_StoperMaticovacky.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            
            IF P2_StoperMaticovacky.IN.PritomnostPaletky_S7 THEN
                P2_StoperZaklTesnenia.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF    
            
            
            SC_P2_StoperMaticovacky.IdleTime.IN:= P2_StoperMaticovacky.IN.PritomnostPaletky_S7;
			
            IF EDGEPOS(P2_StoperMaticovacky.IN.PritomnostPaletky_S7) THEN
                IF NOT Taktime_Maticovacka_ST4.CMD.START_Merania_1 THEN
                    Taktime_Maticovacka_ST4.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Maticovacka_ST4.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF   
            END_IF    
            
            
            
            IF P2_StoperMaticovacky.KoniecCyklu THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 101;
            END_IF
		
        101:
            SC_P2_StoperMaticovacky.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#500ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
		
            PrecitaneCisloPaletky:= UDINT_TO_STRING(P2_StoperMaticovacky.IN.PrecitaneCisloPaletky_S7);
            i:= 0;
            SC_P2_StoperMaticovacky.ResetStep:= TRUE;
            SC_P2_StoperMaticovacky.Step:= 103;
          
				
        103:
            SC_P2_StoperMaticovacky.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#1s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[211]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperMaticovacky.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperMaticovacky.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 104;
            END_IF	
		
			
        104:
            SC_P2_StoperMaticovacky.StepName:='104 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_4' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_4' THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_4' THEN
                Revork:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 108; 
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_4' THEN
                Revork:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;         
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            END_IF	
		
		
        108:
            SC_P2_StoperMaticovacky.StepName:='108 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;		
			
			
            IF Linka.PAR.ZvolenyModel = '5H' THEN 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 110;
            ELSE 
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;   //Paletka iba prechádza 
                SC_P2_StoperMaticovacky.Step:= 560;         
            END_IF		
			
			
			
			
			
        110:
            SC_P2_StoperMaticovacky.StepName:='110 - Automaticky Rezim - vyziadanie stavu paletky zo servera'; 
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;	
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;	
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                TRCB_P2_Maticovacka_ST4.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Maticovacka_ST4.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 113;
            ELSIF TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaError THEN	
                TRCB_P2_Maticovacka_ST4.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 115;
            END_IF	
			
			
			
        113:
            SC_P2_StoperMaticovacky.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;		
			
            IF NOT TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_Maticovacka_ST4.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P2_Maticovacka_ST4.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST4' THEN
                        SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                        SC_P2_StoperMaticovacky.Step:= 118;
                    END_IF 
                ELSIF TRCB_P2_Maticovacka_ST4.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 115;
                END_IF	
            END_IF
				
	
        115:
            SC_P2_StoperMaticovacky.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;		
            
            
            P2_Vizu.ZobrazHL3_ST4:= TRUE;
            
            IF TRCB_P2_Maticov_OpatovnyDopyt THEN
                TRCB_P2_Maticov_OpatovnyDopyt:= FALSE; 
                P2_Vizu.ZobrazHL3_ST4:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 110;
            ELSIF TRCB_P2_Maticov_PaletkaNG THEN
                TRCB_P2_Maticov_PaletkaNG:= FALSE;
                P2_Vizu.ZobrazHL3_ST4:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 560;
            END_IF    
      
            
            
		
        118:
            SC_P2_StoperMaticovacky.StepName:='118 - Automaticky Rezim - zacentrovanie paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperMaticovacky.IN.Centrovanie_VYSUNUTE_IS12 THEN
                CAM9.STAV.Results_READY:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 120;
            END_IF		
			
		
			
        120:		
            SC_P2_StoperMaticovacky.StepName:='120 - Automaticky Rezim - vstupna kamerova kontrola paletky CAM9';//CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                CAM9.CMD.Triger:= TRUE;
                SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
		
            IF CAM9.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM9.STAV.Results_READY:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 125;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM9.STAV.Results_READY:= FALSE;
                CAM9.CMD.Triger:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 123;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[294]:= TRUE;
                P2_PoruchaST2:= TRUE;    
            END_IF	
	
            
            
                  
            
            
            
        123:
            SC_P2_StoperMaticovacky.StepName:='123 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#1s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 120;
            END_IF
            
                  
		
        125:
            SC_P2_StoperMaticovacky.StepName:='125 - Automaticky Rezim - vysledok kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
		
            IF NOT CAM9.STAV.BUSY AND SC_P2_StoperMaticovacky.IdleTime.Q THEN
                CAM9.CMD.Triger:= FALSE;
                IF CAM9.RESULT.PowerCP.NepritomMatice AND
                    CAM9.RESULT.PowerCP.PritomnBusbaru_5H THEN
                    CAM9.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 128;
                ELSE	
                    CAM9.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 128;	
                END_IF
            END_IF
	
            
        128:
            SC_P2_StoperMaticovacky.StepName:='128 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            P2_Maticov_CakaNaKameru:= TRUE;	
				
            IF CAM9.PAR.ResultFotky = 'PASS' THEN
                P2_Maticov_CakaNaKameru:= FALSE;	
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 130;
            ELSIF CAM9.PAR.ResultFotky = 'FAIL' THEN
                P2_Vizu.ZobrazHL1_ST4:= TRUE;
                IF P2_Maticov_KAM_Result_OFF THEN
                    P2_Vizu.ZobrazHL1_ST4:= FALSE;
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 130;
                ELSIF P2_Maticov_KAM_Result_OK THEN 
                    P2_Maticov_KAM_Result_OK:= FALSE;
                    P2_Vizu.ZobrazHL1_ST4:= FALSE;
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 130;
                ELSIF P2_Maticov_KAM_Result_NG THEN
                    P2_Maticov_KAM_Result_NG:= FALSE;
                    P2_Vizu.ZobrazHL1_ST4:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 540;
                END_IF
            END_IF    
          
            
            
            
          
		
        130:
            SC_P2_StoperMaticovacky.StepName:='130 - Automaticky Rezim - vymazanie fotky CAM9';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                FTP_CAM9.CMD.VymazFotku:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM9.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM9.CMD.VymazFotku:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 135;
            ELSIF FTP_CAM9.STATUS.KomunikaciaError THEN
                P2_Alarmy[229]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
			
			
			
        135:
            SC_P2_StoperMaticovacky.StepName:='135 - Automaticky Rezim - vymazanie vysledkov skrutkovania matice M4';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#2s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_SkrutkovacMatic.Maticovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_SkrutkovacMatic.Maticovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_SkrutkovacMatic.Maticovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_SkrutkovacMatic.Maticovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 137;
            END_IF	
	
        137:
            SC_P2_StoperMaticovacky.StepName:='137 - Automaticky Rezim - kontrola matice M4 v skrutkovacke';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
            
            
            SC_P2_StoperMaticovacky.AlarmTime.IN:= NOT P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Pripravena;
		
            IF P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Pripravena AND P2_SkrutkovacMatic.IN.DavkMatic_PritomnostMatice_OS2 AND P2_SkrutkovacMatic.Maticovacka_M4.Stav_READY_to_START AND Safety.STAV.P2_ZonaMaticovacky_AKTIVNA THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 138;
            ELSIF SC_P2_StoperMaticovacky.AlarmTime.Q THEN
                FazaNavratu:= 137;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 600;
            END_IF	
			
			
			
        138:
            SC_P2_StoperMaticovacky.StepName:='138 - Automaticky Rezim - start skrutkovania matic M4';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#2s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            SC_P2_StoperMaticovacky.AlarmTime.IN:= (P2_SkrutkovacMatic.IN.SkrutkMatic_VysunutieHrotu_IOS7 < 2);
            
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                Paletka[i].VnutornyStav.CinnostSpustena:= TRUE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_PrisavMatic_RUN_YV67:= TRUE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= FALSE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= TRUE;
                P2_SkrutkovacMatic.Maticovacka_M4.START_Utahovania:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_SkrutkovacMatic.Maticovacka_M4.Stav_UtahovanieUkoncene AND P2_SkrutkovacMatic.IN.SkrutkMatic_VysunutieHrotu_IOS7 > 2 AND NOT TEST THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 139;
            ELSIF SC_P2_StoperMaticovacky.AlarmTime.Q THEN
                P2_Alarmy[267]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF	
			
        139:
            SC_P2_StoperMaticovacky.StepName:='129 - Automaticky Rezim - cakam na ukoncenie skrutkovania matic M4';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#30s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
            SC_P2_StoperMaticovacky.AlarmTime.IN:= TRUE;
            
						
            IF P2_SkrutkovacMatic.Maticovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_SkrutkovacMatic.Maticovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_StoperMaticovacky.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_MaticaM4:= REAL_TO_STRING(P2_SkrutkovacMatic.IN.SkrutkMatic_VysunutieHrotu_IOS7); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_MaticaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 140;
            ELSIF SC_P2_StoperMaticovacky.AlarmTime.Q THEN
                P2_Alarmy[267]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF
				
        140:
            SC_P2_StoperMaticovacky.StepName:='140 - Automaticky Rezim - zasunutie skrutkovacky matic M4 a vypnutie prisavania matice';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= FALSE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= TRUE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_PrisavMatic_RUN_YV67:= FALSE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
			
            IF P2_SkrutkovacMatic.IN.SkrutkMatic_ZASUNUTY_MS9 THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 143;
            END_IF
		
			
        143:
            SC_P2_StoperMaticovacky.StepName:='143 - Automaticky Rezim - signal matica M4 odobrata';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Odobrata:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Pripravena THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Odobrata:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 145;
            END_IF
			
			
				
        145:
            SC_P2_StoperMaticovacky.StepName:='145 - Automaticky Rezim - kontrola vysledkov skrutkovania matice M4';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
                       
            Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_MaticaM4:= REAL_TO_STRING(P2_SkrutkovacMatic.STAV.Moment_ToleranciaMIN_REAL);
            Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_MaticaM4:= REAL_TO_STRING(P2_SkrutkovacMatic.STAV.Moment_ToleranciaMAX_REAL);
            Reports.Skrutkovacky.Moment_NameranaHodnota.P2_MaticaM4:= REAL_TO_STRING(P2_SkrutkovacMatic.STAV.DosiahnutyMoment_REAL); 
            Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_MaticaM4:= UDINT_TO_STRING(P2_SkrutkovacMatic.STAV.Uhol_ToleranciaMIN);
            Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_MaticaM4:= UDINT_TO_STRING(P2_SkrutkovacMatic.STAV.Uhol_ToleranciaMAX);
            Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_MaticaM4:= UDINT_TO_STRING(P2_SkrutkovacMatic.STAV.DosiahnutyUhol);
            
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_Maticovacka_5H_Vysunutie:= STRING_TO_REAL(Reports.Skrutkovacky.VyskaSkrutkovania.P2_MaticaM4);
                IF (P2_Maticovacka_5H_Vysunutie <= P2_RemPremenne.P2_Maticovacka_Vysunutie_HI) AND (P2_Maticovacka_5H_Vysunutie >= P2_RemPremenne.P2_Maticovacka_Vysunutie_LO)THEN
                    VysunutieSkrutkovacky_OK:= TRUE;
                ELSE    
                    VysunutieSkrutkovacky_OK:= FALSE;
                END_IF 
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF  
            
            
            
            IF P2_SkrutkovacMatic.Maticovacka_M4.Stav_VysledokUtahovania_OK THEN
                IF VysunutieSkrutkovacky_OK THEN
                    Reports.Skrutkovacky.VyslednyReport.P2_MaticaM4:= 'PASS';
                    CAM9.STAV.Results_READY:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 148;
                ELSE
                    Paletka[i].PAR.StavPaletky:= 'NG';
					Reports.Skrutkovacky.VyslednyReport.P2_MaticaM4:= 'FAIL'; 
                    IF P2_Maticov_MaticaM4_Result_OFF THEN
                        CAM9.STAV.Results_READY:= FALSE;
                        SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                        SC_P2_StoperMaticovacky.Step:= 148;
                    ELSE
                        CAM9.STAV.Results_READY:= FALSE;
                        Paletka[i].PAR.StavPowerCP:= 'FAIL';
                        SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                        SC_P2_StoperMaticovacky.Step:= 545;         
                    END_IF		
                END_IF
            ELSIF P2_SkrutkovacMatic.Maticovacka_M4.Stav_VysledokUtahovania_NG THEN
                Paletka[i].PAR.StavPaletky:= 'NG';
				Reports.Skrutkovacky.VyslednyReport.P2_MaticaM4:= 'FAIL';
                IF P2_Maticov_MaticaM4_Result_OFF THEN
                    CAM9.STAV.Results_READY:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 148;
                ELSE
                    CAM9.STAV.Results_READY:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 545;         
                END_IF		
            END_IF		
			
				
			
        148:
            SC_P2_StoperMaticovacky.StepName:='148 - Automaticky Rezim - kamerova kontrola paletky CAM9'; //CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                CAM9.CMD.Triger:= TRUE;
                SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF	
		
            IF CAM9.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM9.STAV.Results_READY:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 153;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM9.STAV.Results_READY:= FALSE;
                CAM9.CMD.Triger:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 150;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[294]:= TRUE;
                P2_PoruchaST2:= TRUE;    
            END_IF
		
                      
            
            
        150:
            SC_P2_StoperMaticovacky.StepName:='150 - Automaticky Rezim - cakam na opatovny triger kamery';//CAM 9//
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#1s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 148;
            END_IF
            
            
            
			
        153:
            SC_P2_StoperMaticovacky.StepName:='153 - Automaticky Rezim - vysledok kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
		
            IF NOT CAM9.STAV.BUSY AND SC_P2_StoperMaticovacky.IdleTime.Q THEN		
                CAM9.CMD.Triger:= FALSE;
                IF NOT CAM9.RESULT.PowerCP.NepritomMatice AND 
                    CAM9.RESULT.PowerCP.PritomnBusbaru_5H THEN
                    CAM9.PAR.ResultFotky:= 'PASS';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 155;
                ELSE	
                    CAM9.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 155;		
                END_IF
            END_IF
			
	
			
        155:
            SC_P2_StoperMaticovacky.StepName:='155 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            P2_Maticov_CakaNaKameru:= TRUE;	
					
            IF CAM9.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Maticov_CakaNaKameru:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 540;
            ELSIF CAM9.PAR.ResultFotky = 'FAIL' THEN   
                P2_Vizu.ZobrazHL2_ST4:= TRUE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= TRUE;
                IF P2_Maticov_KAM_Result_OFF THEN
                    P2_Vizu.ZobrazHL2_ST4:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 540;	
                ELSIF P2_Maticov_KAM_Result_OK THEN
                    P2_Maticov_KAM_Result_OK:= FALSE;
                    P2_Vizu.ZobrazHL2_ST4:= FALSE;
                    CAM9.PAR.ResultFotky:= 'PASS';
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 540;
                ELSIF P2_Maticov_KAM_Result_NG THEN
                    P2_Maticov_KAM_Result_NG:= FALSE;
                    P2_Vizu.ZobrazHL2_ST4:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P2_Maticov_CakaNaKameru:= FALSE;
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 540;
                END_IF	
            END_IF
			
     			
		 		
			
            //Odoslanie fotiek na server//			
			
        540:
            SC_P2_StoperMaticovacky.StepName:='540 - Automaticky Rezim - odoslanie fotiek na server';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                FTP_CAM9.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM9.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM9.INPUTS.Result:= CAM9.PAR.ResultFotky;
                Reports.Kamery.P2_CAM9_KontrolaPaletky:= CAM9.PAR.ResultFotky;	
			           
                FTP_CAM9.CMD.OdosliFotku:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
          
			
            IF FTP_CAM9.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM9.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 545; 
            ELSIF FTP_CAM9.STATUS.KomunikaciaError THEN
                P2_Alarmy[229]:= TRUE;
                P2_PoruchaST2:= TRUE;
            END_IF
			
			
		
			
            //Odcentrovanie paletky//			
				
        545:
            SC_P2_StoperMaticovacky.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
		
            IF P2_StoperMaticovacky.IN.Centrovanie_ZASUNUTE_IS13 THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 550;
            END_IF	
		
		
	
            //Odoslanie dát na server//
		
        550:
            SC_P2_StoperMaticovacky.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                TRCB_P2_Maticovacka_ST4.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaUkoncena THEN
                TRCB_P2_Maticovacka_ST4.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 553;
            ELSIF TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaError THEN
                //                P2_Alarmy[231]:= TRUE;
                //                P2_PoruchaST2:= TRUE;
            END_IF
			
		
        553:
            SC_P2_StoperMaticovacky.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
			
            IF NOT TRCB_P2_Maticovacka_ST4.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_Maticovacka_ST4.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 555;
                ELSIF TRCB_P2_Maticovacka_ST4.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                    SC_P2_StoperMaticovacky.Step:= 555;
                END_IF	
            END_IF
			
        555:
            SC_P2_StoperMaticovacky.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
			
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P2_StoperMaticovacky.ResetStep:= TRUE;
            SC_P2_StoperMaticovacky.Step:= 560;
            
            
            

            //Vyvezenie paletky//			
			
        560:
            SC_P2_StoperMaticovacky.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper srobovacky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
            
                     
            
            IF P2_StoperMaticovacky.KoniecCyklu THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            ELSIF P2_StoperMaticovacky.STAV.Porucha THEN
                Paletka[i].PAR.StavPaletky:= 'NG';
                P2_PoruchaST2:= TRUE;
            ELSIF ((NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND SC_P2_StoperSrobovania.Step = 100) OR (P2_StoperSrobovania.OUT.ZasunStoper_YV56 AND SC_P2_StoperSrobovania.Step = 561)) AND NOT P2_StoperMaticovacky.STAV.PrebiehaVyvezeniePaletky THEN
                P2_StoperMaticovacky.OUT.ZasunStoper_YV52:= TRUE;
                P2_StoperMaticovacky.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 561;
            END_IF	
		
        561:
            SC_P2_StoperMaticovacky.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper srobovacky';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#200ms;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#10s;
		
            SC_P2_StoperMaticovacky.AlarmTime.IN:= P2_StoperMaticovacky.IN.PritomnostPaletky_S7;
            SC_P2_StoperMaticovacky.IdleTime.IN:= NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7;
			
            IF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 THEN
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
                Reports.Skrutkovacky.Moment_ToleranciaMIN.P2_MaticaM4:= '';
                Reports.Skrutkovacky.Moment_ToleranciaMAX.P2_MaticaM4:= '';
                Reports.Skrutkovacky.Moment_NameranaHodnota.P2_MaticaM4:= '';
                Reports.Skrutkovacky.VyslednyReport.P2_MaticaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMIN.P2_MaticaM4:= '';
                Reports.Skrutkovacky.Uhol_ToleranciaMAX.P2_MaticaM4:= '';
                Reports.Skrutkovacky.Uhol_NameranaHodnota.P2_MaticaM4:= '';
                Reports.Skrutkovacky.CasSkrutkovania.P2_MaticaM4:= '';
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_MaticaM4:= '';
                Reports.Kamery.P2_CAM9_KontrolaPaletky:= '';
            END_IF   
                
                
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                P2_StoperMaticovacky.OUT.ZasunStoper_YV52:= FALSE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 100;
            ELSIF SC_P2_StoperMaticovacky.AlarmTime.Q THEN
                P2_Alarmy[287]:= TRUE;
                P2_Pracovisko.KoniecCyklu:= TRUE;
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 0;
            END_IF	
		
		
            //***********************************************************Èistenie maticovaèky**********************************************************************//			
			   
            
        600:
            SC_P2_StoperMaticovacky.StepName:='600 - Automaticky Rezim - cistenie maticovacky reset podavaca matic';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#2s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Reset:= TRUE;
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Automat:= FALSE;
                SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
            
            IF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 603;
            END_IF
            
            
        603:
            SC_P2_StoperMaticovacky.StepName:='600 - Automaticky Rezim - cistenie maticovacky spustenie cistenia podavaca matic';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#20s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
			
                    
            IF NOT SC_P2_StoperMaticovacky.Switch1 THEN
                P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Automat:= TRUE;
                SC_P2_StoperMaticovacky.IdleTime.IN:= TRUE;
                SC_P2_StoperMaticovacky.Switch1:= TRUE;
            END_IF
                    
            IF P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Pripravena AND P2_SkrutkovacMatic.IN.DavkMatic_PritomnostMatice_OS2 THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= FazaNavratu;
            ELSIF SC_P2_StoperMaticovacky.IdleTime.Q THEN
                SC_P2_StoperMaticovacky.ResetStep:= TRUE;
                SC_P2_StoperMaticovacky.Step:= 600;
            END_IF    
            
            
                    
			
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P2_StoperMaticovacky.StepName:='700 - Manualny Rezim';
            SC_P2_StoperMaticovacky.IdleTime.PT:= T#8s;
            SC_P2_StoperMaticovacky.AlarmTime.PT:= T#5s;
		
		
            //Vysunutie maticovaèky//
            IF P2_SkrutkovacMatic.RR_Maticovacku_VYSUN THEN
                P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= FALSE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= TRUE;
            ELSIF NOT P2_SkrutkovacMatic.RR_Maticovacku_VYSUN AND NOT P2_SkrutkovacMatic.IN.SkrutkMatic_ZASUNUTY_MS9 THEN
                P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= FALSE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= TRUE;
            ELSE
                P2_SkrutkovacMatic.OUT.SkrutkMatic_VYSUN_YV62:= FALSE;
                P2_SkrutkovacMatic.OUT.SkrutkMatic_ZASUN_YV75:= FALSE;
            END_IF	
		
		
		
		
    END_CASE
	
	
	
	
		 
        END_PROGRAM

PROGRAM _EXIT
        (* Insert code here *)
	 
        END_PROGRAM



PROGRAM _INIT
	
	
    	
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_StoperZaklTesnenia);
	
    //Volanie podprogramov//
    IOLinkKomunikacia;
	
    
        
    
    
	
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_P2_StoperZaklTesnenia.Step:= 0;
    ELSIF NOT Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA THEN
        SC_P2_StoperZaklTesnenia.Step:= 0;
    ELSIF NOT Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA THEN
        SC_P2_StoperZaklTesnenia.Step:= 0;	
    ELSIF P2_StoperZaklTesnenia.Reset THEN
        SC_P2_StoperZaklTesnenia.Step:= 0;
        P2_StoperZaklTesnenia.Reset:= FALSE;
    END_IF	
	
	
    //Porucha stanice//
    IF EDGEPOS(P2_PoruchaST1) THEN
        SC_P2_ZakladacTesnenia.Step:= 0;
        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
        SC_P2_StoperZaklTesnenia.Step:= 0;
    END_IF 
    
    
    
	
    CASE SC_P2_StoperZaklTesnenia.Step OF 
		
        0:
            SC_P2_StoperZaklTesnenia.StepName:='0 - Nulovanie';
            P2_StoperZaklTesnenia.Automat:= FALSE;
            P2_StoperZaklTesnenia.KoniecCyklu:= FALSE;
            P2_StoperZaklTesnenia.Manual:= FALSE;
            P2_StoperZaklTesnenia.STAV.PoINIT:= FALSE;
            P2_StoperZaklTesnenia.OUT.ZasunStoper_YV53:= FALSE;
            P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
            P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie:= FALSE;
            P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene:= FALSE;
            P2_StoperZaklTesnenia.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P2_StoperZaklTesnenia.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P2_ZakladacTesnenia_ST3.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P2_ZakladacTesnenia_ST3.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P2_ZakladacTesnenia_ST3.CMD.OdosliStavPaletky_TYP2:= FALSE;
					
            CAM1.CMD.Triger:= FALSE;
            CAM1.STAV.Results_READY:= FALSE;
            FTP_CAM1.CMD.OdosliFotku:= FALSE;
            FTP_CAM1.CMD.VymazFotku:= FALSE;
            CAM7.CMD.Triger:= FALSE;
            CAM7.STAV.Results_READY:= FALSE;
            FTP_CAM7.CMD.OdosliFotku:= FALSE;
            FTP_CAM7.CMD.VymazFotku:= FALSE;
            CAM8.CMD.Triger:= FALSE;
            CAM8.STAV.Results_READY:= FALSE;
            FTP_CAM8.CMD.OdosliFotku:= FALSE;
            FTP_CAM8.CMD.VymazFotku:= FALSE;
            CAM17.CMD.Triger:= FALSE;
            CAM17.STAV.Results_READY:= FALSE;
            FTP_CAM17.CMD.OdosliFotku:= FALSE;
            FTP_CAM17.CMD.VymazFotku:= FALSE;
            PrecitanyQRkodPowerCP:= '';
            PrecitanyQRkodFiltra5H:= '';
            PrecitaneCisloPaletky:= '';
            P2_Vizu.ZobrazHL1_ST3:= FALSE;
            P2_Vizu.ZobrazHL2_ST3:= FALSE;
            P2_Vizu.ZobrazHL3_ST3:= FALSE;
            P2_Vizu.ZobrazHL4_ST3:= FALSE;
            P2_Vizu.ZobrazHL5_ST3:= FALSE;
            P2_Vizu.ZobrazHL6_ST3:= FALSE;
            P2_Vizu.ZobrazHL7_ST3:= FALSE;
            P2_Vizu.ZobrazHL8_ST3:= FALSE;
            P2_Vizu.ZobrazHL9_ST3:= FALSE;
            P2_Vizu.ZobrazHL10_ST3:= FALSE;
            P2_Vizu.ZobrazHL11_ST3:= FALSE;
            P2_Vizu.ZobrazHL12_ST3:= FALSE;
            P2_Vizu.ZobrazHL14_ST3:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_ZakladacTesnenia_ST3.CMD.START_Merania_1:= FALSE;
            Taktime_ZakladacTesnenia_ST3.CMD.START_Merania_2:= FALSE;
            P2_StoperZaklTesnenia.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            OpatovnaKontrolaFiltra_5H:= FALSE;
            P2_ZaklTesn_KAM_Result_Ignoruj:= FALSE;
            TestovaciKus:= FALSE;
            Revork:= FALSE;
            CisloFotky:= 0;
			PocetTrigrovKamery:= 0;
			P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG:= FALSE;
            
            IF Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA AND Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 1;
            END_IF
	
        1:
            SC_P2_StoperZaklTesnenia.StepName:='1 - Cakam na spustenie vyroby';
            P2_StoperZaklTesnenia.KoniecCyklu:= FALSE;
            IF P2_StoperZaklTesnenia.Automat THEN
                SC_P2_StoperZaklTesnenia.Step:= 2;
            ELSIF P2_StoperZaklTesnenia.Manual THEN
                SC_P2_StoperZaklTesnenia.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
		
		
        2:
            SC_P2_StoperZaklTesnenia.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#4s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
									
            IF P2_ZakladacTesnenia.STAV.PoINIT AND Safety.STAV.P2_ZaklTesnenia_Pojazd_ZASUNUTY THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 3;
            END_IF
		
        3:
            SC_P2_StoperZaklTesnenia.StepName:='3 - Inicializacia - vymazanie adresarov kamier CAM1 a CAM 17';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#4s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;	
			
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                FTP_CAM1.CMD.VymazFotku:= TRUE;
                FTP_CAM17.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM1.STATUS.KomunikaciaUkoncena AND FTP_CAM17.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= FALSE;
                FTP_CAM1.CMD.VymazFotku:= FALSE;
                FTP_CAM17.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 5;
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;
            ELSIF FTP_CAM17.STATUS.KomunikaciaError THEN
                P2_Alarmy[228]:= TRUE;
                P2_PoruchaST1:= TRUE;	
            END_IF
						
			
			
        5:
            SC_P2_StoperZaklTesnenia.StepName:='5 - Inicializacia - hladanie paletky na stopri';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
	
            IF P2_Dopravniky.STAV.PoINIT THEN
                SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            END_IF
	
            IF P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6 AND P2_Dopravniky.STAV.PoINIT THEN
                P1_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 20;	
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 100;
            END_IF
		
			
        20:
            SC_P2_StoperZaklTesnenia.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
		
            IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperZaklTesnenia.IN.PrecitaneCisloPaletky_S6);
                i:= 0;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 23;
            END_IF	
			
        23:
            SC_P2_StoperZaklTesnenia.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[200]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperZaklTesnenia.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperZaklTesnenia.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 30;
            END_IF		
			
        30:
            SC_P2_StoperZaklTesnenia.StepName:='30 - Inicializacia - kontrola stavu paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_3' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_3' THEN 
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_3' THEN
                Revork:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 33;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_3' THEN
                Revork:= FALSE;
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;  
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            END_IF	
			
        33:
            SC_P2_StoperZaklTesnenia.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            ELSE	
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 35;
            END_IF	
			
			
        35:
            SC_P2_StoperZaklTesnenia.StepName:='35 - Inicializacia - kontrola priradenia QR kodu filtra 5H na server';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;	
			
            IF Linka.PAR.ZvolenyModel = '5H' THEN
                IF Paletka[i].VnutornyStav.QRkodFiltraPriradeny THEN
                    P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 140;
                ELSE
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 38;
                END_IF
            ELSE
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 38;
            END_IF	
		
			
        38:
            SC_P2_StoperZaklTesnenia.StepName:='38 - Inicializacia - kontrola otvorenia komunikacie';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;	
			
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 120;
            ELSE
                P2_StoperZaklTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 100;
            END_IF	
			
			
		     
            

			
		
            //********************************************************Automatický režim****************************************************************************//
				
        100:  
            SC_P2_StoperZaklTesnenia.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
		
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6;
			
            IF P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6 THEN
                P1_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
               
            IF EDGEPOS(P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6)THEN
                IF NOT Taktime_ZakladacTesnenia_ST3.CMD.START_Merania_1 THEN
                    Taktime_ZakladacTesnenia_ST3.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_ZakladacTesnenia_ST3.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF  
            END_IF    
            
            
            IF P2_StoperZaklTesnenia.KoniecCyklu THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 0;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 101;
            END_IF
		
			
        101:
            SC_P2_StoperZaklTesnenia.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
			
			           
            PrecitaneCisloPaletky:= USINT_TO_STRING(P2_StoperZaklTesnenia.IN.PrecitaneCisloPaletky_S6);
            i:= 0;
            SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
            SC_P2_StoperZaklTesnenia.Step:= 103;
            
			
			
		
        103:
            SC_P2_StoperZaklTesnenia.StepName:='103 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
		
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
                P2_Alarmy[200]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF	
		
				
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P2_StoperZaklTesnenia.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P2_StoperZaklTesnenia.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 105;
            END_IF	
		
        105:
            SC_P2_StoperZaklTesnenia.StepName:='105 - Automaticky Rezim - kontrola stavu paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_3' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_3' THEN 
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_3' THEN
                Revork:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 108;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_3' THEN
                Revork:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;  
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 108;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            END_IF	
		
	
			
			
        108:
            SC_P2_StoperZaklTesnenia.StepName:='108 - Automaticky Rezim - vyziadanie stavu paletky zo servera';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;	
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                TRCB_P2_ZakladacTesnenia_ST3.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P2_ZakladacTesnenia_ST3.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 110;
            ELSIF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaError THEN	
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P2_ZakladacTesnenia_ST3.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 115;
            END_IF	
			
			
			
					
			
        110:
            SC_P2_StoperZaklTesnenia.StepName:='110 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST3' THEN
                        IF NOT OpatovnaKontrolaFiltra_5H THEN
                            SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                            SC_P2_StoperZaklTesnenia.Step:= 120;
                        ELSE
                            CAM7.STAV.Results_READY:= FALSE;
                            SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                            SC_P2_StoperZaklTesnenia.Step:= 122;
                        END_IF	
                    END_IF    
                ELSIF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 115;
                END_IF
            END_IF
                
        115:
            SC_P2_StoperZaklTesnenia.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
        	
            P2_Vizu.ZobrazHL13_ST3:= TRUE;
            
            IF TRCB_P2_ZaklTesn_OpatovnyDopyt THEN
                TRCB_P2_ZaklTesn_OpatovnyDopyt:= FALSE; 
                P2_Vizu.ZobrazHL13_ST3:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 108;
            ELSIF TRCB_P2_ZaklTesn_PaletkaNG THEN
                TRCB_P2_ZaklTesn_PaletkaNG:= FALSE;
                P2_Vizu.ZobrazHL13_ST3:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 560;
            END_IF    
            
            
            
			
        120:
            SC_P2_StoperZaklTesnenia.StepName:='120 - Automaticky Rezim - vystavenie signalu pre zakladac,zaloz tesnenie';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie:= TRUE;
                P2_ZakladacTesnenia.STAV.VysledokZalozeniaTesnenia:= '';
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene THEN
                P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= TRUE;
            END_IF
			
            IF P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene AND NOT P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 AND NOT P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG THEN
                P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene:= FALSE;
                P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
				SC_P2_StoperZaklTesnenia.Step:= 132;
			ELSIF P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene AND NOT P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 AND P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG THEN
				P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG:= FALSE;
				Paletka[i].PAR.StavPowerCP:= 'FAIL';
				Paletka[i].PAR.StavPaletky := 'NG';
				SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
				SC_P2_StoperZaklTesnenia.Step:= 550;
            END_IF
			
		
			
        122:
            SC_P2_StoperZaklTesnenia.StepName:='122 - Automaticky Rezim - opatovna kamerova kontrola pritomnosti filtra 5H v drziaku filtra';//CAM 7 - iba model 5H//
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
				
            
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 AND CAM7.STAV.Command_READY THEN
                CAM7.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM7.STAV.Results_READY AND CAM7.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM7.STAV.Results_READY:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 124;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM7.STAV.Results_READY:= FALSE;
                CAM7.CMD.Triger:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 123;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[291]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF	
			
            
            
                    
            
            
            
            
        123:
            SC_P2_StoperZaklTesnenia.StepName:='123 - Automaticky Rezim - cakam na opatovny triger kamery CAM7';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#1s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 122;
            END_IF    
            
            
			
        124:
            SC_P2_StoperZaklTesnenia.StepName:='124 - Automaticky Rezim - vysledok kamerovej kontroly filtra 5H';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
			
            P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
			
            IF NOT CAM7.STAV.BUSY THEN
                CAM7.CMD.Triger:= FALSE;
                IF CAM7.RESULT.CitanieQRkodu_Filtra5H_OK THEN
                    IF P2_StoperZaklTesnenia.PAR.StaryQRkod_Filtra5H <> CAM7.RESULT.PrecitanyQRkod_Filtra5H THEN
                        Paletka[i].PAR.QRkodFiltra_5H:= CAM7.RESULT.PrecitanyQRkod_Filtra5H;
                        CAM7.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 125;
                    END_IF    
                ELSE
                    CAM7.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 125;
                END_IF
            END_IF
		
			
				
        125:
            SC_P2_StoperZaklTesnenia.StepName:='115 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly filtra 5H';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
				
				
            IF CAM7.PAR.ResultFotky = 'PASS' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 133;                
            ELSIF CAM7.PAR.ResultFotky = 'FAIL' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 127;
            END_IF
			
	
        127:
            SC_P2_StoperZaklTesnenia.StepName:='127 - Automaticky Rezim - zobrazenie hlasenia neprecitany QR kod filtra 5H';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN	
                P2_Vizu.ZobrazHL4_ST3:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF	
				
				
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;	
			
			
            IF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 THEN
                CAM7.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL4_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 122;
            END_IF	
			
			
			
			
	
			
		
        132:
            SC_P2_StoperZaklTesnenia.StepName:='130 - Automaticky Rezim - kontrola typu modelu';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 133;
            ELSE
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 140;
            END_IF    
            
            
            
            
        133:
            SC_P2_StoperZaklTesnenia.StepName:='133 - Automaticky Rezim - priradenie QRkodu filtra';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN    
                TRCB_P2_ZakladacTesnenia_ST3.CMD.PriradQRkodFiltra_TYP3:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P2_ZakladacTesnenia_ST3.CMD.PriradQRkodFiltra_TYP3:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 135;
            ELSIF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaError THEN	
                //P2_Alarmy[230]:= TRUE;
                //P2_PoruchaST1:= TRUE;
            END_IF	
			
        135:
            SC_P2_StoperZaklTesnenia.StepName:='135 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
			
            IF NOT TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= TRUE;
                    OpatovnaKontrolaFiltra_5H:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 140;
                ELSIF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 138;
                END_IF	
            END_IF
			
        138:
            SC_P2_StoperZaklTesnenia.StepName:='138 - Automaticky Rezim - zobrazenie hlasenia nespravny typ Filtra';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
			
						
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                P2_Vizu.ZobrazHL9_ST3:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
            P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= FALSE;
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
				
			
		
            IF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 THEN
                P2_Vizu.ZobrazHL9_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 139;
            END_IF		
		
        139:
            SC_P2_StoperZaklTesnenia.StepName:='139 - Automaticky Rezim - vymazanie adresarov kamier CAM1 ';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#4s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;	
			
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                FTP_CAM1.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM1.STATUS.KomunikaciaUkoncena THEN
                OpatovnaKontrolaFiltra_5H:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM1.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 108;
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF
            
            
            
            
            
				
        140:
            SC_P2_StoperZaklTesnenia.StepName:='140 - Automaticky Rezim - cakam na potvrdenie bannera, kontrola prihlasenia operatora';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF P2_UzivatelPrihlaseny THEN
                P2_Vizu.ZobrazHL12_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_CyanLED_SB7:= FALSE;
            ELSE    
                P2_Vizu.ZobrazHL12_ST3:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_CyanLED_SB7:= Blikac500ms;
            END_IF    
          
            
            
			
            
            IF P2_StoperZaklTesnenia.KoniecCyklu THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 0;
            ELSIF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 AND P2_UzivatelPrihlaseny THEN	
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel2;
                P2_Vizu.ZobrazHL12_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                CAM8.STAV.Results_READY:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 145; 
            ELSIF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 AND NOT P2_UzivatelPrihlaseny THEN	
                Paletka[i].PAR.ID_Operatora:= '';    
            END_IF	
			
			
				
			
        145:
            SC_P2_StoperZaklTesnenia.StepName:='145 - Automaticky Rezim - kamerova kontrola QR kodu PowerCP CAM8';//CAM 8
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                CAM8.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM8.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM8.STAV.Results_READY:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 148;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM8.STAV.Results_READY:= FALSE;
                CAM8.CMD.Triger:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 146;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[292]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF	
		
            
                       
            
            
        146:
            SC_P2_StoperZaklTesnenia.StepName:='146 - Automaticky Rezim - cakam na opatovny triger kamery CAM8';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#1s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 145;
            END_IF
            
            
		
        148:
            SC_P2_StoperZaklTesnenia.StepName:='148 - Automaticky Rezim - vysledok kamerovej kontroly QR kodu Power CP';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
						
            
			
            IF NOT CAM8.STAV.BUSY AND SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                CAM8.CMD.Triger:= FALSE;
                IF CAM8.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK THEN
                    SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
                    IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                        IF CAM8.RESULT.PowerCP.PrecitanyQRkod_PowerCP = Paletka[i].PAR.QRkodPowerCP THEN
                            CAM8.PAR.ResultFotky:= 'PASS';
                            SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                            SC_P2_StoperZaklTesnenia.Step:= 150;
                        ELSE
                            CAM8.PAR.ResultFotky:= 'FAIL';
                            SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                            SC_P2_StoperZaklTesnenia.Step:= 150;
                        END_IF
                    END_IF
                ELSE
                    CAM8.PAR.ResultFotky:= 'FAIL';
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 150;
                END_IF
            END_IF	
		
			
					
        150:
            SC_P2_StoperZaklTesnenia.StepName:='150 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly QR kodu Power CP';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
				
				
            IF CAM8.PAR.ResultFotky = 'PASS' THEN
                CAM17.STAV.Results_READY:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 170; 
            ELSIF CAM8.PAR.ResultFotky = 'FAIL' THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 153;
            END_IF	
			
		
        153:
            SC_P2_StoperZaklTesnenia.StepName:='153 - Automaticky Rezim - zobrazenie hlasenia neprecitany alebo odlisny QR kod Power CP, cakanie na rozhodnutie obsluhy';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
						
			
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
			
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                P2_Vizu.ZobrazHL10_ST3:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 THEN
                CAM8.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL10_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 145;
            END_IF	
			
					
				
	
			
				
        170:
            SC_P2_StoperZaklTesnenia.StepName:='170 - Automaticky Rezim - kamerova kontrola paletky CAM17'; //CAM 17//
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 AND CAM17.STAV.Command_READY THEN
                CAM17.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM17.STAV.Results_READY AND CAM17.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM17.STAV.Results_READY:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 173;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM17.STAV.Results_READY:= FALSE;
                CAM17.CMD.Triger:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 171;
            ELSIF SC_P2_StoperZaklTesnenia.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[293]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF	
            
            
                   
            
            
			
        171:
            SC_P2_StoperZaklTesnenia.StepName:='171 - Automaticky Rezim - cakam na opatovny triger kamery CAM17';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#1s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 170;
            END_IF	
            
            
            
			
        173:
            SC_P2_StoperZaklTesnenia.StepName:='173 - Automaticky Rezim - vysledok kamerovej kontroly paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= TRUE;
			
            
			
            IF NOT CAM17.STAV.BUSY THEN
                CAM17.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM17.RESULT.Paletka.Pritomn_Busbary_4F AND
                        CAM17.RESULT.Paletka.Pritomn_PowerCP_4F AND
                        CAM17.RESULT.Paletka.Pritomn_TopCoveru_4F AND
                        CAM17.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM17.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM17.RESULT.Paletka.Pritomn_TopCoveru_5F THEN
                        CAM17.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    ELSE
                        CAM17.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM17.RESULT.Paletka.Pritomn_Busbary_5F AND
                        CAM17.RESULT.Paletka.Pritomn_PowerCP_5F AND
                        CAM17.RESULT.Paletka.Pritomn_TopCoveru_5F AND
                        CAM17.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM17.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM17.RESULT.Paletka.Pritomn_TopCoveru_4F THEN
                        CAM17.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    ELSE
                        CAM17.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN	
                    IF CAM17.RESULT.Paletka.Pritomn_Busbary_5H AND
                        CAM17.RESULT.Paletka.Pritomn_PowerCP_5H AND
                        CAM17.RESULT.Paletka.Pritomn_TopCoveru_5H AND
                        CAM17.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM17.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM17.RESULT.Paletka.Pritomn_TopCoveru_4F THEN
                        CAM17.PAR.ResultFotky:= 'PASS';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    ELSE
                        CAM17.PAR.ResultFotky:= 'FAIL';
                        SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                        SC_P2_StoperZaklTesnenia.Step:= 175;
                    END_IF
                END_IF
            END_IF
		
		
        175:
            SC_P2_StoperZaklTesnenia.StepName:='178 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
				
				
            IF CAM17.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 540;
            ELSIF CAM17.PAR.ResultFotky = 'FAIL' THEN   
                IF P2_ZaklTesn_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 540;
                ELSE
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 178; 
                END_IF    
            END_IF
			
                    
            
            
            
            
            
			
        178:
            SC_P2_StoperZaklTesnenia.StepName:='178 - Automaticky Rezim - zobrazenie hlasenia zle ulozeny material na paletke, cakam na potvrdenie bannerom';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    P2_Vizu.ZobrazHL1_ST3:= TRUE; 
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    P2_Vizu.ZobrazHL2_ST3:= TRUE;  
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    P2_Vizu.ZobrazHL3_ST3:= TRUE;     
                END_IF
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
			
						
            IF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 THEN
                CAM17.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL1_ST3:= FALSE;
                P2_Vizu.ZobrazHL2_ST3:= FALSE;
                P2_Vizu.ZobrazHL3_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 180;
            ELSIF P2_ZaklTesn_KAM_Result_Ignoruj THEN
                CAM17.STAV.Results_READY:= FALSE;
                P2_ZaklTesn_KAM_Result_Ignoruj:= FALSE;
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P2_Vizu.ZobrazHL1_ST3:= FALSE;
                P2_Vizu.ZobrazHL2_ST3:= FALSE;
                P2_Vizu.ZobrazHL3_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 540;
            END_IF	
		
	
        180:
            SC_P2_StoperZaklTesnenia.StepName:='180 - Automaticky Rezim - vymazanie fotky kamery CAM17';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                FTP_CAM17.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM17.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM17.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 145;
            ELSIF FTP_CAM17.STATUS.KomunikaciaError THEN
                P2_Alarmy[228]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF
			
			
				
			
		
            //Odoslanie fotiek na server//			
			
			
			
        540:
            SC_P2_StoperZaklTesnenia.StepName:='540 - Automaticky Rezim - odoslanie fotky CAM 1 a CAM 17 na server Panasonic'; //CAM1 a CAM 17
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
		
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                FTP_CAM1.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM1.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM1.INPUTS.Result:= CAM1.PAR.ResultFotky;
                Reports.Kamery.P2_CAM1_KontrolaTesnenia:= CAM1.PAR.ResultFotky;
            
                FTP_CAM17.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM17.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM17.INPUTS.Result:= CAM17.PAR.ResultFotky;
                Reports.Kamery.P2_CAM17_KontrolaPaletky:= CAM17.PAR.ResultFotky;
                       
                FTP_CAM1.CMD.OdosliFotku:= TRUE;
                FTP_CAM17.CMD.OdosliFotku:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
        	
			
            IF FTP_CAM1.STATUS.KomunikaciaUkoncena AND FTP_CAM17.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM1.CMD.OdosliFotku:= FALSE;
                FTP_CAM17.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 550;
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN 
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;
            ELSIF FTP_CAM17.STATUS.KomunikaciaError THEN
                P2_Alarmy[228]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF
				
			
			
			
            //Odoslanie dát na server//			
			
        550:
            SC_P2_StoperZaklTesnenia.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
			
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN    
                TRCB_P2_ZakladacTesnenia_ST3.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P2_ZakladacTesnenia_ST3.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 553;
            ELSIF TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaError THEN	
                //P2_Alarmy[230]:= TRUE;
                //P2_PoruchaST1:= TRUE;
            END_IF
			
			
        553:
            SC_P2_StoperZaklTesnenia.StepName:='550 - Automaticky Rezim - kontrola odpovede servera';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
			
            IF NOT TRCB_P2_ZakladacTesnenia_ST3.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                        IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                            Paletka[i].PAR.StavPaletky:= 'OK';
                        ELSE
                            Paletka[i].PAR.StavPaletky:= 'NG';
                        END_IF
                    END_IF 
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 560;
                ELSIF TRCB_P2_ZakladacTesnenia_ST3.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                    SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                    SC_P2_StoperZaklTesnenia.Step:= 555;
                END_IF	
            END_IF		
		
            
            
        555:
            SC_P2_StoperZaklTesnenia.StepName:='555 - Automaticky Rezim - zobrazenie hlasenia komunikacia zo serverom neprebehla korektne';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                P2_Vizu.ZobrazHL11_ST3:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF
			
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
				
			
		
            IF P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7 THEN
                P2_Vizu.ZobrazHL11_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 558;
            END_IF	
            
        558:
            SC_P2_StoperZaklTesnenia.StepName:='558 - Automaticky Rezim - vymazanie fotky kamery CAM17 a CAM1';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
			
            P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= TRUE;
            
            IF NOT SC_P2_StoperZaklTesnenia.Switch1 THEN
                FTP_CAM17.CMD.VymazFotku:= TRUE;
                FTP_CAM1.CMD.VymazFotku:= TRUE;
                SC_P2_StoperZaklTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM17.STATUS.KomunikaciaUkoncena AND FTP_CAM1.STATUS.KomunikaciaUkoncena THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM17.CMD.VymazFotku:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 105;
            ELSIF FTP_CAM17.STATUS.KomunikaciaError THEN
                P2_Alarmy[228]:= TRUE;
                P2_PoruchaST1:= TRUE;
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF
            
           			
			
			
            //Vyvezenie paletky//						
					
        560:
            SC_P2_StoperZaklTesnenia.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper maticovacky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;		
		
            IF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
            ELSE            
                P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= Blikac500ms;
            END_IF
            
               
            
						
            IF P2_StoperZaklTesnenia.KoniecCyklu THEN
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 0;
            ELSIF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND SC_P2_StoperMaticovacky.Step = 100 AND NOT P2_StoperZaklTesnenia.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                P2_StoperZaklTesnenia.OUT.ZasunStoper_YV53:= TRUE;
                P2_StoperZaklTesnenia.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 561;
            END_IF	
		
        561:
            SC_P2_StoperZaklTesnenia.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper maticovacky';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#10s;
		
            SC_P2_StoperZaklTesnenia.AlarmTime.IN:= P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6;
            
            SC_P2_StoperZaklTesnenia.IdleTime.IN:= NOT P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6;
			
                       
            IF NOT P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                TestovaciKus:= FALSE;
                CAM7.RESULT.PrecitanyQRkod_Filtra5H:= '';
                CisloFotky:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.Kamery.P2_CAM1_KontrolaTesnenia:= '';
                Reports.Kamery.P2_CAM17_KontrolaPaletky:= '';
                P2_StoperZaklTesnenia.PAR.StaryQRkod_Filtra5H:= Paletka[i].PAR.QRkodFiltra_5H;
            END_IF   
            
            
            IF SC_P2_StoperZaklTesnenia.IdleTime.Q THEN
                P2_StoperZaklTesnenia.OUT.ZasunStoper_YV53:= FALSE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 100;
            ELSIF SC_P2_StoperZaklTesnenia.AlarmTime.Q THEN
                P2_Alarmy[286]:= TRUE;
                P2_Pracovisko.KoniecCyklu:= TRUE;
                SC_P2_StoperZaklTesnenia.ResetStep:= TRUE;
                SC_P2_StoperZaklTesnenia.Step:= 0;
            END_IF	
		
			
			
		
		
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P2_StoperZaklTesnenia.StepName:='700 - Manualny Rezim';
            SC_P2_StoperZaklTesnenia.IdleTime.PT:= T#8s;
            SC_P2_StoperZaklTesnenia.AlarmTime.PT:= T#5s;
		
		
    END_CASE
	
	
	
	
	
	
	
	 
                END_PROGRAM

PROGRAM _EXIT
                (* Insert code here *)
	 
                END_PROGRAM


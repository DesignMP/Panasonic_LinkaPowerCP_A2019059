
PROGRAM _INIT
    P4_Vytah.PAR.ServoZdvihu_JoggRychlost:= 5;
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    
    //Z·pis do ParID serva - nastavenie max momentu v smere ot·Ëania a v protismere ot·Ëania//
//    NovaHodnotaMomentu_POS := 1.5; //v Nm
//    NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_10);
//    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
//    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[0].ParID      := 248;
//    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[1].ParID      := 249;
//    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_0();
    
    
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P4_Vytah);
	
	
    //Volanie podprogramov//
    OvlServaZdvihu;
    IOLinkKomunikacia;
	

	
    //Reset sekcie //
    IF NOT Safety.STAV.P4_ZonaVytahu_AKTIVNA THEN
        SC_P4_Vytah.Step:= 0;
    ELSIF P4_Vytah.Reset THEN
        SC_P4_Vytah.Step:= 0;
        P4_Vytah.Reset:= FALSE;
    END_IF	
	
       
    
    
    //Zastavenie serva//
    IF EDGEPOS(P4_Vytah.Reset) THEN
        Zdvih_STOP:= TRUE;
    END_IF	
	
    //Porucha stanice//
    IF P4_PoruchaST4 AND NOT Triger_0 THEN
        Triger_0:= TRUE;
        SC_P4_Vytah.ResetStep:= TRUE;
        SC_P4_Vytah.Step:= 0;
    END_IF    
   	
    
    IF NOT P4_PoruchaST4 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
	
    CASE SC_P4_Vytah.Step OF 
	
	
        0:
            SC_P4_Vytah.StepName:='0 - Nulovanie';
            SC_OvlZdvihu.Step:= 0;
            P4_Vytah.Automat:= FALSE;
            P4_Vytah.KoniecCyklu:= FALSE;
            P4_Vytah.Manual:= FALSE;
            P4_Vytah.STAV.PoINIT:= FALSE;
            P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggLimit_ACTIVE:= FALSE;
            P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
            P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= FALSE;
            P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
            P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
            P4_Vytah.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P4_Vytah.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P4_Vytah_ST10.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P4_Vytah_ST10.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P4_Vytah_ST10.CMD.OdosliStavPaletky_TYP2:= FALSE;
            CAM16.CMD.Triger:= FALSE;
            CAM16.STAV.Results_READY:= FALSE;
            FTP_CAM16.CMD.OdosliFotku:= FALSE;
            FTP_CAM16.CMD.VymazFotku:= FALSE;
            PrecitaneCisloPaletky:= '';
            P34_Vizu.ZobrazHL1_ST10:= FALSE;
            P34_Vizu.ZobrazHL2_ST10:= FALSE;
            P34_Vizu.ZobrazHL3_ST10:= FALSE;
            P34_Vizu.ZobrazHL4_ST10:= FALSE;
            P34_Vizu.ZobrazHL5_ST10:= FALSE;
            P34_Vizu.ZobrazHL6_ST10:= FALSE;
            P34_Vizu.ZobrazHL7_ST10:= FALSE;
            P34_Vizu.ZobrazHL8_ST10:= FALSE;
            P34_Vizu.ZobrazHL9_ST10:= FALSE;
            PocetDopytovNaServer:= 0;
            Stav_VlozenaPaletka:= FALSE;
            Taktime_Vytah_ST10.CMD.START_Merania_1:= FALSE;
            Taktime_Vytah_ST10.CMD.START_Merania_2:= FALSE;
            P4_Vytah_KAM_Result_Ignoruj:= FALSE;
            P4_Vytah_KAM_Result_OK:= FALSE;
            P4_Vytah_KAM_Result_NG:= FALSE;
            P4_Vytah.RR_ChodDopravnika_VPRED:= FALSE;
            P4_Vytah.RR_ChodDopravnika_VZAD:= FALSE;
            CisloFotky:= 0;
            Revork:= FALSE;
            P4_Vytah_CakaNaKameru:= FALSE;
            TRCB_P4_Vytah_OpatovnyDopyt:= FALSE;
            TRCB_P4_Vytah_PaletkaNG:= FALSE;
            PocetTrigrovKamery:= 0;
            
            
			
            IF Safety.STAV.P4_ZonaVytahu_AKTIVNA AND NOT P4_Pracovisko.STAV.PORUCHA AND P4_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S15 AND P4_Pracovisko.STAV.ServoVytahu_READY THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 1;
            END_IF
	
        1:
            SC_P4_Vytah.StepName:='1 - Cakam na spustenie vyroby';
            P4_Vytah.KoniecCyklu:= FALSE;
            IF P4_Vytah.Automat THEN
                SC_P4_Vytah.Step:= 2;
            ELSIF P4_Vytah.Manual THEN
                SC_P4_Vytah.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializ·cia****************************************************************************//	
		
        2:
            SC_P4_Vytah.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P4_Vytah.IdleTime.IN:= P4_Dopravniky.STAV.PoINIT;
									
            IF SC_P4_Vytah.IdleTime.Q THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 3;
            END_IF
		
        3:		
            SC_P4_Vytah.StepName:='3 - Inicializacia - vymazanie adresara kamery'; 
            SC_P4_Vytah.IdleTime.PT:= T#4s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;	
			
            P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= TRUE;
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                FTP_CAM16.CMD.VymazFotku:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM16.STATUS.KomunikaciaUkoncena THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM16.CMD.VymazFotku:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 4;
            ELSIF FTP_CAM16.STATUS.KomunikaciaError THEN
                P34_Alarmy[410]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
			
				
        4:
            SC_P4_Vytah.StepName:='4 - Inicializacia - spustam dopravnik vytahu pre navezenie paletky';
            SC_P4_Vytah.IdleTime.PT:= T#500ms;
            SC_P4_Vytah.AlarmTime.PT:= T#7s;
			
            SC_P4_Vytah.IdleTime.IN:= P4_Vytah.IN.PritomnostPaletky_S13;
			
            IF NOT SC_P4_Vytah.Switch1 THEN
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= TRUE;
                SC_P4_Vytah.AlarmTime.IN:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF SC_P4_Vytah.IdleTime.Q AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 5;
            ELSIF SC_P4_Vytah.AlarmTime.Q AND NOT P4_Vytah.IN.PritomnostPaletky_S13 AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN	
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 5;
            ELSIF SC_P4_Vytah.IdleTime.Q AND P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN		
                P34_Alarmy[411]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
			
				
        5:
            SC_P4_Vytah.StepName:='3 - Inicializacia - kontrola homingu serva zdvihu vytahu';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
            IF P4_Vytah.STAV.ServoZdvihu_HomingOK THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 9;
            ELSE
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 7;
            END_IF
		
        7:
            SC_P4_Vytah.StepName:='7 - Inicializacia - cakam na spustenie homingu serva zdvihu vytahu';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P4_Vytah.IdleTime.IN:= Safety.STAV.P4_Vytah_Bariera_AKTIVNA;
            P34_Vizu.ZobrazHL6_ST10:= NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA;
            
            IF SC_P4_Vytah.IdleTime.Q THEN
                P34_Vizu.ZobrazHL6_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 8;
            END_IF	
			
			
			
        8:
            SC_P4_Vytah.StepName:='4 - Inicializacia - spustam homing serva zdvihu vytahu';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
            P4_Vytah.OUT.Banner_OranzovaLED_SB10:= Blikac1s;
			
            IF NOT SC_P4_Vytah.Switch1 THEN
                Zdvih_HOME:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
		
            IF P4_Vytah.STAV.ServoZdvihu_HomingOK THEN
                P4_Vytah.OUT.Banner_OranzovaLED_SB10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 9;
            END_IF	
	
            
		
        9:
            SC_P4_Vytah.StepName:='9 - Inicializacia - cakam na presun vytahu do hornej pozicie navazania';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P4_Vytah.IdleTime.IN:= Safety.STAV.P4_Vytah_Bariera_AKTIVNA AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11;
            P34_Vizu.ZobrazHL6_ST10:= NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA;
            
            IF SC_P4_Vytah.IdleTime.Q THEN
                P34_Vizu.ZobrazHL6_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 10;
            END_IF	
			
			
	
        10:
            SC_P4_Vytah.StepName:='10 - Inicializacia - presuvam vytah do hornej pozicie navazania';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
	
            P4_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Vytah_PoziciaNakladania;//631
			
            P4_Vytah.OUT.Banner_OranzovaLED_SB10:= Blikac1s; 
					
            IF NOT SC_P4_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 15;
            END_IF	
	
           
			
	
        15:
            SC_P4_Vytah.StepName:='15 - Inicializacia - kontrola pritomnosti paletky';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            IF P4_Vytah.IN.PritomnostPaletky_S13 THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 18;   
            ELSE
                P4_Vytah.STAV.PoINIT:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 100;
            END_IF	
			
		
        18:
            SC_P4_Vytah.StepName:='18 - Inicializacia - precitanie cisla paletky';
            SC_P4_Vytah.IdleTime.PT:= T#500ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
		
            
            PrecitaneCisloPaletky:= USINT_TO_STRING(P4_Vytah.IN.PrecitaneCisloPaletky_S13);
            i:= 0;
            SC_P4_Vytah.ResetStep:= TRUE;
            SC_P4_Vytah.Step:= 20;
          	
	
	
        20:
            SC_P4_Vytah.StepName:='20 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[418]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
		
		
       
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P4_Vytah.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P4_Vytah.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 23;
            END_IF        
            
            
        23:
            SC_P4_Vytah.StepName:='23 - Inicializacia - kontrola uzavretia komunikacie';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s; 
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P4_Vytah.STAV.PoINIT:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            ELSE
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 25;
            END_IF    
            
        25:
            SC_P4_Vytah.StepName:='25 - Inicializacia - kontrola otvorenia komunikacie';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s; 
            
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                P4_Vytah.STAV.PoINIT:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 118;
            ELSE
                P4_Vytah.STAV.PoINIT:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 105;
            END_IF   
            
            
			
			
            //********************************************************Automatick˝ reûim****************************************************************************//
		
        100:
            SC_P4_Vytah.StepName:='100 - Automaticky Rezim - cakam na navezenie paletky na vytah z vrchneho dopravnika';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;	
		
						
            IF P4_Vytah.KoniecCyklu THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 0;
            ELSIF SC_P4_Etiketovacka.Step = 561 AND NOT P4_Vytah.IN.PritomnostPaletky_S13 AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN
                Stav_VlozenaPaletka:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 101;
            ELSIF P4_Vytah.IN.PritomnostPaletky_S13 THEN
                P4_Etiketovacka.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                Stav_VlozenaPaletka:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 105;
            END_IF	
		
		
		
		
        101:
            SC_P4_Vytah.StepName:='101 - Automaticky Rezim - navazam paletku na dopravnik vytahu';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#20s;
		
            SC_P4_Vytah.IdleTime.IN:= P4_Vytah.IN.PritomnostPaletky_S13;
			
            IF EDGEPOS(P4_Vytah.IN.PritomnostPaletky_S13)THEN
                IF NOT Taktime_Vytah_ST10.CMD.START_Merania_1 THEN
                    Taktime_Vytah_ST10.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Vytah_ST10.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= TRUE;
                SC_P4_Vytah.AlarmTime.IN:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF P4_Vytah.IN.PritomnostPaletky_S13 AND SC_P4_Vytah.IdleTime.Q THEN
                P4_Etiketovacka.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 105;
            ELSIF SC_P4_Vytah.AlarmTime.Q THEN
                P34_Alarmy[416]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
		
		
			
        105:
            SC_P4_Vytah.StepName:='105 - Automaticky Rezim - precitanie cisla paletky';
            SC_P4_Vytah.IdleTime.PT:= T#500ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
		
            
            PrecitaneCisloPaletky:= USINT_TO_STRING(P4_Vytah.IN.PrecitaneCisloPaletky_S13);
            i:= 0;
            SC_P4_Vytah.ResetStep:= TRUE;
            SC_P4_Vytah.Step:= 108;
          	
	
	
        108:
            SC_P4_Vytah.StepName:='108 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
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
                P34_Alarmy[418]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
		
		
       
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P4_Vytah.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P4_Vytah.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                IF Stav_VlozenaPaletka THEN
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 130;
                ELSE    
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 110;
                END_IF    
            END_IF	
		
       
        110:       
            SC_P4_Vytah.StepName:='110 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].PAR.TestovaciKus THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_10' THEN
                Revork:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 111;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_10' THEN
                Revork:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;     
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 111;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            ELSE
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            END_IF	     
            
       
            
        111:
            SC_P4_Vytah.StepName:='111 - Automaticky Rezim - kontrola prihlasenia operatora';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            
                        
            
            IF P34_UzivatelPrihlaseny THEN
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel3;
                P34_Vizu.ZobrazHL7_ST10:= FALSE;
                P4_Vytah.OUT.Banner_CyanLED_SB10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 113;
            ELSE
                P4_Vytah.OUT.Banner_CyanLED_SB10:= Blikac500ms;
                P34_Vizu.ZobrazHL7_ST10:= TRUE;
                Paletka[i].PAR.ID_Operatora:= '';
            END_IF    
            
            
            
            
            
        113:
            SC_P4_Vytah.StepName:='113 - Automaticky Rezim - vyziadanie stavu paletky zo servera'; 
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;	
            SC_P4_Vytah.IdleTime.IN:= TRUE;
		
            P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= TRUE;
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                TRCB_P4_Vytah_ST10.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P4_Vytah_ST10.STATUS.KomunikaciaUkoncena THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P4_Vytah_ST10.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 114;
            ELSIF TRCB_P4_Vytah_ST10.STATUS.KomunikaciaError THEN	
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P4_Vytah_ST10.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 115;
            END_IF	
			
		
			
        114:
            SC_P4_Vytah.StepName:='114 - Automaticky Rezim - kontrola odpovede servera';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P4_Vytah_ST10.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P4_Vytah_ST10.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    CAM16.STAV.Results_READY:= FALSE;
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 118;
                ELSIF TRCB_P4_Vytah_ST10.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 115; 
                END_IF	
            END_IF	
		
            
        115:
            SC_P4_Vytah.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            
            P34_Vizu.ZobrazHL9_ST10:= TRUE;
            
            IF TRCB_P4_Vytah_OpatovnyDopyt THEN
                TRCB_P4_Vytah_OpatovnyDopyt:= FALSE; 
                P34_Vizu.ZobrazHL9_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 113;
            ELSIF TRCB_P4_Vytah_PaletkaNG THEN
                TRCB_P4_Vytah_PaletkaNG:= FALSE;
                P34_Vizu.ZobrazHL9_ST10:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            END_IF   
            
            
            
            
		
        118:
            SC_P4_Vytah.StepName:='118 - Automaticky Rezim - kamerova kontrola paletky CAM16';//CAM 16
            SC_P4_Vytah.IdleTime.PT:= T#5s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            
            
            
            IF NOT SC_P4_Vytah.Switch1 AND CAM16.STAV.Command_READY THEN
                CAM16.CMD.Triger:= TRUE;
                SC_P4_Vytah.IdleTime.IN:= TRUE;
                P4_Vytah.OUT.Banner_ModraLED_SB10:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
			
            IF CAM16.STAV.Results_READY AND CAM16.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM16.STAV.Results_READY:= FALSE;
                CAM16.CMD.Triger:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 120;
            ELSIF SC_P4_Vytah.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM16.CMD.Triger:= FALSE;
                CAM16.STAV.Results_READY:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 119;
            ELSIF SC_P4_Vytah.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[455]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF
        
            
                        
            
            
            
        119:
            SC_P4_Vytah.StepName:='119 - Automaticky Rezim - cakam na opatovny triger kamery CAM16';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;    
            
            SC_P4_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P4_Vytah.IdleTime.Q THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 118;
            END_IF
            
       
        120:
            SC_P4_Vytah.StepName:='120 - Automaticky Rezim - vysledok kamerovej kontroly kamery CAM16';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;  
            
            
            IF NOT CAM16.STAV.BUSY THEN
                CAM16.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    P4_Vytah.STAV.Kamera_VysledkyM5_ENABLE:= TRUE;
                    IF CAM16.RESULT.PowerCP.PritomnostSkrutky_K40 AND
                        CAM16.RESULT.PowerCP.PritomnostSkrutky_M5 THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    ELSE
                        CAM16.PAR.ResultFotky:= 'FAIL';
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    P4_Vytah.STAV.Kamera_VysledkyM5_ENABLE:= TRUE;
                    IF CAM16.RESULT.PowerCP.PritomnostSkrutky_K40 AND
                        CAM16.RESULT.PowerCP.PritomnostSkrutky_M5 THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    ELSE
                        CAM16.PAR.ResultFotky:= 'FAIL';
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    END_IF 
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    P4_Vytah.STAV.Kamera_VysledkyM5_ENABLE:= FALSE;
                    IF CAM16.RESULT.PowerCP.PritomnostSkrutky_K40 THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    ELSE
                        CAM16.PAR.ResultFotky:= 'PASS';
                        (*CAM16.PAR.ResultFotky:= 'FAIL';*)
                        SC_P4_Vytah.ResetStep:= TRUE;
                        SC_P4_Vytah.Step:= 121;
                    END_IF    
                END_IF
            END_IF
            
            
        121:
            SC_P4_Vytah.StepName:='121 - Automaticky Rezim - kontrola vysledku kamery';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            
            P4_Vytah_CakaNaKameru:= TRUE;
            
            IF CAM16.PAR.ResultFotky = 'PASS' THEN
                P4_Vytah_CakaNaKameru:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 122;
            ELSIF CAM16.PAR.ResultFotky = 'FAIL' THEN
                P34_Vizu.ZobrazHL8_ST10:= TRUE;
                IF P4_Vytah_KAM_Result_OFF THEN
                    P4_Vytah_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL8_ST10:= FALSE;
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 122;
                ELSIF P4_Vytah_KAM_Result_OK THEN
                    P4_Vytah_KAM_Result_OK:= FALSE;
                    P4_Vytah_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL8_ST10:= FALSE;
                    CAM16.PAR.ResultFotky:= 'PASS';
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 122;
                ELSIF P4_Vytah_KAM_Result_NG THEN
                    P4_Vytah_KAM_Result_NG:= FALSE;
                    P4_Vytah_CakaNaKameru:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P34_Vizu.ZobrazHL8_ST10:= FALSE;
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 122;
                END_IF
            END_IF    
            
            
                    
            
        122:
            SC_P4_Vytah.StepName:='122 - Automaticky Rezim - odoslanie fotky CAM16 na server Panasonic';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
            
            P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= TRUE;
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                FTP_CAM16.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM16.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM16.INPUTS.Result:= CAM11.PAR.ResultFotky;
                Reports.Kamery.P4_CAM16_KontrolaPaletky:= CAM11.PAR.ResultFotky;
                      
                FTP_CAM16.CMD.OdosliFotku:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
            
			
            IF FTP_CAM16.STATUS.KomunikaciaUkoncena THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM16.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 123;
            ELSIF FTP_CAM6.STATUS.KomunikaciaError THEN
                P34_Alarmy[413]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	
         
            
        
            
            
            
        123:
            SC_P4_Vytah.StepName:='123 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P4_Vytah.IdleTime.PT:= T#500ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
			
            P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= TRUE;
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                TRCB_P4_Vytah_ST10.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF 
           
                
			
            IF TRCB_P4_Vytah_ST10.STATUS.KomunikaciaUkoncena THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P4_Vytah_ST10.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 125;
            ELSIF TRCB_P4_Vytah_ST10.STATUS.KomunikaciaError THEN	
                P34_Alarmy[415]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF
			
		
        125:
            SC_P4_Vytah.StepName:='125 - Automaticky Rezim - kontrola odpovede servera';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
			
            IF NOT TRCB_P4_Vytah_ST10.STATUS.KomunikaciaUkoncena THEN
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                IF TRCB_P4_Vytah_ST10.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 130;
                ELSIF TRCB_P4_Vytah_ST10.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 130;
                END_IF	
            END_IF
			
			
			
			
        130:
            SC_P4_Vytah.StepName:='130 - Automaticky Rezim - cakam na spustenie kamerovej kontroly paletky';
            SC_P4_Vytah.IdleTime.PT:= T#500ms;
            SC_P4_Vytah.AlarmTime.PT:= T#20s;
			
            IF Paletka[i].PAR.StavPaletky = 'NG' THEN
                P4_Vytah.OUT.Banner_CervenaLED_SB10:= P4_Vytah.IN.PritomnostPaletky_S13;
            ELSE    
                P4_Vytah.OUT.Banner_ZelenaLED_SB10:= P4_Vytah.IN.PritomnostPaletky_S13;
            END_IF	
                
                
            IF P4_Vytah.KoniecCyklu THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 0;	
            ELSIF NOT P4_Dopravniky.IN.SnimacZaplneniaSpodnejTrate_IS58 AND P4_Vytah.IN.PritomnostPaletky_S13 AND Safety.STAV.P4_Vytah_Bariera_AKTIVNA AND P4_Vytah.IN.BannerNalozeniaPaletky_SB10  THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                CAM16.STAV.Results_READY:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 133;
            ELSIF NOT P4_Vytah.IN.PritomnostPaletky_S13 THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 100;
            END_IF
				
			
        133:
            SC_P4_Vytah.StepName:='133 - Automaticky Rezim - kamerova kontrola paletky CAM16';//CAM 16//
            SC_P4_Vytah.IdleTime.PT:= T#5s;
            SC_P4_Vytah.AlarmTime.PT:= T#10s;
		
            
		
            IF NOT SC_P4_Vytah.Switch1 AND CAM16.STAV.Command_READY THEN
                CAM16.CMD.Triger:= TRUE;
                SC_P4_Vytah.IdleTime.IN:= TRUE;
                P4_Vytah.OUT.Banner_ModraLED_SB10:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
			
            IF CAM16.STAV.Results_READY AND CAM16.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM16.STAV.Results_READY:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;	
                IF NOT Linka.VyprazdnenieLinky THEN
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 135;
                ELSE
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 136;
                END_IF	
            ELSIF SC_P4_Vytah.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM16.CMD.Triger:= FALSE;
                CAM16.STAV.Results_READY:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 134;
            ELSIF SC_P4_Vytah.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[455]:= TRUE;
                P4_PoruchaST4:= TRUE;    
            END_IF	
		
            
                      
            
            
            
        134:
            SC_P4_Vytah.StepName:='134 - Automaticky Rezim - cakam na opatovny triger kamery CAM16';
            SC_P4_Vytah.IdleTime.PT:= T#2s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;    
            
            SC_P4_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P4_Vytah.IdleTime.Q THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 133;
            END_IF
                
            
            
            
            
			
        135:
            SC_P4_Vytah.StepName:='135 - Automaticky Rezim - kontrola vysledku kamery';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
				
            			
			
            IF NOT CAM16.STAV.BUSY THEN
                CAM16.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM16.RESULT.Paletka.Pritomn_Busbarov_4F AND
                        CAM16.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM16.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM16.RESULT.Paletka.Pritomn_PowerCP THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM16.PAR.ResultFotky:= 'FAIL';
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM16.RESULT.Paletka.Pritomn_Busbarov_5F AND
                        CAM16.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM16.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM16.RESULT.Paletka.Pritomn_PowerCP THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM16.PAR.ResultFotky:= 'FAIL';
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN	
                    IF CAM16.RESULT.Paletka.Pritomn_Busbarov_5H AND
                        CAM16.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM16.RESULT.Paletka.Pritomn_PravyMVcase AND
                        NOT CAM16.RESULT.Paletka.Pritomn_PowerCP THEN
                        CAM16.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM16.PAR.ResultFotky:= 'FAIL';
                    END_IF	
                END_IF	
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 138;
            END_IF	
		
			
        136:
            SC_P4_Vytah.StepName:='136 - Automaticky Rezim - kontrola vysledku kamery pri vyprazdneni linky';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
            SC_P4_Vytah.IdleTime.IN:= TRUE;
			
            
			
            IF NOT CAM16.STAV.BUSY THEN
                CAM16.CMD.Triger:= FALSE;
                IF NOT CAM16.RESULT.Paletka.Pritomn_Busbarov_4F AND
                    NOT CAM16.RESULT.Paletka.Pritomn_Busbarov_5F AND
                    NOT CAM16.RESULT.Paletka.Pritomn_Busbarov_5H AND
                    NOT	CAM16.RESULT.Paletka.Pritomn_LavyMVcase AND
                    NOT	CAM16.RESULT.Paletka.Pritomn_PravyMVcase AND
                    NOT CAM16.RESULT.Paletka.Pritomn_PowerCP THEN
                    CAM16.PAR.ResultFotky:= 'PASS';
                ELSE
                    CAM16.PAR.ResultFotky:= 'FAIL';
                END_IF
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 138;
            END_IF	
			
				
            
        138:
            SC_P4_Vytah.StepName:='138 - Automaticky Rezim - vymazanie adresara kamery'; 
            SC_P4_Vytah.IdleTime.PT:= T#4s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;	
			
            P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= TRUE;
            
            IF NOT SC_P4_Vytah.Switch1 THEN
                FTP_CAM16.CMD.VymazFotku:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM16.STATUS.KomunikaciaUkoncena THEN
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM16.CMD.VymazFotku:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 140;
            ELSIF FTP_CAM16.STATUS.KomunikaciaError THEN
                P34_Alarmy[410]:= TRUE;
                P4_PoruchaST4:= TRUE;
            END_IF	   
            
            
            
				
        140:
            SC_P4_Vytah.StepName:='140 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
				
				
            IF CAM16.PAR.ResultFotky = 'PASS' THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 560;
            ELSIF CAM16.PAR.ResultFotky = 'FAIL' THEN    
                IF P4_Vytah_KAM_Result_OFF THEN
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 560;	
                ELSE
                    SC_P4_Vytah.ResetStep:= TRUE;
                    SC_P4_Vytah.Step:= 143;
                END_IF
            END_IF		
			
            
        143:
            SC_P4_Vytah.StepName:='143 - Automaticky Rezim - zobrazenie hlasenia naloz spravny material na paletku';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
						
            IF NOT SC_P4_Vytah.Switch1 THEN
                IF Linka.VyprazdnenieLinky THEN
                    P34_Vizu.ZobrazHL4_ST10:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '4F' THEN
                    P34_Vizu.ZobrazHL1_ST10:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    P34_Vizu.ZobrazHL2_ST10:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    P34_Vizu.ZobrazHL3_ST10:= TRUE;
                END_IF    
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
						
			
            P4_Vytah.OUT.Banner_CervenaLED_SB10:= Blikac500ms;
				
			
			
            IF P4_Vytah.IN.BannerNalozeniaPaletky_SB10 THEN
                P34_Vizu.ZobrazHL1_ST10:= FALSE;
                P34_Vizu.ZobrazHL2_ST10:= FALSE;
                P34_Vizu.ZobrazHL3_ST10:= FALSE;
                P34_Vizu.ZobrazHL4_ST10:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 130;
            ELSIF P4_Vytah_KAM_Result_Ignoruj THEN
                P4_Vytah_KAM_Result_Ignoruj:= FALSE;
                P34_Vizu.ZobrazHL1_ST10:= FALSE;
                P34_Vizu.ZobrazHL2_ST10:= FALSE;
                P34_Vizu.ZobrazHL3_ST10:= FALSE;
                P34_Vizu.ZobrazHL4_ST10:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 560;	
            END_IF
				
        
	

            //Vyvezenie paletky//			
			
        560:
            SC_P4_Vytah.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na spodny dopravnik';
            SC_P4_Vytah.IdleTime.PT:= T#1s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
						
            SC_P4_Vytah.IdleTime.IN:= NOT P4_Dopravniky.IN.SnimacZaplneniaSpodnejTrate_IS58;
            P34_Vizu.ZobrazHL6_ST10:= NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA;
			
            IF P4_Vytah.KoniecCyklu THEN
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 0;	
            ELSIF SC_P4_Vytah.IdleTime.Q AND P4_Vytah.IN.PritomnostPaletky_S13 AND Safety.STAV.P4_Vytah_Bariera_AKTIVNA AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN
                
                Paletka[i].PAR.CisloPaletky:= '';
                Paletka[i].PAR.StavPaletky:= '';
                Paletka[i].PAR.TypModelu:= '';
                Paletka[i].PAR.KodModelu:= '';
                Paletka[i].PAR.QRkodFiltra_4F5F:= '';
                Paletka[i].PAR.QRkodFiltra_5H:= '';
                Paletka[i].PAR.QRkodPowerCP:= '';
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].PAR.TestovaciKus:= FALSE;
                Paletka[i].PAR.RevorkovyKus:= FALSE;
                Paletka[i].PAR.CisloTestovacejStanice:= '';
                Paletka[i].PAR.CisloRevorkovejStanice:= '';
                Paletka[i].PAR.ID_Operatora:= '';
                Revork:= FALSE;
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Paletka[i].VnutornyStav.CisloEtiketyVyziadane:= FALSE;
                Paletka[i].VnutornyStav.FunkcnyTest_Ukonceny:= FALSE;
                Paletka[i].VnutornyStav.HV_Test_Ukonceny:= FALSE;
                Paletka[i].VnutornyStav.LeakageTest_Ukonceny:= FALSE;
                Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                Paletka[i].VnutornyStav.Zvaranie_Ukoncene:= FALSE;
                CisloFotky:= 0;
                               
                Reports.Kamery.P4_CAM16_KontrolaPaletky:= '';
                                
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                P34_Vizu.ZobrazHL6_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 563;
            ELSIF NOT P4_Vytah.IN.PritomnostPaletky_S13 THEN
                P34_Vizu.ZobrazHL6_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 100;
            END_IF	
		
			
			
        563:
            SC_P4_Vytah.StepName:='563 - Automaticky Rezim - presuvam vytah do spodnej pozicie vyvazania';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
            P4_Vytah.OUT.Banner_OranzovaLED_SB10:= Blikac1s;
		
            P4_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Vytah_PoziciaVykladania;//10
			
			
					
            IF NOT SC_P4_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 565;
            END_IF	
	
            
			
			
        565:
            SC_P4_Vytah.StepName:='565 - Automaticky Rezim - vyvazam na spodny dopravnik';
            SC_P4_Vytah.IdleTime.PT:= T#3s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            IF P4_Dopravniky.STAV.PoINIT THEN
                P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 568;
            END_IF	
			
		
        568:
            SC_P4_Vytah.StepName:='568 - Automaticky Rezim - ukoncenie vyvazania na spodny dopravnik';
            SC_P4_Vytah.IdleTime.PT:= T#400ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
            IF EDGEPOS(P4_Vytah.IN.VystupDopravnikaVytahu_OS11) THEN
                SC_P4_Vytah.IdleTime.IN:= TRUE;
            END_IF    
			
            IF SC_P4_Vytah.IdleTime.Q AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 AND NOT P4_Vytah.IN.PritomnostPaletky_S13 THEN
                P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 570;
            END_IF				
				
		
        570:
            SC_P4_Vytah.StepName:='570 - Automaticky Rezim - cakam na spustenie presunu vytahu do hornej pozicie navazania';
            SC_P4_Vytah.IdleTime.PT:= T#100ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P4_Vytah.IdleTime.IN:= Safety.STAV.P4_Vytah_Bariera_AKTIVNA AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 AND NOT P4_Vytah.IN.PritomnostPaletky_S13;
            P34_Vizu.ZobrazHL6_ST10:= NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA;
            
            IF SC_P4_Vytah.IdleTime.Q  THEN
                P34_Vizu.ZobrazHL6_ST10:= FALSE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 573;
            END_IF	
			
        573:
            SC_P4_Vytah.StepName:='573 - Automaticky Rezim - presuvam vytah do hornej pozicie navazania';
            SC_P4_Vytah.IdleTime.PT:= T#200ms;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
		
            P4_Vytah.OUT.Banner_OranzovaLED_SB10:= Blikac1s;
		
            P4_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Vytah_PoziciaNakladania;//10
			
								
            IF NOT SC_P4_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P4_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P4_Vytah.ResetStep:= TRUE;
                SC_P4_Vytah.Step:= 100;
            END_IF	
	
            
			
			
			
	
	
            //*******************************************************Manu·lny reûim*******************************************************************************//
        700:
            SC_P4_Vytah.StepName:='700 - Manualny Rezim';
            SC_P4_Vytah.IdleTime.PT:= T#8s;
            SC_P4_Vytah.AlarmTime.PT:= T#5s;
				
						
            P4_Vytah.ServoZdvihuVytahu_M26.PAR.JoggAcceleration:= (P4_Vytah.PAR.ServoZdvihu_JoggRychlost * 10);
            P4_Vytah.ServoZdvihuVytahu_M26.PAR.JoggDeceleration:= (P4_Vytah.PAR.ServoZdvihu_JoggRychlost * 10);
            P4_Vytah.ServoZdvihuVytahu_M26.PAR.JoggVelocity:= P4_Vytah.PAR.ServoZdvihu_JoggRychlost;
            P4_Vytah.ServoZdvihuVytahu_M26.PAR.JoggPoziciaLimitVPRED:= 630.0;
            P4_Vytah.ServoZdvihuVytahu_M26.PAR.JoggPoziciaLimitVZAD:= 10.0;
            P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggLimit_ACTIVE:= TRUE;
			
	
            //Ovl·danie dopravnÌka v˝ùahu//
            IF P4_Vytah.RR_ChodDopravnika_VPRED THEN
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
                P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= TRUE;
            ELSIF P4_Vytah.RR_ChodDopravnika_VZAD THEN
                P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= FALSE;
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= TRUE; 
            ELSE
                P4_Vytah.OUT.Dopravnik_VYVAZANIE_M5:= FALSE;
                P4_Vytah.OUT.Dopravnik_NAVAZANIE_M5:= FALSE;
            END_IF 
        
        
        
        
        
        
    END_CASE
	
	
	
	
                END_PROGRAM

PROGRAM _EXIT
                (* Insert code here *)
	 
                END_PROGRAM


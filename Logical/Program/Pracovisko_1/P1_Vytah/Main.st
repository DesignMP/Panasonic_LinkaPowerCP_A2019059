
PROGRAM _INIT
    P1_Vytah.PAR.ServoZdvihu_JoggRychlost:= 50;
    Triger_0:= FALSE;
    
    //Z·pis do ParID serva - nastavenie max momentu v smere ot·Ëania a v protismere ot·Ëania//
    NovaHodnotaMomentu_POS := 1.5; //v Nm
    NovaHodnotaMomentu_NEG := 1.5; //v Nm
    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_6);
    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
    
    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
    McAcpAxProcessParIDType_0[0].ParID      := 248;
    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(NovaHodnotaMomentu_POS);
    
    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
    McAcpAxProcessParIDType_0[1].ParID      := 249;
    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(NovaHodnotaMomentu_NEG);
	
    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
    MC_BR_ProcessParID_AcpAx_0();
    
    
END_PROGRAM

PROGRAM _CYCLIC
	
	
	
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P1_Vytah);
	
	
    //Volanie podprogramov//
    OvlServaZdvihu;
    IOLinkKomunikacia;

	

	
    //Reset sekcie //
    IF NOT Safety.STAV.P1_ZonaVytahu_AKTIVNA THEN
        SC_P1_Vytah.Step:= 0;
    ELSIF P1_Vytah.Reset THEN
        SC_P1_Vytah.Step:= 0;
        P1_Vytah.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serva//
    IF EDGEPOS(P1_Vytah.Reset) THEN
        Zdvih_STOP:= TRUE;
    END_IF	
	
   
    //Porucha stanice//
    IF P1_PoruchaST1 AND NOT Triger_0 THEN
        Triger_0:= TRUE;
        SC_P1_Vytah.ResetStep:= TRUE;
        SC_P1_Vytah.Step:= 0;
    END_IF    
    
   	
    IF NOT P1_PoruchaST1 THEN
        Triger_0:= FALSE;
    END_IF    
    
    
    
    
    
	
    CASE SC_P1_Vytah.Step OF 
	
	
        0:
            SC_P1_Vytah.StepName:='0 - Nulovanie';
            SC_OvlZdvihu.Step:= 0;
            P1_Vytah.Automat:= FALSE;
            P1_Vytah.KoniecCyklu:= FALSE;
            P1_Vytah.Manual:= FALSE;
            P1_Vytah.STAV.PoINIT:= FALSE;
            P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggLimit_ACTIVE:= FALSE;
            P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
            P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= FALSE;
            P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
            P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
            P1_Vytah.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P1_Vytah.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P1_Vytah_ST1.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P1_Vytah_ST1.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P1_Vytah_ST1.CMD.OdosliStavPaletky_TYP2:= FALSE;
            P1_Vytah.RR_ChodDopravnika_VPRED:= FALSE;
            P1_Vytah.RR_ChodDopravnika_VZAD:= FALSE;
            CAM2.CMD.Triger:= FALSE;
            CAM2.STAV.Results_READY:= FALSE;
            FTP_CAM2.CMD.OdosliFotku:= FALSE;
            FTP_CAM2.CMD.VymazFotku:= FALSE;
            CAM3.CMD.Triger:= FALSE;
            CAM3.STAV.Results_READY:= FALSE;
            FTP_CAM3.CMD.OdosliFotku:= FALSE;
            FTP_CAM3.CMD.VymazFotku:= FALSE;
            CAM4.CMD.Triger:= FALSE;
            CAM4.STAV.Results_READY:= FALSE;
            FTP_CAM4.CMD.OdosliFotku:= FALSE;
            FTP_CAM4.CMD.VymazFotku:= FALSE;
            CAM5.CMD.Triger:= FALSE;
            CAM5.STAV.Results_READY:= FALSE;
            FTP_CAM5.CMD.OdosliFotku:= FALSE;
            FTP_CAM5.CMD.VymazFotku:= FALSE;
            P1_Vizu.ZobrazHL1_ST1:= FALSE;
            P1_Vizu.ZobrazHL2_ST1:= FALSE;
            P1_Vizu.ZobrazHL3_ST1:= FALSE;
            P1_Vizu.ZobrazHL4_ST1:= FALSE;
            P1_Vizu.ZobrazHL5_ST1:= FALSE;
            P1_Vizu.ZobrazHL6_ST1:= FALSE;
            P1_Vizu.ZobrazHL7_ST1:= FALSE;
            P1_Vizu.ZobrazHL8_ST1:= FALSE;
            P1_Vizu.ZobrazHL9_ST1:= FALSE;
            P1_Vizu.ZobrazHL10_ST1:= FALSE;
            P1_Vizu.ZobrazHL11_ST1:= FALSE;
            P1_Vizu.ZobrazHL12_ST1:= FALSE;
            P1_Vizu.ZobrazHL13_ST1:= FALSE;
            P1_Vizu.ZobrazHL14_ST1:= FALSE;
            PrecitaneCisloPaletky:= '';
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_Vytah_ST1.CMD.START_Merania_1:= FALSE;
            Taktime_Vytah_ST1.CMD.START_Merania_2:= FALSE;
            P1_Vytah_KAM_Result_Ignoruj:= FALSE;
            Linka.PaletkaPrechadza:= FALSE;
            TestovaciKus:= FALSE;
            Linka.TestovaciKus:= FALSE;
            Linka.Revork:= FALSE;
            CisloFotky:= 0;
			PocetTrigrovKamery:= 0;
			P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
            
			
            IF Safety.STAV.P1_ZonaVytahu_AKTIVNA AND NOT P1_PoruchaST1  AND P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 AND P1_Pracovisko.STAV.ServoVytahu_READY THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 1;
            END_IF
	
        1:
            SC_P1_Vytah.StepName:='1 - Cakam na spustenie vyroby';
            P1_Vytah.KoniecCyklu:= FALSE;
            IF P1_Vytah.Automat THEN
                SC_P1_Vytah.Step:= 2;
            ELSIF P1_Vytah.Manual THEN
                SC_P1_Vytah.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializ·cia****************************************************************************//	
		
        2:
            SC_P1_Vytah.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P1_Vytah.IdleTime.IN:= P1_Dopravniky.STAV.PoINIT;
									
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 3;
            END_IF
		
        3:		
            SC_P1_Vytah.StepName:='3 - Inicializacia - vymazanie adresara kamier CAM 2 a CAM4'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena  AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= FALSE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM3.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                FTP_CAM5.CMD.VymazFotku:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 4;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;	
            END_IF	
			
				
        4:
            SC_P1_Vytah.StepName:='4 - Inicializacia - spustam dopravnik vytahu pre navezenie paletky';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#7s;
			
            SC_P1_Vytah.IdleTime.IN:= P1_Vytah.IN.PritomnostPaletky_S19;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= TRUE;
                SC_P1_Vytah.AlarmTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF SC_P1_Vytah.IdleTime.Q AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 5;
            ELSIF SC_P1_Vytah.AlarmTime.Q AND NOT P1_Vytah.IN.PritomnostPaletky_S19 AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN	
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 5;
            ELSIF SC_P1_Vytah.IdleTime.Q AND P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN		
                P1_Alarmy[102]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
			
				
        5:
            SC_P1_Vytah.StepName:='3 - Inicializacia - kontrola homingu serva zdvihu vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
            IF P1_Vytah.STAV.ServoZdvihu_HomingOK THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 10;
            ELSE
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 7;
            END_IF
		
        7:
            SC_P1_Vytah.StepName:='7 - Inicializacia - cakam na spustenie homingu serva zdvihu vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#1s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            SC_P1_Vytah.IdleTime.IN:= Safety.STAV.P1_Vytah_Bariera_AKTIVNA AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12;
			           
            P1_Vizu.ZobrazHL13_ST1:= NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                P1_Vizu.ZobrazHL13_ST1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 8;
            END_IF		
			
			
			
			
        8:
            SC_P1_Vytah.StepName:='4 - Inicializacia - spustam homing serva zdvihu vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
            P1_Vytah.OUT.Banner_OranzovaLED_SB11:= Blikac1s;
			
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                Zdvih_HOME:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
		
            IF P1_Vytah.STAV.ServoZdvihu_HomingOK THEN
                P1_Vytah.OUT.Banner_OranzovaLED_SB11:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 10;
            END_IF	
	
            
			
		
				
        10:
            SC_P1_Vytah.StepName:='10 - Inicializacia - kontrola pozicie vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P1_RemPremenne.P1_Vytah_PoziciaVykladania;
            ZadanaPoziciaUINT:= LREAL_TO_UINT(P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia);
            AktualnaPoziciaUINT:= LREAL_TO_UINT(P1_Vytah.STAV.Zdvih_AktualnaPozicia);
			
            
            
            IF ZadanaPoziciaUINT = AktualnaPoziciaUINT THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 15;
            ELSE
                P1_Vizu.ZobrazHL13_ST1:= NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA;
                IF Safety.STAV.P1_Vytah_Bariera_AKTIVNA AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
                    P1_Vizu.ZobrazHL13_ST1:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 13;
                END_IF
            END_IF	
			
				
	
        13:
            SC_P1_Vytah.StepName:='13 - Inicializacia - presuvam vytah do hornej pozicie vyvazania';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
	
            P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P1_RemPremenne.P1_Vytah_PoziciaVykladania;//631
			
            P1_Vytah.OUT.Banner_OranzovaLED_SB11:= Blikac1s;		
					
            IF NOT SC_P1_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P1_Vytah.OUT.Banner_OranzovaLED_SB11:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 15;
            END_IF	
	
            			
	
        15:
            SC_P1_Vytah.StepName:='15 - Inicializacia - kontrola pritomnosti paletky';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF P1_Vytah.IN.PritomnostPaletky_S19 THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 18;
            ELSE
                P1_Vytah.STAV.PoINIT:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 100;
            END_IF	
			
		
        18:
            SC_P1_Vytah.StepName:='18 - Inicializacia -  precitanie cisla paletky';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
            IF SC_P1_Vytah.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P1_Vytah.IN.PrecitaneCisloPaletky_S19);
                i:= 0;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 20;
            END_IF   
        
			
        20:
            SC_P1_Vytah.StepName:='20 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
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
                P1_Alarmy[103]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P1_Vytah.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P1_Vytah.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 23;
            END_IF		
			    
            
        23:
            SC_P1_Vytah.StepName:='23 - Inicializacia - kontrola uzavretia komunikacie';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 50;
            ELSE
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 25;
            END_IF    
            
        25:
            SC_P1_Vytah.StepName:='25 - Inicializacia - kontrola priradenia QR kodu filtra';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                IF Paletka[i].VnutornyStav.QRkodFiltraPriradeny THEN
                    IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 50;
                    ELSE    
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 50;
                    END_IF    
                ELSE    
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 28;
                END_IF  
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                IF Paletka[i].VnutornyStav.QRkodFiltraPriradeny THEN
                    IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 50;
                    ELSE    
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 50;
                    END_IF    
                ELSE    
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 28;
                END_IF    
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 28;
            END_IF
                
        28:
            SC_P1_Vytah.StepName:='28 - Inicializacia - kontrola otvorenia komunikacie';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
                
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 50;
            ELSE
                P1_Vytah.STAV.PoINIT:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 113;
            END_IF    
               
                   
        50:
            SC_P1_Vytah.StepName:='50 - Inicializacia - kamerova kontrola paletky CAM 2';//CAM 2 - kontrola kusov na paletke//
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
		
                       
                        
            IF P1_Vytah.IN.PritomnostPaletky_S19 THEN   
                IF NOT SC_P1_Vytah.Switch1 AND CAM2.STAV.Command_READY THEN
                    CAM2.CMD.Triger:= TRUE;
                    P1_Vytah.OUT.Banner_ModraLED_SB11:= TRUE;
                    SC_P1_Vytah.IdleTime.IN:= TRUE;
                    SC_P1_Vytah.Switch1:= TRUE;
                END_IF
            ELSE   
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                P1_Vytah.STAV.PoINIT:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 100; 
            END_IF
			

            IF CAM2.STAV.Results_READY AND CAM2.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM2.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 55;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM2.STAV.Results_READY:= FALSE;
                CAM2.CMD.Triger:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 53;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN  
                P1_Alarmy[164]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
	    
        53:
            SC_P1_Vytah.StepName:='53 - Inicializacia - cakam na opatovny triger kamery CAM 2';
            SC_P1_Vytah.IdleTime.PT:= T#1s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 50;
            END_IF
        
            
                       
            
			
        55:
            SC_P1_Vytah.StepName:='55 - Inicializacia - kontrola vysledku kamery CAM 2'; //kontrola kusov na paletke
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
            P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
			
            IF NOT CAM2.STAV.BUSY THEN
                CAM2.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_4F AND
                        CAM2.RESULT.Paletka.Pritom_DPS_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_Foamu_4F5F AND 
                        CAM2.RESULT.Paletka.Pritom_PowerCP_4F AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_4F5F AND
                        CAM2.RESULT.Paletka.OsadeniePlastuDPS_OK AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase  THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_5F AND
                        CAM2.RESULT.Paletka.Pritom_DPS_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_Foamu_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_PowerCP_5F AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_4F5F AND
                        CAM2.RESULT.Paletka.OsadeniePlastuDPS_OK AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyLavy_5H AND
                        CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyPravy_5H AND
                        CAM2.RESULT.Paletka.Pritom_KrytuBusbarov_5H AND
                        CAM2.RESULT.Paletka.Pritom_PowerCP_5H AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_5H AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                END_IF
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 58;
            END_IF
            
	
            
		
        58:
            SC_P1_Vytah.StepName:='58 - Inicializacia - rozhodnutie podla kamerovej kontroly CAM 2';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
					
            IF CAM2.PAR.ResultFotky = 'PASS' THEN
                CAM5.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 65;
            ELSIF CAM2.PAR.ResultFotky = 'FAIL' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 60;
            END_IF		
		
                   
            
			
        60:
            SC_P1_Vytah.StepName:='60 - Inicializacia - cakam na vlozenie materialu do paletky a potvrdenie bannerom';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
				
            IF NOT SC_P1_Vytah.Switch1 THEN
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    P1_Vizu.ZobrazHL1_ST1:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    P1_Vizu.ZobrazHL2_ST1:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    P1_Vizu.ZobrazHL3_ST1:= TRUE;
                END_IF  
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
		
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
			
			
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                P1_Vizu.ZobrazHL1_ST1:= FALSE;
                P1_Vizu.ZobrazHL2_ST1:= FALSE;
                P1_Vizu.ZobrazHL3_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                CAM2.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 65;
            ELSIF P1_Vytah_KAM_Result_Ignoruj THEN
                P1_Vytah_KAM_Result_Ignoruj:= FALSE;
                CAM2.STAV.Results_READY:= FALSE;
                CAM5.STAV.Results_READY:= FALSE;
                CAM2.PAR.ResultFotky:= 'PASS';
                P1_Vizu.ZobrazHL1_ST1:= FALSE;
                P1_Vizu.ZobrazHL2_ST1:= FALSE;
                P1_Vizu.ZobrazHL3_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 65;
            END_IF	
				
			
        65:
            SC_P1_Vytah.StepName:='65 - Inicializacia - vymazanie adresara kamery CAM 2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND CAM2.PAR.ResultFotky = 'PASS' THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 70;
            ELSIF FTP_CAM2.STATUS.KomunikaciaUkoncena AND CAM2.PAR.ResultFotky = 'FAIL' THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 50;    
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
            
        70:
            SC_P1_Vytah.StepName:='70 - Inicializacia - rozhodnutie podla stavu paletky'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P1_Vytah.STAV.PoINIT:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 560;    
            ELSIF Paletka[i].VnutornyStav.QRkodFiltraPriradeny AND Linka.PAR.ZvolenyModel = '4F' THEN
                P1_Vytah.STAV.PoINIT:= TRUE;
                IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 550;
                ELSE    
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 540;
                END_IF  
            ELSIF Paletka[i].VnutornyStav.QRkodFiltraPriradeny AND Linka.PAR.ZvolenyModel = '5F' THEN
                P1_Vytah.STAV.PoINIT:= TRUE;
                IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 550;
                ELSE    
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 540;
                END_IF   
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                P1_Vytah.STAV.PoINIT:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 308;
            END_IF 
            
               
            
			
			
            //********************************************************Automatick˝ reûim****************************************************************************//
		
        100:
            SC_P1_Vytah.StepName:='100 - Automaticky Rezim - cakam na navezenie paletky na vytah zo spodneho dopravnika';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
		
                        
            P1_Vizu.ZobrazHL13_ST1:= NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA;
            
            IF P1_Vytah.KoniecCyklu THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 0;
            ELSIF SC_P1_SpodnyStoper.Step = 101 AND NOT P1_Vytah.IN.PritomnostPaletky_S19 AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 AND Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
                P1_Vizu.ZobrazHL13_ST1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 103;
            ELSIF P1_Vytah.IN.PritomnostPaletky_S19 THEN
                P1_Vizu.ZobrazHL13_ST1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 113;
            END_IF	
		
                  
        103:
            SC_P1_Vytah.StepName:='103 - Automaticky Rezim - presuvam vytah do spodnej pozicie navazania';
            SC_P1_Vytah.IdleTime.PT:= T#3s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
            P1_Vytah.OUT.Banner_OranzovaLED_SB11:= Blikac1s;
		
            P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P1_RemPremenne.P1_Vytah_PoziciaNakladania;//10
			
			
					
            IF NOT SC_P1_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
                Zdvih_POLOHUJ:= TRUE;
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= TRUE;
                SC_P1_Vytah.IdleTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta AND SC_P1_Vytah.IdleTime.Q THEN
                P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P1_Vytah.OUT.Banner_OranzovaLED_SB11:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 105;
            END_IF	
	
            		
		
        105:
            SC_P1_Vytah.StepName:='105 - Automaticky Rezim - navazam paletku na dopravnik vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#20s;
		
            SC_P1_Vytah.IdleTime.IN:= P1_Vytah.IN.PritomnostPaletky_S19;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= TRUE;
                SC_P1_Vytah.AlarmTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF EDGEPOS(P1_Vytah.IN.PritomnostPaletky_S19)THEN
                IF NOT Taktime_Vytah_ST1.CMD.START_Merania_1 THEN
                    Taktime_Vytah_ST1.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Vytah_ST1.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF 
            END_IF    
            
            
            IF P1_Vytah.IN.PritomnostPaletky_S19 AND SC_P1_Vytah.IdleTime.Q AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 108;
            ELSIF SC_P1_Vytah.AlarmTime.Q THEN
                P1_Alarmy[102]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
		
						
		
        108:
            SC_P1_Vytah.StepName:='108 - Automaticky Rezim - cakam na presun vytahu do hornej pozicie vyvazania';
            SC_P1_Vytah.IdleTime.PT:= T#1s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
		
            P1_Vizu.ZobrazHL13_ST1:= NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA;
            
            IF NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 AND Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
                P1_Vizu.ZobrazHL13_ST1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 110;
            END_IF	
		
        110:
            SC_P1_Vytah.StepName:='110 - Automaticky Rezim - presuvam vytah do hornej pozicie vyvazania';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
		
            P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia:= P1_RemPremenne.P1_Vytah_PoziciaVykladania;
            P1_Vytah.OUT.Banner_OranzovaLED_SB11:= Blikac1s;
			
					
            IF NOT SC_P1_Vytah.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
				
            IF P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P1_Vytah.OUT.Banner_OranzovaLED_SB11:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 113;
            END_IF	
			
		
			
				
        113:
            SC_P1_Vytah.StepName:='113 - Automaticky Rezim -  precitanie cisla paletky';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
            IF SC_P1_Vytah.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P1_Vytah.IN.PrecitaneCisloPaletky_S19);
                i:= 0;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 115;
            END_IF   
        
			
        115:
            SC_P1_Vytah.StepName:='115 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
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
                P1_Alarmy[103]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P1_Vytah.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P1_Vytah.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 125;
            END_IF		
			
	
			
					
			
        125:
            SC_P1_Vytah.StepName:='125 - Automaticky Rezim - cakam na potvrdenie bannerom, kontrola prihlasenia operatora';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#7s;	
			
            IF P1_UzivatelPrihlaseny THEN
                P1_Vizu.ZobrazHL14_ST1:= FALSE;
                P1_Vytah.OUT.Banner_ZelenaLED_SB11:= TRUE;
                P1_Vytah.OUT.Banner_CyanLED_SB11:= FALSE;
            ELSE    
                P1_Vizu.ZobrazHL14_ST1:= TRUE;
                P1_Vytah.OUT.Banner_ZelenaLED_SB11:= FALSE;
                P1_Vytah.OUT.Banner_CyanLED_SB11:= Blikac500ms;
            END_IF    
          
                       
                
            IF P1_Vytah.KoniecCyklu THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 0;
            ELSIF P1_Vytah.IN.PritomnostPaletky_S19 AND Linka.PaletkaPrechadza THEN
                P1_Vizu.ZobrazHL14_ST1:= FALSE;
                Linka.PaletkaPrechadza:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                Paletka[i].PAR.StavPaletky:= 'NG';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 560;
            ELSIF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 AND P1_Vytah.IN.PritomnostPaletky_S19 AND P1_UzivatelPrihlaseny THEN
                P1_Vizu.ZobrazHL14_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel1;
                IF Linka.TestovaciKus THEN
                    CAM2.STAV.Results_READY:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 150;
                ELSIF Linka.Revork THEN
                    CAM2.STAV.Results_READY:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 150;
                ELSE
                    CAM2.STAV.Results_READY:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 130;
                END_IF 
            ELSIF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 AND P1_Vytah.IN.PritomnostPaletky_S19 AND NOT P1_UzivatelPrihlaseny THEN 
                Paletka[i].PAR.ID_Operatora:= '';
            ELSIF NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN
                P1_Vizu.ZobrazHL14_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 128;
            END_IF
		
            
        128:
            SC_P1_Vytah.StepName:='128 - Automaticky Rezim - hladanie paletky na dopravnÌku vytahu';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#7s;	
            
            SC_P1_Vytah.IdleTime.IN:= P1_Vytah.IN.PritomnostPaletky_S19;
            SC_P1_Vytah.AlarmTime.IN:= NOT P1_Vytah.IN.PritomnostPaletky_S19; 
            
            P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= TRUE; 
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE; 
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 125;
            ELSIF SC_P1_Vytah.AlarmTime.Q THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE; 
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 100;
            END_IF    
            
					
			
        130:
            SC_P1_Vytah.StepName:='130 - Automaticky Rezim - kamerova kontrola CAM 2';//CAM 2 - kontrola kusov na paletke//
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
		
            
		
            IF P1_Vytah.KoniecCyklu THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 0;
            ELSIF NOT P1_UzivatelPrihlaseny THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 125;
            ELSIF P1_Vytah.IN.PritomnostPaletky_S19 AND Linka.PaletkaPrechadza THEN
                Linka.PaletkaPrechadza:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                Paletka[i].PAR.StavPaletky:= 'NG';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 560;
            ELSIF P1_Vytah.IN.PritomnostPaletky_S19 AND Linka.TestovaciKus THEN
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel1;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;
            ELSIF P1_Vytah.IN.PritomnostPaletky_S19 AND Linka.Revork THEN
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel1;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;    
            ELSIF NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 100;    
            ELSIF NOT SC_P1_Vytah.Switch1 AND CAM2.STAV.Command_READY AND NOT Kamery_PAUZA THEN
                CAM2.CMD.Triger:= TRUE;
                P1_Vytah.OUT.Banner_ModraLED_SB11:= TRUE;
                SC_P1_Vytah.IdleTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			

            IF CAM2.STAV.Results_READY AND CAM2.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM2.STAV.Results_READY:= FALSE;
                Paletka[i].PAR.ID_Operatora:= 'E2';//UsersVizu.CisloPrihlasenejKarty_Panel1;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 133;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM2.STAV.Results_READY:= FALSE;
                CAM2.CMD.Triger:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 131;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN  
                P1_Alarmy[164]:= TRUE;
                P1_PoruchaST1:= TRUE;    
            END_IF	
	    
                      
            
            
            
        131:
            SC_P1_Vytah.StepName:='131 - Automaticky Rezim - cakam na opatovny triger kamery CAM 2';
            SC_P1_Vytah.IdleTime.PT:= T#1s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            END_IF
        
            
                       
            
			
        133:
            SC_P1_Vytah.StepName:='133 - Automaticky Rezim - kontrola vysledku kamery CAM 2'; //kontrola kusov na paletke
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
            P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
			
            IF NOT CAM2.STAV.BUSY THEN
                CAM2.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_4F AND
                        CAM2.RESULT.Paletka.Pritom_DPS_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_Foamu_4F5F AND 
                        CAM2.RESULT.Paletka.Pritom_PowerCP_4F AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_4F5F AND
                        CAM2.RESULT.Paletka.OsadeniePlastuDPS_OK AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase  THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_5F AND
                        CAM2.RESULT.Paletka.Pritom_DPS_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_Foamu_4F5F AND
                        CAM2.RESULT.Paletka.Pritom_PowerCP_5F AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_4F5F AND
                        CAM2.RESULT.Paletka.OsadeniePlastuDPS_OK AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyLavy_5H AND
                        CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyPravy_5H AND
                        CAM2.RESULT.Paletka.Pritom_KrytuBusbarov_5H AND
                        CAM2.RESULT.Paletka.Pritom_PowerCP_5H AND
                        CAM2.RESULT.Paletka.Pritomn_Skeletonu_5H AND
                        CAM2.RESULT.Paletka.Pritomn_LavyMVcase AND
                        CAM2.RESULT.Paletka.Pritomn_PravyMVcase THEN
                        CAM2.PAR.ResultFotky:= 'PASS';
                    ELSE
                        CAM2.PAR.ResultFotky:= 'FAIL';
                    END_IF
                END_IF
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 135;
            END_IF
            
	
            
		
        135:
            SC_P1_Vytah.StepName:='135 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly CAM 2';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
					
            IF CAM2.PAR.ResultFotky = 'PASS' THEN
                CAM5.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;
            ELSIF P1_Vytah_KAM_Result_OFF THEN
                CAM5.STAV.Results_READY:= FALSE;
                CAM2.PAR.ResultFotky:= 'PASS';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;
            ELSIF CAM2.PAR.ResultFotky = 'FAIL' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 138;
            END_IF		
		
                   
            
			
        138:
            SC_P1_Vytah.StepName:='138 - Automaticky Rezim - cakam na vlozenie materialu do paletky a potvrdenie bannerom';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
				
            IF NOT SC_P1_Vytah.Switch1 THEN
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    P1_Vizu.ZobrazHL1_ST1:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    P1_Vizu.ZobrazHL2_ST1:= TRUE;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    P1_Vizu.ZobrazHL3_ST1:= TRUE;
                END_IF  
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
		
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
			
			
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                P1_Vizu.ZobrazHL1_ST1:= FALSE;
                P1_Vizu.ZobrazHL2_ST1:= FALSE;
                P1_Vizu.ZobrazHL3_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                CAM2.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 148;
            ELSIF P1_Vytah_KAM_Result_Ignoruj THEN
                P1_Vytah_KAM_Result_Ignoruj:= FALSE;
                CAM2.STAV.Results_READY:= FALSE;
                CAM5.STAV.Results_READY:= FALSE;
                CAM2.PAR.ResultFotky:= 'PASS';
                P1_Vizu.ZobrazHL1_ST1:= FALSE;
                P1_Vizu.ZobrazHL2_ST1:= FALSE;
                P1_Vizu.ZobrazHL3_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;
            END_IF	
				
			
        148:
            SC_P1_Vytah.StepName:='148 - Automaticky Rezim - vymazanie adresara kamery CAM 2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
		
                   
				
			
        150:
            SC_P1_Vytah.StepName:='150 - Automaticky Rezim - kamerova kontrola CAM 5';//CAM 5 - kontrola QR kÛdu na Power CP//
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;	
            
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= TRUE;
			
			
            IF NOT SC_P1_Vytah.Switch1 AND SC_P1_Vytah.IdleTime.Q THEN 
                CAM5.CMD.Triger:= TRUE;
                P1_Vytah.OUT.Banner_ModraLED_SB11:= TRUE;
                SC_P1_Vytah.AlarmTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			

            IF CAM5.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM5.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 153;
            ELSIF SC_P1_Vytah.AlarmTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM5.STAV.Results_READY:= FALSE;
                CAM5.CMD.Triger:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 151;
            ELSIF SC_P1_Vytah.AlarmTime.Q AND PocetTrigrovKamery >= 5 THEN    
                P1_Alarmy[165]:= TRUE;
                P1_PoruchaST1:= TRUE; 
            END_IF	
		
                       
            
        151:
            SC_P1_Vytah.StepName:='151 - Automaticky Rezim - cakam na opatovny triger kamery CAM 5';
            SC_P1_Vytah.IdleTime.PT:= T#1s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 150;
            END_IF    
            
            
        153:
            SC_P1_Vytah.StepName:='153 - Automaticky Rezim - kontrola vysledku kamery CAM 5';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
				
            P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
			
            IF NOT CAM5.STAV.BUSY THEN
                CAM5.CMD.Triger:= FALSE;
                IF CAM5.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK THEN
                    IF (P1_Vytah.PAR.StaryQRkod_PowerCP <> CAM5.RESULT.PowerCP.PrecitanyQRkod_PowerCP) OR Linka.TestovaciKus OR Linka.Revork THEN
                        Paletka[i].PAR.QRkodPowerCP:= CAM5.RESULT.PowerCP.PrecitanyQRkod_PowerCP;
                        TRCB_P1_Vytah_ST1.INPUTS.QRkodPowerCP:= CAM5.RESULT.PowerCP.PrecitanyQRkod_PowerCP;
                        CAM5.PAR.ResultFotky:= 'PASS';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 155;
                    ELSIF (P1_Vytah.PAR.StaryQRkod_PowerCP = CAM5.RESULT.PowerCP.PrecitanyQRkod_PowerCP) THEN
                        CAM5.PAR.ResultFotky:= 'FAIL';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 155;
                    END_IF    
                ELSE
                    CAM5.PAR.ResultFotky:= 'FAIL';
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 155;
                END_IF
            END_IF
			
		
        155:
            SC_P1_Vytah.StepName:='155 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly CAM 5';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
					
            IF CAM5.PAR.ResultFotky = 'PASS' THEN
                IF Linka.TestovaciKus THEN
                    P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 300;
                ELSIF Linka.Revork THEN
                    P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 300;
                ELSE
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 165;
                END_IF    
            ELSIF CAM5.PAR.ResultFotky = 'FAIL' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 158;
            END_IF	
	
            
            
            
            
			
        158:
            SC_P1_Vytah.StepName:='158 - Automaticky Rezim - zobrazenie hlasenia neprecitany QR kod PowerCP';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL4_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
				
			
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                CAM5.STAV.Results_READY:= FALSE;
                P1_Vizu.ZobrazHL4_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 160;
            END_IF	
		
			
			
        160:
            SC_P1_Vytah.StepName:='160 - Automaticky Rezim - vymazanie adresara kamery CAM 2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
       		
               
            
            
       		
	
        165:
            SC_P1_Vytah.StepName:='165 - Automaticky Rezim - rozhodnutie podla typu modelu';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                CAM4.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 170;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                CAM4.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 170;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN	
                P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 300;
            END_IF	
				
				
			
        170:
            SC_P1_Vytah.StepName:='170 - Automaticky Rezim - kamerova kontrola CAM 4';//CAM 4 - kontrola klipov krytu DPS iba moly 4F a 5F//
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= TRUE;
			
            IF SC_P1_Vytah.IdleTime.Q THEN
                IF NOT SC_P1_Vytah.Switch1 AND CAM4.STAV.Command_READY AND NOT Kamery_PAUZA THEN
                    CAM4.CMD.Triger:= TRUE;
                    P1_Vytah.OUT.Banner_ModraLED_SB11:= TRUE;
                    SC_P1_Vytah.AlarmTime.IN:= TRUE;
                    SC_P1_Vytah.Switch1:= TRUE;
                END_IF
            END_IF
			

            IF CAM4.STAV.Results_READY AND CAM4.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM4.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 173;
            ELSIF SC_P1_Vytah.AlarmTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM4.STAV.Results_READY:= FALSE;
                CAM4.CMD.Triger:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 171;
            ELSIF SC_P1_Vytah.AlarmTime.Q AND PocetTrigrovKamery >= 5 THEN    
                P1_Alarmy[166]:= TRUE;
                P1_PoruchaST1:= TRUE;     
            END_IF	
		
                    
            
            
            
            
        171:
            SC_P1_Vytah.StepName:='171 - Automaticky Rezim - cakam na opatovny triger kamery CAM 4';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 170;
            END_IF
            
			
        173:
            SC_P1_Vytah.StepName:='173 - Automaticky Rezim - kontrola vysledku kamery CAM 4';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
				
            P1_Vytah.OUT.Banner_ModraLED_SB11:= FALSE;
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
			
            IF NOT CAM4.STAV.BUSY  THEN
                CAM4.CMD.Triger:= FALSE;
                IF CAM4.RESULT.Paletka.Pritomn_Pinu1_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritomn_Pinu2_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritomn_Pinu3_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritomn_Pinu4_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritomn_Pinu5_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritomn_Pinu6_KrytDPS_4F5F AND
                    CAM4.RESULT.Paletka.Pritom_DPS_4F5F THEN
                    CAM4.PAR.ResultFotky:= 'PASS';
                ELSE
                    CAM4.PAR.ResultFotky:= 'FAIL';
                END_IF
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 175;
            END_IF
		
			
        175:
            SC_P1_Vytah.StepName:='175 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly CAM 4';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
					
            IF CAM4.PAR.ResultFotky = 'PASS' THEN
                CAM3.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 190;
            ELSIF CAM4.PAR.ResultFotky = 'FAIL' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 178;
            END_IF		
			
		
       
            
            
			
        178:
            SC_P1_Vytah.StepName:='178 - Automaticky Rezim - zobrazenie hlasenia chyba DPS alebo zle zacvaknute piny na DPS';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            P1_Pracovisko.OUT.Osvetlenie_CAM4:= FALSE;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL5_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
			
			
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                CAM4.STAV.Results_READY:= FALSE;
                P1_Vizu.ZobrazHL5_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 180;
            ELSIF P1_Vytah_KAM_Result_Ignoruj THEN 
                CAM4.STAV.Results_READY:= FALSE;
                CAM3.STAV.Results_READY:= FALSE;
                P1_Vytah_KAM_Result_Ignoruj:= FALSE;
                P1_Vizu.ZobrazHL5_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                CAM4.PAR.ResultFotky:= 'PASS';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 190;
            END_IF	
			
						
			
        180:
            SC_P1_Vytah.StepName:='180 - Automaticky Rezim - vymazanie adresara kamery CAM4, CAM2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;    
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN    
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
        
                   
            
      	
            
        190:
            SC_P1_Vytah.StepName:='190 - Automaticky Rezim - kamerova kontrola CAM 3';//CAM 3 - kontrola QR kÛdu DPS iba modely 4F a 5F//
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
		
            
			
            IF NOT SC_P1_Vytah.Switch1 AND NOT Kamery_PAUZA THEN
                CAM3.CMD.Triger:= TRUE;
                P1_Vytah.OUT.Banner_ModraLED_SB11:= TRUE;
                SC_P1_Vytah.IdleTime.IN:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
						
            IF CAM3.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM3.STAV.Results_READY:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 193;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM3.STAV.Results_READY:= FALSE;
                CAM3.CMD.Triger:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 191;
            ELSIF SC_P1_Vytah.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN    
                P1_Alarmy[167]:= TRUE;
                P1_PoruchaST1:= TRUE;       
            END_IF
		
                      
            
            
            
            
        191:
            SC_P1_Vytah.StepName:='191 - Automaticky Rezim - cakam na opatovny triger kamery CAM 3';
            SC_P1_Vytah.IdleTime.PT:= T#2s;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 190;
            END_IF
            
            
            
            
        193:
            SC_P1_Vytah.StepName:='193 - Automaticky Rezim - kontrola vysledku kamery CAM 3';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
            
            P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
			
            IF NOT CAM3.STAV.BUSY  THEN
                CAM3.CMD.Triger:= FALSE;
                IF CAM3.RESULT.Paletka.CitanieQRkodu_DPS_OK THEN
                    IF P1_Vytah.PAR.StaryQRkod_DPS_4F5F <> CAM3.RESULT.Paletka.PrecitanyQRkod_DPS THEN
                        Paletka[i].PAR.QRkodFiltra_4F5F:= CAM3.RESULT.Paletka.PrecitanyQRkod_DPS;
                        CAM3.PAR.ResultFotky:= 'PASS';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 195;
                    END_IF    
                ELSE
                    CAM3.PAR.ResultFotky:= 'FAIL';
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 195;
                END_IF
            END_IF
			
        195:
            SC_P1_Vytah.StepName:='195 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly CAM 3';
            SC_P1_Vytah.IdleTime.PT:= T#5s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
					
            IF CAM3.PAR.ResultFotky = 'PASS' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 300;
            ELSIF CAM3.PAR.ResultFotky = 'FAIL' THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 198;
            END_IF		
			
			
		
        198:
            SC_P1_Vytah.StepName:='198 - Automaticky Rezim - zobrazenie hlasenia neprecitany QR kod DPS';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL6_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
				
			
		
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                CAM3.STAV.Results_READY:= FALSE;
                P1_Vizu.ZobrazHL6_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 200;
            END_IF	
			
		
				
			
        200:
            SC_P1_Vytah.StepName:='200 - Automaticky Rezim - vymazanie adresara kamery, CAM4,CAM2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena  THEN
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN    
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
            
            
           			
				
			
        300:
            SC_P1_Vytah.StepName:='300 - Automaticky Rezim - vyziadanie stavu paletky zo servera'; 
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#50s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                TRCB_P1_Vytah_ST1.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF    
			
            IF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P1_Vytah_ST1.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 303;
            ELSIF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaError THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P1_Vytah_ST1.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 305;
            END_IF
            
		
		
        303:
            SC_P1_Vytah.StepName:='303 - Automaticky Rezim - kontrola odpovede servera'; 
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
	
            IF NOT TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    IF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST1' THEN
                        Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.RevorkovyKus:= FALSE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= '';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 308;
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'SMP;HV' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.TestovaciKus:= TRUE;
                        Paletka[i].PAR.CisloTestovacejStanice:= 'ST_7';
                        Paletka[i].PAR.RevorkovyKus:= FALSE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'SMP;FT1,FT2' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.TestovaciKus:= TRUE;
                        Paletka[i].PAR.CisloTestovacejStanice:= 'ST_FT1,FT2';
                        Paletka[i].PAR.RevorkovyKus:= FALSE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560; 
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'SMP;ST8A,ST8B' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.TestovaciKus:= TRUE;
                        Paletka[i].PAR.CisloTestovacejStanice:= 'ST_8A,8B';
                        Paletka[i].PAR.RevorkovyKus:= FALSE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;   
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'SMP;ST6' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.TestovaciKus:= TRUE;
                        Paletka[i].PAR.CisloTestovacejStanice:= 'ST_6';
                        Paletka[i].PAR.RevorkovyKus:= FALSE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;
                     ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST2' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_2';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;      
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST3' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_3';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;     
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST4' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_4';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;      
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST5' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_5';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;  
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST6' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_6';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;      
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST7' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_7';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;  
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;HV' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_7_HV';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;      
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST8A,ST8B' THEN  
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_8A,8B';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;FT1,FT2' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_FT1,FT2';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST9' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_9';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;
                    ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST10' THEN
                        Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                        Paletka[i].PAR.RevorkovyKus:= TRUE;
                        Paletka[i].PAR.CisloRevorkovejStanice:= 'ST_10';
                        Paletka[i].PAR.TestovaciKus:= FALSE;
                        Paletka[i].PAR.CisloTestovacejStanice:= '';
                        Paletka[i].PAR.StavPaletky:= 'OK';
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 560;      
                    ELSE 
                        SC_P1_Vytah.ResetStep:= TRUE;
                        SC_P1_Vytah.Step:= 555; 
                    END_IF   
                ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 305;
                END_IF	
            END_IF
	      
        
            
            
        305:
            SC_P1_Vytah.StepName:='305 - Automaticky Rezim - zobrazenie hlasenia nespravny QR kod Power CP';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL7_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
				
			
		
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                P1_Vizu.ZobrazHL7_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 306;
            END_IF		
		
        306:
            SC_P1_Vytah.StepName:='306 - Automaticky Rezim - vymazanie adresara kamery, CAM4, CAM2'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN    
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	    
            
            
            
		
        308:
            SC_P1_Vytah.StepName:='308 - Automaticky Rezim - kontrola typu modelu'; 
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
			
					
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS'; //DoËasne
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 310;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS'; //Docasne
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 310;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN	
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 540;
            END_IF	
			
			
        310:
            SC_P1_Vytah.StepName:='310 - Automaticky Rezim - priradenie QRkodu DPS'; 
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;	
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF SC_P1_Vytah.IdleTime.Q THEN
                TRCB_P1_Vytah_ST1.CMD.PriradQRkodFiltra_TYP3:= TRUE;
                SC_P1_Vytah.AlarmTime.IN:= TRUE;
            END_IF	
			
            IF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P1_Vytah_ST1.CMD.PriradQRkodFiltra_TYP3:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 313;
            ELSIF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaError THEN	
                P1_Alarmy[104]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
			
        313:
            SC_P1_Vytah.StepName:='313 - Automaticky Rezim - kontrola odpovede servera'; 
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
	
            IF NOT TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= TRUE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 540;
                ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 315;
                END_IF		
            END_IF
            
        315:
            SC_P1_Vytah.StepName:='315 - Automaticky Rezim - zobrazenie hlasenia nespravny QR kod DPS';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL8_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
				
			
		
            IF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                P1_Vizu.ZobrazHL8_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 318;
            END_IF		
				
			
        318:
            SC_P1_Vytah.StepName:='318 - Automaticky Rezim - vymazanie adresara kamery CAM 2, CAM4'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN    
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF	
            
            
            
            
            
            
			
			
				
            //Odoslanie fotiek na server//			
			
			
		
        540:
            SC_P1_Vytah.StepName:='540 - Automaticky Rezim - odoslanie fotky kontroly paletky a pinov na server Panasonic';//CAM 2 a CAM 4
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch2 THEN
                IF Linka.PAR.ZvolenyModel = '4F' OR Linka.PAR.ZvolenyModel = '5F' THEN
                    FTP_CAM2.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                    CisloFotky:= CisloFotky + 1;
                    FTP_CAM2.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                    FTP_CAM2.INPUTS.Result:= CAM2.PAR.ResultFotky;
                    Reports.Kamery.P1_CAM2_KontrolaPaletky:= CAM2.PAR.ResultFotky;
            
                    FTP_CAM4.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                    CisloFotky:= CisloFotky + 1;
                    FTP_CAM4.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                    FTP_CAM4.INPUTS.Result:= CAM4.PAR.ResultFotky;
                    Reports.Kamery.P1_CAM4_KontrolaPinovDPS:= CAM4.PAR.ResultFotky;
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    FTP_CAM2.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                    CisloFotky:= CisloFotky + 1;
                    FTP_CAM2.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                    FTP_CAM2.INPUTS.Result:= CAM2.PAR.ResultFotky;
                    Reports.Kamery.P1_CAM2_KontrolaPaletky:= CAM2.PAR.ResultFotky;
                END_IF     
                SC_P1_Vytah.Switch2:= TRUE;
            END_IF        
               
                       
            IF NOT SC_P1_Vytah.Switch1 AND Linka.PAR.ZvolenyModel = '4F' THEN
                FTP_CAM2.CMD.OdosliFotku:= TRUE;
                FTP_CAM4.CMD.OdosliFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            ELSIF NOT SC_P1_Vytah.Switch1 AND Linka.PAR.ZvolenyModel = '5F' THEN  
                FTP_CAM2.CMD.OdosliFotku:= TRUE;
                FTP_CAM4.CMD.OdosliFotku:= TRUE; 
                SC_P1_Vytah.Switch1:= TRUE; 
            ELSIF NOT SC_P1_Vytah.Switch1 AND Linka.PAR.ZvolenyModel = '5H' THEN 
                FTP_CAM2.CMD.OdosliFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                    FTP_CAM2.CMD.OdosliFotku:= FALSE;
                    FTP_CAM4.CMD.OdosliFotku:= FALSE;
                    Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                    P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 550;
                ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                    P1_Alarmy[106]:= TRUE;
                    P1_PoruchaST1:= TRUE;
                ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN
                    P1_Alarmy[108]:= TRUE;
                    P1_PoruchaST1:= TRUE;    
                END_IF
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN   
                IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                    FTP_CAM2.CMD.OdosliFotku:= FALSE;
                    FTP_CAM4.CMD.OdosliFotku:= FALSE;
                    Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                    P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 550;
                ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                    P1_Alarmy[106]:= TRUE;
                    P1_PoruchaST1:= TRUE;
                ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN
                    P1_Alarmy[108]:= TRUE;
                    P1_PoruchaST1:= TRUE;    
                END_IF
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN  
                IF FTP_CAM2.STATUS.KomunikaciaUkoncena THEN
                    FTP_CAM2.CMD.OdosliFotku:= FALSE;
                    Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                    P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 550;
                ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                    P1_Alarmy[106]:= TRUE;
                    P1_PoruchaST1:= TRUE;
                END_IF
            END_IF   
         
                       
            
         				
            //Odoslanie stavu paletky na server//			
		
        550:
            SC_P1_Vytah.StepName:='550 - Automaticky Rezim - odoslanie stavu paletky na server';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
            SC_P1_Vytah.IdleTime.IN:= TRUE;
			
           
            
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                TRCB_P1_Vytah_ST1.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF    
           	
			
            IF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                TRCB_P1_Vytah_ST1.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 553;
            ELSIF TRCB_P1_Vytah_ST1.STATUS.KomunikaciaError THEN	
                P1_Alarmy[104]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF
			
        553:
            SC_P1_Vytah.StepName:='553 - Automaticky Rezim - kontrola odpovede servera'; 
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#10s;
	
            IF NOT TRCB_P1_Vytah_ST1.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 560;
                ELSIF TRCB_P1_Vytah_ST1.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                    Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                    SC_P1_Vytah.ResetStep:= TRUE;
                    SC_P1_Vytah.Step:= 555;
                END_IF	
            END_IF
			
        555:
            SC_P1_Vytah.StepName:='555 - Automaticky Rezim - zobrazenie hlasenia komunikacia zo serverom neprebehla korektne';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Vytah.Switch1 THEN
                P1_Vizu.ZobrazHL9_ST1:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF
			
            P1_Vytah.OUT.Banner_CervenaLED_SB11:= Blikac500ms;
				
			
		
            IF P1_Vytah.KoniecCyklu THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 0;
            ELSIF P1_Vytah.IN.BannerNalozeniaPaletky_SB11 THEN
                P1_Vizu.ZobrazHL9_ST1:= FALSE;
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 558;
            END_IF	
			
        558:
            SC_P1_Vytah.StepName:='558 - Automaticky Rezim - vymazanie adresara kamery CAM 2, CAM4'; 
            SC_P1_Vytah.IdleTime.PT:= T#4s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;	
			
            P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= TRUE;
            
            Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
            
            IF NOT SC_P1_Vytah.Switch1 THEN
                FTP_CAM2.CMD.VymazFotku:= TRUE;
                FTP_CAM4.CMD.VymazFotku:= TRUE;
                SC_P1_Vytah.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM2.STATUS.KomunikaciaUkoncena AND FTP_CAM4.STATUS.KomunikaciaUkoncena THEN
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                FTP_CAM2.CMD.VymazFotku:= FALSE;
                FTP_CAM4.CMD.VymazFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 130;
            ELSIF FTP_CAM2.STATUS.KomunikaciaError THEN
                P1_Alarmy[106]:= TRUE;
                P1_PoruchaST1:= TRUE;
            ELSIF FTP_CAM4.STATUS.KomunikaciaError THEN    
                P1_Alarmy[108]:= TRUE;
                P1_PoruchaST1:= TRUE;
            END_IF		
			
			
			
			
		
			
			

            //Vyvezenie paletky//			
			
        560:
            SC_P1_Vytah.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper srobovania';
            SC_P1_Vytah.IdleTime.PT:= T#200ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
            P1_Vytah.OUT.Banner_ZelenaLED_SB11:= Blikac500ms;
            
            
            
            IF P1_Vytah.KoniecCyklu THEN
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 0;			
            ELSIF NOT P1_StoperSrobovania.IN.PritomnostPaletky_S16 AND SC_P1_StoperSrobovania.Step = 100 AND NOT TEST THEN
                TestovaciKus:= FALSE;
                P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= TRUE;
                Linka.TestovaciKus:= FALSE;
                Linka.Revork:= FALSE;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.QRkodFiltraPriradeny:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Reports.Kamery.P1_CAM2_KontrolaPaletky:= '';
                Reports.Kamery.P1_CAM4_KontrolaPinovDPS:= '';
                P1_Vytah.OUT.Banner_LED_OFF:= TRUE;
                Linka.PaletkaPrechadza:= FALSE;
                CisloFotky:= 0;
                P1_Vytah.PAR.StaryQRkod_DPS_4F5F:= Paletka[i].PAR.QRkodFiltra_4F5F;
                P1_Vytah.PAR.StaryQRkod_PowerCP:= Paletka[i].PAR.QRkodPowerCP;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 561;
            END_IF	
		
            
            
            
		
        561:
            SC_P1_Vytah.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper srobovania';
            SC_P1_Vytah.IdleTime.PT:= T#500ms;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
		
            SC_P1_Vytah.IdleTime.IN:= NOT P1_Vytah.IN.PritomnostPaletky_S19 AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12;
				
				
            IF EDGEPOS(P1_Vytah.IN.VystupDopravnikaVytahu_OS12) THEN
                SC_P1_Vytah.IdleTime.IN:= TRUE;
            END_IF    
			
            IF SC_P1_Vytah.IdleTime.Q AND NOT P1_Vytah.IN.VystupDopravnikaVytahu_OS12 AND NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN
                P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= FALSE;
                SC_P1_Vytah.ResetStep:= TRUE;
                SC_P1_Vytah.Step:= 100;
            END_IF		
		
       
	
			
	
	
            //*******************************************************Manu·lny reûim*******************************************************************************//
        700:
            SC_P1_Vytah.StepName:='700 - Manualny Rezim';
            SC_P1_Vytah.IdleTime.PT:= T#8s;
            SC_P1_Vytah.AlarmTime.PT:= T#5s;
				
						
            P1_Vytah.ServoZdvihuVytahu_M31.PAR.JoggAcceleration:= (P1_Vytah.PAR.ServoZdvihu_JoggRychlost * 10);
            P1_Vytah.ServoZdvihuVytahu_M31.PAR.JoggDeceleration:= (P1_Vytah.PAR.ServoZdvihu_JoggRychlost * 10);
            P1_Vytah.ServoZdvihuVytahu_M31.PAR.JoggVelocity:= P1_Vytah.PAR.ServoZdvihu_JoggRychlost;
            P1_Vytah.ServoZdvihuVytahu_M31.PAR.JoggPoziciaLimitVPRED:= P1_RemPremenne.P1_Vytah_PoziciaVykladania;
            P1_Vytah.ServoZdvihuVytahu_M31.PAR.JoggPoziciaLimitVZAD:= P1_RemPremenne.P1_Vytah_PoziciaNakladania;
            P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggLimit_ACTIVE:= TRUE;
			
        
            //Ovl·danie dopravnÌka v˝ùahu//
            IF P1_Vytah.RR_ChodDopravnika_VPRED THEN
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
                P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= TRUE;
            ELSIF P1_Vytah.RR_ChodDopravnika_VZAD THEN
                P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= FALSE;
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= TRUE; 
            ELSE
                P1_Vytah.OUT.Dopravnik_VYVAZANIE_M25:= FALSE;
                P1_Vytah.OUT.Dopravnik_NAVAZANIE_M25:= FALSE;
            END_IF    
        
        
	
    END_CASE
	 
                END_PROGRAM

PROGRAM _EXIT
                (* Insert code here *)
	 
                END_PROGRAM


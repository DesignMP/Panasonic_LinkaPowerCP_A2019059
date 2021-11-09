
PROGRAM _INIT
    P2_ZakladacTesnenia.PAR.ServoZdvihu_JoggRychlost:= 15;
    P2_ZakladacTesnenia.PAR.ServoPojazdu_JoggRychlost:= 15;
    
    
    //Zdvih - Z·pis do ParID serva - nastavenie max momentu v smere ot·Ëania a v protismere ot·Ëania//
//    Zdvih_NovaHodnotaMomentu_POS := 1.5; //v Nm
//    Zdvih_NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_1);
//    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
//    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[0].ParID      := 248;
//    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(Zdvih_NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[1].ParID      := 249;
//    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(Zdvih_NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_0();
    
    
    //Pojazd - Z·pis do ParID serva - nastavenie max momentu v smere ot·Ëania a v protismere ot·Ëania//
//    Pojazd_NovaHodnotaMomentu_POS := 1.5; //vNm
//    Pojazd_NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_1.Axis:= ADR(gAxis_2);
//    MC_BR_ProcessParID_AcpAx_1.DataAddress:= ADR(McAcpAxProcessParIDType_1);
//    MC_BR_ProcessParID_AcpAx_1.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_1.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_1[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_1[0].ParID      := 248;
//    McAcpAxProcessParIDType_1[0].VariableAddress    := ADR(Pojazd_NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_1[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_1[1].ParID      := 249;
//    McAcpAxProcessParIDType_1[1].VariableAddress    := ADR(Pojazd_NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_1.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_1();
    
    
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_ZakladacTesnenia);
	
    
    
    
    
    //Volanie podprogramov//
    OvlServaPojazdu;
    OvlServaZdvihu;
	
    //Priradenie indexu paletky//
    i:= P2_StoperZaklTesnenia.PAR.IndexPaletky;
	
	
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_P2_ZakladacTesnenia.Step:= 0;
    ELSIF NOT Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA THEN
        SC_P2_ZakladacTesnenia.Step:= 0;
    ELSIF NOT Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA THEN
        SC_P2_ZakladacTesnenia.Step:= 0;	
    ELSIF P2_ZakladacTesnenia.Reset THEN
        SC_P2_ZakladacTesnenia.Step:= 0;
        P2_ZakladacTesnenia.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serv//
    IF EDGEPOS(P2_PoruchaST1) THEN
        Zdvih_STOP:= TRUE;
        Pojazd_STOP:= TRUE;
    ELSIF EDGEPOS(P2_ZakladacTesnenia.Reset) THEN
        Zdvih_STOP:= TRUE;
        Pojazd_STOP:= TRUE;
    END_IF	
	
      
	
		
	
    CASE SC_P2_ZakladacTesnenia.Step OF 
		
        0:
            SC_P2_ZakladacTesnenia.StepName:='0 - Nulovanie';
            SC_OvlPojazdu.Step:= 0;
            SC_OvlZdvihu.Step:= 0;
            P2_ZakladacTesnenia.Automat:= FALSE;
            P2_ZakladacTesnenia.KoniecCyklu:= FALSE;
            P2_ZakladacTesnenia.Manual:= FALSE;
            P2_ZakladacTesnenia.STAV.PoINIT:= FALSE;
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
            P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
            P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta:= FALSE;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggLimit_ACTIVE:= FALSE;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= FALSE;
            PocetZatlaceniServom:= 0;
            Stav_ZvihPoINIT:= FALSE;
            Stav_PojazdPoINIT:= FALSE;
            PocetTrigrovKamery:= 0;
            
            
						
            IF Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA AND Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 AND P2_Pracovisko.STAV.ServaZakladaca_READY THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 1;
            END_IF
	
        1:
            SC_P2_ZakladacTesnenia.StepName:='1 - Cakam na spustenie vyroby';
            P2_ZakladacTesnenia.KoniecCyklu:= FALSE;
            IF P2_ZakladacTesnenia.Automat THEN
                SC_P2_ZakladacTesnenia.Step:= 2;
            ELSIF P2_ZakladacTesnenia.Manual THEN
                SC_P2_ZakladacTesnenia.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializ·cia****************************************************************************//	
		
        2:
            SC_P2_ZakladacTesnenia.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
									
            IF SC_P2_ZakladacTesnenia.IdleTime.Q THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 3;
            END_IF
	
        3:
            SC_P2_ZakladacTesnenia.StepName:='3 - Inicializacia - kontrola homingu serva zdvihu';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_HomingOK THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 8;
            ELSE
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 5;
            END_IF
		
        5:
            SC_P2_ZakladacTesnenia.StepName:='5 - Inicializacia - spustenie homingu serva zdvihu';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                Zdvih_HOME:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
		
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_HomingOK THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 8;
            END_IF	
		
            
        8:
            SC_P2_ZakladacTesnenia.StepName:='8 - Inicializacia - kontrola homingu serva pojazdu';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            IF P2_ZakladacTesnenia.STAV.ServoPojazdu_HomingOK THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 20;
            ELSE
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 10;
            END_IF     
            
        
        10:
            SC_P2_ZakladacTesnenia.StepName:='10 - Inicializacia - spustenie homingu serva pojazdu';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                Pojazd_HOME:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
		
            IF P2_ZakladacTesnenia.STAV.ServoPojazdu_HomingOK THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 20;
            END_IF	   
            
       
                      
		
        20:
            SC_P2_ZakladacTesnenia.StepName:='20 - Inicializacia - rozhodnutie o inicializacii';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#2s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;	
			
            IF NOT Stav_ZvihPoINIT AND Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 25;
            ELSIF NOT Stav_PojazdPoINIT THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 28;
            ELSIF Stav_ZvihPoINIT AND Stav_PojazdPoINIT THEN
                P2_ZakladacTesnenia.STAV.PoINIT:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 100;
            END_IF    
          			
            
        25:
            SC_P2_ZakladacTesnenia.StepName:='25 - Inicializacia - presun zdvihu do vychodiskovej pozicie automaticky';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia:= 0;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost; 
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia;
            
           	
				
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                Stav_ZvihPoINIT:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 20;
            END_IF
			
            	
			

		
        28:
            SC_P2_ZakladacTesnenia.StepName:='28 - Inicializacia - presun pojazdu do vychodiskovej pozicie';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE;
			
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggAcceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia*50;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggVelocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVPRED:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVZAD:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= TRUE;
			
            
            
            
									
            IF SC_P2_ZakladacTesnenia.IdleTime.Q AND SC_OvlPojazdu.Step = 1 THEN
                Pojazd_JoggVZAD:= TRUE;
            ELSIF NOT Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN	
                Pojazd_JoggVZAD:= FALSE;
            END_IF	
			
            IF P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia <= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia  THEN
                Pojazd_JoggVZAD:= FALSE;
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= FALSE;
                Stav_PojazdPoINIT:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 20;
            END_IF	
						
			            
            
            
	
            //********************************************************Automatick˝ reûim****************************************************************************//
				
        100:  
            SC_P2_ZakladacTesnenia.StepName:='100 - Automaticky Rezim - cakam na spustenie zakladania tesnenia';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;			
			
            IF P2_ZakladacTesnenia.KoniecCyklu AND NOT P2_StoperZaklTesnenia.Automat THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 0;
            ELSIF P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie AND Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 101;
            END_IF
			
			
        101:
            SC_P2_ZakladacTesnenia.StepName:='101 - Automaticky Rezim - vysuvam suflik k obsluhe';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;	
			
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*100;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia;
            P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia;
            
                      
			
			
            IF NOT SC_P2_ZakladacTesnenia.Switch2 AND Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY AND SC_OvlPojazdu.Step = 1 AND P2_ZakladacTesnenia.IN.Kopito_ZakladPoloha_IS7 THEN
                Pojazd_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch2:= TRUE;
            END_IF	
		
            IF P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 105;
            END_IF
			
            
			
			
			
		
        105:
            SC_P2_ZakladacTesnenia.StepName:='105 - Automaticky Rezim - cakam na zasunutie suflika pod pritlacanie';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#100ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            IF P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 THEN
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac200ms;
                P2_Vizu.ZobrazHL14_ST3:= FALSE;
            ELSE
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_Vizu.ZobrazHL14_ST3:= TRUE;
            END_IF
			
            SC_P2_ZakladacTesnenia.IdleTime.IN:= Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE AND P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6;
			
            IF SC_P2_ZakladacTesnenia.IdleTime.Q AND NOT P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG THEN
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_Vizu.ZobrazHL14_ST3:= FALSE;
                CAM1.STAV.Results_READY:= FALSE;
                IF Linka.PAR.ZvolenyModel = '5H' THEN
                    CAM7.STAV.Results_READY:= FALSE;
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 108;
                ELSE
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 120;
				END_IF	
			ELSIF P2_StoperZaklTesnenia.STAV.ObsluhaOznacilaPaletku_NG THEN
				P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
				P2_Vizu.ZobrazHL14_ST3:= FALSE;
				CAM1.STAV.Results_READY:= FALSE;
				SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
				SC_P2_ZakladacTesnenia.Step:= 180;
            END_IF
		
        108:
            SC_P2_ZakladacTesnenia.StepName:='108 - Automaticky Rezim - kamerova kontrola pritomnosti filtra 5H v drziaku filtra';//CAM 7 - iba model 5H//
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
				
            
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND CAM7.STAV.Command_READY THEN
                CAM7.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM7.STAV.Results_READY AND CAM7.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM7.STAV.Results_READY:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 110;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM7.STAV.Results_READY:= FALSE;
                CAM7.CMD.Triger:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 109;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND  PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[291]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF	
			
            
                    
            

        109:
            SC_P2_ZakladacTesnenia.StepName:='109 - Automaticky Rezim - cakam na opatovny triger kamery CAM7';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#1s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_ZakladacTesnenia.IdleTime.Q THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 108;
            END_IF
            
            
            
			
        110:
            SC_P2_ZakladacTesnenia.StepName:='110 - Automaticky Rezim - vysledok kamerovej kontroly filtra 5H';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
			
            
			
            IF NOT CAM7.STAV.BUSY THEN
                CAM7.CMD.Triger:= FALSE;
                IF CAM7.RESULT.CitanieQRkodu_Filtra5H_OK THEN
                    Paletka[i].PAR.QRkodFiltra_5H:= CAM7.RESULT.PrecitanyQRkod_Filtra5H;
                    CAM7.PAR.ResultFotky:= 'PASS';
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 115;
                ELSE
                    CAM7.PAR.ResultFotky:= 'FAIL';
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 115;
                END_IF
            END_IF
		
			
				
        115:
            SC_P2_ZakladacTesnenia.StepName:='115 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly filtra 5H';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
				
				
            IF CAM7.PAR.ResultFotky = 'PASS' THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 120;                
            ELSIF CAM7.PAR.ResultFotky = 'FAIL' THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 118;
            END_IF
			
	
        118:
            SC_P2_ZakladacTesnenia.StepName:='118 - Automaticky Rezim - zobrazenie hlasenia neprecitany QR kod filtra 5H';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN	
                P2_Vizu.ZobrazHL4_ST3:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
				
				
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
			
            IF EDGEPOS(Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE) THEN
                CAM7.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL4_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//	
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 105;
            END_IF
		
			
        120:
            SC_P2_ZakladacTesnenia.StepName:='120 - Automaticky Rezim - kontrola pritomnosti Power CP v zakladaci';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            IF P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 THEN
                CAM1.STAV.Results_READY:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 130;
            ELSE
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 123;
            END_IF	
			
        123:
            SC_P2_ZakladacTesnenia.StepName:='123 - Automaticky Rezim - zobrazenie hlasenia vloz Power CP';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;		
					
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN	
                P2_Vizu.ZobrazHL5_ST3:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
					
										
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
			
            IF EDGEPOS(Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE) THEN
                P2_Vizu.ZobrazHL5_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//	
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 105;
            END_IF
			
							
			
        130:
            SC_P2_ZakladacTesnenia.StepName:='130 - Automaticky Rezim - kamerova kontrola pritomnosti tesnenia na Power CP';//CAM 1//
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
			
            
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND CAM1.STAV.Command_READY THEN
                CAM1.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM1.STAV.Results_READY AND CAM1.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM1.STAV.Results_READY:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 133;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM1.STAV.Results_READY:= FALSE;
                CAM1.CMD.Triger:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 131;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND  PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[290]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF	
			
            
                       
            
            
        131:
            SC_P2_ZakladacTesnenia.StepName:='131 - Automaticky Rezim - cakam na opatovny triger kamery CAM1';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#1s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_ZakladacTesnenia.IdleTime.Q THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 130;
            END_IF
            
            
			
        133:
            SC_P2_ZakladacTesnenia.StepName:='133 - Automaticky Rezim - vysledok kamerovej kontroly pritomnosti tesnenia na Power CP';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
			
            
			
            IF NOT CAM1.STAV.BUSY THEN
                CAM1.CMD.Triger:= FALSE;
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF CAM1.RESULT.PritomnTesnenia_OK AND
                        CAM1.RESULT.PritomnPowerCP_4F THEN
                        CAM1.PAR.ResultFotky:= 'PASS';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135; 
                    ELSE
                        CAM1.PAR.ResultFotky:= 'FAIL';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135;
                    END_IF	
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF CAM1.RESULT.PritomnTesnenia_OK AND
                        CAM1.RESULT.PritomnPowerCP_5H5F THEN
                        CAM1.PAR.ResultFotky:= 'PASS';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135;   
                    ELSE
                        CAM1.PAR.ResultFotky:= 'FAIL';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF CAM1.RESULT.PritomnTesnenia_OK AND
                        CAM1.RESULT.PritomnPowerCP_5H5F THEN    
                        CAM1.PAR.ResultFotky:= 'PASS';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135;   
                    ELSE
                        CAM1.PAR.ResultFotky:= 'FAIL';
                        SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                        SC_P2_ZakladacTesnenia.Step:= 135;
                    END_IF
                END_IF	
            END_IF
		
	          
            
				
				
        135:
            SC_P2_ZakladacTesnenia.StepName:='135 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly '; 
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            IF CAM1.PAR.ResultFotky = 'PASS' THEN
                IF CAM1.RESULT.ZalozenieTesnenia_OK THEN
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 180;
                ELSIF NOT CAM1.RESULT.ZalozenieTesnenia_OK THEN
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 145;
                END_IF	
            ELSIF CAM1.PAR.ResultFotky = 'FAIL' THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 140;
            END_IF
			
		
        140:
            SC_P2_ZakladacTesnenia.StepName:='140 - Automaticky Rezim - zobrazenie hlasenia vloz tesnenie alebo Power CP';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
			
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN	
                IF Linka.PAR.ZvolenyModel = '4F' THEN
                    IF NOT CAM1.RESULT.PritomnTesnenia_OK THEN
                        P2_Vizu.ZobrazHL6_ST3:= TRUE;
                    ELSIF NOT CAM1.RESULT.PritomnPowerCP_4F THEN
                        P2_Vizu.ZobrazHL5_ST3:= TRUE;
                    END_IF
                ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                    IF NOT CAM1.RESULT.PritomnTesnenia_OK THEN
                        P2_Vizu.ZobrazHL6_ST3:= TRUE;
                    ELSIF NOT CAM1.RESULT.PritomnPowerCP_5H5F THEN
                        P2_Vizu.ZobrazHL5_ST3:= TRUE;
                    END_IF   
                ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                    IF NOT CAM1.RESULT.PritomnTesnenia_OK THEN
                        P2_Vizu.ZobrazHL6_ST3:= TRUE;
                    ELSIF NOT CAM1.RESULT.PritomnPowerCP_5H5F THEN
                        P2_Vizu.ZobrazHL5_ST3:= TRUE;
                    END_IF 
                END_IF    
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
				
				
							
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
			
            IF EDGEPOS(Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE) THEN
                CAM1.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL6_ST3:= FALSE;
                P2_Vizu.ZobrazHL5_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//	
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 145;
            END_IF
			
		
        145:
            SC_P2_ZakladacTesnenia.StepName:='145 - Automaticky Rezim - vymazanie fotky kamery CAM1';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                FTP_CAM1.CMD.VymazFotku:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM1.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM1.CMD.VymazFotku:= FALSE;
                IF CAM1.PAR.ResultFotky = 'PASS' THEN
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 150;
                ELSIF CAM1.PAR.ResultFotky = 'FAIL' THEN
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 105;
                END_IF
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF
            
            
          
			
			
					
        150:
            SC_P2_ZakladacTesnenia.StepName:='150 - Automaticky Rezim - presunutie suflika pod pritlacanie, cakam na stlacenie dvojrucneho ovladania';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;		
			
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
			
			
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggAcceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia * 10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia * 50;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggVelocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVPRED:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVZAD:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= TRUE;
			
             
                                  
                       
									
            IF Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE AND SC_OvlPojazdu.Step = 1 AND P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 AND P2_ZakladacTesnenia.IN.Kopito_ZakladPoloha_IS7 THEN
                Pojazd_JoggVZAD:= TRUE;
            ELSIF NOT Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                Pojazd_JoggVZAD:= FALSE;
            END_IF
			
            IF P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia = P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia THEN
                Pojazd_JoggVZAD:= FALSE;
                PocetZatlaceniServom:= 0;
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 153;
            END_IF	
	
        153:
            SC_P2_ZakladacTesnenia.StepName:='153 - Automaticky Rezim - kontrola bariery pred zostupom';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
				
            IF Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 155;
            END_IF
			
			
			
			
        155:
            SC_P2_ZakladacTesnenia.StepName:='155 - Automaticky Rezim - zostup zdvihu do pozicie pred pritlakom';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia:= 61;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost; 
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia;
            
            
            
				
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 160;
            END_IF
		
           
			
				
        158:
            SC_P2_ZakladacTesnenia.StepName:='158 - Automaticky Rezim - presun zdvihu do pozicie zatlacenia na moment';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Torque:= P2_RemPremenne.P2_ZaklTesnenia_MomentPritlaku;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.TorqueAcceleration:= 100;//100
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.TorqueVelocity := P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.TorqueRamp:= 30;//18
            
                  
            
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_PRITLAK:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 162;
            END_IF
		
            
			
		
        160:
            SC_P2_ZakladacTesnenia.StepName:='160 - Automaticky Rezim - presun zdvihu do pozicie zatlacenia na poziciu';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia:= 79.0;//78.4
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku; 
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia;
                        
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
                        
                     
           
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 162;
            END_IF
		
           
            
            
		
        162:
            SC_P2_ZakladacTesnenia.StepName:='162 - Automaticky Rezim - zdvih do pozicie pred pritlakom';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia:= 61;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlostPritlaku; 
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia;
            
            
            
				
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                PocetZatlaceniServom:= PocetZatlaceniServom + 1;
                IF PocetZatlaceniServom < 1 THEN         
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 160;
                ELSIF PocetZatlaceniServom < (P2_RemPremenne.P2_ZaklTesnenia_PocetZatlaceni + 1) THEN   
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 158;
                ELSE
                    PocetZatlaceniServom:= 0;
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 164;
                END_IF    
            END_IF
		
           
            
            
            
			
        164:
            SC_P2_ZakladacTesnenia.StepName:='164 - Automaticky Rezim - presun zdvihu do vychodiskovej pozicie ';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia:= 0;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost*10;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_Zdvih_Rychlost; 
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia;
            
            
            
				
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND SC_OvlZdvihu.Step = 1 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
				
            IF P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 166;
            END_IF	
			
			
		
			
			
			
        166:
            SC_P2_ZakladacTesnenia.StepName:='166 - Automaticky Rezim - vysunutie vozÌka';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#300ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;			
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Acceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Deceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.StopDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia*100;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Velocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlVysunutia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.Position:= P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia;
            
           
                       
            
			
            IF NOT SC_P2_ZakladacTesnenia.Switch2 AND Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY AND SC_OvlPojazdu.Step = 1 AND P2_ZakladacTesnenia.IN.Kopito_ZakladPoloha_IS7 THEN
                Pojazd_POLOHUJ:= TRUE;
                SC_P2_ZakladacTesnenia.Switch2:= TRUE;
            END_IF	
		
            IF P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta THEN
                P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta:= FALSE;
                CAM1.STAV.Results_READY:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 168;
            END_IF
        
	
			
			
        168:
            SC_P2_ZakladacTesnenia.StepName:='168 - Automaticky Rezim - kamerova kontrola zalozenia tesnenia na Power CP';//CAM 1//
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
            
			
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 AND CAM1.STAV.Command_READY THEN
                CAM1.CMD.Triger:= TRUE;
                P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= TRUE;
                SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
			
            IF CAM1.STAV.Results_READY AND CAM1.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM1.STAV.Results_READY:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 172;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM1.STAV.Results_READY:= FALSE;
                CAM1.CMD.Triger:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 170;
            ELSIF SC_P2_ZakladacTesnenia.IdleTime.Q AND  PocetTrigrovKamery >= 5 THEN
                P2_Alarmy[290]:= TRUE;
                P2_PoruchaST1:= TRUE;    
            END_IF	
		
            
             
            
            
            
        170:
            SC_P2_ZakladacTesnenia.StepName:='170 - Automaticky Rezim - cakam na opatovny triger kamery CAM1';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#1s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
            
            IF SC_P2_ZakladacTesnenia.IdleTime.Q THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 168;
            END_IF	
            
			
        172:
            SC_P2_ZakladacTesnenia.StepName:='172 - Automaticky Rezim - vysledok kamerovej kontroly zalozenia tesnenia na Power CP';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#500ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= TRUE;
			
            
			
            IF NOT CAM1.STAV.BUSY THEN
                CAM1.CMD.Triger:= FALSE;
                IF CAM1.RESULT.ZalozenieTesnenia_OK THEN
                    CAM1.PAR.ResultFotky:= 'PASS';
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 174;
                ELSE 
                    CAM1.PAR.ResultFotky:= 'FAIL';
                    SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                    SC_P2_ZakladacTesnenia.Step:= 174;        
                END_IF	
            END_IF
		
		
			
			
        174:
            SC_P2_ZakladacTesnenia.StepName:='174 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly spravnosti zalozenia tesnenia';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
				
				
            IF CAM1.PAR.ResultFotky = 'PASS' THEN
                P2_ZakladacTesnenia.STAV.VysledokZalozeniaTesnenia:= 'OK';
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 180;       
            ELSIF CAM1.PAR.ResultFotky = 'FAIL' THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 176;
            END_IF
		
                   
            
			
        176:
            SC_P2_ZakladacTesnenia.StepName:='176 - Automaticky Rezim - zobrazenie hlasenia zle zalozene tesnenie';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			
						
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                P2_Vizu.ZobrazHL7_ST3:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF
			
					
								
            P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= Blikac500ms;
			
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
			
            IF EDGEPOS(Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE) THEN
                CAM1.STAV.Results_READY:= FALSE;
                P2_Vizu.ZobrazHL7_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//	
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 178;
            ELSIF P2_ZaklTesn_KAM_Result_Ignoruj THEN
                CAM1.PAR.ResultFotky:= 'PASS';
                CAM1.STAV.Results_READY:= FALSE;
                P2_ZaklTesn_KAM_Result_Ignoruj:= FALSE;
                P2_Vizu.ZobrazHL7_ST3:= FALSE;
                P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= TRUE; //Zhasnem banner//	
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 180;
            END_IF
			
						
			
        178:
            SC_P2_ZakladacTesnenia.StepName:='178 - Automaticky Rezim - vymazanie fotky kamery CAM1';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
			            
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                FTP_CAM1.CMD.VymazFotku:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF FTP_CAM1.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM1.CMD.VymazFotku:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 105;
            ELSIF FTP_CAM1.STATUS.KomunikaciaError THEN
                P2_Alarmy[225]:= TRUE;
                P2_PoruchaST1:= TRUE;
            END_IF
			
				
		
			
									
        180:
            SC_P2_ZakladacTesnenia.StepName:='180 - Automaticky Rezim - vystavenie signalu tesnenie zalozene';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;	
			
            P2_Vizu.ZobrazHL8_ST3:= TRUE;
			
            IF NOT SC_P2_ZakladacTesnenia.Switch1 THEN
                P2_ZakladacTesnenia.OUT.KOM_ZalozenieTesneniaUkoncene:= TRUE;
                SC_P2_ZakladacTesnenia.Switch1:= TRUE;
            END_IF	
			
            IF NOT P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 THEN
                P2_Vizu.ZobrazHL8_ST3:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 181;
            END_IF 
           
			
        181:
            SC_P2_ZakladacTesnenia.StepName:='181 - Automaticky Rezim - cakanie na zrusenie signalu zaloz tesnenie';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#200ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;	
			
            IF NOT P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 185;
            END_IF
			
				
				
        185:
            SC_P2_ZakladacTesnenia.StepName:='185 - Automaticky Rezim - zasunutie suflika pod pritlacanie, cakanie na stlacenie dvojrucneho ovladania';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#100ms;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;	
		
            P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= Blikac500ms;
            SC_P2_ZakladacTesnenia.IdleTime.IN:= Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE;
			
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggAcceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia*10;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggDeceleration:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia*50;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggVelocity:= P2_RemPremenne.P2_ZaklTesnenia_RychlZasunutia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVPRED:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVZAD:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= TRUE;
			
                   
            
            
            
									
            IF SC_P2_ZakladacTesnenia.IdleTime.Q AND SC_OvlPojazdu.Step = 1 AND NOT P2_ZakladacTesnenia.IN.Vozik_Zaklad_PritomPowerCP_IOS6 AND P2_ZakladacTesnenia.IN.Kopito_ZakladPoloha_IS7 THEN
                Pojazd_JoggVZAD:= TRUE;
            ELSIF NOT Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                Pojazd_JoggVZAD:= FALSE;
            END_IF
			
            IF P2_ZakladacTesnenia.KoniecCyklu AND NOT P2_StoperZaklTesnenia.Automat THEN
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 0;
            ELSIF P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia = P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia  THEN
                Pojazd_JoggVZAD:= FALSE;
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 100;
            ELSIF P2_StoperZaklTesnenia.OUT.KOM_ZalozTesnenie THEN
                Pojazd_JoggVZAD:= FALSE;
                P2_ZakladacTesnenia.OUT.LED_DvojrucneOvladanie_H1:= FALSE;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= FALSE;
                SC_P2_ZakladacTesnenia.ResetStep:= TRUE;
                SC_P2_ZakladacTesnenia.Step:= 100;
            END_IF	
			
				
		
		
					
			
		
		
            //*******************************************************Manu·lny reûim*******************************************************************************//
        700:
            SC_P2_ZakladacTesnenia.StepName:='700 - Manualny Rezim';
            SC_P2_ZakladacTesnenia.IdleTime.PT:= T#8s;
            SC_P2_ZakladacTesnenia.AlarmTime.PT:= T#5s;
		
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.JoggAcceleration:= (P2_ZakladacTesnenia.PAR.ServoZdvihu_JoggRychlost * 10);
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.JoggDeceleration:= (P2_ZakladacTesnenia.PAR.ServoZdvihu_JoggRychlost * 10);
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.JoggVelocity:= P2_ZakladacTesnenia.PAR.ServoZdvihu_JoggRychlost;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.JoggPoziciaLimitVPRED:= 100.0;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggLimit_ACTIVE:= TRUE;	
		
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggAcceleration:= (P2_ZakladacTesnenia.PAR.ServoPojazdu_JoggRychlost * 10);
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggDeceleration:= (P2_ZakladacTesnenia.PAR.ServoPojazdu_JoggRychlost * 50);
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggVelocity:= P2_ZakladacTesnenia.PAR.ServoPojazdu_JoggRychlost;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVPRED:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozVkladania;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.JoggPoziciaLimitVZAD:= P2_RemPremenne.P2_ZaklTesn_Pojazd_PozZatlacenia;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggLimit_ACTIVE:= TRUE;
		
            
        
    END_CASE	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


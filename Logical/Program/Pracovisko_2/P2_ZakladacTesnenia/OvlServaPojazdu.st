
ACTION OvlServaPojazdu:
	
	//*************************Axis 2**************************************// 
	//Otáèka serva = 132 mm//
	//Motor má absolútny encodér//
	//Prevodovka input 10:1 output//
	
    
    //ENABLE knižnice//
    IF P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Communication_READY THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ENABLE:= TRUE;
    ELSE
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ENABLE:= FALSE;
    END_IF  
    
    
    //Zapnutie serva//
    CasPowerON_Pojazd.IN:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ReadyToPower_ON AND P2_ZakladacTesnenia.STAV.ServoPojazdu_LimitSnimace_BUSY AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.EnableSwitch_ACTIVE AND NOT P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR;
    IF CasPowerON_Pojazd.Q THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.POWER:= TRUE;
    ELSE	
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.POWER:= FALSE;
    END_IF	
	
	
    CasPowerON_Pojazd.PT:= T#1s;
    CasPowerON_Pojazd();
	
    //Vypnutie zmeny rýchlosti serva//
    IF P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.UpdatePAR_DONE THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= FALSE;
    END_IF    
    
	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ActualPosition;
    P2_ZakladacTesnenia.STAV.Pojazd_AktualnaRychlost:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ActualVelocity;
    P2_ZakladacTesnenia.STAV.Pojazd_AktualnyMoment:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ActualTorque;
    P2_ZakladacTesnenia.STAV.ServoPojazdu_HomingOK:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Homing_OK;
    P2_ZakladacTesnenia.STAV.ServoPojazdu_BUSY:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.MoveAbsolute_BUSY;
    P2_ZakladacTesnenia.STAV.Pojazd_JoggLimitDosiahnuty:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.JoggLimit_Dosiahnuty;
	
	
	
    //Zadané parametre serva//
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.Acceleration:= 50;
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.HomingVelocity:= 2;
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.StartVelocity:= 5;
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.HomeTorque:= 0.5;
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.Position:= 10988.7; //Offset homing pozície pre absolutny snímaè 
    P2_ZakladacTesnenia.ServoPojazduVozika_M5.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	
	
    //Zastavenie pohybu serva//
    IF Pojazd_STOP THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.STOP:= TRUE;
        SC_OvlPojazdu.Step:= 0;
        CasZastaveniaServa_2.IN:= TRUE;
        Pojazd_STOP:= FALSE;
    END_IF
	
    IF CasZastaveniaServa_2.Q THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.STOP:= FALSE;
        CasZastaveniaServa_2.IN:= FALSE;
    END_IF	
	
	
		
	
    CasZastaveniaServa_2.PT:= T#2s;
    CasZastaveniaServa_2();
	
	
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_OvlPojazdu);
	
    CASE SC_OvlPojazdu.Step OF
		
        0:
            SC_OvlPojazdu.StepName:= '0 - Nulovanie';
            Pojazd_JoggVPRED:= FALSE;
            Pojazd_JoggVZAD:= FALSE;
            Pojazd_POLOHUJ:= FALSE;
            Pojazd_HOME:= FALSE;
            Safety.IN.P2_ZaklTesnenia_Vysuvanie_BUSY:= FALSE;
            Safety.IN.P2_ZaklTesnenia_Zasuvanie_BUSY:= FALSE;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.HOME:= FALSE;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggVPRED:= FALSE;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggVZAD:= FALSE;
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.MoveAbsolute:= FALSE;
					
            IF SC_P2_ZakladacTesnenia.Step <> 0 AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Power_ON AND NOT P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR AND NOT P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.STOP_ACTIVE THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 1;
            END_IF	
	
	
        1:
            SC_OvlPojazdu.StepName:= '1 - Rozhodnutie o cinnosti';
            IF Pojazd_JoggVZAD THEN
                SC_OvlPojazdu.Step:= 10;
            ELSIF Pojazd_JoggVPRED THEN
                SC_OvlPojazdu.Step:= 20;
            ELSIF Pojazd_HOME THEN
                SC_OvlPojazdu.Step:= 30;
            ELSIF Pojazd_POLOHUJ THEN
                SC_OvlPojazdu.Step:= 40;
            ELSIF P2_ZakladacTesnenia.STAV.ServoPojazdu_HomingOK AND P2_ZakladacTesnenia.Manual AND Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                SC_OvlPojazdu.Step:= 50;	
            END_IF
	
	
        10:
            SC_OvlPojazdu.StepName:= '10 - Jogg VZAD';
            SC_OvlPojazdu.IdleTime.PT:= T#3s;
            SC_OvlPojazdu.AlarmTime.PT:= T#3s;
		
            Safety.IN.P2_ZaklTesnenia_Zasuvanie_BUSY:= TRUE;
			
            
            IF NOT SC_OvlPojazdu.Switch1 AND P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia > 50 THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRychlosti:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRampy:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= TRUE;
                SC_OvlPojazdu.Switch1:= TRUE;
            END_IF    
            
            IF NOT SC_OvlPojazdu.Switch2 AND P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia <= 50 THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRychlosti:= 0.3;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRampy:= 0.2;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= TRUE;
                SC_OvlPojazdu.Switch2:= TRUE;
            END_IF  
                        
            
            IF Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggVZAD:= TRUE;
            END_IF
			
            
            
            
            IF NOT Pojazd_JoggVZAD THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            ELSIF NOT Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            END_IF	
			
	     
			
        20:
            SC_OvlPojazdu.StepName:= '20 - Jogg VPRED';
            SC_OvlPojazdu.IdleTime.PT:= T#3s;
            SC_OvlPojazdu.AlarmTime.PT:= T#3s;
		
            Safety.IN.P2_ZaklTesnenia_Vysuvanie_BUSY:= TRUE;
			
            IF NOT SC_OvlPojazdu.Switch1 THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRychlosti:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRampy:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= TRUE;
                SC_OvlPojazdu.Switch1:= TRUE;
            END_IF   
            
            
            IF Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggVPRED:= TRUE;
            END_IF
			
            IF NOT Pojazd_JoggVPRED THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            END_IF	
		
		
        30:
            SC_OvlPojazdu.StepName:= '30 - Homing';
            SC_OvlPojazdu.IdleTime.PT:= T#500ms;
            SC_OvlPojazdu.AlarmTime.PT:= T#3s;
		
            IF NOT SC_OvlPojazdu.Switch1 THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRychlosti:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRampy:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= TRUE;
                SC_OvlPojazdu.Switch1:= TRUE;
            END_IF   
		
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.HOME:= TRUE;
            SC_OvlPojazdu.IdleTime.IN:= TRUE;
		
		
            IF P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Homing_OK AND SC_OvlPojazdu.IdleTime.Q THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            END_IF	
		
        40:
            SC_OvlPojazdu.StepName:= '40 - Polohovanie';
            SC_OvlPojazdu.IdleTime.PT:= T#500ms;
            SC_OvlPojazdu.AlarmTime.PT:= T#3s;
		
            ZadanaPoziciaUINT_Pojazd:= LREAL_TO_UINT(P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia);
            AktualnaPoziciaUINT_Pojazd:= LREAL_TO_UINT(P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia);
			
            IF NOT SC_OvlPojazdu.Switch1 THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRychlosti:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.PAR.ZmenaRampy:= 1.0;
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.UpdatePAR:= TRUE;
                SC_OvlPojazdu.Switch1:= TRUE;
            END_IF 
			
			
            
            IF P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia > P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia THEN
                Safety.IN.P2_ZaklTesnenia_Zasuvanie_BUSY:= TRUE;	
            ELSIF P2_ZakladacTesnenia.STAV.Pojazd_AktualnaPozicia < P2_ZakladacTesnenia.PAR.ServoPojazdu_ZadanaPozicia THEN	
                Safety.IN.P2_ZaklTesnenia_Vysuvanie_BUSY:= TRUE;
            END_IF	
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.MoveAbsolute:= TRUE;
           
			
            IF (AktualnaPoziciaUINT_Pojazd = ZadanaPoziciaUINT_Pojazd) AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.MoveAbsolute_DONE THEN
                P2_ZakladacTesnenia.STAV.ServoPojazdu_PoziciaDosiahnuta:= TRUE;
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            END_IF	
	
		
        50:
            SC_OvlPojazdu.StepName:= '50 - Jogg VZAD dvojrucnym ovladanim';
            SC_OvlPojazdu.IdleTime.PT:= T#3s;
            SC_OvlPojazdu.AlarmTime.PT:= T#3s;
		
            Safety.IN.P2_ZaklTesnenia_Zasuvanie_BUSY:= TRUE;
			
            IF NOT SC_OvlPojazdu.Switch1 AND Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.JoggVZAD:= TRUE;
                SC_OvlPojazdu.Switch1:= TRUE;
            END_IF
			
            IF NOT Safety.STAV.P2_DvojrucneOvladanie_AKTIVNE THEN
                SC_OvlPojazdu.ResetStep:= TRUE;
                SC_OvlPojazdu.Step:= 0;
            END_IF	
				
				
				
				
    END_CASE
	

	
END_ACTION

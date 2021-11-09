
ACTION OvlManipulatora_OsX: 
	
	//*****************************Axis 7************************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    //ENABLE knižnice//
    IF P1_Srobovanie.ServoManipulOsX_M20.STATUS.Communication_READY THEN
        P1_Srobovanie.ServoManipulOsX_M20.CMD.ENABLE:= TRUE;
    ELSE
        P1_Srobovanie.ServoManipulOsX_M20.CMD.ENABLE:= FALSE;
    END_IF   
    
    
    
	//Zapnutie serva//
	CasPowerON_OsX.IN:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.ReadyToPower_ON AND P1_Srobovanie.STAV.OsX_LimitSnimace_BUSY AND P1_Srobovanie.ServoManipulOsX_M20.STATUS.EnableSwitch_ACTIVE AND NOT P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR;
	IF CasPowerON_OsX.Q THEN
		P1_Srobovanie.ServoManipulOsX_M20.CMD.POWER:= TRUE;
	ELSE
		P1_Srobovanie.ServoManipulOsX_M20.CMD.POWER:= FALSE;
	END_IF	
	
	
	CasPowerON_OsX.PT:= T#1s;
	CasPowerON_OsX();
	
	

	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P1_Srobovanie.STAV.OsX_AktualnaPozicia:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition;
    P1_Srobovanie.STAV.OsX_AktualnaRychlost:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualVelocity;
	P1_Srobovanie.STAV.OsX_AktualnyMoment:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualTorque;
	P1_Srobovanie.STAV.OsX_HomingOK:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.Homing_OK;
	P1_Srobovanie.STAV.OsX_BUSY:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.MoveAbsolute_BUSY;
	P1_Srobovanie.STAV.OsX_JoggLimitDosiahnuty:= P1_Srobovanie.ServoManipulOsX_M20.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P1_Srobovanie.ServoManipulOsX_M20.HomePAR.Acceleration:= 50;
	P1_Srobovanie.ServoManipulOsX_M20.HomePAR.HomingVelocity:= 5;
	P1_Srobovanie.ServoManipulOsX_M20.HomePAR.StartVelocity:= 10;
	P1_Srobovanie.ServoManipulOsX_M20.HomePAR.Position:= -29045.2;    //Offset homing pozície pre absolutny snímaè
	P1_Srobovanie.ServoManipulOsX_M20.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P1_Srobovanie.ServoManipulOsX_M20.PAR.Acceleration:= P1_RemPremenne.P1_ManipSrob_OsX_Rychlost*10;
	P1_Srobovanie.ServoManipulOsX_M20.PAR.Deceleration:= P1_RemPremenne.P1_ManipSrob_OsX_Rychlost*10;
	P1_Srobovanie.ServoManipulOsX_M20.PAR.StopDeceleration:= P1_RemPremenne.P1_ManipSrob_OsX_Rychlost*10;
	P1_Srobovanie.ServoManipulOsX_M20.PAR.Velocity:= P1_RemPremenne.P1_ManipSrob_OsX_Rychlost; 
	P1_Srobovanie.ServoManipulOsX_M20.PAR.Position:= P1_Srobovanie.PAR.OsX_ZadanaPozicia;
	
	
	//Zastavenie pohybu serva//
	IF OsX_STOP THEN
		P1_Srobovanie.ServoManipulOsX_M20.CMD.STOP:= TRUE;
		SC_OvlManipulatora_OsX.Step:= 0;
		CasZastaveniaServa_2.IN:= TRUE;
		OsX_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa_2.Q  THEN
		P1_Srobovanie.ServoManipulOsX_M20.CMD.STOP:= FALSE;
		CasZastaveniaServa_2.IN:= FALSE;
	END_IF	
	
	
	CasZastaveniaServa_2.PT:= T#2s;
	CasZastaveniaServa_2();
	
	
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlManipulatora_OsX);
	
	CASE SC_OvlManipulatora_OsX.Step OF
		
		0:
			SC_OvlManipulatora_OsX.StepName:= '0 - Nulovanie';
			OsX_JoggVPRED:= FALSE;
			OsX_JoggVZAD:= FALSE;
			OsX_POLOHUJ:= FALSE;
			OsX_HOME:= FALSE;
			P1_Srobovanie.ServoManipulOsX_M20.CMD.HOME:= FALSE;
			P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggVPRED:= FALSE;
			P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggVZAD:= FALSE;
			P1_Srobovanie.ServoManipulOsX_M20.CMD.MoveAbsolute:= FALSE;
			
					
			IF SC_P1_Srobovanie.Step <> 0 AND P1_Srobovanie.ServoManipulOsX_M20.STATUS.Power_ON AND NOT P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR AND NOT P1_Srobovanie.ServoManipulOsX_M20.STATUS.STOP_ACTIVE THEN
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlManipulatora_OsX.StepName:= '1 - Rozhodnutie o cinnosti';
			IF OsX_JoggVPRED THEN
				SC_OvlManipulatora_OsX.Step:= 10;
			ELSIF OsX_JoggVZAD THEN
				SC_OvlManipulatora_OsX.Step:= 20;
			ELSIF OsX_HOME THEN
				SC_OvlManipulatora_OsX.Step:= 30;
			ELSIF OsX_POLOHUJ THEN
				SC_OvlManipulatora_OsX.Step:= 40;
			END_IF
	
	
		10:
			SC_OvlManipulatora_OsX.StepName:= '10 - Jogg VPRED';
			SC_OvlManipulatora_OsX.IdleTime.PT:= T#3s;
			SC_OvlManipulatora_OsX.AlarmTime.PT:= T#3s;
		
			
			
			IF NOT SC_OvlManipulatora_OsX.Switch1 THEN
				P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggVPRED:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
			
			IF NOT OsX_JoggVPRED THEN
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
			
			
			
		20:
			SC_OvlManipulatora_OsX.StepName:= '20 - Jogg VZAD';
			SC_OvlManipulatora_OsX.IdleTime.PT:= T#3s;
			SC_OvlManipulatora_OsX.AlarmTime.PT:= T#3s;
		
			
			
			
			IF NOT SC_OvlManipulatora_OsX.Switch1 THEN
				P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggVZAD:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
			
			IF NOT OsX_JoggVZAD THEN
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
		
		
		30:
			SC_OvlManipulatora_OsX.StepName:= '30 - Homing';
			SC_OvlManipulatora_OsX.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsX.AlarmTime.PT:= T#3s;
		
						
			IF NOT SC_OvlManipulatora_OsX.Switch1 THEN
				P1_Srobovanie.ServoManipulOsX_M20.CMD.HOME:= TRUE;
				SC_OvlManipulatora_OsX.IdleTime.IN:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
		
			IF P1_Srobovanie.ServoManipulOsX_M20.STATUS.Homing_OK AND SC_OvlManipulatora_OsX.IdleTime.Q THEN
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
		
		40:
			SC_OvlManipulatora_OsX.StepName:= '40 - Polohovanie';
			SC_OvlManipulatora_OsX.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsX.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_OsX:= LREAL_TO_UINT(P1_Srobovanie.PAR.OsX_ZadanaPozicia);
			AktualnaPoziciaUINT_OsX:= LREAL_TO_UINT(P1_Srobovanie.STAV.OsX_AktualnaPozicia);	
			
			
			IF NOT SC_OvlManipulatora_OsX.Switch1 THEN
				P1_Srobovanie.ServoManipulOsX_M20.CMD.MoveAbsolute:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
					
			
			
			
			IF (AktualnaPoziciaUINT_OsX = ZadanaPoziciaUINT_OsX) AND P1_Srobovanie.ServoManipulOsX_M20.STATUS.MoveAbsolute_DONE THEN
				P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= TRUE;
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
	
	END_CASE
	
	
	
END_ACTION

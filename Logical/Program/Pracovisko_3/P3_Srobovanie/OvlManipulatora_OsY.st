
ACTION OvlManipulatora_OsY: 

	//************************Axis 9*******************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    
    //ENABLE knižnice//
    IF P3_Srobovanie.ServoManipulOsY_M37.STATUS.Communication_READY THEN
        P3_Srobovanie.ServoManipulOsY_M37.CMD.ENABLE:= TRUE;
    ELSE
        P3_Srobovanie.ServoManipulOsY_M37.CMD.ENABLE:= FALSE;
    END_IF  
    
    
	//Zapnutie serva//
	CasPowerON_OsY.IN:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.ReadyToPower_ON AND P3_Srobovanie.STAV.OsY_LimitSnimace_BUSY AND P3_Srobovanie.ServoManipulOsY_M37.STATUS.EnableSwitch_ACTIVE AND NOT P3_Srobovanie.ServoManipulOsY_M37.STATUS.ERROR;
	IF CasPowerON_OsY.Q THEN
		P3_Srobovanie.ServoManipulOsY_M37.CMD.POWER:= TRUE;
	ELSE
		P3_Srobovanie.ServoManipulOsY_M37.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON_OsY.PT:= T#1s;
	CasPowerON_OsY();
	
	
	//Reset poruchy//
	IF P3_Srobovanie.ServoManipulOsY_M37.STATUS.ERROR AND P3_Srobovanie.ServoManipulOsY_M37.STATUS.ReadyToPower_ON THEN
		P3_Srobovanie.ServoManipulOsY_M37.CMD.ErrorRESET:= TRUE;
	ELSE
		P3_Srobovanie.ServoManipulOsY_M37.CMD.ErrorRESET:= FALSE;
	END_IF
	
	
	//Zobrazenie stavou a parametrov serva//
	P3_Srobovanie.STAV.OsY_AktualnaPozicia:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.ActualPosition;
	P3_Srobovanie.STAV.OsY_AktualnaRychlost:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.ActualVelocity;
	P3_Srobovanie.STAV.OsY_AktualnyMoment:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.ActualTorque;
	P3_Srobovanie.STAV.OsY_HomingOK:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.Homing_OK;
	P3_Srobovanie.STAV.OsY_BUSY:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.MoveAbsolute_BUSY;
	P3_Srobovanie.STAV.OsY_JoggLimitDosiahnuty:= P3_Srobovanie.ServoManipulOsY_M37.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P3_Srobovanie.ServoManipulOsY_M37.HomePAR.Acceleration:= 50;
	P3_Srobovanie.ServoManipulOsY_M37.HomePAR.HomingVelocity:= 2;
	P3_Srobovanie.ServoManipulOsY_M37.HomePAR.StartVelocity:= 5;
	P3_Srobovanie.ServoManipulOsY_M37.HomePAR.Position:= -22624.8;    //Offset homing pozície pre absolutny snímaè
	P3_Srobovanie.ServoManipulOsY_M37.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P3_Srobovanie.ServoManipulOsY_M37.PAR.Acceleration:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost*10;
	P3_Srobovanie.ServoManipulOsY_M37.PAR.Deceleration:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost*10;
	P3_Srobovanie.ServoManipulOsY_M37.PAR.StopDeceleration:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost*10;
	P3_Srobovanie.ServoManipulOsY_M37.PAR.Position:= P3_Srobovanie.PAR.OsY_ZadanaPozicia;
	
	
	//Zastavenie pohybu serva//
	IF OsY_STOP THEN
		P3_Srobovanie.ServoManipulOsY_M37.CMD.STOP:= TRUE;
		SC_OvlManipulatora_OsY.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		OsY_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P3_Srobovanie.ServoManipulOsY_M37.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
	
	
	
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlManipulatora_OsY);
	
	CASE SC_OvlManipulatora_OsY.Step OF
		
		0:
			SC_OvlManipulatora_OsY.StepName:= '0 - Nulovanie';
			OsY_JoggVPRED:= FALSE;
			OsY_JoggVZAD:= FALSE;
			OsY_POLOHUJ:= FALSE;
			OsY_HOME:= FALSE;
			P3_Srobovanie.ServoManipulOsY_M37.CMD.HOME:= FALSE;
			P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggVPRED:= FALSE;
			P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggVZAD:= FALSE;
			P3_Srobovanie.ServoManipulOsY_M37.CMD.MoveAbsolute:= FALSE;
			
					
			IF SC_P3_Srobovanie.Step <> 0 AND P3_Srobovanie.ServoManipulOsY_M37.STATUS.Power_ON AND NOT P3_Srobovanie.ServoManipulOsY_M37.STATUS.ERROR AND NOT P3_Srobovanie.ServoManipulOsY_M37.STATUS.STOP_ACTIVE THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlManipulatora_OsY.StepName:= '1 - Rozhodnutie o cinnosti';
			IF OsY_JoggVPRED THEN
				SC_OvlManipulatora_OsY.Step:= 10;
			ELSIF OsY_JoggVZAD THEN
				SC_OvlManipulatora_OsY.Step:= 20;
			ELSIF OsY_HOME THEN
				SC_OvlManipulatora_OsY.Step:= 30;
			ELSIF OsY_POLOHUJ THEN
				SC_OvlManipulatora_OsY.Step:= 40;
			END_IF
	
	
		10:
			SC_OvlManipulatora_OsY.StepName:= '10 - Jogg VPRED';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#3s;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
			
			
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggVPRED:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
			
			IF NOT OsY_JoggVPRED THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
			
			
			
		20:
			SC_OvlManipulatora_OsY.StepName:= '20 - Jogg VZAD';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#3s;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
			
			
			
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggVZAD:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
			
			IF NOT OsY_JoggVZAD THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
		
		
		30:
			SC_OvlManipulatora_OsY.StepName:= '30 - Homing';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
						
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P3_Srobovanie.ServoManipulOsY_M37.CMD.HOME:= TRUE;
				SC_OvlManipulatora_OsY.IdleTime.IN:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
		
			IF P3_Srobovanie.ServoManipulOsY_M37.STATUS.Homing_OK AND SC_OvlManipulatora_OsY.IdleTime.Q THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
		
		40:
			SC_OvlManipulatora_OsY.StepName:= '40 - Polohovanie';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_OsY:= LREAL_TO_UINT(P3_Srobovanie.PAR.OsY_ZadanaPozicia);
			AktualnaPoziciaUINT_OsY:= LREAL_TO_UINT(P3_Srobovanie.STAV.OsY_AktualnaPozicia);
			
								
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P3_Srobovanie.ServoManipulOsY_M37.CMD.MoveAbsolute:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT_OsY = ZadanaPoziciaUINT_OsY) AND P3_Srobovanie.ServoManipulOsY_M37.STATUS.MoveAbsolute_DONE THEN
				P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= TRUE;
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
	
	END_CASE
	
	
	
END_ACTION

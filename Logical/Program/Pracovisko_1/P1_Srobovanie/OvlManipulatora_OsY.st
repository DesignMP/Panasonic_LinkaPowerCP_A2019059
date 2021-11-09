
ACTION OvlManipulatora_OsY: 

	//************************Axis 8*******************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    //ENABLE knižnice//
    IF P1_Srobovanie.ServoManipulOsY_M19.STATUS.Communication_READY THEN
        P1_Srobovanie.ServoManipulOsY_M19.CMD.ENABLE:= TRUE;
    ELSE
        P1_Srobovanie.ServoManipulOsY_M19.CMD.ENABLE:= FALSE;
    END_IF  
    
    
	//Zapnutie serva//
	CasPowerON_OsY.IN:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.ReadyToPower_ON AND P1_Srobovanie.STAV.OsY_LimitSnimace_BUSY AND P1_Srobovanie.ServoManipulOsY_M19.STATUS.EnableSwitch_ACTIVE AND NOT P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR;
	IF CasPowerON_OsY.Q THEN
		P1_Srobovanie.ServoManipulOsY_M19.CMD.POWER:= TRUE;
	ELSE
		P1_Srobovanie.ServoManipulOsY_M19.CMD.POWER:= FALSE;
	END_IF	
	
	
	CasPowerON_OsY.PT:= T#1s;
	CasPowerON_OsY();
	

	
	
	
	//Zobrazenie stavou a parametrov serva//
	P1_Srobovanie.STAV.OsY_AktualnaPozicia:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.ActualPosition;
	P1_Srobovanie.STAV.OsY_AktualnaRychlost:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.ActualVelocity;
	P1_Srobovanie.STAV.OsY_AktualnyMoment:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.ActualTorque;
	P1_Srobovanie.STAV.OsY_HomingOK:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.Homing_OK;
	P1_Srobovanie.STAV.OsY_BUSY:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.MoveAbsolute_BUSY;
	P1_Srobovanie.STAV.OsY_JoggLimitDosiahnuty:= P1_Srobovanie.ServoManipulOsY_M19.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P1_Srobovanie.ServoManipulOsY_M19.HomePAR.Acceleration:= 50;
	P1_Srobovanie.ServoManipulOsY_M19.HomePAR.HomingVelocity:= 5;
	P1_Srobovanie.ServoManipulOsY_M19.HomePAR.StartVelocity:= 10;
	P1_Srobovanie.ServoManipulOsY_M19.HomePAR.Position:= -27941.0;    //Offset homing pozície pre absolutny snímaè
	P1_Srobovanie.ServoManipulOsY_M19.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P1_Srobovanie.ServoManipulOsY_M19.PAR.Acceleration:= P1_RemPremenne.P1_ManipSrob_OsY_Rychlost*10;
	P1_Srobovanie.ServoManipulOsY_M19.PAR.Deceleration:= P1_RemPremenne.P1_ManipSrob_OsY_Rychlost*10;
	P1_Srobovanie.ServoManipulOsY_M19.PAR.StopDeceleration:= P1_RemPremenne.P1_ManipSrob_OsY_Rychlost*10;
	P1_Srobovanie.ServoManipulOsY_M19.PAR.Velocity:= P1_RemPremenne.P1_ManipSrob_OsY_Rychlost; 
	P1_Srobovanie.ServoManipulOsY_M19.PAR.Position:= P1_Srobovanie.PAR.OsY_ZadanaPozicia;
	
	
	//Zastavenie pohybu serva//
	IF OsY_STOP THEN
		P1_Srobovanie.ServoManipulOsY_M19.CMD.STOP:= TRUE;
		SC_OvlManipulatora_OsY.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		OsY_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P1_Srobovanie.ServoManipulOsY_M19.CMD.STOP:= FALSE;
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
			P1_Srobovanie.ServoManipulOsY_M19.CMD.HOME:= FALSE;
			P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggVPRED:= FALSE;
			P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggVZAD:= FALSE;
			P1_Srobovanie.ServoManipulOsY_M19.CMD.MoveAbsolute:= FALSE;
			
					
			IF SC_P1_Srobovanie.Step <> 0 AND P1_Srobovanie.ServoManipulOsY_M19.STATUS.Power_ON AND NOT P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR AND NOT P1_Srobovanie.ServoManipulOsY_M19.STATUS.STOP_ACTIVE THEN
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
				P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggVPRED:= TRUE;
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
				P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggVZAD:= TRUE;
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
				P1_Srobovanie.ServoManipulOsY_M19.CMD.HOME:= TRUE;
				SC_OvlManipulatora_OsY.IdleTime.IN:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
		
			IF P1_Srobovanie.ServoManipulOsY_M19.STATUS.Homing_OK AND SC_OvlManipulatora_OsY.IdleTime.Q THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
		
		40:
			SC_OvlManipulatora_OsY.StepName:= '40 - Polohovanie';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_OsY:= LREAL_TO_UINT(P1_Srobovanie.PAR.OsY_ZadanaPozicia);
			AktualnaPoziciaUINT_OsY:= LREAL_TO_UINT(P1_Srobovanie.STAV.OsY_AktualnaPozicia);
			
			
						
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P1_Srobovanie.ServoManipulOsY_M19.CMD.MoveAbsolute:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT_OsY = ZadanaPoziciaUINT_OsY) AND P1_Srobovanie.ServoManipulOsY_M19.STATUS.MoveAbsolute_DONE THEN
				P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= TRUE;
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
	
	END_CASE
	
	
	
END_ACTION

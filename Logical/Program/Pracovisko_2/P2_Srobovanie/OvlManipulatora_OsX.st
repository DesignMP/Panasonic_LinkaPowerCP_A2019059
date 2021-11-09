
ACTION OvlManipulatora_OsX: 
	
	//*****************************Axis 3************************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    
    //ENABLE knižnice//
    IF P2_Srobovanie.ServoManipulOsX_M10.STATUS.Communication_READY THEN
        P2_Srobovanie.ServoManipulOsX_M10.CMD.ENABLE:= TRUE;
    ELSE
        P2_Srobovanie.ServoManipulOsX_M10.CMD.ENABLE:= FALSE;
    END_IF  
    
    
    
	//Zapnutie serva//
	CasPowerON_OsX.IN:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.ReadyToPower_ON AND P2_Srobovanie.STAV.OsX_LimitSnimace_BUSY AND P2_Srobovanie.ServoManipulOsX_M10.STATUS.EnableSwitch_ACTIVE AND NOT P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR;
	IF CasPowerON_OsX.Q THEN
		P2_Srobovanie.ServoManipulOsX_M10.CMD.POWER:= TRUE;
	ELSE
		P2_Srobovanie.ServoManipulOsX_M10.CMD.POWER:= FALSE;
	END_IF	
	
	
	CasPowerON_OsX.PT:= T#1s;
	CasPowerON_OsX();
	
	

	
	
    //Zobrazenie stavou a parametrov serva//
    P2_Srobovanie.STAV.OsX_AktualnaPozicia:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.ActualPosition;
    P2_Srobovanie.STAV.OsX_AktualnaRychlost:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.ActualVelocity;
	P2_Srobovanie.STAV.OsX_AktualnyMoment:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.ActualTorque;
	P2_Srobovanie.STAV.OsX_HomingOK:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.Homing_OK;
	P2_Srobovanie.STAV.OsX_BUSY:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.MoveAbsolute_BUSY;
	P2_Srobovanie.STAV.OsX_JoggLimitDosiahnuty:= P2_Srobovanie.ServoManipulOsX_M10.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P2_Srobovanie.ServoManipulOsX_M10.HomePAR.Acceleration:= 50;
	P2_Srobovanie.ServoManipulOsX_M10.HomePAR.HomingVelocity:= 2;
	P2_Srobovanie.ServoManipulOsX_M10.HomePAR.StartVelocity:= 5;
	P2_Srobovanie.ServoManipulOsX_M10.HomePAR.Position:= -21653.3;    //Offset homing pozície pre absolutny snímaè
	P2_Srobovanie.ServoManipulOsX_M10.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P2_Srobovanie.ServoManipulOsX_M10.PAR.Acceleration:= P2_RemPremenne.P2_ManipSrob_OsX_Rychlost*10;
	P2_Srobovanie.ServoManipulOsX_M10.PAR.Deceleration:= P2_RemPremenne.P2_ManipSrob_OsX_Rychlost*10;
	P2_Srobovanie.ServoManipulOsX_M10.PAR.StopDeceleration:= P2_RemPremenne.P2_ManipSrob_OsX_Rychlost*10;
	P2_Srobovanie.ServoManipulOsX_M10.PAR.Velocity:= P2_RemPremenne.P2_ManipSrob_OsX_Rychlost; 
	P2_Srobovanie.ServoManipulOsX_M10.PAR.Position:= P2_Srobovanie.PAR.OsX_ZadanaPozicia;
	
	
	//Zastavenie pohybu serva//
	IF OsX_STOP THEN
		P2_Srobovanie.ServoManipulOsX_M10.CMD.STOP:= TRUE;
		SC_OvlManipulatora_OsX.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		OsX_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P2_Srobovanie.ServoManipulOsX_M10.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
	
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlManipulatora_OsX);
	
	CASE SC_OvlManipulatora_OsX.Step OF
		
		0:
			SC_OvlManipulatora_OsX.StepName:= '0 - Nulovanie';
			OsX_JoggVPRED:= FALSE;
			OsX_JoggVZAD:= FALSE;
			OsX_POLOHUJ:= FALSE;
			OsX_HOME:= FALSE;
			P2_Srobovanie.ServoManipulOsX_M10.CMD.HOME:= FALSE;
			P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggVPRED:= FALSE;
			P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggVZAD:= FALSE;
			P2_Srobovanie.ServoManipulOsX_M10.CMD.MoveAbsolute:= FALSE;
			
					
			IF SC_P2_Srobovanie.Step <> 0 AND P2_Srobovanie.ServoManipulOsX_M10.STATUS.Power_ON AND NOT P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR AND NOT P2_Srobovanie.ServoManipulOsX_M10.STATUS.STOP_ACTIVE THEN
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
				P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggVPRED:= TRUE;
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
				P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggVZAD:= TRUE;
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
				P2_Srobovanie.ServoManipulOsX_M10.CMD.HOME:= TRUE;
				SC_OvlManipulatora_OsX.IdleTime.IN:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
		
			IF P2_Srobovanie.ServoManipulOsX_M10.STATUS.Homing_OK AND SC_OvlManipulatora_OsX.IdleTime.Q THEN
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
		
		40:
			SC_OvlManipulatora_OsX.StepName:= '40 - Polohovanie';
			SC_OvlManipulatora_OsX.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsX.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_OsX:= LREAL_TO_UINT(P2_Srobovanie.PAR.OsX_ZadanaPozicia);
			AktualnaPoziciaUINT_OsX:= LREAL_TO_UINT(P2_Srobovanie.STAV.OsX_AktualnaPozicia);
			
			IF NOT SC_OvlManipulatora_OsX.Switch1 THEN
				P2_Srobovanie.ServoManipulOsX_M10.CMD.MoveAbsolute:= TRUE;
				SC_OvlManipulatora_OsX.Switch1:= TRUE;
			END_IF
			
			
			
			IF (AktualnaPoziciaUINT_OsX = ZadanaPoziciaUINT_OsX) AND P2_Srobovanie.ServoManipulOsX_M10.STATUS.MoveAbsolute_DONE THEN
				P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= TRUE;
				SC_OvlManipulatora_OsX.ResetStep:= TRUE;
				SC_OvlManipulatora_OsX.Step:= 0;
			END_IF	
	
	END_CASE
	
	
	
END_ACTION

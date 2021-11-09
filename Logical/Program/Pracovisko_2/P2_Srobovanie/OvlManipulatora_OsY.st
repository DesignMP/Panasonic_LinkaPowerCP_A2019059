
ACTION OvlManipulatora_OsY: 

	//************************Axis 4*******************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    
    //ENABLE knižnice//
    IF P2_Srobovanie.ServoManipulOsY_M9.STATUS.Communication_READY THEN
        P2_Srobovanie.ServoManipulOsY_M9.CMD.ENABLE:= TRUE;
    ELSE
        P2_Srobovanie.ServoManipulOsY_M9.CMD.ENABLE:= FALSE;
    END_IF  
    
    
	//Zapnutie serva//
	CasPowerON_OsY.IN:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.ReadyToPower_ON AND P2_Srobovanie.STAV.OsY_LimitSnimace_BUSY AND P2_Srobovanie.ServoManipulOsY_M9.STATUS.EnableSwitch_ACTIVE AND NOT P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR;
	IF CasPowerON_OsY.Q THEN
		P2_Srobovanie.ServoManipulOsY_M9.CMD.POWER:= TRUE;
	ELSE
		P2_Srobovanie.ServoManipulOsY_M9.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON_OsY.PT:= T#1s;
	CasPowerON_OsY();
	
	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P2_Srobovanie.STAV.OsY_AktualnaPozicia:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.ActualPosition;
    P2_Srobovanie.STAV.OsY_AktualnaRychlost:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.ActualVelocity;
	P2_Srobovanie.STAV.OsY_AktualnyMoment:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.ActualTorque;
	P2_Srobovanie.STAV.OsY_HomingOK:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.Homing_OK;
	P2_Srobovanie.STAV.OsY_BUSY:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.MoveAbsolute_BUSY;
	P2_Srobovanie.STAV.OsY_JoggLimitDosiahnuty:= P2_Srobovanie.ServoManipulOsY_M9.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P2_Srobovanie.ServoManipulOsY_M9.HomePAR.Acceleration:= 50;
	P2_Srobovanie.ServoManipulOsY_M9.HomePAR.HomingVelocity:= 2;
	P2_Srobovanie.ServoManipulOsY_M9.HomePAR.StartVelocity:= 5;
	P2_Srobovanie.ServoManipulOsY_M9.HomePAR.Position:= -22260.4;    //Offset homing pozície pre absolutny snímaè
	P2_Srobovanie.ServoManipulOsY_M9.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P2_Srobovanie.ServoManipulOsY_M9.PAR.Acceleration:= P2_RemPremenne.P2_ManipSrob_OsY_Rychlost*10;
	P2_Srobovanie.ServoManipulOsY_M9.PAR.Deceleration:= P2_RemPremenne.P2_ManipSrob_OsY_Rychlost*10;
	P2_Srobovanie.ServoManipulOsY_M9.PAR.StopDeceleration:= P2_RemPremenne.P2_ManipSrob_OsY_Rychlost*10;
	P2_Srobovanie.ServoManipulOsY_M9.PAR.Velocity:= P2_RemPremenne.P2_ManipSrob_OsY_Rychlost; 
	P2_Srobovanie.ServoManipulOsY_M9.PAR.Position:= P2_Srobovanie.PAR.OsY_ZadanaPozicia;
	
	
	//Zastavenie pohybu serva//
	IF OsY_STOP THEN
		P2_Srobovanie.ServoManipulOsY_M9.CMD.STOP:= TRUE;
		SC_OvlManipulatora_OsY.Step:= 0;
		CasZastaveniaServa_2.IN:= TRUE;
		OsY_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa_2.Q THEN
		P2_Srobovanie.ServoManipulOsY_M9.CMD.STOP:= FALSE;
		CasZastaveniaServa_2.IN:= FALSE;
	END_IF	
	

		
	
	CasZastaveniaServa_2.PT:= T#2s;
	CasZastaveniaServa_2();
	
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlManipulatora_OsY);
	
	CASE SC_OvlManipulatora_OsY.Step OF
		
		0:
			SC_OvlManipulatora_OsY.StepName:= '0 - Nulovanie';
			OsY_JoggVPRED:= FALSE;
			OsY_JoggVZAD:= FALSE;
			OsY_POLOHUJ:= FALSE;
			OsY_HOME:= FALSE;
			P2_Srobovanie.ServoManipulOsY_M9.CMD.HOME:= FALSE;
			P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggVPRED:= FALSE;
			P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggVZAD:= FALSE;
			P2_Srobovanie.ServoManipulOsY_M9.CMD.MoveAbsolute:= FALSE;
			
					
			IF SC_P2_Srobovanie.Step <> 0 AND P2_Srobovanie.ServoManipulOsY_M9.STATUS.Power_ON AND NOT P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR AND NOT P2_Srobovanie.ServoManipulOsY_M9.STATUS.STOP_ACTIVE THEN
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
				P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggVPRED:= TRUE;
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
				P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggVZAD:= TRUE;
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
				P2_Srobovanie.ServoManipulOsY_M9.CMD.HOME:= TRUE;
				SC_OvlManipulatora_OsY.IdleTime.IN:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
		
			IF P2_Srobovanie.ServoManipulOsY_M9.STATUS.Homing_OK AND SC_OvlManipulatora_OsY.IdleTime.Q THEN
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
		
		40:
			SC_OvlManipulatora_OsY.StepName:= '40 - Polohovanie';
			SC_OvlManipulatora_OsY.IdleTime.PT:= T#500ms;
			SC_OvlManipulatora_OsY.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_OsY:= LREAL_TO_UINT(P2_Srobovanie.PAR.OsY_ZadanaPozicia);
			AktualnaPoziciaUINT_OsY:= LREAL_TO_UINT(P2_Srobovanie.STAV.OsY_AktualnaPozicia);
			
								
			IF NOT SC_OvlManipulatora_OsY.Switch1 THEN
				P2_Srobovanie.ServoManipulOsY_M9.CMD.MoveAbsolute:= TRUE;
				SC_OvlManipulatora_OsY.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT_OsY = ZadanaPoziciaUINT_OsY) AND P2_Srobovanie.ServoManipulOsY_M9.STATUS.MoveAbsolute_DONE THEN
				P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= TRUE;
				SC_OvlManipulatora_OsY.ResetStep:= TRUE;
				SC_OvlManipulatora_OsY.Step:= 0;
			END_IF	
	
	END_CASE
	
	
	
END_ACTION

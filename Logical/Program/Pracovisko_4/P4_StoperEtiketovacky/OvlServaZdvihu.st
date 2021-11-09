
ACTION OvlServaZdvihu: 

	//**************************Axis 11***********************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér a brzdu//
	
    //ENABLE knižnice//
    IF P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Communication_READY THEN
        P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.ENABLE:= TRUE;
    ELSE
        P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.ENABLE:= FALSE;
    END_IF  
    
    
	//Zapnutie serva//
	CasPowerON.IN:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ReadyToPower_ON AND P4_Etiketovacka.STAV.ServoZvihu_LimitSnimace_BUSY AND P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.EnableSwitch_ACTIVE AND NOT P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ERROR;
	IF CasPowerON.Q THEN
		P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.POWER:= TRUE;
	ELSE
		P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON.PT:= T#1s;
	CasPowerON();
	
	
	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P4_Etiketovacka.STAV.Zdvih_AktualnaPozicia:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ActualPosition;
	P4_Etiketovacka.STAV.Zdvih_AktualnaRychlost:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ActualVelocity;
	P4_Etiketovacka.STAV.Zdvih_AktualnyMoment:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ActualTorque;
	P4_Etiketovacka.STAV.ServoZdvihu_HomingOK:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Homing_OK;
	P4_Etiketovacka.STAV.ServoZdvihu_BUSY:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.MoveAbsolute_BUSY;
	P4_Etiketovacka.STAV.Zdvih_JoggLimitDosiahnuty:= P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.HomePAR.Acceleration:= 100;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.HomePAR.HomingVelocity:= 5;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.HomePAR.StartVelocity:= 10;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.HomePAR.Position:= -21423.0;    //Offset homing pozície pre absolutny snímaè
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.Acceleration:= P34_RemPremenne.P4_ZdvihEtiketovacky_Rychlost*10;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.Deceleration:= P34_RemPremenne.P4_ZdvihEtiketovacky_Rychlost*10;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.StopDeceleration:= P34_RemPremenne.P4_ZdvihEtiketovacky_Rychlost*10;
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.Velocity:= P34_RemPremenne.P4_ZdvihEtiketovacky_Rychlost; 
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.Position:= P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia;
	
		
	
	//Zastavenie pohybu serva//
	IF Zdvih_STOP THEN
		P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.STOP:= TRUE;
		SC_OvlZdvihu.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		Zdvih_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
	
		
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlZdvihu);
	
	CASE SC_OvlZdvihu.Step OF
		
		0:
			SC_OvlZdvihu.StepName:= '0 - Nulovanie';
			Zdvih_JoggHORE:= FALSE;
			Zdvih_JoggDOLE:= FALSE;
			Zdvih_POLOHUJ:= FALSE;
			Zdvih_HOME:= FALSE;
			P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.HOME:= FALSE;
			P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggVPRED:= FALSE;
			P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggVZAD:= FALSE;
			P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.MoveAbsolute:= FALSE;
			P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.MoveTorque:= FALSE;
			
					
			IF SC_P4_Etiketovacka.Step <> 0 AND P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Power_ON AND NOT P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ERROR AND NOT P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.STOP_ACTIVE THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlZdvihu.StepName:= '1 - Rozhodnutie o cinnosti';
			IF Zdvih_JoggHORE THEN
				SC_OvlZdvihu.Step:= 10;
			ELSIF Zdvih_JoggDOLE THEN
				SC_OvlZdvihu.Step:= 20;
			ELSIF Zdvih_HOME THEN
				SC_OvlZdvihu.Step:= 30;
			ELSIF Zdvih_POLOHUJ THEN
				SC_OvlZdvihu.Step:= 40;
			END_IF
	
	
		10:
			SC_OvlZdvihu.StepName:= '10 - Jogg HORE';
			SC_OvlZdvihu.IdleTime.PT:= T#3s;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggVZAD:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF NOT Zdvih_JoggHORE THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
			
			
			
		20:
			SC_OvlZdvihu.StepName:= '20 - Jogg DOLE';
			SC_OvlZdvihu.IdleTime.PT:= T#3s;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
						
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggVPRED:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF NOT Zdvih_JoggDOLE THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		
		30:
			SC_OvlZdvihu.StepName:= '30 - Homing';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
						
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.HOME:= TRUE;
				SC_OvlZdvihu.IdleTime.IN:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			IF P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Homing_OK AND SC_OvlZdvihu.IdleTime.Q THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		40:
			SC_OvlZdvihu.StepName:= '40 - Polohovanie';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT:= LREAL_TO_UINT(P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia);
			AktualnaPoziciaUINT:= LREAL_TO_UINT(P4_Etiketovacka.STAV.Zdvih_AktualnaPozicia);		
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.MoveAbsolute:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT = ZadanaPoziciaUINT) AND P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.MoveAbsolute_DONE THEN
				P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
	
			
		
	END_CASE
	
	
	
	
	
END_ACTION

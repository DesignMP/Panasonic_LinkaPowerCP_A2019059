
ACTION OvlServaZdvihu: 
	
	//********************Axis 1*******************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér//
	
    //ENABLE knižnice//
    IF P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Communication_READY THEN
        P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ENABLE:= TRUE;
    ELSE
        P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ENABLE:= FALSE;
    END_IF  
    
    
	//Zapnutie serva//
	CasPowerON_Zdvih.IN:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ReadyToPower_ON AND P2_ZakladacTesnenia.STAV.ServoZvihu_LimitSnimace_BUSY AND P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.EnableSwitch_ACTIVE AND NOT P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR; 
	IF CasPowerON_Zdvih.Q THEN
		P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.POWER:= TRUE;
	ELSE
		P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.POWER:= FALSE;
	END_IF
	
	CasPowerON_Zdvih.PT:= T#1s;
	CasPowerON_Zdvih();
	

	
	
	
    //Zobrazenie stavou a parametrov serva//
    P2_ZakladacTesnenia.STAV.Zdvih_AktualnaPozicia:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ActualPosition;
	P2_ZakladacTesnenia.STAV.Zdvih_AktualnaRychlost:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ActualVelocity;
	P2_ZakladacTesnenia.STAV.Zdvih_AktualnyMoment:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ActualTorque;
	P2_ZakladacTesnenia.STAV.ServoZdvihu_HomingOK:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Homing_OK;
	P2_ZakladacTesnenia.STAV.ServoZdvihu_BUSY:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.MoveAbsolute_BUSY;
	P2_ZakladacTesnenia.STAV.Zdvih_JoggLimitDosiahnuty:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.HomePAR.Acceleration:= 100;
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.HomePAR.HomingVelocity:= 5;
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.HomePAR.StartVelocity:= 10;
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.HomePAR.Position:= -15451.3;    //Offset homing pozície pre absolutny snímaè
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	
	
    
	
	
	
	
	
	//Zastavenie pohybu serva//
	IF Zdvih_STOP THEN
		P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.STOP:= TRUE;
		SC_OvlZdvihu.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		Zdvih_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.STOP:= FALSE;
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
			Zdvih_PRITLAK:= FALSE;
			P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.HOME:= FALSE;
			P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggVPRED:= FALSE;
			P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggVZAD:= FALSE;
			P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.MoveAbsolute:= FALSE;
			P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.MoveTorque:= FALSE;
			Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= FALSE;
			MomentDosiahnuty:= FALSE;
			
			IF SC_P2_ZakladacTesnenia.Step <> 0 AND P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Power_ON AND NOT P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR AND NOT P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.STOP_ACTIVE THEN
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
			ELSIF Zdvih_PRITLAK THEN
				SC_OvlZdvihu.Step:= 50;
			END_IF
	
	
		10:
			SC_OvlZdvihu.StepName:= '10 - Jogg HORE';
			SC_OvlZdvihu.IdleTime.PT:= T#3s;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= TRUE;
			
			IF NOT SC_OvlZdvihu.Switch1 AND Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
				P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggVZAD:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF NOT Zdvih_JoggHORE THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
			
			
			
		20:
			SC_OvlZdvihu.StepName:= '20 - Jogg DOLE';
			SC_OvlZdvihu.IdleTime.PT:= T#3s;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= TRUE;
			
			
			IF NOT SC_OvlZdvihu.Switch1 AND Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
				P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.JoggVPRED:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF NOT Zdvih_JoggDOLE THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		
		30:
			SC_OvlZdvihu.StepName:= '30 - Homing';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			(*Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= TRUE;*)
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.HOME:= TRUE;
				SC_OvlZdvihu.IdleTime.IN:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			IF P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Homing_OK AND SC_OvlZdvihu.IdleTime.Q THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		40:
			SC_OvlZdvihu.StepName:= '40 - Polohovanie';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT_Zdvih:= LREAL_TO_UINT(P2_ZakladacTesnenia.PAR.ServoZdvihu_ZadanaPozicia);
			AktualnaPoziciaUINT_Zdvih:= LREAL_TO_UINT(P2_ZakladacTesnenia.STAV.Zdvih_AktualnaPozicia);
			
			
			Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= TRUE;
			
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.MoveAbsolute:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT_Zdvih = ZadanaPoziciaUINT_Zdvih) AND P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.MoveAbsolute_DONE THEN
				P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
	
			
		50:
			SC_OvlZdvihu.StepName:= '50 - Pritlacenie';
			SC_OvlZdvihu.IdleTime.PT:= T#200ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			SC_OvlZdvihu.IdleTime.IN:= MomentDosiahnuty;
			
            Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY:= TRUE;
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.MoveTorque:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			
			IF P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ActualTorque >= (P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.PAR.Torque - 1) THEN
				MomentDosiahnuty:= TRUE;
			END_IF	
			
			
			
			IF SC_OvlZdvihu.IdleTime.Q THEN
				P2_ZakladacTesnenia.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		
		
		
		
		
	END_CASE
	
	
	
END_ACTION

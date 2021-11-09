
ACTION OvlServaZdvihu: 

	
	//**************************Axis 10***********************************//
	//Ot·Ëka serva = 5mm//
	//Motor m· klasick˝ encodÈr a brzdu//
	
    
    //ENABLE kniûnice//
    IF P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Communication_READY THEN
        P4_Vytah.ServoZdvihuVytahu_M26.CMD.ENABLE:= TRUE;
    ELSE
        P4_Vytah.ServoZdvihuVytahu_M26.CMD.ENABLE:= FALSE;
    END_IF  
    
    
    
	//Zapnutie serva//
	
    CasPowerON.IN:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ReadyToPower_ON AND P4_Vytah.STAV.ServoZvihu_LimitSnimace_BUSY AND P4_Vytah.ServoZdvihuVytahu_M26.STATUS.EnableSwitch_ACTIVE AND NOT P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ERROR;
    IF CasPowerON.Q THEN
		P4_Vytah.ServoZdvihuVytahu_M26.CMD.POWER:= TRUE;
	ELSE
		P4_Vytah.ServoZdvihuVytahu_M26.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON.PT:= T#1s;
	CasPowerON();
	
	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P4_Vytah.STAV.Zdvih_AktualnaPozicia:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ActualPosition;
    P4_Vytah.STAV.Zdvih_AktualnaRychlost:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ActualVelocity;
    P4_Vytah.STAV.ServoZdvihu_HomingOK:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Homing_OK;
    P4_Vytah.STAV.ServoZdvihu_BUSY:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.MoveAbsolute_BUSY;
    P4_Vytah.STAV.Zdvih_JoggLimitDosiahnuty:= P4_Vytah.ServoZdvihuVytahu_M26.STATUS.JoggLimit_Dosiahnuty;
	
	
	//ZadanÈ parametre serva//
	P4_Vytah.ServoZdvihuVytahu_M26.HomePAR.Acceleration:= 200;
	P4_Vytah.ServoZdvihuVytahu_M26.HomePAR.HomingVelocity:= 5;
	P4_Vytah.ServoZdvihuVytahu_M26.HomePAR.StartVelocity:= 20;
	P4_Vytah.ServoZdvihuVytahu_M26.HomePAR.Position:= 0;    //Offset homing pozÌcie pre absolutny snÌmaË
	P4_Vytah.ServoZdvihuVytahu_M26.HomePAR.HomingMode:= 2; //0 - direct, 1- refrenËn˝ snÌmaË, 2 - limitn˝ snÌmaË, 3 - absolutny encoder, 4 - na moment//
	
	P4_Vytah.ServoZdvihuVytahu_M26.PAR.Acceleration:= P34_RemPremenne.P4_Vytah_RychlostZdvihu*10;
	P4_Vytah.ServoZdvihuVytahu_M26.PAR.Deceleration:= P34_RemPremenne.P4_Vytah_RychlostZdvihu*10;
	P4_Vytah.ServoZdvihuVytahu_M26.PAR.StopDeceleration:= P34_RemPremenne.P4_Vytah_RychlostZdvihu*10;
	P4_Vytah.ServoZdvihuVytahu_M26.PAR.Velocity:= P34_RemPremenne.P4_Vytah_RychlostZdvihu; 
	P4_Vytah.ServoZdvihuVytahu_M26.PAR.Position:= P4_Vytah.PAR.ServoZdvihu_ZadanaPozicia;
		
	
	//Zastavenie pohybu serva//
	IF Zdvih_STOP THEN
		P4_Vytah.ServoZdvihuVytahu_M26.CMD.STOP:= TRUE;
		SC_OvlZdvihu.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		Zdvih_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P4_Vytah.ServoZdvihuVytahu_M26.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
		
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	//PrepoËet pozÌcie v˝ùahu//
    ZadanaPoziciaUINT:= LREAL_TO_UINT(P4_Vytah.PAR.ServoZdvihu_ZadanaPozicia);
    AktualnaPoziciaUINT:= LREAL_TO_UINT(P4_Vytah.STAV.Zdvih_AktualnaPozicia);
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlZdvihu);
	
	CASE SC_OvlZdvihu.Step OF
		
		0:
			SC_OvlZdvihu.StepName:= '0 - Nulovanie';
			Zdvih_JoggHORE:= FALSE;
			Zdvih_JoggDOLE:= FALSE;
			Zdvih_POLOHUJ:= FALSE;
			Zdvih_HOME:= FALSE;
			P4_Vytah.ServoZdvihuVytahu_M26.CMD.HOME:= FALSE;
			P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggVPRED:= FALSE;
			P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggVZAD:= FALSE;
			P4_Vytah.ServoZdvihuVytahu_M26.CMD.MoveAbsolute:= FALSE;
            Safety.IN.P4_Vytah_Zdvih_BUSY:= FALSE;
            P4_Vytah.STAV.ServoZdvihu_Homing_BUSY:= FALSE;
								
			IF SC_P4_Vytah.Step <> 0 AND P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Power_ON AND NOT P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ERROR AND NOT P4_Vytah.ServoZdvihuVytahu_M26.STATUS.STOP_ACTIVE THEN
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
		
			Safety.IN.P4_Vytah_Zdvih_BUSY:= TRUE;
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggVPRED:= TRUE;
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
		
			Safety.IN.P4_Vytah_Zdvih_BUSY:= TRUE;			
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Vytah.ServoZdvihuVytahu_M26.CMD.JoggVZAD:= TRUE;
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
		
            Safety.IN.P4_Vytah_Zdvih_BUSY:= TRUE;
            P4_Vytah.STAV.ServoZdvihu_Homing_BUSY:= TRUE;
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Vytah.ServoZdvihuVytahu_M26.CMD.HOME:= TRUE;
				SC_OvlZdvihu.IdleTime.IN:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			IF P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Homing_OK AND SC_OvlZdvihu.IdleTime.Q THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		40:
			SC_OvlZdvihu.StepName:= '40 - Polohovanie';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			
			
			Safety.IN.P4_Vytah_Zdvih_BUSY:= TRUE;		
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P4_Vytah.ServoZdvihuVytahu_M26.CMD.MoveAbsolute:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT = ZadanaPoziciaUINT) AND P4_Vytah.ServoZdvihuVytahu_M26.STATUS.MoveAbsolute_DONE THEN
				P4_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
	
		
		
		
	END_CASE
	
	
	
	
	
	
END_ACTION

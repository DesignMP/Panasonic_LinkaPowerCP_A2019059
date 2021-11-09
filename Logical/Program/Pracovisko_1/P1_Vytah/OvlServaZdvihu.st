
ACTION OvlServaZdvihu: 

	
	//**************************Axis 6***********************************//
	//Ot·Ëka serva = 5mm//
	//Motor m· klasick˝ encodÈr a brzdu//
	
    //ENABLE kniûnice//
    IF P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Communication_READY THEN
        P1_Vytah.ServoZdvihuVytahu_M31.CMD.ENABLE:= TRUE;
    ELSE
        P1_Vytah.ServoZdvihuVytahu_M31.CMD.ENABLE:= FALSE;
    END_IF    
    
    
	//Zapnutie serva//
	
	CasPowerON.IN:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ReadyToPower_ON AND P1_Vytah.STAV.ServoZvihu_LimitSnimace_BUSY AND P1_Vytah.ServoZdvihuVytahu_M31.STATUS.EnableSwitch_ACTIVE AND NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR;
	IF CasPowerON.Q THEN
		P1_Vytah.ServoZdvihuVytahu_M31.CMD.POWER:= TRUE;
	ELSE
		P1_Vytah.ServoZdvihuVytahu_M31.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON.PT:= T#1s;
	CasPowerON();
	
	
	
	
	
	
	
	
	
	
	//Zobrazenie stavou a parametrov serva//
	P1_Vytah.STAV.Zdvih_AktualnaPozicia:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ActualPosition;
	P1_Vytah.STAV.Zdvih_AktualnaRychlost:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ActualVelocity;
	P1_Vytah.STAV.ServoZdvihu_HomingOK:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Homing_OK;
	P1_Vytah.STAV.ServoZdvihu_BUSY:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.MoveAbsolute_BUSY;
	P1_Vytah.STAV.Zdvih_JoggLimitDosiahnuty:= P1_Vytah.ServoZdvihuVytahu_M31.STATUS.JoggLimit_Dosiahnuty;
	
	
	//ZadanÈ parametre serva//
	P1_Vytah.ServoZdvihuVytahu_M31.HomePAR.Acceleration:= 200;
	P1_Vytah.ServoZdvihuVytahu_M31.HomePAR.HomingVelocity:= 5;
	P1_Vytah.ServoZdvihuVytahu_M31.HomePAR.StartVelocity:= 20;
	P1_Vytah.ServoZdvihuVytahu_M31.HomePAR.Position:= 0;    //Offset homing pozÌcie pre absolutny snÌmaË
	P1_Vytah.ServoZdvihuVytahu_M31.HomePAR.HomingMode:= 2; //0 - direct, 1- refrenËn˝ snÌmaË, 2 - limitn˝ snÌmaË, 3 - absolutny encoder, 4 - na moment//
	
	P1_Vytah.ServoZdvihuVytahu_M31.PAR.Acceleration:= P1_RemPremenne.P1_Vytah_RychlostZdvihu*5;
	P1_Vytah.ServoZdvihuVytahu_M31.PAR.Deceleration:= P1_RemPremenne.P1_Vytah_RychlostZdvihu*10;
	P1_Vytah.ServoZdvihuVytahu_M31.PAR.StopDeceleration:= P1_RemPremenne.P1_Vytah_RychlostZdvihu*10;
	P1_Vytah.ServoZdvihuVytahu_M31.PAR.Velocity:= P1_RemPremenne.P1_Vytah_RychlostZdvihu; 
	P1_Vytah.ServoZdvihuVytahu_M31.PAR.Position:= P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia;
		
	
	//Zastavenie pohybu serva//
	IF Zdvih_STOP THEN
		P1_Vytah.ServoZdvihuVytahu_M31.CMD.STOP:= TRUE;
		CasZastaveniaServa.IN:= TRUE;
		SC_OvlZdvihu.Step:= 0;
		Zdvih_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q  THEN
		P1_Vytah.ServoZdvihuVytahu_M31.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
	
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	
	
	
	//PrepoËet pozÌcie v˝ùahu//
	ZadanaPoziciaUINT:= LREAL_TO_UINT(P1_Vytah.PAR.ServoZdvihu_ZadanaPozicia);
	AktualnaPoziciaUINT:= LREAL_TO_UINT(P1_Vytah.STAV.Zdvih_AktualnaPozicia);
	
	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlZdvihu);
	
	CASE SC_OvlZdvihu.Step OF
		
		0:
			SC_OvlZdvihu.StepName:= '0 - Nulovanie';
			Zdvih_JoggHORE:= FALSE;
			Zdvih_JoggDOLE:= FALSE;
			Zdvih_POLOHUJ:= FALSE;
			Zdvih_HOME:= FALSE;
			P1_Vytah.ServoZdvihuVytahu_M31.CMD.HOME:= FALSE;
			P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggVPRED:= FALSE;
			P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggVZAD:= FALSE;
			P1_Vytah.ServoZdvihuVytahu_M31.CMD.MoveAbsolute:= FALSE;
            Safety.IN.P1_Vytah_Zdvih_BUSY:= FALSE;
            P1_Vytah.STAV.ServoZdvihu_Homing_BUSY:= FALSE;
								
			IF SC_P1_Vytah.Step <> 0 AND P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Power_ON AND NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR AND NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.STOP_ACTIVE THEN
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
		
			Safety.IN.P1_Vytah_Zdvih_BUSY:= TRUE;
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggVPRED:= TRUE;
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
		
			Safety.IN.P1_Vytah_Zdvih_BUSY:= TRUE;			
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P1_Vytah.ServoZdvihuVytahu_M31.CMD.JoggVZAD:= TRUE;
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
		
			Safety.IN.P1_Vytah_Zdvih_BUSY:= TRUE;
			P1_Vytah.STAV.ServoZdvihu_Homing_BUSY:= TRUE;
            
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P1_Vytah.ServoZdvihuVytahu_M31.CMD.HOME:= TRUE;
				SC_OvlZdvihu.IdleTime.IN:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			IF P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Homing_OK AND SC_OvlZdvihu.IdleTime.Q THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		40:
			SC_OvlZdvihu.StepName:= '40 - Polohovanie';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			
			
			Safety.IN.P1_Vytah_Zdvih_BUSY:= TRUE;		
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P1_Vytah.ServoZdvihuVytahu_M31.CMD.MoveAbsolute:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT = ZadanaPoziciaUINT) AND P1_Vytah.ServoZdvihuVytahu_M31.STATUS.MoveAbsolute_DONE THEN
				P1_Vytah.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
	
		
		
		
	END_CASE
	
	
	
	
	
	
END_ACTION


ACTION OvlServaZdvihu: 

	//**************************Axis 5***********************************//
	//Otáèka serva = 10mm//
	//Motor má absolútny encodér a brzdu//
	
    
    //ENABLE knižnice//
    IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Communication_READY THEN
        P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ENABLE:= TRUE;
    ELSE
        P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ENABLE:= FALSE;
    END_IF  
    
    
    
	//Zapnutie serva//
	CasPowerON.IN:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ReadyToPower_ON AND P2_Zvaranie.STAV.ServoZvihu_LimitSnimace_BUSY AND P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.EnableSwitch_ACTIVE AND NOT P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR;
	IF CasPowerON.Q THEN
		P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.POWER:= TRUE;
	ELSE
		P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON.PT:= T#1s;
	CasPowerON();
	
	
	
	
	
	
    //Zobrazenie stavou a parametrov serva//
    P2_Zvaranie.STAV.Zdvih_AktualnaPozicia:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualPosition;
	P2_Zvaranie.STAV.Zdvih_AktualnaRychlost:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualVelocity;
	P2_Zvaranie.STAV.Zdvih_AktualnyMoment:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualTorque;
	P2_Zvaranie.STAV.ServoZdvihu_HomingOK:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Homing_OK;
	P2_Zvaranie.STAV.ServoZdvihu_BUSY:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.MoveAbsolute_BUSY;
	P2_Zvaranie.STAV.Zdvih_JoggLimitDosiahnuty:= P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	P2_Zvaranie.ServoZdvihuZvarania_M6.HomePAR.Acceleration:= 100;
	P2_Zvaranie.ServoZdvihuZvarania_M6.HomePAR.HomingVelocity:= 5;
	P2_Zvaranie.ServoZdvihuZvarania_M6.HomePAR.StartVelocity:= 10;
	P2_Zvaranie.ServoZdvihuZvarania_M6.HomePAR.Position:= -37731.5;    //Offset homing pozície pre absolutny snímaè
	P2_Zvaranie.ServoZdvihuZvarania_M6.HomePAR.HomingMode:= 3; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
	
	P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Acceleration:= P2_RemPremenne.P2_ZdvihZvarania_Rychlost*10;
	P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Deceleration:= P2_RemPremenne.P2_ZdvihZvarania_Rychlost*10;
	P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.StopDeceleration:= P2_RemPremenne.P2_ZdvihZvarania_Rychlost*10;
	P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Velocity:= P2_RemPremenne.P2_ZdvihZvarania_Rychlost; 
    P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Position:= P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia;
	
	
	
	
    //Zastavenie pohybu serva//
	IF Zdvih_STOP THEN
		P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.STOP:= TRUE;
		SC_OvlZdvihu.Step:= 0;
		CasZastaveniaServa.IN:= TRUE;
		Zdvih_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q THEN
		P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.STOP:= FALSE;
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
            Zdvih_ZVARANIE:= FALSE;
            Zdvih_ZATLACANIE:= FALSE;
			P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.HOME:= FALSE;
			P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggVPRED:= FALSE;
			P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggVZAD:= FALSE;
			P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.MoveAbsolute:= FALSE;
			P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.MoveTorque:= FALSE;
			MomentDosiahnuty:= FALSE;
					
			IF SC_P2_Zvaranie.Step <> 0 AND P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Power_ON AND NOT P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR AND NOT P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.STOP_ACTIVE THEN
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
			ELSIF Zdvih_ZVARANIE THEN
                SC_OvlZdvihu.Step:= 50;
            ELSIF Zdvih_ZATLACANIE THEN
                SC_OvlZdvihu.Step:= 60;    
			END_IF
	
	
		10:
			SC_OvlZdvihu.StepName:= '10 - Jogg HORE';
			SC_OvlZdvihu.IdleTime.PT:= T#3s;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggVZAD:= TRUE;
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
				P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggVPRED:= TRUE;
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
				P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.HOME:= TRUE;
				SC_OvlZdvihu.IdleTime.IN:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
			IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Homing_OK AND SC_OvlZdvihu.IdleTime.Q THEN
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
		40:
			SC_OvlZdvihu.StepName:= '40 - Polohovanie';
			SC_OvlZdvihu.IdleTime.PT:= T#500ms;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
			ZadanaPoziciaUINT:= LREAL_TO_UINT(P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia);
			AktualnaPoziciaUINT:= LREAL_TO_UINT(P2_Zvaranie.STAV.Zdvih_AktualnaPozicia);		
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.MoveAbsolute:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT = ZadanaPoziciaUINT) AND P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.MoveAbsolute_DONE THEN
				P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
	
		50:	
			SC_OvlZdvihu.StepName:= '50 - Zvaranie';
			SC_OvlZdvihu.IdleTime.PT:= P2_RemPremenne.P2_Zvaranie_CasZvarania;
			SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Torque:= P2_RemPremenne.P2_Zvaranie_MomentZvarania;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueAcceleration:= 50;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueVelocity:= P2_RemPremenne.P2_Zvaranie_RychlostZvarania;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueRamp;
            
            
			SC_OvlZdvihu.IdleTime.IN:= MomentDosiahnuty;
			
			IF NOT SC_OvlZdvihu.Switch1 THEN
				P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.MoveTorque:= TRUE;
				SC_OvlZdvihu.Switch1:= TRUE;
			END_IF
		
				
			
			IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualTorque >= P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Torque THEN
				MomentDosiahnuty:= TRUE;
			END_IF	
			
			IF SC_OvlZdvihu.IdleTime.Q THEN
				P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
				SC_OvlZdvihu.ResetStep:= TRUE;
				SC_OvlZdvihu.Step:= 0;
			END_IF	
		
        60:	
            SC_OvlZdvihu.StepName:= '60 - Zatlacanie Coveru 5H';
            SC_OvlZdvihu.IdleTime.PT:= P2_RemPremenne.P2_Zvaranie_CasZatlacania;
            SC_OvlZdvihu.AlarmTime.PT:= T#3s;
		
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Torque:= P2_RemPremenne.P2_Zvaranie_MomentZatlacania;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueAcceleration:= 50;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueVelocity:= P2_RemPremenne.P2_Zvaranie_RychlostZatlacania;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.TorqueRamp;
            
            
            SC_OvlZdvihu.IdleTime.IN:= MomentDosiahnuty;
			
            IF NOT SC_OvlZdvihu.Switch1 THEN
                P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.MoveTorque:= TRUE;
                SC_OvlZdvihu.Switch1:= TRUE;
            END_IF
		
				
			
            IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualTorque >= P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.Torque THEN
                MomentDosiahnuty:= TRUE;
            END_IF	
			
            IF SC_OvlZdvihu.IdleTime.Q THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= TRUE;
                SC_OvlZdvihu.ResetStep:= TRUE;
                SC_OvlZdvihu.Step:= 0;
            END_IF	
		
		
	END_CASE
	
	
	
	
	
END_ACTION

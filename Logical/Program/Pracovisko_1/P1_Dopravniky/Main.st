
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
		//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P1_Dopravniky);
	
	
	//Reset sekcie //
	IF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
		SC_P1_Dopravniky.Step:= 0;
	ELSIF P1_Dopravniky.Reset THEN
		SC_P1_Dopravniky.Step:= 0;
		P1_Dopravniky.Reset:= FALSE;
	END_IF	
	
	
	
	CASE SC_P1_Dopravniky.Step OF 
		
		0:
			SC_P1_Dopravniky.StepName:='0 - Nulovanie';
			P1_Dopravniky.Automat:= FALSE;
			P1_Dopravniky.KoniecCyklu:= FALSE;
			P1_Dopravniky.Manual:= FALSE;
			P1_Dopravniky.STAV.PoINIT:= FALSE;
			P1_Dopravniky.OUT.HornyDoprav_ChodVPRED_M32:= FALSE;
			P1_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M29:= FALSE;
			
						
			IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.PORUCHA AND P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 THEN
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 1;
			END_IF
	
		1:
			SC_P1_Dopravniky.StepName:='1 - Cakam na spustenie vyroby';
			P1_Dopravniky.KoniecCyklu:= FALSE;
            IF P1_Dopravniky.Automat THEN
				SC_P1_Dopravniky.Step:= 2;
			ELSIF P1_Dopravniky.Manual THEN
				SC_P1_Dopravniky.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
	
	
		2:
			SC_P1_Dopravniky.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P1_Dopravniky.IdleTime.PT:= T#2s;
			SC_P1_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF P1_Srobovacky_VychodziaPozicia AND P1_Robot.STAV.PoINIT THEN
				SC_P1_Dopravniky.IdleTime.IN:= TRUE;
			ELSE	
				SC_P1_Dopravniky.IdleTime.IN:= FALSE;
			END_IF
			
			
			IF SC_P1_Dopravniky.IdleTime.Q THEN
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 3;
			END_IF	
	
			
		3:
			SC_P1_Dopravniky.StepName:='3 - Inicializacia - inicializacia stoprov';
			SC_P1_Dopravniky.IdleTime.PT:= T#1s;
			SC_P1_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF NOT P1_StoperSrobovania.IN.PritomnostPaletky_S16 THEN
				P1_StoperSrobovania.OUT.ZasunStoper_YV110:= TRUE;
				SC_P1_Dopravniky.IdleTime.IN:= TRUE;
			ELSE
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 5;
			END_IF	
			
			IF P1_StoperSrobovania.OUT.ZasunStoper_YV110 AND SC_P1_Dopravniky.IdleTime.Q THEN
				P1_StoperSrobovania.OUT.ZasunStoper_YV110:= FALSE;
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 5;
			END_IF	
			
		5:
			SC_P2_Dopravniky.StepName:='5 - Inicializacia - ukoncenie inicializacie';
			SC_P2_Dopravniky.IdleTime.PT:= T#4s;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;
		
			P1_Dopravniky.OUT.HornyDoprav_ChodVPRED_M32:= TRUE;
			P1_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M29:= TRUE;
			SC_P1_Dopravniky.IdleTime.IN:= TRUE;
			
			IF SC_P1_Dopravniky.IdleTime.Q THEN
				P1_Dopravniky.STAV.PoINIT:= TRUE;
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 100;
			END_IF
			
	
			
			//********************************************************Automatický režim****************************************************************************//
			
		100:  
			SC_P1_Dopravniky.StepName:='100 - Automaticky Rezim - cakam na vypnutie dopravnikou';
			SC_P1_Dopravniky.IdleTime.PT:= T#200ms;
			SC_P1_Dopravniky.AlarmTime.PT:= T#5s;			
			
			IF P1_Dopravniky.KoniecCyklu AND NOT P1_StoperSrobovania.Automat AND NOT P1_AkumulacnyStoper.Automat THEN
				SC_P1_Dopravniky.ResetStep:= TRUE;
				SC_P1_Dopravniky.Step:= 0;
			END_IF
			
			
			
			
		
			//*******************************************************Manuálny režim*******************************************************************************//
		700:
			SC_P1_Dopravniky.StepName:='700 - Manualny Rezim';
			SC_P1_Dopravniky.IdleTime.PT:= T#8s;
			SC_P1_Dopravniky.AlarmTime.PT:= T#5s;
			
			
			
			
	END_CASE		
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM



PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P3_Dopravniky);
	
	
	//Reset sekcie //
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        SC_P3_Dopravniky.Step:= 0;
    ELSIF P3_Dopravniky.Reset THEN
		SC_P3_Dopravniky.Step:= 0;
		P3_Dopravniky.Reset:= FALSE;
	END_IF	
	
	
	
	CASE SC_P3_Dopravniky.Step OF 
		
		0:
			SC_P3_Dopravniky.StepName:='0 - Nulovanie';
			P3_Dopravniky.Automat:= FALSE;
			P3_Dopravniky.KoniecCyklu:= FALSE;
			P3_Dopravniky.Manual:= FALSE;
			P3_Dopravniky.STAV.PoINIT:= FALSE;
			P3_Dopravniky.OUT.HornyDoprav_ChodVPRED_M33:= FALSE;
			P3_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M34:= FALSE;
			
						
			IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA  AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
				SC_P3_Dopravniky.ResetStep:= TRUE;
				SC_P3_Dopravniky.Step:= 1;
			END_IF
	
		1:
			SC_P3_Dopravniky.StepName:='1 - Cakam na spustenie vyroby';
			P3_Dopravniky.KoniecCyklu:= FALSE;
            IF P3_Dopravniky.Automat THEN
				SC_P3_Dopravniky.Step:= 2;
			ELSIF P3_Dopravniky.Manual THEN
				SC_P3_Dopravniky.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
	
	
		2:
			SC_P3_Dopravniky.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P3_Dopravniky.IdleTime.PT:= T#2s;
			SC_P3_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF P3_Srobovacky_VychodziaPozicia AND P3_LeakageTestA_VychodziaPozicia AND P3_LeakageTestB_VychodziaPozicia THEN
				SC_P3_Dopravniky.IdleTime.IN:= TRUE;
			ELSE	
				SC_P3_Dopravniky.IdleTime.IN:= FALSE;
			END_IF
			
			
			IF SC_P3_Dopravniky.IdleTime.Q THEN
				SC_P3_Dopravniky.ResetStep:= TRUE;
				SC_P3_Dopravniky.Step:= 3;
			END_IF	
		
		3:
			SC_P3_Dopravniky.StepName:='2 - Inicializacia - ukoncenie inicializacie';
			SC_P3_Dopravniky.IdleTime.PT:= T#4s;
			SC_P3_Dopravniky.AlarmTime.PT:= T#5s;
		
			P3_Dopravniky.OUT.HornyDoprav_ChodVPRED_M33:= TRUE;
			P3_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M34:= TRUE;
			SC_P3_Dopravniky.IdleTime.IN:= TRUE;
			
			IF SC_P3_Dopravniky.IdleTime.Q THEN
				P3_Dopravniky.STAV.PoINIT:= TRUE;
				SC_P3_Dopravniky.ResetStep:= TRUE;
				SC_P3_Dopravniky.Step:= 100;
			END_IF
			
	
			
			//********************************************************Automatický režim****************************************************************************//
		100:  
			SC_P3_Dopravniky.StepName:='100 - Automaticky Rezim - cakam na vypnutie dopravnikou';
			SC_P3_Dopravniky.IdleTime.PT:= T#200ms;
			SC_P3_Dopravniky.AlarmTime.PT:= T#5s;			
			
			IF P3_Dopravniky.KoniecCyklu AND NOT P3_StoperSrobovania.Automat AND NOT P3_LeakageTestA.Automat AND NOT P3_LeakageTestB.Automat AND Safety.STAV.P3_VstupBunky_Bariera_AKTIVNA AND Safety.STAV.P3_VystupBunky_Bariera_AKTIVNA THEN
				SC_P3_Dopravniky.ResetStep:= TRUE;
				SC_P3_Dopravniky.Step:= 0;
			END_IF
			
			
			
			
		
			//*******************************************************Manuálny režim*******************************************************************************//
		700:
			SC_P3_Dopravniky.StepName:='700 - Manualny Rezim';
			SC_P3_Dopravniky.IdleTime.PT:= T#8s;
			SC_P3_Dopravniky.AlarmTime.PT:= T#5s;
			
			
			
			
	END_CASE		
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


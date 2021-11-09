
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P4_Dopravniky);
	
	
	//Reset sekcie //
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        SC_P4_Dopravniky.Step:= 0;
    ELSIF P4_Dopravniky.Reset THEN
		SC_P4_Dopravniky.Step:= 0;
		P4_Dopravniky.Reset:= FALSE;
	END_IF	
	
	
	
	CASE SC_P4_Dopravniky.Step OF 
		
		0:
			SC_P4_Dopravniky.StepName:='0 - Nulovanie';
			P4_Dopravniky.Automat:= FALSE;
			P4_Dopravniky.KoniecCyklu:= FALSE;
			P4_Dopravniky.Manual:= FALSE;
			P4_Dopravniky.STAV.PoINIT:= FALSE;
			P4_Dopravniky.OUT.HornyDoprav_ChodVPRED_M24:= FALSE;
			P4_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M27:= FALSE;
			
						
			IF Safety.STAV.P4_ZonaBunky_AKTIVNA AND NOT P4_Pracovisko.STAV.PORUCHA AND P4_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S15 THEN
				SC_P4_Dopravniky.ResetStep:= TRUE;
				SC_P4_Dopravniky.Step:= 1;
			END_IF
	
		1:
			SC_P4_Dopravniky.StepName:='1 - Cakam na spustenie vyroby';
			P4_Dopravniky.KoniecCyklu:= FALSE;
            IF P4_Dopravniky.Automat THEN
				SC_P4_Dopravniky.Step:= 2;
			ELSIF P4_Dopravniky.Manual THEN
				SC_P4_Dopravniky.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
	
	
		2:
			SC_P4_Dopravniky.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P4_Dopravniky.IdleTime.PT:= T#2s;
			SC_P4_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF P4_FunkcnyTestA_VychodziaPozicia AND P4_FunkcnyTestB_VychodziaPozicia (*AND P4_Etiketovacka_VychodziaPozicia*) THEN
				SC_P4_Dopravniky.IdleTime.IN:= TRUE;
			ELSE	
				SC_P4_Dopravniky.IdleTime.IN:= FALSE;
			END_IF
			
			
			IF SC_P4_Dopravniky.IdleTime.Q THEN
				SC_P4_Dopravniky.ResetStep:= TRUE;
				SC_P4_Dopravniky.Step:= 3;
			END_IF	
		
		3:
			SC_P4_Dopravniky.StepName:='2 - Inicializacia - ukoncenie inicializacie';
			SC_P4_Dopravniky.IdleTime.PT:= T#4s;
			SC_P4_Dopravniky.AlarmTime.PT:= T#5s;
		
			P4_Dopravniky.OUT.HornyDoprav_ChodVPRED_M24:= TRUE;
			P4_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M27:= TRUE;
			SC_P4_Dopravniky.IdleTime.IN:= TRUE;
			
			IF SC_P4_Dopravniky.IdleTime.Q THEN
				P4_Dopravniky.STAV.PoINIT:= TRUE;
				SC_P4_Dopravniky.ResetStep:= TRUE;
				SC_P4_Dopravniky.Step:= 100;
			END_IF
			
	
			
			//********************************************************Automatický režim****************************************************************************//
		100:  
			SC_P4_Dopravniky.StepName:='100 - Automaticky Rezim - cakam na vypnutie dopravnikou';
			SC_P4_Dopravniky.IdleTime.PT:= T#200ms;
			SC_P4_Dopravniky.AlarmTime.PT:= T#5s;			
			
			IF P4_Dopravniky.KoniecCyklu AND NOT P4_FunkcnyTestA.Automat AND NOT P4_FunkcnyTestB.Automat AND NOT P4_Etiketovacka.Automat AND Safety.STAV.P3_VystupBunky_Bariera_AKTIVNA AND Safety.STAV.P4_VystupBunky_Bariera_AKTIVNA THEN
				SC_P4_Dopravniky.ResetStep:= TRUE;
				SC_P4_Dopravniky.Step:= 0;
			END_IF
			
			
			
			
		
			//*******************************************************Manuálny režim*******************************************************************************//
		700:
			SC_P4_Dopravniky.StepName:='700 - Manualny Rezim';
			SC_P4_Dopravniky.IdleTime.PT:= T#8s;
			SC_P4_Dopravniky.AlarmTime.PT:= T#5s;
			
			
			
			
	END_CASE		
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


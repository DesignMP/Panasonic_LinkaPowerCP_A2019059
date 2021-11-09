
ACTION OvlHornychKontaktov: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlHornychKontaktov);
	
	
	CASE SC_OvlHornychKontaktov.Step OF
		
		0:
			SC_OvlHornychKontaktov.StepName:= '0 - Nulovanie';
			HorneKontakty_VYSUN:= FALSE;
			HorneKontakty_ZASUN:= FALSE;
//			P4_FunkcnyTestA.OUT.HorneKontakty_VYSUN_YV178:= FALSE;
//			P4_FunkcnyTestA.OUT.HorneKontakty_ZASUN_YV177:= FALSE;
								
			IF SC_P4_FunkcnyTestA.Step <> 0 THEN
				SC_OvlHornychKontaktov.ResetStep:= TRUE;
				SC_OvlHornychKontaktov.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlHornychKontaktov.StepName:= '1 - Rozhodnutie o cinnosti';
			IF HorneKontakty_VYSUN THEN
				SC_OvlHornychKontaktov.Step:= 10;
			ELSIF HorneKontakty_ZASUN THEN
				SC_OvlHornychKontaktov.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlHornychKontaktov.StepName:= '10 - Vysunutie hornych kontaktov';
			SC_OvlHornychKontaktov.IdleTime.PT:= T#5s;
			SC_OvlHornychKontaktov.AlarmTime.PT:= T#10s;
						
			IF P4_FunkcnyTestA.Automat THEN
				SC_OvlHornychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlHornychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlHornychKontaktov.Switch1 THEN
				P4_FunkcnyTestA.OUT.HorneKontakty_ZASUN_YV177:= FALSE;
				P4_FunkcnyTestA.OUT.HorneKontakty_VYSUN_YV178:= TRUE;
				SC_OvlHornychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestA.IN.HorneKontakty_VYSUNUTE_MS25 OR SC_OvlHornychKontaktov.IdleTime.Q THEN
				SC_OvlHornychKontaktov.ResetStep:= TRUE;
				SC_OvlHornychKontaktov.Step:= 0;
			ELSIF SC_OvlHornychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[419]:= TRUE;
				P4_PoruchaST1:= TRUE;
			END_IF
		
		
		20:
			SC_OvlHornychKontaktov.StepName:= '20 - Zasunutie hornych kontaktov';
			SC_OvlHornychKontaktov.IdleTime.PT:= T#5s;
			SC_OvlHornychKontaktov.AlarmTime.PT:= T#10s;
						
			IF P4_FunkcnyTestA.Automat THEN
				SC_OvlHornychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlHornychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlHornychKontaktov.Switch1 THEN
				P4_FunkcnyTestA.OUT.HorneKontakty_VYSUN_YV178:= FALSE;
				P4_FunkcnyTestA.OUT.HorneKontakty_ZASUN_YV177:= TRUE;
				SC_OvlHornychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestA.IN.HorneKontakty_ZASUNUTE_MS23 OR SC_OvlHornychKontaktov.IdleTime.Q THEN
				SC_OvlHornychKontaktov.ResetStep:= TRUE;
				SC_OvlHornychKontaktov.Step:= 0;
			ELSIF SC_OvlHornychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[420]:= TRUE;
				P4_PoruchaST1:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

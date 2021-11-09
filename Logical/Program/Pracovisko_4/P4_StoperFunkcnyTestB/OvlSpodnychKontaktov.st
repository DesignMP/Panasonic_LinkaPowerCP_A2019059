
ACTION OvlSpodnychKontaktov: 

	

	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlSpodnychKontaktov);
	
	
	CASE SC_OvlSpodnychKontaktov.Step OF
		
		0:
			SC_OvlSpodnychKontaktov.StepName:= '0 - Nulovanie';
			SpodneKontakty_VYSUN:= FALSE;
			SpodneKontakty_ZASUN:= FALSE;
//			P4_FunkcnyTestB.OUT.SpodneKontakty_VYSUN_YV190:= FALSE;
//			P4_FunkcnyTestB.OUT.SpodneKontakty_ZASUN_YV189:= FALSE;
								
			IF SC_P4_FunkcnyTestB.Step <> 0 THEN
				SC_OvlSpodnychKontaktov.ResetStep:= TRUE;
				SC_OvlSpodnychKontaktov.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlSpodnychKontaktov.StepName:= '1 - Rozhodnutie o cinnosti';
			IF SpodneKontakty_VYSUN THEN
				SC_OvlSpodnychKontaktov.Step:= 10;
			ELSIF SpodneKontakty_ZASUN THEN
				SC_OvlSpodnychKontaktov.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlSpodnychKontaktov.StepName:= '10 - Vysunutie spodnych kontaktov';
			SC_OvlSpodnychKontaktov.IdleTime.PT:= T#5s;
			SC_OvlSpodnychKontaktov.AlarmTime.PT:= T#10s;
						
			IF P4_FunkcnyTestB.Automat THEN
				SC_OvlSpodnychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlSpodnychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlSpodnychKontaktov.Switch1 THEN
				P4_FunkcnyTestB.OUT.SpodneKontakty_ZASUN_YV189:= FALSE;
				P4_FunkcnyTestB.OUT.SpodneKontakty_VYSUN_YV190:= TRUE;
				SC_OvlSpodnychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestB.IN.SpodneKontakty_VYSUNUTE_MS34 OR SC_OvlSpodnychKontaktov.IdleTime.Q THEN
				SC_OvlSpodnychKontaktov.ResetStep:= TRUE;
				SC_OvlSpodnychKontaktov.Step:= 0;
			ELSIF SC_OvlSpodnychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[425]:= TRUE;
				P4_PoruchaST2:= TRUE;
			END_IF
		
		
		20:
			SC_OvlSpodnychKontaktov.StepName:= '20 - Zasunutie spodnych kontaktov';
			SC_OvlSpodnychKontaktov.IdleTime.PT:= T#5s;
			SC_OvlSpodnychKontaktov.AlarmTime.PT:= T#10s;
						
			IF P4_FunkcnyTestB.Automat THEN
				SC_OvlSpodnychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlSpodnychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlSpodnychKontaktov.Switch1 THEN
				P4_FunkcnyTestB.OUT.SpodneKontakty_VYSUN_YV190:= FALSE;
				P4_FunkcnyTestB.OUT.SpodneKontakty_ZASUN_YV189:= TRUE;
				SC_OvlSpodnychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestB.IN.SpodneKontakty_ZASUNUTE_MS32 OR SC_OvlSpodnychKontaktov.IdleTime.Q THEN
				SC_OvlSpodnychKontaktov.ResetStep:= TRUE;
				SC_OvlSpodnychKontaktov.Step:= 0;
			ELSIF SC_OvlSpodnychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[426]:= TRUE;
				P4_PoruchaST2:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

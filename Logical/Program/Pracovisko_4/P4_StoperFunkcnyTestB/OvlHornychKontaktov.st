
ACTION OvlHornychKontaktov: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlHornychKontaktov);
	
	
	CASE SC_OvlHornychKontaktov.Step OF
		
		0:
			SC_OvlHornychKontaktov.StepName:= '0 - Nulovanie';
			HorneKontakty_VYSUN:= FALSE;
			HorneKontakty_ZASUN:= FALSE;
//			P4_FunkcnyTestB.OUT.HorneKontakty_VYSUN_YV186:= FALSE;
//			P4_FunkcnyTestB.OUT.HorneKontakty_ZASUN_YV185:= FALSE;
								
			IF SC_P4_FunkcnyTestB.Step <> 0 THEN
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
						
			IF P4_FunkcnyTestB.Automat THEN
				SC_OvlHornychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlHornychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlHornychKontaktov.Switch1 THEN
				P4_FunkcnyTestB.OUT.HorneKontakty_ZASUN_YV185:= FALSE;
				P4_FunkcnyTestB.OUT.HorneKontakty_VYSUN_YV186:= TRUE;
				SC_OvlHornychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestB.IN.HorneKontakty_VYSUNUTE_MS26 OR SC_OvlHornychKontaktov.IdleTime.Q THEN
				SC_OvlHornychKontaktov.ResetStep:= TRUE;
				SC_OvlHornychKontaktov.Step:= 0;
			ELSIF SC_OvlHornychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[423]:= TRUE;
				P4_PoruchaST2:= TRUE;
			END_IF
		
		
		20:
			SC_OvlHornychKontaktov.StepName:= '20 - Zasunutie hornych kontaktov';
			SC_OvlHornychKontaktov.IdleTime.PT:= T#5s;
			SC_OvlHornychKontaktov.AlarmTime.PT:= T#10s;
						
			IF P4_FunkcnyTestB.Automat THEN
				SC_OvlHornychKontaktov.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlHornychKontaktov.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlHornychKontaktov.Switch1 THEN
				P4_FunkcnyTestB.OUT.HorneKontakty_VYSUN_YV186:= FALSE;
				P4_FunkcnyTestB.OUT.HorneKontakty_ZASUN_YV185:= TRUE;
				SC_OvlHornychKontaktov.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestB.IN.HorneKontakty_ZASUNUTE_MS24 OR SC_OvlHornychKontaktov.IdleTime.Q THEN
				SC_OvlHornychKontaktov.ResetStep:= TRUE;
				SC_OvlHornychKontaktov.Step:= 0;
			ELSIF SC_OvlHornychKontaktov.AlarmTime.Q THEN
				P34_Alarmy[424]:= TRUE;
				P4_PoruchaST2:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

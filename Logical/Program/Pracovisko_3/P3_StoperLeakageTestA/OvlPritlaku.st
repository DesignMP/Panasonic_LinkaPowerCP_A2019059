
ACTION OvlPritlaku: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlPritlaku);
	
	
	CASE SC_OvlPritlaku.Step OF
		
		0:
			SC_OvlPritlaku.StepName:= '0 - Nulovanie';
			Pritlak_VYSUN:= FALSE;
			Pritlak_ZASUN:= FALSE;
			(*P3_LeakageTestA.OUT.Pritlak_VYSUN_YV157:= FALSE;*)
			P3_LeakageTestA.OUT.Pritlak_ZASUN_YV158:= FALSE;
								
			IF SC_P3_LeakageTestA.Step <> 0 THEN
				SC_OvlPritlaku.ResetStep:= TRUE;
				SC_OvlPritlaku.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlPritlaku.StepName:= '1 - Rozhodnutie o cinnosti';
			IF Pritlak_VYSUN THEN
				SC_OvlPritlaku.Step:= 10;
			ELSIF Pritlak_ZASUN THEN
				SC_OvlPritlaku.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlPritlaku.StepName:= '10 - Vysunutie pritlaku';
			SC_OvlPritlaku.IdleTime.PT:= T#3s;
			SC_OvlPritlaku.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestA.Automat THEN
				SC_OvlPritlaku.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlPritlaku.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlPritlaku.Switch1 THEN
				P3_LeakageTestA.OUT.Pritlak_ZASUN_YV158:= FALSE;
				P3_LeakageTestA.OUT.Pritlak_VYSUN_YV157:= TRUE;
				SC_OvlPritlaku.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestA.IN.Pritlak_VYSUNUTY_MS47 OR SC_OvlPritlaku.IdleTime.Q THEN
				SC_OvlPritlaku.ResetStep:= TRUE;
				SC_OvlPritlaku.Step:= 0;
			ELSIF SC_OvlPritlaku.AlarmTime.Q THEN
				P34_Alarmy[306]:= TRUE;
				P3_PoruchaST2:= TRUE;
			END_IF
		
		
		20:
			SC_OvlPritlaku.StepName:= '20 - Zasunutie pritlaku';
			SC_OvlPritlaku.IdleTime.PT:= T#3s;
			SC_OvlPritlaku.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestA.Automat THEN
				SC_OvlPritlaku.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlPritlaku.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlPritlaku.Switch1 THEN
				P3_LeakageTestA.OUT.Pritlak_VYSUN_YV157:= FALSE;
				P3_LeakageTestA.OUT.Pritlak_ZASUN_YV158:= TRUE;
				SC_OvlPritlaku.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestA.IN.Pritlak_ZASUNUTY_MS46 OR SC_OvlPritlaku.IdleTime.Q THEN
				SC_OvlPritlaku.ResetStep:= TRUE;
				SC_OvlPritlaku.Step:= 0;
			ELSIF SC_OvlPritlaku.AlarmTime.Q THEN
				P34_Alarmy[307]:= TRUE;
				P3_PoruchaST2:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION


ACTION OvlPritlaku: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlPritlaku);
	
	
	CASE SC_OvlPritlaku.Step OF
		
		0:
			SC_OvlPritlaku.StepName:= '0 - Nulovanie';
			Pritlak_VYSUN:= FALSE;
			Pritlak_ZASUN:= FALSE;
			(*P3_LeakageTestB.OUT.Pritlak_VYSUN_YV161:= FALSE;*)
			P3_LeakageTestB.OUT.Pritlak_ZASUN_YV162:= FALSE;
								
			IF SC_P3_LeakageTestB.Step <> 0 THEN
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
						
			IF P3_LeakageTestB.Automat THEN
				SC_OvlPritlaku.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlPritlaku.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlPritlaku.Switch1 THEN
				P3_LeakageTestB.OUT.Pritlak_ZASUN_YV162:= FALSE;
				P3_LeakageTestB.OUT.Pritlak_VYSUN_YV161:= TRUE;
				SC_OvlPritlaku.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestB.IN.Pritlak_VYSUNUTY_MS49 OR SC_OvlPritlaku.IdleTime.Q THEN
				SC_OvlPritlaku.ResetStep:= TRUE;
				SC_OvlPritlaku.Step:= 0;
			ELSIF SC_OvlPritlaku.AlarmTime.Q THEN
				P34_Alarmy[308]:= TRUE;
				P3_PoruchaST3:= TRUE;
			END_IF
		
		
		20:
			SC_OvlPritlaku.StepName:= '20 - Zasunutie pritlaku';
			SC_OvlPritlaku.IdleTime.PT:= T#3s;
			SC_OvlPritlaku.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestB.Automat THEN
				SC_OvlPritlaku.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlPritlaku.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlPritlaku.Switch1 THEN
				P3_LeakageTestB.OUT.Pritlak_VYSUN_YV161:= FALSE;
				P3_LeakageTestB.OUT.Pritlak_ZASUN_YV162:= TRUE;
				SC_OvlPritlaku.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestB.IN.Pritlak_ZASUNUTY_MS48 OR SC_OvlPritlaku.IdleTime.Q THEN
				SC_OvlPritlaku.ResetStep:= TRUE;
				SC_OvlPritlaku.Step:= 0;
			ELSIF SC_OvlPritlaku.AlarmTime.Q THEN
				P34_Alarmy[309]:= TRUE;
				P3_PoruchaST3:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

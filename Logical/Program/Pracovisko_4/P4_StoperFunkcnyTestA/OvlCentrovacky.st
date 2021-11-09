
ACTION OvlCentrovacky: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlCentrovacky);
	
	
	CASE SC_OvlCentrovacky.Step OF
		
		0:
			SC_OvlCentrovacky.StepName:= '0 - Nulovanie';
			Centrovacku_VYSUN:= FALSE;
			Centrovacku_ZASUN:= FALSE;
//			P4_FunkcnyTestA.OUT.VysunCentrovanie_YV183:= FALSE;
//			P4_FunkcnyTestA.OUT.ZasunCentrovanie_YV184:= FALSE;
								
			IF SC_P4_FunkcnyTestA.Step <> 0 THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlCentrovacky.StepName:= '1 - Rozhodnutie o cinnosti';
			IF Centrovacku_VYSUN THEN
				SC_OvlCentrovacky.Step:= 10;
			ELSIF Centrovacku_ZASUN THEN
				SC_OvlCentrovacky.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlCentrovacky.StepName:= '10 - Vysunutie centrovacky';
			SC_OvlCentrovacky.IdleTime.PT:= T#3s;
			SC_OvlCentrovacky.AlarmTime.PT:= T#3s;
						
			IF P4_FunkcnyTestA.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P4_FunkcnyTestA.OUT.ZasunCentrovanie_YV184:= FALSE;
				P4_FunkcnyTestA.OUT.VysunCentrovanie_YV183:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestA.IN.Centrovanie_VYSUNUTE_MS29 OR SC_OvlCentrovacky.IdleTime.Q THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[400]:= TRUE;
				P4_PoruchaST1:= TRUE;
			END_IF
		
		
		20:
			SC_OvlCentrovacky.StepName:= '20 - Zasunutie centrovacky';
			SC_OvlCentrovacky.IdleTime.PT:= T#3s;
			SC_OvlCentrovacky.AlarmTime.PT:= T#3s;
						
			IF P4_FunkcnyTestA.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P4_FunkcnyTestA.OUT.VysunCentrovanie_YV183:= FALSE;
				P4_FunkcnyTestA.OUT.ZasunCentrovanie_YV184:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
			IF P4_FunkcnyTestA.IN.Centrovanie_ZASUNUTE_MS27 OR SC_OvlCentrovacky.IdleTime.Q THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[401]:= TRUE;
				P4_PoruchaST1:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

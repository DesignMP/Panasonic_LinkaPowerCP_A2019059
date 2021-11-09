
ACTION OvlCentrovacky: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlCentrovacky);
	
	
	CASE SC_OvlCentrovacky.Step OF
		
		0:
			SC_OvlCentrovacky.StepName:= '0 - Nulovanie';
			Centrovacku_VYSUN:= FALSE;
			Centrovacku_ZASUN:= FALSE;
			P3_LeakageTestA.OUT.VysunCentrovanie_YV143:= FALSE;
			P3_LeakageTestA.OUT.ZasunCentrovanie_YV144:= FALSE;
								
			IF SC_P3_LeakageTestA.Step <> 0 THEN
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
			SC_OvlCentrovacky.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestA.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P3_LeakageTestA.OUT.ZasunCentrovanie_YV144:= FALSE;
				P3_LeakageTestA.OUT.VysunCentrovanie_YV143:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
            IF P3_LeakageTestA.IN.Centrovanie_VYSUNUTE_IS71 THEN
                SC_OvlCentrovacky.IdleTime.IN:= TRUE;
            END_IF    
            
            
			IF SC_OvlCentrovacky.IdleTime.Q THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[302]:= TRUE;
				P3_PoruchaST2:= TRUE;
			END_IF
		
		
		20:
			SC_OvlCentrovacky.StepName:= '20 - Zasunutie centrovacky';
			SC_OvlCentrovacky.IdleTime.PT:= T#3s;
			SC_OvlCentrovacky.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestA.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P3_LeakageTestA.OUT.VysunCentrovanie_YV143:= FALSE;
				P3_LeakageTestA.OUT.ZasunCentrovanie_YV144:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestA.IN.Centrovanie_ZASUNUTE_IS72 OR SC_OvlCentrovacky.IdleTime.Q THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[303]:= TRUE;
				P3_PoruchaST2:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

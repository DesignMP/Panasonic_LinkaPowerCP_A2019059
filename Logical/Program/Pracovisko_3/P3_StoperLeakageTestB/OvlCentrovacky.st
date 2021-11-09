
ACTION OvlCentrovacky: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlCentrovacky);
	
	
	CASE SC_OvlCentrovacky.Step OF
		
		0:
			SC_OvlCentrovacky.StepName:= '0 - Nulovanie';
			Centrovacku_VYSUN:= FALSE;
			Centrovacku_ZASUN:= FALSE;
			P3_LeakageTestB.OUT.VysunCentrovanie_YV147:= FALSE;
			P3_LeakageTestB.OUT.ZasunCentrovanie_YV148:= FALSE;
								
			IF SC_P3_LeakageTestB.Step <> 0 THEN
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
						
			IF P3_LeakageTestB.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
            
            
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P3_LeakageTestB.OUT.ZasunCentrovanie_YV148:= FALSE;
				P3_LeakageTestB.OUT.VysunCentrovanie_YV147:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
            IF P3_LeakageTestB.IN.Centrovanie_VYSUNUTE_IS73 THEN
                SC_OvlCentrovacky.IdleTime.IN:= TRUE;
            END_IF    
            
			IF SC_OvlCentrovacky.IdleTime.Q THEN
			    SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[304]:= TRUE;
				P3_PoruchaST3:= TRUE;
			END_IF
		
		
		20:
			SC_OvlCentrovacky.StepName:= '20 - Zasunutie centrovacky';
			SC_OvlCentrovacky.IdleTime.PT:= T#3s;
			SC_OvlCentrovacky.AlarmTime.PT:= T#30s;
						
			IF P3_LeakageTestB.Automat THEN
				SC_OvlCentrovacky.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlCentrovacky.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlCentrovacky.Switch1 THEN
				P3_LeakageTestB.OUT.VysunCentrovanie_YV147:= FALSE;
				P3_LeakageTestB.OUT.ZasunCentrovanie_YV148:= TRUE;
				SC_OvlCentrovacky.Switch1:= TRUE;
			END_IF	
			
			IF P3_LeakageTestB.IN.Centrovanie_ZASUNUTE_IS74 OR SC_OvlCentrovacky.IdleTime.Q THEN
				SC_OvlCentrovacky.ResetStep:= TRUE;
				SC_OvlCentrovacky.Step:= 0;
			ELSIF SC_OvlCentrovacky.AlarmTime.Q THEN
				P34_Alarmy[305]:= TRUE;
				P3_PoruchaST3:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

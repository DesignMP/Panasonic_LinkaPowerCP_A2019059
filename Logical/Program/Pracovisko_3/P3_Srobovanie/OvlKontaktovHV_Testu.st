
ACTION OvlKontaktovHV_Testu: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlKontaktovHV_Testu);
	
	
	CASE SC_OvlKontaktovHV_Testu.Step OF
		
		0:
			SC_OvlKontaktovHV_Testu.StepName:= '0 - Nulovanie';
			Kontakty_VYSUN:= FALSE;
			Kontakty_ZASUN:= FALSE;
//			P3_Srobovanie.OUT.HVTest_Kontakty_VYSUN_YV154:= FALSE;
//			P3_Srobovanie.OUT.HVTest_Kontakty_ZASUN_YV153:= FALSE;
								
			IF SC_P3_Srobovanie.Step <> 0 THEN
				SC_OvlKontaktovHV_Testu.ResetStep:= TRUE;
				SC_OvlKontaktovHV_Testu.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlKontaktovHV_Testu.StepName:= '1 - Rozhodnutie o cinnosti';
			IF Kontakty_VYSUN THEN
				SC_OvlKontaktovHV_Testu.Step:= 10;
			ELSIF Kontakty_ZASUN THEN
				SC_OvlKontaktovHV_Testu.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlKontaktovHV_Testu.StepName:= '10 - Vysunutie kontaktov HV testu';
			SC_OvlKontaktovHV_Testu.IdleTime.PT:= T#3s;
			SC_OvlKontaktovHV_Testu.AlarmTime.PT:= T#20s;
						
			IF P3_Srobovanie.Automat THEN
				SC_OvlKontaktovHV_Testu.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlKontaktovHV_Testu.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlKontaktovHV_Testu.Switch1 THEN
				P3_Srobovanie.OUT.HVTest_Kontakty_ZASUN_YV153:= FALSE;
				P3_Srobovanie.OUT.HVTest_Kontakty_VYSUN_YV154:= TRUE;
				SC_OvlKontaktovHV_Testu.Switch1:= TRUE;
			END_IF	
			
			IF P3_Srobovanie.IN.HVTest_Kontakty_VYSUNUTE_MS45 OR SC_OvlKontaktovHV_Testu.IdleTime.Q THEN
				SC_OvlKontaktovHV_Testu.ResetStep:= TRUE;
				SC_OvlKontaktovHV_Testu.Step:= 0;
			ELSIF SC_OvlKontaktovHV_Testu.AlarmTime.Q THEN
				P34_Alarmy[316]:= TRUE;
				P3_PoruchaST1:= TRUE;
			END_IF
		
		
		20:
			SC_OvlKontaktovHV_Testu.StepName:= '20 - Zasunutie kontaktov HV testu';
			SC_OvlKontaktovHV_Testu.IdleTime.PT:= T#3s;
			SC_OvlKontaktovHV_Testu.AlarmTime.PT:= T#20s;
						
			IF P3_Srobovanie.Automat THEN
				SC_OvlKontaktovHV_Testu.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlKontaktovHV_Testu.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlKontaktovHV_Testu.Switch1 THEN
				P3_Srobovanie.OUT.HVTest_Kontakty_VYSUN_YV154:= FALSE;
				P3_Srobovanie.OUT.HVTest_Kontakty_ZASUN_YV153:= TRUE;
				SC_OvlKontaktovHV_Testu.Switch1:= TRUE;
			END_IF	
			
			IF P3_Srobovanie.IN.HVTest_Kontakty_ZASUNUTE_MS44 OR SC_OvlKontaktovHV_Testu.IdleTime.Q THEN
				SC_OvlKontaktovHV_Testu.ResetStep:= TRUE;
				SC_OvlKontaktovHV_Testu.Step:= 0;
			ELSIF SC_OvlKontaktovHV_Testu.AlarmTime.Q THEN
				P34_Alarmy[317]:= TRUE;
				P3_PoruchaST1:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION


ACTION OvlZdvihuHV_Testu: 

	
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_OvlZdvihuHV_Testu);
	
	
	CASE SC_OvlZdvihuHV_Testu.Step OF
		
		0:
			SC_OvlZdvihuHV_Testu.StepName:= '0 - Nulovanie';
			HV_Test_VYSUN:= FALSE;
			HV_Test_ZASUN:= FALSE;
//			P3_Srobovanie.OUT.HVTest_VYSUN_YV150:= FALSE;
//			P3_Srobovanie.OUT.HVTest_ZASUN_YV149:= FALSE;
								
			IF SC_P3_Srobovanie.Step <> 0 THEN
				SC_OvlZdvihuHV_Testu.ResetStep:= TRUE;
				SC_OvlZdvihuHV_Testu.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlZdvihuHV_Testu.StepName:= '1 - Rozhodnutie o cinnosti';
			IF HV_Test_VYSUN THEN
				SC_OvlZdvihuHV_Testu.Step:= 10;
			ELSIF HV_Test_ZASUN THEN
				SC_OvlZdvihuHV_Testu.Step:= 20;
			END_IF
	
		
		10:
			SC_OvlZdvihuHV_Testu.StepName:= '10 - Vysunutie HV testu';
			SC_OvlZdvihuHV_Testu.IdleTime.PT:= T#3s;
			SC_OvlZdvihuHV_Testu.AlarmTime.PT:= T#10s;
						
			IF P3_Srobovanie.Automat THEN
				SC_OvlZdvihuHV_Testu.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlZdvihuHV_Testu.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlZdvihuHV_Testu.Switch1 THEN
				P3_Srobovanie.OUT.HVTest_ZASUN_YV149:= FALSE;
				P3_Srobovanie.OUT.HVTest_VYSUN_YV150:= TRUE;
				SC_OvlZdvihuHV_Testu.Switch1:= TRUE;
			END_IF	
			
			IF P3_Srobovanie.IN.HVTest_VYSUNUTY_MS50 OR SC_OvlZdvihuHV_Testu.IdleTime.Q THEN
				SC_OvlZdvihuHV_Testu.ResetStep:= TRUE;
				SC_OvlZdvihuHV_Testu.Step:= 0;
			ELSIF SC_OvlZdvihuHV_Testu.AlarmTime.Q THEN
				P34_Alarmy[318]:= TRUE;
				P3_PoruchaST1:= TRUE;
			END_IF
		
		
		20:
			SC_OvlZdvihuHV_Testu.StepName:= '20 - Zasunutie HV testu';
			SC_OvlZdvihuHV_Testu.IdleTime.PT:= T#3s;
			SC_OvlZdvihuHV_Testu.AlarmTime.PT:= T#10s;
						
			IF P3_Srobovanie.Automat THEN
				SC_OvlZdvihuHV_Testu.AlarmTime.IN:= TRUE;
			ELSE
				SC_OvlZdvihuHV_Testu.IdleTime.IN:= TRUE;
			END_IF	
			
			IF NOT SC_OvlZdvihuHV_Testu.Switch1 THEN
				P3_Srobovanie.OUT.HVTest_VYSUN_YV150:= FALSE;
				P3_Srobovanie.OUT.HVTest_ZASUN_YV149:= TRUE;
				SC_OvlZdvihuHV_Testu.Switch1:= TRUE;
			END_IF	
			
			IF P3_Srobovanie.IN.HVTest_ZASUNUTY_MS51 OR SC_OvlZdvihuHV_Testu.IdleTime.Q THEN
				SC_OvlZdvihuHV_Testu.ResetStep:= TRUE;
				SC_OvlZdvihuHV_Testu.Step:= 0;
			ELSIF SC_OvlZdvihuHV_Testu.AlarmTime.Q THEN
				P34_Alarmy[319]:= TRUE;
				P3_PoruchaST1:= TRUE;
			END_IF
		
		
		
		
	END_CASE
	
END_ACTION

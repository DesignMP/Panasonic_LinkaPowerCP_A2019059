
ACTION ProfinetKomunikaciaKAM8: 


	CAM8.STAV.READY;
	
	//Vstupy pre kameru//
	CAM8.Profinet_PLC_OUTPUTS[0].0:= CAM8.CMD.Triger;
	
	//V�stupy z kamery//
	CAM8.STAV.SWITCH:= CAM8.Profinet_PLC_INPUTS[10].0;
	
	
	//V�sledky kamery//
	CAM8.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK:= CAM8.Profinet_PLC_INPUTS[0].0;
	
	//Pre��tan� QR k�d DPS//
	IF EDGE(CAM8.STAV.SWITCH) THEN
		brsstrcpy(ADR(CAM8.RESULT.PowerCP.PrecitanyQRkod_PowerCP),ADR(CAM8.Profinet_QRkod_Znaky));    	
	END_IF
	
	//Stav v�sledky READY//
	IF EDGE(CAM8.STAV.SWITCH)THEN
		CAM8.STAV.Results_READY:= TRUE;
	END_IF
	
END_ACTION

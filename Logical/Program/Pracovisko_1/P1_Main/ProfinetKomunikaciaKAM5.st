
ACTION ProfinetKomunikaciaKAM5: 

	CAM5.STAV.READY;
	
	//Vstupy pre kameru//
	CAM5.Profinet_PLC_OUTPUTS[0].0:= CAM5.CMD.Triger;
	
	//V�stupy z kamery//
	CAM5.STAV.SWITCH:= CAM5.Profinet_PLC_INPUTS[10].0;
	
	
	//V�sledky kamery//
	CAM5.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK:= CAM5.Profinet_PLC_INPUTS[0].0;
	
	//Pre��tan� QR k�d DPS//
	IF EDGE(CAM5.STAV.SWITCH) THEN
		brsstrcpy(ADR(CAM5.RESULT.PowerCP.PrecitanyQRkod_PowerCP),ADR(CAM5.Profinet_QRkod_Znaky));    	
	END_IF
	
	//Stav v�sledky READY//
	IF EDGE(CAM5.STAV.SWITCH)THEN
		CAM5.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
	
END_ACTION

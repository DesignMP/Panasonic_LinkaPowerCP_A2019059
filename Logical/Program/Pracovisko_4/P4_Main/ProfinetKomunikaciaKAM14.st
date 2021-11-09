
ACTION ProfinetKomunikaciaKAM14: 

	CAM14.STAV.READY;
	
	//Vstupy pre kameru//
	CAM14.Profinet_PLC_OUTPUTS[0].0:= CAM14.CMD.Triger;
	
	//Výstupy z kamery//
	CAM14.STAV.SWITCH:= CAM14.Profinet_PLC_INPUTS[10].0;
	
	
	//Výsledky kamery//
	CAM14.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK:= CAM14.Profinet_PLC_INPUTS[4].0;
	
	//Preèítaný QR kód DPS//
	IF EDGE(CAM14.STAV.SWITCH) THEN
		brsstrcpy(ADR(CAM14.RESULT.PowerCP.PrecitanyQRkod_PowerCP),ADR(CAM14.Profinet_QRkod_Znaky));    	
	END_IF
	
	//Stav výsledky READY//
	IF EDGE(CAM14.STAV.SWITCH)THEN
		CAM14.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

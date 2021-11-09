
ACTION ProfinetKomunikaciaKAM15: 

	//Vstupy pre kameru//
	CAM15.Profinet_PLC_OUTPUTS[0].3:= CAM15.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM15.STAV.READY:= CAM15.Profinet_PLC_INPUTS[0].0;
	CAM15.STAV.SWITCH:= CAM15.Profinet_PLC_INPUTS[0].1;
    CAM15.STAV.BUSY:= CAM15.Profinet_PLC_INPUTS[0].2;
    CAM15.STAV.Command_AKCEPTOVANY:= CAM15.Profinet_PLC_INPUTS[0].3;
    CAM15.STAV.Command_READY:= CAM15.Profinet_PLC_INPUTS[0].4;
    CAM15.STAV.Command_ERROR:= CAM15.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	
	
	//Výsledky kamery//
	CAM15.RESULT.CitanieQRkodu_Etikety_OK:= CAM15.Profinet_PLC_INPUTS[2].0;
	CAM15.RESULT.Pritomn_Etikety:= CAM15.Profinet_PLC_INPUTS[2].1;
	CAM15.RESULT.Pritomn_LogoBMV:= CAM15.Profinet_PLC_INPUTS[2].2;
	CAM15.RESULT.Pritomn_Textu_PowerCP:= CAM15.Profinet_PLC_INPUTS[2].3;
	CAM15.RESULT.Pritomn_Textu_Panasonic:= CAM15.Profinet_PLC_INPUTS[2].4;
	CAM15.RESULT.Pritomn_Textu_SK:= CAM15.Profinet_PLC_INPUTS[2].5;
	
	
	//Preèítaný QR kód etikety a OCR etikety//
	IF EDGE(CAM15.STAV.SWITCH) THEN
		brsstrcpy(ADR(CAM15.RESULT.PrecitanyQRkod_Etikety),ADR(CAM15.Profinet_QRkod_Znaky));   
		brsstrcpy(ADR(CAM15.RESULT.PrecitaneOCR_Etikety),ADR(CAM15.Profinet_OCR_Znaky));
	END_IF
	
	//Stav výsledky READY//
	IF EDGE(CAM15.STAV.SWITCH)THEN
		CAM15.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

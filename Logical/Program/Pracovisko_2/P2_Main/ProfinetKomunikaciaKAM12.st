
ACTION ProfinetKomunikaciaKAM12: 

	//Vstupy pre kameru//
	CAM12.Profinet_PLC_OUTPUTS[0].3:= CAM12.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM12.STAV.READY:= CAM12.Profinet_PLC_INPUTS[0].0;
	CAM12.STAV.SWITCH:= CAM12.Profinet_PLC_INPUTS[0].1;
    CAM12.STAV.BUSY:= CAM12.Profinet_PLC_INPUTS[0].2;
    CAM12.STAV.Command_AKCEPTOVANY:= CAM12.Profinet_PLC_INPUTS[0].3;
    CAM12.STAV.Command_READY:= CAM12.Profinet_PLC_INPUTS[0].4;
    CAM12.STAV.Command_ERROR:= CAM12.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM12.RESULT.Paletka.Pritomn_TopCover_5H5F:= CAM12.Profinet_PLC_INPUTS[2].0;
	CAM12.RESULT.Paletka.Pritomn_TopCover_4F:= CAM12.Profinet_PLC_INPUTS[2].1;
	CAM12.RESULT.Paletka.Pritomn_PravyMVcase:= CAM12.Profinet_PLC_INPUTS[2].2;
	CAM12.RESULT.Paletka.Pritomn_LavyMVcase:= CAM12.Profinet_PLC_INPUTS[2].3;
	
	//Stav výsledky READY//
	IF EDGE(CAM12.STAV.SWITCH)THEN
		CAM12.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

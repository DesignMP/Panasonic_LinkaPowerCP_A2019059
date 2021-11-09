
ACTION ProfinetKomunikaciaKAM13: 

	//Vstupy pre kameru//
	CAM13.Profinet_PLC_OUTPUTS[0].3:= CAM13.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM13.STAV.READY:= CAM13.Profinet_PLC_INPUTS[0].0;
	CAM13.STAV.SWITCH:= CAM13.Profinet_PLC_INPUTS[0].1;
    CAM13.STAV.BUSY:= CAM13.Profinet_PLC_INPUTS[0].2;
    CAM13.STAV.Command_AKCEPTOVANY:= CAM13.Profinet_PLC_INPUTS[0].3;
    CAM13.STAV.Command_READY:= CAM13.Profinet_PLC_INPUTS[0].4;
    CAM13.STAV.Command_ERROR:= CAM13.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM13.RESULT.Pritomn_SkrutkyK40_TopCover_4F5F:= CAM13.Profinet_PLC_INPUTS[2].0;
	CAM13.RESULT.Pritomn_SkrutkyM5_TopCover:= CAM13.Profinet_PLC_INPUTS[2].1;
	
	//Stav výsledky READY//
	IF EDGE(CAM13.STAV.SWITCH)THEN
		CAM13.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
	
END_ACTION

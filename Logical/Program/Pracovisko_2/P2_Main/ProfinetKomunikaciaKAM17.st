
ACTION ProfinetKomunikaciaKAM17: 

	//Vstupy pre kameru//
	CAM17.Profinet_PLC_OUTPUTS[0].3:= CAM17.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM17.STAV.READY:= CAM17.Profinet_PLC_INPUTS[0].0;
	CAM17.STAV.SWITCH:= CAM17.Profinet_PLC_INPUTS[0].1;
    CAM17.STAV.BUSY:= CAM17.Profinet_PLC_INPUTS[0].2;
    CAM17.STAV.Command_AKCEPTOVANY:= CAM17.Profinet_PLC_INPUTS[0].3;
    CAM17.STAV.Command_READY:= CAM17.Profinet_PLC_INPUTS[0].4;
    CAM17.STAV.Command_ERROR:= CAM17.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM17.RESULT.Paletka.Pritomn_TopCoveru_4F:= CAM17.Profinet_PLC_INPUTS[2].0;
	CAM17.RESULT.Paletka.Pritomn_TopCoveru_5F:= CAM17.Profinet_PLC_INPUTS[2].1;
	CAM17.RESULT.Paletka.Pritomn_TopCoveru_5H:= CAM17.Profinet_PLC_INPUTS[2].2;
	CAM17.RESULT.Paletka.Pritomn_Busbary_5H:= CAM17.Profinet_PLC_INPUTS[2].3;
	CAM17.RESULT.Paletka.Pritomn_Busbary_5F:= CAM17.Profinet_PLC_INPUTS[2].4;
	CAM17.RESULT.Paletka.Pritomn_Busbary_4F:= CAM17.Profinet_PLC_INPUTS[2].5;
	CAM17.RESULT.Paletka.Pritomn_LavyMVcase:= CAM17.Profinet_PLC_INPUTS[2].6;
	CAM17.RESULT.Paletka.Pritomn_PravyMVcase:= CAM17.Profinet_PLC_INPUTS[2].7;
	
	CAM17.RESULT.Paletka.Pritomn_PowerCP_4F:= CAM17.Profinet_PLC_INPUTS[3].0;
	CAM17.RESULT.Paletka.Pritomn_PowerCP_5F:= CAM17.Profinet_PLC_INPUTS[3].1;
	CAM17.RESULT.Paletka.Pritomn_PowerCP_5H:= CAM17.Profinet_PLC_INPUTS[3].2;
	CAM17.RESULT.Paletka.PoziciaBusbarov4F5F_OK:= CAM17.Profinet_PLC_INPUTS[3].4;
	CAM17.RESULT.Paletka.PoziciaBusbarov5H_OK:= CAM17.Profinet_PLC_INPUTS[3].5;
	
	//Stav výsledky READY//
	IF EDGE(CAM17.STAV.SWITCH)THEN
		CAM17.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

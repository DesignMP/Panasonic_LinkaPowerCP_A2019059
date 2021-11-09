
ACTION ProfinetKomunikaciaKAM16: 

	//Vstupy pre kameru//
	CAM16.Profinet_PLC_OUTPUTS[0].3:= CAM16.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM16.STAV.READY:= CAM16.Profinet_PLC_INPUTS[0].0;
	CAM16.STAV.SWITCH:= CAM16.Profinet_PLC_INPUTS[0].1;
    CAM16.STAV.BUSY:= CAM16.Profinet_PLC_INPUTS[0].2;
    CAM16.STAV.Command_AKCEPTOVANY:= CAM16.Profinet_PLC_INPUTS[0].3;
    CAM16.STAV.Command_READY:= CAM16.Profinet_PLC_INPUTS[0].4;
    CAM16.STAV.Command_ERROR:= CAM16.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM16.RESULT.Paletka.Pritomn_Busbarov_4F:= CAM16.Profinet_PLC_INPUTS[2].0;
	CAM16.RESULT.Paletka.Pritomn_Busbarov_5F:= CAM16.Profinet_PLC_INPUTS[2].1;
	CAM16.RESULT.Paletka.Pritomn_Busbarov_5H:= CAM16.Profinet_PLC_INPUTS[2].2;
	CAM16.RESULT.Paletka.Pritomn_LavyMVcase:= CAM16.Profinet_PLC_INPUTS[2].3;
	CAM16.RESULT.Paletka.Pritomn_PravyMVcase:= CAM16.Profinet_PLC_INPUTS[2].4;
    CAM16.RESULT.Paletka.Pritomn_PowerCP:= CAM16.Profinet_PLC_INPUTS[2].5;
    CAM16.RESULT.PowerCP.PritomnostSkrutky_K40:= CAM16.Profinet_PLC_INPUTS[2].7;
    
    CAM16.RESULT.PowerCP.PritomnostSkrutky_M5:= CAM16.Profinet_PLC_INPUTS[3].0;
	
	//Stav výsledky READY//
	IF EDGE(CAM16.STAV.SWITCH)THEN
		CAM16.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

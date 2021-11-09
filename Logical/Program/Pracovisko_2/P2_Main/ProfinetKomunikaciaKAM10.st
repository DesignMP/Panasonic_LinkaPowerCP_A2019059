
ACTION ProfinetKomunikaciaKAM10: 

	//Vstupy pre kameru//
	CAM10.Profinet_PLC_OUTPUTS[0].3:= CAM10.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM10.STAV.READY:= CAM10.Profinet_PLC_INPUTS[0].0;
	CAM10.STAV.SWITCH:= CAM10.Profinet_PLC_INPUTS[0].1;
    CAM10.STAV.BUSY:= CAM10.Profinet_PLC_INPUTS[0].2;
    CAM10.STAV.Command_AKCEPTOVANY:= CAM10.Profinet_PLC_INPUTS[0].3;
    CAM10.STAV.Command_READY:= CAM10.Profinet_PLC_INPUTS[0].4;
    CAM10.STAV.Command_ERROR:= CAM10.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM10.RESULT.Paletka.Pritomn_Busbarov_5F:= CAM10.Profinet_PLC_INPUTS[2].0;
	CAM10.RESULT.Paletka.Pritomn_Busbarov_4F:= CAM10.Profinet_PLC_INPUTS[2].1;
	CAM10.RESULT.Paletka.Pritomn_Busbarov_5H:= CAM10.Profinet_PLC_INPUTS[2].2;
	CAM10.RESULT.Paletka.Pritomn_PowerCP_5H:= CAM10.Profinet_PLC_INPUTS[2].3;
	CAM10.RESULT.Paletka.Pritomn_PowerCP_4F:= CAM10.Profinet_PLC_INPUTS[2].4;
	CAM10.RESULT.Paletka.Pritomn_PowerCP_5F:= CAM10.Profinet_PLC_INPUTS[2].5;
	CAM10.RESULT.PowerCP.Pritomn_LavejSkrutkyM6_4F5F:= CAM10.Profinet_PLC_INPUTS[2].6;
	CAM10.RESULT.PowerCP.Pritomn_PravejSkrutkyM6_4F5F:= CAM10.Profinet_PLC_INPUTS[2].7;
	
	CAM10.RESULT.PowerCP.Pritomn_LavejM4_4F5F:= CAM10.Profinet_PLC_INPUTS[3].0;
	CAM10.RESULT.PowerCP.Pritomn_PravejM4_4F5F:= CAM10.Profinet_PLC_INPUTS[3].1;
	CAM10.RESULT.PowerCP.Pritomn_SkrutkyM4_Filtra_5H:= CAM10.Profinet_PLC_INPUTS[3].2;
	CAM10.RESULT.PowerCP.Pritomn_LavejSkrutkyM5_5H:= CAM10.Profinet_PLC_INPUTS[3].3;
	CAM10.RESULT.PowerCP.Pritomn_PravejSkrutkyM5_5H:= CAM10.Profinet_PLC_INPUTS[3].4;
	
	//Stav výsledky READY//
	IF EDGE(CAM10.STAV.SWITCH)THEN
		CAM10.STAV.Results_READY:= TRUE;
	END_IF
	
END_ACTION


ACTION ProfinetKomunikaciaKAM6: 

	//Vstupy pre kameru//
	CAM6.Profinet_PLC_OUTPUTS[0].3:= CAM6.CMD.Triger;
	
	//Výstupy z kamery//
	CAM6.STAV.READY:= CAM6.Profinet_PLC_INPUTS[0].0;
	CAM6.STAV.SWITCH:= CAM6.Profinet_PLC_INPUTS[0].1;
    CAM6.STAV.BUSY:= CAM6.Profinet_PLC_INPUTS[0].2;
    CAM6.STAV.Command_AKCEPTOVANY:= CAM6.Profinet_PLC_INPUTS[0].3;
    CAM6.STAV.Command_READY:= CAM6.Profinet_PLC_INPUTS[0].4;
    CAM6.STAV.Command_ERROR:= CAM6.Profinet_PLC_INPUTS[0].5;
	
	
	//Výsledky kamery//
	CAM6.RESULT.Paletka.Pritom_SpodnychBusbarov_5H:= CAM6.Profinet_PLC_INPUTS[2].0;
	CAM6.RESULT.Paletka.Pritom_KrytuBusbarov_5H:= CAM6.Profinet_PLC_INPUTS[2].1;
	CAM6.RESULT.PowerCP.Nepritom_LavyFoam_4F5F:= CAM6.Profinet_PLC_INPUTS[2].2;
	CAM6.RESULT.PowerCP.Nepritom_PravyFoam_4F5F:= CAM6.Profinet_PLC_INPUTS[2].3;
	CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_5F:= CAM6.Profinet_PLC_INPUTS[2].4;
	CAM6.RESULT.Paletka.Pritom_SpodnyBusbar_4F:= CAM6.Profinet_PLC_INPUTS[2].5;
	CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyK30:= CAM6.Profinet_PLC_INPUTS[2].6;
	CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyK30:= CAM6.Profinet_PLC_INPUTS[2].7;
	
	CAM6.RESULT.PowerCP.Pritom_SkrutkyDPS_4F5F:= CAM6.Profinet_PLC_INPUTS[3].0;
	CAM6.RESULT.PowerCP.Nepritom_ZadnejSkrutkyM4_4F:= CAM6.Profinet_PLC_INPUTS[3].1;
	CAM6.RESULT.PowerCP.Nepritom_ZadnejSkrutkyM4_5F:= CAM6.Profinet_PLC_INPUTS[3].2;
	CAM6.RESULT.PowerCP.Nepritom_PrednejSkrutkyM4_4F:= CAM6.Profinet_PLC_INPUTS[3].3;
	CAM6.RESULT.PowerCP.Nepritom_PrednejSkrutkyM4_5F:= CAM6.Profinet_PLC_INPUTS[3].4;
	CAM6.RESULT.PowerCP.Pritom_StrednejSkrutkyM5_5H:= CAM6.Profinet_PLC_INPUTS[3].5;
	CAM6.RESULT.PowerCP.Pritom_LavejSkrutkyM5_5H:= CAM6.Profinet_PLC_INPUTS[3].6;
	CAM6.RESULT.PowerCP.Pritom_PravejSkrutkyM5_5H:= CAM6.Profinet_PLC_INPUTS[3].7;
	
	CAM6.RESULT.Paletka.Pritom_LavyFoam_4F5F:= CAM6.Profinet_PLC_INPUTS[4].0;
	CAM6.RESULT.Paletka.Pritom_PravyFoam_4F5F:= CAM6.Profinet_PLC_INPUTS[4].1;
	
	//Stav výsledky READY//
	IF EDGE(CAM6.STAV.SWITCH)THEN
		CAM6.STAV.Results_READY:= TRUE;
	END_IF
	
END_ACTION

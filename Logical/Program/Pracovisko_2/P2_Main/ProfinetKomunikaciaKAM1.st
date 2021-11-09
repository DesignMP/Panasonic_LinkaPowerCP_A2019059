
ACTION ProfinetKomunikaciaKAM1: 

	
	//Vstupy pre kameru//
	CAM1.Profinet_PLC_OUTPUTS[0].3:= CAM1.CMD.Triger;
	
	
	//Výstupy z kamery//
	CAM1.STAV.READY:= CAM1.Profinet_PLC_INPUTS[0].0;
	CAM1.STAV.SWITCH:= CAM1.Profinet_PLC_INPUTS[0].1;
    CAM1.STAV.BUSY:= CAM1.Profinet_PLC_INPUTS[0].2;
    CAM1.STAV.Command_AKCEPTOVANY:= CAM1.Profinet_PLC_INPUTS[0].3;
    CAM1.STAV.Command_READY:= CAM1.Profinet_PLC_INPUTS[0].4;
    CAM1.STAV.Command_ERROR:= CAM1.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM1.RESULT.ZalozenieTesnenia_OK:= CAM1.Profinet_PLC_INPUTS[2].0;
	CAM1.RESULT.PritomnTesnenia_OK:= CAM1.Profinet_PLC_INPUTS[2].1;
	CAM1.RESULT.PritomnPowerCP_5H5F:= CAM1.Profinet_PLC_INPUTS[2].2;
	CAM1.RESULT.PritomnPowerCP_4F:= CAM1.Profinet_PLC_INPUTS[2].3;
	
	///Stav výsledky READY//
	IF EDGE(CAM1.STAV.SWITCH)THEN
		CAM1.STAV.Results_READY:= TRUE;
	END_IF
		
END_ACTION

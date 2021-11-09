
ACTION ProfinetKomunikaciaKAM4: 

	//Vstupy pre kameru//
	CAM4.Profinet_PLC_OUTPUTS[0].3:= CAM4.CMD.Triger;
	
	//Výstupy z kamery//
	CAM4.STAV.READY:= CAM4.Profinet_PLC_INPUTS[0].0;
	CAM4.STAV.SWITCH:= CAM4.Profinet_PLC_INPUTS[0].1;
    CAM4.STAV.BUSY:= CAM4.Profinet_PLC_INPUTS[0].2;
    CAM4.STAV.Command_AKCEPTOVANY:= CAM4.Profinet_PLC_INPUTS[0].3;
    CAM4.STAV.Command_READY:= CAM4.Profinet_PLC_INPUTS[0].4;
    CAM4.STAV.Command_ERROR:= CAM4.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM4.RESULT.Paletka.Pritomn_Pinu1_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].0;  
	CAM4.RESULT.Paletka.Pritomn_Pinu2_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].1;
	CAM4.RESULT.Paletka.Pritomn_Pinu3_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].2;
	CAM4.RESULT.Paletka.Pritomn_Pinu4_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].3;
	CAM4.RESULT.Paletka.Pritomn_Pinu5_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].4;
	CAM4.RESULT.Paletka.Pritomn_Pinu6_KrytDPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].5;
	CAM4.RESULT.Paletka.Pritom_DPS_4F5F:= CAM4.Profinet_PLC_INPUTS[2].6;
	
	//Stav výsledky READY//
	IF EDGE(CAM4.STAV.SWITCH)THEN
		CAM4.STAV.Results_READY:= TRUE;
	END_IF
	
END_ACTION

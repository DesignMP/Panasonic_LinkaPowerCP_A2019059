
ACTION ProfinetKomunikaciaKAM2: 

	//Vstupy pre kameru//
	CAM2.Profinet_PLC_OUTPUTS[0].3:= CAM2.CMD.Triger;
	
	//Výstupy z kamery//
	CAM2.STAV.READY:= CAM2.Profinet_PLC_INPUTS[0].0;
	CAM2.STAV.SWITCH:= CAM2.Profinet_PLC_INPUTS[0].1;
    CAM2.STAV.BUSY:= CAM2.Profinet_PLC_INPUTS[0].2;
    CAM2.STAV.Command_AKCEPTOVANY:= CAM2.Profinet_PLC_INPUTS[0].3;
    CAM2.STAV.Command_READY:= CAM2.Profinet_PLC_INPUTS[0].4;
    CAM2.STAV.Command_ERROR:= CAM2.Profinet_PLC_INPUTS[0].5;
	
	//Výsledky kamery//
	CAM2.RESULT.Paletka.Pritom_PowerCP_5F:= CAM2.Profinet_PLC_INPUTS[2].0;
	CAM2.RESULT.Paletka.Pritom_PowerCP_4F:= CAM2.Profinet_PLC_INPUTS[2].1;
	CAM2.RESULT.Paletka.Pritom_PowerCP_5H:= CAM2.Profinet_PLC_INPUTS[2].2;
	CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyLavy_5H:= CAM2.Profinet_PLC_INPUTS[2].3;
	CAM2.RESULT.Paletka.Pritom_Busbar_SpodnyPravy_5H:= CAM2.Profinet_PLC_INPUTS[2].4;
	CAM2.RESULT.Paletka.Pritom_KrytuBusbarov_5H:= CAM2.Profinet_PLC_INPUTS[2].5;
	CAM2.RESULT.Paletka.Pritom_DPS_4F5F:= CAM2.Profinet_PLC_INPUTS[2].6;
	CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_5F:= CAM2.Profinet_PLC_INPUTS[2].7;
	
	CAM2.RESULT.Paletka.Pritom_Busbaru_Spodny_4F:= CAM2.Profinet_PLC_INPUTS[3].0;
	CAM2.RESULT.Paletka.Pritom_Foamu_4F5F:= CAM2.Profinet_PLC_INPUTS[3].1;
	CAM2.RESULT.Paletka.Pritomn_Skeletonu_4F5F:= CAM2.Profinet_PLC_INPUTS[3].2;
	CAM2.RESULT.Paletka.Pritomn_Skeletonu_5H:= CAM2.Profinet_PLC_INPUTS[3].3;
	CAM2.RESULT.Paletka.Pritomn_LavyMVcase:= CAM2.Profinet_PLC_INPUTS[3].4;
	CAM2.RESULT.Paletka.Pritomn_PravyMVcase:= CAM2.Profinet_PLC_INPUTS[3].5;
	CAM2.RESULT.Paletka.Nepritomn_TopCoveru_4F:= CAM2.Profinet_PLC_INPUTS[3].6;
	CAM2.RESULT.Paletka.Nepritomn_TopCoveru_5F5H:= CAM2.Profinet_PLC_INPUTS[3].7;
	
	CAM2.RESULT.Paletka.OsadeniePlastuDPS_OK:= CAM2.Profinet_PLC_INPUTS[4].0;
	CAM2.RESULT.Paletka.KompletSpodneBusbary_OK:= CAM2.Profinet_PLC_INPUTS[4].1;
	
	//Stav výsledky READY//
	IF EDGE(CAM2.STAV.SWITCH)THEN
		CAM2.STAV.Results_READY:= TRUE;
	END_IF
	
	
	
END_ACTION

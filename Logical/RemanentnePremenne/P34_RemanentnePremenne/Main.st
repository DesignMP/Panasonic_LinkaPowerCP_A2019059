
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
			
	P34_RemPremenne;			
	//Naèítanie premenných pri prvom spustení//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P34_NacitajPremenne:= TRUE;
	END_IF
	
	//Naèítanie premenných z pamäte//
	IF P34_NacitajPremenne THEN
		MpRecipeXml_P34.Load:= TRUE;
		P34_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P34.Load AND (MpRecipeXml_P34.CommandDone OR MpRecipeXml_P34.Error) THEN
		MpRecipeXml_P34.Load:= FALSE;
	END_IF	
	
	//Konfigurácia premenných//
	MpRecipeXml_P34.MpLink:= ADR(gRemPremenneP34);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P34.Enable:= TRUE;
	MpRecipeXml_P34.Category:= ADR('PREMENNE_P34');
	MpRecipeXml_P34.DeviceName:= ADR('HDD_RemPremenneP34');  //Názov media, kde sa budú receptury ukladat//
	MpRecipeXml_P34.FileName:= ADR('RemPremenneP34'); //Názov súboru do ktorého sa receptúry uložia//
	MpRecipeXml_P34();
	
	MpRecipeRegPar_P34.MpLink:= ADR(gRemPremenneP34);
	MpRecipeRegPar_P34.Enable:= TRUE;
	MpRecipeRegPar_P34.Category:= ADR('PREMENNE_P34');
	MpRecipeRegPar_P34.PVName:= ADR('P34_RemPremenne'); //Názov premenné, kde je vytvorená štruktura dat premennych//
	MpRecipeRegPar_P34();

	
	
	//Uloženie premenných//
	IF P34_UlozPremenne THEN
		MpRecipeXml_P34.Save:= TRUE;
		P34_UlozPremenne:= FALSE;
	END_IF
	
	IF MpRecipeXml_P34.Save AND (MpRecipeXml_P34.CommandDone OR MpRecipeXml_P34.Error) THEN
		MpRecipeXml_P34.Save:= FALSE;
	END_IF	
		
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


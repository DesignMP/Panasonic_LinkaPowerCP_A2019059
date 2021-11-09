
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
		
	P1_RemPremenne;
	
	//Naèítanie premenných pri prvom spustení//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P1_NacitajPremenne:= TRUE;
	END_IF
	
	//Naèítanie premenných z pamäte//
	IF P1_NacitajPremenne THEN
		MpRecipeXml_P1.Load:= TRUE;
		P1_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P1.Load AND (MpRecipeXml_P1.CommandDone OR MpRecipeXml_P1.Error) THEN
		MpRecipeXml_P1.Load:= FALSE;
	END_IF	
	
	//Konfigurácia premenných//
	MpRecipeXml_P1.MpLink:= ADR(gRemPremenneP1);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P1.Enable:= TRUE;
	MpRecipeXml_P1.Category:= ADR('PREMENNE_P1');
	MpRecipeXml_P1.DeviceName:= ADR('HDD_RemPremenneP1');  //Názov media, kde sa budú receptury ukladat//
	MpRecipeXml_P1.FileName:= ADR('RemPremenneP1'); //Názov súboru do ktorého sa receptúry uložia//
	MpRecipeXml_P1();
	
	MpRecipeRegPar_P1.MpLink:= ADR(gRemPremenneP1);
	MpRecipeRegPar_P1.Enable:= TRUE;
	MpRecipeRegPar_P1.Category:= ADR('PREMENNE_P1');
	MpRecipeRegPar_P1.PVName:= ADR('P1_RemPremenne'); //Názov premenné, kde je vytvorená štruktura dat premennych//
	MpRecipeRegPar_P1();

	
	
	//Uloženie premenných//
	IF P1_UlozPremenne THEN
		MpRecipeXml_P1.Save:= TRUE;
		P1_UlozPremenne:= FALSE;
	END_IF
	
	IF MpRecipeXml_P1.Save AND (MpRecipeXml_P1.CommandDone OR MpRecipeXml_P1.Error) THEN
		MpRecipeXml_P1.Save:= FALSE;
	END_IF	
		
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


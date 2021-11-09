
PROGRAM _INIT
	
	
END_PROGRAM

PROGRAM _CYCLIC

	P2_RemPremenne;
			
	//Naèítanie premenných pri prvom spustení//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P2_NacitajPremenne:= TRUE;
	END_IF
	
	//Naèítanie premenných z pamäte//
	IF P2_NacitajPremenne THEN
		MpRecipeXml_P2.Load:= TRUE;
		P2_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P2.Load AND (MpRecipeXml_P2.CommandDone OR MpRecipeXml_P2.Error) THEN
		MpRecipeXml_P2.Load:= FALSE;
	END_IF	
	
	//Konfigurácia premenných//
	MpRecipeXml_P2.MpLink:= ADR(gRemPremenneP2);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P2.Enable:= TRUE;
	MpRecipeXml_P2.Category:= ADR('PREMENNE_P2');
	MpRecipeXml_P2.DeviceName:= ADR('HDD_RemPremenneP2');  //Názov media, kde sa budú receptury ukladat//
	MpRecipeXml_P2.FileName:= ADR('RemPremenneP2'); //Názov súboru do ktorého sa receptúry uložia//
	MpRecipeXml_P2();
	
	MpRecipeRegPar_P2.MpLink:= ADR(gRemPremenneP2);
	MpRecipeRegPar_P2.Enable:= TRUE;
	MpRecipeRegPar_P2.Category:= ADR('PREMENNE_P2');
	MpRecipeRegPar_P2.PVName:= ADR('P2_RemPremenne'); //Názov premenné, kde je vytvorená štruktura dat premenných//
	MpRecipeRegPar_P2();

	
	
	//Uloženie premenných//
	IF P2_UlozPremenne THEN
		MpRecipeXml_P2.Save:= TRUE;
		P2_UlozPremenne:= FALSE;
	END_IF
	
	IF MpRecipeXml_P2.Save AND (MpRecipeXml_P2.CommandDone OR MpRecipeXml_P2.Error) THEN
		MpRecipeXml_P2.Save:= FALSE;
	END_IF	
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM



PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
			
	P34_RemPremenne;			
	//Na��tanie premenn�ch pri prvom spusten�//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P34_NacitajPremenne:= TRUE;
	END_IF
	
	//Na��tanie premenn�ch z pam�te//
	IF P34_NacitajPremenne THEN
		MpRecipeXml_P34.Load:= TRUE;
		P34_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P34.Load AND (MpRecipeXml_P34.CommandDone OR MpRecipeXml_P34.Error) THEN
		MpRecipeXml_P34.Load:= FALSE;
	END_IF	
	
	//Konfigur�cia premenn�ch//
	MpRecipeXml_P34.MpLink:= ADR(gRemPremenneP34);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P34.Enable:= TRUE;
	MpRecipeXml_P34.Category:= ADR('PREMENNE_P34');
	MpRecipeXml_P34.DeviceName:= ADR('HDD_RemPremenneP34');  //N�zov media, kde sa bud� receptury ukladat//
	MpRecipeXml_P34.FileName:= ADR('RemPremenneP34'); //N�zov s�boru do ktor�ho sa recept�ry ulo�ia//
	MpRecipeXml_P34();
	
	MpRecipeRegPar_P34.MpLink:= ADR(gRemPremenneP34);
	MpRecipeRegPar_P34.Enable:= TRUE;
	MpRecipeRegPar_P34.Category:= ADR('PREMENNE_P34');
	MpRecipeRegPar_P34.PVName:= ADR('P34_RemPremenne'); //N�zov premenn�, kde je vytvoren� �truktura dat premennych//
	MpRecipeRegPar_P34();

	
	
	//Ulo�enie premenn�ch//
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


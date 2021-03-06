
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
		
	P1_RemPremenne;
	
	//Na��tanie premenn�ch pri prvom spusten�//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P1_NacitajPremenne:= TRUE;
	END_IF
	
	//Na��tanie premenn�ch z pam�te//
	IF P1_NacitajPremenne THEN
		MpRecipeXml_P1.Load:= TRUE;
		P1_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P1.Load AND (MpRecipeXml_P1.CommandDone OR MpRecipeXml_P1.Error) THEN
		MpRecipeXml_P1.Load:= FALSE;
	END_IF	
	
	//Konfigur�cia premenn�ch//
	MpRecipeXml_P1.MpLink:= ADR(gRemPremenneP1);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P1.Enable:= TRUE;
	MpRecipeXml_P1.Category:= ADR('PREMENNE_P1');
	MpRecipeXml_P1.DeviceName:= ADR('HDD_RemPremenneP1');  //N�zov media, kde sa bud� receptury ukladat//
	MpRecipeXml_P1.FileName:= ADR('RemPremenneP1'); //N�zov s�boru do ktor�ho sa recept�ry ulo�ia//
	MpRecipeXml_P1();
	
	MpRecipeRegPar_P1.MpLink:= ADR(gRemPremenneP1);
	MpRecipeRegPar_P1.Enable:= TRUE;
	MpRecipeRegPar_P1.Category:= ADR('PREMENNE_P1');
	MpRecipeRegPar_P1.PVName:= ADR('P1_RemPremenne'); //N�zov premenn�, kde je vytvoren� �truktura dat premennych//
	MpRecipeRegPar_P1();

	
	
	//Ulo�enie premenn�ch//
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


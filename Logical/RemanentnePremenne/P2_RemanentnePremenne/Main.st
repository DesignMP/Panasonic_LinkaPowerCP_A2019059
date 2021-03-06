
PROGRAM _INIT
	
	
END_PROGRAM

PROGRAM _CYCLIC

	P2_RemPremenne;
			
	//Na��tanie premenn�ch pri prvom spusten�//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		P2_NacitajPremenne:= TRUE;
	END_IF
	
	//Na��tanie premenn�ch z pam�te//
	IF P2_NacitajPremenne THEN
		MpRecipeXml_P2.Load:= TRUE;
		P2_NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_P2.Load AND (MpRecipeXml_P2.CommandDone OR MpRecipeXml_P2.Error) THEN
		MpRecipeXml_P2.Load:= FALSE;
	END_IF	
	
	//Konfigur�cia premenn�ch//
	MpRecipeXml_P2.MpLink:= ADR(gRemPremenneP2);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_P2.Enable:= TRUE;
	MpRecipeXml_P2.Category:= ADR('PREMENNE_P2');
	MpRecipeXml_P2.DeviceName:= ADR('HDD_RemPremenneP2');  //N�zov media, kde sa bud� receptury ukladat//
	MpRecipeXml_P2.FileName:= ADR('RemPremenneP2'); //N�zov s�boru do ktor�ho sa recept�ry ulo�ia//
	MpRecipeXml_P2();
	
	MpRecipeRegPar_P2.MpLink:= ADR(gRemPremenneP2);
	MpRecipeRegPar_P2.Enable:= TRUE;
	MpRecipeRegPar_P2.Category:= ADR('PREMENNE_P2');
	MpRecipeRegPar_P2.PVName:= ADR('P2_RemPremenne'); //N�zov premenn�, kde je vytvoren� �truktura dat premenn�ch//
	MpRecipeRegPar_P2();

	
	
	//Ulo�enie premenn�ch//
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


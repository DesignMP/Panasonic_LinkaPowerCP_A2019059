
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	

	
	//******************************************Ovládanie zámkov dverí bunky****************************************//
	//Predné dvere //
	IF EDGEPOS(P1_Vizu.TL_ZamkniPrednyZamok) THEN
		IF NOT Safety.OUT.P1_ZamkniZamok_PredneDvere AND Safety.IN.P1_PredneDvere_PritomPetlice THEN
			Safety.OUT.P1_ZamkniZamok_PredneDvere:= TRUE;
		ELSIF Safety.OUT.P1_ZamkniZamok_PredneDvere THEN	
			Safety.OUT.P1_ZamkniZamok_PredneDvere:= FALSE;
		END_IF	
		P1_Vizu.TL_ZamkniPrednyZamok:= FALSE;
	END_IF	
	
	

	//Zadné dvere - pravá strana//
	IF EDGEPOS(P1_Vizu.TL_ZamkniZadnyZamokPS) THEN
		IF NOT Safety.OUT.P1_ZamkniZamok_ZadneDverePS AND Safety.IN.P1_ZadneDverePS_PritomPetlice THEN
			Safety.OUT.P1_ZamkniZamok_ZadneDverePS:= TRUE;
		ELSIF Safety.OUT.P1_ZamkniZamok_ZadneDverePS THEN	
			Safety.OUT.P1_ZamkniZamok_ZadneDverePS:= FALSE;
		END_IF	
		P1_Vizu.TL_ZamkniZadnyZamokPS:= FALSE;
	END_IF
	
	//Zadné dvere - lavá strana//
	IF EDGEPOS(P1_Vizu.TL_ZamkniZadnyZamokLS) THEN
		IF NOT Safety.OUT.P1_ZamkniZamok_ZadneDvereLS AND Safety.IN.P1_ZadneDvereLS_PritomPetlice THEN
			Safety.OUT.P1_ZamkniZamok_ZadneDvereLS:= TRUE;
		ELSIF Safety.OUT.P1_ZamkniZamok_ZadneDvereLS THEN	
			Safety.OUT.P1_ZamkniZamok_ZadneDvereLS:= FALSE;
		END_IF	
		P1_Vizu.TL_ZamkniZadnyZamokLS:= FALSE;
	END_IF
	
	
	
	
	
	//Reset zóny Výtahu//
	CasResetZonyVytahu.IN:= NOT Safety.STAV.P1_ZonaVytahu_AKTIVNA AND Safety.STAV.ZonaCS_AKTIVNA AND (Safety.STAV.P1_Vytah_Bariera_AKTIVNA OR Safety.STAV.P1_SnimacVytahu_AKTIVNY);
	
	IF CasResetZonyVytahu.Q THEN
		Safety.IN.P1_ZonaVytahu_RESET:= TRUE;
	ELSE	
		Safety.IN.P1_ZonaVytahu_RESET:= FALSE;
	END_IF	
		
	CasResetZonyVytahu.PT:= T#1s;
	CasResetZonyVytahu();
	
	//Reset zóny bunky//
	CasResetZonyBunky.IN:= NOT Safety.STAV.P1_ZonaBunky_AKTIVNA	AND Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P1_ZamkyBunky_AKTIVNE AND (Safety.STAV.P1_VstupBunky_Bariera_AKTIVNA OR Safety.STAV.P1_VystupTunela_Bariera_AKTIVNA);	
	
	IF CasResetZonyBunky.Q THEN
		Safety.IN.P1_ZonaBunky_RESET:= TRUE;
	ELSE	
		Safety.IN.P1_ZonaBunky_RESET:= FALSE;
	END_IF	
	
	CasResetZonyBunky.PT:= T#1s;
	CasResetZonyBunky();
		
	

	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


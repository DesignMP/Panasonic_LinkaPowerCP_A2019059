
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//******************************************Ovl�danie z�mkov dver� bunky****************************************//
	//Predn� dvere - prav� strana//
	IF EDGEPOS(P2_Vizu.TL_ZamkniPrednyZamokPS) THEN
		IF NOT Safety.OUT.P2_ZamkniZamok_PredneDverePS AND Safety.IN.P2_PredneDverePS_PritomPetlice THEN
			Safety.OUT.P2_ZamkniZamok_PredneDverePS:= TRUE;
		ELSIF Safety.OUT.P2_ZamkniZamok_PredneDverePS THEN	
			Safety.OUT.P2_ZamkniZamok_PredneDverePS:= FALSE;
		END_IF	
		P2_Vizu.TL_ZamkniPrednyZamokPS:= FALSE;
	END_IF	
	
	
	//Predn� dvere - lav� strana//
	IF EDGEPOS(P2_Vizu.TL_ZamkniPrednyZamokLS) THEN
		IF NOT Safety.OUT.P2_ZamkniZamok_PredneDvereLS AND Safety.IN.P2_PredneDvereLS_PritomPetlice THEN
			Safety.OUT.P2_ZamkniZamok_PredneDvereLS:= TRUE;
		ELSIF Safety.OUT.P2_ZamkniZamok_PredneDvereLS THEN	
			Safety.OUT.P2_ZamkniZamok_PredneDvereLS:= FALSE;
		END_IF	
		P2_Vizu.TL_ZamkniPrednyZamokLS:= FALSE;
	END_IF
	
	//Zadn� dvere - prav� strana//
	IF EDGEPOS(P2_Vizu.TL_ZamkniZadnyZamokPS) THEN
		IF NOT Safety.OUT.P2_ZamkniZamok_ZadneDverePS AND Safety.IN.P2_ZadneDverePS_PritomPetlice THEN
			Safety.OUT.P2_ZamkniZamok_ZadneDverePS:= TRUE;
		ELSIF Safety.OUT.P2_ZamkniZamok_ZadneDverePS THEN	
			Safety.OUT.P2_ZamkniZamok_ZadneDverePS:= FALSE;
		END_IF	
		P2_Vizu.TL_ZamkniZadnyZamokPS:= FALSE;
	END_IF
	
	//Zadn� dvere - lav� strana//
	IF EDGEPOS(P2_Vizu.TL_ZamkniZadnyZamokLS) THEN
		IF NOT Safety.OUT.P2_ZamkniZamok_ZadneDvereLS AND Safety.IN.P2_ZadneDvereLS_PritomPetlice THEN
			Safety.OUT.P2_ZamkniZamok_ZadneDvereLS:= TRUE;
		ELSIF Safety.OUT.P2_ZamkniZamok_ZadneDvereLS THEN	
			Safety.OUT.P2_ZamkniZamok_ZadneDvereLS:= FALSE;
		END_IF	
		P2_Vizu.TL_ZamkniZadnyZamokLS:= FALSE;
	END_IF
	
	
	//Reset z�ny bunky//
	CasResetZonyBunky.IN:= NOT Safety.STAV.P2_ZonaBunky_AKTIVNA	AND Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P2_ZamkyBunky_AKTIVNE AND (Safety.STAV.P3_VstupBunky_Bariera_AKTIVNA OR Safety.STAV.P3_ZamkyBunky_AKTIVNE);	
	
	IF CasResetZonyBunky.Q THEN
		Safety.IN.P2_ZonaBunky_RESET:= TRUE;
	ELSE	
		Safety.IN.P2_ZonaBunky_RESET:= FALSE;
	END_IF	
	
	CasResetZonyBunky.PT:= T#1s;
	CasResetZonyBunky();
	
	
	
	
	//Reset z�ny Zakladaca Tesnenia Pojazd//
	CasResetZonyPojazduZaklTesnenia.IN:= NOT Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA AND Safety.STAV.ZonaCS_AKTIVNA AND (Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY OR NOT Safety.IN.P2_ZaklTesnenia_Vysuvanie_BUSY);
	
	IF CasResetZonyPojazduZaklTesnenia.Q THEN
		Safety.IN.P2_ZonaZaklTesneniaPojazd_RESET:= TRUE;
	ELSE
		Safety.IN.P2_ZonaZaklTesneniaPojazd_RESET:= FALSE;
	END_IF	
	
	CasResetZonyPojazduZaklTesnenia.PT:= T#1s;
	CasResetZonyPojazduZaklTesnenia();
	
	//Reset z�ny Zakladaca Tesnenia Zdvih//
	CasResetZonyZdvihuZaklTesnenia.IN:= NOT Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA AND Safety.STAV.ZonaCS_AKTIVNA AND (Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA OR NOT Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY);
	
	IF CasResetZonyZdvihuZaklTesnenia.Q THEN
		Safety.IN.P2_ZonaZaklTesneniaZdvih_RESET:= TRUE;
	ELSE
		Safety.IN.P2_ZonaZaklTesneniaZdvih_RESET:= FALSE;
	END_IF	
	
	CasResetZonyZdvihuZaklTesnenia.PT:= T#1s;
	CasResetZonyZdvihuZaklTesnenia();
	
	
	//Reset z�ny Maticova�ky//
	CasResetZonyMaticovacky.IN:= NOT Safety.STAV.P2_ZonaMaticovacky_AKTIVNA AND Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P2_ZamkyBunky_AKTIVNE AND Safety.STAV.P2_VstupBunky_Bariera_AKTIVNA;
	
	IF CasResetZonyMaticovacky.Q THEN
		Safety.IN.P2_ZonaMaticovacky_RESET:= TRUE;
	ELSE
		Safety.IN.P2_ZonaMaticovacky_RESET:= FALSE;
	END_IF	
	 
	CasResetZonyMaticovacky.PT:= T#1s;
	CasResetZonyZdvihuZaklTesnenia();
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


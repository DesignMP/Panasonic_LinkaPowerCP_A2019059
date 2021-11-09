
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	
    //******************************************Ovládanie zámkov dverí bunky****************************************//
    //Predné dvere - pravá strana//
	IF EDGEPOS(P34_Vizu.TL_ZamkniPrednyZamokPS_P3) THEN
		IF NOT Safety.OUT.P3_ZamkniZamok_PredneDverePS AND Safety.IN.P3_PredneDverePS_PritomPetlice THEN
            Safety.OUT.P3_ZamkniZamok_PredneDverePS:= TRUE;
        ELSIF Safety.OUT.P3_ZamkniZamok_PredneDverePS THEN	
            Safety.OUT.P3_ZamkniZamok_PredneDverePS:= FALSE;
        END_IF	
        P34_Vizu.TL_ZamkniPrednyZamokPS_P3:= FALSE;
    END_IF	
    
    
    
    //Predné dvere - lavá strana//
    IF EDGEPOS(P34_Vizu.TL_ZamkniPrednyZamokLS_P3) THEN
        IF NOT Safety.OUT.P3_ZamkniZamok_PredneDvereLS AND Safety.IN.P3_PredneDvereLS_PritomPetlice THEN
            Safety.OUT.P3_ZamkniZamok_PredneDvereLS:= TRUE;
        ELSIF Safety.OUT.P3_ZamkniZamok_PredneDvereLS THEN	
            Safety.OUT.P3_ZamkniZamok_PredneDvereLS:= FALSE;
        END_IF	
        P34_Vizu.TL_ZamkniPrednyZamokLS_P3:= FALSE;
    END_IF
    
    
    
    //Zadné dvere//
    IF EDGEPOS(P34_Vizu.TL_ZamkniZadnyZamok_P3) THEN
        IF NOT Safety.OUT.P3_ZamkniZamok_ZadneDvere AND Safety.IN.P3_ZadneDvere_PritomPetlice THEN
            Safety.OUT.P3_ZamkniZamok_ZadneDvere:= TRUE;
        ELSIF Safety.OUT.P3_ZamkniZamok_ZadneDvere THEN	
            Safety.OUT.P3_ZamkniZamok_ZadneDvere:= FALSE;
        END_IF	
        P34_Vizu.TL_ZamkniZadnyZamok_P3:= FALSE;
    END_IF
    
    
    
    
	
	
	//Rset zóny bunky//
	CasResetZonyBunky.IN:= NOT Safety.STAV.P3_ZonaBunky_AKTIVNA	AND Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P3_ZamkyBunky_AKTIVNE AND (Safety.STAV.P3_VstupBunky_Bariera_AKTIVNA OR Safety.STAV.P2_ZamkyBunky_AKTIVNE) AND (Safety.STAV.P3_VystupBunky_Bariera_AKTIVNA OR Safety.STAV.P4_ZamkyBunky_AKTIVNE);	
	
	IF CasResetZonyBunky.Q THEN
		Safety.IN.P3_ZonaBunky_RESET:= TRUE;
	ELSE	
		Safety.IN.P3_ZonaBunky_RESET:= FALSE;
	END_IF	
	
	CasResetZonyBunky.PT:= T#1s;
	CasResetZonyBunky();
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


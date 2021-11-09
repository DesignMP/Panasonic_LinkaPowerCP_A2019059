
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	

	
    //******************************************Ovládanie zámkov dverí bunky****************************************//
    //Predné dvere//
	IF EDGEPOS(P34_Vizu.TL_ZamkniPrednyZamok_P4) THEN
		IF NOT Safety.OUT.P4_ZamkniZamok_PredneDvere AND Safety.IN.P4_PredneDvere_PritomPetlice THEN
            Safety.OUT.P4_ZamkniZamok_PredneDvere:= TRUE;
        ELSIF Safety.OUT.P4_ZamkniZamok_PredneDvere THEN	
            Safety.OUT.P4_ZamkniZamok_PredneDvere:= FALSE;
        END_IF	
        P34_Vizu.TL_ZamkniPrednyZamok_P4:= FALSE;
    END_IF	
    
    
    
    
       
	
	
    //Reset zóny bunky//
    CasResetZonyBunky.IN:= NOT Safety.STAV.P4_ZonaBunky_AKTIVNA	AND Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P4_ZamkyBunky_AKTIVNE AND (Safety.STAV.P4_VstupBunky_Bariera_AKTIVNA OR Safety.STAV.P4_VystupBunky_Bariera_AKTIVNA) AND (Safety.STAV.P3_VystupBunky_Bariera_AKTIVNA OR Safety.STAV.P3_ZamkyBunky_AKTIVNE);	
	
	IF CasResetZonyBunky.Q THEN
		Safety.IN.P4_ZonaBunky_RESET:= TRUE;
	ELSE	
		Safety.IN.P4_ZonaBunky_RESET:= FALSE;
	END_IF	
	
	CasResetZonyBunky.PT:= T#1s;
	CasResetZonyBunky();
	
	
	
	
	
	//Reset zóny vytahu//
	CasResetZonyVytahu.IN:= NOT Safety.STAV.P4_ZonaVytahu_AKTIVNA AND Safety.STAV.ZonaCS_AKTIVNA AND (Safety.STAV.P4_Vytah_Bariera_AKTIVNA OR Safety.STAV.P4_SnimacVytahu_AKTIVNY);
	
	IF CasResetZonyVytahu.Q THEN
		Safety.IN.P4_ZonaVytahu_RESET:= TRUE;
	ELSE	
		Safety.IN.P4_ZonaVytahu_RESET:= FALSE;
	END_IF	
		
	CasResetZonyVytahu.PT:= T#1s;
	CasResetZonyVytahu();
	
	 
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


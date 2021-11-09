
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//*************************************PrÌznak tlaËÌtka CS odblokovanÈ**********************************************//
	IF Safety.STAV.P1_Panel_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P1_Robot_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P1_Skrina_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P2_Panel_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P2_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P2_Robot_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P2_Skrina_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P3_Skrina_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P4_Panel_TlacitkoCS_AKTIVNE AND
		Safety.STAV.P4_Skrina_TlacitkoCS_AKTIVNE THEN
		Safety.STAV.TlacitkaCS_AKTIVNE:= TRUE;
	ELSE
		Safety.STAV.TlacitkaCS_AKTIVNE:= FALSE;
	END_IF	
	
	
		
	//******************************************Reset zÛny CS*******************************************************//
	IF P1_Vizu.TL_ResetCS THEN
		Safety.IN.ZonaCS_RESET:= TRUE;
		P1_Vizu.TL_ResetCS:= FALSE;
	ELSIF P2_Vizu.TL_ResetCS THEN
		Safety.IN.ZonaCS_RESET:= TRUE;
		P2_Vizu.TL_ResetCS:= FALSE;	
	ELSIF P34_Vizu.TL_ResetCS THEN
		Safety.IN.ZonaCS_RESET:= TRUE;
		P34_Vizu.TL_ResetCS:= FALSE;		
	END_IF
	
	
	IF Safety.IN.ZonaCS_RESET THEN
		IF Safety.STAV.ZonaCS_AKTIVNA THEN
			Safety.IN.ZonaCS_RESET:= FALSE;
		ELSIF NOT Safety.STAV.TlacitkaCS_AKTIVNE THEN
			Safety.IN.ZonaCS_RESET:= FALSE;
		END_IF
	END_IF	
		
	
    //Reset bariÈry vstupnÈho v˝ùahu//
    IF NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
        Safety.OUT.P1_ResetBarieryVytahu:= Blikac500ms;
    ELSE
        Safety.OUT.P1_ResetBarieryVytahu:= FALSE;
    END_IF    
  
    
    //Reset bariÈry v˝stupnÈho v˝ùahu//
    IF NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA THEN
        Safety.OUT.P4_ResetBarieryVytahu:= Blikac500ms;
    ELSE
        Safety.OUT.P4_ResetBarieryVytahu:= FALSE;
    END_IF    
    
        
        
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


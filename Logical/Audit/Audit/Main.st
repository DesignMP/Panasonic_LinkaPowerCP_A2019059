
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//**************************Konfigur�cia*****************************//
	MpAuditTrail_0.Enable:= TRUE;
	MpAuditTrail_0.MpLink:= ADR(gAuditTrail);
	MpAuditTrail_0.DeviceName:= ADR('HDD_Audit');
	MpAuditTrail_0();
	
	//*********************************************************Ulo�enie auditu do PLC***************************************//
	IF AuditVizu.UlozAudit THEN
		MpAuditTrail_0.Export:= TRUE;
		AuditVizu.UlozAudit:= FALSE;
	END_IF
	IF MpAuditTrail_0.CommandDone THEN
		MpAuditTrail_0.Export:= FALSE;
	END_IF	
	
	
	//********************Zobrazenie hl�senia u�ivatel sa prihl�sil alebo sa odhl�sil****************************//
	 	

	IF EDGEPOS(UzivatelStavPrihlaseny) THEN
		ZvolenyUzivatel_Audit:= STRING_TO_WSTRING(UsersVizu.ZvolenyUzivatel);
		MpAuditCustomEvent(gAuditTrail,"Uzivatel",ZvolenyUzivatel_Audit,"sa prihl�sil.");
	END_IF	
	
	IF EDGENEG(UzivatelStavPrihlaseny) THEN
		MpAuditCustomEvent(gAuditTrail,"Uzivatel",ZvolenyUzivatel_Audit,"sa odhl�sil.");
	END_IF	
	
	
	
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

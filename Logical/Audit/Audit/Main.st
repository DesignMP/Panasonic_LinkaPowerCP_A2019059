
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//**************************Konfigurácia*****************************//
	MpAuditTrail_0.Enable:= TRUE;
	MpAuditTrail_0.MpLink:= ADR(gAuditTrail);
	MpAuditTrail_0.DeviceName:= ADR('HDD_Audit');
	MpAuditTrail_0();
	
	//*********************************************************Uloženie auditu do PLC***************************************//
	IF AuditVizu.UlozAudit THEN
		MpAuditTrail_0.Export:= TRUE;
		AuditVizu.UlozAudit:= FALSE;
	END_IF
	IF MpAuditTrail_0.CommandDone THEN
		MpAuditTrail_0.Export:= FALSE;
	END_IF	
	
	
	//********************Zobrazenie hlásenia uživatel sa prihlásil alebo sa odhlásil****************************//
	 	

	IF EDGEPOS(UzivatelStavPrihlaseny) THEN
		ZvolenyUzivatel_Audit:= STRING_TO_WSTRING(UsersVizu.ZvolenyUzivatel);
		MpAuditCustomEvent(gAuditTrail,"Uzivatel",ZvolenyUzivatel_Audit,"sa prihlásil.");
	END_IF	
	
	IF EDGENEG(UzivatelStavPrihlaseny) THEN
		MpAuditCustomEvent(gAuditTrail,"Uzivatel",ZvolenyUzivatel_Audit,"sa odhlásil.");
	END_IF	
	
	
	
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


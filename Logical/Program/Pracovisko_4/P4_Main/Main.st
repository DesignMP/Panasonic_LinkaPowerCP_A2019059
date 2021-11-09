
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Volanie podprogramu//
    OvlVentilovychTerminalov;
    ProfinetKomunikaciaKAM14;
    ProfinetKomunikaciaKAM15;
    ProfinetKomunikaciaKAM16;
	
    
    //******************************Stav moduly OK**************************************//
    IF P4_Pracovisko.STAV.ModulDI41_OK AND
        P4_Pracovisko.STAV.ModulDI42_OK AND
        P4_Pracovisko.STAV.ModulDM41_OK AND
        P4_Pracovisko.STAV.ModulDS41_OK AND
        P4_Pracovisko.STAV.ModulDS42_OK AND
        P4_Pracovisko.STAV.ModulSI41_OK AND
        P4_Pracovisko.STAV.ModulSI42_OK THEN
        P4_Pracovisko.STAV.Moduly_OK:= TRUE;
    ELSE
        P4_Pracovisko.STAV.Moduly_OK:= FALSE;
    END_IF  
    
    
    //******************************Stav kamery OK**************************************//
    IF Linka.STAV.WenglorControlUnit_OK AND
        CAM14.STAV.READY THEN
        P4_Pracovisko.STAV.Kamery_OK:= TRUE;
    ELSE
        P4_Pracovisko.STAV.Kamery_OK:= FALSE;
    END_IF    
    
    
    
    //******************************Stav ventilové terminály OK***************************//     
    IF P4_Pracovisko.STAV.VentilovyTerminal_VT8_OK THEN
        P4_Pracovisko.STAV.VentiloveTerminaly_OK:= TRUE;
    ELSE
        P4_Pracovisko.STAV.VentiloveTerminaly_OK:= FALSE;
    END_IF   
    
    
    
      
    
    
    
    
    //Ukonèenie cyklu//
    IF P4_Pracovisko.KoniecCyklu THEN
        IF P4_Dopravniky.Automat THEN
            P4_Dopravniky.KoniecCyklu:= TRUE;
        END_IF    
        IF P4_Vytah.Automat THEN
            P4_Vytah.KoniecCyklu:= TRUE; 
        END_IF	
        IF P4_FunkcnyTestA.Automat THEN
            P4_FunkcnyTestA.KoniecCyklu:= TRUE;
        END_IF
        IF P4_FunkcnyTestB.Automat THEN
            P4_FunkcnyTestB.KoniecCyklu:= TRUE;
        END_IF
        IF P4_Etiketovacka.Automat THEN
            P4_Etiketovacka.KoniecCyklu:= TRUE;
        END_IF    
        P4_Pracovisko.KoniecCyklu:= FALSE;
    END_IF    
    
    
    //Ukonèenie cyklu pri poruche//
    IF EDGEPOS(P4_PoruchaST1) THEN
        IF P4_FunkcnyTestB.Automat THEN
            P4_FunkcnyTestB.KoniecCyklu:= TRUE;
        END_IF
        IF P4_Etiketovacka.Automat THEN
            P4_Etiketovacka.KoniecCyklu:= TRUE;
        END_IF
        IF P4_Dopravniky.Automat THEN
            P4_Dopravniky.KoniecCyklu:= TRUE;
        END_IF 
    ELSIF EDGEPOS(P4_PoruchaST2) THEN
        IF P4_FunkcnyTestA.Automat THEN
            P4_FunkcnyTestA.KoniecCyklu:= TRUE;
        END_IF
        IF P4_Etiketovacka.Automat THEN
            P4_Etiketovacka.KoniecCyklu:= TRUE;
        END_IF 
        IF P4_Dopravniky.Automat THEN
            P4_Dopravniky.KoniecCyklu:= TRUE;
        END_IF 
    ELSIF EDGEPOS(P4_PoruchaST3) THEN
        IF P4_FunkcnyTestA.Automat THEN
            P4_FunkcnyTestA.KoniecCyklu:= TRUE;
        END_IF
        IF P4_FunkcnyTestB.Automat THEN
            P4_FunkcnyTestB.KoniecCyklu:= TRUE;
        END_IF
        IF P4_Dopravniky.Automat THEN
            P4_Dopravniky.KoniecCyklu:= TRUE;
        END_IF 
    END_IF   
    
    
    
    //Status prebieha ukonèenie cyklu//
    IF P4_Dopravniky.KoniecCyklu OR
        P4_Vytah.KoniecCyklu OR
        P4_FunkcnyTestA.KoniecCyklu OR
        P4_FunkcnyTestB.KoniecCyklu OR
        P4_Etiketovacka.KoniecCyklu THEN
        P4_Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        P4_Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF   
    
      

    //Resetovanie pracoviska//
    IF P4_Pracovisko.Reset THEN
        P4_Dopravniky.Reset:= TRUE;
        P4_Vytah.Reset:= TRUE;
        P4_FunkcnyTestA.Reset:= TRUE;
        P4_FunkcnyTestB.Reset:= TRUE;
        P4_Etiketovacka.Reset:= TRUE;
        P4_Pracovisko.Reset:= FALSE;
    END_IF	
	
    //Prepnutie pracoviska do manualneho režimu//
    IF P4_Pracovisko.Manual THEN
        P4_Dopravniky.Manual:= TRUE;
        P4_Vytah.Manual:= TRUE;
        P4_FunkcnyTestA.Manual:= TRUE;
        P4_FunkcnyTestB.Manual:= TRUE;
        P4_Etiketovacka.Manual:= TRUE;
        P4_Pracovisko.Manual:= FALSE;
    END_IF	
	
	
    //Spustenie pracoviska v automatickom režime//
    IF P4_Pracovisko.Automat THEN
        P4_Dopravniky.Automat:= TRUE;
        P4_Vytah.Automat:= TRUE;
        P4_FunkcnyTestA.Automat:= TRUE;
        P4_FunkcnyTestB.Automat:= TRUE;
        P4_Etiketovacka.Automat:= TRUE;
        P4_Pracovisko.Automat:= FALSE;
    END_IF
	
	
    //*********************************Príznaky pracoviska*******************************************//
    //Príznak pracovisko stav AUTOMAT//
    IF P4_Dopravniky.Automat OR
        P4_Vytah.Automat OR
        P4_FunkcnyTestA.Automat OR
        P4_FunkcnyTestB.Automat OR
        P4_Etiketovacka.Automat THEN
        P4_Pracovisko.STAV.Automat:= TRUE;
    ELSE
        P4_Pracovisko.STAV.Automat:= FALSE;
    END_IF	
	
    //Priznak pracovisko stav MANUAL//
    IF P4_Dopravniky.Manual OR
        P4_Vytah.Manual OR
        P4_FunkcnyTestA.Manual OR
        P4_FunkcnyTestB.Manual OR
        P4_Etiketovacka.Manual THEN
        P4_Pracovisko.STAV.Manual:= TRUE;
    ELSE
        P4_Pracovisko.STAV.Manual:= FALSE;
    END_IF
	
    //Príznak pracovisko stav PoINIT//
    IF P4_Dopravniky.STAV.PoINIT AND
        (P4_Vytah.STAV.PoINIT OR NOT P4_Vytah.Automat) AND
        P4_FunkcnyTestA.STAV.PoINIT AND
        P4_FunkcnyTestB.STAV.PoINIT AND
        P4_Etiketovacka.STAV.PoINIT THEN
        P4_Pracovisko.STAV.PoINIT:= TRUE;
    ELSE
        P4_Pracovisko.STAV.PoINIT:= FALSE;
    END_IF	
	
	
	
		
	
    //Príznak pracovisko stav READY//
    IF SC_P4_Dopravniky.Step = 1 AND
        SC_P4_Vytah.Step = 1 AND
        SC_P4_FunkcnyTestA.Step = 1 AND
        SC_P4_FunkcnyTestB.Step = 1 AND
        SC_P4_Etiketovacka.Step = 1 THEN
        P4_Pracovisko.STAV.READY:= TRUE;
    ELSE
        P4_Pracovisko.STAV.READY:= FALSE;
    END_IF
	
	
	
    //Zapnutie aspoò jedného Funkèného Testera//
    IF NOT P4_FunkcnyTestA.STAV.Tester_ON AND NOT P4_FunkcnyTestB.STAV.Tester_ON THEN
        P4_FunkcnyTestA.STAV.Tester_ON:= TRUE;
    END_IF  
	
	
	
	
	
	
    //*******************************************Zapnutie osvetlenia pracoviska********************************//
    IF NOT Safety.IN.P4_PredneDvere_PritomPetlice THEN
        P4_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSE
        P4_Pracovisko.OUT.OsvetlenieBunky:= FALSE;
    END_IF	
	
	
	
    P4_Pracovisko.OUT.Osvetlenie_CAM15:= TRUE;
    P4_Pracovisko.OUT.Osvetlenie_CAM16:= TRUE;
	
    //****************************************Ovládanie majáka***********************************************//
    //Zelené svetlo//
    IF P4_Pracovisko.STAV.Automat THEN
        P4_Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF P4_Pracovisko.STAV.Manual THEN
        P4_Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        P4_Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF
		
    //Žlté svetlo//
    IF P4_Pracovisko.STAV.Automat AND NOT P4_Pracovisko.STAV.PoINIT THEN
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= TRUE;
    ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_4F THEN    
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN 
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN    
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_4F THEN   
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN   
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN   
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        P4_Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF   
        
    
          
    
    
    //Èervené svetlo//
    IF P4_Pracovisko.STAV.PORUCHA THEN
        P4_Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE;
    ELSE
        P4_Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF
	
    //Zvuková signalizácia//
    //    IF EDGEPOS(P4_Pracovisko.STAV.PORUCHA) THEN
    //        P4_Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
    //    END_IF
    
    IF P34_AlarmyVizu.PotvrdAlarmy THEN
        P4_Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF   
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


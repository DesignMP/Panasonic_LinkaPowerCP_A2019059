
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie podprogramu//
    OvlVentilovychTerminalov;
    ProfinetKomunikaciaKAM13;
	
    
    
    //******************************Stav moduly OK**************************************//
    IF P3_Pracovisko.STAV.ModulDI31_OK AND
        P3_Pracovisko.STAV.ModulDI32_OK AND
        P3_Pracovisko.STAV.ModulDI33_OK AND
        P3_Pracovisko.STAV.ModulDI34_OK AND
        P3_Pracovisko.STAV.ModulDM31_OK AND
        P3_Pracovisko.STAV.ModulDS31_OK AND
        P3_Pracovisko.STAV.ModulDS32_OK AND
        P3_Pracovisko.STAV.ModulDS33_OK AND
        P3_Pracovisko.STAV.ModulSI31_OK THEN
        P3_Pracovisko.STAV.Moduly_OK:= TRUE;
    ELSE
        P3_Pracovisko.STAV.Moduly_OK:= FALSE;
    END_IF  
    
    
    //******************************Stav kamery OK**************************************//
    IF Linka.STAV.WenglorControlUnit_OK THEN
        P3_Pracovisko.STAV.Kamery_OK:= TRUE;
    ELSE
        P3_Pracovisko.STAV.Kamery_OK:= FALSE;
    END_IF    
    
    //******************************Stav skrutkovaèky OK*********************************//
    IF P3_Pracovisko.STAV.Skrutkovacka_K40_OK AND
        P3_Pracovisko.STAV.Skrutkovacka_M5_OK THEN
        P3_Pracovisko.STAV.Skrutkovacky_OK:= TRUE;
    ELSE
        P3_Pracovisko.STAV.Skrutkovacky_OK:= FALSE;
    END_IF    
    
    
    //******************************Stav ventilové terminály OK***************************//     
    IF P3_Pracovisko.STAV.VentilovyTerminal_VT6_OK AND
        P3_Pracovisko.STAV.VentilovyTerminal_VT7_OK THEN
        P3_Pracovisko.STAV.VentiloveTerminaly_OK:= TRUE;
    ELSE
        P3_Pracovisko.STAV.VentiloveTerminaly_OK:= FALSE;
    END_IF   
    
      
    
    
    
    //Ukonèenie cyklu//
    IF P3_Pracovisko.KoniecCyklu THEN
        IF P3_Dopravniky.Automat THEN
            P3_Dopravniky.KoniecCyklu:= TRUE;
        END_IF
        IF P3_SpodnyStoper.Automat THEN
            P3_SpodnyStoper.KoniecCyklu:= TRUE;
        END_IF
        IF P3_AkumulacnyStoper.Automat THEN
            P3_AkumulacnyStoper.KoniecCyklu:= TRUE;
        END_IF
        IF P3_LeakageTestA.Automat THEN
            P3_LeakageTestA.KoniecCyklu:= TRUE;
        END_IF
        IF P3_LeakageTestB.Automat THEN
            P3_LeakageTestB.KoniecCyklu:= TRUE;
        END_IF
        IF P3_Srobovanie.Automat THEN
            P3_Srobovanie.KoniecCyklu:= TRUE;
        END_IF
        IF P3_StoperSrobovania.Automat THEN
            P3_StoperSrobovania.KoniecCyklu:= TRUE;
        END_IF   
        IF P3_VstupnyStoper.Automat THEN
            P3_VstupnyStoper.KoniecCyklu:= TRUE;
        END_IF
        P3_Pracovisko.KoniecCyklu:= FALSE;
    END_IF    
    
    
    //Ukonèenie cyklu pri poruche//
    IF EDGEPOS(P3_PoruchaST1) THEN
        P3_Pracovisko.KoniecCyklu:= TRUE;
    ELSIF EDGEPOS(P3_PoruchaST2) THEN
        P3_Pracovisko.KoniecCyklu:= TRUE;
    ELSIF EDGEPOS(P3_PoruchaST3) THEN
        P3_Pracovisko.KoniecCyklu:= TRUE;
    END_IF   
    
    
    //Status prebieha ukonèenie cyklu//
    IF P3_Dopravniky.KoniecCyklu OR
        P3_SpodnyStoper.KoniecCyklu OR
        P3_AkumulacnyStoper.KoniecCyklu OR
        P3_LeakageTestA.KoniecCyklu OR
        P3_LeakageTestB.KoniecCyklu OR
        P3_Srobovanie.KoniecCyklu OR
        P3_VstupnyStoper.KoniecCyklu OR
        P3_StoperSrobovania.KoniecCyklu THEN
        P3_Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        P3_Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF   
    
    
     
    
	
    //Resetovanie pracoviska  po stlaèení tlaèítka Automat//
    IF P34_Vizu.TL_RezimAutomat THEN
        IF P3_Pracovisko.STAV.Manual THEN
            P3_Pracovisko.Reset:= TRUE;
        END_IF  
        IF P4_Pracovisko.STAV.Manual THEN
            P4_Pracovisko.Reset:= TRUE;
        END_IF
        P34_Vizu.TL_RezimAutomat:= FALSE;
    END_IF    
    
    
    
    
    
    //Resetovanie pracoviska//
    IF P3_Pracovisko.Reset THEN
        P3_Dopravniky.Reset:= TRUE;
        P3_SpodnyStoper.Reset:= TRUE;
        P3_AkumulacnyStoper.Reset:= TRUE;
        P3_LeakageTestA.Reset:= TRUE;
        P3_LeakageTestB.Reset:= TRUE;
        P3_Srobovanie.Reset:= TRUE;
        P3_StoperSrobovania.Reset:= TRUE;
        P3_VstupnyStoper.Reset:= TRUE;
        P3_Pracovisko.Reset:= FALSE;
    END_IF	
	
    //Prepnutie pracoviska do manualneho režimu//
    IF P3_Pracovisko.Manual THEN
        P3_Dopravniky.Manual:= TRUE;
        P3_SpodnyStoper.Manual:= TRUE;
        P3_AkumulacnyStoper.Manual:= TRUE;
        P3_LeakageTestA.Manual:= TRUE;
        P3_LeakageTestB.Manual:= TRUE;
        P3_Srobovanie.Manual:= TRUE;
        P3_StoperSrobovania.Manual:= TRUE;
        P3_VstupnyStoper.Manual:= TRUE;
        P3_Pracovisko.Manual:= FALSE;
    END_IF	
	
	
    //Spustenie pracoviska v automatickom režime//
    IF P3_Pracovisko.Automat THEN
        P3_Dopravniky.Automat:= TRUE;
        P3_SpodnyStoper.Automat:= TRUE;
        P3_AkumulacnyStoper.Automat:= TRUE;
        P3_LeakageTestA.Automat:= TRUE;
        P3_LeakageTestB.Automat:= TRUE;
        P3_Srobovanie.Automat:= TRUE;
        P3_StoperSrobovania.Automat:= TRUE;
        P3_VstupnyStoper.Automat:= TRUE;
        P3_Pracovisko.Automat:= FALSE;
    END_IF
	
		
    //***********************************Príznaky pracoviska****************************************//
    //Príznak pracovisko stav AUTOMAT//
    IF P3_Dopravniky.Automat OR
        P3_SpodnyStoper.Automat OR
        P3_AkumulacnyStoper.Automat OR
        P3_LeakageTestA.Automat OR
        P3_LeakageTestB.Automat OR
        P3_Srobovanie.Automat OR
        P3_VstupnyStoper.Automat OR
        P3_StoperSrobovania.Automat THEN
        P3_Pracovisko.STAV.Automat:= TRUE;
    ELSE
        P3_Pracovisko.STAV.Automat:= FALSE;
    END_IF	
	
    //Priznak pracovisko stav MANUAL//
    IF P3_Dopravniky.Manual OR
        P3_SpodnyStoper.Manual OR
        P3_AkumulacnyStoper.Manual OR
        P3_LeakageTestA.Manual OR
        P3_LeakageTestB.Manual OR
        P3_Srobovanie.Manual OR
        P3_VstupnyStoper.Manual OR
        P3_StoperSrobovania.Manual THEN
        P3_Pracovisko.STAV.Manual:= TRUE;
    ELSE
        P3_Pracovisko.STAV.Manual:= FALSE;
    END_IF
	
	
    //Príznak pracovisko stav PoINIT//
    IF P3_Dopravniky.STAV.PoINIT AND
        P3_SpodnyStoper.STAV.PoINIT AND
        P3_AkumulacnyStoper.STAV.PoINIT AND
        P3_LeakageTestA.STAV.PoINIT AND
        P3_LeakageTestB.STAV.PoINIT AND
        P3_Srobovanie.STAV.PoINIT AND
        P3_VstupnyStoper.STAV.PoINIT AND
        P3_StoperSrobovania.STAV.PoINIT	THEN
        P3_Pracovisko.STAV.PoINIT:= TRUE;
    ELSE
        P3_Pracovisko.STAV.PoINIT:= FALSE;
    END_IF	
	
	
	
		
	
    //Príznak pracovisko stav READY//
    IF SC_P3_Dopravniky.Step = 1 AND
        SC_P3_SpodnyStoper.Step = 1 AND
        SC_P3_AkumulacnyStoper.Step = 1 AND
        SC_P3_LeakageTestA.Step = 1 AND
        SC_P3_LeakageTestB.Step = 1 AND
        SC_P3_Srobovanie.Step = 1 AND
        SC_P3_VstupnyStoper.Step = 1 AND
        SC_P3_StoperSrobovania.Step = 1 THEN
        P3_Pracovisko.STAV.READY:= TRUE;
    ELSE
        P3_Pracovisko.STAV.READY:= FALSE;
    END_IF
	
	
	
    //Zapnutie aspoò jedného Leakage Testera//
    IF NOT P3_LeakageTestA.STAV.Tester_ON AND NOT P3_LeakageTestB.STAV.Tester_ON THEN
        P3_LeakageTestB.STAV.Tester_ON:= TRUE;
    END_IF    
	
	
	
	
	
	

	
	
	
    //*************************************Zapnutie osvetleniapracoviska****************************************//
    IF NOT Safety.IN.P3_PredneDvereLS_PritomPetlice THEN
        P3_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSIF NOT Safety.IN.P3_PredneDverePS_PritomPetlice THEN
        P3_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSIF NOT Safety.IN.P3_ZadneDvere_PritomPetlice THEN
        P3_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSE
        P3_Pracovisko.OUT.OsvetlenieBunky:= FALSE;
    END_IF	
	
	
	
	
	
    //****************************************Ovládanie majáka***********************************************//
    //Zelené svetlo//
	
    IF P3_Pracovisko.STAV.Automat THEN
        P3_Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF P3_Pracovisko.STAV.Manual THEN
        P3_Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        P3_Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF
		
    //Žlté svetlo//
    IF P3_Pracovisko.STAV.Automat AND NOT P3_Pracovisko.STAV.PoINIT THEN
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= TRUE;
    ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_4F THEN    
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN    
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN     
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_4F THEN      
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN    
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN    
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_4F THEN  
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN   
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN  
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P3_Srobovanie.STAV.Zasobnik_K40_Prazdny THEN  
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P3_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN  
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        P3_Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF   
        
      
        
        
    //Èervené svetlo//
    IF P3_Pracovisko.STAV.PORUCHA THEN
        P3_Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE;
    ELSE
        P3_Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF
	
    //Zvuková signalizácia//
    //    IF EDGEPOS(P3_Pracovisko.STAV.PORUCHA) THEN
    //        P3_Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
    //    END_IF
    
    IF P34_AlarmyVizu.PotvrdAlarmy THEN
        P3_Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF   
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


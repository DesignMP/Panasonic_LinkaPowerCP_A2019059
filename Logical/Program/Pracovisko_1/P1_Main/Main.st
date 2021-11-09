
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie podprogramu//
    OvlVentilovychTerminalov;
    ProfinetKomunikaciaKAM2;
    ProfinetKomunikaciaKAM3;
    ProfinetKomunikaciaKAM4;
    ProfinetKomunikaciaKAM5;
    ProfinetKomunikaciaKAM6;
	 
     
    //******************************Stav moduly OK**************************************//
    IF P1_Pracovisko.STAV.ModulDI11_OK AND
        P1_Pracovisko.STAV.ModulDI12_OK AND
        P1_Pracovisko.STAV.ModulDI13_OK AND
        P1_Pracovisko.STAV.ModulDI14_OK AND
        P1_Pracovisko.STAV.ModulDM11_OK AND
        P1_Pracovisko.STAV.ModulDS11_OK AND
        P1_Pracovisko.STAV.ModulDS12_OK AND
        P1_Pracovisko.STAV.ModulSI11_OK AND
        P1_Pracovisko.STAV.ModulSI12_OK THEN
        P1_Pracovisko.STAV.Moduly_OK:= TRUE;
    ELSE
        P1_Pracovisko.STAV.Moduly_OK:= FALSE;
    END_IF    
    
   
    
    //******************************Stav kamery OK**************************************//
    IF Linka.STAV.WenglorControlUnit_OK AND
        CAM3.STAV.READY AND
        CAM5.STAV.READY THEN
        P1_Pracovisko.STAV.Kamery_OK:= TRUE;
    ELSE
        P1_Pracovisko.STAV.Kamery_OK:= FALSE;
    END_IF    
    
    
    
    
    
    
    
    //******************************Stav skrutkovaèky OK*********************************//
    IF P1_Pracovisko.STAV.Skrutkovacka_K30_OK AND
        P1_Pracovisko.STAV.Skrutkovacka_M4_OK AND
        P1_Pracovisko.STAV.Skrutkovacka_M5_OK THEN
        P1_Pracovisko.STAV.Skrutkovacky_OK:= TRUE;
    ELSE
        P1_Pracovisko.STAV.Skrutkovacky_OK:= FALSE;
    END_IF    
    
    
    
    
    
    //******************************Stav ventilové terminály OK***************************//     
    IF P1_Pracovisko.STAV.VentilovyTerminal_VT4_OK AND P1_Pracovisko.STAV.VentilovyTerminal_VT5_OK THEN
        P1_Pracovisko.STAV.VentiloveTerminaly_OK:= TRUE;
    ELSE
        P1_Pracovisko.STAV.VentiloveTerminaly_OK:= FALSE;
    END_IF    
    
	
    
        
        
    //Ukonèenie cyklu//
    IF P1_Pracovisko.KoniecCyklu THEN
        IF P1_Vytah.Automat THEN
			P1_Vytah.KoniecCyklu:= TRUE;
		END_IF	
        IF P1_Dopravniky.Automat THEN
            P1_Dopravniky.KoniecCyklu:= TRUE;
        END_IF   
        IF P1_SpodnyStoper.Automat THEN
            P1_SpodnyStoper.KoniecCyklu:= TRUE;
        END_IF
        IF P1_Robot.Automat THEN
            P1_Robot.KoniecCyklu:= TRUE;
        END_IF
        IF P1_StoperSrobovania.Automat THEN
            P1_StoperSrobovania.KoniecCyklu:= TRUE;
        END_IF
        IF P1_Srobovanie.Automat THEN
            P1_Srobovanie.KoniecCyklu:= TRUE;
        END_IF    
        IF P1_AkumulacnyStoper.Automat THEN
            P1_AkumulacnyStoper.KoniecCyklu:= TRUE;
        END_IF 
        P1_Pracovisko.KoniecCyklu:= FALSE;
    END_IF    
    
    
    //Ukonèenie cyklu pri poruche//
    IF EDGEPOS(P1_PoruchaST2) THEN
        IF P1_Dopravniky.Automat THEN
            P1_Dopravniky.KoniecCyklu:= TRUE;
        END_IF    
        IF P1_SpodnyStoper.Automat THEN
            P1_SpodnyStoper.KoniecCyklu:= TRUE;
        END_IF
        IF P1_Robot.Automat THEN
            P1_Robot.KoniecCyklu:= TRUE;
        END_IF
        IF P1_AkumulacnyStoper.Automat THEN
            P1_AkumulacnyStoper.KoniecCyklu:= TRUE;
        END_IF    
    END_IF   
        
    //Status prebieha ukonèenie cyklu//
    IF P1_Vytah.KoniecCyklu OR
        P1_Dopravniky.KoniecCyklu OR
        P1_SpodnyStoper.KoniecCyklu OR
        P1_Robot.KoniecCyklu OR
        P1_StoperSrobovania.KoniecCyklu OR
        P1_Srobovanie.KoniecCyklu OR
        P1_AkumulacnyStoper.KoniecCyklu THEN
        P1_Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        P1_Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF    
    
        
    //Resetovanie pracoviska po stlaèení tlaèítka Automat//
    IF P1_Vizu.TL_RezimAutomat THEN
        IF P1_Pracovisko.STAV.Manual THEN
            P1_Pracovisko.Reset:= TRUE;
        END_IF    
        P1_Vizu.TL_RezimAutomat:= FALSE;
    END_IF     
        
	
    //Resetovanie pracoviska//
    IF P1_Pracovisko.Reset THEN
        P1_Dopravniky.Reset:= TRUE;
        P1_SpodnyStoper.Reset:= TRUE;
        P1_Vytah.Reset:= TRUE;
        P1_Robot.Reset:= TRUE;
        P1_StoperSrobovania.Reset:= TRUE;
        P1_Srobovanie.Reset:= TRUE;
        P1_AkumulacnyStoper.Reset:= TRUE;
        P1_Pracovisko.Reset:= FALSE;
    END_IF	
	
    //Prepnutie pracoviska do manualneho režimu//
    IF P1_Pracovisko.Manual THEN
        P1_Dopravniky.Manual:= TRUE;
        P1_SpodnyStoper.Manual:= TRUE;
        P1_Vytah.Manual:= TRUE;
        P1_Robot.Manual:= TRUE;
        P1_StoperSrobovania.Manual:= TRUE;
        P1_Srobovanie.Manual:= TRUE;
        P1_AkumulacnyStoper.Manual:= TRUE;
        P1_Pracovisko.Manual:= FALSE;
    END_IF	
	
	
    //Spustenie pracoviska v automatickom režime//
    IF P1_Pracovisko.Automat THEN
        P1_Dopravniky.Automat:= TRUE;
        P1_SpodnyStoper.Automat:= TRUE;
        P1_Vytah.Automat:= TRUE;
        P1_Robot.Automat:= TRUE;
        P1_StoperSrobovania.Automat:= TRUE;
        P1_Srobovanie.Automat:= TRUE;
        P1_AkumulacnyStoper.Automat:= TRUE;
        P1_Pracovisko.Automat:= FALSE;
    END_IF
	
    //*****************************************Príznaky pracoviska******************************************//
    //Príznak pracovisko stav AUTOMAT//
    IF P1_Dopravniky.Automat OR
        P1_SpodnyStoper.Automat OR
        P1_Vytah.Automat OR
        P1_Robot.Automat OR
        P1_StoperSrobovania.Automat OR
        P1_Srobovanie.Automat OR
        P1_AkumulacnyStoper.Automat THEN
        P1_Pracovisko.STAV.Automat:= TRUE;
    ELSE
        P1_Pracovisko.STAV.Automat:= FALSE;
    END_IF	
	
    //Priznak pracovisko stav MANUAL//
    IF P1_Dopravniky.Manual OR
        P1_SpodnyStoper.Manual OR
        P1_Vytah.Manual OR
        P1_Robot.Manual OR
        P1_StoperSrobovania.Manual OR
        P1_Srobovanie.Manual OR
        P1_AkumulacnyStoper.Manual THEN
        P1_Pracovisko.STAV.Manual:= TRUE;
    ELSE
        P1_Pracovisko.STAV.Manual:= FALSE;
    END_IF
	
    //Príznak pracovisko stav PoINIT//
    IF P1_Dopravniky.STAV.PoINIT AND
        P1_SpodnyStoper.STAV.PoINIT AND
        (P1_Vytah.STAV.PoINIT OR NOT P1_Vytah.Automat) AND
        P1_Robot.STAV.PoINIT AND
        P1_StoperSrobovania.STAV.PoINIT AND
        P1_Srobovanie.STAV.PoINIT AND
        P1_AkumulacnyStoper.STAV.PoINIT THEN
        P1_Pracovisko.STAV.PoINIT:= TRUE;
    ELSE
        P1_Pracovisko.STAV.PoINIT:= FALSE;
    END_IF	
	
		
	
    //Príznak pracovisko stav READY//
    IF SC_P1_Dopravniky.Step = 1 AND
        SC_P1_SpodnyStoper.Step = 1 AND
        SC_P1_Vytah.Step = 1 AND
        SC_P1_Robot.Step = 1 AND
        SC_P1_StoperSrobovania.Step = 1 AND
        SC_P1_Srobovanie.Step = 1 AND
        SC_P1_AkumulacnyStoper.Step = 1 THEN
        P1_Pracovisko.STAV.READY:= TRUE;
    ELSE
        P1_Pracovisko.STAV.READY:= FALSE;
    END_IF
	
	
	
	
    //*****************************Zapnutie osvetlenia pracoviska*******************************************//
    IF NOT Safety.IN.P1_PredneDvere_PritomPetlice THEN
        P1_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSIF NOT Safety.IN.P1_ZadneDvereLS_PritomPetlice THEN
        P1_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSIF NOT Safety.IN.P1_ZadneDverePS_PritomPetlice THEN
        P1_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
    ELSE
        P1_Pracovisko.OUT.OsvetlenieBunky:= FALSE;
    END_IF	
	
    P1_Pracovisko.OUT.Osvetlenie_CAM2:= TRUE;
    P1_Pracovisko.OUT.Osvetlenie_CAM6:= TRUE;
	

	
    //****************************************Ovládanie majáka***********************************************//
    //Zelené svetlo//
    IF P1_Pracovisko.STAV.Automat THEN
        P1_Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF P1_Pracovisko.STAV.Manual THEN
        P1_Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        P1_Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF
		
    //Žlté svetlo//
    IF P1_Pracovisko.STAV.Automat AND NOT P1_Pracovisko.STAV.PoINIT THEN
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= TRUE;
    ELSIF NOT P1_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P1_Srobovanie.STAV.Zasobnik_K30_Prazdny THEN
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P1_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P1_Srobovanie.STAV.Zasobnik_M4_Prazdny THEN
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        P1_Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF    
	
     
    
    
    //Èervené svetlo//
    IF P1_Pracovisko.STAV.PORUCHA THEN
        P1_Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE;
    ELSE
        P1_Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF
	
    //Zvuková signalizácia//
//    IF EDGEPOS(P1_Pracovisko.STAV.PORUCHA) THEN
//        P1_Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
//    END_IF
    
    IF P1_AlarmyVizu.PotvrdAlarmy THEN
        P1_Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF    
    
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


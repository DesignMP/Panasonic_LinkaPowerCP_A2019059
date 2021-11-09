
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie podprogramu//
    OvlVentilovychTerminalov;
    ProfinetKomunikaciaKAM1;
    ProfinetKomunikaciaKAM7;
    ProfinetKomunikaciaKAM8;
    ProfinetKomunikaciaKAM9;
    ProfinetKomunikaciaKAM10;
    ProfinetKomunikaciaKAM11;
    ProfinetKomunikaciaKAM12;
    ProfinetKomunikaciaKAM17;
	
    
    //******************************Stav moduly OK**************************************//
    IF P2_Pracovisko.STAV.ModulDI21_OK AND
        P2_Pracovisko.STAV.ModulDI22_OK AND
        P2_Pracovisko.STAV.ModulDI23_OK AND
        P2_Pracovisko.STAV.ModulDI24_OK AND
        P2_Pracovisko.STAV.ModulDI25_OK AND
        P2_Pracovisko.STAV.ModulDM21_OK AND
        P2_Pracovisko.STAV.ModulDS21_OK AND
        P2_Pracovisko.STAV.ModulDS22_OK AND
        P2_Pracovisko.STAV.ModulDS23_OK AND
        P2_Pracovisko.STAV.ModulSI21_OK AND
        P2_Pracovisko.STAV.ModulSI22_OK THEN
        P2_Pracovisko.STAV.Moduly_OK:= TRUE;
    ELSE
        P2_Pracovisko.STAV.Moduly_OK:= FALSE;
    END_IF  
    
    
    //******************************Stav kamery OK**************************************//
    IF Linka.STAV.WenglorControlUnit_OK AND
        CAM8.STAV.READY AND
        CAM9.STAV.READY THEN
        P2_Pracovisko.STAV.Kamery_OK:= TRUE;
    ELSE
        P2_Pracovisko.STAV.Kamery_OK:= FALSE;
    END_IF    
    
    //******************************Stav skrutkovaèky OK*********************************//
    IF P2_Pracovisko.STAV.Skrutkovacka_M4_OK AND
        P2_Pracovisko.STAV.Skrutkovacka_M5_OK AND
        P2_Pracovisko.STAV.Skrutkovacka_M6_OK AND
        P2_Pracovisko.STAV.Maticovacka_M4_OK THEN
        P2_Pracovisko.STAV.Skrutkovacky_OK:= TRUE;
    ELSE
        P2_Pracovisko.STAV.Skrutkovacky_OK:= FALSE;
    END_IF    
    
    
    //******************************Stav ventilové terminály OK***************************//     
    IF P2_Pracovisko.STAV.VentilovyTerminal_VT1_OK AND
        P2_Pracovisko.STAV.VentilovyTerminal_VT2_OK AND
        P2_Pracovisko.STAV.VentilovyTerminal_VT3_OK THEN
        P2_Pracovisko.STAV.VentiloveTerminaly_OK:= TRUE;
    ELSE
        P2_Pracovisko.STAV.VentiloveTerminaly_OK:= FALSE;
    END_IF   
    
    
    
    
    
    //Zrušenie signálu výmena gripra 4F5F//
    IF P2_Robot.KOM_OUT.ZmenaGripra_4F5F AND P2_Robot.KOM_IN.Stav_Griper4F5F_Vymeneny THEN
        P2_Robot.KOM_OUT.ZmenaGripra_4F5F:= FALSE;
    END_IF
    
    //Zrušenie signálu výmena gripra 5H//
    IF P2_Robot.KOM_OUT.ZmenaGripra_5H AND P2_Robot.KOM_IN.Stav_Griper5H_Vymeneny THEN
        P2_Robot.KOM_OUT.ZmenaGripra_5H:= FALSE;
    END_IF
    
    //Zrušenie signálu výmena gripra èistenia Power CP//
    IF P2_Robot.KOM_OUT.ZmenaGripra_Cistenie AND P2_Robot.KOM_IN.Stav_GriperCistenia_Vymeneny THEN
        P2_Robot.KOM_OUT.ZmenaGripra_Cistenie:= FALSE;
    END_IF
    
    
    
    
    
    
    //Ukonèenie cyklu//
    IF P2_Pracovisko.KoniecCyklu THEN
        IF P2_Dopravniky.Automat THEN
            P2_Dopravniky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperZaklTesnenia.Automat THEN
            P2_StoperZaklTesnenia.KoniecCyklu:= TRUE;
        END_IF
        IF P2_ZakladacTesnenia.Automat THEN
            P2_ZakladacTesnenia.KoniecCyklu:= TRUE;
        END_IF	
        IF P2_StoperMaticovacky.Automat THEN
            P2_StoperMaticovacky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperSrobovania.Automat THEN
            P2_StoperSrobovania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Srobovanie.Automat THEN
            P2_Srobovanie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Robot.Automat THEN
            P2_Robot.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperZvarania.Automat THEN
            P2_StoperZvarania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Zvaranie.Automat THEN
            P2_Zvaranie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Cistenie.Automat THEN
            P2_Cistenie.KoniecCyklu:= TRUE; 
        END_IF 
        P2_Pracovisko.KoniecCyklu:= FALSE;
    END_IF    
    
    
    //Ukonèenie cyklu pri poruche//
    IF EDGEPOS(P2_PoruchaST2) THEN
        IF P2_Dopravniky.Automat THEN
            P2_Dopravniky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperSrobovania.Automat THEN
            P2_StoperSrobovania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Srobovanie.Automat THEN
            P2_Srobovanie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Robot.Automat THEN
            P2_Robot.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperZvarania.Automat THEN
            P2_StoperZvarania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Zvaranie.Automat THEN
            P2_Zvaranie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Cistenie.Automat THEN
            P2_Cistenie.KoniecCyklu:= TRUE; 
        END_IF  
        
    ELSIF EDGEPOS(P2_PoruchaST3) THEN
        IF P2_Dopravniky.Automat THEN
            P2_Dopravniky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperMaticovacky.Automat THEN
            P2_StoperMaticovacky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Robot.Automat THEN
            P2_Robot.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperZvarania.Automat THEN
            P2_StoperZvarania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Zvaranie.Automat THEN
            P2_Zvaranie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Cistenie.Automat THEN
            P2_Cistenie.KoniecCyklu:= TRUE; 
        END_IF 
        
    ELSIF EDGEPOS(P2_PoruchaST4) THEN
        IF P2_Dopravniky.Automat THEN
            P2_Dopravniky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperMaticovacky.Automat THEN
            P2_StoperMaticovacky.KoniecCyklu:= TRUE;
        END_IF
        IF P2_StoperSrobovania.Automat THEN
            P2_StoperSrobovania.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Srobovanie.Automat THEN
            P2_Srobovanie.KoniecCyklu:= TRUE;
        END_IF
        IF P2_Robot.Automat THEN
            P2_Robot.KoniecCyklu:= TRUE;
        END_IF
    END_IF 
    
    //Status prebieha ukonèenie cyklu//
    IF P2_StoperZaklTesnenia.KoniecCyklu OR
        P2_ZakladacTesnenia.KoniecCyklu OR
        P2_StoperMaticovacky.KoniecCyklu OR
        P2_StoperSrobovania.KoniecCyklu OR
        P2_Srobovanie.KoniecCyklu OR
        P2_Robot.KoniecCyklu OR
        P2_StoperZvarania.KoniecCyklu OR
        P2_Zvaranie.KoniecCyklu OR
        P2_Cistenie.KoniecCyklu THEN
        P2_Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        P2_Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF   
    
    
    
    
    
    
    
    
    
    //Resetovanie pracoviska po stlaèení tlaèítka Automat//
    IF P2_Vizu.TL_RezimAutomat THEN
        IF P2_Pracovisko.STAV.Manual THEN
            P2_Pracovisko.Reset:= TRUE;
        END_IF    
        P2_Vizu.TL_RezimAutomat:= FALSE;
    END_IF    

    //Resetovanie pracoviska//
    IF P2_Pracovisko.Reset THEN
        P2_Dopravniky.Reset:= TRUE;
        P2_StoperZaklTesnenia.Reset:= TRUE;
        P2_ZakladacTesnenia.Reset:= TRUE;
        P2_StoperMaticovacky.Reset:= TRUE;
        P2_StoperSrobovania.Reset:= TRUE;
        P2_Srobovanie.Reset:= TRUE;
        P2_Robot.Reset:= TRUE;
        P2_StoperZvarania.Reset:= TRUE;
        P2_Zvaranie.Reset:= TRUE;
        P2_Cistenie.Reset:= TRUE;
        P2_Pracovisko.Reset:= FALSE;
    END_IF	
	
    //Prepnutie pracoviska do manualneho režimu//
    IF P2_Pracovisko.Manual THEN
        P2_Dopravniky.Manual:= TRUE;
        P2_StoperZaklTesnenia.Manual:= TRUE;
        P2_ZakladacTesnenia.Manual:= TRUE;
        P2_StoperMaticovacky.Manual:= TRUE;
        P2_StoperSrobovania.Manual:= TRUE;
        P2_Srobovanie.Manual:= TRUE;
        P2_Robot.Manual:= TRUE;
        P2_StoperZvarania.Manual:= TRUE;
        P2_Zvaranie.Manual:= TRUE;
        P2_Cistenie.Manual:= TRUE;
        P2_Pracovisko.Manual:= FALSE;
    END_IF	
	
	
    //Spustenie pracoviska v automatickom režime//
    IF P2_Pracovisko.Automat THEN
        P2_Dopravniky.Automat:= TRUE;
        P2_StoperZaklTesnenia.Automat:= TRUE;
        P2_ZakladacTesnenia.Automat:= TRUE;
        P2_StoperMaticovacky.Automat:= TRUE;
        P2_StoperSrobovania.Automat:= TRUE;
        P2_Srobovanie.Automat:= TRUE;
        P2_Robot.Automat:= TRUE;
        P2_StoperZvarania.Automat:= TRUE;
        P2_Zvaranie.Automat:= TRUE;
        P2_Cistenie.Automat:= TRUE;
        P2_Pracovisko.Automat:= FALSE;
    END_IF
	
	
    //***************************************************Príznaky pracoviska******************************************************//
    //Príznak pracovisko stav AUTOMAT//
    IF P2_Dopravniky.Automat OR
        P2_StoperZaklTesnenia.Automat OR
        P2_ZakladacTesnenia.Automat OR
        P2_StoperMaticovacky.Automat OR
        P2_StoperSrobovania.Automat OR
        P2_Srobovanie.Automat OR
        P2_Robot.Automat OR
        P2_StoperZvarania.Automat OR
        P2_Zvaranie.Automat OR
        P2_Cistenie.Automat THEN
        P2_Pracovisko.STAV.Automat:= TRUE;
    ELSE
        P2_Pracovisko.STAV.Automat:= FALSE;
    END_IF	
	
    //Priznak pracovisko stav MANUAL//
    IF P2_Dopravniky.Manual OR
        P2_StoperZaklTesnenia.Manual OR
        P2_ZakladacTesnenia.Manual OR
        P2_StoperMaticovacky.Manual OR
        P2_StoperSrobovania.Manual OR
        P2_Srobovanie.Manual OR
        P2_Robot.Manual OR
        P2_StoperZvarania.Manual OR
        P2_Zvaranie.Manual OR
        P2_Cistenie.Manual THEN
        P2_Pracovisko.STAV.Manual:= TRUE;
    ELSE
        P2_Pracovisko.STAV.Manual:= FALSE;
    END_IF
	
	
    //Príznak pracovisko stav PoINIT//
    IF P2_Dopravniky.STAV.PoINIT AND
        (P2_StoperZaklTesnenia.STAV.PoINIT OR NOT P2_StoperZaklTesnenia.Automat) AND
        (P2_ZakladacTesnenia.STAV.PoINIT OR NOT P2_ZakladacTesnenia.Automat) AND
        P2_Robot.STAV.PoINIT AND
        P2_StoperMaticovacky.STAV.PoINIT AND
        P2_StoperSrobovania.STAV.PoINIT AND
        P2_Srobovanie.STAV.PoINIT AND
        P2_StoperZvarania.STAV.PoINIT AND
        P2_Zvaranie.STAV.PoINIT AND
        P2_Cistenie.STAV.PoINIT THEN
        P2_Pracovisko.STAV.PoINIT:= TRUE;
    ELSE
        P2_Pracovisko.STAV.PoINIT:= FALSE;
    END_IF	
		
	
    //Príznak pracovisko stav READY//
    IF SC_P2_Dopravniky.Step = 1 AND
        SC_P2_StoperZaklTesnenia.Step = 1 AND
        SC_P2_ZakladacTesnenia.Step = 1 AND
        SC_P2_StoperMaticovacky.Step = 1 AND
        SC_P2_StoperSrobovania.Step = 1 AND
        SC_P2_Srobovanie.Step = 1 AND
        SC_P2_Robot.Step = 1 AND
        SC_P2_StoperZvarania.Step = 1 AND
        SC_P2_Zvaranie.Step = 1 AND
        SC_P2_Cistenie.Step = 1	THEN 
        P2_Pracovisko.STAV.READY:= TRUE;
    ELSE
        P2_Pracovisko.STAV.READY:= FALSE;
    END_IF
	

	
	
	
	
	
	
	
		
    //*****************************Zapnutie osvetlenia pracoviska*********************************************************//
    P2_Pracovisko.OUT.OsvetlenieBunky:= TRUE;
		
		
    P2_Pracovisko.OUT.Osvetlenie_CAM1:= TRUE;
    P2_Pracovisko.OUT.Osvetlenie_CAM7_CAM17:= TRUE;
    P2_Pracovisko.OUT.Osvetlenie_CAM10:= TRUE;
    P2_Pracovisko.OUT.Osvetlenie_CAM11:= TRUE;
	
	
	
	
    //****************************************Ovládanie majáka***********************************************//
    //Zelené svetlo//
    
    IF P2_Pracovisko.STAV.Automat THEN
        P2_Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF P2_Pracovisko.STAV.Manual THEN
        P2_Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        P2_Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF
		
    //Žlté svetlo//
    IF P2_Pracovisko.STAV.Automat AND NOT P2_Pracovisko.STAV.PoINIT THEN
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= TRUE;
    ELSIF NOT P2_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P2_Srobovanie.STAV.Zasobnik_M4_Prazdny THEN
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P2_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSIF P2_Srobovanie.STAV.Zasobnik_M6_Prazdny THEN
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        P2_Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF      
        
        
        
        
        
        
	
    //Èervené svetlo//
    IF P2_Pracovisko.STAV.PORUCHA THEN
        P2_Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE;
    ELSE
        P2_Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF
	
    //Zvuková signalizácia//
    //    IF EDGEPOS(P2_Pracovisko.STAV.PORUCHA) THEN
    //        P2_Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
    //    END_IF
    
    IF P2_AlarmyVizu.PotvrdAlarmy THEN
        P2_Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF    
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


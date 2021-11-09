
PROGRAM _INIT
	P34_Vizu.GoPage:= 'PageBootP34';
	 
END_PROGRAM

PROGRAM _CYCLIC

	
	//************************************Filter alarmov**************************************************************//
	FilterVizu_P34:= '[{"logicalOperator":"and","value":300,"conditionType":">=","columnType":"cod","useAlarmState":false,"alarmState":0},{"value":500,"conditionType":"<=","columnType":"cod","useAlarmState":false,"alarmState":0}]';

	
	
	
	
	
	
	//***********************************Zobrazenie warningov pracoviska 3****************************************************//
	//0 - Pracovisko je vypnuté.
	//1 - Prebieha inicializácia pracoviska.
	//2 - Na pracovisku prebieha výroba.
	//3 - Prebieha ukonèenie pracovného cyklu pracoviska.
	//4 - Prebieha režim vyprázdnenia linky.
	//5 - Doplò zásobník skrutiek K40 !!!
	//6 - Doplò zásobník skrutiek M5 !!!
	//7 - Niesu založené správne kontakty na HV teste !!!
	//8 - Niesu založené správne kontakty na Leakage teste stanica A !!!
	//9 - Niesu založené správne kontakty na Leakage teste stanica B !!!
	
	IF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_4F THEN
		P34_Vizu.WarningsP3_Index:= 7;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 7;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 7;	
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_4F THEN
		P34_Vizu.WarningsP3_Index:= 8;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 8;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 8;	
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_4F THEN
		P34_Vizu.WarningsP3_Index:= 9;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 9;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.WarningsP3_Index:= 9;		
	ELSIF P3_Srobovanie.STAV.Zasobnik_K40_Prazdny THEN
		P34_Vizu.WarningsP3_Index:= 5;
	ELSIF P3_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN
        P34_Vizu.WarningsP3_Index:= 6;
    ELSIF Linka.TestovaciKus THEN
        P34_Vizu.WarningsP3_Index:= 11;
	ELSIF Linka.VyprazdnenieLinky THEN
		P34_Vizu.WarningsP3_Index:= 4;
	ELSIF P3_Pracovisko.STAV.Automat AND NOT P3_Pracovisko.STAV.PoINIT AND NOT P3_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP3_Index:= 1;		
	ELSIF P3_Pracovisko.STAV.PoINIT AND NOT P3_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP3_Index:= 2;	
	ELSIF P3_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP3_Index:= 3;	
	ELSIF NOT P3_Pracovisko.STAV.Automat THEN
		P34_Vizu.WarningsP3_Index:= 0;
	END_IF	
	
	
	
	
	
	P34_Vizu.WarningsP3_Index;
	
	//************************Prepínanie farby textového pola warning pracoviska 3***********************************//
	IF P34_Vizu.WarningsP3_Index = 0 THEN
		P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";
	ELSIF P34_Vizu.WarningsP3_Index = 1 THEN
		P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";
	ELSIF P34_Vizu.WarningsP3_Index = 2 THEN
		P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";
	ELSIF P34_Vizu.WarningsP3_Index = 3 THEN
		P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";
	ELSIF P34_Vizu.WarningsP3_Index = 4 THEN
        P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";
    ELSIF P34_Vizu.WarningsP3_Index = 11 THEN
        P34_Vizu.WarningsP3_Farba:= "TextOutput_Green";    
	ELSE
		IF Blikac1s THEN
			P34_Vizu.WarningsP3_Farba:= "TextOutput_Red";
		ELSE	
			P34_Vizu.WarningsP3_Farba:= "TextOutput_Grey";
		END_IF
	END_IF	
	
	
	
	//***********************************Zobrazenie warningov pracoviska 4****************************************************//
	//0 - Pracovisko je vypnuté.
	//1 - Prebieha inicializácia pracoviska.
	//2 - Na pracovisku prebieha výroba.
	//3 - Prebieha ukonèenie pracovného cyklu pracoviska.
	//4 - Prebieha režim vyprázdnenia linky.
	//5 - Niesu založené správne kontakty na Funkènom teste stanica A !!!
	//6 - Niesu založené správne kontakty na Funkènom teste stanica B !!!
	
	IF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_4F THEN
		P34_Vizu.WarningsP4_Index:= 5;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.WarningsP4_Index:= 5;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.WarningsP4_Index:= 5;	
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_4F THEN
		P34_Vizu.WarningsP4_Index:= 6;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.WarningsP4_Index:= 6;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
        P34_Vizu.WarningsP4_Index:= 6;
    ELSIF Linka.TestovaciKus THEN
        P34_Vizu.WarningsP4_Index:= 8;
	ELSIF Linka.VyprazdnenieLinky THEN
		P34_Vizu.WarningsP4_Index:= 4;
	ELSIF P4_Pracovisko.STAV.Automat AND NOT P4_Pracovisko.STAV.PoINIT AND NOT P4_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP4_Index:= 1;		
	ELSIF P4_Pracovisko.STAV.PoINIT AND NOT P4_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP4_Index:= 2;	
	ELSIF P4_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.WarningsP4_Index:= 3;	
	ELSIF NOT P4_Pracovisko.STAV.Automat THEN
		P34_Vizu.WarningsP4_Index:= 0;
	END_IF	
	
	
	
	
	//************************Prepínanie farby textového pola warning pracoviska 4***********************************//
	IF P34_Vizu.WarningsP4_Index = 0 THEN
		P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";
	ELSIF P34_Vizu.WarningsP4_Index = 1 THEN
		P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";	
	ELSIF P34_Vizu.WarningsP4_Index = 2 THEN
		P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";	
	ELSIF P34_Vizu.WarningsP4_Index = 3 THEN
		P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";	
	ELSIF P34_Vizu.WarningsP4_Index = 4 THEN
        P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";	
    ELSIF P34_Vizu.WarningsP4_Index = 8 THEN
        P34_Vizu.WarningsP4_Farba:= "TextOutput_Green";	    
	ELSE
		IF Blikac1s THEN
			P34_Vizu.WarningsP4_Farba:= "TextOutput_Red";
		ELSE	
			P34_Vizu.WarningsP4_Farba:= "TextOutput_Grey";
		END_IF
	END_IF	
	
	
	
	//***********************Prepnutie na obrazovku Automat z ruèného režimu******************//
    IF P3_Pracovisko.STAV.Manual AND NOT Safety.STAV.P3_ZamkyBunky_AKTIVNE THEN
        P3_Pracovisko.Reset:= TRUE;
        P34_Vizu.GoPage:= 'PageBootP34';
    END_IF    
    IF P4_Pracovisko.STAV.Manual AND NOT Safety.STAV.P4_ZamkyBunky_AKTIVNE THEN
        P4_Pracovisko.Reset:= TRUE;
        P34_Vizu.GoPage:= 'PageBootP34';    
    END_IF  
	
	
	
	
	
	//***********************Prepnutie bootovacej obrazovky********************************//
	IF NOT Safety.STAV.SafetyPLC_Nabehlo THEN
        P34_Vizu.GoPage:= 'PageBootP34';
    ELSIF CasPrepnutiaObrazovky.Q THEN
        P34_Vizu.GoPage:= 'PageBootP34';     
	ELSIF P34_Vizu.ActualPage = 'PageBootP34' AND Safety.STAV.SafetyPLC_Nabehlo THEN
		P34_Vizu.GoPage:= 'PageAutomatP34';
	END_IF	
	
    		
    CasPrepnutiaObrazovky.IN:= P34_Vizu.ActualPage = 'PageBootP34' AND P34_Vizu.GoPage = 'PageAutomatP34';
    CasPrepnutiaObrazovky.PT:= T#5s;
    CasPrepnutiaObrazovky();
    
    
    
    
    
    
    
    
    
    //**************************Zamknutie editácie parametrov *********************************//
       
    IF P34_UrovenPrihlasenehoUzivatela >= 20 THEN
        P34_Vizu.EditaciaParametrov_ENABLE:= TRUE;
    ELSE     
        P34_Vizu.EditaciaParametrov_ENABLE:= FALSE;
    END_IF     
    
	
	//*************************************Zamknutie tlaèítok - Pracovisko 3***************************************************************//
	//Tlaèítko Štat Automat //
	IF P3_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF P3_Pracovisko.STAV.PORUCHA THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_4F THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_Srobovanie.IN.HVTest_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_4F THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestA.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_4F THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P3_LeakageTestB.IN.Tester_TypKonektoru_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSIF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= FALSE;
	ELSE	
		P34_Vizu.TL_StartAutomat_ENABLE_P3:= TRUE;
	END_IF		
	

	
	
	//Tlaèítko Ukonèenie Cyklu//
	IF P3_Pracovisko.STAV.PoINIT THEN
		P34_Vizu.TL_KoniecCyklu_ENABLE_P3:= TRUE;
	ELSE	
		P34_Vizu.TL_KoniecCyklu_ENABLE_P3:= FALSE;
	END_IF	
	
    //Tlaèítko STOP//
    IF P3_Pracovisko.STAV.PoINIT THEN
        P34_Vizu.TL_STOP_ENABLE_P3:= FALSE;
    ELSE    
        P34_Vizu.TL_STOP_ENABLE_P3:= TRUE;
    END_IF 
    
    
    
    
	//Tlaèítko Režim Automat//

	P34_Vizu.TL_RezimAutomat_ENABLE:= TRUE;
	
	
	//Tlaèítko Režim Manual - pracovisko 3//
	IF P3_Pracovisko.STAV.Automat THEN
		P34_Vizu.TL_RezimManual_ENABLE_P3:= FALSE;
	ELSIF NOT P3_Pracovisko.STAV.Manual AND NOT P3_Pracovisko.STAV.READY THEN
		P34_Vizu.TL_RezimManual_ENABLE_P3:= FALSE;
	ELSIF NOT Safety.STAV.P3_ZamkyBunky_AKTIVNE THEN
        P34_Vizu.TL_RezimManual_ENABLE_P3:= FALSE;	
    ELSE
		P34_Vizu.TL_RezimManual_ENABLE_P3:= TRUE;
	END_IF	
	
        
           
        
        
        
    //Tlaèítka ovládania zámkov//
    IF NOT P3_Pracovisko.STAV.Automat THEN
        P34_Vizu.TL_OvladaniaZamkov_ENABLE_P3:= TRUE;
    ELSE	
        P34_Vizu.TL_OvladaniaZamkov_ENABLE_P3:= FALSE;
    END_IF
	
    
    //Volba zapnutia Leakage Testu//
    IF P3_Pracovisko.STAV.Automat THEN
        P34_Vizu.VolbaLeakageTestu_ENABLE:= FALSE;
    ELSE
        P34_Vizu.VolbaLeakageTestu_ENABLE:= TRUE;
    END_IF    
    
    
    //Tlaèítka spustenie èistenie skrutkovaèiek v ruènom režime//
    IF NOT P3_Srobovacky_VychodziaPozicia THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.STAV.Cistenie_K40_BUSY THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P3_Srobovanie.STAV.OsY_HomingOK THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P34_UrovenPrihlasenehoUzivatela < 20 THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSE
        P34_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= TRUE;
    END_IF   
    
    
    
    
    
    //Tlaèítka ovládania osy Y manipulatora šróbovaèiek//
    IF NOT P3_Srobovanie.STAV.OsY_HomingOK THEN
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF NOT P3_Srobovacky_VychodziaPozicia THEN
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.STAV.Cistenie_K40_BUSY THEN
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.Srobovanie_OvlManipOsY_ENABLE:= TRUE;
    END_IF
    
    
    
    //Zamknutie tlaèítok test pozicii skrutkovaèiek//
    IF NOT P3_Srobovanie.STAV.OsY_HomingOK THEN
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;    
    ELSIF NOT P3_Srobovacky_VychodziaPozicia THEN
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.STAV.Cistenie_K40_BUSY THEN
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P34_UrovenPrihlasenehoUzivatela < 100 THEN    
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSE    
        P34_Vizu.RR_PozicieSkrutiek_ENABLE:= TRUE;
    END_IF
    
    
       
    
    
    
    //Tlaèítko testovania Leakage Testu A v ruènom režime//
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        P34_Vizu.LeakageTestA_Testovanie_ENABLE:= FALSE;
    ELSIF NOT P3_LeakageTestA.IN.PritomnostPaletky_S23 THEN
       P34_Vizu.LeakageTestA_Testovanie_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.LeakageTestA_Testovanie_ENABLE:= TRUE;
    END_IF    
    
    
    //Tlaèítko testovania Leakage Testu B v ruènom režime//
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        P34_Vizu.LeakageTestB_Testovanie_ENABLE:= FALSE;
    ELSIF NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 THEN
        P34_Vizu.LeakageTestB_Testovanie_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.LeakageTestB_Testovanie_ENABLE:= TRUE;
    END_IF   
    
    //Zamknutie tlaèítok ovládania Leakage testu A v ruènom režime//
    IF P3_LeakageTestA.STAV.TestovaciaSekvencia_BUSY THEN
        P34_Vizu.LeakageTestA_RR_ENABLE:= FALSE;
    ELSE    
        P34_Vizu.LeakageTestA_RR_ENABLE:= TRUE;
    END_IF    
    
    
    
   //Zamknutie tlaèítok ovládania Leakage testu B v ruènom režime// 
    IF P3_LeakageTestB.STAV.TestovaciaSekvencia_BUSY THEN
        P34_Vizu.LeakageTestB_RR_ENABLE:= FALSE;
    ELSE    
        P34_Vizu.LeakageTestB_RR_ENABLE:= TRUE;
    END_IF 
    
    
    
    
    
	//*************************************Zamknutie tlaèítok - Pracovisko 4***************************************************************//
	//Tlaèítko Štat Automat//
	IF P4_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF P4_Pracovisko.STAV.PORUCHA THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_4F THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestA.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '4F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_4F THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5F' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF Linka.PAR.ZvolenyModel = '5H' AND NOT P4_FunkcnyTestB.IN.TypSpodnychKontaktov_5F_5H THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;
	ELSIF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= FALSE;	
	ELSE	
		P34_Vizu.TL_StartAutomat_ENABLE_P4:= TRUE;
	END_IF	
	

	
	
	//Tlaèítko Ukonèenie Cyklu//
	IF P4_Pracovisko.STAV.PoINIT THEN
		P34_Vizu.TL_KoniecCyklu_ENABLE_P4:= TRUE;
	ELSE	
		P34_Vizu.TL_KoniecCyklu_ENABLE_P4:= FALSE;
	END_IF	
	
	
    //Tlaèítko STOP//
    IF P4_Pracovisko.STAV.PoINIT THEN
        P34_Vizu.TL_STOP_ENABLE_P4:= FALSE;
    ELSE    
        P34_Vizu.TL_STOP_ENABLE_P4:= TRUE;
    END_IF
    
    
    //Tlaèítko vyprázdnenie linky//
    IF Linka.VyprazdnenieLinky THEN
        P34_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
    ELSIF NOT P4_Pracovisko.STAV.Automat THEN
        P34_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
    ELSIF Linka.TestovaciKus THEN
        P34_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
    ELSE
        P34_Vizu.TL_VyprazdnenieLinky_ENABLE:= TRUE;
    END_IF	
    
    
    
    
    
	//Tlaèítka ovládania zámkov//
	IF NOT P4_Pracovisko.STAV.Automat THEN
		P34_Vizu.TL_OvladaniaZamkov_ENABLE_P4:= TRUE;
	ELSE	
		P34_Vizu.TL_OvladaniaZamkov_ENABLE_P4:= FALSE;
	END_IF
	
    
    //Tlaèítko Režim Manual - pracovisko 4//
    IF P4_Pracovisko.STAV.Automat THEN
        P34_Vizu.TL_RezimManual_ENABLE_P4:= FALSE;
    ELSIF NOT P4_Pracovisko.STAV.Manual AND NOT P4_Pracovisko.STAV.READY THEN
        P34_Vizu.TL_RezimManual_ENABLE_P4:= FALSE;	
    ELSIF NOT Safety.STAV.P4_ZamkyBunky_AKTIVNE THEN
        P34_Vizu.TL_RezimManual_ENABLE_P4:= FALSE;	 
    ELSE
        P34_Vizu.TL_RezimManual_ENABLE_P4:= TRUE;
    END_IF	
    
    
    
    //Volba zapnutia Funkèného Testu//
    IF P4_Pracovisko.STAV.Automat THEN
        P34_Vizu.VolbaFunkcnehoTestu_ENABLE:= FALSE;
    ELSE
        P34_Vizu.VolbaFunkcnehoTestu_ENABLE:= TRUE;
    END_IF   
    
    //Tlaèítko testovania Funkèného Testu A v ruènom režime//
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        P34_Vizu.FunkcnyTestA_Testovanie_ENABLE:= FALSE;
    ELSIF NOT P4_FunkcnyTestA.IN.PritomnostPaletky_S10 THEN
        P34_Vizu.FunkcnyTestA_Testovanie_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.FunkcnyTestA_Testovanie_ENABLE:= TRUE;
    END_IF  
    
    
    //Tlaèítko testovania Funkèného Testu B v ruènom režime//
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        P34_Vizu.FunkcnyTestB_Testovanie_ENABLE:= FALSE;
    ELSIF NOT P4_FunkcnyTestB.IN.PritomnostPaletky_S11 THEN
        P34_Vizu.FunkcnyTestB_Testovanie_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.FunkcnyTestB_Testovanie_ENABLE:= TRUE;
    END_IF  
    
    
    //Tlaèítka ovládania výahu v ruènom režime//
    IF NOT P4_Vytah.STAV.ServoZdvihu_HomingOK THEN
        P34_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF P4_Vytah.STAV.ServoZdvihu_Homing_BUSY THEN
        P34_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN
        P34_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA THEN
        P34_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSE
        P34_Vizu.TL_OvladanieVytahu_ENABLE:= TRUE;
    END_IF    
    
    //Tlaèítko homing zdvihu výahu//
    IF P4_Vytah.IN.VystupDopravnikaVytahu_OS11 THEN
        P34_Vizu.TL_HomingVytahu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P4_Vytah_Bariera_AKTIVNA THEN
        P34_Vizu.TL_HomingVytahu_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.TL_HomingVytahu_ENABLE:= TRUE;
    END_IF    
    
      
    //Tlaèítka ovládania zdvihu aplikátora etikety v ruènom režime//
    IF NOT P4_Etiketovacka.STAV.ServoZdvihu_HomingOK THEN
        P34_Vizu.TL_OvlZdvihuAplikEtikety_ENABLE:= FALSE;
    ELSIF NOT P4_Etiketovacka.IN.Aplikator_ZASUNUTY_MS35 THEN
        P34_Vizu.TL_OvlZdvihuAplikEtikety_ENABLE:= FALSE;
    ELSIF P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
        P34_Vizu.TL_OvlZdvihuAplikEtikety_ENABLE:= FALSE;
    ELSE
        P34_Vizu.TL_OvlZdvihuAplikEtikety_ENABLE:= TRUE;
    END_IF  
    
    
    
    
    
    
    
    //Tlaèítko testovania Etiketovania v ruènom režime//
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        P34_Vizu.Etiketovacka_Testovanie_ENABLE:= FALSE;
    ELSIF NOT P4_Etiketovacka.IN.PritomnostPaletky_S12 THEN
        P34_Vizu.Etiketovacka_Testovanie_ENABLE:= FALSE; 
    ELSIF NOT P4_Etiketovacka.STAV.ServoZdvihu_HomingOK THEN
        P34_Vizu.Etiketovacka_Testovanie_ENABLE:= FALSE; 
    ELSIF P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
        P34_Vizu.Etiketovacka_Testovanie_ENABLE:= FALSE; 
    ELSE
        P34_Vizu.Etiketovacka_Testovanie_ENABLE:= TRUE;
    END_IF    
    
    
    
    
    
    
    
	
    //***************************************Zmena farieb tlaèítok pre ovládanie zámkou - Pracovisko 3********************************//
    //Predné dvere pravá strana//
	IF Safety.OUT.P3_ZamkniZamok_PredneDverePS AND Safety.IN.P3_PredneDverePS_PritomPetlice THEN
		P34_Vizu.TL_PrednyZamokPS_Farba_P3:= "Button_Green";
	ELSIF Safety.IN.P3_PredneDverePS_PritomPetlice THEN
		IF Blikac1s THEN
			P34_Vizu.TL_PrednyZamokPS_Farba_P3:= "Button_Blue";
		ELSE
			P34_Vizu.TL_PrednyZamokPS_Farba_P3:= "Operate";
		END_IF	
	ELSE	
		P34_Vizu.TL_PrednyZamokPS_Farba_P3:= "Button_Red";
	END_IF	
	
	//Predné dvere lavá strana//
	IF Safety.OUT.P3_ZamkniZamok_PredneDvereLS AND Safety.IN.P3_PredneDvereLS_PritomPetlice THEN
		P34_Vizu.TL_PrednyZamokLS_Farba_P3:= "Button_Green";
	ELSIF Safety.IN.P3_PredneDvereLS_PritomPetlice THEN	
		IF Blikac1s THEN
			P34_Vizu.TL_PrednyZamokLS_Farba_P3:= "Button_Blue";
		ELSE
			P34_Vizu.TL_PrednyZamokLS_Farba_P3:= "Operate";
		END_IF	
	ELSE	
		P34_Vizu.TL_PrednyZamokLS_Farba_P3:= "Button_Red";
	END_IF	
	
	//Zadné dvere //
	IF Safety.OUT.P3_ZamkniZamok_ZadneDvere AND Safety.IN.P3_ZadneDvere_PritomPetlice THEN
		P34_Vizu.TL_ZadnyZamok_Farba_P3:= "Button_Green";
	ELSIF Safety.IN.P3_ZadneDvere_PritomPetlice THEN
		IF Blikac1s THEN
			P34_Vizu.TL_ZadnyZamok_Farba_P3:= "Button_Blue";
		ELSE
			P34_Vizu.TL_ZadnyZamok_Farba_P3:= "Operate";
		END_IF	
	ELSE	
		P34_Vizu.TL_ZadnyZamok_Farba_P3:= "Button_Red";
	END_IF	
	
    
    
	//***************************************Zmena farieb tlaèítok pre ovládanie zámkou - Pracovisko 4********************************//
	//Predné dvere //
	IF Safety.OUT.P4_ZamkniZamok_PredneDvere AND Safety.IN.P4_PredneDvere_PritomPetlice THEN
		P34_Vizu.TL_PrednyZamok_Farba_P4:= "Button_Green";
	ELSIF Safety.IN.P4_PredneDvere_PritomPetlice THEN
		IF Blikac1s THEN
			P34_Vizu.TL_PrednyZamok_Farba_P4:= "Button_Blue";
		ELSE
			P34_Vizu.TL_PrednyZamok_Farba_P4:= "Operate";
		END_IF	
	ELSE	
		P34_Vizu.TL_PrednyZamok_Farba_P4:= "Button_Red";
	END_IF	
	
    
    
    
    
    
    
    
    
    
    
    
    
    
	//***********************************Prepínanie stavov pracovísk - Pracovisko 3*******************************************************************//
	//Dopravníky//
	IF NOT P3_Dopravniky.IN.HornyDoprav_READY OR NOT P3_Dopravniky.IN.SpodnyDoprav_READY THEN
		P34_Vizu.IndexStavu_DopravnikP3:= 3;
	ELSIF P3_Dopravniky.Automat AND NOT P3_Dopravniky.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_DopravnikP3:= 1;
	ELSIF P3_Dopravniky.Automat AND P3_Dopravniky.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_DopravnikP3:= 2;
	ELSE
		P34_Vizu.IndexStavu_DopravnikP3:= 0;
	END_IF	
	
	//Spodný stoper//
	IF P3_SpodnyStoper.Automat AND NOT P3_SpodnyStoper.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_SpodnyStoperP3:= 1;
	ELSIF P3_SpodnyStoper.Automat AND P3_SpodnyStoper.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_SpodnyStoperP3:= 2;
	ELSE
		P34_Vizu.IndexStavu_SpodnyStoperP3:= 0;
	END_IF	
	
    //Vstupný stoper//
    IF P3_VstupnyStoper.Automat AND NOT P3_VstupnyStoper.STAV.PoINIT THEN
        P34_Vizu.IndexStavu_VstupnyStoper:= 1;
    ELSIF P3_VstupnyStoper.Automat AND P3_VstupnyStoper.STAV.PoINIT THEN
        P34_Vizu.IndexStavu_VstupnyStoper:= 2;
    ELSE
        P34_Vizu.IndexStavu_VstupnyStoper:= 0;
    END_IF	
    
    
    
	//Stoper šrobovania//
	IF P3_PoruchaST1 THEN
		P34_Vizu.IndexStavu_StoperSrobovaniaP3:= 3;
	ELSIF P3_StoperSrobovania.Automat AND NOT P3_StoperSrobovania.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperSrobovaniaP3:= 1;
	ELSIF P3_StoperSrobovania.Automat AND P3_StoperSrobovania.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperSrobovaniaP3:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperSrobovaniaP3:= 0;
	END_IF	
	
	
	
	//Šrobovanie//
	IF P3_PoruchaST1 THEN
		P34_Vizu.IndexStavu_SrobovanieP3:= 3;
	ELSIF P3_Srobovanie.Automat AND NOT P3_Srobovanie.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_SrobovanieP3:= 1;
	ELSIF P3_Srobovanie.Automat AND P3_Srobovanie.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_SrobovanieP3:= 2;
	ELSE
		P34_Vizu.IndexStavu_SrobovanieP3:= 0;
	END_IF	
	
	
	//Akumulaèný stoper//
	IF P3_AkumulacnyStoper.Automat AND NOT P3_AkumulacnyStoper.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_AkumulacnyStoperP3:= 1;
	ELSIF P3_AkumulacnyStoper.Automat AND P3_AkumulacnyStoper.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_AkumulacnyStoperP3:= 2;
	ELSE
		P34_Vizu.IndexStavu_AkumulacnyStoperP3:= 0;
	END_IF	
	
	//Stoper Leakage Test A//
	IF P3_PoruchaST2 THEN
		P34_Vizu.IndexStavu_StoperLeakageTestA:= 3;
	ELSIF P3_LeakageTestA.Automat AND NOT P3_LeakageTestA.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperLeakageTestA:= 1;
	ELSIF P3_LeakageTestA.Automat AND P3_LeakageTestA.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperLeakageTestA:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperLeakageTestA:= 0;
	END_IF	
	
	
	//Stoper Leakage Test B//
	IF P3_PoruchaST3 THEN
		P34_Vizu.IndexStavu_StoperLeakageTestB:= 3;
	ELSIF P3_LeakageTestB.Automat AND NOT P3_LeakageTestB.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperLeakageTestB:= 1;
	ELSIF P3_LeakageTestB.Automat AND P3_LeakageTestB.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperLeakageTestB:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperLeakageTestB:= 0;
	END_IF	
	
	
   

	
	//***********************************Prepínanie stavov pracovísk - Pracovisko 4*******************************************************************//
	//Dopravníky//
	IF NOT P4_Dopravniky.IN.HornyDoprav_READY OR NOT P4_Dopravniky.IN.SpodnyDoprav_READY THEN
		P34_Vizu.IndexStavu_DopravnikP4:= 3;
	ELSIF P4_Dopravniky.Automat AND NOT P4_Dopravniky.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_DopravnikP4:= 1;
	ELSIF P4_Dopravniky.Automat AND P4_Dopravniky.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_DopravnikP4:= 2;
	ELSE
		P34_Vizu.IndexStavu_DopravnikP4:= 0;
	END_IF	
	

	
	//Výah//
	IF NOT P4_Vytah.IN.Dopravnik_READY THEN
		P34_Vizu.IndexStavu_Vytah:= 3;
	ELSIF P4_PoruchaST4 THEN
		P34_Vizu.IndexStavu_Vytah:= 3;
	ELSIF P4_Vytah.Automat AND NOT P4_Vytah.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_Vytah:= 1;
	ELSIF P4_Vytah.Automat AND P4_Vytah.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_Vytah:= 2;
	ELSE
		P34_Vizu.IndexStavu_Vytah:= 0;
	END_IF	
	

	
	//Stoper Funkèný Test A//
	IF P4_PoruchaST1 THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestA:= 3;
	ELSIF P4_FunkcnyTestA.Automat AND NOT P4_FunkcnyTestA.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestA:= 1;
	ELSIF P4_FunkcnyTestA.Automat AND P4_FunkcnyTestA.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestA:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperFunkcnyTestA:= 0;
	END_IF	
	
	
	//Stoper Funkèný Test B//
	IF P4_PoruchaST2 THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestB:= 3;
	ELSIF P4_FunkcnyTestB.Automat AND NOT P4_FunkcnyTestB.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestB:= 1;
	ELSIF P4_FunkcnyTestB.Automat AND P4_FunkcnyTestB.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperFunkcnyTestB:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperFunkcnyTestB:= 0;
	END_IF	
	
	//Stoper Etiketovaèky//
	IF P4_PoruchaST3 THEN
		P34_Vizu.IndexStavu_StoperEtiketovackyP4:= 3;
	ELSIF P4_Etiketovacka.Automat AND NOT P4_Etiketovacka.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperEtiketovackyP4:= 1;
	ELSIF P4_Etiketovacka.Automat AND P4_Etiketovacka.STAV.PoINIT THEN
		P34_Vizu.IndexStavu_StoperEtiketovackyP4:= 2;
	ELSE
		P34_Vizu.IndexStavu_StoperEtiketovackyP4:= 0;
	END_IF
	
	
    
    
    
    
    
    
    
    
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


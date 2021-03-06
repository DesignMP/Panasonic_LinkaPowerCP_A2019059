
PROGRAM _INIT
	P1_Vizu.GoPage:= 'PageBootP1';
	 
END_PROGRAM

PROGRAM _CYCLIC

	//************************************Filter alarmov**************************************************************//
	FilterVizu_P1:= '[{"logicalOperator":"and","value":100,"conditionType":">=","columnType":"cod","useAlarmState":false,"alarmState":0},{"value":199,"conditionType":"<=","columnType":"cod","useAlarmState":false,"alarmState":0}]';


		
	//***********************************Zobrazenie warningov pracoviska****************************************************//
	//0 - Pracovisko je vypnut�.
	//1 - Prebieha inicializ�cia pracoviska.
	//2 - Na pracovisku prebieha v�roba.
	//3 - Prebieha ukon�enie pracovn�ho cyklu pracoviska.
	//4 - Prebieha re�im vypr�zdnenia linky.
	//5 - Robot nie je prepnuty do automatick�ho re�imu !!!
	//6 - Dopl� z�sobn�k skrutiek K30 !!!
	//7 - Dopl� z�sobn�k skrutiek M5 !!!
    //8 - Dopl� z�sobn�k skrutiek M4 !!!
    //10 - Testovac� kus 
	
	IF NOT P1_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
		P1_Vizu.Warnings_Index:= 5;
	ELSIF P1_Srobovanie.STAV.Zasobnik_K30_Prazdny THEN
		P1_Vizu.Warnings_Index:= 6;
	ELSIF P1_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN
		P1_Vizu.Warnings_Index:= 7;
	ELSIF P1_Srobovanie.STAV.Zasobnik_M4_Prazdny THEN
        P1_Vizu.Warnings_Index:= 8;
    ELSIF Linka.TestovaciKus THEN
        P1_Vizu.Warnings_Index:= 10;
	ELSIF Linka.VyprazdnenieLinky THEN
		P1_Vizu.Warnings_Index:= 4;
	ELSIF P1_Pracovisko.STAV.Automat AND NOT P1_Pracovisko.STAV.PoINIT AND NOT P1_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P1_Vizu.Warnings_Index:= 1;		
	ELSIF P1_Pracovisko.STAV.PoINIT AND NOT P1_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P1_Vizu.Warnings_Index:= 2;	
	ELSIF P1_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P1_Vizu.Warnings_Index:= 3;	
	ELSIF NOT P1_Pracovisko.STAV.Automat THEN
		P1_Vizu.Warnings_Index:= 0;
	END_IF	
	
		//************************Prep�nanie farby textov�ho pola warning zariadenia***********************************//
		IF P1_Vizu.Warnings_Index = 0 THEN
			P1_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P1_Vizu.Warnings_Index = 1 THEN
		P1_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P1_Vizu.Warnings_Index = 2 THEN
		P1_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P1_Vizu.Warnings_Index = 3 THEN
		P1_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P1_Vizu.Warnings_Index = 4 THEN
        P1_Vizu.Warnings_Farba:= "TextOutput_Green";
    ELSIF P1_Vizu.Warnings_Index = 10 THEN
        P1_Vizu.Warnings_Farba:= "TextOutput_Green";    
	ELSE
		IF Blikac1s THEN
			P1_Vizu.Warnings_Farba:= "TextOutput_Red";
		ELSE	
			P1_Vizu.Warnings_Farba:= "TextOutput_Grey";
		END_IF
	END_IF	

	//***********************Prepnutie na obrazovku Automat z ru�n�ho re�imu******************//
    IF P1_Pracovisko.STAV.Manual AND NOT Safety.STAV.P1_ZamkyBunky_AKTIVNE THEN
        P1_Pracovisko.Reset:= TRUE;
        P1_Vizu.GoPage:= 'PageBootP1';
    END_IF    
		
	//***********************Prepnutie bootovacej obrazovky********************************//
	IF NOT Safety.STAV.SafetyPLC_Nabehlo THEN
        P1_Vizu.GoPage:= 'PageBootP1';
    ELSIF CasPrepnutiaObrazovky.Q THEN
        P1_Vizu.GoPage:= 'PageBootP1';
	ELSIF P1_Vizu.ActualPage = 'PageBootP1' AND Safety.STAV.SafetyPLC_Nabehlo THEN
		P1_Vizu.GoPage:= 'PageAutomatP1';
	END_IF	
	
    CasPrepnutiaObrazovky.IN:= P1_Vizu.ActualPage = 'PageBootP1' AND P1_Vizu.GoPage = 'PageAutomatP1';
    CasPrepnutiaObrazovky.PT:= T#5s;
    CasPrepnutiaObrazovky();
	
	
	
	
	//*************************************Zamknutie tla��tok***************************************************************//
	//Tla��tko �tat Automat//
	IF P1_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
        P1_Vizu.TL_StartAutomat_ENABLE:= FALSE;
    ELSIF P1_Pracovisko.STAV.PORUCHA THEN
        P1_Vizu.TL_StartAutomat_ENABLE:= FALSE;
    ELSIF NOT P1_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
		P1_Vizu.TL_StartAutomat_ENABLE:= FALSE;
	ELSIF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
		P1_Vizu.TL_StartAutomat_ENABLE:= FALSE;
	ELSE	
        P1_Vizu.TL_StartAutomat_ENABLE:= TRUE;
    END_IF	
	
    //Tla��tko Ukon�enie Cyklu//
	IF P1_Pracovisko.STAV.PoINIT THEN
		P1_Vizu.TL_KoniecCyklu_ENABLE:= TRUE;
	ELSE	
		P1_Vizu.TL_KoniecCyklu_ENABLE:= FALSE;
	END_IF	
	
    //Tla��tko STOP//
    IF P1_Pracovisko.STAV.PoINIT THEN
        P1_Vizu.TL_STOP_ENABLE:= FALSE;
    ELSE    
        P1_Vizu.TL_STOP_ENABLE:= TRUE;
    END_IF    
    
    
    
	//Tla��tko Re�im Automat//
	
    P1_Vizu.TL_RezimAutomat_ENABLE:= TRUE;
    	
	
	//Tla��tko Re�im Manual//
	IF P1_Pracovisko.STAV.Automat THEN
		P1_Vizu.TL_RezimManual_ENABLE:= FALSE;
	ELSIF NOT P1_Pracovisko.STAV.Manual AND NOT P1_Pracovisko.STAV.READY THEN
        P1_Vizu.TL_RezimManual_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P1_ZamkyBunky_AKTIVNE THEN
        P1_Vizu.TL_RezimManual_ENABLE:= FALSE;
	ELSE
		P1_Vizu.TL_RezimManual_ENABLE:= TRUE;
	END_IF	
	
	//Tla��tka ovl�dania z�mkov//
	IF NOT P1_Pracovisko.STAV.Automat THEN
		P1_Vizu.TL_OvladaniaZamkov_ENABLE:= TRUE;
	ELSE	
		P1_Vizu.TL_OvladaniaZamkov_ENABLE:= FALSE;
	END_IF
	
	
    //Tla��tko zmena modelu//
    IF Linka.STAV.Vypnuta THEN
        P1_Vizu.TL_VolbaModelu_ENABLE:= TRUE;
    ELSE
        P1_Vizu.TL_VolbaModelu_ENABLE:= FALSE;
    END_IF    
    
	//Tla��tko paletka prech�dza//
    IF NOT Linka.STAV.PoINIT THEN
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= FALSE;
    ELSIF NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN    
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= FALSE;
    ELSIF Linka.TestovaciKus THEN
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= FALSE;
    ELSIF Linka.Revork THEN
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= FALSE;
    ELSIF Linka.PaletkaPrechadza THEN
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= FALSE;
    ELSE
        P1_Vizu.TL_PaletkaPrechadza_ENABLE:= TRUE;
    END_IF	
	
	
	//Tla��tko vypr�zdnenie linky//
	IF Linka.VyprazdnenieLinky THEN
		P1_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
	ELSIF NOT P4_Pracovisko.STAV.Automat THEN
        P1_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
    ELSIF Linka.TestovaciKus THEN
        P1_Vizu.TL_VyprazdnenieLinky_ENABLE:= FALSE;
    ELSE
		P1_Vizu.TL_VyprazdnenieLinky_ENABLE:= TRUE;
	END_IF	
	
    //Tla��tko testovac� kus//
    IF NOT Linka.STAV.PoINIT THEN
        P1_Vizu.TL_TestovaciKus_ENABLE:= FALSE;
    ELSIF Linka.Revork THEN
        P1_Vizu.TL_TestovaciKus_ENABLE:= FALSE;
    ELSIF NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN
        P1_Vizu.TL_TestovaciKus_ENABLE:= FALSE;
    ELSIF Linka.PaletkaPrechadza THEN 
        P1_Vizu.TL_TestovaciKus_ENABLE:= FALSE;
    ELSE
        P1_Vizu.TL_TestovaciKus_ENABLE:= TRUE;
    END_IF    
    
    //Tla��tko retest//
    IF NOT Linka.STAV.PoINIT THEN
        P1_Vizu.TL_Revork_ENABLE:= FALSE;
    ELSIF NOT P1_Vytah.IN.PritomnostPaletky_S19 THEN
        P1_Vizu.TL_Revork_ENABLE:= FALSE;
    ELSIF Linka.TestovaciKus THEN
        P1_Vizu.TL_Revork_ENABLE:= FALSE;
    ELSIF Linka.PaletkaPrechadza THEN 
        P1_Vizu.TL_Revork_ENABLE:= FALSE;
    ELSE
        P1_Vizu.TL_Revork_ENABLE:= TRUE;
    END_IF  
    
    
    //Tla��tka spustenie �istenie skrutkova�iek v ru�nom re�ime//
    IF NOT P1_Srobovacky_VychodziaPozicia THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_K30_BUSY THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovanie.STAV.OsX_HomingOK THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovanie.STAV.OsY_HomingOK THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;   
    ELSE
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= TRUE;
    END_IF    
    
    
    //Tla��tka ovl�dania v��ahu v ru�nom re�ime//
    IF NOT P1_Vytah.STAV.ServoZdvihu_HomingOK THEN
        P1_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF P1_Vytah.STAV.ServoZdvihu_Homing_BUSY THEN
        P1_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
        P1_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
        P1_Vizu.TL_OvladanieVytahu_ENABLE:= FALSE;
    ELSE
        P1_Vizu.TL_OvladanieVytahu_ENABLE:= TRUE;
    END_IF    
    
    //Tla��tko homing zdvihu v��ahu//
    IF P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
        P1_Vizu.TL_HomingVytahu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
       P1_Vizu.TL_HomingVytahu_ENABLE:= FALSE; 
    ELSE
        P1_Vizu.TL_HomingVytahu_ENABLE:= TRUE;
    END_IF    
    
    
    
    //Tla��tka ovl�danie osy X manipul�tora �r�bova�iek//
    IF NOT P1_Srobovanie.STAV.OsX_HomingOK THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovacky_VychodziaPozicia THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE; 
    ELSIF P1_Srobovanie.STAV.Cistenie_K30_BUSY THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE; 
    ELSIF P1_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;       
    ELSE
        P1_Vizu.Srobovanie_OvlManipOsX_ENABLE:= TRUE;
    END_IF	
    
    //Tla��tka ovl�dania osy Y manipulatora �r�bova�iek//
    IF NOT P1_Srobovanie.STAV.OsY_HomingOK THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovacky_VychodziaPozicia THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSIF P1_Srobovanie.STAV.Cistenie_K30_BUSY THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSIF P1_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;     
    ELSE
        P1_Vizu.Srobovanie_OvlManipOsY_ENABLE:= TRUE;
    END_IF
    
    
    //Tla��tka spustenie �istenie skrutkova�iek v ru�nom re�ime//
    IF NOT P1_Srobovacky_VychodziaPozicia THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_K30_BUSY THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovanie.STAV.OsX_HomingOK THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovanie.STAV.OsY_HomingOK THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE; 
    ELSIF P1_UrovenPrihlasenehoUzivatela < 20 THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSE
        P1_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= TRUE;
    END_IF  
    
    //Tla��tko edit�cie u�ivatelov//
    IF P1_UrovenPrihlasenehoUzivatela = 100 THEN
        P1_Vizu.TL_Uzivatelia_ENABLE:= TRUE;
    ELSE
        P1_Vizu.TL_Uzivatelia_ENABLE:= FALSE;
    END_IF    
    
    
    //Zamknutie tla��tok test pozicii skrutkova�iek//
    IF NOT P1_Srobovanie.STAV.OsX_HomingOK THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF NOT P1_Srobovanie.STAV.OsY_HomingOK THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;    
    ELSIF NOT P1_Srobovacky_VychodziaPozicia THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_K30_BUSY THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.STAV.Cistenie_M4_BUSY THEN    
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_UrovenPrihlasenehoUzivatela < 100 THEN    
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE; 
    ELSE    
        P1_Vizu.RR_PozicieSkrutiek_ENABLE:= TRUE;
    END_IF
    
    
    
    //**************************Zamknutie edit�cie parametrov*********************************//
   IF P1_UrovenPrihlasenehoUzivatela >= 20 THEN
        P1_Vizu.EditaciaParametrov_ENABLE:= TRUE;
   ELSE     
        P1_Vizu.EditaciaParametrov_ENABLE:= FALSE;
   END_IF     
    
    
    
	//***************************************Zmena farieb tla��tok pre ovl�danie z�mkou********************************//
	//Predn� dvere //
	IF Safety.OUT.P1_ZamkniZamok_PredneDvere AND Safety.IN.P1_PredneDvere_PritomPetlice THEN
		P1_Vizu.TL_PrednyZamok_Farba:= "Button_Green";
	ELSIF Safety.IN.P1_PredneDvere_PritomPetlice THEN
		IF Blikac1s THEN
			P1_Vizu.TL_PrednyZamok_Farba:= "Button_Blue";
		ELSE
			P1_Vizu.TL_PrednyZamok_Farba:= "Operate";
		END_IF	
	ELSE	
		P1_Vizu.TL_PrednyZamok_Farba:= "Button_Red";
	END_IF	
	
		
	//Zadn� dvere prav� strana//
	IF Safety.OUT.P1_ZamkniZamok_ZadneDverePS AND Safety.IN.P1_ZadneDverePS_PritomPetlice THEN
		P1_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Green";
	ELSIF Safety.IN.P1_ZadneDverePS_PritomPetlice THEN
		IF Blikac1s THEN
			P1_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Blue";
		ELSE
			P1_Vizu.TL_ZadnyZamokPS_Farba:= "Operate";
		END_IF	
	ELSE	
		P1_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Red";
	END_IF	
	
	//Zadn� dvere lav� strana//
	IF Safety.OUT.P1_ZamkniZamok_ZadneDvereLS AND Safety.IN.P1_ZadneDvereLS_PritomPetlice THEN
		P1_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Green";
	ELSIF Safety.IN.P1_ZadneDvereLS_PritomPetlice THEN	
		IF Blikac1s THEN
			P1_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Blue";
		ELSE
			P1_Vizu.TL_ZadnyZamokLS_Farba:= "Operate";
		END_IF	
	ELSE	
		P1_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Red";
	END_IF	
	
	
	
	//***********************************Prep�nanie stavov pracov�sk*******************************************************************//
	//V��ah//
	IF NOT P1_Vytah.IN.Dopravnik_READY THEN
		P1_Vizu.IndexStavu_Vytah:= 3;
	ELSIF P1_PoruchaST1 THEN
		P1_Vizu.IndexStavu_Vytah:= 3;
	ELSIF P1_Vytah.Automat AND NOT P1_Vytah.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Vytah:= 1;
	ELSIF P1_Vytah.Automat AND P1_Vytah.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Vytah:= 2;
	ELSE
		P1_Vizu.IndexStavu_Vytah:= 0;
	END_IF	
		

	//Dopravn�ky//
	IF NOT P1_Dopravniky.IN.HornyDoprav_READY OR NOT P1_Dopravniky.IN.SpodnyDoprav_READY THEN
		P1_Vizu.IndexStavu_Dopravnik:= 3;
	ELSIF P1_Dopravniky.Automat AND NOT P1_Dopravniky.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Dopravnik:= 1;
	ELSIF P1_Dopravniky.Automat AND P1_Dopravniky.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Dopravnik:= 2;
	ELSE
		P1_Vizu.IndexStavu_Dopravnik:= 0;
	END_IF	
	
	
	//Spodn� stoper//
	IF P1_SpodnyStoper.Automat AND NOT P1_SpodnyStoper.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_SpodnyStoper:= 1;
	ELSIF P1_SpodnyStoper.Automat AND P1_SpodnyStoper.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_SpodnyStoper:= 2;
	ELSE
		P1_Vizu.IndexStavu_SpodnyStoper:= 0;
	END_IF	
	
	//Stoper �robovania//
	IF P1_PoruchaST2 THEN
		P1_Vizu.IndexStavu_StoperSrobovania:= 3;
	ELSIF P1_StoperSrobovania.Automat AND NOT P1_StoperSrobovania.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_StoperSrobovania:= 1;
	ELSIF P1_StoperSrobovania.Automat AND P1_StoperSrobovania.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_StoperSrobovania:= 2;
	ELSE
		P1_Vizu.IndexStavu_StoperSrobovania:= 0;
	END_IF	
	
	
	
	//�robovanie//
	IF P1_PoruchaST2 THEN
		P1_Vizu.IndexStavu_Srobovanie:= 3;
	ELSIF P1_Srobovanie.Automat AND NOT P1_Srobovanie.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Srobovanie:= 1;
	ELSIF P1_Srobovanie.Automat AND P1_Srobovanie.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Srobovanie:= 2;
	ELSE
		P1_Vizu.IndexStavu_Srobovanie:= 0;
	END_IF	
	
	
	
	//Akumula�n� stoper//
	IF P1_AkumulacnyStoper.Automat AND NOT P1_AkumulacnyStoper.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_AkumulacnyStoper:= 1;
	ELSIF P1_AkumulacnyStoper.Automat AND P1_AkumulacnyStoper.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_AkumulacnyStoper:= 2;
	ELSE
		P1_Vizu.IndexStavu_AkumulacnyStoper:= 0;
	END_IF	
	
	
	
	
	//Robot//
	IF P1_Robot.Automat AND NOT P1_Robot.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Robot:= 1;
	ELSIF P1_Robot.Automat AND P1_Robot.STAV.PoINIT THEN
		P1_Vizu.IndexStavu_Robot:= 2;
	ELSE
		P1_Vizu.IndexStavu_Robot:= 0;
	END_IF	
	
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


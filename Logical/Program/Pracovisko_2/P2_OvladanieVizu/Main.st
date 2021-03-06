
PROGRAM _INIT
	
	P2_Vizu.GoPage:= 'PageBootP2';
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//************************************Filter alarmov**************************************************************//
	FilterVizu_P2:= '[{"logicalOperator":"and","value":200,"conditionType":">=","columnType":"cod","useAlarmState":false,"alarmState":0},{"value":299,"conditionType":"<=","columnType":"cod","useAlarmState":false,"alarmState":0}]';


	
	
	//***********************************Zobrazenie warningov pracoviska****************************************************//
	//0 - Pracovisko je vypnut�.
	//1 - Prebieha inicializ�cia pracoviska.
	//2 - Na pracovisku prebieha v�roba.
	//3 - Prebieha ukon�enie pracovn�ho cyklu pracoviska.
	//4 - Prebieha re�im vypr�zdnenia linky.
	//5 - Robot nie je prepnuty do automatick�ho re�imu !!!
	//6 - Dopl� z�sobn�k mat�c M4 !!!
	//7 - Dopl� z�sobn�k skrutiek M4 !!!
	//8 - Dopl� z�sobn�k skrutiek M5 !!!
	//9 - Dopl� z�sobn�k skrutiek M6 !!!
	
	
	IF NOT P2_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
		P2_Vizu.Warnings_Index:= 5;
	ELSIF P2_SkrutkovacMatic.STAV.Zasobnik_Matic_M4_Prazdny THEN
		P2_Vizu.Warnings_Index:= 6;
	ELSIF P2_Srobovanie.STAV.Zasobnik_M4_Prazdny THEN
		P2_Vizu.Warnings_Index:= 7;
	ELSIF P2_Srobovanie.STAV.Zasobnik_M5_Prazdny THEN
		P2_Vizu.Warnings_Index:= 8;
	ELSIF P2_Srobovanie.STAV.Zasobnik_M6_Prazdny THEN
        P2_Vizu.Warnings_Index:= 9;	
    ELSIF Linka.TestovaciKus THEN
        P2_Vizu.Warnings_Index:= 11;	
	ELSIF Linka.VyprazdnenieLinky THEN
		P2_Vizu.Warnings_Index:= 4;
	ELSIF P2_Pracovisko.STAV.Automat AND NOT P2_Pracovisko.STAV.PoINIT AND NOT P2_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P2_Vizu.Warnings_Index:= 1;		
	ELSIF P2_Pracovisko.STAV.PoINIT AND NOT P2_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P2_Vizu.Warnings_Index:= 2;	
	ELSIF P2_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
		P2_Vizu.Warnings_Index:= 3;	
	ELSIF NOT P2_Pracovisko.STAV.Automat THEN
		P2_Vizu.Warnings_Index:= 0;
	END_IF	
	
	

	
	//************************Prep�nanie farby textov�ho pola warning zariadenia***********************************//
	IF P2_Vizu.Warnings_Index = 0 THEN
		P2_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P2_Vizu.Warnings_Index = 1 THEN
		P2_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P2_Vizu.Warnings_Index = 2 THEN
		P2_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P2_Vizu.Warnings_Index = 3 THEN
		P2_Vizu.Warnings_Farba:= "TextOutput_Green";
	ELSIF P2_Vizu.Warnings_Index = 4 THEN
        P2_Vizu.Warnings_Farba:= "TextOutput_Green";
    ELSIF P2_Vizu.Warnings_Index = 11 THEN
        P2_Vizu.Warnings_Farba:= "TextOutput_Green";    
	ELSE
		IF Blikac1s THEN
			P2_Vizu.Warnings_Farba:= "TextOutput_Red";
		ELSE	
			P2_Vizu.Warnings_Farba:= "TextOutput_Grey";
		END_IF
	END_IF	

	
    //***********************Prepnutie na obrazovku Automat z ru�n�ho re�imu******************//
    IF P2_Pracovisko.STAV.Manual AND NOT Safety.STAV.P2_ZamkyBunky_AKTIVNE THEN
        P2_Pracovisko.Reset:= TRUE;
        P2_Vizu.GoPage:= 'PageBootP2';
    END_IF  
    
    
		
	//***********************Prepnutie bootovacej obrazovky********************************//
	IF NOT Safety.STAV.SafetyPLC_Nabehlo THEN
        P2_Vizu.GoPage:= 'PageBootP2';
    ELSIF CasPrepnutiaObrazovky.Q THEN
        P2_Vizu.GoPage:= 'PageBootP2';    
	ELSIF P2_Vizu.ActualPage = 'PageBootP2' AND Safety.STAV.SafetyPLC_Nabehlo THEN
		P2_Vizu.GoPage:= 'PageAutomatP2';
	END_IF	
		
    CasPrepnutiaObrazovky.IN:= P2_Vizu.ActualPage = 'PageBootP2' AND P2_Vizu.GoPage = 'PageAutomatP2';
    CasPrepnutiaObrazovky.PT:= T#5s;
    CasPrepnutiaObrazovky();
    
    
	
	
	
	
	//*************************************Zamknutie tla��tok***************************************************************//
	//Tla��tko �tat Automat//
	IF P2_Pracovisko.STAV.UkoncenieCyklu_BUSY THEN
        P2_Vizu.TL_StartAutomat_ENABLE:= FALSE;
    ELSIF P2_Pracovisko.STAV.PORUCHA THEN
        P2_Vizu.TL_StartAutomat_ENABLE:= FALSE;
    ELSIF NOT P2_Robot.KOM_IN.Stav_RezimAUTOMAT THEN
		P2_Vizu.TL_StartAutomat_ENABLE:= FALSE;
	ELSIF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA THEN	
		P2_Vizu.TL_StartAutomat_ENABLE:= FALSE;
    ELSE	
        P2_Vizu.TL_StartAutomat_ENABLE:= TRUE;
    END_IF	
    
    
    
    
    
	//Tla��tko Ukon�enie Cyklu//
	IF P2_Pracovisko.STAV.PoINIT THEN
		P2_Vizu.TL_KoniecCyklu_ENABLE:= TRUE;
	ELSE	
		P2_Vizu.TL_KoniecCyklu_ENABLE:= FALSE;
	END_IF	
	
    //Tla��tko STOP//
    IF P2_Pracovisko.STAV.PoINIT THEN
        P2_Vizu.TL_STOP_ENABLE:= FALSE;
    ELSE    
        P2_Vizu.TL_STOP_ENABLE:= TRUE;
    END_IF 
    
    
	//Tla��tko Re�im Automat//
	P2_Vizu.TL_RezimAutomat_ENABLE:= TRUE;
    
    //Tla��tko Re�im Manual//
	IF P2_Pracovisko.STAV.Automat THEN
		P2_Vizu.TL_RezimManual_ENABLE:= FALSE;
	ELSIF NOT P2_Pracovisko.STAV.Manual AND NOT P2_Pracovisko.STAV.READY THEN
        P2_Vizu.TL_RezimManual_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P2_ZamkyBunky_AKTIVNE THEN
        P2_Vizu.TL_RezimManual_ENABLE:= FALSE;
	ELSE
		P2_Vizu.TL_RezimManual_ENABLE:= TRUE;
	END_IF	
	
	//Tla��tka ovl�dania z�mkov//
	IF NOT P2_Pracovisko.STAV.Automat THEN
		P2_Vizu.TL_OvladaniaZamkov_ENABLE:= TRUE;
	ELSE	
		P2_Vizu.TL_OvladaniaZamkov_ENABLE:= FALSE;
	END_IF	
	
	//Tla��tko ovl�dania zdvihu zaklada�a tesnenia//
	IF NOT P2_ZakladacTesnenia.STAV.ServoZdvihu_HomingOK THEN
        P2_Vizu.ZaklTesnenia_OvlZdvihu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Pojazd_ZASUNUTY THEN
        P2_Vizu.ZaklTesnenia_OvlZdvihu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
        P2_Vizu.ZaklTesnenia_OvlZdvihu_ENABLE:= FALSE;
	ELSE
		P2_Vizu.ZaklTesnenia_OvlZdvihu_ENABLE:= TRUE;
	END_IF	
	
	//Tla��tko ovl�dania zostupu zaklada�a tesnenia//
	IF NOT P2_ZakladacTesnenia.STAV.ServoZdvihu_HomingOK THEN
		P2_Vizu.ZaklTesnenia_OvlZostupu_ENABLE:= FALSE;
	ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Pojazd_ZASUNUTY THEN
        P2_Vizu.ZaklTesnenia_OvlZostupu_ENABLE:= FALSE;
    ELSIF NOT Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
        P2_Vizu.ZaklTesnenia_OvlZostupu_ENABLE:= FALSE;
	ELSE
		P2_Vizu.ZaklTesnenia_OvlZostupu_ENABLE:= TRUE;
	END_IF	
	
	
	//Tla��tka ovl�dania pojazdu zaklada�a tesnenia//
	IF NOT P2_ZakladacTesnenia.STAV.ServoPojazdu_HomingOK THEN
		P2_Vizu.ZaklTesnenia_OvlPojazdu_ENABLE:= FALSE;
	ELSIF P2_ZakladacTesnenia.STAV.Zdvih_AktualnaPozicia > 5 THEN
        P2_Vizu.ZaklTesnenia_OvlPojazdu_ENABLE:= FALSE;
    ELSE
		P2_Vizu.ZaklTesnenia_OvlPojazdu_ENABLE:= TRUE;
	END_IF	
	
	
	
	//Tla��tka ovl�danie osy X manipul�tora �r�bova�iek//
	IF NOT P2_Srobovanie.STAV.OsX_HomingOK THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF NOT P2_Srobovacky_VychodziaPozicia THEN  
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE; 
    ELSIF P2_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE; 
    ELSIF P2_Srobovanie.STAV.Cistenie_M5_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M6_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= FALSE;    
	ELSE
		P2_Vizu.Srobovanie_OvlManipOsX_ENABLE:= TRUE;
	END_IF	
	
	
	//Tla��tka ovl�dania osy Y manipulatora �r�bova�iek//
	IF NOT P2_Srobovanie.STAV.OsY_HomingOK THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF NOT P2_Srobovacky_VychodziaPozicia THEN  
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSIF P2_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE; 
    ELSIF P2_Srobovanie.STAV.Cistenie_M5_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M6_BUSY THEN
        P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= FALSE;      
	ELSE
		P2_Vizu.Srobovanie_OvlManipOsY_ENABLE:= TRUE;
	END_IF
	
	//Tla��tka ovl�dania zdvihu zv�rania//
	IF NOT P2_Zvaranie.STAV.ServoZdvihu_HomingOK THEN
        P2_Vizu.Zvaranie_OvlZdvihu_ENABLE:= FALSE;
    ELSE	
		P2_Vizu.Zvaranie_OvlZdvihu_ENABLE:= TRUE;
	END_IF	
	
	
    //Tla��tka spustenie �istenie skrutkova�iek v ru�nom re�ime//
    IF NOT P2_Srobovacky_VychodziaPozicia THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M5_BUSY THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M6_BUSY THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P2_Srobovanie.STAV.OsX_HomingOK THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF NOT P2_Srobovanie.STAV.OsY_HomingOK THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_UrovenPrihlasenehoUzivatela < 20 THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= FALSE;    
    ELSE
        P2_Vizu.RR_CistenieSkrutkovaciek_ENABLE:= TRUE;
    END_IF    
    
    //Zamknutie tla��tok test pozicii skrutkova�iek//
    IF NOT P2_Srobovanie.STAV.OsX_HomingOK THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF NOT P2_Srobovanie.STAV.OsY_HomingOK THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;    
    ELSIF NOT P2_Srobovacky_VychodziaPozicia THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M4_BUSY THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M5_BUSY THEN    
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.STAV.Cistenie_M6_BUSY THEN    
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;    
    ELSIF P2_UrovenPrihlasenehoUzivatela < 100 THEN    
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE;
    ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= FALSE; 
    ELSE    
        P2_Vizu.RR_PozicieSkrutiek_ENABLE:= TRUE;
    END_IF
    
    
    
    
    
    
    
    
    
    
    
	//**************************Zamknutie edit�cie parametrov*********************************//
    IF P2_UrovenPrihlasenehoUzivatela >= 20 THEN
        P2_Vizu.EditaciaParametrov_ENABLE:= TRUE;
    ELSE     
        P2_Vizu.EditaciaParametrov_ENABLE:= FALSE;
    END_IF     
    
	
	//***************************************Zmena farieb tla��tok pre ovl�danie z�mkou********************************//
	//Predn� dvere prav� strana//
	IF Safety.OUT.P2_ZamkniZamok_PredneDverePS AND Safety.IN.P2_PredneDverePS_PritomPetlice THEN
		P2_Vizu.TL_PrednyZamokPS_Farba:= "Button_Green";
	ELSIF Safety.IN.P2_PredneDverePS_PritomPetlice THEN
		IF Blikac1s THEN
			P2_Vizu.TL_PrednyZamokPS_Farba:= "Button_Blue";
		ELSE
			P2_Vizu.TL_PrednyZamokPS_Farba:= "Operate";
		END_IF	
	ELSE	
		P2_Vizu.TL_PrednyZamokPS_Farba:= "Button_Red";
	END_IF	
	
	//Predn� dvere lav� strana//
	IF Safety.OUT.P2_ZamkniZamok_PredneDvereLS AND Safety.IN.P2_PredneDvereLS_PritomPetlice THEN
		P2_Vizu.TL_PrednyZamokLS_Farba:= "Button_Green";
	ELSIF Safety.IN.P2_PredneDvereLS_PritomPetlice THEN	
		IF Blikac1s THEN
			P2_Vizu.TL_PrednyZamokLS_Farba:= "Button_Blue";
		ELSE
			P2_Vizu.TL_PrednyZamokLS_Farba:= "Operate";
		END_IF	
	ELSE	
		P2_Vizu.TL_PrednyZamokLS_Farba:= "Button_Red";
	END_IF	
	
	//Zadn� dvere prav� strana//
	IF Safety.OUT.P2_ZamkniZamok_ZadneDverePS AND Safety.IN.P2_ZadneDverePS_PritomPetlice THEN
		P2_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Green";
	ELSIF Safety.IN.P2_ZadneDverePS_PritomPetlice THEN
		IF Blikac1s THEN
			P2_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Blue";
		ELSE
			P2_Vizu.TL_ZadnyZamokPS_Farba:= "Operate";
		END_IF	
	ELSE	
		P2_Vizu.TL_ZadnyZamokPS_Farba:= "Button_Red";
	END_IF	
	
	//Zadn� dvere lav� strana//
	IF Safety.OUT.P2_ZamkniZamok_ZadneDvereLS AND Safety.IN.P2_ZadneDvereLS_PritomPetlice THEN
		P2_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Green";
	ELSIF Safety.IN.P2_ZadneDvereLS_PritomPetlice THEN	
		IF Blikac1s THEN
			P2_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Blue";
		ELSE
			P2_Vizu.TL_ZadnyZamokLS_Farba:= "Operate";
		END_IF	
	ELSE	
		P2_Vizu.TL_ZadnyZamokLS_Farba:= "Button_Red";
	END_IF	
	
	
	
	//***********************************Prep�nanie stavov pracov�sk*******************************************************************//
	//Dopravn�ky//
	IF NOT P2_Dopravniky.IN.HornyDoprav_READY OR NOT P2_Dopravniky.IN.SpodnyDoprav_READY THEN
		P2_Vizu.IndexStavu_Dopravnik:= 3;
	ELSIF P2_Dopravniky.Automat AND NOT P2_Dopravniky.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Dopravnik:= 1;
	ELSIF P2_Dopravniky.Automat AND P2_Dopravniky.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Dopravnik:= 2;
	ELSE
		P2_Vizu.IndexStavu_Dopravnik:= 0;
	END_IF	
	

	//Stoper zakladania tesnenia//
	IF P2_PoruchaST1 THEN
		P2_Vizu.IndexStavu_StoperZakladacaTesn:= 3;
	ELSIF P2_StoperZaklTesnenia.Automat AND NOT P2_StoperZaklTesnenia.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperZakladacaTesn:= 1;
	ELSIF P2_StoperZaklTesnenia.Automat AND P2_StoperZaklTesnenia.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperZakladacaTesn:= 2;
	ELSE
		P2_Vizu.IndexStavu_StoperZakladacaTesn:= 0;
	END_IF		
	
	//Zaklada� tesnenia//
	IF P2_PoruchaST1 THEN
		P2_Vizu.IndexStavu_ZakladacaTesnenia:= 3;
	ELSIF P2_ZakladacTesnenia.Automat AND NOT P2_ZakladacTesnenia.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_ZakladacaTesnenia:= 1;
	ELSIF P2_ZakladacTesnenia.Automat AND P2_ZakladacTesnenia.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_ZakladacaTesnenia:= 2;
	ELSE
		P2_Vizu.IndexStavu_ZakladacaTesnenia:= 0;
	END_IF	
	
	//Stoper maticova�ky//
	IF P2_PoruchaST2 THEN
		P2_Vizu.IndexStavu_StoperMaticovacky:= 3;
	ELSIF P2_StoperMaticovacky.Automat AND NOT P2_StoperMaticovacky.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperMaticovacky:= 1;
	ELSIF P2_StoperMaticovacky.Automat AND P2_StoperMaticovacky.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperMaticovacky:= 2;
	ELSE
		P2_Vizu.IndexStavu_StoperMaticovacky:= 0;
	END_IF	
	
	
	//Stoper �robovania//
	IF P2_PoruchaST3 THEN
		P2_Vizu.IndexStavu_StoperSrobovania:= 3;
	ELSIF P2_StoperSrobovania.Automat AND NOT P2_StoperSrobovania.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperSrobovania:= 1;
	ELSIF P2_StoperSrobovania.Automat AND P2_StoperSrobovania.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperSrobovania:= 2;
	ELSE
		P2_Vizu.IndexStavu_StoperSrobovania:= 0;
	END_IF	
	
	
	
	//�robovanie//
	IF P2_PoruchaST3 THEN
		P2_Vizu.IndexStavu_Srobovania:= 3;
	ELSIF P2_Srobovanie.Automat AND NOT P2_Srobovanie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Srobovania:= 1;
	ELSIF P2_Srobovanie.Automat AND P2_Srobovanie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Srobovania:= 2;
	ELSE
		P2_Vizu.IndexStavu_Srobovania:= 0;
	END_IF	
	
	
	//Robot//
	IF P2_Robot.Automat AND NOT P2_Robot.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Robot:= 1;
	ELSIF P2_Robot.Automat AND P2_Robot.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Robot:= 2;
	ELSE
		P2_Vizu.IndexStavu_Robot:= 0;
	END_IF	
	
	
	//Stoper zv�rania//
	IF P2_PoruchaST4 THEN
		P2_Vizu.IndexStavu_StoperZvarania:= 3;
	ELSIF P2_StoperZvarania.Automat AND NOT P2_StoperZvarania.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperZvarania:= 1;
	ELSIF P2_StoperZvarania.Automat AND P2_StoperZvarania.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_StoperZvarania:= 2;
	ELSE
		P2_Vizu.IndexStavu_StoperZvarania:= 0;
	END_IF	
	
	
	//Zv�ranie//
	IF P2_PoruchaST4 THEN
		P2_Vizu.IndexStavu_Zvaranie:= 3;
	ELSIF P2_Zvaranie.Automat AND NOT P2_Zvaranie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Zvaranie:= 1;
	ELSIF P2_Zvaranie.Automat AND P2_Zvaranie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Zvaranie:= 2;
	ELSE
		P2_Vizu.IndexStavu_Zvaranie:= 0;
	END_IF	
	
	//�istenie//
	IF P2_PoruchaST4 THEN
		P2_Vizu.IndexStavu_Cistenie:= 3;
	ELSIF P2_Cistenie.Automat AND NOT P2_Cistenie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Cistenie:= 1;
	ELSIF P2_Cistenie.Automat AND P2_Cistenie.STAV.PoINIT THEN
		P2_Vizu.IndexStavu_Cistenie:= 2;
	ELSE
		P2_Vizu.IndexStavu_Cistenie:= 0;
	END_IF	
	
       
    
    
    
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


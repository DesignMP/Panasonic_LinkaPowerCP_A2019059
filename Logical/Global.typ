(*************Parametre paletky*********************)

TYPE
	Paletka_typ : 	STRUCT 
		PAR : PaletkaPAR_typ;
		VnutornyStav : PaletkaSTAV_typ;
	END_STRUCT;
	PaletkaPAR_typ : 	STRUCT 
		TypModelu : STRING[5]; (*4F, 5F, 5H urËujem na pracovisku Ë.1 keÔ dostanem zo servera ËÌslo v˝robku*)
		CisloPaletky : STRING[2]; (*Je pevne danÈ Ëipom RFID*)
		KodModelu : STRING[32]; (*Dostanem pridelene na pracovisku etiketovania*)
		StavPowerCP : STRING[4]; (*Stav vyûiadan˝ zo servera  - PASS, FAIL,  ktor˝ sa menÌ v pribehu v˝roby *)
		QRkodPowerCP : STRING[30]; (*NaËÌtam ho na prvom v˝ùahu a posielam ho na server ako master number *)
		QRkodFiltra_5H : STRING[32]; (*NaËÌtam ho na pracovisku zakladania tesnenia a p·rujem ho s QR kodom Power CP*)
		QRkodFiltra_4F5F : STRING[32]; (*NaËÌtam ho na prvom v˝tahu a p·rujem ho s QR kodom Power CP*)
		TestovaciKus : BOOL; (*Tento kus prechadza len na konkrÈtnu stanicu a potom odch·dza na koniec linky*)
		CisloTestovacejStanice : STRING[20]; (*»Ìslo testovacej stanice*)
		RevorkovyKus : BOOL; (*Tento kus prech·dza na konkrÈtnu testovaciu stanicu a potom pokraËuje po linke ako v˝robn˝ kus*)
		CisloRevorkovejStanice : STRING[20]; (*»Ìslo revorkovej stanice*)
		StavPaletky : STRING[2]; (*BuÔ OK alebo NG*)
		ID_Operatora : STRING[80]; (*»Ìslo karty oper·tora*)
	END_STRUCT;
	PaletkaSTAV_typ : 	STRUCT 
		Zvaranie_Ukoncene : BOOL;
		HV_Test_Ukonceny : BOOL;
		LeakageTest_Ukonceny : BOOL;
		FunkcnyTest_Ukonceny : BOOL;
		QRkodFiltraPriradeny : BOOL;
		CisloEtiketyVyziadane : BOOL;
		FotkyOdoslane : BOOL;
		KomunikaciaOtvorena : BOOL;
		KomunikaciaUzavreta : BOOL;
		CinnostSpustena : BOOL;
		CinnostUkoncena : BOOL;
	END_STRUCT;
END_TYPE

(******************Vizualiz·cia*********************)

TYPE
	P1_Vizu_typ : 	STRUCT 
		ActualPage : STRING[80];
		GoPage : STRING[80] := 'PageBootP1';
		TL_ResetCS : BOOL;
		TL_RezimAutomat : BOOL;
		ZobrazHL1_ST1 : BOOL; (*ST1 - Ch˝baj˙ci material na paletke 4F*)
		ZobrazHL2_ST1 : BOOL; (*ST1 - Ch˝baj˙ci material na paletke 5F*)
		ZobrazHL3_ST1 : BOOL; (*ST1 - Ch˝baj˙ci material na paletke 5H*)
		ZobrazHL4_ST1 : BOOL; (*ST1 - Zl˝ alebo nepreËÌtan˝ QR kÛd na Power CP*)
		ZobrazHL5_ST1 : BOOL; (*ST1 - Zle zacvaknutÈ alebo ch˝baj˙ce piny DPS*)
		ZobrazHL6_ST1 : BOOL; (*ST1 - Zl˝ alebo nepreËÌtan˝ QR kÛd DPS*)
		ZobrazHL7_ST1 : BOOL; (*ST1 - Nespr·vny QR kÛd Power CP*)
		ZobrazHL8_ST1 : BOOL; (*ST1 - Nespr·vny QR kÛd DPS*)
		ZobrazHL9_ST1 : BOOL; (*ST1 - Odpoved systemu tracebility je NG*)
		ZobrazHL10_ST1 : BOOL;
		ZobrazHL11_ST1 : BOOL;
		ZobrazHL12_ST1 : BOOL;
		ZobrazHL13_ST1 : BOOL;
		ZobrazHL14_ST1 : BOOL; (*ST1 - Nieje prihl·sen˝ oper·tor*)
		ZobrazHL1_ST2 : BOOL;
		ZobrazHL2_ST2 : BOOL;
		ZobrazHL3_ST2 : BOOL;
		ZobrazHL4_ST2 : BOOL;
		ZobrazHL5_ST2 : BOOL;
		ZobrazHL6_ST2 : BOOL;
		ZobrazHL7_ST2 : BOOL;
		ZobrazHL8_ST2 : BOOL;
		ZobrazHL9_ST2 : BOOL; (*ST2 - Odpoved panatrace NG*)
		TL_PrednyZamok_Farba : WSTRING[80];
		TL_ZadnyZamokPS_Farba : WSTRING[80];
		TL_ZadnyZamokLS_Farba : WSTRING[80];
		TL_ZamkniPrednyZamok : BOOL;
		TL_ZamkniZadnyZamokPS : BOOL;
		TL_ZamkniZadnyZamokLS : BOOL;
		TL_StartAutomat_ENABLE : BOOL;
		TL_KoniecCyklu_ENABLE : BOOL;
		TL_Uzivatelia_ENABLE : BOOL;
		TL_STOP_ENABLE : BOOL;
		TL_VyprazdnenieLinky_ENABLE : BOOL;
		TL_RezimAutomat_ENABLE : BOOL;
		TL_RezimManual_ENABLE : BOOL;
		TL_OvladaniaZamkov_ENABLE : BOOL;
		TL_VolbaModelu_ENABLE : BOOL;
		TL_PaletkaPrechadza_ENABLE : BOOL;
		TL_TestovaciKus_ENABLE : BOOL;
		TL_Revork_ENABLE : BOOL;
		TL_OvladanieVytahu_ENABLE : BOOL;
		TL_HomingVytahu_ENABLE : BOOL;
		TL_PrihlasenieOperatora_ENABLE : BOOL;
		TL_PrihlasovOperatora_AKTIVNE : BOOL;
		Srobovanie_OvlManipOsX_ENABLE : BOOL;
		Srobovanie_OvlManipOsY_ENABLE : BOOL;
		EditaciaParametrov_ENABLE : BOOL;
		RR_CistenieSkrutkovaciek_ENABLE : BOOL;
		RR_PozicieSkrutiek_ENABLE : BOOL;
		Warnings_Farba : WSTRING[80];
		Warnings_Index : USINT;
		IndexStavu_Dopravnik : USINT;
		IndexStavu_Vytah : USINT;
		IndexStavu_SpodnyStoper : USINT;
		IndexStavu_StoperSrobovania : USINT;
		IndexStavu_Srobovanie : USINT;
		IndexStavu_AkumulacnyStoper : USINT;
		IndexStavu_Robot : USINT;
	END_STRUCT;
	P2_Vizu_typ : 	STRUCT 
		ActualPage : STRING[80];
		GoPage : STRING[80] := 'PageBootP2';
		TL_RezimAutomat : BOOL;
		TL_PrednyZamokPS_Farba : WSTRING[80];
		TL_PrednyZamokLS_Farba : WSTRING[80];
		TL_ZadnyZamokPS_Farba : WSTRING[80];
		TL_ZadnyZamokLS_Farba : WSTRING[80];
		TL_ZamkniPrednyZamokPS : BOOL;
		TL_ZamkniPrednyZamokLS : BOOL;
		TL_ZamkniZadnyZamokPS : BOOL;
		TL_ZamkniZadnyZamokLS : BOOL;
		TL_StartAutomat_ENABLE : BOOL;
		TL_KoniecCyklu_ENABLE : BOOL;
		TL_STOP_ENABLE : BOOL;
		TL_RezimAutomat_ENABLE : BOOL;
		TL_RezimManual_ENABLE : BOOL;
		TL_RRZdvihZaklTesnenia_ENABLE : BOOL;
		TL_RRPojazdZaklTesnenia_ENABLE : BOOL;
		TL_OvladaniaZamkov_ENABLE : BOOL;
		EditaciaParametrov_ENABLE : BOOL;
		ZaklTesnenia_OvlZdvihu_ENABLE : BOOL;
		ZaklTesnenia_OvlZostupu_ENABLE : BOOL;
		ZaklTesnenia_OvlPojazdu_ENABLE : BOOL;
		Srobovanie_OvlManipOsX_ENABLE : BOOL;
		Srobovanie_OvlManipOsY_ENABLE : BOOL;
		Zvaranie_OvlZdvihu_ENABLE : BOOL;
		RR_CistenieSkrutkovaciek_ENABLE : BOOL;
		RR_PozicieSkrutiek_ENABLE : BOOL;
		TL_PrihlasenieOperatora_ENABLE : BOOL;
		TL_PrihlasovOperatora_AKTIVNE : BOOL;
		TL_ResetCS : BOOL;
		Warnings_Farba : WSTRING[80];
		Warnings_Index : USINT;
		StavPracoviska_Index : USINT;
		ZobrazPopUp_0 : BOOL;
		ZobrazPopUp_1 : BOOL;
		ZobrazPopUp_2 : BOOL;
		PopUpButtonYES : BOOL;
		PopUpButtonNO : BOOL;
		ZobrazHL1_ST3 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 4F *)
		ZobrazHL2_ST3 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 5F*)
		ZobrazHL3_ST3 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 5H*)
		ZobrazHL4_ST3 : BOOL; (*ST3 - Skontroluj prÌtomnosù alebo QR kÛd filtra 5H*)
		ZobrazHL5_ST3 : BOOL; (*ST3 - V zakladaËi ch˝ba Power CP !!!*)
		ZobrazHL6_ST3 : BOOL; (*ST3 - V zakladaËi ch˝ba tesnenie !!!*)
		ZobrazHL7_ST3 : BOOL; (*ST3 - Zle zaloûenÈ tesnenie na Power CP*)
		ZobrazHL8_ST3 : BOOL; (*ST3 - Zaloûenie tesnenia je OK, odober Power CP zo zakladaËa *)
		ZobrazHL9_ST3 : BOOL; (*ST3 - Nespr·vny QR kÛd filtra 5H*)
		ZobrazHL10_ST3 : BOOL; (*ST3 - Nespr·vny alebo nepreËÌtan˝ QR kÛd Power CP*)
		ZobrazHL11_ST3 : BOOL; (*ST3 - Odpoved systemu tracebility je NG*)
		ZobrazHL12_ST3 : BOOL; (*ST3 - Oper·tor nieje prihl·sen˝*)
		ZobrazHL13_ST3 : BOOL; (*ST3 - Odpoved panatrace je NG*)
		ZobrazHL14_ST3 : BOOL; (*ST3 - Odober PowerCP z paletky a vloû do öuplÌka*)
		ZobrazHL1_ST4 : BOOL;
		ZobrazHL2_ST4 : BOOL;
		ZobrazHL3_ST4 : BOOL; (*ST4 -Odpoved panatrace je NG*)
		ZobrazHL1_ST5 : BOOL;
		ZobrazHL2_ST5 : BOOL;
		ZobrazHL3_ST5 : BOOL;
		ZobrazHL4_ST5 : BOOL; (*ST5 - Odpoved panatrace je NG*)
		ZobrazHL1_ST6 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 4F *)
		ZobrazHL2_ST6 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 5F*)
		ZobrazHL3_ST6 : BOOL; (*ST3 - Ch˝baj˙ci material na paletke 5H*)
		ZobrazHL4_ST6 : BOOL; (*ST3 - Skontroluj prÌtomnosù alebo QR kÛd filtra 5H*)
		ZobrazHL5_ST6 : BOOL; (*ST3 - V zakladaËi ch˝ba Power CP !!!*)
		ZobrazHL6_ST6 : BOOL; (*ST3 - V zakladaËi ch˝ba tesnenie !!!*)
		ZobrazHL7_ST6 : BOOL; (*ST3 - Zle zaloûenÈ tesnenie na Power CP*)
		ZobrazHL8_ST6 : BOOL; (*ST6 - Odpoved panatrace je NG*)
		IndexStavu_Dopravnik : USINT;
		IndexStavu_StoperZakladacaTesn : USINT;
		IndexStavu_ZakladacaTesnenia : USINT;
		IndexStavu_StoperMaticovacky : USINT;
		IndexStavu_StoperSrobovania : USINT;
		IndexStavu_Srobovania : USINT;
		IndexStavu_Robot : USINT;
		IndexStavu_StoperZvarania : USINT;
		IndexStavu_Zvaranie : USINT;
		IndexStavu_Cistenie : USINT;
	END_STRUCT;
	P34_Vizu_typ : 	STRUCT 
		ActualPage : STRING[80];
		GoPage : STRING[80] := 'PageBootP34';
		TL_RezimAutomat : BOOL;
		ZobrazHL1_ST7 : BOOL; (*ST7 - Odpoved panatrace je NG*)
		ZobrazHL1_ST8 : BOOL; (*ST8A - Odpoved panatrace je NG*)
		ZobrazHL2_ST8 : BOOL; (*ST8B - Odpoved panatrace je NG*)
		ZobrazHL1_ST9 : BOOL;
		ZobrazHL2_ST9 : BOOL;
		ZobrazHL3_ST9 : BOOL; (*ST9 - Odpoved panatrace je NG*)
		ZobrazHL1_ST10 : BOOL; (*ST10 - Ch˝baj˙ci material na paletke 4F *)
		ZobrazHL2_ST10 : BOOL; (*ST10 - Ch˝baj˙ci material na paletke 5F*)
		ZobrazHL3_ST10 : BOOL; (*ST10 - Ch˝baj˙ci material na paletke 5H*)
		ZobrazHL4_ST10 : BOOL; (*ST10 - Paletka nieje pr·zdna*)
		ZobrazHL5_ST10 : BOOL; (*ST10 - Paletka nieje pr·zdna*)
		ZobrazHL6_ST10 : BOOL; (*ST10 - Paletka nieje pr·zdna*)
		ZobrazHL7_ST10 : BOOL; (*ST10 - Nieje prihlaseny operator*)
		ZobrazHL8_ST10 : BOOL;
		ZobrazHL9_ST10 : BOOL; (*ST10 - Odpoved panatrace je NG*)
		TL_ResetCS : BOOL;
		IndexStavu_DopravnikP3 : USINT;
		IndexStavu_SpodnyStoperP3 : USINT;
		IndexStavu_VstupnyStoper : USINT;
		IndexStavu_StoperSrobovaniaP3 : USINT;
		IndexStavu_SrobovanieP3 : USINT;
		IndexStavu_AkumulacnyStoperP3 : USINT;
		IndexStavu_StoperLeakageTestA : USINT;
		IndexStavu_StoperLeakageTestB : USINT;
		IndexStavu_DopravnikP4 : USINT;
		IndexStavu_Vytah : USINT;
		IndexStavu_StoperFunkcnyTestA : USINT;
		IndexStavu_StoperFunkcnyTestB : USINT;
		IndexStavu_StoperEtiketovackyP4 : USINT;
		TL_PrednyZamokPS_Farba_P3 : WSTRING[80];
		TL_PrednyZamokLS_Farba_P3 : WSTRING[80];
		TL_ZadnyZamok_Farba_P3 : WSTRING[80];
		TL_ZamkniPrednyZamokPS_P3 : BOOL;
		TL_ZamkniPrednyZamokLS_P3 : BOOL;
		TL_ZamkniZadnyZamok_P3 : BOOL;
		TL_StartAutomat_ENABLE_P3 : BOOL;
		TL_KoniecCyklu_ENABLE_P3 : BOOL;
		TL_STOP_ENABLE_P3 : BOOL;
		TL_RezimAutomat_ENABLE : BOOL;
		TL_RezimManual_ENABLE_P3 : BOOL;
		TL_RezimManual_ENABLE_P4 : BOOL;
		TL_OvladaniaZamkov_ENABLE_P3 : BOOL;
		TL_OvladaniaZamkov_ENABLE_P4 : BOOL;
		TL_StartAutomat_ENABLE_P4 : BOOL;
		TL_KoniecCyklu_ENABLE_P4 : BOOL;
		TL_STOP_ENABLE_P4 : BOOL;
		LeakageTestA_Testovanie_ENABLE : BOOL;
		LeakageTestB_Testovanie_ENABLE : BOOL;
		LeakageTestA_RR_ENABLE : BOOL;
		LeakageTestB_RR_ENABLE : BOOL;
		FunkcnyTestA_Testovanie_ENABLE : BOOL;
		FunkcnyTestB_Testovanie_ENABLE : BOOL;
		Etiketovacka_Testovanie_ENABLE : BOOL;
		Srobovanie_OvlManipOsY_ENABLE : BOOL;
		VolbaLeakageTestu_ENABLE : BOOL;
		VolbaFunkcnehoTestu_ENABLE : BOOL;
		EditaciaParametrov_ENABLE : BOOL;
		RR_CistenieSkrutkovaciek_ENABLE : BOOL;
		RR_PozicieSkrutiek_ENABLE : BOOL;
		TL_PrihlasenieOperatora_ENABLE : BOOL;
		TL_PrihlasovOperatora_AKTIVNE : BOOL;
		TL_PrednyZamok_Farba_P4 : WSTRING[80];
		TL_ZamkniPrednyZamok_P4 : BOOL;
		WarningsP3_Farba : WSTRING[80];
		WarningsP3_Index : USINT;
		WarningsP4_Farba : WSTRING[80];
		WarningsP4_Index : USINT;
		TL_OvladanieVytahu_ENABLE : BOOL;
		TL_HomingVytahu_ENABLE : BOOL;
		TL_OvlZdvihuAplikEtikety_ENABLE : BOOL;
		TL_VyprazdnenieLinky_ENABLE : BOOL;
	END_STRUCT;
	Vizu_typ : 	STRUCT 
		TL_ResetCS_Farba : WSTRING[80];
		ZadanyCasPLC : DATE_AND_TIME;
		NastavCasPLC : BOOL;
		AktualnyCasPLC : DATE_AND_TIME;
	END_STRUCT;
END_TYPE

(*****************Remanentne premenne**********)

TYPE
	P1_RemPremenne_typ : 	STRUCT 
		P1_Srob4F_PozX_LavejSkrutkyK30 : LREAL;
		P1_Srob4F_PozY_LavejSkrutkyK30 : LREAL;
		P1_Srob4F_PozX_PravejSkrutkyK30 : LREAL;
		P1_Srob4F_PozY_PravejSkrutkyK30 : LREAL;
		P1_Srob4F_PozX_ZadnejSkrutkyM4 : LREAL;
		P1_Srob4F_PozY_ZadnejSkrutkyM4 : LREAL;
		P1_Srob4F_PozX_PrednejSkrutkyM4 : LREAL;
		P1_Srob4F_PozY_PrednejSkrutkyM4 : LREAL;
		P1_Srob4F_PozX_SkrutkyDPS_M4 : LREAL;
		P1_Srob4F_PozY_SkrutkyDPS_M4 : LREAL;
		P1_Srob5F_PozX_LavejSkrutkyK30 : LREAL;
		P1_Srob5F_PozY_LavejSkrutkyK30 : LREAL;
		P1_Srob5F_PozX_PravejSkrutkyK30 : LREAL;
		P1_Srob5F_PozY_PravejSkrutkyK30 : LREAL;
		P1_Srob5F_PozX_ZadnejSkrutkyM4 : LREAL;
		P1_Srob5F_PozY_ZadnejSkrutkyM4 : LREAL;
		P1_Srob5F_PozX_PrednejSkrutkyM4 : LREAL;
		P1_Srob5F_PozY_PrednejSkrutkyM4 : LREAL;
		P1_Srob5F_PozX_SkrutkyDPS_M4 : LREAL;
		P1_Srob5F_PozY_SkrutkyDPS_M4 : LREAL;
		P1_Srob5H_PozX_LavejSkrutkyK30 : LREAL;
		P1_Srob5H_PozY_LavejSkrutkyK30 : LREAL;
		P1_Srob5H_PozX_PravejSkrutkyK30 : LREAL;
		P1_Srob5H_PozY_PravejSkrutkyK30 : LREAL;
		P1_Srob5H_PozX_LavejSkrutkyM5 : LREAL;
		P1_Srob5H_PozY_LavejSkrutkyM5 : LREAL;
		P1_Srob5H_PozX_StrednejSkrutkyM5 : LREAL;
		P1_Srob5H_PozY_StrednejSkrutkyM5 : LREAL;
		P1_Srob5H_PozX_PravejSkrutkyM5 : LREAL;
		P1_Srob5H_PozY_PravejSkrutkyM5 : LREAL;
		P1_Srob5H_PozX_OdobratSkrutkyM5 : LREAL;
		P1_Srob5H_PozY_OdobratSkrutkyM5 : LREAL;
		P1_Vytah_RychlostZdvihu : REAL;
		P1_Vytah_PoziciaNakladania : LREAL;
		P1_Vytah_PoziciaVykladania : LREAL;
		P1_ManipSrob_OsX_Rychlost : REAL;
		P1_ManipSrob_OsY_Rychlost : REAL;
		P1_Srob4F_LavaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob4F_LavaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob4F_PravaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob4F_PravaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob4F_ZadnaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob4F_ZadnaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob4F_PrednaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob4F_PrednaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob4F_DPS_M4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob4F_DPS_M4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5F_LavaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5F_LavaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5F_PravaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5F_PravaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5F_ZadnaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5F_ZadnaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5F_PrednaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5F_PrednaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5F_DPS_M4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5F_DPS_M4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5H_LavaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5H_LavaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5H_PravaK30_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5H_PravaK30_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5H_LavaM5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5H_LavaM5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5H_StrednaM5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5H_StrednaM5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P1_Srob5H_PravaM5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P1_Srob5H_PravaM5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
	END_STRUCT;
	P2_RemPremenne_typ : 	STRUCT 
		P2_ZaklTesnenia_Zdvih_Rychlost : REAL;
		P2_ZaklTesn_Zdvih_PozZatlacenia : LREAL;
		P2_ZaklTesnenia_Zdvih_JogRychl : REAL;
		P2_ZaklTesnenia_Pojazd_Rychlost : REAL;
		P2_ZaklTesn_Pojazd_PozZatlacenia : LREAL;
		P2_ZaklTesnenia_Pojazd_JogRychl : REAL;
		P2_ZaklTesn_Pojazd_PozVkladania : LREAL;
		P2_ZaklTesnenia_PocetZatlaceni : USINT;
		P2_Srob4F_PozX_LavejSkrutkyM6 : LREAL;
		P2_Srob4F_PozY_LavejSkrutkyM6 : LREAL;
		P2_Srob4F_PozX_PravejSkrutkyM6 : LREAL;
		P2_Srob4F_PozY_PravejSkrutkyM6 : LREAL;
		P2_Srob4F_PozX_LavejSkrutkyM4 : LREAL;
		P2_Srob4F_PozY_LavejSkrutkyM4 : LREAL;
		P2_Srob4F_PozX_PravejSkrutkyM4 : LREAL;
		P2_Srob4F_PozY_PravejSkrutkyM4 : LREAL;
		P2_Srob5F_PozX_LavejSkrutkyM6 : LREAL;
		P2_Srob5F_PozY_LavejSkrutkyM6 : LREAL;
		P2_Srob5F_PozX_PravejSkrutkyM6 : LREAL;
		P2_Srob5F_PozY_PravejSkrutkyM6 : LREAL;
		P2_Srob5F_PozX_LavejSkrutkyM4 : LREAL;
		P2_Srob5F_PozY_LavejSkrutkyM4 : LREAL;
		P2_Srob5F_PozX_PravejSkrutkyM4 : LREAL;
		P2_Srob5F_PozY_PravejSkrutkyM4 : LREAL;
		P2_Srob5H_PozX_LavejSkrutkyM5 : LREAL;
		P2_Srob5H_PozY_LavejSkrutkyM5 : LREAL;
		P2_Srob5H_PozX_PravejSkrutkyM5 : LREAL;
		P2_Srob5H_PozY_PravejSkrutkyM5 : LREAL;
		P2_Srob5H_PozX_SkrutkyM4 : LREAL;
		P2_Srob5H_PozY_SkrutkyM4 : LREAL;
		P2_ManipSrob_OsX_Rychlost : REAL;
		P2_ManipSrob_OsY_Rychlost : REAL;
		P2_Zvaranie_MomentZvarania : REAL;
		P2_Zvaranie_RychlostZvarania : REAL;
		P2_Zvaranie_CasZvarania : TIME;
		P2_ZdvihZvarania_Rychlost : REAL;
		P2_ZaklTesnenia_MomentPritlaku : REAL;
		P2_ZaklTesnenia_RychlostPritlaku : REAL;
		P2_ZaklTesnenia_RychlVysunutia : REAL;
		P2_ZaklTesnenia_RychlZasunutia : REAL;
		P2_Srob4F_LavaM6_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob4F_LavaM6_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob4F_PravaM6_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob4F_PravaM6_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob4F_LavaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob4F_LavaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob4F_PravaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob4F_PravaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5F_LavaM6_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5F_LavaM6_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5F_PravaM6_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5F_PravaM6_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5F_LavaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5F_LavaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5F_PravaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5F_PravaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5H_LavaM5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5H_LavaM5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5H_PravaM5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5H_PravaM5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Srob5H_StrednaM4_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Srob5H_StrednaM4_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Maticovacka_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P2_Maticovacka_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P2_Zvaranie_MomentZatlacania : REAL;
		P2_Zvaranie_RychlostZatlacania : REAL;
		P2_Zvaranie_CasZatlacania : TIME;
	END_STRUCT;
	P34_RemPremenne_typ : 	STRUCT 
		P3_ManipSrob_OsY_Rychlost : REAL;
		P4_Vytah_RychlostZdvihu : REAL;
		P4_Vytah_PoziciaNakladania : LREAL;
		P4_Vytah_PoziciaVykladania : LREAL;
		P4_ZdvihEtiketovacky_Rychlost : REAL;
		P4_Etiketovacka_PozEtikety_4F : LREAL;
		P4_Etiketovacka_PozEtikety_5F : LREAL;
		P4_Etiketovacka_PozEtikety_5H : LREAL;
		P4_Etiketovacka_PozOdoberEtikety : LREAL;
		P3_Srob4F_PozY_Skrutkovanie : LREAL;
		P3_Srob5F_PozY_Skrutkovanie : LREAL;
		P3_Srob5H_PozY_Skrutkovanie : LREAL;
		P3_Srobov_PozY_HV_Test : LREAL;
		P3_Srobov_PozY_OdobratSkrutkyM5 : LREAL;
		P3_Srob4F_K40_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P3_Srob4F_K40_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P3_Srob4F_M5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P3_Srob4F_M5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P3_Srob5F_K40_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P3_Srob5F_K40_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P3_Srob5F_M5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P3_Srob5F_M5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
		P3_Srob5H_M5_Vysunutie_LO : REAL; (*Vysunutie skrutkovaËky - spodn· tolerancia*)
		P3_Srob5H_M5_Vysunutie_HI : REAL; (*Vysunutie skrutkovaËky - horn· tolerancia*)
	END_STRUCT;
END_TYPE

(*****************Safety*****************************)

TYPE
	Safety_typ : 	STRUCT 
		IN : SafetyIN_typ;
		OUT : SafetyOUT_typ;
		PAR : SafetyPAR_typ;
		STAV : SafetySTAV_typ;
	END_STRUCT;
	SafetyIN_typ : 	STRUCT 
		ZonaCS_RESET : BOOL;
		P1_VyblokovanieSafety_CH1_SA1 : BOOL;
		P1_VyblokovanieSafety_CH2_SA1 : BOOL;
		P1_Panel_TlacitkoCS_CH1_CS8 : BOOL;
		P1_Panel_TlacitkoCS_CH2_CS8 : BOOL;
		P1_Robot_TlacitkoCS_CH1_CS10 : BOOL;
		P1_Robot_TlacitkoCS_CH2_CS10 : BOOL;
		P1_Skrina_TlacitkoCS_CH1_CS5 : BOOL;
		P1_Skrina_TlacitkoCS_CH2_CS5 : BOOL;
		P1_Vytah_Bariera_CH1_BC6 : BOOL;
		P1_Vytah_Bariera_CH2_BC6 : BOOL;
		P1_VstupBunky_Bariera_CH1_BC7 : BOOL;
		P1_VstupBunky_Bariera_CH2_BC7 : BOOL;
		P1_Vytah_SnimHornaPoz_CH1_B8 : BOOL;
		P1_Vytah_SnimHornaPoz_CH2_B8 : BOOL;
		P1_VystupTunela_Bariera_CH1_BC8 : BOOL;
		P1_VystupTunela_Bariera_CH2_BC8 : BOOL;
		P1_ZamkyBunky_CH1 : BOOL;
		P1_ZamkyBunky_CH2 : BOOL;
		P1_ZonaVytahu_RESET : BOOL;
		P1_ZonaBunky_RESET : BOOL;
		P1_SV_Ventil1_ZonaBunka_B9 : BOOL; (*B3*)
		P1_SV_Ventil2_ZonaBunka_B10 : BOOL; (*B4*)
		P1_SV_ZonaCS : BOOL;
		P1_SV_ZonaBunka : BOOL;
		P1_SV_ZonaVytah : BOOL;
		P1_PredneDvere_PritomPetlice : BOOL; (*EZ6*)
		P1_ZadneDverePS_PritomPetlice : BOOL; (*EZ7*)
		P1_ZadneDvereLS_PritomPetlice : BOOL; (*EZ8*)
		P1_ReleaseKartySO_AB15 : BOOL;
		P1_Vytah_Zdvih_BUSY : BOOL;
		P2_VyblokovanieSafety_CH1_SA1 : BOOL;
		P2_VyblokovanieSafety_CH2_SA1 : BOOL;
		P2_TlacitkoCS_CH1_CS1 : BOOL;
		P2_TlacitkoCS_CH2_CS1 : BOOL;
		P2_Panel_TlacitkoCS_CH1_CS2 : BOOL;
		P2_Panel_TlacitkoCS_CH2_CS2 : BOOL;
		P2_Skrina_TlacitkoCS_CH1_CS3 : BOOL;
		P2_Skrina_TlacitkoCS_CH2_CS3 : BOOL;
		P2_Robot_TlacitkoCS_CH1_CS4 : BOOL;
		P2_Robot_TlacitkoCS_CH2_CS4 : BOOL;
		P2_ZaklTesn_Bariera_CH1_BC1 : BOOL;
		P2_ZaklTesn_Bariera_CH2_BC1 : BOOL;
		P2_ZaklTesn_DvojrOvladLS_CH1_SB1 : BOOL;
		P2_ZaklTesn_DvojrOvladLS_CH2_SB1 : BOOL;
		P2_ZaklTesn_DvojrOvladPS_CH1_SB2 : BOOL;
		P2_ZaklTesn_DvojrOvladPS_CH2_SB2 : BOOL;
		P2_ZaklTesn_PojazdSnim_CH1_B2 : BOOL;
		P2_ZaklTesn_PojazdSnim_CH2_B2 : BOOL;
		P2_ZaklTesn_Bumper_CH1_B1 : BOOL;
		P2_ZaklTesn_Bumper_CH2_B1 : BOOL;
		P2_VstupBunky_Bariera_CH1_BC2 : BOOL;
		P2_VstupBunky_Bariera_CH2_BC2 : BOOL;
		P2_ZamkyBunky_CH1 : BOOL;
		P2_ZamkyBunky_CH2 : BOOL;
		P2_SV_Ventil1_ZonaBunka : BOOL; (*B3*)
		P2_SV_Ventil2_ZonaBunka : BOOL; (*B4*)
		P2_SV_Ventil_ZonaMaticov : BOOL; (*B5*)
		P2_SV_ZonaCS : BOOL;
		P2_SV_ZonaBunka : BOOL;
		P2_SV_ZonaZaklTesneniaPojazd : BOOL;
		P2_SV_ZonaZaklTesneniaZdvih : BOOL;
		P2_PredneDvereLS_PritomPetlice : BOOL; (*EZ1*)
		P2_PredneDverePS_PritomPetlice : BOOL; (*EZ2*)
		P2_ZadneDvereLS_PritomPetlice : BOOL; (*EZ4*)
		P2_ZadneDverePS_PritomPetlice : BOOL; (*EZ3*)
		P2_ZonaBunky_RESET : BOOL;
		P2_ZonaZaklTesneniaPojazd_RESET : BOOL;
		P2_ZonaZaklTesneniaZdvih_RESET : BOOL;
		P2_ZonaMaticovacky_RESET : BOOL;
		P2_ZaklTesnenia_Zdvih_BUSY : BOOL;
		P2_ZaklTesnenia_Zasuvanie_BUSY : BOOL;
		P2_ZaklTesnenia_Vysuvanie_BUSY : BOOL;
		P2_ReleaseKartySO_AB25 : BOOL;
		P2_ReleaseKartySO_AB26 : BOOL;
		P3_VyblokovanieSafety_CH1_SA1 : BOOL;
		P3_VyblokovanieSafety_CH2_SA1 : BOOL;
		P3_Skrina_TlacitkoCS_CH1_CS9 : BOOL;
		P3_Skrina_TlacitkoCS_CH2_CS9 : BOOL;
		P3_VstupBunky_Bariera_CH1_BC9 : BOOL;
		P3_VstupBunky_Bariera_CH2_BC9 : BOOL;
		P3_VystupBunky_Bariera_CH1_BC10 : BOOL;
		P3_VystupBunky_Bariera_CH2_BC10 : BOOL;
		P3_PredneDvereLS_PritomPetlice : BOOL; (*EZ9*)
		P3_PredneDverePS_PritomPetlice : BOOL; (*EZ10*)
		P3_ZadneDvere_PritomPetlice : BOOL; (*EZ11*)
		P3_ZamkyBunky_CH1 : BOOL;
		P3_ZamkyBunky_CH2 : BOOL;
		P3_ZonaBunky_RESET : BOOL;
		P3_ReleaseKartySO_AB36 : BOOL;
		P3_SV_Ventil1_ZonaBunka_B11 : BOOL; (*B11*)
		P3_SV_Ventil2_ZonaBunka_B12 : BOOL; (*B12*)
		P3_SV_ZonaCS : BOOL;
		P3_SV_ZonaBunka : BOOL;
		P4_VyblokovanieSafety_CH1_SA1 : BOOL;
		P4_VyblokovanieSafety_CH2_SA1 : BOOL;
		P4_Panel_TlacitkoCS_CH1_CS6 : BOOL;
		P4_Panel_TlacitkoCS_CH2_CS6 : BOOL;
		P4_Skrina_TlacitkoCS_CH1_CS7 : BOOL;
		P4_Skrina_TlacitkoCS_CH2_CS7 : BOOL;
		P4_Vytah_Bariera_CH1_BC3 : BOOL;
		P4_Vytah_Bariera_CH2_BC3 : BOOL;
		P4_VstupBunky_Bariera_CH1_BC4 : BOOL;
		P4_VstupBunky_Bariera_CH2_BC4 : BOOL;
		P4_VystupBunky_Bariera_CH1_BC5 : BOOL;
		P4_VystupBunky_Bariera_CH2_BC5 : BOOL;
		P4_Vytah_SnimHornaPoz_CH1_B7 : BOOL;
		P4_Vytah_SnimHornaPoz_CH2_B7 : BOOL;
		P4_ZamkyBunky_CH1 : BOOL; (*EZ5*)
		P4_ZamkyBunky_CH2 : BOOL; (*EZ5*)
		P4_ZonaVytahu_RESET : BOOL;
		P4_ZonaBunky_RESET : BOOL;
		P4_SV_Ventil1_ZonaBunka_B13 : BOOL; (*B13*)
		P4_SV_Ventil2_ZonaBunka_B14 : BOOL; (*B14*)
		P4_SV_ZonaCS : BOOL;
		P4_SV_ZonaBunka : BOOL;
		P4_SV_ZonaVytah : BOOL;
		P4_PredneDvere_PritomPetlice : BOOL; (*EZ5*)
		P4_ReleaseKartySO_AB45 : BOOL;
		P4_Vytah_Zdvih_BUSY : BOOL;
	END_STRUCT;
	SafetyOUT_typ : 	STRUCT 
		P1_ZamkniZamok_PredneDvere : BOOL; (*EZ6*)
		P1_ZamkniZamok_ZadneDverePS : BOOL; (*EZ7*)
		P1_ZamkniZamok_ZadneDvereLS : BOOL; (*EZ8*)
		P2_ZamkniZamok_PredneDvereLS : BOOL; (*EZ1*)
		P2_ZamkniZamok_PredneDverePS : BOOL; (*EZ2*)
		P2_ZamkniZamok_ZadneDvereLS : BOOL; (*EZ4*)
		P2_ZamkniZamok_ZadneDverePS : BOOL; (*EZ3*)
		P3_ZamkniZamok_ZadneDvere : BOOL; (*EZ11*)
		P3_ZamkniZamok_PredneDverePS : BOOL; (*EZ10*)
		P3_ZamkniZamok_PredneDvereLS : BOOL; (*EZ9*)
		P4_ZamkniZamok_PredneDvere : BOOL; (*EZ5*)
		P1_ResetBarieryVytahu : BOOL;
		P4_ResetBarieryVytahu : BOOL;
	END_STRUCT;
	SafetyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	SafetySTAV_typ : 	STRUCT 
		SafetyPLC_Nabehlo : BOOL;
		ZonaCS_AKTIVNA : BOOL;
		TlacitkaCS_AKTIVNE : BOOL;
		P1_ZonaVytahu_AKTIVNA : BOOL;
		P1_ZonaBunky_AKTIVNA : BOOL;
		P1_Vytah_Bariera_AKTIVNA : BOOL;
		P1_VstupBunky_Bariera_AKTIVNA : BOOL;
		P1_VystupTunela_Bariera_AKTIVNA : BOOL;
		P1_VyblokovanieSafety_AKTIVNE : BOOL;
		P1_ZamkyBunky_AKTIVNE : BOOL;
		P1_Panel_TlacitkoCS_AKTIVNE : BOOL;
		P1_Robot_TlacitkoCS_AKTIVNE : BOOL;
		P1_Skrina_TlacitkoCS_AKTIVNE : BOOL;
		P1_SnimacVytahu_AKTIVNY : BOOL;
		P1_StavKartySO_AB15 : UDINT;
		P2_ZonaZaklTesnenPojazd_AKTIVNA : BOOL;
		P2_ZonaZaklTesnenZdvih_AKTIVNA : BOOL;
		P2_ZonaMaticovacky_AKTIVNA : BOOL;
		P2_ZonaBunky_AKTIVNA : BOOL;
		P2_DvojrucneOvladanie_AKTIVNE : BOOL;
		P2_ZaklTesnenia_Bariera_AKTIVNA : BOOL;
		P2_ZaklTesnenia_Bumper_AKTIVNY : BOOL;
		P2_ZaklTesnenia_Pojazd_ZASUNUTY : BOOL;
		P2_VstupBunky_Bariera_AKTIVNA : BOOL;
		P2_ZamkyBunky_AKTIVNE : BOOL;
		P2_TlacitkoCS_AKTIVNE : BOOL;
		P2_Panel_TlacitkoCS_AKTIVNE : BOOL;
		P2_Skrina_TlacitkoCS_AKTIVNE : BOOL;
		P2_Robot_TlacitkoCS_AKTIVNE : BOOL;
		P2_VyblokovanieSafety_AKTIVNE : BOOL;
		P2_StavKartySO_AB25 : UDINT;
		P2_StavKartySO_AB26 : UDINT;
		P3_ZonaBunky_AKTIVNA : BOOL;
		P3_VstupBunky_Bariera_AKTIVNA : BOOL;
		P3_VystupBunky_Bariera_AKTIVNA : BOOL;
		P3_VyblokovanieSafety_AKTIVNE : BOOL;
		P3_ZamkyBunky_AKTIVNE : BOOL;
		P3_Skrina_TlacitkoCS_AKTIVNE : BOOL;
		P3_StavKartySO_AB36 : UDINT;
		P4_ZonaVytahu_AKTIVNA : BOOL;
		P4_ZonaBunky_AKTIVNA : BOOL;
		P4_Vytah_Bariera_AKTIVNA : BOOL;
		P4_VstupBunky_Bariera_AKTIVNA : BOOL;
		P4_VystupBunky_Bariera_AKTIVNA : BOOL;
		P4_VyblokovanieSafety_AKTIVNE : BOOL;
		P4_ZamkyBunky_AKTIVNE : BOOL;
		P4_Panel_TlacitkoCS_AKTIVNE : BOOL;
		P4_Skrina_TlacitkoCS_AKTIVNE : BOOL;
		P4_SnimacVytahu_AKTIVNY : BOOL;
		P4_StavKartySO_AB45 : UDINT;
	END_STRUCT;
END_TYPE

(****************Linka Power CP********************)

TYPE
	Linka_typ : 	STRUCT 
		IN : LinkaIN_typ;
		OUT : LinkaOUT_typ;
		PAR : LinkaPAR_typ;
		STAV : LinkaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		VyprazdnenieLinky : BOOL;
		PaletkaPrechadza : BOOL;
		TestovaciKus : BOOL;
		ZberFotiek : BOOL;
		Revork : BOOL;
	END_STRUCT;
	LinkaIN_typ : 	STRUCT 
		IN_0 : BOOL;
	END_STRUCT;
	LinkaOUT_typ : 	STRUCT 
		OUT_0 : BOOL;
	END_STRUCT;
	LinkaPAR_typ : 	STRUCT 
		ZvolenyModel : STRING[2]; (*4F, 5F, 5H*)
		IndexModelu : USINT;
	END_STRUCT;
	LinkaSTAV_typ : 	STRUCT 
		Vypnuta : BOOL;
		LinkaPrazdna : BOOL;
		Vyprazdnenie_BUSY : BOOL;
		WenglorControlUnit_OK : BOOL;
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************************************************P1 - Pracovisko*******************************************************************)

TYPE
	P1_Pracovisko_typ : 	STRUCT 
		IN : P1_PracoviskoIN_typ;
		OUT : P1_PracoviskoOUT_typ;
		PAR : P1_PracoviskoPAR_typ;
		STAV : P1_PracoviskoSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		KoniecVyroby : BOOL;
	END_STRUCT;
	P1_PracoviskoIN_typ : 	STRUCT 
		PrepatovaOchrana_OK : BOOL;
		NapajaniaRobota_OK : BOOL;
		PrivodVzduchu_SnimacTlaku_S18 : BOOL;
	END_STRUCT;
	P1_PracoviskoOUT_typ : 	STRUCT 
		Majak_ZeleneSvetlo : BOOL;
		Majak_ZlteSvetlo : BOOL;
		Majak_CerveneSvetlo : BOOL;
		Majak_Hukacka : BOOL;
		OsvetlenieBunky : BOOL;
		Osvetlenie_CAM2 : BOOL;
		Osvetlenie_CAM4 : BOOL;
		Osvetlenie_CAM6 : BOOL;
		VT4_OUT1 : USINT;
		VT4_OUT2 : USINT;
		VT4_OUT3 : USINT;
		VT4_OUT4 : USINT;
		VT5_OUT1 : USINT;
		VT5_OUT2 : USINT;
		VT5_OUT3 : USINT;
		VT5_OUT4 : USINT;
	END_STRUCT;
	P1_PracoviskoPAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	P1_PracoviskoSTAV_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		PoINIT : BOOL;
		READY : BOOL;
		UkoncenieCyklu_BUSY : BOOL;
		UkoncenieVyroby_BUSY : BOOL;
		ServaBunky_READY : BOOL;
		ServoVytahu_READY : BOOL;
		VentilovyTerminal_VT4_OK : BOOL;
		VentilovyTerminal_VT5_OK : BOOL;
		KartaAB14_OK : BOOL;
		KartaAB15_OK : BOOL;
		KartaAB16_OK : BOOL;
		KartaAB17_OK : BOOL;
		KartaAB18_OK : BOOL;
		KartaAB19_OK : BOOL;
		KartaAB110_OK : BOOL;
		ModulDM11_OK : BOOL;
		ModulDI11_OK : BOOL;
		ModulDI12_OK : BOOL;
		ModulDI13_OK : BOOL;
		ModulDI14_OK : BOOL;
		ModulSI11_OK : BOOL;
		ModulSI12_OK : BOOL;
		ModulDS11_OK : BOOL;
		ModulDS12_OK : BOOL;
		KOM_Robot_OK : BOOL;
		Skrutkovacka_K30_OK : BOOL;
		Skrutkovacka_M5_OK : BOOL;
		Skrutkovacka_M4_OK : BOOL;
		PORUCHA : BOOL;
		Kamery_OK : BOOL;
		VentiloveTerminaly_OK : BOOL;
		Moduly_OK : BOOL;
		Skrutkovacky_OK : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - Dopravniky*****************************)

TYPE
	P1_Dopravniky_typ : 	STRUCT 
		IN : P1_DopravnikyIN_typ;
		OUT : P1_DopravnikyOUT_typ;
		PAR : P1_DopravnikyPAR_typ;
		STAV : P1_DopravnikySTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P1_DopravnikyIN_typ : 	STRUCT 
		HornyDoprav_TeplotaMotora_OK : BOOL; (*M7*)
		HornyDoprav_READY : BOOL;
		SpodnyDoprav_TeplotaMotora_OK : BOOL; (*M8*)
		SpodnyDoprav_READY : BOOL;
	END_STRUCT;
	P1_DopravnikyOUT_typ : 	STRUCT 
		HornyDoprav_ChodVPRED_M32 : BOOL;
		SpodnyDoprav_ChodVPRED_M29 : BOOL;
	END_STRUCT;
	P1_DopravnikyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P1_DopravnikySTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - Stoper spodnÈho dopravnÌka**************************)

TYPE
	P1_SpodnyStoper_typ : 	STRUCT 
		IN : P1_SpodnyStoperIN_typ;
		OUT : P1_SpodnyStoperOUT_typ;
		PAR : P1_SpodnyStoperPAR_typ;
		STAV : P1_SpodnyStoperSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P1_SpodnyStoperIN_typ : 	STRUCT 
		PritomnPaletky_IS64 : BOOL;
	END_STRUCT;
	P1_SpodnyStoperOUT_typ : 	STRUCT 
		ZasunStoper_YV111 : BOOL;
	END_STRUCT;
	P1_SpodnyStoperPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P1_SpodnyStoperSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - Vyùah************************************)

TYPE
	P1_Vytah_typ : 	STRUCT 
		IN : P1_VytahIN_typ;
		OUT : P1_VytahOUT_typ;
		PAR : P1_VytahPAR_typ;
		STAV : P1_VytahSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoZdvihuVytahu_M31 : Axis_Servo;
		RR_ChodDopravnika_VPRED : BOOL;
		RR_ChodDopravnika_VZAD : BOOL;
	END_STRUCT;
	P1_VytahIN_typ : 	STRUCT 
		PritomnostPaletky_S19 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S19 : USINT; (*RFID snÌmaË na IO-linku*)
		BannerNalozeniaPaletky_SB11 : BOOL; (*Hodnota prÌde cez IO-link*)
		VystupDopravnikaVytahu_OS12 : BOOL;
		ZdvihVytahu_LimSnimacPOS_IS61 : BOOL;
		ZdvihVytahu_LimSnimacNEG_IS60 : BOOL;
		Dopravnik_TeplotaMotora_OK : BOOL; (*M7*)
		Dopravnik_READY : BOOL;
	END_STRUCT;
	P1_VytahOUT_typ : 	STRUCT 
		Dopravnik_VYVAZANIE_M25 : BOOL;
		Dopravnik_NAVAZANIE_M25 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		Banner_CervenaLED_SB11 : BOOL;
		Banner_ZelenaLED_SB11 : BOOL;
		Banner_ModraLED_SB11 : BOOL;
		Banner_OranzovaLED_SB11 : BOOL;
		Banner_ZltaLED_SB11 : BOOL;
		Banner_CyanLED_SB11 : BOOL;
		Banner_LED_OFF : BOOL;
		Banner_ModraRotujucaLED_SB11 : BOOL;
	END_STRUCT;
	P1_VytahPAR_typ : 	STRUCT 
		ServoZdvihu_ZadanaPozicia : LREAL;
		ServoZdvihu_JoggRychlost : REAL;
		IndexFotky : USINT;
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		Banner_IOLinkInputs : ARRAY[0..1]OF USINT;
		Banner_IOLinkOutputs : ARRAY[0..9]OF USINT;
		IndexPaletky_STRING : STRING[2];
		IndexPaletky : USINT;
		StaryQRkod_PowerCP : STRING[30];
		StaryQRkod_DPS_4F5F : STRING[32];
	END_STRUCT;
	P1_VytahSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		ServoZdvihu_PoziciaDosiahnuta : BOOL;
		ServoZvihu_LimitSnimace_BUSY : BOOL;
		ServoZdvihu_HomingOK : BOOL;
		ServoZdvihu_BUSY : BOOL;
		ServoZdvihu_Homing_BUSY : BOOL;
		Zdvih_AktualnaPozicia : LREAL;
		Zdvih_AktualnaRychlost : REAL;
		Zdvih_JoggLimitDosiahnuty : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - Stoper örobovaËky*********************)

TYPE
	P1_StoperSrobovacky_typ : 	STRUCT 
		IN : P1_StoperSrobovackyIN_typ;
		OUT : P1_StoperSrobovackyOUT_typ;
		PAR : P1_StoperSrobovackyPAR_typ;
		STAV : P1_StoperSrobovackySTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P1_StoperSrobovackyIN_typ : 	STRUCT 
		PritomnostPaletky_S16 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S16 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_IS62 : BOOL;
		Centrovanie_ZASUNUTE_IS63 : BOOL;
	END_STRUCT;
	P1_StoperSrobovackyOUT_typ : 	STRUCT 
		ZasunStoper_YV110 : BOOL;
		VysunCentrovanie_YV112 : BOOL;
		ZasunCentrovanie_YV113 : BOOL;
		KOM_PresunManipulator_DOPREDU : BOOL;
		KOM_PresunManipulator_DOZADU : BOOL;
		KOM_4F_ZasrobujLavuSkrutku_K30 : BOOL;
		KOM_4F_ZasrobujPravuSkrutku_K30 : BOOL;
		KOM_5F_ZasrobujLavuSkrutku_K30 : BOOL;
		KOM_5F_ZasrobujPravuSkrutku_K30 : BOOL;
		KOM_5H_ZasrobujLavuSkrutku_K30 : BOOL;
		KOM_5H_ZasrobujPravuSkrutku_K30 : BOOL;
		KOM_4F_ZasrobujZadnuSkrutku_M4 : BOOL;
		KOM_4F_ZasrobujPrednuSkrutku_M4 : BOOL;
		KOM_5F_ZasrobujZadnuSkrutku_M4 : BOOL;
		KOM_5F_ZasrobujPrednuSkrutku_M4 : BOOL;
		KOM_4F_ZasrobujSkrutkuDPS_M4 : BOOL;
		KOM_5F_ZasrobujSkrutkuDPS_M4 : BOOL;
		KOM_5H_ZasrobujLavuSkrutku_M5 : BOOL;
		KOM_5H_ZasrobujPravuSkrutku_M5 : BOOL;
		KOM_5H_ZasrobujStrednuSkrutku_M5 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P1_StoperSrobovackyPAR_typ : 	STRUCT 
		IndexFotky : USINT;
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P1_StoperSrobovackySTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Porucha : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - ärobovanie****************************)

TYPE
	P1_Srobovanie_typ : 	STRUCT 
		IN : P1_SrobovanieIN_typ;
		OUT : P1_SrobovanieOUT_typ;
		PAR : P1_SrobovaniePAR_typ;
		STAV : P1_SrobovanieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoManipulOsY_M19 : Axis_Servo;
		ServoManipulOsX_M20 : Axis_Servo;
		SkrutkovaciSet_M4 : P1_SkrutkovaciSetM4_typ;
		SkrutkovaciSet_M5 : P1_SkrutkovaciSetM5_typ;
		SkrutkovaciSet_K30 : P1_SkrutkovaciSetK30_typ;
		Skrutkovacka_M4 : SkrutkovackaAtlasCopco_typ;
		Skrutkovacka_M5 : SkrutkovackaAtlasCopco_typ;
		Skrutkovacka_K30 : SkrutkovackaAtlasCopco_typ;
		RR_ZapniHrniec_K30 : BOOL;
		RR_SkrutkovackuK30_VYSUN : BOOL;
		RR_SkrutkovackaK30_CISTENIE : BOOL;
		RR_ZapniHrniec_M4 : BOOL;
		RR_SkrutkovackuM4_VYSUN : BOOL;
		RR_SkrutkovackaM4_CISTENIE : BOOL;
		RR_ZapniHrniec_M5 : BOOL;
		RR_SkrutkovackuM5_VYSUN : BOOL;
		RR_ZapniVibrolistu_M5 : BOOL;
		RR_OtocPodavacM5_VPRED : BOOL;
		RR_OtocPodavacM5_VZAD : BOOL;
		RR_PodajSkrutkuM5 : BOOL;
		RR_PrisavanieSkrutkyM5 : BOOL;
		RR_PolohujNaPoziciuSkrutky_4F : BOOL;
		RR_PolohujNaPoziciuSkrutky_5F : BOOL;
		RR_PolohujNaPoziciuSkrutky_5H : BOOL;
	END_STRUCT;
	P1_SrobovanieIN_typ : 	STRUCT 
		ManipulOsY_LimSnimacPOS_IS41 : BOOL;
		ManipulOsY_LimSnimacNEG_IS40 : BOOL;
		ManipulOsX_LimSnimacPOS_IS43 : BOOL;
		ManipulOsX_LimSnimacNEG_IS42 : BOOL;
		ZasobSrobM4_PRAZDNY_IS44 : BOOL;
		ZasobSrobM4_ListaPLNA_OS6 : BOOL;
		ZasobSrobM4_Banner_SB8 : BOOL;
		NastrelSrobM4_SrobaPresla_IS46 : BOOL;
		SkrutkM4_ZASUNUTY_MS17 : BOOL;
		SkrutkM4_SrobaPresla_IS47 : BOOL;
		SkrutkM4_VysunutieHrotu_IOS10 : REAL;
		SkrutkM4_VysunutieHrotu_IOlink : UINT;
		SkrutkM4_Cist_SrobaPresla_IS48 : BOOL;
		SkrutkM4_Cist_BrzdaOtvorena_MS18 : BOOL;
		SkrutkM4_Cist_BrzdaZatvoren_MS19 : BOOL;
		NapajanieSkrutkovackyM4_OK : BOOL;
		NapajanieVibroZasobnikaM4_OK : BOOL;
		ZasobSrobK30_PRAZDNY_IS49 : BOOL;
		ZasobSrobK30_ListaPLNA_OS7 : BOOL;
		ZasobSrobK30_Banner_SB9 : BOOL;
		NastrelSrobK30_SrobaPresla_IS50 : BOOL;
		SkrutkK30_ZASUNUTY_MS20 : BOOL;
		SkrutkK30_SrobaPresla_IS51 : BOOL;
		SkrutkK30_VysunutieHrotu_IOS8 : REAL;
		SkrutkK30_VysunutieHrotu_IOlink : UINT;
		SkrutkK30_Cist_SrobaPresla_IS52 : BOOL;
		SkrutkK30_Cist_BrzdaOtvoren_MS21 : BOOL;
		SkrutkK30_Cist_BrzdaZatvor_MS22 : BOOL;
		NapajanieSkrutkovackyK30_OK : BOOL;
		NapajanieVibroZasobnikaK30_OK : BOOL;
		ZasobSrobM5_PRAZDNY_IS53 : BOOL;
		ZasobSrobM5_ListaPLNA_OS8 : BOOL;
		ZasobSrobM5_Banner_SB10 : BOOL;
		VibrolistaSrobM5_KONIEC_OS9 : BOOL;
		VibrolistaSrobM5_ZACIATOK_OS10 : BOOL;
		OddelSrobM5_OtocenyVPRED_MS37 : BOOL;
		OddelSrobM5_OtocenyVZAD_MS38 : BOOL;
		OddelSrobM5_SrobaNaVstupe_OS13 : BOOL;
		OddelSrobM5_SrobaNaVystupe_OS14 : BOOL;
		SkrutkM5_ZASUNUTY_MS39 : BOOL;
		SkrutkM5_VysunutieHrotu_IOS9 : REAL;
		SkrutkM5_VysunutieHrotu_IOlink : UINT;
		SkrutkM5_SnimacVakua_S28 : BOOL;
		NapajanieSkrutkovackyM5_OK : BOOL;
		NapajanieVibroZasobnikaM5_OK : BOOL;
		NapajanieVibroListyM5_OK : BOOL;
	END_STRUCT;
	P1_SrobovanieOUT_typ : 	STRUCT 
		ZasobSrobM4_Banner_CervenaLED : BOOL;
		ZasobSrobM4_Ofuk_RUN_YV72 : BOOL;
		ZasobSrobM4_OfukTried_RUN_YV73 : BOOL;
		ZasobSrobM4_Vibrovanie_RUN_FM9 : BOOL; (*VM1*)
		NastrelSrobM4_PosunSrobu_YV77 : BOOL;
		NastrelSrobM4_NastrelSrobu_YV78 : BOOL;
		SkrutkM4_VYSUN_YV79 : BOOL;
		SkrutkM4_OfukVakua_RUN_YV80 : BOOL;
		SkrutkM4_PrisavSkrutky_RUN_YV81 : BOOL;
		SkrutkM4_Cist_OTVOR_YV82 : BOOL;
		SkrutkM4_Cist_POSUN_YV83 : BOOL;
		SkrutkM4_Cist_ODSAVANIE_YV84 : BOOL;
		ZasobSrobK30_Banner_CervenaLED : BOOL;
		ZasobSrobK30_Ofuk_RUN_YV85 : BOOL;
		ZasobSrobK30_OfukTried_RUN_YV86 : BOOL;
		ZasobSrobK30_Vibrovanie_RUN_FM8 : BOOL; (*VM1*)
		NastrelSrobK30_PosunSrobu_YV87 : BOOL;
		NastrelSrobK30_NastrelSrobu_YV88 : BOOL;
		SkrutkK30_VYSUN_YV89 : BOOL;
		SkrutkK30_OfukVakua_RUN_YV91 : BOOL;
		SkrutkK30_PrisavSkrutky_RUN_YV90 : BOOL;
		SkrutkK30_Cist_OTVOR_YV92 : BOOL;
		SkrutkK30_Cist_POSUN_YV123 : BOOL;
		SkrutkK30_Cist_ODSAVANIE_YV93 : BOOL;
		ZasobSrobM5_Banner_CervenaLED : BOOL;
		ZasobSrobM5_Ofuk_RUN_YV94 : BOOL;
		ZasobSrobM5_OfukTried_RUN_YV95 : BOOL;
		ZasobSrobM5_Vibrov_RUN_FM10 : BOOL; (*VM1*)
		VibrolistaSrobM5_Vibrov_RUN_FM11 : BOOL;
		OddelovacSrobM5_OtocVPRED_YV103 : BOOL;
		OddelovacSrobM5_OtocVZAD_YV102 : BOOL;
		SkrutkM5_VYSUN_YV104 : BOOL;
		SkrutkM5_PrisavSkrut_ZAPNI_YV105 : BOOL;
		SkrutkM5_PrisavSkrut_VYPNI_YV109 : BOOL;
		KOM_SkrutkM4_START : BOOL;
		KOM_SkrutkK30_START : BOOL;
		KOM_SkrutkM5_START : BOOL;
		KOM_PresunVPRED_Ukonceny : BOOL;
		KOM_PresunVZAD_Ukonceny : BOOL;
		KOM_Srobovanie_Ukoncene : BOOL;
	END_STRUCT;
	P1_SrobovaniePAR_typ : 	STRUCT 
		OsX_ZadanaPozicia : LREAL;
		OsY_ZadanaPozicia : LREAL;
		OsX_JoggRychlost : REAL;
		OsY_JoggRychlost : REAL;
		K30_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		K30_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		M5_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M5_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		M4_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M4_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		RR_IndexPozicieSkrutky_4F : USINT;
		RR_IndexPozicieSkrutky_5F : USINT;
		RR_IndexPozicieSkrutky_5H : USINT;
	END_STRUCT;
	P1_SrobovanieSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		OsX_HomingOK : BOOL;
		OsY_HomingOK : BOOL;
		OsX_BUSY : BOOL;
		OsY_BUSY : BOOL;
		OsX_PoziciaDosiahnuta : BOOL;
		OsY_PoziciaDosiahnuta : BOOL;
		OsX_LimitSnimace_BUSY : BOOL;
		OsY_LimitSnimace_BUSY : BOOL;
		OsX_AktualnaPozicia : LREAL;
		OsX_AktualnyMoment : REAL;
		OsX_AktualnaRychlost : REAL;
		OsY_AktualnaPozicia : LREAL;
		OsY_AktualnyMoment : REAL;
		OsY_AktualnaRychlost : REAL;
		OsX_JoggLimitDosiahnuty : BOOL;
		OsY_JoggLimitDosiahnuty : BOOL;
		Vysledok_Srobovania : STRING[2]; (*OK alebo NG*)
		K30_DosiahnutyMoment_REAL : REAL;
		K30_DosiahnutyMoment : UDINT;
		K30_Moment_ToleranciaMAX_REAL : REAL;
		K30_Moment_ToleranciaMAX : UDINT;
		K30_Moment_ToleranciaMIN_REAL : REAL;
		K30_Moment_ToleranciaMIN : UDINT;
		K30_DosiahnutyUhol : UINT;
		K30_Uhol_ToleranciaMAX_REAL : REAL;
		K30_Uhol_ToleranciaMAX : UDINT;
		K30_Uhol_ToleranciaMIN_REAL : REAL;
		K30_Uhol_ToleranciaMIN : UDINT;
		M5_DosiahnutyMoment_REAL : REAL;
		M5_DosiahnutyMoment : UDINT;
		M5_Moment_ToleranciaMAX_REAL : REAL;
		M5_Moment_ToleranciaMAX : UDINT;
		M5_Moment_ToleranciaMIN_REAL : REAL;
		M5_Moment_ToleranciaMIN : UDINT;
		M5_DosiahnutyUhol : UINT;
		M5_Uhol_ToleranciaMAX_REAL : REAL;
		M5_Uhol_ToleranciaMAX : UDINT;
		M5_Uhol_ToleranciaMIN_REAL : REAL;
		M5_Uhol_ToleranciaMIN : UDINT;
		M4_DosiahnutyMoment_REAL : REAL;
		M4_DosiahnutyMoment : UDINT;
		M4_Moment_ToleranciaMAX_REAL : REAL;
		M4_Moment_ToleranciaMAX : UDINT;
		M4_Moment_ToleranciaMIN_REAL : REAL;
		M4_Moment_ToleranciaMIN : UDINT;
		M4_DosiahnutyUhol : UINT;
		M4_Uhol_ToleranciaMAX_REAL : REAL;
		M4_Uhol_ToleranciaMAX : UDINT;
		M4_Uhol_ToleranciaMIN_REAL : REAL;
		M4_Uhol_ToleranciaMIN : UDINT;
		Zasobnik_K30_Prazdny : BOOL;
		Zasobnik_M5_Prazdny : BOOL;
		Zasobnik_M4_Prazdny : BOOL;
		Cistenie_M4_BUSY : BOOL;
		Cistenie_K30_BUSY : BOOL;
		Podanie_M5_BUSY : BOOL;
		Model_4F_VysunutieLavejK30 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutiePravejK30 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutieZadnejM4 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutiePrednejM4 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutieDPS_M4 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieLavejK30 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutiePravejK30 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieZadnejM4 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutiePrednejM4 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieDPS_M4 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieLavejK30 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutiePravejK30 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieLavejM5 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutiePravejM5 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieStrednejM5 : ARRAY[0..100]OF REAL;
	END_STRUCT;
END_TYPE

(***************P1 - AkumulaËn˝ stoper*********************)

TYPE
	P1_AkumulacnyStoper_typ : 	STRUCT 
		IN : P1_AkumulacnyStoperIN_typ;
		OUT : P1_AkumulacnyStoperOUT_typ;
		PAR : P1_AkumulacnyStoperPAR_typ;
		STAV : P1_AkumulacnyStoperSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P1_AkumulacnyStoperIN_typ : 	STRUCT 
		PritomnPaletky_IS45 : BOOL;
	END_STRUCT;
	P1_AkumulacnyStoperOUT_typ : 	STRUCT 
		ZasunStoper_YV74 : BOOL;
	END_STRUCT;
	P1_AkumulacnyStoperPAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	P1_AkumulacnyStoperSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
	END_STRUCT;
END_TYPE

(***************P1 - Robot************************************)

TYPE
	P1_Robot_typ : 	STRUCT 
		IN : P1_RobotIN_typ;
		OUT : P1_RobotOUT_typ;
		KOM_IN : P1_RobotKOM_IN_typ;
		KOM_OUT : P1_RobotKOM_OUT_typ;
		PAR : P1_RobotPAR_typ;
		STAV : P1_RobotSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P1_RobotIN_typ : 	STRUCT 
		KodGripra_Bit0 : BOOL;
		KodGripra_Bit1 : BOOL;
		SnimacVakua_S20 : BOOL;
		Griper_Otvoreny_MS40 : BOOL;
		Griper_Zatvoreny_MS41 : BOOL;
		DokStanPritGrip_BusBary45F_IS78 : BOOL; (*Griper pre BusBary 4F a 5F*)
		DokStanPritGrip_BusBary5H_IS77 : BOOL; (*Griper pre BusBary 5H*)
	END_STRUCT;
	P1_RobotOUT_typ : 	STRUCT 
		OdistiGriper_YV107 : BOOL;
		ZaistiGriper_YV106 : BOOL;
		ZapniVakum_YV108 : BOOL;
		VypniVakum_YV114 : BOOL;
		OtvorGriper_YV97 : BOOL;
		ZatvorGriper_YV98 : BOOL;
	END_STRUCT;
	P1_RobotPAR_typ : 	STRUCT 
		Modul_IOLink_Inputs : USINT;
	END_STRUCT;
	P1_RobotSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		DrziFoamy_4F : BOOL;
		DrziFoamy_5F : BOOL;
		DrziBusbar_4F : BOOL;
		DrziBusbar_5F : BOOL;
		DrziBusbar_5H : BOOL;
		DrziDPS_4F : BOOL;
		DrziDPS_5F : BOOL;
	END_STRUCT;
	P1_RobotKOM_IN_typ : 	STRUCT 
		Stav_RobotOdparkovany : BOOL;
		Stav_RobotPoziciaCakania : BOOL;
		Stav_RobotBezpPozicia_Srobovanie : BOOL;
		Stav_MotoryON : BOOL;
		Stav_MotoryOFF : BOOL;
		Stav_ProgramRUN : BOOL;
		Stav_RezimAUTOMAT : BOOL;
		Stav_RobotCS : BOOL;
		Stav_VystupyZresetovane : BOOL;
		Stav_Foam4F_Odobraty : BOOL;
		Stav_Foam5F_Odobraty : BOOL;
		Stav_Foam4F_Polozeny : BOOL;
		Stav_Foam5F_Polozeny : BOOL;
		Stav_SpodnyBusbar4F_Odobraty : BOOL;
		Stav_SpodnyBusbar5F_Odobraty : BOOL;
		Stav_SpodnyBusbar4F_Polozeny : BOOL;
		Stav_SpodnyBusbar5F_Polozeny : BOOL;
		Stav_DPS_4F_Odobraty : BOOL;
		Stav_DPS_5F_Odobraty : BOOL;
		Stav_DPS_4F_Polozeny : BOOL;
		Stav_DPS_5F_Polozeny : BOOL;
		Stav_SpodnyBusbar5H_Odobraty : BOOL;
		Stav_SpodnyBusbar5H_Polozeny : BOOL;
		Stav_BusbaryUvolnene : BOOL;
		Stav_RobotOdoberaBusbary : BOOL;
		Stav_RobotOdoberaFoamy : BOOL;
		Profinet_PLC_INPUTS : ARRAY[0..63]OF USINT;
	END_STRUCT;
	P1_RobotKOM_OUT_typ : 	STRUCT 
		ManipSrobovania_BezpecnaPozicia : BOOL;
		OdoberFoam4F_z_Paletky : BOOL;
		OdoberFoam5F_z_Paletky : BOOL;
		PolozFoam4F_na_PowerCP : BOOL;
		PolozFoam5F_na_PowerCP : BOOL;
		OdoberSpodnyBusbar4F_z_Paletky : BOOL;
		OdoberSpodnyBusbar5F_z_Paletky : BOOL;
		PolozSpodnyBusbar4F_na_PowerCP : BOOL;
		PolozSpodnyBusbar5F_na_PowerCP : BOOL;
		OdoberDPS_4F_z_Paletky : BOOL;
		OdoberDPS_5F_z_Paletky : BOOL;
		PolozDPS_4F_na_PowerCP : BOOL;
		PolozDPS_5F_na_PowerCP : BOOL;
		OdoberSpodnyBusbar5H_z_Paletky : BOOL;
		PolozSpodnyBusbar5H_na_PowerCP : BOOL;
		UvolniBusbary : BOOL;
		Presun_CakaciaPozicia : BOOL;
		Odparkovanie : BOOL;
		Profinet_PLC_OUTPUTS : ARRAY[0..63]OF USINT;
		ZapniMotory : BOOL;
		VypniMotory : BOOL;
		PP_na_Main : BOOL;
		Reset_CS : BOOL;
		StartProgramu : BOOL;
		StartProgramuMain : BOOL;
		StopProgramu : BOOL;
		TypGripra_5H : BOOL;
		TypGripra_45F : BOOL;
		ZopakujOdoberanie : BOOL;
	END_STRUCT;
END_TYPE

(********************************************************P2 - Pracovisko************************************************************************)

TYPE
	P2_Pracovisko_typ : 	STRUCT 
		IN : P2_PracoviskoIN_typ;
		OUT : P2_PracoviskoOUT_typ;
		PAR : P2_PracoviskoPAR_typ;
		STAV : P2_PracoviskoSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		KoniecVyroby : BOOL;
	END_STRUCT;
	P2_PracoviskoIN_typ : 	STRUCT 
		PrivodVzduchu_SnimacTlaku_S3 : BOOL;
		PrepatovaOchrana_OK : BOOL;
		NapajaniaRobota_OK : BOOL;
	END_STRUCT;
	P2_PracoviskoOUT_typ : 	STRUCT 
		Majak_ZeleneSvetlo : BOOL;
		Majak_ZlteSvetlo : BOOL;
		Majak_CerveneSvetlo : BOOL;
		Majak_Hukacka : BOOL;
		OsvetlenieBunky : BOOL;
		Osvetlenie_CAM7_CAM17 : BOOL; (*Stoper zakladania tesnenia*)
		Osvetlenie_CAM1 : BOOL; (*ZakladaË tesnenia*)
		Osvetlenie_CAM10 : BOOL; (*Stoper skrutkovania matic*)
		Osvetlenie_CAM11 : BOOL; (*Stoper zv·rania*)
		VT1_OUT1 : USINT;
		VT1_OUT2 : USINT;
		VT1_OUT3 : USINT;
		VT1_OUT4 : USINT;
		VT2_OUT1 : USINT;
		VT2_OUT2 : USINT;
		VT2_OUT3 : USINT;
		VT2_OUT4 : USINT;
		VT3_OUT1 : USINT;
		VT3_OUT2 : USINT;
		VT3_OUT3 : USINT;
		VT3_OUT4 : USINT;
	END_STRUCT;
	P2_PracoviskoPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P2_PracoviskoSTAV_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		PoINIT : BOOL;
		READY : BOOL;
		ServaBunky_READY : BOOL;
		ServaZakladaca_READY : BOOL;
		UkoncenieCyklu_BUSY : BOOL;
		UkoncenieVyroby_BUSY : BOOL;
		KartaAB21_OK : BOOL;
		KartaAB24_OK : BOOL;
		KartaAB25_OK : BOOL;
		KartaAB26_OK : BOOL;
		KartaAB27_OK : BOOL;
		KartaAB28_OK : BOOL;
		KartaAB29_OK : BOOL;
		KartaAB210_OK : BOOL;
		KartaAB211_OK : BOOL;
		ModulDM21_OK : BOOL;
		ModulDI21_OK : BOOL;
		ModulDI22_OK : BOOL;
		ModulDI23_OK : BOOL;
		ModulDI24_OK : BOOL;
		ModulDI25_OK : BOOL;
		ModulSI21_OK : BOOL;
		ModulSI22_OK : BOOL;
		ModulDS21_OK : BOOL;
		ModulDS22_OK : BOOL;
		ModulDS23_OK : BOOL;
		KOM_Robot_OK : BOOL;
		VentilovyTerminal_VT1_OK : BOOL;
		VentilovyTerminal_VT2_OK : BOOL;
		VentilovyTerminal_VT3_OK : BOOL;
		Skrutkovacka_M6_OK : BOOL;
		Skrutkovacka_M5_OK : BOOL;
		Skrutkovacka_M4_OK : BOOL;
		Maticovacka_M4_OK : BOOL;
		PORUCHA : BOOL;
		Kamery_OK : BOOL;
		VentiloveTerminaly_OK : BOOL;
		Moduly_OK : BOOL;
		Skrutkovacky_OK : BOOL;
	END_STRUCT;
END_TYPE

(*****************P2 - Dopravniky****************************)

TYPE
	P2_Dopravniky_typ : 	STRUCT 
		IN : P2_DopravnikyIN_typ;
		OUT : P2_DopravnikyOUT_typ;
		PAR : P2_DopravnikyPAR_typ;
		STAV : P2_Dopravniky_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_DopravnikyIN_typ : 	STRUCT 
		SpodnyDoprav_Zaplnenie_IS18 : BOOL;
		HornyDoprav_TeplotaMotora_OK : BOOL; (*M7*)
		SpodnyDoprav_TeplotaMotora_OK : BOOL; (*M8*)
		HornyDoprav_READY : BOOL;
		SpodnyDoprav_READY : BOOL;
	END_STRUCT;
	P2_DopravnikyOUT_typ : 	STRUCT 
		SpodnyDoprav_ChodVPRED_M8 : BOOL;
		HornyDoprav_ChodVPRED_M7 : BOOL;
	END_STRUCT;
	P2_DopravnikyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P2_Dopravniky_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(****************P2 - Stoper zakladania tesnenia****************)

TYPE
	P2_StoperZaklTesnenia_typ : 	STRUCT 
		IN : P2_StoperZaklTesneniaIN_typ;
		OUT : P2_StoperZaklTesneniaOUT_typ;
		PAR : P2_StoperZaklTesneniaPAR_typ;
		STAV : P2_StoperZaklTesneniaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_StoperZaklTesneniaIN_typ : 	STRUCT 
		PritomnostPaletky_S6 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S6 : USINT; (*RFID snÌmaË na IO-linku*)
		BannerNalozeniaPaletky_SB7 : BOOL; (*Hodnota prÌde cez IO-link*)
	END_STRUCT;
	P2_StoperZaklTesneniaOUT_typ : 	STRUCT 
		ZasunStoper_YV53 : BOOL;
		Banner_CervenaLED_SB7 : BOOL;
		Banner_ZelenaLED_SB7 : BOOL;
		Banner_ModraLED_SB7 : BOOL;
		Banner_OranzovaLED_SB7 : BOOL;
		Banner_ModraRotujucaLED_SB7 : BOOL;
		Banner_CyanLED_SB7 : BOOL;
		Banner_ZltaLED_SB7 : BOOL;
		Banner_LED_OFF : BOOL;
		KOM_ZalozTesnenie : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P2_StoperZaklTesneniaPAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		Banner_IOLinkInputs : ARRAY[0..1]OF USINT;
		Banner_IOLinkOutputs : ARRAY[0..9]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
		IndexFotky : USINT;
		StaryQRkod_Filtra5H : STRING[32];
	END_STRUCT;
	P2_StoperZaklTesneniaSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		ObsluhaOznacilaPaletku_NG : BOOL;
	END_STRUCT;
END_TYPE

(****************P2 - ZakladaË tesnenia************************)

TYPE
	P2_ZakladacTesnenia_typ : 	STRUCT 
		IN : P2_ZakladacTesneniaIN_typ;
		OUT : P2_ZakladacTesneniaOUT_typ;
		PAR : P2_ZakladacTesneniaPAR_typ;
		STAV : P2_ZakladacTesneniaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoPojazduVozika_M5 : Axis_Servo;
		ServoZdvihuZakladaca_M4 : Axis_Servo;
	END_STRUCT;
	P2_ZakladacTesneniaIN_typ : 	STRUCT 
		Dotlacanie1_ZakladPoloha_MS3 : BOOL;
		Dotlacanie2_ZakladPoloha_MS4 : BOOL;
		Dotlacanie3_ZakladPoloha_MS5 : BOOL;
		Dotlacanie4_ZakladPoloha_MS6 : BOOL;
		Kopito_ZakladPoloha_IS7 : BOOL;
		ZdvihZaklad_RefSnimac_IS8 : BOOL;
		Vozik_Zaklad_PritomPowerCP_IOS6 : BOOL;
	END_STRUCT;
	P2_ZakladacTesneniaOUT_typ : 	STRUCT 
		LED_DvojrucneOvladanie_H1 : BOOL;
		KOM_ZalozenieTesneniaUkoncene : BOOL;
	END_STRUCT;
	P2_ZakladacTesneniaPAR_typ : 	STRUCT 
		ServoZdvihu_ZadanaPozicia : LREAL;
		ServoPojazdu_ZadanaPozicia : LREAL;
		ServoZdvihu_JoggRychlost : REAL;
		ServoPojazdu_JoggRychlost : REAL;
	END_STRUCT;
	P2_ZakladacTesneniaSTAV_typ : 	STRUCT 
		ServoZdvihu_HomingOK : BOOL;
		ServoPojazdu_HomingOK : BOOL;
		ServoZdvihu_BUSY : BOOL;
		ServoPojazdu_BUSY : BOOL;
		ServoZdvihu_PoziciaDosiahnuta : BOOL;
		ServoPojazdu_PoziciaDosiahnuta : BOOL;
		ServoZvihu_LimitSnimace_BUSY : BOOL;
		ServoPojazdu_LimitSnimace_BUSY : BOOL;
		Zdvih_AktualnaPozicia : LREAL;
		Zdvih_AktualnyMoment : REAL;
		Zdvih_AktualnaRychlost : REAL;
		Pojazd_AktualnaPozicia : LREAL;
		Pojazd_AktualnyMoment : REAL;
		Pojazd_AktualnaRychlost : REAL;
		Zdvih_JoggLimitDosiahnuty : BOOL;
		Pojazd_JoggLimitDosiahnuty : BOOL;
		PoINIT : BOOL;
		VysledokZalozeniaTesnenia : STRING[2]; (*OK alebo NG*)
	END_STRUCT;
END_TYPE

(***************P2 - Stoper matÌcovaËky****************)

TYPE
	P2_StoperMaticovacky_typ : 	STRUCT 
		IN : P2_StoperMaticovackyIN_typ;
		OUT : P2_StoperMaticovackyOUT_typ;
		PAR : P2_StoperMaticovackyPAR_typ;
		STAV : P2_StoperMaticovackySTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_StoperMaticovackyIN_typ : 	STRUCT 
		PritomnostPaletky_S7 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S7 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_IS12 : BOOL;
		Centrovanie_ZASUNUTE_IS13 : BOOL;
	END_STRUCT;
	P2_StoperMaticovackyOUT_typ : 	STRUCT 
		ZasunStoper_YV52 : BOOL;
		VysunCentrovanie_YV54 : BOOL;
		ZasunCentrovanie_YV55 : BOOL;
		KOM_ZaskrutkujMatice : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P2_StoperMaticovackyPAR_typ : 	STRUCT 
		IndexFotky : USINT;
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P2_StoperMaticovackySTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Porucha : BOOL;
	END_STRUCT;
END_TYPE

(****************P2 - SkrutkovaË matÌc***********************)

TYPE
	P2_SkrutkovacMatic_typ : 	STRUCT 
		IN : P2_SkrutkovacMaticIN_typ;
		OUT : P2_SkrutkovacMaticOUT_typ;
		PAR : P2_SkrutkovacMaticPAR_typ;
		STAV : P2_SkrutkovacMaticSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		SkrutkovaciSet_MaticaM4 : P2_SkrutkovaciSetMaticaM4_typ;
		Maticovacka_M4 : SkrutkovackaAtlasCopco_typ;
		RR_PodajMaticu : BOOL;
		RR_ZapniHrniec : BOOL;
		RR_Maticovacku_VYSUN : BOOL;
	END_STRUCT;
	P2_SkrutkovacMaticIN_typ : 	STRUCT 
		ZasobMatic_PRAZDNY_IS23 : BOOL;
		ZasobMatic_ListaPLNA_OS1 : BOOL;
		ZasobMatic_Banner_SB4 : BOOL;
		OddelMatic_MaticaPresla_IS24 : BOOL;
		SkrutkMatic_ZASUNUTY_MS9 : BOOL;
		SpatnaVazbaSafetyVentilu_B5 : BOOL;
		SkrutkMatic_VysunutieHrotu_IOS7 : REAL;
		SkrutkMatic_VysunutHrotu_IOlink : UINT;
		DavkMatic_PritomnostMatice_OS2 : BOOL;
		DavkMatic_MaticaPresla_IS27 : BOOL;
		DavkMatic_VYSUNUTY_IS26 : BOOL;
		DavkMatic_ZASUNUTY_IS25 : BOOL;
		NapajanieSkrutkovackyMatic_OK : BOOL; (*RJ1*)
		NapajanieVibroZasobnikaMatic_OK : BOOL; (*VM4*)
		OddelMatic_Otoceny_VZAD_MS58 : BOOL;
		OddelMatic_Otoceny_VPRED_MS59 : BOOL;
	END_STRUCT;
	P2_SkrutkovacMaticOUT_typ : 	STRUCT 
		ZasobMatic_Ofuk_RUN_YV63 : BOOL;
		ZasobMatic_OfukTried_RUN_YV64 : BOOL;
		ZasobMatic_Vibrovanie_RUN_FM1 : BOOL; (*VM4*)
		OddelMatic_PosunMaticu_YV69 : BOOL;
		OddelMatic_NastrelMaticu_YV65 : BOOL;
		PosuvacMatic_PosunMaticu_YV68 : BOOL;
		SkrutkMatic_ZASUN_YV75 : BOOL;
		SkrutkMatic_VYSUN_YV62 : BOOL;
		SkrutkMatic_OfukVakua_RUN_YV66 : BOOL;
		SkrutkMatic_PrisavMatic_RUN_YV67 : BOOL;
		DavkMatic_VYSUN : BOOL;
		ZasobMatic_Banner_CervenaLED : BOOL;
		KOM_SkrutkovanieMaticUkoncene : BOOL;
	END_STRUCT;
	P2_SkrutkovacMaticPAR_typ : 	STRUCT 
		MaticeM4_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		MaticeM4_AtlasCopcoOutputs : ARRAY[0..7]OF UDINT;
	END_STRUCT;
	P2_SkrutkovacMaticSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		VysledokSkrutkovaniaMatice : STRING[2]; (*OK alebo NG*)
		DosiahnutyMoment_REAL : REAL;
		DosiahnutyMoment : UDINT;
		Moment_ToleranciaMAX_REAL : REAL;
		Moment_ToleranciaMAX : UDINT;
		Moment_ToleranciaMIN_REAL : REAL;
		Moment_ToleranciaMIN : UDINT;
		DosiahnutyUhol : UINT;
		Uhol_ToleranciaMAX_REAL : REAL;
		Uhol_ToleranciaMAX : UDINT;
		Uhol_ToleranciaMIN_REAL : REAL;
		Uhol_ToleranciaMIN : UDINT;
		PoruchaPodaniaMatice : BOOL;
		Zasobnik_Matic_M4_Prazdny : BOOL;
		Model_5H_VysunutieSkrutkovacky : ARRAY[0..100]OF REAL;
	END_STRUCT;
END_TYPE

(*****************P2 - Stoper örobovania**********************)

TYPE
	P2_StoperSrobovania_typ : 	STRUCT 
		IN : P2_StoperSrobovaniaIN_typ;
		OUT : P2_StoperSrobovaniaOUT_typ;
		PAR : P2_StoperSrobovaniaPAR_typ;
		STAV : P2_StoperSrobovaniaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_StoperSrobovaniaIN_typ : 	STRUCT 
		PritomnostPaletky_S8 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S8 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_IS14 : BOOL;
		Centrovanie_ZASUNUTE_IS15 : BOOL;
	END_STRUCT;
	P2_StoperSrobovaniaOUT_typ : 	STRUCT 
		ZasunStoper_YV56 : BOOL;
		VysunCentrovanie_YV57 : BOOL;
		ZasunCentrovanie_YV58 : BOOL;
		KOM_PresunManipulator_DOPREDU : BOOL;
		KOM_PresunManipulator_DOZADU : BOOL;
		KOM_4F_ZasrobujLavuSkrutkuM6 : BOOL;
		KOM_4F_ZasrobujPravuSkrutkuM6 : BOOL;
		KOM_4F_ZasrobujLavuSkrutkuM4 : BOOL;
		KOM_4F_ZasrobujPravuSkrutkuM4 : BOOL;
		KOM_5F_ZasrobujLavuSkrutkuM6 : BOOL;
		KOM_5F_ZasrobujPravuSkrutkuM6 : BOOL;
		KOM_5F_ZasrobujLavuSkrutkuM4 : BOOL;
		KOM_5F_ZasrobujPravuSkrutkuM4 : BOOL;
		KOM_5H_ZasrobujLavuSkrutkuM5 : BOOL;
		KOM_5H_ZasrobujPravuSkrutkuM5 : BOOL;
		KOM_5H_ZasrobujSkrutkuM4 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P2_StoperSrobovaniaPAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
		IndexFotky : USINT;
	END_STRUCT;
	P2_StoperSrobovaniaSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Porucha : BOOL;
	END_STRUCT;
END_TYPE

(****************P2 - ärobovanie***************************)

TYPE
	P2_Srobovanie_typ : 	STRUCT 
		IN : P2_SrobovanieIN_typ;
		OUT : P2_SrobovanieOUT_typ;
		PAR : P2_SrobovaniePAR_typ;
		STAV : P2_SrobovanieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoManipulOsY_M9 : Axis_Servo;
		ServoManipulOsX_M10 : Axis_Servo;
		SkrutkovaciSet_M4 : P2_SkrutkovaciSetM4_typ;
		SkrutkovaciSet_M5 : P2_SkrutkovaciSetM5_typ;
		SkrutkovaciSet_M6 : P2_SkrutkovaciSetM6_typ;
		Skrutkovacka_M4 : SkrutkovackaAtlasCopco_typ;
		Skrutkovacka_M5 : SkrutkovackaAtlasCopco_typ;
		Skrutkovacka_M6 : SkrutkovackaAtlasCopco_typ;
		RR_ZapniHrniec_M4 : BOOL;
		RR_SkrutkovackuM4_VYSUN : BOOL;
		RR_SkrutkovackaM4_CISTENIE : BOOL;
		RR_ZapniHrniec_M5 : BOOL;
		RR_SkrutkovackuM5_VYSUN : BOOL;
		RR_SkrutkovackaM5_CISTENIE : BOOL;
		RR_ZapniHrniec_M6 : BOOL;
		RR_SkrutkovackuM6_VYSUN : BOOL;
		RR_SkrutkovackaM6_CISTENIE : BOOL;
		RR_PolohujNaPoziciuSkrutky_4F : BOOL;
		RR_PolohujNaPoziciuSkrutky_5F : BOOL;
		RR_PolohujNaPoziciuSkrutky_5H : BOOL;
	END_STRUCT;
	P2_SrobovanieIN_typ : 	STRUCT 
		ManipulOsY_LimSnimacPOS_IS19 : BOOL;
		ManipulOsY_LimSnimacNEG_IS20 : BOOL;
		ManipulOsX_LimSnimacPOS_IS21 : BOOL;
		ManipulOsX_LimSnimacNEG_IS22 : BOOL;
		ZasobSrobM5_PRAZDNY_IS28 : BOOL;
		ZasobSrobM5_ListaPLNA_OS3 : BOOL;
		ZasobSrobM5_Banner_SB6 : BOOL;
		NastrelSrobM5_SrobaPresla_IS29 : BOOL;
		ZasobSrobM4_PRAZDNY_IS33 : BOOL;
		ZasobSrobM4_ListaPLNA_OS4 : BOOL;
		ZasobSrobM4_Banner_SB5 : BOOL;
		NastrelSrobM4_SrobaPresla_IS34 : BOOL;
		ZasobSrobM6_PRAZDNY_IS36 : BOOL;
		ZasobSrobM6_ListaPLNA_OS5 : BOOL;
		ZasobSrobM6_Banner_SB3 : BOOL;
		NastrelSrobM6_SrobaPresla_IS37 : BOOL;
		SkrutkM5_ZASUNUTY_MS11 : BOOL; (*SkrutkovaË M5 - zadn˝, SkrutkovaË M4 - stredn˝, SkrutkovaË M6 - predn˝*)
		SkrutkM5_SrobaPresla_IS32 : BOOL;
		SkrutkM5_VysunutieHrotu_IOS5 : REAL;
		SkrutkM5_VysunutieHrotu_IOlink : UINT;
		SkrutkM5_Cist_SrobaPresla_IS31 : BOOL;
		SkrutkM5_Cist_BrzdaOtvorena_MS1 : BOOL;
		SkrutkM5_Cist_BrzdaZatvorena_MS2 : BOOL;
		SkrutkM4_ZASUNUTY_MS10 : BOOL;
		SkrutkM4_SrobaPresla_IS30 : BOOL;
		SkrutkM4_VysunutieHrotu_IOS4 : REAL;
		SkrutkM4_VysunutieHrotu_IOlink : UINT;
		SkrutkM4_Cist_SrobaPresla_IS35 : BOOL;
		SkrutkM4_Cist_BrzdaOtvorena_MS12 : BOOL;
		SkrutkM4_Cist_BrzdaZatvoren_MS13 : BOOL;
		SkrutkM6_ZASUNUTY_MS14 : BOOL;
		SkrutkM6_SrobaPresla_IS38 : BOOL;
		SkrutkM6_VysunutieHrotu_IOS3 : REAL;
		SkrutkM6_VysunutieHrotu_IOlink : UINT;
		SkrutkM6_Cist_SrobaPresla_IS39 : BOOL;
		SkrutkM6_Cist_BrzdaOtvorena_MS15 : BOOL;
		SkrutkM6_Cist_BrzdaZatvoren_MS16 : BOOL;
		NapajanieSkrutkovackyM6_OK : BOOL; (*RJ2*)
		NapajanieSkrutkovackyM4_OK : BOOL; (*RJ3*)
		NapajanieSkrutkovackyM5_OK : BOOL; (*RJ4*)
		NapajanieVibroZasobnikaM5_OK : BOOL; (*VM1*)
		NapajanieVibroZasobnikaM4_OK : BOOL; (*VM2*)
		NapajanieVibroZasobnikaM6_OK : BOOL; (*VM3*)
	END_STRUCT;
	P2_SrobovanieOUT_typ : 	STRUCT 
		ZasobSrobM5_Banner_CervenaLED : BOOL;
		ZasobSrobM4_Banner_CervenaLED : BOOL;
		ZasobSrobM6_Banner_CervenaLED : BOOL;
		ZasobSrobM5_Ofuk_RUN_YV10 : BOOL;
		ZasobSrobM5_OfukTried_RUN_YV11 : BOOL;
		ZasobSrobM5_Vibrovanie_RUN_FM4 : BOOL; (*VM1*)
		ZasobSrobM4_Ofuk_RUN_YV20 : BOOL;
		ZasobSrobM4_OfukTried_RUN_YV21 : BOOL;
		ZasobSrobM4_Vibrovanie_RUN_FM3 : BOOL; (*VM2*)
		ZasobSrobM6_Ofuk_RUN_YV30 : BOOL;
		ZasobSrobM6_OfukTried_RUN_YV31 : BOOL;
		ZasobSrobM6_Vibrovanie_RUN_FM2 : BOOL; (*VM3*)
		NastrelSrobM5_PosunSrobu_YV12 : BOOL;
		NastrelSrobM5_NastrelSrobu_YV13 : BOOL;
		NastrelSrobM4_PosunSrobu_YV22 : BOOL;
		NastrelSrobM4_NastrelSrobu_YV23 : BOOL;
		NastrelSrobM6_PosunSrobu_YV32 : BOOL;
		NastrelSrobM6_NastrelSrobu_YV33 : BOOL;
		SkrutkM5_VYSUN_YV14 : BOOL; (*SkrutkovaË M5 - zadn˝, SkrutkovaË M4 - stredn˝, SkrutkovaË M6 - predn˝*)
		SkrutkM5_OfukVakua_RUN_YV15 : BOOL; (*SkrutkovaË M5 - zadn˝, SkrutkovaË M4 - stredn˝, SkrutkovaË M6 - predn˝*)
		SkrutkM5_PrisavSkrutky_RUN_YV16 : BOOL; (*SkrutkovaË M5 - zadn˝, SkrutkovaË M4 - stredn˝, SkrutkovaË M6 - predn˝*)
		SkrutkM5_Cist_OTVOR_YV19 : BOOL;
		SkrutkM5_Cist_OfukVakua_RUN_YV17 : BOOL;
		SkrutkM5_Cist_Vakum_RUN_YV18 : BOOL;
		SkrutkM4_VYSUN_YV24 : BOOL;
		SkrutkM4_OfukVakua_RUN_YV25 : BOOL;
		SkrutkM4_PrisavSkrutky_RUN_YV26 : BOOL;
		SkrutkM4_Cist_OTVOR_YV27 : BOOL;
		SkrutkM4_Cist_OfukVakua_RUN_YV28 : BOOL;
		SkrutkM4_Cist_Vakum_RUN_YV29 : BOOL;
		SkrutkM6_VYSUN_YV34 : BOOL;
		SkrutkM6_OfukVakua_RUN_YV35 : BOOL;
		SkrutkM6_PrisavSkrutky_RUN_YV36 : BOOL;
		SkrutkM6_Cist_OTVOR_YV37 : BOOL;
		SkrutkM6_Cist_OfukVakua_RUN_YV38 : BOOL;
		SkrutkM6_Cist_Vakum_RUN_YV39 : BOOL;
		KOM_SkrutkM4_START : BOOL;
		KOM_SkrutkM5_START : BOOL;
		KOM_SkrutkM6_START : BOOL;
		KOM_PresunVPRED_Ukonceny : BOOL;
		KOM_PresunVZAD_Ukonceny : BOOL;
		KOM_Srobovanie_Ukoncene : BOOL;
	END_STRUCT;
	P2_SrobovaniePAR_typ : 	STRUCT 
		OsX_ZadanaPozicia : LREAL;
		OsY_ZadanaPozicia : LREAL;
		OsX_JoggRychlost : REAL;
		OsY_JoggRychlost : REAL;
		M6_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M6_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		M5_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M5_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		M4_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M4_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		RR_IndexPozicieSkrutky_4F : USINT;
		RR_IndexPozicieSkrutky_5F : USINT;
		RR_IndexPozicieSkrutky_5H : USINT;
	END_STRUCT;
	P2_SrobovanieSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		OsX_HomingOK : BOOL;
		OsY_HomingOK : BOOL;
		OsX_BUSY : BOOL;
		OsY_BUSY : BOOL;
		OsX_PoziciaDosiahnuta : BOOL;
		OsY_PoziciaDosiahnuta : BOOL;
		OsX_LimitSnimace_BUSY : BOOL;
		OsY_LimitSnimace_BUSY : BOOL;
		OsX_AktualnaPozicia : LREAL;
		OsX_AktualnyMoment : REAL;
		OsX_AktualnaRychlost : REAL;
		OsY_AktualnaPozicia : LREAL;
		OsY_AktualnyMoment : REAL;
		OsY_AktualnaRychlost : REAL;
		OsX_JoggLimitDosiahnuty : BOOL;
		OsY_JoggLimitDosiahnuty : BOOL;
		Vysledok_Srobovania : STRING[2]; (*OK alebo NG*)
		M6_DosiahnutyMoment_REAL : REAL;
		M6_DosiahnutyMoment : UDINT;
		M6_Moment_ToleranciaMAX_REAL : REAL;
		M6_Moment_ToleranciaMAX : UDINT;
		M6_Moment_ToleranciaMIN_REAL : REAL;
		M6_Moment_ToleranciaMIN : UDINT;
		M6_DosiahnutyUhol : UINT;
		M6_Uhol_ToleranciaMAX_REAL : REAL;
		M6_Uhol_ToleranciaMAX : UDINT;
		M6_Uhol_ToleranciaMIN_REAL : REAL;
		M6_Uhol_ToleranciaMIN : UDINT;
		M5_DosiahnutyMoment_REAL : REAL;
		M5_DosiahnutyMoment : UDINT;
		M5_Moment_ToleranciaMAX_REAL : REAL;
		M5_Moment_ToleranciaMAX : UDINT;
		M5_Moment_ToleranciaMIN_REAL : REAL;
		M5_Moment_ToleranciaMIN : UDINT;
		M5_DosiahnutyUhol : UINT;
		M5_Uhol_ToleranciaMAX_REAL : REAL;
		M5_Uhol_ToleranciaMAX : UDINT;
		M5_Uhol_ToleranciaMIN_REAL : REAL;
		M5_Uhol_ToleranciaMIN : UDINT;
		M4_DosiahnutyMoment_REAL : REAL;
		M4_DosiahnutyMoment : UDINT;
		M4_Moment_ToleranciaMAX_REAL : REAL;
		M4_Moment_ToleranciaMAX : UDINT;
		M4_Moment_ToleranciaMIN_REAL : REAL;
		M4_Moment_ToleranciaMIN : UDINT;
		M4_DosiahnutyUhol : UINT;
		M4_Uhol_ToleranciaMAX_REAL : REAL;
		M4_Uhol_ToleranciaMAX : UDINT;
		M4_Uhol_ToleranciaMIN_REAL : REAL;
		M4_Uhol_ToleranciaMIN : UDINT;
		Zasobnik_M4_Prazdny : BOOL;
		Zasobnik_M5_Prazdny : BOOL;
		Zasobnik_M6_Prazdny : BOOL;
		Cistenie_M4_BUSY : BOOL;
		Cistenie_M5_BUSY : BOOL;
		Cistenie_M6_BUSY : BOOL;
		Model_4F_VysunutieLavejM6 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutiePravejM6 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutieLavejM4 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutiePravejM4 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieLavejM6 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutiePravejM6 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieLavejM4 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutiePravejM4 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieLavejM5 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutiePravejM5 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieStrednejM4 : ARRAY[0..100]OF REAL;
	END_STRUCT;
END_TYPE

(*****************P2 - Robot********************************)

TYPE
	P2_RobotOUT_typ : 	STRUCT 
		OdistiGriper_YV2 : BOOL;
		ZaistiGriper_YV1 : BOOL;
		OtvorGriper_YV3 : BOOL;
		ZatvorGriper_YV4 : BOOL;
		ZapniVakum4F5F_YV6 : BOOL;
		VypniVakum4F5F_YV7 : BOOL;
		ZapniVakum5H_YV8 : BOOL;
		VypniVakum5H_YV9 : BOOL;
		OdvzdusnenieVyvodov_YV70 : BOOL;
	END_STRUCT;
	P2_Robot_typ : 	STRUCT 
		IN : P2_RobotIN_typ;
		OUT : P2_RobotOUT_typ;
		KOM_IN : P2_RobotKOM_IN_typ;
		KOM_OUT : P2_RobotKOM_OUT_typ;
		PAR : P2_RobotPAR_typ;
		STAV : P2_RobotSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_RobotIN_typ : 	STRUCT 
		KodGripra_Bit0 : BOOL;
		KodGripra_Bit1 : BOOL;
		DokStanPritGripra_MVcase_IS1 : BOOL; (*Griper pre MV Case a Top Cover*)
		DokStanPritGripra_BusBary45F_IS2 : BOOL; (*Griper pre BusBary 4F a 5F*)
		DokStanPritGripra_BusBary5H_IS3 : BOOL; (*Griper pre BusBary 5H*)
		SnimacVakua_45F_S1 : BOOL;
		SnimacVakua_5H_S2 : BOOL;
		GriperMvCase_Otvoreny_IS4 : BOOL; (*Griper pre MV Case a Top Cover*)
		GriperMvCase_DrziPowerCP_IS5 : BOOL;
		GriperMvCase_DrziMVcase_IS6 : BOOL;
	END_STRUCT;
	P2_RobotPAR_typ : 	STRUCT 
		Modul_IOLink_Inputs : USINT;
		Griper_4F_5F_5H_IOLink_Inputs : UINT;
	END_STRUCT;
	P2_RobotSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		DrziBusbar_4F : BOOL;
		DrziBusbar_5F : BOOL;
		DrziBusbar_5H : BOOL;
		Zvaranie_PrebiehaManipulacia : BOOL;
		Srobovanie_PrebiehaManipulacia : BOOL;
	END_STRUCT;
	P2_RobotKOM_IN_typ : 	STRUCT 
		Stav_Busbary4F_Odobrate : BOOL;
		Stav_Busbary4F_Polozene : BOOL;
		Stav_Busbary5F_Odobrate : BOOL;
		Stav_Busbary5F_Polozene : BOOL;
		Stav_Busbary5H_Odobrate : BOOL;
		Stav_Busbary5H_Polozene : BOOL;
		Stav_PravyMvCase4F_Odobraty : BOOL;
		Stav_PravyMvCase4F_Polozeny : BOOL;
		Stav_LavyMvCase4F_Odobraty : BOOL;
		Stav_LavyMvCase4F_Polozeny : BOOL;
		Stav_PravyMvCase5F_Odobraty : BOOL;
		Stav_PravyMvCase5F_Polozeny : BOOL;
		Stav_LavyMvCase5F_Odobraty : BOOL;
		Stav_LavyMvCase5F_Polozeny : BOOL;
		Stav_PravyMvCase5H_Odobraty : BOOL;
		Stav_PravyMvCase5H_Polozeny : BOOL;
		Stav_LavyMvCase5H_Odobraty : BOOL;
		Stav_LavyMvCase5H_Polozeny : BOOL;
		Stav_TopCover4F_Odobraty : BOOL;
		Stav_TopCover4F_Polozeny : BOOL;
		Stav_TopCover5F_Odobraty : BOOL;
		Stav_TopCover5F_Polozeny : BOOL;
		Stav_TopCover5H_Odobraty : BOOL;
		Stav_TopCover5H_Polozeny : BOOL;
		Stav_Filter5H_Dotlaceny : BOOL;
		Stav_RobotOdparkovany : BOOL;
		Stav_RobotPoziciaCakania : BOOL;
		Stav_RobotBezpPozicia_Srobovanie : BOOL;
		Stav_RobotBezpPozicia_Zvaranie : BOOL;
		Stav_BusbaryUvolnene : BOOL;
		Stav_MotoryON : BOOL;
		Stav_MotoryOFF : BOOL;
		Stav_ProgramRUN : BOOL;
		Stav_RezimAUTOMAT : BOOL;
		Stav_RobotCS : BOOL;
		Stav_VystupyZresetovane : BOOL;
		Stav_Cistenie_PowerCP_Odobrate : BOOL;
		Stav_Cistenie_PowerCP_Polozene : BOOL;
		Stav_Cistenie_PowerCP_v_Cisteni : BOOL;
		Stav_Cistenie_Otacanie_Ukoncene : BOOL;
		Stav_Griper4F5F_Vymeneny : BOOL;
		Stav_Griper5H_Vymeneny : BOOL;
		Stav_GriperCistenia_Vymeneny : BOOL;
		Stav_RobotOdoberaCover : BOOL;
		Profinet_PLC_INPUTS : ARRAY[0..63]OF USINT;
	END_STRUCT;
	P2_RobotKOM_OUT_typ : 	STRUCT 
		ManipSrobovania_BezpecnaPozicia : BOOL;
		Zvaranie_BezpecnaPozicia : BOOL;
		Cistenie_BezpecnaPozicia : BOOL;
		Odober_Busbary4F : BOOL;
		Poloz_Busbary4F : BOOL;
		Odober_Busbary5F : BOOL;
		Poloz_Busbary5F : BOOL;
		Odober_Busbary5H : BOOL;
		Poloz_Busbary5H : BOOL;
		Odober_PravyMvCase4F : BOOL;
		Poloz_PravyMvCase4F : BOOL;
		Odober_LavyMvCase4F : BOOL;
		Poloz_LavyMvCase4F : BOOL;
		Odober_PravyMvCase5F : BOOL;
		Poloz_PravyMvCase5F : BOOL;
		Odober_LavyMvCase5F : BOOL;
		Poloz_LavyMvCase5F : BOOL;
		Odober_PravyMvCase5H : BOOL;
		Poloz_PravyMvCase5H : BOOL;
		Odober_LavyMvCase5H : BOOL;
		Poloz_LavyMvCase5H : BOOL;
		Odober_TopCover4F : BOOL;
		Poloz_TopCover4F : BOOL;
		Odober_TopCover5F : BOOL;
		Poloz_TopCover5F : BOOL;
		Odober_TopCover5H : BOOL;
		Poloz_TopCover5H : BOOL;
		Dotlac_Filter5H : BOOL;
		Cistenie_OdoberPowerCP_4F : BOOL;
		Cistenie_OdoberPowerCP_5F : BOOL;
		Cistenie_OdoberPowerCP_5H : BOOL;
		Cistenie_OtacajPowerCP : BOOL;
		Cistenie_PolozPowerCP_4F : BOOL;
		Cistenie_PolozPowerCP_5F : BOOL;
		Cistenie_PolozPowerCP_5H : BOOL;
		Presun_CakaciaPozicia : BOOL;
		UvolniBusbary : BOOL;
		Odparkovanie : BOOL;
		ZapniMotory : BOOL;
		VypniMotory : BOOL;
		PP_na_Main : BOOL;
		Reset_CS : BOOL;
		StartProgramu : BOOL;
		StartProgramuMain : BOOL;
		StopProgramu : BOOL;
		Profinet_PLC_OUTPUTS : ARRAY[0..63]OF USINT;
		TypGripra_5H : BOOL;
		TypGripra_45F : BOOL;
		TypGripra_MV : BOOL;
		Griper4F_Otvoreny : BOOL;
		Griper4F_Zatvoreny : BOOL;
		Griper4F_DrziBusbary : BOOL;
		Griper5H_Otvoreny : BOOL;
		Griper5H_Zatvoreny : BOOL;
		Griper5H_DrziBusbary : BOOL;
		GriperMvCase_Zatvoreny : BOOL; (*Griper pre MV Case a Top Cover*)
		GriperMvCase_Otvoreny : BOOL; (*Griper pre MV Case a Top Cover*)
		GriperMvCase_DrziPowerCP : BOOL;
		GriperMvCase_DrziMVcase : BOOL;
		ZmenaGripra_4F5F : BOOL;
		ZmenaGripra_5H : BOOL;
		ZmenaGripra_Cistenie : BOOL;
		ZopakujOdoberanie : BOOL;
	END_STRUCT;
END_TYPE

(*****************P2 - StoperZvarania************************)

TYPE
	P2_StoperZvarania_typ : 	STRUCT 
		IN : P2_StoperZvaraniaIN_typ;
		OUT : P2_StoperZvaraniaOUT_typ;
		PAR : P2_StoperZvaraniaPAR_typ;
		STAV : P2_StoperZvaraniaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_StoperZvaraniaIN_typ : 	STRUCT 
		PritomnostPaletky_S9 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S9 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_IS16 : BOOL;
		Centrovanie_ZASUNUTE_IS17 : BOOL;
	END_STRUCT;
	P2_StoperZvaraniaOUT_typ : 	STRUCT 
		ZasunStoper_YV59 : BOOL;
		VysunCentrovanie_YV60 : BOOL;
		ZasunCentrovanie_YV61 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		KOM_Zvaranie_START : BOOL;
		KOM_Cistenie_START : BOOL;
		KOM_Zatlacanie_START : BOOL;
	END_STRUCT;
	P2_StoperZvaraniaPAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
		IndexFotky : USINT;
	END_STRUCT;
	P2_StoperZvaraniaSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Porucha : BOOL;
	END_STRUCT;
END_TYPE

(******************P2 - Zvaranie*******************************)

TYPE
	P2_Zvaranie_typ : 	STRUCT 
		IN : P2_ZvaranieIN_typ;
		OUT : P2_ZvaranieOUT_typ;
		PAR : P2_ZvaraniePAR_typ;
		STAV : P2_ZvaranieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoZdvihuZvarania_M6 : Axis_Servo;
	END_STRUCT;
	P2_ZvaranieIN_typ : 	STRUCT 
		ZdvihZvarania_RefSnimac_IS9 : BOOL;
		PojazdZvarania_PozVPRAVO_IS10 : BOOL;
		PojazdZvarania_PozVLAVO_IS11 : BOOL;
		NapajanieZvaracky_OK : BOOL;
		ZvarackaStav_RUN : BOOL;
		ZvarackaStav_READY : BOOL;
	END_STRUCT;
	P2_ZvaranieOUT_typ : 	STRUCT 
		PojazdZvarania_VPRAVO_YV45 : BOOL; (*Presun vlavo*)
		PojazdZvarania_VLAVO_YV46 : BOOL; (*Presun vpravo*)
		Zvaracka_START : BOOL;
		Zvaracka_RESET : BOOL;
		KOM_ZavaranieUkoncene : BOOL;
		KOM_ZatlacanieUkoncene : BOOL;
	END_STRUCT;
	P2_ZvaraniePAR_typ : 	STRUCT 
		ServoZdvihu_ZadanaPozicia : LREAL;
		ServoZdvihu_ZadanyMoment : REAL;
		ServoZdvihu_JoggRychlost : REAL;
	END_STRUCT;
	P2_ZvaranieSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		ServoZdvihu_PoziciaDosiahnuta : BOOL;
		ServoZvihu_LimitSnimace_BUSY : BOOL;
		ServoZdvihu_HomingOK : BOOL;
		ServoZdvihu_BUSY : BOOL;
		Zdvih_AktualnaPozicia : LREAL;
		Zdvih_AktualnyMoment : REAL;
		Zdvih_AktualnaRychlost : REAL;
		Zdvih_JoggLimitDosiahnuty : BOOL;
		Vysledok_Zvarania : STRING[2]; (*OK alebo NG*)
	END_STRUCT;
END_TYPE

(******************P2 - »istenie******************************)

TYPE
	P2_Cistenie_typ : 	STRUCT 
		IN : P2_CistenieIN_typ;
		OUT : P2_CistenieOUT_typ;
		PAR : P2_CisteniePAR_typ;
		STAV : P2_CistenieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P2_CistenieIN_typ : 	STRUCT 
		Dvere_OTVORENE_MS7 : BOOL;
		Dvere_ZATVORENE_MS8 : BOOL;
		VakumDosiahnute_S5 : BOOL;
		Ionizator_Alarm1 : BOOL;
		Ionizator_Alarm2 : BOOL;
		Ionizator_Alarm3 : BOOL;
	END_STRUCT;
	P2_CistenieOUT_typ : 	STRUCT 
		Ionizator_RUN_ZX2 : BOOL;
		VzduchPreIonizator_RUN_YV51 : BOOL;
		Dvere_ZATVOR_YV48 : BOOL;
		Dvere_OTVOR_YV47 : BOOL;
		Odsavanie_RUN_YV49 : BOOL;
		Odsavanie_OfukRUN_YV50 : BOOL;
		KOM_CistenieUkoncene : BOOL;
	END_STRUCT;
	P2_CisteniePAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P2_CistenieSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(********************************************************P3 - Pracovisko************************************************************************)

TYPE
	P3_Pracovisko_typ : 	STRUCT 
		IN : P3_PracoviskoIN_typ;
		OUT : P3_PracoviskoOUT_typ;
		PAR : P3_PracoviskoPAR_typ;
		STAV : P3_PracoviskoSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		KoniecVyroby : BOOL;
	END_STRUCT;
	P3_PracoviskoIN_typ : 	STRUCT 
		PrivodVzduchu_SnimacTlaku_S25 : BOOL;
		PrepatovaOchrana_OK : BOOL;
	END_STRUCT;
	P3_PracoviskoOUT_typ : 	STRUCT 
		Majak_ZeleneSvetlo : BOOL;
		Majak_ZlteSvetlo : BOOL;
		Majak_CerveneSvetlo : BOOL;
		Majak_Hukacka : BOOL;
		OsvetlenieBunky : BOOL;
		Osvetlenie_CAM13 : BOOL;
		VT6_OUT1 : USINT;
		VT6_OUT2 : USINT;
		VT6_OUT3 : USINT;
		VT6_OUT4 : USINT;
		VT7_OUT1 : USINT;
		VT7_OUT2 : USINT;
		VT7_OUT3 : USINT;
		VT7_OUT4 : USINT;
	END_STRUCT;
	P3_PracoviskoPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P3_PracoviskoSTAV_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		PoINIT : BOOL;
		READY : BOOL;
		ServaBunky_READY : BOOL;
		UkoncenieCyklu_BUSY : BOOL;
		UkoncenieVyroby_BUSY : BOOL;
		KartaAB35_OK : BOOL;
		KartaAB36_OK : BOOL;
		KartaAB37_OK : BOOL;
		KartaAB38_OK : BOOL;
		KartaAB39_OK : BOOL;
		ModulDM31_OK : BOOL;
		ModulDI31_OK : BOOL;
		ModulDI32_OK : BOOL;
		ModulDI33_OK : BOOL;
		ModulDI34_OK : BOOL;
		ModulSI31_OK : BOOL;
		ModulDS31_OK : BOOL;
		ModulDS32_OK : BOOL;
		ModulDS33_OK : BOOL;
		LeakageTestA_OK : BOOL;
		LeakageTestB_OK : BOOL;
		VentilovyTerminal_VT6_OK : BOOL;
		VentilovyTerminal_VT7_OK : BOOL;
		Skrutkovacka_K40_OK : BOOL;
		Skrutkovacka_M5_OK : BOOL;
		PORUCHA : BOOL;
		Kamery_OK : BOOL;
		VentiloveTerminaly_OK : BOOL;
		Moduly_OK : BOOL;
		Skrutkovacky_OK : BOOL;
	END_STRUCT;
END_TYPE

(***************P3 - Dopravniky*****************************)

TYPE
	P3_Dopravniky_typ : 	STRUCT 
		IN : P3_DopravnikyIN_typ;
		OUT : P3_DopravnikyOUT_typ;
		PAR : P3_DopravnikyPAR_typ;
		STAV : P3_Dopravniky_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P3_DopravnikyIN_typ : 	STRUCT 
		HornyDoprav_TeplotaMotora_OK : BOOL; (*M7*)
		SpodnyDoprav_TeplotaMotora_OK : BOOL; (*M8*)
		HornyDoprav_READY : BOOL;
		SpodnyDoprav_READY : BOOL;
		SpodnyDoprav_Zaplnenie_IS58 : BOOL;
	END_STRUCT;
	P3_DopravnikyOUT_typ : 	STRUCT 
		SpodnyDoprav_ChodVPRED_M34 : BOOL;
		HornyDoprav_ChodVPRED_M33 : BOOL;
	END_STRUCT;
	P3_DopravnikyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P3_Dopravniky_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************P3 - Stoper spodnÈho dopravnÌka**************************)

TYPE
	P3_SpodnyStoper_typ : 	STRUCT 
		IN : P3_SpodnyStoperIN_typ;
		OUT : P3_SpodnyStoperOUT_typ;
		PAR : P3_SpodnyStoperPAR_typ;
		STAV : P3_SpodnyStoperSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P3_SpodnyStoperIN_typ : 	STRUCT 
		PritomnPaletky_IS66 : BOOL;
	END_STRUCT;
	P3_SpodnyStoperOUT_typ : 	STRUCT 
		ZasunStoper_YV136 : BOOL;
	END_STRUCT;
	P3_SpodnyStoperPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P3_SpodnyStoperSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************P3 - Vstupny stoper*********************)

TYPE
	P3_VstupnyStoper_typ : 	STRUCT 
		IN : P3_VstupnyStoperIN_typ;
		OUT : P3_VstupnyStoperOUT_typ;
		PAR : P3_VstupnyStoperPAR_typ;
		STAV : P3_VstupnyStoperSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P3_VstupnyStoperIN_typ : 	STRUCT 
		PritomnPaletky_IS85 : BOOL;
	END_STRUCT;
	P3_VstupnyStoperOUT_typ : 	STRUCT 
		ZasunStoper_YV193 : BOOL;
	END_STRUCT;
	P3_VstupnyStoperPAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	P3_VstupnyStoperSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
	END_STRUCT;
END_TYPE

(*****************P3 - Stoper örobovania**********************)

TYPE
	P3_StoperSrobovania_typ : 	STRUCT 
		IN : P3_StoperSrobovaniaIN_typ;
		OUT : P3_StoperSrobovaniaOUT_typ;
		PAR : P3_StoperSrobovaniaPAR_typ;
		STAV : P3_StoperSrobovaniaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P3_StoperSrobovaniaIN_typ : 	STRUCT 
		PritomnostPaletky_S22 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S22 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_MS43 : BOOL;
		Centrovanie_ZASUNUTE_MS42 : BOOL;
	END_STRUCT;
	P3_StoperSrobovaniaOUT_typ : 	STRUCT 
		ZasunStoper_YV132 : BOOL;
		VysunCentrovanie_YV151 : BOOL;
		ZasunCentrovanie_YV152 : BOOL;
		KOM_Presun_PozFotenia : BOOL;
		KOM_PresunManipulator_DOPREDU : BOOL;
		KOM_PresunManipulator_DOZADU : BOOL;
		KOM_Zahod_SkrutkuM5 : BOOL;
		KOM_Odober_SkrutkuM5 : BOOL;
		KOM_Urob_HV_Test : BOOL;
		KOM_Zatvor_HV_Test : BOOL;
		KOM_Otvor_HV_Test : BOOL;
		KOM_4F5F_ZasrobujSkrutky : BOOL;
		KOM_5H_ZasrobujSkrutku : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P3_StoperSrobovaniaPAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
		IndexFotky : USINT;
	END_STRUCT;
	P3_StoperSrobovaniaSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Porucha : BOOL;
	END_STRUCT;
END_TYPE

(****************P3 - ärobovanie***************************)

TYPE
	P3_Srobovanie_typ : 	STRUCT 
		IN : P3_SrobovanieIN_typ;
		OUT : P3_SrobovanieOUT_typ;
		PAR : P3_SrobovaniePAR_typ;
		STAV : P3_SrobovanieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoManipulOsY_M37 : Axis_Servo;
		SkrutkovaciSet_M5 : P3_SkrutkovaciSetM5_typ;
		SkrutkovaciSet_K40 : P3_SkrutkovaciSetK40_typ;
		Skrutkovacka_M5 : SkrutkovackaAtlasCopco_typ;
		Skrutkovacka_K40 : SkrutkovackaAtlasCopco_typ;
		RR_ZapniHrniec_M5 : BOOL;
		RR_SkrutkovackuM5_VYSUN : BOOL;
		RR_ZapniHrniec_K40 : BOOL;
		RR_SkrutkovackuK40_VYSUN : BOOL;
		RR_SkrutkovackaK40_CISTENIE : BOOL;
		RR_HVTest_AktivujPruzinu : BOOL;
		RR_PrisavanieSkrutkyM5 : BOOL;
		RR_PodajSkrutkuM5 : BOOL;
		RR_ZapniVibrolistu_M5 : BOOL;
		RR_OtocPodavacM5_VPRED : BOOL;
		RR_OtocPodavacM5_VZAD : BOOL;
		RR_ZatvorTester : BOOL;
		RR_OtvorTester : BOOL;
		RR_PolohujNaPoziciuSkrutky_4F5F : BOOL;
		RR_PolohujNaPoziciuSkrutky_5H : BOOL;
	END_STRUCT;
	P3_SrobovanieIN_typ : 	STRUCT 
		ManipulOsY_LimSnimacPOS_IS75 : BOOL;
		ManipulOsY_LimSnimacNEG_IS76 : BOOL;
		ZasobSrobK40_PRAZDNY_IS79 : BOOL;
		ZasobSrobK40_ListaPLNA_OS15 : BOOL;
		ZasobSrobK40_Banner_SB13 : BOOL;
		NastrelSrobK40_SrobaPresla_IS80 : BOOL;
		ZasobSrobM5_PRAZDNY_IS83 : BOOL;
		ZasobSrobM5_ListaPLNA_OS16 : BOOL;
		ZasobSrobM5_Banner_SB12 : BOOL;
		SkrutkK40_ZASUNUTY_MS52 : BOOL; (*SkrutkovaË M5 - zadn˝, SkrutkovaË M4 - stredn˝, SkrutkovaË M6 - predn˝*)
		SkrutkK40_SrobaPresla_IS81 : BOOL;
		SkrutkK40_VysunutieHrotu_IOS11 : REAL;
		SkrutkK40_VysunutieHrotu_IOlink : UINT;
		SkrutkK40_Cist_SrobaPresla_IS82 : BOOL;
		SkrutkK40_Cist_BrzdaOtvor_MS53 : BOOL;
		SkrutkK40_Cist_BrzdaZatvor_MS54 : BOOL;
		SkrutkM5_ZASUNUTY_MS57 : BOOL;
		SkrutkM5_VysunutieHrotu_IOS12 : REAL;
		SkrutkM5_VysunutieHrotu_IOlink : UINT;
		VibrolistaSrobM5_KONIEC_OS17 : BOOL;
		VibrolistaSrobM5_ZACIATOK_OS18 : BOOL;
		OddelSrobM5_OtocenyVPRED_MS56 : BOOL;
		OddelSrobM5_OtocenyVZAD_MS55 : BOOL;
		OddelSrobM5_SrobaNaVstupe_OS19 : BOOL;
		OddelSrobM5_SrobaNaVystupe_OS20 : BOOL;
		SkrutkM5_SnimacVakua_S29 : BOOL;
		NapajanieSkrutkovackyK40_OK : BOOL; (*RJ8*)
		NapajanieSkrutkovackyM5_OK : BOOL; (*RJ9*)
		NapajanieVibroZasobnikaK40_OK : BOOL; (*FM15*)
		NapajanieVibroZasobnikaM5_OK : BOOL; (*FM16*)
		NapajanieVibroListyM5_OK : BOOL; (*FM17*)
		HVTest_ZASUNUTY_MS51 : BOOL;
		HVTest_VYSUNUTY_MS50 : BOOL;
		HVTest_Kontakty_ZASUNUTE_MS44 : BOOL;
		HVTest_Kontakty_VYSUNUTE_MS45 : BOOL;
		HVTest_TypKonektoru_4F : BOOL;
		HVTest_TypKonektoru_5F_5H : BOOL;
	END_STRUCT;
	P3_SrobovanieOUT_typ : 	STRUCT 
		ZasobSrobK40_Banner_CervenaLED : BOOL;
		ZasobSrobM5_Banner_CervenaLED : BOOL;
		ZasobSrobK40_Ofuk_RUN_YV114 : BOOL;
		ZasobSrobK40_OfukTried_RUN_YV115 : BOOL;
		ZasobSrobK40_Vibrovanie_RUN_FM15 : BOOL; (*VM1*)
		ZasobSrobM5_Ofuk_RUN_YV125 : BOOL;
		ZasobSrobM5_OfukTried_RUN_YV126 : BOOL;
		ZasobSrobM5_Vibrovanie_RUN_FM16 : BOOL; (*VM2*)
		VibrolistaSrobM5_Vibrov_RUN_FM17 : BOOL;
		NastrelSrobK40_PosunSrobu_YV116 : BOOL;
		NastrelSrobK40_NastrelSrob_YV117 : BOOL;
		SkrutkK40_VYSUN_YV118 : BOOL;
		SkrutkK40_OfukVakua_RUN_YV119 : BOOL;
		SkrutkK40_PrisavSkrut_RUN_YV120 : BOOL;
		SkrutkK40_Cist_OTVOR_YV121 : BOOL;
		SkrutkK40_Cist_POSUN_YV124 : BOOL;
		SkrutkK40_Cist_ODSAVANIE_YV122 : BOOL;
		SkrutkM5_VYSUN_YV129 : BOOL;
		OddelovacSrobM5_OtocVPRED_YV128 : BOOL;
		OddelovacSrobM5_OtocVZAD_YV127 : BOOL;
		SkrutkM5_PrisavSkrut_ZAPNI_YV130 : BOOL;
		SkrutkM5_PrisavSkrut_VYPNI_YV131 : BOOL;
		HVTest_VYSUN_YV150 : BOOL;
		HVTest_ZASUN_YV149 : BOOL;
		HVTest_PneuPruzinu_VYSUN_YV156 : BOOL;
		HVTest_PneuPruzinu_ZASUN_YV155 : BOOL;
		KOM_SkrutkK40_START : BOOL;
		KOM_SkrutkM5_START : BOOL;
		KOM_Cinnost_Ukoncena : BOOL;
		HVTest_Kontakty_VYSUN_YV154 : BOOL;
		HVTest_Kontakty_ZASUN_YV153 : BOOL;
		HVTest_PritlacKontTestera_YV140 : BOOL;
	END_STRUCT;
	P3_SrobovaniePAR_typ : 	STRUCT 
		OsY_ZadanaPozicia : LREAL;
		OsY_JoggRychlost : REAL;
		K40_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		K40_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		M5_AtlasCopcoInputs : ARRAY[0..7]OF UDINT;
		M5_AllasCopcoOutputs : ARRAY[0..7]OF UDINT;
		RR_IndexPozicieSkrutky_4F5F : USINT;
		RR_IndexPozicieSkrutky_5H : USINT;
	END_STRUCT;
	P3_SrobovanieSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		OsY_HomingOK : BOOL;
		OsY_BUSY : BOOL;
		OsY_PoziciaDosiahnuta : BOOL;
		OsY_LimitSnimace_BUSY : BOOL;
		OsY_AktualnaPozicia : LREAL;
		OsY_AktualnyMoment : REAL;
		OsY_AktualnaRychlost : REAL;
		OsY_JoggLimitDosiahnuty : BOOL;
		Vysledok_Srobovania : STRING[2]; (*OK alebo NG*)
		Vysledok_HV_Testu : STRING[2]; (*OK alebo NG*)
		HV_Test_Zatvoreny : BOOL;
		HV_Test_Ukonceny : BOOL;
		HV_Test_Otvoreny : BOOL;
		K40_DosiahnutyMoment_REAL : REAL;
		K40_DosiahnutyMoment : UDINT;
		K40_Moment_ToleranciaMAX_REAL : REAL;
		K40_Moment_ToleranciaMAX : UDINT;
		K40_Moment_ToleranciaMIN_REAL : REAL;
		K40_Moment_ToleranciaMIN : UDINT;
		K40_DosiahnutyUhol : UINT;
		K40_Uhol_ToleranciaMAX_REAL : REAL;
		K40_Uhol_ToleranciaMAX : UDINT;
		K40_Uhol_ToleranciaMIN_REAL : REAL;
		K40_Uhol_ToleranciaMIN : UDINT;
		M5_DosiahnutyMoment_REAL : REAL;
		M5_DosiahnutyMoment : UDINT;
		M5_Moment_ToleranciaMAX_REAL : REAL;
		M5_Moment_ToleranciaMAX : UDINT;
		M5_Moment_ToleranciaMIN_REAL : REAL;
		M5_Moment_ToleranciaMIN : UDINT;
		M5_DosiahnutyUhol : UINT;
		M5_Uhol_ToleranciaMAX_REAL : REAL;
		M5_Uhol_ToleranciaMAX : UDINT;
		M5_Uhol_ToleranciaMIN_REAL : REAL;
		M5_Uhol_ToleranciaMIN : UDINT;
		Zasobnik_M5_Prazdny : BOOL;
		Zasobnik_K40_Prazdny : BOOL;
		Cistenie_K40_BUSY : BOOL;
		Podanie_M5_BUSY : BOOL;
		Model_4F_VysunutieStrednejK40 : ARRAY[0..100]OF REAL;
		Model_4F_VysunutieStrednejM5 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieStrednejK40 : ARRAY[0..100]OF REAL;
		Model_5F_VysunutieStrednejM5 : ARRAY[0..100]OF REAL;
		Model_5H_VysunutieStrednejM5 : ARRAY[0..100]OF REAL;
	END_STRUCT;
END_TYPE

(***************P3 - AkumulaËn˝ stoper*********************)

TYPE
	P3_AkumulacnyStoper_typ : 	STRUCT 
		IN : P3_AkumulacnyStoperIN_typ;
		OUT : P3_AkumulacnyStoperOUT_typ;
		PAR : P3_AkumulacnyStoperPAR_typ;
		STAV : P3_AkumulacnyStoperSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P3_AkumulacnyStoperIN_typ : 	STRUCT 
		PritomnPaletky_IS65 : BOOL;
	END_STRUCT;
	P3_AkumulacnyStoperOUT_typ : 	STRUCT 
		ZasunStoper_YV133 : BOOL;
	END_STRUCT;
	P3_AkumulacnyStoperPAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	P3_AkumulacnyStoperSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
	END_STRUCT;
END_TYPE

(****************P3 - Leakage test A**********************)

TYPE
	P3_LeakageTestA_typ : 	STRUCT 
		IN : P3_LeakegeTestA_IN_typ;
		OUT : P3_LeakegeTestA_OUT_typ;
		PAR : P3_LeakegeTestA_PAR_typ;
		STAV : P3_LeakegeTestA_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		RR_TestovanieLeakageTestu : BOOL;
		RR_VysunSpodneKopito : BOOL;
		RR_TestovaciaSekvencia : BOOL;
	END_STRUCT;
	P3_LeakegeTestA_IN_typ : 	STRUCT 
		PritomnostPaletky_S23 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S23 : USINT; (*RFID snÌmaË na IO-linku*)
		Pritlak_VYSUNUTY_MS47 : BOOL;
		Pritlak_ZASUNUTY_MS46 : BOOL;
		ZamkyZamknute_S30 : BOOL;
		PritomnostKopita_IS67 : BOOL;
		VyrovnavaciTlak_OK_S26 : BOOL; (*IO-Link snÌmaË*)
		PrecitanyVyrovnavaciTlak_S26 : UINT; (*IO-Link snÌmaË*)
		PreratanyVyrovnavaciTlak_Bar : REAL;
		Kopito_ZASUNUTE_IS68 : BOOL;
		Centrovanie_VYSUNUTE_IS71 : BOOL;
		Centrovanie_ZASUNUTE_IS72 : BOOL;
		NapajanieTestera_OK_ATEQ1 : BOOL;
		Tester_TypKonektoru_4F : BOOL;
		Tester_TypKonektoru_5F_5H : BOOL;
	END_STRUCT;
	P3_LeakegeTestA_OUT_typ : 	STRUCT 
		Pritlak_VYSUN_YV157 : BOOL;
		Pritlak_ZASUN_YV158 : BOOL;
		PneuZamok_ODOMKNI_YV159 : BOOL;
		Kopito_VYSUN_YV141 : BOOL;
		Kopito_ZASUN_YV142 : BOOL;
		VysunCentrovanie_YV143 : BOOL;
		ZasunCentrovanie_YV144 : BOOL;
		ZasunStoper_YV134 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P3_LeakegeTestA_PAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		SnimacTlaku_IOLinkInputs : UINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P3_LeakegeTestA_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Tester_ON : BOOL;
		TestovaciaSekvencia_BUSY : BOOL;
	END_STRUCT;
END_TYPE

(****************P3 - Leakage test B**********************)

TYPE
	P3_LeakageTestB_typ : 	STRUCT 
		IN : P3_LeakegeTestB_IN_typ;
		OUT : P3_LeakegeTestB_OUT_typ;
		PAR : P3_LeakegeTestB_PAR_typ;
		STAV : P3_LeakegeTestB_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		RR_TestovanieLeakageTestu : BOOL;
		RR_VysunSpodneKopito : BOOL;
		RR_TestovaciaSekvencia : BOOL;
	END_STRUCT;
	P3_LeakegeTestB_IN_typ : 	STRUCT 
		PritomnostPaletky_S24 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S24 : USINT; (*RFID snÌmaË na IO-linku*)
		Pritlak_VYSUNUTY_MS49 : BOOL;
		Pritlak_ZASUNUTY_MS48 : BOOL;
		ZamkyZamknute_S31 : BOOL;
		PritomnostKopita_IS69 : BOOL;
		VyrovnavaciTlak_OK_S27 : BOOL; (*IO-Link snÌmaË*)
		PrecitanyVyrovnavaciTlak_S27 : UINT; (*IO-Link snÌmaË*)
		PreratanyVyrovnavaciTlak_Bar : REAL;
		Kopito_ZASUNUTE_IS70 : BOOL;
		Centrovanie_VYSUNUTE_IS73 : BOOL;
		Centrovanie_ZASUNUTE_IS74 : BOOL;
		NapajanieTestera_OK_ATEQ2 : BOOL;
		Tester_TypKonektoru_4F : BOOL;
		Tester_TypKonektoru_5F_5H : BOOL;
	END_STRUCT;
	P3_LeakegeTestB_OUT_typ : 	STRUCT 
		Pritlak_VYSUN_YV161 : BOOL;
		Pritlak_ZASUN_YV162 : BOOL;
		PneuZamok_ODOMKNI_YV160 : BOOL;
		Kopito_VYSUN_YV145 : BOOL;
		Kopito_ZASUN_YV146 : BOOL;
		VysunCentrovanie_YV147 : BOOL;
		ZasunCentrovanie_YV148 : BOOL;
		ZasunStoper_YV135 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		KOM_StanicaA_StartTestovania : BOOL;
	END_STRUCT;
	P3_LeakegeTestB_PAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		SnimacTlaku_IOLinkInputs : UINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P3_LeakegeTestB_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		Tester_ON : BOOL;
		TestovaciaSekvencia_BUSY : BOOL;
	END_STRUCT;
END_TYPE

(***************************************************P4 - Pracovisko*******************************************************************)

TYPE
	P4_Pracovisko_typ : 	STRUCT 
		IN : P4_PracoviskoIN_typ;
		OUT : P4_PracoviskoOUT_typ;
		PAR : P4_PracoviskoPAR_typ;
		STAV : P4_PracoviskoSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		KoniecVyroby : BOOL;
	END_STRUCT;
	P4_PracoviskoIN_typ : 	STRUCT 
		PrepatovaOchrana_OK : BOOL;
		PrivodVzduchu_SnimacTlaku_S15 : BOOL;
	END_STRUCT;
	P4_PracoviskoOUT_typ : 	STRUCT 
		Majak_ZeleneSvetlo : BOOL;
		Majak_ZlteSvetlo : BOOL;
		Majak_CerveneSvetlo : BOOL;
		Majak_Hukacka : BOOL;
		OsvetlenieBunky : BOOL;
		Osvetlenie_CAM16 : BOOL;
		Osvetlenie_CAM15 : BOOL;
		VT8_OUT1 : USINT;
		VT8_OUT2 : USINT;
		VT8_OUT3 : USINT;
		VT8_OUT4 : USINT;
	END_STRUCT;
	P4_PracoviskoPAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	P4_PracoviskoSTAV_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		PoINIT : BOOL;
		READY : BOOL;
		UkoncenieCyklu_BUSY : BOOL;
		UkoncenieVyroby_BUSY : BOOL;
		ServaBunky_READY : BOOL;
		ServoVytahu_READY : BOOL;
		KartaAB44_OK : BOOL;
		KartaAB45_OK : BOOL;
		KartaAB46_OK : BOOL;
		KartaAB47_OK : BOOL;
		KartaAB48_OK : BOOL;
		ModulDM41_OK : BOOL;
		ModulDI41_OK : BOOL;
		ModulDI42_OK : BOOL;
		ModulSI41_OK : BOOL;
		ModulSI42_OK : BOOL;
		ModulDS41_OK : BOOL;
		ModulDS42_OK : BOOL;
		VentilovyTerminal_VT8_OK : BOOL;
		PORUCHA : BOOL;
		Kamery_OK : BOOL;
		VentiloveTerminaly_OK : BOOL;
		Moduly_OK : BOOL;
	END_STRUCT;
END_TYPE

(***************P4 - Dopravniky*****************************)

TYPE
	P4_Dopravniky_typ : 	STRUCT 
		IN : P4_DopravnikyIN_typ;
		OUT : P4_DopravnikyOUT_typ;
		PAR : P4_DopravnikyPAR_typ;
		STAV : P4_DopravnikySTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	P4_DopravnikyIN_typ : 	STRUCT 
		HornyDoprav_TeplotaMotora_OK : BOOL; (*M24*)
		HornyDoprav_READY : BOOL;
		SpodnyDoprav_TeplotaMotora_OK : BOOL; (*M27*)
		SpodnyDoprav_READY : BOOL;
		SnimacZaplneniaSpodnejTrate_IS58 : BOOL;
	END_STRUCT;
	P4_DopravnikyOUT_typ : 	STRUCT 
		HornyDoprav_ChodVPRED_M24 : BOOL;
		SpodnyDoprav_ChodVPRED_M27 : BOOL;
	END_STRUCT;
	P4_DopravnikyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	P4_DopravnikySTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
END_TYPE

(***************P4 - Vyùah************************************)

TYPE
	P4_Vytah_typ : 	STRUCT 
		IN : P4_VytahIN_typ;
		OUT : P4_VytahOUT_typ;
		PAR : P4_VytahPAR_typ;
		STAV : P4_VytahSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoZdvihuVytahu_M26 : Axis_Servo;
		RR_ChodDopravnika_VPRED : BOOL;
		RR_ChodDopravnika_VZAD : BOOL;
	END_STRUCT;
	P4_VytahIN_typ : 	STRUCT 
		PritomnostPaletky_S13 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S13 : USINT; (*RFID snÌmaË na IO-linku*)
		BannerNalozeniaPaletky_SB10 : BOOL; (*Hodnota prÌde cez IO-link*)
		VystupDopravnikaVytahu_OS11 : BOOL;
		ZdvihVytahu_LimSnimacPOS_IS57 : BOOL;
		ZdvihVytahu_LimSnimacNEG_IS56 : BOOL;
		SpodnaPolohaVytahu_IS85 : BOOL;
		Dopravnik_TeplotaMotora_OK : BOOL; (*M5*)
		Dopravnik_READY : BOOL;
	END_STRUCT;
	P4_VytahOUT_typ : 	STRUCT 
		Dopravnik_VYVAZANIE_M5 : BOOL;
		Dopravnik_NAVAZANIE_M5 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		Banner_CervenaLED_SB10 : BOOL;
		Banner_ZelenaLED_SB10 : BOOL;
		Banner_ModraLED_SB10 : BOOL;
		Banner_OranzovaLED_SB10 : BOOL;
		Banner_ZltaLED_SB10 : BOOL;
		Banner_CyanLED_SB10 : BOOL;
		Banner_ModraRotujucaLED_SB10 : BOOL;
		Banner_LED_OFF : BOOL;
	END_STRUCT;
	P4_VytahPAR_typ : 	STRUCT 
		ServoZdvihu_ZadanaPozicia : LREAL;
		ServoZdvihu_JoggRychlost : REAL;
		IndexFotky : USINT;
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		Banner_IOLinkInputs : ARRAY[0..1]OF USINT;
		Banner_IOLinkOutputs : ARRAY[0..9]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P4_VytahSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		ServoZdvihu_PoziciaDosiahnuta : BOOL;
		ServoZvihu_LimitSnimace_BUSY : BOOL;
		ServoZdvihu_HomingOK : BOOL;
		ServoZdvihu_BUSY : BOOL;
		Zdvih_AktualnaPozicia : LREAL;
		Zdvih_AktualnaRychlost : REAL;
		Zdvih_JoggLimitDosiahnuty : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		ServoZdvihu_Homing_BUSY : BOOL;
		Kamera_VysledkyM5_ENABLE : BOOL;
	END_STRUCT;
END_TYPE

(***************P4 - FunkËn˝ test A************************************)

TYPE
	P4_FunkcnyTestA_typ : 	STRUCT 
		IN : P4_FunkcnyTestA_IN_typ;
		OUT : P4_FunkcnyTestA_OUT_typ;
		PAR : P4_FunkcnyTestA_PAR_typ;
		STAV : P4_FunkcnyTestA_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		RR_TestovanieFunkcnehoTestu : BOOL;
		RR_ZapniOdpruzenieKontaktov : BOOL;
		RR_VysunKontaktyTestera : BOOL;
		RR_ZatvorTester : BOOL;
		RR_OtvorTester : BOOL;
	END_STRUCT;
	P4_FunkcnyTestA_IN_typ : 	STRUCT 
		PritomnostPaletky_S10 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S10 : USINT; (*RFID snÌmaË na IO-linku*)
		HorneKontakty_VYSUNUTE_MS25 : BOOL;
		HorneKontakty_ZASUNUTE_MS23 : BOOL;
		SpodneKontakty_VYSUNUTE_MS33 : BOOL;
		SpodneKontakty_ZASUNUTE_MS31 : BOOL;
		Centrovanie_VYSUNUTE_MS29 : BOOL;
		Centrovanie_ZASUNUTE_MS27 : BOOL;
		TypSpodnychKontaktov_4F : BOOL;
		TypSpodnychKontaktov_5F_5H : BOOL;
	END_STRUCT;
	P4_FunkcnyTestA_OUT_typ : 	STRUCT 
		ZasunStoper_YV163 : BOOL;
		HorneKontakty_VYSUN_YV178 : BOOL;
		HorneKontakty_ZASUN_YV177 : BOOL;
		OdpruzenieKontaktov_ZAPNI_YV179 : BOOL;
		OdpruzenieKontaktov_VYPNI_YV180 : BOOL;
		SpodneKontakty_VYSUN_YV182 : BOOL;
		SpodneKontakty_ZASUN_YV181 : BOOL;
		VysunCentrovanie_YV183 : BOOL;
		ZasunCentrovanie_YV184 : BOOL;
		KontaktyTestera_VYSUN_YV171 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
	END_STRUCT;
	P4_FunkcnyTestA_PAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P4_FunkcnyTestA_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		Vysledok_FV_Testu : STRING[2]; (*OK alebo NG*)
		PrebiehaVyvezeniePaletky : BOOL;
		Tester_ON : BOOL;
	END_STRUCT;
END_TYPE

(***************P4 - FunkËn˝ test B************************************)

TYPE
	P4_FunkcnyTestB_typ : 	STRUCT 
		IN : P4_FunkcnyTestB_IN_typ;
		OUT : P4_FunkcnyTestB_OUT_typ;
		PAR : P4_FunkcnyTestB_PAR_typ;
		STAV : P4_FunkcnyTestB_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		RR_TestovanieFunkcnehoTestu : BOOL;
		RR_ZapniOdpruzenieKontaktov : BOOL;
		RR_VysunKontaktyTestera : BOOL;
		RR_ZatvorTester : BOOL;
		RR_OtvorTester : BOOL;
	END_STRUCT;
	P4_FunkcnyTestB_IN_typ : 	STRUCT 
		PritomnostPaletky_S11 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S11 : USINT; (*RFID snÌmaË na IO-linku*)
		HorneKontakty_VYSUNUTE_MS26 : BOOL;
		HorneKontakty_ZASUNUTE_MS24 : BOOL;
		SpodneKontakty_VYSUNUTE_MS34 : BOOL;
		SpodneKontakty_ZASUNUTE_MS32 : BOOL;
		Centrovanie_VYSUNUTE_MS30 : BOOL;
		Centrovanie_ZASUNUTE_MS28 : BOOL;
		TypSpodnychKontaktov_4F : BOOL;
		TypSpodnychKontaktov_5F_5H : BOOL;
	END_STRUCT;
	P4_FunkcnyTestB_OUT_typ : 	STRUCT 
		ZasunStoper_YV164 : BOOL;
		HorneKontakty_VYSUN_YV186 : BOOL;
		HorneKontakty_ZASUN_YV185 : BOOL;
		OdpruzenieKontaktov_ZAPNI_YV187 : BOOL;
		OdpruzenieKontaktov_VYPNI_YV188 : BOOL;
		SpodneKontakty_VYSUN_YV190 : BOOL;
		SpodneKontakty_ZASUN_YV189 : BOOL;
		VysunCentrovanie_YV191 : BOOL;
		ZasunCentrovanie_YV192 : BOOL;
		KontaktyTestera_VYSUN_YV172 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		KOM_StanicaA_StartTestovania : BOOL;
	END_STRUCT;
	P4_FunkcnyTestB_PAR_typ : 	STRUCT 
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
	END_STRUCT;
	P4_FunkcnyTestB_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		Vysledok_FV_Testu : STRING[2]; (*OK alebo NG*)
		PrebiehaVyvezeniePaletky : BOOL;
		Tester_ON : BOOL;
	END_STRUCT;
END_TYPE

(***************P4 - Etiketovacka*************************************)

TYPE
	P4_Etiketovacka_typ : 	STRUCT 
		IN : P4_Etiketovacka_IN_typ;
		OUT : P4_Etiketovacka_OUT_typ;
		PAR : P4_Etiketovacka_PAR_typ;
		STAV : P4_Etiketovacka_STAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoZdvihuEtiketovania_M28 : Axis_Servo;
		RR_TestovanieEtiketovania : BOOL;
		RR_VysunAplikator : BOOL;
		RR_ZapniPrisavanie : BOOL;
	END_STRUCT;
	P4_Etiketovacka_IN_typ : 	STRUCT 
		PritomnostPaletky_S12 : BOOL; (*RFID snÌmaË na IO-linku*)
		PrecitaneCisloPaletky_S12 : USINT; (*RFID snÌmaË na IO-linku*)
		Centrovanie_VYSUNUTE_IS54 : BOOL;
		Centrovanie_ZASUNUTE_IS55 : BOOL;
		ZdvihEtiketovania_RefSnimac_IS59 : BOOL;
		Aplikator_VYSUNUTY_MS36 : BOOL;
		Aplikator_ZASUNUTY_MS35 : BOOL;
		SnimacVakuaPrisavaniaEtikety_S32 : BOOL;
		NapajanieTlaciarne_OK : BOOL;
		Tlaciaren_ERROR : BOOL;
		Tlaciaren_READY : BOOL;
		Tlaciaren_DochadzaPaska : BOOL;
		PritlakPaskyOdisteny_IS84 : BOOL;
	END_STRUCT;
	P4_Etiketovacka_OUT_typ : 	STRUCT 
		ZasunStoper_YV165 : BOOL;
		VysunCentrovanie_YV166 : BOOL;
		ZasunCentrovanie_YV167 : BOOL;
		Aplikator_VYSUN_YV173 : BOOL;
		Prisavanie_ZAPNI_YV175 : BOOL;
		Prisavanie_VYPNI_YV176 : BOOL;
		OfukEtikety_ZAPNI_YV174 : BOOL;
		KOM_PLC_OdosliFotkyNaServer : BOOL;
		KOM_PLC_VymazFotky : BOOL;
		Tlaciaren_START_Tlace : BOOL;
		Tlaciaren_RESET_Poruchy : BOOL;
	END_STRUCT;
	P4_Etiketovacka_PAR_typ : 	STRUCT 
		ServoZdvihu_ZadanaPozicia : LREAL;
		ServoZdvihu_JoggRychlost : REAL;
		SnimacPaletky_IOLinkInputs : ARRAY[1..10]OF USINT;
		IndexPaletky : USINT;
		IndexPaletky_STRING : STRING[2];
		IndexFotky : USINT;
	END_STRUCT;
	P4_Etiketovacka_STAV_typ : 	STRUCT 
		PoINIT : BOOL;
		ServoZdvihu_PoziciaDosiahnuta : BOOL;
		ServoZvihu_LimitSnimace_BUSY : BOOL;
		ServoZdvihu_HomingOK : BOOL;
		ServoZdvihu_BUSY : BOOL;
		Zdvih_AktualnaPozicia : LREAL;
		Zdvih_AktualnyMoment : REAL;
		Zdvih_AktualnaRychlost : REAL;
		Zdvih_JoggLimitDosiahnuty : BOOL;
		KOM_PLC_OdoslanieFotiek_OK : BOOL;
		KOM_PLC_VymazanieFotiek_OK : BOOL;
		OdoslanieFotiek_OK : BOOL;
		OdoslanieFotiek_Error : BOOL;
		VymazanieFotiek_OK : BOOL;
		VymazanieFotiek_Error : BOOL;
		PrebiehaVyvezeniePaletky : BOOL;
		PowerCP_ZhodaQRkodu_OK : BOOL;
		Etiketa_ZhodaQRkodu_OK : BOOL;
		TestovaciaSekvencia_BUSY : BOOL;
	END_STRUCT;
END_TYPE

(******************SkrutkovacieSety***********************)

TYPE
	P1_SkrutkovaciSetM5_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		SkrutkaM5_Pripravena : BOOL;
		SkrutkaM5_Odobrata : BOOL;
	END_STRUCT;
	P1_SkrutkovaciSetK30_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaK30_Pripravena : BOOL;
		SkrutkaK30_Odobrata : BOOL;
	END_STRUCT;
	P1_SkrutkovaciSetM4_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaM4_Pripravena : BOOL;
		SkrutkaM4_Odobrata : BOOL;
	END_STRUCT;
	P2_SkrutkovaciSetM6_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaM6_Pripravena : BOOL;
		SkrutkaM6_Odobrata : BOOL;
	END_STRUCT;
	P2_SkrutkovaciSetM5_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaM5_Pripravena : BOOL;
		SkrutkaM5_Odobrata : BOOL;
	END_STRUCT;
	P2_SkrutkovaciSetM4_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaM4_Pripravena : BOOL;
		SkrutkaM4_Odobrata : BOOL;
	END_STRUCT;
	P2_SkrutkovaciSetMaticaM4_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		MaticaM4_Pripravena : BOOL;
		MaticaM4_Odobrata : BOOL;
	END_STRUCT;
	P3_SkrutkovaciSetK40_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaK40_Pripravena : BOOL;
		SkrutkaK40_Odobrata : BOOL;
	END_STRUCT;
	P3_SkrutkovaciSetM5_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		UkoncenieCyklu : BOOL;
		Cistenie : BOOL;
		CistenieUkoncene : BOOL;
		SkrutkaM5_Pripravena : BOOL;
		SkrutkaM5_Odobrata : BOOL;
	END_STRUCT;
END_TYPE

(*******************Devlink*****************************)

TYPE
	StrukturaNovehoNazvuAdresara_typ : 	STRUCT 
		LINKA : STRING[10]; (*N·zov linky PowerCP*)
		PRACOVISKO : STRING[10]; (*ST1,ST2,ST3 .......*)
		ROK : STRING[10]; (*YYYY*)
		DATUM : STRING[10]; (*YYYY_MM_SS*)
	END_STRUCT;
	StrukturaNovehoNazvuSuboru_typ : 	STRUCT 
		DATUM : STRING[10]; (*YYYY_MM_DD*)
		CAS : STRING[8]; (*HH_MM_SS*)
		SERIAL : STRING[30]; (*KÛd modelu*)
		INDEX : STRING[2]; (*1,2,3 ......*)
		RESULT : STRING[5]; (*PASS alebo FAIL*)
		Pripona : STRING[5]; (*.jpg*)
	END_STRUCT;
END_TYPE

(**************Skrutkovacky***************************)

TYPE
	SkrutkovackaAtlasCopco_typ : 	STRUCT 
		RESET_Poruchy : BOOL;
		RESET_Vysledkov : BOOL;
		START_Skrutkovania : BOOL;
		START_Utahovania : BOOL;
		Stav_VysledokPotvrdeny : BOOL;
		Stav_EmergencyStop : BOOL;
		Stav_READY_to_START : BOOL;
		Stav_MANUAL : BOOL;
		Stav_UtahovanieUkoncene : BOOL;
		Stav_VysledokUtahovania_OK : BOOL;
		Stav_VysledokUtahovania_NG : BOOL;
		Stav_SmerOtacania_VPRED : BOOL;
		Stav_BUSY : BOOL;
		Stav_ControlerSwitch_ON : BOOL;
		Stav_Station_READY : BOOL;
		Stav_NastrojPripojeny : BOOL;
		Stav_NastrojUtahuje : BOOL;
		Stav_CisloAktualnehoProgramu : USINT;
		CisloZadanehoProgramu : USINT;
		VyslednyReport : STRING[5];
	END_STRUCT;
END_TYPE

(**************Ateq Leakage Testery******************)

TYPE
	AteqTester_typ : 	STRUCT 
		START_Testovania : BOOL;
		RESET_Vysledkov : BOOL;
		ZMEN_Program : BOOL;
		CitajParametreTestera : BOOL;
		Stav_RESET_DONE : BOOL;
		Stav_START_DONE : BOOL;
		Stav_ZmenaProgramu_DONE : BOOL;
		Stav_ERROR : BOOL;
		Stav_READY : BOOL;
		Stav_BUSY : BOOL;
		Stav_CitanieParametrov_OK : BOOL;
		Stav_CitanieParametrov_ERROR : BOOL;
		CisloZadanehoProgramu : UINT;
		CisloAktualnehoProgramu : UINT;
		VysledokTestovania_OK : BOOL;
		VysledokTestovania_NG : BOOL;
		Profinet_PLC_INPUTS : ARRAY[1..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[1..100]OF USINT;
		ReadParameter_1 : UINT;
		ReadParameter_2 : UINT;
		ReadParameter_3 : UINT;
		ReadParameter_4 : UINT;
		ReadParameter_5 : DINT;
		PocetCitanychParametrov : USINT;
		IdentifikaciaParametra_1 : USINT;
		IdentifikaciaParametra_2 : USINT;
		IdentifikaciaParametra_3 : USINT;
		IdentifikaciaParametra_4 : USINT;
		CasPnenia : REAL;
		CasStabilizacie : REAL;
		TlakPlnenia : REAL;
		Tolerancia : REAL;
		TlakUniku : REAL;
	END_STRUCT;
END_TYPE

(***************Etiketa********************************)

TYPE
	Etiketa_typ : 	STRUCT 
		LocationCode : STRING[2]; (*KK*)
		PartIdentNumber : STRING[7]; (*SSSSSSS*)
		ChangeIndex : STRING[2]; (*II*)
		ProductionYear : STRING[2]; (*JJ*)
		Manufactured : STRING[1]; (*H*)
		DayOfProduction : STRING[3]; (*TTT*)
		AssemblyLine : STRING[1]; (*M*)
		DayProductionCounter : STRING[5]; (*PPPPP*)
		SuplierNumber : STRING[6]; (*LLLLLL*)
		PlantCode : STRING[2]; (*NN*)
		DataMetrix : STRING[31]; (*Vytv·ram ho z kodu modelu na pracovisku etiketovania*)
		TypModelu : STRING[8];
		CountryCode : STRING[2];
		DatumVyroby : STRING[8]; (*02.03.20*)
	END_STRUCT;
END_TYPE

(***************Komunik·cia zo serverom********************)

TYPE
	KOM_Server_typ : 	STRUCT 
		CMD : KOM_Server_CMD_typ;
		INPUTS : KOM_Server_INPUTS_typ;
		OUTPUTS : KOM_Server_OUTPUTS_typ;
		STATUS : KOM_Server_STATUS_typ;
	END_STRUCT;
	KOM_Server_CMD_typ : 	STRUCT 
		VyziadajStavPaletky_TYP1 : BOOL;
		PriradQRkodFiltra_TYP3 : BOOL;
		VyziadajCisloEtikety_TYP0 : BOOL;
		OdosliStavPaletky_TYP2 : BOOL;
	END_STRUCT;
	KOM_Server_INPUTS_typ : 	STRUCT 
		TYP_Prikazu : STRING[1]; (*Typ*)
		CisloStanice : STRING[5]; (*Stanica*)
		CisloPaletky : STRING[10]; (*RFID paletky*)
		QRkodPowerCP : STRING[30]; (*Master number*)
		QRkodFiltra : STRING[30]; (*DPS1*)
		ID_Operatora : STRING[80]; (*Operator*)
		Report : STRING[4000]; (*DATA  - OddelenÈ bodkoËiarkou*)
		StavPaletky : STRING[4]; (*PASS alebo FAIL*)
		IndexPaletky : USINT;
	END_STRUCT;
	KOM_Server_OUTPUTS_typ : 	STRUCT 
		TYP_Prikazu : STRING[1]; (*Typ*)
		CisloStanice : STRING[5]; (*Stanica*)
		CisloPaletky : STRING[10]; (*RFID paletky*)
		QRkodPowerCP : STRING[30]; (*Master number*)
		QRkodFiltra : STRING[30]; (*DPS1*)
		ID_Operatora : STRING[8]; (*Operator*)
		CisloEtikety : STRING[31];
		DruhCinnostiNaPaletke : STRING[20]; (*PRD;ST1 alebo SMP;CAL;ST1 alebo RST;HVT;ST1*)
		PovolenieCinnostiNaPaletke : STRING[2]; (*OK alebo NG*)
	END_STRUCT;
	KOM_Server_STATUS_typ : 	STRUCT 
		KomunikaciaUkoncena : BOOL;
		KomunikaciaError : BOOL;
	END_STRUCT;
END_TYPE

(***************VyslednÈ reporty***************************)

TYPE
	Reports_typ : 	STRUCT 
		Kamery : ReportKamery_typ;
		Skrutkovacky : ReportSkrutkovacky_typ;
		Zvaranie : ReportZvarania_typ;
		LeakageTest : ReportLeakageTest_typ;
	END_STRUCT;
	ReportKamery_typ : 	STRUCT 
		P1_CAM2_KontrolaPaletky : STRING[5]; (*V˝tah*)
		P1_CAM4_KontrolaPinovDPS : STRING[5]; (*V˝tah*)
		P1_CAM6_KontrolaPaletky : STRING[5]; (*Srobovanie*)
		P2_CAM1_KontrolaTesnenia : STRING[5];
		P2_CAM17_KontrolaPaletky : STRING[5]; (*Zakladanie tesnenia*)
		P2_CAM9_KontrolaPaletky : STRING[5]; (*Srobovanie matice*)
		P2_CAM10_KontrolaPaletky : STRING[5]; (*Srobovanie*)
		P2_CAM11_KontrolaZvaru : STRING[5]; (*Zvaranie*)
		P2_CAM11_KontrolaPowerCP : STRING[5]; (*Zvaranie*)
		P2_CAM12_KontrolaPaletky : STRING[5];
		P3_CAM13_KontrolaPaletky : STRING[5]; (*Srobovanie*)
		P4_CAM15_KontrolaPaletky : STRING[5]; (*EtiketovaËka*)
		P4_CAM16_KontrolaPaletky : STRING[5]; (*V˝tah*)
	END_STRUCT;
	ReportSkrutkovacky_typ : 	STRUCT 
		Moment_ToleranciaMAX : ReportSrobov_MomentTolerMAX_typ;
		Moment_ToleranciaMIN : ReportSrobov_MomentTolerMIN_typ;
		Moment_NameranaHodnota : ReportSrobov_NameranyMoment_typ;
		Uhol_ToleranciaMAX : ReportSrobov_UholTolerMAX_typ;
		Uhol_ToleranciaMIN : ReportSrobov_UholTolerMIN_typ;
		Uhol_NameranaHodnota : ReportSrobov_NameranyUhol_typ;
		VyskaSkrutkovania : ReportSrobov_VyskaSkrutkov_typ;
		CasSkrutkovania : ReportSrobov_CasSkrutkov_typ;
		VyslednyReport : ReportSrobov_VyslednyReport_typ;
	END_STRUCT;
	ReportZvarania_typ : 	STRUCT 
		Vyska : ReportZvarania_Vyska_typ;
		Moment : ReportZvarania_Moment_typ;
		Frekvencia : STRING[10];
		VyslednyReport : STRING[5];
	END_STRUCT;
	ReportZvarania_Vyska_typ : 	STRUCT 
		LavyZvar : STRING[10];
		PravyZvar : STRING[10];
	END_STRUCT;
	ReportZvarania_Moment_typ : 	STRUCT 
		LavyZvar : STRING[4];
		PravyZvar : STRING[4];
	END_STRUCT;
	ReportSrobov_MomentTolerMAX_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_MomentTolerMIN_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_NameranyMoment_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_UholTolerMAX_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_UholTolerMIN_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_NameranyUhol_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_VyskaSkrutkov_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_CasSkrutkov_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[10];
		P1_PravaSkrutkaK30 : STRING[10];
		P1_ZadnaSkrutkaM4 : STRING[10];
		P1_PrednaSkrutkaM4 : STRING[10];
		P1_SkrutkaDPS_M4 : STRING[10];
		P1_LavaSkrutkaM5 : STRING[10];
		P1_PravaSkrutkaM5 : STRING[10];
		P1_StrednaSkrutkaM5 : STRING[10];
		P2_MaticaM4 : STRING[10];
		P2_LavaSkrutkaM6 : STRING[10];
		P2_PravaSkrutkaM6 : STRING[10];
		P2_LavaSkrutkaM4 : STRING[10];
		P2_PravaSkrutkaM4 : STRING[10];
		P2_LavaSkrutkaM5 : STRING[10];
		P2_PravaSkrutkaM5 : STRING[10];
		P2_StrednaSkrutkaM4 : STRING[10];
		P3_SkrutkaK40 : STRING[10];
		P3_SkrutkaM5 : STRING[10];
	END_STRUCT;
	ReportSrobov_VyslednyReport_typ : 	STRUCT 
		P1_LavaSkrutkaK30 : STRING[5];
		P1_PravaSkrutkaK30 : STRING[5];
		P1_ZadnaSkrutkaM4 : STRING[5];
		P1_PrednaSkrutkaM4 : STRING[5];
		P1_SkrutkaDPS_M4 : STRING[5];
		P1_LavaSkrutkaM5 : STRING[5];
		P1_PravaSkrutkaM5 : STRING[5];
		P1_StrednaSkrutkaM5 : STRING[5];
		P2_MaticaM4 : STRING[5];
		P2_LavaSkrutkaM6 : STRING[5];
		P2_PravaSkrutkaM6 : STRING[5];
		P2_LavaSkrutkaM4 : STRING[5];
		P2_PravaSkrutkaM4 : STRING[5];
		P2_LavaSkrutkaM5 : STRING[5];
		P2_PravaSkrutkaM5 : STRING[5];
		P2_StrednaSkrutkaM4 : STRING[5];
		P3_SkrutkaK40 : STRING[5];
		P3_SkrutkaM5 : STRING[5];
	END_STRUCT;
	ReportLeakageTest_typ : 	STRUCT 
		CasPlnenia : RepLeakTest_CasPlnenia_typ;
		CasStabilizacie : RepLeakTest_CasStabilizacie_typ;
		TlakPlnenia : RepLeakTest_TlakPlnenia_typ;
		TlakPritlaku : RepLeakTest_TlakPritlaku_typ;
		ToleranciaPritlaku_MIN : RepLeakTest_TolPritlakuMIN_typ;
		ToleranciaPritlaku_MAX : RepLeakTest_TolPritlakuMAX_typ;
		ToleranciaTlakUniku_MIN : RepLeakTest_TolTlakUnikuMIN_typ;
		ToleranciaTlakUniku_MAX : RepLeakTest_TolTlakUnikuMAX_typ;
		TlakUniku : RepLeakTest_TlakUniku_typ;
		Tolerancia : RepLeakTest_Tolerancia_typ;
		VyslednyReport : RepLeakTest_VyslednyReport_typ;
	END_STRUCT;
	RepLeakTest_CasPlnenia_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_CasStabilizacie_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TlakPlnenia_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TlakPritlaku_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TolPritlakuMIN_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TolPritlakuMAX_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TlakUniku_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TolTlakUnikuMIN_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_TolTlakUnikuMAX_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_Tolerancia_typ : 	STRUCT 
		StanicaA : STRING[10];
		StanicaB : STRING[10];
	END_STRUCT;
	RepLeakTest_VyslednyReport_typ : 	STRUCT 
		StanicaA : STRING[5];
		StanicaB : STRING[5];
	END_STRUCT;
END_TYPE

(***************Posielanie fotiek na server**********************)

TYPE
	FTP_Kamery_typ : 	STRUCT 
		CMD : FTP_Kamery_CMD_typ;
		INPUTS : FTP_Kamery_INPUTS_typ;
		STATUS : FTP_Kamery_STATUS_typ;
	END_STRUCT;
	FTP_Kamery_CMD_typ : 	STRUCT 
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	FTP_Kamery_INPUTS_typ : 	STRUCT 
		QRkodPowerCP : STRING[30]; (*Master number*)
		Result : STRING[5]; (*PASS alebo FAIL*)
		IndexFotky : STRING[2];
	END_STRUCT;
	FTP_Kamery_STATUS_typ : 	STRUCT 
		KomunikaciaUkoncena : BOOL;
		KomunikaciaError : BOOL;
		CisloPoruchy : USINT;
		AdresarPrazdny : BOOL;
	END_STRUCT;
END_TYPE

(***************Meranie taktime********************************)

TYPE
	Taktime_typ : 	STRUCT 
		CMD : Taktime_CMD_typ;
		OUTPUTS : Taktime_OUTPUTS_typ;
	END_STRUCT;
	Taktime_CMD_typ : 	STRUCT 
		START_Merania_1 : BOOL;
		ZAPIS_Hodnot_1 : BOOL;
		STOP_Merania_1 : BOOL;
		START_Merania_2 : BOOL;
		ZAPIS_Hodnot_2 : BOOL;
		STOP_Merania_2 : BOOL;
	END_STRUCT;
	Taktime_OUTPUTS_typ : 	STRUCT 
		NameraneHodiny_1 : UINT;
		NameraneMinuty_1 : UINT;
		NameraneSekundy_1 : UINT;
		NameraneMilisekundy_1 : UINT;
		NameraneHodiny_2 : UINT;
		NameraneMinuty_2 : UINT;
		NameraneSekundy_2 : UINT;
		NameraneMilisekundy_2 : UINT;
	END_STRUCT;
END_TYPE

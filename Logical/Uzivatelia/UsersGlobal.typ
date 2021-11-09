
TYPE
	UsersVizu_typ : 	STRUCT 
		TypPrihlasenia : USINT;
		ZoznamUzivatelov : ARRAY[0..100]OF STRING[100];
		Edit_MenoUzivatela : STRING[80]; (*Meno zadavan� pri ulo�en� u�ivatela*)
		Edit_HesloUzivatela : STRING[80]; (*Heslo zadan� pri ulo�en� u�ivatela*)
		Edit_CisloKarty : STRING[80]; (*Cislo karty nacitane pri ulo�en� u�ivatela*)
		Edit_UrovenUzivatela : STRING[80];
		CisloPrihlasenejKarty_Panel1 : STRING[80]; (*Cislo karty nacitane pri ulo�en� u�ivatela*)
		CisloPrihlasenejKarty_Panel2 : STRING[80]; (*Cislo karty nacitane pri ulo�en� u�ivatela*)
		CisloPrihlasenejKarty_Panel3 : STRING[80]; (*Cislo karty nacitane pri ulo�en� u�ivatela*)
		ZadaneMenoUzivatela : STRING[80]; (*Meno zadan� cez prihlasovacie okno*)
		ZadaneHesloUzivatela : STRING[80]; (*Heslo zadan� cez prihlasovacie okno*)
		ZadaneCisloKarty_Panel1 : STRING[80]; (*Cislo karty na��tan� pri prihl�sen�*)
		ZadaneCisloKarty_Panel2 : STRING[80]; (*Cislo karty na��tan� pri prihl�sen�*)
		ZadaneCisloKarty_Panel3 : STRING[80]; (*Cislo karty na��tan� pri prihl�sen�*)
		MenoPrihlasenehoUzivatela_Panel1 : STRING[80]; (*Zobrazuje sa vo vizualiz�cii*)
		MenoPrihlasenehoUzivatela_Panel2 : STRING[80]; (*Zobrazuje sa vo vizualiz�cii*)
		MenoPrihlasenehoUzivatela_Panel3 : STRING[80]; (*Zobrazuje sa vo vizualiz�cii*)
		UlozUzivatela : BOOL;
		PrihlasUzivatela : BOOL;
		VymazUzivatela : BOOL;
		OdhlasUzivatela_Panel1 : BOOL;
		OdhlasUzivatela_Panel2 : BOOL;
		OdhlasUzivatela_Panel3 : BOOL;
		NacitajUzivatela : BOOL;
		LB_Index : UINT;
		LB_IndexSTRING : STRING[80];
		KartaPrilozena_Panel1 : BOOL;
		KartaPrilozena_Panel2 : BOOL;
		KartaPrilozena_Panel3 : BOOL;
		EditaciaMena_ENABLE : BOOL;
		EditaciaHesla_ENABLE : BOOL;
		EditaciaKarty_ENABLE : BOOL;
		TL_UlozUzivatela_ENABLE : BOOL;
		TlacitkoPrihlasenie_ENABLE : BOOL;
		Stav_ExistujuciUzivatel : BOOL;
		Stav_ChybajuceDataUzivatela : BOOL;
		StavyUsers_Index : USINT;
	END_STRUCT;
	ParametreUzivatelovTyp : 	STRUCT 
		Meno : STRING[80];
		Heslo : STRING[80];
		CisloKarty : STRING[80];
		UrovenUzivatela : UINT;
	END_STRUCT;
END_TYPE

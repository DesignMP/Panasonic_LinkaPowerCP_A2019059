
TYPE
	SkrutkovaciSetStruc : 	STRUCT 
		VretenoStatus : WSTRING[80];
		VretenoFaza : USINT;
		Zasobnik : ZasobnikStruc;
		Vreteno : VretenoStruc;
		SkrutkaOdobrata : BOOL;
		SkrutkaPripravena : BOOL;
		Manual : BOOL;
		PodajSrobu : BOOL;
		CistenieVykonane : BOOL;
		VykonajCistenie : BOOL;
		Automat : BOOL;
	END_STRUCT;
	INzasobnik : 	STRUCT 
		EscapementGR : BOOL;
		EscapementAR : BOOL;
		AccumulationSwitch : BOOL; (*Snimac zaplnenia S25*)
		FeederLevelControl : BOOL; (*Hladina v zasobniku S20*)
	END_STRUCT;
	OUTzasobnik : 	STRUCT 
		StartA20 : BOOL; (*Zapnutie vibrovania A20*)
		Escapement : BOOL; (*Pustanie matky do hadice Y22*)
		FeedAir : BOOL; (*Strielanie do hadice Y21*)
		SortingAir : BOOL; (*Triedenie kusov Y30*)
		BlowOff : BOOL; (*Zhadzovanie kusov Y25*)
	END_STRUCT;
	INvreteno : 	STRUCT 
		ReturnStroke : BOOL; (*Vreteno zasunute S01*)
		DeptControl : BOOL; (*Vreteno vysunute S02*)
		PushClinderGR : BOOL; (*Posuvaci valec v domovskej  polohe S11*)
		PushClinderAR : BOOL; (*Posuvaci valec v pracovnej polohe S10*)
		ScrewMeasurement : BOOL; (*Kontrola matice v hadici S21*)
		ScrewMeasurementPushCylinder : BOOL; (*Kontrola matice v posuvacom valci S06*)
		ScrewControl : BOOL; (*Kontrola matice vo vretene S14*)
	END_STRUCT;
	OUTvreteno : 	STRUCT 
		Spindle : BOOL; (*Vysunutie vretena Y02*)
		Vacuum : BOOL; (*Pridrzanie skrutky Y15*)
		PushCylinder : BOOL; (*Posunutie z hadice do hlavy Y10*)
		CounterBlast : BOOL; (*Uvolnenie skrutky Y16*)
	END_STRUCT;
	VretenoStruc : 	STRUCT 
		OUT : OUTvreteno;
		IN : INvreteno;
	END_STRUCT;
	ZasobnikStruc : 	STRUCT 
		OUT : OUTzasobnik;
		IN : INzasobnik;
	END_STRUCT;
END_TYPE


TYPE
	SkrutkovaciSetStruc1 : 	STRUCT 
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
	INzasobnik1 : 	STRUCT 
		AccumulationSwitch : BOOL; (*Snimac zaplnenia S25*)
		ScrewMeasurement : BOOL; (*Kontrola matice S21*)
		FeederLevelControl : BOOL; (*Hladina v zasobniku S20*)
	END_STRUCT;
	OUTzasobnik1 : 	STRUCT 
		StartA20 : BOOL; (*Zapnutie vibrovania A20*)
		Escapement : BOOL; (*Pustanie matky do hadice Y22*)
		FeedAir : BOOL; (*Strielanie do hadice Y21*)
		SortingAir : BOOL; (*Triedenie kusov Y30*)
		BlowOff : BOOL; (*Zhadzovanie kusov Y25*)
	END_STRUCT;
	INvreteno1 : 	STRUCT 
		ReturnStroke : BOOL; (*Vreteno zasunute S01*)
		DeptControl : BOOL; (*Vreteno vysunute S02*)
		BrakeClosed : BOOL; (*Brzda zatvorena S13*)
		BrakeOpen : BOOL; (*Brzda otvorena S12*)
		ScrewMeasurementBrake : BOOL; (*Kontrola matice pred brzdou S15*)
		ScrewMeasurement : BOOL; (*Kontrola matice v hadici S06*)
	END_STRUCT;
	OUTvreteno1 : 	STRUCT 
		WasteExtraction : BOOL; (*Odstranovanie spiny Y13*)
		Spindle : BOOL; (*Vysunutie vretena Y02*)
		BlastAirBrake : BOOL; (*Strielanie za brzdou Y14*)
		BrakeSpindle : BOOL; (*Brzda vretena Y12*)
		Vacuum : BOOL; (*Pridrzanie skrutky Y15*)
		CounterBlast : BOOL; (*Uvolnenie skrutky Y16*)
	END_STRUCT;
	VretenoStruc1 : 	STRUCT 
		OUT : OUTvreteno;
		IN : INvreteno;
	END_STRUCT;
	ZasobnikStruc1 : 	STRUCT 
		OUT : OUTzasobnik;
		IN : INzasobnik;
	END_STRUCT;
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
		AccumulationSwitch : BOOL; (*Snimac zaplnenia S25*)
		ScrewMeasurement : BOOL; (*Kontrola matice S21*)
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
		BrakeClosed : BOOL; (*Brzda zatvorena S13*)
		BrakeOpen : BOOL; (*Brzda otvorena S12*)
		ScrewMeasurementBrake : BOOL; (*Kontrola matice pred brzdou S15*)
		ScrewMeasurement : BOOL; (*Kontrola matice v hadici S06*)
	END_STRUCT;
	OUTvreteno : 	STRUCT 
		WasteExtraction : BOOL; (*Odstranovanie spiny Y13*)
		Spindle : BOOL; (*Vysunutie vretena Y02*)
		BlastAirBrake : BOOL; (*Strielanie za brzdou Y14*)
		BrakeSpindle : BOOL; (*Brzda vretena Y12*)
		Vacuum : BOOL; (*Pridrzanie skrutky Y15*)
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

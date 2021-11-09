
TYPE
	SkrutkovaciSetStruc : 	STRUCT 
		VretenoStatus : WSTRING[80];
		VretenoFaza : USINT;
		Zasobnik : ZasobnikStruc;
		Vreteno : VretenoStruc;
		SkrutkaOdobrata : BOOL;
		SkrutkaPripravena : BOOL;
		Manual : BOOL;
		Automat : BOOL;
	END_STRUCT;
	INzasobnik : 	STRUCT 
		AccumulationSwitchEnd : BOOL; (*Snimac zaplnenia listy koniec S28*)
		AccumulationSwitchStart : BOOL; (*Snimac zaplnenia zaciatok listy S25*)
		EscapementDrop : BOOL; (*Koliska na odoberani skrutky S22*)
		EscapementPickUp : BOOL; (*Koliska na naberani skrutky S23*)
		InlineControl : BOOL; (*Srobka v koliske S24*)
		ScrewAvailable : BOOL; (*Srobka na odoberani S21*)
		FeederLevelControl : BOOL; (*Hladina v zasobniku S20*)
	END_STRUCT;
	OUTzasobnik : 	STRUCT 
		StartA20Lista : BOOL; (*Zapnutie vibrovania A20 na liste*)
		StartA20Hrniec : BOOL; (*Zapnutie vibrovania A20 v hrnci*)
		EscapementDrop : BOOL; (*Koliska na odoberanie Y22*)
		EscapementPickUp : BOOL; (*Koliska na naberanie Y23*)
		SortingAir : BOOL; (*Triedenie kusov Y30*)
		BlowOff : BOOL; (*Zhadzovanie kusov Y25*)
	END_STRUCT;
	INvreteno : 	STRUCT 
		VretenoVysunuteSrobovanie : BOOL; (*IOlink signal*)
		VretenoVysunuteOdhadzovanie : BOOL; (*IOlink signal*)
		VretenoVysunuteOdoberanie : BOOL; (*IOlink signal*)
		VakuumDosiahnute : BOOL; (*Vakuum dosiahnute S28*)
		ReturnStroke : BOOL; (*Vreteno zasunute S01*)
	END_STRUCT;
	OUTvreteno : 	STRUCT 
		Spindle : BOOL; (*Vysunutie vretena Y02*)
		VacuumOff : BOOL; (*Vypnutie vakua na pridrzanie skrutky Y15*)
		VacuumOn : BOOL; (*Pridrzanie skrutky Y15*)
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

(************Kamera 1*******************)

TYPE
	CAM1_typ : 	STRUCT 
		CMD : CAM1_Commands_typ;
		PAR : CAM1_Parametre_typ;
		STAV : CAM1_Status_typ;
		RESULT : CAM1_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM1_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM1_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM1_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM1_Results_typ : 	STRUCT 
		PritomnTesnenia_OK : BOOL;
		ZalozenieTesnenia_OK : BOOL;
		PritomnPowerCP_5H5F : BOOL;
		PritomnPowerCP_4F : BOOL;
	END_STRUCT;
END_TYPE

(*********Kamera 2***********)

TYPE
	CAM2_typ : 	STRUCT 
		CMD : CAM2_Commands_typ;
		PAR : CAM2_Parametre_typ;
		STAV : CAM2_Status_typ;
		RESULT : CAM2_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM2_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM2_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM2_Status_typ : 	STRUCT 
		READY : BOOL;
		BUSY : BOOL;
		SWITCH : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM2_Results_typ : 	STRUCT 
		Paletka : CAM2_Paletka_typ;
		PowerCP : CAM2_PowerCP_typ;
	END_STRUCT;
	CAM2_PowerCP_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	CAM2_Paletka_typ : 	STRUCT 
		Pritom_PowerCP_5F : BOOL;
		Pritom_PowerCP_4F : BOOL;
		Pritom_PowerCP_5H : BOOL;
		Pritom_Busbar_SpodnyLavy_5H : BOOL;
		Pritom_Busbar_SpodnyPravy_5H : BOOL;
		Pritom_KrytuBusbarov_5H : BOOL;
		Pritom_DPS_4F5F : BOOL;
		Pritom_Busbaru_Spodny_5F : BOOL;
		Pritom_Busbaru_Spodny_4F : BOOL;
		Pritom_Foamu_4F5F : BOOL;
		Pritomn_Skeletonu_4F5F : BOOL;
		Pritomn_Skeletonu_5H : BOOL;
		Nepritomn_TopCoveru_4F : BOOL;
		Nepritomn_TopCoveru_5F5H : BOOL;
		Pritomn_LavyMVcase : BOOL;
		Pritomn_PravyMVcase : BOOL;
		OsadeniePlastuDPS_OK : BOOL;
		KompletSpodneBusbary_OK : BOOL;
	END_STRUCT;
END_TYPE

(***********Kamera 3****************)

TYPE
	CAM3_typ : 	STRUCT 
		CMD : CAM3_Commands_typ;
		PAR : CAM3_Parametre_typ;
		STAV : CAM3_Status_typ;
		RESULT : CAM3_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM3_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM3_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM3_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
	END_STRUCT;
	CAM3_Results_typ : 	STRUCT 
		Paletka : CAM3_Paletka_typ;
		PowerCP : CAM3_PowerCP_typ;
	END_STRUCT;
	CAM3_PowerCP_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	CAM3_Paletka_typ : 	STRUCT 
		CitanieQRkodu_DPS_OK : BOOL;
		PrecitanyQRkod_DPS : STRING[32];
	END_STRUCT;
END_TYPE

(***********Kamera 4******************)

TYPE
	CAM4_typ : 	STRUCT 
		CMD : CAM4_Commands_typ;
		PAR : CAM4_Parametre_typ;
		STAV : CAM4_Status_typ;
		RESULT : CAM4_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM4_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM4_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM4_Status_typ : 	STRUCT 
		READY : BOOL;
		BUSY : BOOL;
		SWITCH : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM4_Results_typ : 	STRUCT 
		Paletka : CAM4_Paletka_typ;
		PowerCP : CAM4_PowerCP_typ;
	END_STRUCT;
	CAM4_PowerCP_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	CAM4_Paletka_typ : 	STRUCT 
		Pritomn_Pinu1_KrytDPS_4F5F : BOOL;
		Pritomn_Pinu2_KrytDPS_4F5F : BOOL;
		Pritomn_Pinu3_KrytDPS_4F5F : BOOL;
		Pritomn_Pinu4_KrytDPS_4F5F : BOOL;
		Pritomn_Pinu5_KrytDPS_4F5F : BOOL;
		Pritomn_Pinu6_KrytDPS_4F5F : BOOL;
		Pritom_DPS_4F5F : BOOL;
	END_STRUCT;
END_TYPE

(***********Kamera 5******************)

TYPE
	CAM5_typ : 	STRUCT 
		CMD : CAM5_Commands_typ;
		PAR : CAM5_Parametre_typ;
		STAV : CAM5_Status_typ;
		RESULT : CAM5_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM5_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM5_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM5_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
	END_STRUCT;
	CAM5_Results_typ : 	STRUCT 
		Paletka : CAM5_Paletka_typ;
		PowerCP : CAM5_PowerCP_typ;
	END_STRUCT;
	CAM5_PowerCP_typ : 	STRUCT 
		CitanieQRkodu_PowerCP_OK : BOOL;
		PrecitanyQRkod_PowerCP : STRING[32];
	END_STRUCT;
	CAM5_Paletka_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
END_TYPE

(***********Kamera 6********************)

TYPE
	CAM6_typ : 	STRUCT 
		CMD : CAM6_Commands_typ;
		PAR : CAM6_Parametre_typ;
		STAV : CAM6_Status_typ;
		RESULT : CAM6_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM6_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM6_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM6_Status_typ : 	STRUCT 
		READY : BOOL;
		BUSY : BOOL;
		SWITCH : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM6_Results_typ : 	STRUCT 
		Paletka : CAM6_Paletka_typ;
		PowerCP : CAM6_PowerCP_typ;
	END_STRUCT;
	CAM6_PowerCP_typ : 	STRUCT 
		Nepritom_LavyFoam_4F5F : BOOL;
		Nepritom_PravyFoam_4F5F : BOOL;
		Pritom_LavejSkrutkyK30 : BOOL;
		Pritom_PravejSkrutkyK30 : BOOL;
		Pritom_SkrutkyDPS_4F5F : BOOL;
		Nepritom_ZadnejSkrutkyM4_4F : BOOL;
		Nepritom_ZadnejSkrutkyM4_5F : BOOL;
		Nepritom_PrednejSkrutkyM4_4F : BOOL;
		Nepritom_PrednejSkrutkyM4_5F : BOOL;
		Pritom_LavejSkrutkyM5_5H : BOOL;
		Pritom_PravejSkrutkyM5_5H : BOOL;
		Pritom_StrednejSkrutkyM5_5H : BOOL;
	END_STRUCT;
	CAM6_Paletka_typ : 	STRUCT 
		Pritom_SpodnychBusbarov_5H : BOOL;
		Pritom_KrytuBusbarov_5H : BOOL;
		Pritom_SpodnyBusbar_5F : BOOL;
		Pritom_SpodnyBusbar_4F : BOOL;
		Pritom_LavyFoam_4F5F : BOOL;
		Pritom_PravyFoam_4F5F : BOOL;
	END_STRUCT;
END_TYPE

(************Kamera 7*******************)

TYPE
	CAM7_typ : 	STRUCT 
		CMD : CAM7_Commands_typ;
		PAR : CAM7_Parametre_typ;
		STAV : CAM7_Status_typ;
		RESULT : CAM7_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM7_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM7_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM7_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM7_Results_typ : 	STRUCT 
		CitanieQRkodu_Filtra5H_OK : BOOL;
		PrecitanyQRkod_Filtra5H : STRING[32];
	END_STRUCT;
END_TYPE

(************Kamera 8********************)

TYPE
	CAM8_typ : 	STRUCT 
		CMD : CAM8_Commands_typ;
		PAR : CAM8_Parametre_typ;
		STAV : CAM8_Status_typ;
		RESULT : CAM8_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM8_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM8_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM8_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
	END_STRUCT;
	CAM8_Results_typ : 	STRUCT 
		Paletka : CAM8_Paletka_typ;
		PowerCP : CAM8_PowerCP_typ;
	END_STRUCT;
	CAM8_PowerCP_typ : 	STRUCT 
		CitanieQRkodu_PowerCP_OK : BOOL;
		PrecitanyQRkod_PowerCP : STRING[30];
	END_STRUCT;
	CAM8_Paletka_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
END_TYPE

(*************Kamera 9********************)

TYPE
	CAM9_typ : 	STRUCT 
		CMD : CAM9_Commands_typ;
		PAR : CAM9_Parametre_typ;
		STAV : CAM9_Status_typ;
		RESULT : CAM9_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM9_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM9_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM9_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
	END_STRUCT;
	CAM9_Results_typ : 	STRUCT 
		Paletka : CAM9_Paletka_typ;
		PowerCP : CAM9_PowerCP_typ;
	END_STRUCT;
	CAM9_PowerCP_typ : 	STRUCT 
		NepritomMatice : BOOL;
		PritomnBusbaru_5H : BOOL;
	END_STRUCT;
	CAM9_Paletka_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
END_TYPE

(**************Kamera 10******************)

TYPE
	CAM10_typ : 	STRUCT 
		CMD : CAM10_Commands_typ;
		PAR : CAM10_Parametre_typ;
		STAV : CAM10_Status_typ;
		RESULT : CAM10_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM10_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM10_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM10_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM10_Results_typ : 	STRUCT 
		Paletka : CAM10_Paletka_typ;
		PowerCP : CAM10_PowerCP_typ;
	END_STRUCT;
	CAM10_PowerCP_typ : 	STRUCT 
		Pritomn_LavejSkrutkyM6_4F5F : BOOL;
		Pritomn_PravejSkrutkyM6_4F5F : BOOL;
		Pritomn_LavejM4_4F5F : BOOL;
		Pritomn_PravejM4_4F5F : BOOL;
		Pritomn_SkrutkyM4_Filtra_5H : BOOL;
		Pritomn_LavejSkrutkyM5_5H : BOOL;
		Pritomn_PravejSkrutkyM5_5H : BOOL;
	END_STRUCT;
	CAM10_Paletka_typ : 	STRUCT 
		Pritomn_Busbarov_5F : BOOL;
		Pritomn_Busbarov_4F : BOOL;
		Pritomn_Busbarov_5H : BOOL;
		Pritomn_PowerCP_5H : BOOL;
		Pritomn_PowerCP_4F : BOOL;
		Pritomn_PowerCP_5F : BOOL;
	END_STRUCT;
END_TYPE

(**************Kamera 11*****************)

TYPE
	CAM11_typ : 	STRUCT 
		CMD : CAM11_Commands_typ;
		PAR : CAM11_Parametre_typ;
		STAV : CAM11_Status_typ;
		RESULT : CAM11_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM11_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM11_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM11_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM11_Results_typ : 	STRUCT 
		Paletka : CAM11_Paletka_typ;
		PowerCP : CAM11_PowerCP_typ;
	END_STRUCT;
	CAM11_Paletka_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	CAM11_PowerCP_typ : 	STRUCT 
		Pritomn_PowerCP_4F : BOOL;
		Pritomn_PowerCP_5F : BOOL;
		Pritomn_PowerCP_5H : BOOL;
		Pritomn_LavyMVcase : BOOL;
		Pritomn_PravyMVcase : BOOL;
		LavyBusbar_Zvaranie_OK : BOOL;
		PravyBusbar_Zvaranie_OK : BOOL;
		Pritomn_TopCover_4F : BOOL;
		Pritomn_TopCover_5F : BOOL;
		Pritomn_TopCover_5H : BOOL;
	END_STRUCT;
END_TYPE

(***************Kamera 12*****************)

TYPE
	CAM12_typ : 	STRUCT 
		CMD : CAM12_Commands_typ;
		PAR : CAM12_Parametre_typ;
		STAV : CAM12_Status_typ;
		RESULT : CAM12_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM12_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM12_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM12_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM12_Results_typ : 	STRUCT 
		Paletka : CAM12_Paletka_typ;
		PowerCP : CAM12_PowerCP_typ;
	END_STRUCT;
	CAM12_Paletka_typ : 	STRUCT 
		Pritomn_TopCover_5H5F : BOOL;
		Pritomn_TopCover_4F : BOOL;
		Pritomn_LavyMVcase : BOOL;
		Pritomn_PravyMVcase : BOOL;
	END_STRUCT;
	CAM12_PowerCP_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
END_TYPE

(***************Kamera 13****************)

TYPE
	CAM13_typ : 	STRUCT 
		CMD : CAM13_Commands_typ;
		PAR : CAM13_Parametre_typ;
		STAV : CAM13_Status_typ;
		RESULT : CAM13_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM13_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM13_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM13_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM13_Results_typ : 	STRUCT 
		Pritomn_SkrutkyK40_TopCover_4F5F : BOOL;
		Pritomn_SkrutkyM5_TopCover : BOOL;
	END_STRUCT;
END_TYPE

(***************Kamera 14*****************)

TYPE
	CAM14_typ : 	STRUCT 
		CMD : CAM14_Commands_typ;
		PAR : CAM14_Parametre_typ;
		STAV : CAM14_Status_typ;
		RESULT : CAM14_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM14_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM14_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM14_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
	END_STRUCT;
	CAM14_Results_typ : 	STRUCT 
		Paletka : CAM14_Paletka_typ;
		PowerCP : CAM14_PowerCP_typ;
	END_STRUCT;
	CAM14_PowerCP_typ : 	STRUCT 
		CitanieQRkodu_PowerCP_OK : BOOL;
		PrecitanyQRkod_PowerCP : STRING[32];
	END_STRUCT;
	CAM14_Paletka_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
END_TYPE

(****************Kamera 15***************)

TYPE
	CAM15_typ : 	STRUCT 
		CMD : CAM15_Commands_typ;
		PAR : CAM15_Parametre_typ;
		STAV : CAM15_Status_typ;
		RESULT : CAM15_Results_typ;
		Profinet_QRkod_Znaky : ARRAY[0..31]OF USINT;
		Profinet_OCR_Znaky : ARRAY[0..31]OF USINT;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM15_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM15_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM15_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM15_Results_typ : 	STRUCT 
		Pritomn_Etikety : BOOL;
		Pritomn_LogoBMV : BOOL;
		Pritomn_Textu_PowerCP : BOOL;
		Pritomn_Textu_Panasonic : BOOL;
		Pritomn_Textu_SK : BOOL;
		CitanieQRkodu_Etikety_OK : BOOL;
		PrecitanyQRkod_Etikety : STRING[31];
		PrecitaneOCR_Etikety : STRING[32];
	END_STRUCT;
END_TYPE

(****************Kamera 16**************)

TYPE
	CAM16_typ : 	STRUCT 
		CMD : CAM16_Commands_typ;
		PAR : CAM16_Parametre_typ;
		STAV : CAM16_Status_typ;
		RESULT : CAM16_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM16_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM16_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM16_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM16_Results_typ : 	STRUCT 
		New_Member : USINT;
		Paletka : CAM16_Paletka_typ;
		PowerCP : CAM16_PowerCP_typ;
	END_STRUCT;
	CAM16_Paletka_typ : 	STRUCT 
		Pritomn_Busbarov_4F : BOOL;
		Pritomn_Busbarov_5F : BOOL;
		Pritomn_Busbarov_5H : BOOL;
		Pritomn_LavyMVcase : BOOL;
		Pritomn_PravyMVcase : BOOL;
		Pritomn_PowerCP : BOOL;
		PrazdnaPaletka : BOOL;
	END_STRUCT;
	CAM16_PowerCP_typ : 	STRUCT 
		PritomnostSkrutky_K40 : BOOL;
		PritomnostSkrutky_M5 : BOOL;
	END_STRUCT;
END_TYPE

(*************Kamera 17*******************)

TYPE
	CAM17_typ : 	STRUCT 
		CMD : CAM17_Commands_typ;
		PAR : CAM17_Parametre_typ;
		STAV : CAM17_Status_typ;
		RESULT : CAM17_Results_typ;
		Profinet_PLC_INPUTS : ARRAY[0..100]OF USINT;
		Profinet_PLC_OUTPUTS : ARRAY[0..3]OF USINT;
	END_STRUCT;
	CAM17_Commands_typ : 	STRUCT 
		Triger : BOOL;
		OdosliFotku : BOOL;
		VymazFotku : BOOL;
	END_STRUCT;
	CAM17_Parametre_typ : 	STRUCT 
		ResultFotky : STRING[5];
	END_STRUCT;
	CAM17_Status_typ : 	STRUCT 
		BUSY : BOOL;
		SWITCH : BOOL;
		READY : BOOL;
		OLD_SWITCH : BOOL;
		Results_READY : BOOL;
		Command_READY : BOOL;
		Command_ERROR : BOOL;
		Command_AKCEPTOVANY : BOOL;
	END_STRUCT;
	CAM17_Results_typ : 	STRUCT 
		Paletka : CAM17_Paletka_typ;
		PowerCP : CAM17_PowerCP_typ;
	END_STRUCT;
	CAM17_PowerCP_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	CAM17_Paletka_typ : 	STRUCT 
		Pritomn_TopCoveru_4F : BOOL;
		Pritomn_TopCoveru_5F : BOOL;
		Pritomn_TopCoveru_5H : BOOL;
		Pritomn_Busbary_5H : BOOL;
		Pritomn_Busbary_5F : BOOL;
		Pritomn_Busbary_4F : BOOL;
		Pritomn_LavyMVcase : BOOL;
		Pritomn_PravyMVcase : BOOL;
		Pritomn_PowerCP_4F : BOOL;
		Pritomn_PowerCP_5F : BOOL;
		Pritomn_PowerCP_5H : BOOL;
		PoziciaBusbarov4F5F_OK : BOOL;
		PoziciaBusbarov5H_OK : BOOL;
	END_STRUCT;
END_TYPE

(************Control Unit********************)

TYPE
	ControlUnit_typ : 	STRUCT 
		Profinet_PLC_INPUTS : ARRAY[0..1]OF USINT;
		Stav_READY : BOOL;
	END_STRUCT;
END_TYPE

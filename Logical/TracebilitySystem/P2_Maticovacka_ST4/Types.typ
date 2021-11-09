
TYPE
	Report_typ : 	STRUCT 
		PoradoveCislo : STRING[2]; (*IDstep - Poradov� �islo reportu*)
		Popis : STRING[100]; (*Description - Popis*)
		FormatHodnoty : STRING[2]; (*TypValue - Format zaslan� hodnoty  1- ��slo, 2 - Znak*)
		Tolerancia_MIN_Hodnota : STRING[10]; (*MinTol - Minim�lna tolerancia meranej veli�iny*)
		Tolerancia_MAX_Hodnota : STRING[10]; (*MaxTol - Maxim�lna tolerancia meranej veli�iny*)
		Nominal : STRING[10]; (*Nom - Ak jezvolen� form�t string tak tu zad�me OK inak je prazdna*)
		Tolerancia_MIN_Jednotky : STRING[10]; (*MinEle - Jednotky minim�lnej tolerancie veli�iny*)
		Tolerancia_MAX_Jednotky : STRING[10]; (*MaxEle - Jednotky maxim�lnej tolerancie veli�iny*)
		NameranaHodnota : STRING[10]; (*Value - Namerana hodnota veli�iny, ak su kamery tak bude hodnota OK alebo NG*)
		NameranaHodnota_Jednotky : STRING[10]; (*ValEle - Jednotky nameranej veli�iny*)
		VyslednyResult : STRING[5]; (*Result - V�sledn� result  PASS, FAIL, SKIP*)
	END_STRUCT;
END_TYPE

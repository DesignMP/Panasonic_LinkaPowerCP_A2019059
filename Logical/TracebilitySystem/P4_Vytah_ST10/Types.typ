
TYPE
	Report_typ : 	STRUCT 
		PoradoveCislo : STRING[2]; (*IDstep - Poradové èislo reportu*)
		Popis : STRING[100]; (*Description - Popis*)
		FormatHodnoty : STRING[2]; (*TypValue - Format zaslané hodnoty  1- Èíslo, 2 - Znak*)
		Tolerancia_MIN_Hodnota : STRING[10]; (*MinTol - Minimálna tolerancia meranej velièiny*)
		Tolerancia_MAX_Hodnota : STRING[10]; (*MaxTol - Maximálna tolerancia meranej velièiny*)
		Nominal : STRING[10]; (*Nom - Ak jezvolený formát string tak tu zadáme OK inak je prazdna*)
		Tolerancia_MIN_Jednotky : STRING[10]; (*MinEle - Jednotky minimálnej tolerancie velièiny*)
		Tolerancia_MAX_Jednotky : STRING[10]; (*MaxEle - Jednotky maximálnej tolerancie velièiny*)
		NameranaHodnota : STRING[10]; (*Value - Namerana hodnota velièiny, ak su kamery tak bude hodnota OK alebo NG*)
		NameranaHodnota_Jednotky : STRING[10]; (*ValEle - Jednotky nameranej velièiny*)
		VyslednyResult : STRING[5]; (*Result - Výsledný result  PASS, FAIL, SKIP*)
	END_STRUCT;
END_TYPE

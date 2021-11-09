
TYPE
	UkladaciBuffer_typ : 	STRUCT 
		Pole : ARRAY[0..100]OF UINT;
		Index : USINT;
		ZapisHodnotu : BOOL;
		ResetBufferu : BOOL;
		Hodnota : UINT;
	END_STRUCT;
END_TYPE

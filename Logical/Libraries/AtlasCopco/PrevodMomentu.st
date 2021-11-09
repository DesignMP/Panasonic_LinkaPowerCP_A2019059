
(* TODO: Prevod momentu z menicov atlas copco *)
FUNCTION_BLOCK PrevodMomentu
    
//aktualny moment
		//rozbitie UDINT na pole USINTov
    InputShifted1:=AtlasAktualnyMoment;
	
    FOR Index1:=0 TO 3 DO
        ByteArray1[Index1]:=UDINT_TO_USINT(InputShifted1);
        InputShifted1:=ROR(InputShifted1,8);		
    END_FOR

    //spojenie USINT do REAL vo vhodnej forme ;-)
    AktualnyMoment:=ByteArray1[3]*0.01+ByteArray1[1];
    
    
    //tolerancia MIN
    //rozbitie UDINT na pole USINTov
    InputShifted2:=AtlasMinimalnaTolerancia;
	
    FOR Index2:=0 TO 3 DO
        ByteArray2[Index2]:=UDINT_TO_USINT(InputShifted2);
        InputShifted2:=ROR(InputShifted2,8);		
    END_FOR

    //spojenie USINT do REAL vo vhodnej forme ;-)
    ToleranciaMIN:=ByteArray2[3]*0.01+ByteArray2[1];
    
    
    //tolerancia MAX
    //rozbitie UDINT na pole USINTov
    InputShifted3:=AtlasMaximalnaTolerancia;
	
    FOR Index3:=0 TO 3 DO
        ByteArray3[Index3]:=UDINT_TO_USINT(InputShifted3);
        InputShifted3:=ROR(InputShifted3,8);		
    END_FOR

    //spojenie USINT do REAL vo vhodnej forme ;-)
    ToleranciaMAX:=ByteArray3[3]*0.01+ByteArray3[1];
END_FUNCTION_BLOCK

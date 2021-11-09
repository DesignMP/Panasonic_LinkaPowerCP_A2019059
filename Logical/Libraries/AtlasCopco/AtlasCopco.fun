
{REDUND_ERROR} FUNCTION_BLOCK PrevodMomentu (*TODO: Prevod momentu s menicov atlas copco*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		AtlasMaximalnaTolerancia : UDINT;
		AtlasMinimalnaTolerancia : UDINT;
		AtlasAktualnyMoment : UDINT;
	END_VAR
	VAR_OUTPUT
		ToleranciaMAX : REAL;
		ToleranciaMIN : REAL;
		AktualnyMoment : REAL;
	END_VAR
	VAR
		ByteArray2 : ARRAY[0..3] OF USINT;
		ByteArray3 : ARRAY[0..3] OF USINT;
		ByteArray1 : ARRAY[0..3] OF USINT;
		InputShifted2 : UDINT;
		InputShifted3 : UDINT;
		InputShifted1 : UDINT;
		Index2 : USINT;
		Index3 : USINT;
		Index1 : USINT;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} {REDUND_UNREPLICABLE} FUNCTION_BLOCK Round (*Zaokrúhlenie na jedno desatinné miesto*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		VstupnaHodnota : {REDUND_UNREPLICABLE} UINT;
	END_VAR
	VAR_OUTPUT
		VystupnaHodnota : {REDUND_UNREPLICABLE} REAL;
	END_VAR
	VAR
		VstupnaHodnotaREAL : {REDUND_UNREPLICABLE} REAL;
		VysledokDeleniaUINT : {REDUND_UNREPLICABLE} UINT;
		VysledokDeleniaREAL : {REDUND_UNREPLICABLE} REAL;
	END_VAR
END_FUNCTION_BLOCK

/* Automation Studio generated header file */
/* Do not edit ! */
/* AtlasCopco  */

#ifndef _ATLASCOPCO_
#define _ATLASCOPCO_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Datatypes and datatypes of function blocks */
typedef struct PrevodMomentu
{
	/* VAR_INPUT (analog) */
	unsigned long AtlasMaximalnaTolerancia;
	unsigned long AtlasMinimalnaTolerancia;
	unsigned long AtlasAktualnyMoment;
	/* VAR_OUTPUT (analog) */
	float ToleranciaMAX;
	float ToleranciaMIN;
	float AktualnyMoment;
	/* VAR (analog) */
	unsigned char ByteArray2[4];
	unsigned char ByteArray3[4];
	unsigned char ByteArray1[4];
	unsigned long InputShifted2;
	unsigned long InputShifted3;
	unsigned long InputShifted1;
	unsigned char Index2;
	unsigned char Index3;
	unsigned char Index1;
} PrevodMomentu_typ;

typedef struct Round
{
	/* VAR_INPUT (analog) */
	unsigned short VstupnaHodnota;
	/* VAR_OUTPUT (analog) */
	float VystupnaHodnota;
	/* VAR (analog) */
	float VstupnaHodnotaREAL;
	unsigned short VysledokDeleniaUINT;
	float VysledokDeleniaREAL;
} Round_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void PrevodMomentu(struct PrevodMomentu* inst);
_BUR_PUBLIC void Round(struct Round* inst);


#ifdef __cplusplus
};
#endif
#endif /* _ATLASCOPCO_ */


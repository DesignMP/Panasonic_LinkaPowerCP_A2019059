/*************************************************************
*
*         projekt: SKTcp - Panasonic
*       
*         autor: Ing. Milan Jun
*         company: B+R Automatizace spol. s r.o.
*         date: 21.09.2020
*
*/

#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "SKTcp.h"
#ifdef __cplusplus
	};
#endif

/* SKTcpClientSC */
unsigned char SKTcpClientSC(struct SKTcpClientSC_Type* sc)
{

	if ( sc->bNext == 1 ) {

		sc->bNext = 0;
		sc->bRepeat = 0;
		sc->edge = 0;
		sc->step++;

	}

 if ( sc->bLast == 1 ) {

  sc->bLast = 0;
  sc->bRepeat = 0;
  sc->edge = 0;
  sc->step = 0;

 }
 
 if ( sc->bJump == 1 ) {

  sc->bJump = 0;
  sc->bRepeat = 0;
  sc->edge = 0;

 }
 
	TON(&sc->idle_time);
	TON(&sc->alarm_time);

	return 0;

}

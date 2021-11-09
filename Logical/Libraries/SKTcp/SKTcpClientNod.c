/*************************************************************
*
*         projekt: SKTcp - Panasonic
*       
*         autor: Ing. Milan Jun
*         company: B+R Automatizace spol. s r.o.
*         date: 10.09.2020
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

/* SKTcpClientNod */
unsigned short SKTcpClientNod(unsigned long n)
{

 unsigned int count = 0;

 while (n != 0) { n /= 10; ++count; }

 return count;

}

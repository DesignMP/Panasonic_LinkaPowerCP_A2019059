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

/* SKTcpClientXor */
unsigned char SKTcpClientXor(unsigned char in[4999], unsigned short len)
{

 unsigned char xor_byte = 0; 
 unsigned int tI = 0;

 for (tI = 0; tI < len; tI++) xor_byte = xor_byte ^ in[tI];

 return xor_byte;
	
}

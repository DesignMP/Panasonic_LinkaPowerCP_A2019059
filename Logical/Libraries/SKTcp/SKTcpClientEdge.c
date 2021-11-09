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

/* SKTcpClientEdge */
void SKTcpClientEdge(struct SKTcpClientEdge* inst)
{
	
 inst->Q = ( ! inst->CLK == inst->Last_State) ;
 
 inst->Last_State = inst->CLK;
 
}

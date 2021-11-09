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

/* SKTcpClientNewCsvEntry */
unsigned char SKTcpClientNewCsvEntry(plcstring* IDstep, plcstring* Description, plcstring* TypeValue, plcstring* MinTol, plcstring* MaxTol, plcstring* Nom, plcstring* MinEle, plcstring* MaxEle, plcstring* Value, plcstring* ValEle, plcstring* Result, unsigned long pData)
{

	/* SKTcpClientNewCsvEntry('IDstep','Description','TypeValue','MinTol','MaxTol','Nom','MinEle','MaxEle','Value','ValEle','Result', ADR(CSV)); */

	brsstrcat((void*)pData, IDstep);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, Description);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, TypeValue);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, MinTol);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, MaxTol);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, Nom);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, MinEle);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, MaxEle);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, Value);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, ValEle);
	brsstrcat((void*)pData, (UDINT)&";");
	brsstrcat((void*)pData, Result);
	brsstrcat((void*)pData, (UDINT)&("\r"));

	return 0;
}

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

/* SKTcpClientNewLoggerEntry */
unsigned char SKTcpClientNewLoggerEntry(plcstring* msg, UDINT pData, UINT entrys)
{

	RTCtime_typ	RTCtime_struct;
	STRING lstr1[5000], lstr2[5000];

	if ((entrys > 0) && (pData != 0))
	{
		brsstrcpy(lstr1, "");
		brsstrcpy(lstr2, "");
		RTC_gettime(&RTCtime_struct);
		brsitoa(RTCtime_struct.hour, (UDINT)&lstr1);
		if(brsstrlen(lstr1) == 1) brsstrcat(lstr2, "0");
		brsstrcat(lstr2, lstr1);
		brsstrcat(lstr2, ":");
		brsitoa(RTCtime_struct.minute, (UDINT)&lstr1);
		if(brsstrlen(lstr1) == 1) brsstrcat(lstr2, "0");
		brsstrcat(lstr2, lstr1);
		brsstrcat(lstr2, ":");
		brsitoa(RTCtime_struct.second, (UDINT)&lstr1);
		if(brsstrlen(lstr1) == 1) brsstrcat(lstr2, "0");
		brsstrcat(lstr2, lstr1);
		brsstrcat(lstr2, ":");
		brsitoa(RTCtime_struct.millisec, (UDINT)&lstr1);
		if(brsstrlen(lstr1) == 1) brsstrcat(lstr2, "00");
		if(brsstrlen(lstr1) == 2) brsstrcat(lstr2, "0");
		brsstrcat(lstr2, lstr1);
		brsstrcat(lstr2, " ");
		brsstrcat(lstr2, msg);
		brsmemmove((void*)(pData)+5001, (void*)pData, 5001*(entrys-1));
		brsstrcpy((void*)pData, lstr2);
	}

	return 0;

}
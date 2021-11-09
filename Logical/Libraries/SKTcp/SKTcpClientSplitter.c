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

/* SKTcpClientSplitter */
void SKTcpClientSplitter(struct SKTcpClientSplitter* inst)
{

 if ( inst->enable == 0 ) 
 {

  inst->done = 0;

  brsmemset((UDINT)&(inst->out), 0, sizeof(inst->out));
  brsmemset((UDINT)&(inst->OUT_Master), 0, sizeof(inst->OUT_Master));
  brsmemset((UDINT)&(inst->OUT_Typ), 0, sizeof(inst->OUT_Typ));
  brsmemset((UDINT)&(inst->OUT_Result), 0, sizeof(inst->OUT_Result));		
  brsmemset((UDINT)&(inst->tmpInputString), 0, sizeof(inst->tmpInputString));
  brsmemset((UDINT)&(inst->tmpString), 0, sizeof(inst->tmpString));
  brsmemset((UDINT)&(inst->idx), 0, sizeof(inst->idx));
  
 }
 else if ( inst->enable == 1 ) 
 {

  if ( inst->enable == 1 && inst->enableOld==0 ) 
  {
   inst->enableOld = 1;
   
   brsmemcpy ((UDINT)&(inst->tmpInputString),(UDINT)&(inst->iInputString), brsstrlen((UDINT)&(inst->iInputString)));

   inst->idx[1] = 0;

   if ( strlen((UDINT)&(inst->iInputString)) != 0 ) 
   {

    for (inst->idx[0] = 0; inst->idx[0] < brsstrlen(inst->iInputString) ; inst->idx[0]++)
    {

     if ( inst->iSelector != inst->tmpInputString[inst->idx[0]] ) 
     { 
      brsmemcpy((UDINT)&(inst->tmpString),(UDINT)&(inst->tmpInputString[inst->idx[0]]),1);
      brsstrcat((UDINT)&(inst->out[inst->idx[1]]),(UDINT)&(inst->tmpString));
						
     }
     else
     {
      inst->idx[1]++;
     }

    }
	brsmemcpy((UDINT)&(inst->OUT_Master),(UDINT)&(inst->out[4]),30);
		brsmemcpy((UDINT)&(inst->OUT_Typ),(UDINT)&(inst->out[1]),1);
		brsmemcpy((UDINT)&(inst->OUT_Result),(UDINT)&(inst->out[12]),2);		
   }

  }
  
 }

 inst->enableOld = inst->enable;
 
}

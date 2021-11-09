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

/* SKTcpClientFTP */
void SKTcpClientFTP(struct SKTcpClientFTP* inst)
{

if ( inst->enable == 1 ) {

	inst->active = 1;

	SKTcpClientSC(&inst->internal.sc);

	switch (inst->internal.sc.step)
	{

		case 0:

			if ( inst->send == 1 ) {
					inst->internal.sc.bNext = 1;
			}

			break;
			
		case 1:
			
			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DevLink - source"));
			
			if ( inst->internal.sc.edge == 0 ){
				inst->internal.fb.Devlink_0.enable = 1;
				inst->internal.fb.Devlink_0.pDevice = inst->param.src.pDevice;
				inst->internal.fb.Devlink_0.pParam = inst->param.src.pParam;
				inst->internal.sc.edge = 1;
			} 
			
			DevLink(&inst->internal.fb.Devlink_0);
			
			if (inst->internal.fb.Devlink_0.status == ERR_OK) 
			{
				inst->internal.src_handle = inst->internal.fb.Devlink_0.handle;
				inst->internal.sc.bNext = 1;
			}
			else if ( inst->internal.fb.Devlink_0.status == ERR_FUB_BUSY )
			{

			}
   else if ( inst->internal.fb.Devlink_0.status == fiERR_DEVICE_ALREADY_EXIST ) {
    inst->internal.sc.bJump = 1;
    inst->internal.sc.step = 6;
    }
			break;

		case 2:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DevLink - destination"));

			inst->internal.fb.Devlink_0.enable = 1;
			inst->internal.fb.Devlink_0.pDevice = inst->param.dest.pDevice;
			inst->internal.fb.Devlink_0.pParam = inst->param.dest.pParam;
			
			DevLink(&inst->internal.fb.Devlink_0);
			
			if (inst->internal.fb.Devlink_0.status == ERR_OK) 
			{
				inst->internal.dest_handle = inst->internal.fb.Devlink_0.handle;
				inst->internal.sc.bNext = 1;
			}
			else if ( inst->internal.fb.Devlink_0.status == ERR_FUB_BUSY )
			{

			}
    else if ( inst->internal.fb.Devlink_0.status == fiERR_DEVICE_ALREADY_EXIST ) {
     inst->internal.sc.bJump = 1;
     inst->internal.sc.step = 6;
    }
			break;

		case 3:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DirInfo"));

			inst->internal.fb.DirInfo_0.enable = 1;
			inst->internal.fb.DirInfo_0.pDevice = inst->param.src.pDevice;
			inst->internal.fb.DirInfo_0.pPath = inst->param.src.pPath;

			DirInfo(&inst->internal.fb.DirInfo_0);

			if (inst->internal.fb.DirInfo_0.filenum == 1 && inst->internal.fb.DirInfo_0.status == ERR_OK ) 
			{
				inst->internal.sc.bNext = 1;
			}
			else if ( inst->internal.fb.DirInfo_0.status == ERR_FUB_BUSY )
			{
		
			}
			break;

		case 4:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DirRead"));

			inst->internal.fb.DirRead_0.enable = 1;
			inst->internal.fb.DirRead_0.pDevice = inst->param.src.pDevice;
			inst->internal.fb.DirRead_0.pPath = inst->param.src.pPath;
			inst->internal.fb.DirRead_0.option = fiFILE;
			inst->internal.fb.DirRead_0.pData = (UDINT)&inst->status.src.pData;
			inst->internal.fb.DirRead_0.data_len = sizeof(fiDIR_READ_DATA);

			DirRead(&inst->internal.fb.DirRead_0);

			if (inst->internal.fb.DirRead_0.status == ERR_OK) 
			{
				inst->internal.sc.bNext = 1;
			}
			else if ( inst->internal.fb.DirRead_0.status == ERR_FUB_BUSY )
			{

			}
			break;

		case 5:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("FileCopy"));

			inst->internal.fb.FileCopy_0.enable = 1;
			inst->internal.fb.FileCopy_0.pSrcDev = inst->param.src.pDevice;
			inst->internal.fb.FileCopy_0.pSrc = inst->status.src.pData.Filename;
			inst->internal.fb.FileCopy_0.pDestDev = inst->param.dest.pDevice;
			inst->internal.fb.FileCopy_0.pDest = inst->param.dest.pNewName;
            inst->internal.fb.FileCopy_0.option = fiOVERWRITE;
     
			FileCopy(&inst->internal.fb.FileCopy_0);

			if (inst->internal.fb.FileCopy_0.status == ERR_OK ) 
			{
				inst->internal.sc.bNext = 1;
			}
			else if ( inst->internal.fb.FileCopy_0.status == ERR_FUB_BUSY )
			{

			}
			break;

		case 6:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("File Delete"));

			inst->internal.fb.FileDelete_0.enable = 1;
			inst->internal.fb.FileDelete_0.pDevice = inst->param.src.pDevice;
			inst->internal.fb.FileDelete_0.pName = (UDINT)&inst->status.src.pData.Filename;

			FileDelete(&inst->internal.fb.FileDelete_0);

			if (inst->internal.fb.FileDelete_0.status == ERR_OK) 
			{
				inst->internal.sc.bNext = 1;
			}
    else if ( inst->internal.fb.FileDelete_0.status == ERR_FUB_BUSY )
    {

    }
			break;

		case 7:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DevUnlink - source"));
			
			inst->internal.fb.DevUnlink_0.enable = 1;
			inst->internal.fb.DevUnlink_0.handle = inst->internal.src_handle;

			DevUnlink(&inst->internal.fb.DevUnlink_0);

			if (inst->internal.fb.DevUnlink_0.status == ERR_OK) 
			{
				inst->internal.fb.DevUnlink_0.enable = 0;
				inst->internal.src_handle = 0;
				inst->internal.sc.bNext = 1;
			}
    else if ( inst->internal.fb.DevUnlink_0.status == fiERR_DEVICE_INVALID_HANDLE )
    {
     inst->internal.fb.DevUnlink_0.enable = 0;
     inst->internal.src_handle = 0;
     inst->internal.sc.bNext = 1;
    }
    else if ( inst->internal.fb.DevUnlink_0.status == ERR_FUB_BUSY )
    {

    }
			break;

		case 8:

			brsstrcpy((UDINT)&inst->internal.sc.StepName,(UDINT)&("DevUnlink - destination"));
			
			inst->internal.fb.DevUnlink_0.enable = 1;
			inst->internal.fb.DevUnlink_0.handle = inst->internal.dest_handle;

			DevUnlink(&inst->internal.fb.DevUnlink_0);

			if (inst->internal.fb.DevUnlink_0.status == ERR_OK) 
			{
				inst->internal.fb.DevUnlink_0.enable = 0;
				inst->internal.dest_handle = 0;
    inst->send = 0;
				inst->internal.sc.bLast = 1;
			}
   else if ( inst->internal.fb.DevUnlink_0.status == fiERR_DEVICE_INVALID_HANDLE )
   {
    inst->internal.fb.DevUnlink_0.enable = 0;
    inst->internal.src_handle = 0;
    inst->send = 0;
    inst->internal.sc.bLast = 1;
   }
   else if ( inst->internal.fb.DevUnlink_0.status == ERR_FUB_BUSY )
   {

   }
			break;

		default:

			break;
	}

}
else {

	inst->active = 0;
	inst->internal.sc.step = 0;

	inst->internal.fb.DirRead_0.enable = 0;
	DirRead(&inst->internal.fb.DirRead_0);

	inst->internal.fb.DirInfo_0.enable = 0;
	DirInfo(&inst->internal.fb.DirInfo_0);

	inst->internal.fb.FileDelete_0.enable = 0;
	FileDelete(&inst->internal.fb.FileDelete_0);

	inst->internal.fb.FileCopy_0.enable = 0;
	FileCopy(&inst->internal.fb.FileCopy_0);
	
	inst->internal.fb.Devlink_0.enable = 0;
	DevLink(&inst->internal.fb.Devlink_0);

}

}

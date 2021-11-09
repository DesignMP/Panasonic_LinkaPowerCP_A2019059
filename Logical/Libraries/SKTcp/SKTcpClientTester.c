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

/* SKTcpClientTester */
void SKTcpClientTester(struct SKTcpClientTester* inst)
{

 if( inst->Enable == 1 ) {

  if(( inst->Cmd.Send == 1 ) && ( inst->Internal.SendOld == 0 )) {
   inst->Internal.cmdSend = 1 ;
  } 
  inst->Internal.SendOld = inst->Cmd.Send ;

  if(( inst->Cmd.Close == 1 ) && ( inst->Internal.CloseOld == 0 )) {
   inst->Internal.cmdClose = 1 ;
  } else {
   if( inst->Cmd.Close == 0 ) {
    inst->Internal.cmdClose = 0 ;
   }
  }
  inst->Internal.CloseOld = inst->Cmd.Close ;
	
  inst->Status.staSending = 0 ;
  inst->Status.staReceiving = 0 ;		
  inst->Status.staReadyToSend = 0 ;
  inst->Status.staReadyToClose = 0 ;
		
  switch( inst->Internal.Step ) {	 	

   case 0:
    inst->Status.staReadyToSend = 1 ;

    if( inst->Internal.cmdSend == 1 ) {			
     inst->FBStatus = 0xFFFF ;
     inst->Status.staSent = 0 ;
     inst->Status.staReceived = 0 ;
					
     inst->Status.staError = 0 ;
     inst->Status.staErrorSent = 0 ;
     inst->Status.staErrorOpen = 0 ;
     inst->Status.staErrorRecv = 0 ;
     inst->Status.staErrorRecvTout = 0 ;
     inst->Status.staErrorOpen = 0 ;
     inst->Status.staErrorIoctl = 0 ;
     inst->Status.staErrorClient = 0 ;
     inst->Status.staErrorConn = 0 ;
     inst->Status.staErrorConnTout = 0 ;
					
     inst->Status.RecvSize = 0 ;
     memset((void*)&inst->Status.DataRecv[0], 0, sizeof(inst->Status.DataRecv)) ;
					
     inst->Internal.TimerConn.IN = 1 ;
     inst->Internal.TimerConn.PT = inst->Params.ConnTimeout ;
				
     inst->Internal.TCP_Open.enable = 1;	
     inst->Internal.TCP_Open.pIfAddr = 0;  						
     inst->Internal.TCP_Open.port = inst->Params.IPportClient;  	
     inst->Internal.TCP_Open.options = 0;	
     TcpOpen(&inst->Internal.TCP_Open);  						
								
     if( inst->Internal.TCP_Open.status == 0 ) {  			
      //inst->Internal.cmdSend = 0 ;	
      inst->Internal.Ident = inst->Internal.TCP_Open.ident ;
      inst->Internal.Step = 5;											
     }
     else if( inst->Internal.TimerConn.Q == 1 ) {
//      inst->Internal.cmdSend = 0 ;
      inst->Status.staErrorOpen = 1 ;
      inst->Status.staErrorConn = 1 ;
      inst->Status.staErrorConnTout = 1 ;
      inst->Internal.Step = 99;				
     } else if( inst->Internal.TCP_Open.status == ERR_FUB_BUSY ) {

     } else {
      if( inst->Internal.TCP_Open.status == tcpERR_ALREADY_EXIST ) {
       inst->Status.staErrorOpen = 1 ;
       inst->Internal.Step = 90;
      } else {
       inst->Status.staErrorOpen = 1 ;
       inst->Internal.Step = 99;
      }
      //inst->Internal.cmdSend = 0 ;
     }
    }

//    else if( inst->Cmd.Close == 1 ) {
//     inst->Cmd.Close = 0 ;
//     inst->Internal.Step = 40 ;
//    }
    break ;
			
   case 5: 		 
    inst->Internal.linger_opt.lLinger = 0;
    inst->Internal.linger_opt.lOnOff = 1;
					 
    inst->Internal.TCP_Ioctl.enable = 1;
    inst->Internal.TCP_Ioctl.ident = inst->Internal.Ident;
    inst->Internal.TCP_Ioctl.ioctl = tcpSO_LINGER_SET;
    inst->Internal.TCP_Ioctl.pData = (UDINT)&(inst->Internal.linger_opt);
    inst->Internal.TCP_Ioctl.datalen = sizeof(inst->Internal.linger_opt);
    TcpIoctl(&inst->Internal.TCP_Ioctl);	    
			
    if( inst->Internal.TCP_Ioctl.status == 0 ) {
     inst->Internal.Step = 10;											
    } else if( inst->Internal.TimerConn.Q == 1 ) {
     inst->Status.staErrorOpen = 1 ;
     inst->Status.staErrorConn = 1 ;
     inst->Status.staErrorConnTout = 1 ;
     inst->Internal.Step = 99;				
    } else if( inst->Internal.TCP_Ioctl.status == ERR_FUB_BUSY ) {
    } else {
     inst->Status.staErrorIoctl = 1 ;
     inst->Internal.Step = 90;
    }
    break ;			

   case 10:
    inst->Internal.TCP_Client.enable = 1;
    inst->Internal.TCP_Client.ident = inst->Internal.Ident ;
    inst->Internal.TCP_Client.portserv = inst->Params.IPportServ ;
    inst->Internal.TCP_Client.pServer = (UDINT)&inst->Params.IPaddrServ[0];
    TcpClient(&inst->Internal.TCP_Client) ;  
				
    if( inst->Internal.TCP_Client.status == 0 ) {
     inst->Internal.Step = 15;		
    } else if( inst->Internal.TimerConn.Q == 1 ) {
     inst->Status.staErrorOpen = 1 ;
     inst->Status.staErrorConn = 1 ;
     inst->Status.staErrorConnTout = 1 ;
     inst->Internal.Step = 90;				
    } else if( inst->Internal.TCP_Client.status == ERR_FUB_BUSY ) {
    } else if( inst->Internal.TCP_Client.status == tcpERR_INVALID ) {
     inst->Status.staErrorClient = 1 ;
     inst->Status.staErrorConn = 1 ;
     inst->Internal.Step = 90;
    } else {
     inst->Status.staErrorClient = 1 ;
     inst->Internal.Step = 90;
    }
    break ;
			
   case 15:
    inst->Status.staReadyToSend = 1 ;
    inst->Status.staReadyToClose = 1 ;
    inst->Status.staSending = 0 ;

    if( inst->Cmd.Send == 1 ) {	
     inst->Status.RecvSize = 0 ;
     inst->Internal.TimerRecv.IN = 0 ;
     //inst->Internal.cmdSend = 0 ;
     memset((void*)&inst->Status.DataRecv[0], 0, sizeof(inst->Status.DataRecv)) ;
     inst->Internal.Step = 19;	
    } else if( inst->Internal.cmdClose == 1 ) {
     inst->Internal.cmdClose = 0 ;
     inst->Internal.Step = 40;					
    }				
    break ;

   case 19:
    
    inst->Params.Packet.internal.start = 2;
    inst->Params.Packet.internal.xor = 0;
    inst->Params.Packet.internal.stop = 3;

    if ( inst->Params.Packet.type == 0 || inst->Params.Packet.type == 2 || inst->Params.Packet.type == 3 )
     inst->Params.Packet.internal.length = 3;
    else if ( inst->Params.Packet.type == 1 )
     inst->Params.Packet.internal.length = 34;

    inst->Params.Packet.internal.data_length = inst->Params.Packet.internal.length + SKTcpClientNod(inst->Params.Packet.internal.length);
    
    memset((UDINT)&(inst->DataSend.send_data_a), 0, sizeof(inst->DataSend.send_data_a));
    
    inst->DataSend.send_data_a[0] = inst->Params.Packet.internal.data_length; 
    inst->DataSend.send_data_a[1] = inst->Params.Packet.type;
    inst->DataSend.send_data_a[2] = inst->Params.Packet.workplace;
    inst->DataSend.send_data_a[3] = inst->Params.Packet.id;

    if (  inst->Params.Packet.type == 1  ) {

     for (inst->Params.Packet.internal.ti = 0; inst->Params.Packet.internal.ti < 32; inst->Params.Packet.internal.ti++)
     {
      inst->DataSend.send_data_a[inst->Params.Packet.internal.ti+4] = inst->Params.Packet.data[inst->Params.Packet.internal.ti];
     }
    }
    
    // Vypocet XOR
    for (inst->Params.Packet.internal.ti = 0; inst->Params.Packet.internal.ti < inst->Params.Packet.internal.data_length; inst->Params.Packet.internal.ti++)
    {
     inst->Params.Packet.internal.xor = inst->Params.Packet.internal.xor ^ inst->DataSend.send_data_a[inst->Params.Packet.internal.ti];
    }

    memset((UDINT)&(inst->DataSend.DataSend), 0, sizeof(inst->DataSend.DataSend));
    inst->DataSend.DataSend[0] = inst->Params.Packet.internal.start;
    inst->DataSend.DataSend[1] = inst->Params.Packet.internal.data_length;
    inst->DataSend.DataSend[2] = inst->Params.Packet.type;
    inst->DataSend.DataSend[3] = inst->Params.Packet.workplace;
    inst->DataSend.DataSend[4] = inst->Params.Packet.id;
    if (inst->Params.Packet.type == 0 || inst->Params.Packet.type == 2 || inst->Params.Packet.type == 3) 
    {
     inst->DataSend.DataSend[5] = inst->Params.Packet.internal.xor;
     inst->DataSend.DataSend[6] = inst->Params.Packet.internal.stop;
    }
    
    else if (  inst->Params.Packet.type == 1  ) {
    
     for (inst->Params.Packet.internal.ti = 0; inst->Params.Packet.internal.ti < 32; inst->Params.Packet.internal.ti++)
     {
      inst->DataSend.DataSend[inst->Params.Packet.internal.ti+5] = inst->Params.Packet.data[inst->Params.Packet.internal.ti];
      
     }
     inst->DataSend.DataSend[37] = inst->Params.Packet.internal.xor;
     inst->DataSend.DataSend[38] = inst->Params.Packet.internal.stop;
    }
    
	brsmemcpy((UDINT)&(inst->logger.LastDataSend),(UDINT)&inst->DataSend.DataSend, 200);
	//SKTcpClientNewLoggerEntry(inst->logger.LastDataSend, (UDINT)&(inst->logger.SLOGGER), MAX_TRACE_LOGGER_ENTIRES);
				
    inst->Internal.Step = 20;
    
    break;
   
   case 20:

    inst->Status.staSending = 1 ;
    inst->Status.staSent = 0 ;

    inst->Internal.TCP_Send.enable = 1;
    inst->Internal.TCP_Send.ident = inst->Internal.Ident;
    inst->Internal.TCP_Send.pData = (UDINT)&inst->DataSend.DataSend;

    if ( inst->Params.Packet.type == 0 || inst->Params.Packet.type == 2 || inst->Params.Packet.type == 3  ) 
    { 
     inst->Internal.TCP_Send.datalen = inst->Params.Packet.internal.data_length + 3;
    }
    if ( inst->Params.Packet.type == 1  ) 
    {
     inst->Internal.TCP_Send.datalen = inst->Params.Packet.internal.data_length + 3;
    }
				
    inst->Internal.TCP_Send.flags = 0;
    TcpSend(&inst->Internal.TCP_Send); 
					
    if( inst->Internal.TCP_Send.status == 0 ) {
     inst->Status.staSent = 1 ;
     if( inst->Params.disRecv == 0 ) {
      inst->Internal.TimerRecv.IN = 0 ;
      inst->Internal.Step = 30;
     } 
//     else {
//      if( inst->Params.enaClose == 1 ) {
//       inst->Internal.Step = 40;
//      } else {
//       inst->Internal.Step = 15;
//       inst->Internal.cmdClose = 0 ;
//      }
//     }
    } else if( inst->Internal.TCP_Send.status == ERR_FUB_BUSY )	{
    } else if (( inst->Internal.TCP_Send.status == tcpERR_SENTLEN ) 
    || ( inst->Internal.TCP_Send.status == tcpERR_NOT_CONNECTED )) {
     inst->Internal.Step = 90;
    } else {
     inst->Status.staErrorSent = 1 ;
     inst->Internal.Step = 90;
    }	
    break ;			

   case 30:
    inst->Status.staReceiving = 1 ;
    inst->Status.staReceived = 0 ;
				
    inst->Internal.TimerRecv.IN = 1 ;
    inst->Internal.TimerRecv.PT = inst->Params.RecvTimeout ;					

    inst->Internal.TCP_Recv.enable = 1;
    inst->Internal.TCP_Recv.ident = inst->Internal.Ident;
    inst->Internal.TCP_Recv.pData	= (UDINT)&inst->Status.DataRecv[0];
    inst->Internal.TCP_Recv.datamax = sizeof(inst->Status.DataRecv);
    inst->Internal.TCP_Recv.flags = 0;
    TcpRecv(&inst->Internal.TCP_Recv);  								
			
    if( inst->Internal.TCP_Recv.status == 0 ) {
     inst->Status.staReceived = 1 ;
     inst->Status.RecvSize = inst->Internal.TCP_Recv.recvlen;
     inst->Status.RecvCounter++ ;
				
	 brsmemcpy((UDINT)&(inst->logger.LastDataRecv),(UDINT)&inst->Status.DataRecv, 200);
	 //SKTcpClientNewLoggerEntry(inst->logger.LastDataRecv, (UDINT)&(inst->logger.RLOGGER), MAX_TRACE_LOGGER_ENTIRES);
				
     if( inst->Params.enaClose == 1 ) {
      inst->Internal.Step = 40;
     } else {
      inst->Internal.Step = 15 ;
     }					
    } else if( inst->Internal.TCP_Recv.status == tcpERR_NO_DATA ) {
     if( inst->Internal.TimerRecv.Q == 1 ) {
      inst->Status.staErrorRecvTout = 1 ;
      inst->Internal.Step = 90;
     }
    } else if( inst->Internal.TCP_Recv.status == ERR_FUB_BUSY ) {
     if( inst->Internal.TimerRecv.Q == 1 ) {
						
     }
    } else if( inst->Internal.TCP_Recv.status == tcpERR_NOT_CONNECTED ) {
     inst->Status.staErrorRecv = 1 ;
     inst->Internal.Step = 90;
    } else if( inst->Internal.TimerRecv.Q == 1 ) {
     inst->Status.staErrorRecv = 1 ;
     inst->Internal.TimerRecv.IN = 0 ;
     inst->Internal.Step = 90;
    }
    break ;
			
   case 40:
    inst->Internal.TCP_Close.enable = 1;
    inst->Internal.TCP_Close.ident = inst->Internal.Ident ;
    inst->Internal.TCP_Close.how = 0;
    TcpClose(&inst->Internal.TCP_Close);
		
    if( inst->Internal.TCP_Close.status == 0 ) {
     inst->Internal.Ident = 0 ;
     inst->Internal.Step = 100;
     inst->Status.staReceived = 1 ;
    } else if( inst->Internal.TCP_Close.status == ERR_FUB_BUSY ) {
    } else {
     inst->Status.staErrorClose = 1 ;
     inst->Internal.Step = 99;
    }
    break ;
				
   case 90:
    inst->Internal.TCP_Close.enable = 1;
    inst->Internal.TCP_Close.ident = inst->Internal.Ident;
    inst->Internal.TCP_Close.how = 0;
    TcpClose(&inst->Internal.TCP_Close);
		
    if( inst->Internal.TCP_Close.status == 0 ) {
     inst->Internal.Ident = 0 ;
     inst->Internal.Step = 99;
    } else if( inst->Internal.TCP_Close.status == ERR_FUB_BUSY ) {
    } else {
     inst->Status.staErrorClose = 1 ;
     inst->Internal.Step = 99;
    }
    break ;
			
   case 99:
    inst->FBStatus = 1 ;
    inst->Status.staError = 1 ; ;
    inst->Internal.Step = 0;
    inst->Internal.TimerConn.IN = 0 ;
    inst->Internal.cmdSend = 0 ;	
    break ;

   case 100:
    inst->FBStatus = 0 ;
    inst->Internal.Step = 0;
    inst->Internal.cmdSend = 0 ;
    inst->Internal.TimerConn.IN = 0 ;
    break ;
				
  }	
 } else {
  if( inst->Cmd.Send == 0 ) {
   inst->FBStatus = 0xFFFE ;
  }
		
  if( inst->Internal.Ident != 0 ) {
   inst->Internal.TCP_Close.enable = 1;
   inst->Internal.TCP_Close.ident = inst->Internal.Ident;
   inst->Internal.TCP_Close.how = 0;
   TcpClose(&inst->Internal.TCP_Close);
	
   if( inst->Internal.TCP_Close.status == 0 ) {
    inst->Internal.Ident = 0 ;
   } else if( inst->Internal.TCP_Close.status == ERR_FUB_BUSY ) {
   } else {
   }
  }		
  inst->Internal.TimerRecv.IN = 0 ;
  inst->Internal.TimerConn.IN = 0 ;
  inst->Internal.Step = 0 ;
 }		
	
 inst->Internal.EnableOld = inst->Enable ;
 TON(&inst->Internal.TimerRecv) ;
 TON(&inst->Internal.TimerConn) ;

}

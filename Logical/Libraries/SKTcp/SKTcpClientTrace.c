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

/* SKTcpClientTrace */
void SKTcpClientTrace(struct SKTcpClientTrace* inst)
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
     brsmemset((void*)&inst->Status.DataRecv[0], 0, sizeof(inst->Status.DataRecv)) ;
					
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
      inst->Internal.cmdSend = 0 ;
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
      inst->Internal.cmdSend = 0 ;
     }
    }

    else if( inst->Cmd.Close == 1 ) {
     inst->Cmd.Close = 0 ;
     inst->Internal.Step = 40 ;
    }
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
    //inst->Status.staReadyToClose = 1 ;
    inst->Status.staSending = 0 ;

    if ( inst->Internal.cmdSend == 1 ) {			
     inst->Status.RecvSize = 0 ;
     inst->Internal.TimerRecv.IN = 0 ;
     inst->Internal.cmdSend = 0 ;
     brsmemset((void*)&inst->Status.DataRecv, 0, sizeof(inst->Status.DataRecv)) ;
                
     brsmemset((void*)&inst->Internal.Splitter.out, 0, sizeof(inst->Internal.Splitter.out));
     inst->Internal.Step = 18;
    } 
    //else if( inst->Internal.cmdClose == 1 ) {
    // inst->Internal.cmdClose = 0 ;
    // inst->Internal.Step = 40;					
    //}				
    break ;

			case 18:
					
   	inst->Internal.oneskorenie.IN = 1;
				inst->Internal.oneskorenie.PT = 1000; //ms
			
				if ( inst->Internal.oneskorenie.Q == 1 ) {
					inst->Internal.oneskorenie.IN = 0;
					inst->Internal.Step = 19;
				}	
        
				TON(&inst->Internal.oneskorenie);
				
    break ;
			
   case 19:
    
    inst->Params.Packet.internal.start = 0x02;
    inst->Params.Packet.internal.length_int = 0;
    //inst->Params.Packet.internal.xor = 0;
    inst->Params.Packet.internal.stop = 0x03;
    
    brsmemset((UDINT)&(inst->Params.Packet.internal.length_str), 0, sizeof(inst->Params.Packet.internal.length_str));
    brsmemset((UDINT)&(inst->Params.Packet.internal.xor_str), 0, sizeof(inst->Params.Packet.internal.xor_str));

    brsmemset((UDINT)&(inst->DataSend.send_data_a), 0, sizeof(inst->DataSend.send_data_a));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.type));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.workplace));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.rfid));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.master));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.dps1));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.dps2));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.dps3));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.dps4));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.dps5));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.operator_id));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.data_report));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_a), (UDINT)&(inst->Params.Packet.result));

    inst->Params.Packet.internal.length_int = brsstrlen((UDINT)&inst->DataSend.send_data_a);
    inst->Params.Packet.internal.length_int = inst->Params.Packet.internal.length_int + SKTcpClientNod(inst->Params.Packet.internal.length_int);
    
    brsitoa(inst->Params.Packet.internal.length_int,(UDINT)&(inst->Params.Packet.internal.length_str)); 

    brsmemset((UDINT)&(inst->DataSend.send_data_b), 0, sizeof(inst->DataSend.send_data_b));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.internal.length_str));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.type));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.workplace));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.rfid));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.master));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.dps1));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.dps2));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.dps3));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.dps4));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.dps5));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.operator_id));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.data_report));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&(inst->Params.Packet.result));
    brsstrcat((UDINT)&(inst->DataSend.send_data_b), (UDINT)&("|"));

    inst->Params.Packet.internal.xor_str = SKTcpClientXor(inst->DataSend.send_data_b,inst->Params.Packet.internal.length_int+3);

    brsmemset((UDINT)&(inst->DataSend.DataSend), 0, sizeof(inst->DataSend.DataSend));
    inst->DataSend.DataSend[0] = inst->Params.Packet.internal.start;
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.internal.length_str));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.type));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.workplace));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.rfid));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.master));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.dps1));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.dps2));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.dps3));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.dps4));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.dps5));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.operator_id));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.data_report));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.result));
    brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&("|"));
    
	inst->Params.Packet.internal.ret_len = strlen((UDINT)&inst->DataSend.DataSend);
    
	if ( inst->Params.Packet.internal.xor_str != 0 )
     brsstrcat((UDINT)&(inst->DataSend.DataSend), (UDINT)&(inst->Params.Packet.internal.xor_str));
    else{
	 inst->DataSend.DataSend[inst->Params.Packet.internal.ret_len] = 0x00;
	 inst->DataSend.DataSend[inst->Params.Packet.internal.ret_len+1] = 0x03;
    }
    
    brsmemcpy((UDINT)&(inst->logger.LastDataSend),(UDINT)&inst->DataSend.DataSend, 5000);
    //SKTcpClientNewLoggerEntry(inst->logger.LastDataSend, (UDINT)&(inst->logger.SLOGGER), MAX_TRACE_LOGGER_ENTIRES);
				
    inst->Internal.Step = 20;
    
   case 20:
    
    inst->Status.staSending = 1 ;
    inst->Status.staSent = 0 ;

    inst->Internal.Splitter.enable = 0;
                
    inst->Internal.TCP_Send.enable = 1;				
    inst->Internal.TCP_Send.ident = inst->Internal.Ident;
    inst->Internal.TCP_Send.pData = (UDINT)&inst->DataSend.DataSend;
    inst->Internal.TCP_Send.datalen = sizeof(inst->DataSend.DataSend);
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
//      } 
//      else {
//       inst->Internal.Step = 15;
//       inst->Internal.cmdClose = 0 ;
//      }
//     }
    } else if( inst->Internal.TCP_Send.status == ERR_FUB_BUSY )	{
    } else if (( inst->Internal.TCP_Send.status == tcpERR_SENTLEN ) || ( inst->Internal.TCP_Send.status == tcpERR_NOT_CONNECTED )) {
     inst->Internal.Step = 90;
    } else {
     inst->Status.staErrorSent = 1 ;
     inst->Internal.Step = 90;
    }	
    break;			

   case 30:
				
    inst->Status.staReceiving = 1 ;
    inst->Status.staReceived = 0 ;
				
    inst->Internal.TimerRecv.IN = 1 ;
    inst->Internal.TimerRecv.PT = inst->Params.RecvTimeout ;					

    inst->Internal.TCP_Recv.enable = 1;
    inst->Internal.TCP_Recv.ident = inst->Internal.Ident;
    inst->Internal.TCP_Recv.pData	= (UDINT)&inst->Status.DataRecv;
    inst->Internal.TCP_Recv.datamax = sizeof(inst->Status.DataRecv);
    inst->Internal.TCP_Recv.flags = 0;
    TcpRecv(&inst->Internal.TCP_Recv);  								
			
    if( inst->Internal.TCP_Recv.status == 0 ) {
     inst->Status.staReceived = 1 ;
     inst->Status.RecvSize = inst->Internal.TCP_Recv.recvlen;
     inst->Status.RecvCounter++ ;

 	 brsmemcpy((UDINT)&(inst->logger.LastDataRecv),(UDINT)&inst->Status.DataRecv, 5000);
     //SKTcpClientNewLoggerEntry(inst->logger.LastDataRecv, (UDINT)&(inst->logger.RLOGGER), MAX_TRACE_LOGGER_ENTIRES);
		
     brsmemcpy((UDINT)&inst->Internal.Splitter.iSelector,(UDINT)&("|"),sizeof("|"));
     brsmemcpy((UDINT)&inst->Internal.Splitter.iInputString,(UDINT)&(inst->Status.DataRecv),sizeof(inst->Status.DataRecv));
     inst->Internal.Splitter.enable = 1;
     inst->Internal.Step = 40;
                
     if( inst->Params.enaClose == 1 ) {
      inst->Internal.Step = 40;
     } else {
      inst->Internal.Step = 15;
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
 SKTcpClientSplitter(&inst->Internal.Splitter);
 
}

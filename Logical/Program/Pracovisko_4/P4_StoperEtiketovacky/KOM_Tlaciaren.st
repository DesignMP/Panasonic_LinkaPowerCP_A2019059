
ACTION KOM_Tlaciaren: 

			
	CASE Client.sStep OF
 	
		0://Èakanie na spustenie komunikácie z tlaèiaròou//
			IF Tlaciaren.Commands.VytlacEtiketu THEN
				Tlaciaren.Status.PoruchaOtvoreniaKomunikacie:= FALSE;
				Tlaciaren.Status.PoruchaSpojenia_s_Tlaciarnou:= FALSE;
				Tlaciaren.Status.PoruchaOdoslaniaDat:= FALSE;
				Tlaciaren.Status.PoruchaZatvoreniaKomunikacie:= FALSE;
				Tlaciaren.Status.PoruchaPrijatiaDat:= FALSE;
				Tlaciaren.Status.PrislaSprava_s_Tlaciarne:= FALSE;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= FALSE;
				(*strcpy(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(''));*)
				strcpy(ADR(Tlaciaren.Data.Odpoved_s_Tlaciarne),ADR('')); //Vynulovanie premennej typu string
				Client.sStep := 1;
			END_IF
		
		
		
		1: //Otvorenie ethernetovej komunikácie//
			Client.TcpOpen_0.enable := 1;	
			Client.TcpOpen_0.pIfAddr := 0;  (* Which Interface to open *)
			Client.TcpOpen_0.port := 9100;  (* Port komunikácie s tlaèiaròou *)
			Client.TcpOpen_0.options := 0;	
			Client.TcpOpen_0;  (* Call the Function *)
			
						
			IF Client.TcpOpen_0.status = 0 THEN  (* TCP port je otvorený *)
				Client.TcpOpen_timeout := 0;
				Client.sStep := 5;											
			ELSIF Client.TcpOpen_0.status = ERR_FUB_BUSY THEN  (* TCP port sa otvára *)				
				Client.TcpOpen_timeout := Client.TcpOpen_timeout + 1;
				IF Client.TcpOpen_timeout > 50 THEN
					Tlaciaren.Status.PoruchaOtvoreniaKomunikacie:= TRUE;
					Client.TcpOpen_timeout := 0;
					Client.sStep := 40;
				END_IF
				(* Busy *)
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.PoruchaOtvoreniaKomunikacie:= TRUE;
				Client.TcpOpen_timeout := 0;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.sStep := 100;
			END_IF
		
		5: 		 
			Client.linger_opt.lLinger := 0; (* linger Time = 0 *)
			Client.linger_opt.lOnOff := 1; (* linger Option ON *)
			Client.TcpIoctl_0.enable := 1;
			Client.TcpIoctl_0.ident := Client.TcpOpen_0.ident; (* Connection Ident from AsTP.TCP_Open *)
			Client.TcpIoctl_0.ioctl := tcpSO_LINGER_SET; (* Set Linger Options *)
			Client.TcpIoctl_0.pData := ADR(Client.linger_opt);
			Client.TcpIoctl_0.datalen := SIZEOF(Client.linger_opt);
			Client.TcpIoctl_0;	    
		
			IF Client.TcpIoctl_0.status = 0 THEN  (* TcpIoctl successfull *)
				Client.sStep := 10;											
			ELSIF Client.TcpIoctl_0.status = ERR_FUB_BUSY THEN  (* TcpIoctl not finished -> redo *)				
				(* Busy *)
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.sStep := 100;
			END_IF
		
		
		10: //Spojenie s tlaèiaròou//					
			Client.TcpClient_0.enable := 1;
			Client.TcpClient_0.ident := Client.TcpOpen_0.ident;  (* Connection Ident from AsTCP.TCP_Open *)
			Client.TcpClient_0.portserv := 9100;  (* Port komunikácie s tlaèiaròou *)
			Client.TcpClient_0.pServer := ADR('192.168.122.41');  (* Adresa tlaèiarne *)
			Client.TcpClient_0;  (* Call the Function*)
			
			
			IF Client.TcpClient_0.status = 0 THEN  (* Open ok -> Send Data *)
				Client.TcpClient_timeout := 0;
				Client.sStep := 20;	
			ELSIF Client.TcpClient_0.status = ERR_FUB_BUSY THEN  (* TcpClient not finished -> redo *)	
				Client.TcpClient_timeout := Client.TcpClient_timeout + 1;
				IF Client.TcpClient_timeout > 50 THEN
					Tlaciaren.Status.PoruchaSpojenia_s_Tlaciarnou:= TRUE;
					Client.TcpClient_timeout := 0;
					Client.sStep := 40;
				END_IF
				
				(* Busy *)
			ELSIF Client.TcpClient_0.status = tcpERR_INVALID THEN  (* Port error -> Close actual connection, and reopen a new one *)
				Client.TcpClient_timeout := 0;
				Client.sStep := 40;
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.PoruchaSpojenia_s_Tlaciarnou:= TRUE;
				Client.TcpClient_timeout := 0;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.sStep := 100;
			END_IF
		
		
		20: //Poslanie dát do tlaèiarne//
			Client.TcpSend_0.enable := 1;				
			Client.TcpSend_0.ident := Client.TcpOpen_0.ident;  (* Connection Ident from AsTCP.TCP_Open *)
			Client.TcpSend_0.pData := ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren);  (* Dáta poslané do tlaèiarne *)
			Client.TcpSend_0.datalen := SIZEOF(Tlaciaren.Data.Sprava_pre_Tlaciaren);  (* Lenght of data to send *)											
			Client.TcpSend_0.flags := 0;
			Client.TcpSend_0;  (* Call the Function*)
			
			
			IF Client.TcpSend_0.status = 0 THEN  (* Data was sent sucessfully -> receive data *)
				Client.sStep := 40;
			ELSIF Client.TcpSend_0.status = ERR_FUB_BUSY THEN  (* TcpSend not finished -> redo *)	
				(* Busy *)
			ELSIF (Client.TcpSend_0.status = tcpERR_SENTLEN) OR (Client.TcpSend_0.status = tcpERR_NOT_CONNECTED) THEN (* Connection Lost *)
				Client.sStep := 40;
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.PoruchaOdoslaniaDat:= TRUE;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.sStep := 100;
			END_IF				
		
			
		30: //Prijatie odpovede s tlaèiarne//
			Client.TcpRecv_0.enable := 1;
			Client.TcpRecv_0.ident := Client.TcpOpen_0.ident;  (* Connection Ident from AsTCP.TCP_Open *)
			Client.TcpRecv_0.pData	:= ADR(Tlaciaren.Data.Odpoved_s_Tlaciarne);  (* Dáta poslané z tlaèiarne *)
			Client.TcpRecv_0.datamax := SIZEOF(Tlaciaren.Data.Odpoved_s_Tlaciarne);  (* Lenght of data buffer *)
			Client.TcpRecv_0.flags := 0;
			Client.TcpRecv_0;  (* Call the Function*)
		
			IF Client.TcpRecv_0.status = 0 THEN  (* Data was received sucessfully -> Send next packet *)
				Tlaciaren.Status.PrislaSprava_s_Tlaciarne:= TRUE;
				Client.recv_timeout := 0;
				Client.sStep := 40;
			ELSIF Client.TcpRecv_0.status = tcpERR_NO_DATA THEN  (* No data received - wait *)
				Client.recv_timeout := Client.recv_timeout + 1;
				IF Client.recv_timeout > 50 THEN
					Client.recv_timeout := 0;
					Client.sStep := 40;
				END_IF
				(* No Data received *)
			ELSIF Client.TcpRecv_0.status = ERR_FUB_BUSY THEN  (* TcpRecv not finished -> redo *)		
				(* Busy *)
			ELSIF Client.TcpRecv_0.status = tcpERR_NOT_CONNECTED THEN (* Connection Lost *)			
				Client.recv_timeout := 0;
				Client.sStep := 40;
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.PoruchaPrijatiaDat:= TRUE;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.recv_timeout := 0;
				Client.sStep := 100;
			END_IF	
			
			
		40: //Zatvorenie ethernetovej komunikácie//
			Client.TcpClose_0.enable := 1;
			Client.TcpClose_0.ident := Client.TcpOpen_0.ident;  (* Connection Ident from AsTCP.TCP_Open *)
			Client.TcpClose_0.how := 0;
			Client.TcpClose_0;  (* Call the Function*)
	
			IF Client.TcpClose_0.status = 0 THEN  (* Close sucessfull -> Reopen the interface *)
				Tlaciaren.Status.VytlacenieEtikety_OK:= TRUE;
				Client.sStep := 100;
			ELSIF Client.TcpClose_0.status = ERR_FUB_BUSY THEN  (* TcpClose not finished -> redo *)	
				(* Busy *)
			ELSE  (* Goto Error Step *)
				Tlaciaren.Status.PoruchaZatvoreniaKomunikacie:= TRUE;
				Tlaciaren.Status.VytlacenieEtikety_ERROR:= TRUE;
				Client.sStep := 100;
			END_IF
		
		100: //Ukonèenie komunikácie s tlaèiaròou//
			IF NOT Tlaciaren.Commands.VytlacEtiketu THEN
				Client.sStep := 0;
			END_IF
		
	END_CASE	
	
	
	
END_ACTION

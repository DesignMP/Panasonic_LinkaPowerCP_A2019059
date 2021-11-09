(*

         projekt: SKTcp - Panasonic
       
         autor: Ing. Milan Jun
         company: B+R Automatizace spol. s r.o.
         date: 10.09.2020

*)

TYPE
	SKTcpClientSC_Type : 	STRUCT 
		StepName : STRING[255];
		bNext : BOOL;
		bJump : BOOL;
		bLast : BOOL;
		bRepeat : BOOL;
		edge : BOOL;
		step : UINT;
		idle_time : TON;
		alarm_time : TON;
	END_STRUCT;
END_TYPE

(**)

TYPE
	SKTcpClientTraceStatus_Type : 	STRUCT 
		RecvSize : UDINT;
		DataRecv : ARRAY[0..4999]OF USINT;
		RecvCounter : UDINT;
		enaSend : BOOL;
		staReceived : BOOL;
		staSent : BOOL;
		staError : BOOL;
		staErrorSent : BOOL;
		staErrorOpen : BOOL;
		staErrorRecv : BOOL;
		staErrorIoctl : BOOL;
		staErrorClose : BOOL;
		staErrorClient : BOOL;
		staErrorRecvTout : BOOL;
		staErrorConn : BOOL;
		staErrorConnTout : BOOL;
		staSending : BOOL;
		staReceiving : BOOL;
		staReadyToClose : BOOL;
		staReadyToSend : BOOL;
	END_STRUCT;
	SKTcpClientTraceParPackInter_Typ : 	STRUCT 
		start : USINT;
		length_int : UINT;
		length_str : STRING[5];
		xor : BYTE;
		xor_str : USINT;
		stop : USINT;
		ti : USINT;
		length : UINT;
		ret_len : UINT;
	END_STRUCT;
	SKTcpClientTraceParams_Type : 	STRUCT 
		IPaddrServ : ARRAY[0..39]OF USINT;
		IPportClient : UINT;
		IPportServ : UINT;
		disRecv : BOOL;
		enaClose : BOOL; (*Zatvorenie portu po prijati odpovede od servera*)
		RecvTimeout : UDINT := 3000;
		ConnTimeout : UDINT := 3000;
		Packet : SKTcpClientTraceParamsPack_Typ;
	END_STRUCT;
	SKTcpClientTraceParamsPack_Typ : 	STRUCT 
		internal : SKTcpClientTraceParPackInter_Typ;
		type : STRING[1];
		workplace : STRING[5];
		rfid : STRING[10];
		master : STRING[30];
		dps1 : STRING[30];
		dps2 : STRING[30];
		dps3 : STRING[30];
		dps4 : STRING[30];
		dps5 : STRING[30];
		operator_id : STRING[8];
		data_report : STRING[4000];
		result : STRING[4];
	END_STRUCT;
	SKTcpClientTraceLogger_Typ : 	STRUCT 
		LastDataRecv : STRING[5000];
		LastDataSend : STRING[5000];
		SLOGGER : ARRAY[0..99]OF STRING[5000];
		RLOGGER : ARRAY[0..99]OF STRING[5000];
	END_STRUCT;
	SKTcpClientTraceIntern_Type : 	STRUCT 
		Step : UINT;
		Ident : UDINT;
		TCP_Open : TcpOpen;
		TCP_Close : TcpClose;
		TCP_Client : TcpClient;
		TCP_Recv : TcpRecv;
		TCP_Send : TcpSend;
		TCP_Ioctl : TcpIoctl;
		linger_opt : tcpLINGER_typ;
		TimerRecv : TON;
		TimerConn : TON;
		cmdClose : BOOL;
		cmdSend : BOOL;
		CloseOld : BOOL;
		SendOld : BOOL;
		EnableOld : BOOL;
		Splitter : SKTcpClientSplitter;
		oneskorenie : TON;
	END_STRUCT;
	SKTcpClientTraceDataSend_Type : 	STRUCT 
		send_data_a : ARRAY[0..4999]OF USINT;
		send_data_b : ARRAY[0..4999]OF USINT;
		DataSend : ARRAY[0..4999]OF USINT;
	END_STRUCT;
	SKTcpClientTraceCmd_Type : 	STRUCT 
		Send : BOOL;
		Close : BOOL;
	END_STRUCT;
	SKTcpClientTestParPackInter_Type : 	STRUCT 
		start : USINT;
		data_length : UINT;
		length : USINT;
		xor : USINT;
		stop : USINT;
		ti : USINT;
	END_STRUCT;
END_TYPE

(**)

TYPE
	SKTcpClientTesterStatus_Type : 	STRUCT 
		RecvSize : UDINT;
		DataRecv : ARRAY[0..199]OF USINT;
		RecvCounter : UDINT;
		enaSend : BOOL;
		staReceived : BOOL;
		staSent : BOOL;
		staError : BOOL;
		staErrorSent : BOOL;
		staErrorOpen : BOOL;
		staErrorRecv : BOOL;
		staErrorIoctl : BOOL;
		staErrorClose : BOOL;
		staErrorClient : BOOL;
		staErrorRecvTout : BOOL;
		staErrorConn : BOOL;
		staErrorConnTout : BOOL;
		staSending : BOOL;
		staReceiving : BOOL;
		staReadyToClose : BOOL;
		staReadyToSend : BOOL;
	END_STRUCT;
	SKTcpClientTesterParams_Type : 	STRUCT 
		IPaddrServ : ARRAY[0..39]OF USINT;
		IPportClient : UINT;
		IPportServ : UINT;
		disRecv : BOOL;
		enaClose : BOOL; (*Zatvorenie portu po prijati odpovede od servera*)
		RecvTimeout : UDINT := 3000;
		ConnTimeout : UDINT := 3000;
		Packet : SKTcpClientTesterParamsPack_Type;
	END_STRUCT;
	SKTcpClientTesterParamsPack_Type : 	STRUCT 
		type : USINT;
		workplace : USINT;
		id : USINT;
		data : ARRAY[0..31]OF USINT;
		internal : SKTcpClientTestParPackInter_Type;
	END_STRUCT;
	SKTcpClientTesterLogger_Typ : 	STRUCT 
		LastDataRecv : STRING[2000];
		LastDataSend : STRING[2000];
		SLOGGER : ARRAY[0..99]OF STRING[2000];
		RLOGGER : ARRAY[0..99]OF STRING[2000];
	END_STRUCT;
	SKTcpClientTesterIntern_Type : 	STRUCT 
		Step : UINT;
		Ident : UDINT;
		TCP_Open : TcpOpen;
		TCP_Close : TcpClose;
		TCP_Client : TcpClient;
		TCP_Recv : TcpRecv;
		TCP_Send : TcpSend;
		TCP_Ioctl : TcpIoctl;
		linger_opt : tcpLINGER_typ;
		TimerRecv : TON;
		TimerConn : TON;
		cmdClose : BOOL;
		cmdSend : BOOL;
		CloseOld : BOOL;
		SendOld : BOOL;
		EnableOld : BOOL;
	END_STRUCT;
	SKTcpClientTesterDataSend_Type : 	STRUCT 
		SendLength : UDINT;
		send_data_a : ARRAY[0..199]OF USINT;
		DataSend : ARRAY[0..199]OF USINT;
	END_STRUCT;
	SKTcpClientTesterCmd_Type : 	STRUCT 
		Send : BOOL;
		Close : BOOL;
	END_STRUCT;
END_TYPE

(**)

TYPE
	SKTcpClientFtpParamSrc_Typ : 	STRUCT 
		pDevice : UDINT;
		pParam : UDINT;
		pPath : UDINT;
	END_STRUCT;
	SKTcpClientFtpParamDest_Typ : 	STRUCT 
		pDevice : UDINT;
		pParam : UDINT;
		pPath : UDINT;
		pNewName : UDINT;
	END_STRUCT;
	SKTcpClientFtpParam_Typ : 	STRUCT 
		src : SKTcpClientFtpParamSrc_Typ;
		dest : SKTcpClientFtpParamDest_Typ;
	END_STRUCT;
	SKTcpClientFtpInternal_Typ : 	STRUCT 
		fb : SKTcpClientFtpInternalFb_Typ;
		sc : SKTcpClientSC_Type;
		src_handle : UDINT;
		dest_handle : UDINT;
	END_STRUCT;
	SKTcpClientFtpInternalFb_Typ : 	STRUCT 
		Devlink_0 : DevLink;
		DevUnlink_0 : DevUnlink;
		FileInfo_0 : FileInfo;
		DirInfo_0 : DirInfo;
		FileRename_0 : FileRename;
		DirRead_0 : DirRead;
		FileCopy_0 : FileCopy;
		FileDelete_0 : FileDelete;
	END_STRUCT;
	SKTcpClientFtpStatusSrc_Typ : 	STRUCT 
		pData : fiDIR_READ_DATA;
	END_STRUCT;
	SKTcpClientFtpStatusDest_Typ : 	STRUCT 
		empty : USINT;
	END_STRUCT;
	SKTcpClientFtpStatus_Typ : 	STRUCT 
		src : SKTcpClientFtpStatusSrc_Typ;
		dest : SKTcpClientFtpStatusDest_Typ;
	END_STRUCT;
END_TYPE

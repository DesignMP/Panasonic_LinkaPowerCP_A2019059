(**************Ovládanie tlaèiarne**********************)

TYPE
	Client_typ : 	STRUCT  (*TCP Client Variables*)
		sStep : UINT; (*TCP Client Step Variable*)
		TcpOpen_0 : TcpOpen; (*AsTCP.TcpOpen FUB*)
		TcpClient_0 : TcpClient; (*AsTCP.TcpClient FUB*)
		TcpRecv_0 : TcpRecv; (*AsTCP.TcpRecv FUB*)
		TcpSend_0 : TcpSend; (*AsTCP.TcpSend FUB*)
		TcpIoctl_0 : TcpIoctl; (*AsTCP.TcpIoctl FUB*)
		TcpClose_0 : TcpClose; (*AsTCP.TcpClose FUB*)
		linger_opt : tcpLINGER_typ; (*AsTCP.tcpLINGER_typ*)
		recv_timeout : UDINT; (*receive timeout*)
		TcpOpen_timeout : UDINT;
		TcpClient_timeout : UDINT;
	END_STRUCT;
	Tlaciaren_typ : 	STRUCT 
		Commands : TlaciarenCommands_typ;
		Status : TlaciarenStatus_typ;
		Data : TlaciarenData_typ;
	END_STRUCT;
	TlaciarenCommands_typ : 	STRUCT 
		VytlacEtiketu : BOOL;
	END_STRUCT;
	TlaciarenStatus_typ : 	STRUCT 
		PoruchaOtvoreniaKomunikacie : BOOL;
		PoruchaOdoslaniaDat : BOOL;
		PoruchaZatvoreniaKomunikacie : BOOL;
		PoruchaSpojenia_s_Tlaciarnou : BOOL;
		PoruchaPrijatiaDat : BOOL;
		PrislaSprava_s_Tlaciarne : BOOL;
		VytlacenieEtikety_OK : BOOL;
		VytlacenieEtikety_ERROR : BOOL;
	END_STRUCT;
	TlaciarenData_typ : 	STRUCT  (*Datatyp for global Variables*)
		Sprava_pre_Tlaciaren : STRING[4000]; (*Obsahuje posielane data pre tlaèiareò v textovej podobe*)
		Odpoved_s_Tlaciarne : STRING[400]; (*Obsahuje odpoveï s tlaèiarne*)
	END_STRUCT;
	EtiketaPanasonic_typ : 	STRUCT 
		IdentificationNumber : STRING[7];
		ChangeIndex : STRING[3];
		ModelType : STRING[8];
		SupplierNumber : STRING[6];
		PlantCode : STRING[2];
		Country : STRING[2];
		Date : STRING[8];
		Counter : STRING[5];
		DataMetrix : STRING[31];
	END_STRUCT;
END_TYPE

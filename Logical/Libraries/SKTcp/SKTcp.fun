(**************************************************************

         projekt: SKTcp - Panasonic
       
         autor: Ing. Milan Jun
         company: B+R Automatizace spol. s r.o.
         date: 10.09.2020

*)

{REDUND_ERROR} FUNCTION_BLOCK SKTcpClientSplitter (*SKTcpClient - Splitter*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		enable : BOOL;
		iSelector : USINT;
		iInputString : STRING[MAX_STRING];
	END_VAR
	VAR_OUTPUT
		out : ARRAY[0..14] OF STRING[MAX_STRING];
		done : BOOL;
		OUT_Master : STRING[30];
		OUT_Typ : STRING[1];
		OUT_Result : STRING[2];
	END_VAR
	VAR
		enableOld : BOOL;
		tmpInputString : ARRAY[0..MAX_STRING_MINUS_ONE] OF USINT;
		tmpString : STRING[MAX_CHARACTER];
		idx : ARRAY[0..1] OF UDINT;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK SKTcpClientTester (*SKTcpClient - Tester*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		Enable : BOOL;
		Cmd : SKTcpClientTesterCmd_Type;
		Params : SKTcpClientTesterParams_Type;
		DataSend : SKTcpClientTesterDataSend_Type;
	END_VAR
	VAR_OUTPUT
		Status : SKTcpClientTesterStatus_Type;
		FBStatus : {REDUND_UNREPLICABLE} UINT;
		logger : SKTcpClientTesterLogger_Typ;
	END_VAR
	VAR
		Internal : SKTcpClientTesterIntern_Type;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK SKTcpClientTrace (*SKTcpClient - ZberDat verzia 2*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		Enable : BOOL;
		Cmd : SKTcpClientTraceCmd_Type;
		Params : SKTcpClientTraceParams_Type;
		DataSend : SKTcpClientTraceDataSend_Type;
	END_VAR
	VAR_OUTPUT
		Status : SKTcpClientTraceStatus_Type;
		FBStatus : {REDUND_UNREPLICABLE} UINT;
		logger : SKTcpClientTraceLogger_Typ;
	END_VAR
	VAR
		Internal : SKTcpClientTraceIntern_Type;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK SKTcpClientEdge (*SKTcpClient - Edge*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		CLK : BOOL;
	END_VAR
	VAR_OUTPUT
		Q : {REDUND_UNREPLICABLE} BOOL;
	END_VAR
	VAR
		Last_State : BOOL;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK SKTcpClientFTP (*SKTcpClient - FTP*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		enable : BOOL;
		send : BOOL;
		param : SKTcpClientFtpParam_Typ;
	END_VAR
	VAR_OUTPUT
		active : BOOL;
		status : SKTcpClientFtpStatus_Typ;
		Errorcode : UINT;
	END_VAR
	VAR
		internal : SKTcpClientFtpInternal_Typ;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION SKTcpClientNod : UINT (*SKTcpClient - Number Of Digits*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		n : UDINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION SKTcpClientXor : USINT (*SKTcpClient - Xor*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		in : ARRAY[0..4999] OF USINT;
		len : UINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION SKTcpClientNewCsvEntry : USINT (*SKTcpClient - New CSV Entries*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		IDstep : STRING[10];
		Description : STRING[100];
		TypeValue : STRING[10];
		MinTol : STRING[10];
		MaxTol : STRING[10];
		Nom : STRING[10];
		MinEle : STRING[10];
		MaxEle : STRING[10];
		Value : STRING[10];
		ValEle : STRING[10];
		Result : STRING[10];
		pData : UDINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION SKTcpClientNewLoggerEntry : USINT (*SKTcpClient - New Logger Entries*)
	VAR_INPUT
		msg : STRING[1100];
		pData : UDINT;
		entrys : UINT;
	END_VAR
END_FUNCTION

{REDUND_ERROR} FUNCTION SKTcpClientSC : USINT (*SKTcpClient - SC*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		sc : SKTcpClientSC_Type;
	END_VAR
END_FUNCTION

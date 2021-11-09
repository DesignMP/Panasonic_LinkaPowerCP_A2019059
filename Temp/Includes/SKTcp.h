/* Automation Studio generated header file */
/* Do not edit ! */
/* SKTcp 1.00.8 */

#ifndef _SKTCP_
#define _SKTCP_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _SKTcp_VERSION
#define _SKTcp_VERSION 1.00.8
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
#ifdef _SG3
		#include "FileIO.h"
		#include "AsBrStr.h"
		#include "sys_lib.h"
		#include "standard.h"
		#include "AsTCP.h"
		#include "IecCheck.h"
#endif
#ifdef _SG4
		#include "FileIO.h"
		#include "AsBrStr.h"
		#include "sys_lib.h"
		#include "standard.h"
		#include "AsTCP.h"
		#include "IecCheck.h"
#endif
#ifdef _SGC
		#include "FileIO.h"
		#include "AsBrStr.h"
		#include "sys_lib.h"
		#include "standard.h"
		#include "AsTCP.h"
		#include "IecCheck.h"
#endif


/* Constants */
#ifdef _REPLACE_CONST
 #define MAX_CHARACTER 1U
 #define MAX_STRING 5000U
 #define MAX_STRING_MINUS_ONE 4999U
 #define MAX_TRACE_LOGGER_ENTIRES 90U
#else
 _GLOBAL_CONST unsigned short MAX_CHARACTER;
 _GLOBAL_CONST unsigned short MAX_STRING;
 _GLOBAL_CONST unsigned short MAX_STRING_MINUS_ONE;
 _GLOBAL_CONST unsigned char MAX_TRACE_LOGGER_ENTIRES;
#endif




/* Datatypes and datatypes of function blocks */
typedef struct SKTcpClientSC_Type
{	plcstring StepName[256];
	plcbit bNext;
	plcbit bJump;
	plcbit bLast;
	plcbit bRepeat;
	plcbit edge;
	unsigned short step;
	struct TON idle_time;
	struct TON alarm_time;
} SKTcpClientSC_Type;

typedef struct SKTcpClientTraceStatus_Type
{	unsigned long RecvSize;
	unsigned char DataRecv[5000];
	unsigned long RecvCounter;
	plcbit enaSend;
	plcbit staReceived;
	plcbit staSent;
	plcbit staError;
	plcbit staErrorSent;
	plcbit staErrorOpen;
	plcbit staErrorRecv;
	plcbit staErrorIoctl;
	plcbit staErrorClose;
	plcbit staErrorClient;
	plcbit staErrorRecvTout;
	plcbit staErrorConn;
	plcbit staErrorConnTout;
	plcbit staSending;
	plcbit staReceiving;
	plcbit staReadyToClose;
	plcbit staReadyToSend;
} SKTcpClientTraceStatus_Type;

typedef struct SKTcpClientTraceParPackInter_Typ
{	unsigned char start;
	unsigned short length_int;
	plcstring length_str[6];
	plcbyte xor;
	unsigned char xor_str;
	unsigned char stop;
	unsigned char ti;
	unsigned short length;
	unsigned short ret_len;
} SKTcpClientTraceParPackInter_Typ;

typedef struct SKTcpClientTraceParamsPack_Typ
{	struct SKTcpClientTraceParPackInter_Typ internal;
	plcstring type[2];
	plcstring workplace[6];
	plcstring rfid[11];
	plcstring master[31];
	plcstring dps1[31];
	plcstring dps2[31];
	plcstring dps3[31];
	plcstring dps4[31];
	plcstring dps5[31];
	plcstring operator_id[9];
	plcstring data_report[4001];
	plcstring result[5];
} SKTcpClientTraceParamsPack_Typ;

typedef struct SKTcpClientTraceParams_Type
{	unsigned char IPaddrServ[40];
	unsigned short IPportClient;
	unsigned short IPportServ;
	plcbit disRecv;
	plcbit enaClose;
	unsigned long RecvTimeout;
	unsigned long ConnTimeout;
	struct SKTcpClientTraceParamsPack_Typ Packet;
} SKTcpClientTraceParams_Type;

typedef struct SKTcpClientTraceLogger_Typ
{	plcstring LastDataRecv[5001];
	plcstring LastDataSend[5001];
	plcstring SLOGGER[100][5001];
	plcstring RLOGGER[100][5001];
} SKTcpClientTraceLogger_Typ;

typedef struct SKTcpClientSplitter
{
	/* VAR_INPUT (analog) */
	unsigned char iSelector;
	plcstring iInputString[5001];
	/* VAR_OUTPUT (analog) */
	plcstring out[15][5001];
	plcstring OUT_Master[31];
	plcstring OUT_Typ[2];
	plcstring OUT_Result[3];
	/* VAR (analog) */
	unsigned char tmpInputString[5000];
	plcstring tmpString[2];
	unsigned long idx[2];
	/* VAR_INPUT (digital) */
	plcbit enable;
	/* VAR_OUTPUT (digital) */
	plcbit done;
	/* VAR (digital) */
	plcbit enableOld;
} SKTcpClientSplitter_typ;

typedef struct SKTcpClientTraceIntern_Type
{	unsigned short Step;
	unsigned long Ident;
	struct TcpOpen TCP_Open;
	struct TcpClose TCP_Close;
	struct TcpClient TCP_Client;
	struct TcpRecv TCP_Recv;
	struct TcpSend TCP_Send;
	struct TcpIoctl TCP_Ioctl;
	struct tcpLINGER_typ linger_opt;
	struct TON TimerRecv;
	struct TON TimerConn;
	plcbit cmdClose;
	plcbit cmdSend;
	plcbit CloseOld;
	plcbit SendOld;
	plcbit EnableOld;
	struct SKTcpClientSplitter Splitter;
	struct TON oneskorenie;
} SKTcpClientTraceIntern_Type;

typedef struct SKTcpClientTraceDataSend_Type
{	unsigned char send_data_a[5000];
	unsigned char send_data_b[5000];
	unsigned char DataSend[5000];
} SKTcpClientTraceDataSend_Type;

typedef struct SKTcpClientTraceCmd_Type
{	plcbit Send;
	plcbit Close;
} SKTcpClientTraceCmd_Type;

typedef struct SKTcpClientTestParPackInter_Type
{	unsigned char start;
	unsigned short data_length;
	unsigned char length;
	unsigned char xor;
	unsigned char stop;
	unsigned char ti;
} SKTcpClientTestParPackInter_Type;

typedef struct SKTcpClientTesterStatus_Type
{	unsigned long RecvSize;
	unsigned char DataRecv[200];
	unsigned long RecvCounter;
	plcbit enaSend;
	plcbit staReceived;
	plcbit staSent;
	plcbit staError;
	plcbit staErrorSent;
	plcbit staErrorOpen;
	plcbit staErrorRecv;
	plcbit staErrorIoctl;
	plcbit staErrorClose;
	plcbit staErrorClient;
	plcbit staErrorRecvTout;
	plcbit staErrorConn;
	plcbit staErrorConnTout;
	plcbit staSending;
	plcbit staReceiving;
	plcbit staReadyToClose;
	plcbit staReadyToSend;
} SKTcpClientTesterStatus_Type;

typedef struct SKTcpClientTesterParamsPack_Type
{	unsigned char type;
	unsigned char workplace;
	unsigned char id;
	unsigned char data[32];
	struct SKTcpClientTestParPackInter_Type internal;
} SKTcpClientTesterParamsPack_Type;

typedef struct SKTcpClientTesterParams_Type
{	unsigned char IPaddrServ[40];
	unsigned short IPportClient;
	unsigned short IPportServ;
	plcbit disRecv;
	plcbit enaClose;
	unsigned long RecvTimeout;
	unsigned long ConnTimeout;
	struct SKTcpClientTesterParamsPack_Type Packet;
} SKTcpClientTesterParams_Type;

typedef struct SKTcpClientTesterLogger_Typ
{	plcstring LastDataRecv[2001];
	plcstring LastDataSend[2001];
	plcstring SLOGGER[100][2001];
	plcstring RLOGGER[100][2001];
} SKTcpClientTesterLogger_Typ;

typedef struct SKTcpClientTesterIntern_Type
{	unsigned short Step;
	unsigned long Ident;
	struct TcpOpen TCP_Open;
	struct TcpClose TCP_Close;
	struct TcpClient TCP_Client;
	struct TcpRecv TCP_Recv;
	struct TcpSend TCP_Send;
	struct TcpIoctl TCP_Ioctl;
	struct tcpLINGER_typ linger_opt;
	struct TON TimerRecv;
	struct TON TimerConn;
	plcbit cmdClose;
	plcbit cmdSend;
	plcbit CloseOld;
	plcbit SendOld;
	plcbit EnableOld;
} SKTcpClientTesterIntern_Type;

typedef struct SKTcpClientTesterDataSend_Type
{	unsigned long SendLength;
	unsigned char send_data_a[200];
	unsigned char DataSend[200];
} SKTcpClientTesterDataSend_Type;

typedef struct SKTcpClientTesterCmd_Type
{	plcbit Send;
	plcbit Close;
} SKTcpClientTesterCmd_Type;

typedef struct SKTcpClientFtpParamSrc_Typ
{	unsigned long pDevice;
	unsigned long pParam;
	unsigned long pPath;
} SKTcpClientFtpParamSrc_Typ;

typedef struct SKTcpClientFtpParamDest_Typ
{	unsigned long pDevice;
	unsigned long pParam;
	unsigned long pPath;
	unsigned long pNewName;
} SKTcpClientFtpParamDest_Typ;

typedef struct SKTcpClientFtpParam_Typ
{	struct SKTcpClientFtpParamSrc_Typ src;
	struct SKTcpClientFtpParamDest_Typ dest;
} SKTcpClientFtpParam_Typ;

typedef struct SKTcpClientFtpInternalFb_Typ
{	struct DevLink Devlink_0;
	struct DevUnlink DevUnlink_0;
	struct FileInfo FileInfo_0;
	struct DirInfo DirInfo_0;
	struct FileRename FileRename_0;
	struct DirRead DirRead_0;
	struct FileCopy FileCopy_0;
	struct FileDelete FileDelete_0;
} SKTcpClientFtpInternalFb_Typ;

typedef struct SKTcpClientFtpInternal_Typ
{	struct SKTcpClientFtpInternalFb_Typ fb;
	struct SKTcpClientSC_Type sc;
	unsigned long src_handle;
	unsigned long dest_handle;
} SKTcpClientFtpInternal_Typ;

typedef struct SKTcpClientFtpStatusSrc_Typ
{	struct fiDIR_READ_DATA pData;
} SKTcpClientFtpStatusSrc_Typ;

typedef struct SKTcpClientFtpStatusDest_Typ
{	unsigned char empty;
} SKTcpClientFtpStatusDest_Typ;

typedef struct SKTcpClientFtpStatus_Typ
{	struct SKTcpClientFtpStatusSrc_Typ src;
	struct SKTcpClientFtpStatusDest_Typ dest;
} SKTcpClientFtpStatus_Typ;

typedef struct SKTcpClientTester
{
	/* VAR_INPUT (analog) */
	struct SKTcpClientTesterCmd_Type Cmd;
	struct SKTcpClientTesterParams_Type Params;
	struct SKTcpClientTesterDataSend_Type DataSend;
	/* VAR_OUTPUT (analog) */
	struct SKTcpClientTesterStatus_Type Status;
	unsigned short FBStatus;
	struct SKTcpClientTesterLogger_Typ logger;
	/* VAR (analog) */
	struct SKTcpClientTesterIntern_Type Internal;
	/* VAR_INPUT (digital) */
	plcbit Enable;
} SKTcpClientTester_typ;

typedef struct SKTcpClientTrace
{
	/* VAR_INPUT (analog) */
	struct SKTcpClientTraceCmd_Type Cmd;
	struct SKTcpClientTraceParams_Type Params;
	struct SKTcpClientTraceDataSend_Type DataSend;
	/* VAR_OUTPUT (analog) */
	struct SKTcpClientTraceStatus_Type Status;
	unsigned short FBStatus;
	struct SKTcpClientTraceLogger_Typ logger;
	/* VAR (analog) */
	struct SKTcpClientTraceIntern_Type Internal;
	/* VAR_INPUT (digital) */
	plcbit Enable;
} SKTcpClientTrace_typ;

typedef struct SKTcpClientEdge
{
	/* VAR_INPUT (digital) */
	plcbit CLK;
	/* VAR_OUTPUT (digital) */
	plcbit Q;
	/* VAR (digital) */
	plcbit Last_State;
} SKTcpClientEdge_typ;

typedef struct SKTcpClientFTP
{
	/* VAR_INPUT (analog) */
	struct SKTcpClientFtpParam_Typ param;
	/* VAR_OUTPUT (analog) */
	struct SKTcpClientFtpStatus_Typ status;
	unsigned short Errorcode;
	/* VAR (analog) */
	struct SKTcpClientFtpInternal_Typ internal;
	/* VAR_INPUT (digital) */
	plcbit enable;
	plcbit send;
	/* VAR_OUTPUT (digital) */
	plcbit active;
} SKTcpClientFTP_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void SKTcpClientSplitter(struct SKTcpClientSplitter* inst);
_BUR_PUBLIC void SKTcpClientTester(struct SKTcpClientTester* inst);
_BUR_PUBLIC void SKTcpClientTrace(struct SKTcpClientTrace* inst);
_BUR_PUBLIC void SKTcpClientEdge(struct SKTcpClientEdge* inst);
_BUR_PUBLIC void SKTcpClientFTP(struct SKTcpClientFTP* inst);
_BUR_PUBLIC unsigned short SKTcpClientNod(unsigned long n);
_BUR_PUBLIC unsigned char SKTcpClientXor(unsigned char in[5000], unsigned short len);
_BUR_PUBLIC unsigned char SKTcpClientNewCsvEntry(plcstring* IDstep, plcstring* Description, plcstring* TypeValue, plcstring* MinTol, plcstring* MaxTol, plcstring* Nom, plcstring* MinEle, plcstring* MaxEle, plcstring* Value, plcstring* ValEle, plcstring* Result, unsigned long pData);
_BUR_PUBLIC unsigned char SKTcpClientNewLoggerEntry(plcstring* msg, unsigned long pData, unsigned short entrys);
_BUR_PUBLIC unsigned char SKTcpClientSC(struct SKTcpClientSC_Type* sc);


#ifdef __cplusplus
};
#endif
#endif /* _SKTCP_ */


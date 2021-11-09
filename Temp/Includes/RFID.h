/* Automation Studio generated header file */
/* Do not edit ! */
/* RFID 3.10.0 */

#ifndef _RFID_
#define _RFID_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _RFID_VERSION
#define _RFID_VERSION 3.10.0
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Constants */
#ifdef _REPLACE_CONST
 #define REG1 1U
 #define REG2 2U
 #define REG4 4U
 #define REG5 5U
 #define REG6 6U
 #define REG8 8U
 #define REG9 9U
 #define REG11 11U
 #define REG14 14U
 #define REG13 13U
 #define REG12 12U
 #define REG10 10U
 #define REG7 7U
 #define REG15 15U
 #define REG16 16U
 #define REG19 19U
 #define REG18 18U
 #define REG17 17U
 #define REG20 20U
 #define REG25 25U
 #define REG26 26U
 #define REG28 28U
 #define READ 2U
 #define WRITE 1U
 #define REG30 30U
 #define REG33 33U
 #define CLOSE 100U
 #define REG32 32U
 #define REG31 31U
 #define SEARCHTP 1U
 #define SEARCHTPLIST 0U
 #define REG29 29U
 #define REG27 27U
 #define STACKWRITE 5U
 #define TRANSPONDER_VENDOR_ID 1659U
 #define TYPEREAD 2U
 #define TRANSPONDER_PRODUCT_ID 8963U
 #define TYPEWRITE 1U
 #define TRANSPONDER_BCD 768U
 #define STACKREAD 6U
 #define REG24 24U
 #define RW 1U
 #define REG23 23U
 #define REG22 22U
 #define REG21 21U
 #define OPEN 0U
 #define IDWRITE 3U
 #define IDREAD 4U
 #define rfidError_lock_wrongType 41U
 #define rfidError_password_wrongType 61U
 #define rfidError_stacklevel_failed 23U
 #define rfidError_unlock_failed 52U
 #define rfidError_unlock_wrongType 51U
 #define rfidError_tag_failed 21U
 #define rfidError_crc_failed 31U
 #define rfidError_id_failed 22U
 #define rfidError_write_failed 83U
 #define rfidError_write_wrongRegNr 82U
 #define rfidError_write_wrongType 81U
 #define rfidError_read_wrongRegNr 72U
 #define rfidError_read_wrongType 71U
 #define rfidError_rf_failed 11U
 #define rfidError_read_failed 73U
 #define rfidError_password_failed 62U
 #define rfidError_lock_failed 42U
 #define DATAREAD 3U
 #define REG3 3U
#else
 _GLOBAL_CONST unsigned char REG1;
 _GLOBAL_CONST unsigned char REG2;
 _GLOBAL_CONST unsigned char REG4;
 _GLOBAL_CONST unsigned char REG5;
 _GLOBAL_CONST unsigned char REG6;
 _GLOBAL_CONST unsigned char REG8;
 _GLOBAL_CONST unsigned char REG9;
 _GLOBAL_CONST unsigned char REG11;
 _GLOBAL_CONST unsigned char REG14;
 _GLOBAL_CONST unsigned char REG13;
 _GLOBAL_CONST unsigned char REG12;
 _GLOBAL_CONST unsigned char REG10;
 _GLOBAL_CONST unsigned char REG7;
 _GLOBAL_CONST unsigned char REG15;
 _GLOBAL_CONST unsigned char REG16;
 _GLOBAL_CONST unsigned char REG19;
 _GLOBAL_CONST unsigned char REG18;
 _GLOBAL_CONST unsigned char REG17;
 _GLOBAL_CONST unsigned char REG20;
 _GLOBAL_CONST unsigned char REG25;
 _GLOBAL_CONST unsigned char REG26;
 _GLOBAL_CONST unsigned char REG28;
 _GLOBAL_CONST unsigned char READ;
 _GLOBAL_CONST unsigned char WRITE;
 _GLOBAL_CONST unsigned char REG30;
 _GLOBAL_CONST unsigned char REG33;
 _GLOBAL_CONST unsigned char CLOSE;
 _GLOBAL_CONST unsigned char REG32;
 _GLOBAL_CONST unsigned char REG31;
 _GLOBAL_CONST unsigned char SEARCHTP;
 _GLOBAL_CONST unsigned char SEARCHTPLIST;
 _GLOBAL_CONST unsigned char REG29;
 _GLOBAL_CONST unsigned char REG27;
 _GLOBAL_CONST unsigned char STACKWRITE;
 _GLOBAL_CONST unsigned short TRANSPONDER_VENDOR_ID;
 _GLOBAL_CONST unsigned char TYPEREAD;
 _GLOBAL_CONST unsigned short TRANSPONDER_PRODUCT_ID;
 _GLOBAL_CONST unsigned char TYPEWRITE;
 _GLOBAL_CONST unsigned short TRANSPONDER_BCD;
 _GLOBAL_CONST unsigned char STACKREAD;
 _GLOBAL_CONST unsigned char REG24;
 _GLOBAL_CONST unsigned char RW;
 _GLOBAL_CONST unsigned char REG23;
 _GLOBAL_CONST unsigned char REG22;
 _GLOBAL_CONST unsigned char REG21;
 _GLOBAL_CONST unsigned char OPEN;
 _GLOBAL_CONST unsigned char IDWRITE;
 _GLOBAL_CONST unsigned char IDREAD;
 _GLOBAL_CONST unsigned long rfidError_lock_wrongType;
 _GLOBAL_CONST unsigned long rfidError_password_wrongType;
 _GLOBAL_CONST unsigned long rfidError_stacklevel_failed;
 _GLOBAL_CONST unsigned long rfidError_unlock_failed;
 _GLOBAL_CONST unsigned long rfidError_unlock_wrongType;
 _GLOBAL_CONST unsigned long rfidError_tag_failed;
 _GLOBAL_CONST unsigned char rfidError_crc_failed;
 _GLOBAL_CONST unsigned long rfidError_id_failed;
 _GLOBAL_CONST unsigned long rfidError_write_failed;
 _GLOBAL_CONST unsigned long rfidError_write_wrongRegNr;
 _GLOBAL_CONST unsigned long rfidError_write_wrongType;
 _GLOBAL_CONST unsigned long rfidError_read_wrongRegNr;
 _GLOBAL_CONST unsigned long rfidError_read_wrongType;
 _GLOBAL_CONST unsigned long rfidError_rf_failed;
 _GLOBAL_CONST unsigned long rfidError_read_failed;
 _GLOBAL_CONST unsigned long rfidError_password_failed;
 _GLOBAL_CONST unsigned long rfidError_lock_failed;
 _GLOBAL_CONST unsigned char DATAREAD;
 _GLOBAL_CONST unsigned char REG3;
#endif




/* Datatypes and datatypes of function blocks */
typedef struct Info
{	unsigned long ID;
	unsigned long Type;
	unsigned long StackLevel;
} Info;

typedef struct status
{	unsigned short GetUsbList;
	unsigned short GetUsbNode;
	unsigned short ReleaseBuffer;
	unsigned short XOPEN;
	unsigned short WRITE;
	unsigned short READ;
	unsigned short GetBuffer;
	unsigned short RoBuffer;
} status;

typedef struct usbDevice
{	unsigned long vendorID;
	unsigned long productId;
	unsigned long bcdDevice;
} usbDevice;

typedef struct TP_Init
{
	/* VAR_OUTPUT (analog) */
	unsigned long Ident[11];
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char StepInit;
	struct UsbNodeListGet USBNodeListGetFuB;
	struct status status;
	unsigned long usbNodeList[32];
	unsigned short i;
	struct UsbNodeGet USBNodeGetFuB;
	struct usbNode_typ usbDevice[11];
	plcstring StringDevice[11][31];
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Error;
	plcbit Busy;
	plcbit Done;
} TP_Init_typ;

typedef struct TP_Info
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	struct Info Info;
	/* VAR (analog) */
	unsigned char Stepstatus;
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct status status;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned short ReadBufferLength;
	unsigned char ReadData[256];
	struct FRM_rbuf FrameReleaseBufferStruct;
	unsigned char ID[10];
	unsigned char StackLevel[2];
	unsigned char KeyType[4];
	unsigned char AN[3];
	unsigned long sendbuffer;
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Busy;
	plcbit Done;
	plcbit Error;
} TP_Info_typ;

typedef struct TP_Unlock
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	unsigned long Data;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char StepType;
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct status status;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned short ReadBufferLength;
	unsigned char ReadData[256];
	struct FRM_rbuf FrameReleaseBufferStruct;
	plcstring string1[21];
	plcstring string2[11];
	unsigned long CMD;
	unsigned char StepWrite;
	unsigned char ERROR[3];
	unsigned char AN[3];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Busy;
	plcbit Error;
	plcbit Done;
	/* VAR (digital) */
	plcbit TypeOK;
} TP_Unlock_typ;

typedef struct TP_Lock
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct status status;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned char ReadData[256];
	unsigned short ReadBufferLength;
	struct FRM_rbuf FrameReleaseBufferStruct;
	unsigned char StepLOCK;
	unsigned char AN[3];
	unsigned char ERROR[3];
	unsigned char StepType;
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned short sendbufferlength;
	unsigned long sendbuffer;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Busy;
	plcbit Error;
	plcbit Done;
	/* VAR (digital) */
	plcbit TypeOK;
} TP_Lock_typ;

typedef struct TP_PWProtect
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	unsigned long Data;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char StepType;
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct status status;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned short ReadBufferLength;
	unsigned char ReadData[256];
	struct FRM_rbuf FrameReleaseBufferStruct;
	plcstring string1[21];
	plcstring string2[21];
	unsigned long CMD;
	unsigned char StepWrite;
	unsigned char AN[3];
	unsigned char ERROR[3];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Busy;
	plcbit Error;
	plcbit Done;
	/* VAR (digital) */
	plcbit TypeOK;
} TP_PWProtect_typ;

typedef struct TP_OnOff
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char StepOnOff;
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct status status;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned short ReadBufferLength;
	unsigned char ReadData[256];
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	unsigned char AN[3];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_rbuf FrameReleaseBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	struct FRM_close FRM_close_0;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	plcbit Mode;
	/* VAR_OUTPUT (digital) */
	plcbit Error;
	plcbit Busy;
	plcbit Done;
} TP_OnOff_typ;

typedef struct TP_Crc
{
	/* VAR_INPUT (analog) */
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned char WriteData[256];
	struct FRM_write FrameWriteStruct;
	struct FRM_read FrameReadStruct;
	unsigned long ReadBuffer;
	unsigned char ReadData[256];
	unsigned short ReadBufferLength;
	struct FRM_rbuf FrameReleaseBufferStruct;
	struct status status;
	unsigned char StepCRC;
	unsigned char AN[3];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	struct FRM_close FRM_close_0;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	plcbit Mode;
	/* VAR_OUTPUT (digital) */
	plcbit Error;
	plcbit Busy;
	plcbit Done;
} TP_Crc_typ;

typedef struct TP_Write
{
	/* VAR_INPUT (analog) */
	unsigned char RegNr;
	unsigned long Data;
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	/* VAR (analog) */
	unsigned long CMD;
	unsigned char WriteData[256];
	unsigned char StepWrite;
	struct FRM_write FrameWriteStruct;
	struct status status;
	unsigned long ReadBuffer;
	struct FRM_rbuf FrameReleaseBufferStruct;
	unsigned short ReadBufferLength;
	struct FRM_read FrameReadStruct;
	unsigned char ReadData[256];
	plcstring string1[31];
	plcstring string2[31];
	unsigned char StepType;
	plcstring string3[11];
	unsigned char AN[3];
	unsigned char ERROR[3];
	unsigned char KeyType[4];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Busy;
	plcbit Error;
	plcbit Done;
	/* VAR (digital) */
	plcbit CommandReady;
	plcbit TypeOK;
} TP_Write_typ;

typedef struct TP_Read
{
	/* VAR_INPUT (analog) */
	unsigned char RegNr;
	unsigned long Ident;
	/* VAR_OUTPUT (analog) */
	unsigned long ErrorID;
	unsigned long Data;
	/* VAR (analog) */
	unsigned char WriteData[256];
	struct status status;
	unsigned long ReadBuffer;
	unsigned short ReadBufferLength;
	unsigned char ReadData[256];
	struct FRM_read FrameReadStruct;
	unsigned char data[20];
	struct FRM_rbuf FrameReleaseBufferStruct;
	struct FRM_write FrameWriteStruct;
	unsigned char StepType;
	unsigned char KeyType[4];
	unsigned char AN[3];
	unsigned char ERROR[3];
	struct FRM_gbuf FrameGetBufferStruct;
	unsigned long sendbuffer;
	unsigned short sendbufferlength;
	struct FRM_robuf FrameReleaseOutputBufferStruct;
	struct FRM_xopen FrameXOpenStruct;
	unsigned char StepREAD;
	/* VAR_INPUT (digital) */
	plcbit Enable;
	/* VAR_OUTPUT (digital) */
	plcbit Done;
	plcbit Error;
	plcbit Busy;
	/* VAR (digital) */
	plcbit CommandReady;
	plcbit TypeOK;
} TP_Read_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void TP_Init(struct TP_Init* inst);
_BUR_PUBLIC void TP_Info(struct TP_Info* inst);
_BUR_PUBLIC void TP_Unlock(struct TP_Unlock* inst);
_BUR_PUBLIC void TP_Lock(struct TP_Lock* inst);
_BUR_PUBLIC void TP_PWProtect(struct TP_PWProtect* inst);
_BUR_PUBLIC void TP_OnOff(struct TP_OnOff* inst);
_BUR_PUBLIC void TP_Crc(struct TP_Crc* inst);
_BUR_PUBLIC void TP_Write(struct TP_Write* inst);
_BUR_PUBLIC void TP_Read(struct TP_Read* inst);


#ifdef __cplusplus
};
#endif
#endif /* _RFID_ */


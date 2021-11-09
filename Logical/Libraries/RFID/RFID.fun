
FUNCTION_BLOCK TP_Init (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
	END_VAR
	VAR_OUTPUT
		Ident : ARRAY[0..10] OF UDINT;
		Error : BOOL;
		ErrorID : UDINT;
		Busy : BOOL;
		Done : BOOL;
	END_VAR
	VAR
		StepInit : USINT;
		USBNodeListGetFuB : UsbNodeListGet;
		status : status;
		usbNodeList : ARRAY[0..31] OF UDINT;
		i : UINT;
		USBNodeGetFuB : UsbNodeGet;
		usbDevice : ARRAY[0..10] OF usbNode_typ;
		StringDevice : ARRAY[0..10] OF STRING[30];
	END_VAR
END_FUNCTION_BLOCK
(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: RFID.fun
 * Author: houx
 * Created: March 25, 2009
 ********************************************************************
 * Functions and function blocks of library RFID
 ********************************************************************)

FUNCTION_BLOCK TP_Info (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
	END_VAR
	VAR_OUTPUT
		Busy : BOOL;
		Done : BOOL;
		Error : BOOL;
		ErrorID : UDINT;
		Info : Info;
	END_VAR
	VAR
		Stepstatus : USINT;
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadBufferLength : UINT;
		ReadData : ARRAY[0..255] OF USINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		ID : ARRAY[0..9] OF USINT;
		StackLevel : ARRAY[0..1] OF USINT;
		KeyType : ARRAY[0..3] OF USINT;
		AN : ARRAY[0..2] OF USINT;
		sendbuffer : UDINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_Unlock (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
		Data : UDINT;
	END_VAR
	VAR_OUTPUT
		Busy : BOOL;
		Error : BOOL;
		ErrorID : UDINT;
		Done : BOOL;
	END_VAR
	VAR
		StepType : USINT;
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadBufferLength : UINT;
		ReadData : ARRAY[0..255] OF USINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		string1 : STRING[20];
		string2 : STRING[10];
		CMD : UDINT;
		StepWrite : USINT;
		ERROR : ARRAY[0..2] OF USINT;
		AN : ARRAY[0..2] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
		TypeOK : BOOL;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_Lock (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
	END_VAR
	VAR_OUTPUT
		Busy : BOOL;
		ErrorID : UDINT;
		Error : BOOL;
		Done : BOOL;
	END_VAR
	VAR
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadData : ARRAY[0..255] OF USINT;
		ReadBufferLength : UINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		StepLOCK : USINT;
		AN : ARRAY[0..2] OF USINT;
		ERROR : ARRAY[0..2] OF USINT;
		TypeOK : BOOL;
		StepType : USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbufferlength : UINT;
		sendbuffer : UDINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_PWProtect (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
		Data : UDINT;
	END_VAR
	VAR_OUTPUT
		Busy : BOOL;
		Error : BOOL;
		ErrorID : UDINT;
		Done : BOOL;
	END_VAR
	VAR
		TypeOK : BOOL;
		StepType : USINT;
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadBufferLength : UINT;
		ReadData : ARRAY[0..255] OF USINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		string1 : STRING[20];
		string2 : STRING[20];
		CMD : UDINT;
		StepWrite : USINT;
		AN : ARRAY[0..2] OF USINT;
		ERROR : ARRAY[0..2] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_OnOff (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
		Mode : BOOL;
	END_VAR
	VAR_OUTPUT
		Error : BOOL;
		ErrorID : UDINT;
		Busy : BOOL;
		Done : BOOL;
	END_VAR
	VAR
		StepOnOff : USINT;
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadBufferLength : UINT;
		ReadData : ARRAY[0..255] OF USINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		AN : ARRAY[0..2] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		FrameXOpenStruct : FRM_xopen;
		FRM_close_0 : FRM_close;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_Crc (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		Ident : UDINT;
		Mode : BOOL;
	END_VAR
	VAR_OUTPUT
		Error : BOOL;
		ErrorID : UDINT;
		Busy : BOOL;
		Done : BOOL;
	END_VAR
	VAR
		WriteData : ARRAY[0..255] OF USINT;
		FrameWriteStruct : FRM_write;
		FrameReadStruct : FRM_read;
		ReadBuffer : UDINT;
		ReadData : ARRAY[0..255] OF USINT;
		ReadBufferLength : UINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		status : status;
		StepCRC : USINT;
		AN : ARRAY[0..2] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
		FRM_close_0 : FRM_close;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_Write (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		RegNr : USINT;
		Data : UDINT;
		Ident : UDINT;
	END_VAR
	VAR_OUTPUT
		Busy : BOOL;
		Error : BOOL;
		ErrorID : UDINT;
		Done : BOOL;
	END_VAR
	VAR
		CMD : UDINT;
		WriteData : ARRAY[0..255] OF USINT;
		StepWrite : USINT;
		FrameWriteStruct : FRM_write;
		status : status;
		CommandReady : BOOL;
		ReadBuffer : UDINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		ReadBufferLength : UINT;
		FrameReadStruct : FRM_read;
		ReadData : ARRAY[0..255] OF USINT;
		string1 : STRING[30];
		string2 : STRING[30];
		StepType : USINT;
		TypeOK : BOOL;
		string3 : STRING[10];
		AN : ARRAY[0..2] OF USINT;
		ERROR : ARRAY[0..2] OF USINT;
		KeyType : ARRAY[0..3] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
	END_VAR
END_FUNCTION_BLOCK

FUNCTION_BLOCK TP_Read (*TODO: Add your comment here*)
	VAR_INPUT
		Enable : BOOL; (*Add your parameter comment*)
		RegNr : USINT;
		Ident : UDINT;
	END_VAR
	VAR_OUTPUT
		Done : BOOL;
		Error : BOOL;
		ErrorID : UDINT;
		Busy : BOOL;
		Data : UDINT;
	END_VAR
	VAR
		CommandReady : BOOL;
		WriteData : ARRAY[0..255] OF USINT;
		status : status;
		ReadBuffer : UDINT;
		ReadBufferLength : UINT;
		ReadData : ARRAY[0..255] OF USINT;
		FrameReadStruct : FRM_read;
		data : ARRAY[0..19] OF USINT;
		FrameReleaseBufferStruct : FRM_rbuf;
		FrameWriteStruct : FRM_write;
		TypeOK : BOOL;
		StepType : USINT;
		KeyType : ARRAY[0..3] OF USINT;
		AN : ARRAY[0..2] OF USINT;
		ERROR : ARRAY[0..2] OF USINT;
		FrameGetBufferStruct : FRM_gbuf;
		sendbuffer : UDINT;
		sendbufferlength : UINT;
		FrameReleaseOutputBufferStruct : FRM_robuf;
		FrameXOpenStruct : FRM_xopen;
		StepREAD : USINT;
	END_VAR
END_FUNCTION_BLOCK

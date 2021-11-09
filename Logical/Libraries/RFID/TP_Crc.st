(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_Crc.st
 * Author: houx
 * Created: March 25, 2009
*****************************************************************
;FuB: 			TP_CRC
;*****************************************************************
Discription:
	This FuB can specify whether the transponder reader should check the checksum wenn a command string is received.
	This Fub can work without any Transponder in the range of Reader.
Parameter:
	Input: 	Enable(BOOL)	: The function block is only executed when enable is <> 0.
			Ident(UDINT)	: Interface Ident.
			Mode(BOOL)		: checksum On:Mode=TRUE, checksum Off: Mode:=FALSE;
	Output: Error(BOOL)		: Error = 0 (No Error) Error = 1(see ErrorID).
			ErrorID(UDINT)	: Number and description in error table.
			Busy(BOOL)		: FuB is working on.
			Done(BOOL)		: if TRUE, success.
Author:	Xiaoguang Hou
		B&R Eggelsberg

History: 	V1.00.0 - 02 Sep 2008 first create
				V3.00.0 - 25 Mar 2009  update for serial interface transponder readerand created under AS3.0
;
;******************************************************************

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 

(*TODO: Add your comment here*)
FUNCTION_BLOCK TP_Crc

IF Enable=1 THEN
	IF ((Done = 0) AND (Error = 0)) THEN
		Busy:=TRUE;
		CASE StepCRC OF
(*	------------------------------------------------	open the interface, get the internal Ident	----------------------------------------------------*)
			OPEN:
				FrameXOpenStruct(enable := 1,device := Ident);
				status.XOPEN 			:= FrameXOpenStruct.status;
				IF (status.XOPEN = 0) THEN
					StepCRC             := WRITE ;
					FrameXOpenStruct.enable:=FALSE;
				ELSE
					StepCRC             := OPEN ;
					Error               := TRUE;
					ErrorID             := status.XOPEN;
					Busy                := 0;
				END_IF
			WRITE:
				IF 	(Mode = TRUE) THEN
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('cc,0,1,#01ce$R$L'));
				ELSIF (Mode = FALSE) THEN
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('cc,0,0,#01cd$R$L'));
				END_IF
				FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
				sendbuffer				:= FrameGetBufferStruct.buffer;
				sendbufferlength		:= FrameGetBufferStruct.buflng;
				status.GetBuffer		:= FrameGetBufferStruct.status;
				IF	(status.GetBuffer = 0)	THEN
					memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
					FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer, buflng := strlen(ADR(WriteData)));
					status.WRITE 				:=	FrameWriteStruct.status;

			    	IF (status.WRITE <> 0) THEN
						FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
						status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
						IF	(status.RoBuffer <> 0)	THEN
							ErrorID:=status.RoBuffer;
						END_IF
					ELSE
			   			FrameWriteStruct.enable := 0;
						FrameGetBufferStruct.enable	:= 0;
						FrameReleaseOutputBufferStruct.enable := 0; 	
						StepCRC					:= READ;
					END_IF
				ELSE
					ErrorID 	:= status.GetBuffer;
					Error   	:= 1;
					Busy    	:= 0;
					StepCRC		:= OPEN;
					FrameGetBufferStruct.enable	:= 0;
				END_IF

		    READ:
			    FrameReadStruct(enable := 1,ident:=FrameXOpenStruct.ident);
				ReadBuffer			:= FrameReadStruct.buffer;
				ReadBufferLength	:= FrameReadStruct.buflng;
				status.READ			:= FrameReadStruct.status;
				IF  (status.READ = 0) THEN
					memset(ADR(ReadData),0,SIZEOF(ReadData));
					memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);                   (* copy read data into read buffer *)
					FrameReadStruct.enable 	:= 0;
			        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);        (* release read buffer *)
			        status.ReleaseBuffer	:= FrameReleaseBufferStruct.status;
			        IF (status.ReleaseBuffer=0) THEN
				        FrameReleaseBufferStruct.enable	:=0;
		        		AN[0]	:= ReadData[0];
						AN[1]	:= ReadData[1];
						AN[2]	:= ReadData[2];
						IF (memcmp(ADR(AN),ADR('ack'),3) = 0) THEN
							StepCRC   := CLOSE;
						ELSE
							StepCRC   := OPEN;
							Error     := 1;
							ErrorID   := rfidError_crc_failed; (*	negativ answer *)
							Busy      := 0;
						END_IF
					ELSE
							StepCRC   := OPEN;
							Error     := 1;
							ErrorID   := status.ReleaseBuffer;
							Busy      := 0;
			        END_IF
				ELSE
					memset(ADR(ReadData),0,SIZEOF(ReadData));
				END_IF
			CLOSE:
				FRM_close_0(enable :=1 , ident :=FrameXOpenStruct.ident);
				IF FRM_close_0.status=FALSE  THEN
					Done      := 1;
					Busy      := 0;
					StepCRC   := OPEN;
				END_IF					
		END_CASE
	END_IF
ELSE
	Error   := 0;
	ErrorID := 0;
	Busy    := 0;
	Done    := 0;
END_IF

END_FUNCTION_BLOCK

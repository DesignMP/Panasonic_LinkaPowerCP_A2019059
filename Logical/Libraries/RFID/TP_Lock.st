(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_Lock.st
 * Author: houx
 * Created: March 25, 2009
 *****************************************************************
;FuB: 			TP_Lock
;*****************************************************************
Discription:
	If a password-protected transponder was opened with the TP_Unlock, it can be locked again with this FuB
	From this point on, password-protected areas can no longer be edited.
	if the transponder is removed from the reading range of the transponder reader, then it is locked automatically.
Parameter:
	Input:
		Enable(BOOL)	: The function block is only executed when enable is <> 0
	Output:
		Error(BOOL)		: Error = 0 (No Error) Error = 1(see ErrorID)
		ErrorID(UDINT)	: Number and Description in Error Table
		Busy(BOOL)		: Fub working on
		Ident(UDINT)	: Interface ID
		Done(BOOL)		: success, if TRUE
;Author:	Xiaoguang Hou
;			B&R Eggelsberg
;
;History:	V1.00.0 - 02 Sep 2008 : first create
				V3.00.0 - 25 Mar 2009 : update for serial interface transponder and created under AS3.0
;
;******************************************************************

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 
(*TODO: Add your comment here*)
FUNCTION_BLOCK TP_Lock

IF Enable = TRUE THEN
	IF ((Done = 0) AND (Error = 0)) THEN
		Busy:=TRUE;
		IF TypeOK = FALSE THEN
			CASE StepType OF
(*	------------------------------------------------	open the interface, get the internal Ident	----------------------------------------------------*)
				OPEN:
					FrameXOpenStruct(enable := 1,device := Ident);
					status.XOPEN 			:= FrameXOpenStruct.status;
					IF (status.XOPEN = 0) THEN
						StepType            := WRITE ;
					ELSE
						StepType            := OPEN ;
						Error               := TRUE;
						ErrorID             := status.XOPEN;
						Busy                := 0;
					END_IF
				WRITE:
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('tag,0,0,#crc$R$L'));
					FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
					sendbuffer				:= FrameGetBufferStruct.buffer;
					sendbufferlength		:= FrameGetBufferStruct.buflng;
					status.GetBuffer		:= FrameGetBufferStruct.status;
					IF	(status.GetBuffer = 0)	THEN
						memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
						FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
						status.WRITE 				:=	FrameWriteStruct.status;
					    StepType              		:=	READ;
					    IF (status.WRITE <> 0) THEN
							FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
							status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
							IF	(status.RoBuffer <> 0)	THEN
								ErrorID   	:= status.RoBuffer;
							END_IF
						END_IF
						FrameWriteStruct.enable := 0;
						FrameGetBufferStruct.enable	:= 0;
						FrameReleaseOutputBufferStruct.enable := 0;
					ELSE
						ErrorID 	:= status.GetBuffer;
						Error   	:= 1;
						Busy    	:= 0;
						StepType	:= OPEN;
						TypeOK		:= FALSE;
						FrameGetBufferStruct.enable	:= 0;
					END_IF
				READ:
					FrameReadStruct(enable:=1,ident:=FrameXOpenStruct.ident);
					ReadBuffer       	:=	FrameReadStruct.buffer;
					ReadBufferLength	:=	FrameReadStruct.buflng;
					status.READ      	:=	FrameReadStruct.status;
					IF  (status.READ = 0) THEN
						memset(ADR(ReadData),0,SIZEOF(ReadData));
						memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);                   (* copy read data into read buffer *)
						FrameReadStruct.enable	:= 0;
				        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);        (* release read buffer *)
				        status.ReleaseBuffer	:=FrameReleaseBufferStruct.status;
				        IF (status.ReleaseBuffer=0) THEN
					        FrameReleaseBufferStruct.enable:=0;
							AN[0]	:= ReadData[0];
							AN[1]	:= ReadData[1];
							AN[2]	:= ReadData[2];
							IF (memcmp(ADR(AN),ADR('ack'),3) = 0) THEN
								IF (memcmp(ADR(ReadData),ADR('ack,0,4150,#02d0$R$L'),SIZEOF('ack,0,4150,#02d0$R$L')) = 0) THEN
									StepType	:=	OPEN;
									TypeOK		:=	TRUE;
									StepLOCK	:=	WRITE;
								ELSE
									StepType	:= 	OPEN;
									ErrorID		:=	rfidError_lock_wrongType;          (*  hier ein Error difinieren soll  *)
									Error   	:=	1;
									Busy    	:=	0;
									TypeOK		:=	FALSE;
								END_IF
							ELSE
								StepType	:= 	OPEN;
								ErrorID		:=	rfidError_lock_failed;          (*  hier ein Error difinieren soll  *)
								Error   	:=	1;
								Busy    	:=	0;
								TypeOK		:=	FALSE;
							END_IF
						ELSE
							StepType	:=	OPEN;
							Error     	:=	1;
							ErrorID   	:=	status.ReleaseBuffer;
							Busy      	:=	0;
							TypeOK		:=	FALSE;
						END_IF
					ELSE
						memset(ADR(ReadData),0,SIZEOF(ReadData));
					END_IF
			END_CASE
		END_IF
		IF TypeOK = TRUE THEN
			CASE StepLOCK OF
				WRITE:
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('re,0,#crc$R$L'));
					FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
					sendbuffer				:= FrameGetBufferStruct.buffer;
					sendbufferlength		:= FrameGetBufferStruct.buflng;
					status.GetBuffer		:= FrameGetBufferStruct.status;
					IF	(status.GetBuffer = 0)	THEN
						memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
						FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
						status.WRITE 				:=	FrameWriteStruct.status;
					   	StepLOCK              		:=	READ;
					    IF (status.WRITE <> 0) THEN
							FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= sendbufferlength);
							status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
							IF	(status.RoBuffer <> 0)	THEN
								ErrorID   	:= status.RoBuffer;
							END_IF
						END_IF
						FrameWriteStruct.enable := 0;
						FrameGetBufferStruct.enable	:= 0;
						FrameReleaseOutputBufferStruct.enable := 0;
					ELSE
						ErrorID 	:= status.GetBuffer;
						Error   	:= 1;
						Busy    	:= 0;
						StepLOCK	:= WRITE;
						TypeOK		:= FALSE;
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
						    FrameReleaseBufferStruct.enable	:= 0;
							AN[0]	:= ReadData[0];
							AN[1]	:= ReadData[1];
							AN[2]	:= ReadData[2];
							IF (memcmp(ADR(AN),ADR('ack'),3)) = 0 THEN
								StepLOCK  := WRITE;
								Done      := 1;
								Busy      := 0;
								TypeOK	  := FALSE;
							ELSIF	(memcmp(ADR(AN),ADR('nak'),3)) = 0 THEN
								ERROR[0]	:=	ReadData[6];
								ERROR[1]	:=	ReadData[7];
								ERROR[2]	:=	ReadData[8];
								Error		:=	1;
								ErrorID		:=	atoi(ADR(ERROR)) ;
								Busy		:=	0;
								TypeOK		:=	FALSE;
								StepLOCK	:=	WRITE;
							ELSE
								StepLOCK  := WRITE;
								Error     := 1;
								ErrorID   := rfidError_lock_failed; (* unknow answer *)
								Busy      := 0;
								TypeOK	  := FALSE;
							END_IF
						ELSE
							StepLOCK  := WRITE;
							Error     := 1;
							ErrorID   := status.ReleaseBuffer;
							Busy      := 0;
							TypeOK	  := FALSE;
					    END_IF
					ELSE
						memset(ADR(ReadData),0,SIZEOF(ReadData));
					END_IF
			END_CASE
		END_IF
	END_IF
ELSE
	Busy 	:= 0;
	ErrorID := 0;
	Error 	:= 0;
	Done 	:= 0;
END_IF
END_FUNCTION_BLOCK

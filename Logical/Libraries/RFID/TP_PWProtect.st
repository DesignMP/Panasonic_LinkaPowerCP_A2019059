(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_PWProtect.st
 * Author: houx
 * Created: March 25, 2009
 *****************************************************************
;FuB: 			TP_PWProtect
;*****************************************************************
Discription:
	This FuB is used to write the password
	before a new password can be written, a valid TP_Unlock must be done.
Parameter:
	Input:
		Enable(BOOL)	:The function block is only executed when enable is <> 0
		Data(UDINT)		:Pointer to Password. whick should be write in transponder.
	Output:
		Error(BOOL)		:Error = 0 (No Error) Error = 1(see ErrorID)
		ErrorID(UDINT)	:Number and Description in Error Table
		Busy(BOOL)		:Fub working on
		Done			:success, if TRUE
;Author:	Xiaoguang Hou
;			B&R Eggelsberg
;
;History: 	V1.00.0 - 02 Sep 2008 first create
				V3.00.0 - 25 Mar 2009  update for serial interface transponder reader and created under AS3.0
;
;******************************************************************

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 

(*TODO: Add your comment here*)
FUNCTION_BLOCK TP_PWProtect

IF	(Enable	=	1)	THEN
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
								ErrorID	:=	status.RoBuffer;
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
							IF (memcmp(ADR(ReadData),ADR('ack,0,4150,#02d0$R$L'),SIZEOF('ack,0,4150,#02d0$R$L')) = 0) THEN
								StepType	:=	OPEN;
								TypeOK		:=	TRUE;
								StepWrite	:=	WRITE;
							ELSE
								StepType	:= 	OPEN;
								ErrorID		:=	rfidError_password_wrongType;         (*   hier ein Error difinieren soll  *)
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
		IF	(TypeOK	= TRUE)	THEN
			string1	:=	'wp,0,';
			string2	:=	',#crc$R$L';
			CMD		:=	strcat(ADR(string1),Data);
			CMD		:=	strcat(ADR(string1),ADR(string2));
			memset(ADR(WriteData),0,SIZEOF(WriteData));
			memcpy(ADR(WriteData),ADR(string1),SIZEOF(string1));
			CASE StepWrite OF
				WRITE:
					FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
					sendbuffer				:= FrameGetBufferStruct.buffer;
					sendbufferlength		:= FrameGetBufferStruct.buflng;
					status.GetBuffer		:= FrameGetBufferStruct.status;
					IF	(status.GetBuffer = 0)	THEN
						memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
						FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
						status.WRITE 				:=	FrameWriteStruct.status;
					    StepWrite              		:=	READ;
					    IF (status.WRITE <> 0) THEN
							FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:=strlen(ADR(WriteData)) );
							status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
							IF	(status.RoBuffer <> 0)	THEN
								ErrorID	:=	status.RoBuffer;
							END_IF
						END_IF
						FrameWriteStruct.enable := 0;
						FrameGetBufferStruct.enable	:= 0;
						FrameReleaseOutputBufferStruct.enable := 0;
					ELSE
						ErrorID 	:= status.GetBuffer;
						Error   	:= 1;
						Busy    	:= 0;
						StepWrite	:= WRITE;
						TypeOK		:= FALSE;
						FrameGetBufferStruct.enable	:= 0;
					END_IF

			    READ:
				    FrameReadStruct(enable := 1,ident:=FrameXOpenStruct.ident);
					ReadBuffer			:=	FrameReadStruct.buffer;
					ReadBufferLength	:=	FrameReadStruct.buflng;
					status.READ			:=	FrameReadStruct.status;
					IF  (status.READ = 0)  THEN
						memset(ADR(ReadData),0,SIZEOF(ReadData));
						memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);
						FrameReadStruct.enable := 0;
				        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);
				        status.ReleaseBuffer	:=	FrameReleaseBufferStruct.status;
				        IF status.ReleaseBuffer=0 THEN
							FrameReleaseBufferStruct.enable:=0;
							memset(ADR(AN),0,SIZEOF(AN));
							AN[0]	:= ReadData[0];
							AN[1]	:= ReadData[1];
							AN[2]	:= ReadData[2];
							IF (memcmp(ADR(AN),ADR('ack'),3)) = 0 THEN
								StepWrite		:=	WRITE;
							 	Busy			:=	0;
							 	Done			:=	1;
								TypeOK			:=	FALSE;
							ELSIF	(memcmp(ADR(AN),ADR('nak'),3)) = 0 THEN
								ERROR[0]	:=	ReadData[6];
								ERROR[1]	:=	ReadData[7];
								ERROR[2]	:=	ReadData[8];
								Error			:=	1;
								ErrorID			:=	atoi(ADR(ERROR)) ;
								Busy			:=	0;
								TypeOK			:=	FALSE;
								StepWrite		:=	WRITE;
							ELSE
								Error			:=	1;
								ErrorID			:=	rfidError_password_failed ;
								Busy			:=	0;
								TypeOK			:=	FALSE;
								StepWrite		:=	WRITE;
							END_IF
						ELSE
							Error			:=	1;
							ErrorID			:=	status.ReleaseBuffer ;
							Busy			:=	0;
							TypeOK			:=	FALSE;
							StepWrite		:=	WRITE;
					    END_IF
					ELSE
						memset(ADR(ReadData),0,SIZEOF(ReadData));
					END_IF
			END_CASE
		END_IF
	END_IF
ELSE
	Busy	:=	0;
	Error	:=	0;
	ErrorID	:=	0;
	Done	:=	0;
END_IF
END_FUNCTION_BLOCK

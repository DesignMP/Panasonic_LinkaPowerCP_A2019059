(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_Info.st
 * Author: houx
 * Created: March 25, 2009
*****************************************************************
FuB: 			TP_Info
;*****************************************************************
Discription:
	This FuB can be used to output the Transponder Type, the stack lever and HW/SW	versions.
	This Fub can only work, if any Transponder in the range of Reader.
	Type			: 4150 R/W or 4102 R
	Stack level		: stack level in transponder memory
	HW/SW version	:	guarantees that your application software is being operated with the correct readers.
Parameter:
			Input: 		Enable(BOOL)	:	The function block is only executed when enable is <> 0
				   			Ident(UDINT)	:	Interface Ident from TP_Init.
			Output: 	Error(BOOL)		:	Error = 0 (No Error) Error = 1(see ErrorID)
							ErrorID(UDINT)	:	Number and Description in Error Table
							Busy(BOOL)		:	if TRUE , Fub working on.
							Done(BOOL)		:	if TRUE, success
							Info(Info)		:	Structure with Type, ID and Stacklevel.
Author:				Xiaoguang Hou
							B&R Eggelsberg
;History:	V1.00.0 - 02 Sep 2008 : first create
				V3.00.0 - 25 Mar 2009 : update for serial interface transponder and created under AS3.0
 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 

FUNCTION_BLOCK TP_Info
(*--------------------------------------	start	----------------------------*)
IF (Enable = 1) THEN
	IF ((Done = 0) AND (Error = 0)) THEN
		Busy	:=	TRUE;
		CASE Stepstatus OF
(*	------------------------------------------------	open the interface, get the internal Ident	----------------------------------------------------*)
			OPEN:
				FrameXOpenStruct(enable := 1,device := Ident);
				status.XOPEN 			:= FrameXOpenStruct.status;
				IF (status.XOPEN = 0) THEN
					Stepstatus          := TYPEWRITE ;
					FrameXOpenStruct.enable := FALSE;
				ELSE
					Stepstatus          := OPEN ;
					Error               := TRUE;
					ErrorID             := status.XOPEN;
					Busy                := 0;
				END_IF
			TYPEWRITE:
				memset(ADR(WriteData),0,SIZEOF(WriteData));
				strcpy(ADR(WriteData),ADR('tag,0,0,#crc$R$L'));
				FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
				sendbuffer					:= FrameGetBufferStruct.buffer;
				sendbufferlength		:= FrameGetBufferStruct.buflng;
				status.GetBuffer		:= FrameGetBufferStruct.status;
				IF	(status.GetBuffer = 0)	THEN
					memcpy(sendbuffer,ADR(WriteData),sendbufferlength);					
					FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
					status.WRITE 			:=	FrameWriteStruct.status;
				  	IF (status.WRITE <> 0) THEN
						FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:=strlen(ADR(WriteData)) );
						status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
					ELSE
				    	FrameGetBufferStruct.enable	:= 0;
						FrameWriteStruct.enable := 0;
						FrameReleaseOutputBufferStruct.enable := 0;			
						Stepstatus              :=	TYPEREAD;			
					END_IF
				ELSE
					ErrorID 	:= status.GetBuffer;
					Error   	:= 1;
					Busy    	:= 0;
					FrameGetBufferStruct.enable	:= 0;
					Stepstatus	:= OPEN;
				END_IF
			TYPEREAD:
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
						AN[0]		 :=	ReadData[0];
						AN[1]		 := ReadData[1];
						AN[2]		 := ReadData[2];
						IF	(memcmp(ADR(AN),ADR('ack'),3) = 0)	THEN
							memset(ADR(KeyType),0,SIZEOF(KeyType));
							KeyType[0]   	 := ReadData[6];
							KeyType[1] 	 := ReadData[7];
							KeyType[2] 	 := ReadData[8];
							KeyType[3] 	 := ReadData[9];
							IF (memcmp(ADR(KeyType),ADR('4150'),4) = 0) THEN
								Info.Type	:=	ADR(KeyType);
								Stepstatus	:=	IDWRITE;
							ELSIF	(memcmp(ADR(KeyType),ADR('4102'),4) = 0) THEN
								Info.Type	:=	ADR(KeyType);
								Stepstatus	:=	IDWRITE;
							ELSE
								Stepstatus	:= OPEN;
								ErrorID	:=	rfidError_tag_failed; (* unknow type of transponder *)
								Error   :=	1;
								Busy    :=	0;
							END_IF
						ELSIF	(memcmp(ADR(AN),ADR('nak'),3) = 0)	THEN
							Stepstatus	:= OPEN;
							ErrorID	:=	rfidError_tag_failed; (* negativ answer *)
							Error   :=	1;
							Busy    :=	0;
						ELSE
							Stepstatus	:= OPEN;
							ErrorID	:=	rfidError_tag_failed; (* unknow answer *)
							Error   :=	1;
							Busy    :=	0;
						END_IF
					ELSE
						Stepstatus	:=	OPEN;
						Error     	:=	1;
						ErrorID   	:=	status.ReleaseBuffer;
						Busy      	:=	0;
					END_IF
				ELSE
					memset(ADR(ReadData),0,SIZEOF(ReadData));
				END_IF
			IDWRITE:
				memset(ADR(WriteData),0,SIZEOF(WriteData));
				strcpy(ADR(WriteData),ADR('id,0,#crc$R$L'));
				FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
				sendbuffer				    := FrameGetBufferStruct.buffer;
				sendbufferlength		:= FrameGetBufferStruct.buflng;
				status.GetBuffer		:= FrameGetBufferStruct.status;
				IF	(status.GetBuffer = 0)	THEN
					memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
					FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
					status.WRITE 			:=	FrameWriteStruct.status;

			        IF (status.WRITE <> 0) THEN
						FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
						status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
						IF	(status.RoBuffer <> 0)	THEN
							ErrorID	:= status.RoBuffer;
						END_IF
					ELSE
			        	FrameWriteStruct.enable := 0;
						FrameGetBufferStruct.enable	:= 0;
						FrameReleaseOutputBufferStruct.enable := 0;
						Stepstatus              :=	IDREAD;	
					END_IF
				ELSE
					ErrorID 	:= status.GetBuffer;
					Error   	:= 1;
					Busy    	:= 0;
					Stepstatus	:= OPEN;
					FrameGetBufferStruct.enable	:= 0;
				END_IF

			IDREAD:
				FrameReadStruct(enable:=1,ident:=FrameXOpenStruct.ident);
				ReadBuffer       	:=	FrameReadStruct.buffer;
				ReadBufferLength	:=	FrameReadStruct.buflng;
				status.READ      	:=	FrameReadStruct.status;
				IF  (status.READ = 0) THEN
					memset(ADR(ReadData),0,SIZEOF(ReadData));
					memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);                   (* copy read data into read buffer *)
					FrameReadStruct.enable	:=	0;
			        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);        (* release read buffer *)
			        status.ReleaseBuffer	:=	FrameReleaseBufferStruct.status;
			        IF (status.ReleaseBuffer=0) THEN
				        FrameReleaseBufferStruct.enable	:=	0;
				        AN[0]	:= ReadData[0];
						AN[1]	:= ReadData[1];
						AN[2]	:= ReadData[2];
				        IF	(memcmp(ADR(AN),ADR('ack'),3) = 0) THEN
				        	memset(ADR(ID),0,SIZEOF(ID));
							ID[0] 	 	:=	ReadData[6];
							ID[1] 	 	:=	ReadData[7];
							ID[2] 	 	:=	ReadData[8];
							ID[3] 	 	:=	ReadData[9];
							ID[4] 	 	:=	ReadData[11];
							ID[5] 	 	:=	ReadData[12];
							ID[6] 	 	:=	ReadData[13];
							ID[7] 	 	:=	ReadData[14];
							Info.ID   	:=	ADR(ID);
							Stepstatus  :=	STACKWRITE;
						ELSE
							Stepstatus	:= OPEN;
							Error     	:= 1;
							ErrorID   	:= rfidError_id_failed;	(* negativ answer by ask for ID *)
							Busy      	:= 0;
						END_IF
					ELSE
						Stepstatus	:= OPEN;
						Error     	:= 1;
						ErrorID   	:= status.ReleaseBuffer;
						Busy      	:= 0;
					END_IF
				ELSE
					memset(ADR(ReadData),0,SIZEOF(ReadData));
				END_IF
			STACKWRITE:
				memset(ADR(WriteData),0,SIZEOF(WriteData));
				strcpy(ADR(WriteData),ADR('stack,0,#crc$R$L'),);
				FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
				sendbuffer				:= FrameGetBufferStruct.buffer;
				sendbufferlength		:= FrameGetBufferStruct.buflng;
				status.GetBuffer		:= FrameGetBufferStruct.status;
				IF	(status.GetBuffer = 0)	THEN
					memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
					FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
					status.WRITE 		:=	FrameWriteStruct.status;
			        Stepstatus          :=	STACKREAD;
			        IF (status.WRITE <> 0) THEN
						FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
						status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
						IF	(status.RoBuffer <> 0)	THEN
							ErrorID	:= status.RoBuffer;
						END_IF
					END_IF
					FrameWriteStruct.enable :=	0;
					FrameGetBufferStruct.enable	:= 0;
					FrameReleaseOutputBufferStruct.enable := 0;
				ELSE
					ErrorID 	:= status.GetBuffer;
					Error   	:= 1;
					Busy    	:= 0;
					Stepstatus	:= OPEN;
					FrameGetBufferStruct.enable	:= 0;
				END_IF
			STACKREAD:
				FrameReadStruct(enable:=1,ident:=FrameXOpenStruct.ident);
				ReadBuffer       	:=	FrameReadStruct.buffer;
				ReadBufferLength	:=	FrameReadStruct.buflng;
				status.READ      	:=	FrameReadStruct.status;
				IF  (status.READ = 0) THEN
					memset(ADR(ReadData),0,SIZEOF(ReadData));
					memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);                   (* copy read data into read buffer *)
					FrameReadStruct.enable	:=	0;
			        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);        (* release read buffer *)
			        status.ReleaseBuffer	:=	FrameReleaseBufferStruct.status;
			        IF (status.ReleaseBuffer = 0) THEN
				        FrameReleaseBufferStruct.enable	:=	0;
				        AN[0]	:= ReadData[0];
						AN[1]	:= ReadData[1];
						AN[2]	:= ReadData[2];
				        IF	(memcmp(ADR(AN),ADR('ack'),3) = 0) THEN
							memset(ADR(StackLevel),0,SIZEOF(StackLevel));
							StackLevel[0] 	  :=	ReadData[6];
							StackLevel[1] 	  :=	ReadData[7];
							Info.StackLevel :=	ADR(StackLevel);
							Stepstatus		  :=	OPEN;
							Done			  :=	1;
							Busy			  :=	0;
						ELSE
							Stepstatus	:=	OPEN;
							Error     	:=	1;
							ErrorID   	:=	rfidError_stacklevel_failed;
							Busy      	:=	0;
						END_IF
					ELSE
						Stepstatus	:=	OPEN;
						Error     	:=	1;
						ErrorID   	:=	status.ReleaseBuffer;
						Busy      	:=	0;
					END_IF
				ELSE
					memset(ADR(ReadData),0,SIZEOF(ReadData));
				END_IF
		END_CASE
	END_IF
ELSE
	Busy    := 0;
	Error   := 0;
	ErrorID := 0;
	Done    := 0;
END_IF
END_FUNCTION_BLOCK

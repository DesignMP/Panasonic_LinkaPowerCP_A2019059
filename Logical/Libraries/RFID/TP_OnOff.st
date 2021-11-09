(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_OnOff.st
 * Author: houx
 * Created: March 25, 2009
 *****************************************************************
;FuB: 			TP_OnOff
;*****************************************************************
Discription:
	This FuB turn the 125 kHz carrier frequency of the Transponder reader/writer On/Off.
	This Fub can work without any Transponder in the range of Reader.
	Standard Configuration is frequency on.
	Be aware that no Transponder key can be read if frequency is turned off.
Parameter:
	Input:
		Enable(BOOL)	:	The function block is only executed when enable is <> 0
		Ident(UDINT)	:	Interface Ident from TP_Init.
   		Mode(BOOL)		:	frequency On:Mode=TRUE, frequency Off: Mode:=FALSE;
	Output:
		Error(BOOL)		:	Error = 0 (No Error) Error = 1(see ErrorID)
		ErrorID(UDINT)	:	Number and Description in Error Table
		Busy(BOOL)		:	if TRUE , Fub working on.
		Done(BOOL) 		:	if TRUE, success
Author:	Xiaoguang Hou
		B&R Eggelsberg

History: 	V1.00.0 - 02 Sep 2008 first create
				V3.00.0 - 25 Mar 2009  update for serial interface transponder reader and created under AS3.0

;******************************************************************

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 

(*TODO: Add your comment here*)
FUNCTION_BLOCK TP_OnOff

(*------------------------------------	Start	--------------------------------*)
IF Enable=1 THEN
	IF ((Done = 0) AND (Error = 0)) THEN
		Busy:=TRUE;
		CASE StepOnOff OF
(*	------------------------------------------------	open the interface, get the internal Ident	----------------------------------------------------*)
			OPEN:			
				FrameXOpenStruct(enable := TRUE,device := Ident);
				status.XOPEN 			:= FrameXOpenStruct.status;
				IF (status.XOPEN = 0) THEN
					StepOnOff               := WRITE ;
					FrameXOpenStruct.enable:=FALSE;
				ELSE
					StepOnOff               := OPEN ;
					Error                   := TRUE;
					ErrorID                 := status.XOPEN;
					Busy                    := FALSE;
				END_IF

			WRITE:						(*------	write RF Command to	Reader	---------*)
				IF (Mode = TRUE) THEN
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('rf,0,1,#crc$R$L'));
				ELSIF	(Mode = FALSE)	THEN
					memset(ADR(WriteData),0,SIZEOF(WriteData));
					strcpy(ADR(WriteData),ADR('rf,0,0,#crc$R$L'));
				END_IF
				(*------	get sendbuffer	---------*)
				FrameGetBufferStruct(enable:= TRUE, ident:= FrameXOpenStruct.ident);
				sendbuffer				:= FrameGetBufferStruct.buffer;
				sendbufferlength		:= FrameGetBufferStruct.buflng;
				status.GetBuffer		:= FrameGetBufferStruct.status;
				IF	(status.GetBuffer = 0)	THEN							 (*------	no error	---------*)
					memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
					FrameWriteStruct(enable := TRUE, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng :=strlen(ADR(WriteData)) );
					status.WRITE 				:=	FrameWriteStruct.status;
			        IF (status.WRITE <> 0) THEN
						FrameReleaseOutputBufferStruct(enable:=TRUE,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
						status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
						IF	(status.RoBuffer <> 0)	THEN
							ErrorID	:=	status.RoBuffer;
						END_IF
					ELSE
			        	StepOnOff              		:=	READ;
						FrameWriteStruct.enable := FALSE;
						FrameGetBufferStruct.enable	:= FALSE;
						FrameReleaseOutputBufferStruct.enable := FALSE;
					END_IF
				(*------	if get sendbuffer error	---------*)
				ELSE
					ErrorID 	:= status.GetBuffer;
					Error   	:= TRUE;
					Busy    	:= FALSE;
					StepOnOff	:= OPEN;
					FrameGetBufferStruct.enable	:= FALSE;
				END_IF
				
	    	READ:						(*	read out the feedback	*)
			    FrameReadStruct(enable := 1,ident:=FrameXOpenStruct.ident);
				ReadBuffer				:=FrameReadStruct.buffer;
				ReadBufferLength		:=FrameReadStruct.buflng;
				status.READ				:=FrameReadStruct.status;
				IF  (status.READ = 0) THEN
					memset(ADR(ReadData),0,SIZEOF(ReadData));
					memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);	(*	copy the answer	out in ReadData	*)
					FrameReadStruct.enable := 0;
			        FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);	(*	release the buffer	*)
			        status.ReleaseBuffer   := FrameReleaseBufferStruct.status;
			        IF (status.ReleaseBuffer=0) THEN
			        	FrameReleaseBufferStruct.enable	:= 0;
			        	AN[0]	:= ReadData[0];
						AN[1]	:= ReadData[1];
						AN[2]	:= ReadData[2];
						IF (memcmp(ADR(AN),ADR('ack'),3) = 0) THEN				(*--- positiv answer ----*)
							StepOnOff   := CLOSE;
						ELSE
							StepOnOff   := OPEN;								(*	negativ answer or unknow answer	*)
							Error     	:= 1;
							ErrorID   	:= rfidError_rf_failed;
							Busy      	:= 0;
						END_IF
					ELSE														(*	if buffer release error	*)
							StepOnOff   := OPEN;
							Error     	:= 1;
							ErrorID   	:= status.ReleaseBuffer;
							Busy     	:= 0;
			        END_IF
				ELSE
					memset(ADR(ReadData),0,SIZEOF(ReadData));
				END_IF
			CLOSE:
				FRM_close_0(enable :=1 , ident :=FrameXOpenStruct.ident);		
				IF FRM_close_0.status=FALSE THEN	
					Done      	:= 1;
					Busy      	:= 0;
					StepOnOff:=OPEN;
				END_IF
		END_CASE
	END_IF
ELSE                                          (*------- if enable = False ,then all output variable back to zero -------*)
	Error:=0;
	ErrorID:=0;
	Busy:=0;
	Done:=0;
END_IF
END_FUNCTION_BLOCK

(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_Init.st
 * Author: houx
 * Created: March 25, 2009
 *****************************************************************
FuB: 			TP_Init
*****************************************************************
Discription:
	USB Interface:	This FuB find the Transponder Reader(USB) in the Target and read out the Interface Ident.
								Interface Ident ist required for all other FuBs in RFID Library.
								This FuB can work without any transponder in the range of Reader.
	serial Interface:	This FuB is not used to find a serial interface transponder reader
Parameter:
	Input:
		Enable(BOOL)	: The function block is only executed when enable is <> 0
	Output:
		Error(BOOL)		: Error = 0 (No Error) Error = 1(see ErrorID)
		ErrorID(UDINT)	: Number and Description in Error Table
		Busy(BOOL)		: Fub working on
		Ident(UDINT)	: Interface ID
		Done(BOOL)		: success, if TRUE
Author:	Xiaoguang Hou
		B&R Eggelsberg

History: 	V1.00.0 - 02 Sep 2008 first create				
				V3.00.0 - 25 Mar 2009  update for serial interface transponder reader and created under AS3.0

*****************************************************************

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 


FUNCTION_BLOCK TP_Init

(*------------------------------------------------------	Start	---------------------------------------------------------*)
IF Enable = TRUE THEN
	IF (Done = FALSE) AND (Error = FALSE) THEN
		Busy	:=	TRUE;
		CASE StepInit OF
	(*	------------------------------------------------	search usb device	---------------------------------------------*)
			SEARCHTPLIST :
				USBNodeListGetFuB(enable := TRUE,pBuffer := ADR(usbNodeList),bufferSize := SIZEOF(usbNodeList));
				status.GetUsbList				:=USBNodeListGetFuB.status;
				IF status.GetUsbList = 0  THEN
					StepInit					:=SEARCHTP;
					USBNodeListGetFuB.enable 	:= FALSE;
				END_IF
	(*	------------------------------------------------	if Error ?show ErrorID	----------------------------------------------------*)
				IF (status.GetUsbList <> 0) AND (status.GetUsbList <> 65535) THEN
					StepInit 	:= SEARCHTPLIST;
					Error		:= TRUE;
					Busy		:= FALSE;
					ErrorID		:= status.GetUsbList;
				END_IF
	(*	----------------------------------------------- usb device identizification , a Transponder ? get the deviceID----------------------*)
			SEARCHTP:
				USBNodeGetFuB(enable := TRUE,nodeId := usbNodeList[i],pBuffer := ADR(usbDevice[i]),bufferSize :=256 (*SIZEOF(usbDevice)*));
				status.GetUsbNode := USBNodeGetFuB.status;
				IF  status.GetUsbNode = 0 THEN
					IF	(usbDevice[i].vendorId = TRANSPONDER_VENDOR_ID) AND (usbDevice[i].productId = TRANSPONDER_PRODUCT_ID) AND (usbDevice[i].bcdDevice = TRANSPONDER_BCD) THEN
						strcpy(ADR(StringDevice[i]),ADR(usbDevice[i].ifName));
						Ident[i]				:= ADR(StringDevice[i]);
						Done                    := TRUE;
						Busy                    := FALSE;
						USBNodeGetFuB.enable 	:= FALSE;
						i						:= i+1;
						IF i= USBNodeListGetFuB.listNodes THEN
							i           	        := 0;
							StepInit				:= SEARCHTPLIST;
						END_IF		
					ELSE
						i						:= i+1;
					END_IF
				ELSIF status.GetUsbNode = 65535 THEN	
					StepInit				:=SEARCHTP;
				ELSE	
					StepInit :=  SEARCHTPLIST;
					Error 	 :=  TRUE;
					Busy     :=  FALSE;
					ErrorID  :=  status.GetUsbNode;
				END_IF
		END_CASE
	END_IF
	(*	------------------------------------------------	Not Enable, set parameters FALSE	----------------------------------------------------*)
ELSE
	Busy	:=	FALSE;
	Error	:=	FALSE;
	Done	:=	FALSE;
	ErrorID	:=	FALSE;
END_IF
(*	------------------------------------------------	end	----------------------------------------------------*)
END_FUNCTION_BLOCK

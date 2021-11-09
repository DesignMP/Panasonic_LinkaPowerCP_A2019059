(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: TP_Read.st
 * Author: houx
 * Created: March 25, 2009
 *****************************************************************
;FuB: 			TP_Read
;*****************************************************************
Discription:
	This FuB is used to read the registers of the transponder.
	for this to work, the transponder must not be password-protected or a valid TP_unlock needs to be performed beforehand.
Parameter:
	Input:
		Enable(BOOL)	: The function block is only executed when enable is <> 0
		RegNr(USINT)	: Number of the register, which should be read out
	Output:
		Error(BOOL)		: Error = 0 (No Error) Error = 1(see ErrorID)
		ErrorID(BOOL)	: Number and Description in Error Table
		Busy(BOOL)		: Fub working on
		Data(BOOL)		: pointer to output Data.
		Done(BOOL)		: success, if TRUE
Author:	Xiaoguang Hou
		B&R Eggelsberg

History: 	V1.00.0 - 02 Sep 2008 first create
				V3.00.0 - 25 Mar 2009  update for serial interface transponder reader and created under AS3.0

 ********************************************************************
 * Implementation of library RFID
 ********************************************************************) 

(*TODO: Add your comment here*)
FUNCTION_BLOCK TP_Read

    IF Enable = TRUE THEN
        IF ((Done = 0) AND (Error = 0)) THEN
            Busy:=TRUE;
            IF (TypeOK = FALSE) THEN
                CASE StepType OF
                    (*	------------------------------------------------	open the interface, get the internal Ident	----------------------------------------------------*)
                    OPEN:
                        FrameXOpenStruct.mode:=ADR(' /RIT=200 ');			(* long receive idle time for receive the data*)	
                        FrameXOpenStruct(enable := 1,device := Ident);
                        status.XOPEN 			:= FrameXOpenStruct.status;
                        IF (status.XOPEN = 0) THEN
                            StepType            := WRITE ;
                            FrameXOpenStruct.enable := 0;
                        ELSE						
                            StepType            := OPEN ;
                            Error               := TRUE;
                            ErrorID             := status.XOPEN;
                            Busy                := 0;
                            FrameXOpenStruct.enable := 0;
                        END_IF
                    WRITE:
                        memset(ADR(WriteData),0,SIZEOF(WriteData));
                        strcpy(ADR(WriteData),ADR('tag,0,#crc$R$L'));
                        FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
                        sendbuffer					:= FrameGetBufferStruct.buffer;
                        sendbufferlength		:= FrameGetBufferStruct.buflng;
                        status.GetBuffer		:= FrameGetBufferStruct.status;						
                        IF	(status.GetBuffer = 0)	THEN
                            memcpy(sendbuffer,ADR(WriteData),sendbufferlength);
                            FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)) );
                            status.WRITE 				:=	FrameWriteStruct.status;
                            IF (status.WRITE <> 0) THEN
                                FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
                                status.RoBuffer				:= FrameReleaseOutputBufferStruct.status;
                                IF (status.RoBuffer <> 0) THEN
                                    ErrorID:=status.RoBuffer;
                                END_IF
                            ELSE
                                StepType	:=	READ;
                                FrameWriteStruct.enable 	:= 0;
                                FrameGetBufferStruct.enable	:= 0;
                                FrameReleaseOutputBufferStruct.enable := 0;
                            END_IF
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
                                AN[0]		 := ReadData[0];
                                AN[1]		 := ReadData[1];
                                AN[2]		 := ReadData[2];
                                IF	(memcmp(ADR(AN),ADR('ack'),3) = 0)	THEN
                                    memset(ADR(KeyType),0,SIZEOF(KeyType));
                                    KeyType[0] 	 := ReadData[6];
                                    KeyType[1] 	 := ReadData[7];
                                    KeyType[2] 	 := ReadData[8];
                                    KeyType[3] 	 := ReadData[9];
                                    IF (memcmp(ADR(KeyType),ADR('4150'),4) = 0) THEN
                                        StepType		:=	OPEN;
                                        Done         	:=	FALSE;
                                        Busy         	:=	0;
                                        CommandReady	:=	0;
                                        TypeOK			:=	TRUE;
                                    ELSIF	(memcmp(ADR(KeyType),ADR('4102'),4) = 0) THEN
                                        memset(ADR(data),0,SIZEOF(data));
                                        data[0] 	 	:=	ReadData[11];
                                        data[1] 	 	:=	ReadData[12];
                                        data[2] 	 	:=	ReadData[13];
                                        data[3] 	 	:=	ReadData[14];
                                        data[4] 	 	:=	ReadData[15];
                                        data[5] 	 	:=	ReadData[16];
                                        data[6] 	 	:=	ReadData[17];
                                        data[7] 	 	:=	ReadData[18];
                                        data[8] 	 	:=	ReadData[19];
                                        data[9] 	 	:=	ReadData[20];
                                        Data			:=	ADR(data);
                                        StepType		:=	OPEN;
                                        Done         	:=	1;
                                        Busy         	:=	0;
                                        CommandReady	:=	0;
                                        TypeOK			:=	FALSE;
                                    ELSE
                                        StepType		:= 	OPEN;
                                        ErrorID			:=	rfidError_read_wrongType;            (* wrong type to read  *)
                                        Error   		:=	1;
                                        Busy    		:=	0;
                                        CommandReady	:=	0;
                                        TypeOK			:=	FALSE;
                                    END_IF
                                ELSIF	(memcmp(ADR(AN),ADR('nak'),3) = 0)	THEN
                                    StepType		:= 	OPEN;
                                    ErrorID			:=	rfidError_read_failed; (* negativ answer *)
                                    Error   		:=	1;
                                    Busy    		:=	0;
                                    CommandReady	:=	0;
                                    TypeOK			:=	FALSE;
                                ELSE
                                    StepType		:=	OPEN;
                                    ErrorID			:=	rfidError_read_failed; (* unknow answer *)
                                    Error   		:=	1;
                                    Busy    		:=	0;
                                    CommandReady	:=	0;
                                    TypeOK			:=	FALSE;
                                END_IF
                            ELSE
                                StepType		:=	OPEN;
                                Error     		:=	1;
                                ErrorID   		:=	status.ReleaseBuffer;
                                Busy      		:=	0;
                                CommandReady	:=	0;
                                TypeOK			:=	FALSE;
                            END_IF
                        ELSE
                            memset(ADR(ReadData),0,SIZEOF(ReadData));
                        END_IF
                END_CASE
            END_IF
            IF	(TypeOK = TRUE) THEN
                IF CommandReady = 0 THEN
                    IF  ((0 < RegNr) AND (RegNr <34)) THEN
                        memset(ADR(WriteData),0,SIZEOF(WriteData));
                        CASE RegNr OF
                            REG1:
                                strcpy(ADR(WriteData),ADR('rdm,0,1,1,#crc$R$L'));
                            REG2:
                                strcpy(ADR(WriteData),ADR('rdm,0,2,1,#crc$R$L'));
                            REG3:
                                strcpy(ADR(WriteData),ADR('rdm,0,3,1,#crc$R$L'));
                            REG4:
                                strcpy(ADR(WriteData),ADR('rdm,0,4,1,#crc$R$L'));
                            REG5:
                                strcpy(ADR(WriteData),ADR('rdm,0,5,1,#crc$R$L'));
                            REG6:
                                strcpy(ADR(WriteData),ADR('rdm,0,6,1,#crc$R$L'));
                            REG7:
                                strcpy(ADR(WriteData),ADR('rdm,0,7,1,#crc$R$L'));
                            REG8:
                                strcpy(ADR(WriteData),ADR('rdm,0,8,1,#crc$R$L'));
                            REG9:
                                strcpy(ADR(WriteData),ADR('rdm,0,9,1,#crc$R$L'));
                            REG10:
                                strcpy(ADR(WriteData),ADR('rdm,0,10,1,#crc$R$L'));
                            REG11:
                                strcpy(ADR(WriteData),ADR('rdm,0,11,1,#crc$R$L'));
                            REG12:
                                strcpy(ADR(WriteData),ADR('rdm,0,12,1,#crc$R$L'));
                            REG13:
                                strcpy(ADR(WriteData),ADR('rdm,0,13,1,#crc$R$L'));
                            REG14:
                                strcpy(ADR(WriteData),ADR('rdm,0,14,1,#crc$R$L'));
                            REG15:
                                strcpy(ADR(WriteData),ADR('rdm,0,15,1,#crc$R$L'));
                            REG16:
                                strcpy(ADR(WriteData),ADR('rdm,0,16,1,#crc$R$L'));
                            REG17:
                                strcpy(ADR(WriteData),ADR('rdm,0,17,1,#crc$R$L'));
                            REG18:
                                strcpy(ADR(WriteData),ADR('rdm,0,18,1,#crc$R$L'));
                            REG19:
                                strcpy(ADR(WriteData),ADR('rdm,0,19,1,#crc$R$L'));
                            REG20:
                                strcpy(ADR(WriteData),ADR('rdm,0,20,1.#crc$R$L'));
                            REG21:
                                strcpy(ADR(WriteData),ADR('rdm,0,21,1,#crc$R$L'));
                            REG22:
                                strcpy(ADR(WriteData),ADR('rdm,0,22,1,#crc$R$L'));
                            REG23:
                                strcpy(ADR(WriteData),ADR('rdm,0,23,1,#crc$R$L'));
                            REG24:
                                strcpy(ADR(WriteData),ADR('rdm,0,24,1,#crc$R$L'));
                            REG25:
                                strcpy(ADR(WriteData),ADR('rdm,0,25,1,#crc$R$L'));
                            REG26:
                                strcpy(ADR(WriteData),ADR('rdm,0,26,1,#crc$R$L'));
                            REG27:
                                strcpy(ADR(WriteData),ADR('rdm,0,27,1,#crc$R$L'));
                            REG28:
                                strcpy(ADR(WriteData),ADR('rdm,0,28,1,#crc$R$L'));
                            REG29:
                                strcpy(ADR(WriteData),ADR('rdm,0,29,1,#crc$R$L'));
                            REG30:
                                strcpy(ADR(WriteData),ADR('rdm,0,30,1,#crc$R$L'));
                            REG31:
                                strcpy(ADR(WriteData),ADR('rdm,0,31,1,#crc$R$L'));
                            REG32:
                                strcpy(ADR(WriteData),ADR('rdm,0,32,1,#crc$R$L'));
                            REG33:
                                strcpy(ADR(WriteData),ADR('rdm,0,33,1,#crc$R$L'));
                        END_CASE
                        CommandReady:=TRUE;
                        StepREAD		:=	OPEN;
                    ELSE
                        Error   		:=	1;
                        ErrorID 		:=	rfidError_read_wrongRegNr; (* wrong register number*)
                        Busy    		:=	0;
                        CommandReady	:=	0;
                        TypeOK			:=	FALSE;
                    END_IF
                END_IF
                IF CommandReady	= 1 THEN
                    CASE StepREAD OF
                        OPEN:			
                            FrameXOpenStruct.mode:=ADR('/RIT=200 ');				
                            FrameXOpenStruct(enable := 1,device := Ident);
                            status.XOPEN 			:= FrameXOpenStruct.status;
                            IF (status.XOPEN = 0) THEN
                                StepREAD            := WRITE ;
                                FrameXOpenStruct.enable:=FALSE;
                            ELSE
                                StepREAD            := OPEN ;
                                Error               := TRUE;
                                ErrorID             := status.XOPEN;
                                Busy                := 0;
                                FrameXOpenStruct.enable:=FALSE;
                            END_IF					
                        WRITE:
                            FrameGetBufferStruct(enable:= 1, ident:= FrameXOpenStruct.ident);
                            sendbuffer				:= FrameGetBufferStruct.buffer;
                            sendbufferlength		:= FrameGetBufferStruct.buflng;
                            status.GetBuffer		:= FrameGetBufferStruct.status;
                            IF	(status.GetBuffer = 0)	THEN
                                memcpy(sendbuffer,ADR(WriteData),SIZEOF(WriteData));
                                FrameWriteStruct(enable := 1, ident := FrameXOpenStruct.ident, buffer := sendbuffer,buflng := strlen(ADR(WriteData)));
                                status.WRITE 		:=	FrameWriteStruct.status;
                                IF (status.WRITE <> 0) THEN
                                    FrameReleaseOutputBufferStruct(enable:=1,ident:=FrameXOpenStruct.ident,buffer:=sendbuffer,buflng:= strlen(ADR(WriteData)));
                                    status.RoBuffer			:= FrameReleaseOutputBufferStruct.status;
                                    IF	(status.RoBuffer <> 0)	THEN
                                        ErrorID := status.RoBuffer;
                                        FrameReleaseOutputBufferStruct.enable:=FALSE;	
                                    END_IF
                                ELSE
                                    FrameWriteStruct.enable := 0;
                                    FrameGetBufferStruct.enable	:= 0;
                                    FrameReleaseOutputBufferStruct.enable := 0;								
                                    StepREAD			:=	READ;
                                END_IF
                            ELSE
                                ErrorID 		:= status.GetBuffer;
                                Error   		:= 1;
                                Busy    		:= 0;
                                StepREAD		:= OPEN;
                                TypeOK			:= FALSE;
                                CommandReady	:=	0;
                                FrameGetBufferStruct.enable	:= 0;
                            END_IF

                        READ:
                            FrameReadStruct(enable := 1,ident:=FrameXOpenStruct.ident);
                            ReadBuffer       	:=	FrameReadStruct.buffer;
                            ReadBufferLength	:=	FrameReadStruct.buflng;
                            status.READ      	:=	FrameReadStruct.status;
                            IF  (status.READ = 0)  THEN
                                memset(ADR(ReadData),0,SIZEOF(ReadData));
                                memcpy(ADR(ReadData),ReadBuffer,ReadBufferLength);
                                FrameReadStruct.enable	:=	0;
                                FrameReleaseBufferStruct(enable:=1, ident:=FrameXOpenStruct.ident, buffer:=ReadBuffer,buflng:=ReadBufferLength);
                                status.ReleaseBuffer	:=	FrameReleaseBufferStruct.status;
                                IF (status.ReleaseBuffer	= 0) THEN
                                    FrameReleaseBufferStruct.enable	:=	0;
                                    AN[0]	:= ReadData[0];
                                    AN[1]	:= ReadData[1];
                                    AN[2]	:= ReadData[2];
                                    IF (memcmp(ADR(AN),ADR('ack'),3) = 0) THEN
                                        IF ReadBufferLength <> 22 THEN
                                            StepREAD		:=	OPEN;
                                            Error       	:=	1;
                                            ErrorID      	:=	rfidError_read_failed ; (* unknow answer *)
                                            Busy         	:=	0;
                                            CommandReady	:=	0;
                                            TypeOK			:=	FALSE;															
                                        ELSE
                                            StepREAD    :=	DATAREAD;
                                        END_IF
                                    ELSIF	(memcmp(ADR(AN),ADR('nak'),3) = 0)	THEN
                                        ERROR[0]	:=	ReadData[6];
                                        ERROR[1]	:=	ReadData[7];
                                        ERROR[2]	:=	ReadData[8];
                                        StepREAD		:=	OPEN;
                                        Error       	:=	1;
                                        ErrorID      	:=	atoi(ADR(ERROR)) ;
                                        Busy         	:=	0;
                                        CommandReady	:=	0;
                                        TypeOK			:=	FALSE;
                                    ELSE
                                        StepREAD		:=	OPEN;
                                        Error       	:=	1;
                                        ErrorID      	:=	rfidError_read_failed ; (* unknow answer *)
                                        Busy         	:=	0;
                                        CommandReady	:=	0;
                                        TypeOK			:=	FALSE;
                                    END_IF
                                ELSE
                                    StepREAD		:=	OPEN;
                                    Error       	:=	1;
                                    ErrorID      	:=	status.ReleaseBuffer ;
                                    Busy         	:=	0;
                                    CommandReady	:=	0;
                                    TypeOK			:=	FALSE;
                                END_IF
                            ELSE
                                memset(ADR(ReadData),0,SIZEOF(ReadData));
                            END_IF
                        DATAREAD:
                            memset(ADR(data),0,SIZEOF(data));
                            data[0] 	 	:=	ReadData[6];
                            data[1] 	 	:=	ReadData[7];
                            data[2] 	 	:=	ReadData[8];
                            data[3] 	 	:=	ReadData[9];
                            data[4] 	 	:=	ReadData[10];
                            data[5] 	 	:=	ReadData[11];
                            data[6] 	 	:=	ReadData[12];
                            data[7] 	 	:=	ReadData[13];
                            Data			:=	ADR(data);
                            Done         	:=	1;
                            Busy         	:=	0;
                            CommandReady	:=	0;
                            StepREAD     	:=	OPEN;
                            TypeOK			:=	FALSE;																					
                    END_CASE
                END_IF
            END_IF
        END_IF
    ELSE
        Busy:=0;
        Done:=0;
        Error:=0;
        ErrorID:=0;
        StepREAD:= 0;
        StepType:= 0;    
    END_IF
END_FUNCTION_BLOCK

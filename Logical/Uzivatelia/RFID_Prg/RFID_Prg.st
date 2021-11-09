(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Program: RFID_Prg
 * File: RFID_Prg.st
 * Author: borsm
 * Created: December 23, 2015
 ********************************************************************
 * Implementation of program RFID_Prg
 ********************************************************************)

PROGRAM _INIT

    doinit:=1;


END_PROGRAM


PROGRAM _CYCLIC

	//Reset èitaèiek RFID//
    IF NOT CasResetovaniaCitaciekRFID.Q THEN
        CasResetovaniaCitaciekRFID.IN:= TRUE;
    ELSIF CasResetovaniaCitaciekRFID.Q THEN
        doinit:= TRUE;
        CasResetovaniaCitaciekRFID.IN:= FALSE;
    END_IF	

    CasResetovaniaCitaciekRFID.PT:= T#5m;
    CasResetovaniaCitaciekRFID();
	
	
	
(* find the Transponder, and give the Device ID back, this FuB works only for USB interface Transponder, 

IF you use a serial interface transponder, please give the adress OF Interface ID directly TO the ident OF all FuBs *)

       
    
    
//Hladanie RFID èitaèky//	
    IF doinit THEN
        InitDone:= FALSE;
        doRead:= FALSE;
        TP_Init_0.Enable := TRUE;
        IF TP_Init_0.Done THEN
            PoruchaVyhladaniaCitaciek:= FALSE;
            DeviceID1 := TP_Init_0.Ident[2]; //Panel è.1
            DeviceID2 := TP_Init_0.Ident[1]; //Panel è.2
            DeviceID3 := TP_Init_0.Ident[0]; //Panel è.3	
            TP_Init_0.Enable := FALSE;
            poc := poc + 1;
            IF poc	>= 3 THEN
                InitDone:= TRUE;
                doRead := TRUE;
                doinit:= FALSE;
                poc := 0;
            END_IF
        ELSIF TP_Init_0.Error THEN
            PoruchaVyhladaniaCitaciek:= TRUE;
            TP_Init_0.Enable := FALSE;
            doRead:= FALSE;
            doinit := FALSE;
        END_IF
    END_IF
  
  
    (* Èítanie z èítaèky *)
       
    IF doRead AND InitDone AND NOT InitError THEN
       		
        //Panel 1//
        TP_Read_1.Ident := DeviceID1; 
        TP_Read_1.Enable := TRUE;
        IF TP_Read_1.Done THEN
            strcpy(ADR(READDATA_Citacka1),TP_Read_1.Data);
            TP_Read_1.Enable := FALSE;
        ELSIF TP_Read_1.Error THEN
            memset(ADR(READDATA_Citacka1),0,SIZEOF(READDATA_Citacka1));
            TP_Read_1.Enable := FALSE;
        END_IF
				
        //Panel 2//
        TP_Read_2.Ident := DeviceID2;
        TP_Read_2.Enable := TRUE;
        IF TP_Read_2.Done THEN
            strcpy(ADR(READDATA_Citacka2),TP_Read_2.Data);
            TP_Read_2.Enable := FALSE;
        ELSIF TP_Read_2.Error THEN
            memset(ADR(READDATA_Citacka2),0,SIZEOF(READDATA_Citacka2));
            TP_Read_2.Enable := FALSE;
        END_IF
				
        //Panel 3//
        TP_Read_3.Ident := DeviceID3;
        TP_Read_3.Enable := TRUE;
        IF TP_Read_3.Done THEN
           strcpy(ADR(READDATA_Citacka3),TP_Read_3.Data);
           TP_Read_3.Enable := FALSE;
        ELSIF TP_Read_3.Error THEN
           memset(ADR(READDATA_Citacka3),0,SIZEOF(READDATA_Citacka3));
           TP_Read_3.Enable := FALSE;
        END_IF
        
    ELSE
        TP_Read_1.Enable := FALSE;
        TP_Read_2.Enable := FALSE;
        TP_Read_3.Enable := FALSE;
        memset(ADR(READDATA_Citacka1),0,SIZEOF(READDATA_Citacka1));
        memset(ADR(READDATA_Citacka2),0,SIZEOF(READDATA_Citacka2));
        memset(ADR(READDATA_Citacka3),0,SIZEOF(READDATA_Citacka3)); 
    END_IF


    (* call FuBs *)
    TP_Init_0();
    TP_Read_1();
    TP_Read_2();
    TP_Read_3();
    
    
    //Zistenie èi je priložená karta na èitaèke 1//
    IF READDATA_Citacka1[2] = 0 
        AND READDATA_Citacka1[3] = 0
        AND READDATA_Citacka1[4] = 0
        AND READDATA_Citacka1[5] = 0
        AND READDATA_Citacka1[6] = 0
        AND READDATA_Citacka1[7] = 0
        AND READDATA_Citacka1[8] = 0
        AND READDATA_Citacka1[9] = 0 THEN
        Citacka1_AKTIVNA:= FALSE;
    ELSE   
        Citacka1_AKTIVNA:= TRUE;
    END_IF
    
         
    //Zistenie èi je priložená karta na èitaèke 2//
    IF READDATA_Citacka2[2] = 0 
        AND READDATA_Citacka2[3] = 0
        AND READDATA_Citacka2[4] = 0
        AND READDATA_Citacka2[5] = 0
        AND READDATA_Citacka2[6] = 0
        AND READDATA_Citacka2[7] = 0
        AND READDATA_Citacka2[8] = 0
        AND READDATA_Citacka2[9] = 0 THEN
        Citacka2_AKTIVNA:= FALSE;
    ELSE   
        Citacka2_AKTIVNA:= TRUE;
    END_IF
    
    //Zistenie èi je priložená karta na èitaèke 3//
    IF READDATA_Citacka3[2] = 0 
        AND READDATA_Citacka3[3] = 0
        AND READDATA_Citacka3[4] = 0
        AND READDATA_Citacka3[5] = 0
        AND READDATA_Citacka3[6] = 0
        AND READDATA_Citacka3[7] = 0
        AND READDATA_Citacka3[8] = 0
        AND READDATA_Citacka3[9] = 0 THEN
        Citacka3_AKTIVNA:= FALSE;
    ELSE   
        Citacka3_AKTIVNA:= TRUE;
    END_IF
    
    
    
    
    
    //Naèítané kódy èitaèiek//
    //Panel 1//
    IF P1_Vizu.TL_PrihlasovOperatora_AKTIVNE THEN  //Panel 1//
        IF Citacka1_AKTIVNA THEN
            PrecitaneData_Panel1[0]:= READDATA_Citacka1[3];
            PrecitaneData_Panel1[1]:= READDATA_Citacka1[2];
            PrecitaneData_Panel1[2]:= READDATA_Citacka1[5];
            PrecitaneData_Panel1[3]:= READDATA_Citacka1[4];
            PrecitaneData_Panel1[4]:= READDATA_Citacka1[7];
            PrecitaneData_Panel1[5]:= READDATA_Citacka1[6];
            PrecitaneData_Panel1[6]:= READDATA_Citacka1[9];
            PrecitaneData_Panel1[7]:= READDATA_Citacka1[8];
        ELSIF Citacka2_AKTIVNA THEN
            PrecitaneData_Panel1[0]:= READDATA_Citacka2[3];
            PrecitaneData_Panel1[1]:= READDATA_Citacka2[2];
            PrecitaneData_Panel1[2]:= READDATA_Citacka2[5];
            PrecitaneData_Panel1[3]:= READDATA_Citacka2[4];
            PrecitaneData_Panel1[4]:= READDATA_Citacka2[7];
            PrecitaneData_Panel1[5]:= READDATA_Citacka2[6];
            PrecitaneData_Panel1[6]:= READDATA_Citacka2[9];
            PrecitaneData_Panel1[7]:= READDATA_Citacka2[8];
        ELSIF Citacka3_AKTIVNA THEN
            PrecitaneData_Panel1[0]:= READDATA_Citacka3[3];
            PrecitaneData_Panel1[1]:= READDATA_Citacka3[2];
            PrecitaneData_Panel1[2]:= READDATA_Citacka3[5];
            PrecitaneData_Panel1[3]:= READDATA_Citacka3[4];
            PrecitaneData_Panel1[4]:= READDATA_Citacka3[7];
            PrecitaneData_Panel1[5]:= READDATA_Citacka3[6];
            PrecitaneData_Panel1[6]:= READDATA_Citacka3[9];
            PrecitaneData_Panel1[7]:= READDATA_Citacka3[8];
        END_IF
    ELSIF P2_Vizu.TL_PrihlasovOperatora_AKTIVNE THEN  //Panel 2//  
        IF Citacka1_AKTIVNA THEN
            PrecitaneData_Panel2[0]:= READDATA_Citacka1[3];
            PrecitaneData_Panel2[1]:= READDATA_Citacka1[2];
            PrecitaneData_Panel2[2]:= READDATA_Citacka1[5];
            PrecitaneData_Panel2[3]:= READDATA_Citacka1[4];
            PrecitaneData_Panel2[4]:= READDATA_Citacka1[7];
            PrecitaneData_Panel2[5]:= READDATA_Citacka1[6];
            PrecitaneData_Panel2[6]:= READDATA_Citacka1[9];
            PrecitaneData_Panel2[7]:= READDATA_Citacka1[8];
        ELSIF Citacka2_AKTIVNA THEN
            PrecitaneData_Panel2[0]:= READDATA_Citacka2[3];
            PrecitaneData_Panel2[1]:= READDATA_Citacka2[2];
            PrecitaneData_Panel2[2]:= READDATA_Citacka2[5];
            PrecitaneData_Panel2[3]:= READDATA_Citacka2[4];
            PrecitaneData_Panel2[4]:= READDATA_Citacka2[7];
            PrecitaneData_Panel2[5]:= READDATA_Citacka2[6];
            PrecitaneData_Panel2[6]:= READDATA_Citacka2[9];
            PrecitaneData_Panel2[7]:= READDATA_Citacka2[8];
        ELSIF Citacka3_AKTIVNA THEN
            PrecitaneData_Panel2[0]:= READDATA_Citacka3[3];
            PrecitaneData_Panel2[1]:= READDATA_Citacka3[2];
            PrecitaneData_Panel2[2]:= READDATA_Citacka3[5];
            PrecitaneData_Panel2[3]:= READDATA_Citacka3[4];
            PrecitaneData_Panel2[4]:= READDATA_Citacka3[7];
            PrecitaneData_Panel2[5]:= READDATA_Citacka3[6];
            PrecitaneData_Panel2[6]:= READDATA_Citacka3[9];
            PrecitaneData_Panel2[7]:= READDATA_Citacka3[8];
        END_IF
    ELSIF P34_Vizu.TL_PrihlasovOperatora_AKTIVNE THEN  //Panel 3//  
        IF Citacka1_AKTIVNA THEN
            PrecitaneData_Panel3[0]:= READDATA_Citacka1[3];
            PrecitaneData_Panel3[1]:= READDATA_Citacka1[2];
            PrecitaneData_Panel3[2]:= READDATA_Citacka1[5];
            PrecitaneData_Panel3[3]:= READDATA_Citacka1[4];
            PrecitaneData_Panel3[4]:= READDATA_Citacka1[7];
            PrecitaneData_Panel3[5]:= READDATA_Citacka1[6];
            PrecitaneData_Panel3[6]:= READDATA_Citacka1[9];
            PrecitaneData_Panel3[7]:= READDATA_Citacka1[8];
        ELSIF Citacka2_AKTIVNA THEN
            PrecitaneData_Panel3[0]:= READDATA_Citacka2[3];
            PrecitaneData_Panel3[1]:= READDATA_Citacka2[2];
            PrecitaneData_Panel3[2]:= READDATA_Citacka2[5];
            PrecitaneData_Panel3[3]:= READDATA_Citacka2[4];
            PrecitaneData_Panel3[4]:= READDATA_Citacka2[7];
            PrecitaneData_Panel3[5]:= READDATA_Citacka2[6];
            PrecitaneData_Panel3[6]:= READDATA_Citacka2[9];
            PrecitaneData_Panel3[7]:= READDATA_Citacka2[8];
        ELSIF Citacka3_AKTIVNA THEN
            PrecitaneData_Panel3[0]:= READDATA_Citacka3[3];
            PrecitaneData_Panel3[1]:= READDATA_Citacka3[2];
            PrecitaneData_Panel3[2]:= READDATA_Citacka3[5];
            PrecitaneData_Panel3[3]:= READDATA_Citacka3[4];
            PrecitaneData_Panel3[4]:= READDATA_Citacka3[7];
            PrecitaneData_Panel3[5]:= READDATA_Citacka3[6];
            PrecitaneData_Panel3[6]:= READDATA_Citacka3[9];
            PrecitaneData_Panel3[7]:= READDATA_Citacka3[8];
        END_IF  
    ELSE
        PrecitaneData_Panel1[0]:= 0;
        PrecitaneData_Panel1[1]:= 0;
        PrecitaneData_Panel1[2]:= 0;
        PrecitaneData_Panel1[3]:= 0;
        PrecitaneData_Panel1[4]:= 0;
        PrecitaneData_Panel1[5]:= 0;
        PrecitaneData_Panel1[6]:= 0;
        PrecitaneData_Panel1[7]:= 0;
        
        PrecitaneData_Panel2[0]:= 0;
        PrecitaneData_Panel2[1]:= 0;
        PrecitaneData_Panel2[2]:= 0;
        PrecitaneData_Panel2[3]:= 0;
        PrecitaneData_Panel2[4]:= 0;
        PrecitaneData_Panel2[5]:= 0;
        PrecitaneData_Panel2[6]:= 0;
        PrecitaneData_Panel2[7]:= 0;
        
        PrecitaneData_Panel3[0]:= 0;
        PrecitaneData_Panel3[1]:= 0;
        PrecitaneData_Panel3[2]:= 0;
        PrecitaneData_Panel3[3]:= 0;
        PrecitaneData_Panel3[4]:= 0;
        PrecitaneData_Panel3[5]:= 0;
        PrecitaneData_Panel3[6]:= 0;
        PrecitaneData_Panel3[7]:= 0;
    END_IF    
        
         
   
    
  
END_PROGRAM

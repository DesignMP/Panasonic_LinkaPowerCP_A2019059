
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //*********************************************Buffer 1****************************************************//
    //Resetovanie//
    IF Buffer_1.ResetBufferu THEN
        brsmemset(ADR(Buffer_1.Pole),0,SIZEOF(Buffer_1.Pole)); 
        Buffer_1.Index:= 0;
        Buffer_1.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_1.ZapisHodnotu THEN
        Buffer_1.Pole[Buffer_1.Index]:= Buffer_1.Hodnota;
        IF Buffer_1.Index < 100 THEN
            Buffer_1.Index:= Buffer_1.Index + 1;
        ELSE    
            Buffer_1.Index:= 0;
        END_IF
        Buffer_1.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 2****************************************************//
    //Resetovanie//
    IF Buffer_2.ResetBufferu THEN
        brsmemset(ADR(Buffer_2.Pole),0,SIZEOF(Buffer_2.Pole)); 
        Buffer_2.Index:= 0;
        Buffer_2.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_2.ZapisHodnotu THEN
        Buffer_2.Pole[Buffer_2.Index]:= Buffer_2.Hodnota;
        IF Buffer_2.Index < 100 THEN
            Buffer_2.Index:= Buffer_2.Index + 1;
        ELSE    
            Buffer_2.Index:= 0;
        END_IF
        Buffer_2.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 3****************************************************//
    //Resetovanie//
    IF Buffer_3.ResetBufferu THEN
        brsmemset(ADR(Buffer_3.Pole),0,SIZEOF(Buffer_3.Pole)); 
        Buffer_3.Index:= 0;
        Buffer_3.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_3.ZapisHodnotu THEN
        Buffer_3.Pole[Buffer_3.Index]:= Buffer_3.Hodnota;
        IF Buffer_3.Index < 100 THEN
            Buffer_3.Index:= Buffer_3.Index + 1;
        ELSE    
            Buffer_3.Index:= 0;
        END_IF
        Buffer_3.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 4****************************************************//
    //Resetovanie//
    IF Buffer_4.ResetBufferu THEN
        brsmemset(ADR(Buffer_4.Pole),0,SIZEOF(Buffer_4.Pole)); 
        Buffer_4.Index:= 0;
        Buffer_4.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_4.ZapisHodnotu THEN
        Buffer_4.Pole[Buffer_4.Index]:= Buffer_4.Hodnota;
        IF Buffer_4.Index < 100 THEN
            Buffer_4.Index:= Buffer_4.Index + 1;
        ELSE    
            Buffer_4.Index:= 0;
        END_IF
        Buffer_4.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 5****************************************************//
    //Resetovanie//
    IF Buffer_5.ResetBufferu THEN
        brsmemset(ADR(Buffer_5.Pole),0,SIZEOF(Buffer_5.Pole)); 
        Buffer_5.Index:= 0;
        Buffer_5.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_5.ZapisHodnotu THEN
        Buffer_5.Pole[Buffer_5.Index]:= Buffer_5.Hodnota;
        IF Buffer_5.Index < 100 THEN
            Buffer_5.Index:= Buffer_5.Index + 1;
        ELSE    
            Buffer_5.Index:= 0;
        END_IF
        Buffer_5.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 6****************************************************//
    //Resetovanie//
    IF Buffer_6.ResetBufferu THEN
        brsmemset(ADR(Buffer_6.Pole),0,SIZEOF(Buffer_6.Pole)); 
        Buffer_6.Index:= 0;
        Buffer_6.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_6.ZapisHodnotu THEN
        Buffer_6.Pole[Buffer_6.Index]:= Buffer_6.Hodnota;
        IF Buffer_6.Index < 100 THEN
            Buffer_6.Index:= Buffer_6.Index + 1;
        ELSE    
            Buffer_6.Index:= 0;
        END_IF
        Buffer_6.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 7****************************************************//
    //Resetovanie//
    IF Buffer_7.ResetBufferu THEN
        brsmemset(ADR(Buffer_7.Pole),0,SIZEOF(Buffer_7.Pole)); 
        Buffer_7.Index:= 0;
        Buffer_7.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_7.ZapisHodnotu THEN
        Buffer_7.Pole[Buffer_7.Index]:= Buffer_7.Hodnota;
        IF Buffer_7.Index < 100 THEN
            Buffer_7.Index:= Buffer_7.Index + 1;
        ELSE    
            Buffer_7.Index:= 0;
        END_IF
        Buffer_7.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 8****************************************************//
    //Resetovanie//
    IF Buffer_8.ResetBufferu THEN
        brsmemset(ADR(Buffer_8.Pole),0,SIZEOF(Buffer_8.Pole)); 
        Buffer_8.Index:= 0;
        Buffer_8.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_8.ZapisHodnotu THEN
        Buffer_8.Pole[Buffer_8.Index]:= Buffer_8.Hodnota;
        IF Buffer_8.Index < 100 THEN
            Buffer_8.Index:= Buffer_8.Index + 1;
        ELSE    
            Buffer_8.Index:= 0;
        END_IF
        Buffer_8.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 9****************************************************//
    //Resetovanie//
    IF Buffer_9.ResetBufferu THEN
        brsmemset(ADR(Buffer_9.Pole),0,SIZEOF(Buffer_9.Pole)); 
        Buffer_9.Index:= 0;
        Buffer_9.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_9.ZapisHodnotu THEN
        Buffer_9.Pole[Buffer_9.Index]:= Buffer_9.Hodnota;
        IF Buffer_9.Index < 100 THEN
            Buffer_9.Index:= Buffer_9.Index + 1;
        ELSE    
            Buffer_9.Index:= 0;
        END_IF
        Buffer_9.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 10****************************************************//
    //Resetovanie//
    IF Buffer_10.ResetBufferu THEN
        brsmemset(ADR(Buffer_10.Pole),0,SIZEOF(Buffer_10.Pole)); 
        Buffer_10.Index:= 0;
        Buffer_10.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_10.ZapisHodnotu THEN
        Buffer_10.Pole[Buffer_10.Index]:= Buffer_10.Hodnota;
        IF Buffer_10.Index < 100 THEN
            Buffer_10.Index:= Buffer_10.Index + 1;
        ELSE    
            Buffer_10.Index:= 0;
        END_IF
        Buffer_10.ZapisHodnotu:= FALSE;
    END_IF  
    
    
    //*********************************************Buffer 11****************************************************//
    //Resetovanie//
    IF Buffer_11.ResetBufferu THEN
        brsmemset(ADR(Buffer_11.Pole),0,SIZEOF(Buffer_11.Pole)); 
        Buffer_11.Index:= 0;
        Buffer_11.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_11.ZapisHodnotu THEN
        Buffer_11.Pole[Buffer_11.Index]:= Buffer_11.Hodnota;
        IF Buffer_11.Index < 100 THEN
            Buffer_11.Index:= Buffer_11.Index + 1;
        ELSE    
            Buffer_11.Index:= 0;
        END_IF
        Buffer_11.ZapisHodnotu:= FALSE;
    END_IF  
	 
    
    //*********************************************Buffer 12****************************************************//
    //Resetovanie//
    IF Buffer_12.ResetBufferu THEN
        brsmemset(ADR(Buffer_12.Pole),0,SIZEOF(Buffer_12.Pole)); 
        Buffer_12.Index:= 0;
        Buffer_12.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_12.ZapisHodnotu THEN
        Buffer_12.Pole[Buffer_12.Index]:= Buffer_12.Hodnota;
        IF Buffer_12.Index < 100 THEN
            Buffer_12.Index:= Buffer_12.Index + 1;
        ELSE    
            Buffer_12.Index:= 0;
        END_IF
        Buffer_12.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 13****************************************************//
    //Resetovanie//
    IF Buffer_13.ResetBufferu THEN
        brsmemset(ADR(Buffer_13.Pole),0,SIZEOF(Buffer_13.Pole)); 
        Buffer_13.Index:= 0;
        Buffer_13.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_13.ZapisHodnotu THEN
        Buffer_13.Pole[Buffer_13.Index]:= Buffer_13.Hodnota;
        IF Buffer_13.Index < 100 THEN
            Buffer_13.Index:= Buffer_13.Index + 1;
        ELSE    
            Buffer_13.Index:= 0;
        END_IF
        Buffer_13.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 14****************************************************//
    //Resetovanie//
    IF Buffer_14.ResetBufferu THEN
        brsmemset(ADR(Buffer_14.Pole),0,SIZEOF(Buffer_14.Pole)); 
        Buffer_14.Index:= 0;
        Buffer_14.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_14.ZapisHodnotu THEN
        Buffer_14.Pole[Buffer_14.Index]:= Buffer_14.Hodnota;
        IF Buffer_14.Index < 100 THEN
            Buffer_14.Index:= Buffer_14.Index + 1;
        ELSE    
            Buffer_14.Index:= 0;
        END_IF
        Buffer_14.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 15****************************************************//
    //Resetovanie//
    IF Buffer_15.ResetBufferu THEN
        brsmemset(ADR(Buffer_15.Pole),0,SIZEOF(Buffer_15.Pole)); 
        Buffer_15.Index:= 0;
        Buffer_15.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_15.ZapisHodnotu THEN
        Buffer_15.Pole[Buffer_15.Index]:= Buffer_15.Hodnota;
        IF Buffer_15.Index < 100 THEN
            Buffer_15.Index:= Buffer_15.Index + 1;
        ELSE    
            Buffer_15.Index:= 0;
        END_IF
        Buffer_15.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 16****************************************************//
    //Resetovanie//
    IF Buffer_16.ResetBufferu THEN
        brsmemset(ADR(Buffer_16.Pole),0,SIZEOF(Buffer_16.Pole)); 
        Buffer_16.Index:= 0;
        Buffer_16.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_16.ZapisHodnotu THEN
        Buffer_16.Pole[Buffer_16.Index]:= Buffer_16.Hodnota;
        IF Buffer_16.Index < 100 THEN
            Buffer_16.Index:= Buffer_16.Index + 1;
        ELSE    
            Buffer_16.Index:= 0;
        END_IF
        Buffer_16.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 17****************************************************//
    //Resetovanie//
    IF Buffer_17.ResetBufferu THEN
        brsmemset(ADR(Buffer_17.Pole),0,SIZEOF(Buffer_17.Pole)); 
        Buffer_17.Index:= 0;
        Buffer_17.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_17.ZapisHodnotu THEN
        Buffer_17.Pole[Buffer_17.Index]:= Buffer_17.Hodnota;
        IF Buffer_17.Index < 100 THEN
            Buffer_17.Index:= Buffer_17.Index + 1;
        ELSE    
            Buffer_17.Index:= 0;
        END_IF
        Buffer_17.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 18****************************************************//
    //Resetovanie//
    IF Buffer_18.ResetBufferu THEN
        brsmemset(ADR(Buffer_18.Pole),0,SIZEOF(Buffer_18.Pole)); 
        Buffer_18.Index:= 0;
        Buffer_18.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_18.ZapisHodnotu THEN
        Buffer_18.Pole[Buffer_18.Index]:= Buffer_18.Hodnota;
        IF Buffer_18.Index < 100 THEN
            Buffer_18.Index:= Buffer_18.Index + 1;
        ELSE    
            Buffer_18.Index:= 0;
        END_IF
        Buffer_18.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 19****************************************************//
    //Resetovanie//
    IF Buffer_19.ResetBufferu THEN
        brsmemset(ADR(Buffer_19.Pole),0,SIZEOF(Buffer_19.Pole)); 
        Buffer_19.Index:= 0;
        Buffer_19.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_19.ZapisHodnotu THEN
        Buffer_19.Pole[Buffer_19.Index]:= Buffer_19.Hodnota;
        IF Buffer_19.Index < 100 THEN
            Buffer_19.Index:= Buffer_19.Index + 1;
        ELSE    
            Buffer_19.Index:= 0;
        END_IF
        Buffer_19.ZapisHodnotu:= FALSE;
    END_IF  
    
    //*********************************************Buffer 20****************************************************//
    //Resetovanie//
    IF Buffer_20.ResetBufferu THEN
        brsmemset(ADR(Buffer_20.Pole),0,SIZEOF(Buffer_20.Pole)); 
        Buffer_20.Index:= 0;
        Buffer_20.ResetBufferu:= FALSE;
    END_IF    
    
    
    //Zápis do buffera//
    IF Buffer_20.ZapisHodnotu THEN
        Buffer_20.Pole[Buffer_20.Index]:= Buffer_20.Hodnota;
        IF Buffer_20.Index < 100 THEN
            Buffer_20.Index:= Buffer_20.Index + 1;
        ELSE    
            Buffer_20.Index:= 0;
        END_IF
        Buffer_20.ZapisHodnotu:= FALSE;
    END_IF  
    
    
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


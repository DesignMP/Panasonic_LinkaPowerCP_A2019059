
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
       
        //Taktime pracoviska s presunom paletky//  
	IF Taktime_LeakageTestA_ST8A.CMD.START_Merania_1 THEN
        
		Milisekundy_1:= Milisekundy_1 + 8;//Preto�e je v taskovej triede 8ms tak prir�tav�me + 8//
        
		IF Milisekundy_1 >= 1000 THEN
			Sekundy_1:= Sekundy_1 + 1;
			Milisekundy_1:= 0;
		END_IF
        
		IF Sekundy_1 >= 60 THEN
			Minuty_1:= Minuty_1 + 1;
			Sekundy_1:= 0;
		END_IF	
        
		IF Minuty_1 >= 60 THEN
			Hodiny_1:= Hodiny_1 + 1;
			Minuty_1:= 0;
		END_IF
          
	END_IF	
		
	IF NOT Taktime_LeakageTestA_ST8A.CMD.START_Merania_1 THEN
		Milisekundy_1:= 0;
		Sekundy_1:= 0;
		Minuty_1:= 0;
		Hodiny_1:= 0;
	END_IF	
	
	IF Taktime_LeakageTestA_ST8A.CMD.ZAPIS_Hodnot_1 THEN
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneHodiny_1:= Hodiny_1;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneMinuty_1:= Minuty_1;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneSekundy_1:= Sekundy_1;
		Milisekundy_1:= 0;
		Sekundy_1:= 0;
		Minuty_1:= 0;
		Hodiny_1:= 0;	
		Taktime_LeakageTestA_ST8A.CMD.ZAPIS_Hodnot_1:= FALSE;
	END_IF	
    
	IF Taktime_LeakageTestA_ST8A.CMD.STOP_Merania_1 THEN
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneHodiny_1:= Hodiny_1;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneMinuty_1:= Minuty_1;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneSekundy_1:= Sekundy_1;
		Taktime_LeakageTestA_ST8A.CMD.START_Merania_1:= FALSE;
		Taktime_LeakageTestA_ST8A.CMD.STOP_Merania_1:= FALSE;
	END_IF 
	
    
    
	//Taktime pracoviska bez presunu paletky// 
	IF Taktime_LeakageTestA_ST8A.CMD.START_Merania_2 THEN
        
		Milisekundy_2:= Milisekundy_2 + 4;//Preto�e je v taskovej triede 4ms tak prir�tav�me + 4//
        
		IF Milisekundy_2 >= 1000 THEN
			Sekundy_2:= Sekundy_2 + 1;
			Milisekundy_2:= 0;
		END_IF
        
		IF Sekundy_2 >= 60 THEN
			Minuty_2:= Minuty_2 + 1;
			Sekundy_2:= 0;
		END_IF	
        
		IF Minuty_2 >= 60 THEN
			Hodiny_2:= Hodiny_2 + 1;
			Minuty_2:= 0;
		END_IF
          
	END_IF	
		
	IF NOT Taktime_LeakageTestA_ST8A.CMD.START_Merania_2 THEN
		Milisekundy_2:= 0;
		Sekundy_2:= 0;
		Minuty_2:= 0;
		Hodiny_2:= 0;
	END_IF	
	
	IF Taktime_LeakageTestA_ST8A.CMD.ZAPIS_Hodnot_2 THEN
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneHodiny_2:= Hodiny_2;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneMinuty_2:= Minuty_2;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneSekundy_2:= Sekundy_2;
		Milisekundy_2:= 0;
		Sekundy_2:= 0;
		Minuty_2:= 0;
		Hodiny_2:= 0;	
		Taktime_LeakageTestA_ST8A.CMD.ZAPIS_Hodnot_2:= FALSE;
	END_IF	
    
	IF Taktime_LeakageTestA_ST8A.CMD.STOP_Merania_2 THEN
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneHodiny_2:= Hodiny_2;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneMinuty_2:= Minuty_2;
		Taktime_LeakageTestA_ST8A.OUTPUTS.NameraneSekundy_2:= Sekundy_2;
		Taktime_LeakageTestA_ST8A.CMD.START_Merania_2:= FALSE;
		Taktime_LeakageTestA_ST8A.CMD.STOP_Merania_2:= FALSE;
	END_IF 
    
    
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


PROGRAM _INIT
	
	P1_Vytah.ServoZdvihuVytahu_M31.AxisName:= ADR(gAxis_6);
	P1_Srobovanie.ServoManipulOsX_M20.AxisName:= ADR(gAxis_7);
	P1_Srobovanie.ServoManipulOsY_M19.AxisName:= ADR(gAxis_8);
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.AxisName:= ADR(gAxis_1);
	P2_ZakladacTesnenia.ServoPojazduVozika_M5.AxisName:= ADR(gAxis_2);
	P2_Srobovanie.ServoManipulOsX_M10.AxisName:= ADR(gAxis_3);
	P2_Srobovanie.ServoManipulOsY_M9.AxisName:= ADR(gAxis_4);
	P2_Zvaranie.ServoZdvihuZvarania_M6.AxisName:= ADR(gAxis_5);
	P3_Srobovanie.ServoManipulOsY_M37.AxisName:= ADR(gAxis_9);
	P4_Vytah.ServoZdvihuVytahu_M26.AxisName:= ADR(gAxis_10);
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28.AxisName:= ADR(gAxis_11);
	
	
	
	
END_PROGRAM

PROGRAM _CYCLIC
	
	//********************************************Pracovisko è.1*******************************************
	//Volanie funkcie//
	P1_Vytah.ServoZdvihuVytahu_M31();
	P1_Srobovanie.ServoManipulOsX_M20();
	P1_Srobovanie.ServoManipulOsY_M19();
	
	//P1 - vytah servo READY//
	IF (P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Power_ON AND NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR) THEN
		P1_Pracovisko.STAV.ServoVytahu_READY:= TRUE;
	ELSE	
		P1_Pracovisko.STAV.ServoVytahu_READY:= FALSE;
	END_IF
	
	
	//P1 - status serva bunky READY//
	IF (P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Power_ON AND NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR) AND
		(P1_Srobovanie.ServoManipulOsX_M20.STATUS.Power_ON AND NOT P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR) AND
		(P1_Srobovanie.ServoManipulOsY_M19.STATUS.Power_ON AND NOT P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR) THEN
		P1_Pracovisko.STAV.ServaBunky_READY:= TRUE;
	ELSE	
		P1_Pracovisko.STAV.ServaBunky_READY:= FALSE;
	END_IF	
	

	
	
	
	//*********************************************Pracovisko è.2******************************************
	//Volanie funkcie//
	P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4();
	P2_ZakladacTesnenia.ServoPojazduVozika_M5();
	P2_Srobovanie.ServoManipulOsX_M10();
	P2_Srobovanie.ServoManipulOsY_M9();
	P2_Zvaranie.ServoZdvihuZvarania_M6();
	
	
	//P2 - status serva zakladaèa READY//
	IF (P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Power_ON AND NOT P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR) AND 
		(P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Power_ON AND NOT P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR) THEN 
		P2_Pracovisko.STAV.ServaZakladaca_READY:= TRUE;
	ELSE	
		P2_Pracovisko.STAV.ServaZakladaca_READY:= FALSE;
	END_IF	
	
	
	//P2 - status serva bunky READY//
	IF (P2_Srobovanie.ServoManipulOsX_M10.STATUS.Power_ON AND NOT P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR) AND
		(P2_Srobovanie.ServoManipulOsY_M9.STATUS.Power_ON AND NOT P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR) AND
		(P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Power_ON AND NOT P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR) THEN
		P2_Pracovisko.STAV.ServaBunky_READY:= TRUE;
	ELSE	
		P2_Pracovisko.STAV.ServaBunky_READY:= FALSE;
	END_IF	
	
	
	
	//********************************************Pracovisko è.3*******************************************
	//Volanie funkcie//
	P3_Srobovanie.ServoManipulOsY_M37();
	
	//P3 - status serva bunky READY//
	IF (P3_Srobovanie.ServoManipulOsY_M37.STATUS.Power_ON AND NOT P3_Srobovanie.ServoManipulOsY_M37.STATUS.ERROR) THEN
		P3_Pracovisko.STAV.ServaBunky_READY:= TRUE;
	ELSE	
		P3_Pracovisko.STAV.ServaBunky_READY:= FALSE;
	END_IF	
		

	//********************************************Pracovisko è.4*******************************************
	//Volanie funkcie//
	P4_Vytah.ServoZdvihuVytahu_M26();
	P4_Etiketovacka.ServoZdvihuEtiketovania_M28();
	
	
	//P4 - vytah servo READY//
	IF (P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Power_ON AND NOT P4_Vytah.ServoZdvihuVytahu_M26.STATUS.ERROR) THEN
		P4_Pracovisko.STAV.ServoVytahu_READY:= TRUE;
	ELSE	
		P4_Pracovisko.STAV.ServoVytahu_READY:= FALSE;
	END_IF
	
	
	//P4 - status serva bunky READY//
	IF (P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Power_ON AND NOT P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.ERROR) THEN
		P4_Pracovisko.STAV.ServaBunky_READY:= TRUE;
	ELSE	
		P4_Pracovisko.STAV.ServaBunky_READY:= FALSE;
	END_IF	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM



PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	//ENABLE pre limitnÈ snÌmaËe sa musÌ spustiù pred Power serva//
	
	//************************P1 - V˝tah********************************//
	//Servo zdvihu v˝ùahu//	
	IF P1_Vytah.ServoZdvihuVytahu_M31.STATUS.Communication_READY THEN
		ServoLimSnimace_5.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_5.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_5.AxisName:= ADR(gAxis_6);
	P1_Vytah.STAV.ServoZvihu_LimitSnimace_BUSY:= ServoLimSnimace_5.BUSY;
	ServoLimSnimace_5.HomingSwitch;
	ServoLimSnimace_5.NegativeLimitSwitch:= P1_Vytah.IN.ZdvihVytahu_LimSnimacNEG_IS60;
	ServoLimSnimace_5.PositiveLimitSwitch:= P1_Vytah.IN.ZdvihVytahu_LimSnimacPOS_IS61;
	ServoLimSnimace_5();
	
	//***************************P1 - Srobovanie********************************//
	//Servo - pojazd manipul·tora Os X//
	IF P1_Srobovanie.ServoManipulOsX_M20.STATUS.Communication_READY THEN
		ServoLimSnimace_6.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_6.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_6.AxisName:= ADR(gAxis_7);
	P1_Srobovanie.STAV.OsX_LimitSnimace_BUSY:= ServoLimSnimace_6.BUSY;
	ServoLimSnimace_6.HomingSwitch;
	ServoLimSnimace_6.NegativeLimitSwitch:= P1_Srobovanie.IN.ManipulOsX_LimSnimacPOS_IS43;
	ServoLimSnimace_6.PositiveLimitSwitch:= P1_Srobovanie.IN.ManipulOsX_LimSnimacNEG_IS42;
	ServoLimSnimace_6();
	
	//Servo - pojazd manipulatora Os Y//
	IF P1_Srobovanie.ServoManipulOsY_M19.STATUS.Communication_READY THEN
		ServoLimSnimace_7.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_7.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_7.AxisName:= ADR(gAxis_8);
	P1_Srobovanie.STAV.OsY_LimitSnimace_BUSY:= ServoLimSnimace_7.BUSY;
	ServoLimSnimace_7.HomingSwitch;
	ServoLimSnimace_7.NegativeLimitSwitch:= P1_Srobovanie.IN.ManipulOsY_LimSnimacPOS_IS41;
	ServoLimSnimace_7.PositiveLimitSwitch:= P1_Srobovanie.IN.ManipulOsY_LimSnimacNEG_IS40;
	ServoLimSnimace_7();
	
	
	
	
	//***************************P2 - ZakladaË tesnenia ******************//
	//Servo - zdvihu//
	IF P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.Communication_READY THEN
		ServoLimSnimace_0.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_0.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_0.AxisName:= ADR(gAxis_1);
	P2_ZakladacTesnenia.STAV.ServoZvihu_LimitSnimace_BUSY:= ServoLimSnimace_0.BUSY;
	ServoLimSnimace_0.HomingSwitch:= P2_ZakladacTesnenia.IN.ZdvihZaklad_RefSnimac_IS8;
	ServoLimSnimace_0.NegativeLimitSwitch;
	ServoLimSnimace_0.PositiveLimitSwitch;
	ServoLimSnimace_0();
	
	//Servo - pojazdu//
	IF P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.Communication_READY THEN
		ServoLimSnimace_1.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_1.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_1.AxisName:= ADR(gAxis_2);
	P2_ZakladacTesnenia.STAV.ServoPojazdu_LimitSnimace_BUSY:= ServoLimSnimace_1.BUSY;
	ServoLimSnimace_1.HomingSwitch;
	ServoLimSnimace_1.NegativeLimitSwitch;
	ServoLimSnimace_1.PositiveLimitSwitch;
	ServoLimSnimace_1();
	
	//***************************P2 - Srobovanie********************************//
	//Servo - pojazd manipul·tora Os X//
	IF P2_Srobovanie.ServoManipulOsX_M10.STATUS.Communication_READY THEN
		ServoLimSnimace_2.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_2.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_2.AxisName:= ADR(gAxis_3);
	P2_Srobovanie.STAV.OsX_LimitSnimace_BUSY:= ServoLimSnimace_2.BUSY;
	ServoLimSnimace_2.HomingSwitch;
	ServoLimSnimace_2.NegativeLimitSwitch:= P2_Srobovanie.IN.ManipulOsX_LimSnimacNEG_IS22;
	ServoLimSnimace_2.PositiveLimitSwitch:= P2_Srobovanie.IN.ManipulOsX_LimSnimacPOS_IS21;
	ServoLimSnimace_2();
	
	//Servo - pojazd manipulatora Os Y//
	IF P2_Srobovanie.ServoManipulOsY_M9.STATUS.Communication_READY THEN
		ServoLimSnimace_3.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_3.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_3.AxisName:= ADR(gAxis_4);
	P2_Srobovanie.STAV.OsY_LimitSnimace_BUSY:= ServoLimSnimace_3.BUSY;
	ServoLimSnimace_3.HomingSwitch;
	ServoLimSnimace_3.NegativeLimitSwitch:= P2_Srobovanie.IN.ManipulOsY_LimSnimacNEG_IS20;
	ServoLimSnimace_3.PositiveLimitSwitch:= P2_Srobovanie.IN.ManipulOsY_LimSnimacPOS_IS19;
	ServoLimSnimace_3();
	
	//*****************************P2 Zv·ranie************************************//
	//Servo zdvihu zv·rania//
	IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.Communication_READY THEN
		ServoLimSnimace_4.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_4.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_4.AxisName:= ADR(gAxis_5);
	P2_Zvaranie.STAV.ServoZvihu_LimitSnimace_BUSY:= ServoLimSnimace_4.BUSY;
	ServoLimSnimace_4.HomingSwitch:= P2_Zvaranie.IN.ZdvihZvarania_RefSnimac_IS9;
	ServoLimSnimace_4.NegativeLimitSwitch;
	ServoLimSnimace_4.PositiveLimitSwitch;
	ServoLimSnimace_4();
	
	//***************************P3 - Srobovanie********************************//
	//Servo - pojazd manipulatora Os Y//
	IF P3_Srobovanie.ServoManipulOsY_M37.STATUS.Communication_READY THEN
		ServoLimSnimace_8.ENABLE:= TRUE;
	ELSE	
		ServoLimSnimace_8.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_8.AxisName:= ADR(gAxis_9);
	P3_Srobovanie.STAV.OsY_LimitSnimace_BUSY:= ServoLimSnimace_8.BUSY;
	ServoLimSnimace_8.HomingSwitch;
	ServoLimSnimace_8.NegativeLimitSwitch:= P3_Srobovanie.IN.ManipulOsY_LimSnimacNEG_IS76;
	ServoLimSnimace_8.PositiveLimitSwitch:= P3_Srobovanie.IN.ManipulOsY_LimSnimacPOS_IS75;
	ServoLimSnimace_8();
	
	
	//***************************P4 - Vytah***************************************//
	//Servo zdvihu v˝ùahu//	
	IF P4_Vytah.ServoZdvihuVytahu_M26.STATUS.Communication_READY THEN
		ServoLimSnimace_9.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_9.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_9.AxisName:= ADR(gAxis_10);
	P4_Vytah.STAV.ServoZvihu_LimitSnimace_BUSY:= ServoLimSnimace_9.BUSY;
	ServoLimSnimace_9.HomingSwitch;
	ServoLimSnimace_9.NegativeLimitSwitch:= P4_Vytah.IN.ZdvihVytahu_LimSnimacNEG_IS56;
	ServoLimSnimace_9.PositiveLimitSwitch:= P4_Vytah.IN.ZdvihVytahu_LimSnimacPOS_IS57;
	ServoLimSnimace_9();
	
	
	//****************************P4 - Etiketovanie*****************************//
	//Servo zdvihu etiketovania//
	IF P4_Etiketovacka.ServoZdvihuEtiketovania_M28.STATUS.Communication_READY THEN
		ServoLimSnimace_10.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_10.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_10.AxisName:= ADR(gAxis_11);
	P4_Etiketovacka.STAV.ServoZvihu_LimitSnimace_BUSY:= ServoLimSnimace_10.BUSY;
	ServoLimSnimace_10.HomingSwitch:= P4_Etiketovacka.IN.ZdvihEtiketovania_RefSnimac_IS59;
	ServoLimSnimace_10.NegativeLimitSwitch;
	ServoLimSnimace_10.PositiveLimitSwitch;
	ServoLimSnimace_10();
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


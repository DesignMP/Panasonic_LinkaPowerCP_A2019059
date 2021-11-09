
ACTION AtlasCopcoKomunikacia: 

    M4_PrevodMomentu();
    M5_PrevodMomentu();
	K30_PrevodMomentu();
	//*********************************************************Skrutkovacka M5********************************************************************************//
	//Vstupy z AtlasCopco do PLC//
    P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokPotvrdeny:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].0;
    P1_Srobovanie.Skrutkovacka_M5.Stav_EmergencyStop:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].1;
    P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].2;
    P1_Srobovanie.Skrutkovacka_M5.Stav_MANUAL:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].3;
    P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].4;
    P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].5;
    P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].6;
    P1_Srobovanie.Skrutkovacka_M5.Stav_SmerOtacania_VPRED:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].7;
    P1_Srobovanie.Skrutkovacka_M5.Stav_BUSY:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].8;
    P1_Srobovanie.Skrutkovacka_M5.Stav_ControlerSwitch_ON:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].9;
    P1_Srobovanie.Skrutkovacka_M5.Stav_Station_READY:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].10;
    P1_Srobovanie.Skrutkovacka_M5.Stav_NastrojPripojeny:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].11;
    P1_Srobovanie.Skrutkovacka_M5.Stav_NastrojUtahuje:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].0:= P1_Srobovanie.Skrutkovacka_M5.RESET_Poruchy;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].1:= P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].2:= P1_Srobovanie.Skrutkovacka_M5.START_Skrutkovania;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].3:= P1_Srobovanie.Skrutkovacka_M5.START_Utahovania;
	
	
    //Èíslo zadaného programu//
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].16:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.0;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].17:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.1;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].18:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.2;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].19:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.3;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].20:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.4;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].21:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.5;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].22:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.6;
    P1_Srobovanie.PAR.M5_AllasCopcoOutputs[0].23:= P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu.7;
	
	
    //Èíslo aktuálneho programu//
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].8;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].9;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].10;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].11;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].12;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].13;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].14;
    P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[5].15;
	
	
    //Program è.1 - skrutkovanie do plastu
    //Program è.2 - skrutkovanie do kovu
	
    //Dosiahnutý moment//
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].24;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].25;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].26;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].27;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].28;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].29;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].30;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].31;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].16;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].17;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].18;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].19;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].20;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].21;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].22;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].23;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.16:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].8;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.17:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].9;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.18:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].10;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.19:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].11;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.20:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].12;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.21:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].13;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.22:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].14;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.23:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].15;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.24:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].0;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.25:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].1;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.26:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].2;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.27:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].3;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.28:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].4;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.29:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].5;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.30:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].6;
//    P1_Srobovanie.STAV.M5_DosiahnutyMoment.31:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1].7;
//    M5_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M5_DosiahnutyMoment);
//    IF M5_DosiahnutyMoment_REAL > 0 THEN
//        P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:= M5_DosiahnutyMoment_REAL/100;
//    ELSE
//        P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
    
    M5_PrevodMomentu.AtlasAktualnyMoment:=P1_Srobovanie.PAR.M5_AtlasCopcoInputs[1];
    P1_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:=M5_PrevodMomentu.AktualnyMoment;
    
    
   
    
    
    
    
    //Moment - Tolerancia MAX//
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].24;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].25;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].26;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].27;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].28;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].29;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].30;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].31;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].16;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].17;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].18;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].19;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].20;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].21;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].22;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].23;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.16:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].8;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.17:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].9;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.18:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].10;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.19:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].11;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.20:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].12;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.21:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].13;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.22:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].14;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.23:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].15;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.24:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].0;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.25:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].1;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.26:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].2;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.27:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].3;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.28:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].4;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.29:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].5;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.30:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].6;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX.31:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3].7;
//    M5_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX);
//    IF M5_Moment_ToleranciaMAX_REAL > 0 THEN
//        P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:= M5_Moment_ToleranciaMAX_REAL/100;
//    ELSE
//        P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:= 0.0;
    //    END_IF
    
        
    M5_PrevodMomentu.AtlasMaximalnaTolerancia:=P1_Srobovanie.PAR.M5_AtlasCopcoInputs[3];    
    P1_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:=M5_PrevodMomentu.ToleranciaMAX;
    
        
    
    //Moment - Tolerancia MIN//
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].24;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].25;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].26;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].27;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].28;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].29;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].30;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].31;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].16;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].17;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].18;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].19;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].20;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].21;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].22;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].23;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.16:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].8;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.17:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].9;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.18:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].10;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.19:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].11;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.20:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].12;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.21:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].13;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.22:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].14;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.23:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].15;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.24:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].0;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.25:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].1;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.26:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].2;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.27:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].3;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.28:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].4;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.29:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].5;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.30:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].6;
//    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN.31:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4].7;
//    M5_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN);
//    IF M5_Moment_ToleranciaMIN_REAL > 0 THEN
//        P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:= M5_Moment_ToleranciaMIN_REAL /100;
//    ELSE
//        P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:= 0.0;
    //    END_IF
    
    M5_PrevodMomentu.AtlasMinimalnaTolerancia:=P1_Srobovanie.PAR.M5_AtlasCopcoInputs[4];    
    P1_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:=M5_PrevodMomentu.ToleranciaMIN;
    
    
	
    //Dosiahnutý úhol//
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].24;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].25;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].26;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].27;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].28;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].29;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].30;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].31;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].16;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].17;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].18;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].19;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].20;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].21;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].22;
    P1_Srobovanie.STAV.M5_DosiahnutyUhol.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].8;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].9;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].10;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].11;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].12;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].13;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].14;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].15;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].0;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].1;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].2;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].3;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].4;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].5;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].6;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.0:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].24;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.1:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].25;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.2:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].26;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.3:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].27;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.4:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].28;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.5:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].29;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.6:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].30;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.7:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].31;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.8:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].16;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.9:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].17;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.10:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].18;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.11:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].19;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.12:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].20;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.13:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].21;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.14:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].22;
    P1_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.15:= P1_Srobovanie.PAR.M5_AtlasCopcoInputs[2].23;
    
    
    
    
	
	
	
    //***************************************************************Skrutkovacka M4************************************************************************************//
    //Vstupy z AtlasCopco do PLC//
    P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokPotvrdeny:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].0;
    P1_Srobovanie.Skrutkovacka_M4.Stav_EmergencyStop:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].1;
    P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].2;
    P1_Srobovanie.Skrutkovacka_M4.Stav_MANUAL:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].3;
    P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].4;
    P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].5;
    P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].6;
    P1_Srobovanie.Skrutkovacka_M4.Stav_SmerOtacania_VPRED:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].7;
    P1_Srobovanie.Skrutkovacka_M4.Stav_BUSY:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].8;
    P1_Srobovanie.Skrutkovacka_M4.Stav_ControlerSwitch_ON:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].9;
    P1_Srobovanie.Skrutkovacka_M4.Stav_Station_READY:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].10;
    P1_Srobovanie.Skrutkovacka_M4.Stav_NastrojPripojeny:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].11;
    P1_Srobovanie.Skrutkovacka_M4.Stav_NastrojUtahuje:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P1_Srobovanie.PAR.M4_AllasCopcoOutputs[0].0:= P1_Srobovanie.Skrutkovacka_M4.RESET_Poruchy;
    P1_Srobovanie.PAR.M4_AllasCopcoOutputs[0].1:= P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov;
    P1_Srobovanie.PAR.M4_AllasCopcoOutputs[0].2:= P1_Srobovanie.Skrutkovacka_M4.START_Skrutkovania;
    P1_Srobovanie.PAR.M4_AllasCopcoOutputs[0].3:= P1_Srobovanie.Skrutkovacka_M4.START_Utahovania;
	
	
    //Dosiahnutý moment//
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].24;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].25;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].26;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].27;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].28;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].29;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].30;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].31;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].16;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].17;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].18;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].19;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].20;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].21;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].22;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].23;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.16:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].8;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.17:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].9;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.18:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].10;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.19:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].11;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.20:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].12;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.21:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].13;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.22:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].14;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.23:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].15;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.24:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].0;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.25:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].1;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.26:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].2;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.27:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].3;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.28:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].4;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.29:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].5;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.30:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].6;
//    P1_Srobovanie.STAV.M4_DosiahnutyMoment.31:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1].7;
//    M4_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M4_DosiahnutyMoment);
//    IF M4_DosiahnutyMoment_REAL > 0 THEN
//        P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= (M4_DosiahnutyMoment_REAL*0.65)/42598;
//    ELSE
//        P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
    
    M4_PrevodMomentu.AtlasAktualnyMoment:=P1_Srobovanie.PAR.M4_AtlasCopcoInputs[1];    
    P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:=M4_PrevodMomentu.AktualnyMoment;
    
    
    
    (*P1_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= M4_DosiahnutyMoment_REAL/100;*)
    
    //Moment - Tolerancia MAX//
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].24;
    //    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].25;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].26;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].27;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].28;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].29;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].30;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].31;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].16;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].17;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].18;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].19;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].20;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].21;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].22;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].23;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.16:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].8;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.17:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].9;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.18:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].10;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.19:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].11;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.20:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].12;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.21:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].13;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.22:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].14;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.23:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].15;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.24:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].0;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.25:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].1;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.26:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].2;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.27:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].3;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.28:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].4;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.29:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].5;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.30:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].6;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX.31:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3].7;
//    M4_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX);
//    IF M4_Moment_ToleranciaMAX_REAL > 0 THEN
//        P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= (M4_Moment_ToleranciaMAX_REAL*0.65)/42598;
//    ELSE
//        P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= 0.0;
//    END_IF
    (*P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= M4_Moment_ToleranciaMAX_REAL/100;*)
    
    
    M4_PrevodMomentu.AtlasMaximalnaTolerancia:=P1_Srobovanie.PAR.M4_AtlasCopcoInputs[3];    
    P1_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:=M4_PrevodMomentu.ToleranciaMAX;
    
    
    
    
    //Moment - Tolerancia MIN//
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].24;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].25;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].26;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].27;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].28;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].29;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].30;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].31;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].16;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].17;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].18;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].19;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].20;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].21;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].22;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].23;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.16:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].8;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.17:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].9;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.18:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].10;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.19:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].11;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.20:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].12;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.21:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].13;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.22:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].14;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.23:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].15;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.24:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].0;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.25:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].1;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.26:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].2;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.27:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].3;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.28:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].4;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.29:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].5;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.30:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].6;
//    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN.31:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4].7;
//    M4_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN);
//    IF M4_Moment_ToleranciaMIN_REAL > 0 THEN
//        P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= (M4_Moment_ToleranciaMIN_REAL*0.65)/42598;
//    ELSE
//        P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= 0.0;
//    END_IF
//	
//    
    (*P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= M4_Moment_ToleranciaMIN_REAL /100;*)
	
    M4_PrevodMomentu.AtlasMinimalnaTolerancia:=P1_Srobovanie.PAR.M4_AtlasCopcoInputs[4];    
    P1_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:=M4_PrevodMomentu.ToleranciaMIN;
    
    
    
    
    
    //Dosiahnutý úhol//
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].24;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].25;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].26;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].27;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].28;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].29;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].30;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].31;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].16;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].17;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].18;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].19;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].20;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].21;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].22;
    P1_Srobovanie.STAV.M4_DosiahnutyUhol.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].8;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].9;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].10;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].11;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].12;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].13;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].14;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].15;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].0;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].1;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].2;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].3;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].4;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].5;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].6;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.0:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].24;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.1:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].25;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.2:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].26;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.3:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].27;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.4:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].28;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.5:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].29;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.6:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].30;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.7:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].31;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.8:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].16;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.9:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].17;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.10:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].18;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.11:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].19;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.12:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].20;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.13:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].21;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.14:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].22;
    P1_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.15:= P1_Srobovanie.PAR.M4_AtlasCopcoInputs[2].23;
    
	
	
	
	
	
    //*********************************Skrutkovacka K30*******************************************************************************//
    //Vstupy z AtlasCopco do PLC//
    P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokPotvrdeny:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].0;
    P1_Srobovanie.Skrutkovacka_K30.Stav_EmergencyStop:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].1;
    P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].2;
    P1_Srobovanie.Skrutkovacka_K30.Stav_MANUAL:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].3;
    P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].4;
    P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].5;
    P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].6;
    P1_Srobovanie.Skrutkovacka_K30.Stav_SmerOtacania_VPRED:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].7;
    P1_Srobovanie.Skrutkovacka_K30.Stav_BUSY:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].8; //Další byte  
    P1_Srobovanie.Skrutkovacka_K30.Stav_ControlerSwitch_ON:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].9;
    P1_Srobovanie.Skrutkovacka_K30.Stav_Station_READY:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].10;
    P1_Srobovanie.Skrutkovacka_K30.Stav_NastrojPripojeny:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].11;
    P1_Srobovanie.Skrutkovacka_K30.Stav_NastrojUtahuje:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P1_Srobovanie.PAR.K30_AllasCopcoOutputs[0].0:= P1_Srobovanie.Skrutkovacka_K30.RESET_Poruchy;
    P1_Srobovanie.PAR.K30_AllasCopcoOutputs[0].1:= P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov;
    P1_Srobovanie.PAR.K30_AllasCopcoOutputs[0].2:= P1_Srobovanie.Skrutkovacka_K30.START_Skrutkovania;
    P1_Srobovanie.PAR.K30_AllasCopcoOutputs[0].3:= P1_Srobovanie.Skrutkovacka_K30.START_Utahovania;
	
	
    //Dosiahnutý moment//
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].24;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].25;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].26;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].27;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].28;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].29;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].30;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].31;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].16;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].17;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].18;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].19;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].20;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].21;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].22;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].23;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.16:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].8;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.17:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].9;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.18:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].10;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.19:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].11;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.20:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].12;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.21:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].13;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.22:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].14;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.23:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].15;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.24:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].0;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.25:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].1;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.26:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].2;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.27:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].3;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.28:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].4;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.29:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].5;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.30:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].6;
//    P1_Srobovanie.STAV.K30_DosiahnutyMoment.31:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1].7;
//    K30_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.K30_DosiahnutyMoment);
//    IF K30_DosiahnutyMoment_REAL > 0 THEN
//        P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL:= K30_DosiahnutyMoment_REAL/100;
//    ELSE
//        P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
	
    (*P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL:= (K30_DosiahnutyMoment_REAL*0.65)/42598;*)
    
    K30_PrevodMomentu.AtlasAktualnyMoment:=P1_Srobovanie.PAR.K30_AtlasCopcoInputs[1];    
    P1_Srobovanie.STAV.K30_DosiahnutyMoment_REAL:=K30_PrevodMomentu.AktualnyMoment;
    
    
    
    //Moment - Tolerancia MAX//
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].24;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].25;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].26;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].27;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].28;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].29;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].30;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].31;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].16;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].17;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].18;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].19;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].20;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].21;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].22;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].23;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.16:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].8;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.17:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].9;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.18:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].10;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.19:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].11;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.20:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].12;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.21:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].13;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.22:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].14;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.23:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].15;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.24:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].0;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.25:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].1;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.26:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].2;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.27:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].3;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.28:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].4;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.29:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].5;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.30:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].6;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX.31:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3].7;
//    K30_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX);
//    IF K30_Moment_ToleranciaMAX_REAL > 0 THEN
//       P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL:= K30_Moment_ToleranciaMAX_REAL/100; 
//    ELSE
//        P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL:= 0.0;
//    END_IF
    
    (*P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL:= (K30_Moment_ToleranciaMAX_REAL*0.65)/42598;*)
    K30_PrevodMomentu.AtlasMaximalnaTolerancia:=P1_Srobovanie.PAR.K30_AtlasCopcoInputs[3];    
    P1_Srobovanie.STAV.K30_Moment_ToleranciaMAX_REAL:=K30_PrevodMomentu.ToleranciaMAX;
    
    
    //Moment - Tolerancia MIN//
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].24;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].25;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].26;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].27;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].28;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].29;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].30;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].31;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].16;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].17;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].18;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].19;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].20;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].21;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].22;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].23;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.16:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].8;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.17:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].9;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.18:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].10;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.19:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].11;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.20:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].12;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.21:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].13;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.22:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].14;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.23:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].15;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.24:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].0;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.25:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].1;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.26:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].2;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.27:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].3;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.28:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].4;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.29:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].5;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.30:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].6;
//    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN.31:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4].7;
//    K30_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN);
//    IF K30_Moment_ToleranciaMIN_REAL > 0 THEN
//        P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL:= K30_Moment_ToleranciaMIN_REAL /100;
//    ELSE
//        P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL:= 0.0;
//    END_IF
	
    (*P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL:= (K30_Moment_ToleranciaMIN_REAL*0.65)/42598;*)
    K30_PrevodMomentu.AtlasMinimalnaTolerancia:=P1_Srobovanie.PAR.K30_AtlasCopcoInputs[4];    
    P1_Srobovanie.STAV.K30_Moment_ToleranciaMIN_REAL:=K30_PrevodMomentu.ToleranciaMIN;
    
    
    //Dosiahnutý úhol//
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].24;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].25;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].26;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].27;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].28;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].29;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].30;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].31;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].16;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].17;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].18;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].19;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].20;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].21;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].22;
    P1_Srobovanie.STAV.K30_DosiahnutyUhol.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].8;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].9;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].10;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].11;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].12;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].13;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].14;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].15;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].0;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].1;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].2;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].3;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].4;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].5;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].6;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMAX.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.0:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].24;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.1:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].25;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.2:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].26;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.3:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].27;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.4:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].28;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.5:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].29;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.6:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].30;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.7:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].31;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.8:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].16;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.9:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].17;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.10:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].18;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.11:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].19;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.12:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].20;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.13:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].21;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.14:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].22;
    P1_Srobovanie.STAV.K30_Uhol_ToleranciaMIN.15:= P1_Srobovanie.PAR.K30_AtlasCopcoInputs[2].23;
    
	
	
	
	
	
	
	
END_ACTION

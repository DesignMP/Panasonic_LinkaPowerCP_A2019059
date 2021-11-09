
ACTION AtlasCopcoKomunikacia: 

    M5_PrevodMomentu();
    M4_PrevodMomentu();
    M6_PrevodMomentu();
	
	//*********************************************************Skrutkovacka M5******************************************************************//
	//Vstupy z AtlasCopco do PLC//
    P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokPotvrdeny:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].0;
    P2_Srobovanie.Skrutkovacka_M5.Stav_EmergencyStop:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].1;
    P2_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].2;
    P2_Srobovanie.Skrutkovacka_M5.Stav_MANUAL:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].3;
    P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].4;
    P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].5;
    P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].6;
    P2_Srobovanie.Skrutkovacka_M5.Stav_SmerOtacania_VPRED:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].7;
    P2_Srobovanie.Skrutkovacka_M5.Stav_BUSY:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].8;
    P2_Srobovanie.Skrutkovacka_M5.Stav_ControlerSwitch_ON:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].9;
    P2_Srobovanie.Skrutkovacka_M5.Stav_Station_READY:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].10;
    P2_Srobovanie.Skrutkovacka_M5.Stav_NastrojPripojeny:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].11;
    P2_Srobovanie.Skrutkovacka_M5.Stav_NastrojUtahuje:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P2_Srobovanie.PAR.M5_AllasCopcoOutputs[0].0:= P2_Srobovanie.Skrutkovacka_M5.RESET_Poruchy;
    P2_Srobovanie.PAR.M5_AllasCopcoOutputs[0].1:= P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov;
    P2_Srobovanie.PAR.M5_AllasCopcoOutputs[0].2:= P2_Srobovanie.Skrutkovacka_M5.START_Skrutkovania;
    P2_Srobovanie.PAR.M5_AllasCopcoOutputs[0].3:= P2_Srobovanie.Skrutkovacka_M5.START_Utahovania;
	
	
    //Dosiahnutý moment//
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].24;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].25;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].26;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].27;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].28;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].29;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].30;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].31;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].16;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].17;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].18;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].19;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].20;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].21;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].22;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].23;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.16:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].8;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.17:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].9;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.18:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].10;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.19:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].11;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.20:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].12;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.21:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].13;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.22:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].14;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.23:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].15;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.24:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].0;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.25:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].1;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.26:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].2;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.27:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].3;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.28:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].4;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.29:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].5;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.30:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].6;
//    P2_Srobovanie.STAV.M5_DosiahnutyMoment.31:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1].7;
//    M5_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M5_DosiahnutyMoment);
//    IF M5_DosiahnutyMoment_REAL > 0 THEN
//        P2_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:= M5_DosiahnutyMoment_REAL/100;
//    ELSE
//        P2_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
	
    
    M5_PrevodMomentu.AtlasAktualnyMoment:=P2_Srobovanie.PAR.M5_AtlasCopcoInputs[1];    
    P2_Srobovanie.STAV.M5_DosiahnutyMoment_REAL:=M5_PrevodMomentu.AktualnyMoment;
    
    
    
    
    
    //Moment - Tolerancia MAX//
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].24;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].25;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].26;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].27;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].28;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].29;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].30;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].31;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].16;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].17;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].18;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].19;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].20;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].21;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].22;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].23;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.16:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].8;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.17:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].9;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.18:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].10;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.19:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].11;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.20:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].12;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.21:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].13;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.22:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].14;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.23:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].15;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.24:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].0;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.25:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].1;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.26:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].2;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.27:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].3;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.28:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].4;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.29:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].5;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.30:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].6;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX.31:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3].7;
//    M5_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX);
//    IF M5_Moment_ToleranciaMAX_REAL > 0 THEN
//        P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:= M5_Moment_ToleranciaMAX_REAL/100;
//    ELSE
//        P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:= 0.0;
//    END_IF
    
    
    M5_PrevodMomentu.AtlasMaximalnaTolerancia:=P2_Srobovanie.PAR.M5_AtlasCopcoInputs[3];    
    P2_Srobovanie.STAV.M5_Moment_ToleranciaMAX_REAL:=M5_PrevodMomentu.ToleranciaMAX;
    
    
    
    
    //Moment - Tolerancia MIN//
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].24;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].25;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].26;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].27;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].28;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].29;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].30;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].31;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].16;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].17;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].18;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].19;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].20;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].21;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].22;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].23;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.16:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].8;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.17:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].9;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.18:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].10;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.19:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].11;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.20:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].12;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.21:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].13;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.22:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].14;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.23:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].15;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.24:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].0;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.25:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].1;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.26:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].2;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.27:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].3;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.28:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].4;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.29:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].5;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.30:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].6;
//    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN.31:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4].7;
//    M5_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN);
//    IF M5_Moment_ToleranciaMIN_REAL > 0 THEN
//        P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:= M5_Moment_ToleranciaMIN_REAL /100;
//    ELSE
//        P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:= 0.0;
    //    END_IF
    
    
    M5_PrevodMomentu.AtlasMinimalnaTolerancia:=P2_Srobovanie.PAR.M5_AtlasCopcoInputs[4];    
    P2_Srobovanie.STAV.M5_Moment_ToleranciaMIN_REAL:=M5_PrevodMomentu.ToleranciaMIN;
    
	
    //Dosiahnutý úhol//
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].24;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].25;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].26;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].27;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].28;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].29;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].30;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].31;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].16;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].17;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].18;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].19;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].20;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].21;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].22;
    P2_Srobovanie.STAV.M5_DosiahnutyUhol.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].8;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].9;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].10;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].11;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].12;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].13;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].14;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].15;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].0;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].1;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].2;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].3;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].4;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].5;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].6;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMAX.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.0:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].24;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.1:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].25;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.2:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].26;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.3:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].27;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.4:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].28;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.5:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].29;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.6:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].30;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.7:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].31;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.8:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].16;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.9:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].17;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.10:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].18;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.11:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].19;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.12:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].20;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.13:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].21;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.14:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].22;
    P2_Srobovanie.STAV.M5_Uhol_ToleranciaMIN.15:= P2_Srobovanie.PAR.M5_AtlasCopcoInputs[2].23;
    
	
	
	
	
	
	
	
    //*****************************************************************************Skrutkovacka M4*************************************************************//
    //Vstupy z AtlasCopco do PLC//
    P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokPotvrdeny:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].0;
    P2_Srobovanie.Skrutkovacka_M4.Stav_EmergencyStop:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].1;
    P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].2;
    P2_Srobovanie.Skrutkovacka_M4.Stav_MANUAL:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].3;
    P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].4;
    P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].5;
    P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].6;
    P2_Srobovanie.Skrutkovacka_M4.Stav_SmerOtacania_VPRED:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].7;
    P2_Srobovanie.Skrutkovacka_M4.Stav_BUSY:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].8;
    P2_Srobovanie.Skrutkovacka_M4.Stav_ControlerSwitch_ON:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].9;
    P2_Srobovanie.Skrutkovacka_M4.Stav_Station_READY:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].10;
    P2_Srobovanie.Skrutkovacka_M4.Stav_NastrojPripojeny:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].11;
    P2_Srobovanie.Skrutkovacka_M4.Stav_NastrojUtahuje:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P2_Srobovanie.PAR.M4_AllasCopcoOutputs[0].0:= P2_Srobovanie.Skrutkovacka_M4.RESET_Poruchy;
    P2_Srobovanie.PAR.M4_AllasCopcoOutputs[0].1:= P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov;
    P2_Srobovanie.PAR.M4_AllasCopcoOutputs[0].2:= P2_Srobovanie.Skrutkovacka_M4.START_Skrutkovania;
    P2_Srobovanie.PAR.M4_AllasCopcoOutputs[0].3:= P2_Srobovanie.Skrutkovacka_M4.START_Utahovania;
	
	
    //Dosiahnutý moment//
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].24;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].25;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].26;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].27;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].28;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].29;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].30;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].31;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].16;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].17;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].18;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].19;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].20;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].21;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].22;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].23;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.16:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].8;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.17:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].9;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.18:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].10;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.19:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].11;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.20:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].12;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.21:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].13;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.22:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].14;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.23:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].15;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.24:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].0;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.25:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].1;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.26:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].2;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.27:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].3;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.28:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].4;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.29:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].5;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.30:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].6;
//    P2_Srobovanie.STAV.M4_DosiahnutyMoment.31:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1].7;
//    M4_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M4_DosiahnutyMoment);
//    IF M4_DosiahnutyMoment_REAL > 0 THEN
//      P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= (M4_DosiahnutyMoment_REAL*2.1)/131082;  
//    ELSE
//        P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
//    (*P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:= M4_DosiahnutyMoment_REAL/100;*)    
        
    
    M4_PrevodMomentu.AtlasAktualnyMoment:=P2_Srobovanie.PAR.M4_AtlasCopcoInputs[1];    
    P2_Srobovanie.STAV.M4_DosiahnutyMoment_REAL:=M4_PrevodMomentu.AktualnyMoment;
    
    
        
    //Moment - Tolerancia MAX//
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].24;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].25;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].26;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].27;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].28;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].29;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].30;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].31;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].16;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].17;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].18;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].19;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].20;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].21;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].22;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].23;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.16:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].8;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.17:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].9;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.18:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].10;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.19:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].11;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.20:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].12;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.21:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].13;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.22:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].14;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.23:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].15;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.24:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].0;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.25:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].1;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.26:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].2;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.27:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].3;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.28:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].4;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.29:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].5;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.30:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].6;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX.31:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3].7;
//    M4_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX);
//    IF M4_Moment_ToleranciaMAX_REAL > 0 THEN
//        P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= (M4_Moment_ToleranciaMAX_REAL*2.1)/131082;
//    ELSE
//        P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= 0.0;
//    END_IF
    
    M4_PrevodMomentu.AtlasMaximalnaTolerancia:=P2_Srobovanie.PAR.M4_AtlasCopcoInputs[3];    
    P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:=M4_PrevodMomentu.ToleranciaMAX;
    
    
    (*P2_Srobovanie.STAV.M4_Moment_ToleranciaMAX_REAL:= M4_Moment_ToleranciaMAX_REAL /100;*)
    
    //Moment - Tolerancia MIN//
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].24;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].25;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].26;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].27;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].28;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].29;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].30;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].31;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].16;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].17;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].18;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].19;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].20;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].21;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].22;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].23;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.16:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].8;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.17:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].9;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.18:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].10;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.19:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].11;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.20:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].12;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.21:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].13;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.22:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].14;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.23:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].15;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.24:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].0;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.25:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].1;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.26:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].2;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.27:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].3;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.28:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].4;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.29:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].5;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.30:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].6;
//    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN.31:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4].7;
//    M4_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN);
//    IF M4_Moment_ToleranciaMIN_REAL > 0 THEN
//        P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= (M4_Moment_ToleranciaMIN_REAL*2.1)/131082;
//    ELSE
//        P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= 0.0;
//    END_IF
//	
    
    
    M4_PrevodMomentu.AtlasMinimalnaTolerancia:=P2_Srobovanie.PAR.M4_AtlasCopcoInputs[4];    
    P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:=M4_PrevodMomentu.ToleranciaMIN;
    
    
    
    
    
    (*P2_Srobovanie.STAV.M4_Moment_ToleranciaMIN_REAL:= M4_Moment_ToleranciaMIN_REAL /100;*)
	
    //Dosiahnutý úhol//
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].24;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].25;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].26;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].27;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].28;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].29;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].30;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].31;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].16;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].17;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].18;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].19;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].20;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].21;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].22;
    P2_Srobovanie.STAV.M4_DosiahnutyUhol.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].8;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].9;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].10;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].11;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].12;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].13;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].14;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].15;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].0;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].1;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].2;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].3;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].4;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].5;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].6;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMAX.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.0:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].24;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.1:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].25;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.2:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].26;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.3:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].27;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.4:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].28;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.5:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].29;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.6:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].30;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.7:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].31;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.8:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].16;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.9:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].17;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.10:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].18;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.11:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].19;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.12:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].20;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.13:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].21;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.14:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].22;
    P2_Srobovanie.STAV.M4_Uhol_ToleranciaMIN.15:= P2_Srobovanie.PAR.M4_AtlasCopcoInputs[2].23;
    
	
	
	
	
	
	
    //*************************************************************Skrutkovacka M6*******************************************************************************//
    //Vstupy z AtlasCopco do PLC//
    P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokPotvrdeny:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].0;
    P2_Srobovanie.Skrutkovacka_M6.Stav_EmergencyStop:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].1;
    P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].2;
    P2_Srobovanie.Skrutkovacka_M6.Stav_MANUAL:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].3;
    P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].4;
    P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].5;
    P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].6;
    P2_Srobovanie.Skrutkovacka_M6.Stav_SmerOtacania_VPRED:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].7;
    P2_Srobovanie.Skrutkovacka_M6.Stav_BUSY:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].8;
    P2_Srobovanie.Skrutkovacka_M6.Stav_ControlerSwitch_ON:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].9;
    P2_Srobovanie.Skrutkovacka_M6.Stav_Station_READY:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].10;
    P2_Srobovanie.Skrutkovacka_M6.Stav_NastrojPripojeny:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].11;
    P2_Srobovanie.Skrutkovacka_M6.Stav_NastrojUtahuje:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].12;
	
	
    //Výstupy z PLC do AtlasCopco//
    P2_Srobovanie.PAR.M6_AllasCopcoOutputs[0].0:= P2_Srobovanie.Skrutkovacka_M6.RESET_Poruchy;
    P2_Srobovanie.PAR.M6_AllasCopcoOutputs[0].1:= P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov;
    P2_Srobovanie.PAR.M6_AllasCopcoOutputs[0].2:= P2_Srobovanie.Skrutkovacka_M6.START_Skrutkovania;
    P2_Srobovanie.PAR.M6_AllasCopcoOutputs[0].3:= P2_Srobovanie.Skrutkovacka_M6.START_Utahovania;
	
    //Dosiahnutý moment//
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].24;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].25;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].26;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].27;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].28;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].29;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].30;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].31;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].16;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].17;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].18;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].19;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].20;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].21;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].22;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].23;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.16:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].8;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.17:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].9;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.18:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].10;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.19:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].11;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.20:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].12;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.21:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].13;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.22:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].14;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.23:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].15;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.24:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].0;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.25:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].1;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.26:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].2;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.27:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].3;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.28:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].4;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.29:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].5;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.30:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].6;
//    P2_Srobovanie.STAV.M6_DosiahnutyMoment.31:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1].7;
//    M6_DosiahnutyMoment_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M6_DosiahnutyMoment);
//    IF M6_DosiahnutyMoment_REAL > 0 THEN
//       P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL:= (M6_DosiahnutyMoment_REAL*7.2)/458772; 
//    ELSE
//        P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL:= 0.0;
//    END_IF
     
    
    M6_PrevodMomentu.AtlasAktualnyMoment:=P2_Srobovanie.PAR.M6_AtlasCopcoInputs[1];    
    P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL:=M6_PrevodMomentu.AktualnyMoment;
    
    
    
    (*P2_Srobovanie.STAV.M6_DosiahnutyMoment_REAL:= M6_DosiahnutyMoment_REAL /100;*)
    
    
    //Moment - Tolerancia MAX//
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].24;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].25;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].26;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].27;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].28;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].29;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].30;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].31;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].16;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].17;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].18;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].19;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].20;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].21;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].22;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].23;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.16:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].8;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.17:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].9;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.18:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].10;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.19:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].11;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.20:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].12;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.21:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].13;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.22:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].14;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.23:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].15;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.24:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].0;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.25:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].1;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.26:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].2;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.27:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].3;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.28:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].4;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.29:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].5;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.30:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].6;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX.31:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3].7;
//    M6_Moment_ToleranciaMAX_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX);
//    IF M6_Moment_ToleranciaMAX_REAL > 0 THEN
//        P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL:= (M6_Moment_ToleranciaMAX_REAL*7.2)/458772;
//    ELSE
//        P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL:= 0.0;
//    END_IF
//    
    
    M6_PrevodMomentu.AtlasMaximalnaTolerancia:=P2_Srobovanie.PAR.M6_AtlasCopcoInputs[3];    
    P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL:=M6_PrevodMomentu.ToleranciaMAX;
    
    
    (*P2_Srobovanie.STAV.M6_Moment_ToleranciaMAX_REAL:= M6_Moment_ToleranciaMAX_REAL /100;*)
    
    //Moment - Tolerancia MIN//
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].24;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].25;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].26;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].27;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].28;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].29;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].30;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].31;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].16;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].17;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].18;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].19;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].20;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].21;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].22;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].23;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.16:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].8;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.17:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].9;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.18:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].10;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.19:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].11;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.20:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].12;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.21:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].13;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.22:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].14;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.23:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].15;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.24:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].0;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.25:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].1;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.26:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].2;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.27:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].3;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.28:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].4;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.29:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].5;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.30:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].6;
//    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN.31:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4].7;
//    M6_Moment_ToleranciaMIN_REAL:= UDINT_TO_REAL(P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN);
//    IF M6_Moment_ToleranciaMIN_REAL > 0 THEN
//        P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL:= (M6_Moment_ToleranciaMIN_REAL*7.2)/458772;
//    ELSE
//        P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL:= 0.0;
//    END_IF
	
    
    M6_PrevodMomentu.AtlasMinimalnaTolerancia:=P2_Srobovanie.PAR.M6_AtlasCopcoInputs[4];    
    P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL:=M6_PrevodMomentu.ToleranciaMIN;
    
    
    (*P2_Srobovanie.STAV.M6_Moment_ToleranciaMIN_REAL:= M6_Moment_ToleranciaMIN_REAL /100;*)
    
    
    //Dosiahnutý úhol//
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].24;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].25;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].26;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].27;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].28;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].29;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].30;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].31;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].16;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].17;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].18;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].19;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].20;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].21;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].22;
    P2_Srobovanie.STAV.M6_DosiahnutyUhol.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[0].23;
	
	
    //Uhol - Tolerancia MAX//
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].8;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].9;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].10;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].11;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].12;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].13;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].14;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].15;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].0;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].1;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].2;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].3;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].4;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].5;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].6;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMAX.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].7;
    
    //Uhol - Tolerancia MIN//
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.0:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].24;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.1:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].25;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.2:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].26;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.3:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].27;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.4:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].28;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.5:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].29;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.6:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].30;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.7:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].31;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.8:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].16;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.9:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].17;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.10:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].18;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.11:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].19;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.12:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].20;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.13:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].21;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.14:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].22;
    P2_Srobovanie.STAV.M6_Uhol_ToleranciaMIN.15:= P2_Srobovanie.PAR.M6_AtlasCopcoInputs[2].23;
    
	
	
	
	
END_ACTION

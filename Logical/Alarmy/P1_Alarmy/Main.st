
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
		
	
	//Alarmy pracoviska Ë.1 (100 - 199)//
	//A100 - ST1_Vytah - paletka na vystupe dopravnika vytahu !!!
	//A101 - ST1_Vytah - narusenie optickej bariery !!! 
	//A102 - ST1_Vytah - porucha navezenia paletky na dopravnik vytahu !!! 
	//A103 - ST1_Vytah - porucha precitania kodu paletky !!!
	//A104 - ST1_Vytah - porucha komunikacie zo serverom !!!
	//A105 - ST1_Vytah - porucha odoslania fotiek na server !!!
	//A106 - ST1_Vytah - CAM 2 porucha komunikacie FTP !!!
	//A107 - ST1_Vytah - CAM 3 porucha komunikacie FTP !!!
	//A108 - ST1_Vytah - CAM 4 porucha komunikacie FTP !!!
	//A109 - ST1_Vytah - CAM 5 porucha komunikacie FTP !!!
	//A110 - ST1_Vytah - porucha serva zdvihu vytahu !!! 
	//A111 - ST2_Srobovanie - porucha vysunutia centrovacky !!!
	//A112 - ST2_Srobovanie - porucha zasunutia centrovacky !!!
	//A113 - ST2_Srobovanie - porucha precitania kodu paletky !!!
	//A114 - ST2_Srobovanie - porucha komunikacie zo serverom !!!
	//A115 - ST2_Srobovanie - porucha odoslania fotiek na server !!!
	//A116 - ST2_Srobovanie - CAM 6 porucha komunikacie FTP !!!
	//A117 - ST2_Srobovanie - porucha serva manipulatora os X !!!
	//A118 - ST2_Srobovanie - porucha serva manipulatora os Y !!!
	//A119 - ST2_Srobovanie - skrutka K30 nieje pripravena !!!
	//A120 - ST2_Srobovanie - skrutka M5 nieje pripravena !!!
    //A121 - ST2_Srobovanie - skrutka M4 nieje pripravena !!!
    //A122 - P1_Robot - porucha napajania !!!
    //A123 - P1_Robot - nieje online !!!
    //A124 - Pracovisko 1 - Porucha tlaku vzduchu !!!
    //A125 - Pracovisko 1 - Modul DI11 nieje online !!!
    //A126 - Pracovisko 1 - Modul DI12 nieje online !!!
    //A127 - Pracovisko 1 - Modul DI13 nieje online !!!
    //A128 - Pracovisko 1 - Modul DI14 nieje online !!!
    //A129 - Pracovisko 1 - Modul DM11 nieje online !!!
    //A130 - Pracovisko 1 - Modul DS11 nieje online !!!
	//A131 - Pracovisko 1 - Modul DS12 nieje online !!!
	//A132 - Pracovisko 1 - Modul SI11 nieje online !!!
	//A133 - Pracovisko 1 - Modul SI12 nieje online !!!
    //A134 - Pracovisko 1 - Ventilovy termnal VT4 nieje online !!!
    //A135 - Pracovisko 1 - Ventilovy termnal VT5 nieje online !!!
    //A136 - ST2_Srobovanie - Skrutkovacka K30 nieje online !!!
    //A137 - ST2_Srobovanie - Skrutkovacka M5 nieje online !!!
    //A138 - ST2_Srobovanie - Skrutkovacka M4 nieje online !!!
    //A139 - Pracovisko 1 - Kamery KAM2, KAM4 a KAM6 niesu online !!!
    //A140 - Pracovisko 1 - Kamera KAM3 nieje online !!!
	//A141 - Pracovisko 1 - Kamera KAM5 nieje online !!!
    //A142 - ST2_Srobovanie - Porucha vysunutia skrutkovacky K30 !!!
    //A143 - ST2_Srobovanie - Porucha vysunutia skrutkovacky M5  !!!
    //A144 - ST2_Srobovanie - Porucha vysunutia skrutkovacky M4 !!!
	//A145 - P1_Robot - porucha !!!
    //A146 - ST2_Srobovanie - Presiahnuty cas skrutkovania skrutky K30 !!!
    //A147 - ST2_Srobovanie - Presiahnuty cas skrutkovania skrutky M5 !!!
    //A148 - ST2_Srobovanie - Presiahnuty cas skrutkovania skrutky M4 !!!
    //A149 - ST2_Srobovanie - Skrutkovacka K30 nieje READY !!!
    //A150 - ST2_Srobovanie - Skrutkovacka M5 nieje READY !!!
    //A151 - ST2_Srobovanie - Skrutkovacka M4 nieje READY !!!
    //A152 - Pracovisko 1 - Prekrocena teplota motora vrchneho dopravnika !!!
    //A153 - Pracovisko 1 - Prekrocena teplota motora spodneho dopravnika !!!
    //A154 - Pracovisko 1 - Narusenie optickej bariery na vstupe !!!
    //A155 - ST1_Vytah - Prekrocena teplota motora dopravnika !!!
    //A156 - Pracovisko 1 - Bolo stlacene tlacitko CS na ovladacom paneli !!!
    //A157 - Pracovisko 1 - Bolo stlacene tlacitko CS na rozvodnej skrini !!!
    //A158 - Pracovisko 1 - Bolo stlacene tlacitko CS robota !!!
    //A159 - P1_Robot - Porucha odobratia foamov z paletky !!!
    //A160 - P1_Robot - Porucha odobratia busbarov z paletky !!!
    //A161 - ST2_Srobovanie - Porucha vyvezenia paletky zo stopra !!!
    //A162 - P1_Akumulacny stoper - Porucha vyvezenia paletky zo stopra !!!
    //A163 - P1_Spodny stoper - Porucha vyvezenia paletky zo stopra !!!
    //A164 - ST1_Vytah - Porucha komunikacie s kamerou CAM 2 !!!
    //A165 - ST1_Vytah - Porucha komunikacie s kamerou CAM 5 !!!
    //A166 - ST1_Vytah - Porucha komunikacie s kamerou CAM 4 !!!
    //A167 - ST1_Vytah - Porucha komunikacie s kamerou CAM 3 !!!
    //A168 - ST2_Srobovanie - Porucha komunikacie s kamerou CAM 6 !!!
    
    
    
	//******************************Configur·cia alarmov**************************************//
    MpAlarmXCore_1.Enable:= TRUE;
    MpAlarmXCore_1.MpLink:= ADR(gAlarmXCore);
    MpAlarmXCore_1();
	
	
    //*****************************Configur·cia histÛrie alarmov*****************************//
	
    MpAlarmXHistory_1.Enable:= TRUE;
    MpAlarmXHistory_1.MpLink:= ADR(gAlarmXHistory);
    MpAlarmXHistory_1.DeviceName:= ADR('HDD_AlarmHistory');
    MpAlarmXHistory_1();
	
    //****************************Archiv·cia alarmov na disk PLC******************************//
    IF P1_AlarmyVizu.ArchivaciaAlarmov THEN
        MpAlarmXHistory_1.Export:= TRUE;
        P1_AlarmyVizu.ArchivaciaAlarmov:= FALSE;
    ELSIF P2_AlarmyVizu.ArchivaciaAlarmov THEN
        MpAlarmXHistory_1.Export:= TRUE;
        P2_AlarmyVizu.ArchivaciaAlarmov:= FALSE;	
    ELSIF P34_AlarmyVizu.ArchivaciaAlarmov THEN
        MpAlarmXHistory_1.Export:= TRUE;
        P34_AlarmyVizu.ArchivaciaAlarmov:= FALSE;	
    END_IF
	
    IF MpAlarmXHistory_1.Error THEN
        MpAlarmXHistory_1.Export:= FALSE;
    ELSIF MpAlarmXHistory_1.CommandDone THEN
        MpAlarmXHistory_1.Export:= FALSE;
    END_IF	
	
	
	
	
	
	
	
	
    //***********************************PrÌznak pracovisko 1 stav PORUCHA*****************************************//
   	
    FOR a:=100 TO 199 BY 1 DO
        P1_Alarmy[a];
        IF P1_Alarmy[a] = TRUE THEN
            P1_Pracovisko.STAV.PORUCHA:= TRUE;
        END_IF	
    END_FOR
    
    
    
    
    //**********************************Porucha tlaku vzduchu*********************************************************//
    IF CasKontroly_TlakVzduchu.Q THEN
        P1_Alarmy[124]:= TRUE;
        P1_PoruchaST1:= TRUE;
        P1_PoruchaST2:= TRUE;
    END_IF    
    
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 THEN
        CasKontroly_TlakVzduchu.IN:= TRUE;
    ELSE    
        CasKontroly_TlakVzduchu.IN:= FALSE;
    END_IF    
    
    CasKontroly_TlakVzduchu.PT:= T#10s;
    CasKontroly_TlakVzduchu();    
        
    //**********************************Porucha - kamerovy systÈm nieje online****************************************//
    IF CasKontroly_KAMsystem.Q THEN
        IF NOT Linka.STAV.WenglorControlUnit_OK THEN
            P1_Alarmy[149]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT CAM3.STAV.READY THEN
            P1_Alarmy[140]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT CAM5.STAV.READY THEN
            P1_Alarmy[141]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
    END_IF    
        
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.Kamery_OK THEN
        CasKontroly_KAMsystem.IN:= TRUE;
    ELSE    
        CasKontroly_KAMsystem.IN:= FALSE;
    END_IF    
        
    CasKontroly_KAMsystem.PT:= T#2s;
    CasKontroly_KAMsystem();
    
      
    
    //**********************************Porucha - moduly niesu online**************************************************//
    IF CasKontroly_Moduly.Q THEN
        IF NOT P1_Pracovisko.STAV.ModulDI11_OK THEN
            P1_Alarmy[125]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDI12_OK THEN
            P1_Alarmy[126]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDI13_OK THEN
            P1_Alarmy[127]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDI14_OK THEN
            P1_Alarmy[128]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDM11_OK THEN
            P1_Alarmy[129]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDS11_OK THEN
            P1_Alarmy[130]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulDS12_OK THEN
            P1_Alarmy[131]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulSI11_OK THEN
            P1_Alarmy[132]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.ModulSI12_OK THEN
            P1_Alarmy[133]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
    END_IF    
    
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.Moduly_OK THEN
        CasKontroly_Moduly.IN:= TRUE;
    ELSE
        CasKontroly_Moduly.IN:= FALSE;
    END_IF    
        
    CasKontroly_Moduly.PT:= T#2s;
    CasKontroly_Moduly();
    
    
    
    //********************************Porucha - ventilovÈ termin·ly niesu online**********************************************//
    IF CasKontroly_VentTerminalov.Q THEN
        IF NOT P1_Pracovisko.STAV.VentilovyTerminal_VT4_OK THEN
            P1_Alarmy[134]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.VentilovyTerminal_VT5_OK THEN
            P1_Alarmy[135]:= TRUE;
            P1_PoruchaST1:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
    END_IF
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.VentiloveTerminaly_OK THEN
        CasKontroly_VentTerminalov.IN:= TRUE;
    ELSE
        CasKontroly_VentTerminalov.IN:= FALSE;
    END_IF    
    
    CasKontroly_VentTerminalov.PT:= T#2s;
    CasKontroly_VentTerminalov();
    
    
    //********************************Porucha - skrutkovacky niesu online**********************************************//
    IF CasKontroly_Skrutkovacky.Q THEN
        IF NOT P1_Pracovisko.STAV.Skrutkovacka_K30_OK THEN
            P1_Alarmy[136]:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.Skrutkovacka_M5_OK THEN
            P1_Alarmy[137]:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
        IF NOT P1_Pracovisko.STAV.Skrutkovacka_M4_OK THEN
            P1_Alarmy[138]:= TRUE;
            P1_PoruchaST2:= TRUE;
        END_IF
    END_IF
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.Skrutkovacky_OK THEN
        CasKontroly_Skrutkovacky.IN:= TRUE;
    ELSE
        CasKontroly_Skrutkovacky.IN:= FALSE;
    END_IF    
    
    CasKontroly_Skrutkovacky.PT:= T#2s;
    CasKontroly_Skrutkovacky();
    
    
    
    //*********************************Porucha - robot nieje online************************************************//        
    IF CasKontroly_Robota.Q THEN
        P1_Alarmy[123]:= TRUE;
        P1_PoruchaST2:= TRUE;
    END_IF    
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.KOM_Robot_OK THEN        
        CasKontroly_Robota.IN:= TRUE;
    ELSE
        CasKontroly_Robota.IN:= FALSE;
    END_IF    
        
        
    CasKontroly_Robota.PT:= T#2s;
    CasKontroly_Robota();
    
    //*******************************Porucha nap·jania robota*****************************************************//
    IF CasKontroly_Robota.Q AND NOT P1_Pracovisko.IN.NapajaniaRobota_OK THEN
        P1_Alarmy[122]:= TRUE;
        P1_PoruchaST2:= TRUE;
    END_IF    
    
    
    //********************Pracovisko 1 - Porucha ochrannej bariÈry v˝ùahu****************************************//
    
    IF Safety.IN.P1_Vytah_Zdvih_BUSY AND NOT Safety.STAV.P1_Vytah_Bariera_AKTIVNA THEN
        P1_Alarmy[101]:= TRUE;
        P1_PoruchaST1:= TRUE;
    END_IF    
    
    
    IF Safety.IN.P1_Vytah_Zdvih_BUSY AND P1_Vytah.IN.VystupDopravnikaVytahu_OS12 THEN
        P1_Alarmy[101]:= TRUE;
        P1_PoruchaST1:= TRUE;
    END_IF  
    
    
    
    
    //*********************Pracovisko 1 - Porucha serva zdvihu vytahu***************//
    IF CasPoruchyServaVytahu.Q THEN
        P1_Alarmy[110]:= TRUE;
        P1_PoruchaST1:= TRUE;
    END_IF
    
    IF Safety.STAV.P1_ZonaVytahu_AKTIVNA AND P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR THEN
        CasPoruchyServaVytahu.IN:= TRUE;
    ELSE    
        CasPoruchyServaVytahu.IN:= FALSE;
    END_IF    
        
    	
    
    
    CasPoruchyServaVytahu.PT:= T#2s;
    CasPoruchyServaVytahu();
    
    
    
    //*********************Pracovisko 1 - Porucha serva manipulatora örobovania os X***************//
    IF CasPoruchyServaSrobovaniaOsX.Q THEN
        P1_Alarmy[117]:= TRUE;
        P1_PoruchaST2:= TRUE;
    END_IF	
	
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR THEN
        CasPoruchyServaSrobovaniaOsX.IN:= TRUE;
    ELSE    
        CasPoruchyServaSrobovaniaOsX.IN:= FALSE;
    END_IF  
    
	
    CasPoruchyServaSrobovaniaOsX.PT:= T#2s;   
    CasPoruchyServaSrobovaniaOsX();
    
    
    
    //*********************Pracovisko 1 - Porucha serva manipulatora örobovania os Y***************//
    IF CasPoruchyServaSrobovaniaOsY.Q THEN
        P1_Alarmy[118]:= TRUE;
        P1_PoruchaST2:= TRUE;
    END_IF	
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR THEN
        CasPoruchyServaSrobovaniaOsY.IN:= TRUE;
    ELSE    
        CasPoruchyServaSrobovaniaOsY.IN:= FALSE;
    END_IF  
    
    CasPoruchyServaSrobovaniaOsY.PT:= T#2s;   
    CasPoruchyServaSrobovaniaOsY();
    
	
    
    //****************************Pracovisko 1 - porucha vrchnÈho dopravnÌka**********************************//
    IF NOT P1_Dopravniky.IN.HornyDoprav_TeplotaMotora_OK AND P1_Pracovisko.STAV.Automat THEN
        P1_Alarmy[152]:= TRUE;
    END_IF    
    
    
    //*****************************Pracovisko 1 - porucha spodnÈho dopravnÌka************************************//
    IF NOT P1_Dopravniky.IN.SpodnyDoprav_TeplotaMotora_OK AND P1_Pracovisko.STAV.Automat THEN
        P1_Alarmy[153]:= TRUE;
    END_IF 
        
     
    //******************************Pracovisko 1 - naruöenie vstupnej bariery***********************************//
    IF NOT Safety.STAV.P1_VstupBunky_Bariera_AKTIVNA AND NOT Safety.STAV.P1_VystupTunela_Bariera_AKTIVNA AND P1_Pracovisko.STAV.Automat THEN
        P1_Alarmy[154]:= TRUE;
    END_IF
    
    
    
    
    //******************************V˝ùah - porucha dopravnÌka**************************************************//
    IF NOT P1_Vytah.IN.Dopravnik_TeplotaMotora_OK AND P1_Vytah.Automat THEN
        P1_Alarmy[155]:= TRUE;
        P1_PoruchaST1:= TRUE;
    END_IF 
    
    
    //******************************StlaËenie tlaËÌtok CS*******************************************************//  
    IF EDGENEG(Safety.STAV.P1_Panel_TlacitkoCS_AKTIVNE) THEN
        P1_Alarmy[156]:= TRUE;
    END_IF
    
    IF EDGENEG(Safety.STAV.P1_Skrina_TlacitkoCS_AKTIVNE) THEN
        P1_Alarmy[157]:= TRUE;
    END_IF
    
    IF EDGENEG(Safety.STAV.P1_Robot_TlacitkoCS_AKTIVNE) THEN
        P1_Alarmy[158]:= TRUE;
    END_IF
   
    
    
    
	
    //***************************************************Nasetovanie alarmov****************************************************//
    IF P1_Alarmy[100] THEN
        MpAlarmXSet(gAlarmXCore, 'A100');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A100');
    END_IF
	
    IF P1_Alarmy[101] THEN
        MpAlarmXSet(gAlarmXCore, 'A101');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A101');
    END_IF
	
    IF P1_Alarmy[102] THEN
        MpAlarmXSet(gAlarmXCore, 'A102');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A102');
    END_IF
	
    IF P1_Alarmy[103] THEN
        MpAlarmXSet(gAlarmXCore, 'A103');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A103');
    END_IF

    IF P1_Alarmy[104] THEN
        MpAlarmXSet(gAlarmXCore, 'A104');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A104');
    END_IF
	
    IF P1_Alarmy[105] THEN
        MpAlarmXSet(gAlarmXCore, 'A105');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A105');
    END_IF
	
    IF P1_Alarmy[106] THEN
        MpAlarmXSet(gAlarmXCore, 'A106');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A106');
    END_IF
	
    IF P1_Alarmy[107] THEN
        MpAlarmXSet(gAlarmXCore, 'A107');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A107');
    END_IF
	
    IF P1_Alarmy[108] THEN
        MpAlarmXSet(gAlarmXCore, 'A108');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A108');
    END_IF
	
    IF P1_Alarmy[109] THEN
        MpAlarmXSet(gAlarmXCore, 'A109');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A109');
    END_IF
	
    IF P1_Alarmy[110] THEN
        MpAlarmXSet(gAlarmXCore, 'A110');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A110');
    END_IF
	
    IF P1_Alarmy[111] THEN
        MpAlarmXSet(gAlarmXCore, 'A111');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A111');
    END_IF
	
    IF P1_Alarmy[112] THEN
        MpAlarmXSet(gAlarmXCore, 'A112');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A112');
    END_IF
	
    IF P1_Alarmy[113] THEN
        MpAlarmXSet(gAlarmXCore, 'A113');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A113');
    END_IF
    
     
    
    IF P1_Alarmy[114] THEN
        MpAlarmXSet(gAlarmXCore, 'A114');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A114');
    END_IF
	
   
	
    IF P1_Alarmy[115] THEN
        MpAlarmXSet(gAlarmXCore, 'A115');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A115');
    END_IF
	
    IF P1_Alarmy[116] THEN
        MpAlarmXSet(gAlarmXCore, 'A116');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A116');
    END_IF
	
    IF P1_Alarmy[117] THEN
        MpAlarmXSet(gAlarmXCore, 'A117');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A117');
    END_IF
	
    IF P1_Alarmy[118] THEN
        MpAlarmXSet(gAlarmXCore, 'A118');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A118');
    END_IF
	
    IF P1_Alarmy[119] THEN
        MpAlarmXSet(gAlarmXCore, 'A119');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A119');
    END_IF
	
    
    IF P1_Alarmy[120] THEN
        MpAlarmXSet(gAlarmXCore, 'A120');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A120');
    END_IF
    
    IF P1_Alarmy[121] THEN
        MpAlarmXSet(gAlarmXCore, 'A121');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A121');
    END_IF
	
    IF P1_Alarmy[122] THEN
        MpAlarmXSet(gAlarmXCore, 'A122');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A122');
    END_IF
	
    IF P1_Alarmy[123] THEN
        MpAlarmXSet(gAlarmXCore, 'A123');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A123');
    END_IF
    
     
    
    IF P1_Alarmy[124] THEN
        MpAlarmXSet(gAlarmXCore, 'A124');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A124');
    END_IF
	
   
	
    IF P1_Alarmy[125] THEN
        MpAlarmXSet(gAlarmXCore, 'A125');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A125');
    END_IF
	
    IF P1_Alarmy[126] THEN
        MpAlarmXSet(gAlarmXCore, 'A126');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A126');
    END_IF
	
    IF P1_Alarmy[127] THEN
        MpAlarmXSet(gAlarmXCore, 'A127');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A127');
    END_IF
	
    IF P1_Alarmy[128] THEN
        MpAlarmXSet(gAlarmXCore, 'A128');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A128');
    END_IF
	
    IF P1_Alarmy[129] THEN
        MpAlarmXSet(gAlarmXCore, 'A129');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A129');
    END_IF
	
    
    IF P1_Alarmy[130] THEN
        MpAlarmXSet(gAlarmXCore, 'A130');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A130');
    END_IF
    
    IF P1_Alarmy[131] THEN
        MpAlarmXSet(gAlarmXCore, 'A131');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A131');
    END_IF
	
    IF P1_Alarmy[132] THEN
        MpAlarmXSet(gAlarmXCore, 'A132');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A132');
    END_IF
	
    IF P1_Alarmy[133] THEN
        MpAlarmXSet(gAlarmXCore, 'A133');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A133');
    END_IF
    
     
    
    IF P1_Alarmy[134] THEN
        MpAlarmXSet(gAlarmXCore, 'A134');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A134');
    END_IF
	
   
	
    IF P1_Alarmy[135] THEN
        MpAlarmXSet(gAlarmXCore, 'A135');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A135');
    END_IF
	
    IF P1_Alarmy[136] THEN
        MpAlarmXSet(gAlarmXCore, 'A136');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A136');
    END_IF
	
    IF P1_Alarmy[137] THEN
        MpAlarmXSet(gAlarmXCore, 'A137');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A137');
    END_IF
	
    IF P1_Alarmy[138] THEN
        MpAlarmXSet(gAlarmXCore, 'A138');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A138');
    END_IF
	
    IF P1_Alarmy[139] THEN
        MpAlarmXSet(gAlarmXCore, 'A139');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A139');
    END_IF
   
    
    IF P1_Alarmy[140] THEN
        MpAlarmXSet(gAlarmXCore, 'A140');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A140');
    END_IF
	
    IF P1_Alarmy[141] THEN
        MpAlarmXSet(gAlarmXCore, 'A141');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A141');
    END_IF
	
    IF P1_Alarmy[142] THEN
        MpAlarmXSet(gAlarmXCore, 'A142');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A142');
    END_IF
	
    IF P1_Alarmy[143] THEN
        MpAlarmXSet(gAlarmXCore, 'A143');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A143');
    END_IF
	
    IF P1_Alarmy[144] THEN
        MpAlarmXSet(gAlarmXCore, 'A144');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A144');
    END_IF
	
    IF P1_Alarmy[145] THEN
        MpAlarmXSet(gAlarmXCore, 'A145');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A145');
    END_IF
	
    IF P1_Alarmy[146] THEN
        MpAlarmXSet(gAlarmXCore, 'A146');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A146');
    END_IF
	
    IF P1_Alarmy[147] THEN
        MpAlarmXSet(gAlarmXCore, 'A147');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A147');
    END_IF
	
    IF P1_Alarmy[148] THEN
        MpAlarmXSet(gAlarmXCore, 'A148');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A148');
    END_IF
	
    IF P1_Alarmy[149] THEN
        MpAlarmXSet(gAlarmXCore, 'A149');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A149');
    END_IF
	
    	
    IF P1_Alarmy[150] THEN
        MpAlarmXSet(gAlarmXCore, 'A150');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A150');
    END_IF	

    IF P1_Alarmy[151] THEN
        MpAlarmXSet(gAlarmXCore, 'A151');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A151');
    END_IF	

        
    IF P1_Alarmy[152] THEN
        MpAlarmXSet(gAlarmXCore, 'A152');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A152');
    END_IF	

    IF P1_Alarmy[153] THEN
        MpAlarmXSet(gAlarmXCore, 'A153');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A153');
    END_IF	
    
    IF P1_Alarmy[154] THEN
        MpAlarmXSet(gAlarmXCore, 'A154');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A154');
    END_IF	

    IF P1_Alarmy[155] THEN
        MpAlarmXSet(gAlarmXCore, 'A155');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A155');
    END_IF	
    
    
    IF P1_Alarmy[156] THEN
        MpAlarmXSet(gAlarmXCore, 'A156');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A156');
    END_IF	

    IF P1_Alarmy[157] THEN
        MpAlarmXSet(gAlarmXCore, 'A157');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A157');
    END_IF	
    
    IF P1_Alarmy[158] THEN
        MpAlarmXSet(gAlarmXCore, 'A158');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A158');
    END_IF	

    IF P1_Alarmy[159] THEN
        MpAlarmXSet(gAlarmXCore, 'A159');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A159');
    END_IF	
    
    IF P1_Alarmy[160] THEN
        MpAlarmXSet(gAlarmXCore, 'A160');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A160');
    END_IF
    
    
    IF P1_Alarmy[161] THEN
        MpAlarmXSet(gAlarmXCore, 'A161');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A161');
    END_IF	

    IF P1_Alarmy[162] THEN
        MpAlarmXSet(gAlarmXCore, 'A162');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A162');
    END_IF	
    
    IF P1_Alarmy[163] THEN
        MpAlarmXSet(gAlarmXCore, 'A163');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A163');
    END_IF
    
    IF P1_Alarmy[164] THEN
        MpAlarmXSet(gAlarmXCore, 'A164');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A164');
    END_IF	

    IF P1_Alarmy[165] THEN
        MpAlarmXSet(gAlarmXCore, 'A165');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A165');
    END_IF	
    
    IF P1_Alarmy[166] THEN
        MpAlarmXSet(gAlarmXCore, 'A166');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A166');
    END_IF
    
    IF P1_Alarmy[167] THEN
        MpAlarmXSet(gAlarmXCore, 'A167');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A167');
    END_IF	
    
    IF P1_Alarmy[168] THEN
        MpAlarmXSet(gAlarmXCore, 'A168');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A168');
    END_IF
    
    
    
    
    //********************************Zobrazenie symbolu alarmu*****************************************************//
	
    IF P1_Pracovisko.STAV.PORUCHA THEN
        P1_AlarmyVizu.ZobrazSymbolAlarmu:= Blikac500ms;
    ELSE
        P1_AlarmyVizu.ZobrazSymbolAlarmu:= FALSE;
    END_IF	
	
	
    //********************************Blikanie tlaËÌtka Alarmy*******************************************************//
    IF P1_Pracovisko.STAV.PORUCHA AND P1_Vizu.ActualPage <> 'PageAlarm' THEN
        IF Blikac500ms THEN
            P1_AlarmyVizu.FarbaTlacitka_Alarmy:= "Button_Red";
        ELSE	
            P1_AlarmyVizu.FarbaTlacitka_Alarmy:= "default";
        END_IF
    ELSE
        P1_AlarmyVizu.FarbaTlacitka_Alarmy:= "default";
    END_IF	
	
	
	
	
    //*************************************Potvrdenie alarmov*********************************************************//
    IF P1_AlarmyVizu.PotvrdAlarmy THEN
        brsmemset(ADR(P1_Alarmy),0,SIZEOF(P1_Alarmy));
        P1_Pracovisko.STAV.PORUCHA:= FALSE;
        P1_PoruchaST1:= FALSE;
        P1_PoruchaST2:= FALSE;
        IF P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR AND P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ReadyToPower_ON THEN
            P1_Vytah.ServoZdvihuVytahu_M31.CMD.ErrorRESET:= TRUE;
        END_IF    
        IF P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR AND P1_Srobovanie.ServoManipulOsX_M20.STATUS.ReadyToPower_ON THEN
            P1_Srobovanie.ServoManipulOsX_M20.CMD.ErrorRESET:= TRUE;
        END_IF    
        IF P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR AND P1_Srobovanie.ServoManipulOsY_M19.STATUS.ReadyToPower_ON THEN
            P1_Srobovanie.ServoManipulOsY_M19.CMD.ErrorRESET:= TRUE;
        END_IF    
        P1_AlarmyVizu.PotvrdAlarmy:= FALSE;
    END_IF	
	
	
    //Resetovanie serva zdvihu v˝ùahu//
    IF EDGEPOS(Safety.STAV.P1_ZonaVytahu_AKTIVNA) THEN
        P1_Vytah.ServoZdvihuVytahu_M31.CMD.ErrorRESET:= TRUE;
    END_IF    
    
    //Resetovanie poruch serv pri zatvorenÌ bunky//
    IF EDGEPOS(Safety.STAV.P1_ZonaBunky_AKTIVNA) THEN
        P1_Srobovanie.ServoManipulOsX_M20.CMD.ErrorRESET:= TRUE;
        P1_Srobovanie.ServoManipulOsY_M19.CMD.ErrorRESET:= TRUE;
    END_IF   
    
    
    
    //Zruöenie resetovania por˙ch serv//
    IF NOT P1_Vytah.ServoZdvihuVytahu_M31.STATUS.ERROR THEN
        P1_Vytah.ServoZdvihuVytahu_M31.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServaZdvihuVytahu.Q THEN
        P1_Vytah.ServoZdvihuVytahu_M31.CMD.ErrorRESET:= FALSE;
    END_IF    
    
    IF NOT P1_Srobovanie.ServoManipulOsX_M20.STATUS.ERROR THEN
        P1_Srobovanie.ServoManipulOsX_M20.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServaSrobovaniaOsX.Q THEN
        P1_Srobovanie.ServoManipulOsX_M20.CMD.ErrorRESET:= FALSE;
    END_IF
    
    IF NOT P1_Srobovanie.ServoManipulOsY_M19.STATUS.ERROR THEN
        P1_Srobovanie.ServoManipulOsY_M19.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServaSrobovaniaOsY.Q THEN
        P1_Srobovanie.ServoManipulOsY_M19.CMD.ErrorRESET:= FALSE;
    END_IF    
    
   	
    
    CasResetovaniaServaZdvihuVytahu.PT:= T#2s;
    CasResetovaniaServaZdvihuVytahu.IN:= P1_Vytah.ServoZdvihuVytahu_M31.CMD.ErrorRESET;
    CasResetovaniaServaZdvihuVytahu();
    
    CasResetovaniaServaSrobovaniaOsX.PT:= T#2s;
    CasResetovaniaServaSrobovaniaOsX.IN:= P1_Srobovanie.ServoManipulOsX_M20.CMD.ErrorRESET;
    CasResetovaniaServaSrobovaniaOsX();
    
    CasResetovaniaServaSrobovaniaOsY.PT:= T#2s;
    CasResetovaniaServaSrobovaniaOsY.IN:= P1_Srobovanie.ServoManipulOsY_M19.CMD.ErrorRESET;
    CasResetovaniaServaSrobovaniaOsY();
    
	
        END_PROGRAM

PROGRAM _EXIT
        (* Insert code here *)
	

	 
        END_PROGRAM


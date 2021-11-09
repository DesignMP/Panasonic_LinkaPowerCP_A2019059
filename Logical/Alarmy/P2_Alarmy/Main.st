
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Alarmy pracoviska è.2 (200 - 299)//
	//A200 - ST3_Zakladanie tesnenia - porucha precitania kodu paletky !!!
	//A201 - ST3_Zakladanie tesnenia - porucha precitania QR kodu !!!
	//A202 - ST3_Zakladanie tesnenia - porucha serva zdvihu !!!
	//A203 - ST3_Zakladanie tesnenia - porucha serva pojazdu !!!
	//A204 - ST3_Zakladanie tesnenia - porucha vysunutia pritlacania !!!
	//A205 - ST3_Zakladanie tesnenia - porucha zasunutia pritlacania !!!
	//A206 - ST3_Zakladanie tesnenia - narusenie optickej bariery !!!
	//A207 - ST3_Zakladanie tesnenia - bol stlaceny bumper suflika !!!
	//A208 - ST3_Zakladanie tesnenia - porucha snimaca kopita IS7 !!!
	//A209 - ST4_Maticovacka - porucha vysunutia centrovacky !!!
	//A210 - ST4_Maticovacka - porucha zasunutia centrovacky !!!
	//A211 - ST4_Maticovacka - porucha precitania kodu paletky !!!
	//A212 - ST5_Srobovanie - porucha vysunutia centrovacky !!!
	//A213 - ST5_Srobovanie - porucha zasunutia centrovacky !!! 
	//A214 - ST5_Srobovanie - porucha precitania kodu paletky !!!
	//A215 - ST5_Srobovanie - porucha serva manipulatora os X !!!
	//A216 - ST5_Srobovanie - porucha serva manipulatora os Y !!!
	//A217 - ST6_Zvaranie - porucha vysunutia centrovacky !!!
	//A218 - ST6_Zvaranie - porucha zasunutia centrovacky !!!
	//A219 - ST6_Zvaranie - porucha precitania kodu paletky !!!
	//A220 - ST6_Zvaranie - porucha serva zdvihu zvarania !!!
	//A221 - ST6_Zvaranie - porucha presunu pojazdu zvarania !!!
	//A222 - ST6_Zvaranie - porucha zvaracky !!!
	//A223 - ST6_Cistenie - porucha zatvorenia dveri !!!
	//A224 - ST6_Cistenie - porucha otvorenia dveri !!!
	//A225 - ST3_Zakladanie tesnenia - CAM 1 porucha komunikacie FTP !!!
	//A226 - ST3_Zakladanie tesnenia - CAM 7 porucha komunikacie FTP !!!
	//A227 - ST3_Zakladanie tesnenia - CAM 8 porucha komunikacie FTP !!!
	//A228 - ST3_Zakladanie tesnenia - CAM 17 porucha komunikacie FTP !!!
	//A229 - ST4_Maticovacka - CAM 9 porucha komunikacie FTP !!!	
	//A230 - ST3_Zakladanie tesnenia - porucha komunikacie zo serverom !!!
	//A231 - ST4_Maticovacka - porucha komunikacie zo serverom !!!
	//A232 - ST5_Srobovanie - CAM 10 porucha komunikacie FTP !!!
	//A233 - ST5_Srobovanie - porucha komunikacie zo serverom !!!
	//A234 - ST6_Zvaranie - CAM 11 porucha komunikacie FTP !!!
	//A235 - ST6_Zvaranie - CAM 12 porucha komunikacie FTP !!!
	//A236 - ST6_Zvaranie - porucha komunikacie zo serverom !!!
	//A237 - ST5_Srobovanie - skrutka M4 nieje pripravena !!!
	//A238 - ST5_Srobovanie - skrutka M5 nieje pripravena !!!
	//A239 - ST5_Srobovanie - skrutka M6 nieje pripravena !!!
	//A240 - ST4_Maticovacka - matica M4 nieje pripravena !!!
	//A241 - ST5_Srobovanie - porucha serva manipulatora os X !!!
	//A242 - ST5_Srobovanie - porucha serva manipulatora os Y !!!
	//A243 - P2_Robot - porucha napajania !!!
	//A244 - P2_Robot - nieje online !!!
	//A245 - Pracovisko 2 - Porucha tlaku vzduchu !!!
	//A246 - Pracovisko 2 - Modul DI21 nieje online !!!
	//A247 - Pracovisko 2 - Modul DI22 nieje online !!!
	//A248 - Pracovisko 2 - Modul DI23 nieje online !!!
	//A249 - Pracovisko 2 - Modul DI24 nieje online !!!
	//A250 - Pracovisko 2 - Modul DI25 nieje online !!!
	//A251 - Pracovisko 2 - Modul DM21 nieje online !!!
	//A252 - Pracovisko 2 - Modul DS21 nieje online !!!
    //A253 - Pracovisko 2 - Modul DS22 nieje online !!!
    //A254 - Pracovisko 2 - Modul DS23 nieje online !!!
	//A255 - Pracovisko 2 - Modul SI21 nieje online !!!
    //A256 - Pracovisko 2 - Modul SI22 nieje online !!!
	//A257 - Pracovisko 2 - Ventilovy termnal VT1 nieje online !!!
	//A258 - Pracovisko 2 - Ventilovy termnal VT2 nieje online !!!
    //A259 - Pracovisko 2 - Ventilovy termnal VT3 nieje online !!!
    //A260 - ST5_Srobovanie - Skrutkovacka M4 nieje online !!!
    //A261 - ST5_Srobovanie - Skrutkovacka M5 nieje online !!!
    //A262 - ST5_Srobovanie - Skrutkovacka M6 nieje online !!!
    //A263 - ST4_Maticovacka - Maticovacka M4 nieje online !!!
    //A264 - Pracovisko 2 - Kamery KAM1, KAM7, KAM10, KAM11, KAM12 a KAM17 niesu online !!!
    //A265 - Pracovisko 2 - Kamera KAM8 nieje online !!!
    //A266 - Pracovisko 2 - Kamera KAM9 nieje online !!!
    //A267 - ST4_Maticovacka - Porucha maticovacky M4 !!!
    //A268 - ST5_Srobovanie - Porucha vysunutia skrutkovacky M4 !!!
    //A269 - ST5_Srobovanie - Porucha vysunutia skrutkovacky M5 !!!
    //A270 - ST5_Srobovanie - Porucha vysunutia skrutkovacky M6 !!!
    //A271 - P2_Robot - porucha !!!
    //A272 - ST5_Srobovanie - Presiahnuty cas skrutkovania skrutky M4 !!!
    //A273 - ST5_Srobovanie - Presiahnuty cas skrutkovania skrutky M5 !!!
    //A274 - ST5_Srobovanie - Presiahnuty cas skrutkovania skrutky M6 !!!
    //A275 - ST5_Srobovanie - Skrutkovacka M4 nieje READY !!!
    //A276 - ST5_Srobovanie - Skrutkovacka M5 nieje READY !!!
    //A277 - ST5_Srobovanie - Skrutkovacka M6 nieje READY !!!
    //A278 - Pracovisko 2 - Prekrocena teplota motora vrchneho dopravnika !!!
    //A279 - Pracovisko 2 - Prekrocena teplota motora spodneho dopravnika !!!
    //A280 - Pracovisko 2 - Narusenie optickej bariery na vystupe !!!
    //A281 - Pracovisko 2 - Bolo stlacene tlacitko CS na ovladacom paneli !!!
    //A282 - Pracovisko 2 - Bolo stlacene tlacitko CS na rozvodnej skrini !!!
    //A283 - Pracovisko 2 - Bolo stlacene tlacitko CS robota !!!
    //A284 - Pracovisko 2 - Bolo stlacene tlacitko CS na dvojrucnom ovladani !!!
    //A285 - P2_Robot - Porucha odobratia Top Coveru z paletky !!!
    //A286 - ST3_Zakladanie tesnenia - Porucha vyvezenia paletky zo stopra !!!
    //A287 - ST4_Maticovacka - Porucha vyvezenia paletky zo stopra !!!
	//A288 - ST5_Srobovanie - Porucha vyvezenia paletky zo stopra !!!
    //A289 - ST6_Zvaranie - Porucha vyvezenia paletky zo stopra !!!
    //A290 - ST3_Zakladanie tesnenia - Porucha komunikacie s kamerou CAM 1 !!!
    //A291 - ST3_Zakladanie tesnenia - Porucha komunikacie s kamerou CAM 7 !!!
    //A292 - ST3_Zakladanie tesnenia - Porucha komunikacie s kamerou CAM 8 !!!
    //A293 - ST3_Zakladanie tesnenia - Porucha komunikacie s kamerou CAM 17 !!!
    //A294 - ST4_Maticovacka - Porucha komunikacie s kamerou CAM 9 !!!
    //A295 - ST5_Srobovanie - Porucha komunikacie s kamerou CAM 10 !!!
    //A296 - ST6_Zvaranie - Porucha komunikacie s kamerou CAM 11 !!!
    //A297 - ST6_Zvaranie - Porucha komunikacie s kamerou CAM 12 !!!
    
    
    
    
	//***************************Príznak pracovisko 2 stav PORUCHA**********************************//
    
    FOR a:=200 TO 299 BY 1 DO
        P2_Alarmy[a];
        IF P2_Alarmy[a] = TRUE THEN
            P2_Pracovisko.STAV.PORUCHA:= TRUE;
        END_IF	
    END_FOR
    
    
	
    //*********************Pracovisko 2 - Porucha tlaku vzduchu*********************************//
    IF CasKontroly_TlakVzduchu.Q THEN
        P2_Alarmy[245]:= TRUE;
        P2_PoruchaST1:= TRUE;
        P2_PoruchaST2:= TRUE;
        P2_PoruchaST3:= TRUE;
        P2_PoruchaST4:= TRUE;
    END_IF    
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
        CasKontroly_TlakVzduchu.IN:= TRUE;
    ELSE    
        CasKontroly_TlakVzduchu.IN:= FALSE;
    END_IF  
    
    CasKontroly_TlakVzduchu.PT:= T#10s;
    CasKontroly_TlakVzduchu();
    
	
	
    //**********************************Porucha - kamerovy systém nieje online****************************************//
    IF CasKontroly_KAMsystem.Q THEN
        IF NOT Linka.STAV.WenglorControlUnit_OK THEN
            P2_Alarmy[264]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT CAM8.STAV.READY THEN
            P2_Alarmy[265]:= TRUE;
            P2_PoruchaST1:= TRUE;
        END_IF
        IF NOT CAM9.STAV.READY THEN
            P2_Alarmy[266]:= TRUE;
            P2_PoruchaST2:= TRUE;
        END_IF
    END_IF    
     
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.Kamery_OK THEN
        CasKontroly_KAMsystem.IN:= TRUE;
    ELSE    
        CasKontroly_KAMsystem.IN:= FALSE;
    END_IF   
        
    CasKontroly_KAMsystem.PT:= T#2s;
    CasKontroly_KAMsystem();
     
    
    
    //**********************************Porucha - moduly niesu online**************************************************//
    IF CasKontroly_Moduly.Q THEN
        IF NOT P2_Pracovisko.STAV.ModulDI21_OK THEN
            P2_Alarmy[246]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDI22_OK THEN
            P2_Alarmy[247]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDI23_OK THEN
            P2_Alarmy[248]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDI24_OK THEN
            P2_Alarmy[249]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDI25_OK THEN
            P2_Alarmy[250]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDM21_OK THEN
            P2_Alarmy[251]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDS21_OK THEN
            P2_Alarmy[252]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDS22_OK THEN
            P2_Alarmy[253]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulDS23_OK THEN
            P2_Alarmy[254]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulSI21_OK THEN
            P2_Alarmy[255]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.ModulSI22_OK THEN
            P2_Alarmy[256]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
    END_IF    
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.Moduly_OK THEN
        CasKontroly_Moduly.IN:= TRUE;
    ELSE
        CasKontroly_Moduly.IN:= FALSE;
    END_IF  
    
    
    CasKontroly_Moduly.PT:= T#2s;
    CasKontroly_Moduly();
    
    
    
    //********************************Porucha - ventilové terminály niesu online**********************************************//
    IF CasKontroly_VentTerminalov.Q THEN
        IF NOT P2_Pracovisko.STAV.VentilovyTerminal_VT1_OK THEN
            P2_Alarmy[257]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.VentilovyTerminal_VT2_OK THEN
            P2_Alarmy[258]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.VentilovyTerminal_VT3_OK THEN
            P2_Alarmy[259]:= TRUE;
            P2_PoruchaST1:= TRUE;
            P2_PoruchaST2:= TRUE;
            P2_PoruchaST3:= TRUE;
            P2_PoruchaST4:= TRUE;
        END_IF
    END_IF
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.VentiloveTerminaly_OK THEN
        CasKontroly_VentTerminalov.IN:= TRUE;
    ELSE
        CasKontroly_VentTerminalov.IN:= FALSE;
    END_IF  
    
    
    CasKontroly_VentTerminalov.PT:= T#2s;
    CasKontroly_VentTerminalov();
   
    
    //********************************Porucha - skrutkovacky niesu online**********************************************//
    IF CasKontroly_Skrutkovacky.Q THEN
        IF NOT P2_Pracovisko.STAV.Skrutkovacka_M4_OK THEN
            P2_Alarmy[260]:= TRUE;
            P2_PoruchaST3:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.Skrutkovacka_M5_OK THEN
            P2_Alarmy[261]:= TRUE;
            P2_PoruchaST3:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.Skrutkovacka_M6_OK THEN
            P2_Alarmy[262]:= TRUE;
            P2_PoruchaST3:= TRUE;
        END_IF
        IF NOT P2_Pracovisko.STAV.Maticovacka_M4_OK THEN
            P2_Alarmy[263]:= TRUE;
            P2_PoruchaST2:= TRUE;
        END_IF
    END_IF
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.Skrutkovacky_OK THEN
        CasKontroly_Skrutkovacky.IN:= TRUE;
    ELSE
        CasKontroly_Skrutkovacky.IN:= FALSE;
    END_IF 
    
    
    CasKontroly_Skrutkovacky.PT:= T#2s;
    CasKontroly_Skrutkovacky();
    
    
    
    //*********************************Porucha - robot nieje online************************************************//        
    IF CasKontroly_Robota.Q THEN
        P2_Alarmy[244]:= TRUE;
        P2_PoruchaST3:= TRUE;
        P2_PoruchaST4:= TRUE;
    END_IF    
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.KOM_Robot_OK THEN        
        CasKontroly_Robota.IN:= TRUE;
    ELSE
        CasKontroly_Robota.IN:= FALSE;
    END_IF         
            
    CasKontroly_Robota.PT:= T#2s;
    CasKontroly_Robota();
           
   
    //*******************************Porucha napájania robota*****************************************************//
    IF CasKontroly_Robota.Q AND NOT P2_Pracovisko.IN.NapajaniaRobota_OK THEN
        P2_Alarmy[243]:= TRUE;
        P2_PoruchaST3:= TRUE;
        P2_PoruchaST4:= TRUE;
    END_IF    
    
     
    //********************Pracovisko 2 - Porucha ochrannej bariéry zdvihu zakladaèa tesnenia****************************************//
    IF Safety.IN.P2_ZaklTesnenia_Zdvih_BUSY AND NOT Safety.STAV.P2_ZaklTesnenia_Bariera_AKTIVNA THEN
        P2_Alarmy[206]:= TRUE;
        P2_PoruchaST1:= TRUE;
    END_IF    
    
    
       
    
    
    
    //*********************Pracovisko 2 - Porucha serva zdvihu zakladaèa tesnenia***************//
    IF CasPoruchyServaZdvihuZakladaca.Q THEN
        P2_Alarmy[202]:= TRUE;
        P2_PoruchaST1:= TRUE;
	END_IF	
	
    IF Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA AND P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR THEN
        CasPoruchyServaZdvihuZakladaca.IN:= TRUE;
    ELSE    
        CasPoruchyServaZdvihuZakladaca.IN:= FALSE;
    END_IF 
    
    CasPoruchyServaZdvihuZakladaca.PT:= T#2s;   
    CasPoruchyServaZdvihuZakladaca();
    
    
    //********************Pracovisko 2 - Porucha bumpera suflíka zakladaèa tesnenia****************************************//
    IF Safety.IN.P2_ZaklTesnenia_Vysuvanie_BUSY AND NOT Safety.STAV.P2_ZaklTesnenia_Bumper_AKTIVNY THEN
        P2_Alarmy[207]:= TRUE;
        P2_PoruchaST1:= TRUE;
    END_IF  
    
   
		
    
    
	//*********************Pracovisko 2 - Porucha serva pojazdu zakladaèa tesnenia***************//
	IF CasPoruchyServaPojazduZakladaca.Q THEN
        P2_Alarmy[203]:= TRUE;
        P2_PoruchaST1:= TRUE;
	END_IF	
	
    IF Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR THEN
        CasPoruchyServaPojazduZakladaca.IN:= TRUE;
    ELSE    
        CasPoruchyServaPojazduZakladaca.IN:= FALSE;
    END_IF
    
    CasPoruchyServaPojazduZakladaca.PT:= T#2s;   
    CasPoruchyServaPojazduZakladaca();
    
    
	//*********************Pracovisko 2 - Porucha serva manipulatora šrobovania os X***************//
	IF CasPoruchyServaSrobovaniaOsX.Q THEN
        P2_Alarmy[215]:= TRUE;
        P2_PoruchaST3:= TRUE;
	END_IF	
	
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR THEN
        CasPoruchyServaSrobovaniaOsX.IN:= TRUE;
    ELSE    
        CasPoruchyServaSrobovaniaOsX.IN:= FALSE;
    END_IF 
    
    
    
    CasPoruchyServaSrobovaniaOsX.PT:= T#2s;   
    CasPoruchyServaSrobovaniaOsX();
    
    
	//*********************Pracovisko 2 - Porucha serva manipulatora šrobovania os Y***************//
	IF CasPoruchyServaSrobovaniaOsY.Q THEN
        P2_Alarmy[216]:= TRUE;
        P2_PoruchaST3:= TRUE;
	END_IF	
	
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR THEN
        CasPoruchyServaSrobovaniaOsY.IN:= TRUE;
    ELSE    
        CasPoruchyServaSrobovaniaOsY.IN:= FALSE;
    END_IF  
    
    
    
    CasPoruchyServaSrobovaniaOsY.PT:= T#2s;   
    CasPoruchyServaSrobovaniaOsY();
    
	
	//**********************Pracovisko 2 - Porucha serva zdvihu zvarania****************************//
	IF CasPoruchyServaZdvihuZvarania.Q THEN
        P2_Alarmy[220]:= TRUE;
        P2_PoruchaST4:= TRUE;
	END_IF	
	
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR THEN
        CasPoruchyServaZdvihuZvarania.IN:= TRUE;
    ELSE    
        CasPoruchyServaZdvihuZvarania.IN:= FALSE;
    END_IF  
    
    
    CasPoruchyServaZdvihuZvarania.PT:= T#2s;   
    CasPoruchyServaZdvihuZvarania();
	
    
    
    
    //****************************Pracovisko 2 - porucha vrchného dopravníka**********************************//
    IF NOT P2_Dopravniky.IN.HornyDoprav_TeplotaMotora_OK AND P2_Pracovisko.STAV.Automat THEN
        P2_Alarmy[278]:= TRUE;
    END_IF    
    
    
    //*****************************Pracovisko 2 - porucha spodného dopravníka************************************//
    IF NOT P2_Dopravniky.IN.SpodnyDoprav_TeplotaMotora_OK AND P2_Pracovisko.STAV.Automat THEN
        P2_Alarmy[279]:= TRUE;
    END_IF 
        
     
    //******************************Pracovisko 2 - narušenie výstupnej bariery***********************************//
    IF NOT Safety.STAV.P3_VstupBunky_Bariera_AKTIVNA AND NOT Safety.STAV.P3_ZonaBunky_AKTIVNA AND P2_Pracovisko.STAV.Automat THEN
        P2_Alarmy[280]:= TRUE;
    END_IF
    
    
    //******************************Stlaèenie tlaèítok CS*******************************************************//  
    IF EDGENEG(Safety.STAV.P2_Panel_TlacitkoCS_AKTIVNE) THEN
        P2_Alarmy[281]:= TRUE;
    END_IF
    
    IF EDGENEG(Safety.STAV.P2_Skrina_TlacitkoCS_AKTIVNE) THEN
        P2_Alarmy[282]:= TRUE;
    END_IF
    
    IF EDGENEG(Safety.STAV.P2_Robot_TlacitkoCS_AKTIVNE) THEN
        P2_Alarmy[283]:= TRUE;
    END_IF
    
    IF EDGENEG(Safety.STAV.P2_TlacitkoCS_AKTIVNE) THEN
        P2_Alarmy[284]:= TRUE;
    END_IF
    
    
   
    
    
    
    //***************************************************Nasetovanie alarmov****************************************************//
	
	IF P2_Alarmy[200] THEN
		MpAlarmXSet(gAlarmXCore, 'A200');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A200');
	END_IF
	
	IF P2_Alarmy[201] THEN
		MpAlarmXSet(gAlarmXCore, 'A201');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A201');
	END_IF
	
	IF P2_Alarmy[202] THEN
		MpAlarmXSet(gAlarmXCore, 'A202');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A202');
	END_IF
	
	IF P2_Alarmy[203] THEN
		MpAlarmXSet(gAlarmXCore, 'A203');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A203');
	END_IF
	
	IF P2_Alarmy[204] THEN
		MpAlarmXSet(gAlarmXCore, 'A204');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A204');
	END_IF
	
	IF P2_Alarmy[205] THEN
		MpAlarmXSet(gAlarmXCore, 'A205');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A205');
	END_IF
	
	IF P2_Alarmy[206] THEN
		MpAlarmXSet(gAlarmXCore, 'A206');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A206');
	END_IF
	
	IF P2_Alarmy[207] THEN
		MpAlarmXSet(gAlarmXCore, 'A207');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A207');
	END_IF
	
	IF P2_Alarmy[208] THEN
		MpAlarmXSet(gAlarmXCore, 'A208');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A208');
	END_IF
	
	IF P2_Alarmy[209] THEN
		MpAlarmXSet(gAlarmXCore, 'A209');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A209');
	END_IF
	
	IF P2_Alarmy[210] THEN
		MpAlarmXSet(gAlarmXCore, 'A210');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A210');
	END_IF
	
	IF P2_Alarmy[211] THEN
		MpAlarmXSet(gAlarmXCore, 'A211');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A211');
	END_IF
	
	IF P2_Alarmy[212] THEN
		MpAlarmXSet(gAlarmXCore, 'A212');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A212');
	END_IF
	
	IF P2_Alarmy[213] THEN
		MpAlarmXSet(gAlarmXCore, 'A213');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A213');
	END_IF
	
	IF P2_Alarmy[214] THEN
		MpAlarmXSet(gAlarmXCore, 'A214');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A214');
	END_IF
	
	IF P2_Alarmy[215] THEN
		MpAlarmXSet(gAlarmXCore, 'A215');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A215');
	END_IF
	
	IF P2_Alarmy[216] THEN
		MpAlarmXSet(gAlarmXCore, 'A216');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A216');
	END_IF
	
	IF P2_Alarmy[217] THEN
		MpAlarmXSet(gAlarmXCore, 'A217');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A217');
	END_IF
	
	IF P2_Alarmy[218] THEN
		MpAlarmXSet(gAlarmXCore, 'A218');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A218');
	END_IF
	
	IF P2_Alarmy[219] THEN
		MpAlarmXSet(gAlarmXCore, 'A219');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A219');
	END_IF
	
	IF P2_Alarmy[220] THEN
		MpAlarmXSet(gAlarmXCore, 'A220');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A220');
	END_IF
	
	IF P2_Alarmy[221] THEN
		MpAlarmXSet(gAlarmXCore, 'A221');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A221');
	END_IF
	
	IF P2_Alarmy[222] THEN
		MpAlarmXSet(gAlarmXCore, 'A222');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A222');
	END_IF
	
	IF P2_Alarmy[223] THEN
		MpAlarmXSet(gAlarmXCore, 'A223');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A223');
	END_IF
	
	IF P2_Alarmy[224] THEN
		MpAlarmXSet(gAlarmXCore, 'A224');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A224');
	END_IF
	
	IF P2_Alarmy[225] THEN
		MpAlarmXSet(gAlarmXCore, 'A225');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A225');
	END_IF
	
	IF P2_Alarmy[226] THEN
		MpAlarmXSet(gAlarmXCore, 'A226');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A226');
	END_IF
	
	IF P2_Alarmy[227] THEN
		MpAlarmXSet(gAlarmXCore, 'A227');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A227');
	END_IF
	
	IF P2_Alarmy[228] THEN
		MpAlarmXSet(gAlarmXCore, 'A228');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A228');
	END_IF
	
	IF P2_Alarmy[229] THEN
		MpAlarmXSet(gAlarmXCore, 'A229');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A229');
	END_IF
	
	IF P2_Alarmy[230] THEN
		MpAlarmXSet(gAlarmXCore, 'A230');
	ELSE
		MpAlarmXReset(gAlarmXCore, 'A230');
	END_IF
	
    IF P2_Alarmy[231] THEN
        MpAlarmXSet(gAlarmXCore, 'A231');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A231');
    END_IF
    
    IF P2_Alarmy[232] THEN
        MpAlarmXSet(gAlarmXCore, 'A232');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A232');
    END_IF
    
    IF P2_Alarmy[233] THEN
        MpAlarmXSet(gAlarmXCore, 'A233');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A233');
    END_IF
    
    IF P2_Alarmy[234] THEN
        MpAlarmXSet(gAlarmXCore, 'A234');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A234');
    END_IF
    
    IF P2_Alarmy[235] THEN
        MpAlarmXSet(gAlarmXCore, 'A235');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A235');
    END_IF
	
    IF P2_Alarmy[236] THEN
        MpAlarmXSet(gAlarmXCore, 'A236');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A236');
    END_IF
	
    IF P2_Alarmy[237] THEN
        MpAlarmXSet(gAlarmXCore, 'A237');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A237');
    END_IF
    
    IF P2_Alarmy[238] THEN
        MpAlarmXSet(gAlarmXCore, 'A238');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A238');
    END_IF
    
    IF P2_Alarmy[239] THEN
        MpAlarmXSet(gAlarmXCore, 'A239');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A239');
    END_IF
    
    IF P2_Alarmy[240] THEN
        MpAlarmXSet(gAlarmXCore, 'A240');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A240');
    END_IF
    
    IF P2_Alarmy[241] THEN
        MpAlarmXSet(gAlarmXCore, 'A241');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A241');
    END_IF
    
    IF P2_Alarmy[242] THEN
        MpAlarmXSet(gAlarmXCore, 'A242');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A242');
    END_IF
	
	
    IF P2_Alarmy[243] THEN
        MpAlarmXSet(gAlarmXCore, 'A243');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A243');
    END_IF
    
    IF P2_Alarmy[244] THEN
        MpAlarmXSet(gAlarmXCore, 'A244');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A244');
    END_IF
    
    IF P2_Alarmy[245] THEN
        MpAlarmXSet(gAlarmXCore, 'A245');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A245');
    END_IF
    
    IF P2_Alarmy[246] THEN
        MpAlarmXSet(gAlarmXCore, 'A246');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A246');
    END_IF
    
    IF P2_Alarmy[247] THEN
        MpAlarmXSet(gAlarmXCore, 'A247');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A247');
    END_IF
    
    IF P2_Alarmy[248] THEN
        MpAlarmXSet(gAlarmXCore, 'A248');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A248');
    END_IF
    
    IF P2_Alarmy[249] THEN
        MpAlarmXSet(gAlarmXCore, 'A249');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A249');
    END_IF
    
    IF P2_Alarmy[250] THEN
        MpAlarmXSet(gAlarmXCore, 'A250');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A250');
    END_IF
    
        
    IF P2_Alarmy[251] THEN
        MpAlarmXSet(gAlarmXCore, 'A251');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A251');
    END_IF
    
    IF P2_Alarmy[252] THEN
        MpAlarmXSet(gAlarmXCore, 'A252');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A252');
    END_IF
	
	
    IF P2_Alarmy[253] THEN
        MpAlarmXSet(gAlarmXCore, 'A253');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A253');
    END_IF
    
    IF P2_Alarmy[254] THEN
        MpAlarmXSet(gAlarmXCore, 'A254');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A254');
    END_IF
    
    IF P2_Alarmy[255] THEN
        MpAlarmXSet(gAlarmXCore, 'A255');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A255');
    END_IF
    
    IF P2_Alarmy[256] THEN
        MpAlarmXSet(gAlarmXCore, 'A256');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A256');
    END_IF
    
    IF P2_Alarmy[257] THEN
        MpAlarmXSet(gAlarmXCore, 'A257');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A257');
    END_IF
    
    IF P2_Alarmy[258] THEN
        MpAlarmXSet(gAlarmXCore, 'A258');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A258');
    END_IF
    
    IF P2_Alarmy[259] THEN
        MpAlarmXSet(gAlarmXCore, 'A259');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A259');
    END_IF
    
    IF P2_Alarmy[260] THEN
        MpAlarmXSet(gAlarmXCore, 'A260');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A260');
    END_IF
    
    
    IF P2_Alarmy[261] THEN
        MpAlarmXSet(gAlarmXCore, 'A261');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A261');
    END_IF
    
    IF P2_Alarmy[262] THEN
        MpAlarmXSet(gAlarmXCore, 'A262');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A262');
    END_IF
	
	
    IF P2_Alarmy[263] THEN
        MpAlarmXSet(gAlarmXCore, 'A263');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A263');
    END_IF
    
    IF P2_Alarmy[264] THEN
        MpAlarmXSet(gAlarmXCore, 'A264');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A264');
    END_IF
    
    IF P2_Alarmy[265] THEN
        MpAlarmXSet(gAlarmXCore, 'A265');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A265');
    END_IF
    
    IF P2_Alarmy[266] THEN
        MpAlarmXSet(gAlarmXCore, 'A266');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A266');
    END_IF
    
    IF P2_Alarmy[267] THEN
        MpAlarmXSet(gAlarmXCore, 'A267');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A267');
    END_IF
    
    IF P2_Alarmy[268] THEN
        MpAlarmXSet(gAlarmXCore, 'A268');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A268');
    END_IF
    
    IF P2_Alarmy[269] THEN
        MpAlarmXSet(gAlarmXCore, 'A269');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A269');
    END_IF
    
    IF P2_Alarmy[270] THEN
        MpAlarmXSet(gAlarmXCore, 'A270');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A270');
    END_IF 
    
    IF P2_Alarmy[271] THEN
        MpAlarmXSet(gAlarmXCore, 'A271');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A271');
    END_IF 
    
    IF P2_Alarmy[272] THEN
        MpAlarmXSet(gAlarmXCore, 'A272');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A272');
    END_IF 
    
    IF P2_Alarmy[273] THEN
        MpAlarmXSet(gAlarmXCore, 'A273');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A273');
    END_IF 
    
    IF P2_Alarmy[274] THEN
        MpAlarmXSet(gAlarmXCore, 'A274');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A274');
    END_IF 
    
    IF P2_Alarmy[275] THEN
        MpAlarmXSet(gAlarmXCore, 'A275');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A275');
    END_IF 
    
    IF P2_Alarmy[276] THEN
        MpAlarmXSet(gAlarmXCore, 'A276');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A276');
    END_IF 
    
    IF P2_Alarmy[277] THEN
        MpAlarmXSet(gAlarmXCore, 'A277');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A277');
    END_IF 
    
    IF P2_Alarmy[278] THEN
        MpAlarmXSet(gAlarmXCore, 'A278');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A278');
    END_IF 
    
	
    IF P2_Alarmy[279] THEN
        MpAlarmXSet(gAlarmXCore, 'A279');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A279');
    END_IF 
    
    IF P2_Alarmy[280] THEN
        MpAlarmXSet(gAlarmXCore, 'A280');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A280');
    END_IF 
    
    IF P2_Alarmy[281] THEN
        MpAlarmXSet(gAlarmXCore, 'A281');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A281');
    END_IF 
    
    IF P2_Alarmy[282] THEN
        MpAlarmXSet(gAlarmXCore, 'A282');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A282');
    END_IF 
    
    IF P2_Alarmy[283] THEN
        MpAlarmXSet(gAlarmXCore, 'A283');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A283');
    END_IF 
    
    IF P2_Alarmy[284] THEN
        MpAlarmXSet(gAlarmXCore, 'A284');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A284');
    END_IF 
    
    IF P2_Alarmy[285] THEN
        MpAlarmXSet(gAlarmXCore, 'A285');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A285');
    END_IF 
    
    IF P2_Alarmy[286] THEN
        MpAlarmXSet(gAlarmXCore, 'A286');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A286');
    END_IF 
    
    IF P2_Alarmy[287] THEN
        MpAlarmXSet(gAlarmXCore, 'A287');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A287');
    END_IF 
    
    IF P2_Alarmy[288] THEN
        MpAlarmXSet(gAlarmXCore, 'A288');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A288');
    END_IF
    
    IF P2_Alarmy[289] THEN
        MpAlarmXSet(gAlarmXCore, 'A289');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A289');
    END_IF
    
    
    IF P2_Alarmy[290] THEN
        MpAlarmXSet(gAlarmXCore, 'A290');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A290');
    END_IF 
    
    IF P2_Alarmy[291] THEN
        MpAlarmXSet(gAlarmXCore, 'A291');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A291');
    END_IF 
    
    IF P2_Alarmy[292] THEN
        MpAlarmXSet(gAlarmXCore, 'A292');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A292');
    END_IF 
    
    IF P2_Alarmy[293] THEN
        MpAlarmXSet(gAlarmXCore, 'A293');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A293');
    END_IF 
    
    IF P2_Alarmy[294] THEN
        MpAlarmXSet(gAlarmXCore, 'A294');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A294');
    END_IF 
    
    IF P2_Alarmy[295] THEN
        MpAlarmXSet(gAlarmXCore, 'A295');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A295');
    END_IF
    
    IF P2_Alarmy[296] THEN
        MpAlarmXSet(gAlarmXCore, 'A296');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A296');
    END_IF
    
    IF P2_Alarmy[297] THEN
        MpAlarmXSet(gAlarmXCore, 'A297');
    ELSE
        MpAlarmXReset(gAlarmXCore, 'A297');
    END_IF
    
    
    
    
   
	
    //********************************Zobrazenie symbolu alarmu*****************************************************//
	
    IF P2_Pracovisko.STAV.PORUCHA THEN
        P2_AlarmyVizu.ZobrazSymbolAlarmu:= Blikac1s;
    ELSE
        P2_AlarmyVizu.ZobrazSymbolAlarmu:= FALSE;
    END_IF	
	
	
    //********************************Blikanie tlaèítka Alarmy*******************************************************//
    IF P2_Pracovisko.STAV.PORUCHA AND P2_Vizu.ActualPage <> 'PageAlarmP2' THEN
        IF Blikac1s THEN
            P2_AlarmyVizu.FarbaTlacitka_Alarmy:= "Button_Red";
        ELSE	
            P2_AlarmyVizu.FarbaTlacitka_Alarmy:= "default";
        END_IF
    ELSE
        P2_AlarmyVizu.FarbaTlacitka_Alarmy:= "default";
    END_IF	
	
	
	
	
	//*************************************Potvrdenie alarmov*********************************************************//
	IF P2_AlarmyVizu.PotvrdAlarmy THEN
		brsmemset(ADR(P2_Alarmy),0,SIZEOF(P2_Alarmy));
		P2_Pracovisko.STAV.PORUCHA:= FALSE;
		P2_PoruchaST1:= FALSE;
		P2_PoruchaST2:= FALSE;
		P2_PoruchaST3:= FALSE;
		P2_PoruchaST4:= FALSE;
		IF P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR AND P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ReadyToPower_ON THEN
            P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ErrorRESET:= TRUE;
        END_IF
        IF P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR AND P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ReadyToPower_ON THEN
            P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ErrorRESET:= TRUE;
        END_IF
        IF P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR AND P2_Srobovanie.ServoManipulOsX_M10.STATUS.ReadyToPower_ON THEN
            P2_Srobovanie.ServoManipulOsX_M10.CMD.ErrorRESET:= TRUE;
        END_IF
        IF P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR AND P2_Srobovanie.ServoManipulOsY_M9.STATUS.ReadyToPower_ON THEN
            P2_Srobovanie.ServoManipulOsY_M9.CMD.ErrorRESET:= TRUE;
        END_IF
        IF P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR AND P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ReadyToPower_ON THEN
            P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ErrorRESET:= TRUE;
        END_IF    
		P2_AlarmyVizu.PotvrdAlarmy:= FALSE;
	END_IF	
	
    //Resetovanie serv zakladaèa tesnenia//
    IF EDGEPOS(Safety.STAV.P2_ZonaZaklTesnenZdvih_AKTIVNA) THEN
        P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ErrorRESET:= TRUE;
    END_IF    
    
    IF EDGEPOS(Safety.STAV.P2_ZonaZaklTesnenPojazd_AKTIVNA) THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ErrorRESET:= TRUE;
    END_IF  
    
    
    //Resetovanie poruch serv pri zatvorení bunky//
    IF EDGEPOS(Safety.STAV.P2_ZonaBunky_AKTIVNA) THEN
        P2_Srobovanie.ServoManipulOsX_M10.CMD.ErrorRESET:= TRUE;
        P2_Srobovanie.ServoManipulOsY_M9.CMD.ErrorRESET:= TRUE;
        P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ErrorRESET:= TRUE;
    END_IF    
        
    
    
	
    //Zrušenie resetovania porúch serv//
    IF NOT P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.STATUS.ERROR THEN
        P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetServaZdvihuZakladaca.Q THEN
        P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ErrorRESET:= FALSE;
    END_IF	
    
    
    IF NOT P2_ZakladacTesnenia.ServoPojazduVozika_M5.STATUS.ERROR THEN
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetServaPojazduZakladaca.Q THEN 
        P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ErrorRESET:= FALSE;
    END_IF	
	
    IF NOT P2_Srobovanie.ServoManipulOsX_M10.STATUS.ERROR THEN
        P2_Srobovanie.ServoManipulOsX_M10.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServaSrobovaniaOsX.Q THEN
        P2_Srobovanie.ServoManipulOsX_M10.CMD.ErrorRESET:= FALSE;
    END_IF
    
    IF NOT P2_Srobovanie.ServoManipulOsY_M9.STATUS.ERROR THEN 
        P2_Srobovanie.ServoManipulOsY_M9.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServaSrobovaniaOsY.Q THEN
        P2_Srobovanie.ServoManipulOsY_M9.CMD.ErrorRESET:= FALSE;
    END_IF
    
    IF NOT P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ERROR THEN 
        P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetServaZdvihuZvarania.Q THEN
        P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ErrorRESET:= FALSE;
    END_IF
    
    
    CasResetServaZdvihuZakladaca.PT:= T#2s;
    CasResetServaZdvihuZakladaca.IN:= P2_ZakladacTesnenia.ServoZdvihuZakladaca_M4.CMD.ErrorRESET;
    CasResetServaZdvihuZakladaca();
    
    CasResetServaPojazduZakladaca.PT:= T#2s;
    CasResetServaPojazduZakladaca.IN:= P2_ZakladacTesnenia.ServoPojazduVozika_M5.CMD.ErrorRESET;
    CasResetServaPojazduZakladaca();
    
    CasResetovaniaServaSrobovaniaOsX.PT:= T#2s;
    CasResetovaniaServaSrobovaniaOsX.IN:= P2_Srobovanie.ServoManipulOsX_M10.CMD.ErrorRESET;
    CasResetovaniaServaSrobovaniaOsX();
    
    
    CasResetovaniaServaSrobovaniaOsY.PT:= T#2s;
    CasResetovaniaServaSrobovaniaOsY.IN:= P2_Srobovanie.ServoManipulOsY_M9.CMD.ErrorRESET;
    CasResetovaniaServaSrobovaniaOsY();
    
    CasResetServaZdvihuZvarania.PT:= T#2s;
    CasResetServaZdvihuZvarania.IN:= P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.ErrorRESET;
    CasResetServaZdvihuZvarania();
    
    
    
    
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


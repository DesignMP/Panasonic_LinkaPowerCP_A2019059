
PROGRAM _INIT
    Triger_0:= FALSE;
    Triger_1:= FALSE;
    P4_Etiketovacka.PAR.ServoZdvihu_JoggRychlost:= 5;
    
    //Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
    //    NovaHodnotaMomentu_POS := 1.5; //v Nm
    //    NovaHodnotaMomentu_NEG := 1.5; //v Nm
    //    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_11);
    //    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
    //    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
    //    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
    //    
    //    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
    //    McAcpAxProcessParIDType_0[0].ParID      := 248;
    //    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(NovaHodnotaMomentu_POS);
    //    
    //    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
    //    McAcpAxProcessParIDType_0[1].ParID      := 249;
    //    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(NovaHodnotaMomentu_NEG);
    //	
    //    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
    //    MC_BR_ProcessParID_AcpAx_0();
    
    
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie podprogramov//
    OvlCentrovacky;
    IOLinkKomunikacia;
    OvlServaZdvihu;
    KOM_Tlaciaren;
    VytvorenieEtikety;
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P4_Etiketovacka);
	
	
	
    //Príznak etiketovacka východzia pozícia//
    IF P4_Etiketovacka.IN.Centrovanie_ZASUNUTE_IS55 AND P4_Etiketovacka.STAV.Zdvih_AktualnaPozicia < 10 THEN
        P4_Etiketovacka_VychodziaPozicia:= TRUE;
    ELSE
        P4_Etiketovacka_VychodziaPozicia:= FALSE;
    END_IF	
	
    P4_Etiketovacka.IN.Tlaciaren_DochadzaPaska;
    P4_Etiketovacka.IN.Tlaciaren_ERROR;
    P4_Etiketovacka.IN.Tlaciaren_READY;
    P4_Etiketovacka.OUT.Tlaciaren_RESET_Poruchy;
    P4_Etiketovacka.OUT.Tlaciaren_START_Tlace;
	
	
	
	
		
    //Reset sekcie //
    IF P4_Etiketovacka.Reset THEN
        SC_P4_Etiketovacka.Step:= 0;
        P4_Etiketovacka.Reset:= FALSE;
    END_IF	
	
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA AND NOT P4_Etiketovacka.Automat THEN
        SC_P4_Etiketovacka.Step:= 0;
    END_IF 
    
    IF NOT Safety.STAV.P4_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN 
        Triger_0:= TRUE;
        IF P4_Etiketovacka.IN.PritomnostPaletky_S12 AND P4_Etiketovacka.Automat THEN 
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P4_Etiketovacka.KoniecCyklu:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P4_Etiketovacka.KoniecCyklu:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 550;
            END_IF
        END_IF
    END_IF   
    
    IF Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF         
            
            
            
    
    //Zastavenie serva//
    IF EDGEPOS(P4_PoruchaST3) THEN
        Zdvih_STOP:= TRUE;
    ELSIF EDGEPOS(P4_Etiketovacka.Reset) THEN
        Zdvih_STOP:= TRUE;
    END_IF	
	
    //Porucha stanice//
    IF P4_PoruchaST3 AND NOT Triger_1 THEN
        Triger_1:= TRUE;
        IF P4_Etiketovacka.IN.PritomnostPaletky_S12 AND P4_Etiketovacka.Automat THEN 
            IF NOT Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN 
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            ELSIF Paletka[i].VnutornyStav.CinnostSpustena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P4_Etiketovacka.KoniecCyklu:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 550;
            ELSIF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                Paletka[i].PAR.StavPowerCP:= 'FAIL';
                Paletka[i].PAR.StavPaletky:= 'NG';
                P4_Etiketovacka.KoniecCyklu:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 550;
            END_IF
        ELSE
            SC_P4_Etiketovacka.ResetStep:= TRUE;
            SC_P4_Etiketovacka.Step:= 0;
        END_IF    
    END_IF   
	
    IF NOT P4_PoruchaST3 THEN
        Triger_1:= FALSE;
    END_IF 
    
    
    
    //Èasy komunikácie//
    Server_CasDopytu.PT:= T#5M;
    Server_CasDopytu();
    Server_NameranyCasDopytu;
    Server_CasVyziadSeriovehoCisla.PT:= T#5M;
    Server_CasVyziadSeriovehoCisla();
    Server_NamerCasVyziadSerCisla;
    Server_CasOdoslaniaStavu.PT:= T#5M;
    Server_CasOdoslaniaStavu();
    Server_NamerCasOdosielania;
    
    CasPosielaniaFotky.PT:= T#1M;
    CasPosielaniaFotky();
    
	
    CASE SC_P4_Etiketovacka.Step OF 
	
	
        0:
            SC_P4_Etiketovacka.StepName:='0 - Nulovanie';
            SC_OvlCentrovacky.Step:= 0;
            SC_OvlZdvihu.Step:= 0;
            P4_Etiketovacka.Automat:= FALSE;
            P4_Etiketovacka.KoniecCyklu:= FALSE;
            P4_Etiketovacka.Manual:= FALSE;
            P4_Etiketovacka.STAV.PoINIT:= FALSE;
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggLimit_ACTIVE:= FALSE;
            P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
            P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= FALSE;
            P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= FALSE;
            P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= FALSE;
            P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= FALSE;
            P4_Etiketovacka.OUT.ZasunStoper_YV165:= FALSE;
            CAM14.CMD.Triger:= FALSE;
            CAM14.STAV.Results_READY:= FALSE;
            FTP_CAM14.CMD.OdosliFotku:= FALSE;
            FTP_CAM14.CMD.VymazFotku:= FALSE;
            CAM15.CMD.Triger:= FALSE;
            CAM15.STAV.Results_READY:= FALSE;
            FTP_CAM15.CMD.OdosliFotku:= FALSE;
            FTP_CAM15.CMD.VymazFotku:= FALSE;
            P4_Etiketovacka.STAV.KOM_PLC_OdoslanieFotiek_OK:= FALSE;
            P4_Etiketovacka.STAV.KOM_PLC_VymazanieFotiek_OK:= FALSE;
            TRCB_P4_Etiketovacka_ST9.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P4_Etiketovacka_ST9.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P4_Etiketovacka_ST9.CMD.OdosliStavPaletky_TYP2:= FALSE;
            TRCB_P4_Etiketovacka_ST9.CMD.VyziadajCisloEtikety_TYP0:= FALSE;
            PrecitaneCisloPaletky:= '';
            Tlaciaren.Status.VytlacenieEtikety_OK:= FALSE;
            Tlaciaren.Status.VytlacenieEtikety_ERROR:= FALSE;
            Tlaciaren.Commands.VytlacEtiketu:= FALSE;
            PocetDopytovNaServer:= 0;
            Taktime_Etiketovacka_ST9.CMD.START_Merania_1:= FALSE;
            Taktime_Etiketovacka_ST9.CMD.START_Merania_2:= FALSE;
            P4_Etiketovacka.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            P4_Etiketov_KAM_Result_Ignoruj:= FALSE;
            P4_Etiketov_CakaNaKameru:= FALSE;
            TestovaciKus:= FALSE;
            Server_CasDopytu.IN:= FALSE;
            Server_CasVyziadSeriovehoCisla.IN:= FALSE;
            Server_CasOdoslaniaStavu.IN:= FALSE;
            P4_Etiketovacka.RR_TestovanieEtiketovania:= FALSE;
            P4_Etiketovacka.STAV.TestovaciaSekvencia_BUSY:= FALSE;
            P4_Etiketovacka.RR_VysunAplikator:= FALSE;
            P4_Etiketovacka.RR_ZapniPrisavanie:= FALSE;
            CisloFotky:= 0;
            P4_Etiketov_KAM_Result_OK:= FALSE;
            P4_Etiketov_KAM_Result_NG:= FALSE;
            P34_Vizu.ZobrazHL1_ST9:= FALSE;
            P34_Vizu.ZobrazHL2_ST9:= FALSE;
            P34_Vizu.ZobrazHL3_ST9:= FALSE;
            P4_Etiketovacka.STAV.PowerCP_ZhodaQRkodu_OK:= FALSE;
            P4_Etiketovacka.STAV.Etiketa_ZhodaQRkodu_OK:= FALSE;
            Revork:= FALSE;
            PocetTrigrovKamery:= 0;
            
            
            IF Safety.STAV.P4_ZonaBunky_AKTIVNA AND NOT P4_Pracovisko.STAV.PORUCHA AND P4_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S15 AND P4_Pracovisko.STAV.ServaBunky_READY THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 1;
            END_IF
	
        1:
            SC_P4_Etiketovacka.StepName:='1 - Cakam na spustenie vyroby';
            P4_Etiketovacka.KoniecCyklu:= FALSE;
            IF P4_Etiketovacka.Automat THEN
                SC_P4_Etiketovacka.Step:= 2;
            ELSIF P4_Etiketovacka.Manual THEN
                SC_P4_Etiketovacka.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
	
	
        2:
            SC_P4_Etiketovacka.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
									
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 3;
            END_IF
		
        3:
            SC_P4_Etiketovacka.StepName:='3 - Inicializacia - vymazanie adresara kamery CAM15';
            SC_P4_Etiketovacka.IdleTime.PT:= T#4s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                FTP_CAM15.CMD.VymazFotku:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM15.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM15.CMD.VymazFotku:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 5;
            ELSIF FTP_CAM15.STATUS.KomunikaciaError THEN
                P34_Alarmy[434]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF	
            
			
	
        5:
            SC_P4_Etiketovacka.StepName:='5 - Inicializacia - kontrola homingu serva zdvihu etiketovacky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF P4_Etiketovacka.STAV.ServoZdvihu_HomingOK THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 8;
            ELSE
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 6;
            END_IF
		
        6:
            SC_P4_Etiketovacka.StepName:='6 - Inicializacia - spustenie homingu serva zdvihu etiketovacky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 AND Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
                Zdvih_HOME:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.STAV.ServoZdvihu_HomingOK THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 5;
            END_IF	
		
        8:
            SC_P4_Etiketovacka.StepName:='8 - Inicializacia - presun zdvihu etiketovacky do pozicie odoberania etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Etiketovacka_PozOdoberEtikety;
		
			
						
            IF NOT SC_P4_Etiketovacka.Switch1 AND SC_OvlZdvihu.Step = 1 AND NOT P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 AND Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
				
            IF P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 15;
            END_IF			
			
            IF P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
                P34_Alarmy[432]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF
			
	
        15:
            SC_P4_Etiketovacka.StepName:='15 - Inicializacia - zasunutie centrovacky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#4s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Centrovanie_ZASUNUTE_IS55 AND P4_Dopravniky.STAV.PoINIT THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 18;
            END_IF	
			
			
			
	
	
        18:
            SC_P4_Etiketovacka.StepName:='18 - Inicializacia - hladanie paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#5s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
	
            IF P4_Etiketovacka.IN.PritomnostPaletky_S12 THEN
                P4_FunkcnyTestB.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 20;		 
            ELSIF SC_P4_Etiketovacka.IdleTime.Q THEN
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 100;
            END_IF	
			
		
        20:
            SC_P4_Etiketovacka.StepName:='20 - Inicializacia - precitanie cisla paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
		
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                PrecitaneCisloPaletky:= USINT_TO_STRING(P4_Etiketovacka.IN.PrecitaneCisloPaletky_S12);
                i:= 0;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 23;
            END_IF	
            
            
        23:
            SC_P4_Etiketovacka.StepName:='23 - Inicializacia - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF PrecitaneCisloPaletky = '171' THEN
                i:= 1;
            ELSIF PrecitaneCisloPaletky = '164' THEN
                i:= 2;	
            ELSIF PrecitaneCisloPaletky = '181' THEN
                i:= 3;
            ELSIF PrecitaneCisloPaletky = '168' THEN
                i:= 4;
            ELSIF PrecitaneCisloPaletky = '140' THEN
                i:= 5;
            ELSIF PrecitaneCisloPaletky = '110' THEN
                i:= 6;
            ELSIF PrecitaneCisloPaletky = '156' THEN
                i:= 7;
            ELSIF PrecitaneCisloPaletky = '127' THEN
                i:= 8;
            ELSIF PrecitaneCisloPaletky = '139' THEN
                i:= 9;
            ELSIF PrecitaneCisloPaletky = '131' THEN
                i:= 10;
            ELSIF PrecitaneCisloPaletky = '178' THEN
                i:= 11;
            ELSIF PrecitaneCisloPaletky = '206' THEN
                i:= 12;
            ELSIF PrecitaneCisloPaletky = '119' THEN
                i:= 13;
            ELSIF PrecitaneCisloPaletky = '163' THEN
                i:= 14;
            ELSIF PrecitaneCisloPaletky = '128' THEN
                i:= 15;
            ELSIF PrecitaneCisloPaletky = '175' THEN
                i:= 16;
            ELSIF PrecitaneCisloPaletky = '138' THEN
                i:= 17;
            ELSE
                P34_Alarmy[406]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P4_Etiketovacka.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P4_Etiketovacka.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 30;
            END_IF	
            
            
        30:
            SC_P4_Etiketovacka.StepName:='30 - Inicializacia - kontrola stavu paletky'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
			
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_9' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_9' THEN 
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_9' THEN  
                Revork:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 33;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_9' THEN  
                Revork:= FALSE;
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 33;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            END_IF	
            
                 
            
        33:
            SC_P4_Etiketovacka.StepName:='33 - Inicializacia - kontrola uzavretia komunikacie'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            IF Paletka[i].VnutornyStav.KomunikaciaUzavreta THEN
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            ELSE
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 35;
            END_IF	
		
			
        35:
            SC_P4_Etiketovacka.StepName:='35 - Inicializacia - kontrola otvorenia komunikacie'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            IF Paletka[i].VnutornyStav.KomunikaciaOtvorena THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 38;
            ELSE
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 100;
            END_IF		
		
        38:
            SC_P4_Etiketovacka.StepName:='38 - Inicializacia - kontrola odoslania fotiek';
            SC_P4_Etiketovacka.IdleTime.PT:= T#5s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;   
            
            IF Paletka[i].VnutornyStav.FotkyOdoslane THEN
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 550;
            ELSE
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 40;
            END_IF    
            
            
        40:
            SC_P4_Etiketovacka.StepName:='40 - Inicializacia - zacentrovanie paletky ';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Centrovanie_VYSUNUTE_IS54 THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 43;
            END_IF	
            
                  
        43:
            SC_P4_Etiketovacka.StepName:='43 - Inicializacia - kontrola vyziadania serioveho cisla etikety'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s; 
            
            IF Paletka[i].VnutornyStav.CisloEtiketyVyziadane THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 45;
            ELSE
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 120;
            END_IF
                  
        45:
            
            SC_P4_Etiketovacka.StepName:='45 - Inicializacia - kamerova kontrola nalepenej etikety CAM15';//CAM 15//
            SC_P4_Etiketovacka.IdleTime.PT:= T#5s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
		
            IF NOT SC_P4_Etiketovacka.Switch1 AND CAM15.STAV.Command_READY THEN
                CAM15.CMD.Triger:= TRUE;
                SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
			
			
            IF CAM15.STAV.Results_READY AND CAM15.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM15.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 50;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM15.CMD.Triger:= FALSE;
                CAM15.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 48;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[454]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF
		
            
                    
            
         
            
        48:
            SC_P4_Etiketovacka.StepName:='48 - Inicializacia - cakam na opatovny triger kamery CAM15';
            SC_P4_Etiketovacka.IdleTime.PT:= T#1s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
            
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 45;
            END_IF
            
            
            
        50:
            SC_P4_Etiketovacka.StepName:='50 - Inicializacia - kontrola vysledku kamery';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            
            IF NOT CAM15.STAV.BUSY  THEN
                CAM15.CMD.Triger:= FALSE;
                IF CAM15.RESULT.Pritomn_Etikety THEN
                    CAM15.PAR.ResultFotky:= 'PASS';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 55;
                ELSE
                    CAM15.PAR.ResultFotky:= 'FAIL';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 53;
                END_IF
            END_IF
		
        53:
            SC_P4_Etiketovacka.StepName:='53 - Inicializacia - vymazanie adresara kamery CAM15';
            SC_P4_Etiketovacka.IdleTime.PT:= T#4s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                FTP_CAM15.CMD.VymazFotku:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF	
			
				
            IF FTP_CAM15.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM15.CMD.VymazFotku:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 55;
            ELSIF FTP_CAM15.STATUS.KomunikaciaError THEN
                P34_Alarmy[434]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF	
            
                 
        55:
            SC_P4_Etiketovacka.StepName:='55 - Inicializacia - rozhodnutie podla kamerovej kontroly paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            	
				
            IF CAM15.PAR.ResultFotky = 'PASS' THEN
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 193;
            ELSIF CAM15.PAR.ResultFotky = 'FAIL' THEN
                P4_Etiketovacka.STAV.PoINIT:= TRUE;
                IF P4_Etiketovacka.IN.SnimacVakuaPrisavaniaEtikety_S32 THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 140;
                ELSE
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 140;
                END_IF    
            END_IF
			
            
         
			
         
		
			
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P4_Etiketovacka.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF P4_Etiketovacka.IN.PritomnostPaletky_S12 THEN
                P4_FunkcnyTestB.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
                
            SC_P4_Etiketovacka.IdleTime.IN:= P4_Etiketovacka.IN.PritomnostPaletky_S12;
			
            IF EDGEPOS(P4_Etiketovacka.IN.PritomnostPaletky_S12)THEN
                IF NOT Taktime_Etiketovacka_ST9.CMD.START_Merania_1 THEN
                    Taktime_Etiketovacka_ST9.CMD.START_Merania_1:= TRUE;
                ELSE
                    Taktime_Etiketovacka_ST9.CMD.ZAPIS_Hodnot_1:= TRUE;
                END_IF    
            END_IF
            
            IF P4_Etiketovacka.KoniecCyklu THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 101;
            END_IF
		
        101:
            SC_P4_Etiketovacka.StepName:='101 - Automaticky Rezim - precitanie cisla paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#500ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
		
            
            PrecitaneCisloPaletky:= USINT_TO_STRING(P4_Etiketovacka.IN.PrecitaneCisloPaletky_S12);
            i:= 0;
            SC_P4_Etiketovacka.ResetStep:= TRUE;
            SC_P4_Etiketovacka.Step:= 108;
           
			
        108:
            SC_P4_Etiketovacka.StepName:='108 - Automaticky Rezim - priradenie indexu paletky na zaklade precitanej hodnoty';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF PrecitaneCisloPaletky = '171' THEN
                i:= 1;
            ELSIF PrecitaneCisloPaletky = '164' THEN
                i:= 2;	
            ELSIF PrecitaneCisloPaletky = '181' THEN
                i:= 3;
            ELSIF PrecitaneCisloPaletky = '168' THEN
                i:= 4;
            ELSIF PrecitaneCisloPaletky = '140' THEN
                i:= 5;
            ELSIF PrecitaneCisloPaletky = '110' THEN
                i:= 6;
            ELSIF PrecitaneCisloPaletky = '156' THEN
                i:= 7;
            ELSIF PrecitaneCisloPaletky = '127' THEN
                i:= 8;
            ELSIF PrecitaneCisloPaletky = '139' THEN
                i:= 9;
            ELSIF PrecitaneCisloPaletky = '131' THEN
                i:= 10;
            ELSIF PrecitaneCisloPaletky = '178' THEN
                i:= 11;
            ELSIF PrecitaneCisloPaletky = '206' THEN
                i:= 12;
            ELSIF PrecitaneCisloPaletky = '119' THEN
                i:= 13;
            ELSIF PrecitaneCisloPaletky = '163' THEN
                i:= 14;
            ELSIF PrecitaneCisloPaletky = '128' THEN
                i:= 15;
            ELSIF PrecitaneCisloPaletky = '175' THEN
                i:= 16;
            ELSIF PrecitaneCisloPaletky = '138' THEN
                i:= 17;
            ELSE
                P34_Alarmy[406]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF	
		
			
            IF i<> 0 THEN
                Paletka[i].PAR.CisloPaletky:= USINT_TO_STRING(i);
                P4_Etiketovacka.PAR.IndexPaletky_STRING:= USINT_TO_STRING(i);
                P4_Etiketovacka.PAR.IndexPaletky:= i;
                PrecitaneCisloPaletky:= '';
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 110;
            END_IF	
		
		
        110:
            SC_P4_Etiketovacka.StepName:='110 - Automaticky Rezim - kontrola stavu paletky'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            
            IF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice = 'ST_9' THEN
                TestovaciKus:= TRUE;
            ELSIF Paletka[i].PAR.TestovaciKus AND Paletka[i].PAR.CisloTestovacejStanice <> 'ST_9' THEN 
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice = 'ST_9' THEN  
                Revork:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 113;
            ELSIF Paletka[i].PAR.RevorkovyKus AND Paletka[i].PAR.CisloRevorkovejStanice <> 'ST_9' THEN  
                Revork:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;    
            ELSIF Paletka[i].PAR.StavPaletky = 'OK' THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 113;
            ELSIF Paletka[i].PAR.StavPaletky = 'NG' THEN	
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            END_IF		
			
			
			
		
			
        113:
            SC_P4_Etiketovacka.StepName:='113 - Automaticky Rezim - vyziadanie stavu paletky zo servera, zacentrovanie paletky'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#10s;	
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
			
                        
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                TRCB_P4_Etiketovacka_ST9.CMD.VyziadajStavPaletky_TYP1:= TRUE;
                Centrovacku_VYSUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
			
            IF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena THEN
                TRCB_P4_Etiketovacka_ST9.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 114;
            ELSIF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaError THEN	
                TRCB_P4_Etiketovacka_ST9.CMD.VyziadajStavPaletky_TYP1:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 115;
            END_IF				
						
		
	            
			
		
			
        114:
            SC_P4_Etiketovacka.StepName:='114 - Automaticky Rezim - kontrola odpovede servera';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;		
				
            IF NOT TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena AND P4_Etiketovacka.IN.Centrovanie_VYSUNUTE_IS54 THEN
                IF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].VnutornyStav.KomunikaciaOtvorena:= TRUE;
                    IF TRCB_P4_Etiketovacka_ST9.OUTPUTS.DruhCinnostiNaPaletke = 'PRD;ST9' THEN
                        SC_P4_Etiketovacka.ResetStep:= TRUE;
                        SC_P4_Etiketovacka.Step:= 118;
                    ELSE
                        Paletka[i].PAR.StavPaletky := 'NG';
                        SC_P4_Etiketovacka.ResetStep:= TRUE;
                        SC_P4_Etiketovacka.Step:= 116;
                    END_IF 
                ELSIF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 115;
                END_IF	
            END_IF
			
		
        115:
            SC_P4_Etiketovacka.StepName:='115 - Automaticky Rezim - rozhodnutie obsluhy po odpovedi panatrace NG';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;		
            
            P34_Vizu.ZobrazHL3_ST9:= TRUE;
            
            IF TRCB_P4_Etiketov_OpatovnyDopyt THEN
                TRCB_P4_Etiketov_OpatovnyDopyt:= FALSE; 
                P34_Vizu.ZobrazHL3_ST9:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 113;
            ELSIF TRCB_P4_Etiketov_PaletkaNG THEN
                TRCB_P4_Etiketov_PaletkaNG:= FALSE;
                P34_Vizu.ZobrazHL3_ST9:= FALSE;
                Paletka[i].PAR.StavPaletky := 'NG';
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 116;
            END_IF   
            
                
            
            
            
        116:
            SC_P4_Etiketovacka.StepName:='116 - Automaticky Rezim - odcentrovanie paletky po odpovedi servera NG';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Centrovanie_ZASUNUTE_IS55 THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 560;
            END_IF			
		
            
        118:
            SC_P4_Etiketovacka.StepName:='118 - Automaticky Rezim - zacentrovanie paletky ';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                Centrovacku_VYSUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Centrovanie_VYSUNUTE_IS54 THEN
                CAM14.STAV.Results_READY:= FALSE;
                IF P4_Etiketovacka.RR_TestovanieEtiketovania THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 138; 
                ELSE    
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 120;
                END_IF    
            END_IF	
		
	
		
		
			
		
        120:
            SC_P4_Etiketovacka.StepName:='120 - Automaticky Rezim - precitanie QR kodu na Power CP CAM14';//CAM 14//
            SC_P4_Etiketovacka.IdleTime.PT:= T#5s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                CAM14.CMD.Triger:= TRUE;
                P4_Etiketovacka.STAV.PowerCP_ZhodaQRkodu_OK:= FALSE;
                SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
			
            IF CAM14.STAV.Results_READY THEN
                PocetTrigrovKamery:= 0;
                CAM14.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 123;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM14.CMD.Triger:= FALSE;
                CAM14.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 122;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[453]:= TRUE;
                P4_PoruchaST3:= TRUE;    
            END_IF
            
            
              
            
            
            
        122:
            SC_P4_Etiketovacka.StepName:='122 - Automaticky Rezim - cakam na opatovny triger kamery CAM14';
            SC_P4_Etiketovacka.IdleTime.PT:= T#1s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
            
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 120;
            END_IF
            
            
            
			
        123:
            SC_P4_Etiketovacka.StepName:='123 - Automaticky Rezim - kontrola vysledku kamery';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
				
            IF NOT CAM14.STAV.BUSY AND SC_P4_Etiketovacka.IdleTime.Q THEN
                CAM14.CMD.Triger:= FALSE;
                IF CAM14.RESULT.PowerCP.CitanieQRkodu_PowerCP_OK THEN
                    IF Paletka[i].PAR.QRkodPowerCP = CAM14.RESULT.PowerCP.PrecitanyQRkod_PowerCP THEN
                        P4_Etiketovacka.STAV.PowerCP_ZhodaQRkodu_OK:= TRUE;
                        CAM14.PAR.ResultFotky:= 'PASS';
                        SC_P4_Etiketovacka.ResetStep:= TRUE;
                        SC_P4_Etiketovacka.Step:= 128;
                    ELSE
                        CAM14.PAR.ResultFotky:= 'FAIL';
                        P4_Etiketovacka.STAV.PowerCP_ZhodaQRkodu_OK:= FALSE;
                        SC_P4_Etiketovacka.ResetStep:= TRUE;
                        SC_P4_Etiketovacka.Step:= 128;
                    END_IF
                ELSE
                    CAM14.PAR.ResultFotky:= 'FAIL';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 128;
                END_IF
            END_IF
		
				
					
        128:
            SC_P4_Etiketovacka.StepName:='128 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            P4_Etiketov_CakaNaKameru:= TRUE;	
				
            IF CAM14.PAR.ResultFotky = 'PASS' THEN
                P4_Etiketov_CakaNaKameru:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 130;
            ELSIF CAM14.PAR.ResultFotky = 'FAIL' THEN   
                P34_Vizu.ZobrazHL1_ST9:= TRUE;
                IF P4_Etiketov_KAM_Result_OFF THEN
                    P4_Etiketov_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL1_ST9:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 130;
                ELSIF P4_Etiketov_KAM_Result_OK THEN
                    P4_Etiketov_KAM_Result_OK:= FALSE;
                    P4_Etiketov_CakaNaKameru:= FALSE;
                    CAM14.PAR.ResultFotky:= 'PASS';
                    P34_Vizu.ZobrazHL1_ST9:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 130;
                ELSIF P4_Etiketov_KAM_Result_NG THEN
                    P4_Etiketov_KAM_Result_NG:= FALSE;
                    P4_Etiketov_CakaNaKameru:= FALSE;  
                    P34_Vizu.ZobrazHL1_ST9:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 540;
                END_IF	
            END_IF
		
				
			
			
			
        130:
            SC_P4_Etiketovacka.StepName:='130 - Automaticky Rezim - vyziadanie serioveho cisla etikety zo servera';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#10s;	
			
				
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                TRCB_P4_Etiketovacka_ST9.CMD.VyziadajCisloEtikety_TYP0:= TRUE;
                P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= TRUE;
                P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= FALSE;
                P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF	
			
            IF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena THEN
                TRCB_P4_Etiketovacka_ST9.CMD.VyziadajCisloEtikety_TYP0:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 133;
            ELSIF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaError THEN	
                //                P34_Alarmy[409]:= TRUE;
                //                P4_PoruchaST3:= TRUE;
            END_IF				
						
		
            
            
            
			
        133:
            SC_P4_Etiketovacka.StepName:='133 - Automaticky Rezim - kontrola odpovede servera';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;		
			
            IF NOT TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena THEN
                Paletka[i].VnutornyStav.CisloEtiketyVyziadane:= TRUE;
                IF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    SerioveCisloEtikety:= TRCB_P4_Etiketovacka_ST9.OUTPUTS.CisloEtikety;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 140;
                ELSIF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
                    Paletka[i].PAR.StavPaletky := 'NG';
                    P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= FALSE;
                    P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= TRUE;
                    P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 560;
                END_IF	
            END_IF
			
			
				
			
            				
            			
        138:
            SC_P4_Etiketovacka.StepName:='138 - Automaticky Rezim - vytlacenie etikety z PLC';
            SC_P4_Etiketovacka.IdleTime.PT:= T#500ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= TRUE;
            P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= FALSE;
            P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= TRUE;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
            
            IF NOT SC_P4_Etiketovacka.Switch1 AND SC_P4_Etiketovacka.IdleTime.Q THEN
                Tlaciaren.Commands.VytlacEtiketu:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
            	
            				
            IF Tlaciaren.Status.VytlacenieEtikety_OK THEN
                Tlaciaren.Status.VytlacenieEtikety_OK:= FALSE;
                Tlaciaren.Commands.VytlacEtiketu:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 140;
            ELSIF Tlaciaren.Status.VytlacenieEtikety_ERROR THEN
                P34_Alarmy[431]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF
				
			
            
                       
            
			
			
        140:
            SC_P4_Etiketovacka.StepName:='140 - Automaticky Rezim - cakam na vysunutie etikety, vypnutie ofuku etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#500ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
            SC_P4_Etiketovacka.AlarmTime.IN:= NOT P4_Etiketovacka.IN.SnimacVakuaPrisavaniaEtikety_S32;
            
            SC_P4_Etiketovacka.IdleTime.IN:= P4_Etiketovacka.IN.SnimacVakuaPrisavaniaEtikety_S32;
			
            IF SC_P4_Etiketovacka.IdleTime.Q AND NOT P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
                P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 155;
            ELSIF SC_P4_Etiketovacka.AlarmTime.Q AND NOT P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
                P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 155;    
            END_IF
			
            IF P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
                P34_Alarmy[432]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF
            
            //            IF SC_P4_Etiketovacka.AlarmTime.Q THEN
            //                P34_Alarmy[431]:= TRUE;
            //                P4_PoruchaST3:= TRUE;
            //            END_IF    
		
        155:
            SC_P4_Etiketovacka.StepName:='155 - Automaticky Rezim - napolohovanie zdvihu na poziciu nalepenia etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Etiketovacka_PozEtikety_4F;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Etiketovacka_PozEtikety_5F;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Etiketovacka_PozEtikety_5H;
            END_IF
		
            IF NOT SC_P4_Etiketovacka.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
				
            IF P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 158;
            END_IF	
			
		
        158:
            SC_P4_Etiketovacka.StepName:='158 - Automaticky Rezim - vysunutie aplikatora etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            SC_P4_Etiketovacka.IdleTime.IN:= P4_Etiketovacka.IN.Aplikator_VYSUNUTY_MS36;
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 160;
            END_IF	
		
		
        160:
            SC_P4_Etiketovacka.StepName:='160 - Automaticky Rezim - vypnutie prisavania a zasunutie aplikatora etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= FALSE;
                P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= TRUE;
                P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= FALSE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Aplikator_ZASUNUTY_MS35 THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 163;
            END_IF
		
		
        163:
            SC_P4_Etiketovacka.StepName:='163 - Automaticky Rezim - napolohovanie zdvihu na poziciu 7mm nad etiketu';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
					
		
            IF NOT SC_P4_Etiketovacka.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
                P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= (P4_Etiketovacka.STAV.Zdvih_AktualnaPozicia - 5);
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
				
            IF P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 165;
            END_IF	
		
		
        165:
            SC_P4_Etiketovacka.StepName:='165 - Automaticky Rezim - vysunutie aplikatora etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            SC_P4_Etiketovacka.IdleTime.IN:= P4_Etiketovacka.IN.Aplikator_VYSUNUTY_MS36;		
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 168;
            END_IF	
		
		
        168:
            SC_P4_Etiketovacka.StepName:='168 - Automaticky Rezim - zasunutie aplikatora etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= FALSE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Aplikator_ZASUNUTY_MS35 THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 170;
            END_IF
		
        170:
            SC_P4_Etiketovacka.StepName:='170 - Automaticky Rezim - napolohovanie zdvihu na poziciu odoberania etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#2s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
					
            P4_Etiketovacka.PAR.ServoZdvihu_ZadanaPozicia:= P34_RemPremenne.P4_Etiketovacka_PozOdoberEtikety;
			
            IF NOT SC_P4_Etiketovacka.Switch1 AND SC_OvlZdvihu.Step = 1 AND NOT P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 AND Safety.STAV.P4_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
				
            IF P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P4_Etiketovacka.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                CAM15.STAV.Results_READY:= FALSE;
                IF P4_Etiketovacka.RR_TestovanieEtiketovania THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 545;
                ELSE    
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 190;
                END_IF    
            END_IF	
		
            IF P4_Etiketovacka.IN.PritlakPaskyOdisteny_IS84 THEN
                P34_Alarmy[432]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF
			
		
        190:
            SC_P4_Etiketovacka.StepName:='190 - Automaticky Rezim - kamerova kontrola nalepenej etikety CAM15';//CAM 15//
            SC_P4_Etiketovacka.IdleTime.PT:= T#5s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 AND CAM15.STAV.Command_READY THEN
                CAM15.CMD.Triger:= TRUE;
                P4_Etiketovacka.STAV.Etiketa_ZhodaQRkodu_OK:= FALSE;
                SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
			
			
            IF CAM15.STAV.Results_READY AND CAM15.STAV.Command_AKCEPTOVANY THEN
                PocetTrigrovKamery:= 0;
                CAM15.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 193;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery < 5 THEN
                PocetTrigrovKamery:= PocetTrigrovKamery + 1;
                CAM15.CMD.Triger:= FALSE;
                CAM15.STAV.Results_READY:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 192;
            ELSIF SC_P4_Etiketovacka.IdleTime.Q AND PocetTrigrovKamery >= 5 THEN
                P34_Alarmy[454]:= TRUE;
                P4_PoruchaST3:= TRUE;    
            END_IF
		
            
            
                  
            
            
        192:
            SC_P4_Etiketovacka.StepName:='192 - Automaticky Rezim - cakam na opatovny triger kamery CAM15';
            SC_P4_Etiketovacka.IdleTime.PT:= T#1s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
            
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 190;
            END_IF
            
            
            
        193:
            SC_P4_Etiketovacka.StepName:='193 - Automaticky Rezim - kontrola vysledku kamery';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
            
            IF NOT CAM15.STAV.BUSY  THEN
                CAM15.CMD.Triger:= FALSE;
                IF CAM15.RESULT.CitanieQRkodu_Etikety_OK AND
                    CAM15.RESULT.Pritomn_Etikety THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 194;
                ELSE
                    CAM15.PAR.ResultFotky:= 'FAIL';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 198;
                END_IF
            END_IF
		
            
        194:
            SC_P4_Etiketovacka.StepName:='194 - Automaticky Rezim - kontrola obsahu QR kodu etikety';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            SC_P4_Etiketovacka.IdleTime.IN:= TRUE;
			
            IF SerioveCisloEtikety = CAM15.RESULT.PrecitanyQRkod_Etikety THEN
                P4_Etiketovacka.STAV.Etiketa_ZhodaQRkodu_OK:= TRUE;
                CAM15.PAR.ResultFotky:= 'PASS';
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 198;
            ELSE
                CAM15.PAR.ResultFotky:= 'FAIL';
                P4_Etiketovacka.STAV.Etiketa_ZhodaQRkodu_OK:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 198;
            END_IF 
			
            
        198:
            SC_P4_Etiketovacka.StepName:='198 - Automaticky Rezim - rozhodnutie podla kamerovej kontroly paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
            P4_Etiketov_CakaNaKameru:= TRUE;	
				
            IF CAM15.PAR.ResultFotky = 'PASS' THEN
                Paletka[i].PAR.StavPowerCP:= 'PASS';
                P4_Etiketov_CakaNaKameru:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 540;
            ELSIF CAM15.PAR.ResultFotky = 'FAIL' THEN    
                P34_Vizu.ZobrazHL2_ST9:= TRUE;
                IF P4_Etiketov_KAM_Result_OFF THEN
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    P4_Etiketov_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL2_ST9:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 540;	
                ELSIF P4_Etiketov_KAM_Result_OK THEN
                    P4_Etiketov_KAM_Result_OK:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'PASS';
                    CAM15.PAR.ResultFotky:= 'PASS';
                    P4_Etiketov_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL2_ST9:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 540;
                ELSIF P4_Etiketov_KAM_Result_NG THEN
                    P4_Etiketov_KAM_Result_NG:= FALSE;
                    Paletka[i].PAR.StavPowerCP:= 'FAIL';
                    P4_Etiketov_CakaNaKameru:= FALSE;
                    P34_Vizu.ZobrazHL2_ST9:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 540;
                END_IF
            END_IF
			
			
			
			
            //Odoslanie fotiek na server//				
			
        540:
            SC_P4_Etiketovacka.StepName:='540 - Automaticky Rezim - odoslanie fotiek na server Panasonic';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;		
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                FTP_CAM15.INPUTS.QRkodPowerCP:= Paletka[i].PAR.QRkodPowerCP;
                CisloFotky:= CisloFotky + 1;
                FTP_CAM15.INPUTS.IndexFotky:= USINT_TO_STRING(CisloFotky);
                FTP_CAM15.INPUTS.Result:= CAM15.PAR.ResultFotky;
                Reports.Kamery.P4_CAM15_KontrolaPaletky:= CAM15.PAR.ResultFotky;
			           
                FTP_CAM15.CMD.OdosliFotku:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
            
			
				
			
            IF FTP_CAM15.STATUS.KomunikaciaUkoncena THEN
                FTP_CAM15.CMD.OdosliFotku:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 545; 
            ELSIF FTP_CAM15.STATUS.KomunikaciaError THEN
                P34_Alarmy[407]:= TRUE;
                P4_PoruchaST3:= TRUE;
            END_IF	
			
			
			
			
            //Odcentrovanie paletky//			
		
        545:
            SC_P4_Etiketovacka.StepName:='545 - Automaticky Rezim - odcentrovanie paletky';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                Centrovacku_ZASUN:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
		
            IF P4_Etiketovacka.IN.Centrovanie_ZASUNUTE_IS55 THEN
                IF P4_Etiketovacka.RR_TestovanieEtiketovania THEN
                    P4_Etiketovacka.RR_TestovanieEtiketovania:= FALSE;
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 700;
                ELSE    
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 550;
                END_IF    
            END_IF
          		
		
			
			
            //Odoslanie dát na server//			
		
        550:
            SC_P4_Etiketovacka.StepName:='550 - Automaticky Rezim - odoslanie dat na server';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
			
            IF NOT SC_P4_Etiketovacka.Switch1 THEN
                TRCB_P4_Etiketovacka_ST9.CMD.OdosliStavPaletky_TYP2:= TRUE;
                SC_P4_Etiketovacka.Switch1:= TRUE;
            END_IF
			
			
            IF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena THEN
                TRCB_P4_Etiketovacka_ST9.CMD.OdosliStavPaletky_TYP2:= FALSE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 553;
            ELSIF TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaError THEN	
                //                P34_Alarmy[409]:= TRUE;
                //                P4_PoruchaST3:= TRUE;
            END_IF
			
		            
            
			
        553:
            SC_P4_Etiketovacka.StepName:='553 - Automaticky Rezim - kontrola odpovede servera';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
			
			
            IF NOT TRCB_P4_Etiketovacka_ST9.STATUS.KomunikaciaUkoncena THEN
                IF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'OK' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 555;
                ELSIF TRCB_P4_Etiketovacka_ST9.OUTPUTS.PovolenieCinnostiNaPaletke = 'NG' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 555;
                END_IF	
            END_IF
			
		
        555:
            SC_P4_Etiketovacka.StepName:='555 - Automaticky Rezim - vyhodnotenie stavu paletky'; 
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#10s;
            
            IF Paletka[i].PAR.StavPaletky = 'OK' THEN
                IF Paletka[i].PAR.StavPowerCP = 'PASS' THEN
                    Paletka[i].PAR.StavPaletky:= 'OK';
                ELSIF Paletka[i].PAR.StavPowerCP = 'FAIL' THEN
                    Paletka[i].PAR.StavPaletky:= 'NG';
                END_IF
            END_IF  
            Paletka[i].VnutornyStav.KomunikaciaUzavreta:= TRUE;
            SC_P4_Etiketovacka.ResetStep:= TRUE;
            SC_P4_Etiketovacka.Step:= 560;	
            
          
			

            //Vyvezenie paletky//			
			
        560:
            SC_P4_Etiketovacka.StepName:='560 - Automaticky Rezim - cakam na vyvezenie na stoper vytahu';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
                     
            
            
            IF P4_Etiketovacka.KoniecCyklu THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;		
            ELSIF NOT P4_Vytah.IN.PritomnostPaletky_S13 AND SC_P4_Vytah.Step = 100 AND NOT P4_Vytah.IN.VystupDopravnikaVytahu_OS11 AND NOT P4_Etiketovacka.STAV.PrebiehaVyvezeniePaletky AND NOT TEST THEN
                P4_Etiketovacka.OUT.ZasunStoper_YV165:= TRUE;
                P4_Etiketovacka.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 561;
            END_IF	
		
		
        561:
            SC_P4_Etiketovacka.StepName:='561 - Automaticky Rezim - ukoncenie vyvazania na stoper vytahu';
            SC_P4_Etiketovacka.IdleTime.PT:= T#200ms;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#10s;
		
            SC_P4_Etiketovacka.IdleTime.IN:= NOT P4_Etiketovacka.IN.PritomnostPaletky_S12;
            SC_P4_Etiketovacka.AlarmTime.IN:= P4_Etiketovacka.IN.PritomnostPaletky_S12;
			
            IF NOT P4_Etiketovacka.IN.PritomnostPaletky_S12 THEN
                IF Revork THEN
                    Paletka[i].PAR.RevorkovyKus:= FALSE;
                    Paletka[i].PAR.CisloRevorkovejStanice:= '';
                    Revork:= FALSE;
                END_IF
                TestovaciKus:= FALSE;
                CisloFotky:= 0;
                Paletka[i].PAR.StavPowerCP:= '';
                Paletka[i].VnutornyStav.CinnostSpustena:= FALSE;
                Paletka[i].VnutornyStav.CinnostUkoncena:= FALSE;
                Paletka[i].VnutornyStav.FotkyOdoslane:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaOtvorena:= FALSE;
                Paletka[i].VnutornyStav.KomunikaciaUzavreta:= FALSE;
                Reports.Kamery.P4_CAM15_KontrolaPaletky:= '';
            END_IF    
                
                
            
            IF SC_P4_Etiketovacka.IdleTime.Q THEN
                P4_Etiketovacka.OUT.ZasunStoper_YV165:= FALSE;
            END_IF
            
            IF P4_Vytah.IN.PritomnostPaletky_S13 AND Safety.STAV.P4_VstupBunky_Bariera_AKTIVNA AND Safety.STAV.P4_VystupBunky_Bariera_AKTIVNA THEN
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 100;
            ELSIF SC_P4_Etiketovacka.AlarmTime.Q THEN
                P34_Alarmy[452]:= TRUE;
                P4_Pracovisko.KoniecCyklu:= TRUE;
                SC_P4_Etiketovacka.ResetStep:= TRUE;
                SC_P4_Etiketovacka.Step:= 0;
            END_IF	
					
		
		
		
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P4_Etiketovacka.StepName:='700 - Manualny Rezim';
            SC_P4_Etiketovacka.IdleTime.PT:= T#8s;
            SC_P4_Etiketovacka.AlarmTime.PT:= T#5s;
		
				
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.JoggAcceleration:= (P4_Etiketovacka.PAR.ServoZdvihu_JoggRychlost * 10);
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.JoggDeceleration:= (P4_Etiketovacka.PAR.ServoZdvihu_JoggRychlost * 10);
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.JoggVelocity:= P4_Etiketovacka.PAR.ServoZdvihu_JoggRychlost;
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.JoggPoziciaLimitVPRED:= 200.0;
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P4_Etiketovacka.ServoZdvihuEtiketovania_M28.CMD.JoggLimit_ACTIVE:= TRUE;
	
			
            //Vysunutie aplikátora etikety//
            P4_Etiketovacka.OUT.Aplikator_VYSUN_YV173:= P4_Etiketovacka.RR_VysunAplikator;
		
            //Zapnutie prisávania etikety//
            IF P4_Etiketovacka.RR_ZapniPrisavanie THEN
                P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= TRUE;
                P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= FALSE;
                P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= TRUE;
            ELSE
                P4_Etiketovacka.OUT.OfukEtikety_ZAPNI_YV174:= FALSE;
                P4_Etiketovacka.OUT.Prisavanie_ZAPNI_YV175:= FALSE;
                P4_Etiketovacka.OUT.Prisavanie_VYPNI_YV176:= TRUE;
            END_IF    
		
            //Spustenie testovacej sekvencie//
            P4_Etiketovacka.STAV.TestovaciaSekvencia_BUSY:= P4_Etiketovacka.RR_TestovanieEtiketovania;
            
            
            IF P4_Etiketovacka.RR_TestovanieEtiketovania THEN
                IF P4_Etiketovacka.IN.PritomnostPaletky_S12 THEN
                    SC_P4_Etiketovacka.ResetStep:= TRUE;
                    SC_P4_Etiketovacka.Step:= 118;
                ELSE
                    P4_Etiketovacka.RR_TestovanieEtiketovania:= FALSE;
                END_IF    
            END_IF
        
        
			
    END_CASE
	
	 
				END_PROGRAM

PROGRAM _EXIT
				(* Insert code here *)
	 
				END_PROGRAM


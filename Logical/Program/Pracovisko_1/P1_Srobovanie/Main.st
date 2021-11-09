
PROGRAM _INIT
    P1_Srobovanie.PAR.OsX_JoggRychlost:= 5;
    P1_Srobovanie.PAR.OsY_JoggRychlost:= 5;
    Triger_0:= FALSE; 
    
    
    	
    //Os X - Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
//    OsX_NovaHodnotaMomentu_POS := 1.5; //v Nm
//    OsX_NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_7);
//    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
//    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[0].ParID      := 248;
//    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(OsX_NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[1].ParID      := 249;
//    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(OsX_NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_0();
    
    
    //Os Y - Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
//    OsY_NovaHodnotaMomentu_POS := 1.5; //vNm
//    OsY_NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_1.Axis:= ADR(gAxis_8);
//    MC_BR_ProcessParID_AcpAx_1.DataAddress:= ADR(McAcpAxProcessParIDType_1);
//    MC_BR_ProcessParID_AcpAx_1.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_1.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_1[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_1[0].ParID      := 248;
//    McAcpAxProcessParIDType_1[0].VariableAddress    := ADR(OsY_NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_1[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_1[1].ParID      := 249;
//    McAcpAxProcessParIDType_1[1].VariableAddress    := ADR(OsY_NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_1.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_1();
    
    
    
END_PROGRAM

PROGRAM _CYCLIC

	
	//*******************************Stav zásobník skrutiek K30 je prázdny********************//
    CasKontrolyZasobSkrutiek_K30.IN:= P1_Srobovanie.IN.ZasobSrobK30_PRAZDNY_IS49;
	
    IF CasKontrolyZasobSkrutiek_K30.Q THEN
        P1_Srobovanie.STAV.Zasobnik_K30_Prazdny:= TRUE;
        P1_Srobovanie.OUT.ZasobSrobK30_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P1_Srobovanie.STAV.Zasobnik_K30_Prazdny:= FALSE;
        P1_Srobovanie.OUT.ZasobSrobK30_Banner_CervenaLED:= FALSE;
    END_IF	
	
    CasKontrolyZasobSkrutiek_K30.PT:= T#10s;
    CasKontrolyZasobSkrutiek_K30();
	
    //*******************************Stav zásobník skrutiek M5 je prázdny********************//
    CasKontrolyZasobSkrutiek_M5.IN:= P1_Srobovanie.IN.ZasobSrobM5_PRAZDNY_IS53;
	
    IF CasKontrolyZasobSkrutiek_M5.Q THEN
        P1_Srobovanie.STAV.Zasobnik_M5_Prazdny:= TRUE;
        P1_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P1_Srobovanie.STAV.Zasobnik_M5_Prazdny:= FALSE;
        P1_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= FALSE;
    END_IF	
	
	
	
    CasKontrolyZasobSkrutiek_M5.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M5();
	
    //*******************************Stav zásobník skrutiek M4 je prázdny********************//
    CasKontrolyZasobSkrutiek_M4.IN:= P1_Srobovanie.IN.ZasobSrobM4_PRAZDNY_IS44;
	
    IF CasKontrolyZasobSkrutiek_M4.Q THEN
        P1_Srobovanie.STAV.Zasobnik_M4_Prazdny:= TRUE;
        P1_Srobovanie.OUT.ZasobSrobM4_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P1_Srobovanie.STAV.Zasobnik_M4_Prazdny:= FALSE;
        P1_Srobovanie.OUT.ZasobSrobM4_Banner_CervenaLED:= FALSE;
    END_IF	
	
	
    CasKontrolyZasobSkrutiek_M4.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M4();
    
	
	
	
	
	
    //Index paletky//
    i:= P1_StoperSrobovania.PAR.IndexPaletky;
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P1_Srobovanie);
	
    //Príznak šrobovaèky vo východzej pozícii//
    IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 AND P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 AND P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
        P1_Srobovacky_VychodziaPozicia:= TRUE;
    ELSE	
        P1_Srobovacky_VychodziaPozicia:= FALSE;
    END_IF	
	
    //Volanie podprogramov//
    OvlManipulatora_OsX;
    OvlManipulatora_OsY;
    AtlasCopcoKomunikacia;
	
	
    //Reset sekcie //
    IF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
        SC_P1_Srobovanie.Step:= 0;
    ELSIF P1_Srobovanie.Reset THEN
        SC_P1_Srobovanie.Step:= 0;
        P1_Srobovanie.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serv//
    IF EDGEPOS(P1_PoruchaST2) THEN
        OsX_STOP:= TRUE;
        OsY_STOP:= TRUE;
    ELSIF EDGEPOS(P1_Srobovanie.Reset) THEN
        OsX_STOP:= TRUE;
        OsY_STOP:= TRUE;
    END_IF	
		
      

	
    CASE SC_P1_Srobovanie.Step OF 
		
        0:
            SC_P1_Srobovanie.StepName:='0 - Nulovanie';
            SC_OvlManipulatora_OsX.Step:= 0;
            SC_OvlManipulatora_OsY.Step:= 0;
            P1_Srobovanie.Automat:= FALSE;
            P1_Srobovanie.KoniecCyklu:= FALSE;
            P1_Srobovanie.Manual:= FALSE;
            P1_Srobovanie.STAV.PoINIT:= FALSE;
            P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
            P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
            P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
            P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
            P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
            P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
            IF NOT Triger_0 THEN
                P1_Srobovanie.SkrutkovaciSet_M5.Reset:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_K30.Reset:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                Triger_0:= TRUE;
            END_IF	
            P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
            P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
            P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggLimit_ACTIVE:= FALSE;
            P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggLimit_ACTIVE:= FALSE;
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M5.Manual:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M5.Automat:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M5.UkoncenieCyklu:= FALSE;
            P1_Srobovanie.Skrutkovacka_M5.RESET_Poruchy:= FALSE;
            P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
            P1_Srobovanie.Skrutkovacka_M5.START_Skrutkovania:= FALSE;
            P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_K30.Automat:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_K30.Manual:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_K30.UkoncenieCyklu:= FALSE;
            P1_Srobovanie.Skrutkovacka_K30.RESET_Poruchy:= FALSE;
            P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
            P1_Srobovanie.Skrutkovacka_K30.START_Skrutkovania:= FALSE;
            P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M4.Automat:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M4.Manual:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
            P1_Srobovanie.SkrutkovaciSet_M4.UkoncenieCyklu:= FALSE;
            P1_Srobovanie.Skrutkovacka_M4.RESET_Poruchy:= FALSE;
            P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
            P1_Srobovanie.Skrutkovacka_M4.START_Skrutkovania:= FALSE;
            P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
            P1_Robot.KOM_OUT.UvolniBusbary:= FALSE;
            P1_Srobovanie.RR_SkrutkovackuM4_VYSUN:= FALSE;
            P1_Srobovanie.RR_SkrutkovackuM5_VYSUN:= FALSE;
            P1_Srobovanie.RR_SkrutkovackuK30_VYSUN:= FALSE;
            P1_Srobovanie.RR_SkrutkovackaM4_CISTENIE:= FALSE;
            P1_Srobovanie.STAV.Cistenie_M4_BUSY:= FALSE;
            P1_Srobovanie.RR_SkrutkovackaK30_CISTENIE:= FALSE;
            P1_Srobovanie.STAV.Cistenie_K30_BUSY:= FALSE;
            P1_Srobovanie.RR_ZapniVibrolistu_M5:= FALSE;
            P1_Srobovanie.RR_ZapniHrniec_K30:= FALSE;
            P1_Srobovanie.RR_ZapniHrniec_M4:= FALSE;
            P1_Srobovanie.RR_ZapniHrniec_M5:= FALSE;
            P1_Srobovanie.RR_OtocPodavacM5_VPRED:= FALSE;
            P1_Srobovanie.RR_OtocPodavacM5_VZAD:= FALSE;
            P1_Srobovanie.RR_PodajSkrutkuM5:= FALSE;
            P1_Srobovanie.RR_PrisavanieSkrutkyM5:= FALSE;
            P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
            P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
            P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
            FazaNavratu:= 0;
            
									
            IF Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.PORUCHA AND P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 AND P1_Pracovisko.STAV.ServaBunky_READY THEN
                Triger_0:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 1;
            END_IF
	
        1:
            SC_P1_Srobovanie.StepName:='1 - Cakam na spustenie vyroby';
            P1_Srobovanie.KoniecCyklu:= FALSE;
            IF P1_Srobovanie.Automat THEN
                SC_P1_Srobovanie.Step:= 2;
            ELSIF P1_Srobovanie.Manual THEN
                SC_P1_Srobovanie.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
		
        2:
            SC_P1_Srobovanie.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
            P1_Srobovanie.SkrutkovaciSet_M5.Automat:= TRUE;
            P1_Srobovanie.SkrutkovaciSet_K30.Automat:= TRUE;
            P1_Srobovanie.SkrutkovaciSet_M4.Automat:= TRUE;
			
									
            IF P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie AND P1_Srobovacky_VychodziaPozicia THEN
                P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 3;
            END_IF
	
        3:
            SC_P1_Srobovanie.StepName:='3 - Inicializacia - kontrola homingu serva manipulatora os X';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P1_Srobovanie.STAV.OsX_HomingOK THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 5;
            ELSE
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 4;
            END_IF
		
        4:
            SC_P1_Srobovanie.StepName:='4 - Inicializacia - spustenie homingu serva manipulatora os X';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_Srobovanie.Switch1 AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_HOME:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P1_Srobovanie.STAV.OsX_HomingOK THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 5;
            END_IF	
		
        5:
            SC_P1_Srobovanie.StepName:='5 - Inicializacia - presun osy X do vychodiskovej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15;
		
				
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 10;
            END_IF	
			
		
		
		
        10:
            SC_P1_Srobovanie.StepName:='10 - Inicializacia - kontrola homingu serva manipulatora os Y';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P1_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 12;
            ELSE
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 11;
            END_IF
		
		
        11:
            SC_P1_Srobovanie.StepName:='11 - Inicializacia - spustenie homingu serva manipulatora os Y';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_Srobovanie.Switch1 AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_HOME:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P1_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 12;
            END_IF	
		
		
        12:
            SC_P1_Srobovanie.StepName:='12 - Inicializacia - presun osy Y do vychodiskovej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 0;
			
				
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 20;
            END_IF	
	
	
        20:
            SC_P1_Srobovanie.StepName:='20 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 157; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta AND NOT TEST THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 23;
            END_IF
			
        23:
            SC_P1_Srobovanie.StepName:='23 - Inicializacia - zahodenie skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#1s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.SkrutkovaciSet_M4.CistenieUkoncene AND P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 30;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[121]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
	
		
			
        30:
            SC_P1_Srobovanie.StepName:='30 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 79; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 33;
            END_IF
			
        33:
            SC_P1_Srobovanie.StepName:='33 - Inicializacia - zapinam prisavanie skrutky M5 a vysuvam skrutkovac M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#1s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.IdleTime.IN:= NOT P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 AND SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 35;
            END_IF
			
        35:
            SC_P1_Srobovanie.StepName:='35 - Inicializacia - vypinam prisavanie skrutky M5,zasuvam skrutkovac M5, kontrola skrutky M5 na vystupe podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 AND NOT P1_Srobovanie.IN.SkrutkM5_SnimacVakua_S28 AND P1_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS14 THEN
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 40;
            END_IF
			
			
		
        40:
            SC_P1_Srobovanie.StepName:='40 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
                        
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 42;
            END_IF
			
        42:
            SC_P1_Srobovanie.StepName:='42 - Inicializacia - zahodenie skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#1s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.SkrutkovaciSet_K30.CistenieUkoncene AND P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 50;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[119]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
	
			
        50:
            SC_P1_Srobovanie.StepName:='50 - Inicializacia - presun manipulatora do vychodiskovej pozicie k motoru';
            SC_P1_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta AND
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.PoINIT:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF
			
        
            
            
            
	
            //********************************************************Automatický režim****************************************************************************//
	
        100:  
            SC_P1_Srobovanie.StepName:='100 - Automaticky Rezim - cakam na spustenie cinnosti';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;			
	
            IF P1_Srobovanie.KoniecCyklu AND NOT P1_StoperSrobovania.Automat THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 0;
            ELSIF P1_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 110;
            ELSIF P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 130;
            ELSIF P1_StoperSrobovania.OUT.KOM_4F_ZasrobujZadnuSkrutku_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 150;
            ELSIF P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPrednuSkrutku_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 170;
            ELSIF P1_StoperSrobovania.OUT.KOM_4F_ZasrobujSkrutkuDPS_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 190;
            ELSIF P1_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 200;
            ELSIF P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 220;
            ELSIF P1_StoperSrobovania.OUT.KOM_5F_ZasrobujZadnuSkrutku_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 240;
            ELSIF P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPrednuSkrutku_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 260;
            ELSIF P1_StoperSrobovania.OUT.KOM_5F_ZasrobujSkrutkuDPS_M4 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 280;
            ELSIF P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 300;
            ELSIF P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.ZasobSrobK30_OfukTried_RUN_YV86:= TRUE;
                P1_Srobovanie.OUT.ZasobSrobK30_Ofuk_RUN_YV85:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 320; 	
            ELSIF P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_M5 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 340;	
            ELSIF P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_M5 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 360; 	
            ELSIF P1_StoperSrobovania.OUT.KOM_5H_ZasrobujStrednuSkrutku_M5 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 380; 
            ELSIF P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 400;
            ELSIF P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 420;	
            END_IF	
			
			
            //**********************************************************************Model 4F*******************************************************************************************//	
            //Zaskrutkovanie lavej skrutky K30//		
        110:	
            SC_P1_Srobovanie.StepName:='110 - Automaticky Rezim - model 4F, napolohovanie prednej skrutkovacky K30 na poziciu lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozX_LavejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozY_LavejSkrutkyK30; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
				
			
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 113;
                END_IF    
            END_IF	
				
        113:
            SC_P1_Srobovanie.StepName:='113 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 115;
            END_IF	
	
        115:
            SC_P1_Srobovanie.StepName:='115 - Automaticky Rezim - model 4F, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
            
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 118;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 128; 
                ELSE    
                    FazaNavratu:= 110;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF    
            END_IF	
			
			
			
        118:
            SC_P1_Srobovanie.StepName:='118 - Automaticky Rezim - model 4F, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 AND NOT TEST THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 120;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 128; 
            END_IF	
			
        120:
            SC_P1_Srobovanie.StepName:='120 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            
            
            
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8);
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 123;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 128; 
            END_IF
				
        123:
            SC_P1_Srobovanie.StepName:='123 - Automaticky Rezim - model 4F, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 124;
            END_IF
		
			
        124:
            SC_P1_Srobovanie.StepName:='124 - Automaticky Rezim - model 4F, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 125;
            END_IF
			
			
				
        125:
            SC_P1_Srobovanie.StepName:='125 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 128;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 128;          
            END_IF	
				
			
        128:
            SC_P1_Srobovanie.StepName:='128 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj lavu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
				
			
            //Zaskrutkovanie pravej skrutky K30//	
			
        130:
            SC_P1_Srobovanie.StepName:='130 - Automaticky Rezim - model 4F, napolohovanie prednej skrutkovacky K30 na poziciu pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozX_PravejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozY_PravejSkrutkyK30; //mm
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
			
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 133;
                END_IF
            END_IF	
			
			
        133:
            SC_P1_Srobovanie.StepName:='133 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 135;
            END_IF	
	
        135:
            SC_P1_Srobovanie.StepName:='135 - Automaticky Rezim - model 4F, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
            
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 138;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 148; 
                ELSE    
                    FazaNavratu:= 130;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF 
            END_IF	
			
			
			
        138:
            SC_P1_Srobovanie.StepName:='138 - Automaticky Rezim - model 4F, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
            
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 2);
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 140;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 148; 
            END_IF	
			
        140:
            SC_P1_Srobovanie.StepName:='140 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
            
						
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 143;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 148;     
            END_IF
				
        143:
            SC_P1_Srobovanie.StepName:='143 - Automaticky Rezim - model 4F, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 144;
            END_IF
		
			
        144:
            SC_P1_Srobovanie.StepName:='144 - Automaticky Rezim - model 4F, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 145;
            END_IF
			
			
				
        145:
            SC_P1_Srobovanie.StepName:='145 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 148;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 148;          
            END_IF	
				
		
		
        148:
            SC_P1_Srobovanie.StepName:='148 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj pravu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
			
			
            //Zaskrutkovanie zadnej skrutky M4//		
			
        150:
            SC_P1_Srobovanie.StepName:='150 - Automaticky Rezim - model 4F, napolohovanie zadnej skrutkovacky M4 na poziciu zadnej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozX_ZadnejSkrutkyM4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozY_ZadnejSkrutkyM4; //mm
					
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
			
						
			
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 153;
                END_IF
            END_IF	
			
			
        153:
            SC_P1_Srobovanie.StepName:='153 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 155;
            END_IF	
	
        155:
            SC_P1_Srobovanie.StepName:='155 - Automaticky Rezim - model 4F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
            
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 158;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 168;  
                ELSE    
                    FazaNavratu:= 150;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF    
            END_IF	
			
			
			
        158:
            SC_P1_Srobovanie.StepName:='158 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
			
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 160;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 168;    
            END_IF	
			
        160:
            SC_P1_Srobovanie.StepName:='160 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 163;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 168;       
            END_IF
				
        163:
            SC_P1_Srobovanie.StepName:='163 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 164;
            END_IF
		
			
        164:
            SC_P1_Srobovanie.StepName:='164 - Automaticky Rezim - model 4F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 165;
            END_IF
			
			
				
        165:
            SC_P1_Srobovanie.StepName:='165 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania zadnej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 168;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 168;          
            END_IF
		
		
        168:
            SC_P1_Srobovanie.StepName:='168 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj zadnu skrutku M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_4F_ZasrobujZadnuSkrutku_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
			
			
            //Zaskrutkovanie prednej skrutky M4//	
			
        170:
            SC_P1_Srobovanie.StepName:='170 - Automaticky Rezim - model 4F, napolohovanie zadnej skrutkovacky M4 na poziciu prednej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozX_PrednejSkrutkyM4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozY_PrednejSkrutkyM4; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 173;
                END_IF
            END_IF	
			
			
        173:
            SC_P1_Srobovanie.StepName:='173 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 175;
            END_IF	
	
        175:
            SC_P1_Srobovanie.StepName:='175 - Automaticky Rezim - model 4F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 178;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 188;  
                ELSE    
                    FazaNavratu:= 170;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF   
            END_IF	
			
			
			
        178:
            SC_P1_Srobovanie.StepName:='178 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 180;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 188;        
            END_IF	
			
        180:
            SC_P1_Srobovanie.StepName:='180 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_PrednaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 183;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 188;    
            END_IF
				
        183:
            SC_P1_Srobovanie.StepName:='183 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 184;
            END_IF
		
			
        184:
            SC_P1_Srobovanie.StepName:='184 - Automaticky Rezim - model 4F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 185;
            END_IF
			
			
				
        185:
            SC_P1_Srobovanie.StepName:='185 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania prednej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 188;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 188;          
            END_IF
		
		
		
        188:
            SC_P1_Srobovanie.StepName:='188 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj prednu skrutku M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_4F_ZasrobujPrednuSkrutku_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	

            //Zaskrutkovanie skrutky M4 pre DPS//		
		
        190:
            SC_P1_Srobovanie.StepName:='190 - Automaticky Rezim - model 4F, napolohovanie zadnej skrutkovacky M4 na poziciu  skrutky M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozX_SkrutkyDPS_M4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob4F_PozY_SkrutkyDPS_M4; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 192;
                END_IF
            END_IF	
			
			
        192:
            SC_P1_Srobovanie.StepName:='192 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 193;
            END_IF	
	
        193:
            SC_P1_Srobovanie.StepName:='193 - Automaticky Rezim - model 4F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 194;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 198;  
                ELSE    
                    FazaNavratu:= 190;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF   
            END_IF	
			
			
			
        194:
            SC_P1_Srobovanie.StepName:='194 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
			
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 AND NOT TEST THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 195;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 199;       
            END_IF	
			
        195:
            SC_P1_Srobovanie.StepName:='195 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_SkrutkaDPS_M4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 196;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 199; 
            END_IF
				
        196:
            SC_P1_Srobovanie.StepName:='196 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 197;
            END_IF
		
			
        197:
            SC_P1_Srobovanie.StepName:='197 - Automaticky Rezim - model 4F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 198;
            END_IF
			
			
				
        198:
            SC_P1_Srobovanie.StepName:='198 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania skrutky M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 199;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 199;          
            END_IF
		
		
		
        199:
            SC_P1_Srobovanie.StepName:='199 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj skrutku M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_4F_ZasrobujSkrutkuDPS_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
			
			
			
            //**********************************************************************Model 5F*******************************************************************************************//	
            //Zaskrutkovanie lavej skrutky K30//		
        200:	
            SC_P1_Srobovanie.StepName:='200 - Automaticky Rezim - model 5F, napolohovanie prednej skrutkovacky K30 na poziciu lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_LavejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_LavejSkrutkyK30; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE    
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 203;
                END_IF
            END_IF	
		
			
        203:
            SC_P1_Srobovanie.StepName:='203 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 205;
            END_IF	
	
        205:
            SC_P1_Srobovanie.StepName:='205 - Automaticky Rezim - model 5F, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 208;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 218; 
                ELSE    
                    FazaNavratu:= 200;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF 
            END_IF	
			
			
			
        208:
            SC_P1_Srobovanie.StepName:='208 - Automaticky Rezim - model 5F, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 210;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 218; 
            END_IF	
			
        210:
            SC_P1_Srobovanie.StepName:='210 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8);
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 213;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 218; 
            END_IF
				
        213:
            SC_P1_Srobovanie.StepName:='213 - Automaticky Rezim - model 5F, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 214;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 218; 
            END_IF
		
			
        214:
            SC_P1_Srobovanie.StepName:='214 - Automaticky Rezim - model 5F, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 215;
            END_IF
			
			
				
        215:
            SC_P1_Srobovanie.StepName:='215 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 218;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 218;          
            END_IF	
				
		
			
	
			
        218:
            SC_P1_Srobovanie.StepName:='218 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj lavu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
				
			
            //Zaskrutkovanie pravej skrutky K30//	
			
        220:
            SC_P1_Srobovanie.StepName:='220 - Automaticky Rezim - model 5F, napolohovanie prednej skrutkovacky K30 na poziciu pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_PravejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_PravejSkrutkyK30; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 223;
                END_IF
            END_IF	
			
			
        223:
            SC_P1_Srobovanie.StepName:='223 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 225;
            END_IF	
	
        225:
            SC_P1_Srobovanie.StepName:='225 - Automaticky Rezim - model 5F, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
            
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 228;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 238; 
                ELSE    
                    FazaNavratu:= 220;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF 
            END_IF	
			
			
			
        228:
            SC_P1_Srobovanie.StepName:='228 - Automaticky Rezim - model 5F, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 230;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 238;
            END_IF	
			
        230:
            SC_P1_Srobovanie.StepName:='230 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 233;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 238;
            END_IF
				
        233:
            SC_P1_Srobovanie.StepName:='233 - Automaticky Rezim - model 5F, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 234;
            END_IF
		
			
        234:
            SC_P1_Srobovanie.StepName:='234 - Automaticky Rezim - model 5F, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 235;
            END_IF
			
			
				
        235:
            SC_P1_Srobovanie.StepName:='235 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 238;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 238;          
            END_IF	
		
		
        238:
            SC_P1_Srobovanie.StepName:='238 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj pravu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
			
			
            //Zaskrutkovanie zadnej skrutky M4//		
			
        240:
            SC_P1_Srobovanie.StepName:='240 - Automaticky Rezim - model 5F, napolohovanie zadnej skrutkovacky M4 na poziciu zadnej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_ZadnejSkrutkyM4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_ZadnejSkrutkyM4; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 243;
                END_IF
            END_IF	
			
			
        243:
            SC_P1_Srobovanie.StepName:='243 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 245;
            END_IF	
	
        245:
            SC_P1_Srobovanie.StepName:='245 - Automaticky Rezim - model 5F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 248;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 258;  
                ELSE    
                    FazaNavratu:= 240;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF   
            END_IF	
			
			
			
        248:
            SC_P1_Srobovanie.StepName:='248 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
			
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 250;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 258;
            END_IF	
			
        250:
            SC_P1_Srobovanie.StepName:='250 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_ZadnaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 253;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 258;
            END_IF
				
        253:
            SC_P1_Srobovanie.StepName:='253 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 254;
            END_IF
		
			
        254:
            SC_P1_Srobovanie.StepName:='254 - Automaticky Rezim - model 5F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 255;
            END_IF
			
			
				
        255:
            SC_P1_Srobovanie.StepName:='255 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania zadnej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 258;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 258;          
            END_IF
		
		
        258:
            SC_P1_Srobovanie.StepName:='258 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj zadnu skrutku M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5F_ZasrobujZadnuSkrutku_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
			
			
            //Zaskrutkovanie prednej skrutky M4//	
			
        260:
            SC_P1_Srobovanie.StepName:='260 - Automaticky Rezim - model 5F, napolohovanie zadnej skrutkovacky M4 na poziciu prednej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_PrednejSkrutkyM4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_PrednejSkrutkyM4; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 263;
                END_IF
            END_IF	
			
			
        263:
            SC_P1_Srobovanie.StepName:='263 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 265;
            END_IF	
	
        265:
            SC_P1_Srobovanie.StepName:='265 - Automaticky Rezim - model 5F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 268;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 278;  
                ELSE    
                    FazaNavratu:= 260;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF   
            END_IF	
			
			
			
        268:
            SC_P1_Srobovanie.StepName:='268 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
			
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 270;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 278;
            END_IF	
			
        270:
            SC_P1_Srobovanie.StepName:='270 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_PrednaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 273;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 278;
            END_IF
				
        273:
            SC_P1_Srobovanie.StepName:='273 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 274;
            END_IF
		
			
        274:
            SC_P1_Srobovanie.StepName:='274 - Automaticky Rezim - model 5F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 275;
            END_IF
			
			
				
        275:
            SC_P1_Srobovanie.StepName:='275 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania prednej skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 278;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 278;          
            END_IF
		
		
        278:
            SC_P1_Srobovanie.StepName:='278 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj prednu skrutku M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5F_ZasrobujPrednuSkrutku_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	

            //Zaskrutkovanie skrutky M4 pre DPS//		
		
        280:
            SC_P1_Srobovanie.StepName:='280 - Automaticky Rezim - model 5F, napolohovanie zadnej skrutkovacky M4 na poziciu  skrutky M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_SkrutkyDPS_M4; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_SkrutkyDPS_M4; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 282;
                END_IF
            END_IF	
			
			
		
        282:
            SC_P1_Srobovanie.StepName:='282 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 283;
            END_IF	
	
        283:
            SC_P1_Srobovanie.StepName:='283 - Automaticky Rezim - model 5F, kontrola skrutky M4 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 284;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P1_Alarmy[151]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 289;  
                ELSE    
                    FazaNavratu:= 280;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 510; 
                END_IF   
            END_IF	
			
			
			
        284:
            SC_P1_Srobovanie.StepName:='284 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            
            P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 < 1);
            
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_P1_Srobovanie.IdleTime.Q THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= TRUE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 AND NOT TEST THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 285;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT TEST THEN    
                P1_Alarmy[144]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 289;
            END_IF	
			
        285:
            SC_P1_Srobovanie.StepName:='285 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10);
                Reports.Skrutkovacky.CasSkrutkovania.P1_SkrutkaDPS_M4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 286;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[148]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 289;
            END_IF
				
        286:
            SC_P1_Srobovanie.StepName:='286 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= FALSE;
                P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 287;
            END_IF
		
			
        287:
            SC_P1_Srobovanie.StepName:='287 - Automaticky Rezim - model 5F, signal skrutka M4 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 288;
            END_IF
			
			
				
        288:
            SC_P1_Srobovanie.StepName:='288 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania skrutky M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 289;
            ELSIF P1_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 289;          
            END_IF
		
		
        289:
            SC_P1_Srobovanie.StepName:='289 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj skrutku M4 pre DPS';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5F_ZasrobujSkrutkuDPS_M4 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF			
			
			
            //**********************************************************************Model 5H*******************************************************************************************//	
            //Zaskrutkovanie lavej skrutky K30//		
        300:	
            SC_P1_Srobovanie.StepName:='300 - Automaticky Rezim - model 5H, napolohovanie prednej skrutkovacky K30 na poziciu lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_LavejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_LavejSkrutkyK30; //mm
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta  THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 303;
                END_IF
            END_IF	
				
        303:
            SC_P1_Srobovanie.StepName:='303 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 305;
            END_IF	
	
        305:
            SC_P1_Srobovanie.StepName:='305 - Automaticky Rezim - model 5H, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 308;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 318; 
                ELSE    
                    FazaNavratu:= 300;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF 
            END_IF	
			
			
			
        308:
            SC_P1_Srobovanie.StepName:='308 - Automaticky Rezim - model 5H, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 318;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 310;
            END_IF	
			
        310:
            SC_P1_Srobovanie.StepName:='310 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8);
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 313;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 318;
            END_IF
				
        313:
            SC_P1_Srobovanie.StepName:='313 - Automaticky Rezim - model 5H, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 314;
            END_IF
		
			
        314:
            SC_P1_Srobovanie.StepName:='314 - Automaticky Rezim - model 5H, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 315;
            END_IF
			
			
				
        315:
            SC_P1_Srobovanie.StepName:='315 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania lavej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 318;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 318;          
            END_IF	
			
			
        318:
            SC_P1_Srobovanie.StepName:='318 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj lavu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
				
			
            //Zaskrutkovanie pravej skrutky K30//	
			
        320:
            SC_P1_Srobovanie.StepName:='320 - Automaticky Rezim - model 5H, napolohovanie prednej skrutkovacky K30 na poziciu pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozX_PravejSkrutkyK30; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5F_PozY_PravejSkrutkyK30; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta  THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE  
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 323;
                END_IF
            END_IF	
		
			
        323:
            SC_P1_Srobovanie.StepName:='323 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK AND NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 325;
            END_IF	
	
        325:
            SC_P1_Srobovanie.StepName:='325 - Automaticky Rezim - model 5H, kontrola skrutky K30 v skrutkovacke';
            SC_P1_Srobovanie.IdleTime.PT:= T#5s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 328;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_READY_to_START THEN
                    P1_Alarmy[149]:= TRUE;
                    P1_StoperSrobovania.STAV.Porucha:= TRUE;
                    P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 338; 
                ELSE    
                    FazaNavratu:= 320;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 500;
                END_IF 
            END_IF	
			
			
			
        328:
            SC_P1_Srobovanie.StepName:='328 - Automaticky Rezim - model 5H, vysunutie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= TRUE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 330;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[142]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 338;
            END_IF	
			
        330:
            SC_P1_Srobovanie.StepName:='330 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaK30:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 331;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[146]:= TRUE;
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.Skrutkovacka_K30.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 338;
            END_IF
				
        331:
            SC_P1_Srobovanie.StepName:='331 - Automaticky Rezim - model 5H, zasunutie skrutkovacky K30 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= FALSE;
                P1_Srobovanie.OUT.SkrutkK30_PrisavSkrutky_RUN_YV90:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 332;
            END_IF
			
			
				
        332:
            SC_P1_Srobovanie.StepName:='332 - Automaticky Rezim - model 5H, signal skrutka K30 odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 335;
            END_IF
			
			
				
        335:
            SC_P1_Srobovanie.StepName:='335 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania pravej skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 338;
            ELSIF P1_Srobovanie.Skrutkovacka_K30.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 338;          
            END_IF	
	
	
		
        338:
            SC_P1_Srobovanie.StepName:='338 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj pravu skrutku K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_K30 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF	
				
			
            //Zaskrutkovanie lavej skrutky M5//		
        340:	
            SC_P1_Srobovanie.StepName:='340 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu odobratia sroby M5 zo zasobnika';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_OdobratSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_OdobratSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE  
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 342;
                END_IF
            END_IF			
		
        342:	
            SC_P1_Srobovanie.StepName:='342 - Automaticky Rezim - model 5H, kontrola skrutky M5 na vystupe podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P1_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS14 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 343;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[120]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;   
            END_IF	
				
        343:
            SC_P1_Srobovanie.StepName:='343 - Automaticky Rezim - model 5H, odobratie skrutky M5 z podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
	
            SC_P1_Srobovanie.IdleTime.IN:= P1_Srobovanie.IN.SkrutkM5_SnimacVakua_S28;
            
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= TRUE;
                SC_P1_Srobovanie.IdleTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF	
			            
            IF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 344;
            END_IF	
			
		
        344:
            SC_P1_Srobovanie.StepName:='344 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 345;
            END_IF		
		
        345:
            SC_P1_Srobovanie.StepName:='345 - Automaticky Rezim - model 5H, cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 346;
            END_IF	
			
			
			
        346:
            SC_P1_Srobovanie.StepName:='346 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu lavej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_LavejSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_LavejSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE  
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 347;
                END_IF
            END_IF	
		
        347:
            SC_P1_Srobovanie.StepName:='347 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania, prepnutie programu';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 348;
            END_IF	
		
        348:
            SC_P1_Srobovanie.StepName:='348 - Automaticky Rezim - model 5H, prepnutie programu a kontrola skrutkovacky';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu:= 2;
                SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu = 2 AND P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 349;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                P1_Alarmy[150]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;
            END_IF
			
			
        349:
            SC_P1_Srobovanie.StepName:='349 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 < 2);
            
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 > 2 AND NOT TEST THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 350;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT TEST THEN
                P1_Alarmy[143]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;
            END_IF	
			
        350:
            SC_P1_Srobovanie.StepName:='350 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 351;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[147]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;
            END_IF
				
        351:
            SC_P1_Srobovanie.StepName:='351 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 352;
            END_IF
			
			
			
				
        352:
            SC_P1_Srobovanie.StepName:='352 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania lavej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;
            ELSIF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 353;          
            END_IF
			
			
        353:
            SC_P1_Srobovanie.StepName:='353 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj lavu skrutku M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutku_M5 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF		
	
			
            //Zaskrutkovanie pravej skrutky M5//		
        360:	
            SC_P1_Srobovanie.StepName:='360 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu odobratia sroby M5 zo zasobnika';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_OdobratSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_OdobratSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 361;
            END_IF			
		
			
			
        361:	
            SC_P1_Srobovanie.StepName:='361 - Automaticky Rezim - model 5H, kontrola skrutky M5 na vystupe podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P1_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS14 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 362;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[120]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 378;
            END_IF	
				
        362:
            SC_P1_Srobovanie.StepName:='362 - Automaticky Rezim - model 5H, odobratie skrutky M5 z podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
	
            SC_P1_Srobovanie.IdleTime.IN:= P1_Srobovanie.IN.SkrutkM5_SnimacVakua_S28;
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= TRUE;
                SC_P1_Srobovanie.IdleTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF	
			
            IF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 363;
            END_IF	
			
		
        363:
            SC_P1_Srobovanie.StepName:='363 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 364;
            END_IF		
		
        364:
            SC_P1_Srobovanie.StepName:='364 - Automaticky Rezim - model 5H, cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 366;
            END_IF		
		
			
        365:
            SC_P1_Srobovanie.StepName:='365 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu strednej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_StrednejSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_StrednejSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 366;
            END_IF	
			
			
				
        366:
            SC_P1_Srobovanie.StepName:='366 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu pravej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_PravejSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_PravejSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsY_M19.STATUS.ActualPosition > 240) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE  
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 367;
                END_IF
            END_IF	
		
			
        367:
            SC_P1_Srobovanie.StepName:='367 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 368;
            END_IF	
	
			
			
        368:
            SC_P1_Srobovanie.StepName:='368 - Automaticky Rezim - model 5H, prepnutie programu a kontrola stavu skrutkovacky';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu:= 2;
                SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu = 2 AND P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 370;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                P1_Alarmy[150]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 378;
            END_IF
			
			
			
			
        370:
            SC_P1_Srobovanie.StepName:='370 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 > 2 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 371;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[143]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 378;    
            END_IF	
			
        371:
            SC_P1_Srobovanie.StepName:='371 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 373;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[147]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 378;
            END_IF
		
        373:
            SC_P1_Srobovanie.StepName:='373 - Automaticky Rezim - model 5H, vystavenie signalu pre robota uvolni busbary';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Robot.KOM_OUT.UvolniBusbary:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
            
            IF P1_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P1_Robot.KOM_OUT.UvolniBusbary:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 374;
            END_IF
                
              
            
        374:
            SC_P1_Srobovanie.StepName:='374 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 AND NOT P1_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 375;
            END_IF
			
			
			
				
        375:
            SC_P1_Srobovanie.StepName:='375 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania pravej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 376;
            ELSIF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 376;          
            END_IF
		
        376:
            SC_P1_Srobovanie.StepName:='376 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu strednej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_StrednejSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_StrednejSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 378;
            END_IF	
			
	
			
        378:
            SC_P1_Srobovanie.StepName:='378 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj pravu skrutku M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutku_M5 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF		
			
			
            //Zaskrutkovanie strednej skrutky M5//		
        380:	
            SC_P1_Srobovanie.StepName:='380 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu odobratia sroby M5 zo zasobnika';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_OdobratSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_OdobratSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 382;
            END_IF			
		
			
        382:	
            SC_P1_Srobovanie.StepName:='382 - Automaticky Rezim - model 5H, kontrola skrutky M5 na vystupe podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P1_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS14 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 383;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN
                P1_Alarmy[120]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;
            END_IF	
				
        383:
            SC_P1_Srobovanie.StepName:='383 - Automaticky Rezim - model 5H, odobratie skrutky M5 z podavaca';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
	
            SC_P1_Srobovanie.IdleTime.IN:= P1_Srobovanie.IN.SkrutkM5_SnimacVakua_S28;
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= TRUE;
                SC_P1_Srobovanie.IdleTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF	
			
            IF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 384;
            END_IF	
			
		
        384:
            SC_P1_Srobovanie.StepName:='384 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 385;
            END_IF		
		
        385:
            SC_P1_Srobovanie.StepName:='385 - Automaticky Rezim - model 5H, cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 386;
            END_IF	
			
		
			
        386:
            SC_P1_Srobovanie.StepName:='386 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M5 na poziciu strednej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozX_StrednejSkrutkyM5; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= P1_RemPremenne.P1_Srob5H_PozY_StrednejSkrutkyM5; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 700; 
                ELSE  
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 387;
                END_IF
            END_IF	
	
			
        387:
            SC_P1_Srobovanie.StepName:='387 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK  THEN
                P1_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 388;
            END_IF	
		
		
        388:	
            SC_P1_Srobovanie.StepName:='388 - Automaticky Rezim - model 5H, prepnutie programu';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.Skrutkovacka_M5.CisloZadanehoProgramu:= 1;
                SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_CisloAktualnehoProgramu = 1 AND P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 389;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT P1_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                P1_Alarmy[150]:= TRUE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;
            END_IF
			
			
			
			
        389:
            SC_P1_Srobovanie.StepName:='389 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P1_Srobovanie.AlarmTime.IN:= (P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 < 2);
            
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= TRUE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF NOT P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9 > 2 AND NOT TEST THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 390;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q AND NOT TEST THEN    
                P1_Alarmy[143]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;    
            END_IF	
			
        390:
            SC_P1_Srobovanie.StepName:='390 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
            SC_P1_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P1_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P1_StrednaSkrutkaM5:= REAL_TO_STRING(P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9); 
                Reports.Skrutkovacky.CasSkrutkovania.P1_StrednaSkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 391;
            ELSIF SC_P1_Srobovanie.AlarmTime.Q THEN    
                P1_Alarmy[147]:= TRUE;
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P1_StoperSrobovania.STAV.Porucha:= TRUE;
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;
            END_IF
				
        391:
            SC_P1_Srobovanie.StepName:='391 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutky';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39 THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 392;
            END_IF
			
			
			
				
        392:
            SC_P1_Srobovanie.StepName:='392 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania pravej skrutky M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;
            ELSIF P1_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P1_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 393;          
            END_IF	
			
			
	
			
        393:
            SC_P1_Srobovanie.StepName:='393 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj strednu skrutku M5';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_5H_ZasrobujStrednuSkrutku_M5 THEN
                P1_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF		
			
            //Presun manipulátora do pozície VPRED//		
		
        400:
            SC_P1_Srobovanie.StepName:='400 - Automaticky Rezim - napolohovanie manipulatora do prednej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 310; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 402;
            END_IF	
			
        402:
            SC_P1_Srobovanie.StepName:='402 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do prednej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF			
			
			
			
            //Presun manipulatora do pozicie VZAD//		
			
        420:
            SC_P1_Srobovanie.StepName:='420 - Automaticky Rezim - napolohovanie manipulatora do zadnej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND (P1_Srobovanie.ServoManipulOsX_M20.STATUS.ActualPosition > 14) AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= TRUE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 422;
            END_IF	
			
        422:
            SC_P1_Srobovanie.StepName:='422 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do zadnej pozicie';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P1_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 100;
            END_IF		
		
			
			
            //*********************************************************Èistenie skrutkovaèiek*****************************************************************************//			
			
			
            //Èistenie skrutkovaèky K30//
        500:
            SC_P1_Srobovanie.StepName:='500 - Automaticky Rezim - cistenie skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Odobrata:= FALSE;
                P1_Srobovanie.SkrutkovaciSet_K30.Automat:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_K30.Reset:= TRUE;
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 503;
            END_IF
			
        503:
            SC_P1_Srobovanie.StepName:='503 - Inicializacia - zahodenie skrutky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.SkrutkovaciSet_K30.CistenieUkoncene AND P1_Srobovanie.IN.SkrutkK30_ZASUNUTY_MS20 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P1_Srobovanie.SkrutkovaciSet_K30.Cistenie AND P1_Srobovanie.SkrutkovaciSet_K30.SkrutkaK30_Pripravena AND SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.STAV.Cistenie_K30_BUSY:= FALSE;
                P1_Srobovanie.RR_SkrutkovackaK30_CISTENIE:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= FazaNavratu;
            ELSIF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 505;	
            END_IF
		
        505:
            SC_P1_Srobovanie.StepName:='505 - Inicializacia - cakam na opatovne spustenie cistenia skrutkovacky K30';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_K30.Reset:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_K30.Cistenie:= FALSE;
                SC_P1_Srobovanie.IdleTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 503;
            END_IF	
			
					
            //Èistenie skrutkovaèky M4//	
        510:
            SC_P1_Srobovanie.StepName:='510 - Automaticky Rezim - cistenie skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;		
			
			
            P1_Srobovanie.PAR.OsX_ZadanaPozicia:= 15; //mm
            P1_Srobovanie.PAR.OsY_ZadanaPozicia:= 157; //mm
			
			
            IF NOT SC_P1_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                P1_Srobovanie.SkrutkovaciSet_M4.Automat:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                OsX_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P1_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P1_Srobovacky_VychodziaPozicia AND P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P1_Srobovanie.Switch2:= TRUE;
            END_IF	
				
            IF P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P1_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P1_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 513;
            END_IF
			
        513:
            SC_P1_Srobovanie.StepName:='513 - Inicializacia - zahodenie skrutky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#30s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P1_Srobovanie.IdleTime.IN:= TRUE;
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P1_Srobovanie.SkrutkovaciSet_M4.CistenieUkoncene AND P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P1_Srobovanie.SkrutkovaciSet_M4.Cistenie AND P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.STAV.Cistenie_M4_BUSY:= FALSE;
                P1_Srobovanie.RR_SkrutkovackaM4_CISTENIE:= FALSE;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= FazaNavratu;
            ELSIF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 515;	
            END_IF
			
        515:
            SC_P1_Srobovanie.StepName:='515 - Inicializacia - cakam na opatovne spustenie cistenia skrutkovacky M4';
            SC_P1_Srobovanie.IdleTime.PT:= T#2s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P1_Srobovanie.Switch1 THEN
                P1_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                P1_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
                SC_P1_Srobovanie.IdleTime.IN:= TRUE;
                SC_P1_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P1_Srobovanie.IdleTime.Q THEN
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 513;
            END_IF	
				
			
			
	
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P1_Srobovanie.StepName:='700 - Manualny Rezim';
            SC_P1_Srobovanie.IdleTime.PT:= T#8s;
            SC_P1_Srobovanie.AlarmTime.PT:= T#5s;
		
            P1_Srobovanie.ServoManipulOsX_M20.PAR.JoggAcceleration:= (P1_Srobovanie.PAR.OsX_JoggRychlost * 10);
            P1_Srobovanie.ServoManipulOsX_M20.PAR.JoggDeceleration:= (P1_Srobovanie.PAR.OsX_JoggRychlost * 10);
            P1_Srobovanie.ServoManipulOsX_M20.PAR.JoggVelocity:= P1_Srobovanie.PAR.OsX_JoggRychlost;
            P1_Srobovanie.ServoManipulOsX_M20.PAR.JoggPoziciaLimitVPRED:= 60.0;
            P1_Srobovanie.ServoManipulOsX_M20.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P1_Srobovanie.ServoManipulOsX_M20.CMD.JoggLimit_ACTIVE:= TRUE;	
		
            P1_Srobovanie.ServoManipulOsY_M19.PAR.JoggAcceleration:= (P1_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P1_Srobovanie.ServoManipulOsY_M19.PAR.JoggDeceleration:= (P1_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P1_Srobovanie.ServoManipulOsY_M19.PAR.JoggVelocity:= P1_Srobovanie.PAR.OsY_JoggRychlost;
            P1_Srobovanie.ServoManipulOsY_M19.PAR.JoggPoziciaLimitVPRED:= 290.0;
            P1_Srobovanie.ServoManipulOsY_M19.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P1_Srobovanie.ServoManipulOsY_M19.CMD.JoggLimit_ACTIVE:= TRUE;
	
	
            //Ovládanie vysunutia skrutkovaèky M4//
            P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:= P1_Srobovanie.RR_SkrutkovackuM4_VYSUN;
            
            //Ovládanie vysunutia skrutkovaèky M5//
            P1_Srobovanie.OUT.SkrutkM5_VYSUN_YV104:= P1_Srobovanie.RR_SkrutkovackuM5_VYSUN;
        
        
            //Ovládanie vysunutia skrutkovaèky K30//
            P1_Srobovanie.OUT.SkrutkK30_VYSUN_YV89:= P1_Srobovanie.RR_SkrutkovackuK30_VYSUN;
		
		
            //Spustenie èistenia skrutkovaèiek//
            IF P1_Srobovanie.RR_SkrutkovackaM4_CISTENIE THEN
                P1_Srobovanie.STAV.Cistenie_M4_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 510;
            ELSIF P1_Srobovanie.RR_SkrutkovackaK30_CISTENIE THEN
                P1_Srobovanie.STAV.Cistenie_K30_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P1_Srobovanie.ResetStep:= TRUE;
                SC_P1_Srobovanie.Step:= 500;
            END_IF   
            
        
            //Prisávanie skrutky M5//
            IF P1_Srobovanie.RR_PrisavanieSkrutkyM5 THEN
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= TRUE;
            ELSE
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV105:= FALSE;
                P1_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV109:= TRUE;
            END_IF    
		
        
            //Polohovanie na pozície skrutiek//
            IF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                IF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 0 THEN  //Lavá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 110;
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 1 THEN  //Pravá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 130;    
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 2 THEN  //Zadná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 150; 
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 3 THEN  //Predná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 170;  
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 4 THEN  //Stredná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 190;  
                END_IF
            ELSIF P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                IF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 0 THEN  //Lavá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 200;
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 1 THEN  //Pravá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 220;    
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 2 THEN  //Zadná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 240; 
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 3 THEN  //Predná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 260;  
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 4 THEN  //Stredná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 280;  
                END_IF
            ELSIF  P1_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                IF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 0 THEN  //Lavá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 300;
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 1 THEN  //Pravá K30
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 320;    
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 2 THEN  //Lavá M5
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 346; 
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 3 THEN  //Pravá M5
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 366;  
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 4 THEN  //Stredná M4
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 386; 
                ELSIF P1_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 5 THEN  //Pozícia odobratia skrutky M5
                    SC_P1_Srobovanie.ResetStep:= TRUE;
                    SC_P1_Srobovanie.Step:= 340;    
                END_IF
            END_IF       
                    
                    
                   
        
		
    END_CASE
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


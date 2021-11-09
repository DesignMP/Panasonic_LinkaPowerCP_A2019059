
PROGRAM _INIT
    P2_Srobovanie.PAR.OsX_JoggRychlost:= 5;
    P2_Srobovanie.PAR.OsY_JoggRychlost:= 5;
    Triger_0:= FALSE; 
    
    
    //Os X - Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
//    OsX_NovaHodnotaMomentu_POS := 1.5; //v Nm
//    OsX_NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_3);
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
//    MC_BR_ProcessParID_AcpAx_1.Axis:= ADR(gAxis_4);
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
	
	//*******************************Stav zásobník skrutiek M4 je prázdny********************//
    CasKontrolyZasobSkrutiek_M4.IN:= P2_Srobovanie.IN.ZasobSrobM4_PRAZDNY_IS33;
	
    IF CasKontrolyZasobSkrutiek_M4.Q THEN
        P2_Srobovanie.STAV.Zasobnik_M4_Prazdny:= TRUE;
        P2_Srobovanie.OUT.ZasobSrobM4_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P2_Srobovanie.STAV.Zasobnik_M4_Prazdny:= FALSE;
        P2_Srobovanie.OUT.ZasobSrobM4_Banner_CervenaLED:= FALSE;
    END_IF	
	
    CasKontrolyZasobSkrutiek_M4.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M4();
	
    //*******************************Stav zásobník skrutiek M5 je prázdny********************//
    CasKontrolyZasobSkrutiek_M5.IN:= P2_Srobovanie.IN.ZasobSrobM5_PRAZDNY_IS28;
	
    IF CasKontrolyZasobSkrutiek_M5.Q THEN
        P2_Srobovanie.STAV.Zasobnik_M5_Prazdny:= TRUE;
        P2_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P2_Srobovanie.STAV.Zasobnik_M5_Prazdny:= FALSE;
        P2_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= FALSE;
    END_IF	
	
	
	
    CasKontrolyZasobSkrutiek_M5.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M5();
	
    //*******************************Stav zásobník skrutiek M6 je prázdny********************//
    CasKontrolyZasobSkrutiek_M6.IN:= P2_Srobovanie.IN.ZasobSrobM6_PRAZDNY_IS36;
	
    IF CasKontrolyZasobSkrutiek_M6.Q THEN
        P2_Srobovanie.STAV.Zasobnik_M6_Prazdny:= TRUE;
        P2_Srobovanie.OUT.ZasobSrobM6_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P2_Srobovanie.STAV.Zasobnik_M6_Prazdny:= FALSE;
        P2_Srobovanie.OUT.ZasobSrobM6_Banner_CervenaLED:= FALSE;
    END_IF	
	
	
	
    CasKontrolyZasobSkrutiek_M6.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M6();
    
		
	
    //Index paletky//
    i:= P2_StoperSrobovania.PAR.IndexPaletky;
    
    
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_Srobovanie);
	
    //Príznak šrobovaèky vo východzej pozícii//
    IF P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 AND P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 AND P2_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS11 THEN
        P2_Srobovacky_VychodziaPozicia:= TRUE;
    ELSE	
        P2_Srobovacky_VychodziaPozicia:= FALSE;
    END_IF	
	
	
	
    //Volanie podprogramov//
    OvlManipulatora_OsX;
    OvlManipulatora_OsY;
    AtlasCopcoKomunikacia;
	
    //Reset sekcie //
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        SC_P2_Srobovanie.Step:= 0;
    ELSIF P2_Srobovanie.Reset THEN
        SC_P2_Srobovanie.Step:= 0;
        P2_Srobovanie.Reset:= FALSE;
    END_IF	
	
	
    //Zastavenie serv//
    IF EDGEPOS(P2_PoruchaST3) THEN
        OsX_STOP:= TRUE;
        OsY_STOP:= TRUE;
    ELSIF EDGEPOS(P2_Srobovanie.Reset) THEN
        OsX_STOP:= TRUE;
        OsY_STOP:= TRUE;
    END_IF	
	
   
    
    
    CASE SC_P2_Srobovanie.Step OF 
		
        0:
            SC_P2_Srobovanie.StepName:='0 - Nulovanie';
            SC_OvlManipulatora_OsX.Step:= 0;
            SC_OvlManipulatora_OsY.Step:= 0;
            P2_Srobovanie.Automat:= FALSE;
            P2_Srobovanie.KoniecCyklu:= FALSE;
            P2_Srobovanie.Manual:= FALSE;
            P2_Srobovanie.STAV.PoINIT:= FALSE;
            P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
            P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
            P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
            P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
            P2_Srobovanie.OUT.SkrutkM5_PrisavSkrutky_RUN_YV16:= FALSE;
            P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= FALSE;
            IF NOT Triger_0 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Reset:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M6.Reset:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                Triger_0:= TRUE;
            END_IF	
            P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
            P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
            P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggLimit_ACTIVE:= FALSE;
            P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggLimit_ACTIVE:= FALSE;
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M4.Automat:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M4.Manual:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M4.UkoncenieCyklu:= FALSE;
            P2_Srobovanie.Skrutkovacka_M4.RESET_Poruchy:= FALSE;
            P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
            P2_Srobovanie.Skrutkovacka_M4.START_Skrutkovania:= FALSE;
            P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M5.Automat:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M5.Manual:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M5.UkoncenieCyklu:= FALSE;
            P2_Srobovanie.Skrutkovacka_M5.RESET_Poruchy:= FALSE;
            P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
            P2_Srobovanie.Skrutkovacka_M5.START_Skrutkovania:= FALSE;
            P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M6.Automat:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M6.Manual:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
            P2_Srobovanie.SkrutkovaciSet_M6.UkoncenieCyklu:= FALSE;
            P2_Srobovanie.Skrutkovacka_M6.RESET_Poruchy:= FALSE;
            P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= FALSE;
            P2_Srobovanie.Skrutkovacka_M6.START_Skrutkovania:= FALSE;
            P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
            FazaNavratu:= 0;
            P2_Srobovanie.RR_SkrutkovackaM4_CISTENIE:= FALSE;
            P2_Srobovanie.STAV.Cistenie_M4_BUSY:= FALSE;
            P2_Srobovanie.RR_SkrutkovackaM5_CISTENIE:= FALSE;
            P2_Srobovanie.STAV.Cistenie_M5_BUSY:= FALSE;
            P2_Srobovanie.RR_SkrutkovackaM6_CISTENIE:= FALSE;
            P2_Srobovanie.STAV.Cistenie_M6_BUSY:= FALSE;
            P2_Srobovanie.RR_SkrutkovackuM4_VYSUN:= FALSE;
            P2_Srobovanie.RR_SkrutkovackuM5_VYSUN:= FALSE;
            P2_Srobovanie.RR_SkrutkovackuM6_VYSUN:= FALSE;
            P2_Srobovanie.RR_ZapniHrniec_M4:= FALSE;
            P2_Srobovanie.RR_ZapniHrniec_M5:= FALSE;
            P2_Srobovanie.RR_ZapniHrniec_M6:= FALSE;
            P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
            P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
            P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
									
            IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 AND P2_Pracovisko.STAV.ServaBunky_READY THEN
                Triger_0:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 1;
            END_IF
	
        1:
            SC_P2_Srobovanie.StepName:='1 - Cakam na spustenie vyroby';
            P2_Srobovanie.KoniecCyklu:= FALSE;
            IF P2_Srobovanie.Automat THEN
                SC_P2_Srobovanie.Step:= 2;
            ELSIF P2_Srobovanie.Manual THEN
                SC_P2_Srobovanie.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
		
        2:
            SC_P2_Srobovanie.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_Srobovanie.IdleTime.PT:= T#500ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
            P2_Srobovanie.SkrutkovaciSet_M4.Automat:= TRUE;
            P2_Srobovanie.SkrutkovaciSet_M5.Automat:= TRUE;
            P2_Srobovanie.SkrutkovaciSet_M6.Automat:= TRUE;
			
											
            IF P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie AND P2_Srobovacky_VychodziaPozicia THEN
                P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 3;
            END_IF
	
        3:
            SC_P2_Srobovanie.StepName:='3 - Inicializacia - kontrola homingu serva manipulatora os X';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P2_Srobovanie.STAV.OsX_HomingOK THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 5;
            ELSE
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 4;
            END_IF
		
        4:
            SC_P2_Srobovanie.StepName:='4 - Inicializacia - spustenie homingu serva manipulatora os X';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_Srobovanie.Switch1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_HOME:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P2_Srobovanie.STAV.OsX_HomingOK THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 5;
            END_IF	
		
        5:
            SC_P2_Srobovanie.StepName:='5 - Inicializacia - presun osy X do vychodiskovej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 0;
			
				
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 10;
            END_IF	
			
		
		
		
        10:
            SC_P2_Srobovanie.StepName:='10 - Inicializacia - kontrola homingu serva manipulatora os Y';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P2_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 12;
            ELSE
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 11;
            END_IF
		
		
        11:
            SC_P2_Srobovanie.StepName:='11 - Inicializacia - spustenie homingu serva manipulatora os Y';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
						
            IF NOT SC_P2_Srobovanie.Switch1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsY_HOME:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P2_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 12;
            END_IF	
		
		
        12:
            SC_P2_Srobovanie.StepName:='12 - Inicializacia - presun osy Y do vychodiskovej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
			
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 320;
			
				
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
            END_IF	
			
            IF P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta AND P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie THEN
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 20;
            END_IF	
	
	
        20:
            SC_P2_Srobovanie.StepName:='20 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 140; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 23;
            END_IF
			
        23:
            SC_P2_Srobovanie.StepName:='23 - Inicializacia - zahodenie skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#1s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M5.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS11 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 30;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN	
                P2_Alarmy[238]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
	
				
        30:
            SC_P2_Srobovanie.StepName:='30 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 60; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 33;
            END_IF
			
        33:
            SC_P2_Srobovanie.StepName:='33 - Inicializacia - zahodenie skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#1s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M4.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 40;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN	
                P2_Alarmy[237]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
		
			
		
        40:
            SC_P2_Srobovanie.StepName:='40 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 43;
            END_IF
			
        43:
            SC_P2_Srobovanie.StepName:='43 - Inicializacia - zahodenie skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#1s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M6.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 50;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN	
                P2_Alarmy[239]:= TRUE;
                P2_PoruchaST3:= TRUE;
            END_IF
			
	
			
        50:
            SC_P2_Srobovanie.StepName:='50 - Inicializacia - presun manipulatora do vychodiskovej pozicie k motoru ';
            SC_P2_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 0; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta AND
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND 
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.PoINIT:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
		
			
			
	
            //********************************************************Automatický režim****************************************************************************//
				
        100:  
            SC_P2_Srobovanie.StepName:='100 - Automaticky Rezim - cakam na spustenie cinnosti';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;			
	
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= TRUE;
			
            IF P2_Srobovanie.KoniecCyklu AND NOT P2_StoperSrobovania.Automat THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 0;
            ELSIF P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM6 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 110;
            ELSIF P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM6 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 130;
            ELSIF P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM4 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 150;
            ELSIF P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM4 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 170;
            ELSIF P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM6 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 200;
            ELSIF P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM6 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 220;
            ELSIF P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM4 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 240;
            ELSIF P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM4 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 260;
            ELSIF P2_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutkuM5 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 300;
            ELSIF P2_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutkuM5 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 320;
            ELSIF P2_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutkuM4 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 340;
            ELSIF P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 400;
            ELSIF P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 420;	
            END_IF	
			
				
            //**********************************************************************Model 4F*******************************************************************************************//	
            //Zaskrutkovanie lavej skrutky M6//			
			
        110:
            SC_P2_Srobovanie.StepName:='110 - Automaticky Rezim - model 4F, napolohovanie prednej skrutkovacky M6 na poziciu lavej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozX_LavejSkrutkyM6; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozY_LavejSkrutkyM6; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE   
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 113;
                END_IF
            END_IF	
			
        113:
            SC_P2_Srobovanie.StepName:='113 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 115;
            END_IF	
	
        115:
            SC_P2_Srobovanie.StepName:='115 - Automaticky Rezim - model 4F, kontrola skrutky M6 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena AND P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 118;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                    P2_Alarmy[239]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                    P2_Alarmy[277]:= TRUE;
                END_IF    
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 128; 
            END_IF	
			
			
			
        118:
            SC_P2_Srobovanie.StepName:='118 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 < 2);
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= TRUE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 > 2 AND NOT TEST THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 120;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q AND NOT TEST THEN
                P2_Alarmy[270]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 128; 
            END_IF	
			
        120:
            SC_P2_Srobovanie.StepName:='120 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3);
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM6:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 123;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[274]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 128; 
            END_IF
				
        123:
            SC_P2_Srobovanie.StepName:='123 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M6 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 124;
            END_IF
		
			
        124:
            SC_P2_Srobovanie.StepName:='124 - Automaticky Rezim - model 4F, signal skrutka M6 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 125;
            END_IF
			
			
				
        125:
            SC_P2_Srobovanie.StepName:='125 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania lavej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 128;
            ELSIF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 128;          
            END_IF	
		
        128:
            SC_P2_Srobovanie.StepName:='128 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj lavu srobu M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM6 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
			
			
            //Zaskrutkovanie pravej skrutky M6//				
			
        130:
            SC_P2_Srobovanie.StepName:='130 - Automaticky Rezim - model 4F, napolohovanie prednej skrutkovacky M6 na poziciu pravej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozX_PravejSkrutkyM6; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozY_PravejSkrutkyM6; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 133;
                END_IF
            END_IF	
			
			
        133:
            SC_P2_Srobovanie.StepName:='133 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 135;
            END_IF	
	
        135:
            SC_P2_Srobovanie.StepName:='135 - Automaticky Rezim - model 4F, kontrola skrutky M6 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena AND P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 138;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                    P2_Alarmy[239]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                    P2_Alarmy[277]:= TRUE;
                END_IF   
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 148;    
            END_IF	
			
			
			
        138:
            SC_P2_Srobovanie.StepName:='138 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 < 2);
            
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= TRUE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 140;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[270]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 148; 
            END_IF	
			
                    
            
            
            
            
        140:
            SC_P2_Srobovanie.StepName:='140 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND NOT P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM6:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 142;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[274]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 148; 
            END_IF
		
            
        142:
            SC_P2_Srobovanie.StepName:='142 - Automaticky Rezim - model 4F, uvolnenie busbarov';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
            
            IF P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 143;
            END_IF
            
            
            
        143:
            SC_P2_Srobovanie.StepName:='143 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M6 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 144;
            END_IF
		
			
        144:
            SC_P2_Srobovanie.StepName:='144 - Automaticky Rezim - model 4F, signal skrutka M6 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 145;
            END_IF
			
			
				
        145:
            SC_P2_Srobovanie.StepName:='145 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania pravej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 148;
            ELSIF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 148;          
            END_IF	
		
        148:
            SC_P2_Srobovanie.StepName:='148 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj pravu srobu M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM6 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
			
			
            //Zaskrutkovanie lavej skrutky M4//			
			
        150:
            SC_P2_Srobovanie.StepName:='150 - Automaticky Rezim - model 4F, napolohovanie strednej skrutkovacky M4 na poziciu lavej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozX_LavejSkrutkyM4; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozY_LavejSkrutkyM4; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 153;
                END_IF
            END_IF	
			
			
        153:
            SC_P2_Srobovanie.StepName:='153 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 155;
            END_IF	
	
        155:
            SC_P2_Srobovanie.StepName:='155 - Automaticky Rezim - model 4F, kontrola skrutky M4 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 158;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P2_Alarmy[275]:= TRUE;
                    P2_StoperSrobovania.STAV.Porucha:= TRUE;
                    P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 168; 
                ELSE
                    FazaNavratu:= 150;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 500; 
                END_IF   
            END_IF	
			
			
			
        158:
            SC_P2_Srobovanie.StepName:='158 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 < 2);
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= TRUE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 > 2 AND NOT TEST THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 160;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q AND NOT TEST THEN
                P2_Alarmy[268]:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 168;    
            END_IF	
			
                
            
            
            
            
        160:
            SC_P2_Srobovanie.StepName:='160 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4);
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 163;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[272]:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 168;   
            END_IF
				
        163:
            SC_P2_Srobovanie.StepName:='163 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 164;
            END_IF
		
			
        164:
            SC_P2_Srobovanie.StepName:='164 - Automaticky Rezim - model 4F, signal skrutka M4 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 165;
            END_IF
			
			
				
        165:
            SC_P2_Srobovanie.StepName:='165 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania lavej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 168;
            ELSIF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 168;          
            END_IF	
		
        168:
            SC_P2_Srobovanie.StepName:='168 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj lavu srobu M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_4F_ZasrobujLavuSkrutkuM4 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
            //Zaskrutkovanie pravej skrutky M4//				
			
        170:
            SC_P2_Srobovanie.StepName:='170 - Automaticky Rezim - model 4F, napolohovanie strednej skrutkovacky M4 na poziciu pravej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozX_PravejSkrutkyM4; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob4F_PozY_PravejSkrutkyM4; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 173;
                END_IF
            END_IF	
			
			
        173:
            SC_P2_Srobovanie.StepName:='173 - Automaticky Rezim - model 4F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 175;
            END_IF	
	
        175:
            SC_P2_Srobovanie.StepName:='175 - Automaticky Rezim - model 4F, kontrola skrutky M4 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 178;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P2_Alarmy[275]:= TRUE;
                    P2_StoperSrobovania.STAV.Porucha:= TRUE;
                    P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 188; 
                ELSE
                    FazaNavratu:= 170;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 500; 
                END_IF   
                
            END_IF	
			
			
			
        178:
            SC_P2_Srobovanie.StepName:='178 - Automaticky Rezim - model 4F, vysunutie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 < 2);
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= TRUE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 180;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[268]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 188; 
            END_IF	
			
                   
            
            
            
        180:
            SC_P2_Srobovanie.StepName:='180 - Automaticky Rezim - model 4F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 183;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[272]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 188;
            END_IF
				
        183:
            SC_P2_Srobovanie.StepName:='183 - Automaticky Rezim - model 4F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 184;
            END_IF
		
			
        184:
            SC_P2_Srobovanie.StepName:='184 - Automaticky Rezim - model 4F, signal skrutka M4 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 185;
            END_IF
			
			
				
        185:
            SC_P2_Srobovanie.StepName:='185 - Automaticky Rezim - model 4F, kontrola vysledkov skrutkovania pravej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 188;
            ELSIF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 188;          
            END_IF	
		
        188:
            SC_P2_Srobovanie.StepName:='188 - Automaticky Rezim - model 4F, cakam na zrusenie signalu zaskrutkuj pravu srobu M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_4F_ZasrobujPravuSkrutkuM4 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
			
			
			
			
            //**********************************************************************Model 5F*******************************************************************************************//	
			
            //Zaskrutkovanie lavej skrutky M6//			
			
        200:
            SC_P2_Srobovanie.StepName:='200 - Automaticky Rezim - model 5F, napolohovanie prednej skrutkovacky M6 na poziciu lavej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozX_LavejSkrutkyM6; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozY_LavejSkrutkyM6; //mm
		
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 203;
                END_IF
            END_IF	
			
			
        203:
            SC_P2_Srobovanie.StepName:='203 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 205;
            END_IF	
	
        205:
            SC_P2_Srobovanie.StepName:='205 - Automaticky Rezim - model 5F, kontrola skrutky M6 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
            
            IF P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena AND P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 208;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                    P2_Alarmy[239]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                    P2_Alarmy[277]:= TRUE;
                END_IF   
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 218;  
            END_IF	
			
			
			
        208:
            SC_P2_Srobovanie.StepName:='208 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 < 2);
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= TRUE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 210;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[270]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 218;     
            END_IF	
			
            
                     
            
            
            
        210:
            SC_P2_Srobovanie.StepName:='210 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3);
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM6:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 213;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[274]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 218;   
            END_IF
				
        213:
            SC_P2_Srobovanie.StepName:='213 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M6 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 214;
            END_IF
		
			
        214:
            SC_P2_Srobovanie.StepName:='214 - Automaticky Rezim - model 5F, signal skrutka M6 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 215;
            END_IF
			
			
				
        215:
            SC_P2_Srobovanie.StepName:='215 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania lavej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 218;
            ELSIF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 218;          
            END_IF	
		
        218:
            SC_P2_Srobovanie.StepName:='218 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj lavu srobu M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM6 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
			
			
            //Zaskrutkovanie pravej skrutky M6//				
			
        220:
            SC_P2_Srobovanie.StepName:='220 - Automaticky Rezim - model 5F, napolohovanie prednej skrutkovacky M6 na poziciu pravej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozX_PravejSkrutkyM6; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozY_PravejSkrutkyM6; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 223;
                END_IF
            END_IF	
			
			
        223:
            SC_P2_Srobovanie.StepName:='223 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M6.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 225;
            END_IF	
	
        225:
            SC_P2_Srobovanie.StepName:='225 - Automaticky Rezim - model 5F, kontrola skrutky M6 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena AND P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 228;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                    P2_Alarmy[239]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_READY_to_START THEN
                    P2_Alarmy[277]:= TRUE;
                END_IF   
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 238;  
            END_IF	
			
			
			
        228:
            SC_P2_Srobovanie.StepName:='228 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 < 2);
            
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= TRUE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 230;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[270]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 238;     
            END_IF	
			
                 
            
            
            
        230:
            SC_P2_Srobovanie.StepName:='230 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
			
			
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_UtahovanieUkoncene AND NOT P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM6:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM6:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 232;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[274]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.Skrutkovacka_M6.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 238;  
            END_IF
		
        232:
            SC_P2_Srobovanie.StepName:='232 - Automaticky Rezim - model 5F, uvolnenie busbarov';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
            
            IF P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 233;
            END_IF    
            
            
            
            
        233:
            SC_P2_Srobovanie.StepName:='233 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M6 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= FALSE;
                P2_Srobovanie.OUT.SkrutkM6_PrisavSkrutky_RUN_YV36:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 234;
            END_IF
		
			
        234:
            SC_P2_Srobovanie.StepName:='234 - Automaticky Rezim - model 5F, signal skrutka M6 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 235;
            END_IF
			
			
				
        235:
            SC_P2_Srobovanie.StepName:='235 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania pravej skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 238;
            ELSIF P2_Srobovanie.Skrutkovacka_M6.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 238;          
            END_IF	
		
		
        238:
            SC_P2_Srobovanie.StepName:='228 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj pravu srobu M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM6 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
            //Zaskrutkovanie lavej skrutky M4//			
			
        240:
            SC_P2_Srobovanie.StepName:='240 - Automaticky Rezim - model 5F, napolohovanie strednej skrutkovacky M4 na poziciu lavej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozX_LavejSkrutkyM4; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozY_LavejSkrutkyM4; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 243;
                END_IF
            END_IF	
			
        243:
            SC_P2_Srobovanie.StepName:='243 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 245;
            END_IF	
	
        245:
            SC_P2_Srobovanie.StepName:='245 - Automaticky Rezim - model 5F, kontrola skrutky M4 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 248;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P2_Alarmy[275]:= TRUE;
                    P2_StoperSrobovania.STAV.Porucha:= TRUE;
                    P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 258; 
                ELSE
                    FazaNavratu:= 240;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 500; 
                END_IF   
            END_IF
			
			
        248:
            SC_P2_Srobovanie.StepName:='248 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 < 2);
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= TRUE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 250;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[268]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 258;      
            END_IF	
			
               
            
            
        250:
            SC_P2_Srobovanie.StepName:='250 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4);
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 253;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[272]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 258; 
            END_IF
				
        253:
            SC_P2_Srobovanie.StepName:='253 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 254;
            END_IF
		
			
        254:
            SC_P2_Srobovanie.StepName:='254 - Automaticky Rezim - model 5F, signal skrutka M4 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 255;
            END_IF
			
			
				
        255:
            SC_P2_Srobovanie.StepName:='255 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania lavej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 258;
            ELSIF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 258;          
            END_IF	
			
	
			
		
        258:
            SC_P2_Srobovanie.StepName:='258 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj lavu srobu M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5F_ZasrobujLavuSkrutkuM4 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF	
			
			
            //Zaskrutkovanie pravej skrutky M4//				
			
        260:
            SC_P2_Srobovanie.StepName:='260 - Automaticky Rezim - model 5F, napolohovanie strednej skrutkovacky M4 na poziciu pravej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozX_PravejSkrutkyM4; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5F_PozY_PravejSkrutkyM4; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 263;
                END_IF
            END_IF	
			
        263:
            SC_P2_Srobovanie.StepName:='263 - Automaticky Rezim - model 5F, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 265;
            END_IF	
	
        265:
            SC_P2_Srobovanie.StepName:='265 - Automaticky Rezim - model 5F, kontrola skrutky M4 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 268;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P2_Alarmy[275]:= TRUE;
                    P2_StoperSrobovania.STAV.Porucha:= TRUE;
                    P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 278; 
                ELSE
                    FazaNavratu:= 260;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 500; 
                END_IF   
            END_IF	
			
			
			
        268:
            SC_P2_Srobovanie.StepName:='268 - Automaticky Rezim - model 5F, vysunutie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 < 2);
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= TRUE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 270;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[268]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 278;     
            END_IF	
			           
            
            
            
        270:
            SC_P2_Srobovanie.StepName:='270 - Automaticky Rezim - model 5F, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 273;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[272]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 278; 
            END_IF
            
            
            
        273:
            SC_P2_Srobovanie.StepName:='273 - Automaticky Rezim - model 5F, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 274;
            END_IF
		
			
        274:
            SC_P2_Srobovanie.StepName:='274 - Automaticky Rezim - model 5F, signal skrutka M4 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 275;
            END_IF
			
			
				
        275:
            SC_P2_Srobovanie.StepName:='275 - Automaticky Rezim - model 5F, kontrola vysledkov skrutkovania pravej skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 278;
            ELSIF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 278;          
            END_IF		
	
				
			
		
        278:
            SC_P2_Srobovanie.StepName:='278 - Automaticky Rezim - model 5F, cakam na zrusenie signalu zaskrutkuj pravu srobu M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5F_ZasrobujPravuSkrutkuM4 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF			
			
			
			
				
            //**********************************************************************Model 5H*******************************************************************************************//	
            //Zaskrutkovanie lavej skrutky M5//			
		
        300:
            SC_P2_Srobovanie.StepName:='300 - Automaticky Rezim - model 5H, napolohovanie zadnej skrutkovacky M5 na poziciu lavej skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozX_LavejSkrutkyM5; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozY_LavejSkrutkyM5; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA  THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 303;
                END_IF
            END_IF	
			
			
        303:
            SC_P2_Srobovanie.StepName:='303 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 305;
            END_IF	
	
			
	
        305:
            SC_P2_Srobovanie.StepName:='305 - Automaticky Rezim - model 5H, kontrola skrutky M5 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P2_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START AND NOT PAUZA THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 308;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                    P2_Alarmy[238]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                    P2_Alarmy[276]:= TRUE;
                END_IF    
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 318;  
            END_IF	
			
			
			
        308:
            SC_P2_Srobovanie.StepName:='308 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5 < 2);
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM5_PrisavSkrutky_RUN_YV16:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= TRUE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5 > 2 AND NOT TEST THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 310;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q AND NOT TEST THEN
                P2_Alarmy[269]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 318;      
            END_IF	
			
                  
            
            
            
        310:
            SC_P2_Srobovanie.StepName:='310 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
						
            IF P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_LavaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_LavaSkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 313;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[273]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 318;
            END_IF
				
        313:
            SC_P2_Srobovanie.StepName:='313 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.OUT.SkrutkM5_PrisavSkrutky_RUN_YV16:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS11 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 314;
            END_IF
		
			
        314:
            SC_P2_Srobovanie.StepName:='314 - Automaticky Rezim - model 5H, signal skrutka M5 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 315;
            END_IF
			
			
				
        315:
            SC_P2_Srobovanie.StepName:='315 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania lavej skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 318;
            ELSIF P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 318;          
            END_IF	
			
	
			
		
        318:
            SC_P2_Srobovanie.StepName:='318 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj lavu srobu M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5H_ZasrobujLavuSkrutkuM5 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
			
			
            //Zaskrutkovanie pravej skrutky M5//				
			
        320:
            SC_P2_Srobovanie.StepName:='320 - Automaticky Rezim - model 5H, napolohovanie zadnej skrutkovacky M5 na poziciu pravej skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozX_PravejSkrutkyM5; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozY_PravejSkrutkyM5; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 323;
                END_IF
            END_IF	
			
			
        323:
            SC_P2_Srobovanie.StepName:='323 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 325;
            END_IF	
	

			
        325:
            SC_P2_Srobovanie.StepName:='325 - Automaticky Rezim - model 5H, kontrola skrutky M5 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P2_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START AND NOT PAUZA THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 328;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                    P2_Alarmy[238]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                    P2_Alarmy[276]:= TRUE;
                END_IF   
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 338;  
            END_IF	
			
			
			
        328:
            SC_P2_Srobovanie.StepName:='328 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5 < 2);
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM5_PrisavSkrutky_RUN_YV16:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= TRUE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5 > 2 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 330;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[269]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 338;    
            END_IF	
			
                        
            
        330:
            SC_P2_Srobovanie.StepName:='330 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P2_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND NOT P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_PravaSkrutkaM5:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5); 
                Reports.Skrutkovacky.CasSkrutkovania.P2_PravaSkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 332;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[273]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 338;  
            END_IF
		
            
        332:
            SC_P2_Srobovanie.StepName:='332 - Automaticky Rezim - model 5H, uvolnenie busbarov';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
            
            IF P2_Robot.KOM_IN.Stav_BusbaryUvolnene THEN
                P2_Robot.KOM_OUT.UvolniBusbary:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 333;
            END_IF    
              
            
            
            
        333:
            SC_P2_Srobovanie.StepName:='333 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= FALSE;
                P2_Srobovanie.OUT.SkrutkM5_PrisavSkrutky_RUN_YV16:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS11 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 334;
            END_IF
		
			
        334:
            SC_P2_Srobovanie.StepName:='334 - Automaticky Rezim - model 5H, signal skrutka M5 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 335;
            END_IF
			
			
				
        335:
            SC_P2_Srobovanie.StepName:='335 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania pravej skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 338;
            ELSIF P2_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 338;          
            END_IF
		
				
        338:
            SC_P2_Srobovanie.StepName:='338 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj pravu srobu M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5H_ZasrobujPravuSkrutkuM5 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF
			
			
            //Zaskrutkovanie skrutky M4//			
			
        340:
            SC_P2_Srobovanie.StepName:='340 - Automaticky Rezim - model 5H, napolohovanie strednej skrutkovacky M4 na poziciu skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozX_SkrutkyM4; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= P2_RemPremenne.P2_Srob5H_PozY_SkrutkyM4; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F:= FALSE;
                    P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F:= FALSE;
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 700; 
                ELSE 
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 343;
                END_IF
            END_IF	
			
        343:
            SC_P2_Srobovanie.StepName:='343 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK AND NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.RESET_Vysledkov:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 345;
            END_IF	
	
        345:
            SC_P2_Srobovanie.StepName:='345 - Automaticky Rezim - model 5H, kontrola skrutky M4 v skrutkovacke';
            SC_P2_Srobovanie.IdleTime.PT:= T#5s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START AND NOT PAUZA THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 348;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN    
                IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                    P2_Alarmy[237]:= TRUE;
                END_IF
                IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_READY_to_START THEN
                    P2_Alarmy[275]:= TRUE;
                END_IF   
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 358; 
            END_IF	
			
		
			
			
        348:
            SC_P2_Srobovanie.StepName:='348 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
			
            SC_P2_Srobovanie.AlarmTime.IN:= (P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 < 2);
                      
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= TRUE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
		
			
            IF NOT P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene AND P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4 > 2 AND NOT TEST THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 350;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q AND NOT TEST THEN
                P2_Alarmy[268]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 358;    
            END_IF	
			
            
                   
            
            
        350:
            SC_P2_Srobovanie.StepName:='350 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
            SC_P2_Srobovanie.AlarmTime.IN:= TRUE;
					
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_UtahovanieUkoncene THEN
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P2_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P2_StrednaSkrutkaM4:= REAL_TO_STRING(P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4);
                Reports.Skrutkovacky.CasSkrutkovania.P2_StrednaSkrutkaM4:= REAL_TO_STRING(CasSrobovania/1000);
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 353;
            ELSIF SC_P2_Srobovanie.AlarmTime.Q THEN
                P2_Alarmy[272]:= TRUE;
                P2_StoperSrobovania.STAV.Porucha:= TRUE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                P2_Srobovanie.Skrutkovacka_M4.START_Utahovania:= FALSE;
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 358; 
            END_IF
				
        353:
            SC_P2_Srobovanie.StepName:='353 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M4 a vypnutie prisavania skrutky';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= FALSE;
                P2_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV26:= FALSE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 354;
            END_IF
		
			
        354:
            SC_P2_Srobovanie.StepName:='354 - Automaticky Rezim - model 5H, signal skrutka M4 odobrata';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 355;
            END_IF
			
			
				
        355:
            SC_P2_Srobovanie.StepName:='355 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_OK THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 358;
            ELSIF P2_Srobovanie.Skrutkovacka_M4.Stav_VysledokUtahovania_NG THEN
                P2_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 358;          
            END_IF				
	
			
		
        358:
            SC_P2_Srobovanie.StepName:='358 - Automaticky Rezim - model 5H, cakam na zrusenie signalu zaskrutkuj srobu M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutkuM4 THEN
                P2_Srobovanie.OUT.KOM_Srobovanie_Ukoncene:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF	
			
		
		
			
			
			
			
            //Presun manipulátora do pozície VPRED//		
		
        400:
            SC_P2_Srobovanie.StepName:='400 - Automaticky Rezim - napolohovanie manipulatora do prednej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            (*P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;*)
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 0; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 320; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.OUT.KOM_PresunVPRED_Ukonceny:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 402;
            END_IF	
			
        402:
            SC_P2_Srobovanie.StepName:='402 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do prednej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF			
			
			
			
            //Presun manipulatora do pozicie VZAD//		
			
        420:
            SC_P2_Srobovanie.StepName:='420 - Automaticky Rezim - napolohovanie manipulatora do zadnej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia:= FALSE;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 0; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsX_POLOHUJ:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.OUT.KOM_PresunVZAD_Ukonceny:= TRUE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 422;
            END_IF	
			
        422:
            SC_P2_Srobovanie.StepName:='422 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do zadnej pozicie';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 100;
            END_IF			
			

            //***********************************************************Èistenie skrutkovaèiek**********************************************************************//			
			
            //Èistenie skrutkovaèky M4//
        500:
            SC_P2_Srobovanie.StepName:='500 - Automaticky Rezim - cistenie skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
                        
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 60; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata:= FALSE;
                P2_Srobovanie.SkrutkovaciSet_M4.Automat:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                OsX_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P2_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch2:= TRUE;
            END_IF			
				
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 503;
            END_IF
			
			
					
        503:
            SC_P2_Srobovanie.StepName:='503 - Inicializacia - zahodenie skrutky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M4.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS10 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P2_Srobovanie.SkrutkovaciSet_M4.Cistenie AND P2_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena AND SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.STAV.Cistenie_M4_BUSY:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= FazaNavratu;
            ELSIF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 505;	
            END_IF
		
        505:
            SC_P2_Srobovanie.StepName:='505 - Inicializacia - cakam na opatovne spustenie cistenia skrutkovacky M4';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M4.Reset:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M4.Cistenie:= FALSE;
                SC_P2_Srobovanie.IdleTime.IN:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 503;
            END_IF	
			
            //Èistenie skrutkovaèky M5//
        510:
            SC_P2_Srobovanie.StepName:='500 - Automaticky Rezim - cistenie skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 140; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                P2_Srobovanie.SkrutkovaciSet_M5.Automat:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M5.Reset:= TRUE;
                OsX_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P2_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch2:= TRUE;
            END_IF
			
						
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 513;
            END_IF
			
        513:
            SC_P2_Srobovanie.StepName:='513 - Inicializacia - zahodenie skrutky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M5.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS11 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P2_Srobovanie.SkrutkovaciSet_M5.Cistenie AND P2_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.STAV.Cistenie_M5_BUSY:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= FazaNavratu;
            ELSIF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 515;	
            END_IF
			
				
				
			
        515:
            SC_P2_Srobovanie.StepName:='505 - Inicializacia - cakam na opatovne spustenie cistenia skrutkovacky M5';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M5.Reset:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M5.Cistenie:= FALSE;
                SC_P2_Srobovanie.IdleTime.IN:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 513;
            END_IF	
			
	
			
			
            //Èistenie skrutkovaèky M6//
		
        520:
            SC_P2_Srobovanie.StepName:='520 - Automaticky Rezim - cistenie skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
			
            P2_Srobovanie.PAR.OsX_ZadanaPozicia:= 50; //mm
            P2_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
			
			
            IF NOT SC_P2_Srobovanie.Switch1 AND SC_OvlManipulatora_OsX.Step = 1 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Odobrata:= FALSE;
                P2_Srobovanie.SkrutkovaciSet_M6.Automat:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M6.Reset:= TRUE;
                OsX_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT SC_P2_Srobovanie.Switch2 AND SC_OvlManipulatora_OsY.Step = 1 AND P2_Srobovacky_VychodziaPozicia AND P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P2_Srobovanie.Switch2:= TRUE;
            END_IF
				
						
            IF P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta AND P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P2_Srobovanie.STAV.OsX_PoziciaDosiahnuta:= FALSE;
                P2_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 523;
            END_IF
			
        523:
            SC_P2_Srobovanie.StepName:='523 - Inicializacia - zahodenie skrutky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#30s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P2_Srobovanie.IdleTime.IN:= TRUE;
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P2_Srobovanie.SkrutkovaciSet_M6.CistenieUkoncene AND P2_Srobovanie.IN.SkrutkM6_ZASUNUTY_MS14 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P2_Srobovanie.SkrutkovaciSet_M6.Cistenie AND P2_Srobovanie.SkrutkovaciSet_M6.SkrutkaM6_Pripravena AND SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.STAV.Cistenie_M6_BUSY:= FALSE;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= FazaNavratu;
            ELSIF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 525;	
            END_IF
		
        525:
            SC_P2_Srobovanie.StepName:='525 - Inicializacia - cakam na opatovne spustenie cistenia skrutkovacky M6';
            SC_P2_Srobovanie.IdleTime.PT:= T#2s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P2_Srobovanie.Switch1 THEN
                P2_Srobovanie.SkrutkovaciSet_M6.Reset:= TRUE;
                P2_Srobovanie.SkrutkovaciSet_M6.Cistenie:= FALSE;
                SC_P2_Srobovanie.IdleTime.IN:= TRUE;
                SC_P2_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P2_Srobovanie.IdleTime.Q THEN
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 523;
            END_IF	
			
			
			
			
			
			
			
			
	
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P2_Srobovanie.StepName:='700 - Manualny Rezim';
            SC_P2_Srobovanie.IdleTime.PT:= T#8s;
            SC_P2_Srobovanie.AlarmTime.PT:= T#5s;
		
            P2_Srobovanie.ServoManipulOsX_M10.PAR.JoggAcceleration:= (P2_Srobovanie.PAR.OsX_JoggRychlost * 10);
            P2_Srobovanie.ServoManipulOsX_M10.PAR.JoggDeceleration:= (P2_Srobovanie.PAR.OsX_JoggRychlost * 10);
            P2_Srobovanie.ServoManipulOsX_M10.PAR.JoggVelocity:= P2_Srobovanie.PAR.OsX_JoggRychlost;
            P2_Srobovanie.ServoManipulOsX_M10.PAR.JoggPoziciaLimitVPRED:= 60.0;
            P2_Srobovanie.ServoManipulOsX_M10.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P2_Srobovanie.ServoManipulOsX_M10.CMD.JoggLimit_ACTIVE:= TRUE;	
		
            P2_Srobovanie.ServoManipulOsY_M9.PAR.JoggAcceleration:= (P2_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P2_Srobovanie.ServoManipulOsY_M9.PAR.JoggDeceleration:= (P2_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P2_Srobovanie.ServoManipulOsY_M9.PAR.JoggVelocity:= P2_Srobovanie.PAR.OsY_JoggRychlost;
            P2_Srobovanie.ServoManipulOsY_M9.PAR.JoggPoziciaLimitVPRED:= 320.0;
            P2_Srobovanie.ServoManipulOsY_M9.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P2_Srobovanie.ServoManipulOsY_M9.CMD.JoggLimit_ACTIVE:= TRUE;
	
		
            //Ovládanie vysunutia skrutkovaèky M4//
            P2_Srobovanie.OUT.SkrutkM4_VYSUN_YV24:= P2_Srobovanie.RR_SkrutkovackuM4_VYSUN;
            
            
            //Ovládanie vysunutia skrutkovaèky M5//
            P2_Srobovanie.OUT.SkrutkM5_VYSUN_YV14:= P2_Srobovanie.RR_SkrutkovackuM5_VYSUN;
            
            
            
            //Ovládanie vysunutia skrutkovaèky M6//
            P2_Srobovanie.OUT.SkrutkM6_VYSUN_YV34:= P2_Srobovanie.RR_SkrutkovackuM6_VYSUN;
            
        
            //Spustenie èistenia skrutkovaèiek//
            IF P2_Srobovanie.RR_SkrutkovackaM4_CISTENIE THEN
                P2_Srobovanie.RR_SkrutkovackaM4_CISTENIE:= FALSE;
                P2_Srobovanie.STAV.Cistenie_M4_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 500;
            ELSIF P2_Srobovanie.RR_SkrutkovackaM5_CISTENIE THEN
                P2_Srobovanie.RR_SkrutkovackaM5_CISTENIE:= FALSE;
                P2_Srobovanie.STAV.Cistenie_M5_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 510;
            ELSIF P2_Srobovanie.RR_SkrutkovackaM6_CISTENIE THEN
                P2_Srobovanie.RR_SkrutkovackaM6_CISTENIE:= FALSE;
                P2_Srobovanie.STAV.Cistenie_M6_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P2_Srobovanie.ResetStep:= TRUE;
                SC_P2_Srobovanie.Step:= 520;
            END_IF    
                
           
        
            //Polohovanie na pozície skrutiek//
            IF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F THEN
                IF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 0 THEN  //Lavá M6
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 110;
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 1 THEN  //Pravá M6
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 130;    
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 2 THEN  //Lavá M4
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 150; 
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F = 3 THEN  //Pravá M4
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 170;  
                END_IF
            ELSIF P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5F THEN
                IF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 0 THEN  //Lavá M6
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 200;
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 1 THEN  //Pravá M6
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 220;    
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 2 THEN  //Lavá M4
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 240; 
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5F = 3 THEN  //Pravá M4
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 260;  
                END_IF
            ELSIF  P2_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                IF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 0 THEN  //Lavá M5
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 300;
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 1 THEN  //Pravá M5
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 320;    
                ELSIF P2_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 2 THEN  //Stredná M4
                    SC_P2_Srobovanie.ResetStep:= TRUE;
                    SC_P2_Srobovanie.Step:= 340; 
                END_IF
            END_IF      
        
        
        
        
        
        
    END_CASE    
            
            
            
            
            END_PROGRAM

PROGRAM _EXIT
            (* Insert code here *)
	 
            END_PROGRAM



PROGRAM _INIT
    P3_Srobovanie.PAR.OsY_JoggRychlost:= 5;
	 
    //Os Y - Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
    //    OsY_NovaHodnotaMomentu_POS := 1.5; //v Nm
    //    OsY_NovaHodnotaMomentu_NEG := 1.5; //v Nm
    //    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_9);
    //    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
    //    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
    //    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
    //    
    //    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
    //    McAcpAxProcessParIDType_0[0].ParID      := 248;
    //    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(OsY_NovaHodnotaMomentu_POS);
    //    
    //    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
    //    McAcpAxProcessParIDType_0[1].ParID      := 249;
    //    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(OsY_NovaHodnotaMomentu_NEG);
    //	
    //    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
    //    MC_BR_ProcessParID_AcpAx_0();
    
    
    
END_PROGRAM

PROGRAM _CYCLIC

	//*******************************Stav zásobník skrutiek K40 je prázdny********************//
    CasKontrolyZasobSkrutiek_K40.IN:= P3_Srobovanie.IN.ZasobSrobK40_PRAZDNY_IS79;
	
    IF CasKontrolyZasobSkrutiek_K40.Q THEN
        P3_Srobovanie.STAV.Zasobnik_K40_Prazdny:= TRUE;
        P3_Srobovanie.OUT.ZasobSrobK40_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P3_Srobovanie.STAV.Zasobnik_K40_Prazdny:= FALSE;
        P3_Srobovanie.OUT.ZasobSrobK40_Banner_CervenaLED:= FALSE;
    END_IF	
	
    CasKontrolyZasobSkrutiek_K40.PT:= T#10s;
    CasKontrolyZasobSkrutiek_K40();
	
    //*******************************Stav zásobník skrutiek M5 je prázdny********************//
    CasKontrolyZasobSkrutiek_M5.IN:= P3_Srobovanie.IN.ZasobSrobM5_PRAZDNY_IS83;
	
    IF CasKontrolyZasobSkrutiek_M5.Q THEN
        P3_Srobovanie.STAV.Zasobnik_M5_Prazdny:= TRUE;
        P3_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= Blikac500ms;
    ELSE
        P3_Srobovanie.STAV.Zasobnik_M5_Prazdny:= FALSE;
        P3_Srobovanie.OUT.ZasobSrobM5_Banner_CervenaLED:= FALSE;
    END_IF	
	
	
	
    CasKontrolyZasobSkrutiek_M5.PT:= T#10s;
    CasKontrolyZasobSkrutiek_M5();
	
	
	
	
	
    //Index paletky//
    i:= P3_StoperSrobovania.PAR.IndexPaletky;
    
    
    
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P3_Srobovanie);
	
    //Príznak šrobovaèky vo východzej pozícii//
    IF P3_Srobovanie.IN.SkrutkK40_ZASUNUTY_MS52 AND P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND P3_Srobovanie.IN.HVTest_ZASUNUTY_MS51 AND P3_Srobovanie.IN.HVTest_Kontakty_ZASUNUTE_MS44 THEN
        P3_Srobovacky_VychodziaPozicia:= TRUE;
    ELSE	
        P3_Srobovacky_VychodziaPozicia:= FALSE;
    END_IF	
	
	
	
	
    //Volanie podprogramov//
    OvlManipulatora_OsY;
    OvlKontaktovHV_Testu;
    OvlZdvihuHV_Testu;
    AtlasCopcoKomunikacia;
    OvlTestera;
	
    //Reset sekcie //
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        SC_P3_Srobovanie.Step:= 0;
    ELSIF P3_Srobovanie.Reset THEN
        SC_P3_Srobovanie.Step:= 0;
        P3_Srobovanie.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serv//
    IF EDGEPOS(P3_PoruchaST1) THEN
        OsY_STOP:= TRUE;
    ELSIF EDGEPOS(P3_Srobovanie.Reset) THEN
        OsY_STOP:= TRUE;
    END_IF	
		
    
	
    CASE SC_P3_Srobovanie.Step OF 
		
        0:
            SC_P3_Srobovanie.StepName:='0 - Nulovanie';
            SC_OvlManipulatora_OsY.Step:= 0;
            SC_OvlZdvihuHV_Testu.Step:= 0;
            SC_OvlKontaktovHV_Testu.Step:= 0;
            P3_Srobovanie.Automat:= FALSE;
            P3_Srobovanie.KoniecCyklu:= FALSE;
            P3_Srobovanie.Manual:= FALSE;
            P3_Srobovanie.STAV.PoINIT:= FALSE;
            P3_Srobovanie.OUT.SkrutkK40_VYSUN_YV118:= FALSE;
            P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
            P3_Srobovanie.OUT.SkrutkK40_PrisavSkrut_RUN_YV120:= FALSE;
            P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
            P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
            P3_Srobovanie.OUT.HVTest_PneuPruzinu_VYSUN_YV156:= FALSE;
            P3_Srobovanie.OUT.HVTest_PneuPruzinu_ZASUN_YV155:= TRUE;
            P3_Srobovanie.OUT.HVTest_PritlacKontTestera_YV140:= FALSE;
            IF NOT Triger_0 THEN
                P3_Srobovanie.SkrutkovaciSet_M5.Reset:= TRUE;
                P3_Srobovanie.SkrutkovaciSet_K40.Reset:= TRUE;
                Triger_0:= TRUE;
            END_IF	
            P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
            P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggLimit_ACTIVE:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_M5.Manual:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_M5.Automat:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_M5.UkoncenieCyklu:= FALSE;
            P3_Srobovanie.Skrutkovacka_M5.RESET_Poruchy:= FALSE;
            P3_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
            P3_Srobovanie.Skrutkovacka_M5.START_Skrutkovania:= FALSE;
            P3_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_K40.Automat:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_K40.Manual:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Odobrata:= FALSE;
            P3_Srobovanie.SkrutkovaciSet_K40.UkoncenieCyklu:= FALSE;
            P3_Srobovanie.Skrutkovacka_K40.RESET_Poruchy:= FALSE;
            P3_Srobovanie.Skrutkovacka_K40.RESET_Vysledkov:= FALSE;
            P3_Srobovanie.Skrutkovacka_K40.START_Skrutkovania:= FALSE;
            P3_Srobovanie.Skrutkovacka_K40.START_Utahovania:= FALSE;
            P3_Srobovanie.STAV.HV_Test_Otvoreny:= FALSE;
            P3_Srobovanie.STAV.HV_Test_Ukonceny:= FALSE;
            P3_Srobovanie.STAV.HV_Test_Zatvoreny:= FALSE;
            P3_Srobovanie.RR_HVTest_AktivujPruzinu:= FALSE;
            P3_Srobovanie.RR_SkrutkovackaK40_CISTENIE:= FALSE;
            P3_Srobovanie.STAV.Cistenie_K40_BUSY:= FALSE;
            P3_Srobovanie.RR_SkrutkovackuK40_VYSUN:= FALSE;
            P3_Srobovanie.RR_SkrutkovackuM5_VYSUN:= FALSE;
            P3_Srobovanie.RR_ZapniHrniec_K40:= FALSE;
            P3_Srobovanie.RR_ZapniHrniec_M5:= FALSE;
            P3_Srobovanie.RR_PodajSkrutkuM5:= FALSE;
            P3_Srobovanie.RR_PrisavanieSkrutkyM5:= FALSE;
            P3_Srobovanie.RR_ZapniVibrolistu_M5:= FALSE;
            P3_Srobovanie.RR_OtocPodavacM5_VPRED:= FALSE;
            P3_Srobovanie.RR_OtocPodavacM5_VZAD:= FALSE;
            P3_Srobovanie.RR_ZatvorTester:= FALSE;
            P3_Srobovanie.RR_OtvorTester:= FALSE;
            P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
            P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
            SkrutkovanieK40_Ukoncene:= FALSE;
            SkrutkovanieM5_Ukoncene:= FALSE;
            Skrutkovanie_VysledkyDONE:= FALSE;
            PocetVysunutiSkrutkovacky_M5:= 0; 
            
            HV_Test_START:= FALSE;
            HV_Test_UKONCENY:= FALSE;
            FazaNavratu:= 0;
									
            IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 AND P3_Pracovisko.STAV.ServaBunky_READY THEN
                Triger_0:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 1;
            END_IF
	
        1:
            SC_P3_Srobovanie.StepName:='1 - Cakam na spustenie vyroby';
            P3_Srobovanie.KoniecCyklu:= FALSE;
            IF P3_Srobovanie.Automat THEN
                SC_P3_Srobovanie.Step:= 2;
            ELSIF P3_Srobovanie.Manual THEN
                SC_P3_Srobovanie.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
	
	
        2:
            SC_P3_Srobovanie.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
            P3_Srobovanie.SkrutkovaciSet_M5.Automat:= TRUE;
            P3_Srobovanie.SkrutkovaciSet_K40.Automat:= TRUE;
            SC_P3_Srobovanie.IdleTime.IN:= TRUE;
									
            IF SC_P3_Srobovanie.IdleTime.Q THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 5;
            END_IF
	
        5:
            SC_P3_Srobovanie.StepName:='5 - Inicializacia - zasunutie kontaktov HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;	
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                Kontakty_ZASUN:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.HVTest_Kontakty_ZASUNUTE_MS44 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 8;
            END_IF
			
		
        8:
            SC_P3_Srobovanie.StepName:='8 - Inicializacia - zasunutie HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                HV_Test_ZASUN:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.HVTest_ZASUNUTY_MS51 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 10;
            END_IF
			
			
		
        10:
            SC_P3_Srobovanie.StepName:='10 - Inicializacia - kontrola homingu serva manipulatora os Y';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P3_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 12;
            ELSE
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 11;
            END_IF
		
		
        11:
            SC_P3_Srobovanie.StepName:='11 - Inicializacia - spustenie homingu serva manipulatora os Y';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_Srobovanie.Switch1 AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_HOME:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P3_Srobovanie.STAV.OsY_HomingOK THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 12;
            END_IF	
		
		
        12:
            SC_P3_Srobovanie.StepName:='12 - Inicializacia - presun osy Y do vychodiskovej pozicie';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
					
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 0;
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
				
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 20;
            END_IF	
	
	
        20:
            SC_P3_Srobovanie.StepName:='20 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky K40';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
					
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 82; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 22;
            END_IF
			
        22:
            SC_P3_Srobovanie.StepName:='22 - Inicializacia - zahodenie skrutky K40';
            SC_P3_Srobovanie.IdleTime.PT:= T#1s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.SkrutkovaciSet_K40.CistenieUkoncene AND P3_Srobovanie.IN.SkrutkK40_ZASUNUTY_MS52 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 25;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN	
                P34_Alarmy[328]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF    
            
        	
			
        25:
            SC_P3_Srobovanie.StepName:='25 - Inicializacia - presun manipulatora na poziciu zahodenia skrutky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 163; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 28;
            END_IF
			
        28:
            SC_P3_Srobovanie.StepName:='28 - Inicializacia - vypinam prisavanie skrutky M5 a vysuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#3s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P3_Srobovanie.IdleTime.IN:= NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57;
			
            
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND SC_P3_Srobovanie.IdleTime.Q AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 (*AND P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 > 2*) THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 29;
            END_IF
		
        29:
            SC_P3_Srobovanie.StepName:='29 - Inicializacia - posun manipulatora o 20 mm vpred';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 183; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= 100; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 30;
            END_IF
            
            
        30:
            SC_P3_Srobovanie.StepName:='30 - Inicializacia - zasuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 33;
            END_IF
			
		
            
        33:	
            SC_P3_Srobovanie.StepName:='33 - Inicializacia - napolohovanie skrutkovacky M5 na poziciu odobratia skrutky M5 z podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srobov_PozY_OdobratSkrutkyM5; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 35;
            END_IF			
		
        35:	
            SC_P3_Srobovanie.StepName:='35 - Inicializacia - kontrola skrutky M5 na vystupe podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P3_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS20 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 38;
                //            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN    
                //                P34_Alarmy[327]:= TRUE;
                //                P3_PoruchaST1:= TRUE;   
            END_IF	
				
        38:
            SC_P3_Srobovanie.StepName:='38 - Inicializacia - odobratie skrutky M5 z podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
	
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
			
            SC_P3_Srobovanie.IdleTime.IN:= P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29;
            
            IF SC_P3_Srobovanie.IdleTime.Q THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 40;
            END_IF	
			
		
        40:
            SC_P3_Srobovanie.StepName:='40 - Inicializacia - zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 43;
            END_IF		
		
        43:
            SC_P3_Srobovanie.StepName:='43 - Inicializacia - cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 45;
            END_IF	   
            
            
       	
			
        45:
            SC_P3_Srobovanie.StepName:='45 - Inicializacia - presun manipulatora do pozicie skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta AND P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Pripravena THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.STAV.PoINIT:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF
			
		
			
			
	
            //********************************************************Automatický režim****************************************************************************//
	
	
        100:  
            SC_P3_Srobovanie.StepName:='100 - Automaticky Rezim - cakam na spustenie cinnosti';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;			
	
            IF P3_Srobovanie.KoniecCyklu AND NOT P3_StoperSrobovania.Automat THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 0;
            ELSIF P3_StoperSrobovania.OUT.KOM_Presun_PozFotenia THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 110;
            ELSIF P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 130;
            ELSIF P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5 THEN    
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 150;
            ELSIF P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 170;
            ELSIF P3_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutku THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 200;
            ELSIF P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 300;
            ELSIF P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 400;
            ELSIF P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 420;	
            END_IF	
			
		
            
            
            //***************************************************************Presun na pozíciu fotenia************************************************************************************//    
            
          	
			
        110:
            SC_P3_Srobovanie.StepName:='110 - Automaticky Rezim - napolohovanie manipulatora na poziciu fotenia';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
					
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
						
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 115;
            END_IF	
			
        115:
            SC_P3_Srobovanie.StepName:='115 - Automaticky Rezim - cakam na zrusenie signalu presun na poziciu fotenia';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_Presun_PozFotenia THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF		
		
            
            
            //*****************************************************************Odobratie skrutky M5 z podavaèa*************************************************************************//   
            
        130:	
            SC_P3_Srobovanie.StepName:='130 - Automaticky Rezim - napolohovanie skrutkovacky M5 na poziciu odobratia sroby M5 zo zasobnika';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srobov_PozY_OdobratSkrutkyM5; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700; 
                ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700;    
                ELSE   
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 132;
                END_IF
            END_IF			
		
        132:	
            SC_P3_Srobovanie.StepName:='132 - Automaticky Rezim - kontrola skrutky M5 na vystupe podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P3_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS20 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 133;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN    
                P34_Alarmy[327]:= TRUE;
                P3_PoruchaST1:= TRUE;     
            END_IF	
				
        133:
            SC_P3_Srobovanie.StepName:='133 - Automaticky Rezim - odobratie skrutky M5 z podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
	
            IF NOT SC_P3_Srobovanie.Switch1 AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
			
            SC_P3_Srobovanie.IdleTime.IN:= P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29;
            
            IF P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 134;
            END_IF	
			
		
        134:
            SC_P3_Srobovanie.StepName:='134 - Automaticky Rezim - zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 135;
            END_IF		
		
        135:
            SC_P3_Srobovanie.StepName:='135 - Automaticky Rezim - cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 136;
            END_IF	
			
			
			
        136:
            SC_P3_Srobovanie.StepName:='136 - Automaticky Rezim - napolohovanie na poziciu skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
           			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 140;
            END_IF
            
            
        140:
            SC_P3_Srobovanie.StepName:='140 - Automaticky Rezim - cakam na zrusenie signalu odober skrutku M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_Odober_SkrutkuM5 THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF
            
            
            //***********************************************Zahodenie skrutky M5***************************************************************************//   
            
        150:
            SC_P3_Srobovanie.StepName:='150 - Automaticky Rezim - presun manipulatora na poziciu zahodenia skrutky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 163; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 153;
            END_IF
			
        153:
            SC_P3_Srobovanie.StepName:='153 - Automaticky Rezim - vypinam prisavanie skrutky M5 a vysuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P3_Srobovanie.IdleTime.IN:= NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND SC_P3_Srobovanie.IdleTime.Q AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 (*AND P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 > 2*) THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 154;
            END_IF
		
        154:
            SC_P3_Srobovanie.StepName:='154 - Automaticky Rezim - presun manipulatora o 200mm vpred';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 183; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= 100; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 155;
            END_IF
            
            
            
        155:
            SC_P3_Srobovanie.StepName:='155 - Automaticky Rezim - zasuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 158;
            END_IF    
           
            
            
        158:
            SC_P3_Srobovanie.StepName:='158 - Automaticky Rezim - napolohovanie skrutkovacky M5 na poziciu odobratia sroby M5 zo zasobnika';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srobov_PozY_OdobratSkrutkyM5; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 160;
            END_IF	
           
            
            
        160:
            SC_P3_Srobovanie.StepName:='160 - Automaticky Rezim - cakam na zrusenie signalu zahod skrutku M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_Zahod_SkrutkuM5 THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF
            
            
            
            
            //*******************************************Model 4F a 5F zašrobuj skrutky**************************************************//      
            //Skrutkovanie skrutky K40 a skrutky M5//      
        
        170:
            SC_P3_Srobovanie.StepName:='170 - Automaticky Rezim - napolohovanie na poziciu skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
           			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700; 
                ELSE
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 172;
                END_IF
            END_IF
               
        
        172:
            SC_P3_Srobovanie.StepName:='172 - Automaticky Rezim - model 4F_5F, vymazanie vysledkov srobovania skrutkovaciek';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.Skrutkovacka_K40.RESET_Vysledkov:= TRUE;
                P3_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_NG AND
                NOT P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_OK AND
                NOT P3_Srobovanie.Skrutkovacka_K40.Stav_UtahovanieUkoncene AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P3_Srobovanie.Skrutkovacka_K40.RESET_Vysledkov:= FALSE;
                P3_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 173;
            END_IF	
        
            
        173:
            SC_P3_Srobovanie.StepName:='173 - Automaticky Rezim - model 4F_5F, kontrola stavu skrutkovaciek';
            SC_P3_Srobovanie.IdleTime.PT:= T#5s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            
            IF P3_Srobovanie.Skrutkovacka_K40.Stav_READY_to_START AND P3_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 175;
            ELSE
                IF NOT P3_Srobovanie.Skrutkovacka_K40.Stav_READY_to_START THEN
                    P34_Alarmy[344]:= TRUE;
                    P3_PoruchaST1:= TRUE; 
                END_IF
                IF NOT P3_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                    P34_Alarmy[345]:= TRUE;
                    P3_PoruchaST1:= TRUE;
                END_IF
            END_IF    
            
         
        175:
            SC_P3_Srobovanie.StepName:='175 - Automaticky Rezim - model 4F_5F, kontrola skrutky K40 a M5 v skrutkovackach';
            SC_P3_Srobovanie.IdleTime.PT:= T#5s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Pripravena AND P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 178;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN    
                IF NOT P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Pripravena THEN
                    FazaNavratu:= 175;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 500;
                ELSIF NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                    FazaNavratu:= 175;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 600;
                END_IF
            END_IF	
            
            
        178:
            SC_P3_Srobovanie.StepName:='178 - Automaticky Rezim - model 4F_5F, vysunutie skrutkovacky K40 a M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
            
            IF P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOS11 < 1 THEN
                SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
            ELSIF P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 < 1 THEN
                SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
            ELSE
                SC_P3_Srobovanie.AlarmTime.IN:= FALSE;
            END_IF    
			           
            
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkK40_PrisavSkrut_RUN_YV120:= TRUE;
                P3_Srobovanie.OUT.SkrutkK40_VYSUN_YV118:= TRUE;
                P3_Srobovanie.Skrutkovacka_K40.START_Utahovania:= TRUE;
                P3_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
               
			
            IF NOT P3_Srobovanie.Skrutkovacka_K40.Stav_UtahovanieUkoncene AND P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOS11 > 1 AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 > 1 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 180;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN
                IF P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOS11 < 1 THEN
                    P34_Alarmy[342]:= TRUE;
                    P3_PoruchaST1:= TRUE;
                END_IF
                IF P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 < 1 THEN
                    P34_Alarmy[343]:= TRUE;
                    P3_PoruchaST1:= TRUE;
                END_IF    
            END_IF
            
        180:
            SC_P3_Srobovanie.StepName:='180 - Automaticky Rezim - model 4F_5F, cakam na ukoncenie skrutkovania skrutkovacky K40 a M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#30s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.IdleTime.IN:= TRUE;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF EDGEPOS(P3_Srobovanie.Skrutkovacka_K40.Stav_UtahovanieUkoncene) THEN
                P3_Srobovanie.Skrutkovacka_K40.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P3_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaK40:= REAL_TO_STRING(P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOS11);
                Reports.Skrutkovacky.CasSkrutkovania.P3_SkrutkaK40:= REAL_TO_STRING(CasSrobovania/1000);
                SkrutkovanieK40_Ukoncene:= TRUE;
            END_IF
            IF EDGEPOS(P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene) THEN
                P3_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P3_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12);
                Reports.Skrutkovacky.CasSkrutkovania.P3_SkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SkrutkovanieM5_Ukoncene:= TRUE;
            END_IF    
            
            IF SkrutkovanieK40_Ukoncene AND SkrutkovanieM5_Ukoncene THEN
                SkrutkovanieK40_Ukoncene:= FALSE;
                SkrutkovanieM5_Ukoncene:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 183;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN
                IF NOT P3_Srobovanie.Skrutkovacka_K40.Stav_UtahovanieUkoncene THEN
                    P34_Alarmy[346]:= TRUE;
                    P3_PoruchaST1:= TRUE;
                END_IF
                IF NOT P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                    P34_Alarmy[347]:= TRUE;
                    P3_PoruchaST1:= TRUE;
                END_IF
            END_IF
        
        183:
            SC_P3_Srobovanie.StepName:='183 - Automaticky Rezim - model 4F_5F, zasunutie skrutkovacky K40 a skrutkovacky M5 a vypnutie prisavania skrutiek';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkK40_VYSUN_YV118:= FALSE;
                P3_Srobovanie.OUT.SkrutkK40_PrisavSkrut_RUN_YV120:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkK40_ZASUNUTY_MS52 AND P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 185;
            END_IF
            
      
        185:
            SC_P3_Srobovanie.StepName:='185 - Automaticky Rezim - model 4F_5F, signal skrutka K40 odobrata';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Odobrata:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Pripravena THEN
                P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Odobrata:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 188;
            END_IF
            
            
        188:
            SC_P3_Srobovanie.StepName:='188 - Automaticky Rezim - model 4F_5F, kontrola vysledkov skrutkovania skrutky K40 a skrutky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            
            IF P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_OK AND P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'PASS';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                Skrutkovanie_VysledkyDONE:= TRUE;
            ELSIF P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_NG AND P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                Skrutkovanie_VysledkyDONE:= TRUE;
            ELSIF P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_OK AND P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'PASS';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                Skrutkovanie_VysledkyDONE:= TRUE;
            ELSIF P3_Srobovanie.Skrutkovacka_K40.Stav_VysledokUtahovania_NG AND P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaK40:= 'FAIL';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                Skrutkovanie_VysledkyDONE:= TRUE;
            END_IF	
                        
                        
            
            IF Skrutkovanie_VysledkyDONE THEN
                Skrutkovanie_VysledkyDONE:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 190;
            END_IF
            
        190:
            SC_P3_Srobovanie.StepName:='160 - Automaticky Rezim - model 4F_5F cakam na zrusenie signalu zaskrutkuj skrutky';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_4F5F_ZasrobujSkrutky THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF
            
            
           
            
            //*******************************************Model 5H zašrobuj skrutku**************************************************//      
            //Skrutkovanie skrutky M5//      
       
        200:
            SC_P3_Srobovanie.StepName:='200 - Automaticky Rezim - napolohovanie na poziciu skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
           			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700; 
                ELSE
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 202;
                END_IF
            END_IF
       
       
       
       
       
       
        202:
            SC_P3_Srobovanie.StepName:='202 - Automaticky Rezim - model 5H, vymazanie vysledkov srobovania skrutkovacky';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK AND
                NOT P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene THEN
                P3_Srobovanie.Skrutkovacka_M5.RESET_Vysledkov:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 203;
            END_IF	
        
            
        203:
            SC_P3_Srobovanie.StepName:='203 - Automaticky Rezim - model 5H, kontrola stavu skrutkovacky';
            SC_P3_Srobovanie.IdleTime.PT:= T#5s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            
            IF P3_Srobovanie.Skrutkovacka_M5.Stav_READY_to_START THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 205;
            ELSE
                P34_Alarmy[345]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF
          
            
         
        205:
            SC_P3_Srobovanie.StepName:='205 - Automaticky Rezim - model 5H, kontrola skrutky M5 v skrutkovacke';
            SC_P3_Srobovanie.IdleTime.PT:= T#5s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
		
            IF P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 208;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN    
                FazaNavratu:= 205;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 600;
            END_IF
           
            
            
        208:
            SC_P3_Srobovanie.StepName:='208 - Automaticky Rezim - model 5H, vysunutie skrutkovacky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
            
            
            IF P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 < 1 THEN
                SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
            ELSE
                SC_P3_Srobovanie.AlarmTime.IN:= FALSE;
            END_IF    
			           
            
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.Skrutkovacka_M5.START_Utahovania:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
               
			
            IF NOT P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene AND P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 > 1 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 210;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN
                P34_Alarmy[343]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF    
         
            
        210:
            SC_P3_Srobovanie.StepName:='210 - Automaticky Rezim - model 5H, cakam na ukoncenie skrutkovania skrutkovacky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#30s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.IdleTime.IN:= TRUE;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
           
            IF EDGEPOS(P3_Srobovanie.Skrutkovacka_M5.Stav_UtahovanieUkoncene) THEN
                P3_Srobovanie.Skrutkovacka_M5.START_Utahovania:= FALSE;
                CasSrobovania:= TIME_TO_REAL(SC_P3_Srobovanie.IdleTime.ET);
                Reports.Skrutkovacky.VyskaSkrutkovania.P3_SkrutkaM5:= REAL_TO_STRING(P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12);
                Reports.Skrutkovacky.CasSkrutkovania.P3_SkrutkaM5:= REAL_TO_STRING(CasSrobovania/1000);
                SkrutkovanieM5_Ukoncene:= TRUE;
            END_IF    
            
            IF SkrutkovanieM5_Ukoncene THEN
                SkrutkovanieM5_Ukoncene:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 213;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN
                P34_Alarmy[347]:= TRUE;
                P3_PoruchaST1:= TRUE;
            END_IF
          
        
        213:
            SC_P3_Srobovanie.StepName:='213 - Automaticky Rezim - model 5H, zasunutie skrutkovacky M5 a vypnutie prisavania skrutiek';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 215;
            END_IF
            
      
            
        215:
            SC_P3_Srobovanie.StepName:='215 - Automaticky Rezim - model 5H, kontrola vysledkov skrutkovania skrutky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
                        
            
            
                                    
            IF P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_OK THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'OK';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'PASS';
                Skrutkovanie_VysledkyDONE:= TRUE;
            ELSIF P3_Srobovanie.Skrutkovacka_M5.Stav_VysledokUtahovania_NG THEN
                P3_Srobovanie.STAV.Vysledok_Srobovania:= 'NG';
                Reports.Skrutkovacky.VyslednyReport.P3_SkrutkaM5:= 'FAIL';
                Skrutkovanie_VysledkyDONE:= TRUE;          
            END_IF
            
            
            IF Skrutkovanie_VysledkyDONE THEN
                Skrutkovanie_VysledkyDONE:= FALSE;  
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 220;
            END_IF
            
        220:
            SC_P3_Srobovanie.StepName:='220 - Automaticky Rezim - model 5H cakam na zrusenie signalu zaskrutkuj skrutku M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_5H_ZasrobujSkrutku THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF
            
                   
            
      
	
            //**********************************************************************HV test*******************************************************************************************//
		
        300:	
            SC_P3_Srobovanie.StepName:='300 - Automaticky Rezim - HV test, napolohovanie na poziciu HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srobov_PozY_HV_Test; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                IF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700; 
                ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H:= FALSE;
                    P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F:= FALSE;
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 700;     
                ELSE
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 302;
                END_IF
            END_IF	
		
        302:
            SC_P3_Srobovanie.StepName:='302 - Automaticky Rezim - HV test, aktivacia pneumatickej pruziny';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            P3_Srobovanie.OUT.HVTest_PneuPruzinu_ZASUN_YV155:= FALSE;
            P3_Srobovanie.OUT.HVTest_PneuPruzinu_VYSUN_YV156:= TRUE;
            SC_P3_Srobovanie.ResetStep:= TRUE;
            SC_P3_Srobovanie.Step:= 305;
            
		
        305:
            SC_P3_Srobovanie.StepName:='305 - Automaticky Rezim - HV test, vysunutie HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            
            HV_Test_VYSUN:= TRUE;
            SC_P3_Srobovanie.ResetStep:= TRUE;
            SC_P3_Srobovanie.Step:= 308;
           
		
        308:
            SC_P3_Srobovanie.StepName:='308 - Automaticky Rezim - HV test, vysunutie spodnych kontaktov';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                Kontakty_VYSUN:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P3_Srobovanie.IN.HVTest_Kontakty_VYSUNUTE_MS45 AND P3_Srobovanie.IN.HVTest_VYSUNUTY_MS50 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 310;
            END_IF
		
        310:
            SC_P3_Srobovanie.StepName:='310 - Automaticky Rezim - HV test, pritlacenie kontaktov testera';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.HVTest_PritlacKontTestera_YV140:= TRUE;
                P3_Srobovanie.STAV.HV_Test_Zatvoreny:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
		            
            IF NOT P3_StoperSrobovania.OUT.KOM_Zatvor_HV_Test AND NOT TEST THEN
                P3_Srobovanie.STAV.HV_Test_Zatvoreny:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 320;
            END_IF    
		
        320:
            SC_P3_Srobovanie.StepName:='320 - Automaticky Rezim - HV test, rozhodnutie o testovani';
            SC_P3_Srobovanie.IdleTime.PT:= T#3s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF P3_StoperSrobovania.OUT.KOM_Urob_HV_Test THEN
                HV_Test_UKONCENY:= FALSE;
                HV_Test_START:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 323;
            ELSIF P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 330;
            END_IF    
        
        323:
            SC_P3_Srobovanie.StepName:='323 - Automaticky Rezim - cakam na ukoncenie HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#3s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
            
            IF HV_Test_UKONCENY THEN
                HV_Test_START:= FALSE;
                P3_Srobovanie.STAV.HV_Test_Ukonceny:= TRUE;
            END_IF    
           	
            IF NOT P3_StoperSrobovania.OUT.KOM_Urob_HV_Test THEN
                P3_Srobovanie.STAV.HV_Test_Ukonceny:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 320;
            END_IF    
            
            
            

        330:
            SC_P3_Srobovanie.StepName:='330 - Automaticky Rezim - HV test, zasunutie spodnych kontaktov';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            
            Kontakty_ZASUN:= TRUE;
            P3_Srobovanie.OUT.HVTest_PritlacKontTestera_YV140:= FALSE;
            SC_P3_Srobovanie.ResetStep:= TRUE;
            SC_P3_Srobovanie.Step:= 333;
            
		
		
        333:
            SC_P3_Srobovanie.StepName:='333 - Automaticky Rezim - HV test, zasunutie HV testu';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                HV_Test_ZASUN:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		
            IF P3_Srobovanie.IN.HVTest_ZASUNUTY_MS51 AND P3_Srobovanie.IN.HVTest_Kontakty_ZASUNUTE_MS44 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 335;
            END_IF
		
        335:
            SC_P3_Srobovanie.StepName:='335 - Automaticky Rezim - HV test, vypnutie pneumatickej pruziny';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_VYSUN_YV156:= FALSE;
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_ZASUN_YV155:= TRUE;
                P3_Srobovanie.STAV.HV_Test_Otvoreny:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
		            
            IF NOT P3_StoperSrobovania.OUT.KOM_Otvor_HV_Test THEN
                P3_Srobovanie.STAV.HV_Test_Otvoreny:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF    
            
	
            
            
            
		
            //************************************************Presun manipulátora do pozície VPRED********************************************************************//		
		
        400:
            SC_P3_Srobovanie.StepName:='400 - Automaticky Rezim - napolohovanie manipulatora do prednej pozicie';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 298; 
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 402;
            END_IF	
			
        402:
            SC_P3_Srobovanie.StepName:='402 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do prednej pozicie';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOPREDU THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF			
			
			
			
            //*************************************************Presun manipulatora do pozicie VZAD*****************************************************************//		
			
        420:
            SC_P3_Srobovanie.StepName:='420 - Automaticky Rezim - napolohovanie manipulatora do zadnej pozicie';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
					
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 0; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
						
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 422;
            END_IF	
			
        422:
            SC_P3_Srobovanie.StepName:='422 - Automaticky Rezim - cakam na zrusenie signalu presun manipulatora do zadnej pozicie';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_StoperSrobovania.OUT.KOM_PresunManipulator_DOZADU THEN
                P3_Srobovanie.OUT.KOM_Cinnost_Ukoncena:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 100;
            END_IF		
		

			
            //**********************************************************Èistenie skrutkovaèiek*****************************************************************//		
            //Èistenie skrutkovaèky K40//
        500:
            SC_P3_Srobovanie.StepName:='500 - Automaticky Rezim - cistenie skrutkovacky K40';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
					
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 82; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Odobrata:= FALSE;
                P3_Srobovanie.SkrutkovaciSet_K40.Automat:= TRUE;
                P3_Srobovanie.SkrutkovaciSet_K40.Reset:= TRUE;
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
						
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 503;
            END_IF
			
        503:
            SC_P3_Srobovanie.StepName:='503 - Automaticky Rezim - zahodenie skrutky K40';
            SC_P3_Srobovanie.IdleTime.PT:= T#1s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#30s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.SkrutkovaciSet_K40.CistenieUkoncene AND P3_Srobovanie.IN.SkrutkK40_ZASUNUTY_MS52 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= FALSE;
            END_IF		
					
            IF NOT P3_Srobovanie.SkrutkovaciSet_K40.Cistenie AND P3_Srobovanie.SkrutkovaciSet_K40.SkrutkaK40_Pripravena AND SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.STAV.Cistenie_K40_BUSY:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 508;
            ELSIF SC_P3_Srobovanie.IdleTime.Q THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 505;	
            END_IF
            
        
            
			
        505:
            SC_P3_Srobovanie.StepName:='505 - Automaticky Rezim - cakam na opatovne spustenie cistenia skrutkovacky K40';
            SC_P3_Srobovanie.IdleTime.PT:= T#2s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#30s;
			
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.SkrutkovaciSet_K40.Reset:= TRUE;
                P3_Srobovanie.SkrutkovaciSet_K40.Cistenie:= FALSE;
                SC_P3_Srobovanie.IdleTime.IN:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF SC_P3_Srobovanie.IdleTime.Q THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 503;
            END_IF		
			
        508:
            SC_P3_Srobovanie.StepName:='508 - Automaticky Rezim - presun manipulatora do pozicie skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= FazaNavratu;
            END_IF
			
            
            
            
            
            
            //Èistenie skrutkovaèky M5//
        600:
            SC_P3_Srobovanie.StepName:='600 - Automaticky Rezim - presun manipulatora na poziciu zahodenia skrutky M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= 163; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
				
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 603;
            END_IF
			
        603:
            SC_P3_Srobovanie.StepName:='603 - Automaticky Rezim - vypinam prisavanie skrutky M5 a vysuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#1s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            SC_P3_Srobovanie.IdleTime.IN:= NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF NOT P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND SC_P3_Srobovanie.IdleTime.Q AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 (*AND P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12 > 2*) THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 605;
            END_IF
			
        605:
            SC_P3_Srobovanie.StepName:='605 - Automaticky Rezim - zasuvam skrutkovac M5';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND NOT P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 608;
            END_IF
			
		
            
        608:	
            SC_P3_Srobovanie.StepName:='608 - Automaticky Rezim - napolohovanie skrutkovacky M5 na poziciu odobratia skrutky M5 z podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
						
            P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srobov_PozY_OdobratSkrutkyM5; //mm
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 610;
            END_IF			
		
        610:	
            SC_P3_Srobovanie.StepName:='610 - Automaticky Rezim - kontrola skrutky M5 na vystupe podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#10s;
            SC_P3_Srobovanie.AlarmTime.IN:= TRUE;
			
            IF P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena AND P3_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS20 THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 613;
            ELSIF SC_P3_Srobovanie.AlarmTime.Q THEN    
                P34_Alarmy[327]:= TRUE;
                P3_PoruchaST1:= TRUE;   
            END_IF	
				
        613:
            SC_P3_Srobovanie.StepName:='613 - Automaticky Rezim - odobratie skrutky M5 z podavaca';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
	
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= TRUE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF	
			
            SC_P3_Srobovanie.IdleTime.IN:= P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29;
            
            IF SC_P3_Srobovanie.IdleTime.Q THEN
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 615;
            END_IF	
			
		
        615:
            SC_P3_Srobovanie.StepName:='615 - Automaticky Rezim - zasunutie skrutkovacky M5, vystavenie signalu skrutka odobrata';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
					
            IF NOT SC_P3_Srobovanie.Switch1 THEN
                P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= FALSE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
            IF P3_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS57 AND P3_Srobovanie.IN.SkrutkM5_SnimacVakua_S29 THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= TRUE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 618;
            END_IF		
		
        618:
            SC_P3_Srobovanie.StepName:='618 - Automaticky Rezim - cakam na zrusenie signalu skrutka M5 pripravena';
            SC_P3_Srobovanie.IdleTime.PT:= T#200ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF NOT P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena THEN
                P3_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 620;
            END_IF	   
            
            
       	
			
        620:
            SC_P3_Srobovanie.StepName:='620 - Automaticky Rezim - presun manipulatora do pozicie skrutkovania';
            SC_P3_Srobovanie.IdleTime.PT:= T#300ms;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
			
            IF Linka.PAR.ZvolenyModel = '4F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob4F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5F_PozY_Skrutkovanie;
            ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
                P3_Srobovanie.PAR.OsY_ZadanaPozicia:= P34_RemPremenne.P3_Srob5H_PozY_Skrutkovanie;
            END_IF    
            P3_Srobovanie.ServoManipulOsY_M37.PAR.Velocity:= P34_RemPremenne.P3_ManipSrob_OsY_Rychlost; 
			
			
            IF NOT SC_P3_Srobovanie.Switch1 AND SC_OvlManipulatora_OsY.Step = 1 AND P3_Srobovacky_VychodziaPozicia AND Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
                OsY_POLOHUJ:= TRUE;
                SC_P3_Srobovanie.Switch1:= TRUE;
            END_IF
			
							
            IF P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta THEN
                P3_Srobovanie.STAV.OsY_PoziciaDosiahnuta:= FALSE;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= FazaNavratu;
            END_IF
			
            
            
            
            
            
            
			
		
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P3_Srobovanie.StepName:='700 - Manualny Rezim';
            SC_P3_Srobovanie.IdleTime.PT:= T#8s;
            SC_P3_Srobovanie.AlarmTime.PT:= T#5s;
		
            P3_Srobovanie.ServoManipulOsY_M37.PAR.JoggAcceleration:= (P3_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P3_Srobovanie.ServoManipulOsY_M37.PAR.JoggDeceleration:= (P3_Srobovanie.PAR.OsY_JoggRychlost * 10);
            P3_Srobovanie.ServoManipulOsY_M37.PAR.JoggVelocity:= P3_Srobovanie.PAR.OsY_JoggRychlost;
            P3_Srobovanie.ServoManipulOsY_M37.PAR.JoggPoziciaLimitVPRED:= 290.0;
            P3_Srobovanie.ServoManipulOsY_M37.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P3_Srobovanie.ServoManipulOsY_M37.CMD.JoggLimit_ACTIVE:= TRUE;
		
		
		
            //Ovládanie vysunutia skrutkovaèky K40//
            P3_Srobovanie.OUT.SkrutkK40_VYSUN_YV118:= P3_Srobovanie.RR_SkrutkovackuK40_VYSUN;
            
            
            //Ovládanie vysunutia skrutkovaèky M5//
            P3_Srobovanie.OUT.SkrutkM5_VYSUN_YV129:= P3_Srobovanie.RR_SkrutkovackuM5_VYSUN;
            
            
            //Ovládanie vysunutia pneumatickej pružiny HV Testu//
            IF P3_Srobovanie.RR_HVTest_AktivujPruzinu THEN
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_ZASUN_YV155:= FALSE;
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_VYSUN_YV156:= TRUE;
            ELSE
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_VYSUN_YV156:= FALSE;
                P3_Srobovanie.OUT.HVTest_PneuPruzinu_ZASUN_YV155:= TRUE;
            END_IF    
            
            
        
            //Spustenie èistenia skrutkovaèiek//
            IF P3_Srobovanie.RR_SkrutkovackaK40_CISTENIE THEN
                P3_Srobovanie.RR_SkrutkovackaK40_CISTENIE:= FALSE;
                P3_Srobovanie.STAV.Cistenie_K40_BUSY:= TRUE;
                FazaNavratu:= 700;
                SC_P3_Srobovanie.ResetStep:= TRUE;
                SC_P3_Srobovanie.Step:= 500;
            END_IF    
                
        
            //Prisávanie skrutky M5//
            IF P3_Srobovanie.RR_PrisavanieSkrutkyM5 THEN
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= TRUE;
            ELSE
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_ZAPNI_YV130:= FALSE;
                P3_Srobovanie.OUT.SkrutkM5_PrisavSkrut_VYPNI_YV131:= TRUE;
            END_IF   
        
        
        
            //Polohovanie na pozície skrutiek//
            IF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_4F5F THEN
                IF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F5F = 0 THEN  //Pozícia skrutky K40 a M5
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 170;
                ELSIF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F5F = 1 THEN  //Pozícia odobratia skrutky M5
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 130;    
                ELSIF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_4F5F = 2 THEN  //Pozícia HV testu
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 300; 
                END_IF
            ELSIF P3_Srobovanie.RR_PolohujNaPoziciuSkrutky_5H THEN
                IF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 0 THEN  //Pozícia skrutky M5
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 200;
                ELSIF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 1 THEN  //Pozícia odobratia skrutky M5
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 130;    
                ELSIF P3_Srobovanie.PAR.RR_IndexPozicieSkrutky_5H = 2 THEN  //Pozícia HV testu
                    SC_P3_Srobovanie.ResetStep:= TRUE;
                    SC_P3_Srobovanie.Step:= 300; 
                END_IF
            END_IF    
        
        
        
        
		
		
    END_CASE
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


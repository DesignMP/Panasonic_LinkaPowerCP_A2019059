
PROGRAM _INIT
    Triger_0:= FALSE;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P1_Robot);
	
    //Volanie podprogramov//
    IOLinkKomunikacia;
    ProfinetKomunikaciaRobot;
	
	
	
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_P1_Robot.Step:= 0;
    ELSIF P1_PoruchaST2 THEN
        SC_P1_Robot.Step:= 0;
    ELSIF P1_Robot.Reset THEN
        SC_P1_Robot.Step:= 0;
        P1_Robot.Reset:= FALSE;
    END_IF
	
    IF NOT Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN
        Triger_0:= TRUE; 
        SC_P1_Robot.Step:= 0;
    END_IF
    
    IF Safety.STAV.P1_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF    
	
    CASE SC_P1_Robot.Step OF 
	
        0:
            SC_P1_Robot.StepName:='0 - Nulovanie';
            P1_Robot.Automat:= FALSE;
            P1_Robot.KoniecCyklu:= FALSE;
            P1_Robot.Manual:= FALSE;
            P1_Robot.Reset:= FALSE;
            P1_Robot.STAV.PoINIT:= FALSE;
            P1_Robot.KOM_OUT.Odparkovanie:= FALSE;
            P1_Robot.KOM_OUT.PP_na_Main:= FALSE;
            P1_Robot.KOM_OUT.Reset_CS:= FALSE;
            P1_Robot.KOM_OUT.StartProgramu:= FALSE;
            P1_Robot.KOM_OUT.StartProgramuMain:= FALSE;
            P1_Robot.KOM_OUT.VypniMotory:= FALSE;
            P1_Robot.KOM_OUT.ZapniMotory:= FALSE;
            IF P1_Robot.KOM_IN.Stav_RezimAUTOMAT AND P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Robot.KOM_OUT.StopProgramu:= TRUE;
            ELSE	
                P1_Robot.KOM_OUT.StopProgramu:= FALSE;
            END_IF	
            IF Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P1_ZonaBunky_AKTIVNA AND NOT P1_Pracovisko.STAV.PORUCHA AND P1_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S18 AND NOT P1_Robot.KOM_IN.Stav_ProgramRUN THEN
                P1_Robot.KOM_OUT.StopProgramu:= FALSE;
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 1;
            END_IF
	
        1:
            SC_P1_Robot.StepName:='1 - Cakam na spustenie vyroby';
            P1_Robot.KoniecCyklu:= FALSE;
            IF P1_Robot.Automat THEN
                SC_P1_Robot.Step:= 2;
            ELSIF P1_Robot.Manual THEN
                SC_P1_Robot.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
	 
		
        2:
            SC_P1_Robot.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P1_Robot.IdleTime.PT:= T#500ms;
            SC_P1_Robot.AlarmTime.PT:= T#5s;
			
            SC_P1_Robot.IdleTime.IN:= TRUE;
									
            IF SC_P1_Robot.IdleTime.Q THEN
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 3;
            END_IF
			
        3:
            SC_P1_Robot.StepName:='2 - Inicializacia - kontrolujem central stop robota';
            SC_P1_Robot.IdleTime.PT:= T#500ms;
            SC_P1_Robot.AlarmTime.PT:= T#5s;
	
            IF P1_Robot.KOM_IN.Stav_RobotCS THEN
                P1_Robot.KOM_OUT.Reset_CS:= TRUE;
            END_IF
		
            IF NOT P1_Robot.KOM_IN.Stav_RobotCS THEN
                P1_Robot.KOM_OUT.Reset_CS:= FALSE;
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 4;
            END_IF
		
		
        4:
            SC_P1_Robot.StepName:='4 - Inicializacia - zapinam motory robota';
            SC_P1_Robot.IdleTime.PT:= T#500ms;
            SC_P1_Robot.AlarmTime.PT:= T#5s;
			
            IF NOT P1_Robot.KOM_IN.Stav_MotoryON THEN
                P1_Robot.KOM_OUT.ZapniMotory:= TRUE;
            END_IF
			
            IF P1_Robot.KOM_IN.Stav_MotoryON THEN
                P1_Robot.KOM_OUT.ZapniMotory:= FALSE;
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 6;
            END_IF
			
			
        6:
            SC_P1_Robot.StepName:='6 - Inicializacia - spustam program robota od zaciatku';
            SC_P1_Robot.IdleTime.PT:= T#500ms;
            SC_P1_Robot.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P1_Robot.Switch1 THEN
                P1_Robot.KOM_OUT.StartProgramuMain:= TRUE;
                SC_P1_Robot.Switch1:= TRUE;
            END_IF
			
            IF P1_Robot.KOM_IN.Stav_ProgramRUN AND P1_Robot.KOM_IN.Stav_VystupyZresetovane THEN
                P1_Robot.KOM_OUT.StartProgramuMain:= FALSE;
                P1_Robot.STAV.PoINIT:= TRUE;
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 100;
            END_IF	
			
			
		
            //********************************************************Automatický režim****************************************************************************//
				
        100:  
            SC_P1_Robot.StepName:='100 - Automaticky Rezim - cakam na ukoncenie programu robota';
            SC_P1_Robot.IdleTime.PT:= T#200ms;
            SC_P1_Robot.AlarmTime.PT:= T#5s;		
			
			
            IF P1_Robot.KoniecCyklu AND NOT P1_StoperSrobovania.Automat THEN
                SC_P1_Robot.ResetStep:= TRUE;
                SC_P1_Robot.Step:= 0;
            END_IF	
			
			

		
		
		
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
            SC_P1_Robot.StepName:='700 - Manualny Rezim';
            SC_P1_Robot.IdleTime.PT:= T#8s;
            SC_P1_Robot.AlarmTime.PT:= T#5s;
		
		
		
		
    END_CASE	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


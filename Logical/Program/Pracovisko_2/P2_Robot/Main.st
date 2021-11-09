
PROGRAM _INIT
	Triger_0:= FALSE;
	 
END_PROGRAM

PROGRAM _CYCLIC

	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P2_Robot);
	
	//Volanie podprogramov//
	IOLinkKomunikacia;
	ProfinetKomunikaciaRobot;
	
	
	
	//Reset sekcie //
	IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
		SC_P2_Robot.Step:= 0;
	ELSIF P2_PoruchaST3 AND NOT P2_StoperSrobovania.Automat AND NOT P2_StoperZvarania.Automat THEN
		SC_P2_Robot.Step:= 0;
	ELSIF P2_PoruchaST4 AND NOT P2_StoperSrobovania.Automat AND NOT P2_StoperZvarania.Automat THEN
		SC_P2_Robot.Step:= 0;	
	ELSIF P2_Robot.Reset THEN
		SC_P2_Robot.Step:= 0;
		P2_Robot.Reset:= FALSE;
	END_IF
	
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT Triger_0 THEN
        Triger_0:= TRUE; 
        SC_P2_Robot.Step:= 0;
    END_IF
    
    IF Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        Triger_0:= FALSE;
    END_IF  
    
    
    
	
	CASE SC_P2_Robot.Step OF 
	
		0:
			SC_P2_Robot.StepName:='0 - Nulovanie';
			P2_Robot.Automat:= FALSE;
			P2_Robot.KoniecCyklu:= FALSE;
			P2_Robot.Manual:= FALSE;
			P2_Robot.Reset:= FALSE;
			P2_Robot.STAV.PoINIT:= FALSE;
			P2_Robot.KOM_OUT.Odparkovanie:= FALSE;
			P2_Robot.KOM_OUT.PP_na_Main:= FALSE;
			P2_Robot.KOM_OUT.Reset_CS:= FALSE;
			P2_Robot.KOM_OUT.StartProgramu:= FALSE;
			P2_Robot.KOM_OUT.StartProgramuMain:= FALSE;
			P2_Robot.KOM_OUT.VypniMotory:= FALSE;
			P2_Robot.KOM_OUT.ZapniMotory:= FALSE;
			IF P2_Robot.KOM_IN.Stav_RezimAUTOMAT AND P2_Robot.KOM_IN.Stav_ProgramRUN THEN
				P2_Robot.KOM_OUT.StopProgramu:= TRUE;
			ELSE	
				P2_Robot.KOM_OUT.StopProgramu:= FALSE;
			END_IF	
			IF Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 AND NOT P2_Robot.KOM_IN.Stav_ProgramRUN THEN
				P2_Robot.KOM_OUT.StopProgramu:= FALSE;
				SC_P2_Robot.ResetStep:= TRUE;
				SC_P2_Robot.Step:= 1;
			END_IF
	
		1:
			SC_P2_Robot.StepName:='1 - Cakam na spustenie vyroby';
			P2_Robot.KoniecCyklu:= FALSE;
            IF P2_Robot.Automat THEN
				SC_P2_Robot.Step:= 2;
			ELSIF P2_Robot.Manual THEN
				SC_P2_Robot.Step:= 700;
			END_IF
			
		
		//********************************************************Inicializácia****************************************************************************//	
	 
		
		2:
			SC_P2_Robot.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P2_Robot.IdleTime.PT:= T#500ms;
			SC_P2_Robot.AlarmTime.PT:= T#5s;
			
			SC_P2_Robot.IdleTime.IN:= TRUE;
									
			IF SC_P2_Robot.IdleTime.Q THEN
				SC_P2_Robot.ResetStep:= TRUE;
				SC_P2_Robot.Step:= 3;
			END_IF
			
		3:
			SC_P2_Robot.StepName:='2 - Inicializacia - kontrolujem central stop robota';
			SC_P2_Robot.IdleTime.PT:= T#500ms;
			SC_P2_Robot.AlarmTime.PT:= T#5s;
	
			IF P2_Robot.KOM_IN.Stav_RobotCS THEN
				P2_Robot.KOM_OUT.Reset_CS:= TRUE;
			END_IF
		
			IF NOT P2_Robot.KOM_IN.Stav_RobotCS THEN
				P2_Robot.KOM_OUT.Reset_CS:= FALSE;
				SC_P2_Robot.ResetStep:= TRUE;
				SC_P2_Robot.Step:= 4;
			END_IF
		
		
		4:
			SC_P2_Robot.StepName:='4 - Inicializacia - zapinam motory robota';
			SC_P2_Robot.IdleTime.PT:= T#5s;
            SC_P2_Robot.AlarmTime.PT:= T#5s;
            SC_P2_Robot.IdleTime.IN:= TRUE;
			
			IF NOT P2_Robot.KOM_IN.Stav_MotoryON THEN
				P2_Robot.KOM_OUT.ZapniMotory:= TRUE;
			END_IF
			
			IF P2_Robot.KOM_IN.Stav_MotoryON OR SC_P2_Robot.IdleTime.Q THEN
				P2_Robot.KOM_OUT.ZapniMotory:= FALSE;
				SC_P2_Robot.ResetStep:= TRUE;
				SC_P2_Robot.Step:= 6;
			END_IF
			
			
		6:
			SC_P2_Robot.StepName:='6 - Inicializacia - spustam program robota od zaciatku';
			SC_P2_Robot.IdleTime.PT:= T#500ms;
			SC_P2_Robot.AlarmTime.PT:= T#5s;
		
			IF NOT SC_P2_Robot.Switch1 THEN
				P2_Robot.KOM_OUT.StartProgramuMain:= TRUE;
				SC_P2_Robot.Switch1:= TRUE;
			END_IF
			
			IF P2_Robot.KOM_IN.Stav_ProgramRUN (*AND P2_Robot.KOM_IN.Stav_VystupyZresetovane*) THEN
				P2_Robot.KOM_OUT.StartProgramuMain:= FALSE;
				P2_Robot.STAV.PoINIT:= TRUE;
				SC_P2_Robot.ResetStep:= TRUE;
				SC_P2_Robot.Step:= 100;
			END_IF	
			
			
		
			//********************************************************Automatický režim****************************************************************************//
				
		100:  
			SC_P2_Robot.StepName:='100 - Automaticky Rezim - cakam na ukoncenie programu robota';
			SC_P2_Robot.IdleTime.PT:= T#200ms;
			SC_P2_Robot.AlarmTime.PT:= T#5s;		
			
			
			IF P2_Robot.KoniecCyklu AND NOT P2_StoperSrobovania.Automat AND NOT P2_StoperZvarania.Automat AND P2_Robot.KOM_IN.Stav_RobotOdparkovany THEN
                SC_P2_Robot.ResetStep:= TRUE;
                SC_P2_Robot.Step:= 0;
            END_IF	
			
   
		
		
		
            //*******************************************************Manuálny režim*******************************************************************************//	
			
        700:
			SC_P2_Robot.StepName:='700 - Manualny Rezim';
			SC_P2_Robot.IdleTime.PT:= T#8s;
			SC_P2_Robot.AlarmTime.PT:= T#5s;
		
		
		
		
	END_CASE	
		
		
		
		
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


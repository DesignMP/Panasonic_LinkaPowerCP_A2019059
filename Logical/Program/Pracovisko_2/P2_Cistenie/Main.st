
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC

	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P2_Cistenie);
	
	
	//Volanie podprogramov//
	OvlDveri;
	
	//Reset sekcie //
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        SC_P2_Cistenie.Step:= 0;
    ELSIF P2_Cistenie.Reset THEN
		SC_P2_Cistenie.Step:= 0;
		P2_Cistenie.Reset:= FALSE;
	END_IF	
	
    
	
    CASE SC_P2_Cistenie.Step OF 
		
		0:
			SC_P2_Cistenie.StepName:='0 - Nulovanie';
			SC_OvlDveri.Step:= 0;
			P2_Cistenie.Automat:= FALSE;
			P2_Cistenie.KoniecCyklu:= FALSE;
			P2_Cistenie.Manual:= FALSE;
			P2_Cistenie.STAV.PoINIT:= FALSE;
			P2_Cistenie.OUT.Ionizator_RUN_ZX2:= FALSE;
			P2_Cistenie.OUT.Odsavanie_OfukRUN_YV50:= FALSE;
			P2_Cistenie.OUT.Odsavanie_RUN_YV49:= FALSE;
			P2_Cistenie.OUT.VzduchPreIonizator_RUN_YV51:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_4F:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5F:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5H:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_OtacajPowerCP:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_4F:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5F:= FALSE;
			P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5H:= FALSE;
								
									
			IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 1;
			END_IF
	
		1:
			SC_P2_Cistenie.StepName:='1 - Cakam na spustenie vyroby';
			P2_Cistenie.KoniecCyklu:= FALSE;
            IF P2_Cistenie.Automat THEN
				SC_P2_Cistenie.Step:= 2;
			ELSIF P2_Cistenie.Manual THEN
				SC_P2_Cistenie.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
	
		2:
			SC_P2_Cistenie.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P2_Cistenie.IdleTime.PT:= T#500ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
			SC_P2_Cistenie.IdleTime.IN:= TRUE;
			
												
			IF SC_P2_Cistenie.IdleTime.Q THEN
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 3;
			END_IF
		
		
		3:
			SC_P2_Cistenie.StepName:='2 - Inicializacia - otvorenie dveri';
			SC_P2_Cistenie.IdleTime.PT:= T#500ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
			
			IF NOT SC_P2_Cistenie.Switch1 THEN
				Dvere_OTVOR:= TRUE;
				SC_P2_Cistenie.Switch1:= TRUE;
			END_IF
		
			IF P2_Cistenie.IN.Dvere_OTVORENE_MS7 THEN
				P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia:= TRUE;		
				P2_Cistenie.STAV.PoINIT:= TRUE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 100;
			END_IF
		
		
			//********************************************************Automatický režim****************************************************************************//
				
		100:  
			SC_P2_Cistenie.StepName:='100 - Automaticky Rezim - cakam na spustenie cistenia';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;			
	
            IF P2_Cistenie.KoniecCyklu AND NOT P2_StoperZvarania.Automat THEN
                SC_P2_Cistenie.ResetStep:= TRUE;
                SC_P2_Cistenie.Step:= 0;
            ELSIF P2_StoperZvarania.OUT.KOM_Cistenie_START THEN
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 102;
			END_IF	
		
		
		102:
			SC_P2_Cistenie.StepName:='102 - Automaticky Rezim - vystavenie signalu pre robota odober Power CP z paletky a presun do cistenia';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF NOT P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_v_Cisteni AND NOT P2_Cistenie.IN.VakumDosiahnute_S5 THEN
				P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia:= TRUE;
				IF Linka.PAR.ZvolenyModel = '4F' THEN
					P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_4F:= TRUE;
					P2_Cistenie.OUT.Odsavanie_RUN_YV49:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 105;
				ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
					P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5F:= TRUE;
					P2_Cistenie.OUT.Odsavanie_RUN_YV49:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 105;	
				ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
					P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5H:= TRUE;
					P2_Cistenie.OUT.Odsavanie_RUN_YV49:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 105;	
				END_IF	
			END_IF	
		
		
		105:
			SC_P2_Cistenie.StepName:='105 - Automaticky Rezim - cakam na signal robot odobral Power CP z paletky';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_v_Cisteni THEN
				P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_4F:= FALSE;
				P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5F:= FALSE;
				P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5H:= FALSE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 108;
			END_IF
		
		108:
			SC_P2_Cistenie.StepName:='108 - Automaticky Rezim - zatvorenie dveri, spustenie ionizatora';
			SC_P2_Cistenie.IdleTime.PT:= T#2s;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF NOT SC_P2_Cistenie.Switch1 THEN
				P2_Cistenie.OUT.Ionizator_RUN_ZX2:= TRUE;
				P2_Cistenie.OUT.VzduchPreIonizator_RUN_YV51:= TRUE;
				Dvere_ZATVOR:= TRUE;
				P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia:= FALSE;
				SC_P2_Cistenie.Switch1:= TRUE;
			END_IF
		
			IF P2_Cistenie.IN.Dvere_ZATVORENE_MS8 THEN
				P2_Cistenie.OUT.Ionizator_RUN_ZX2:= FALSE;
				P2_Cistenie.OUT.VzduchPreIonizator_RUN_YV51:= FALSE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 112;
			END_IF
			
				
		112:
			SC_P2_Cistenie.StepName:='112 - Automaticky Rezim - zapnutie ofuku';
			SC_P2_Cistenie.IdleTime.PT:= T#2s;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF P2_Cistenie.IN.VakumDosiahnute_S5 THEN
				P2_Cistenie.OUT.Odsavanie_OfukRUN_YV50:= TRUE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 115;
			END_IF
		
		115:
			SC_P2_Cistenie.StepName:='115 - Automaticky Rezim - vystavenie signalu pre robota vykonaj otacanie Power CP v cisteni';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF NOT P2_Robot.KOM_IN.Stav_Cistenie_Otacanie_Ukoncene THEN
				P2_Robot.KOM_OUT.Cistenie_OtacajPowerCP:= TRUE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 118;
			END_IF	
		
		118:
			SC_P2_Cistenie.StepName:='118 - Automaticky Rezim - cakam na signal robot ukoncil otacanie Power CP';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF P2_Robot.KOM_IN.Stav_Cistenie_Otacanie_Ukoncene THEN
				P2_Robot.KOM_OUT.Cistenie_OtacajPowerCP:= FALSE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 120;
			END_IF
		
		120:
			SC_P2_Cistenie.StepName:='120 - Automaticky Rezim - otvorenie dveri,vypnutie ofuku a odsavania';
			SC_P2_Cistenie.IdleTime.PT:= T#2s;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF NOT SC_P2_Cistenie.Switch1 THEN
				P2_Cistenie.OUT.Odsavanie_OfukRUN_YV50:= FALSE;
				P2_Cistenie.OUT.Odsavanie_RUN_YV49:= FALSE;
				Dvere_OTVOR:= TRUE;
				SC_P2_Cistenie.Switch1:= TRUE;
			END_IF
		
			IF P2_Cistenie.IN.Dvere_OTVORENE_MS7 THEN
				P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia:= TRUE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 122;
			END_IF
		
		
		122:
			SC_P2_Cistenie.StepName:='122 - Automaticky Rezim - vystavenie signalu pre robota poloz Power CP na paletku po cisteni';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF NOT P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_Polozene THEN
				IF Linka.PAR.ZvolenyModel = '4F' THEN
					P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_4F:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 125;
				ELSIF Linka.PAR.ZvolenyModel = '5F' THEN
					P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5F:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 125;
				ELSIF Linka.PAR.ZvolenyModel = '5H' THEN
					P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5H:= TRUE;
					SC_P2_Cistenie.ResetStep:= TRUE;
					SC_P2_Cistenie.Step:= 125;	
				END_IF	
			END_IF	
		
		125:
			SC_P2_Cistenie.StepName:='125 - Automaticky Rezim - cakam na signal robot polozil Power CP na paletku';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;
		
			IF P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_Polozene THEN
				P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_4F:= FALSE;
				P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5F:= FALSE;
				P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5H:= FALSE;
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 128;
			END_IF
		
		128:
			SC_P2_Cistenie.StepName:='122 - Automaticky Rezim - vystavenie signalu ukoncenie cistenia';
			SC_P2_Cistenie.IdleTime.PT:= T#200ms;
			SC_P2_Cistenie.AlarmTime.PT:= T#5s;	
			
						
			IF NOT SC_P2_Cistenie.Switch1 THEN
				P2_Cistenie.OUT.KOM_CistenieUkoncene:= TRUE;
				SC_P2_Cistenie.Switch1:= TRUE;
			END_IF
			
			IF NOT P2_StoperZvarania.OUT.KOM_Cistenie_START THEN
				SC_P2_Cistenie.ResetStep:= TRUE;
				SC_P2_Cistenie.Step:= 100;
			END_IF	
	
	
	END_CASE
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


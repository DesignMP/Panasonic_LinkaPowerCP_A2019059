
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P2_Dopravniky);
	
	
	//Reset sekcie //
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        SC_P2_Dopravniky.Step:= 0;
    ELSIF P2_Dopravniky.Reset THEN
		SC_P2_Dopravniky.Step:= 0;
		P2_Dopravniky.Reset:= FALSE;
	END_IF	
	
	
	
	CASE SC_P2_Dopravniky.Step OF 
		
		0:
			SC_P2_Dopravniky.StepName:='0 - Nulovanie';
			P2_Dopravniky.Automat:= FALSE;
			P2_Dopravniky.KoniecCyklu:= FALSE;
			P2_Dopravniky.Manual:= FALSE;
			P2_Dopravniky.STAV.PoINIT:= FALSE;
			P2_Dopravniky.OUT.HornyDoprav_ChodVPRED_M7:= FALSE;
			P2_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M8:= FALSE;
			
						
			IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA  AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 THEN
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 1;
			END_IF
	
		1:
			SC_P2_Dopravniky.StepName:='1 - Cakam na spustenie vyroby';
			P2_Dopravniky.KoniecCyklu:= FALSE;
            IF P2_Dopravniky.Automat THEN
				SC_P2_Dopravniky.Step:= 2;
			ELSIF P2_Dopravniky.Manual THEN
				SC_P2_Dopravniky.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
	
	
		2:
			SC_P2_Dopravniky.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P2_Dopravniky.IdleTime.PT:= T#2s;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF Safety.STAV.P2_ZaklTesnenia_Pojazd_ZASUNUTY AND P2_Srobovacky_VychodziaPozicia AND P2_SkrutkovacMatic.IN.SkrutkMatic_ZASUNUTY_MS9 (*AND P2_Robot.KOM_IN.Stav_RobotOdparkovany*) THEN
				SC_P2_Dopravniky.IdleTime.IN:= TRUE;
			ELSE	
				SC_P2_Dopravniky.IdleTime.IN:= FALSE;
			END_IF
			
			
			IF SC_P2_Dopravniky.IdleTime.Q THEN
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 3;
			END_IF	
		
			
			
		3:
			SC_P2_Dopravniky.StepName:='3 - Inicializacia - inicializacia stoprov';
			SC_P2_Dopravniky.IdleTime.PT:= T#1s;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;
			
			IF P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND P2_StoperZvarania.IN.PritomnostPaletky_S9 THEN
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 5;
			ELSE	
				IF NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 THEN
					P2_StoperMaticovacky.OUT.ZasunStoper_YV52:= TRUE;
				END_IF
				IF NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 THEN
					P2_StoperSrobovania.OUT.ZasunStoper_YV56:= TRUE;
				END_IF
				IF NOT P2_StoperZvarania.IN.PritomnostPaletky_S9 THEN
					P2_StoperZvarania.OUT.ZasunStoper_YV59:= TRUE;
				END_IF
				SC_P2_Dopravniky.IdleTime.IN:= TRUE;
			END_IF
			
			IF SC_P2_Dopravniky.IdleTime.Q THEN
				P2_StoperMaticovacky.OUT.ZasunStoper_YV52:= FALSE;
				P2_StoperSrobovania.OUT.ZasunStoper_YV56:= FALSE;
				P2_StoperZvarania.OUT.ZasunStoper_YV59:= FALSE;
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 5;
			END_IF	
			
		5:
			SC_P2_Dopravniky.StepName:='5 - Inicializacia - ukoncenie inicializacie';
			SC_P2_Dopravniky.IdleTime.PT:= T#4s;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;
		
			P2_Dopravniky.OUT.HornyDoprav_ChodVPRED_M7:= TRUE;
			P2_Dopravniky.OUT.SpodnyDoprav_ChodVPRED_M8:= TRUE;
			SC_P2_Dopravniky.IdleTime.IN:= TRUE;
			
			IF SC_P2_Dopravniky.IdleTime.Q THEN
				P2_Dopravniky.STAV.PoINIT:= TRUE;
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 100;
			END_IF
			
	
			
		//********************************************************Automatický režim****************************************************************************//
		100:  
			SC_P2_Dopravniky.StepName:='100 - Automaticky Rezim - cakam na vypnutie dopravnikou';
			SC_P2_Dopravniky.IdleTime.PT:= T#200ms;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;			
			
			IF P2_Dopravniky.KoniecCyklu AND NOT P2_StoperZaklTesnenia.Automat AND NOT P2_StoperMaticovacky.Automat AND NOT P2_StoperSrobovania.Automat AND NOT P2_StoperZvarania.Automat AND Safety.STAV.P3_VstupBunky_Bariera_AKTIVNA THEN
				SC_P2_Dopravniky.ResetStep:= TRUE;
				SC_P2_Dopravniky.Step:= 0;
			END_IF
			
			
			
			
		
			//*******************************************************Manuálny režim*******************************************************************************//
		700:
			SC_P2_Dopravniky.StepName:='700 - Manualny Rezim';
			SC_P2_Dopravniky.IdleTime.PT:= T#8s;
			SC_P2_Dopravniky.AlarmTime.PT:= T#5s;
			
			
			
			
	END_CASE		
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


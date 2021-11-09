
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_P3_VstupnyStoper);
	
	
	
	
	
	//Reset sekcie //
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        SC_P3_VstupnyStoper.Step:= 0;
    ELSIF P3_VstupnyStoper.Reset THEN
		SC_P3_VstupnyStoper.Step:= 0;
		P3_VstupnyStoper.Reset:= FALSE;
	END_IF
	
	
	
	CASE SC_P3_VstupnyStoper.Step OF 
	
		0:
			SC_P3_VstupnyStoper.StepName:='0 - Nulovanie';
			P3_VstupnyStoper.Automat:= FALSE;
			P3_VstupnyStoper.KoniecCyklu:= FALSE;
			P3_VstupnyStoper.Manual:= FALSE;
			P3_VstupnyStoper.STAV.PoINIT:= FALSE;
            P3_VstupnyStoper.OUT.ZasunStoper_YV193:= FALSE;
            P3_VstupnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
			
						
			IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 1;
			END_IF
	
		1:
			SC_P3_VstupnyStoper.StepName:='1 - Cakam na spustenie vyroby';
			P3_VstupnyStoper.KoniecCyklu:= FALSE;
            IF P3_VstupnyStoper.Automat THEN
				SC_P3_VstupnyStoper.Step:= 2;
			ELSIF P3_VstupnyStoper.Manual THEN
				SC_P3_VstupnyStoper.Step:= 700;
			END_IF
			
		
			//********************************************************Inicializácia****************************************************************************//	
		2:
			SC_P3_VstupnyStoper.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#4s;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#5s;
			
									
			IF P3_Dopravniky.STAV.PoINIT THEN
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 3;
			END_IF
		
		3:
			SC_P3_VstupnyStoper.StepName:='3 - Inicializacia - hladanie paletky';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#5s;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#5s;
			SC_P3_VstupnyStoper.IdleTime.IN:= TRUE;
	
			IF P3_VstupnyStoper.IN.PritomnPaletky_IS85 THEN
				P3_VstupnyStoper.STAV.PoINIT:= TRUE;
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 101;		
			ELSIF SC_P3_VstupnyStoper.IdleTime.Q THEN
				P3_VstupnyStoper.STAV.PoINIT:= TRUE;
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 100;
			END_IF
	
		
			//********************************************************Automatický režim****************************************************************************//
		100:
			SC_P3_VstupnyStoper.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#200ms;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#5s;
		
                        
            SC_P3_VstupnyStoper.IdleTime.IN:= P3_VstupnyStoper.IN.PritomnPaletky_IS85;
			
            IF P3_VstupnyStoper.KoniecCyklu THEN
                SC_P3_VstupnyStoper.ResetStep:= TRUE;
                SC_P3_VstupnyStoper.Step:= 0;
            ELSIF SC_P3_VstupnyStoper.IdleTime.Q THEN
				P2_StoperZvarania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
                SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 101;
			END_IF
	
		
		101:
			SC_P3_VstupnyStoper.StepName:='101 - Automaticky Rezim - cakam na vyvezenie paletky na stoper srobovania ';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#200ms;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#5s;
			
            IF P3_VstupnyStoper.KoniecCyklu THEN
                SC_P3_VstupnyStoper.ResetStep:= TRUE;
                SC_P3_VstupnyStoper.Step:= 0;
            ELSIF ((SC_P3_StoperSrobovania.Step = 100 AND NOT P3_StoperSrobovania.IN.PritomnostPaletky_S22) OR (SC_P3_StoperSrobovania.Step = 561 AND P3_StoperSrobovania.OUT.ZasunStoper_YV132)) AND NOT P3_VstupnyStoper.STAV.PrebiehaVyvezeniePaletky THEN
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
                SC_P3_VstupnyStoper.Step:= 105;
            ELSIF NOT P3_VstupnyStoper.IN.PritomnPaletky_IS85 THEN
                SC_P3_VstupnyStoper.ResetStep:= TRUE;
				SC_P3_VstupnyStoper.Step:= 100;
			END_IF
			
			
		105:
			SC_P3_VstupnyStoper.StepName:='105 - Automaticky Rezim - vyvazam paletku na stoper srobovania ';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#200ms;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#10s;
			
            SC_P3_VstupnyStoper.AlarmTime.IN:= P3_VstupnyStoper.IN.PritomnPaletky_IS85;
            
			IF NOT SC_P3_VstupnyStoper.Switch1 THEN
				P3_VstupnyStoper.OUT.ZasunStoper_YV193:= TRUE;
				P3_VstupnyStoper.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P3_VstupnyStoper.Switch1:= TRUE;
			END_IF	
			
			IF NOT P3_VstupnyStoper.IN.PritomnPaletky_IS85 THEN
				P3_VstupnyStoper.OUT.ZasunStoper_YV193:= FALSE;
			END_IF
			
			IF NOT P3_VstupnyStoper.OUT.ZasunStoper_YV193 AND NOT P3_VstupnyStoper.IN.PritomnPaletky_IS85 THEN
				SC_P3_VstupnyStoper.ResetStep:= TRUE;
                SC_P3_VstupnyStoper.Step:= 100;
            ELSIF SC_P3_VstupnyStoper.AlarmTime.Q THEN
                P34_Alarmy[354]:= TRUE;
                P3_Pracovisko.KoniecCyklu:= TRUE;
                SC_P3_VstupnyStoper.ResetStep:= TRUE;
                SC_P3_VstupnyStoper.Step:= 0;
			END_IF
		
		
			//*******************************************************Manuálny režim*******************************************************************************//
		700:
			SC_P3_VstupnyStoper.StepName:='700 - Manualny Rezim';
			SC_P3_VstupnyStoper.IdleTime.PT:= T#8s;
			SC_P3_VstupnyStoper.AlarmTime.PT:= T#5s;
		
		
		
		
		
		
		
	END_CASE		
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


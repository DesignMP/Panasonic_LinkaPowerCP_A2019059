
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
		
	//Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P3_AkumulacnyStoper);
	
	
	
	
	
    //Reset sekcie //
    IF NOT Safety.STAV.P3_ZonaBunky_AKTIVNA THEN
        SC_P3_AkumulacnyStoper.Step:= 0;
    ELSIF P3_AkumulacnyStoper.Reset THEN
        SC_P3_AkumulacnyStoper.Step:= 0;
        P3_AkumulacnyStoper.Reset:= FALSE;
    END_IF
	
	
	
    CASE SC_P3_AkumulacnyStoper.Step OF 
	
        0:
            SC_P3_AkumulacnyStoper.StepName:='0 - Nulovanie';
            P3_AkumulacnyStoper.Automat:= FALSE;
            P3_AkumulacnyStoper.KoniecCyklu:= FALSE;
            P3_AkumulacnyStoper.Manual:= FALSE;
            P3_AkumulacnyStoper.STAV.PoINIT:= FALSE;
            P3_AkumulacnyStoper.OUT.ZasunStoper_YV133:= FALSE;
			P3_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= FALSE;
						
            IF Safety.STAV.P3_ZonaBunky_AKTIVNA AND NOT P3_Pracovisko.STAV.PORUCHA AND P3_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S25 THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 1;
            END_IF
	
        1:
            SC_P3_AkumulacnyStoper.StepName:='1 - Cakam na spustenie vyroby';
            P3_AkumulacnyStoper.KoniecCyklu:= FALSE;
            IF P3_AkumulacnyStoper.Automat THEN
                SC_P3_AkumulacnyStoper.Step:= 2;
            ELSIF P3_AkumulacnyStoper.Manual THEN
                SC_P3_AkumulacnyStoper.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
        2:
            SC_P3_AkumulacnyStoper.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#4s;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#5s;
			
									
            IF P3_Dopravniky.STAV.PoINIT THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 3;
            END_IF
		
        3:
            SC_P3_AkumulacnyStoper.StepName:='3 - Inicializacia - hladanie paletky';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#5s;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#5s;
            SC_P3_AkumulacnyStoper.IdleTime.IN:= TRUE;
	
            IF P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 THEN
                P3_AkumulacnyStoper.STAV.PoINIT:= TRUE;
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 101;		
            ELSIF SC_P3_AkumulacnyStoper.IdleTime.Q THEN
                P3_AkumulacnyStoper.STAV.PoINIT:= TRUE;
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 100;
            END_IF
	
		
            //********************************************************Automatický režim****************************************************************************//
        100:
            SC_P3_AkumulacnyStoper.StepName:='100 - Automaticky Rezim - cakam na príchod paletky na stoper';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#200ms;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#5s;
		
            IF P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 THEN
                P3_StoperSrobovania.STAV.PrebiehaVyvezeniePaletky:= FALSE;
            END_IF
            
            SC_P3_AkumulacnyStoper.IdleTime.IN:= P3_AkumulacnyStoper.IN.PritomnPaletky_IS65;
			
            IF P3_AkumulacnyStoper.KoniecCyklu THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 0;
            ELSIF SC_P3_AkumulacnyStoper.IdleTime.Q THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 101;
            END_IF
	
		
        101:
            SC_P3_AkumulacnyStoper.StepName:='101 - Automaticky Rezim - cakam na vyvezenie paletky na stoper Leakage test A';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#200ms;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#5s;
			
            IF P3_AkumulacnyStoper.KoniecCyklu THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 0;
            ELSIF ((SC_P3_LeakageTestA.Step = 100 AND NOT P3_LeakageTestA.IN.PritomnostPaletky_S23) OR (P3_LeakageTestA.OUT.ZasunStoper_YV134 AND SC_P3_LeakageTestA.Step = 561)) AND NOT P3_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 105;
            ELSIF NOT P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 THEN
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 100;
            END_IF
			
			
        105:
            SC_P3_AkumulacnyStoper.StepName:='105 - Automaticky Rezim - vyvazam paletku na stoper Leakage test A';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#200ms;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#10s;
			
            SC_P3_AkumulacnyStoper.AlarmTime.IN:= P3_AkumulacnyStoper.IN.PritomnPaletky_IS65; 
            
            IF NOT SC_P3_AkumulacnyStoper.Switch1 THEN
                P3_AkumulacnyStoper.OUT.ZasunStoper_YV133:= TRUE;
                P3_AkumulacnyStoper.STAV.PrebiehaVyvezeniePaletky:= TRUE;
                SC_P3_AkumulacnyStoper.Switch1:= TRUE;
            END_IF	
			
            IF NOT P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 THEN
                P3_AkumulacnyStoper.OUT.ZasunStoper_YV133:= FALSE;
                SC_P3_AkumulacnyStoper.Step:= 100;
            ELSIF SC_P3_AkumulacnyStoper.AlarmTime.Q THEN
                P34_Alarmy[356]:= TRUE;
                P3_Pracovisko.KoniecCyklu:= TRUE;
                SC_P3_AkumulacnyStoper.ResetStep:= TRUE;
                SC_P3_AkumulacnyStoper.Step:= 0;
            END_IF
			
		
		
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P3_AkumulacnyStoper.StepName:='700 - Manualny Rezim';
            SC_P3_AkumulacnyStoper.IdleTime.PT:= T#8s;
            SC_P3_AkumulacnyStoper.AlarmTime.PT:= T#5s;
		
    END_CASE
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


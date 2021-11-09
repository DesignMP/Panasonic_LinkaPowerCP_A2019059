
ACTION IOLinkKomunikacia: 

	//Modul ovládania gripra//
	P1_Robot.IN.Griper_Otvoreny_MS40:=	P1_Robot.PAR.Modul_IOLink_Inputs.0;
	P1_Robot.IN.Griper_Zatvoreny_MS41:=	P1_Robot.PAR.Modul_IOLink_Inputs.1; 
	P1_Robot.PAR.Modul_IOLink_Inputs.2; 
	P1_Robot.PAR.Modul_IOLink_Inputs.3; 
	P1_Robot.PAR.Modul_IOLink_Inputs.4; 
	P1_Robot.PAR.Modul_IOLink_Inputs.5; 
	P1_Robot.IN.KodGripra_Bit0:= P1_Robot.PAR.Modul_IOLink_Inputs.6;
	P1_Robot.IN.KodGripra_Bit1:= P1_Robot.PAR.Modul_IOLink_Inputs.7; 
	
	//Typ gripra//
	IF P1_Robot.IN.KodGripra_Bit0 AND NOT P1_Robot.IN.KodGripra_Bit1 THEN
		P1_Robot.KOM_OUT.TypGripra_5H:= FALSE;
		P1_Robot.KOM_OUT.TypGripra_45F:= TRUE;
	ELSIF NOT P1_Robot.IN.KodGripra_Bit0 AND P1_Robot.IN.KodGripra_Bit1 THEN
		P1_Robot.KOM_OUT.TypGripra_45F:= FALSE;
		P1_Robot.KOM_OUT.TypGripra_5H:= TRUE;
	ELSE
		P1_Robot.KOM_OUT.TypGripra_45F:= FALSE;
		P1_Robot.KOM_OUT.TypGripra_5H:= FALSE;
	END_IF	
	
	
	
	
END_ACTION

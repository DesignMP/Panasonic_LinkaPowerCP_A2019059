
ACTION IOLinkKomunikacia: 

	//Modul ovládania gripra//
	P2_Robot.IN.GriperMvCase_Otvoreny_IS4:=	P2_Robot.PAR.Modul_IOLink_Inputs.0;
	P2_Robot.IN.GriperMvCase_DrziPowerCP_IS5:=	P2_Robot.PAR.Modul_IOLink_Inputs.1; 
	P2_Robot.IN.GriperMvCase_DrziMVcase_IS6:= P2_Robot.PAR.Modul_IOLink_Inputs.2; 
	P2_Robot.PAR.Modul_IOLink_Inputs.3; 
	P2_Robot.PAR.Modul_IOLink_Inputs.4; 
	P2_Robot.PAR.Modul_IOLink_Inputs.5; 
	P2_Robot.IN.KodGripra_Bit0:= P2_Robot.PAR.Modul_IOLink_Inputs.6;
	P2_Robot.IN.KodGripra_Bit1:= P2_Robot.PAR.Modul_IOLink_Inputs.7; 
	
	//Kodovanie griprov//
	IF P2_Robot.IN.KodGripra_Bit0 AND P2_Robot.IN.KodGripra_Bit1 THEN
		P2_Robot.KOM_OUT.TypGripra_MV:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_45F:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_5H:= TRUE;
	ELSIF NOT P2_Robot.IN.KodGripra_Bit0 AND P2_Robot.IN.KodGripra_Bit1 THEN
		P2_Robot.KOM_OUT.TypGripra_MV:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_5H:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_45F:= TRUE;
	ELSIF P2_Robot.IN.KodGripra_Bit0 AND NOT P2_Robot.IN.KodGripra_Bit1 THEN
		P2_Robot.KOM_OUT.TypGripra_5H:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_45F:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_MV:= TRUE;
	ELSE
		P2_Robot.KOM_OUT.TypGripra_MV:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_5H:= FALSE;
		P2_Robot.KOM_OUT.TypGripra_45F:= FALSE;
	END_IF	
	
	
	//Stavy griprov// 
	IF P2_Robot.KOM_OUT.TypGripra_45F THEN
		IF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs <= 30 THEN
			P2_Robot.KOM_OUT.Griper4F_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_Otvoreny:= TRUE;
		ELSIF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs >= 803 AND P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs <= 900 THEN	
			P2_Robot.KOM_OUT.Griper4F_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_DrziBusbary:= TRUE;
		ELSIF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs >= 990 THEN	
			P2_Robot.KOM_OUT.Griper4F_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_Zatvoreny:= TRUE;
		ELSE
			P2_Robot.KOM_OUT.Griper4F_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper4F_Zatvoreny:= FALSE;
		END_IF	
	ELSIF P2_Robot.KOM_OUT.TypGripra_MV THEN
		IF P2_Robot.IN.GriperMvCase_Otvoreny_IS4 AND NOT P2_Robot.IN.GriperMvCase_DrziPowerCP_IS5 AND NOT P2_Robot.IN.GriperMvCase_DrziMVcase_IS6 THEN
			P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= TRUE;
		ELSIF NOT P2_Robot.IN.GriperMvCase_Otvoreny_IS4 AND P2_Robot.IN.GriperMvCase_DrziPowerCP_IS5 AND P2_Robot.IN.GriperMvCase_DrziMVcase_IS6 THEN	
			P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= TRUE;
		ELSIF P2_Robot.IN.GriperMvCase_Otvoreny_IS4 AND P2_Robot.IN.GriperMvCase_DrziPowerCP_IS5 AND NOT P2_Robot.IN.GriperMvCase_DrziMVcase_IS6 THEN		
			P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= TRUE;
		ELSIF NOT P2_Robot.IN.GriperMvCase_Otvoreny_IS4 AND P2_Robot.IN.GriperMvCase_DrziPowerCP_IS5 AND NOT P2_Robot.IN.GriperMvCase_DrziMVcase_IS6 THEN		
			P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= TRUE;
		ELSE
			P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= FALSE;
			P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= FALSE;
		END_IF
	ELSIF P2_Robot.KOM_OUT.TypGripra_5H THEN
		IF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs <= 30 THEN
			P2_Robot.KOM_OUT.Griper5H_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_Otvoreny:= TRUE;
		ELSIF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs >= 880 AND P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs <= 897 THEN	
			P2_Robot.KOM_OUT.Griper5H_Zatvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_DrziBusbary:= TRUE;
		ELSIF P2_Robot.PAR.Griper_4F_5F_5H_IOLink_Inputs >= 992 THEN	
			P2_Robot.KOM_OUT.Griper5H_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_Zatvoreny:= TRUE;
		ELSE
			P2_Robot.KOM_OUT.Griper5H_Otvoreny:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_DrziBusbary:= FALSE;
			P2_Robot.KOM_OUT.Griper5H_Zatvoreny:= FALSE;
		END_IF		
	ELSE
		P2_Robot.KOM_OUT.Griper4F_Otvoreny:= FALSE;
		P2_Robot.KOM_OUT.Griper4F_DrziBusbary:= FALSE;
		P2_Robot.KOM_OUT.Griper4F_Zatvoreny:= FALSE;
		P2_Robot.KOM_OUT.GriperMvCase_Otvoreny:= FALSE;
		P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase:= FALSE;
		P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP:= FALSE;
		P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny:= FALSE;
		P2_Robot.KOM_OUT.Griper5H_Otvoreny:= FALSE;
		P2_Robot.KOM_OUT.Griper5H_DrziBusbary:= FALSE;
		P2_Robot.KOM_OUT.Griper5H_Zatvoreny:= FALSE;
	END_IF
	
	
	
	
	
	
	
	
	
	
	
		END_ACTION


ACTION ProfinetKomunikaciaRobot: 

	
	//Vstupy z Robota do PLC//
	P2_Robot.KOM_IN.Stav_RezimAUTOMAT:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].0;
	P2_Robot.KOM_IN.Stav_ProgramRUN:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].1;
	P2_Robot.KOM_IN.Stav_MotoryOFF:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].2;
	P2_Robot.KOM_IN.Stav_MotoryON:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].3;
	P2_Robot.KOM_IN.Stav_RobotCS:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].4;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].5;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].6;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[0].7;
	
	P2_Robot.OUT.ZatvorGriper_YV4:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].0;
	P2_Robot.OUT.OtvorGriper_YV3:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].1;
	P2_Robot.OUT.ZaistiGriper_YV1:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].2;
	P2_Robot.OUT.OdistiGriper_YV2:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].3;
	P2_Robot.OUT.ZapniVakum5H_YV8:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].4;
	P2_Robot.OUT.ZapniVakum4F5F_YV6:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].5;
	P2_Robot.KOM_IN.Stav_Busbary5H_Odobrate:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].6;
	P2_Robot.KOM_IN.Stav_Busbary5F_Odobrate:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[1].7;
	
	P2_Robot.KOM_IN.Stav_Busbary4F_Odobrate:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].0;
	P2_Robot.KOM_IN.Stav_Busbary5H_Polozene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].1;
	P2_Robot.KOM_IN.Stav_Busbary5F_Polozene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].2;
	P2_Robot.KOM_IN.Stav_Busbary4F_Polozene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].3;
	P2_Robot.KOM_IN.Stav_RobotPoziciaCakania:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].4;
	P2_Robot.KOM_IN.Stav_Filter5H_Dotlaceny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].5;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].6;
	P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_Odobrate:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[2].7;
	
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].0;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].1;
	P2_Robot.KOM_IN.Stav_Cistenie_Otacanie_Ukoncene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].2;
	P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_v_Cisteni:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].3;
	P2_Robot.KOM_IN.Stav_Cistenie_PowerCP_Polozene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].4;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].5;
	P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].6;
	P2_Robot.KOM_IN.Stav_LavyMvCase5H_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[3].7;
	
	P2_Robot.KOM_IN.Stav_LavyMvCase5F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].0;
	P2_Robot.KOM_IN.Stav_LavyMvCase4F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].1;
	P2_Robot.KOM_IN.Stav_PravyMvCase5H_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].2;
	P2_Robot.KOM_IN.Stav_PravyMvCase5F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].3;
	P2_Robot.KOM_IN.Stav_PravyMvCase4F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].4;
	P2_Robot.KOM_IN.Stav_TopCover5H_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].5;
	P2_Robot.KOM_IN.Stav_TopCover5F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].6;
	P2_Robot.KOM_IN.Stav_TopCover4F_Odobraty:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[4].7;
	
	P2_Robot.OUT.VypniVakum5H_YV9:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].0;
	P2_Robot.OUT.VypniVakum4F5F_YV7:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].1;
	P2_Robot.OUT.OdvzdusnenieVyvodov_YV70:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].2;
	P2_Robot.KOM_IN.Stav_LavyMvCase5H_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].3;
	P2_Robot.KOM_IN.Stav_LavyMvCase5F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].4;
	P2_Robot.KOM_IN.Stav_LavyMvCase4F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].5;
	P2_Robot.KOM_IN.Stav_PravyMvCase5H_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].6;
	P2_Robot.KOM_IN.Stav_PravyMvCase5F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[5].7;
	
	
	P2_Robot.KOM_IN.Stav_PravyMvCase4F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].0;
	P2_Robot.KOM_IN.Stav_TopCover5H_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].1;
	P2_Robot.KOM_IN.Stav_TopCover5F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].2;
	P2_Robot.KOM_IN.Stav_TopCover4F_Polozeny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].3;
	P2_Robot.KOM_IN.Stav_RobotOdparkovany:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].4;
	P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].5;
	P2_Robot.KOM_IN.Stav_RobotBezpPozicia_Zvaranie:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].6;
	P2_Robot.KOM_IN.Stav_VystupyZresetovane:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[6].7;
	
	P2_Robot.KOM_IN.Stav_BusbaryUvolnene:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[7].0;
    P2_Robot.KOM_IN.Stav_Griper4F5F_Vymeneny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[7].1;
    P2_Robot.KOM_IN.Stav_Griper5H_Vymeneny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[7].2;
    P2_Robot.KOM_IN.Stav_GriperCistenia_Vymeneny:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[7].3;
	P2_Robot.KOM_IN.Stav_RobotOdoberaCover:= P2_Robot.KOM_IN.Profinet_PLC_INPUTS[7].4;
	
	
	//Vystupy z PLC do Robota//
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].0:= P2_Robot.KOM_OUT.VypniMotory;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].1:= P2_Robot.KOM_OUT.ZapniMotory;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].2:= P2_Robot.KOM_OUT.PP_na_Main;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].3:= P2_Robot.KOM_OUT.StartProgramu;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].4:= P2_Robot.KOM_OUT.StartProgramuMain;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].5:= P2_Robot.KOM_OUT.StopProgramu;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].6:= P2_Robot.KOM_OUT.Reset_CS;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].7;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].0:= P2_Robot.KOM_OUT.TypGripra_5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].1:= P2_Robot.KOM_OUT.TypGripra_45F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].2:= P2_Robot.KOM_OUT.TypGripra_MV;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].3:= P2_Robot.KOM_OUT.Griper4F_Otvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].4:= P2_Robot.KOM_OUT.Griper4F_DrziBusbary;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].5:= P2_Robot.KOM_OUT.Griper4F_Zatvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].6:= P2_Robot.KOM_OUT.Griper5H_Otvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].7:= P2_Robot.KOM_OUT.Griper5H_DrziBusbary;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].0:= P2_Robot.KOM_OUT.Griper5H_Zatvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].1:= P2_Robot.KOM_OUT.GriperMvCase_Otvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].2:= P2_Robot.KOM_OUT.GriperMvCase_DrziMVcase;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].3:= P2_Robot.KOM_OUT.GriperMvCase_DrziPowerCP;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].4:= P2_Robot.KOM_OUT.GriperMvCase_Zatvoreny;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].5:= P2_Robot.IN.SnimacVakua_5H_S2;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].6:= P2_Robot.IN.SnimacVakua_45F_S1;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].7:= P2_Robot.KOM_OUT.Odober_Busbary5H;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].0:= P2_Robot.KOM_OUT.Odober_Busbary5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].1:= P2_Robot.KOM_OUT.Odober_Busbary4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].2:= P2_Robot.KOM_OUT.Poloz_Busbary5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].3:= P2_Robot.KOM_OUT.Poloz_Busbary5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].4:= P2_Robot.KOM_OUT.Poloz_Busbary4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].5:= P2_Robot.KOM_OUT.Presun_CakaciaPozicia;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].6:= P2_Robot.KOM_OUT.Dotlac_Filter5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].7;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].0:= P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].1:= P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].2:= P2_Robot.KOM_OUT.Cistenie_OdoberPowerCP_4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].3;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].4;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].5;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].6:= P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].7:= P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_5F;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].0:= P2_Robot.KOM_OUT.Cistenie_PolozPowerCP_4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].1:= P2_Robot.KOM_OUT.Odober_LavyMvCase5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].2:= P2_Robot.KOM_OUT.Odober_LavyMvCase5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].3:= P2_Robot.KOM_OUT.Odober_LavyMvCase4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].4:= P2_Robot.KOM_OUT.Odober_PravyMvCase5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].5:= P2_Robot.KOM_OUT.Odober_PravyMvCase5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].6:= P2_Robot.KOM_OUT.Odober_PravyMvCase4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[5].7:= P2_Robot.KOM_OUT.Odober_TopCover5H;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].0:= P2_Robot.KOM_OUT.Odober_TopCover5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].1:= P2_Robot.KOM_OUT.Odober_TopCover4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].2:= P2_Robot.IN.DokStanPritGripra_BusBary5H_IS3;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].3:= P2_Robot.IN.DokStanPritGripra_BusBary45F_IS2;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].4:= P2_Robot.IN.DokStanPritGripra_MVcase_IS1;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].5:= P2_Robot.KOM_OUT.Cistenie_BezpecnaPozicia;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].6:= P2_Robot.KOM_OUT.Cistenie_OtacajPowerCP;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[6].7:= P2_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].0:= P2_Robot.KOM_OUT.Poloz_LavyMvCase5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].1:= P2_Robot.KOM_OUT.Poloz_LavyMvCase5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].2:= P2_Robot.KOM_OUT.Poloz_LavyMvCase4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].3:= P2_Robot.KOM_OUT.Poloz_PravyMvCase5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].4:= P2_Robot.KOM_OUT.Poloz_PravyMvCase5F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].5:= P2_Robot.KOM_OUT.Poloz_PravyMvCase4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].6:= P2_Robot.KOM_OUT.Poloz_TopCover5H;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[7].7:= P2_Robot.KOM_OUT.Poloz_TopCover5F;
	
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].0:= P2_Robot.KOM_OUT.Poloz_TopCover4F;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].1:= P2_Robot.KOM_OUT.Odparkovanie;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].2:= P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia;
	P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].3:= P2_Robot.KOM_OUT.UvolniBusbary;
    P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].4:= P2_Robot.KOM_OUT.ZmenaGripra_4F5F;
    P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].5:= P2_Robot.KOM_OUT.ZmenaGripra_5H;
    P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].6:= P2_Robot.KOM_OUT.ZmenaGripra_Cistenie;
    P2_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[8].7:= P2_Robot.KOM_OUT.ZopakujOdoberanie;
	
	
END_ACTION

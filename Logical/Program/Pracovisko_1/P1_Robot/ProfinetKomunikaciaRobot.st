
ACTION ProfinetKomunikaciaRobot: 

	//Vstupy z Robota do PLC//
	P1_Robot.KOM_IN.Stav_RezimAUTOMAT:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[0].0;
	P1_Robot.KOM_IN.Stav_ProgramRUN:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[0].1;
	P1_Robot.KOM_IN.Stav_MotoryOFF:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[0].2;
	P1_Robot.KOM_IN.Stav_MotoryON:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[0].3;
	P1_Robot.KOM_IN.Stav_RobotCS:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[0].4;
	
	
	P1_Robot.KOM_IN.Stav_DPS_4F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].0;
	P1_Robot.KOM_IN.Stav_DPS_4F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].1;
	P1_Robot.KOM_IN.Stav_DPS_5F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].2;
	P1_Robot.KOM_IN.Stav_DPS_5F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].3;
	P1_Robot.KOM_IN.Stav_Foam4F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].4;
	P1_Robot.KOM_IN.Stav_Foam4F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].5;
	P1_Robot.KOM_IN.Stav_Foam5F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].6;
	P1_Robot.KOM_IN.Stav_Foam5F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[1].7;
	
	P1_Robot.KOM_IN.Stav_RobotBezpPozicia_Srobovanie:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].0;
	P1_Robot.KOM_IN.Stav_RobotOdparkovany:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].1;
	P1_Robot.KOM_IN.Stav_RobotPoziciaCakania:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].2;
	P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].3;
	P1_Robot.KOM_IN.Stav_SpodnyBusbar4F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].4;
	P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].5;
	P1_Robot.KOM_IN.Stav_SpodnyBusbar5F_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].6;
	P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Odobraty:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[2].7;
	
	P1_Robot.KOM_IN.Stav_SpodnyBusbar5H_Polozeny:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[3].0;
    P1_Robot.KOM_IN.Stav_VystupyZresetovane:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[3].1;
    P1_Robot.KOM_IN.Stav_BusbaryUvolnene:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[3].2;
    P1_Robot.KOM_IN.Stav_RobotOdoberaBusbary:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[3].3;
    P1_Robot.KOM_IN.Stav_RobotOdoberaFoamy:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[3].4;
	
	
	P1_Robot.OUT.OdistiGriper_YV107:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].0;
	P1_Robot.OUT.ZaistiGriper_YV106:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].1;
	P1_Robot.OUT.OtvorGriper_YV97:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].2;
	P1_Robot.OUT.ZatvorGriper_YV98:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].3;
	P1_Robot.OUT.ZapniVakum_YV108:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].4;
	P1_Robot.OUT.VypniVakum_YV114:= P1_Robot.KOM_IN.Profinet_PLC_INPUTS[4].5;
	
	
	
	//Vystupy z PLC do Robota//
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].0:= P1_Robot.KOM_OUT.VypniMotory;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].1:= P1_Robot.KOM_OUT.ZapniMotory;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].2:= P1_Robot.KOM_OUT.PP_na_Main;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].3:= P1_Robot.KOM_OUT.StartProgramu;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].4:= P1_Robot.KOM_OUT.StartProgramuMain;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].5:= P1_Robot.KOM_OUT.StopProgramu;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].6:= P1_Robot.KOM_OUT.Reset_CS;
	
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].0:= P1_Robot.KOM_OUT.ManipSrobovania_BezpecnaPozicia;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].1:= P1_Robot.KOM_OUT.OdoberDPS_4F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].2:= P1_Robot.KOM_OUT.OdoberDPS_5F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].3:= P1_Robot.KOM_OUT.OdoberFoam4F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].4:= P1_Robot.KOM_OUT.OdoberFoam5F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].5:= P1_Robot.KOM_OUT.OdoberSpodnyBusbar4F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].6:= P1_Robot.KOM_OUT.OdoberSpodnyBusbar5F_z_Paletky;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].7:= P1_Robot.KOM_OUT.OdoberSpodnyBusbar5H_z_Paletky;
	
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].0:= P1_Robot.KOM_OUT.PolozDPS_4F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].1:= P1_Robot.KOM_OUT.PolozDPS_5F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].2:= P1_Robot.KOM_OUT.PolozFoam4F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].3:= P1_Robot.KOM_OUT.PolozFoam5F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].4:= P1_Robot.KOM_OUT.PolozSpodnyBusbar4F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].5:= P1_Robot.KOM_OUT.PolozSpodnyBusbar5F_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].6:= P1_Robot.KOM_OUT.PolozSpodnyBusbar5H_na_PowerCP;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].7:= P1_Robot.KOM_OUT.Presun_CakaciaPozicia;
	
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].0:= P1_Robot.IN.DokStanPritGrip_BusBary5H_IS77;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].1:= P1_Robot.IN.DokStanPritGrip_BusBary45F_IS78;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].2:= P1_Robot.IN.Griper_Otvoreny_MS40;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].3:= P1_Robot.IN.Griper_Zatvoreny_MS41;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].4:= P1_Robot.IN.SnimacVakua_S20;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].5:= P1_Robot.KOM_OUT.TypGripra_45F;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].6:= P1_Robot.KOM_OUT.TypGripra_5H;
    P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3].7:= P1_Robot.KOM_OUT.Odparkovanie;
    
    P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].0:= P1_Robot.KOM_OUT.UvolniBusbary;
	P1_Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4].1:= P1_Robot.KOM_OUT.ZopakujOdoberanie;
	
END_ACTION


ACTION TesterKomunikacia: 

	//Vstupy z Testera do PLC//
	AteqLeakageTester_A.Stav_RESET_DONE:= AteqLeakageTester_A.Profinet_PLC_INPUTS[1].0;
	AteqLeakageTester_A.Stav_START_DONE:= AteqLeakageTester_A.Profinet_PLC_INPUTS[1].1;
	AteqLeakageTester_A.Stav_ZmenaProgramu_DONE:= AteqLeakageTester_A.Profinet_PLC_INPUTS[1].3;
	AteqLeakageTester_A.Stav_CitanieParametrov_OK:= AteqLeakageTester_A.Profinet_PLC_INPUTS[1].5;
	
    AteqLeakageTester_A.Stav_CitanieParametrov_ERROR:= AteqLeakageTester_A.Profinet_PLC_INPUTS[3].5;
    
	AteqLeakageTester_A.CisloAktualnehoProgramu.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].0;
	AteqLeakageTester_A.CisloAktualnehoProgramu.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].1;
	AteqLeakageTester_A.CisloAktualnehoProgramu.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].2;
	AteqLeakageTester_A.CisloAktualnehoProgramu.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].3;
	AteqLeakageTester_A.CisloAktualnehoProgramu.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].4;
	AteqLeakageTester_A.CisloAktualnehoProgramu.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].5;
	AteqLeakageTester_A.CisloAktualnehoProgramu.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].6;
	AteqLeakageTester_A.CisloAktualnehoProgramu.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[7].7;
	
	AteqLeakageTester_A.CisloAktualnehoProgramu.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].0;
	AteqLeakageTester_A.CisloAktualnehoProgramu.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].1;
	AteqLeakageTester_A.CisloAktualnehoProgramu.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].2;
	AteqLeakageTester_A.CisloAktualnehoProgramu.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].3;
	AteqLeakageTester_A.CisloAktualnehoProgramu.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].4;
	AteqLeakageTester_A.CisloAktualnehoProgramu.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].5;
	AteqLeakageTester_A.CisloAktualnehoProgramu.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].6;
	AteqLeakageTester_A.CisloAktualnehoProgramu.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[8].7;
	
	AteqLeakageTester_A.VysledokTestovania_OK:= AteqLeakageTester_A.Profinet_PLC_INPUTS[13].0;
	AteqLeakageTester_A.VysledokTestovania_NG:= AteqLeakageTester_A.Profinet_PLC_INPUTS[13].1;
	AteqLeakageTester_A.Stav_ERROR:= AteqLeakageTester_A.Profinet_PLC_INPUTS[13].3;
	AteqLeakageTester_A.Stav_READY:= AteqLeakageTester_A.Profinet_PLC_INPUTS[13].5;
	
	
    
    
    AteqLeakageTester_A.ReadParameter_1.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].0;
    AteqLeakageTester_A.ReadParameter_1.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].1;
    AteqLeakageTester_A.ReadParameter_1.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].2;
    AteqLeakageTester_A.ReadParameter_1.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].3;
    AteqLeakageTester_A.ReadParameter_1.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].4;
    AteqLeakageTester_A.ReadParameter_1.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].5;
    AteqLeakageTester_A.ReadParameter_1.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].6;
    AteqLeakageTester_A.ReadParameter_1.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[35].7;
    AteqLeakageTester_A.ReadParameter_1.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].0;
    AteqLeakageTester_A.ReadParameter_1.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].1;
    AteqLeakageTester_A.ReadParameter_1.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].2;
    AteqLeakageTester_A.ReadParameter_1.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].3;
    AteqLeakageTester_A.ReadParameter_1.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].4;
    AteqLeakageTester_A.ReadParameter_1.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].5;
    AteqLeakageTester_A.ReadParameter_1.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].6;
    AteqLeakageTester_A.ReadParameter_1.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[36].7;
    
    AteqLeakageTester_A.ReadParameter_2.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].0;
    AteqLeakageTester_A.ReadParameter_2.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].1;
    AteqLeakageTester_A.ReadParameter_2.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].2;
    AteqLeakageTester_A.ReadParameter_2.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].3;
    AteqLeakageTester_A.ReadParameter_2.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].4;
    AteqLeakageTester_A.ReadParameter_2.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].5;
    AteqLeakageTester_A.ReadParameter_2.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].6;
    AteqLeakageTester_A.ReadParameter_2.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[41].7;
    AteqLeakageTester_A.ReadParameter_2.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].0;
    AteqLeakageTester_A.ReadParameter_2.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].1;
    AteqLeakageTester_A.ReadParameter_2.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].2;
    AteqLeakageTester_A.ReadParameter_2.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].3;
    AteqLeakageTester_A.ReadParameter_2.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].4;
    AteqLeakageTester_A.ReadParameter_2.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].5;
    AteqLeakageTester_A.ReadParameter_2.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].6;
    AteqLeakageTester_A.ReadParameter_2.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[42].7;
    
    AteqLeakageTester_A.ReadParameter_3.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].0;
    AteqLeakageTester_A.ReadParameter_3.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].1;
    AteqLeakageTester_A.ReadParameter_3.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].2;
    AteqLeakageTester_A.ReadParameter_3.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].3;
    AteqLeakageTester_A.ReadParameter_3.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].4;
    AteqLeakageTester_A.ReadParameter_3.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].5;
    AteqLeakageTester_A.ReadParameter_3.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].6;
    AteqLeakageTester_A.ReadParameter_3.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[47].7;
    AteqLeakageTester_A.ReadParameter_3.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].0;
    AteqLeakageTester_A.ReadParameter_3.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].1;
    AteqLeakageTester_A.ReadParameter_3.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].2;
    AteqLeakageTester_A.ReadParameter_3.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].3;
    AteqLeakageTester_A.ReadParameter_3.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].4;
    AteqLeakageTester_A.ReadParameter_3.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].5;
    AteqLeakageTester_A.ReadParameter_3.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].6;
    AteqLeakageTester_A.ReadParameter_3.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[48].7;
    
    AteqLeakageTester_A.ReadParameter_4.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].0;
    AteqLeakageTester_A.ReadParameter_4.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].1;
    AteqLeakageTester_A.ReadParameter_4.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].2;
    AteqLeakageTester_A.ReadParameter_4.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].3;
    AteqLeakageTester_A.ReadParameter_4.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].4;
    AteqLeakageTester_A.ReadParameter_4.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].5;
    AteqLeakageTester_A.ReadParameter_4.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].6;
    AteqLeakageTester_A.ReadParameter_4.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[53].7;
    AteqLeakageTester_A.ReadParameter_4.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].0;
    AteqLeakageTester_A.ReadParameter_4.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].1;
    AteqLeakageTester_A.ReadParameter_4.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].2;
    AteqLeakageTester_A.ReadParameter_4.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].3;
    AteqLeakageTester_A.ReadParameter_4.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].4;
    AteqLeakageTester_A.ReadParameter_4.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].5;
    AteqLeakageTester_A.ReadParameter_4.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].6;
    AteqLeakageTester_A.ReadParameter_4.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[54].7;
    
    AteqLeakageTester_A.ReadParameter_5.0:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].0;
    AteqLeakageTester_A.ReadParameter_5.1:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].1;
    AteqLeakageTester_A.ReadParameter_5.2:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].2;
    AteqLeakageTester_A.ReadParameter_5.3:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].3;
    AteqLeakageTester_A.ReadParameter_5.4:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].4;
    AteqLeakageTester_A.ReadParameter_5.5:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].5;
    AteqLeakageTester_A.ReadParameter_5.6:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].6;
    AteqLeakageTester_A.ReadParameter_5.7:= AteqLeakageTester_A.Profinet_PLC_INPUTS[24].7;
    AteqLeakageTester_A.ReadParameter_5.8:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].0;
    AteqLeakageTester_A.ReadParameter_5.9:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].1;
    AteqLeakageTester_A.ReadParameter_5.10:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].2;
    AteqLeakageTester_A.ReadParameter_5.11:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].3;
    AteqLeakageTester_A.ReadParameter_5.12:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].4;
    AteqLeakageTester_A.ReadParameter_5.13:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].5;
    AteqLeakageTester_A.ReadParameter_5.14:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].6;
    AteqLeakageTester_A.ReadParameter_5.15:= AteqLeakageTester_A.Profinet_PLC_INPUTS[25].7;
    AteqLeakageTester_A.ReadParameter_5.16:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].0;
    AteqLeakageTester_A.ReadParameter_5.17:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].1;
    AteqLeakageTester_A.ReadParameter_5.18:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].2;
    AteqLeakageTester_A.ReadParameter_5.19:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].3;
    AteqLeakageTester_A.ReadParameter_5.20:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].4;
    AteqLeakageTester_A.ReadParameter_5.21:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].5;
    AteqLeakageTester_A.ReadParameter_5.22:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].6;
    AteqLeakageTester_A.ReadParameter_5.23:= AteqLeakageTester_A.Profinet_PLC_INPUTS[26].7;
    AteqLeakageTester_A.ReadParameter_5.24:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].0;
    AteqLeakageTester_A.ReadParameter_5.25:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].1;
    AteqLeakageTester_A.ReadParameter_5.26:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].2;
    AteqLeakageTester_A.ReadParameter_5.27:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].3;
    AteqLeakageTester_A.ReadParameter_5.28:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].4;
    AteqLeakageTester_A.ReadParameter_5.29:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].5;
    AteqLeakageTester_A.ReadParameter_5.30:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].6;
    AteqLeakageTester_A.ReadParameter_5.31:= AteqLeakageTester_A.Profinet_PLC_INPUTS[27].7;
    
    
    
    
    
	//Vystupy z PLC do Testera//
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[1].0:= AteqLeakageTester_A.RESET_Vysledkov;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[1].1:= AteqLeakageTester_A.START_Testovania;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[1].3:= AteqLeakageTester_A.ZMEN_Program;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[1].5:= AteqLeakageTester_A.CitajParametreTestera;
    
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].0:= AteqLeakageTester_A.CisloZadanehoProgramu.0;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].1:= AteqLeakageTester_A.CisloZadanehoProgramu.1;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].2:= AteqLeakageTester_A.CisloZadanehoProgramu.2;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].3:= AteqLeakageTester_A.CisloZadanehoProgramu.3;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].4:= AteqLeakageTester_A.CisloZadanehoProgramu.4;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].5:= AteqLeakageTester_A.CisloZadanehoProgramu.5;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].6:= AteqLeakageTester_A.CisloZadanehoProgramu.6;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[7].7:= AteqLeakageTester_A.CisloZadanehoProgramu.7;
	
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].0:= AteqLeakageTester_A.CisloZadanehoProgramu.8;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].1:= AteqLeakageTester_A.CisloZadanehoProgramu.9;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].2:= AteqLeakageTester_A.CisloZadanehoProgramu.10;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].3:= AteqLeakageTester_A.CisloZadanehoProgramu.11;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].4:= AteqLeakageTester_A.CisloZadanehoProgramu.12;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].5:= AteqLeakageTester_A.CisloZadanehoProgramu.13;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].6:= AteqLeakageTester_A.CisloZadanehoProgramu.14;
	AteqLeakageTester_A.Profinet_PLC_OUTPUTS[8].7:= AteqLeakageTester_A.CisloZadanehoProgramu.15;

	
	AteqLeakageTester_A.PocetCitanychParametrov:= 4;
    AteqLeakageTester_A.IdentifikaciaParametra_1:= 1;
    AteqLeakageTester_A.IdentifikaciaParametra_2:= 2;
    AteqLeakageTester_A.IdentifikaciaParametra_3:= 66;
    AteqLeakageTester_A.IdentifikaciaParametra_4:= 60;
	
    //Vy��tan� parametre//
    CasPneniaREAL:= UINT_TO_REAL(AteqLeakageTester_A.ReadParameter_1);
    AteqLeakageTester_A.CasPnenia:= CasPneniaREAL/1000;
    CasStabilizacieREAL:= UINT_TO_REAL(AteqLeakageTester_A.ReadParameter_2);
    AteqLeakageTester_A.CasStabilizacie:= CasStabilizacieREAL/1000;
    TlakPlneniaREAL:= UINT_TO_REAL(AteqLeakageTester_A.ReadParameter_3);
    AteqLeakageTester_A.TlakPlnenia:= TlakPlneniaREAL/1000;
    ToleranciaREAL:= UINT_TO_REAL(AteqLeakageTester_A.ReadParameter_4);
    AteqLeakageTester_A.Tolerancia:= ToleranciaREAL/1000;
    TlakUnikuREAL:= DINT_TO_REAL(AteqLeakageTester_A.ReadParameter_5);
    AteqLeakageTester_A.TlakUniku:= ((TlakUnikuREAL/1000)*6)/1536;
    
    
    
	
END_ACTION

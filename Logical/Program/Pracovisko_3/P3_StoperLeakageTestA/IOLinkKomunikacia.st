
ACTION IOLinkKomunikacia: 

	
	//Snímaè paletky//
	P3_LeakageTestA.IN.PritomnostPaletky_S23:= P3_LeakageTestA.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P3_LeakageTestA.IN.PrecitaneCisloPaletky_S23:= P3_LeakageTestA.PAR.SnimacPaletky_IOLinkInputs[9];
	
	//Snímaè tlaku//
	P3_LeakageTestA.IN.VyrovnavaciTlak_OK_S26:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.0;
	
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.0:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.2;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.1:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.3;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.2:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.4;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.3:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.5;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.4:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.6;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.5:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.7;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.6:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.8;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.7:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.9;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.8:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.10;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.9:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.11;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.10:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.12;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.11:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.13;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.12:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.14;
	P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26.13:= P3_LeakageTestA.PAR.SnimacTlaku_IOLinkInputs.15;
	
	P3_LeakageTestA.IN.PreratanyVyrovnavaciTlak_Bar:= P3_LeakageTestA.IN.PrecitanyVyrovnavaciTlak_S26 * 0.1;
	
END_ACTION

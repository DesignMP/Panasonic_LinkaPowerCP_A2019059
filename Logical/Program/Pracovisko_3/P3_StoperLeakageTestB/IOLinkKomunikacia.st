
ACTION IOLinkKomunikacia: 

	
	//Snímaè paletky//
	P3_LeakageTestB.IN.PritomnostPaletky_S24:= P3_LeakageTestB.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P3_LeakageTestB.IN.PrecitaneCisloPaletky_S24:= P3_LeakageTestB.PAR.SnimacPaletky_IOLinkInputs[9];
	
	//Snímaè tlaku//
	P3_LeakageTestB.IN.VyrovnavaciTlak_OK_S27:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.0;
	
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.0:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.2;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.1:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.3;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.2:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.4;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.3:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.5;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.4:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.6;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.5:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.7;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.6:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.8;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.7:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.9;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.8:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.10;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.9:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.11;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.10:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.12;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.11:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.13;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.12:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.14;
	P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27.13:= P3_LeakageTestB.PAR.SnimacTlaku_IOLinkInputs.15;
	
	P3_LeakageTestB.IN.PreratanyVyrovnavaciTlak_Bar:= P3_LeakageTestB.IN.PrecitanyVyrovnavaciTlak_S27 * 0.1;
	
END_ACTION

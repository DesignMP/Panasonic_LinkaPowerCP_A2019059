
ACTION IOLinkKomunikacia: 

	//Snímaè paletky//	
	P2_StoperMaticovacky.IN.PritomnostPaletky_S7:= P2_StoperMaticovacky.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P2_StoperMaticovacky.IN.PrecitaneCisloPaletky_S7:= P2_StoperMaticovacky.PAR.SnimacPaletky_IOLinkInputs[9];
	
    //Snímaè vysunutia maticovaèky M4//
    Round_0.VstupnaHodnota:= P2_SkrutkovacMatic.IN.SkrutkMatic_VysunutHrotu_IOlink;
    P2_SkrutkovacMatic.IN.SkrutkMatic_VysunutieHrotu_IOS7:= Round_0.VystupnaHodnota;  
    Round_0();
	
END_ACTION

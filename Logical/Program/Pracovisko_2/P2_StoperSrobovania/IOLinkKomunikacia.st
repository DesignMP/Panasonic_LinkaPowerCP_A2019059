
ACTION IOLinkKomunikacia: 

	
	//Sn�ma� paletky//
	P2_StoperSrobovania.IN.PritomnostPaletky_S8:= P2_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P2_StoperSrobovania.IN.PrecitaneCisloPaletky_S8:= P2_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[9];
	
    //Sn�ma� vysunutia �robova�ky M4//
    Round_0.VstupnaHodnota:= P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOlink;
    P2_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS4:= Round_0.VystupnaHodnota;
    Round_0();
    
    //Sn�ma� vysunutia �robova�ky M5//
    Round_1.VstupnaHodnota:= P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOlink;
    P2_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS5:= Round_1.VystupnaHodnota; 
    Round_1();
    
    //Sn�ma� vysunutia �robova�ky M6//
    Round_2.VstupnaHodnota:= P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOlink;
    P2_Srobovanie.IN.SkrutkM6_VysunutieHrotu_IOS3:= Round_2.VystupnaHodnota; 
    Round_2();
	
END_ACTION
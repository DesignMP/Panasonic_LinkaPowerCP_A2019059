
ACTION IOLinkKomunikacia: 

	
	//Sn�ma� paletky//
	P3_StoperSrobovania.IN.PritomnostPaletky_S22:= P3_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P3_StoperSrobovania.IN.PrecitaneCisloPaletky_S22:= P3_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[9];
	
    //Sn�ma� vysunutia �robova�ky K40//
    Round_0.VstupnaHodnota:= P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOlink;
    P3_Srobovanie.IN.SkrutkK40_VysunutieHrotu_IOS11:= Round_0.VystupnaHodnota;    
    Round_0();
    
    
    //Sn�ma� vysunutia �robova�ky M5//
    Round_1.VstupnaHodnota:= P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOlink;
    P3_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS12:= Round_1.VystupnaHodnota;    
    Round_1();
	
END_ACTION

ACTION IOLinkKomunikacia: 

	//Sn�ma� paletky//
	P1_StoperSrobovania.IN.PritomnostPaletky_S16:= P1_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P1_StoperSrobovania.IN.PrecitaneCisloPaletky_S16:= P1_StoperSrobovania.PAR.SnimacPaletky_IOLinkInputs[9];
	
    //Sn�ma� vysunutia �robova�ky K30//
    Round_0.VstupnaHodnota:= P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOlink;
    P1_Srobovanie.IN.SkrutkK30_VysunutieHrotu_IOS8:= Round_0.VystupnaHodnota;  
    Round_0();
    
    //Sn�ma� vysunutia �robova�ky M4//
    Round_1.VstupnaHodnota:= P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOlink;
    P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10:= Round_1.VystupnaHodnota;
    Round_1();
    
    //Sn�ma� vysunutia �robova�ky M5//
    Round_2.VstupnaHodnota:= P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOlink;
    P1_Srobovanie.IN.SkrutkM5_VysunutieHrotu_IOS9:= Round_2.VystupnaHodnota;
    Round_2();
    
END_ACTION

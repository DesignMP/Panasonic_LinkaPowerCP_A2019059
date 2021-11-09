
PROGRAM _INIT
	TprazdnyZasobnik.PT:=T#2000ms;
	TakumulaciaPlna.PT:=T#1000ms;
	TakumulaciaPrazdna.PT:=T#1000ms;
	TvytvorenieVakua.PT:=T#200ms;
	TodvetranieVakua.PT:=T#200ms;
	TvibrovanieHrniec.PT:=T#3000ms;
	TvibrovanieLista.PT:=T#5000ms;
	TpredOtocenim.PT:= T#1000ms;
	TvyfukovaniePredVibrovanim.PT:= T#1000ms;
	TpodaniaSkrutky.PT:= T#1000ms;
	TvypnutieOfuku.PT:= T#2000ms;
	TpoOtoceni.PT:= T#5s;
	TofukVibrolisty.PT:= T#1000ms;
END_PROGRAM

PROGRAM _CYCLIC
	
     
    
    
	(********************Mapovanie IN/OUT********************************)
	SkrutkovaciSet.Manual:= P1_Srobovanie.SkrutkovaciSet_M5.Manual;
	SkrutkovaciSet.Automat:= P1_Srobovanie.SkrutkovaciSet_M5.Automat;
	SkrutkovaciSet.SkrutkaOdobrata:=P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Odobrata;
	P1_Srobovanie.SkrutkovaciSet_M5.SkrutkaM5_Pripravena:= SkrutkovaciSet.SkrutkaPripravena;
	
	IF P1_Srobovanie.SkrutkovaciSet_M5.Reset THEN
		SkrutkovaciSet.VretenoFaza:=0;
		P1_Srobovanie.SkrutkovaciSet_M5.Reset:= FALSE;
	END_IF	
	
	
	SkrutkovaciSet.Vreteno.IN.ReturnStroke:=P1_Srobovanie.IN.SkrutkM5_ZASUNUTY_MS39;
	SkrutkovaciSet.Vreteno.IN.VakuumDosiahnute:=P1_Srobovanie.IN.SkrutkM5_SnimacVakua_S28;

	
	SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchStart:=P1_Srobovanie.IN.VibrolistaSrobM5_KONIEC_OS9;
	SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchEnd:=P1_Srobovanie.IN.ZasobSrobM5_ListaPLNA_OS8;
	SkrutkovaciSet.Zasobnik.IN.EscapementPickUp:=P1_Srobovanie.IN.OddelSrobM5_OtocenyVZAD_MS38;
	SkrutkovaciSet.Zasobnik.IN.EscapementDrop:=P1_Srobovanie.IN.OddelSrobM5_OtocenyVPRED_MS37;
	SkrutkovaciSet.Zasobnik.IN.FeederLevelControl:=P1_Srobovanie.IN.ZasobSrobM5_PRAZDNY_IS53;
	SkrutkovaciSet.Zasobnik.IN.InlineControl:=P1_Srobovanie.IN.OddelSrobM5_SrobaNaVstupe_OS13;
	SkrutkovaciSet.Zasobnik.IN.ScrewAvailable:=P1_Srobovanie.IN.OddelSrobM5_SrobaNaVystupe_OS14;
	

	
	P1_Srobovanie.OUT.ZasobSrobM5_Ofuk_RUN_YV94:=SkrutkovaciSet.Zasobnik.OUT.BlowOff;
	P1_Srobovanie.OUT.OddelovacSrobM5_OtocVPRED_YV103:=SkrutkovaciSet.Zasobnik.OUT.EscapementDrop;
	P1_Srobovanie.OUT.OddelovacSrobM5_OtocVZAD_YV102:=SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp;
	P1_Srobovanie.OUT.ZasobSrobM5_OfukTried_RUN_YV95:=SkrutkovaciSet.Zasobnik.OUT.SortingAir;
	P1_Srobovanie.OUT.ZasobSrobM5_Vibrov_RUN_FM10:=SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec;
	P1_Srobovanie.OUT.VibrolistaSrobM5_Vibrov_RUN_FM11:=SkrutkovaciSet.Zasobnik.OUT.StartA20Lista;
	
	(********************Èasáky********************************)
	TprazdnyZasobnik();	
	TakumulaciaPlna();
	TakumulaciaPrazdna();
	TvytvorenieVakua();
	TodvetranieVakua();
	TvibrovanieHrniec();
	TvibrovanieLista();
	TpredOtocenim();
	TvyfukovaniePredVibrovanim();
	TpodaniaSkrutky();
	TvypnutieOfuku();
	TpoOtoceni();
	TofukVibrolisty();
	(********************Zásobnik********************************)		
	//kontrola akumulacie	
	IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchStart=1 THEN
		TakumulaciaPlna.IN:=1;
	ELSE
		TakumulaciaPlna.IN:=0;
	END_IF
	
	IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchEnd=0 THEN
		TakumulaciaPrazdna.IN:=1;
	ELSE
		TakumulaciaPrazdna.IN:=0;
	END_IF
	
	//kontrola naplnenia zasobnika
	IF SkrutkovaciSet.Zasobnik.IN.FeederLevelControl=1 THEN
		TprazdnyZasobnik.IN:=1;
	ELSE
		TprazdnyZasobnik.IN:=0;
	END_IF
	
	//Ovládanie vzduchov zásobníka//
	IF ZapniHrniec THEN
		IF TakumulaciaPlna.Q=1 AND TakumulaciaPrazdna.Q=0  THEN
			SkrutkovaciSet.Zasobnik.OUT.BlowOff:=1;
		ELSIF TakumulaciaPrazdna.Q=1 THEN
			SkrutkovaciSet.Zasobnik.OUT.BlowOff:=0;
		END_IF    
		SkrutkovaciSet.Zasobnik.OUT.SortingAir:= 1;
	ELSIF ZapniListu THEN 
		TofukVibrolisty.IN:= TRUE;
		SkrutkovaciSet.Zasobnik.OUT.SortingAir:= NOT TofukVibrolisty.Q;	
	ELSE
		SkrutkovaciSet.Zasobnik.OUT.BlowOff:=0;
	END_IF    
    
    
	TvypnutieOfuku.IN:= NOT SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec;
     
    
	IF TvypnutieOfuku.Q THEN
		SkrutkovaciSet.Zasobnik.OUT.SortingAir:= 0;
	END_IF 
      
    
    
	//ovladanie vibracneho podavaca
	IF SkrutkovaciSet.VretenoFaza>3 AND SkrutkovaciSet.VretenoFaza<250 THEN
		IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchStart=0 THEN
			ZapniHrniec:=1;
		ELSIF TvibrovanieHrniec.Q=1 AND SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchEnd=1 AND NOT P1_Srobovanie.RR_ZapniHrniec_M5 THEN
			ZapniHrniec:=0;
		END_IF	
	END_IF
	
	IF ZapniHrniec THEN
		TvyfukovaniePredVibrovanim.IN:= 1;
	ELSE
		TvyfukovaniePredVibrovanim.IN:= 0;
	END_IF	
		
	IF ZapniHrniec AND TvyfukovaniePredVibrovanim.Q THEN
		ZapniListu:=TRUE;
		SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec:=1;
	ELSE
		SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec:=0;
	END_IF	
	
	
	IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchEnd=1 THEN
		TvibrovanieHrniec.IN:=1;
	ELSE
		TvibrovanieHrniec.IN:=0;
	END_IF
	
	//Ovládanie vybrolišty//
	IF ZapniListu AND TofukVibrolisty.Q THEN
		SkrutkovaciSet.Zasobnik.OUT.StartA20Lista:= TRUE;
	ELSE	
		SkrutkovaciSet.Zasobnik.OUT.StartA20Lista:= FALSE;
	END_IF	
	
	
	IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitchStart=1 AND SkrutkovaciSet.Zasobnik.OUT.StartA20Lista=1 THEN
		TvibrovanieLista.IN:=1;
	ELSE
		TvibrovanieLista.IN:=0;
	END_IF
        
	IF TvibrovanieLista.Q AND NOT SkrutkovaciSet.Zasobnik.IN.EscapementPickUp AND NOT P1_Srobovanie.RR_ZapniVibrolistu_M5 AND NOT SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec THEN
		ZapniListu:= FALSE;
	END_IF  

	
	
	
	
	//Zapnutie hrnca v ruènom režime//
	IF EDGEPOS(P1_Srobovanie.RR_ZapniHrniec_M5) THEN
		ZapniHrniec:= TRUE;
	END_IF
	IF EDGENEG(P1_Srobovanie.RR_ZapniHrniec_M5) THEN
		ZapniHrniec:= FALSE;
	END_IF
    
	//Zapnutie vybrolisty v ruènom režime//
	IF EDGEPOS(P1_Srobovanie.RR_ZapniVibrolistu_M5) THEN
		ZapniListu:= TRUE;
	END_IF
    
	IF EDGENEG(P1_Srobovanie.RR_ZapniVibrolistu_M5) THEN
		ZapniListu:= FALSE;
	END_IF
    
	//Otáèenie podavaèa v ruènom režime//
	IF P1_Srobovanie.RR_OtocPodavacM5_VPRED THEN
		SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:= FALSE;
		SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:= TRUE;
		P1_Srobovanie.RR_OtocPodavacM5_VPRED:= FALSE;
	ELSIF P1_Srobovanie.RR_OtocPodavacM5_VZAD THEN
		SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:= FALSE;
		SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:= TRUE;
		P1_Srobovanie.RR_OtocPodavacM5_VZAD:= FALSE;
	END_IF    
    
	IF P1_Srobovanie.IN.OddelSrobM5_OtocenyVPRED_MS37 THEN
		SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:= FALSE;
	END_IF
    
	IF P1_Srobovanie.IN.OddelSrobM5_OtocenyVZAD_MS38 THEN  
		SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:= FALSE;
	END_IF       
        
           
        
	
	(********************Vreteno********************************)
	CASE SkrutkovaciSet.VretenoFaza OF
		0: SkrutkovaciSet.VretenoStatus:="Vypnute";
			SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
			SkrutkovaciSet.Vreteno.OUT.VacuumOff:=0;
			SkrutkovaciSet.Vreteno.OUT.VacuumOn:=0;
		
            
			SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=0;
			SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=0;
			SkrutkovaciSet.Zasobnik.OUT.StartA20Hrniec:=0;
			SkrutkovaciSet.Zasobnik.OUT.StartA20Lista:=0;
			SkrutkovaciSet.Manual:= 0;
			SkrutkovaciSet.Automat:= 0;
			SkrutkovaciSet.SkrutkaOdobrata:= 0;
			SkrutkovaciSet.SkrutkaPripravena:= 0;
			TpredOtocenim.IN:= 0;
			TpoOtoceni.IN:= 0;
			TvyfukovaniePredVibrovanim.IN:= 0;
			TpodaniaSkrutky.IN:= 0;
			ZapniHrniec:= 0;
			ZapniListu:= 0;
			P1_Srobovanie.STAV.Podanie_M5_BUSY:= FALSE;
			SkrutkovaciSet.VretenoFaza:=1;
			
		1: SkrutkovaciSet.VretenoStatus:="Inicializacia: cakam na povel";	
			IF SkrutkovaciSet.Automat=1 THEN
				SkrutkovaciSet.VretenoFaza:=2;
			ELSIF SkrutkovaciSet.Manual=1 THEN
				SkrutkovaciSet.VretenoFaza:=250;
			ELSIF P1_Srobovanie.RR_PodajSkrutkuM5 THEN
				P1_Srobovanie.STAV.Podanie_M5_BUSY:= TRUE;
				SkrutkovaciSet.VretenoFaza:=2;
			END_IF
		
		2: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na natocenie kolisky na vstup";
			IF SkrutkovaciSet.Zasobnik.IN.ScrewAvailable=1 THEN
				SkrutkovaciSet.VretenoFaza:=10;
			ELSE    
				SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=1;
				IF SkrutkovaciSet.Zasobnik.IN.EscapementPickUp=1 THEN
					SkrutkovaciSet.VretenoFaza:=3;
				END_IF
			END_IF    
		
		3: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na pritomnost skrutky na vstupe";
			ZapniListu:=1;
			ZapniHrniec:= 1;
			IF SkrutkovaciSet.Zasobnik.IN.InlineControl=1 THEN
				SkrutkovaciSet.VretenoFaza:=4;
			END_IF
		
		4: SkrutkovaciSet.VretenoStatus:="Inicializacia: Natocenie kolisky na vystup";
			TpredOtocenim.IN:= 1;
			IF TpredOtocenim.Q THEN
				TpredOtocenim.IN:= 0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=1;
				SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=0;
				SkrutkovaciSet.VretenoFaza:=8;
			END_IF    
			
		8: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na natocenie kolisky na vystup";
			TpoOtoceni.IN:= 1;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementDrop=1 THEN
				TpoOtoceni.IN:= 0;
				SkrutkovaciSet.VretenoFaza:=10;
			ELSIF TpoOtoceni.Q THEN
				TpoOtoceni.IN:= 0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=1;
				SkrutkovaciSet.VretenoFaza:=4;
			END_IF
		
		10: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na pritomnost skrutky na vystupe";			
			IF SkrutkovaciSet.Zasobnik.IN.ScrewAvailable=1 THEN
				SkrutkovaciSet.VretenoFaza:=100;
			END_IF
		
		100: SkrutkovaciSet.VretenoStatus:="Pripravene: cakam na povel";		
			SkrutkovaciSet.SkrutkaPripravena:=1;
			IF SkrutkovaciSet.SkrutkaOdobrata=1 THEN				
				SkrutkovaciSet.VretenoFaza:=101;
			ELSIF P1_Srobovanie.RR_PodajSkrutkuM5 THEN
				P1_Srobovanie.STAV.Podanie_M5_BUSY:= FALSE;
				P1_Srobovanie.RR_PodajSkrutkuM5:= FALSE;
				SkrutkovaciSet.VretenoFaza:=0;
			END_IF
	
		101: SkrutkovaciSet.VretenoStatus:="Cakam kym zmizne skrutka zo snimaca";	
                       
			IF SkrutkovaciSet.Zasobnik.IN.ScrewAvailable=0 THEN
				SkrutkovaciSet.SkrutkaPripravena:=0;
				SkrutkovaciSet.VretenoFaza:=102;
			END_IF	
			
		102: SkrutkovaciSet.VretenoStatus:="Cakam na zrusenie signalu skrutka odobrata";	
			IF SkrutkovaciSet.SkrutkaOdobrata=0 THEN				
				SkrutkovaciSet.VretenoFaza:=150;
			END_IF
		
		150: SkrutkovaciSet.VretenoStatus:="Cakam na otocenie kolisky na vstup";
			SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=0;
			SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=1;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementPickUp=1 THEN
				ZapniListu:=1;
				ZapniHrniec:= 1;
				SkrutkovaciSet.VretenoFaza:=151;
			END_IF
		
		151: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na pritomnost skrutky na vstupe";			
			IF SkrutkovaciSet.Zasobnik.IN.InlineControl=1 THEN
				SkrutkovaciSet.VretenoFaza:=152;
			END_IF
		
		152: SkrutkovaciSet.VretenoStatus:="Inicializacia: Natocenie kolisky na vystup";
			TpredOtocenim.IN:= 1;
			IF TpredOtocenim.Q THEN
				TpredOtocenim.IN:= 0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=1;
				SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=0;
				SkrutkovaciSet.VretenoFaza:=153;
			END_IF
		
		153: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na natocenie kolisky na vystup";            
			TpoOtoceni.IN:= 1;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementDrop=1 THEN
				TpoOtoceni.IN:= 0;
				SkrutkovaciSet.VretenoFaza:=155;
			ELSIF TpoOtoceni.Q THEN
				TpoOtoceni.IN:= 0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementDrop:=0;
				SkrutkovaciSet.Zasobnik.OUT.EscapementPickUp:=1;
				SkrutkovaciSet.VretenoFaza:=152;
			END_IF
          
            
            
		155: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na pritomnost skrutky na vystupe";			
			IF SkrutkovaciSet.Zasobnik.IN.ScrewAvailable=1 THEN
				SkrutkovaciSet.VretenoFaza:=100;
			END_IF
		
		
		250: SkrutkovaciSet.VretenoStatus:="Rucny rezim";	
			SkrutkovaciSet.Manual:=0;
	END_CASE
	
	
END_PROGRAM

PROGRAM _EXIT
END_PROGRAM


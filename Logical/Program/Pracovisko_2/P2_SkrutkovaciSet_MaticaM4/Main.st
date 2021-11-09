


PROGRAM _INIT
	TprazdnyZasobnik.PT:=T#2000ms;
	TakumulaciaPlna.PT:=T#1000ms;
	TvytvorenieVakua.PT:=T#200ms;
	TodvetranieVakua.PT:=T#200ms;
	ToneskorenieVysunutia.PT:= T#500ms;
	ToneskorenieZasunutia.PT:= T#500ms;
	TvyfukovaniePredVibrovanim.PT:= T#1000ms;
    Tvibrovanie.PT:=T#3000ms;
    Stav_MaticaPripravena:= FALSE; 
    TpodaniaSkrutky.PT:= T#1000ms;
    TpredMaticaPripravena.PT:= T#1000ms; 
    TpripravaMatice.PT:= T#2000ms;
    TvypnutieOfuku.PT:= T#2000ms;
END_PROGRAM

PROGRAM _CYCLIC
	(********************Mapovanie IN/OUT********************************)

	SkrutkovaciSet.Manual:= P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Manual;
	SkrutkovaciSet.Automat:= P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Automat;
	SkrutkovaciSet.SkrutkaOdobrata:= P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Odobrata;
	P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.MaticaM4_Pripravena:= SkrutkovaciSet.SkrutkaPripravena;	
	
	SkrutkovaciSet.Vreteno.IN.DeptControl;
	SkrutkovaciSet.Vreteno.IN.PushClinderAR:= P2_SkrutkovacMatic.IN.DavkMatic_VYSUNUTY_IS26;
	SkrutkovaciSet.Vreteno.IN.PushClinderGR:= P2_SkrutkovacMatic.IN.DavkMatic_ZASUNUTY_IS25;
	SkrutkovaciSet.Vreteno.IN.ReturnStroke:= P2_SkrutkovacMatic.IN.SkrutkMatic_ZASUNUTY_MS9;
	SkrutkovaciSet.Vreteno.IN.ScrewControl:= P2_SkrutkovacMatic.IN.DavkMatic_PritomnostMatice_OS2;
	SkrutkovaciSet.Vreteno.IN.ScrewMeasurement:= P2_SkrutkovacMatic.IN.OddelMatic_MaticaPresla_IS24;
	SkrutkovaciSet.Vreteno.IN.ScrewMeasurementPushCylinder:= P2_SkrutkovacMatic.IN.DavkMatic_MaticaPresla_IS27;
		
	P2_SkrutkovacMatic.OUT.PosuvacMatic_PosunMaticu_YV68:=SkrutkovaciSet.Vreteno.OUT.PushCylinder;
		
	SkrutkovaciSet.Zasobnik.IN.AccumulationSwitch:= P2_SkrutkovacMatic.IN.ZasobMatic_ListaPLNA_OS1;
	SkrutkovaciSet.Zasobnik.IN.FeederLevelControl:= P2_SkrutkovacMatic.IN.ZasobMatic_PRAZDNY_IS23;
	SkrutkovaciSet.Zasobnik.IN.EscapementAR:= P2_SkrutkovacMatic.IN.OddelMatic_Otoceny_VPRED_MS59;
	SkrutkovaciSet.Zasobnik.IN.EscapementGR:= P2_SkrutkovacMatic.IN.OddelMatic_Otoceny_VZAD_MS58;
		
	P2_SkrutkovacMatic.OUT.ZasobMatic_Ofuk_RUN_YV63:=SkrutkovaciSet.Zasobnik.OUT.BlowOff;
	P2_SkrutkovacMatic.OUT.OddelMatic_PosunMaticu_YV69:=SkrutkovaciSet.Zasobnik.OUT.Escapement;
	P2_SkrutkovacMatic.OUT.OddelMatic_NastrelMaticu_YV65:=SkrutkovaciSet.Zasobnik.OUT.FeedAir;
	P2_SkrutkovacMatic.OUT.ZasobMatic_OfukTried_RUN_YV64:=SkrutkovaciSet.Zasobnik.OUT.SortingAir;
	P2_SkrutkovacMatic.OUT.ZasobMatic_Vibrovanie_RUN_FM1:=SkrutkovaciSet.Zasobnik.OUT.StartA20;
		
	IF P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Reset THEN
		SkrutkovaciSet.VretenoFaza:=0;
		P2_SkrutkovacMatic.SkrutkovaciSet_MaticaM4.Reset:= FALSE;
	END_IF	
	
	
	(********************Èasáky********************************)
	TprazdnyZasobnik();	
	TakumulaciaPlna();
	TvytvorenieVakua();
	TodvetranieVakua();
	ToneskorenieVysunutia();
    ToneskorenieZasunutia();
    Tvibrovanie();
    TvyfukovaniePredVibrovanim();
    TpodaniaSkrutky();
    TpredMaticaPripravena();
    TpripravaMatice();
    TvypnutieOfuku();
	(********************Zásobnik********************************)
		
	//kontrola akumulacie
	IF SkrutkovaciSet.Zasobnik.IN.AccumulationSwitch=1 THEN
		TakumulaciaPlna.IN:=1;
	ELSE
		TakumulaciaPlna.IN:=0;
	END_IF
	
	//kontrola naplnenia zasobnika
	IF SkrutkovaciSet.Zasobnik.IN.FeederLevelControl=1 THEN
		TprazdnyZasobnik.IN:=1;
	ELSE
		TprazdnyZasobnik.IN:=0;
	END_IF
	


    IF ZapniHrniec THEN
        TvyfukovaniePredVibrovanim.IN:= 1;
    ELSE
		TvyfukovaniePredVibrovanim.IN:= 0;
	END_IF	
    
	IF ZapniHrniec AND TvyfukovaniePredVibrovanim.Q THEN
        SkrutkovaciSet.Zasobnik.OUT.StartA20:=1;
        Tvibrovanie.IN:=1;
	ELSE
        SkrutkovaciSet.Zasobnik.OUT.StartA20:=0;
        Tvibrovanie.IN:=0;
	END_IF	
	
    IF Tvibrovanie.Q=1 THEN
        IF TakumulaciaPlna.Q=1 AND NOT P2_SkrutkovacMatic.RR_ZapniHrniec THEN
            ZapniHrniec:= 0;
        END_IF
    END_IF
    
    //Zapnutie hrnca v ruènom režime//
    IF EDGEPOS(P2_SkrutkovacMatic.RR_ZapniHrniec) THEN
        ZapniHrniec:= TRUE;
    END_IF
    IF EDGENEG(P2_SkrutkovacMatic.RR_ZapniHrniec) THEN
        ZapniHrniec:= FALSE;
    END_IF
    
    
    //Ovládanie vzduchov zásobníka//
    IF ZapniHrniec THEN
        IF TakumulaciaPlna.Q=1 THEN
            SkrutkovaciSet.Zasobnik.OUT.BlowOff:=1;
        ELSE
            SkrutkovaciSet.Zasobnik.OUT.BlowOff:=0;
        END_IF    
        SkrutkovaciSet.Zasobnik.OUT.SortingAir:= 1;
    ELSE
        SkrutkovaciSet.Zasobnik.OUT.BlowOff:=0;
    END_IF    
    
    IF NOT SkrutkovaciSet.Zasobnik.OUT.StartA20 AND NOT ZapniHrniec THEN
        TvypnutieOfuku.IN:= 1;
    ELSE
        TvypnutieOfuku.IN:= 0;
    END_IF  
    
    IF EDGEPOS(TvypnutieOfuku.Q) THEN
        SkrutkovaciSet.Zasobnik.OUT.SortingAir:= 0;
    END_IF 
    
    
    
    
	
	(********************Vreteno********************************)
	CASE SkrutkovaciSet.VretenoFaza OF
		0: SkrutkovaciSet.VretenoStatus:="Vypnute";
			SkrutkovaciSet.Vreteno.OUT.CounterBlast:=0;
			SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
			
			
			SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
			SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
			
			SkrutkovaciSet.Zasobnik.OUT.StartA20:=0;
			
			SkrutkovaciSet.SkrutkaPripravena:=0;
			
			TprazdnyZasobnik.IN:=0;	
			TakumulaciaPlna.IN:=0;
			TvytvorenieVakua.IN:=0;
			TodvetranieVakua.IN:=0;
			ToneskorenieVysunutia.IN:=0; 
            ToneskorenieZasunutia.IN:= 0;
            TpodaniaSkrutky.IN:= 0;
            TpredMaticaPripravena.IN:= 0;
            TpripravaMatice.IN:= 0;
			ZapniHrniec:= 0;
			SkrutkovaciSet.VretenoFaza:=1;
		
		1: SkrutkovaciSet.VretenoStatus:="Inicializacia: cakam na povel";	
			IF SkrutkovaciSet.Automat=1 THEN
				SkrutkovaciSet.SkrutkaPripravena:=0;
				SkrutkovaciSet.VretenoFaza:=2;
			ELSIF SkrutkovaciSet.Manual=1 THEN
				SkrutkovaciSet.VretenoFaza:=250;
			ELSIF P2_SkrutkovacMatic.RR_PodajMaticu THEN
				Stav_MaticaPripravena:= FALSE;
				SkrutkovaciSet.VretenoFaza:=2;
			END_IF	
	
		2: SkrutkovaciSet.VretenoStatus:="Inicializacia: cakam na snimac koliska vo vstupnej polohe";
			SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementGR=1 THEN
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=1;
				SkrutkovaciSet.VretenoFaza:=3;
			END_IF
			
		3: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: podavaci piest zasunuty";
			SkrutkovaciSet.Vreteno.OUT.PushCylinder:=0;
			IF SkrutkovaciSet.Vreteno.IN.PushClinderGR=1 THEN
				SkrutkovaciSet.VretenoFaza:=4;
			END_IF		
			
		4: SkrutkovaciSet.VretenoStatus:="Inicializacia: kontrolujem pritomnost matky";
			IF SkrutkovaciSet.Vreteno.IN.ScrewControl=1 THEN
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
				SkrutkovaciSet.VretenoFaza:=100;
			ELSE
				SkrutkovaciSet.VretenoFaza:=5;
			END_IF
			
		5: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: podavaci piest vysunuty";
			SkrutkovaciSet.Vreteno.OUT.PushCylinder:=1;
			IF SkrutkovaciSet.Vreteno.IN.PushClinderAR=1 THEN
				SkrutkovaciSet.VretenoFaza:=6;
			END_IF	
			
		6: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: podavaci piest zasunuty";
			SkrutkovaciSet.Vreteno.OUT.PushCylinder:=0;
			IF SkrutkovaciSet.Vreteno.IN.PushClinderGR=1 THEN
				SkrutkovaciSet.VretenoFaza:=7;
			END_IF	
			
		7: SkrutkovaciSet.VretenoStatus:="Inicializacia: kontrolujem pritomnost matky";
			IF SkrutkovaciSet.Vreteno.IN.ScrewControl=1 THEN
				SkrutkovaciSet.Vreteno.OUT.Vacuum:=1;
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
				SkrutkovaciSet.VretenoFaza:=100;
			ELSE
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
				SkrutkovaciSet.VretenoFaza:=150;
			END_IF
			
		100: SkrutkovaciSet.VretenoStatus:="Pripravene: cakam na povel";
			SkrutkovaciSet.SkrutkaPripravena:=1;
			IF P2_SkrutkovacMatic.RR_PodajMaticu THEN
				SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
				SkrutkovaciSet.SkrutkaPripravena:=0;	
				P2_SkrutkovacMatic.RR_PodajMaticu:= FALSE;
                SkrutkovaciSet.VretenoFaza:=0;
			END_IF	
			
			IF SkrutkovaciSet.SkrutkaOdobrata=1 THEN
				SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
				SkrutkovaciSet.SkrutkaPripravena:=0;
				SkrutkovaciSet.VretenoFaza:=101;
			END_IF
			
		101: SkrutkovaciSet.VretenoStatus:="Cakam kym zmizne signal skrutka odobrata";	
			SkrutkovaciSet.SkrutkaPripravena:=0;
			IF SkrutkovaciSet.SkrutkaOdobrata=0 THEN
				SkrutkovaciSet.VretenoFaza:=150;
			END_IF	
			
		150: SkrutkovaciSet.VretenoStatus:="Cakam kym zasobnik pripravy skrutku";
			ZapniHrniec:= 1;
            IF TakumulaciaPlna.Q=1 AND SkrutkovaciSet.Zasobnik.OUT.StartA20 THEN
                TpodaniaSkrutky.IN:= 1;
            END_IF
                
            IF TpodaniaSkrutky.Q THEN
                TpodaniaSkrutky.IN:= 0;   
                SkrutkovaciSet.VretenoFaza:=151;
			END_IF
			
		151: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: koliska vo vystupnej polohe";
			SkrutkovaciSet.Zasobnik.OUT.Escapement:=1;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementAR=1 THEN				
				SkrutkovaciSet.VretenoFaza:=152;
			END_IF		
					
		152: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: skrutka presla hadicou za zasobnikom";
            
            TpripravaMatice.IN:=1;
			IF SkrutkovaciSet.Vreteno.IN.ScrewMeasurement=1 THEN
                SkrutkovaciSet.Zasobnik.OUT.FeedAir:=1;
                TpripravaMatice.IN:=0;
                SkrutkovaciSet.VretenoFaza:=153;
            ELSIF TpripravaMatice.Q THEN
                TpripravaMatice.IN:=0;
                SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
                SkrutkovaciSet.VretenoFaza:=150;
			END_IF	
		
          
            
            
		153: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: skrutka presla hadicou pred piestom";
			SkrutkovaciSet.Zasobnik.OUT.FeedAir:=1;
			IF SkrutkovaciSet.Vreteno.IN.ScrewMeasurementPushCylinder=1 THEN
				ToneskorenieVysunutia.IN:= 1;
			END_IF
			IF ToneskorenieVysunutia.Q THEN
				ToneskorenieVysunutia.IN:= 0;
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
				SkrutkovaciSet.VretenoFaza:=154;
			END_IF	
			
		154: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: podavaci piest vysunuty";
			SkrutkovaciSet.Vreteno.OUT.PushCylinder:=1;
			SkrutkovaciSet.Vreteno.OUT.Vacuum:=1;
			IF SkrutkovaciSet.Vreteno.IN.PushClinderAR=1 THEN
				SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
				SkrutkovaciSet.VretenoFaza:=155;
			END_IF	
	
		155: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: matka v hlavici";
			ToneskorenieZasunutia.IN:= SkrutkovaciSet.Vreteno.IN.ScrewControl;
			IF SkrutkovaciSet.Vreteno.IN.ScrewControl=1 AND ToneskorenieZasunutia.Q THEN
				ToneskorenieZasunutia.IN:= 0;
				SkrutkovaciSet.VretenoFaza:=156;
			END_IF	
			
		156: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: podavaci piest zasunuty";
			SkrutkovaciSet.Vreteno.OUT.PushCylinder:=0;
			IF SkrutkovaciSet.Vreteno.IN.PushClinderGR=1 THEN
				SkrutkovaciSet.VretenoFaza:=157;
			END_IF		
			
		157: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: koliska vo vstupnej polohe";
			SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
			IF SkrutkovaciSet.Zasobnik.IN.EscapementGR=1 THEN				
				SkrutkovaciSet.VretenoFaza:=158;
			END_IF
			
		158: SkrutkovaciSet.VretenoStatus:="Novy cyklus";
			SkrutkovaciSet.VretenoFaza:=100;
	END_CASE
	
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


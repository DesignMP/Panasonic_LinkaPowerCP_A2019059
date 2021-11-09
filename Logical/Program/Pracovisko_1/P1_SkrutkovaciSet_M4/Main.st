
PROGRAM _INIT
    TprazdnyZasobnik.PT:=T#2000ms;
    TakumulaciaPlna.PT:=T#1000ms;
    TvytvorenieVakua.PT:=T#200ms;
    TodvetranieVakua.PT:=T#1s;
    TprefukPredBrzdou.PT:=T#2000ms;
    TprefukZaBrzdou.PT:=T#2000ms;
    TvysuvanieSpindle.PT:=T#1s;
    TpripravaSkrutky.PT:=T#3000ms;
    ToddelovacZakladnaPoloha.PT:=T#1000ms;
    TodsatieNecistot.PT:=T#1000ms;
    Tvibrovanie.PT:=T#3000ms;
    TvyfukovaniePredVibrovanim.PT:= T#1000ms;
    TpodaniaSkrutky.PT:= T#1000ms;
    TpredSkrutkaPripravena.PT:= T#1s;
    TvypnutieOfuku.PT:= T#2000ms;  
    TalarmuVysunutiaSkrutkovacky.PT:= T#10s;
END_PROGRAM

PROGRAM _CYCLIC
    
       
    
	(********************Mapovanie IN/OUT********************************)

    SkrutkovaciSet.Manual:= P1_Srobovanie.SkrutkovaciSet_M4.Manual;
    SkrutkovaciSet.Automat:= P1_Srobovanie.SkrutkovaciSet_M4.Automat;
    SkrutkovaciSet.SkrutkaOdobrata:=P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Odobrata;
    P1_Srobovanie.SkrutkovaciSet_M4.SkrutkaM4_Pripravena:= SkrutkovaciSet.SkrutkaPripravena;
    P1_Srobovanie.SkrutkovaciSet_M4.CistenieUkoncene:= SkrutkovaciSet.CistenieVykonane;
    SkrutkovaciSet.VykonajCistenie:= P1_Srobovanie.SkrutkovaciSet_M4.Cistenie;
	
    SkrutkovaciSet.Vreteno.IN.BrakeClosed:=P1_Srobovanie.IN.SkrutkM4_Cist_BrzdaZatvoren_MS19;
    SkrutkovaciSet.Vreteno.IN.BrakeOpen:=P1_Srobovanie.IN.SkrutkM4_Cist_BrzdaOtvorena_MS18;
    SkrutkovaciSet.Vreteno.IN.DeptControl:=P1_Srobovanie.IN.SkrutkM4_ZASUNUTY_MS17;
    SkrutkovaciSet.Vreteno.IN.ScrewMeasurement:=P1_Srobovanie.IN.SkrutkM4_SrobaPresla_IS47;
    SkrutkovaciSet.Vreteno.IN.ScrewMeasurementBrake:=P1_Srobovanie.IN.SkrutkM4_Cist_SrobaPresla_IS48;
	
    IF P1_Srobovanie.SkrutkovaciSet_M4.Reset AND SkrutkovaciSet.VretenoFaza <> 102 AND SkrutkovaciSet.VretenoFaza <> 104 THEN
        SkrutkovaciSet.VretenoFaza:=0;
        P1_Srobovanie.SkrutkovaciSet_M4.Reset:= FALSE;
    END_IF	
	
    SkrutkovaciSet.Zasobnik.IN.AccumulationSwitch:=P1_Srobovanie.IN.ZasobSrobM4_ListaPLNA_OS6;
    SkrutkovaciSet.Zasobnik.IN.FeederLevelControl:=P1_Srobovanie.IN.ZasobSrobM4_PRAZDNY_IS44;
    SkrutkovaciSet.Zasobnik.IN.ScrewMeasurement:=P1_Srobovanie.IN.NastrelSrobM4_SrobaPresla_IS46;
	
    P1_Srobovanie.OUT.SkrutkM4_Cist_POSUN_YV83:=SkrutkovaciSet.Vreteno.OUT.BlastAirBrake;
    P1_Srobovanie.OUT.SkrutkM4_Cist_OTVOR_YV82:=SkrutkovaciSet.Vreteno.OUT.BrakeSpindle;
    P1_Srobovanie.OUT.SkrutkM4_OfukVakua_RUN_YV80:=SkrutkovaciSet.Vreteno.OUT.CounterBlast;
    IF SkrutkovaciSet.VretenoFaza>1 AND SkrutkovaciSet.VretenoFaza<100 THEN
        P1_Srobovanie.OUT.SkrutkM4_VYSUN_YV79:=SkrutkovaciSet.Vreteno.OUT.Spindle;
    END_IF	
    P1_Srobovanie.OUT.SkrutkM4_Cist_ODSAVANIE_YV84:=SkrutkovaciSet.Vreteno.OUT.WasteExtraction;
    IF SkrutkovaciSet.VykonajCistenie THEN
        P1_Srobovanie.OUT.SkrutkM4_PrisavSkrutky_RUN_YV81:=SkrutkovaciSet.Vreteno.OUT.Vacuum;
    END_IF		
    P1_Srobovanie.OUT.ZasobSrobM4_Ofuk_RUN_YV72:=SkrutkovaciSet.Zasobnik.OUT.BlowOff;
    P1_Srobovanie.OUT.NastrelSrobM4_PosunSrobu_YV77:=SkrutkovaciSet.Zasobnik.OUT.Escapement;
    P1_Srobovanie.OUT.NastrelSrobM4_NastrelSrobu_YV78:=SkrutkovaciSet.Zasobnik.OUT.FeedAir;
    P1_Srobovanie.OUT.ZasobSrobM4_OfukTried_RUN_YV73:=SkrutkovaciSet.Zasobnik.OUT.SortingAir;
    P1_Srobovanie.OUT.ZasobSrobM4_Vibrovanie_RUN_FM9:= SkrutkovaciSet.Zasobnik.OUT.StartA20;
    (********************Èasáky********************************)
    TprazdnyZasobnik();	
    TakumulaciaPlna();
    TvytvorenieVakua();
    TodvetranieVakua();
    TprefukPredBrzdou();
    TprefukZaBrzdou();
    TvysuvanieSpindle();
    TpripravaSkrutky();
    ToddelovacZakladnaPoloha();
    TodsatieNecistot();
    Tvibrovanie();
    TvyfukovaniePredVibrovanim();
    TpodaniaSkrutky();
    TpredSkrutkaPripravena();
    TvypnutieOfuku();
    TalarmuVysunutiaSkrutkovacky();
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
    
    
    
    //ovladanie vibracneho podavaca
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
        IF TakumulaciaPlna.Q=1 AND NOT P1_Srobovanie.RR_ZapniHrniec_M4 THEN
            ZapniHrniec:= 0;
        END_IF
    END_IF
	
    //Zapnutie hrnca v ruènom režime//
    IF EDGEPOS(P1_Srobovanie.RR_ZapniHrniec_M4) THEN
        ZapniHrniec:= TRUE;
    END_IF
    IF EDGENEG(P1_Srobovanie.RR_ZapniHrniec_M4) THEN
        ZapniHrniec:= FALSE;
    END_IF
    
    
    
    
    //Zrušenie signálu skrutka pripravená//
    IF SkrutkovaciSet.SkrutkaPripravena=1 THEN
        IF SkrutkovaciSet.SkrutkaOdobrata=1 THEN
            SkrutkovaciSet.SkrutkaPripravena:=0;
        END_IF
    END_IF    
    
    
	
    (********************Vreteno********************************)
    CASE SkrutkovaciSet.VretenoFaza OF
        0: SkrutkovaciSet.VretenoStatus:="Vypnute";
            SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;
            SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=0;
            SkrutkovaciSet.Vreteno.OUT.CounterBlast:=0;
            SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
            SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
            SkrutkovaciSet.Vreteno.OUT.WasteExtraction:=0;
			
            
            SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
            SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
            
            SkrutkovaciSet.Zasobnik.OUT.StartA20:=0;
			
            SkrutkovaciSet.CistenieVykonane:=0;
            SkrutkovaciSet.SkrutkaPripravena:=0;
			
            TprazdnyZasobnik.IN:=0;	
            TakumulaciaPlna.IN:=0;
            TvytvorenieVakua.IN:=0;
            TodvetranieVakua.IN:=0;
            TprefukPredBrzdou.IN:=0;
            TprefukZaBrzdou.IN:=0;
            TvysuvanieSpindle.IN:=0;
            TpripravaSkrutky.IN:=0;
            ToddelovacZakladnaPoloha.IN:=0;
            TodsatieNecistot.IN:=0;
            TpodaniaSkrutky.IN:= 0;
            TpredSkrutkaPripravena.IN:= 0;
            TalarmuVysunutiaSkrutkovacky.IN:= 0;
            ZapniHrniec:= 0;
            PocetPokusovOpripravuSkrutky:=0;
            StavSkrutkovackaVysunuta:= 0;
            SkrutkovaciSet.VretenoFaza:=1;
					
        1: SkrutkovaciSet.VretenoStatus:="Inicializacia: cakam na povel";	
            IF SkrutkovaciSet.Automat=1 THEN
                SkrutkovaciSet.CistenieVykonane:=0;
                SkrutkovaciSet.SkrutkaPripravena:=0;
                SkrutkovaciSet.VretenoFaza:=2;
            ELSIF SkrutkovaciSet.Manual=1 THEN
                SkrutkovaciSet.VretenoFaza:=250;
            END_IF	
			
        2: SkrutkovaciSet.VretenoStatus:="Inicializacia: cakam na povel precisti hadice";	
            
            IF SkrutkovaciSet.VykonajCistenie=1 THEN
                SkrutkovaciSet.Vreteno.OUT.Vacuum:=1;
                SkrutkovaciSet.VretenoFaza:=3;
            END_IF		
			
        3: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno vysunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=1;
            TalarmuVysunutiaSkrutkovacky.IN:= 1;
            
            IF P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                StavSkrutkovackaVysunuta:= TRUE;
                TvysuvanieSpindle.IN:=1;
            END_IF
            
            
            IF TvysuvanieSpindle.Q=1 AND StavSkrutkovackaVysunuta THEN
                TodvetranieVakua.IN:= 1;
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=1;
                SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
            END_IF
            
            
            IF TvysuvanieSpindle.Q AND StavSkrutkovackaVysunuta AND TodvetranieVakua.Q THEN
                StavSkrutkovackaVysunuta:= FALSE;
                TalarmuVysunutiaSkrutkovacky.IN:= 0;
                TvysuvanieSpindle.IN:=0;
                TodvetranieVakua.IN:= 0;
                SkrutkovaciSet.VretenoFaza:=4;
            ELSIF TalarmuVysunutiaSkrutkovacky.Q THEN
                P1_Alarmy[144]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
        4: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno zasunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
            IF SkrutkovaciSet.Vreteno.IN.DeptControl=1 THEN
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=0;
                SkrutkovaciSet.VretenoFaza:=5;
            END_IF
			
        5: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na prefuknutie hadice za brzdou";	
            TprefukZaBrzdou.IN:=1;
            SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=1;
            IF TprefukZaBrzdou.Q=1 THEN
                TprefukZaBrzdou.IN:=0;
                SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;
                SkrutkovaciSet.VretenoFaza:=6;
            END_IF
			
        6: SkrutkovaciSet.VretenoStatus:="Inicializacia: vypinam prefuk";	
            TprefukZaBrzdou.IN:=0;
            SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;		
            SkrutkovaciSet.Vreteno.OUT.Vacuum:=1;
            SkrutkovaciSet.VretenoFaza:=7;
	
        7: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno vysunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=1;
            TalarmuVysunutiaSkrutkovacky.IN:= 1;
            
            IF P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                StavSkrutkovackaVysunuta:= TRUE;
                TvysuvanieSpindle.IN:=1;
            END_IF
            
            IF TvysuvanieSpindle.Q=1 AND StavSkrutkovackaVysunuta THEN
                TodvetranieVakua.IN:= 1;
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=1;
                SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
            END_IF
            
            
            IF TvysuvanieSpindle.Q AND StavSkrutkovackaVysunuta AND TodvetranieVakua.Q THEN
                StavSkrutkovackaVysunuta:= FALSE;
                TalarmuVysunutiaSkrutkovacky.IN:= 0;
                TvysuvanieSpindle.IN:=0;
                TodvetranieVakua.IN:= 0;
                SkrutkovaciSet.VretenoFaza:=8;
            ELSIF TalarmuVysunutiaSkrutkovacky.Q THEN
                P1_Alarmy[144]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
        8: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno zasunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
            IF SkrutkovaciSet.Vreteno.IN.DeptControl=1 THEN
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=0;
                SkrutkovaciSet.VretenoFaza:=9;
            END_IF
			
        9: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na prefuknutie hadice pred brzdou";	
            TprefukPredBrzdou.IN:=1;
            SkrutkovaciSet.Zasobnik.OUT.FeedAir:=1;
            IF TprefukPredBrzdou.Q=1 THEN
                TprefukPredBrzdou.IN:=0;
                SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
                SkrutkovaciSet.VretenoFaza:=10;
            END_IF
			
        10: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: brzda uvolnena";	
            SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=1;
            IF SkrutkovaciSet.Vreteno.IN.BrakeOpen=1 THEN
                SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=1;
                SkrutkovaciSet.VretenoFaza:=11;
            END_IF
	
        11: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na prefuknutie hadice za brzdou";	
            TprefukZaBrzdou.IN:=1;
            SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=1;
            IF TprefukZaBrzdou.Q=1 THEN
                TprefukZaBrzdou.IN:=0;
                SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;
                SkrutkovaciSet.VretenoFaza:=12;
            END_IF
			
        12: SkrutkovaciSet.VretenoStatus:="Inicializacia: vypinam prefuk";	
            TprefukZaBrzdou.IN:=0;
            SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;
            SkrutkovaciSet.Vreteno.OUT.Vacuum:=1;
            SkrutkovaciSet.VretenoFaza:=13;
	
        13: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno vysunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=1;
            TalarmuVysunutiaSkrutkovacky.IN:= 1;
            
            IF P1_Srobovanie.IN.SkrutkM4_VysunutieHrotu_IOS10 > 1 THEN
                StavSkrutkovackaVysunuta:= TRUE;
                TvysuvanieSpindle.IN:=1;
            END_IF
            
            IF TvysuvanieSpindle.Q=1 AND StavSkrutkovackaVysunuta THEN
                TodvetranieVakua.IN:= 1;
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=1;
                SkrutkovaciSet.Vreteno.OUT.Vacuum:=0;
            END_IF
            
            
            IF TvysuvanieSpindle.Q AND StavSkrutkovackaVysunuta AND TodvetranieVakua.Q THEN
                StavSkrutkovackaVysunuta:= FALSE;
                TalarmuVysunutiaSkrutkovacky.IN:= 0;
                TvysuvanieSpindle.IN:=0;
                TodvetranieVakua.IN:= 0;
                SkrutkovaciSet.VretenoFaza:=14;
            ELSIF TalarmuVysunutiaSkrutkovacky.Q THEN
                P1_Alarmy[144]:= TRUE;
                P1_PoruchaST2:= TRUE;
            END_IF
			
        14: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: vreteno zasunute";	
            SkrutkovaciSet.Vreteno.OUT.Spindle:=0;
            IF SkrutkovaciSet.Vreteno.IN.DeptControl=1 THEN
                SkrutkovaciSet.Vreteno.OUT.CounterBlast:=0;
                SkrutkovaciSet.VretenoFaza:=15;
            END_IF
			
        15: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na snimac: brzda zasunuta";	
            SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=0;
            IF SkrutkovaciSet.Vreteno.IN.BrakeClosed=1 THEN
                SkrutkovaciSet.CistenieVykonane:=1;
                SkrutkovaciSet.VretenoFaza:=16;
            END_IF
			
        16: SkrutkovaciSet.VretenoStatus:="Inicializacia: Cakam na zrusenie signalu: vykonaj cistenie";	
            IF SkrutkovaciSet.VykonajCistenie=0 THEN
                SkrutkovaciSet.CistenieVykonane:=0;
                SkrutkovaciSet.SkrutkaPripravena:=0;
                SkrutkovaciSet.VretenoFaza:=100;
            END_IF
			
        100: SkrutkovaciSet.VretenoStatus:="Cakam kym zasobnik pripravy skrutku";
            ZapniHrniec:= 1;
            IF TakumulaciaPlna.Q=1 AND SkrutkovaciSet.Zasobnik.OUT.StartA20 THEN
                TpodaniaSkrutky.IN:= 1;
            END_IF
            
            IF TpodaniaSkrutky.Q THEN
                TpodaniaSkrutky.IN:= 0;
                SkrutkovaciSet.VretenoFaza:=102;			
            END_IF
			
        102: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: skrutka presla hadicou";
            SkrutkovaciSet.Zasobnik.OUT.Escapement:=1;
            TpripravaSkrutky.IN:=1;
            IF SkrutkovaciSet.Zasobnik.IN.ScrewMeasurement=1 THEN
                SkrutkovaciSet.Zasobnik.OUT.FeedAir:=1;
                TpripravaSkrutky.IN:=0;
                SkrutkovaciSet.VretenoFaza:=104;
            ELSIF TpripravaSkrutky.Q=1 THEN
                TpripravaSkrutky.IN:=0;
                SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
                SkrutkovaciSet.VretenoFaza:=100;
            END_IF		
					
        104: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: skrutka presla hadicou pred brzdou";			
            IF SkrutkovaciSet.Vreteno.IN.ScrewMeasurementBrake=1 THEN
                SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
                SkrutkovaciSet.Zasobnik.OUT.FeedAir:=0;
                PocetPokusovOpripravuSkrutky:=0;
                SkrutkovaciSet.VretenoFaza:=106;
            END_IF
			
        106: SkrutkovaciSet.VretenoStatus:="Cakam na odsatie necistot";	
            SkrutkovaciSet.Vreteno.OUT.WasteExtraction:=1;
            TodsatieNecistot.IN:=1;
              
            IF TodsatieNecistot.Q=1 THEN
                TodsatieNecistot.IN:=0;
                SkrutkovaciSet.Vreteno.OUT.WasteExtraction:=0;
                SkrutkovaciSet.VretenoFaza:=107;
            END_IF	
		
        107: SkrutkovaciSet.VretenoStatus:="Cakam kym skrutkovacka odoberie skrutku";
            IF SkrutkovaciSet.SkrutkaPripravena=0 AND SkrutkovaciSet.SkrutkaOdobrata=0 THEN
                SkrutkovaciSet.VretenoFaza:=108;
            END_IF		
							
        108: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: brzda uvolnena";	
            SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=1;
            IF SkrutkovaciSet.Vreteno.IN.BrakeOpen=1 THEN
                SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=1;
                SkrutkovaciSet.VretenoFaza:=110;
            END_IF
			
        110: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: skrutka presla hadicou pred vretenom";
            IF SkrutkovaciSet.Vreteno.IN.ScrewMeasurement=1 THEN
                SkrutkovaciSet.Vreteno.OUT.BlastAirBrake:=0;
                SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=0;
                SkrutkovaciSet.VretenoFaza:=112;
            END_IF
			
        112: SkrutkovaciSet.VretenoStatus:="Cakam na snimac: brzda zabrzdena";
            SkrutkovaciSet.Vreteno.OUT.BrakeSpindle:=0;
            IF SkrutkovaciSet.Vreteno.IN.BrakeClosed=1 AND SkrutkovaciSet.SkrutkaOdobrata=0 THEN
                TpredSkrutkaPripravena.IN:= 1;
                IF TpredSkrutkaPripravena.Q THEN
                    TpredSkrutkaPripravena.IN:= 0;
                    SkrutkovaciSet.SkrutkaPripravena:=1;
                    SkrutkovaciSet.VretenoFaza:=100;
                END_IF    
            END_IF
			
            //*************** opakovany pokus o oddelenie skrutky *********************************
			
        170: SkrutkovaciSet.VretenoStatus:="Cakam na presunutie oddelovaca do zakladnej polohy";
            SkrutkovaciSet.Zasobnik.OUT.Escapement:=0;
            ToddelovacZakladnaPoloha.IN:=1;
            IF ToddelovacZakladnaPoloha.Q=1 THEN
                ToddelovacZakladnaPoloha.IN:=0;
                PocetPokusovOpripravuSkrutky:=PocetPokusovOpripravuSkrutky+1;
                IF PocetPokusovOpripravuSkrutky>3 THEN
                    PocetPokusovOpripravuSkrutky:=0;
                    SkrutkovaciSet.VretenoFaza:=171;
                ELSE
                    SkrutkovaciSet.VretenoFaza:=100;
                END_IF				
            END_IF
			
        171: SkrutkovaciSet.VretenoStatus:="Zaseknuta skrutka v oddelovaci!!!";	
    END_CASE	
	
	
	
	
	
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


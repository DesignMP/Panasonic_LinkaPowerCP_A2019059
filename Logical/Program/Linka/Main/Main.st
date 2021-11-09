
PROGRAM _INIT
	
    Linka.PAR.IndexModelu:= 1;
    CasCakaniaNaDruhePracovisko:= 120000;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //Volba modelu//
    IF Linka.STAV.Vypnuta THEN
        IF Linka.PAR.IndexModelu = 0 THEN
            Linka.PAR.ZvolenyModel:= '4F';
        ELSIF Linka.PAR.IndexModelu = 1 THEN
            Linka.PAR.ZvolenyModel:= '5F';
        ELSIF Linka.PAR.IndexModelu = 2 THEN
            Linka.PAR.ZvolenyModel:= '5H';
        END_IF  
    END_IF
    
    
    
    //Volanie podprogramov//
    ProfinetKomunikaciaCU;
	
    (*Pri zmene modelu kontrolovat Ëi s˙ vymenenÈ prÌpravky na testeroch inaË nepovoliù spustenie v˝roby*)
	
    //**************************Zmena Ëasu a d·tumu***************************************//
    IF Vizu.NastavCasPLC THEN
        DTSetTime_0.enable:= TRUE;
        DTSetTime_0.DT1:= Vizu.ZadanyCasPLC;
        DTSetTime_0();
    END_IF	
	
    IF DTSetTime_0.status = 0 THEN
        Vizu.NastavCasPLC:= FALSE;
        DTSetTime_0.enable:= FALSE;
        DTSetTime_0();
    END_IF	
		
	
    //**********************NaËÌtanie Ëasu a d·tumu do vizualiz·cie**************************//
    DTGetTime_0.enable:= TRUE;
    Vizu.AktualnyCasPLC:= DTGetTime_0.DT1;
    DTGetTime_0();
		

    
    //**************************Stav linka vypnuta********************************************//
    IF P1_Pracovisko.STAV.Automat THEN
        Linka.STAV.Vypnuta:= FALSE;
    ELSIF P2_Pracovisko.STAV.Automat THEN
        Linka.STAV.Vypnuta:= FALSE; 
    ELSIF P3_Pracovisko.STAV.Automat THEN
        Linka.STAV.Vypnuta:= FALSE; 
    ELSIF P4_Pracovisko.STAV.Automat THEN
        Linka.STAV.Vypnuta:= FALSE; 
    ELSE
        Linka.STAV.Vypnuta:= TRUE;
    END_IF    
    
    //***************************Stav linka po inicializacii********************************************//
    IF NOT P1_Pracovisko.STAV.PoINIT THEN
        Linka.STAV.PoINIT:= FALSE;
    ELSIF NOT P2_Pracovisko.STAV.PoINIT THEN
        Linka.STAV.PoINIT:= FALSE; 
    ELSIF NOT P3_Pracovisko.STAV.PoINIT THEN
        Linka.STAV.PoINIT:= FALSE; 
    ELSIF NOT P4_Pracovisko.STAV.PoINIT THEN
        Linka.STAV.PoINIT:= FALSE; 
    ELSE
        Linka.STAV.PoINIT:= TRUE;
    END_IF  
	
	
    //**************************Stav linka prazdna********************************************//
    IF NOT P1_StoperSrobovania.IN.PritomnostPaletky_S16 AND
        NOT P1_AkumulacnyStoper.IN.PritomnPaletky_IS45 AND
        NOT P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6 AND
        NOT P2_StoperMaticovacky.IN.PritomnostPaletky_S7 AND
        NOT P2_StoperSrobovania.IN.PritomnostPaletky_S8 AND
        NOT P2_StoperZvarania.IN.PritomnostPaletky_S9 AND
        NOT P3_StoperSrobovania.IN.PritomnostPaletky_S22 AND
        NOT P3_AkumulacnyStoper.IN.PritomnPaletky_IS65 AND
        NOT P3_LeakageTestA.IN.PritomnostPaletky_S23 AND
        NOT P3_LeakageTestB.IN.PritomnostPaletky_S24 AND
        NOT P4_FunkcnyTestA.IN.PritomnostPaletky_S10 AND
        NOT P4_FunkcnyTestB.IN.PritomnostPaletky_S11 AND
        NOT P4_Etiketovacka.IN.PritomnostPaletky_S12 AND
        NOT P4_Vytah.IN.PritomnostPaletky_S13 THEN
        Linka.STAV.LinkaPrazdna:= TRUE;
    ELSE
        Linka.STAV.LinkaPrazdna:= FALSE;
    END_IF	
	
    //**************************Reûim vypr·zdnenia linky*******************************************//
    Linka.VyprazdnenieLinky;
	
   
   
    //**************************Zber fotiek do adresara DMP**************************************//
    Linka.ZberFotiek;
  
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


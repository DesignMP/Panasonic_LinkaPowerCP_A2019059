
PROGRAM _INIT
    
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_Uzivatelia);
    
    
      //************************************Konvertovanie kódu èitaèky do stringu****************************************************//
    FOR i:= 0 TO 7 BY 1 DO
        brsstrcpy(ADR(PrecitaneDataSTRING[i]),ADR(PrecitaneData_Panel3[i]));
    END_FOR
	
    //Spajanie pola stringov do stringu//
    KodCitackySTRING:= PrecitaneDataSTRING[0];
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[1]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[2]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[3]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[4]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[5]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[6]));
    brsstrcat(ADR(KodCitackySTRING), ADR(PrecitaneDataSTRING[7]));
	
    //**************************************************Kontrola èi je karta priložená******************************************************//
      
    IF KodCitackySTRING <> '' THEN
        CasControlyKarty.IN:= TRUE;
    ELSE    
        CasControlyKarty.IN:= FALSE;
    END_IF    
     
    
    IF CasControlyKarty.Q THEN
        UsersVizu.KartaPrilozena_Panel3:= TRUE;
    ELSE	
        UsersVizu.KartaPrilozena_Panel3:= FALSE;
    END_IF
    
    CasControlyKarty.PT:= T#1s;
    CasControlyKarty();
    
    //***************************************************Kontrola èi je uživatel už prihlásený**********************************************//
    IF UsersVizu.MenoPrihlasenehoUzivatela_Panel3 = '' THEN
        P34_UzivatelPrihlaseny:= FALSE;
    ELSE
        P34_UzivatelPrihlaseny:= TRUE;
    END_IF    
    
//    P34_UzivatelPrihlaseny:= TRUE;
//    P34_UrovenPrihlasenehoUzivatela:= 20;
    
    //Kontrola karty//
    
    IF KodCitackySTRING = '' THEN
        PrecitaneCisloKarty:= '';
    ELSE    
        PrecitaneCisloKarty:= KodCitackySTRING;
    END_IF 
    
    CASE SC_Uzivatelia.Step OF
        
        0://Nulovanie//
            SC_Uzivatelia.StepName:= '0 - Nulovanie'; 
            UsersVizu.OdhlasUzivatela_Panel3:= FALSE;
            a:= 0;
            SC_Uzivatelia.ResetStep:= TRUE;
            SC_Uzivatelia.Step:= 1;
        
        1://Rozhodnutie o èinnosti//
            SC_Uzivatelia.StepName:= '1 - Rozhodnutie o cinnosti';
            IF UsersVizu.KartaPrilozena_Panel3 THEN
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 10;
            ELSIF UsersVizu.OdhlasUzivatela_Panel3 THEN
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 20;
            END_IF    
        
        10://Kontrola udajov karty//
            SC_Uzivatelia.StepName:= '10 - Kontrola udajov karty';	
            SC_Uzivatelia.IdleTime.PT:= T#2s;
            SC_Uzivatelia.AlarmTime.PT:= T#2s;
        
            IF NOT P34_UzivatelPrihlaseny THEN
                IF PrecitaneCisloKarty <> '' THEN
                    SC_Uzivatelia.ResetStep:= TRUE;
                    SC_Uzivatelia.Step:= 13; 
                ELSE
                    SC_Uzivatelia.ResetStep:= TRUE;
                    SC_Uzivatelia.Step:= 100;
                END_IF
            ELSE
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 100;
            END_IF    
            
                      
        13://Hladanie prihlaseného uživatela v zoznamoch//
            SC_Uzivatelia.StepName:= '13 - Hladanie prihlaseneho uzivatela';	
            SC_Uzivatelia.IdleTime.PT:= T#2s;
            SC_Uzivatelia.AlarmTime.PT:= T#2s;
            
            IF Uzivatel[a].CisloKarty = PrecitaneCisloKarty THEN
                UsersVizu.MenoPrihlasenehoUzivatela_Panel3:= Uzivatel[a].Meno;
                UsersVizu.CisloPrihlasenejKarty_Panel3:= Uzivatel[a].CisloKarty;
                P34_UrovenPrihlasenehoUzivatela:= Uzivatel[a].UrovenUzivatela;
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 100;
            ELSE
                IF a < 100 THEN
                    a:= a + 1;
                ELSE
                    SC_Uzivatelia.ResetStep:= TRUE;
                    SC_Uzivatelia.Step:= 15;
                END_IF
            END_IF	
            
        15://Priradenie èísla karty//   
            SC_Uzivatelia.StepName:= '15 - Priradenie cisla karty';	
            SC_Uzivatelia.IdleTime.PT:= T#2s;
            SC_Uzivatelia.AlarmTime.PT:= T#2s;
            
            UsersVizu.MenoPrihlasenehoUzivatela_Panel3:= 'Operator';
            UsersVizu.CisloPrihlasenejKarty_Panel1:= PrecitaneCisloKarty;
            SC_Uzivatelia.ResetStep:= TRUE;
            SC_Uzivatelia.Step:= 100;
          
            
        20://Odhlásenie uživatela//
            SC_Uzivatelia.StepName:= '20 - Odhlasenie uzivatela';	
            SC_Uzivatelia.IdleTime.PT:= T#2s;
            SC_Uzivatelia.AlarmTime.PT:= T#2s;
            
            UsersVizu.MenoPrihlasenehoUzivatela_Panel3:= '';
            UsersVizu.CisloPrihlasenejKarty_Panel3:= '';
            P34_UrovenPrihlasenehoUzivatela:= 0;
            SC_Uzivatelia.ResetStep:= TRUE;
            SC_Uzivatelia.Step:= 100;
            
            
        
        100://Èakam na odobratie karty//
            SC_Uzivatelia.StepName:= '110 - Cakanie na odobratie karty';	
            SC_Uzivatelia.IdleTime.PT:= T#1s;
            SC_Uzivatelia.AlarmTime.PT:= T#2s;
			
            SC_Uzivatelia.IdleTime.IN:= NOT UsersVizu.KartaPrilozena_Panel3;
			
            IF SC_Uzivatelia.IdleTime.Q THEN
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 0;
            END_IF	
        
        
        
    END_CASE    
    
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


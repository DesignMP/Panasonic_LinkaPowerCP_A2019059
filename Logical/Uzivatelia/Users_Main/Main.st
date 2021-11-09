
PROGRAM _INIT
	MpRecipeXml_1.Load:= TRUE;
		
END_PROGRAM

PROGRAM _CYCLIC

	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_Uzivatelia);
	
	
	//Naèítanie receptur z pamäte//
	IF MpRecipeXml_1.Load AND (MpRecipeXml_1.CommandDone OR MpRecipeXml_1.Error) THEN
		MpRecipeXml_1.Load:= FALSE;
	END_IF	
	
	//Konfigurácia receptur//
	MpRecipeXml_1.MpLink:= ADR(gUserXml);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_1.Enable:= TRUE;
	MpRecipeXml_1.Category:= ADR('UZIVATELIA');
	MpRecipeXml_1.Category:= ADR(strCategory);
	MpRecipeXml_1.DeviceName:= ADR('HDD_Users');  //Názov media, kde sa budú receptury ukladat//
	MpRecipeXml_1.FileName:= ADR('UlozeniUzivatelia'); //Názov súboru do ktorého sa receptúry uložia//
	MpRecipeXml_1();
	
	MpRecipeRegPar_1.MpLink:= ADR(gUserXml);
	MpRecipeRegPar_1.Enable:= TRUE;
	MpRecipeRegPar_1.Category:= ADR('UZIVATELIA');
	MpRecipeRegPar_1.PVName:= ADR('Uzivatel'); //Názov premenné, kde je vytvorená štruktura dat pre receptury//
	MpRecipeRegPar_1();	
	
    
    //Zamknutie tlaèítka Uloženie uživatelov//
    IF UsersVizu.Edit_MenoUzivatela = '' THEN
        UsersVizu.TL_UlozUzivatela_ENABLE:= FALSE;
    ELSIF UsersVizu.Edit_CisloKarty = '' THEN
        UsersVizu.TL_UlozUzivatela_ENABLE:= FALSE;
    ELSE    
        UsersVizu.TL_UlozUzivatela_ENABLE:= TRUE;
   END_IF
        
    //Zobrazenie zoznamu uživatelov//
	
    FOR a:= 0 TO 100 BY 1 DO
        ListBoxPole_Sprava[a]:= '{"value":"';
        ListBox_Value[a]:= UINT_TO_STRING(a);
        brsstrcat(ADR(ListBoxPole_Sprava[a]), ADR(ListBox_Value[a]));
        brsstrcat(ADR(ListBoxPole_Sprava[a]), ADR('","text":"'));
        brsstrcat(ADR(ListBoxPole_Sprava[a]), ADR(Uzivatel[a].Meno));
        brsstrcat(ADR(ListBoxPole_Sprava[a]), ADR('"}'));
        IF Uzivatel[a].Meno = '' THEN
            UsersVizu.ZoznamUzivatelov[a]:= '';
        ELSE	
            UsersVizu.ZoznamUzivatelov[a]:= ListBoxPole_Sprava[a];
        END_IF	
    END_FOR
	
    //Vyèítanie aktuálneho indexu text listu (hodnota string) a prevod do premennej UINT//	
    e:= STRING_TO_UINT(UsersVizu.LB_IndexSTRING);
	
     
    //Naèítanie èísla karty//
    IF P1_Vizu.TL_PrihlasovOperatora_AKTIVNE AND (Citacka1_AKTIVNA OR Citacka2_AKTIVNA OR Citacka3_AKTIVNA) THEN
        UsersVizu.Edit_CisloKarty:= CisloPrihlasenejKarty_Panel1;
    END_IF    
    
    IF NOT P1_Vizu.TL_PrihlasovOperatora_AKTIVNE THEN
        UsersVizu.Edit_CisloKarty:= '';
    END_IF    
	
    //***************************************Editácia databáze uzivatelov*********************************//
    CASE SC_Uzivatelia.Step OF
		
        0://Vynulovanie uživatela//
            SC_Uzivatelia.StepName:= '0 - Nulovanie';
            UsersVizu.UlozUzivatela:= FALSE;
            UsersVizu.VymazUzivatela:= FALSE;
            UsersVizu.NacitajUzivatela:= FALSE;
            
            MpRecipeXml_1.Save:= FALSE;
            i:= 0;
            c:= 0;
            d:= 0;
            IndexPrazdPole:= 0;
            SC_Uzivatelia.ResetStep:= TRUE;
            SC_Uzivatelia.Step:= 1;
			
        1://Rozhodnutie o èinnosti//
            SC_Uzivatelia.StepName:= '1 - Rozhodnutie o cinnosti';
            IF UsersVizu.UlozUzivatela THEN
                SC_Uzivatelia.Step:= 10;
            ELSIF UsersVizu.NacitajUzivatela THEN
                SC_Uzivatelia.Step:= 20;
            ELSIF UsersVizu.VymazUzivatela THEN
                SC_Uzivatelia.Step:= 30;
            END_IF
		
        10://Kontrola zadaných udajov uzivatela//
            SC_Uzivatelia.StepName:= '10 - Kontrola zadanych udajov uzivatela';
            UsersVizu.StavyUsers_Index:= 9;
            IF UsersVizu.Edit_MenoUzivatela = '' OR UsersVizu.Edit_CisloKarty = '' THEN
                UsersVizu.StavyUsers_Index:= 13; //Zobrazenie stavov v textovom okne
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 0;
            ELSE
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 11;
            END_IF	
				
				
           
			
        11://Kontrola mena už existujucich uzivatelov//
            SC_Uzivatelia.StepName:= '11 - Kontrola mena uz existujucich uzivatelov';
            IF Uzivatel[c].Meno = UsersVizu.Edit_MenoUzivatela THEN
                UsersVizu.StavyUsers_Index:= 2;
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 0;
            ELSE	
                IF c < 100 THEN
                    c:= c + 1;
                ELSE
                    SC_Uzivatelia.ResetStep:= TRUE;
					SC_Uzivatelia.Step:= 12;
				END_IF
			END_IF	
			
			
		12://Zistenie prázdneho pola pre uloženie receptury//
			SC_Uzivatelia.StepName:= '12 - Zistenie volneho pola';
			IF Uzivatel[d].Meno= '' THEN
				IndexPrazdPole:= d;
				SC_Uzivatelia.ResetStep:= TRUE;
				SC_Uzivatelia.Step:= 13;
			ELSE
				IF d < 100 THEN
					d:= d + 1;
				ELSE
					SC_Uzivatelia.ResetStep:= TRUE;
					SC_Uzivatelia.Step:= 0;
				END_IF	
			END_IF
					
			
		13://Ulozenie uzivatela//
			SC_Uzivatelia.StepName:= '13 - Ulozenie uzivatela';
			Uzivatel[IndexPrazdPole].Meno:= UsersVizu.Edit_MenoUzivatela;
            Uzivatel[IndexPrazdPole].CisloKarty:= UsersVizu.Edit_CisloKarty;
            UrovenUzivatela:= STRING_TO_UINT(UsersVizu.Edit_UrovenUzivatela);
            Uzivatel[IndexPrazdPole].UrovenUzivatela:= UrovenUzivatela;
            MpRecipeXml_1.Save:= TRUE;
            IF MpRecipeXml_1.CommandDone THEN
                UsersVizu.StavyUsers_Index:= 1;
                UsersVizu.Edit_MenoUzivatela:= '';
                UsersVizu.Edit_CisloKarty:= '';
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 0;
		    END_IF	
		
		
			
        20://Naèítanie parametrov uživatela//
            SC_Uzivatelia.StepName:= '20 - Nacitanie parametrov uzivatela';
            UsersVizu.StavyUsers_Index:= 9;
            UsersVizu.Edit_MenoUzivatela:= Uzivatel[e].Meno;
            UsersVizu.Edit_HesloUzivatela:= Uzivatel[e].Heslo;
            UrovenUzivatela:= Uzivatel[e].UrovenUzivatela;
            UsersVizu.Edit_UrovenUzivatela:= UINT_TO_STRING(UrovenUzivatela);
            (*UsersVizu.Edit_CisloKarty:= Uzivatel[e].CisloKarty;*)
            UsersVizu.StavyUsers_Index:= 3;
            SC_Uzivatelia.ResetStep:= TRUE;
            SC_Uzivatelia.Step:= 0;	
			
		
		
        30://Vymazanie uživatela//
            SC_Uzivatelia.StepName:= '30 - Vymazanie uzivatela';	
            UsersVizu.StavyUsers_Index:= 9;
            Uzivatel[e].Meno:= '';
            Uzivatel[e].Heslo:= '';
            Uzivatel[e].CisloKarty:= '';
            Uzivatel[e].UrovenUzivatela:= 0;
            MpRecipeXml_1.Save:= TRUE;
            IF MpRecipeXml_1.CommandDone THEN
                UsersVizu.StavyUsers_Index:= 4;
                SC_Uzivatelia.ResetStep:= TRUE;
                SC_Uzivatelia.Step:= 0;
            END_IF
			
		
				
    END_CASE	
	


	 
				END_PROGRAM

PROGRAM _EXIT
				(* Insert code here *)
	 
				END_PROGRAM


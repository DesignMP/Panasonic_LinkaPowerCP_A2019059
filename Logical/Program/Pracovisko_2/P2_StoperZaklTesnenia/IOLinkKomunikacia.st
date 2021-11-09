
ACTION IOLinkKomunikacia: 

	//Snímaè paletky//
	P2_StoperZaklTesnenia.IN.PritomnostPaletky_S6:= P2_StoperZaklTesnenia.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P2_StoperZaklTesnenia.IN.PrecitaneCisloPaletky_S6:= P2_StoperZaklTesnenia.PAR.SnimacPaletky_IOLinkInputs[9];
	
	
	//Banner//
	P2_StoperZaklTesnenia.PAR.Banner_IOLinkInputs;
	P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs;
	
	P2_StoperZaklTesnenia.IN.BannerNalozeniaPaletky_SB7:= P2_StoperZaklTesnenia.PAR.Banner_IOLinkInputs[1].0;
	
	
	IF P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7 THEN
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 161;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 161;
	ELSIF P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7 THEN
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 160;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 160;
	ELSIF P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7 THEN	
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 169;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 169;
	ELSIF P2_StoperZaklTesnenia.OUT.Banner_OranzovaLED_SB7 THEN	
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 162;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 162;
	ELSIF P2_StoperZaklTesnenia.OUT.Banner_ZltaLED_SB7 THEN	
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 164;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 164;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 164;
    ELSIF P2_StoperZaklTesnenia.OUT.Banner_CyanLED_SB7 THEN	
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 167;
        P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 167;    
    ELSIF P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7 THEN
        IF EDGEPOS(Blikac200ms) THEN
			IF P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5] = 160 THEN
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 169;
			ELSIF P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2] = 160 THEN
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 169;
			ELSIF P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8] = 160 THEN
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSIF P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9] = 160 THEN
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 169;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 160;
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSE
				P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 160;
			END_IF
        END_IF	
	ELSE
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[2]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[3]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[4]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[5]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[6]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[7]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[8]:= 0;
		P2_StoperZaklTesnenia.PAR.Banner_IOLinkOutputs[9]:= 0;
	END_IF
	
	//Zhasnutie bannera//
	IF P2_StoperZaklTesnenia.OUT.Banner_LED_OFF THEN
		P2_StoperZaklTesnenia.OUT.Banner_CervenaLED_SB7:= FALSE;
		P2_StoperZaklTesnenia.OUT.Banner_ZelenaLED_SB7:= FALSE;
		P2_StoperZaklTesnenia.OUT.Banner_ModraLED_SB7:= FALSE;
        P2_StoperZaklTesnenia.OUT.Banner_OranzovaLED_SB7:= FALSE;
		P2_StoperZaklTesnenia.OUT.Banner_ModraRotujucaLED_SB7:= FALSE;
        P2_StoperZaklTesnenia.OUT.Banner_ZltaLED_SB7:= FALSE;
        P2_StoperZaklTesnenia.OUT.Banner_CyanLED_SB7:= FALSE;
		P2_StoperZaklTesnenia.OUT.Banner_LED_OFF:= FALSE;
	END_IF	
	
	

	
	
	
	
	
	
END_ACTION


ACTION IOLinkKomunikacia: 

	
	//Snímaè paletky//
	P1_Vytah.IN.PritomnostPaletky_S19:= P1_Vytah.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P1_Vytah.IN.PrecitaneCisloPaletky_S19:= P1_Vytah.PAR.SnimacPaletky_IOLinkInputs[9];
	
	
	//Banner//
	P1_Vytah.PAR.Banner_IOLinkInputs;
	P1_Vytah.PAR.Banner_IOLinkOutputs;
	
	P1_Vytah.IN.BannerNalozeniaPaletky_SB11:= P1_Vytah.PAR.Banner_IOLinkInputs[1].0;
	
	
	IF P1_Vytah.OUT.Banner_CervenaLED_SB11 THEN
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 161;
		P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 161;
	ELSIF P1_Vytah.OUT.Banner_ZelenaLED_SB11 THEN
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
		P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
	ELSIF P1_Vytah.OUT.Banner_ModraLED_SB11 THEN	
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
		P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
	ELSIF P1_Vytah.OUT.Banner_OranzovaLED_SB11 THEN	
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 162;
		P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 162;	
	ELSIF P1_Vytah.OUT.Banner_ZltaLED_SB11 THEN	
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 164;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 164;
        P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 164;	
    ELSIF P1_Vytah.OUT.Banner_CyanLED_SB11 THEN	
        P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 167;
        P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 167;	   
     ELSIF P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11 THEN
        IF EDGEPOS(Blikac200ms) THEN
            IF P1_Vytah.PAR.Banner_IOLinkOutputs[5] = 160 THEN
                P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
                P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
            ELSIF P1_Vytah.PAR.Banner_IOLinkOutputs[2] = 160 THEN
				P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
			ELSIF P1_Vytah.PAR.Banner_IOLinkOutputs[8] = 160 THEN
				P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSIF P1_Vytah.PAR.Banner_IOLinkOutputs[9] = 160 THEN
				P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
				P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
				P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSE
				P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
			END_IF
		END_IF	
	ELSE
		P1_Vytah.PAR.Banner_IOLinkOutputs[2]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[3]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[4]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[5]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[6]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[7]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[8]:= 0;
		P1_Vytah.PAR.Banner_IOLinkOutputs[9]:= 0;
	END_IF
	
	//Zhasnutie bannera//
	IF P1_Vytah.OUT.Banner_LED_OFF THEN
		P1_Vytah.OUT.Banner_CervenaLED_SB11:= FALSE;
		P1_Vytah.OUT.Banner_ZelenaLED_SB11:= FALSE;
		P1_Vytah.OUT.Banner_ModraLED_SB11:= FALSE;
        P1_Vytah.OUT.Banner_OranzovaLED_SB11:= FALSE;
		P1_Vytah.OUT.Banner_ModraRotujucaLED_SB11:= FALSE;
        P1_Vytah.OUT.Banner_ZltaLED_SB11:= FALSE;
        P1_Vytah.OUT.Banner_CyanLED_SB11:= FALSE;
        P1_Vytah.OUT.Banner_LED_OFF:= FALSE;
	END_IF	
	
	
	
	
	
	
	
	
END_ACTION

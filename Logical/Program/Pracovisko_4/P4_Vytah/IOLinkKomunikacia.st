
ACTION IOLinkKomunikacia: 

	
	//Snímaè paletky//
	P4_Vytah.IN.PritomnostPaletky_S13:= P4_Vytah.PAR.SnimacPaletky_IOLinkInputs[1].0;
	P4_Vytah.IN.PrecitaneCisloPaletky_S13:= P4_Vytah.PAR.SnimacPaletky_IOLinkInputs[9];
	
	
	//Banner//
	P4_Vytah.PAR.Banner_IOLinkInputs;
	P4_Vytah.PAR.Banner_IOLinkOutputs;
	
	P4_Vytah.IN.BannerNalozeniaPaletky_SB10:= P4_Vytah.PAR.Banner_IOLinkInputs[1].0;
	
	
	IF P4_Vytah.OUT.Banner_CervenaLED_SB10 THEN
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 161;
		P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 161;
	ELSIF P4_Vytah.OUT.Banner_ZelenaLED_SB10 THEN
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
		P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
	ELSIF P4_Vytah.OUT.Banner_ModraLED_SB10 THEN	
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
		P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
	ELSIF P4_Vytah.OUT.Banner_OranzovaLED_SB10 THEN	
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 162;
		P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 162;	
	ELSIF P4_Vytah.OUT.Banner_ZltaLED_SB10 THEN	
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 164;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 164;
        P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 164;	
    ELSIF P4_Vytah.OUT.Banner_CyanLED_SB10 THEN	
        P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 167;
        P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 167;	    
	ELSIF P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10 THEN
		IF EDGEPOS(Blikac200ms) THEN
			IF P4_Vytah.PAR.Banner_IOLinkOutputs[5] = 160 THEN
				P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
			ELSIF P4_Vytah.PAR.Banner_IOLinkOutputs[2] = 160 THEN
				P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 169;
			ELSIF P4_Vytah.PAR.Banner_IOLinkOutputs[8] = 160 THEN
				P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSIF P4_Vytah.PAR.Banner_IOLinkOutputs[9] = 160 THEN
				P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 169;
				P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
				P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 160;
			ELSE
				P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 160;
			END_IF
		END_IF		
	ELSE
		P4_Vytah.PAR.Banner_IOLinkOutputs[2]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[3]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[4]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[5]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[6]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[7]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[8]:= 0;
		P4_Vytah.PAR.Banner_IOLinkOutputs[9]:= 0;
	END_IF
	
	//Zhasnutie bannera//
	IF P4_Vytah.OUT.Banner_LED_OFF THEN
		P4_Vytah.OUT.Banner_CervenaLED_SB10:= FALSE;
		P4_Vytah.OUT.Banner_ZelenaLED_SB10:= FALSE;
		P4_Vytah.OUT.Banner_ModraLED_SB10:= FALSE;
        P4_Vytah.OUT.Banner_OranzovaLED_SB10:= FALSE;
		P4_Vytah.OUT.Banner_ModraRotujucaLED_SB10:= FALSE;
        P4_Vytah.OUT.Banner_ZltaLED_SB10:= FALSE;
        P4_Vytah.OUT.Banner_CyanLED_SB10:= FALSE;
		P4_Vytah.OUT.Banner_LED_OFF:= FALSE;
	END_IF	
	
	
	
	
	
	
	
	
END_ACTION

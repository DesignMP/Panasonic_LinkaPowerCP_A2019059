
PROGRAM _INIT
	(* Insert code here *)
    SKTcpClientTrace_1.Params.IPportClient := 18000;
END_PROGRAM

PROGRAM _CYCLIC
	
		
	//Priradenie indexu paletky//
    a:= P2_StoperZvarania.PAR.IndexPaletky;
	
	
	
    //Parametre komunikácie//
    memcpy(ADR(SKTcpClientTrace_1.Params.IPaddrServ),ADR('192.168.122.250'),SIZEOF('192.168.122.250'));

	
    SKTcpClientTrace_1.Params.IPportServ := 12000;
    SKTcpClientTrace_1.Params.RecvTimeout := 10000;
    SKTcpClientTrace_1();
	
    //Parametre komunikácie//
    //Vstupy pre server//
    SKTcpClientTrace_1.Params.Packet.type := TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu;
    SKTcpClientTrace_1.Params.Packet.workplace := TRCB_P2_Zvaranie_ST6.INPUTS.CisloStanice;
    TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky:= 'Pal';
    brsstrcat(ADR(TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky), ADR(P2_StoperZvarania.PAR.IndexPaletky_STRING));
    SKTcpClientTrace_1.Params.Packet.rfid := TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky;
    SKTcpClientTrace_1.Params.Packet.master := TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP;
    SKTcpClientTrace_1.Params.Packet.dps1:= TRCB_P2_Zvaranie_ST6.INPUTS.QRkodFiltra;
    SKTcpClientTrace_1.Params.Packet.dps2:= '';
    SKTcpClientTrace_1.Params.Packet.dps3:= '';
    SKTcpClientTrace_1.Params.Packet.dps4:= '';
    SKTcpClientTrace_1.Params.Packet.dps5:= '';
    SKTcpClientTrace_1.Params.Packet.operator_id := TRCB_P2_Zvaranie_ST6.INPUTS.ID_Operatora;
    SKTcpClientTrace_1.Params.Packet.data_report:= TRCB_P2_Zvaranie_ST6.INPUTS.Report;
    SKTcpClientTrace_1.Params.Packet.result := TRCB_P2_Zvaranie_ST6.INPUTS.StavPaletky;
	
	
    //Výstupy zo servera//
    TRCB_P2_Zvaranie_ST6.OUTPUTS.TYP_Prikazu:= SKTcpClientTrace_1.Internal.Splitter.out[1];
    TRCB_P2_Zvaranie_ST6.OUTPUTS.CisloStanice:= SKTcpClientTrace_1.Internal.Splitter.out[2];
    TRCB_P2_Zvaranie_ST6.OUTPUTS.CisloPaletky:= SKTcpClientTrace_1.Internal.Splitter.out[3];
    IF TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu = '0' THEN
        TRCB_P2_Zvaranie_ST6.OUTPUTS.CisloEtikety:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    ELSE	
        TRCB_P2_Zvaranie_ST6.OUTPUTS.QRkodPowerCP:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    END_IF	
    TRCB_P2_Zvaranie_ST6.OUTPUTS.QRkodFiltra:= SKTcpClientTrace_1.Internal.Splitter.out[5];
    TRCB_P2_Zvaranie_ST6.OUTPUTS.ID_Operatora:= SKTcpClientTrace_1.Internal.Splitter.out[10];
    TRCB_P2_Zvaranie_ST6.OUTPUTS.DruhCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[11];
    TRCB_P2_Zvaranie_ST6.OUTPUTS.PovolenieCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[12];
	
	
		
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_KOM_Server);
	
	
    
    
    
    CASE SC_KOM_Server.Step OF
		
        0:
            SC_KOM_Server.StepName:= '0 - Nulovanie';
            SKTcpClientTrace_1.Cmd.Send:= FALSE;
            SKTcpClientTrace_1.Cmd.Close:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.VyziadajCisloEtikety_TYP0:= FALSE;
            TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2:= FALSE;
            TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena:= FALSE;
            TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError:= FALSE;
            PocetDopytovNaServer:= 0;	
            

            IF SKTcpClientTrace_1.Internal.Step = 0 THEN
                SKTcpClientTrace_1.Enable:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 1; 
            ELSIF SKTcpClientTrace_1.Internal.Step = 15 THEN
                SKTcpClientTrace_1.Enable:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 1;	
            ELSE
                SKTcpClientTrace_1.Enable:= FALSE;
            END_IF     
	
        1:
            SC_KOM_Server.StepName:= '1 - Rozhodnutie o cinnosti';
            IF TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.Step:= 10;
            ELSIF TRCB_P2_Zvaranie_ST6.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.Step:= 20;
            ELSIF TRCB_P2_Zvaranie_ST6.CMD.VyziadajCisloEtikety_TYP0 THEN
                SC_KOM_Server.Step:= 30;
            ELSIF TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.Step:= 40;
            END_IF
		
        10:
            SC_KOM_Server.StepName:= '10 - Vyziadanie stavu paletky - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
		
            TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu:= '1';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloStanice:= 'ST6';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky; //Z programu
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodFiltra:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P2_Zvaranie_ST6.INPUTS.Report:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.StavPaletky:= 'OK';
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
						
			
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 13;
            ELSIF SC_KOM_Server.AlarmTime.Q AND (SKTcpClientTrace_1.Status.staReceived OR SKTcpClientTrace_1.Status.staError) THEN
                PocetDopytovNaServer:= PocetDopytovNaServer + 1;
                SKTcpClientTrace_1.Cmd.Send:= FALSE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 14;    
            END_IF	
			
			
		
        13:
            SC_KOM_Server.StepName:= '13 - Vyziadanie stavu paletky - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#20s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
			
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.TYP_Prikazu = TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu) AND
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.QRkodPowerCP = TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP) THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 15;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                PocetDopytovNaServer:= PocetDopytovNaServer + 1;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 14;
            END_IF		
		
        14:
            SC_KOM_Server.StepName:= '14 - Vyziadanie stavu paletky - cakam na opatovny dopyt na server';
            SC_KOM_Server.IdleTime.PT:= T#1s;
            SC_KOM_Server.AlarmTime.PT:= T#10s; 
            SC_KOM_Server.IdleTime.IN:= TRUE;
            
            
            IF PocetDopytovNaServer < 3 THEN
                IF SC_KOM_Server.IdleTime.Q THEN
                    SC_KOM_Server.ResetStep:= TRUE;
                    SC_KOM_Server.Step:= 10;
                END_IF
            ELSE
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 15;
            END_IF	    
            
            
            
            
            
		
        15:
            SC_KOM_Server.StepName:= '15 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P2_Zvaranie_ST6.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
		
        20:
            SC_KOM_Server.StepName:= '20 - Priradenie QR kodu - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu:= '3';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloStanice:= 'ST6';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky;
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodFiltra:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P2_Zvaranie_ST6.INPUTS.Report:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.StavPaletky:= 'OK';
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
				
			
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 23;
            END_IF	
		
        23:
            SC_KOM_Server.StepName:= '23 - Priradenie QR kodu - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#20s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
			
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.TYP_Prikazu = TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu) AND
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.QRkodPowerCP = TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP) THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;    
            END_IF	
			
				
        25:
            SC_KOM_Server.StepName:= '25 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P2_Zvaranie_ST6.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
        30:
            SC_KOM_Server.StepName:= '30 - Vyziadanie serioveho cisla - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
			
            TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu:= '0';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloStanice:= 'ST6';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky;
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodFiltra:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.ID_Operatora:= 'E2';
            TRCB_P2_Zvaranie_ST6.INPUTS.Report:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.StavPaletky:= 'OK';
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
			
					
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 33;
            END_IF	
		
        33:
            SC_KOM_Server.StepName:= '33 - Vyziadanie serioveho cisla - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#20s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
			
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.TYP_Prikazu = TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu) THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;    
            END_IF	
			
			
				
        35:
            SC_KOM_Server.StepName:= '35 - Vyziadanie serioveho cisla - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P2_Zvaranie_ST6.CMD.VyziadajCisloEtikety_TYP0 THEN
                IF SKTcpClientTrace_1.Status.staErrorClose THEN
                    SKTcpClientTrace_1.Params.IPportClient:= SKTcpClientTrace_1.Params.IPportClient + 1;
                END_IF 
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
		
        40:
            SC_KOM_Server.StepName:= '40 - Odoslanie stavu paletky - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#20s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
		
            //Vytvorenie spravy pre report//
            IF NOT SC_KOM_Server.Switch1 THEN
                //Zvaranie//
                //Lavý zvar//
                brsmemset(ADR(Report),0,SIZEOF(Report));
                Report[0].PoradoveCislo:= '1';
                Report[0].Popis:= 'LavyZvar_Moment';
                Report[0].FormatHodnoty:= '1';
                Report[0].Tolerancia_MIN_Hodnota:= '';
                Report[0].Tolerancia_MAX_Hodnota:= '';
                Report[0].Nominal:= '';
                Report[0].Tolerancia_MIN_Jednotky:= '';
                Report[0].Tolerancia_MAX_Jednotky:= '';
                Report[0].NameranaHodnota:= Reports.Zvaranie.Moment.LavyZvar; 
                Report[0].NameranaHodnota_Jednotky:= 'Nm';
                Report[0].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[0].PoradoveCislo,Report[0].Popis,Report[0].FormatHodnoty,Report[0].Tolerancia_MIN_Hodnota,Report[0].Tolerancia_MAX_Hodnota,Report[0].Nominal,Report[0].Tolerancia_MIN_Jednotky,Report[0].Tolerancia_MAX_Jednotky,Report[0].NameranaHodnota,Report[0].NameranaHodnota_Jednotky,Report[0].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                Report[1].PoradoveCislo:= '2';
                Report[1].Popis:= 'LavyZvar_Vyska';
                Report[1].FormatHodnoty:= '1';
                Report[1].Tolerancia_MIN_Hodnota:= '';
                Report[1].Tolerancia_MAX_Hodnota:= '';
                Report[1].Nominal:= '';
                Report[1].Tolerancia_MIN_Jednotky:= '';
                Report[1].Tolerancia_MAX_Jednotky:= '';
                Report[1].NameranaHodnota:= Reports.Zvaranie.Vyska.LavyZvar; 
                Report[1].NameranaHodnota_Jednotky:= 'mm';
                Report[1].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[1].PoradoveCislo,Report[1].Popis,Report[1].FormatHodnoty,Report[1].Tolerancia_MIN_Hodnota,Report[1].Tolerancia_MAX_Hodnota,Report[1].Nominal,Report[1].Tolerancia_MIN_Jednotky,Report[1].Tolerancia_MAX_Jednotky,Report[1].NameranaHodnota,Report[1].NameranaHodnota_Jednotky,Report[1].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                Report[2].PoradoveCislo:= '3';
                Report[2].Popis:= 'LavyZvar_Frekvencia';
                Report[2].FormatHodnoty:= '1';
                Report[2].Tolerancia_MIN_Hodnota:= '';
                Report[2].Tolerancia_MAX_Hodnota:= '';
                Report[2].Nominal:= '';
                Report[2].Tolerancia_MIN_Jednotky:= '';
                Report[2].Tolerancia_MAX_Jednotky:= '';
                Report[2].NameranaHodnota:= Reports.Zvaranie.Frekvencia; 
                Report[2].NameranaHodnota_Jednotky:= 'PERC';
                Report[2].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[2].PoradoveCislo,Report[2].Popis,Report[2].FormatHodnoty,Report[2].Tolerancia_MIN_Hodnota,Report[2].Tolerancia_MAX_Hodnota,Report[2].Nominal,Report[2].Tolerancia_MIN_Jednotky,Report[2].Tolerancia_MAX_Jednotky,Report[2].NameranaHodnota,Report[2].NameranaHodnota_Jednotky,Report[2].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                
                       
                
                //Pravý zvar//
                Report[3].PoradoveCislo:= '4';
                Report[3].Popis:= 'PravyZvar_Moment';
                Report[3].FormatHodnoty:= '1';
                Report[3].Tolerancia_MIN_Hodnota:= '';
                Report[3].Tolerancia_MAX_Hodnota:= '';
                Report[3].Nominal:= '';
                Report[3].Tolerancia_MIN_Jednotky:= '';
                Report[3].Tolerancia_MAX_Jednotky:= '';
                Report[3].NameranaHodnota:= Reports.Zvaranie.Moment.PravyZvar; 
                Report[3].NameranaHodnota_Jednotky:= 'Nm';
                Report[3].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[3].PoradoveCislo,Report[3].Popis,Report[3].FormatHodnoty,Report[3].Tolerancia_MIN_Hodnota,Report[3].Tolerancia_MAX_Hodnota,Report[3].Nominal,Report[3].Tolerancia_MIN_Jednotky,Report[3].Tolerancia_MAX_Jednotky,Report[3].NameranaHodnota,Report[3].NameranaHodnota_Jednotky,Report[3].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                Report[4].PoradoveCislo:= '5';
                Report[4].Popis:= 'PravyZvar_Vyska';
                Report[4].FormatHodnoty:= '1';
                Report[4].Tolerancia_MIN_Hodnota:= '';
                Report[4].Tolerancia_MAX_Hodnota:= '';
                Report[4].Nominal:= '';
                Report[4].Tolerancia_MIN_Jednotky:= '';
                Report[4].Tolerancia_MAX_Jednotky:= '';
                Report[4].NameranaHodnota:= Reports.Zvaranie.Vyska.PravyZvar; 
                Report[4].NameranaHodnota_Jednotky:= 'mm';
                Report[4].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[4].PoradoveCislo,Report[4].Popis,Report[4].FormatHodnoty,Report[4].Tolerancia_MIN_Hodnota,Report[4].Tolerancia_MAX_Hodnota,Report[4].Nominal,Report[4].Tolerancia_MIN_Jednotky,Report[4].Tolerancia_MAX_Jednotky,Report[4].NameranaHodnota,Report[4].NameranaHodnota_Jednotky,Report[4].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                Report[5].PoradoveCislo:= '6';
                Report[5].Popis:= 'PravyZvar_Frekvencia';
                Report[5].FormatHodnoty:= '1';
                Report[5].Tolerancia_MIN_Hodnota:= '';
                Report[5].Tolerancia_MAX_Hodnota:= '';
                Report[5].Nominal:= '';
                Report[5].Tolerancia_MIN_Jednotky:= '';
                Report[5].Tolerancia_MAX_Jednotky:= '';
                Report[5].NameranaHodnota:= Reports.Zvaranie.Frekvencia; 
                Report[5].NameranaHodnota_Jednotky:= 'PERC';
                Report[5].VyslednyResult:= Reports.Zvaranie.VyslednyReport;
                SKTcpClientNewCsvEntry(Report[5].PoradoveCislo,Report[5].Popis,Report[5].FormatHodnoty,Report[5].Tolerancia_MIN_Hodnota,Report[5].Tolerancia_MAX_Hodnota,Report[5].Nominal,Report[5].Tolerancia_MIN_Jednotky,Report[5].Tolerancia_MAX_Jednotky,Report[5].NameranaHodnota,Report[5].NameranaHodnota_Jednotky,Report[5].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                   
                        
                
                //Kamera 11//
                //Kontrola zvaru//
                Report[6].PoradoveCislo:= '7';
                Report[6].Popis:= 'KAM_11_KontrolaZvaru';
                Report[6].FormatHodnoty:= '2';
                Report[6].Tolerancia_MIN_Hodnota:= '';
                Report[6].Tolerancia_MAX_Hodnota:= '';
                Report[6].Nominal:= 'OK';
                Report[6].Tolerancia_MIN_Jednotky:= '';
                Report[6].Tolerancia_MAX_Jednotky:= '';
                IF Reports.Kamery.P2_CAM11_KontrolaZvaru = 'PASS' THEN
                    Report[6].NameranaHodnota:= 'OK'; 
                ELSE
                    Report[6].NameranaHodnota:= 'NG';
                END_IF    
                Report[6].NameranaHodnota_Jednotky:= '';
                Report[6].VyslednyResult:= Reports.Kamery.P2_CAM11_KontrolaZvaru;
                SKTcpClientNewCsvEntry(Report[6].PoradoveCislo,Report[6].Popis,Report[6].FormatHodnoty,Report[6].Tolerancia_MIN_Hodnota,Report[6].Tolerancia_MAX_Hodnota,Report[6].Nominal,Report[6].Tolerancia_MIN_Jednotky,Report[6].Tolerancia_MAX_Jednotky,Report[6].NameranaHodnota,Report[6].NameranaHodnota_Jednotky,Report[6].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                
                //Kamera 11//
                //Kontrola Power CP//
                Report[7].PoradoveCislo:= '8';
                Report[7].Popis:= 'KAM_11_KontrolaPowerCP';
                Report[7].FormatHodnoty:= '2';
                Report[7].Tolerancia_MIN_Hodnota:= '';
                Report[7].Tolerancia_MAX_Hodnota:= '';
                Report[7].Nominal:= 'OK';
                Report[7].Tolerancia_MIN_Jednotky:= '';
                Report[7].Tolerancia_MAX_Jednotky:= '';
                IF Reports.Kamery.P2_CAM11_KontrolaPowerCP = 'PASS' THEN
                    Report[7].NameranaHodnota:= 'OK'; 
                ELSE
                    Report[7].NameranaHodnota:= 'NG';
                END_IF    
                Report[7].NameranaHodnota_Jednotky:= '';
                Report[7].VyslednyResult:= Reports.Kamery.P2_CAM11_KontrolaPowerCP;
                SKTcpClientNewCsvEntry(Report[7].PoradoveCislo,Report[7].Popis,Report[7].FormatHodnoty,Report[7].Tolerancia_MIN_Hodnota,Report[7].Tolerancia_MAX_Hodnota,Report[7].Nominal,Report[7].Tolerancia_MIN_Jednotky,Report[7].Tolerancia_MAX_Jednotky,Report[7].NameranaHodnota,Report[7].NameranaHodnota_Jednotky,Report[7].VyslednyResult, ADR(TRCB_P2_Zvaranie_ST6.INPUTS.Report));
                SC_KOM_Server.Switch1:= TRUE;
            END_IF  
            
            
            
            
            
            
            TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu:= '2';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloStanice:= 'ST6';
            TRCB_P2_Zvaranie_ST6.INPUTS.CisloPaletky;
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;  
            TRCB_P2_Zvaranie_ST6.INPUTS.QRkodFiltra:= '';
            TRCB_P2_Zvaranie_ST6.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P2_Zvaranie_ST6.INPUTS.StavPaletky:= Paletka[a].PAR.StavPowerCP;
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
						
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 43;
            ELSIF SC_KOM_Server.AlarmTime.Q AND (SKTcpClientTrace_1.Status.staReceived OR SKTcpClientTrace_1.Status.staError) THEN
                PocetDopytovNaServer:= PocetDopytovNaServer + 1;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 44;     
            END_IF	
		
        43:
            SC_KOM_Server.StepName:= '43 - Odoslanie stavu paletky - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#20s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
			
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.TYP_Prikazu = TRCB_P2_Zvaranie_ST6.INPUTS.TYP_Prikazu) AND
                (TRCB_P2_Zvaranie_ST6.OUTPUTS.QRkodPowerCP = TRCB_P2_Zvaranie_ST6.INPUTS.QRkodPowerCP) THEN
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 45;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                PocetDopytovNaServer:= PocetDopytovNaServer + 1;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 44;    
            END_IF	
			
        44:
            SC_KOM_Server.StepName:= '44 - Odoslanie stavu paletky - cakam na opatovny dopyt na server';
            SC_KOM_Server.IdleTime.PT:= T#1s;
            SC_KOM_Server.AlarmTime.PT:= T#10s; 
            SC_KOM_Server.IdleTime.IN:= TRUE;
            SKTcpClientTrace_1.Cmd.Send:= FALSE;
            
            IF PocetDopytovNaServer < 3 THEN
                IF SC_KOM_Server.IdleTime.Q THEN
                    SC_KOM_Server.ResetStep:= TRUE;
                    SC_KOM_Server.Step:= 40;
                END_IF
            ELSE
                TRCB_P2_Zvaranie_ST6.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 45;
            END_IF	   
            
            
            
            
		
        45:
            SC_KOM_Server.StepName:= '45 - Odoslanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P2_Zvaranie_ST6.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
    END_CASE
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


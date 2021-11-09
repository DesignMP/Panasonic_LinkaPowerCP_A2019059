
PROGRAM _INIT
	(* Insert code here *)
    SKTcpClientTrace_1.Params.IPportClient := 21001;
END_PROGRAM

PROGRAM _CYCLIC
		
	//Priradenie indexu paletky//
    a:= P3_LeakageTestB.PAR.IndexPaletky;
	
		
    //Parametre komunikácie//
    memcpy(ADR(SKTcpClientTrace_1.Params.IPaddrServ),ADR('192.168.122.250'),SIZEOF('192.168.122.250'));

	
    SKTcpClientTrace_1.Params.IPportServ := 12000;
    SKTcpClientTrace_1.Params.RecvTimeout := 10000;
    SKTcpClientTrace_1();
	
    //Parametre komunikácie//
    //Vstupy pre server//
    SKTcpClientTrace_1.Params.Packet.type := TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu;
    SKTcpClientTrace_1.Params.Packet.workplace := TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloStanice;
    TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky:= 'Pal';
    brsstrcat(ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky), ADR(P3_LeakageTestB.PAR.IndexPaletky_STRING));
    SKTcpClientTrace_1.Params.Packet.rfid := TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky;
    SKTcpClientTrace_1.Params.Packet.master := TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP;
    SKTcpClientTrace_1.Params.Packet.dps1:= TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodFiltra;
    SKTcpClientTrace_1.Params.Packet.dps2:= '';
    SKTcpClientTrace_1.Params.Packet.dps3:= '';
    SKTcpClientTrace_1.Params.Packet.dps4:= '';
    SKTcpClientTrace_1.Params.Packet.dps5:= '';
    SKTcpClientTrace_1.Params.Packet.operator_id := TRCB_P3_LeakageTestB_ST8B.INPUTS.ID_Operatora;
    SKTcpClientTrace_1.Params.Packet.data_report:= TRCB_P3_LeakageTestB_ST8B.INPUTS.Report;
    SKTcpClientTrace_1.Params.Packet.result := TRCB_P3_LeakageTestB_ST8B.INPUTS.StavPaletky;
	
	
    //Výstupy zo servera//
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.TYP_Prikazu:= SKTcpClientTrace_1.Internal.Splitter.out[1];
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.CisloStanice:= SKTcpClientTrace_1.Internal.Splitter.out[2];
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.CisloPaletky:= SKTcpClientTrace_1.Internal.Splitter.out[3];
    IF TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu = '0' THEN
        TRCB_P3_LeakageTestB_ST8B.OUTPUTS.CisloEtikety:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    ELSE	
        TRCB_P3_LeakageTestB_ST8B.OUTPUTS.QRkodPowerCP:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    END_IF	
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.QRkodFiltra:= SKTcpClientTrace_1.Internal.Splitter.out[5];
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.ID_Operatora:= SKTcpClientTrace_1.Internal.Splitter.out[10];
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.DruhCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[11];
    TRCB_P3_LeakageTestB_ST8B.OUTPUTS.PovolenieCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[12];
	

	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_KOM_Server);
	
   
	
    CASE SC_KOM_Server.Step OF
		
        0:
            SC_KOM_Server.StepName:= '0 - Nulovanie';
            SKTcpClientTrace_1.Cmd.Send:= FALSE;
            SKTcpClientTrace_1.Cmd.Close:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajCisloEtikety_TYP0:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena:= FALSE;
            TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError:= FALSE;
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
            IF TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.Step:= 10;
            ELSIF TRCB_P3_LeakageTestB_ST8B.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.Step:= 20;
            ELSIF TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajCisloEtikety_TYP0 THEN
                SC_KOM_Server.Step:= 30;
            ELSIF TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.Step:= 40;
            END_IF
		
        10:
            SC_KOM_Server.StepName:= '10 - Vyziadanie stavu paletky - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
		
            TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu:= '1';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloStanice:= 'ST8B';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky; //Z programu
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodFiltra:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.Report:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.StavPaletky:= 'OK';
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
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.TYP_Prikazu = TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu) AND
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.QRkodPowerCP = TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP) THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena:= TRUE;
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
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 15;
            END_IF	
                
            
            
            
            
            
        15:
            SC_KOM_Server.StepName:= '15 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
		
        20:
            SC_KOM_Server.StepName:= '20 - Priradenie QR kodu - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu:= '3';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloStanice:= 'ST8B';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodFiltra:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.Report:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.StavPaletky:= 'OK';
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
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.TYP_Prikazu = TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu) AND
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.QRkodPowerCP = TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP) THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;    
            END_IF	
			
				
        25:
            SC_KOM_Server.StepName:= '25 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P3_LeakageTestB_ST8B.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
        30:
            SC_KOM_Server.StepName:= '30 - Vyziadanie serioveho cisla - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
			
            TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu:= '0';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloStanice:= 'ST8B';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodFiltra:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.ID_Operatora:= 'E2';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.Report:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.StavPaletky:= 'OK';
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
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.TYP_Prikazu = TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu) THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;    
            END_IF	
			
			
				
        35:
            SC_KOM_Server.StepName:= '35 - Vyziadanie serioveho cisla - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P3_LeakageTestB_ST8B.CMD.VyziadajCisloEtikety_TYP0 THEN
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
                brsmemset(ADR(Report),0,SIZEOF(Report));
                //Èas plnenia//
                Report[0].PoradoveCislo:= '1';
                Report[0].Popis:= 'StanicaB_CasPlnenia';
                Report[0].FormatHodnoty:= '1';
                Report[0].Tolerancia_MIN_Hodnota:= '';
                Report[0].Tolerancia_MAX_Hodnota:= '';
                Report[0].Nominal:= '';
                Report[0].Tolerancia_MIN_Jednotky:= '';
                Report[0].Tolerancia_MAX_Jednotky:= '';
                Report[0].NameranaHodnota:= Reports.LeakageTest.CasPlnenia.StanicaB; 
                Report[0].NameranaHodnota_Jednotky:= 's';
                Report[0].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[0].PoradoveCislo,Report[0].Popis,Report[0].FormatHodnoty,Report[0].Tolerancia_MIN_Hodnota,Report[0].Tolerancia_MAX_Hodnota,Report[0].Nominal,Report[0].Tolerancia_MIN_Jednotky,Report[0].Tolerancia_MAX_Jednotky,Report[0].NameranaHodnota,Report[0].NameranaHodnota_Jednotky,Report[0].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                
                //Èas stabilizacie//
                Report[1].PoradoveCislo:= '2';
                Report[1].Popis:= 'StanicaB_CasStabilizacie';
                Report[1].FormatHodnoty:= '1';
                Report[1].Tolerancia_MIN_Hodnota:= '';
                Report[1].Tolerancia_MAX_Hodnota:= '';
                Report[1].Nominal:= '';
                Report[1].Tolerancia_MIN_Jednotky:= '';
                Report[1].Tolerancia_MAX_Jednotky:= '';
                Report[1].NameranaHodnota:= Reports.LeakageTest.CasStabilizacie.StanicaB; 
                Report[1].NameranaHodnota_Jednotky:= 's';
                Report[1].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[1].PoradoveCislo,Report[1].Popis,Report[1].FormatHodnoty,Report[1].Tolerancia_MIN_Hodnota,Report[1].Tolerancia_MAX_Hodnota,Report[1].Nominal,Report[1].Tolerancia_MIN_Jednotky,Report[1].Tolerancia_MAX_Jednotky,Report[1].NameranaHodnota,Report[1].NameranaHodnota_Jednotky,Report[1].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                
                //Tlak plnenia//
                Report[2].PoradoveCislo:= '3';
                Report[2].Popis:= 'StanicaB_TlakPlnenia';
                Report[2].FormatHodnoty:= '1';
                Report[2].Tolerancia_MIN_Hodnota:= '';
                Report[2].Tolerancia_MAX_Hodnota:= '';
                Report[2].Nominal:= '';
                Report[2].Tolerancia_MIN_Jednotky:= '';
                Report[2].Tolerancia_MAX_Jednotky:= '';
                Report[2].NameranaHodnota:= Reports.LeakageTest.TlakPlnenia.StanicaB; 
                Report[2].NameranaHodnota_Jednotky:= 'mBar';
                Report[2].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[2].PoradoveCislo,Report[2].Popis,Report[2].FormatHodnoty,Report[2].Tolerancia_MIN_Hodnota,Report[2].Tolerancia_MAX_Hodnota,Report[2].Nominal,Report[2].Tolerancia_MIN_Jednotky,Report[2].Tolerancia_MAX_Jednotky,Report[2].NameranaHodnota,Report[2].NameranaHodnota_Jednotky,Report[2].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                
                //Tlak prítlaku//
                Report[3].PoradoveCislo:= '4';
                Report[3].Popis:= 'StanicaB_TlakPritlaku';
                Report[3].FormatHodnoty:= '1';
                Report[3].Tolerancia_MIN_Hodnota:= Reports.LeakageTest.ToleranciaPritlaku_MIN.StanicaB;
                Report[3].Tolerancia_MAX_Hodnota:= Reports.LeakageTest.ToleranciaPritlaku_MAX.StanicaB;
                Report[3].Nominal:= '';
                Report[3].Tolerancia_MIN_Jednotky:= 'Bar';
                Report[3].Tolerancia_MAX_Jednotky:= 'Bar';
                Report[3].NameranaHodnota:= Reports.LeakageTest.TlakPritlaku.StanicaB; 
                Report[3].NameranaHodnota_Jednotky:= 'Bar';
                Report[3].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[3].PoradoveCislo,Report[3].Popis,Report[3].FormatHodnoty,Report[3].Tolerancia_MIN_Hodnota,Report[3].Tolerancia_MAX_Hodnota,Report[3].Nominal,Report[3].Tolerancia_MIN_Jednotky,Report[3].Tolerancia_MAX_Jednotky,Report[3].NameranaHodnota,Report[3].NameranaHodnota_Jednotky,Report[3].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                
                //Tlak úniku//
                Report[4].PoradoveCislo:= '5';
                Report[4].Popis:= 'StanicaB_TlakUniku';
                Report[4].FormatHodnoty:= '1';
                Report[4].Tolerancia_MIN_Hodnota:= Reports.LeakageTest.ToleranciaTlakUniku_MIN.StanicaB;
                Report[4].Tolerancia_MAX_Hodnota:= Reports.LeakageTest.ToleranciaTlakUniku_MAX.StanicaB;
                Report[4].Nominal:= '';
                Report[4].Tolerancia_MIN_Jednotky:= 'Pa';
                Report[4].Tolerancia_MAX_Jednotky:= 'Pa';
                Report[4].NameranaHodnota:= Reports.LeakageTest.TlakUniku.StanicaB; 
                Report[4].NameranaHodnota_Jednotky:= 'Pa';
                Report[4].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[4].PoradoveCislo,Report[4].Popis,Report[4].FormatHodnoty,Report[4].Tolerancia_MIN_Hodnota,Report[4].Tolerancia_MAX_Hodnota,Report[4].Nominal,Report[4].Tolerancia_MIN_Jednotky,Report[4].Tolerancia_MAX_Jednotky,Report[4].NameranaHodnota,Report[4].NameranaHodnota_Jednotky,Report[4].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                
                //Tolerancia//
                Report[5].PoradoveCislo:= '6';
                Report[5].Popis:= 'StanicaB_Tolerancia';
                Report[5].FormatHodnoty:= '1';
                Report[5].Tolerancia_MIN_Hodnota:= '';
                Report[5].Tolerancia_MAX_Hodnota:= '';
                Report[5].Nominal:= '';
                Report[5].Tolerancia_MIN_Jednotky:= '';
                Report[5].Tolerancia_MAX_Jednotky:= '';
                Report[5].NameranaHodnota:= Reports.LeakageTest.Tolerancia.StanicaB; 
                Report[5].NameranaHodnota_Jednotky:= 'Pa';
                Report[5].VyslednyResult:= Reports.LeakageTest.VyslednyReport.StanicaB;
                SKTcpClientNewCsvEntry(Report[5].PoradoveCislo,Report[5].Popis,Report[5].FormatHodnoty,Report[5].Tolerancia_MIN_Hodnota,Report[5].Tolerancia_MAX_Hodnota,Report[5].Nominal,Report[5].Tolerancia_MIN_Jednotky,Report[5].Tolerancia_MAX_Jednotky,Report[5].NameranaHodnota,Report[5].NameranaHodnota_Jednotky,Report[5].VyslednyResult, ADR(TRCB_P3_LeakageTestB_ST8B.INPUTS.Report));
                   
                SC_KOM_Server.Switch1:= TRUE;
            END_IF  
            
            
            
            
            
            TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu:= '2';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloStanice:= 'ST8B';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.CisloPaletky;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodFiltra:= '';
            TRCB_P3_LeakageTestB_ST8B.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P3_LeakageTestB_ST8B.INPUTS.StavPaletky:= Paletka[a].PAR.StavPowerCP;
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
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.TYP_Prikazu = TRCB_P3_LeakageTestB_ST8B.INPUTS.TYP_Prikazu) AND
                (TRCB_P3_LeakageTestB_ST8B.OUTPUTS.QRkodPowerCP = TRCB_P3_LeakageTestB_ST8B.INPUTS.QRkodPowerCP) THEN
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaUkoncena:= TRUE;
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
                TRCB_P3_LeakageTestB_ST8B.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 45;
            END_IF	    
            
		
		
        45:
            SC_KOM_Server.StepName:= '45 - Odoslanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P3_LeakageTestB_ST8B.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
    END_CASE
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM



PROGRAM _INIT
	(* Insert code here *)
    SKTcpClientTrace_1.Params.IPportClient := 14000;
END_PROGRAM

PROGRAM _CYCLIC
	
	//Priradenie indexu paletky//
    a:= P1_StoperSrobovania.PAR.IndexPaletky;
	
		
    //Parametre komunikácie//
    memcpy(ADR(SKTcpClientTrace_1.Params.IPaddrServ),ADR('192.168.122.250'),SIZEOF('192.168.122.250'));

    SKTcpClientTrace_1.Params.IPportServ := 12000;
    SKTcpClientTrace_1.Params.RecvTimeout := 10000;
    SKTcpClientTrace_1();
	
    //Parametre komunikácie//
    //Vstupy pre server//
    SKTcpClientTrace_1.Params.Packet.type := TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu;
    SKTcpClientTrace_1.Params.Packet.workplace := TRCB_P1_Srobovanie_ST2.INPUTS.CisloStanice;
    TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky:= 'Pal';
    brsstrcat(ADR(TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky), ADR(P1_StoperSrobovania.PAR.IndexPaletky_STRING));
    SKTcpClientTrace_1.Params.Packet.rfid := TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky;
    SKTcpClientTrace_1.Params.Packet.master := TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP;
    SKTcpClientTrace_1.Params.Packet.dps1:= TRCB_P1_Srobovanie_ST2.INPUTS.QRkodFiltra;
    SKTcpClientTrace_1.Params.Packet.dps2:= '';
    SKTcpClientTrace_1.Params.Packet.dps3:= '';
    SKTcpClientTrace_1.Params.Packet.dps4:= '';
    SKTcpClientTrace_1.Params.Packet.dps5:= '';
    SKTcpClientTrace_1.Params.Packet.operator_id := TRCB_P1_Srobovanie_ST2.INPUTS.ID_Operatora;
    SKTcpClientTrace_1.Params.Packet.data_report:= TRCB_P1_Srobovanie_ST2.INPUTS.Report;
    SKTcpClientTrace_1.Params.Packet.result := TRCB_P1_Srobovanie_ST2.INPUTS.StavPaletky;
	
	
    //Výstupy zo servera//
    TRCB_P1_Srobovanie_ST2.OUTPUTS.TYP_Prikazu:= SKTcpClientTrace_1.Internal.Splitter.out[1];
    TRCB_P1_Srobovanie_ST2.OUTPUTS.CisloStanice:= SKTcpClientTrace_1.Internal.Splitter.out[2];
    TRCB_P1_Srobovanie_ST2.OUTPUTS.CisloPaletky:= SKTcpClientTrace_1.Internal.Splitter.out[3];
    IF TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu = '0' THEN
        TRCB_P1_Srobovanie_ST2.OUTPUTS.CisloEtikety:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    ELSE	
        TRCB_P1_Srobovanie_ST2.OUTPUTS.QRkodPowerCP:= SKTcpClientTrace_1.Internal.Splitter.out[4];
    END_IF	
    TRCB_P1_Srobovanie_ST2.OUTPUTS.QRkodFiltra:= SKTcpClientTrace_1.Internal.Splitter.out[5];
    TRCB_P1_Srobovanie_ST2.OUTPUTS.ID_Operatora:= SKTcpClientTrace_1.Internal.Splitter.out[10];
    TRCB_P1_Srobovanie_ST2.OUTPUTS.DruhCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[11];
    TRCB_P1_Srobovanie_ST2.OUTPUTS.PovolenieCinnostiNaPaletke:= SKTcpClientTrace_1.Internal.Splitter.out[12];
	
    ret := brsstrlen(ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
    
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_KOM_Server);
	
    
    
    
    
    
	
    CASE SC_KOM_Server.Step OF
		
        0:
            SC_KOM_Server.StepName:= '0 - Nulovanie';
            SKTcpClientTrace_1.Cmd.Send:= FALSE;
            SKTcpClientTrace_1.Cmd.Close:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.PriradQRkodFiltra_TYP3:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.VyziadajCisloEtikety_TYP0:= FALSE;
            TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2:= FALSE;
            TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena:= FALSE;
            TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError:= FALSE;
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
            IF TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.Step:= 10;
            ELSIF TRCB_P1_Srobovanie_ST2.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.Step:= 20;
            ELSIF TRCB_P1_Srobovanie_ST2.CMD.VyziadajCisloEtikety_TYP0 THEN
                SC_KOM_Server.Step:= 30;
            ELSIF TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.Step:= 40;
            END_IF
		
        10:
            SC_KOM_Server.StepName:= '10 - Vyziadanie stavu paletky - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
		
            TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu:= '1';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloStanice:= 'ST2';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky; //Z programu
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodFiltra:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P1_Srobovanie_ST2.INPUTS.Report:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.StavPaletky:= 'OK';
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
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.TYP_Prikazu = TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu) AND
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.QRkodPowerCP = TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP) THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena:= TRUE;
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
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 15;
            END_IF	   
            
            
            
            
            
            
            
        15:
            SC_KOM_Server.StepName:= '15 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P1_Srobovanie_ST2.CMD.VyziadajStavPaletky_TYP1 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
		
        20:
            SC_KOM_Server.StepName:= '20 - Priradenie QR kodu - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu:= '3';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloStanice:= 'ST2';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodFiltra:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P1_Srobovanie_ST2.INPUTS.Report:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.StavPaletky:= 'OK';
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
				
			
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 23;
            END_IF	
		
        23:
            SC_KOM_Server.StepName:= '23 - Priradenie QR kodu - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
            
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.TYP_Prikazu = TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu) AND
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.QRkodPowerCP = TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP) THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 25;    
            END_IF	
			
				
        25:
            SC_KOM_Server.StepName:= '25 - Vyziadanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P1_Srobovanie_ST2.CMD.PriradQRkodFiltra_TYP3 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
        30:
            SC_KOM_Server.StepName:= '30 - Vyziadanie serioveho cisla - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
			
            TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu:= '0';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloStanice:= 'ST2';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodFiltra:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.ID_Operatora:= 'E2';
            TRCB_P1_Srobovanie_ST2.INPUTS.Report:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.StavPaletky:= 'OK';
            SKTcpClientTrace_1.Cmd.Send:= TRUE;
			
			
					
            IF SKTcpClientTrace_1.Cmd.Send AND NOT SKTcpClientTrace_1.Status.staReceived AND NOT SKTcpClientTrace_1.Status.staError THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 33;
            END_IF	
		
        33:
            SC_KOM_Server.StepName:= '33 - Vyziadanie serioveho cisla - odpoved servera';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
            
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.TYP_Prikazu = TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu) THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;
            ELSIF SC_KOM_Server.AlarmTime.Q THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 35;      
            END_IF	
			
			
				
        35:
            SC_KOM_Server.StepName:= '35 - Vyziadanie serioveho cisla - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P1_Srobovanie_ST2.CMD.VyziadajCisloEtikety_TYP0 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
		
		
        40:
            SC_KOM_Server.StepName:= '40 - Odoslanie stavu paletky - odoslanie dat na server';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#5s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
		
            //Vytvorenie spravy pre report//
            IF NOT SC_KOM_Server.Switch1 THEN
                //Lavá skrutka K30//
				brsmemset(ADR(Report),0,SIZEOF(Report));
				brsmemset(ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report), 0, SIZEOF(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
				
                Report[0].PoradoveCislo:= '1';
                Report[0].Popis:= 'LavaSkrutkaK30_Moment';
                Report[0].FormatHodnoty:= '1';
                Report[0].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaK30;
                Report[0].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaK30;
                Report[0].Nominal:= '';
                Report[0].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[0].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[0].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaK30; 
                Report[0].NameranaHodnota_Jednotky:= 'Nm';
                Report[0].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[0].PoradoveCislo,Report[0].Popis,Report[0].FormatHodnoty,Report[0].Tolerancia_MIN_Hodnota,Report[0].Tolerancia_MAX_Hodnota,Report[0].Nominal,Report[0].Tolerancia_MIN_Jednotky,Report[0].Tolerancia_MAX_Jednotky,Report[0].NameranaHodnota,Report[0].NameranaHodnota_Jednotky,Report[0].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[1].PoradoveCislo:= '2';
                Report[1].Popis:= 'LavaSkrutkaK30_Uhol';
                Report[1].FormatHodnoty:= '1';
                Report[1].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaK30;
                Report[1].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaK30;
                Report[1].Nominal:= '';
                Report[1].Tolerancia_MIN_Jednotky:= 'st';
                Report[1].Tolerancia_MAX_Jednotky:= 'st';
                Report[1].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaK30; 
                Report[1].NameranaHodnota_Jednotky:= 'st';
                Report[1].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[1].PoradoveCislo,Report[1].Popis,Report[1].FormatHodnoty,Report[1].Tolerancia_MIN_Hodnota,Report[1].Tolerancia_MAX_Hodnota,Report[1].Nominal,Report[1].Tolerancia_MIN_Jednotky,Report[1].Tolerancia_MAX_Jednotky,Report[1].NameranaHodnota,Report[1].NameranaHodnota_Jednotky,Report[1].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                
                Report[2].PoradoveCislo:= '3';
                Report[2].Popis:= 'LavaSkrutkaK30_CasSrobovania';
                Report[2].FormatHodnoty:= '1';
                Report[2].Tolerancia_MIN_Hodnota:= '';
                Report[2].Tolerancia_MAX_Hodnota:= '';
                Report[2].Nominal:= '';
                Report[2].Tolerancia_MIN_Jednotky:= '';
                Report[2].Tolerancia_MAX_Jednotky:= '';
                Report[2].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaK30; 
                Report[2].NameranaHodnota_Jednotky:= 's';
                Report[2].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[2].PoradoveCislo,Report[2].Popis,Report[2].FormatHodnoty,Report[2].Tolerancia_MIN_Hodnota,Report[2].Tolerancia_MAX_Hodnota,Report[2].Nominal,Report[2].Tolerancia_MIN_Jednotky,Report[2].Tolerancia_MAX_Jednotky,Report[2].NameranaHodnota,Report[2].NameranaHodnota_Jednotky,Report[2].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[3].PoradoveCislo:= '4';
                Report[3].Popis:= 'LavaSkrutkaK30_VyskaSrobovania';
                Report[3].FormatHodnoty:= '1';
                Report[3].Tolerancia_MIN_Hodnota:= '';
                Report[3].Tolerancia_MAX_Hodnota:= '';
                Report[3].Nominal:= '';
                Report[3].Tolerancia_MIN_Jednotky:= '';
                Report[3].Tolerancia_MAX_Jednotky:= '';
                Report[3].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaK30; 
                Report[3].NameranaHodnota_Jednotky:= 'mm';
                Report[3].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[3].PoradoveCislo,Report[3].Popis,Report[3].FormatHodnoty,Report[3].Tolerancia_MIN_Hodnota,Report[3].Tolerancia_MAX_Hodnota,Report[3].Nominal,Report[3].Tolerancia_MIN_Jednotky,Report[3].Tolerancia_MAX_Jednotky,Report[3].NameranaHodnota,Report[3].NameranaHodnota_Jednotky,Report[3].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                        
                
                
                //Pravá skrutka K30//
                Report[4].PoradoveCislo:= '5';
                Report[4].Popis:= 'PravaSkrutkaK30_Moment';
                Report[4].FormatHodnoty:= '1';
                Report[4].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaK30;
                Report[4].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaK30;
                Report[4].Nominal:= '';
                Report[4].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[4].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[4].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaK30; 
                Report[4].NameranaHodnota_Jednotky:= 'Nm';
                Report[4].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[4].PoradoveCislo,Report[4].Popis,Report[4].FormatHodnoty,Report[4].Tolerancia_MIN_Hodnota,Report[4].Tolerancia_MAX_Hodnota,Report[4].Nominal,Report[4].Tolerancia_MIN_Jednotky,Report[4].Tolerancia_MAX_Jednotky,Report[4].NameranaHodnota,Report[4].NameranaHodnota_Jednotky,Report[4].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[5].PoradoveCislo:= '6';
                Report[5].Popis:= 'PravaSkrutkaK30_Uhol';
                Report[5].FormatHodnoty:= '1';
                Report[5].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaK30;
                Report[5].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaK30;
                Report[5].Nominal:= '';
                Report[5].Tolerancia_MIN_Jednotky:= 'st';
                Report[5].Tolerancia_MAX_Jednotky:= 'st';
                Report[5].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaK30; 
                Report[5].NameranaHodnota_Jednotky:= 'st';
                Report[5].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[5].PoradoveCislo,Report[5].Popis,Report[5].FormatHodnoty,Report[5].Tolerancia_MIN_Hodnota,Report[5].Tolerancia_MAX_Hodnota,Report[5].Nominal,Report[5].Tolerancia_MIN_Jednotky,Report[5].Tolerancia_MAX_Jednotky,Report[5].NameranaHodnota,Report[5].NameranaHodnota_Jednotky,Report[5].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[6].PoradoveCislo:= '7';
                Report[6].Popis:= 'PravaSkrutkaK30_CasSrobovania';
                Report[6].FormatHodnoty:= '1';
                Report[6].Tolerancia_MIN_Hodnota:= '';
                Report[6].Tolerancia_MAX_Hodnota:= '';
                Report[6].Nominal:= '';
                Report[6].Tolerancia_MIN_Jednotky:= '';
                Report[6].Tolerancia_MAX_Jednotky:= '';
                Report[6].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaK30; 
                Report[6].NameranaHodnota_Jednotky:= 's';
                Report[6].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[6].PoradoveCislo,Report[6].Popis,Report[6].FormatHodnoty,Report[6].Tolerancia_MIN_Hodnota,Report[6].Tolerancia_MAX_Hodnota,Report[6].Nominal,Report[6].Tolerancia_MIN_Jednotky,Report[6].Tolerancia_MAX_Jednotky,Report[6].NameranaHodnota,Report[6].NameranaHodnota_Jednotky,Report[6].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[7].PoradoveCislo:= '8';
                Report[7].Popis:= 'PravaSkrutkaK30_VyskaSrobovania';
                Report[7].FormatHodnoty:= '1';
                Report[7].Tolerancia_MIN_Hodnota:= '';
                Report[7].Tolerancia_MAX_Hodnota:= '';
                Report[7].Nominal:= '';
                Report[7].Tolerancia_MIN_Jednotky:= '';
                Report[7].Tolerancia_MAX_Jednotky:= '';
                Report[7].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaK30; 
                Report[7].NameranaHodnota_Jednotky:= 'mm';
                Report[7].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaK30;
                SKTcpClientNewCsvEntry(Report[7].PoradoveCislo,Report[7].Popis,Report[7].FormatHodnoty,Report[7].Tolerancia_MIN_Hodnota,Report[7].Tolerancia_MAX_Hodnota,Report[7].Nominal,Report[7].Tolerancia_MIN_Jednotky,Report[7].Tolerancia_MAX_Jednotky,Report[7].NameranaHodnota,Report[7].NameranaHodnota_Jednotky,Report[7].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
            
                
                
                
                
                
                //Zadná skrutka M4//
                Report[8].PoradoveCislo:= '9';
                Report[8].Popis:= 'ZadnaSkrutkaM4_Moment';
                Report[8].FormatHodnoty:= '1';
                Report[8].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_ZadnaSkrutkaM4;
                Report[8].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_ZadnaSkrutkaM4;
                Report[8].Nominal:= '';
                Report[8].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[8].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[8].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_ZadnaSkrutkaM4; 
                Report[8].NameranaHodnota_Jednotky:= 'Nm';
                Report[8].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[8].PoradoveCislo,Report[8].Popis,Report[8].FormatHodnoty,Report[8].Tolerancia_MIN_Hodnota,Report[8].Tolerancia_MAX_Hodnota,Report[8].Nominal,Report[8].Tolerancia_MIN_Jednotky,Report[8].Tolerancia_MAX_Jednotky,Report[8].NameranaHodnota,Report[8].NameranaHodnota_Jednotky,Report[8].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[9].PoradoveCislo:= '10';
                Report[9].Popis:= 'ZadnaSkrutkaM4_Uhol';
                Report[9].FormatHodnoty:= '1';
                Report[9].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_ZadnaSkrutkaM4;
                Report[9].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_ZadnaSkrutkaM4;
                Report[9].Nominal:= '';
                Report[9].Tolerancia_MIN_Jednotky:= 'st';
                Report[9].Tolerancia_MAX_Jednotky:= 'st';
                Report[9].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_ZadnaSkrutkaM4; 
                Report[9].NameranaHodnota_Jednotky:= 'st';
                Report[9].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[9].PoradoveCislo,Report[9].Popis,Report[9].FormatHodnoty,Report[9].Tolerancia_MIN_Hodnota,Report[9].Tolerancia_MAX_Hodnota,Report[9].Nominal,Report[9].Tolerancia_MIN_Jednotky,Report[9].Tolerancia_MAX_Jednotky,Report[9].NameranaHodnota,Report[9].NameranaHodnota_Jednotky,Report[9].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                
                Report[10].PoradoveCislo:= '11';
                Report[10].Popis:= 'ZadnaSkrutkaM4_CasSrobovania';
                Report[10].FormatHodnoty:= '1';
                Report[10].Tolerancia_MIN_Hodnota:= '';
                Report[10].Tolerancia_MAX_Hodnota:= '';
                Report[10].Nominal:= '';
                Report[10].Tolerancia_MIN_Jednotky:= '';
                Report[10].Tolerancia_MAX_Jednotky:= '';
                Report[10].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_ZadnaSkrutkaM4; 
                Report[10].NameranaHodnota_Jednotky:= 's';
                Report[10].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[10].PoradoveCislo,Report[10].Popis,Report[10].FormatHodnoty,Report[10].Tolerancia_MIN_Hodnota,Report[10].Tolerancia_MAX_Hodnota,Report[10].Nominal,Report[10].Tolerancia_MIN_Jednotky,Report[10].Tolerancia_MAX_Jednotky,Report[10].NameranaHodnota,Report[10].NameranaHodnota_Jednotky,Report[10].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[11].PoradoveCislo:= '12';
                Report[11].Popis:= 'ZadnaSkrutkaM4_VyskaSrobovania';
                Report[11].FormatHodnoty:= '1';
                Report[11].Tolerancia_MIN_Hodnota:= '';
                Report[11].Tolerancia_MAX_Hodnota:= '';
                Report[11].Nominal:= '';
                Report[11].Tolerancia_MIN_Jednotky:= '';
                Report[11].Tolerancia_MAX_Jednotky:= '';
                Report[11].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_ZadnaSkrutkaM4; 
                Report[11].NameranaHodnota_Jednotky:= 'mm';
                Report[11].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_ZadnaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[11].PoradoveCislo,Report[11].Popis,Report[11].FormatHodnoty,Report[11].Tolerancia_MIN_Hodnota,Report[11].Tolerancia_MAX_Hodnota,Report[11].Nominal,Report[11].Tolerancia_MIN_Jednotky,Report[11].Tolerancia_MAX_Jednotky,Report[11].NameranaHodnota,Report[11].NameranaHodnota_Jednotky,Report[11].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
              
                
                
                
                
                
                //Predná skrutka M4//
                Report[12].PoradoveCislo:= '13';
                Report[12].Popis:= 'PrednaSkrutkaM4_Moment';
                Report[12].FormatHodnoty:= '1';
                Report[12].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PrednaSkrutkaM4;
                Report[12].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PrednaSkrutkaM4;
                Report[12].Nominal:= '';
                Report[12].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[12].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[12].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PrednaSkrutkaM4; 
                Report[12].NameranaHodnota_Jednotky:= 'Nm';
                Report[12].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[12].PoradoveCislo,Report[12].Popis,Report[12].FormatHodnoty,Report[12].Tolerancia_MIN_Hodnota,Report[12].Tolerancia_MAX_Hodnota,Report[12].Nominal,Report[12].Tolerancia_MIN_Jednotky,Report[12].Tolerancia_MAX_Jednotky,Report[12].NameranaHodnota,Report[12].NameranaHodnota_Jednotky,Report[12].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[13].PoradoveCislo:= '14';
                Report[13].Popis:= 'PrednaSkrutkaM4_Uhol';
                Report[13].FormatHodnoty:= '1';
                Report[13].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PrednaSkrutkaM4;
                Report[13].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PrednaSkrutkaM4;
                Report[13].Nominal:= '';
                Report[13].Tolerancia_MIN_Jednotky:= 'st';
                Report[13].Tolerancia_MAX_Jednotky:= 'st';
                Report[13].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PrednaSkrutkaM4; 
                Report[13].NameranaHodnota_Jednotky:= 'st';
                Report[13].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[13].PoradoveCislo,Report[13].Popis,Report[13].FormatHodnoty,Report[13].Tolerancia_MIN_Hodnota,Report[13].Tolerancia_MAX_Hodnota,Report[13].Nominal,Report[13].Tolerancia_MIN_Jednotky,Report[13].Tolerancia_MAX_Jednotky,Report[13].NameranaHodnota,Report[13].NameranaHodnota_Jednotky,Report[13].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                       
                Report[14].PoradoveCislo:= '15';
                Report[14].Popis:= 'PrednaSkrutkaM4_CasSrobovania';
                Report[14].FormatHodnoty:= '1';
                Report[14].Tolerancia_MIN_Hodnota:= '';
                Report[14].Tolerancia_MAX_Hodnota:= '';
                Report[14].Nominal:= '';
                Report[14].Tolerancia_MIN_Jednotky:= '';
                Report[14].Tolerancia_MAX_Jednotky:= '';
                Report[14].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_PrednaSkrutkaM4; 
                Report[14].NameranaHodnota_Jednotky:= 's';
                Report[14].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[14].PoradoveCislo,Report[14].Popis,Report[14].FormatHodnoty,Report[14].Tolerancia_MIN_Hodnota,Report[14].Tolerancia_MAX_Hodnota,Report[14].Nominal,Report[14].Tolerancia_MIN_Jednotky,Report[14].Tolerancia_MAX_Jednotky,Report[14].NameranaHodnota,Report[14].NameranaHodnota_Jednotky,Report[14].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[15].PoradoveCislo:= '16';
                Report[15].Popis:= 'PrednaSkrutkaM4_VyskaSrobovania';
                Report[15].FormatHodnoty:= '1';
                Report[15].Tolerancia_MIN_Hodnota:= '';
                Report[15].Tolerancia_MAX_Hodnota:= '';
                Report[15].Nominal:= '';
                Report[15].Tolerancia_MIN_Jednotky:= '';
                Report[15].Tolerancia_MAX_Jednotky:= '';
                Report[15].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_PrednaSkrutkaM4; 
                Report[15].NameranaHodnota_Jednotky:= 'mm';
                Report[15].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PrednaSkrutkaM4;
                SKTcpClientNewCsvEntry(Report[15].PoradoveCislo,Report[15].Popis,Report[15].FormatHodnoty,Report[15].Tolerancia_MIN_Hodnota,Report[15].Tolerancia_MAX_Hodnota,Report[15].Nominal,Report[15].Tolerancia_MIN_Jednotky,Report[15].Tolerancia_MAX_Jednotky,Report[15].NameranaHodnota,Report[15].NameranaHodnota_Jednotky,Report[15].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                        
                
                
                
                
                //Skrutka DPS M4//
                Report[16].PoradoveCislo:= '17';
                Report[16].Popis:= 'SkrutkaDPS_M4_Moment';
                Report[16].FormatHodnoty:= '1';
                Report[16].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_SkrutkaDPS_M4;
                Report[16].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_SkrutkaDPS_M4;
                Report[16].Nominal:= '';
                Report[16].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[16].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[16].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_SkrutkaDPS_M4; 
                Report[16].NameranaHodnota_Jednotky:= 'Nm';
                Report[16].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4;
                SKTcpClientNewCsvEntry(Report[16].PoradoveCislo,Report[16].Popis,Report[16].FormatHodnoty,Report[16].Tolerancia_MIN_Hodnota,Report[16].Tolerancia_MAX_Hodnota,Report[16].Nominal,Report[16].Tolerancia_MIN_Jednotky,Report[16].Tolerancia_MAX_Jednotky,Report[16].NameranaHodnota,Report[16].NameranaHodnota_Jednotky,Report[16].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[17].PoradoveCislo:= '18';
                Report[17].Popis:= 'SkrutkaDPS_M4_Uhol';
                Report[17].FormatHodnoty:= '1';
                Report[17].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_SkrutkaDPS_M4;
                Report[17].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_SkrutkaDPS_M4;
                Report[17].Nominal:= '';
                Report[17].Tolerancia_MIN_Jednotky:= 'st';
                Report[17].Tolerancia_MAX_Jednotky:= 'st';
                Report[17].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_SkrutkaDPS_M4; 
                Report[17].NameranaHodnota_Jednotky:= 'st';
                Report[17].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4;
                SKTcpClientNewCsvEntry(Report[17].PoradoveCislo,Report[17].Popis,Report[17].FormatHodnoty,Report[17].Tolerancia_MIN_Hodnota,Report[17].Tolerancia_MAX_Hodnota,Report[17].Nominal,Report[17].Tolerancia_MIN_Jednotky,Report[17].Tolerancia_MAX_Jednotky,Report[17].NameranaHodnota,Report[17].NameranaHodnota_Jednotky,Report[17].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[18].PoradoveCislo:= '19';
                Report[18].Popis:= 'SkrutkaDPS_M4_CasSrobovania';
                Report[18].FormatHodnoty:= '1';
                Report[18].Tolerancia_MIN_Hodnota:= '';
                Report[18].Tolerancia_MAX_Hodnota:= '';
                Report[18].Nominal:= '';
                Report[18].Tolerancia_MIN_Jednotky:= '';
                Report[18].Tolerancia_MAX_Jednotky:= '';
                Report[18].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_SkrutkaDPS_M4; 
                Report[18].NameranaHodnota_Jednotky:= 's';
                Report[18].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4;
                SKTcpClientNewCsvEntry(Report[18].PoradoveCislo,Report[18].Popis,Report[18].FormatHodnoty,Report[18].Tolerancia_MIN_Hodnota,Report[18].Tolerancia_MAX_Hodnota,Report[18].Nominal,Report[18].Tolerancia_MIN_Jednotky,Report[18].Tolerancia_MAX_Jednotky,Report[18].NameranaHodnota,Report[18].NameranaHodnota_Jednotky,Report[18].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[19].PoradoveCislo:= '20';
                Report[19].Popis:= 'SkrutkaDPS_M4_VyskaSrobovania';
                Report[19].FormatHodnoty:= '1';
                Report[19].Tolerancia_MIN_Hodnota:= '';
                Report[19].Tolerancia_MAX_Hodnota:= '';
                Report[19].Nominal:= '';
                Report[19].Tolerancia_MIN_Jednotky:= '';
                Report[19].Tolerancia_MAX_Jednotky:= '';
                Report[19].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_SkrutkaDPS_M4; 
                Report[19].NameranaHodnota_Jednotky:= 'mm';
                Report[19].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_SkrutkaDPS_M4;
                SKTcpClientNewCsvEntry(Report[19].PoradoveCislo,Report[19].Popis,Report[19].FormatHodnoty,Report[19].Tolerancia_MIN_Hodnota,Report[19].Tolerancia_MAX_Hodnota,Report[19].Nominal,Report[19].Tolerancia_MIN_Jednotky,Report[19].Tolerancia_MAX_Jednotky,Report[19].NameranaHodnota,Report[19].NameranaHodnota_Jednotky,Report[19].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                        
                       
                
                
                
                //Lavá skrutka M5//
                Report[20].PoradoveCislo:= '21';
                Report[20].Popis:= 'LavaSkrutkaM5_Moment';
                Report[20].FormatHodnoty:= '1';
                Report[20].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_LavaSkrutkaM5;
                Report[20].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_LavaSkrutkaM5;
                Report[20].Nominal:= '';
                Report[20].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[20].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[20].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_LavaSkrutkaM5; 
                Report[20].NameranaHodnota_Jednotky:= 'Nm';
                Report[20].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[20].PoradoveCislo,Report[20].Popis,Report[20].FormatHodnoty,Report[20].Tolerancia_MIN_Hodnota,Report[20].Tolerancia_MAX_Hodnota,Report[20].Nominal,Report[20].Tolerancia_MIN_Jednotky,Report[20].Tolerancia_MAX_Jednotky,Report[20].NameranaHodnota,Report[20].NameranaHodnota_Jednotky,Report[20].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[21].PoradoveCislo:= '22';
                Report[21].Popis:= 'LavaSkrutkaM5_Uhol';
                Report[21].FormatHodnoty:= '1';
                Report[21].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_LavaSkrutkaM5;
                Report[21].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_LavaSkrutkaM5;
                Report[21].Nominal:= '';
                Report[21].Tolerancia_MIN_Jednotky:= 'st';
                Report[21].Tolerancia_MAX_Jednotky:= 'st';
                Report[21].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_LavaSkrutkaM5; 
                Report[21].NameranaHodnota_Jednotky:= 'st';
                Report[21].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[21].PoradoveCislo,Report[21].Popis,Report[21].FormatHodnoty,Report[21].Tolerancia_MIN_Hodnota,Report[21].Tolerancia_MAX_Hodnota,Report[21].Nominal,Report[21].Tolerancia_MIN_Jednotky,Report[21].Tolerancia_MAX_Jednotky,Report[21].NameranaHodnota,Report[21].NameranaHodnota_Jednotky,Report[21].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                  
                Report[22].PoradoveCislo:= '23';
                Report[22].Popis:= 'LavaSkrutkaM5_CasSrobovania';
                Report[22].FormatHodnoty:= '1';
                Report[22].Tolerancia_MIN_Hodnota:= '';
                Report[22].Tolerancia_MAX_Hodnota:= '';
                Report[22].Nominal:= '';
                Report[22].Tolerancia_MIN_Jednotky:= '';
                Report[22].Tolerancia_MAX_Jednotky:= '';
                Report[22].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_LavaSkrutkaM5; 
                Report[22].NameranaHodnota_Jednotky:= 's';
                Report[22].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[22].PoradoveCislo,Report[22].Popis,Report[22].FormatHodnoty,Report[22].Tolerancia_MIN_Hodnota,Report[22].Tolerancia_MAX_Hodnota,Report[22].Nominal,Report[22].Tolerancia_MIN_Jednotky,Report[22].Tolerancia_MAX_Jednotky,Report[22].NameranaHodnota,Report[22].NameranaHodnota_Jednotky,Report[22].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[23].PoradoveCislo:= '24';
                Report[23].Popis:= 'LavaSkrutkaM5_VyskaSrobovania';
                Report[23].FormatHodnoty:= '1';
                Report[23].Tolerancia_MIN_Hodnota:= '';
                Report[23].Tolerancia_MAX_Hodnota:= '';
                Report[23].Nominal:= '';
                Report[23].Tolerancia_MIN_Jednotky:= '';
                Report[23].Tolerancia_MAX_Jednotky:= '';
                Report[23].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_LavaSkrutkaM5; 
                Report[23].NameranaHodnota_Jednotky:= 'mm';
                Report[23].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_LavaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[23].PoradoveCislo,Report[23].Popis,Report[23].FormatHodnoty,Report[23].Tolerancia_MIN_Hodnota,Report[23].Tolerancia_MAX_Hodnota,Report[23].Nominal,Report[23].Tolerancia_MIN_Jednotky,Report[23].Tolerancia_MAX_Jednotky,Report[23].NameranaHodnota,Report[23].NameranaHodnota_Jednotky,Report[23].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                
                
                
                
                
                //Pravá skrutka M5//
                Report[24].PoradoveCislo:= '25';
                Report[24].Popis:= 'PravaSkrutkaM5_Moment';
                Report[24].FormatHodnoty:= '1';
                Report[24].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_PravaSkrutkaM5;
                Report[24].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_PravaSkrutkaM5;
                Report[24].Nominal:= '';
                Report[24].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[24].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[24].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_PravaSkrutkaM5; 
                Report[24].NameranaHodnota_Jednotky:= 'Nm';
                Report[24].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[24].PoradoveCislo,Report[24].Popis,Report[24].FormatHodnoty,Report[24].Tolerancia_MIN_Hodnota,Report[24].Tolerancia_MAX_Hodnota,Report[24].Nominal,Report[24].Tolerancia_MIN_Jednotky,Report[24].Tolerancia_MAX_Jednotky,Report[24].NameranaHodnota,Report[24].NameranaHodnota_Jednotky,Report[24].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[25].PoradoveCislo:= '26';
                Report[25].Popis:= 'PravaSkrutkaM5_Uhol';
                Report[25].FormatHodnoty:= '1';
                Report[25].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_PravaSkrutkaM5;
                Report[25].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_PravaSkrutkaM5;
                Report[25].Nominal:= '';
                Report[25].Tolerancia_MIN_Jednotky:= 'st';
                Report[25].Tolerancia_MAX_Jednotky:= 'st';
                Report[25].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_PravaSkrutkaM5; 
                Report[25].NameranaHodnota_Jednotky:= 'st';
                Report[25].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[25].PoradoveCislo,Report[25].Popis,Report[25].FormatHodnoty,Report[25].Tolerancia_MIN_Hodnota,Report[25].Tolerancia_MAX_Hodnota,Report[25].Nominal,Report[25].Tolerancia_MIN_Jednotky,Report[25].Tolerancia_MAX_Jednotky,Report[25].NameranaHodnota,Report[25].NameranaHodnota_Jednotky,Report[25].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                
                Report[26].PoradoveCislo:= '27';
                Report[26].Popis:= 'PravaSkrutkaM5_CasSrobovania';
                Report[26].FormatHodnoty:= '1';
                Report[26].Tolerancia_MIN_Hodnota:= '';
                Report[26].Tolerancia_MAX_Hodnota:= '';
                Report[26].Nominal:= '';
                Report[26].Tolerancia_MIN_Jednotky:= '';
                Report[26].Tolerancia_MAX_Jednotky:= '';
                Report[26].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_PravaSkrutkaM5; 
                Report[26].NameranaHodnota_Jednotky:= 's';
                Report[26].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[26].PoradoveCislo,Report[26].Popis,Report[26].FormatHodnoty,Report[26].Tolerancia_MIN_Hodnota,Report[26].Tolerancia_MAX_Hodnota,Report[26].Nominal,Report[26].Tolerancia_MIN_Jednotky,Report[26].Tolerancia_MAX_Jednotky,Report[26].NameranaHodnota,Report[26].NameranaHodnota_Jednotky,Report[26].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[27].PoradoveCislo:= '28';
                Report[27].Popis:= 'PravaSkrutkaM5_VyskaSrobovania';
                Report[27].FormatHodnoty:= '1';
                Report[27].Tolerancia_MIN_Hodnota:= '';
                Report[27].Tolerancia_MAX_Hodnota:= '';
                Report[27].Nominal:= '';
                Report[27].Tolerancia_MIN_Jednotky:= '';
                Report[27].Tolerancia_MAX_Jednotky:= '';
                Report[27].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_PravaSkrutkaM5; 
                Report[27].NameranaHodnota_Jednotky:= 'mm';
                Report[27].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_PravaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[27].PoradoveCislo,Report[27].Popis,Report[27].FormatHodnoty,Report[27].Tolerancia_MIN_Hodnota,Report[27].Tolerancia_MAX_Hodnota,Report[27].Nominal,Report[27].Tolerancia_MIN_Jednotky,Report[27].Tolerancia_MAX_Jednotky,Report[27].NameranaHodnota,Report[27].NameranaHodnota_Jednotky,Report[27].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                              
                
                
                
                //Stredná skrutka M5//
                Report[28].PoradoveCislo:= '29';
                Report[28].Popis:= 'StrednaSkrutkaM5_Moment';
                Report[28].FormatHodnoty:= '1';
                Report[28].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMIN.P1_StrednaSkrutkaM5;
                Report[28].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Moment_ToleranciaMAX.P1_StrednaSkrutkaM5;
                Report[28].Nominal:= '';
                Report[28].Tolerancia_MIN_Jednotky:= 'Nm';
                Report[28].Tolerancia_MAX_Jednotky:= 'Nm';
                Report[28].NameranaHodnota:= Reports.Skrutkovacky.Moment_NameranaHodnota.P1_StrednaSkrutkaM5; 
                Report[28].NameranaHodnota_Jednotky:= 'Nm';
                Report[28].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[28].PoradoveCislo,Report[28].Popis,Report[28].FormatHodnoty,Report[28].Tolerancia_MIN_Hodnota,Report[28].Tolerancia_MAX_Hodnota,Report[28].Nominal,Report[28].Tolerancia_MIN_Jednotky,Report[28].Tolerancia_MAX_Jednotky,Report[28].NameranaHodnota,Report[28].NameranaHodnota_Jednotky,Report[28].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[29].PoradoveCislo:= '30';
                Report[29].Popis:= 'StrednaSkrutkaM5_Uhol';
                Report[29].FormatHodnoty:= '1';
                Report[29].Tolerancia_MIN_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMIN.P1_StrednaSkrutkaM5;
                Report[29].Tolerancia_MAX_Hodnota:= Reports.Skrutkovacky.Uhol_ToleranciaMAX.P1_StrednaSkrutkaM5;
                Report[29].Nominal:= '';
                Report[29].Tolerancia_MIN_Jednotky:= 'st';
                Report[29].Tolerancia_MAX_Jednotky:= 'st';
                Report[29].NameranaHodnota:= Reports.Skrutkovacky.Uhol_NameranaHodnota.P1_StrednaSkrutkaM5; 
                Report[29].NameranaHodnota_Jednotky:= 'st';
                Report[29].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[29].PoradoveCislo,Report[29].Popis,Report[29].FormatHodnoty,Report[29].Tolerancia_MIN_Hodnota,Report[29].Tolerancia_MAX_Hodnota,Report[29].Nominal,Report[29].Tolerancia_MIN_Jednotky,Report[29].Tolerancia_MAX_Jednotky,Report[29].NameranaHodnota,Report[29].NameranaHodnota_Jednotky,Report[29].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[30].PoradoveCislo:= '31';
                Report[30].Popis:= 'StrednaSkrutkaM5_CasSrobovania';
                Report[30].FormatHodnoty:= '1';
                Report[30].Tolerancia_MIN_Hodnota:= '';
                Report[30].Tolerancia_MAX_Hodnota:= '';
                Report[30].Nominal:= '';
                Report[30].Tolerancia_MIN_Jednotky:= '';
                Report[30].Tolerancia_MAX_Jednotky:= '';
                Report[30].NameranaHodnota:= Reports.Skrutkovacky.CasSkrutkovania.P1_StrednaSkrutkaM5; 
                Report[30].NameranaHodnota_Jednotky:= 's';
                Report[30].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[30].PoradoveCislo,Report[30].Popis,Report[30].FormatHodnoty,Report[30].Tolerancia_MIN_Hodnota,Report[30].Tolerancia_MAX_Hodnota,Report[30].Nominal,Report[30].Tolerancia_MIN_Jednotky,Report[30].Tolerancia_MAX_Jednotky,Report[30].NameranaHodnota,Report[30].NameranaHodnota_Jednotky,Report[30].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                Report[31].PoradoveCislo:= '32';
                Report[31].Popis:= 'StrednaSkrutkaM5_VyskaSrobovania';
                Report[31].FormatHodnoty:= '1';
                Report[31].Tolerancia_MIN_Hodnota:= '';
                Report[31].Tolerancia_MAX_Hodnota:= '';
                Report[31].Nominal:= '';
                Report[31].Tolerancia_MIN_Jednotky:= '';
                Report[31].Tolerancia_MAX_Jednotky:= '';
                Report[31].NameranaHodnota:= Reports.Skrutkovacky.VyskaSkrutkovania.P1_StrednaSkrutkaM5; 
                Report[31].NameranaHodnota_Jednotky:= 'mm';
                Report[31].VyslednyResult:= Reports.Skrutkovacky.VyslednyReport.P1_StrednaSkrutkaM5;
                SKTcpClientNewCsvEntry(Report[31].PoradoveCislo,Report[31].Popis,Report[31].FormatHodnoty,Report[31].Tolerancia_MIN_Hodnota,Report[31].Tolerancia_MAX_Hodnota,Report[31].Nominal,Report[31].Tolerancia_MIN_Jednotky,Report[31].Tolerancia_MAX_Jednotky,Report[31].NameranaHodnota,Report[31].NameranaHodnota_Jednotky,Report[31].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                
                              
                                   
                //Kamera 6//
                Report[32].PoradoveCislo:= '33';
                Report[32].Popis:= 'KAM_6_KontrolaPaletky';
                Report[32].FormatHodnoty:= '2';
                Report[32].Tolerancia_MIN_Hodnota:= '';
                Report[32].Tolerancia_MAX_Hodnota:= '';
                Report[32].Nominal:= 'OK';
                Report[32].Tolerancia_MIN_Jednotky:= '';
                Report[32].Tolerancia_MAX_Jednotky:= '';
                IF Reports.Kamery.P1_CAM6_KontrolaPaletky = 'PASS' THEN
                    Report[32].NameranaHodnota:= 'OK'; 
                ELSE
                    Report[32].NameranaHodnota:= 'NG';
                END_IF    
                Report[32].NameranaHodnota_Jednotky:= '';
                Report[32].VyslednyResult:= Reports.Kamery.P1_CAM6_KontrolaPaletky;
                SKTcpClientNewCsvEntry(Report[32].PoradoveCislo,Report[32].Popis,Report[32].FormatHodnoty,Report[32].Tolerancia_MIN_Hodnota,Report[32].Tolerancia_MAX_Hodnota,Report[32].Nominal,Report[32].Tolerancia_MIN_Jednotky,Report[32].Tolerancia_MAX_Jednotky,Report[32].NameranaHodnota,Report[32].NameranaHodnota_Jednotky,Report[32].VyslednyResult, ADR(TRCB_P1_Srobovanie_ST2.INPUTS.Report));
                SC_KOM_Server.Switch1:= TRUE;
            END_IF    
            
            
            
            
            TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu:= '2';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloStanice:= 'ST2';
            TRCB_P1_Srobovanie_ST2.INPUTS.CisloPaletky;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP:= Paletka[a].PAR.QRkodPowerCP;
            TRCB_P1_Srobovanie_ST2.INPUTS.QRkodFiltra:= '';
            TRCB_P1_Srobovanie_ST2.INPUTS.ID_Operatora:= Paletka[a].PAR.ID_Operatora;
            TRCB_P1_Srobovanie_ST2.INPUTS.StavPaletky:= Paletka[a].PAR.StavPowerCP;
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
            SC_KOM_Server.AlarmTime.PT:= T#5s;
            SC_KOM_Server.AlarmTime.IN:= TRUE;
            
            IF SKTcpClientTrace_1.Status.staReceived AND 
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.TYP_Prikazu = TRCB_P1_Srobovanie_ST2.INPUTS.TYP_Prikazu) AND
                (TRCB_P1_Srobovanie_ST2.OUTPUTS.QRkodPowerCP = TRCB_P1_Srobovanie_ST2.INPUTS.QRkodPowerCP) THEN
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaUkoncena:= TRUE;
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
                TRCB_P1_Srobovanie_ST2.STATUS.KomunikaciaError:= TRUE;
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 45;
            END_IF	   
             
            
            
            
		
        45:
            SC_KOM_Server.StepName:= '45 - Odoslanie stavu paletky - cakam na ukoncenie komunikacie';
            SC_KOM_Server.IdleTime.PT:= T#3s;
            SC_KOM_Server.AlarmTime.PT:= T#10s;
		
            IF NOT TRCB_P1_Srobovanie_ST2.CMD.OdosliStavPaletky_TYP2 THEN
                SC_KOM_Server.ResetStep:= TRUE;
                SC_KOM_Server.Step:= 0;
            END_IF
		
    END_CASE
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


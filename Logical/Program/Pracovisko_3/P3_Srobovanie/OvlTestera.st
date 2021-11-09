
ACTION OvlTestera: 
	
	//Parametre komunikácie//
    memcpy(ADR(SKTcpClientTester_0.Params.IPaddrServ),ADR('192.168.122.251'),SIZEOF('192.168.122.251'));
    SKTcpClientTester_0.Params.IPportClient := 1031;
    SKTcpClientTester_0.Params.IPportServ := 1030;
    SKTcpClientTester_0.Params.RecvTimeout := 10000;
    strcpy(ADR(SKTcpClientTester_0.Params.Packet.data),ADR(dataStr));
    SKTcpClientTester_0();
	
    
    Cas_HVTester.PT:= T#1M;
    Cas_HVTester();
    
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_OvlTesteraHV);
	
	
    CASE SC_OvlTesteraHV.Step OF
		
        0:
            SC_OvlTesteraHV.StepName:= '0 - Nulovanie';
            SKTcpClientTester_0.Enable:= TRUE;
            SKTcpClientTester_0.Cmd.Send:= FALSE;
            HV_Test_UKONCENY:= FALSE;
            PocetDopytovNaTester:= 0;
            SC_OvlTesteraHV.ResetStep:= TRUE;
            SC_OvlTesteraHV.Step:= 1;
			
	
	
        1:
            SC_OvlTesteraHV.StepName:= '1 - Cakam na spustenie testera';
            IF HV_Test_START THEN
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= '';
                Cas_HVTester.IN:= TRUE;
                NameranyCas_InitTestera:= 0;
                NameranyCas_PoslanieQRkodu:= 0;
                NameranyCas_CelkovyCasTestovania:= 0;
                SC_OvlTesteraHV.Step:= 10;
            END_IF
	
        10:
            SC_OvlTesteraHV.StepName:= '10 - Dopyt na stav testera - typ 0';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#5s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            SC_OvlTesteraHV.AlarmTime.IN:= TRUE;
            
            
            SKTcpClientTester_0.Params.Packet.type:= 0;
            SKTcpClientTester_0.Params.Packet.workplace:= 46;
            SKTcpClientTester_0.Params.Packet.id:= 1;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 13;
            ELSIF SC_OvlTesteraHV.AlarmTime.Q AND (SKTcpClientTester_0.Status.staReceived OR SKTcpClientTester_0.Status.staError) THEN    
                PocetDopytovNaTester:= PocetDopytovNaTester + 1;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 12;
            END_IF	
		
        12:
            SC_OvlTesteraHV.StepName:= '12 - Dopyt na stav testera - cakam na opatovny dopyt na tester';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#5s;    
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            SKTcpClientTester_0.Cmd.Send:= FALSE;
            
            IF PocetDopytovNaTester < 3 THEN
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 10;
                END_IF
            ELSE
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF    
            
            
            
        13:
            SC_OvlTesteraHV.StepName:= '13 - Odpoved na stav testera - typ 0';
            SC_OvlTesteraHV.IdleTime.PT:= T#500ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                NameranyCas_InitTestera:= Cas_HVTester.ET;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 15;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 10;
                END_IF    
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 10;
                END_IF 
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF
			
        15:
            SC_OvlTesteraHV.StepName:= '15 - Poslanie QR kodu Power CP - typ 1';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            
            
            SKTcpClientTester_0.Params.Packet.type:= 1;
            SKTcpClientTester_0.Params.Packet.workplace:= 46;
            SKTcpClientTester_0.Params.Packet.id:= 1;
            dataStr:= Paletka[i].PAR.QRkodPowerCP;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
           
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 18;
            END_IF	
			
			
		
        18:
            SC_OvlTesteraHV.StepName:= '18 - Odpoved na poslanie QR kodu - typ 1';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;	
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                NameranyCas_PoslanieQRkodu:= Cas_HVTester.ET;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 20;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 15;
                END_IF    
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF
			
			
        20:
            SC_OvlTesteraHV.StepName:= '20 - Dopyt na stav testera - typ 0';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            
            
            SKTcpClientTester_0.Params.Packet.type:= 0;
            SKTcpClientTester_0.Params.Packet.workplace:= 46;
            SKTcpClientTester_0.Params.Packet.id:= 1;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 23;
            END_IF	
			
        23:
            SC_OvlTesteraHV.StepName:= '23 - Odpoved na stav testera - typ 0';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 3 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 20;
                END_IF
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 4 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 25;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF
			
		
        25:
            SC_OvlTesteraHV.StepName:= '25 - Dopyt na vysledok testu - typ 2';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            
            
            SKTcpClientTester_0.Params.Packet.type:= 2;
            SKTcpClientTester_0.Params.Packet.workplace:= 46;
            SKTcpClientTester_0.Params.Packet.id:= 1;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 28;
            END_IF	
			
			
			
        28:
            SC_OvlTesteraHV.StepName:= '28 - Odpoved na vysledok testu - typ 2';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;	
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
			
		
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'OK';
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 30;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 30;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 25;
                END_IF
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 3 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraHV.IdleTime.Q THEN
                    SC_OvlTesteraHV.ResetStep:= TRUE;
                    SC_OvlTesteraHV.Step:= 25;
                END_IF    
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF
			
        30:
            SC_OvlTesteraHV.StepName:= '30 - Potvrdenie precitanie vysledkov testu - typ 3';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
            SC_OvlTesteraHV.IdleTime.IN:= TRUE;
            
            
            SKTcpClientTester_0.Params.Packet.type:= 3;
            SKTcpClientTester_0.Params.Packet.workplace:= 46;
            SKTcpClientTester_0.Params.Packet.id:= 1;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 33;
            END_IF	
			
			
			
        33:
            SC_OvlTesteraHV.StepName:= '33 - Odpoved testera na potvrdenie vysledkov - typ 3';
            SC_OvlTesteraHV.IdleTime.PT:= T#300ms;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;	
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 3 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                NameranyCas_CelkovyCasTestovania:= Cas_HVTester.ET;
                Cas_HVTester.IN:= FALSE;
                HV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 3 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                P3_Srobovanie.STAV.Vysledok_HV_Testu:= 'NG';
                NameranyCas_CelkovyCasTestovania:= Cas_HVTester.ET;
                Cas_HVTester.IN:= FALSE;
                HV_Test_UKONCENY:= TRUE;
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 100;
            END_IF
			
	
			
        100:
            SC_OvlTesteraHV.StepName:= '100 - Cakam na zrusenie signalu start testovania';
            SC_OvlTesteraHV.IdleTime.PT:= T#3s;
            SC_OvlTesteraHV.AlarmTime.PT:= T#10s;
	
            IF NOT HV_Test_START THEN
                SC_OvlTesteraHV.ResetStep:= TRUE;
                SC_OvlTesteraHV.Step:= 0;
            END_IF	
			
			
    END_CASE

			
END_ACTION


ACTION OvlTestera: 

		//Parametre komunikácie//
    memcpy(ADR(SKTcpClientTester_0.Params.IPaddrServ),ADR('192.168.122.252'),SIZEOF('192.168.122.252'));
    SKTcpClientTester_0.Params.IPportClient := 1033;
    SKTcpClientTester_0.Params.IPportServ := 1030;
    SKTcpClientTester_0.Params.RecvTimeout := 10000;
    strcpy(ADR(SKTcpClientTester_0.Params.Packet.data),ADR(dataStr));
    SKTcpClientTester_0();
	
    Cas_FunkcnyTestB.PT:= T#1M;
    Cas_FunkcnyTestB();
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_OvlTesteraFT);
	
	
    CASE SC_OvlTesteraFT.Step OF
		
        0:
            SC_OvlTesteraFT.StepName:= '0 - Nulovanie';
            SKTcpClientTester_0.Enable:= TRUE;
            SKTcpClientTester_0.Cmd.Send:= FALSE;
            FV_Test_UKONCENY:= FALSE;;
            FV_Test_PocetDopytovTestera:= 0;
            PocetDopytovNaTester:= 0;
            SC_OvlTesteraFT.ResetStep:= TRUE;
            SC_OvlTesteraFT.Step:= 1;
			
	
	
        1:
            SC_OvlTesteraFT.StepName:= '1 - Cakam na spustenie testera';
            IF FV_Test_START THEN
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= '';
                Cas_FunkcnyTestB.IN:= TRUE;
                NameranyCasFunkcnehoTestuB:= 0;
                SC_OvlTesteraFT.Step:= 10;
            END_IF
	
        10:
            SC_OvlTesteraFT.StepName:= '10 - Dopyt na stav testera - typ 0';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
            SC_OvlTesteraFT.AlarmTime.IN:= TRUE;
			
            
            SKTcpClientTester_0.Params.Packet.type:= 0;
            SKTcpClientTester_0.Params.Packet.workplace:= 49;
            SKTcpClientTester_0.Params.Packet.id:= 2;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 13;
            ELSIF SC_OvlTesteraFT.AlarmTime.Q AND (SKTcpClientTester_0.Status.staReceived OR SKTcpClientTester_0.Status.staError) THEN    
                PocetDopytovNaTester:= PocetDopytovNaTester + 1;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 12;    
            END_IF	
		
        12:
            SC_OvlTesteraFT.StepName:= '12 - Dopyt na stav testera - cakam na opatovny dopyt na tester';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#5s;    
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
            SKTcpClientTester_0.Cmd.Send:= FALSE;
            
            IF PocetDopytovNaTester < 10 THEN
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 10;
                END_IF
            ELSE
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF    
                    
            
            
            
            
            
            
        13:
            SC_OvlTesteraFT.StepName:= '13 - Odpoved na stav testera - typ 0';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 15;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 10;
                END_IF  
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 10;
                END_IF  
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF
			
        15:
            SC_OvlTesteraFT.StepName:= '15 - Poslanie QR kodu Power CP - typ 1';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            
            SKTcpClientTester_0.Params.Packet.type:= 1;
            SKTcpClientTester_0.Params.Packet.workplace:= 49;
            SKTcpClientTester_0.Params.Packet.id:= 2;
            dataStr:= Paletka[i].PAR.QRkodPowerCP;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
           
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 18;
            END_IF	
			
			
		
        18:
            SC_OvlTesteraFT.StepName:= '18 - Odpoved na poslanie QR kodu - typ 1';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 20;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 15;
                END_IF  
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 1 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF
			
			
        20:
            SC_OvlTesteraFT.StepName:= '20 - Dopyt na stav testera - typ 0';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            
            SKTcpClientTester_0.Params.Packet.type:= 0;
            SKTcpClientTester_0.Params.Packet.workplace:= 49;
            SKTcpClientTester_0.Params.Packet.id:= 2;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 23;
            END_IF	
			
        23:
            SC_OvlTesteraFT.StepName:= '23 - Odpoved na stav testera - typ 0';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 3 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 20;
                END_IF  
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 4 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 25;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 0 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF
			
		
        25:
            SC_OvlTesteraFT.StepName:= '25 - Dopyt na vysledok testu - typ 2';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            
            SKTcpClientTester_0.Params.Packet.type:= 2;
            SKTcpClientTester_0.Params.Packet.workplace:= 49;
            SKTcpClientTester_0.Params.Packet.id:= 2;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            	
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 28;
            END_IF	
			
			
			
        28:
            SC_OvlTesteraFT.StepName:= '28 - Odpoved na vysledok testu - typ 2';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
		
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'OK';
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 30;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 2 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 30;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 25;
                END_IF    
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 2 AND SKTcpClientTester_0.Status.DataRecv[5]= 3 THEN	
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                IF SC_OvlTesteraFT.IdleTime.Q THEN
                    SC_OvlTesteraFT.ResetStep:= TRUE;
                    SC_OvlTesteraFT.Step:= 25;
                END_IF       
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF
			
        30:
            SC_OvlTesteraFT.StepName:= '30 - Potvrdenie precitanie vysledkov testu - typ 3';
            SC_OvlTesteraFT.IdleTime.PT:= T#300ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            SC_OvlTesteraFT.IdleTime.IN:= TRUE;
			
            
            SKTcpClientTester_0.Params.Packet.type:= 3;
            SKTcpClientTester_0.Params.Packet.workplace:= 49;
            SKTcpClientTester_0.Params.Packet.id:= 2;
            SKTcpClientTester_0.Cmd.Send:= TRUE;
            
			
            IF SKTcpClientTester_0.Cmd.Send AND NOT SKTcpClientTester_0.Status.staReceived AND NOT SKTcpClientTester_0.Status.staError THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 33;
            END_IF	
			
			
			
        33:
            SC_OvlTesteraFT.StepName:= '33 - Odpoved testera na potvrdenie vysledkov - typ 3';
            SC_OvlTesteraFT.IdleTime.PT:= T#500ms;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;	
			
            IF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 3 AND SKTcpClientTester_0.Status.DataRecv[5]= 0 THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                FV_Test_UKONCENY:= TRUE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staReceived AND SKTcpClientTester_0.Status.DataRecv[2]= 3 AND SKTcpClientTester_0.Status.DataRecv[5]= 1 THEN
                P4_FunkcnyTestB.STAV.Vysledok_FV_Testu:= 'NG';
                FV_Test_UKONCENY:= TRUE;
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            ELSIF SKTcpClientTester_0.Status.staError THEN
                SKTcpClientTester_0.Cmd.Send:= FALSE;
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 100;
            END_IF
			
	
			
        100:
            SC_OvlTesteraFT.StepName:= '100 - Cakam na zrusenie signalu start testovania';
            SC_OvlTesteraFT.IdleTime.PT:= T#3s;
            SC_OvlTesteraFT.AlarmTime.PT:= T#10s;
            
            NameranyCasFunkcnehoTestuB:= Cas_FunkcnyTestB.ET;
            Cas_FunkcnyTestB.IN:= FALSE;
            
	
            IF NOT FV_Test_START THEN
                SC_OvlTesteraFT.ResetStep:= TRUE;
                SC_OvlTesteraFT.Step:= 0;
            END_IF	
			
			
    END_CASE
	
	
END_ACTION

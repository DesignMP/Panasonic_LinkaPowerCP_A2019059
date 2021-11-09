
PROGRAM _INIT
    P2_Zvaranie.PAR.ServoZdvihu_JoggRychlost:= 5;
	
    //Zápis do ParID serva - nastavenie max momentu v smere otáèania a v protismere otáèania//
//    NovaHodnotaMomentu_POS := 1.5; //v Nm
//    NovaHodnotaMomentu_NEG := 1.5; //v Nm
//    MC_BR_ProcessParID_AcpAx_0.Axis:= ADR(gAxis_5);
//    MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(McAcpAxProcessParIDType_0);
//    MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 2;
//    MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
//    
//    McAcpAxProcessParIDType_0[0].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[0].ParID      := 248;
//    McAcpAxProcessParIDType_0[0].VariableAddress    := ADR(NovaHodnotaMomentu_POS);
//    
//    McAcpAxProcessParIDType_0[1].DataType   := mcACPAX_PARTYPE_REAL;	
//    McAcpAxProcessParIDType_0[1].ParID      := 249;
//    McAcpAxProcessParIDType_0[1].VariableAddress    := ADR(NovaHodnotaMomentu_NEG);
//	
//    MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
//    MC_BR_ProcessParID_AcpAx_0();
	 
END_PROGRAM

PROGRAM _CYCLIC
	
     //Index paletky//
    i:= P2_StoperZvarania.PAR.IndexPaletky;
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_P2_Zvaranie);
	
	
    //Volanie podprogramov//
    OvlServaZdvihu;
    OvlPojazdu;
	
    //Reset sekcie //
    IF NOT Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
        SC_P2_Zvaranie.Step:= 0;
    ELSIF P2_Zvaranie.Reset THEN
        SC_P2_Zvaranie.Step:= 0;
        P2_Zvaranie.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serva//
    IF EDGEPOS(P2_PoruchaST4) THEN
        Zdvih_STOP:= TRUE;
    ELSIF EDGEPOS(P2_Zvaranie.Reset) THEN
        Zdvih_STOP:= TRUE;
    END_IF	
	
   
	
	
    CASE SC_P2_Zvaranie.Step OF 
	
	
        0:
            SC_P2_Zvaranie.StepName:='0 - Nulovanie';
            SC_OvlZdvihu.Step:= 0;
            P2_Zvaranie.Automat:= FALSE;
            P2_Zvaranie.KoniecCyklu:= FALSE;
            P2_Zvaranie.Manual:= FALSE;
            P2_Zvaranie.STAV.PoINIT:= FALSE;
            P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggLimit_ACTIVE:= FALSE;
            P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= FALSE;
            P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
            P2_Zvaranie.OUT.Zvaracka_RESET:= FALSE;
            P2_Zvaranie.OUT.Zvaracka_START:= FALSE;
									
            IF Safety.STAV.P2_ZonaBunky_AKTIVNA AND NOT P2_Pracovisko.STAV.PORUCHA AND P2_Pracovisko.IN.PrivodVzduchu_SnimacTlaku_S3 AND P2_Pracovisko.STAV.ServaBunky_READY THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 1;
            END_IF
	
        1:
            SC_P2_Zvaranie.StepName:='1 - Cakam na spustenie vyroby';
            P2_Zvaranie.KoniecCyklu:= FALSE;
            IF P2_Zvaranie.Automat THEN
                SC_P2_Zvaranie.Step:= 2;
            ELSIF P2_Zvaranie.Manual THEN
                SC_P2_Zvaranie.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
		
        2:
            SC_P2_Zvaranie.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            SC_P2_Zvaranie.IdleTime.IN:= TRUE;
									
            IF SC_P2_Zvaranie.IdleTime.Q THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 3;
            END_IF
		
	
        3:
            SC_P2_Zvaranie.StepName:='3 - Inicializacia - kontrola homingu serva zdvihu zvarania';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
		
            IF P2_Zvaranie.STAV.ServoZdvihu_HomingOK THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 5;
            ELSE
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 4;
            END_IF
		
        4:
            SC_P2_Zvaranie.StepName:='4 - Inicializacia - spustenie homingu serva zdvihu zvarania';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
		
            IF NOT SC_P2_Zvaranie.Switch1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_HOME:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
		
            IF P2_Zvaranie.STAV.ServoZdvihu_HomingOK THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 5;
            END_IF	
		
        5:
            SC_P2_Zvaranie.StepName:='5 - Inicializacia - presun zdvihu zvarania do vychodiskovej pozicie';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
		
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 0;
		
			
            P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= FALSE;
			
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 10;
            END_IF		
			
        10:
            SC_P2_Zvaranie.StepName:='10 - Inicializacia - presun pojazdu zvarania vpravo';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                PresunVPRAVO:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.IN.PojazdZvarania_PozVPRAVO_IS10 THEN
                P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= TRUE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 12;
            END_IF
				
			
        12:
            SC_P2_Zvaranie.StepName:='12 - Inicializacia - kontrola stavu zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#2s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            IF NOT P2_Zvaranie.IN.ZvarackaStav_READY THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 15;
            ELSE
                P2_Zvaranie.STAV.PoINIT:= TRUE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 100;
            END_IF	
			
        15:
            SC_P2_Zvaranie.StepName:='15 - Inicializacia - reset zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= TRUE;
                SC_P2_Zvaranie.IdleTime.IN:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
	
            IF SC_P2_Zvaranie.IdleTime.Q THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= FALSE;
            END_IF
			
            IF P2_Zvaranie.IN.ZvarackaStav_READY THEN
                P2_Zvaranie.STAV.PoINIT:= TRUE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 100;
            END_IF
			
			
            //********************************************************Automatický režim****************************************************************************//
				
        100:  
            SC_P2_Zvaranie.StepName:='100 - Automaticky Rezim - cakam na spustenie zvarania';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;			
	
            P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= TRUE;
			
            IF P2_Zvaranie.KoniecCyklu AND NOT P2_StoperZvarania.Automat THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 0;
            ELSIF P2_StoperZvarania.OUT.KOM_Zvaranie_START THEN
                P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 102;
            ELSIF  P2_StoperZvarania.OUT.KOM_Zatlacanie_START THEN
                P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 200;   
            END_IF	
					
		
        102:
            SC_P2_Zvaranie.StepName:='102 - Automaticky Rezim - napolohovanie zdvihu zvaracky nad bod zvarania';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 234;//240
			
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 105;
            END_IF	
			
		
        105:
            SC_P2_Zvaranie.StepName:='105 - Automaticky Rezim - spustenie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#500ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#2s;	
			
            SC_P2_Zvaranie.AlarmTime.IN:= NOT P2_Zvaranie.IN.ZvarackaStav_READY;
            
            IF NOT SC_P2_Zvaranie.Switch1 AND P2_Zvaranie.IN.ZvarackaStav_READY THEN
                P2_Zvaranie.OUT.Zvaracka_START:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
                        
            IF P2_Zvaranie.IN.ZvarackaStav_RUN THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 108;
            ELSIF SC_P2_Zvaranie.AlarmTime.Q THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 106;
            END_IF
	
        106:
            SC_P2_Zvaranie.StepName:='106 - Automaticky Rezim - resetovanie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#500ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
                    
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= TRUE;
                SC_P2_Zvaranie.IdleTime.IN:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
                        
            IF SC_P2_Zvaranie.IdleTime.Q THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 105;
            END_IF    
                        
                        
                        
			
        108:
            SC_P2_Zvaranie.StepName:='108 - Automaticky Rezim - zvaranie pravej casti';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;   
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanyMoment:= P2_RemPremenne.P2_Zvaranie_MomentZvarania;
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_ZVARANIE:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                Reports.Zvaranie.Moment.PravyZvar:= REAL_TO_STRING(P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualTorque);
                Reports.Zvaranie.Vyska.PravyZvar:= LREAL_TO_STRING(P2_Zvaranie.STAV.Zdvih_AktualnaPozicia);
                Reports.Zvaranie.Frekvencia:= '80';
                P2_Zvaranie.STAV.Vysledok_Zvarania:= 'OK';
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 110;
            END_IF	
			
//Zváranie//			
        110:
            SC_P2_Zvaranie.StepName:='110 - Automaticky Rezim - napolohovanie zdvihu zvaracky nad bod zvarania, vypnutie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 234;//240
			
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                P2_Zvaranie.OUT.Zvaracka_START:= FALSE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 112;
            END_IF	
			
		
        112:
            SC_P2_Zvaranie.StepName:='112 - Automaticky Rezim - presun pojazdu zvarania vlavo';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                PresunVLAVO:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.IN.PojazdZvarania_PozVLAVO_IS11 THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 115;
            END_IF
			
        115:
            SC_P2_Zvaranie.StepName:='115 - Automaticky Rezim - spustenie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#2s;	
			
            SC_P2_Zvaranie.AlarmTime.IN:= NOT P2_Zvaranie.IN.ZvarackaStav_READY;
            
            IF NOT SC_P2_Zvaranie.Switch1 AND P2_Zvaranie.IN.ZvarackaStav_READY THEN
                P2_Zvaranie.OUT.Zvaracka_START:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF P2_Zvaranie.IN.ZvarackaStav_RUN THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 118;
            ELSIF SC_P2_Zvaranie.AlarmTime.Q THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 116;    
            END_IF
	
                    
            
	        
        116:
            SC_P2_Zvaranie.StepName:='116 - Automaticky Rezim - resetovanie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#500ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
                    
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= TRUE;
                SC_P2_Zvaranie.IdleTime.IN:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
                        
            IF SC_P2_Zvaranie.IdleTime.Q THEN
                P2_Zvaranie.OUT.Zvaracka_RESET:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 115;
            END_IF    
            
            
            
	
        118:
            SC_P2_Zvaranie.StepName:='118 - Automaticky Rezim - zvaranie lavej casti';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_ZVARANIE:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                P2_Zvaranie.STAV.Vysledok_Zvarania:= 'OK';
                Reports.Zvaranie.Moment.LavyZvar:= REAL_TO_STRING(P2_Zvaranie.ServoZdvihuZvarania_M6.STATUS.ActualTorque);
                Reports.Zvaranie.Vyska.LavyZvar:= LREAL_TO_STRING(P2_Zvaranie.STAV.Zdvih_AktualnaPozicia);
                Reports.Zvaranie.Frekvencia:= '80';
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 120;
            END_IF	
			
        120:
            SC_P2_Zvaranie.StepName:='120 - Automaticky Rezim - napolohovanie zdvihu zvaracky do vychodiskovej polohy,presun vpravo a vypnutie zvaracky';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 0;
			
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                P2_Zvaranie.OUT.Zvaracka_START:= FALSE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF EDGEPOS(P2_Zvaranie.STAV.Zdvih_AktualnaPozicia < 200) THEN
                PresunVPRAVO:= TRUE;
            END_IF
					
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta AND P2_Zvaranie.IN.PojazdZvarania_PozVPRAVO_IS10 THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 122;
            END_IF	
			
        122:
            SC_P2_Zvaranie.StepName:='122 - Automaticky Rezim - vystavenie signalu ukoncenie zvarania';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                P2_Zvaranie.OUT.KOM_ZavaranieUkoncene:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_StoperZvarania.OUT.KOM_Zvaranie_START THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 100;
            END_IF	

            
//Zatláèanie Coveru//            
            
		
        200:
            SC_P2_Zvaranie.StepName:='200 - Automaticky Rezim - napolohovanie zdvihu zatlacania nad bod zatlacenia';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 200;
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                PresunVLAVO:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
					
            IF NOT SC_P2_Zvaranie.Switch2 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA AND P2_Zvaranie.IN.PojazdZvarania_PozVLAVO_IS11 THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_Zvaranie.Switch2:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 205;
            END_IF	
            
        205:
            SC_P2_Zvaranie.StepName:='205 - Automaticky Rezim - zatlacanie coveru';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
			
            			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_ZATLACANIE:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 208;
            END_IF	
			
        208:
            SC_P2_Zvaranie.StepName:='208 - Automaticky Rezim - napolohovanie zdvihu zatlacania do vychodiskovej polohy';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Zvaranie.PAR.ServoZdvihu_ZadanaPozicia:= 0;
			
			
            IF NOT SC_P2_Zvaranie.Switch1 AND SC_OvlZdvihu.Step = 1 AND Safety.STAV.P2_ZonaBunky_AKTIVNA THEN
                Zdvih_POLOHUJ:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF EDGEPOS(P2_Zvaranie.STAV.Zdvih_AktualnaPozicia < 200) THEN
                PresunVPRAVO:= TRUE;
            END_IF
					
				
            IF P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta AND P2_Zvaranie.IN.PojazdZvarania_PozVPRAVO_IS10 THEN
                P2_Zvaranie.STAV.ServoZdvihu_PoziciaDosiahnuta:= FALSE;
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 210;
            END_IF	
			
        210:
            SC_P2_Zvaranie.StepName:='210 - Automaticky Rezim - vystavenie signalu ukoncenie zatlacania';
            SC_P2_Zvaranie.IdleTime.PT:= T#200ms;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;	
			
            P2_Robot.KOM_OUT.Zvaranie_BezpecnaPozicia:= TRUE;
			
            IF NOT SC_P2_Zvaranie.Switch1 THEN
                P2_Zvaranie.OUT.KOM_ZatlacanieUkoncene:= TRUE;
                SC_P2_Zvaranie.Switch1:= TRUE;
            END_IF
			
            IF NOT P2_StoperZvarania.OUT.KOM_Zatlacanie_START THEN
                SC_P2_Zvaranie.ResetStep:= TRUE;
                SC_P2_Zvaranie.Step:= 100;
            END_IF	    
            
			
			
	
	
	
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_P2_Zvaranie.StepName:='700 - Manualny Rezim';
            SC_P2_Zvaranie.IdleTime.PT:= T#8s;
            SC_P2_Zvaranie.AlarmTime.PT:= T#5s;
		
				
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.JoggAcceleration:= (P2_Zvaranie.PAR.ServoZdvihu_JoggRychlost * 10);
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.JoggDeceleration:= (P2_Zvaranie.PAR.ServoZdvihu_JoggRychlost * 10);
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.JoggVelocity:= P2_Zvaranie.PAR.ServoZdvihu_JoggRychlost;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.JoggPoziciaLimitVPRED:= 250.0;
            P2_Zvaranie.ServoZdvihuZvarania_M6.PAR.JoggPoziciaLimitVZAD:= 0.0;
            P2_Zvaranie.ServoZdvihuZvarania_M6.CMD.JoggLimit_ACTIVE:= TRUE;
	
		
	
    END_CASE
	
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM


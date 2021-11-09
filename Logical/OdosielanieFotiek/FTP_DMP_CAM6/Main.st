     
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Volanie funkcie SequenceControl//
	SequenceControl(SC:= SC_Devlink);
	
    
	
    
    //Mapovanie premenných//
    FTP_DMP_CAM6.STATUS.CisloPoruchy:= CisloAlarmu;
    FTP_DMP_CAM6.STATUS.AdresarPrazdny:= AdresarPrazdny;
    
    //Èísla alarmov//
    //1 - porucha otvorenia komunikacie z adresarom PLC
    //2 - porucha otvorenia komunikacie z adresarom Panasonic
    //3 - porucha naèítania adresára kamery
    //4 - porucha zápisu najdených súborov
    //5 - porucha premenovania fotky
    //6 - porucha vytvorenia adresara na disku Panasonic
    //7 - porucha kopirovania fotky na server Panasonic
    //8 - porucha vymazania fotky v adresari kamery
    
    CASE SC_Devlink.Step OF
		
        0: 
            SC_Devlink.StepName:= '0 - Nulovanie';
            FTP_DMP_CAM6.STATUS.KomunikaciaError:= FALSE;
            FTP_DMP_CAM6.STATUS.KomunikaciaUkoncena:= FALSE;
            PocetHladaniFotky:= 0;
            AdresarPrazdny:= FALSE;
            PocetNajdenychSuborov:= 0;
            PocetNajdenychAdresarov:= 0;
            PocetPremenovanychSuborov:= 1;
            PocetSkopirovanychSuborov:= 1;
            PocetVymazanychSuborov:= 1;
            i:= 0;
            SC_Devlink.Step:= 1;
		
		
        1: 
            SC_Devlink.StepName:= '1 - Rozhodnutie o cinnosti';
            IF FTP_DMP_CAM6.CMD.OdosliFotku THEN
                CisloAlarmu:= 0;
                SC_Devlink.Step:= 10;
            ELSIF FTP_DMP_CAM6.CMD.VymazFotku THEN
                CisloAlarmu:= 0;
                SC_Devlink.Step:= 150;
            END_IF
		
            
        10:
            SC_Devlink.StepName:= '10 - Skopirovanie fotky do adresara DMP, otvorenie komunikacie z adresarom PLC';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
            
                       
            DevLink_0.enable:= TRUE;
            DevLink_0.pDevice:= ADR('CAM6');
            DevLink_0.pParam:= ADR('/SIP=192.168.122.3 /PROTOCOL=ftp /USER=cam6 /PASSWORD=.cam6'); 
            DevLink_0();
		
            IF DevLink_0.enable THEN
                IF DevLink_0.status = 0 THEN
                    ID_Adresara1:= DevLink_0.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 15;//15
                ELSIF DevLink_0.status = 20730 THEN	
                    ID_Adresara1:= DevLink_0.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 15;//15
                ELSIF DevLink_0.status = 65535 THEN		
                    //BUSY//
                ELSE
                    CisloAlarmu:= 1;
                    FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 13;
                END_IF
            END_IF	
		
		
        13: SC_Devlink.StepName:= '13 - Skopirovanie fotky do adresara DMP, odpojenie od adresara PLC';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
            DevUnlink_0.enable:= TRUE;
            DevUnlink_0.handle:= ID_Adresara1;
            DevUnlink_0();
			
            IF DevUnlink_0.enable THEN
                IF DevUnlink_0.status = 0 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                ELSIF DevUnlink_0.status = 20731 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                ELSIF DevUnlink_0.status = 65535 THEN		
                    //BUSY//
                ELSE
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                END_IF
            END_IF	
            
            
                       
            
        15:
            SC_Devlink.StepName:= '15 - Skopirovanie fotky do adresara DMP, otvorenie komunikacie z adresarom DMP';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
            
       
            DevLink_1.enable:= TRUE;
            DevLink_1.pDevice:= ADR('DMP_CAM6');
            DevLink_1.pParam:= ADR('/SIP=192.168.122.3 /PROTOCOL=ftp /USER=dmp_cam6 /PASSWORD=.dmp_cam6'); 
            DevLink_1();
		
            IF DevLink_1.enable THEN
                IF DevLink_1.status = 0 THEN
                    ID_Adresara2:= DevLink_0.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 20;
                ELSIF DevLink_1.status = 20730 THEN	
                    ID_Adresara2:= DevLink_1.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 20;
                ELSIF DevLink_1.status = 65535 THEN		
                    //BUSY//
                ELSE
                    CisloAlarmu:= 2;
                    FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 18;
                END_IF
            END_IF	
		
		
        18: SC_Devlink.StepName:= '18 - Skopirovanie fotky do adresara DMP, odpojenie od adresara DMP';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
            DevUnlink_1.enable:= TRUE;
            DevUnlink_1.handle:= ID_Adresara2;
            DevUnlink_1();
			
            IF DevUnlink_1.enable THEN
                IF DevUnlink_1.status = 0 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                ELSIF DevUnlink_1.status = 20731 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                ELSIF DevUnlink_1.status = 65535 THEN		
                    //BUSY//
                ELSE
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 100;
                END_IF
            END_IF	
        
       
            
         
            
        20:	SC_Devlink.StepName:= '20 - Skopirovanie fotky do adresara DMP, nacitanie adresara pred kopirovanim fotiek na server Panasonic';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
            DirInfo_0.enable:= TRUE;
            DirInfo_0.pDevice:= ADR('CAM6');
            DirInfo_0.pPath:= ADR('/');   //ak je nula tak èíta všetky súbory a adresáre v koreni ak je "/Temp" tak èíta všetky súbory a adresáre v adresári Temp//
            DirInfo_0();
			
            IF DirInfo_0.status = 0 THEN
                PocetNajdenychAdresarov:= DirInfo_0.dirnum;
                PocetNajdenychSuborov:= DirInfo_0.filenum;
                brsmemset(ADR(FileList[0]),0, SIZEOF(FileList));  //Vynulovanie pola stringov pre záznam adresárov a súborov
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 45;
            ELSIF DirInfo_0.status = 65535 THEN
                //BUSY//
            ELSIF DirInfo_0.status = 20723 THEN
                CisloAlarmu:= 3;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;	
            ELSE
                CisloAlarmu:= 3;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;
            END_IF
			
        45: SC_Devlink.StepName:= '45 - Skopirovanie fotky do adresara DMP, zapis nazvou najdenych suborov do pola stringov';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
			
            DirRead_0.enable:= TRUE;
            DirRead_0.pDevice:= ADR('CAM6');
            DirRead_0.pPath:= ADR('/');   //ak je nula tak èíta všetky súbory a adresáre v koreni ak je "/Temp" tak èíta všetky súbory a adresáre v adresári Temp//
            DirRead_0.option:= fiFILE; //Zapíše súbory aj adresáre, ak je fiDIRECTORY zapíše len adresáre, ak je fiFILE tak zapíše len súbory//
            DirRead_0.entry:= i; //index zapisovania do pola//
            DirRead_0.pData:= ADR(ReadData);
            DirRead_0.data_len:= SIZEOF(ReadData);
            DirRead_0();
			
            IF DirRead_0.status = 0 THEN
                brsstrcpy(ADR(FileList[i]), ADR(ReadData.Filename[0])); //Uloženie názvou adresárov a súborov do pola stringov
                IF i< 100 THEN
                    i:= i + 1;
                END_IF	
            ELSIF DirRead_0.status = 20702 THEN
                i:= 0;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 48;
            ELSIF DirRead_0.status = 65535 THEN
                //BUSY//
            ELSE
                CisloAlarmu:= 4;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;
            END_IF		
		
        
            
        48: SC_Devlink.StepName:= '48 - Skopirovanie fotky do adresara DMP, kopirovanie fotky do adresara DMP';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
            ZdrojKopirovaniaSuboru:= '';
            brsstrcat(ADR(ZdrojKopirovaniaSuboru),ADR('/'));
            brsstrcat(ADR(ZdrojKopirovaniaSuboru),ADR(FileList[i]));
			
			
            CielKopirovaniaSuboru:= '';
            brsstrcat(ADR(CielKopirovaniaSuboru),ADR('/'));
            brsstrcat(ADR(CielKopirovaniaSuboru),ADR(FileList[i]));
		
			
            FileCopy_0.enable:= TRUE;
            FileCopy_0.pSrcDev:= ADR('CAM6'); //Zdrojové zariadenie od kial sa kopíruje
            FileCopy_0.pSrc:= ADR(ZdrojKopirovaniaSuboru); 
            FileCopy_0.pDestDev:= ADR('DMP_CAM6'); //Cielové zariadenie kam sa má súbor skopírova
            FileCopy_0.pDest:= ADR(CielKopirovaniaSuboru);
            FileCopy_0();
			
            IF FileCopy_0.status = 0 THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 50;
            ELSIF FileCopy_0.status = 65535 THEN
                //BUSY//
            ELSIF FileCopy_0.status = 20705 THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 50;
            ELSIF FileCopy_0.status = 20708 THEN
                AdresarPrazdny:= TRUE;
                FTP_DMP_CAM6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;
            ELSE
                CisloAlarmu:= 7;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;
            END_IF
		
        50: SC_Devlink.StepName:= '50 - Skopirovanie fotky do adresara DMP, kontrola poctu skopirovanych suborov';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
			
            IF PocetSkopirovanychSuborov < PocetNajdenychSuborov THEN			
                PocetSkopirovanychSuborov:= PocetSkopirovanychSuborov + 1;
                IF i< 100 THEN
                    i:= i + 1;
                END_IF	
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 48;
            ELSE
                i:= 0;
                PocetNajdenychSuborov:= 0;
                PocetNajdenychAdresarov:= 0;
                FTP_DMP_CAM6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 100;
            END_IF	    
            
       		
              
        100:
            SC_Devlink.StepName:= '100 - Skopirovanie fotky do adresara DMP, cakam na zrusenie prikazu odosli fotku';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
            
            IF NOT FTP_DMP_CAM6.CMD.OdosliFotku THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 0; 
            END_IF
        
        
            //**************************************Vymazanie fotky*************************************************//   
        
        150:
            SC_Devlink.StepName:= '150 - Vymazanie fotky v adresari DMP, otvorenie komunikacie z adresarom DMP';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
            
                       
            DevLink_0.enable:= TRUE;
            DevLink_0.pDevice:= ADR('DMP_CAM6');
            DevLink_0.pParam:= ADR('/SIP=192.168.122.3 /PROTOCOL=ftp /USER=dmp_cam6 /PASSWORD=.dmp_cam6'); 
            DevLink_0();
		
            IF DevLink_0.enable THEN
                IF DevLink_0.status = 0 THEN
                    ID_Adresara1:= DevLink_0.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 153;
                ELSIF DevLink_0.status = 20730 THEN	
                    ID_Adresara1:= DevLink_0.handle;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 153;
                ELSIF DevLink_0.status = 65535 THEN		
                    //BUSY//
                ELSE
                    CisloAlarmu:= 1;
                    FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 151;
                END_IF
            END_IF	
		
		
        151: SC_Devlink.StepName:= '151 - Vymazanie fotky v adresari DMP, odpojenie od adresara DMP';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;	
			
            DevUnlink_0.enable:= TRUE;
            DevUnlink_0.handle:= ID_Adresara1;
            DevUnlink_0();
			
            IF DevUnlink_0.enable THEN
                IF DevUnlink_0.status = 0 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 200;
                ELSIF DevUnlink_0.status = 20731 THEN
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 200;
                ELSIF DevUnlink_0.status = 65535 THEN		
                    //BUSY//
                ELSE
                    SC_Devlink.ResetStep:= TRUE;
                    SC_Devlink.Step:= 200;
                END_IF
            END_IF	
        
        153:
            SC_Devlink.StepName:= '153 - Vymazanie fotky v adresari DMP, nacitanie adresara DMP pred vymazanim';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
    		
            DirInfo_0.enable:= TRUE;
            DirInfo_0.pDevice:= ADR('DMP_CAM6');
            DirInfo_0.pPath:= ADR('/');   //ak je nula tak èíta všetky súbory a adresáre v koreni ak je "/Temp" tak èíta všetky súbory a adresáre v adresári Temp//
            DirInfo_0();
    			
            IF DirInfo_0.status = 0 THEN
                PocetNajdenychAdresarov:= DirInfo_0.dirnum;
                PocetNajdenychSuborov:= DirInfo_0.filenum;
                brsmemset(ADR(FileList[0]),0, SIZEOF(FileList));  //Vynulovanie pola stringov pre záznam adresárov a súborov
                SC_Devlink.Step:= 155;
            ELSIF DirInfo_0.status = 65535 THEN
                //BUSY//
            ELSIF DirInfo_0.status = 20723 THEN
                CisloAlarmu:= 3;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 200;	
            ELSE
                CisloAlarmu:= 3;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 200;
            END_IF
    			
        155: SC_Devlink.StepName:= '155 - Vymazanie fotky v adresari DMP, zapis nazvou najdenych suborov do pola stringov';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
    			
            DirRead_0.enable:= TRUE;
            DirRead_0.pDevice:= ADR('DMP_CAM6');
            DirRead_0.pPath:= ADR('/');   //ak je nula tak èíta všetky súbory a adresáre v koreni ak je "/Temp" tak èíta všetky súbory a adresáre v adresári Temp//
            DirRead_0.option:= fiFILE; //Zapíše súbory aj adresáre, ak je fiDIRECTORY zapíše len adresáre, ak je fiFILE tak zapíše len súbory//
            DirRead_0.entry:= i; //index zapisovania do pola//
            DirRead_0.pData:= ADR(ReadData);
            DirRead_0.data_len:= SIZEOF(ReadData);
            DirRead_0();
    			
            IF DirRead_0.status = 0 THEN
                brsstrcpy(ADR(FileList[i]), ADR(ReadData.Filename[0])); //Uloženie názvou adresárov a súborov do pola stringov
				IF i< 100 THEN
					i:= i + 1;
				END_IF	
            ELSIF DirRead_0.status = 20702 THEN
                i:= 0;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 158;
            ELSIF DirRead_0.status = 65535 THEN
                //BUSY//
            ELSE
                CisloAlarmu:= 4;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 200;
            END_IF	
    		
        158: SC_Devlink.StepName:= '158 - Vymazanie fotky v adresari DMP, vymazanie suboru';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
    			
            ZdrojKopirovaniaSuboru:= '';
            brsstrcat(ADR(ZdrojKopirovaniaSuboru),ADR('/'));
            brsstrcat(ADR(ZdrojKopirovaniaSuboru),ADR(FileList[i]));
    			
    						
            FileDelete_0.enable:= TRUE;
            FileDelete_0.pDevice:= ADR('DMP_CAM6');
            FileDelete_0.pName:= ADR(ZdrojKopirovaniaSuboru);
            FileDelete_0();
    		
            IF FileDelete_0.status = 0 THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 160;
            ELSIF FileDelete_0.status = 65535 THEN
                //BUSY//
            ELSIF FileDelete_0.status = 20708 THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 160;
            ELSE
                CisloAlarmu:= 8;
                FTP_DMP_CAM6.STATUS.KomunikaciaError:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 200;
            END_IF	
    		
    			
        160:	SC_Devlink.StepName:= '160 - Vymazanie fotky v adresari DMP, kontrola poctu vymazanych suborov';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
    			
            IF PocetVymazanychSuborov < PocetNajdenychSuborov THEN			
                PocetVymazanychSuborov:= PocetVymazanychSuborov + 1;
                IF i< 100 THEN
                    i:= i + 1;
                END_IF	
				SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 158;
            ELSE
                i:= 0;
                PocetNajdenychSuborov:= 0;
                PocetNajdenychAdresarov:= 0;
                FTP_DMP_CAM6.STATUS.KomunikaciaUkoncena:= TRUE;
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 200;
            END_IF
    		
              
        200:
            SC_Devlink.StepName:= '200 - Vymazanie fotky v adresari DMP, cakam na zrusenie prikazu vymaz fotky';
            SC_Devlink.IdleTime.PT:= T#3s;
            SC_Devlink.AlarmTime.PT:= T#3s;
            
            IF NOT FTP_DMP_CAM6.CMD.VymazFotku THEN
                SC_Devlink.ResetStep:= TRUE;
                SC_Devlink.Step:= 0; 
            END_IF
        
        
        
        
        
        
      END_CASE     
            
            
     
	
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM



ACTION VytvorenieEtikety: 

	//*********************************************Vy��tanie parametrov etikety zo servera*******************************************************//
	SerioveCisloEtikety;
	IF P4_Etiketovacka.RR_TestovanieEtiketovania THEN
		SerioveCisloEtikety:= 'T598454420120P32120001323091112';
	END_IF
	
	brsstrcpy(ADR(VstupnePoleUSINT),ADR(SerioveCisloEtikety)); //Skopirovanie vstupnej spravy do pola
    
    
    //***************************Vy��tanie Location Code*******************************************//
    brsmemcpy(ADR(Etiketa.LocationCode),ADR(VstupnePoleUSINT[1]),2);
    
    
    //**************************Vy��tanie Part Ident Number****************************************//
    brsmemcpy(ADR(Etiketa.PartIdentNumber),ADR(VstupnePoleUSINT[3]),7);
    
    //**************************Vy��tanie Change Index*********************************************//
    brsmemcpy(ADR(Etiketa.ChangeIndex),ADR(VstupnePoleUSINT[10]),2);
   	
    //**************************Vy��tanie Production Year*********************************************//
    brsmemcpy(ADR(Etiketa.ProductionYear),ADR(VstupnePoleUSINT[12]),2);
    
    
    //**************************Vy��tanie Manufactured*********************************************//
    brsmemcpy(ADR(Etiketa.Manufactured),ADR(VstupnePoleUSINT[14]),1);
    
    //**************************Vy��tanie Day of production*********************************************//
    brsmemcpy(ADR(Etiketa.DayOfProduction),ADR(VstupnePoleUSINT[15]),3);
    
    
    //**************************Vy��tanie Assembly line*********************************************//
    brsmemcpy(ADR(Etiketa.AssemblyLine),ADR(VstupnePoleUSINT[18]),1);
    
    
    //**************************Vy��tanie Day production counter*********************************************//
    brsmemcpy(ADR(Etiketa.DayProductionCounter),ADR(VstupnePoleUSINT[19]),5);
    
    //**************************Vy��tanie Supplier number*********************************************//
    brsmemcpy(ADR(Etiketa.SuplierNumber),ADR(VstupnePoleUSINT[24]),6);
    
    //**************************Vy��tanie Supplier plant code*********************************************//
    brsmemcpy(ADR(Etiketa.PlantCode),ADR(VstupnePoleUSINT[30]),2);
    
  
    
    
    //*****************************************************Namapovanie parametrov etikety************************************************//
    
    //Identification number//
    EtiketaPanasonic.IdentificationNumber:= Etiketa.PartIdentNumber;
	
    //Change Index//
    EtiketaPanasonic.ChangeIndex:= '';
    strcat(ADR(EtiketaPanasonic.ChangeIndex),ADR('-'));
    strcat(ADR(EtiketaPanasonic.ChangeIndex),ADR(Etiketa.ChangeIndex));
        
    //Model type//
    EtiketaPanasonic.ModelType:= 'POWER-CP';
	
    //Supplier number//
	EtiketaPanasonic.SupplierNumber:= Etiketa.SuplierNumber;
	
    //Plant Code//
    EtiketaPanasonic.PlantCode:= Etiketa.PlantCode;
    
	//Country//
	EtiketaPanasonic.Country:= 'SK';
	
	
	//D�tum//
	EtiketaPanasonic.Date:= Den_STR;
	strcat(ADR(EtiketaPanasonic.Date),ADR('.'));
	strcat(ADR(EtiketaPanasonic.Date),ADR(Mesiac_STR));
	strcat(ADR(EtiketaPanasonic.Date),ADR('.'));
	strcat(ADR(EtiketaPanasonic.Date),ADR(Rok_STR_2_Znaky));
		
	//Counter//
	EtiketaPanasonic.Counter:= Etiketa.DayProductionCounter;
	
	
	//Data metrix kod//
	EtiketaPanasonic.DataMetrix:= SerioveCisloEtikety;
	
	
	//***************************************Spr�va pre tla�iare� Compa II*************************************************//
	Tlaciaren.Data.Sprava_pre_Tlaciaren:= '^XA';//Za�iatok spr�vy
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO210,150^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.IdentificationNumber));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO210,274^A8R,40,25^FD'));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.ChangeIndex));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO172,188^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.ModelType));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO134,168^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.SupplierNumber));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO134,290^A8R,40,25^FD'));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.PlantCode));
    strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO96,290^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.Country));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO58,185^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.Date));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO20,236^A8R,40,25^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.Counter));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FO30,40^BXR,5,200^FD'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR(EtiketaPanasonic.DataMetrix));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^FS'));
	strcat(ADR(Tlaciaren.Data.Sprava_pre_Tlaciaren),ADR('^XZ'));//Koniec spr�vy
	
	

	
	
	
	
END_ACTION

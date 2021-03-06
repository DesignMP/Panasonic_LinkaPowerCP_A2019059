//******************************************************************************************************
//	Cylic task for recipe management
//																		
//	Error numbers:
//	50100  Recipe name parameter is empty
//	50101  Recipe name already exists
//	50102  Recipe name was not found
//  50103  One or more recipe names exceeds maximum length
//	50110  Device name parameter is empty
//	50120  Variable name parameter is empty
//  50130  Recipe management is not initialized
//  50200  Maximum number of recipes reached
//  50300  Task name is incorrect
//  50310  Global recipe structure is incorrect
//******************************************************************************************************

//******************************************************************************************************
// Cyclic task																	
//******************************************************************************************************

PROGRAM _INIT
		// ----------------------------------------------------------------------------------------
	// The following settings can be adjusted
	Recipe_01.PAR.RecipeVariable 	:= 'RecipeData';		// Top variable structure with recipe data
	Recipe_01.PAR.DeviceName 	:= 'HDD_Receptury';		// Device name from the CPU configuration for X20CPU
	
	// ----------------------------------------------------------------------------------------
	this							:= 'Recipe_01';			// Name of the global variable structure and this task name
	Recipe_01.PAR.RecipeDirectory 	:= 'Receptury';		        	// Directory where the recipes are stored 
	IF(REC_RECIPE_TYPE = typeCSV) THEN
		Recipe_01.PAR.MpLink 		:= gRecipeCsv; 		// MpLink from mappRecipe configuration in physical view
	ELSE
		Recipe_01.PAR.MpLink 		:= gRecipeXml; 		// MpLink from mappRecipe configuration in physical view
	END_IF
	
	// ---------------------------------------------------------------------------------------- 
	// Dont change anything below this line
	// ---------------------------------------------------------------------------------------- 

	// ---------------------------------------------------------------------------------------- 
	// Make sure global variable structure and task name are correct
	taskStatus := ST_ident(ADR(this), taskGroup, ADR(taskID));
	pvStatus := PV_xgetadr(ADR(this), ADR(pvADR), ADR(pvLEN));
	// Connect global and local structure
	IF(pvStatus = 0) THEN
		RECIPE ACCESS pvADR;
		brsmemset(ADR(RECIPE.ERR), 0 , SIZEOF(RECIPE.ERR));
		RECIPE.PAR.Initialized := FALSE;
	END_IF
	RecipeData;
	 
	
		
	
END_PROGRAM




PROGRAM _CYCLIC
	// --------------------------------------------------------------------------------------------------------------------
	// Make sure task name and global structure correct
	IF(pvStatus <> 0) THEN
		RETURN;
	END_IF
	IF(taskStatus <> 0) THEN
		rec_state := CreateError(ADR(RECIPE), ERR_REC_TASK_NAME, "Meno tasku nieje spravne", rec_state);
		RETURN;
	END_IF
	
	// --------------------------------------------------------------------------------------------------------------------
	// Make sure we dont exceed maximum number of web clients
	IF(RECIPE.PAR.VisuSlotID > REC_MAX_CLIENTS_ID) THEN
		rec_state := CreateError(ADR(RECIPE), ERR_REC_TOO_MANY_CLIENTS, "More than 3 clients try to connect to recipe managment", rec_state);
		RETURN;
	END_IF
	
	// --------------------------------------------------------------------------------------------------------------------
	// Cyclic function calls
	MpRecipeCsv_0();
	MpRecipeXml_0();
	
	//**************************************************************************************************
	// Recipe managment state machine																						
	//**************************************************************************************************	
	CASE rec_state OF
		//**********************************************************************************************
		// Wait for command																				
		//**********************************************************************************************
		REC_WAIT:
			// --------------------------------------------------------------------------------------------------------------------
			// Track filter change and data refresh																				
			IF ((brwcscmp(ADR(RecipeFilterOld[VisuSlotID]), ADR(RECIPE.VIS[VisuSlotID].RecipeFilter)) <> 0) OR (RecipeNumOld[VisuSlotID] <> RECIPE.DAT.RecipeNum)) THEN
				brsmemset(ADR(RECIPE.VIS[VisuSlotID].RecipeNames), 0, SIZEOF(RECIPE.VIS[VisuSlotID].RecipeNames));
				idy := 0;
				IF(RECIPE.DAT.RecipeNum > 0) THEN
					FOR idx:=0 TO RECIPE.DAT.RecipeNum - 1 DO
						// -------------------------------------------------------------------------------- 		
						// Verify that file name contains filter											
						IF (brwcslen(ADR(RECIPE.VIS[VisuSlotID].RecipeFilter)) = 0 OR IsInstrW(ADR(RECIPE.DAT.RecipeNames[idx]), ADR(RECIPE.VIS[VisuSlotID].RecipeFilter))) THEN	
							WString2DataProvider(ADR(RECIPE.DAT.RecipeNames[idx]), ADR(tmpWStr1));
							RECIPE.VIS[VisuSlotID].RecipeNames[idy] := tmpWStr1;
							idy := idy + 1;
						END_IF
					END_FOR;
					brwcscpy(ADR(RecipeFilterOld[VisuSlotID]), ADR(RECIPE.VIS[VisuSlotID].RecipeFilter));
				END_IF
				RecipeNumOld[VisuSlotID] := RECIPE.DAT.RecipeNum;
				RECIPE.VIS[VisuSlotID].RecipeNum := idy;
			END_IF
			// Cylce through the client web seesions
			VisuSlotID := VisuSlotID + 1;
			IF(VisuSlotID > REC_MAX_CLIENTS_ID) THEN
				VisuSlotID := 0;
			END_IF
			
			// --------------------------------------------------------------------------------------------------------------------
			// Disable buttons in visualization when number of recipes is 0
			IF(RECIPE.DAT.RecipeNum = 0) THEN
				RECIPE.PAR.VisuEnableCommand := FALSE;
			ELSE
				RECIPE.PAR.VisuEnableCommand := TRUE;
			END_IF
							
			// ---------------------------------------------------------------------------------------- 
			// Reset error reset
			MpRecipeCsv_0.ErrorReset := FALSE;
			MpRecipeXml_0.ErrorReset := FALSE;
			MpRecipeRegPar_0.ErrorReset := FALSE;

			// ---------------------------------------------------------------------------------------- 
			// Command refresh																			
			IF (RECIPE.CMD.Init = TRUE) THEN
				// Reset data structure and trigger name refresh for vis
				brsmemset(ADR(RECIPE.DAT), 0, SIZEOF(RECIPE.DAT));
				brsmemset(ADR(RecipeIDs), 0, SIZEOF(RecipeIDs));
				brsmemset(ADR(RecipeNumOld), 16#FF, SIZEOF(RecipeNumOld));
				// Skip variable binding if already initialized
				IF(MpRecipeRegPar_1.PVName <> 0) THEN 
					rec_state := REC_READ_DIR;
				ELSE
					// Register recipe name varibale first if unicode is used
					IF(REC_USE_UNICODE) THEN
						rec_state := REC_REG_NAME;
					ELSE
						rec_state := REC_REG_VAR;
					END_IF
				END_IF
				MpRecipeRegPar_1.Enable := FALSE;
				// ---------------------------------------------------------------------------------------- 
				// Command new recipe
			ELSIF (RECIPE.CMD.New = TRUE AND RECIPE.PAR.RecipeName <> "") THEN
				// Show current state																		
				animation := WorkingStatus(ADR(RECIPE), ADR("Vytvaram recepturu..."), animation);
				// Verify that we still have space in list												
				IF (RECIPE.DAT.RecipeNum > REC_MAX_NUM) THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_MAX_NUM, "Maximalny pocet receptur dosiahnuty", rec_state);
					RETURN;
				END_IF
				// Make sure recipe does not already exist
				IF(FindRecName(ADR(RECIPE), RECIPE.PAR.RecipeName) <> REC_DOES_NOT_EXIST) THEN
					tmpWStr1 := "Nazov raceptury ";
					brwcscat(ADR(tmpWStr1), ADR(RECIPE.PAR.RecipeName));
					brwcscat(ADR(tmpWStr1), ADR(" uz existuje"));
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_EXISTS, tmpWStr1, rec_state);
					RETURN;
				END_IF
				// Turn on variable saving, reset selected recipe, copy recipe name to local variable
				MpRecipeRegPar_1.Enable := TRUE;;				
				RECIPE.VIS[RECIPE.PAR.VisuSlotID].RecipeSelect := "";
				rec_state := REC_GEN_FILE_NAME;
				// ---------------------------------------------------------------------------------------- 
				// Command load recipe
			ELSIF (RECIPE.CMD.Load = TRUE AND RECIPE.PAR.RecipeName <> "") THEN
				// Show current state																		
				animation := WorkingStatus(ADR(RECIPE), ADR("Nahravam recepturu..."), animation);
				// Turn on variable saving, copy recipe name to local variable
				MpRecipeRegPar_1.Enable := TRUE;;				
				rec_state := REC_GEN_FILE_NAME;
				// ---------------------------------------------------------------------------------------- 
				// Command load recipe
			ELSIF (RECIPE.CMD.Save = TRUE AND (RECIPE.PAR.RecipeName <> "" OR RECIPE.PAR.RecipeNameNew <> "")) THEN
				// Show current state																		
				animation := WorkingStatus(ADR(RECIPE), ADR("Ukladam recepturu..."), animation);
				IF(RECIPE.PAR.RecipeName = "") THEN
					RECIPE.PAR.RecipeName := RECIPE.PAR.RecipeNameNew;
				END_IF
				// Turn on variable saving, copy recipe name to local variable
				MpRecipeRegPar_1.Enable := TRUE;;
				rec_state := REC_GEN_FILE_NAME;
				// ---------------------------------------------------------------------------------------- 
				// Command delete recipe
			ELSIF (RECIPE.CMD.Delete = TRUE AND RECIPE.PAR.RecipeName <> "") THEN
				// Show current state, copy recipe name to local variable																		
				animation := WorkingStatus(ADR(RECIPE), ADR("Mazem recepturu..."), animation);
				rec_state := REC_GEN_FILE_NAME;
				// ---------------------------------------------------------------------------------------- 
				// Rename recipe
			ELSIF (RECIPE.CMD.Rename = TRUE AND RECIPE.PAR.RecipeName <> "" AND RECIPE.PAR.RecipeNameNew <> "") THEN
				// Show current state																		
				animation := WorkingStatus(ADR(RECIPE), ADR("Premenovavam recepturu..."), animation);
				// Make sure new recipe name does not already exist
				IF(FindRecName(ADR(RECIPE), RECIPE.PAR.RecipeNameNew) <> REC_DOES_NOT_EXIST) THEN
					tmpWStr1 := "Nove meno receptury ";
					brwcscat(ADR(tmpWStr1), ADR(RECIPE.PAR.RecipeNameNew));
					brwcscat(ADR(tmpWStr1), ADR(" uz existuje"));
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_EXISTS, tmpWStr1, rec_state);
					RETURN;
				END_IF
				// Turn on variable saving, reset selected recipe, copy recipe name to local variable
				MpRecipeRegPar_1.Enable := TRUE;
				brsmemset(ADR(RecipeNumOld), 16#FF, SIZEOF(RecipeNumOld));
				RECIPE.VIS[RECIPE.PAR.VisuSlotID].RecipeSelect := "";
				RecipeNameNew := RECIPE.PAR.RecipeNameNew;
				rec_state := REC_GEN_FILE_NAME;
			END_IF
			RecipeName := RECIPE.PAR.RecipeName;

			// ---------------------------------------------------------------------------------------- 
			// Check parameters																					
			IF (RECIPE.CMD.Init OR RECIPE.CMD.New OR RECIPE.CMD.Load OR RECIPE.CMD.Save OR RECIPE.CMD.Rename OR RECIPE.CMD.Delete) THEN
				// Make sure recipe mangament was intialized
				IF (NOT RECIPE.CMD.Init AND NOT RECIPE.PAR.Initialized) THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NOT_INITIALIZED, "Receptury nie su zinicializovane", rec_state);
				END_IF
				// Make sure recipe name is valid
				IF((RECIPE.CMD.New OR RECIPE.CMD.Load OR RECIPE.CMD.Save OR RECIPE.CMD.Rename OR RECIPE.CMD.Delete) AND RecipeName = "") THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_EMPTY, "Meno receptury je prazdne", rec_state);
				END_IF
				// Make sure new recipe name is valid
				IF((RECIPE.CMD.Rename) AND RecipeNameNew = "") THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_EMPTY, "Nova receptura je prazdna", rec_state);
				END_IF
				// Make sure device name is valid
				IF(RECIPE.PAR.DeviceName = '') THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_DEV_NAME_EMPTY, "Meno zariadenia je prazdne", rec_state);
				END_IF
				// Make sure variable name is valid
				IF(RECIPE.PAR.RecipeVariable = '') THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_VAR_NAME_EMPTY, "Meno premennej je prazdne", rec_state);
				END_IF

				RECIPE.PAR.VisuEnableCommand := FALSE;
			END_IF	
			//**********************************************************************************************
			// Register recipe name																
			//**********************************************************************************************
		REC_REG_NAME:
			// Generate string for local recipe name
			tmpStr1 := this;
			brsstrcat(ADR(tmpStr1), ADR(':RecipeName'));
			
			MpRecipeRegPar_0.Enable := TRUE;
			MpRecipeRegPar_0.MpLink := ADR(RECIPE.PAR.MpLink);
			MpRecipeRegPar_0.PVName := ADR(tmpStr1);
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (NOT MpRecipeRegPar_0.Active AND NOT MpRecipeRegPar_0.Error) THEN
				rec_state := REC_REG_VAR;
				// Error
			ELSIF (MpRecipeRegPar_0.Error) THEN
				rec_state := CreateError(ADR(RECIPE), MpRecipeRegPar_0.StatusID, "Error trying to register recipe name", rec_state);
			END_IF
			//**********************************************************************************************
			// Register variable structure																
			//**********************************************************************************************
		REC_REG_VAR:
			MpRecipeRegPar_1.MpLink := ADR(RECIPE.PAR.MpLink);
			MpRecipeRegPar_1.PVName := ADR(RECIPE.PAR.RecipeVariable);	
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (NOT MpRecipeRegPar_1.Active AND NOT MpRecipeRegPar_1.Error) THEN
				rec_state := REC_CREATE_DIR;
				// Error
			ELSIF (MpRecipeRegPar_1.Error) THEN
				tmpWStr1 := "Error trying to register variable name ";
				brwcsconv(ADR(tmpWStr2), ADR(RECIPE.PAR.RecipeVariable), brwU8toUC);
				brwcscat(ADR(tmpWStr1), ADR(tmpWStr2));
				rec_state := CreateError(ADR(RECIPE), MpRecipeRegPar_1.StatusID, tmpWStr1, rec_state);
			END_IF	
			//**********************************************************************************************
			// Create recipe directory																
			//**********************************************************************************************
		REC_CREATE_DIR:
			DCreate.enable 	:= 1;
			DCreate.pDevice	:= ADR(RECIPE.PAR.DeviceName);
			DCreate.pName := ADR(RECIPE.PAR.RecipeDirectory);
			DCreate();
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (DCreate.status = OK OR DCreate.status = fiERR_DIR_ALREADY_EXIST) THEN
				// Reset command and return to wait state												
				rec_state := REC_READ_DIR;
				// Error 		
			ELSIF (DCreate.status <> ERR_FUB_BUSY) THEN
				rec_state := CreateError(ADR(RECIPE), DCreate.status, "Porucha vytvorenia adresara", rec_state);
			END_IF			
			//**********************************************************************************************
			// Read directory information																	
			//**********************************************************************************************
		REC_READ_DIR:
			// Show current state																		
			animation := WorkingStatus(ADR(RECIPE), ADR("Nacitavam recepturu..."), animation);
			// ---------------------------------------------------------------------------------------- 
			// Clear all entrys																			
			brsmemset(ADR(RECIPE.DAT), 0, SIZEOF(RECIPE.DAT));
			RECIPE.DAT.RecipeNum := 0;
			// ---------------------------------------------------------------------------------------- 		
			// Set values and get device dir															
			DInfo.enable 	:= 1;
			DInfo.pDevice	:= ADR(RECIPE.PAR.DeviceName);
			DInfo();
						
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (DInfo.status = OK) THEN
				rec_state := REC_READ_DIR_1;
			ELSIF (DInfo.status = fiERR_DEVICE_MANAGER) THEN
				tmpWStr1 := "Suborovy system ";
				brwcsconv(ADR(tmpWStr2), ADR(RECIPE.PAR.DeviceName), brwU8toUC);
				brwcscat(ADR(tmpWStr1), ADR(tmpWStr2));
				brwcscat(ADR(tmpWStr1), ADR(" je nedostupny"));
				rec_state := CreateError(ADR(RECIPE), DInfo.status, tmpWStr1, rec_state);
			ELSIF (DInfo.status = fiERR_DIR_NOT_EXIST) THEN
				tmpWStr1 := "Subor ";
				brwcsconv(ADR(tmpWStr2), ADR(RECIPE.PAR.RecipeDirectory), brwU8toUC);
				brwcscat(ADR(tmpWStr1), ADR(tmpWStr2));
				brwcscat(ADR(tmpWStr1), ADR(" je nedostupny"));
				rec_state := CreateError(ADR(RECIPE), DInfo.status, tmpWStr1, rec_state);
				// Error																	
			ELSIF (DInfo.status <> ERR_FUB_BUSY) THEN
				rec_state := CreateError(ADR(RECIPE), DInfo.status, "Error dir info", rec_state);
			END_IF
			//**********************************************************************************************
			// Open directory 																				
			//**********************************************************************************************
		REC_READ_DIR_1:														
			DOpen.enable 	:= 1;
			DOpen.pDevice	:= ADR(RECIPE.PAR.DeviceName);
			DOpen.pName 	:= ADR(RECIPE.PAR.RecipeDirectory);
			DOpen();
						
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (DOpen.status = OK) THEN
				rec_state := REC_READ_DIR_2;
			ELSIF (DInfo.status = fiERR_DIR_NOT_EXIST) THEN
				tmpWStr1 := "Adresar ";
				brwcsconv(ADR(tmpWStr2), ADR(RECIPE.PAR.RecipeDirectory), brwU8toUC);
				brwcscat(ADR(tmpWStr1), ADR(tmpWStr2));
				brwcscat(ADR(tmpWStr1), ADR(" je nedostupny"));
				rec_state := CreateError(ADR(RECIPE), DInfo.status, tmpWStr1, rec_state);				
				// Error
			ELSIF (DOpen.status <> ERR_FUB_BUSY) THEN
				rec_state := CreateError(ADR(RECIPE), DOpen.status, "Porucha otvorenie adresara", rec_state);
			END_IF;
			//**********************************************************************************************
			// Read file directory information																
			//**********************************************************************************************
		REC_READ_DIR_2:													
			DRead.enable 	:= 1;
			DRead.ident		:= DOpen.ident;
			DRead.pData 	:= ADR(lDirReadData);
			DRead.data_len 	:= SIZEOF(lDirReadData);
			DRead();
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (DRead.status = OK AND lDirReadData.Mode = fiFILE) THEN
				animation := WorkingStatus(ADR(RECIPE), ADR("Inicializacia receptur..."), animation);
				// Make sure file name does not exceed maximum string size
				IF (brsstrlen(ADR(lDirReadData.Filename)) < REC_NAME_LENGTH) THEN
					// Copy dir info to string
					brsmemset(ADR(RECIPE.PAR.RecipeID), 0, SIZEOF(RECIPE.PAR.RecipeID));
					brsstrcpy(ADR(RECIPE.PAR.RecipeID), ADR(lDirReadData.Filename));
					// Make sure file extension is CSV or XML
					IF(brsstrlen(ADR(RECIPE.PAR.RecipeID)) > 4 AND ((REC_RECIPE_TYPE = typeCSV AND brsmemcmp(ADR(RECIPE.PAR.RecipeID) + (brsstrlen(ADR(RECIPE.PAR.RecipeID)) - 4), ADR('.csv'), 4) = 0) OR (REC_RECIPE_TYPE = typeXML AND brsmemcmp(ADR(RECIPE.PAR.RecipeID) + (brsstrlen(ADR(RECIPE.PAR.RecipeID)) - 4), ADR('.xml'), 4) = 0))) THEN
						brsmemset(ADR(RECIPE.PAR.RecipeID) + (brsstrlen(ADR(RECIPE.PAR.RecipeID)) - 4), 0, 4);
						// ------------------------------------------------------------------------------------ 		
						// Verify that we still have space in list												
						IF (RECIPE.DAT.RecipeNum <= REC_MAX_NUM) THEN
							// -------------------------------------------------------------------- 		
							// Read recipe name from recipe data in next step when using unicode
							IF(REC_USE_UNICODE) THEN
								RecipeIDs[brsatoi(ADR(RECIPE.PAR.RecipeID))] := TRUE;
								rec_state := REC_GEN_FILE_NAME;
								// Generate recipe name from file name
							ELSE
								brwcsconv(ADR(RecipeName), ADR(RECIPE.PAR.RecipeID), brwU8toUC);
								// Generate ASCII data, insert recipe into list
								InsertRecName(ADR(RECIPE), RecipeName, RECIPE.PAR.RecipeID);
							END_IF
							// Error
						ELSE
							rec_state := CreateError(ADR(RECIPE), ERR_REC_MAX_NUM, "Maximalny pocet receptur dosiahnuty", rec_state);
						END_IF
					END_IF
				ELSE
					has_oversized_items := TRUE;
				END_IF
				// Last entry reached
			ELSIF (DRead.status = fiERR_NO_MORE_ENTRIES) THEN 
				rec_state := REC_READ_DIR_3;
				// Error		
			ELSIF (DRead.status <> ERR_FUB_BUSY AND DRead.status <> OK) THEN
				rec_state := CreateError(ADR(RECIPE), DRead.status, "Porucha citania zoznamu receptur", rec_state);
			END_IF
			//**********************************************************************************************
			// Close directory information																	
			//**********************************************************************************************
		REC_READ_DIR_3:														
			DClose.enable 	:= 1;
			DClose.ident	:= DOpen.ident;
			DClose();
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (DClose.status = OK) THEN
				// Reset command and return to wait state												
				RECIPE.DAT.Status := "Inicializacia receptur ukoncena";
				RECIPE.CMD.Init	:= 0;
				RECIPE.PAR.RecipeID := '';
				RECIPE.PAR.Initialized := TRUE;
				DClose.ident	:= 0;
				IF(has_oversized_items) THEN
					rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_LENGTH, "Meno receptury presiahlo maximalny pocet znakov", rec_state);
				ELSE
					rec_state := REC_WAIT;
				END_IF
				// Error 		
			ELSIF (DClose.status <> ERR_FUB_BUSY) THEN
				rec_state := CreateError(ADR(RECIPE), DClose.status, "Porucha zatvorenia adresara", rec_state);
			END_IF
			//**********************************************************************************************
			// Generate recipe name	full path and file name																
			//**********************************************************************************************
		REC_GEN_FILE_NAME:
			// Find recipe entry
			RecipeIndex := FindRecName(ADR(RECIPE), RecipeName);
			
			// Generate file name when using unicode strings
			IF(REC_USE_UNICODE) THEN
				// Ignore during init process
				IF(NOT RECIPE.CMD.Init) THEN
					// Find empty slot for new recipe
					IF(RECIPE.CMD.New) THEN
						RecipeIndex := 0;
						WHILE (RecipeIDs[RecipeIndex] = TRUE AND RecipeIndex <= REC_MAX_NUM) DO
							RecipeIndex := RecipeIndex + 1;
						END_WHILE;
						// Make sure we found empty slot
						IF(RecipeIndex <= REC_MAX_NUM AND RecipeIDs[RecipeIndex] = FALSE) THEN
							brsitoa(RecipeIndex, ADR(RECIPE.PAR.RecipeID));
						ELSE
							rec_state := CreateError(ADR(RECIPE), ERR_REC_MAX_NUM, "Prazdny slot nenajdeny", rec_state);
							RETURN;
						END_IF
						// Find recipe name in list	for all other command				
					ELSE
						// Recipe name was found
						IF(RecipeIndex <> REC_DOES_NOT_EXIST) THEN
							RECIPE.PAR.RecipeID := RECIPE.DAT.RecipeIDs[RecipeIndex];
							// Recipe name was lost
						ELSE
							tmpWStr1 := "Meno receptury nebolo najdene ";
							brwcscat(ADR(tmpWStr1), ADR(RecipeName));
							rec_state := CreateError(ADR(RECIPE), ERR_REC_NAME_LOST, tmpWStr1, rec_state);
							RETURN;
						END_IF
					END_IF
				END_IF
				// Use recipe name as file name when using standard strings
			ELSE
				brwcsconv(ADR(RECIPE.PAR.RecipeID), ADR(RecipeName), brwUCtoU8);
			END_IF
			
			// Generate recipe path and extension
			RecipeFullFileName := RECIPE.PAR.RecipeDirectory;
			brsstrcat(ADR(RecipeFullFileName), ADR('/'));
			brsstrcat(ADR(RecipeFullFileName), ADR(RECIPE.PAR.RecipeID));

			// Add file extension
			IF(REC_RECIPE_TYPE = typeCSV) THEN
				brsstrcat(ADR(RecipeFullFileName), ADR('.csv'));
			ELSE
				brsstrcat(ADR(RecipeFullFileName), ADR('.xml'));
			END_IF
			
			// Save recipe under new name
			IF(RECIPE.CMD.Rename) THEN
				RecipeName := RecipeNameNew;	
			END_IF
			
			// Proceed with next step
			IF(RECIPE.CMD.Delete) THEN
				rec_state := REC_DELETE;
			ELSIF(RECIPE.CMD.Rename AND NOT REC_USE_UNICODE) THEN
				rec_state := REC_RENAME;
			ELSE
				rec_state := REC_LOAD_SAVE;
			END_IF
			//**********************************************************************************************
			// Load or save recipe data																	
			//**********************************************************************************************
		REC_LOAD_SAVE:
			
			IF(REC_RECIPE_TYPE = typeCSV) THEN
				MpRecipeCsv_0.Enable := TRUE;
				MpRecipeCsv_0.MpLink := ADR(RECIPE.PAR.MpLink);
				MpRecipeCsv_0.DeviceName := ADR(RECIPE.PAR.DeviceName);
				MpRecipeCsv_0.FileName := ADR(RecipeFullFileName);
				MpRecipeCsv_0.Save := RECIPE.CMD.Save OR RECIPE.CMD.New OR RECIPE.CMD.Rename;
				MpRecipeCsv_0.Load := RECIPE.CMD.Load OR RECIPE.CMD.Init;

				MpRecipeDone := MpRecipeCsv_0.CommandDone;
				MpRecipeError := MpRecipeCsv_0.Error;
				MpRecipeStatusID := MpRecipeCsv_0.StatusID;
			ELSE
				MpRecipeXml_0.Enable := TRUE;
				MpRecipeXml_0.MpLink := ADR(RECIPE.PAR.MpLink);
				MpRecipeXml_0.DeviceName := ADR(RECIPE.PAR.DeviceName);
				MpRecipeXml_0.FileName := ADR(RecipeFullFileName);
				MpRecipeXml_0.Save := RECIPE.CMD.Save OR RECIPE.CMD.New OR RECIPE.CMD.Rename;
				MpRecipeXml_0.Load := RECIPE.CMD.Load OR RECIPE.CMD.Init;

				MpRecipeDone := MpRecipeXml_0.CommandDone;
				MpRecipeError := MpRecipeXml_0.Error;
				MpRecipeStatusID := MpRecipeXml_0.StatusID;
			END_IF
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (MpRecipeDone AND NOT MpRecipeError AND MpRecipeStatusID = 0) THEN
				// Reset command and return to wait state
				MpRecipeCsv_0.Load := FALSE;
				MpRecipeCsv_0.Save := FALSE;
				MpRecipeXml_0.Load := FALSE;
				MpRecipeXml_0.Save := FALSE;
				
				// Continue renaming recipe 
				IF(RECIPE.CMD.Rename) THEN
					IF(REC_USE_UNICODE) THEN
						// Remove name from recipe list	and add it again										
						RemoveRecName(ADR(RECIPE), RecipeIndex);
						InsertRecName(ADR(RECIPE), RecipeName, RECIPE.PAR.RecipeID);

						RECIPE.VIS[RECIPE.PAR.VisuSlotID].RecipeSelect := RecipeName;
						tmpWStr1 := "Receptura bola premenovana";
						RECIPE.CMD.Rename := 0;
					ELSE
						rec_state := REC_DELETE;
						RETURN;
					END_IF
				END_IF
				// Continue reading recipe names
				IF(RECIPE.CMD.Init) THEN
					InsertRecName(ADR(RECIPE), RecipeName, RECIPE.PAR.RecipeID);
					rec_state := REC_READ_DIR_2;
					RETURN;
				END_IF
				// Finish new recipe 
				IF(RECIPE.CMD.New) THEN
					IF(REC_USE_UNICODE) THEN
						RecipeIDs[brsatoi(ADR(RECIPE.PAR.RecipeID))] := TRUE;
					END_IF
					InsertRecName(ADR(RECIPE), RecipeName, RECIPE.PAR.RecipeID);
					RECIPE.VIS[RECIPE.PAR.VisuSlotID].RecipeSelect := RecipeName;
					tmpWStr1 := "Receptura bola vytvorena";
					RECIPE.CMD.New	:= FALSE;
				END_IF
				// Finish load recipe 
				IF(RECIPE.CMD.Load) THEN
					tmpWStr1 := "Receptura bola nacitana";
					RECIPE.CMD.Load	:= FALSE;
				END_IF
				// Finish save recipe 
				IF(RECIPE.CMD.Save) THEN
					tmpWStr1 := "Receptura bola ulozena";
					RECIPE.CMD.Save	:= FALSE;
				END_IF
				// Complete status string
				CreateMessage(ADR(RECIPE.DAT.Status), ADR(tmpWStr1), ADR(RecipeName), RECIPE.PAR.VisuSlotID);
				rec_state := REC_WAIT;	
				// Error		
			ELSIF (MpRecipeStatusID = mpRECIPE_WRN_LOAD_WITH_WARN) THEN
				rec_state := CreateError(ADR(RECIPE), MpRecipeStatusID, "Warning recipe read/write/new, check PLC logbook for details", rec_state);
			ELSIF (MpRecipeError OR MpRecipeStatusID <> 0) THEN
				tmpWStr1 := "Error recipe read/write/new ";
				brwcscat(ADR(tmpWStr1), ADR(RecipeName));
				rec_state := CreateError(ADR(RECIPE), MpRecipeStatusID, tmpWStr1, rec_state);
			END_IF
			//**********************************************************************************************
			// Delete selected recipe																			
			//**********************************************************************************************
		REC_DELETE:		
			// ---------------------------------------------------------------------------------------- 		
			// Initialize file delete structure 														
			FDelete.enable		:= 1;
			FDelete.pDevice 	:= ADR(RECIPE.PAR.DeviceName);
			FDelete.pName		:= ADR(RecipeFullFileName);
			FDelete();
										
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (FDelete.status = OK) THEN
				// Remove name from recipe list											
				RemoveRecName(ADR(RECIPE), RecipeIndex);
				// Mark recipe ID as free
				IF(REC_USE_UNICODE) THEN
					RecipeIDs[brsatoi(ADR(RECIPE.PAR.RecipeID))] := FALSE;
				END_IF
				
				CreateMessage(ADR(RECIPE.DAT.Status), ADR("Receptura bola vymazana"), ADR(RecipeName), RECIPE.PAR.VisuSlotID);
				RECIPE.CMD.Delete := 0;
				rec_state := REC_WAIT;
				// Error 		
			ELSIF (FDelete.status <> ERR_FUB_BUSY) THEN
				tmpWStr1 := "Porucha vymazania receptury ";
				brwcscat(ADR(tmpWStr1), ADR(RecipeName));
				rec_state := CreateError(ADR(RECIPE), FDelete.status, tmpWStr1, rec_state);
			END_IF
			//**********************************************************************************************
			// Rename selected recipe																			
			//**********************************************************************************************
		REC_RENAME:
			// Generate recipe path and extension
			tmpStr1 := RECIPE.PAR.RecipeDirectory;
			brsstrcat(ADR(tmpStr1), ADR('/'));
			brwcsconv(ADR(tmpStr2), ADR(RecipeNameNew), brwUCtoU8);
			brsstrcat(ADR(tmpStr1), ADR(tmpStr2));

			// Add file extension
			IF(REC_RECIPE_TYPE = typeCSV) THEN
				brsstrcat(ADR(tmpStr1), ADR('.csv'));
			ELSE
				brsstrcat(ADR(tmpStr1), ADR('.xml'));
			END_IF
			
			// ---------------------------------------------------------------------------------------- 		
			// Initialize file delete structure 														
			FRename.enable		:= 1;
			FRename.pDevice 	:= ADR(RECIPE.PAR.DeviceName);
			FRename.pName		:= ADR(RecipeFullFileName);
			FRename.pNewName	:= ADR(tmpStr1);
			FRename();	
			
			// ---------------------------------------------------------------------------------------- 		
			// OK																																				
			IF (FRename.status = OK) THEN
				// Remove name from recipe list	and add it again										
				brsmemmove(ADR(RECIPE.DAT.RecipeNames[RecipeIndex]),ADR(RECIPE.DAT.RecipeNames[RecipeIndex+1]), (RECIPE.DAT.RecipeNum) * SIZEOF(RECIPE.DAT.RecipeNames[0]));
				brsmemmove(ADR(RECIPE.DAT.RecipeIDs[RecipeIndex]),ADR(RECIPE.DAT.RecipeIDs[RecipeIndex+1]), (RECIPE.DAT.RecipeNum) * SIZEOF(RECIPE.DAT.RecipeIDs[0]));
				RECIPE.DAT.RecipeNum := RECIPE.DAT.RecipeNum - 1;
				InsertRecName(ADR(RECIPE), RecipeNameNew, RECIPE.PAR.RecipeID);

				RECIPE.VIS[RECIPE.PAR.VisuSlotID].RecipeSelect := RecipeNameNew;
				CreateMessage(ADR(RECIPE.DAT.Status), ADR("Receptura bola premenovana"), ADR(RecipeName), RECIPE.PAR.VisuSlotID);
				RECIPE.CMD.Rename := 0;
				rec_state := REC_WAIT;
				// Error 		
			ELSIF (FRename.status <> ERR_FUB_BUSY) THEN
				tmpWStr1 := "Porucha premenovania receptury ";
				brwcscat(ADR(tmpWStr1), ADR(RecipeName));
				rec_state := CreateError(ADR(RECIPE), FRename.status, tmpWStr1, rec_state);
			END_IF
			// --------------------------------------------------------------------------------------------------------------------
			// Error 
			// --------------------------------------------------------------------------------------------------------------------					
		REC_ERROR:
			RECIPE.DAT.Status := "Error state triggered on web client ID ";
			tmpWStr1 := DINT_TO_WSTRING(RECIPE.PAR.VisuSlotID);
			brwcscat(ADR(RECIPE.DAT.Status), ADR(tmpWStr1));
			// --------------------------------------------------------------------------------------------------------------------											
			// Make sure we dont exceed maximum number of web clients
			IF(RECIPE.PAR.VisuSlotID <= REC_MAX_CLIENTS_ID) THEN
				RECIPE.VIS[RECIPE.PAR.VisuSlotID].ShowMessageBoxError := TRUE;
			END_IF
			// --------------------------------------------------------------------------------------------------------------------	
			// Return to idle state
			IF RECIPE.CMD.ErrorReset THEN
				// Reset function blocks
				MpRecipeCsv_0.ErrorReset := TRUE;
				MpRecipeCsv_0.Save := FALSE;
				MpRecipeCsv_0.Load := FALSE;
				
				MpRecipeXml_0.ErrorReset := TRUE;
				MpRecipeXml_0.Save := FALSE;
				MpRecipeXml_0.Load := FALSE;
				
				MpRecipeRegPar_0.ErrorReset := TRUE;
				
				// Reset error structure
				brsmemset(ADR(RECIPE.ERR), 0, SIZEOF(RECIPE.ERR));
				RECIPE.DAT.Status := "";
				RECIPE.CMD.ErrorReset := FALSE;
				RECIPE.VIS[RECIPE.PAR.VisuSlotID].ShowMessageBoxError := FALSE;
				rec_state := REC_WAIT;
			END_IF;	
			brsmemset(ADR(RECIPE.CMD), 0, SIZEOF(RECIPE.CMD));
			RETURN;
	END_CASE
	// --------------------------------------------------------------------------------------------------------------------
	// Cyclic function calls
	MpRecipeRegPar_0();
	MpRecipeRegPar_1();
	MpRecipeCsv_0();
	MpRecipeXml_0();

END_PROGRAM


PROGRAM _EXIT
	(* Insert code here *)
	

	 
END_PROGRAM
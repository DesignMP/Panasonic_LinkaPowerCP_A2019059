
(* Zaokrúhlenie na jedno desatinné miesto *)
FUNCTION_BLOCK Round
    
    VstupnaHodnotaREAL:= UINT_TO_REAL(VstupnaHodnota);
    IF VstupnaHodnotaREAL >= 128 THEN
        VysledokDeleniaUINT:= TRUNC((VstupnaHodnotaREAL /128)*10);
        VysledokDeleniaREAL:= UINT_TO_REAL(VysledokDeleniaUINT);
        VystupnaHodnota:= VysledokDeleniaREAL /10;
    ELSE
        VystupnaHodnota:= 0;
    END_IF   
    
       
    
END_FUNCTION_BLOCK

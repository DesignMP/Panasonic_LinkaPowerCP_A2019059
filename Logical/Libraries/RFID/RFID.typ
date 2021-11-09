(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: RFID
 * File: RFID.typ
 * Author: houx
 * Created: March 25, 2009
 ********************************************************************
 * Data types of library RFID
 ********************************************************************)

TYPE
	Info : 	STRUCT 
		ID : UDINT;
		Type : UDINT;
		StackLevel : UDINT;
	END_STRUCT;
	status : 	STRUCT 
		GetUsbList : UINT;
		GetUsbNode : UINT;
		ReleaseBuffer : UINT;
		XOPEN : UINT;
		WRITE : UINT;
		READ : UINT;
		GetBuffer : UINT;
		RoBuffer : UINT;
	END_STRUCT;
	usbDevice : 	STRUCT 
		vendorID : UDINT;
		productId : UDINT;
		bcdDevice : UDINT;
	END_STRUCT;
END_TYPE

(**)

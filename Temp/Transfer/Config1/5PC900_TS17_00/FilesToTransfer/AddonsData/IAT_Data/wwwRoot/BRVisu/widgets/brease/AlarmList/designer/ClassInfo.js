define(["widgets/brease/TableWidget/designer/ClassInfo"], function(s, e) {"use strict";var classInfo={meta:{className:"widgets.brease.AlarmList",parents:["*"],children:["widgets.brease.AlarmListItem"],inheritance:["widgets.brease.AlarmList","widgets.brease.TableWidget","widgets.brease.DataHandlerWidget","brease.core.BaseWidget"],actions:{"Acknowledge":{"method":"acknowledge"},"AcknowledgeAll":{"method":"acknowledgeAll"},"Focus":{"method":"focus"},"GoToFirstPage":{"method":"goToFirstPage"},"GoToLastPage":{"method":"goToLastPage"},"GoToNextPage":{"method":"goToNextPage"},"GoToPage":{"method":"goToPage","parameter":{"value":{"name":"value","index":0,"type":"Integer"}}},"GoToPreviousPage":{"method":"goToPreviousPage"},"OpenConfiguration":{"method":"openConfiguration","parameter":{"type":{"name":"type","index":0,"type":"MappTableConfigurationType"}}},"SelectAlarmById":{"method":"selectAlarmById","parameter":{"instanceID":{"name":"instanceID","index":0,"type":"UInteger"}}},"setBusyIndicatorDelay":{"method":"setBusyIndicatorDelay","parameter":{"busyIndicatorDelay":{"name":"busyIndicatorDelay","index":0,"type":"Integer"}}},"setEditable":{"method":"setEditable","parameter":{"editable":{"name":"editable","index":0,"type":"Boolean"},"metaData":{"name":"metaData","index":1,"type":"Object"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFilterConfiguration":{"method":"setFilterConfiguration","parameter":{"filterConfiguration":{"name":"filterConfiguration","index":0,"type":"String"}}},"setFormat":{"method":"setFormat","parameter":{"format":{"name":"format","index":0,"type":"String"}}},"setHeaderHeight":{"method":"setHeaderHeight","parameter":{"headerHeaderHeight":{"name":"headerHeaderHeight","index":0,"type":"PixelVal"}}},"setHeaderSorting":{"method":"setHeaderSorting","parameter":{"headerSorting":{"name":"headerSorting","index":0,"type":"Boolean"}}},"setImageActive":{"method":"setImageActive","parameter":{"imageActive":{"name":"imageActive","index":0,"type":"ImagePath"}}},"setImageActiveAcknowledged":{"method":"setImageActiveAcknowledged","parameter":{"imageActiveAcknowledged":{"name":"imageActiveAcknowledged","index":0,"type":"ImagePath"}}},"setImageInactive":{"method":"setImageInactive","parameter":{"imageInactive":{"name":"imageInactive","index":0,"type":"ImagePath"}}},"setImagePrefix":{"method":"setImagePrefix","parameter":{"imagePrefix":{"name":"imagePrefix","index":0,"type":"DirectoryPath"}}},"setImageSuffix":{"method":"setImageSuffix","parameter":{"imageSuffix":{"name":"imageSuffix","index":0,"type":"ImageType"}}},"setItemsPerPage":{"method":"setItemsPerPage","parameter":{"itemsPerPage":{"name":"itemsPerPage","index":0,"type":"Integer"}}},"setMpLink":{"method":"setMpLink","parameter":{"telegram":{"name":"telegram","index":0,"type":"MpComIdentType"}}},"setNextText":{"method":"setNextText","parameter":{"nextText":{"name":"nextText","index":0,"type":"String"}}},"setNextTextKey":{"method":"setNextTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setPaging":{"method":"setPaging","parameter":{"paging":{"name":"paging","index":0,"type":"Boolean"}}},"setPreviousText":{"method":"setPreviousText","parameter":{"previousText":{"name":"previousText","index":0,"type":"String"}}},"setPreviousTextKey":{"method":"setPreviousTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setRowHeight":{"method":"setRowHeight","parameter":{"rowHeight":{"name":"rowHeight","index":0,"type":"String"}}},"setSearchBox":{"method":"setSearchBox","parameter":{"searchBox":{"name":"searchBox","index":0,"type":"Boolean"}}},"setShowPagingButtons":{"method":"setShowPagingButtons","parameter":{"showPagingButtons":{"name":"showPagingButtons","index":0,"type":"Boolean"}}},"setSortConfiguration":{"method":"setSortConfiguration","parameter":{"sortConfiguration":{"name":"sortConfiguration","index":0,"type":"String"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setStyleConfiguration":{"method":"setStyleConfiguration","parameter":{"styleConfiguration":{"name":"styleConfiguration","index":0,"type":"String"}}},"setTabIndex":{"method":"setTabIndex","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"ShowTooltip":{"method":"showTooltip"}},properties:{}}};if(s.classExtension) {classInfo.classExtension = s.classExtension;}if(e) {classInfo.classExtension = e;}return classInfo;});
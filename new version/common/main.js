function wlCommonInit(){

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here

}

function updateTheme(newTheme) {
//alert("In refresh");
var rmbtnClasses = '';
var rmhfClasses = '';
var rmbdClassess = '';
var arr = ["a", "b", "c", "d", "e", "f" ];

$.each(arr,function(index, value){
    rmbtnClasses = rmbtnClasses + " ui-btn-up-"+value + " ui-btn-hover-"+value;
    rmhfClasses = rmhfClasses + " ui-bar-"+value;
    rmbdClassess = rmbdClassess + " ui-body-"+value;
});

// reset all the buttons widgets
 $.mobile.activePage.find('.ui-btn').not('.ui-li-divider').removeClass(rmbtnClasses).addClass('ui-btn-up-' + newTheme).attr('data-theme', newTheme);

 // reset the header/footer widgets
 $.mobile.activePage.find('.ui-header, .ui-footer').removeClass(rmhfClasses).addClass('ui-bar-' + newTheme).attr('data-theme', newTheme);

 // reset the page widget
 $.mobile.activePage.removeClass(rmbdClassess).addClass('ui-body-' + newTheme).attr('data-theme', newTheme);

 // target the list divider elements, then iterate through them and
 // change its theme (this is the jQuery Mobile default for
 // list-dividers)
 $.mobile.activePage.find('.ui-li-divider').each(function(index, obj) {
 $(this).removeClass(rmhfClasses).addClass('ui-bar-' + newTheme).attr('data-theme',newTheme);

 });
}
//Change theme
function gettheme(sel) {
	//alert(sel.value);
	updateTheme(sel.value);
 }
//Change language
function getlang(sel) {
	alert(sel.value);
	//TODO
 }
function getSRCstation(sel) {
	alert("SRC");
	alert(sel.value);
	var LongLat = get_station(sel.value);//from DB
	alert(LongLat.Longitude);
	alert(LongLat.Latitude);
	//TODO
    
 }
function getDSTstation(sel) {
	alert("DST");
	alert(sel.value);
	var LongLat = get_station(sel.value);//from DB
	alert(LongLat.Longitude);
	alert(LongLat.Latitude);
	return LongLat;
	//TODO
 }

//Change mode
/*function getmode()
{
	if(document.getElementById('radio-choice-a1').checked) {
		//Online mode
		}else if(document.getElementById('radio-choice-b1').checked) {
		  //Offline mode
		}
}*/
function notes(value){
	//TODO
$('#Description').bind('expand', function () {
    //alert('Expanded');
	var invocationData2 = {
			adapter : 'station',
			procedure : 'get_station_description.xml',
			parameters : [value]
		};

		WL.Client.invokeProcedure(invocationData1,{
			onSuccess : loadSQLQueerySuccess11,
			onFailure : loadSQLQueeryFailure11
		});
}).bind('collapse', function () {
    //alert('Collapsed');
});
}
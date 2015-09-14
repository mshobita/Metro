
function trig(){
	alert("YARAB");
//	get_station('Orabi');	
	From_To();
}
var line_num=1;
function From_To(){
	
	get_all_station('Line1');
	get_all_station('Line2');	
	get_all_station('Line3');
}
function get_all_station(Line){

	var invokationViewAcheivments = {
			adapter : 'stations',
			procedure : 'get_all_station',
			parameters : [Line]
		};

		WL.Client.invokeProcedure(invokationViewAcheivments, {
			onSuccess : getALLStationSuccess,
			onFailure : getALLStationFailure,
		});
	
}
var stations_name=[];
function getALLStationSuccess(result){
	//var obj = jQuery.parseJSON( '{"isSuccessful": false,"resultSet": [{ "Latitude": 30.05702277,"Line": "Line1","Longitude": 31.24239206,"position_x": 280,"position_y": 257,"station_ID": 17,"station_name": "Orabi" }]}' );
	//alert(obj.resultSet[0].Latitude);
	//var nillah = {"isSuccessful":true,"responseID":"73","resultSet":[{"station_name":"Orabi","station_ID":17,"position_y":257,"Latitude":30.05702277,"position_x":280,"Longitude":31.24239206,"Line":"Line1"}]};
	
	//alert("getALLStationSuccess");
	//alert(line_num);
	//var line_name=result.invocationResult.resultSet[0].Longitude;
	
	//alert(result.invocationResult.resultSet.length);
	//alert(line_num);
	var arrayLength = result.invocationResult.resultSet.length;
	 $('#from, #to')
     .append($('<optgroup>')
     .attr("label","Line"+line_num)
     .text("Line"+line_num)); 
	 
	for (var i = 0; i < arrayLength; i++) {
	    stations_name.push(result.invocationResult.resultSet[i].station_name);
	    //alert(stations_name[i]);
	    $('#from, #to')
        .append($("<option></option>")
        .attr("value",stations_name[i])
        .text(stations_name[i])); 
	}
	stations_name=[];
	line_num++;
}

function getALLStationFailure(){
	alert("error getting Line's stations");
}
///////////////////////////////////////////////////
var LongLat,success=false;
function get_station(station_name){
	alert("getstation");

	var invokationViewAcheivments = {
			adapter : 'stations',
			procedure : 'get_station',
			parameters : [station_name]
		};

		WL.Client.invokeProcedure(invokationViewAcheivments, {
			onSuccess : getStationSuccess,
			onFailure : getStationFailure,
		});
	alert("Back");
	alert(success===true);
	if(success===true){
		return LongLat;
	}
}

function getStationSuccess(result){
	//var obj = jQuery.parseJSON( '{"isSuccessful": false,"resultSet": [{ "Latitude": 30.05702277,"Line": "Line1","Longitude": 31.24239206,"position_x": 280,"position_y": 257,"station_ID": 17,"station_name": "Orabi" }]}' );
	//alert(obj.resultSet[0].Latitude);
	//var nillah = {"isSuccessful":true,"responseID":"73","resultSet":[{"station_name":"Orabi","station_ID":17,"position_y":257,"Latitude":30.05702277,"position_x":280,"Longitude":31.24239206,"Line":"Line1"}]};
	alert("Success");
	success=true;
	LongLat = result.invocationResult.resultSet[0];
	var Longitude=result.invocationResult.resultSet[0].Longitude;
	var Latitude=result.invocationResult.resultSet[0].Latitude;
	//return Longitude;

	//alert(Longitude);
	//alert(Latitude);
}

function getStationFailure(){
	alert("error get Station");
}



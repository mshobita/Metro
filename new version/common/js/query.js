 //This file reads data file as JSON format and makes some queries on the DB


var invalidEntries = 0;

/****************** example to follow ******************/
function filterByID(obj) {
  if ('station_ID' in obj && typeof(obj.station_ID) === 'number' && !isNaN(obj.station_ID)) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}

/******************get station by id *****************/

function getID(){
	return 44;//put the requiered id
}

function getStationByID(obj) {
  var id = getID();
  if ('station_ID' in obj && typeof(obj.station_ID) === 'number' && !isNaN(obj.station_ID) && obj.station_ID===id) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}

/******************get station by name*****************/
var name;
// function getName(){
// 	return "Massara"; //put the requiered name
// }

function getStationByName(obj) {
  //alert("getStationByName")
  if ('station_name' in obj && typeof(obj.station_name) === 'string'  && obj.station_name===name) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}
/******************get all stations orderd by line number*****************/

/*function getLine(){
  return "Line3";//put the requiered line
}
*/
function getStationsByLine(obj) {
  //var line = getLine();
  if ('Line' in obj && typeof(obj.Line) === 'string' ) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}


var line_num=1;
var db;//variable holding the db from the JSON store
$.getJSON('json/data.json', function(data) {
      
      db=data.station;
      append_stations();
});

//append All stations to the dropdown menu
function append_stations(){
    //get stations ordered by line number
      var arrByLine = db.filter(getStationsByLine);
      alert(JSON.stringify(arrByLine));
    
    //append Line name to the dropdown menue
      $('#from, #to')
     .append($('<optgroup>')
     .attr("label",arrByLine[0].Line)
     .text(arrByLine[0].Line)); 
      line_num++;
      // var output="<ul>";
      for (var i=0;i<arrByLine.length;i++) {
        if(i>0 && arrByLine[i].Line>arrByLine[i-1].Line){
          $('#from, #to')
         .append($('<optgroup>')
         .attr("label",arrByLine[i].Line)
         .text(arrByLine[i].Line)); 
         line_num++;
        }
    
    //append stations to the dropdown menue
      $('#from, #to')
      .append($("<option></option>")
      .attr("value",arrByLine[i].station_name)
      .text(arrByLine[i].station_name)); 

       //output+="<li>" + db[i].station_ID  + "//" + db[i].station_name+ "//" + db[i].Line+ "//"+db[i].position_x+ "//"+db[i].position_y+ "//"+db[i].Latitude+ " "+db[i].Longitude+"</li>";
      }
      
      // output+="</ul>";
      // var arrByID = data.station.filter(getStationByID);
      // alert(JSON.stringify(arrByID));
      // document.getElementById("placeholder").innerHTML=output;
}


//return x/y position on source change
function getSRCstation(sel) {
  alert("SRC");
  //alert(sel.value);
  name = sel.value;
  alert(name);
    
  //alert(db);
  alert("Heyyyy");
  var stationObj = db.filter(getStationByName);//get_station(sel.value);//from DB
  alert(stationObj.length);
  alert("Heyyyy");
  alert(stationObj[0].position_x);//posx
  alert(stationObj[0].position_y);//posy
    
 }

//return x/y position on destination change
function getDSTstation(sel) {
  alert("DST");
  name = sel.value;
  alert(name);

  //alert(db);
  alert("Heyyyy");
  var stationObj = db.filter(getStationByName);//get_station(sel.value);//from DB
  alert(stationObj.length);
  alert("Heyyyy");
  alert(stationObj[0].position_x);//pox
  alert(stationObj[0].position_y);//posy
  
 }
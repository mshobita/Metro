 //This file reads data file as JSON format


var invalidEntries = 0;




// example to follow
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
	return 44;
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

function getName(){
	return "Massara";
}

function getStationByName(obj) {
  var name = getName();
  if ('station_name' in obj && typeof(obj.station_name) === 'string'  && obj.station_name===name) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}
/******************get stations orderd by line number*****************/

function getLine(){
  return "Line3";
}

function getStationsByLine(obj) {
  var line = getLine();
  if ('Line' in obj && typeof(obj.Line) === 'string' ) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}


//
var line_num=1;
//
 $.getJSON('json/data.json', function(data) {
        var output="<ul>";
        
        //get stations of line 3
        var arrByLine = data.station.filter(getStationsByLine);
        $('#from, #to')
       .append($('<optgroup>')
       .attr("label","Line"+line_num)
       .text("Line"+line_num)); 
        line_num++;
        for (var i=0;i<arrByLine.length;i++) {
          
          if(i>0 && arrByLine[i].Line>arrByLine[i-1].Line){
            $('#from, #to')
           .append($('<optgroup>')
           .attr("label","Line"+line_num)
           .text("Line"+line_num)); 
           line_num++;
          }
          //append stations to the dropdown menue
          $('#from, #to')
          .append($("<option></option>")
          .attr("value",arrByLine[i].station_name)
          .text(arrByLine[i].station_name)); 

            output+="<li>" + data.station[i].station_ID  + "//" + data.station[i].station_name+ "//" + data.station[i].Line+ "//"+data.station[i].position_x+ "//"+data.station[i].position_y+ "//"+data.station[i].Latitude+ " "+data.station[i].Longitude+"</li>";
        }
        
        output+="</ul>";
        //alert(data.station);
        var arrByID = data.station.filter(getStationByID);
        //alert(arrByID[1].station_ID);
        alert(JSON.stringify(arrByID));
        document.getElementById("placeholder").innerHTML=output;
  });



			var mobileDemo = { 'center': '30.06969749,31.28096223', 'zoom': 10 };
			
			////////////////////////////////////////////////////////////
			
			$('#basic_map').live('pageinit', function() {
				demo.add('basic_map', function() {
					$('#map_canvas').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
						var self = this;
						self.addMarker({'position': this.get('map').getCenter() }).click(function() {
							self.openInfoWindow({ 'content': 'Hello World!' }, this);
						});
					}}); 
				}).load('basic_map');
			});
			
			$('#basic_map').live('pageshow', function() {
				demo.add('basic_map', function() { $('#map_canvas').gmap('refresh'); }).load('basic_map');
			});
			
			////////////////////////////////////////////////////////////
			
			$('#directions_map').live('pageinit', function() {
				demo.add('directions_map', function() {
					$('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
						var self = this;
						self.watchPosition(function(position, status) {
							if ( status === 'OK' ) {
								//var to = getDSTstation('Orabi');
								var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
								if ( !self.get('markers').client ) {
									self.addMarker({ 'id': 'client', 'position': latlng, 'bounds': true });
								} else {
									self.get('markers').client.setPosition(latlng);
									map.panTo(latlng);
								}
								//var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
								self.get('map').panTo(latlng);
								self.search({ 'location': latlng }, function(results, status) {
									if ( status === 'OK' ) {
										$('#from').val(results[0].formatted_address);
									}
								});
							}
							else if(status === 'ZERO_RESULTS'){
								alert("The address you requested does not exist");

							}
							else{
								alert('Unable to get current position, Please enter them manually');
								//autocomplete
								//TODO

							}
						});
							$('#submit').click(function() {
							//self.clear('markers');
							self.get('markers').client.setMap(null);
							self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
								( status === 'OK' ) ? $('#results').show() : $('#results').hide();
							});
							return false;
						});
					}});
				}).load('directions_map','3.7', {
            'other_params' :
            'sensor=false&libraries=places&language=' + "fr"
        });
			});
			
			$('#directions_map').live('pageshow', function() {
				demo.add('directions_map', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map','3.7', {
            'other_params' :
            'sensor=false&libraries=places&language=' + "fr"
        });
			});
			
			////////////////////////////////////////////////////////////
							
			$('#gps_map').live('pageinit', function() {
				demo.add('gps_map', function() {
					$('#map_canvas_2').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function(map) {
						var self = this;
						self.watchPosition(function(position, status) {
							if ( status === 'OK' ) {
								var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
								if ( !self.get('markers').client ) {
									self.addMarker({ 'id': 'client', 'position': latlng, 'bounds': true });
								} else {
									self.get('markers').client.setPosition(latlng);
									map.panTo(latlng);
								}
							}
						});
					}});
				}).load('gps_map');
			});
			
			$('#gps_map').live('pageshow', function() {
				demo.add('gps_map', function() { $('#map_canvas_2').gmap('refresh'); }).load('gps_map');
			});
			
			$('#gps_map').live("pagehide", function() {
				demo.add('gps_map', function() { $('#map_canvas_2').gmap('clearWatch'); }).load('gps_map');
			});
			
			////////////////////////////////////////////////////////////
			
			$('#places').live('pageinit', function() {
				demo.add('places_1', function() {
					$('#map_canvas_3').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
						var self = this;
						var control = self.get('control', function() {
							$(self.el).append('<div id="control"><div><input id="places-search" class="ui-bar-d ui-input-text ui-body-null ui-corner-all ui-shadow-inset ui-body-d ui-autocomplete-input" type="text"/></div></div>');
							self.autocomplete($('#places-search')[0], function(ui) {
								self.clear('markers');
								self.set('bounds', null);
								self.placesSearch({ 'location': ui.item.position, 'radius': '5000' }, function(results, status) {
									if ( status === 'OK' ) {
										$.each(results, function(i, item) {
											self.addMarker({ 'id': item.id, 'position': item.geometry.location, 'bounds':true }).click(function() {
												self.openInfoWindow({'content': '<h4>'+item.name+'</h4>'}, this);
											});
										});
									}
								});
							});
							return $('#control')[0];
						});
						self.addControl(new control(), 1);
					}});
				}).load('places_1');
			});
			
			$('#places').live('pageshow', function() {
				demo.add('places_2', function() { $('#map_canvas_3').gmap('refresh'); }).load('places_2');
			});
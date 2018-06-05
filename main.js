




          $('#location-button').click(function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                  console.log(position);
                  $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false", function(data) {
                    console.log(data);
                  })
                  let img = new Image();
                  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=10&size=900x600&sensor=false";
                  $('#Map').html(img);
                });
            }else{
                x="Geolocation is not supported by this browser."
            }
          });

          document.getElementById('location-button').addEventListener('click', getTraffic);
          document.getElementById('location-button2').addEventListener('click', alert);
          
          function getTraffic(){
                fetch('http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=44.7821727&lng=20.4514425&fDstL=0&fDstU=100')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    let output = '<h2 class="mb-4">Airplane traffic</h2>';
                    data.acList.forEach(function(flight){
                    output += `
                    <a onclick="getFlight(${flight.Id})" href="#"><ul class="list-group mb-3">
                        <li class="list-group-item">Altitude: ${flight.Alt} Flight code:${flight.Id} <img id="logo" src="/img/lufthansa.png"></li>
                        </ul>
                    <a/>
                    `;
                    });
                    document.getElementById('Traffic').innerHTML = output;
                })
                }

                function getFlight(Id){
                    console.log(Id);
                    fetch('http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=44.7821727&lng=20.4514425&fDstL=0&fDstU=100') //change
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        let output = '<h2 class="mb-4">Airplane flight</h2>';
                        data.acList.forEach(function(flight){
                        output += `
                        <ul class="list-group mb-3">
                        <li class="list-group-item">Altitude: ${flight.Alt}   <img id="logo" src="/img/lufthansa.png"></li>
                        <li class="list-group-item">Flight code:${flight.Id}</li>
                        <li class="list-group-item">Manufacturer: ${flight.Man}</li>
                        <li class="list-group-item">Model: ${flight.Mdl}</li>
                        <li class="list-group-item">Destination: ${flight.To}</li>
                        <li class="list-group-item">From: ${flight.From}</li>
                        <li class="list-group-item">From: ${flight.Call}</li>
                        </ul>
                        `;
                        });
                        document.getElementById('flightId').innerHTML = output;
                    })
                    }

                function alert(){
                   let output = `<div class="alert alert-danger" role="alert">
                        Geolocation denied!
                        </div>`;
                        document.getElementById('Alert').innerHTML = output;
                }


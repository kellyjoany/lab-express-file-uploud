const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myLoc);
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

function startMap(myLoc) {
  const ironhackBCN = {
    lat: -23.547471,
 	  lng: -46.632881,
  };

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 5,
      center: ironhackBCN,
    },
  );

  const myHome = {
      lat: -10.911631,
      lng: -37.062999,
    }
  
  const myHouse = new google.maps.Marker({
    position: myHome,
    map,
    title: "My home",
  });

  const whereAmI = new google.maps.Marker({
    position: myLoc,
    map,
    title: "I'm here",
  });

  const directionRequest = {
    origin: whereAmI.position, //{ lat: 41.3977381, lng: 2.190471916},
    destination: myHouse.position, //'Madrid, ES',
    travelMode: 'DRIVING',
  };
  
  directionsService.route(
    directionRequest,
    function(response, status) {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);
  
      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
  
  directionsDisplay.setMap(map);
}

getUserLocation();

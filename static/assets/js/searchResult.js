function initMap() { }

$(() => {
    initMap = function () {


        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: { lat: 41.85, lng: -87.65 }
        });
        directionsDisplay.setMap(map);


        calculateAndDisplayRoute(directionsService, directionsDisplay);


    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        directionsService.route({
            origin: Cookies.get('currentLoc'),
            destination: Cookies.get('destinationLoc'),
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
})

// $(document).on('ready', function () {


// });
function initMap() { }

$(() => {
    var directionsService;
    var directionsDisplay;
    var map;
    var newSearch = false;
    var destinationLoc;

    var trsptstartTxt = document.getElementById('trsptstart');
    var trsptdestTxt = document.getElementById('trsptdest');

    // trsptstartTxt = Cookies.get('currentLoc');
    // trsptdestTxt = Cookies.get('destinationLoc');

    var directionsRequest = {
        origin: "canada",
        destination: "india",
        travelMode: "DRIVING",
        transitOptions: {
            departureTime: new Date(Date.now()),
            modes: [],
            routingPreference: 'FEWER_TRANSFERS'
        }
        // unitSystem: google.maps.UnitSystem.METRIC
    };

    initMap = function () {


        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: { lat: 41.85, lng: -87.65 }
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directPanel'));


        trsptstart = new google.maps.places.SearchBox(trsptstartTxt);
        trsptdest = new google.maps.places.SearchBox(trsptdestTxt);

        calculateAndDisplayRoute(directionsService, directionsDisplay, directionsRequest);


    }


    $('.tablinks').on('click', function (e) {
        e.preventDefault();

        if (($(this).text() == "DRIVING") || ($(this).text() == "WALKING") || ($(this).text() == "BICYCLING")) {
            var travelMode = $(this).text();

            directionsRequest.travelMode = travelMode;
        } else {
            var travelMode = "TRANSIT";
            var transitMode = $(this).text();
            directionsRequest.travelMode = travelMode;
            directionsRequest.transitOptions.modes = [transitMode];
        }

        if (newSearch)
            getNewSearch(directionsService, directionsDisplay, directionsRequest);
        else
            calculateAndDisplayRoute(directionsService, directionsDisplay, directionsRequest);

    });

    $('#tsearchbtn').on('click', function (e) {
        e.preventDefault();

        directionsRequest.origin = trsptstartTxt.value;
        directionsRequest.destination = trsptdestTxt.value;

        getNewSearch(directionsService, directionsDisplay, directionsRequest);
        newSearch = true;

    });

    /**
     * get direction from google map with travel mode and transit mode
     * @param {*} directionsService
     * @param {*} directionsDisplay
     * @param {*} travelMode
     * @param {*} transitMode
     */
    function calculateAndDisplayRoute(directionsService, directionsDisplay, directionsRequest) {

        directionsRequest.origin = Cookies.get('currentLoc');
        directionsRequest.destination = Cookies.get('destinationLoc');
        directionsService.route(directionsRequest,
            function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    switch (status) {
                        case "ZERO_RESULT":
                            window.alert('Sorry we have no result for your searching');
                    }

                }
            });

        trsptstartTxt.value = Cookies.get('currentLoc');
        trsptdestTxt.value = Cookies.get('destinationLoc');
    }

    /**
     * get direction from google map with travel mode and transit mode
     * @param {*} directionsService
     * @param {*} directionsDisplay
     * @param {*} travelMode
     * @param {*} transitMode
     */
    function getNewSearch(directionsService, directionsDisplay, directionsRequest) {

        directionsService.route(directionsRequest,
            function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        // trsptstartTxt.value = Cookies.get('currentLoc');
        // trsptdestTxt.value = Cookies.get('destinationLoc');
        Cookies.set("destinationLoc", trsptdestTxt.value);
    }

})

// $(document).on('ready', function () {


// });
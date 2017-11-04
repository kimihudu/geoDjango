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
        directionsDisplay.setPanel(document.getElementById('directPanel'));

        // var onChangeHandler = function () {
        //     calculateAndDisplayRoute(directionsService, directionsDisplay, travelMode);
        // };

        calculateAndDisplayRoute(directionsService, directionsDisplay, "DRIVING");

        $('.tablinks').on('click', function (e) {
            e.preventDefault();

            if (($(this).text() == "DRVING") || ($(this).text() == "WALKING") || ($(this).text() == "BICYCLING")) {
                var travelMode = $(this).text();
                calculateAndDisplayRoute(directionsService, directionsDisplay, travelMode);
            } else {
                var travelMode = "TRANSIT";
                var transitmode = $(this).text();
                calculateAndDisplayRoute(directionsService, directionsDisplay, travelMode, transitMode);
            }


            // console.log(vehicle);
        });

    }

/**
 * get direction from google map with travel mode
 * @param {*} directionsService
 * @param {*} directionsDisplay
 * @param {*} travelMode
 */
    function calculateAndDisplayRoute(directionsService, directionsDisplay, travelMode) {

        var directionsRequest = {
            origin: Cookies.get('currentLoc'),
            destination: Cookies.get('destinationLoc'),
            travelMode: travelMode
        };

        // {
        //     origin: Cookies.get('currentLoc'),
        //         destination: Cookies.get('destinationLoc'),
        //             travelMode: google.maps.TravelMode[travelMode]
        // }
        directionsService.route(directionsRequest,
            function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }


/**
 * get direction from google map with travel mode and transit mode
 * @param {*} directionsService
 * @param {*} directionsDisplay
 * @param {*} travelMode
 * @param {*} transitMode
 */
    function calculateAndDisplayRoute(directionsService, directionsDisplay, travelMode, transitMode) {

        var directionsRequest = {
            origin: Cookies.get('currentLoc'),
            destination: Cookies.get('destinationLoc'),
            travelMode: travelMode,
            transitOptions: {
                departureTime: new Date(1337675679473),
                modes: [transitMode],
                routingPreference: 'FEWER_TRANSFERS'
            },
            unitSystem: google.maps.UnitSystem.METRIC
        };

        // {
        //     origin: Cookies.get('currentLoc'),
        //         destination: Cookies.get('destinationLoc'),
        //             travelMode: google.maps.TravelMode[travelMode]
        // }
        directionsService.route(directionsRequest,
            function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }

    // function openDirect(e, cityName) {

    //     var i, tabcontent, tablinks;
    //     e.preventDefault();


    //     tabcontent = document.getElementsByClassName("tabcontent");
    //     for (i = 0; i < tabcontent.length; i++) {
    //         tabcontent[i].style.display = "none";
    //     }

    //     tablinks = document.getElementsByClassName("tablinks");
    //     for (i = 0; i < tablinks.length; i++) {
    //         tablinks[i].className = tablinks[i].className.replace(" active", "");
    //     }

    //     document.getElementById(cityName).style.display = "block";
    //     evt.currentTarget.className += " active";
    // }
})

// $(document).on('ready', function () {


// });
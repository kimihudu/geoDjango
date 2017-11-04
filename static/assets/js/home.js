
$(document).on('ready', function () {

    /**
     * get current location
     * --> get list locs callback
     * --> pass to streetview API get img
     */

    var nearLoc;
    var service;
    var location;
    var geocoder;
    var STREETVIEW = "AIzaSyAEQQSEgu8FzXr0y5dbwJd_Ftl4iB-ldVY";


    $(window).load(function () {

        $('#btnGetCurrentLoc').on('click', function (e) {
            e.preventDefault();
            getLocation();
        });


        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }


        // get Address from current position
        function showPosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            geocoder = new google.maps.Geocoder();             // create a geocoder object
            location = new google.maps.LatLng(lat, lng);    // turn coordinates into an object
            geocoder.geocode({ 'latLng': location }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {           // if geocode success
                    // var add = results[0].formatted_address;         // if address found, pass to processing function
                    // console.log(add);

                    // get list placeID
                    nearLoc = results;

                    // pass to streetView get img
                    renderRecentList();
                }
            })

        }

// get img street view from list placeID
        function renderRecentList() {

            var containerAtt = document.getElementById('attributions');//$('#attributions');
            service = new google.maps.places.PlacesService(containerAtt);

            for (var i = 0; i < nearLoc.length; i++) {

                // var request = {
                //     placeId: nearLoc[i].place_id
                // };

                var id = nearLoc[i].place_id;

                service.getDetails({ placeId:id},
                    function (place, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            var lat = place.geometry.location.lat();
                            var lng = place.geometry.location.lng();

                            var src = "https://maps.googleapis.com/maps/api/streetview?size=305x310&location="
                                + lat + "," + lng + "&key=" + STREETVIEW;

                            var element = `<div class="containerv">
                                            <img src="`+ src + `" alt="Avatar" class="imagev">
                                            <div class="overlayv">
                                            <div class="textv">Hello World</div>
                                            </div>
                                            </div>`;

                            $('#recentArea').append(element);
                        }
                    });

            }

        }


        //send a query to get list location from nearLoc
        // service.textSearch({ query: nearLoc }, function (results, status) {
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //         for (var i = 0; i < results.length; i++) {

        //             console.log(results[i].name);
        //             // var item = document.createElement('li');
        //             // item.appendChild(document.createTextNode(results[i].name));
        //             // document.getElementById('results').appendChild(item);
        //         }
        //     }
        // });




        /**
         * search address path --> pass to stranport page
         */

        $('#searchbtn').on('click', function (e) {
            e.preventDefault();
        });

    });



});


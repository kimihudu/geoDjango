function init() { }

$(() => {
    var destinationLoc;
    var service;
    var location;
    var geocoder;
    var STREETVIEW = "AIzaSyAEQQSEgu8FzXr0y5dbwJd_Ftl4iB-ldVY";

    init = function () {

        var geocoder = new google.maps.Geocoder();
        var address = Cookies.get('destinationLoc');
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                var place_id = results[0].place_id;
                renderPic(place_id);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
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
                destinationLoc = results;

                // pass to streetView get img
                renderRecentList();
            }
        })

    }

    // get img street view from list placeID
    function renderPic(place_id) {

        var containerAtt = document.getElementById('attributions');//$('#attributions');
        service = new google.maps.places.PlacesService(containerAtt);

        // for (var i = 0; i < destinationLoc.length; i++) {

            // var request = {
            //     placeId: nearLoc[i].place_id
            // };

            // var id = destinationLoc[i].place_id;

            service.getDetails({ placeId: place_id },
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

                        $('.renderPic').append(element);
                    }
                });

        // }

    }
})
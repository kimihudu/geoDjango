
var data;
function init() { }

$(() => {
    var destinationLoc;
    var service;
    var location;
    var geocoder;
    // var STREETVIEW = "AIzaSyAEQQSEgu8FzXr0y5dbwJd_Ftl4iB-ldVY";
    // var API_KEY = "AIzaSyD_lIaoUCpZ5bu91ZcA2X0CwTLswtzWV1s";
    var request = {
        radius: 500,
    };


    init = function () {

        var containerAtt = document.getElementById('attributions');//$('#attributions');
        service = new google.maps.places.PlacesService(containerAtt);
        var geocoder = new google.maps.Geocoder();
        var address = Cookies.get('destinationLoc');
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                var place_id = results[0].place_id;
                getListPic(place_id);
                // request.location = results[0].geometry.location;
                // request.query = address;

                // service.textSearch(request, callback);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }

    function callback(results, status) {
        if (status === "OK") {
            var dtCallback = [results.photos.length];
            for (var i = 0; i < results.photos.length; i++) {
                var picInfo = {};
                picInfo.id = i;
                picInfo.link = "#";
                // picInfo.src = results.photos[i].getUrl();
                picInfo.src = results.photos[i].getUrl({
                    'maxWidth': 1800,
                    'maxHeight': 1200
                });
                dtCallback.push(picInfo);
            }
            // workaround for index 0, it doesn't have img
            dtCallback.splice(0, 1);
            data = dtCallback;
            console.log(data);
        }
    }


    // get list photos from place_id
    function getListPic(place_id) {

        service.getDetails({ placeId: place_id },
            function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var dtCallback = [results.photos.length];
                    for (var i = 0; i < results.photos.length; i++) {
                        var picInfo = {};
                        picInfo.id = i;
                        picInfo.link = "#";
                        // picInfo.src = results.photos[i].getUrl();
                        picInfo.src = results.photos[i].getUrl({
                            'maxWidth': 1800,
                            'maxHeight': 1200
                        });
                        dtCallback.push(picInfo);
                    }
                    // workaround for index 0, it doesn't have img
                    dtCallback.splice(0, 1);
                    data = dtCallback;
                    console.log(data);
                }
            });
    }
})
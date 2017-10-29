var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(41.879535, -87.624333),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

$(function(){
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(41.879535, -87.624333),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
});
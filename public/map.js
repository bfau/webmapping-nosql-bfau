var map = new ol.Map({
 target: 'map',
 layers: [
   new ol.layer.Tile({
     source: new ol.source.OSM(),
     opacity: 1
   }),
   new ol.layer.Vector({
     source: new ol.source.Vector({
       url: 'geo-search-results-json' + window.location.search,
       format: new ol.format.GeoJSON()
     })
   })
 ],
 view: new ol.View({
   center: ol.proj.fromLonLat([2.344, 48.86]),
   zoom: 12,
   maxZoom: 20,
 })
});

var formulaire = document.getElementById('form')


function getInfoMap(){
  /*
  formulaire.longitude.value = 2.344
  formulaire.latitude.value = 48.86
  formulaire.radius.value = 0.03
  */

  let coords = ol.proj.toLonLat( map.getView().getCenter())
  formulaire.longitude.value = coords[0]
  formulaire.latitude.value = coords[1]
  formulaire.radius.value = (map.getView().calculateExtent(map.getSize())[2]-map.getView().calculateExtent(map.getSize())[0])/200000

  console.log( map.getView().calculateExtent(map.getSize()) )
  console.log( (map.getView().calculateExtent(map.getSize())[2]-map.getView().calculateExtent(map.getSize())[0])/200000 )

}

var getInfoMapButton = document.getElementById('getInfoMap')
getInfoMapButton.addEventListener('click', getInfoMap)

function checkFunction(){
  if (checkbox.checked) {
    setTimeout(function () {
    getInfoMap();
    return(checkFunction());
  }, 500);}
}

var checkbox = document.getElementById('myCheckbox')

checkbox.addEventListener('change', checkFunction)

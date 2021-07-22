var map = L.map('map').setView([20.593683,78.962883], 5);
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//attribution means copyright in map 
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);
function generateList(){
    const ul=document.querySelector('.list');
   storeList.forEach((shop)=>{
const li=document.createElement('li');
const div=document.createElement('div');
const a=document.createElement('a');
const p=document.createElement('p');
a.addEventListener('click',()=>{
flyToStore(shop);
});
div.classList.add('shop-item');
a.innerText=shop.properties.name;
a.href="#";
p.innerText=shop.properties.address;
div.appendChild(a);
div.appendChild(p);
li.appendChild(div);
ul.appendChild(li);

   })

}
generateList();
function popupContent(shop){
    return `
    <div>
    <h4>${shop.properties.name}</h4>
    <p>${shop.properties.address}</p>
    </div>
    <div class="Phone-number">
  <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
    </div>
    `

     
}
function onEachFeature(feature,layer){
    layer.bindPopup(popupContent(feature),{closeButton:false,offset:L.point(0,-8)});

}
var myicon=L.icon({
     iconUrl:"ss.png",
        iconSize:[30,40]
    });
const shopsLayer=L.geoJSON(storeList,{
    onEachFeature:onEachFeature,
    pointToLayer:function(feature,latlng){
        return L.marker(latlng,{icon:myicon});
    }

});
shopsLayer.addTo(map);
function flyToStore(store){
    const lat=store.geometry.coordinates[1];
    const long=store.geometry.coordinates[0];
map.flyTo([store.geometry.coordinates[1],store.geometry.coordinates[0]],14,{duration:3})
setTimeout(()=>{
    L.popup({closeButton:false,offset:L.point(0,-8)})
    .setLatLng([lat,long])
    .setContent(popupContent(store))
    .openOn(map);
},3000)
 
}

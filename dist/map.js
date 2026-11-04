/* Real OpenStreetMap basemap; Leaflet adds linked, keyboard-accessible area markers. */
(function(){
  'use strict';
  let leafletLoading;
  function loadLeaflet(){
    if(window.L)return Promise.resolve(window.L);
    if(leafletLoading)return leafletLoading;
    leafletLoading=new Promise((resolve,reject)=>{
      const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';css.crossOrigin='anonymous';document.head.appendChild(css);
      const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.crossOrigin='anonymous';script.onload=()=>window.L?resolve(window.L):reject(Error('Map library unavailable'));script.onerror=()=>{leafletLoading=null;reject(Error('Map library unavailable'))};document.head.appendChild(script);
    });return leafletLoading;
  }
  const mapUrl=z=>'https://www.openstreetmap.org/export/embed.html?bbox='+encodeURIComponent([z.lon-.035,z.lat-.027,z.lon+.035,z.lat+.027].join(','))+'&layer=mapnik&marker='+encodeURIComponent(z.lat+','+z.lon);
  window.MutiaraMap={mount({zones,selected,onSelect}){
    const root=document.querySelector('#real-map'),fallback=document.querySelector('#map-fallback'),canvas=document.querySelector('#map-canvas'),status=document.querySelector('#map-status');
    let disposed=false,map=null,markers=new Map(),visible=zones,current=selected;
    const updateLink=()=>{const link=document.querySelector('#open-area-map');if(link)link.href=`https://www.openstreetmap.org/?mlat=${current.lat}&mlon=${current.lon}#map=14/${current.lat}/${current.lon}`};
    const select=(z,pan=true)=>{current=z;updateLink();if(map){const marker=markers.get(z.id);if(marker&&map.hasLayer(marker)){if(pan)map.setView([z.lat,z.lon],14);marker.openPopup()}}else{fallback.setAttribute('src',mapUrl(z));fallback.setAttribute('title','OpenStreetMap street map around '+z.name)}};
    const fit=()=>{if(map&&visible.length)map.fitBounds(visible.map(z=>[z.lat,z.lon]),{padding:[45,45],maxZoom:14});else if(fallback)fallback.setAttribute('src','https://www.openstreetmap.org/export/embed.html?bbox=100.22%2C5.26%2C100.39%2C5.45&layer=mapnik')};
    const filter=list=>{visible=list;if(map){markers.forEach((marker,id)=>{const show=list.some(z=>z.id===id);if(show&&!map.hasLayer(marker))marker.addTo(map);if(!show&&map.hasLayer(marker))map.removeLayer(marker)});fit()}};
    select(current);
    if(document.head)loadLeaflet().then(L=>{
      if(disposed||document.querySelector('#real-map')!==root)return;
      canvas.hidden=false;
      try{
        map=L.map(canvas,{scrollWheelZoom:false,keyboard:true,zoomControl:true}).setView([5.36,100.30],12);
        const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(map);
        let loaded=false;tiles.on('tileload',()=>{loaded=true;status.textContent='Real street map · drag to explore; use + / − to zoom. Markers are approximate neighbourhood centres.'});tiles.on('tileerror',()=>{if(!loaded)status.textContent='Map tiles are unavailable. Check your connection or open the area map below.'});
        const colors={Low:'#4f794d',Moderate:'#9b792c',High:'#a75636'};
        zones.forEach((z,i)=>{
          const html=`<span class="geo-pin" style="background:${colors[z.impact]}">${i+1}</span>`;
          const marker=L.marker([z.lat,z.lon],{title:z.name+' — '+z.impact+' demo impact',alt:'Select '+z.name,keyboard:true,icon:L.divIcon({className:'geo-marker',html,iconSize:[34,34],iconAnchor:[17,17]})}).addTo(map);
          const popup=document.createElement('div');const heading=document.createElement('strong');heading.textContent=z.name;popup.appendChild(heading);const note=document.createElement('p');note.textContent=z.status+' · '+z.impact+' impact (demonstration). Approximate area centre.';popup.appendChild(note);const link=document.createElement('a');link.href='#feedback/'+z.id;link.textContent='Report a concern →';popup.appendChild(link);marker.bindPopup(popup);marker.on('click',()=>onSelect(z.id,false));markers.set(z.id,marker);
        });
        fallback.hidden=true;filter(visible);select(current,false);map.invalidateSize();status.textContent='Loading real street tiles… You can select an area from the list.';
      }catch{if(map){map.remove();map=null}canvas.hidden=true;fallback.hidden=false;status.textContent='Real street map shown in embedded mode. Use the area list to change neighbourhood.'}
    }).catch(()=>{if(!disposed)status.textContent='Real street map shown in embedded mode. Use the area list to change neighbourhood.'});
    return{select,filter,fit,destroy(){disposed=true;if(map)map.remove()}};
  }};
})();

import React, { Component ,useState, useEffect } from 'react';

import isEmpty from 'lodash.isempty';
// components:
import GoogleMap from './components/GoogleMap';
import HK_CENTER from './components/const/hk_center';
import bus_icon from './components/assets/bus_icon.png'


const BusMarker = ({ icon, text }) => (
  <div>
    <img style={{ height: '50px', width: '50px' }} src={icon} />
  </div>
)

//set info window string
const getInfoWindowString = (place) => `
    <div>
      <div>${place.id}</div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
    </div>`;

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();
    places.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.lat,
        place.lng,
      ));
    });
    return bounds;
  };

  // Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  
  // Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    const markers = [];
    const infowindows=[];
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);

    places.forEach((place)=>{
      // set markers
      markers.push(new maps.Marker({
        position:{
          lat: place.lat,
          lng:place.lng
        },
        map,
      }));

      //set infowindows
      infowindows.push(new maps.InfoWindow({
        content:getInfoWindowString(place),
      }));
    });

    markers.forEach((marker, i )=>{
      marker.addListener('click',()=>{
        infowindows[i].open(map, marker)
      })
    });
  };


const MarkerOnMap = (props) =>{
  const [places, setPlaces] = useState([])
  const [bus, setBus] = useState({});

  useEffect(()=>{
    fetch('station.json')
    .then((response) => response.json())
    .then((data) => {
      setPlaces(data.station);
    });

  
    fetch("http://localhost:8000/api/bus/1/", {
        method: 'GET',
        cache: 'default'
      })
    .then( result => result.json())
    .then((data)=>{
      setBus(data);
    });
  })

  return (
    
    <>
      {!isEmpty(places) && (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={HK_CENTER}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        >
          <BusMarker
              icon={bus_icon}
              key={bus.id}
              text={bus.route_name}
              lat={bus.lat}
              lng={bus.lng}
            />
        </GoogleMap>
      )}
    </>
  );
};

export default MarkerOnMap;
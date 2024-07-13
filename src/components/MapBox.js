import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MapBox.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY29uZ280MyIsImEiOiJjbHlobnY2ZmYwNnFnMmtwYXltNHZ4dnd0In0.vU7P2RervQeRboRS4sEvhA';

const continents = [
  {
    name: 'Africa',
    coordinates: [20.0, 0.0],
    number: 10,
    metadata: 'Some meta data about Africa'
  },
  {
    name: 'Asia',
    coordinates: [100.0, 60.0],
    number: 20,
    metadata: 'Some meta data about Asia'
  },
  {
    name: 'Europe',
    coordinates: [10.0, 50.0],
    number: 30,
    metadata: 'Some meta data about Europe'
  },
  {
    name: 'North America',
    coordinates: [-100.0, 40.0],
    number: 40,
    metadata: 'Some meta data about North America'
  },
  {
    name: 'South America',
    coordinates: [-60.0, -15.0],
    number: 50,
    metadata: 'Some meta data about South America'
  },
  {
    name: 'Australia',
    coordinates: [133.0, -25.0],
    number: 60,
    metadata: 'Some meta data about Australia'
  },
  {
    name: 'Antarctica',
    coordinates: [0.0, -75.0],
    number: 70,
    metadata: 'Some meta data about Antarctica'
  }
];


function MapBox() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Starting position [lng, lat]
      zoom: 0.5 // Starting zoom
    });




  continents.forEach(continent => {
    // Create a HTML element for each marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = `<div class="marker-number">${continent.number}</div>`;

    // Create the marker
    new mapboxgl.Marker(el)
      .setLngLat(continent.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h5>${continent.name}</h5><p>${continent.metadata}</p>`
        )
      )
      .addTo(map);
  });

  return () => map.remove();
}, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: '400px', borderRadius: '15px', overflow: 'hidden' }}
      className="mb-4"
    />
  );
}

export default MapBox;

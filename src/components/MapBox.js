import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'bootstrap/dist/css/bootstrap.min.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY29uZ280MyIsImEiOiJjbHlobnY2ZmYwNnFnMmtwYXltNHZ4dnd0In0.vU7P2RervQeRboRS4sEvhA';

function MapBox() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Starting position [lng, lat]
      zoom: 1 // Starting zoom
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: '300px', borderRadius: '15px', overflow: 'hidden' }}
      className="mb-4"
    />
  );
}

export default MapBox;

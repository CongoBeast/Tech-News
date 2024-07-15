import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY29uZ280MyIsImEiOiJjbHlobnY2ZmYwNnFnMmtwYXltNHZ4dnd0In0.vU7P2RervQeRboRS4sEvhA';

const MapBox = ({ data }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1.5
    });

    console.log(data)

    // Add data points to the map
    data.forEach((continent, index) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `Posts: ${continent.posts}`
      );

      new mapboxgl.Marker()
        .setLngLat([continent.longitude, continent.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [data]);

  return <div id="map" style={{ height: '100%' }}></div>;
};

export default MapBox;

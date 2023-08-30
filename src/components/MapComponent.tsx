import { useMemo } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const center = useMemo(() => ({
    lat: -25.2744,
    lng: 133.7751
  }), [])

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
      <Marker position={center} />
    </GoogleMap>
  )
}

export default MapComponent
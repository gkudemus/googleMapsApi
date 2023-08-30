import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import AutocompleteComponent from './components/AutoCompleteComponent'

const MAP_API_KEY = 'AIzaSyDiYQIKZTj5TSasDF6LdLqkowpUfkumb1M'

const containerStyle = {
  width: '100%',
  height: '1100px'
}

const flexContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row'
};

const customAddressBarDiv: React.CSSProperties = {
  paddingRight: '3px'
}

const addPinDiv: React.CSSProperties = {
  paddingTop: '3px'
}

const addPinButton: React.CSSProperties = {
  width: '250px',
  height: '35px'
}

const MapComponent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [markers, setMarkers] = useState<{ id: number; position: { lat: number; lng: number } }[]>([])
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(undefined)

  const updateMapCenter = (lat: number, lng: number) => {
    setMapCenter({ lat, lng })
  }

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setSelectedPlace(place)
  }

  const handleAddPin = () => {
    if (selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
      const newMarkers = [
        ...markers,
        {
          id: markers.length + 1,
          position: {
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng()
          }
        }
      ]
      setMarkers(newMarkers)
      setSelectedPlace(null)
    }
  }

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={['places']}>
      <div>
        <div style={flexContainerStyle}>
          <div style={customAddressBarDiv}>
            <AutocompleteComponent onSelectPlace={handlePlaceSelect} updateMapCenter={updateMapCenter} />
          </div>
          <div style={addPinDiv}>
            <button style={addPinButton} onClick={handleAddPin}>Add Pin</button>
          </div>
        </div>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={mapCenter ? 15 : 4}>
          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  )
}

export default MapComponent;

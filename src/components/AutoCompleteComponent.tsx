import React, { useState, useEffect } from 'react'

interface AutocompleteProps {
  onSelectPlace: (place: google.maps.places.PlaceResult) => void
  updateMapCenter: (lat: number, lng: number) => void
}

const autoCompleteDiv: React.CSSProperties = {
  borderStyle: 'solid', 
  borderWidth: '1px'
}

const ulStyle: React.CSSProperties = {
  width: '600px'
}


const AutocompleteComponent: React.FC<AutocompleteProps> = ({ onSelectPlace, updateMapCenter }) => {
  const [inputValue, setInputValue] = useState('')
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const maxPredictions = 3

  useEffect(() => {
    const autocompleteService = new google.maps.places.AutocompleteService()
    autocompleteService.getPlacePredictions(
      {
        input: inputValue,
        componentRestrictions: { country: 'au' },
      },
      (results: google.maps.places.AutocompletePrediction[] | null) => {
        if (results) {
          setPredictions(results)
        }
      }
    )
  }, [inputValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handlePredictionClick = (prediction: google.maps.places.AutocompletePrediction) => {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'))
    placesService.getDetails({ placeId: prediction.place_id }, (place: google.maps.places.PlaceResult | null) => {
      if (place && place.geometry && place.geometry.location) {
        onSelectPlace(place)
        updateMapCenter(place.geometry.location.lat(), place.geometry.location.lng())
      }
    })
    setInputValue(prediction.description)
    setPredictions([])
  }

  return (
    <div style={autoCompleteDiv}>
      <input
        type="text"
        placeholder="Enter a partial address"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul style={ulStyle}>
        {predictions.slice(0, maxPredictions).map(prediction => (
          <li key={prediction.place_id} onClick={() => handlePredictionClick(prediction)}>
            {prediction.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AutocompleteComponent

import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

import './Autocomplete.css';

class Contents extends Component {
  state = {
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });

      const { position } = this.state
      const lat = position && position.lat()
      const long = position && position.lng()
      this.props.keepLocation(lat, long)
    })
  }

  render() {
    const { position } = this.state
    const { mapContainerStyle } = this.props

    return (
      <div>
        <div>
          <div className="autocomplete-form-place">
            <input
              className="form-control"
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />
          </div>
        </div>

        <div>
          <Map
            {...this.props}
            center={position}
            centerAroundCurrentLocation={false}
            initialCenter={{
              lat: 41.385064,
              lng: 2.173403
            }}
            containerStyle={mapContainerStyle}>
            <Marker position={position} />
          </Map>
        </div>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
);

// const apiKey = process.env.GOOGLE_API_KEY


export default GoogleApiWrapper({
  //apiKey: (process.env.GOOGLE_API_KEY)
  apiKey: ('AIzaSyBzCWhYRwwfSD9p3rjwusoGIEiV4lXvOBA')
})(MapWrapper)


/*
containerStyle={{
              height: {mapHeightStyle},
              position: 'relative',
              width: '100%',
              border: '1px solid #ced4da',
              borderRadius: '.45rem'
            }}
*/
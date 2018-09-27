import React from 'react'
import { GoogleApiWrapper, InfoWindow, Map, Marker, Circle } from 'google-maps-react'
//import Paper from 'material-ui/Paper';
//import Typography from 'material-ui/Typography';
//import { typography } from 'material-ui/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: 41.385064,
      lng: 2.173403
    }
    // binding this to event-handler functions
    //this.onMarkerClick = this.onMarkerClick.bind(this);
    //this.onMapClick = this.onMapClick.bind(this);
  }


  static getDerivedStateFromProps(props, state) {
    if (props.lat !== state.lat || props.lng !== state.lng) 
      return { lat: props.lat, lng: props.lng }

    return null; // Return null to indicate no change to state.
  }

  /*onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }*/
  /*onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }*/
  render() {

    const { lat, lng } = this.state

    const style = {
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        //onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat, lng }}
      >
      {/*<Circle
          strokeColor= {'#FF0000'}
          strokeOpacity= {0.8}
          strokeWeight= {2}
          fillColor= {'#FF0000'}
          fillOpacity= {0.35}
          //map= {map}
          center= {{lat: 44.5452, lng: -78.5389}}
          radius= {100000}
        />*/}
        <Marker
          position = {{ lat, lng }}
        />
        {/*<Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 39.648209, lng: -75.711185 }}
          name = { 'Changing Colors Garage' }
        />*/}
        {/*<InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              Changing Colors Garage
            </Typography>
            <Typography
              component = 'p'
            >
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
            </Typography>
          </Paper>
          </InfoWindow>*/}
      </Map>
    );
  }
}
// const apiKey = process.env.GOOGLE_API_KEY

export default GoogleApiWrapper({
    //apiKey: (process.env.GOOGLE_API_KEY)
    apiKey: ('AIzaSyBzCWhYRwwfSD9p3rjwusoGIEiV4lXvOBA')
})(GoogleMapsContainer)
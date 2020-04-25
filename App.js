import React, { Component }  from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// BU address
const LATITUDE = 42.3601;
const LONGITUDE = -71.0589;
const LATITUDE_DELTA = 0.10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class FourthPage extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.027 ,
        longitudeDelta: LONGITUDE_DELTA,
      },
        NewConfirmed: '',
        TotalConfirmed: '',
        NewDeaths: '',
        TotalDeaths: '',
        NewRecovered: '',
        TotalRecovered: ''
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19api.com/summary')
    .then(response => {
      this.setState({ NewConfirmed: response.data.Global.NewConfirmed });
      this.setState({ TotalConfirmed: response.data.Global.TotalConfirmed });
      this.setState({ NewDeaths: response.data.Global.NewDeaths });
      this.setState({ TotalDeaths: response.data.Global.TotalDeaths });
      this.setState({ NewRecovered:response.data.Global.NewRecovered});
      this.setState({ TotalRecovered: response.data.Global.TotalRecovered});
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {

    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.region}
        showsUserLocation={true}>
      </MapView>

      <View style={styles.textWindow}>
        <Text style={styles.text}> 
          Total Confirmed                New Confirmed {"\n"}{"\n"}                   
          Total Deaths                      New Deaths  {"\n"}{"\n"} 
          Total Recovered                New Recovered  {"\n"}{"\n"} 
        </Text>
        
      </View>
      <View style={styles.dataWindow}>
        <Text style={styles.dataTotal}>
          {this.state.TotalConfirmed}{"\n"}{"\n"}  
          {this.state.TotalDeaths}  {"\n"}{"\n"} 
          {this.state.TotalRecovered} {"\n"}  {"\n"}
        </Text>
        
      </View>
      <View style={styles.dataWindow}>
        <Text style={styles.dataNew}>
          {this.state.NewConfirmed}{"\n"}{"\n"} 
           {this.state.NewDeaths}{"\n"} {"\n"}
          {this.state.NewRecovered}{"\n"} {"\n"}
        </Text>
      </View>
      <View style={styles.dataWindow}>
        <Text style={styles.title}>
          Most Recent Data of Covid-19:
        </Text>
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textWindow: {
    position:'absolute', 
    backgroundColor: 'rgba(52, 52, 52, 0.8)', 
    height: 150,
    top:50, 
    width: width-30,
    borderRadius: 40
  },
  dataWindow: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    height: 200,
    top: 50, 
    width: width,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center', 
    top: 5,
    color: 'white'
  },
  text: {
    left: 30,
    top: 30,
    color: 'white'
  },
  dataTotal: {
    left: 62,
    top: 48,
    color: 'white'
  },
  dataNew: {
    left:width-146,
    top: 48,
    color:'white'
  }
});
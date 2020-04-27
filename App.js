import React, { Component }  from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, Date, Alert, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// BU address
const LATITUDE = 42.3601;
const LONGITUDE = -71.0589;
const LATITUDE_DELTA = 1;
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
      proData: {
        NewConfirmed: '',
        TotalConfirmed: '',
        NewDeaths: '',
        TotalDeaths: '',
        NewRecovered: '',
        TotalRecovered: '',
      },
        NewConfirmed: '',
        TotalConfirmed: '',
        NewDeaths: '',
        TotalDeaths: '',
        NewRecovered: '',
        TotalRecovered: '',
        search: '',
        Procinve: ''
    };
  }

  searchRender(){
    return(
              <View style={styles.proWindow}>
                <Text style = {styles.text}>
                  {this.NewConfirmed}
                </Text>
              </View>
            );
  }

  handleType = (text) => {
    if(text.nativeEvent === undefined){
      return;    
    }
    this.setState({search: text.nativeEvent.text})
  }

  handleSearch (){
    axios.get('https://api.covid19api.com/summary')
    .then(function (response) {
      var i = 0;
      var target;
      if(response!==undefined){
        while(response.data.Countries[i]!==undefined){
          if (response.data.Countries[i].Country === 'Afghanistan'){
            console.log('found!');
            target = response.data.Countries[i];
            console.log('changeComplete');
            break;
          }
          i++;
        }
          console.log('confirmed',this.state.TotalConfirmed);
          this.setState({
            region:{
            latitude: 40,
            longitude: 40,
            latitudeDelta: 0.1
            },
            proData:{
              TotalConfirmed: target.TotalConfirmed,
              TotalDeaths: target.Global.TotalDeaths,
              TotalRecovered: target.Global.TotalRecovered
            }
          });
        
      }
      
    })
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
    console.log("api called")
  }

  render() {
    return(
      <View 
        style={styles.container}
      >
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChange}>
          
            <MapView.Marker
            coordinate={{ 
              "latitude": this.state.region.latitude,   
              "longitude": this.state.region.longitude }}
              title={"Location"}
              draggable/>
          </MapView>
  
          <View style={styles.textWindow}>
            <Text style={styles.text}> 
              Total Confirmed                New Confirmed {"\n"}{"\n"}                   
              Total Deaths                      New Deaths  {"\n"}{"\n"} 
              Total Recovered                New Recovered  {"\n"}{"\n"} 
            </Text>
            
          </View>
          <View style={styles.dataWindow}
          onPress>
            <Text style={styles.dataTotal}>
              {this.state.TotalConfirmed}{"\n"}{"\n"}  
              {this.state.TotalDeaths}  {"\n"}{"\n"} 
              {this.state.TotalRecovered} {"\n"}  {"\n"}
            </Text>
            
          </View>

          <View style={styles.proWindow}>
            <Text style={styles.title}>
            Most Recent Data of the Country
            </Text>
            <Text style={styles.text2}>
              {this.state.proData.TotalConfirmed}    {this.state.proData.TotalDeaths}     {this.state.proData.TotalRecovered} 
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
              Most Recent Data of the global:
            </Text>
          </View>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "    Input Country Name to Search"
            placeholderTextColor = "#9a73ef"
            autoCapitalize = "none"
            onSubmitEditing = {this.handleSearch}/>
          <TouchableOpacity style = {styles.touch}
          onPress = {this.handleSearch}>
          <Text style = {{
            color: 'white',
            textAlign:'center'}}>Search</Text>
          </TouchableOpacity>
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
  proWindow: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: 60,
    top: height-250,
    width:width-30,
    borderRadius: 40
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
  text2: {
    top: 15,
    color: 'white',
    textAlign: 'center'
  },
  input: {
    margin: 15,
    top: 150,
    left: 10,
    width: width-50,
    height: 50,
    borderColor: '#7a42f4',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20
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
  },
  touch: {
    position: 'absolute',
    top: 500,
    width:width-146,
    backgroundColor: 'rgba(52, 52, 52, 1)',
    borderRadius: 20
  }
});

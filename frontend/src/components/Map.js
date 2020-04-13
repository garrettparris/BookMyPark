import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./app.css";
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Tennis', label: 'Tennis' },
    { value: 'Playground', label: 'Playground' },

  ];
  
class CustomMap extends React.Component {
    state = {
        markers: [],
        activePark: null,
        selectedOption: null,
        filteredmarkers:[]
    }
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption.value)
          );
        let temp = this.state.markers.filter(function (marker) {
            return marker.type == selectedOption.value
        })
        this.setState(
            {filteredmarkers: temp}
        )
        console.log(temp)
        
      };
    callAPI() {
        try {
            var url = 'http://localhost:8000/locations/'
            console.log('call api')
            axios.get(url)
                .then(res => {
                    const data = res.data
                    this.setState({
                        markers: data,
                        filteredmarkers:data,
                    })
                })
                

        } catch (err) {
            console.error(err)
        }
    }
    componentDidMount() {
        this.callAPI()
    }
    setActivePark(park) {
        this.setState({
            activePark:park
        })
    }
    render() {
        const { selectedOption } = this.state;

        return (
            <div>

                <Map center={[43.2557, -79.8711]} zoom={12}>
                    {this.state.activePark && (
                        <Popup
                        position={[
                            this.state.activePark.latitude,
                            this.state.activePark.longitude
                        ]}
                        onClose={() => {
                            this.setActivePark(null);
                        }}
                        >
                            <div>
                            <h2>{this.state.activePark.name}</h2>
                            <p>{this.state.activePark.type} amenity available 10am-4pm</p>
                                
                            <button
                                onClick={() => {
                                    console.log(this.state.activePark);
                                }}>
                                    book this
                            </button>
                        </div>
                        </Popup>
                        )}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Basketball Baseball Tennis Playground Soccer */}
                    <div>
                    
                    </div>
                    {this.state.filteredmarkers.map((park,index) => (
                        <Marker
                        key={index}
                        position={[
                            park.latitude,
                            park.longitude,
                            
                        ]}
                        onClick={() => {
                            this.setActivePark(park);
                            }}
                            
                        />
    
                    ))}
                </Map>
                <Select
        value={selectedOption}
        onChange={this.handleChange}
                    options={options}
                    className='selectdropdown'
      />
            </div>
        )
    }

}

export default CustomMap
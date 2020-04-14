import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "../styles/app.css";
import axios from 'axios';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from "react-datepicker";
import { TimePicker } from 'antd';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
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
        selectedOption: [],
        filteredmarkers: [],
        open: false,
        userName: '',
        userPhoneNumber: '',
        userEmail: '',
        startTime: '',
        endTime: '',
        date: new Date(),
        errorMessage: "Phone Number is invalid",
        error: false,
        response: ''

    }

    handleChange = selectedOption => {
        this.setState({selectedOption:selectedOption});
        if (selectedOption === null || selectedOption.length === 0){
            this.setState({ filteredmarkers: this.state.markers });     
        }else{
            let array = [];
            selectedOption.forEach(element => {
                console.log(element);
                let temp = this.state.markers.filter(function (marker) {
                   
                        return marker.type == element.value
                    })
                
                array = array.concat(temp);
            });
            this.setState({filteredmarkers:array});
        }
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
                        filteredmarkers: data,
                    })
                })
        } catch (err) {
            console.error(err)
        }
    }

    componentDidMount() {
        this.callAPI();
    }

    setActivePark(park) {
        this.setState({ activePark: park });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleNameChange = e => {
        this.setState({ userName: e.target.value });
    }
    // gggg
    handleStartChange = e => {
        this.setState({ startTime: e.target.value });
    }
    handleEndChange = e => {
        this.setState({ endTime: e.target.value });
    }
    handleDateChange = e => {
        this.setState({ date: e});
    }
    handleEmailChange = e => {
        this.setState({ userEmail: e.target.value });
    }
    handlePhoneNumberChange = e => {
        this.setState({ userPhoneNumber: e.target.value });
    }
    handleTimeChange = e => {
        this.setState({ userTimeRange: e.target.value });
    }
    // auth token
    // 8654eda474d9fd24724232f8fd25d6ae
    sendSMS = () => {
        var url = "http://localhost:8000/bookings/"
        try {
            this.phoneValidation(this.state.userPhoneNumber);
            
            axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
                data: {
                    location: 'http://localhost:8000/locations/' + this.state.activePark.id+'/',
                    start: '3:00' ,
                    end: '4:00',
                    date: this.state.date,
                    name: this.state.userName,
                    phone_number: this.state.userPhoneNumber,
                    email: this.state.userEmail,
            }
            
            })
            .catch(error => {
                try { this.setState({
                response: error.response.data
                })} catch (err) {
                console.log(err)
                }
                
                console.log(this.state.errors)
            })
        } catch (err) {
            
            console.log(err.response)
            }

    }

    phoneValidation = (num) => {
        const access = "access_key=647f13bbd61ccd38b02c4c04004f7273";
        const number = "number=" + num;
        const country = "country_code=CA";
        const format = "format=1";

        try {
            var url = 'http://apilayer.net/api/validate?' + access + '&' + number + "&" + country + "&" + format;
            console.log('phone valid')
            axios.post(url)
                .then(res => {
                    console.log(res.data.valid);
                    if (res.data.valid) {
                        this.setState({ error: false });
                    } else {
                        this.setState({ error: true });
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { open, errorMessage, error } = this.state;
        const timeRange = ["10am - 11am", "11am - 12pm", "12pm - 1pm", "1pm - 2pm", "2pm - 3pm", "3pm -4pm"];

        return (
            <div>
                <div style={{ width:'50%', position: "absolute", zIndex:'1000', marginTop:'10px', marginLeft:"20px", display:'grid', gridTemplateColumns:'200px auto'}}>
                <div style={{marginTop:'10px', marginLeft:'10px'}}>Select the amenities: </div>
                <Select
                    isMulti
                    defaultValue={[]}
                    options={options}
                    onChange={this.handleChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
                </div>
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
                                <Button variant="contained" color="primary" onClick={() => {
                                    console.log(this.state.activePark)
                                    this.setState({open:true})
                                }}>Book This Place</Button>

                            </div>
                        </Popup>
                    )}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <div>

                    </div>
                    {this.state.filteredmarkers.map((park, index) => (
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

                {open && <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>{this.state.activePark.name}</DialogTitle>
                    <DialogContent style={{ width: '550px', textAlign: 'center' }}>

                        <hr />
                        <TextField id="standard-basic" label="Name" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handleNameChange} /><br />
                        <TextField id="standard-basic" label="Phone Number" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handlePhoneNumberChange} /><br />
                        <TextField id="standard-basic" label="Email" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handleEmailChange} /><br />
                        <div>
                        <DatePicker
                            style={{ width: '60%', marginBottom: '10px' }}
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                        />
                        </div>
                       
                        <TextField select style={{ width: '60%', marginBottom: '10px' }} label="Time Range"
                            value={this.state.userTimeRange}
                            onChange={this.handleTimeChange}
                        >
                            {timeRange.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField><br />
                      

                        <br />
                        {error && (<div style={{ color: "red" }}>{errorMessage}<br /><br /></div>)}
                        <Button variant="contained" color="primary" onClick={this.sendSMS}>Book This Place</Button>
                        <br /><br />
                    </DialogContent>

                </Dialog>}
            </div>
        )
    }
}


export default CustomMap
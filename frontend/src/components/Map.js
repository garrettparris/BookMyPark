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
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import LoginForm from './Login.js';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import MediaQuery from 'react-responsive'

const options = [
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Tennis', label: 'Tennis' },
    { value: 'Playground', label: 'Playground' },
    { value: 'Garden', label: 'Garden' },


];


class CustomMap extends React.Component {
    state = {
        markers: [],
        activePark: null,
        selectedOption: [],
        filteredmarkers: [],
        open1: false,
        userName: '',
        userPhoneNumber: '',
        attendees: '',
        startTime: '',
        endTime: '',
        date: '',
        errorMessage: "Phone Number is invalid",
        error: false,
        response: '',
        showModal: false,
        blockTime: true,
        filteredOptions: []
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        if (selectedOption === null || selectedOption.length === 0) {
            this.setState({ filteredmarkers: this.state.markers });
        } else {
            let array = [];
            selectedOption.forEach(element => {
                console.log(element);
                let temp = this.state.markers.filter(function (marker) {
                    console.log(marker.area)
                    return marker.type === element.value && marker.area !== 'Muskoka' && marker.area !== 'Orangeville'
                })

                array = array.concat(temp);
            });
            this.setState({ filteredmarkers: array });
        }
    };

    callAPI() {

        try {
            var url = 'https://bookmypark.ca/api/locations/'
            axios.get(url)
                .then(res => {
                    const data = res.data.filter(function (marker) {
                        return marker.area !== 'Muskoka' && marker.area !== 'Orangeville'
                    })
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

    handleClickopen1 = () => {
        this.setState({ open1: true });
    };

    handleClose = () => {
        this.setState({ open1: false });
    };
    handleClickopen2 = () => {
        this.setState({ open2: true });
    };

    handleClose2 = () => {
        this.setState({ open2: false });
    };
    handleNameChange = e => {
        this.setState({ userName: e.target.value });
    }
    handleStartChange = e => {
        this.setState({ startTime: e.target.value });
    }
    handleEndChange = e => {
        this.setState({ endTime: e.target.value });
    }
    handleDateChange = e => {
        this.setState({
            date: e,
            blockTime: false,
        });

    }
    handleNumberChange = e => {
        this.setState({ attendees: e.target.value });
    }
    handlePhoneNumberChange = e => {
        this.setState({ userPhoneNumber: e });
    }
    handleTimeChange = e => {
        const time = e.target.value;
        this.setState({ startTime: time });
        this.setState({ endTime: time + 1 });
    }
    close = () => {
        this.setState({ showModal: false });
    }

    // filterTimeSlots(date) {
    //     axios.get('http://ec2-18-218-36-171.us-east-2.compute.amazonaws.com:8080/bookings?date=' + this.formatDate(this.state.date))
    //         .then(
    //         filtered = res.data
    //     )
    // }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    open = () => {
        this.setState({ showModal: true });
    }

    sendSMS = () => {
        var url = "https://bookmypark.ca/api/bookings/"
        try {
            console.log(this.state.attendees)
            axios({
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + this.props.access
                },
                data: {
                    // owner_id: this.props.uid,
                    attendees: this.state.attendees,
                    location: this.state.activePark.id.toString(),
                    start: this.state.startTime + ':00',
                    end: this.state.endTime + ':00',
                    date: this.formatDate(this.state.date),
                    name: this.props.userName,
                    username: this.props.userName,
                    phone_number: this.state.userPhoneNumber,
                    email: this.props.userEmail,
                }
            }).then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            })
        } catch (err) {
            console.log(err)
        }

        this.handleClickopen2();
        this.handleClose();

    }

    render() {

        const { open1, errorMessage, error, open2 } = this.state;
        const timeRange = [10, 11, 12, 13, 14, 15];
        return (

            <div className={{ flexGrow: 1 }}>
                <div styles={{ paddingTop: '80px' }}>
                    <LoginForm showModal={this.state.showModal} onClose={this.close} />
                </div>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >

                    {/* <div style={{ width: '50%', position: "relative", zIndex: '1000', marginTop: '30px', marginLeft: "20px", display: 'grid', gridTemplateColumns: '200px auto' }}>
                    */}
                    <div style={{ marginTop: '20px', marginLeft: '10px' }}>Select the amenities: </div>
                    <div style={{ width: '50vw', zIndex: '999' }}>
                        <Select
                            isMulti
                            defaultValue={[]}
                            options={options}
                            onChange={this.handleChange}

                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>


                    {/* </div> */}
                    <Map center={[43.2557, -79.8711]} zoom={12} style={{marginBottom:'50px'}}>
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
                                    {
                                        this.props.loggedIn ? (
                                            <Button variant="contained" color="primary" onClick={() => {
                                                console.log(this.state.activePark)
                                                this.setState({ open1: true })
                                            }}>Book This Place</Button>
                                        ) : (
                                                <Button variant="contained" color="primary" onClick={this.open}>Login</Button>
                                            )

                                    }


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
                                position={[park.latitude, park.longitude,]}
                                onClick={() => { this.setActivePark(park); }}
                            />
                        ))}
                    </Map>


                </Grid>
                {open1 && <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open1}>
                    <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>{this.state.activePark.name}</DialogTitle>
                    <DialogContent style={{ width: '400px', height: '65vh', textAlign: 'center' }}>
                        <hr />
                        {/* <TextField id="standard-basic" label="Name" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handleNameChange} /><br /> */}
                        {/* <TextField id="standard-basic" label="Phone Number" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handlePhoneNumberChange} /><br /> */}
                        <PhoneInput
                            country={'ca'}
                            value={this.state.userPhoneNumber}
                            onChange={this.handlePhoneNumberChange}
                        />
                        <TextField id="standard-basic" label="Number of People" style={{ width: '60%', marginBottom: '10px' }} onChange={this.handleNumberChange} /><br />
                        <div>

                            <MediaQuery maxDeviceWidth={1224}>
                            <DatePicker
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    todayButton="Today"
                                    isClearable
                                    minDate={new Date()}
                                    placeholderText="Select Date"
                                    withPortal

                                />
                            </MediaQuery>
                            <MediaQuery minDeviceWidth={1224}>
                            <DatePicker
                                style={{ width: '100%', marginBottom: '10px' }}
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                                todayButton="Today"
                                isClearable
                                minDate={new Date()}
                                placeholderText="Select Date"

                            />
                            </MediaQuery>

                        </div>
                        <TextField
                            select
                            style={{ width: '60%', marginBottom: '10px' }}
                            label={this.state.blockTime ? ('Disabled') : ('Select Time Range')}
                            value={this.state.userTimeRange}
                            onChange={this.handleTimeChange}
                            disabled={this.state.blockTime}
                        >
                            {timeRange.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}:00 - {option + 1}:00
                                </MenuItem>
                            ))}
                        </TextField><br />


                        <br />
                        {error && (<div style={{ color: "red" }}>{errorMessage}<br /><br /></div>)}
                        <Button variant="contained" color="primary" onClick={this.sendSMS} disabled={this.state.blockTime}>Book This Place</Button>
                        <br /><br />
                    </DialogContent>
                </Dialog>}

                {open2 && <Dialog onClose={this.handleClose2} aria-labelledby="simple-dialog-title" open={open2}>
                    <DialogContent style={{ width: '400px', textAlign: 'center', marginTop: '50px' }}>
                        Booking Successful!<br /><br />
                        <Button variant="contained" color="primary" onClick={this.handleClose2} style={{ width: '50%', marginBottom: '50px' }}>OK !</Button>
                    </DialogContent>
                </Dialog>}
            </div>
        )
    }
}
CustomMap.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    access: state.accessToken,
    refresh: state.refeshToken,
    uid: state.uid,
    userName: state.userName,
    userEmail: state.userEmail

});


export default connect(mapStateToProps)(CustomMap);
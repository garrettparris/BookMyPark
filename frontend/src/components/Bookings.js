import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import LoginForm from './Login.js';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';


class Bookings extends React.Component {
    state = {
        showModal: false,
        bookings: []
    }
    dict = {
        Baseball: <SportsBaseballIcon style={{width:'100',height:'100'}}/>,
        Basketball: <SportsBasketballIcon style={{width:'100',height:'100'}}/>,
        Soccer: <SportsSoccerIcon style={{width:'100',height:'100'}}/>,
        Tennis: <SportsTennisIcon style={{width:'100',height:'100'}}/>,
        Garden: <LocalFloristIcon style={{width:'100',height:'100'}}/>,
    }
    open = () => {
        this.setState({ showModal: true });
    }
    close = () => {
        this.setState({ showModal: false });
    }
    getBookings = () => {

        axios.get('https://bookmypark.ca/api/bookings?username=' + this.props.userName)
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({
                    bookings: data
                })
            }

            )
    }
    componentDidMount() {
        this.props.loggedIn ? (this.getBookings()) : (console.log('not logged in'))
    }
    deleteBooking = (id) => {
        axios.delete('https://bookmypark.ca/api/bookings/' + id + '/')
            .then(res => {
                this.getBookings()

        })
    }
    render() {


        return (
            <div>
                <div styles={{ paddingTop: '80px' }}>
                    <LoginForm showModal={this.state.showModal} onClose={this.close} />
                </div>
                {this.props.loggedIn ? (
                    <div>
                        <div style={{ fontSize: '50', textAlign: 'center', padding:'20px'}}>{this.props.userName}'s Active Bookings</div>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing = {2}
                        >
                            {this.state.bookings.map((booking) => (
                                <Grid item xs={12} sm={6} style={{paddingLeft:'10px', paddingRight:'10px',minWidth: 350 }} key={booking.id} >
                                    <Card style={{ minWidth: 350, position:'relative' }}>
                                    <div style={{right:'20px',top:'40px',position:'absolute'}}>
                                    {this.dict[booking.location.type]}
                                            </div>
                                        <CardContent>
                                        
                                        {booking.location.name}
                                        <Typography style={{ fontSize: 14, }} color="textSecondary" gutterBottom>
                                            {booking.location.type}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                        </Typography>
                                        <Typography style={{fontSize: 14,  marginBottom: 4, }} color="textSecondary">
                                            Number of people: {booking.attendees}

                                        </Typography>
                                        <Typography style={{ fontSize: 14, marginBottom: 4, }} color="textSecondary">
                                            Date: {booking.date}
                                        </Typography>
                                        <Typography style={{fontSize: 14,  marginBottom: 4, }} color="textSecondary">

                                            Time: {booking.start} to {booking.end}
                                        </Typography>
                                       
                                            
                                        </CardContent>
                             
                                        
                                    <CardActions>
                                            <Button size="small" onClick={() => { this.deleteBooking(booking.id)}} ><div>Delete</div></Button>
                                    </CardActions>
                                    </Card>
                                    </Grid>
                            )

                            )}

                        </Grid>
                    </div>) : (
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <div style={{ paddingTop: '50px' }}>Want to see your Bookings?</div>
                            <Button variant="contained" color="primary" onClick={this.open}>Login</Button>

                        </Grid>


                    )
                }
            </div>


        )

    }
}

Bookings.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userName: state.userName,
    loggedIn: state.loggedIn,
    uid: state.uid
});


export default connect(mapStateToProps)(Bookings);

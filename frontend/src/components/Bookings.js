import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

class Bookings extends React.Component {

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >

            I LOVE NINA
            </Grid>

        )
    }
}

Bookings.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    uid: state.uid
});


export default connect(mapStateToProps)(Bookings);

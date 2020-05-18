import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
        }
    }

    logout = () =>{
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (<>
            {this.state.loggedIn && (
                <Button style={{ position: 'absolute', bottom: '0', width: '99%', backgroundColor: '#e53935', borderRadius: '0', }} onClick={this.logout}>
                    Logout
                </Button>)}
        </>)
    };
}
      

logout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
});


export default connect(mapStateToProps)(logout);

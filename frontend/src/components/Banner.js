import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';
import img1 from '../assests/images/1.jpg';
import img3 from '../assests/images/3.jpg';
import img4 from '../assests/images/4.jpg';
import img2 from '../assests/images/img2.png';




const useStyles = makeStyles((theme) => ({
//   root: {
//         display: 'flex',
//         textAlign: 'center',
//       paddingTop:'5px'
      
//   },
}));

function ResponsiveBanner(props) {
  const classes = useStyles();


 
    return (
        <div className={classes.root}>

            <div style={{display:'grid', alignItems:'center', gridTemplateColumns:'repeat( auto-fit, minmax(190px, 1fr) )'}}>
            <a href="https://www.hamilton.ca/coronavirus/protect-yourself-and-others"><img src={img1} alt="Affected City Services" style={{ height: '25vh', width: '25vh'}} /></a>
            <a href="https://www.hamilton.ca/coronavirus/how-self-isolate"><img src={img2} alt="Affected City Services" style={{ height: '25vh', width: '25vh'}} /></a>
            <a href="https://www.hamilton.ca/coronavirus/affected-city-services"><img src={img3} alt="Affected City Services" style={{ height: '25vh', width: '25vh' }} /></a>
            <a href="https://www.hamilton.ca/coronavirus/what-do-if-you-have-symptoms-covid-19"><img src={img4} alt="Affected City Services" style={{ height: '25vh', width: '25vh'}} /></a>
            </div>
            
            
            
            
            
            
            
            
            
            <div >
                </div>
    </div>
  );
}

ResponsiveBanner.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default ResponsiveBanner;
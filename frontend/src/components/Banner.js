import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import img1 from '../assests/images/1.jpg';
import img3 from '../assests/images/3.jpg';
import img4 from '../assests/images/4.jpg';
import img2 from '../assests/images/img2.png';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from 'react-responsive'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
//   root: {
//         display: 'flex',
//         textAlign: 'center',
//       paddingTop:'5px'
      
//   },
}));

function ResponsiveBanner(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
 
    return (
        <div className={classes.root}>
            
            {/* <Grid
                container
                direction = "row"
                justify="center"
                alignItems="center"

            >
                <Grid item >
                    <div>
                    <a href="https://www.hamilton.ca/coronavirus/protect-yourself-and-others"><img src={img1} alt="Protect Yourself and Others" style={{height:'25vh'}}/></a>
                    </div>

                </Grid>
                <Grid item >
                    <div>
                        <a href="https://www.hamilton.ca/coronavirus/how-self-isolate"><img src={img2} alt="How to Self-Isolate" style={{ height: '25vh' }} /></a>
                    </div>
                </Grid>
                <Grid item >
                    <div>
                    <a href="https://www.hamilton.ca/coronavirus/affected-city-services"><img src={img3} alt="Affected City Services" style={{height:'25vh', }}/></a>
                    </div>
                </Grid>
                <Grid item >
                    <div>
                    <a href="https://www.hamilton.ca/coronavirus/affected-city-services"><img src={img4} alt="Affected City Services" style={{height:'25vh', }}/></a>

                    </div>

                </Grid>
            
            
            </Grid>     */}
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
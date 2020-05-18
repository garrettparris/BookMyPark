import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import CustomMap from './Map'
import Banner from './Banner'
import { FaTree } from 'react-icons/fa';
import "../styles/app.css";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from '@material-ui/icons/Language';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ExploreIcon from '@material-ui/icons/Explore';
import Sidebar from "./Sidebar";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Avatar from '@material-ui/core/Avatar';
import Bookings from './Bookings';
import { connect} from 'react-redux';
import { Button } from "@material-ui/core";
import LoginForm from './Login.js';
import { useMediaQuery } from 'react-responsive'
import Footer from './Footer'



function ResponsiveDrawer(props) {
  const drawerWidth = 240;
  const { container } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      // [theme.breakpoints.up('sm')]: {
      //   width: `calc(100% - ${drawerWidth}px)`,
      //   marginLeft: drawerWidth,
      //   zIndex: theme.zIndex.drawer + 1,

      // },
      backgroundColor: '#03a9f4',
      zIndex: theme.zIndex.drawer + 1,

    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: theme.zIndex.appBar - 1,
      },
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    mapBox: {
      paddingTop: '64px',
      width: '100%'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    search: {

      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',

    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false)


  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openBooking = () => {
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
  };
  const open = () => {
    setShowModal(true)
  }
  const close = () => {
    setShowModal(false)
  }
  function onClick(e, item) {
    if (item.name === "home") {
      closeBooking();
    } else if (item.name === "booking") {
      openBooking();
    }
  }
  const todayDate = new Date()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const items = [
    { name: "home", label: "Home", Icon: HomeIcon, onClick },
    { name: "booking", label: "My Bookings", Icon: CalendarTodayIcon, onClick },

    {
      name: "account",
      label: "Account",
      Icon: LanguageIcon,
      items: [
        { name: "statements", label: "Govt. Id", onClick },
        { name: "reports", label: "Profile", onClick },
        { name: "reports", label: "COVID-19 Profile", onClick },
        { name: "reports", label: "Preferences", onClick }
      ]
    },
    {
      name: "privacy",
      label: "Privacy",
      Icon: VerifiedUserIcon,
      items: [
        { name: "statements", label: "Govt. Id", onClick }
      ]
    },
    {
      name: "acount",
      label: "Open Amenities Today",
      Icon: ExploreIcon,
      items: [
        { name: "statements", label: "Govt. Id", onClick }
      ]
    }
  ];

  const drawer = (
    <div>
      <Sidebar items={items} />
    </div>
  );

  return (

    <div className={classes.root}>
      <div styles={{ paddingTop: '80px' }}>
                    <LoginForm showModal={showModal} onClose={close} />
                </div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            
            <FaTree style={{ marginBottom: '-4px', marginRight: '5px' }} />

            BookMyPark
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />

          </div> */}
          {isDesktopOrLaptop && <> {props.loggedIn ?
            (<Avatar style={{ backgroundColor: 'orange', marginRight: '20px', right: '0', position: 'absolute' }}>{props.userName[0]}</Avatar>)
            :
            (<Button style={{ marginRight: '20px', right: '0', position: 'absolute' }} variant="contained" color="primary" onClick={open}>Login</Button>)}
            </>
            }
          


        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div>
      </div>
      <div className={classes.mapBox}>
        <div style={{ backgroundColor: 'rgba(1,1,1,0.05)', paddingBottom: '5px', paddingLeft: '20px' }}>City of Hamilton COVID-19 Updates for {months[todayDate.getMonth()]} {todayDate.getDate()}, {todayDate.getFullYear()}</div>
        <div style={{ paddingTop: '5px', padding: '10px', justifyContent: 'center', textAlign: 'center' }}><Banner /></div>


        {!bookingOpen && (<CustomMap></CustomMap>)}
        {bookingOpen && (<Bookings></Bookings>)}
        <Footer style={{zIndex:'999'}}/>

      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
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
export default connect(mapStateToProps)(ResponsiveDrawer);
import React from 'react';
import CustomMap from './Map'
import NavBar from './AppBar.js'
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from '@material-ui/icons/Language';
import Sidebar from "./Sidebar";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ExploreIcon from '@material-ui/icons/Explore';
import { useMediaQuery } from 'react-responsive'

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}

const items = [
  { name: "home", label: "Home", Icon: HomeIcon },
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

class App extends React.Component {

  render(){
    return (
      <div className="App">
        
        <div className='app-nav'>
          <NavBar />
        </div>

      </div>
    );
  }
  
}

export default App;

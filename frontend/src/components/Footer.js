import React from 'react';

class MyFooter extends React.Component{
    
    render() {
        const style = {
            flexShrink: 0,
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex:19999,
            
        }
        return(
            <div>
                <footer style={style}>
                    <p>Made with ❤️ by Garrett Parris</p>
               </footer>
            </div>
        );
    }
}
export default MyFooter
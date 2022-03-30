import React, { useState } from 'react';

const ChangeTimeoutPopupHOC = (Component) => 
function Comp(props){
    const [showchangeTimeoutPopup,setShowchangeTimeoutPopup] = useState(false);

    const changeTimeoutToggleHandler = () => {
        setShowchangeTimeoutPopup(!showchangeTimeoutPopup);
    }
	
	return <Component showchangeTimeoutPopup={showchangeTimeoutPopup} changeTimeoutToggleHandler={changeTimeoutToggleHandler} {...props}/>;
};

export default ChangeTimeoutPopupHOC;   
import React from 'react'
import './Popup.css'
/**
 * creates a pop up framework to be used by the mangemt UI
 * @param {*} props the different buttons to use
 * @returns a pop up tab to be used by the different uis
 */
function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
      </div>
    </div>
  ) : ""; 
}

export default Popup
import React from 'react';
import "./CustomButton.scss";

const customButton = ({ onClick, disabled, label, height, width, fontSize, fontWeight }) => {
  return (
    <div>
        <button className = "custom-button" 
                onClick = {onClick} 
                disabled = {disabled} 
                style = {{height: height, width: width, fontSize: fontSize, fontWeight: fontWeight}}
        >
            {label}
        </button>
    </div>
  );
}

export default customButton;
import React from 'react';
import './index.css';
import SquareView from './squareView';

export default class Square {

    squareClick() {
        alert('Now we have play on the square = ' + this.play);
        this.onClick();
        
    }

    view(props) {  //This is called many times create the view.
        alert("Creating the square view." + this.value + this.play);
        this.onClick = props.onClick;
        let thePlay = this.play;
        if (!thePlay) {
            alert("The play was not set.  Why?");
            thePlay = 'Y';
        }
        let theValue = this.value;
        let theIndex = props.theIndex;
        alert("The index " + theIndex + " square has value of " + theValue + "before rendering.");
        return <SquareView
            onClick={()=>this.squareClick()}
            value={theValue}
            play={thePlay}
        />;
    }
}
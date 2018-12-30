import React from 'react';
import './index.css';
import SquareView from './squareView';

export default class Square {
    squareClick() {
        this.onClick();
        alert('Now we have play = ' + this.play);
    }

    view(props) {  //This is called once and only once to create the view.
        alert("Creating the square." + props.value + props.play);
        this.play = props.play;
        this.onClick = props.onClick;
        return <SquareView
            onClick={()=>this.squareClick()}
            value={props.value}
            play={props.play}
        />;
    }
}
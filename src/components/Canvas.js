import React from 'react';
import {Stage} from '../model.js';

class Canvas extends React.Component {
    state = {
        horizontal: 0,
        vertical: 0
    }

    componentDidMount = () => {
        var canvas=document.getElementById('stage');
        var stage=new Stage(canvas);
        document.addEventListener('keydown', (event) => {
            var key = event.key;
            if (key === 'a' || key === 'A'){
                this.setState({horizontal: -1});
            }
            if (key === 's' || key === 'S'){
                this.setState({vertical: 1});
            }
            if (key === 'd' || key === 'D'){
                this.setState({horizontal: 1});
            }
            if (key === 'w' || key === 'W'){
                this.setState({vertical: -1});
            }
            stage.player.setDirection(this.state.horizontal, this.state.vertical);
        });
        document.addEventListener('keyup', (event) => {
            var key = event.key;
            if (key === 'a' || key === 'A'){
                this.setState({horizontal: 0});
            }
            if (key === 's' || key === 'S'){
                this.setState({vertical: 0});
            }
            if (key === 'd' || key === 'D'){
                this.setState({horizontal: 0});
            }
            if (key === 'w' || key === 'W'){
                this.setState({vertical: 0});
            }
            stage.player.setDirection(this.state.horizontal, this.state.vertical);
            if(key==="e"){
                stage.player.setPickup(true);
            }
        });
        //report the mouse position on click
        canvas.addEventListener("mousemove", function (event) {
                var rect = canvas.getBoundingClientRect();
                var mousePos = {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                };
                // console.log(mousePos.x + ',' + mousePos.y);
            stage.mouseMove(mousePos.x, mousePos.y);
        }, false);
        canvas.addEventListener("click", function (event) {
            var rect = canvas.getBoundingClientRect();
            var mousePos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
            // console.log(mousePos.x + ',' + mousePos.y);
            stage.mouseClick(mousePos.x, mousePos.y);
        }, false);
        setInterval(function(){ stage.animate(); },20);
    }

    render(){
        return (
            <div className="ui_top" id="ui_play">
                <center>
                    <canvas id="stage" width="700" height="700"> </canvas>
                </center>
		    </div>
        );
    }
}

export default Canvas;
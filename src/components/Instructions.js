import React from 'react';

class Instructions extends React.Component {
    render() {
        return (          
            <div className="ui_top" id="ui_instructions">
                <div className="form-top">
                    <ul>
                    <li> Move with <code>wasd</code></li>
                    <li> Boxes restore amunition and health, move next to them and press e</li>
                    <li> Aim with your mouse</li>
                    <li> Mouse click fires</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Instructions;
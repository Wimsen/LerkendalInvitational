import React from 'react';
import {
    BlueInfo
} from '../icons';

export default function InfoMessage(props) {
    return (
        <div className="infoMessage">
            <div className="infoIcon">
                <BlueInfo />
            </div>

            <div className="infoMessageBackground">
                <div className="infoTitle">
                    {props.title}
                </div>
                <div className="infoText">
                    {props.text.map(text => <div key={text}>{text}</div>)}
                </div>
            </div>
        </div>
    );
}

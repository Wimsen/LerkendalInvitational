import React from 'react';

import Header from '../components/Index/Header';

export default function Layout(props) {
    return (
        <div>
            <Header />
            <div className="container">
                {props.children}
            </div>
        </div>
    );
}

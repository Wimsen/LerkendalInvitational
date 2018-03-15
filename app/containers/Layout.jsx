import React from 'react';

import Header from '../components/Index/Header';

export default function Layout(props) {
	return (
		<div>
			<Header />
			<div className="container main-content">{props.children}</div>
		</div>
	);
}

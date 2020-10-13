import ReactDOM from "react-dom";
import React from 'react';
import Table from './Table.js';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {}
    }
	render(){
	  	return (
		  	<React.Fragment>
		  		<Table/>
		  	</React.Fragment>
	  	)
	}
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}

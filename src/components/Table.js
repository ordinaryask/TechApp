import React from 'react';
import axios from 'axios';

const widthUnit = 200;

class Unit extends React.Component{
	render(){
		const style = { width:widthUnit};
		return(
			<div style={style}>{this.props.info}</div>
		)
	}
}

class Line extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			unit:(this.props.unit).split(','),
		};
	}

	getLine(){
		let unit = this.state.unit;
		let line = [];

		for(let i in unit){
			line.push(<Unit info = {unit[i]} />);
		}

		return line;
	}

	render(){
		const style = { width:(this.state.unit).length * widthUnit};
		return(
			<div className='line' style={style}>{this.getLine()}</div>
		)
	}
}

class Table extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			data : [],
	    };
	}
	componentWillMount(){
		axios.post('/',{})
			.then(res => {
				console.log(res.data);
				this.setState({data:res.data});
			});
	}
	getTable(){
		let table = [];
		let data = this.state.data;

		for(var i in data){
			table.push(<Line unit = {data[i]} />);
		}

		return table;
	}

	render(){
		return(
			<div className='table'>{this.getTable()}</div>
		)
	}
}

export default Table;
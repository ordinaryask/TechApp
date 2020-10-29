import React, {useState} from 'react';
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

function Table(props){
	const [data,setData] = useState([]);
	axios.post('/',{})
		.then(res => {
				setData(res.data);
		});
	document.onscroll = () => {
		if(document.scrollingElement.scrollTopMax - document.scrollingElement.scrollTop == 0){
			axios.post('/getTable',{})
				.then(res => {
					setData(res.data);
				});
		}
	}

	let getTable = () =>{
		let table = [];

		for(let i in data){
			table.push(<Line unit = {data[i]} />);
		}

		return table;
	}
	const style = {
		position:'absolute',
		top:'50%',
		width:'200px',
		height:'200px',
		background:'purple'
	}
	return(
		<div className='table'>
			{getTable()}
			<div style = {style}>Hello WORLD!</div>
		</div>

	)
}

export default Table;
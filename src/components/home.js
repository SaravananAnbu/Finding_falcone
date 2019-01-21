import React from 'react';
import isEmpty from 'lodash/isEmpty';

class Home extends React.Component {
	constructor(props) {	
		super(props);
		this.state = {
			planets: [],
			vehicles: [],
			planet_names: [],
			vehicle_names: [],
			Destination1: "",
			Destination2: "",
			Destination3: "",
			Destination4: "",
			token: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e) {
		this.setState({ [e.target.name] : e.target.value })
	}
	componentWillMount() {
		this.props.fetchPlanetList();
		this.props.fetchVehicleList();
		this.props.getToken();
	}
	componentDidUpdate(prevProps) {
		if(prevProps.planets !== this.props.planets) {
			this.setState({ planets: this.props.planets })
		}
		if(prevProps.vehicles !== this.props.vehicles) {
			this.setState({ vehicles: this.props.vehicles })
		}
		if(prevProps.token !== this.props.token) {
			this.setState({ token: this.props.token })
		}
	}
	render() {
		return (
			<div className="container-fluid text-center">
				<div className="row p-5">
					<div className="col-12 m-3">
						<h1>Finding Falcone </h1>	
						<h5 className="text-secondary">Select a Planet you want to Search in</h5>	
					</div>
					<div className="col-3">
						<div className="form-group">
							<label>Destination 1</label>
							<select className="form-control" value={this.state.Destination1} name="Destination1" onChange={this.handleChange}>
								<option>Select Destination</option>
								{	!isEmpty(this.state.planets) &&
									this.state.planets.map((each, i) =>
										<option key={i} value={each.distance}>{each.name}</option>
									)
								}
							</select>
						</div>
					</div>
					<div className="col-3">
						<div className="form-group">
							<label>Destination 2</label>
							<select className="form-control" value={this.state.Destination2} name="Destination2" onChange={this.handleChange}>
								<option>Select Destination</option>
								{	!isEmpty(this.state.planets) &&
									this.state.planets.map((each, i) =>
										<option key={i} value={each.distance}>{each.name}</option>
									)
								}
							</select>
						</div>
					</div>
					<div className="col-3">
						<div className="form-group">
							<label>Destination 3</label>
							<select className="form-control" value={this.state.Destination3} name="Destination3" onChange={this.handleChange}>
								<option>Select Destination</option>
								{	!isEmpty(this.state.planets) &&
									this.state.planets.map((each, i) =>
										<option key={i} value={each.distance}>{each.name}</option>
									)
								}
							</select>
						</div>
					</div>
					<div className="col-3">
						<div className="form-group">
							<label>Destination 4</label>
							<select className="form-control" value={this.state.Destination4} name="Destination4" onChange={this.handleChange}>
								<option>Select Destination</option>
								{	!isEmpty(this.state.planets) &&
									this.state.planets.map((each, i) =>
										<option key={i} value={each.distance}>{each.name}</option>
									)
								}
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



export default Home;
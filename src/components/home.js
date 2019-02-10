import React, {Component} from 'react';
import update from 'react-addons-update';
import isEmpty from 'lodash/isEmpty';
import history from '../history';

class Home extends Component {
	constructor(props) {	
		super();
		this.state = {
			planets: [],
			vehicles: [],
			planet_names: [],
			vehicle_names: [],
			Destination1: "",
			Destination2: "",
			Destination3: "",
			Destination4: "",
			planet_Destination1: "",
			planet_Destination2: "",
			planet_Destination3: "",
			planet_Destination4: "",
			vehicle1: {},
			vehicle2: {},
			vehicle3: {},
			vehicle4: {},
			Time1: 0,
			Time2: 0,
			Time3: 0,
			Time4: 0,
			TimeTaken: 0,
			errors: "",
			result: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.resetAll = this.resetAll.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e) {
		e.preventDefault();
		const { planet_Destination1, planet_Destination2, planet_Destination3, planet_Destination4, vehicle1, vehicle2, vehicle3, vehicle4 } = this.state
		const data = {
			token: this.props.token,
			planet_names: [planet_Destination1, planet_Destination2, planet_Destination3, planet_Destination4],
			vehicle_names: [
				vehicle1.name,
				vehicle2.name,
				vehicle3.name,
				vehicle4.name
			]
		} 
		console.log(data.planet_names.length, data.vehicle_names.length)
		if(planet_Destination1 === "" || planet_Destination2 === "" || planet_Destination3 === "" || planet_Destination4 === "" || isEmpty(vehicle1) || isEmpty(vehicle2) || isEmpty(vehicle3) || isEmpty(vehicle4)){
			this.setState({ errors : "Please Fill all the Fields"})
		} else {
			this.props.findFalcone(data).then(
				(res) => {
					if(res.status === 200) {
						this.setState({ result: res.data })
						history.push({
							pathname: '/result',
							state: { result: res.data, Time: this.state.Time1+this.state.Time2+this.state.Time3+this.state.Time4 }
						})
					}
				}
			)
		}
		
	}
	resetAll() {
		this.setState({
			Destination1: "",
			Destination2: "",
			Destination3: "",
			Destination4: "",
			planet_Destination1: "",
			planet_Destination2: "",
			planet_Destination3: "",
			planet_Destination4: "",
			vehicle1: {},
			vehicle2: {},
			vehicle3: {},
			vehicle4: {},
			Time1: 0,
			Time2: 0,
			Time3: 0,
			Time4: 0,
			vehicles: this.props.vehicles
		});
	}
	handleDragStart (e, vehicle, i) {
		if(vehicle.total_no > 0 ) {
			e.dataTransfer.setData("vehicle", JSON.stringify(vehicle))
			e.dataTransfer.setData("index", i)
		}
	}
	handleDragOver(e) {
		e.preventDefault();
	}
	handleDrop(e) {
		const data = JSON.parse(e.dataTransfer.getData("vehicle"))
		const i = e.dataTransfer.getData("index");
		const Index = parseInt(i);
		const name = e.target.getAttribute('name');
		console.log(data, name)
		console.log(i, "i")
		if(name === "planet1") {
			if(this.state.Destination1 !== "") {
				if(data.max_distance < parseInt(this.state.Destination1)) {
					this.setState({ errors : "Oops! Vehicle maximum distance is lower than tha Planet distance" })
				} else {
					if(isEmpty(this.state.vehicle1)) {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination1) / data.speed;
						this.setState({
							vehicle1: data,
							Time1: TimeTaken,
							vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}})
						});
					} else {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination1) / data.speed;
						const objIndex = parseInt(this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle1.name))
						this.setState({
							vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
							vehicle1: data,
							Time1: TimeTaken,
						}, () => {
							this.setState({ vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}}) })
						});
					}
				}
			} else {
				this.setState({ errors : "Please select the Destination 1" })
			}
		}
		if(name === "planet2") {
			if(this.state.Destination2 !== "") {
				if(data.max_distance < parseInt(this.state.Destination2)) {
					this.setState({ errors : "Oops! Vehicle maximum distance is lower than tha Planet distance" })
				} else {
					if(isEmpty(this.state.vehicle2)) {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination2) / data.speed;
						this.setState({
							vehicle2: data,
							Time2: TimeTaken,
							vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}})
						})
					} else {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination2) / data.speed;
						debugger;
						const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle2.name);
						this.setState({
							vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
							vehicle2: data,
							Time2: TimeTaken,
						}, () => {
							this.setState({ vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}}) })
						});
					}
				}
			} else {
				this.setState({ errors : "Please select the Destination 2" })
			}
		}
		if(name === "planet3") {
			if(this.state.Destination3 !== "") {
				if(data.max_distance < parseInt(this.state.Destination3)) {
					this.setState({ errors : "Oops! Vehicle maximum distance is lower than tha Planet distance" })
				} else {
					if(isEmpty(this.state.vehicle3)) {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination3) / data.speed;
						this.setState({
							vehicle3: data,
							Time3: TimeTaken,
							vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}})
						})
					} else {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination2) / data.speed;
						const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle1.name);
						this.setState({
							vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
							vehicle3: data,
							Time3: TimeTaken,
						}, () => {
							this.setState({ vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}}) })
						});
					}
				}
			} else {
				this.setState({ errors : "Please select the Destination 3" })
			}
		}
		if(name === "planet4") {
			if(this.state.Destination4 !== "") {
				if(data.max_distance < parseInt(this.state.Destination4)) {
					this.setState({ errors : "Oops! Vehicle maximum distance is lower than tha Planet distance" })
				} else {
					if(isEmpty(this.state.vehicle4)) {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						}
						const TimeTaken = parseInt(this.state.Destination4) / data.speed;
						this.setState({
							vehicle4: data,
							Time4: TimeTaken,
							vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}})
						})
					} else {
						if(data.total_no > 1) {
							data.total_no = data.total_no - 1
						} 
						const TimeTaken = parseInt(this.state.Destination4) / data.speed;    
						const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle4.name);
						this.setState({
							vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
							vehicle4: data,
							Time4: TimeTaken,
						}, () => {
							this.setState({ vehicles: update(this.state.vehicles, { [Index]: { total_no: { $set: this.state.vehicles[i].total_no - 1 }}}) })
						});
					}
				}
			} else {
				this.setState({ errors : "Please select the Destination 4" })
			}
		}
	}
	handleChange(e) {
		const index = e.nativeEvent.target.selectedIndex;
		const name = e.nativeEvent.target[index].text;
		e.preventDefault();
		this.setState({ [e.target.name] : e.target.value, [`planet_${e.target.name}`]:  name })
		const planetName = e.target.name;
		console.log(e.target.name)
		if(planetName === "Destination1") {
			if(!isEmpty(this.state.vehicle1)) {
				const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle1.name);
				this.setState({
					vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
					vehicle1: {},
					Time1: 0,
				});
			}
		}
		if(planetName === "Destination2") {
			if(!isEmpty(this.state.vehicle2)) {
				const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle2.name);
				this.setState({
					vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
					vehicle2: {},
					Time2: 0,
				});
			}
		}
		if(planetName === "Destination3") {
			if(!isEmpty(this.state.vehicle3)) {
				const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle3.name);
				this.setState({
					vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
					vehicle3: {},
					Time3: 0,
				});
			}
		}
		if(planetName === "Destination4") {
			if(!isEmpty(this.state.vehicle4)) {
				const objIndex = this.state.vehicles.findIndex(obj => obj.name === this.state.vehicle4.name);
				this.setState({
					vehicles: update(this.state.vehicles, { [objIndex]: { total_no: { $set: this.state.vehicles[objIndex].total_no + 1 }}}),
					vehicle4: {},
					Time4: 0,
				});
			}
		}
	}
	componentWillMount() {
		this.props.fetchPlanetList();
		this.props.fetchVehicleList();
		this.props.getToken();
	}
	componentDidMount() {
		if(!isEmpty(this.props.location.state)) {
			if(this.props.location.state.resetAll) {
				this.resetAll()
			}
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.planets !== this.props.planets) {
			this.setState({ planets: this.props.planets })
		}
		if(prevProps.vehicles !== this.props.vehicles) {
			this.setState({ vehicles: this.props.vehicles })
		}
		if(prevState.errors !== this.state.errors) {
			setTimeout(() => this.setState({ errors: "" }), 1500)
		}
	}
	render() {
		const { vehicle1, vehicle2, vehicle3, vehicle4, 
				Destination1, Destination2, Destination3, Destination4,
				planet_Destination1, planet_Destination2, planet_Destination3, planet_Destination4,
				Time1, Time2, Time3, Time4
			 } = this.state
		return (
			<div className="container-fluid text-center">
				<div className="row pl-3 pr-3 pb-2 pt-1">
					<div className="col-12 m-0 p-0">
						<span className="float-right"><a href="https://www.geektrust.in">Geektrust Home</a></span>
					</div>
					<div className="col-12">
						<h3>Finding Falcone </h3>	
						<h6 className="text-secondary">Select a Planet you want to Search in</h6>	
					</div>
					<div className="col-12 mt-4">
						<div className="row">
							<div className="col-2">
								{this.state.vehicles.map((vehicle, i) => 
									<div 
										key={i} 
										draggable={vehicle.total_no !== 0} 
										className="card mb-3" 
										style={{ pointerEvents: 'all', cursor: vehicle.total_no === 0 ? 'not-allowed' : 'pointer'}} 
										onDragStart={(e) => this.handleDragStart(e, vehicle, i)}
									>
										<div className="card-body text-center p-2">
											<h5 className="text-secondary">{vehicle.name}</h5>
											<h3 className="">{vehicle.total_no}</h3>
											<small>
												Max Distance: <span>{vehicle.max_distance}</span>
											</small>
										</div>
										
									</div>
								)}
							</div>
							<div className="col-10">
								<div className="row justify-content-center">
									<div className="col-3">
										<div className="form-group">
											<label>Destination 1</label>
											<select className="form-control" value={this.state.Destination1} name="Destination1" onChange={this.handleChange}>
												<option>Select Destination</option>
												{	!isEmpty(this.state.planets) &&
													this.state.planets.map((each, i) =>
														(
															parseInt(this.state.Destination2) !== parseInt(each.distance) &&
															parseInt(this.state.Destination3) !== parseInt(each.distance) &&
															parseInt(this.state.Destination4) !== parseInt(each.distance)
														) &&
														<option key={i} value={each.distance}>{each.name}</option>
													)
												}
											</select>
											
										</div>
										<div 
											name="planet1"
											className="card mb-3" 
											style={{ height: 200, pointerEvents: 'all' }} 
											onDragOver={(e) => this.handleDragOver(e)}
											onDrop={(e) => this.handleDrop(e)}
										>
											{ !isEmpty(this.state.vehicle1) &&
												<div className="card-body text-center p-2" style={{ pointerEvents: "none"}}>
													<h5 className="text-secondary"><small>Planet name:</small> {planet_Destination1}</h5>
													<h5 className="text-secondary"><small>Distance:</small> {Destination1}</h5>
													<h5 className="text-secondary">{vehicle1.name}</h5>
													<h3 className="">{vehicle1.total_no}</h3>
													<small>
														Max Distance: <span>{vehicle1.max_distance}</span>
													</small>	
												</div>
											}
										</div>
									</div>
									<div className="col-3">
										<div className="form-group">
											<label>Destination 2</label>
											<select className="form-control" value={this.state.Destination2} name="Destination2" onChange={this.handleChange}>
												<option>Select Destination</option>
												{	!isEmpty(this.state.planets) &&
													this.state.planets.map((each, i) =>
														(
															parseInt(this.state.Destination1) !== parseInt(each.distance) &&
															parseInt(this.state.Destination3) !== parseInt(each.distance) &&
															parseInt(this.state.Destination4) !== parseInt(each.distance)
														) &&
														<option key={i} value={each.distance}>{each.name}</option>
													)
												}
											</select>
										</div>
										<div 
											name="planet2"
											className="card" 
											style={{ height: 200, pointerEvents: 'all' }} 
											onDragOver={(e) => this.handleDragOver(e)}
											onDrop={(e) => this.handleDrop(e)}
											>
											{ !isEmpty(this.state.vehicle2) &&
												<div className="card-body text-center p-2" style={{ pointerEvents: "none"}}>
													<h5 className="text-secondary"><small>Planet name:</small> {planet_Destination2}</h5>
													<h5 className="text-secondary"><small>Distance:</small> {Destination2}</h5>
													<h5 className="text-secondary">{vehicle2.name}</h5>
													<h3 className="">{vehicle2.total_no}</h3>
													<small>
														Max Distance: <span>{vehicle2.max_distance}</span>
													</small>
												</div>
											}
										</div>
									</div>
									<div className="col-3">
										<div className="form-group">
											<label>Destination 3</label>
											<select className="form-control" value={this.state.Destination3} name="Destination3" onChange={this.handleChange}>
												<option>Select Destination</option>
												{	!isEmpty(this.state.planets) &&
													this.state.planets.map((each, i) =>
														(
															parseInt(this.state.Destination1) !== parseInt(each.distance) &&
															parseInt(this.state.Destination2) !== parseInt(each.distance) &&
															parseInt(this.state.Destination4) !== parseInt(each.distance)
														) &&
														<option key={i} value={each.distance}>{each.name}</option>
													)
												}
											</select>
										</div>
										<div 
											name="planet3"
											className="card" 
											style={{ height: 200, pointerEvents: 'all' }} 
											onDragOver={(e) => this.handleDragOver(e)}
											onDrop={(e) => this.handleDrop(e)}
											>
											{ !isEmpty(this.state.vehicle3) &&
												<div className="card-body text-center p-2" style={{ pointerEvents: "none"}}>
													<h5 className="text-secondary"><small>Planet name:</small> {planet_Destination3}</h5>
													<h5 className="text-secondary"><small>Distance:</small> {Destination3}</h5>
													<h5 className="text-secondary">{vehicle3.name}</h5>
													<h3 className="">{vehicle3.total_no}</h3>
													<small>
														Max Distance: <span>{vehicle3.max_distance}</span>
													</small>
												</div>
											}
										</div>
									</div>
									<div className="col-3">
										<div className="form-group">
											<label>Destination 4</label>
											<select className="form-control" value={this.state.Destination4} name="Destination4" onChange={this.handleChange}>
												<option>Select Destination</option>
												{	!isEmpty(this.state.planets) &&
													this.state.planets.map((each, i) =>
														(
															parseInt(this.state.Destination1) !== parseInt(each.distance) &&
															parseInt(this.state.Destination2) !== parseInt(each.distance) &&
															parseInt(this.state.Destination3) !== parseInt(each.distance)
														) &&
														<option key={i} value={each.distance}>{each.name}</option>
													)
												}
											</select>
										</div>
										<div 
											name="planet4"
											className="card" 
											style={{ height: 200, pointerEvents: 'all' }} 
											onDragOver={(e) => this.handleDragOver(e)}
											onDrop={(e) => this.handleDrop(e)}
											>
											{ !isEmpty(this.state.vehicle4) &&
												<div className="card-body text-center p-2" style={{ pointerEvents: "none"}}>
													<h5 className="text-secondary"><small>Planet name:</small> {planet_Destination4}</h5>
													<h5 className="text-secondary"><small>Distance:</small> {Destination4}</h5>
													<h5 className="text-secondary">{vehicle4.name}</h5>
													<h3 className="">{vehicle4.total_no}</h3>
													<small>
														Max Distance: <span>{vehicle4.max_distance}</span>
													</small>
												</div>
											}
										</div>
									</div>
									<div className="col-12 mt-4">
										<div className="row justify-content-center">
											<div className="col-3">
												<div className="input-group text-center">
													<div className="input-group-prepend text-center">
														<div className="input-group-text" id="basic-addon1">Time Taken</div>
														<div className="form-control" style={{ width: 150 }}>{Time1+Time2+Time3+Time4}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-3 mt-4 text-right">
										<button className="btn btn-outline-secondary pl-5 pr-5" onClick={this.resetAll}>Reset</button>
									</div>
									<div className="col-3 mt-4 text-left">
										<div className="btn btn-outline-secondary pl-5 pr-5" onClick={this.handleSubmit}>Submit</div>
									</div>
								</div>
								<div className="col-8 text-center m-auto pt-4">
									{ this.state.errors !== "" &&
										<div className="alert alert-danger alert-dismissible fade show" role="alert">
										<p className="m-0">{this.state.errors}</p>
										<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.setState({ errors: ""})}>
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position:'fixed', bottom: 0, left: 0, right:0 }}><p className="text-center">Coding Problem - www.geektrust.in/finding-falcone</p></div>
			</div>
		);
	}
}



export default Home;
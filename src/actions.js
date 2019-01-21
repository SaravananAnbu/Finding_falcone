import axios from 'axios';

const headers = {
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
 }

export const fetchPlanets = (planets) => {
	return {
		type: 'FETCH_PLANET_LIST',
		planets
	}
}

export const fetchVehicles = (vehicles) => {
	return {
		type: 'FETCH_VEHICLES_LIST',
		vehicles
	}
}

export const fetchToken = (token) => {
	return {
		type: 'FETCH_TOKEN',
		token
	}
}

export function fetchPlanetList() {
	return (dispatch) => {
		return axios.get('https://findfalcone.herokuapp.com/planets').then(
			(res) => {
				console.log(res.data)
				dispatch(fetchPlanets(res.data))
			}
		)
	}
}

export function fetchVehicleList() {
	return (dispatch) => {
		return axios.get('https://findfalcone.herokuapp.com/vehicles').then(
			(res) => {
				console.log(res.data)
				dispatch(fetchVehicles(res.data))
			}
		)
	}
}

export function getToken() {
	return (dispatch) => {
		return axios.post('https://findfalcone.herokuapp.com/token',{}, {headers: headers}).then(
			(res) => {
				console.log(res.data)
				dispatch(fetchToken(res.data.token))
			}
		)
	}
}
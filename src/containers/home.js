import { connect } from 'react-redux';
import HomeComponent from '../components/home';
import { fetchPlanetList, fetchVehicleList, getToken, findFalcone } from '../actions';


const mapStateToProps = (state) => {
	return {
		planets: state.FetchReducer.planets,
		vehicles: state.FetchReducer.vehicles,
		token: state.FetchReducer.token
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlanetList: () => dispatch(fetchPlanetList()),
		fetchVehicleList: () => dispatch(fetchVehicleList()),
		getToken: () => dispatch(getToken()),
		findFalcone: (data) => dispatch(findFalcone(data))
	}
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
) (HomeComponent)

export default Home;
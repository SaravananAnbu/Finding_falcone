import { connect } from 'react-redux';
import HomeComponent from '../components/home';
import { fetchPlanetList, fetchVehicleList, getToken } from '../actions';


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
	}
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
) (HomeComponent)

export default Home;
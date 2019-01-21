const initialState = {
	planets: [],
	vehicles: [],
	token: ""
};


const FetchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PLANET_LIST': 
			return Object.assign({}, state, {
				planets: action.planets,
			});	

		case 'FETCH_VEHICLES_LIST': 
			return Object.assign({}, state, {
				vehicles: action.vehicles
			});	
		
		case 'FETCH_TOKEN':
			return  Object.assign({}, state, {
				token: action.token
			});
			
		default:
			return state;
	}
};

export default FetchReducer;

// reducer.js
const initialState = {
    drivers: [],
    loading: true,
    error: null,
};

function driversReducer(state, action) {
    switch (action.type) {
        case 'FETCH_ORDERS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_ORDERS_SUCCESS':
            return { ...state, loading: false, orders: action.payload };
        case 'FETCH_ORDERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export { drivers, initialState };

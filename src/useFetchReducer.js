import { useReducer, useEffect } from 'react';

const initialFetchState = {
    data: [],
    loading: false,
    error: null,
};

function fetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function useFetchReducer(url, initialData = []) {
    const [state, dispatch] = useReducer(fetchReducer, {
        ...initialFetchState, data: initialData,
    });

    useEffect(() => {
        async function fetchData() {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                console.error("Error fetching data:", error);
                dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            }
        }

        fetchData();
    }, [url]);

    return state;
}

export default useFetchReducer;

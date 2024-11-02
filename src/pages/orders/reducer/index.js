const initialState = {
    orders: [],
    loading: false,  // Initialiser à false car le chargement se produit au moment de la requête
    error: null,
};

function ordersReducer(state, action) {
    switch (action.type) {
        case 'FETCH_ORDERS_REQUEST':
            return { ...state, loading: true, error: null }; // Début de la requête
        case 'FETCH_ORDERS_SUCCESS':
            return { ...state, loading: false, orders: action.payload }; // Requête réussie, mettre à jour les commandes
        case 'FETCH_ORDERS_FAILURE':
            return { ...state, loading: false, error: action.payload }; // Gestion de l'erreur
        default:
            return state; // Renvoyer l'état actuel par défaut
    }
}

export { ordersReducer, initialState };

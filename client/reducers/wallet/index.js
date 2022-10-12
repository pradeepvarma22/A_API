const walletReducer = (state, action) => {


    switch (action.type) {
        case WALLET_OPTIONS.SET_WALLET_ADDRESS: return { ...state, walletAddress: action.payload };

        case WALLET_OPTIONS.SET_USER_API_KEY: return { ...state, userApiKey: action.payload };
        case WALLET_OPTIONS.SET_USER_API_ID: return { ...state, userApiId: action.payload };

        case WALLET_OPTIONS.IS_WALLET_CONNECTED: return { ...state, isWalletConnected: action.payload };
        case WALLET_OPTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case WALLET_OPTIONS.PROVIDER: return { ...state, provider: action.payload };
        case WALLET_OPTIONS.SIGNER: return {...state, signer: action.payload};
        default: return state;
    }
}

const WALLET_INITIAL_STATE = {
    walletAddress: "",
    userApiKey: "",
    userApiId:"",
    isWalletConnected: false,
    provider: {},
    error: false,
    signer:{},
    errorMessage: ""
}


const WALLET_OPTIONS = {
    SET_USER_API_KEY: 'SET_USER_API_KEY',
    SET_USER_API_ID: 'SET_USER_API_ID',
    SET_WALLET_ADDRESS: 'SET_WALLET_ADDRESS',

    IS_WALLET_CONNECTED: 'IS_WALLET_CONNECTED',
    PROVIDER: 'PROVIDER',
    ERROR: 'ERROR',
    SIGNER: 'SIGNER'

}



export { walletReducer, WALLET_INITIAL_STATE, WALLET_OPTIONS }
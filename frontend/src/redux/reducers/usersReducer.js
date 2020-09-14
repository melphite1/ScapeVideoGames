const initialState = {
    name: '',
    urlpic: '',
    token: '',
    username: ''
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                name: action.payload.name,
                urlpic: action.payload.urlpic,
                token: action.payload.token,
                username: action.payload.username
            }
        case 'LOGOUT_USER':
            localStorage.clear()
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}


export default usersReducer
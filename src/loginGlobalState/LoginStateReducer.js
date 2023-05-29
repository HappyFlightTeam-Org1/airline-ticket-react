function LoginStateReducer(state, action) {
    switch (action.type) {
        case 'USER':
            return { login: 'USER' };
        case 'ADMIN':
            return { login: 'ADMIN' };
        case '':
            return { login: '' };
        default:
            return state;
    }
}

export default LoginStateReducer;
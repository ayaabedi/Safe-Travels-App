export function flights(state = [], action) {
    switch (action.type) {
        case 'SET_FLIGHTS':
            return action.payload            
        default:
            return state
    }
    

}
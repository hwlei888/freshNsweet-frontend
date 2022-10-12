
import {createStore} from 'redux';

const initialState = {
    currentUser: null,
    quantity: 0,
};


function reducer(state = initialState, action){

    switch(action.type){
        case 'currentUser/set':
            return{
                ...state,
                currentUser: action.payload,
            }
        default:
            console.log('UNMATCHED ACTION:', action);
            return state;
    }

}

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
)

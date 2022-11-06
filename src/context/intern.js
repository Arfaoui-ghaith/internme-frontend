import React from 'react';

const InternStateContext = React.createContext();
const InternDispatchContext = React.createContext();

let intern = null;
const data = localStorage.getItem("intern");

if(data){
    intern = JSON.parse(data);
} else {
    console.error('intern data not found');
}

const internReducer = (state, action) => {
    switch(action.type) {
        case 'SAVE' :
            localStorage.setItem('intern',JSON.stringify(action.payload));
            return {
                ...state,
                intern: action.payload,
            }
        default:
            throw new Error(`Unkonwn action type: ${action.type}`);
    }
}

export const InternProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(internReducer, { intern });

    return (
        <InternDispatchContext.Provider value={dispatch}>
            <InternStateContext.Provider value={state}>
                {children}
            </InternStateContext.Provider>
        </InternDispatchContext.Provider>
    );
}

export const useInternState = () => React.useContext(InternStateContext);
export const useInternDispatch = () => React.useContext(InternDispatchContext);
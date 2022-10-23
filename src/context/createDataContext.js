import React, { useReducer } from "react";
// making reusable function that can use several times inside of our application
// to automate the process of setting up this context stuff and setting up 'Provider' as well

/**
 * action funtion essentially describle how we're going to change our sate object call dispatch
 */
export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: {dispatch} => {return () => {} } }
        // bound
        const boundActions = {};
        for(let key in actions){
            boundActions[key] = actions [key] (dispatch);
        }
        
        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return {Context, Provider};
};

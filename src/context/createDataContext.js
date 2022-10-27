import React, { useReducer } from "react";
// making reusable function that can use several times inside of my application
// to automate the process of setting up this context stuff and setting up 'Provider' as well

/**
 * action funtion essentially describle how i'm going to change our sate object call dispatch
 * In order to create context, I created a separate file inside this context directory -> CreateDataContext.js
 * then inside of createDataContext.js called React Create Context.
 * then created a component that I called provider.
 * The provider right here was kind of a generic component that i could use to manage many different types of resources.
 * The expectation was that our provider would manage some amount of state through the use reducer hook.
 * Then I made that state plus a ton of different functions to modify that state available to all of our different child components.
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

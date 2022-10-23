import React, {useReducer} from 'react';
import createDataContext from './createDataContext';

/**
 * Context is just about moving infomation
 * useReducer(<reducer>, <initialState>)
 * The reducer function contains your custom state logic and the initialStatecan be a simple value but generally will contain an object.
 * The useReducer Hook returns the current state and a 'dispatch' method.
 */


const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogPost':
            return state.filter(blogPost => blogPost.id !== action.payload); 
        
        case 'add_blogPost':
            return [ 
                ...state, 
                { 
                    // create id property
                    id: Math.floor(Math.random() * 9999),        
                    title: `Blog Post #${state.length + 1}`
                }
            ];
        default:
            return state;    
    }
        
};

const addBlogPost = dispatch => {
    return () => {
        // Anytime someone calls addBlogPost -> dispatch an action object
        dispatch({ type: 'add_blogPost' })
    };
    
};
const deleteBlogPost = dispatch => {
    // calling dispatch with some objects that's going to describe how we want to change our state object
    return (id) => {
        dispatch({ type: 'delete_blogPost', payload: id})

    }
}

export const { Context, Provider } = createDataContext(
    blogReducer, 
    {addBlogPost, deleteBlogPost},
    [] // initial state value
    );

// export const BlogProvider = ( {children} ) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);

   
    // create an array of objects, each represents 1 blog post
    // const blogPosts = [
    //     {title: 'Blog Post #1'},
    //     {title: 'Blog Post #2'}
        // Communicate this infomation from our blog provider down to any nested component
        // by take that info and add it into the 'value' prop on the BlogContext.Provider
    //     ]
    
    // use this function to use our setter to add in a new blog post to our blog post variable
    // const addBlogPost = () => {
    //     // Call this setter to update a state variable
    //     setBlogPosts([ 
    //         ...blogPosts, // add all the current blog posts
    //         { title: `Blog Post #${blogPosts.length + 1}`} 
    //     ]);
    // };
    
//     return(
//         <BlogContext.Provider value = {{ data: blogPosts, addBlogPost }}>
//            {children}
//         </BlogContext.Provider>
//     );

// };

// export default BlogContext;

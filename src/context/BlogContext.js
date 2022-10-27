import React, {useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

/**
 * Context is just about moving infomation
 * useReducer(<reducer>, <initialState>)
 * The reducer function contains your custom state logic and the initialStatecan be a simple value but generally will contain an object.
 * The useReducer Hook returns the current state and a 'dispatch' method.
 */


const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogPosts':
            /**
             * Whenever we get a response back from the API, our assumption is that
             * the API is always the total source of truth of information inside of our app
             */
            return action.payload;
        case 'delete_blogPost':
            return state.filter(blogPost => blogPost.id !== action.payload); 
        
        case 'add_blogPost':
            return [ 
                ...state, 
                { 
                    // when new Blog Post is created, it has id, title and content
                    // create id property
                    id: Math.floor(Math.random() * 9999),        
                    // title: `Blog Post #${state.length + 1}`
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
        case 'edit_blogPost':
            // map through all of our different blog posts
           return state.map ((blogPost) =>{
            //ternary expression
                return blogPost.id === action.payload.id
                ? action.payload
                : blogPost;

            // if (blogPost.id === action.payload.id){
            //     return action.payload
            // }
            // else{
            //     return blogPost;
            // }

           }) 
        default:
            return state;    
    }
        
};

const getBlogPosts = dispatch => {
    // making a network request
    return async () => {
        const response = await jsonServer.get('/blogPosts');
        // response.data === [{}, {}, {}]
        // when dispatch, add in all the data that got back from that API
        // then the 'blogReducer' will capture that data and return it

        dispatch({ type: 'get_blogPosts', payload: response.data })
    
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogPosts', {title, content});
    
        // Anytime someone calls addBlogPost -> dispatch an action object
        // payload {key, value}
        // dispatch({ type: 'add_blogPost', payload: {title, content} })
        if(callback){
            callback();
        };
    };
    
};
const deleteBlogPost = dispatch => {
    // calling dispatch with some objects that's going to describe how we want to change our state object
    return async id => {
        await jsonServer.delete(`/blogPosts${id}`)
        dispatch({ type: 'delete_blogPost', payload: id});

    };
}

const editBlogPost = dispatch => {
    return async ( id, title, content, callback ) => {
        // back tick indicates that wanting to use a template string
        // second argument is going to be an object with our updated title and content
        await jsonServer.edit(`/blogPosts${id}`, { title, content });
        dispatch({ 
            type: 'edit_blogPost', 
            payload: {id, title, content} 
        });
        if (callback) {
            callback();
        };
       
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    // empty array because we have a list of blog posts that are going to be coming back from this API
    []
     // initial state value
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

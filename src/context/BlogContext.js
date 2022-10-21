import React, {useState} from 'react';


const BlogContext = React.createContext(); 

export const BlogProvider = ( {children} ) => {
    const [blogPosts, setBlogPosts] = useState([]);

    // create an array of objects, each represents 1 blog post
    // const blogPosts = [
    //     {title: 'Blog Post #1'},
    //     {title: 'Blog Post #2'}
        // Communicate this infomation from our blog provider down to any nested component
        // by take that info and add it into the 'value' prop on the BlogContext.Provider
    //     ]
    
    // use this function to use our setter to add in a new blog post to our blog post variable
    const addBlogPots = () => {
        // Call this setter to update a state variable
        setBlogPosts([ ...blogPosts, { title: `Blog Post #${blogPosts.length + 1}`} ]);// add all the current blog posts
    };
    
    return(
        <BlogContext.Provider value = {{data: blogPosts, addBlogPots}}>
           {children}
        </BlogContext.Provider>
    );

};

export default BlogContext;
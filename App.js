import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { BlogProvider } from './src/context/BlogContext';

  const navigator = createStackNavigator(
    {
      Index: IndexScreen
    },
    {
        // show default screen when start up
        initialRouteName: 'Index',
        defaultNavigationOptions: {
          title: 'Blogs'
        }
    }
  );

  const App = createAppContainer(navigator);
    //wrap the App inside of our own custom component
  export default () => {
    return(
      <BlogProvider>
        {/* pass App in as BlogPrivider's child  */}
          <App />
      </BlogProvider>
    ); 
  };

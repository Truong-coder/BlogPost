import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
    {
      Index: IndexScreen,
      Show: ShowScreen,
      Create: CreateScreen,
      Edit: EditScreen
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
      <Provider>
        {/* pass App in as BlogPrivider's child  */}
          <App />
      </Provider>
    ); 
  };

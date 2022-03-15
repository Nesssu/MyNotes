import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

export default function MyStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen component={Home} name="My Notes"/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
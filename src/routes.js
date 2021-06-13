import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pags/Home';
import MyLinks from './pags/MyLinks';
import { ActivityIndicator } from 'react-native';
import{ Ionicons} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function Routes(){
    return(
        <Drawer.Navigator
            drawerContentOptions={{
                activeBackgroundColor:'#2ccbb9',
                activeTintColor:'#FFF',
                marginTop:16,
                labelStyle:{
                    fontSize:17
                }   
            }}
        >
            <Drawer.Screen
                name= "Home"
                component={Home}
                options={{
                    title:'Encurtar Link',
                    drawerIcon:({focused,size,color}) => (
                        <Ionicons
                            name={focused ? 'cube' : 'cube-outline'}
                            color={color} 
                            size={size}
                        />
                    )   
                }}
            />
            
            <Drawer.Screen
                name= "MyLinks"
                component={MyLinks}
                options={{
                    title:'Meus Links',
                    drawerIcon:({focused,size,color}) => (
                        <Ionicons
                            name={focused ? 'stats-chart' : 'stats-chart-outline'}
                            color={color} 
                            size={size}
                        />
                    )   
                }}
            />
        </Drawer.Navigator>
    )
}

export default Routes;
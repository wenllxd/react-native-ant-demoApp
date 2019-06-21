import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
// 路由配置文件
// 引入页面,新建页面要在这里引入
import BottomNavigator from "../scene/BottomTab/index.js";
import HomeScene from "../scene/Home/HomeScene";
import DemandScene from "../scene/Demand/DemandScene";
import PublishScene from "../scene/Publish/PublishScene";
import SellScene from "../scene/Sell/SellScene";
import MineScene from "../scene/Mine/MineScene";
import LoginScene from "../scene/Mine/LoginScene";
import RegisterScene from "../scene/Mine/RegisterScene";

// 全局导航器
// 此页面写法，写在底部导航的路由不显示header
const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: {
                headerTitle: "12"
            }
        },
        Demand: {
            screen: DemandScene,
            navigationOptions: {
                headerTitle: "13"
            }
        },
        Publish: {
            screen: PublishScene,
            navigationOptions: {
                headerTitle: "14"
            }
        },
        Sell: {
            screen: SellScene,
            navigationOptions: {
                headerTitle: "15"
            }
        },
        Mine: {
            screen: MineScene,
            navigationOptions: {
                headerTitle: "16" //这里优先级比页面内设置title优先级更高
            }
        },
        BottomNavigator: {
            screen: BottomNavigator
        },
        Login: { screen: LoginScene },
        Register: { screen: RegisterScene }
    },
    {
        initialRouteName: "BottomNavigator"
    }
);

const AppContainer = createAppContainer(RootStack);
export default () => <AppContainer />;

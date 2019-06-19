import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import HomeScene from "./scene/Home/HomeScene";
import DemandScene from "./scene/Demand/DemandScene";
import PublishScene from "./scene/Publish/PublishScene";
import SellScene from "./scene/Sell/SellScene";
import MineScene from "./scene/Mine/MineScene";

const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScene
        },
        Demand: { screen: DemandScene },
        Publish: { screen: PublishScene },
        Sell: { screen: SellScene },
        Mine: { screen: MineScene }
    },
    {
        initialRouteName: "Home", // 第一次加载时初始化选项卡路由的routeName
        order: ["Home", "Demand", "Publish", "Sell", "Mine"], // 定义选项卡顺序的数组
        tabBarOptions: {
            activeTintColor: "#e91e63", //活动选项卡的标签文本和图标颜色
            inactiveTintColor: "#8a8a8a",
            labelStyle: {
                fontSize: 14
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                // 三个参数分别为 是否处于活动状态、是否处于横屏、状态颜色
            }
        })
    }
);

const AppContainer = createAppContainer(BottomNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}

import React, { Component } from "react";
import { createBottomTabNavigator } from "react-navigation";

// 引入页面
import HomeScene from "../Home/HomeScene";
import DemandScene from "../Demand/DemandScene";
import PublishScene from "../Publish/PublishScene";
import SellScene from "../Sell/SellScene";
import MineScene from "../Mine/MineScene";
import AuthTest from "../Mine/AuthTest";

// 底部导航器的一个单独配置
const BottomNavigator = createBottomTabNavigator(
    {
        HomeTab: {
            screen: HomeScene,
            navigationOptions: {
                headerTitle: "222"
            }
        },
        DemandTab: {
            screen: DemandScene,
            navigationOptions: {
                headerTitle: "222"
            }
        },
        PublishTab: {
            screen: PublishScene,
            navigationOptions: {
                headerTitle: "222"
            }
        },
        SellTab: {
            screen: SellScene,
            navigationOptions: {
                headerTitle: "222"
            }
        },
        MineTab: {
            screen: MineScene,
            navigationOptions: {
                headerTitle: "222"
            }
        },
        AuthTest: {
            screen: AuthTest,
            navigationOptions: {
                headerTitle: "222"
            }
        }
    },
    {
        initialRouteName: "MineTab", // 第一次加载时初始化选项卡路由的routeName

        //order: ["Home", "Demand", "Publish", "Sell", "Mine"], // 定义选项卡顺序的数组
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
/*
const AppContainer = createAppContainer(BottomNavigator);
export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
*/
export default BottomNavigator;

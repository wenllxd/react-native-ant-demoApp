import React, { Component } from "react";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";

// 引入页面
import HomeScene from "../Home/HomeScene";
import DemandScene from "../Demand/DemandScene";
import PublishScene from "../Publish/PublishScene";
import SellScene from "../Sell/SellScene";
import MineScene from "../Mine/MineScene";
import LoginScene from "../Mine/LoginScene";
import RegisterScene from "../Mine/RegisterScene";

import AuthTest from "../Mine/AuthTest";

// 按这个格式新增路由，如果是子路由就放到对应主路由下，各页面也可以互相调用
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScene,
        navigationOptions: {
            headerTitle: "主页标题"
        }
    }
});
const DemandStack = createStackNavigator({
    Demand: {
        screen: DemandScene,
        navigationOptions: {
            headerTitle: "求标题"
        }
    }
});
const PublishStack = createStackNavigator({
    Publish: {
        screen: PublishScene,
        navigationOptions: {
            headerTitle: "创标题"
        }
    }
});
const SellStack = createStackNavigator({
    Sell: {
        screen: SellScene,
        navigationOptions: {
            headerTitle: "淘标题"
        }
    }
});
const MineStack = createStackNavigator({
    Mine: {
        screen: MineScene,
        navigationOptions: {
            headerTitle: "个人中心"
        }
    },
    Login: {
        screen: LoginScene,
        navigationOptions: {
            headerTitle: "登录"
        }
    },
    Register: {
        screen: RegisterScene,
        navigationOptions: {
            headerTitle: "注册"
        }
    }
});

// 底部导航器的一个单独配置
const BottomNavigator = createBottomTabNavigator(
    {
        Home2: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: "Home2"
            }
        },
        Demand2: {
            screen: DemandStack,
            navigationOptions: {
                tabBarLabel: "Demand2"
            }
        },
        Publish2: {
            screen: PublishStack,
            navigationOptions: {
                tabBarLabel: "Publish2"
            }
        },
        Sell2: {
            screen: SellStack,
            navigationOptions: {
                tabBarLabel: "Sell2"
            }
        },
        Mine2: {
            screen: MineStack,
            navigationOptions: {
                tabBarLabel: "Mine2"
            }
        },
        AuthTest: {
            screen: AuthTest
        }
    },
    {
        initialRouteName: "Mine2", // 第一次加载时初始化选项卡路由的routeName

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
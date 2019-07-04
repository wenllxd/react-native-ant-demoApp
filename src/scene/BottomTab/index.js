import React, { Component } from "react";
import { Text, Button, Image } from "react-native";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
// 引入页面
import PublishScene from "../Publish/PublishScene";
import SellScene from "../Sell/SellScene";
import MineScene from "../Mine/MineScene";

import publishIcon1 from "../../assets/images/publish1.png";
import publishIcon2 from "../../assets/images/publish2.png";
import sellIcon1 from "../../assets/images/sell1.png";
import sellIcon2 from "../../assets/images/sell2.png";
import mineIcon1 from "../../assets/images/mine1.png";
import mineIcon2 from "../../assets/images/mine2.png";

import AuthTest from "../Mine/AuthTest";

const PublishStack = createStackNavigator({
    Publish: {
        screen: PublishScene,
        navigationOptions: {
            headerTitle: "我要创建",
            headerBackTitle: "返回",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#e91e63"
            }
        }
    }
});
const SellStack = createStackNavigator({
    Sell: {
        screen: SellScene,
        navigationOptions: {
            headerTitle: "淘标题",
            headerBackTitle: "返回淘"
        }
    }
});
// 按这个格式新增路由，如果是子路由就放到对应主路由下，各页面也可以互相调用
const MineStack = createStackNavigator({
    Mine: {
        screen: MineScene,
        navigationOptions: {
            headerTitle: "个人中心",
            headerBackTitle: "个人中心",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#e91e63"
            }
        }
    } /*
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
    },
    UserInfo: {
        screen: UserInfoScene,
        navigationOptions: {
            headerBackTitle: "返回"
        }
    },
    UploadAvatar: {
        screen: UploadAvatarScene,
        navigationOptions: {
            headerBackTitle: "返回"
        }
    }*/
});

// 底部导航器的一个单独配置
const BottomNavigator = createBottomTabNavigator(
    {
        Sell2: {
            screen: SellStack,
            navigationOptions: {
                tabBarLabel: "淘",
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={sellIcon2}
                            />
                        );
                    }
                    return (
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={sellIcon1}
                        />
                    );
                }
            }
        },
        Publish2: {
            screen: PublishStack,
            navigationOptions: {
                tabBarLabel: "创",
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={publishIcon2}
                            />
                        );
                    }
                    return (
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={publishIcon1}
                        />
                    );
                }
            }
        },
        Mine2: {
            screen: MineStack,
            navigationOptions: {
                tabBarLabel: "我的",
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={mineIcon2}
                            />
                        );
                    }
                    return (
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={mineIcon1}
                        />
                    );
                }
            }
        }
        /* AuthTest: {
            screen: AuthTest
        }*/
    },
    {
        initialRouteName: "Publish2", // 第一次加载时初始化选项卡路由的routeName

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

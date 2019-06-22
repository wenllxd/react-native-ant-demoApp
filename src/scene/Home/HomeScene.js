import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Button,
    Image,
    StyleSheet,
    Text
} from "react-native";
import homeIcon1 from "../../assets/images/home1.png";
import homeIcon2 from "../../assets/images/home2.png";

// 首页
export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    static navigationOptions = {
        tabBarLabel: "首页",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={homeIcon2} />;
            }
            return <Image style={styles.tabBarIcon} source={homeIcon1} />;
        }
    };

    render() {
        const { navigate, state, setParams } = this.props.navigation;

        console.log(this.props.navigation); //输出Home本页面的navigation
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>首页</Text>
                    <Button
                        title="跳转"
                        onPress={() => {
                            this.props.navigation.navigate("Detail", {
                                // 退回的上一级页面,而不是父页面
                                backRouteName: state.routeName
                            });
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee"
    },
    tabBarIcon: {
        width: 32,
        height: 32
    }
});

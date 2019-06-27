import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Button,
    Image,
    StyleSheet,
    Text,
    StatusBar
} from "react-native";
import TestImg from "./TestImg";

// 首页
export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    render() {
        const { navigate, state, setParams } = this.props.navigation;

        console.log(this.props.navigation); //输出Home本页面的navigation
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="red" />
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
                    <TestImg />
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

import React, { Component } from "react";
import { SafeAreaView, View, Image, StyleSheet, Text } from "react-native";

import sellIcon1 from "../../assets/images/sell1.png";
import sellIcon2 from "../../assets/images/sell2.png";

// 首页
export default class SellScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }
    static navigationOptions = {
        tabBarLabel: "淘",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={sellIcon2} />;
            }
            return <Image style={styles.tabBarIcon} source={sellIcon1} />;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>淘</Text>
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
        width: 22,
        height: 22
    }
});

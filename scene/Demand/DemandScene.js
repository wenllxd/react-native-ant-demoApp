import React, { Component } from "react";
import { SafeAreaView, Image, View, StyleSheet, Text } from "react-native";

const demand1 = require("../../images/demand1.png");
const demand2 = require("../../images/demand2.png");

// 求
export default class DemandScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    static navigationOptions = {
        tabBarLabel: "求",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={demand2} />;
            }
            return <Image style={styles.tabBarIcon} source={demand1} />;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>求页面</Text>
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
        width: 20,
        height: 20
    }
});

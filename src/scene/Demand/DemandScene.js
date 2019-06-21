import React, { Component } from "react";
import { SafeAreaView, Image, View, StyleSheet, Text } from "react-native";

import demandIcon1 from "../../assets/images/demand1.png";
import demandIcon2 from "../../assets/images/demand2.png";

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
                return <Image style={styles.tabBarIcon} source={demandIcon2} />;
            }
            return <Image style={styles.tabBarIcon} source={demandIcon1} />;
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
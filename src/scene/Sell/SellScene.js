import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Image,
    Button,
    StyleSheet,
    Text
} from "react-native";

// 首页
export default class SellScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>淘</Text>
                    <Button
                        title="返回"
                        onPress={() => {
                            this.props.navigation.goBack();
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
    }
});

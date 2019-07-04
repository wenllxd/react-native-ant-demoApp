import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text } from "react-native";
import ShowDialog from "../../components/ShowDialog";

// 首页
export default class SellScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            modalVisible: false,
            selectedValue: ""
        };
    }
    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>淘{this.state.selectedValue}</Text>
                    <Button
                        title="返回"
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    />
                </View>
                <Button
                    title="弹框"
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                />
                <ShowDialog
                    show={this.state.modalVisible}
                    closeModal={(show, selectedValue) => {
                        this.setState({
                            modalVisible: show,
                            selectedValue: selectedValue
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center"
    }
});

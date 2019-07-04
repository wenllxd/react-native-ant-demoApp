import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableHighlight,
    Dimensions
} from "react-native";
import AreaSelector from "../../components/AreaSelector";

const { width, height } = Dimensions.get("window");
const dialogH = 210;

// 用户头像组件
export default class ShowDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            selectedVaule: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isVisible: nextProps.show });
    }

    closeModal = () => {
        this.setState({ isVisible: false });
        this.props.closeModal(false);
    };
    setModalVisible = visible => {
        this.setState({ isVisible: visible });
        this.props.closeModal(false, this.state.selectedValue);
    };

    _selectedChange = param => {
        this.setState({ selectedValue: param });
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                >
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            top: height - 293,
                            width: width,
                            height: dialogH,
                            backgroundColor: "#fff"
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.isVisible);
                            }}
                        >
                            <Text>确定</Text>
                        </TouchableHighlight>
                        <Text
                            style={{
                                alignItems: "center",
                                backgroundColor: "#fff"
                            }}
                        >
                            {this.state.selectedValue}
                        </Text>
                        <AreaSelector
                            onChange={param => {
                                this._selectedChange(param);
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f5fcff"
    },
    modal: {
        flex: 1,
        flexDirection: "row",
        width: 100,

        height: 100,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    }
});

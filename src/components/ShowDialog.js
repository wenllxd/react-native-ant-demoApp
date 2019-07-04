import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableHighlight,
    Dimensions
} from "react-native";
import AreaSelector from "./AreaSelector";

const { width, height } = Dimensions.get("window");
const dialogH = 230; // 底部tab height:83

// 弹出层组件
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
        this.setState({ isVisible: false, selectedValue: "" });
        this.props.closeModal(false, "");
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
                    <View style={styles.modalView}>
                        <View style={styles.operate}>
                            <TouchableHighlight
                                style={styles.cancel}
                                onPress={() => {
                                    this.closeModal(!this.state.isVisible);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>取消</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.confirm}
                                onPress={() => {
                                    this.setModalVisible(!this.state.isVisible);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>确定</Text>
                            </TouchableHighlight>
                        </View>
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
    modalView: {
        position: "absolute",
        left: 0,
        top: height - 313,
        width: width,
        height: dialogH,
        backgroundColor: "#fff"
    },
    operate: {
        flexDirection: "row",
        height: 30,
        lineHeight: 30,
        backgroundColor: "#fff"
    },
    cancel: {
        paddingLeft: 10,
        height: 30,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    confirm: {
        paddingRight: 10,
        height: 30,
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center"
    }
});

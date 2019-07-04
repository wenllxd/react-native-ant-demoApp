import React, { Component } from "react";
import {
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Platform
} from "react-native";
import ShowDialog from "../../components/ShowDialog";

// 首页
export default class PublishScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            modalVisible: false, // 弹出层默认隐藏
            selectedValue: "" // 最后选中的省市
        };
    }
    /*当已经选了城市，再次点开然后点了取消的时候，不想清空值就把这段代码取消注释
    setModalVisible = (visible, selectedValue) => {
       
        var tempValue = "";
        if(selectedValue == ""){
            tempValue = this.state.selectedValue;
        } else{
            tempValue = selectedValue;
        }
        
        this.setState({ modalVisible: visible, selectedValue: selectedValue });
    };
    */

    shouldComponentUpdate(nextProps) {
        const { value, defaultValue } = this.props;
        return (
            Platform.OS !== "ios" ||
            (value === nextProps.value && !nextProps.defaultValue) ||
            (defaultValue === nextProps.defaultValue && !nextProps.value)
        );
    }
    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    render() {
        console.log(this.state.selectedValue);
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.textCell}>名称</Text>
                    <TextInput
                        style={styles.inputCell}
                        placeholder="输入物品名称"
                        autoCapitalize="none"
                        onChangeText={text => {
                            this.setState({ newName: text });
                        }}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.textCell}>价格</Text>
                    <TextInput
                        style={styles.inputCell}
                        placeholder="价格"
                        autoCapitalize="none"
                        onChangeText={text => {
                            this.setState({ newName: text });
                        }}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.textCell}>数量</Text>
                    <TextInput
                        style={styles.inputCell}
                        placeholder="数量"
                        textContentType="telephoneNumber"
                        autoCapitalize="none"
                        onChangeText={text => {
                            this.setState({ newName: text });
                        }}
                    />
                </View>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                >
                    <View style={styles.box}>
                        <Text style={styles.textCell}>省市区</Text>
                        <Text
                            style={
                                this.state.selectedValue == ""
                                    ? [styles.selectCell, styles.lightColor]
                                    : styles.selectCell
                            }
                        >
                            {this.state.selectedValue == ""
                                ? "点击选择"
                                : this.state.selectedValue}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.box}>
                    <Text style={styles.textCell}>详细地址</Text>
                    <TextInput
                        style={styles.inputCell}
                        placeholder="地址"
                        autoCapitalize="none"
                        keyboardType="default"
                        textContentType="addressState"
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.textCell}>物品描述</Text>
                    <TextInput
                        style={styles.inputMulti}
                        placeholder="输入不超过800字"
                        multiline={true}
                        maxLength={800}
                        autoCapitalize="none"
                        onChangeText={text => {
                            this.setState({ newName: text });
                        }}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.textCell}>物品描述</Text>
                    <TextInput
                        style={styles.inputCell}
                        value={this.state.text}
                    />
                </View>

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
        backgroundColor: "#eee"
        //justifyContent: "center"
        //alignItems: "center"
    },
    box: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
        /*width: "95%",
        margin: "auto",
        marginTop: 15
        */
    },
    textCell: {
        flex: 2,
        textAlign: "left",
        height: 50,
        lineHeight: 50,
        fontSize: 18,
        marginLeft: 10
    },
    inputCell: {
        width: "75%",
        height: 50,
        margin: "auto",
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 18
        /*
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
        */
    },
    inputMulti: {
        width: "75%",
        height: 100,
        margin: "auto",
        marginTop: 9,
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 18
    },
    selectCell: {
        width: "75%",
        height: 50,
        lineHeight: 50,
        margin: "auto",
        backgroundColor: "#fff",
        paddingLeft: 10,
        fontSize: 18
    },
    lightColor: {
        color: "#ccc"
    }
});

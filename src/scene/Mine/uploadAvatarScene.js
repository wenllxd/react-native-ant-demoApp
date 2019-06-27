import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
    PixelRatio,
    Dimensions
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
import defaultImg from "../../assets/images/default1.jpeg";
import arrowRight from "../../assets/images/arrowRight.png";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: "",
            image: null,
            avatarSource: null
        };
        this._getAsyncState();
    }
    _getAsyncState = async () => {
        // key为name,值为用户名
        const userToken = await AsyncStorage.getItem("user");
        const userData = JSON.parse(userToken);
        // console.log(userToken); // 输出密码
        //如果有token则跳转到主页，否则跳到登录操作去登录
        if (userToken) {
            this.setState({
                isLogin: true,
                username: userData.name,
                avatarSource: userData.avatar
            });
        } else {
            // Login1 外面的路由
            this.props.navigation.navigate("Login1");
        }
    };

    _updateAvatar = async source => {
        const newAvatar = {
            avatar: source
        };
        const newStr = JSON.stringify(newAvatar);
        const userToken = await AsyncStorage.mergeItem("user", newStr);
        console.log("update:" + userToken);
    };

    //选择图片
    _selectPhotoTapped = () => {
        const options = {
            title: "选择图片",
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "选择照片",
            customButtons: [
                // 自定义按钮
                { name: "fb", title: "Choose Photo from Facebook" }
            ],
            cameraType: "back",
            mediaType: "photo", // 图片或视频
            videoQuality: "high",
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8, // 图片质量
            angle: 0,
            allowsEditing: false,
            noData: false, // 如果为true则禁用data生成base64字段
            storageOptions: {
                skipBackup: true // 不备份到iCloud
            }
        };

        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);
            if (response.didCancel) {
                console.log("User cancelled photo picker");
            } else if (response.error) {
                console.log("ImagePicker Error:", response.error);
            } else if (response.customButton) {
                console.log(
                    "User tapped custom button:",
                    response.customButton
                );
            } else {
                // uri:设备上的本地文件资源
                // data:base64编码的图像数据
                let source = { uri: response.uri };
                console.log("response.uri:" + response.uri);

                //let source = {uri:'data:image/jpeg;base64,'+response.data};
                this._updateAvatar(source);
                this.setState({ avatarSource: source });
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.avatar}>
                    {this.state.avatarSource === null ? (
                        <Image source={defaultImg} style={styles.avatar} />
                    ) : (
                        <Image
                            style={styles.avatar}
                            source={this.state.avatarSource}
                        />
                    )}
                </View>
                <TouchableOpacity
                    style={styles.chooseBtn}
                    onPress={this._selectPhotoTapped}
                >
                    <Text style={{ fontSize: 18 }}>修改头像</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const { width } = Dimensions.get("window"); // 窗口宽度

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee",
        //justifyContent: "center"
        alignItems: "center"
    },
    avatar: {
        width: width,
        height: width,
        //marginBottom: 50,
        borderRadius: 2
    },
    chooseBtn: {
        backgroundColor: "#fff",
        width: "80%",
        marginTop: 35,
        //margin: "auto",
        height: 45,
        lineHeight: 45,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 2
    }
});

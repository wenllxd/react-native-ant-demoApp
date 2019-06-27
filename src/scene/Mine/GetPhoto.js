import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ImagePickerIOS,
    Text,
    View,
    PixelRatio
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
import getphoto from "../../assets/images/getphoto.png";

export default class TestImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: "",
            image: null,
            avatarSource: null
        };
        this._selectPhotoTapped = this._selectPhotoTapped.bind(this);
        console.log(ImagePicker.showImagePicker);
    }

    //选择图片
    _selectPhotoTapped() {
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
                this.setState({ avatarSource: source });
            }
        });
    }

    // 上传图片
    _pickImage = () => {
        // 能获取图片
        //ImagePickerIOS.canUseCamera(() => alert("能获取图片"));
    };
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._selectPhotoTapped}>
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        {this.state.avatarSource === null ? (
                            <Image style={styles.img} source={getphoto} />
                        ) : (
                            <Image
                                style={styles.avatar}
                                source={this.state.avatarSource}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    avatarContainer: {
        //borderColor: "#9B9B9B",
        //borderWidth: 1 / PixelRatio.get(),
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        //borderRadius: 50,
        width: 100,
        height: 100
    },
    img: {
        width: 40,
        height: 40
    }
});

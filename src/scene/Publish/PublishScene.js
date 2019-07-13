import React, { Component } from "react";
import {
    Image,
    View,
    ScrollView,
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    FlatList,
    Alert
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ShowDialog from "../../components/ShowDialog";
import uparrow from "../../assets/images/uparrow.png";
import downarrow from "../../assets/images/downarrow.png";
import upload from "../../assets/images/upload.png";
import "../../assets/data/data2.js";

// 首页
export default class PublishScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            modalVisible: false, // 弹出层默认隐藏
            selectedValue: "", // 最后选中的省市
            num: 0, // 数量,数值类型,输出时要转为字符串
            imageArray: [], // 上传的图片uri数组
            imageLength: 0
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

    componentWillMount() {
        /* get请求
        fetch("https://facebook.github.io/react-native/movies.json")
            .then(res => res.json())
            .then(data => {
                //return data.movies;
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
            */
        /* 提交post请求
        let params = { name: "lxd" };
        fetch("/postForm", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" // 默认发送这个请求
            },
            body: JSON.stringify(params)
        })
            .then(res => {
                if (res.ok) {
                    console.log(res);
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
            */
        /* post提交form格式的数据
        // 创建一个formData,来存请求参数
        let params = new FormData();
        params.append("name", "user2");
        params.append("pwd", "1231100");
        params.append("age", "18");

        fetch("/postForm", {
            method: "POST",
            body: params // 把body从Json换成formData
        })
            .then(res => {
                if (res.ok) {
                    return res;
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        */
        let params = new FormData();
        let file = { uri: "123", type: "multipart/form-data", name: "a.jpg" };
        params.append("images", file);
        params.append("name", "user2");
        fetch("/postForm", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: params
        })
            .then(res => res.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    numFormat = num => {
        let temp = num.replace(/[^\d]+/g, "");
        this.setState({ num: temp });
    };

    // 数量增加
    increaseNum = () => {
        let temp = parseInt(this.state.num) + 1;
        this.setState({
            num: temp >= 100 ? 100 : temp
        });
    };

    // 数量减少
    decreaseNum = () => {
        let temp = parseInt(this.state.num) - 1;
        this.setState({
            num: temp <= 0 ? 0 : temp
        });
    };

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    // 添加图片
    uploadImage = () => {
        const imageList = this.state.imageArray;
        const length = this.state.imageLength;

        if (imageList.length >= 12) {
            Alert.alert("最多上传不超过12张图");
        } else {
            /* 上传单张图片
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image);
                //单选：返回的是一张图片的信息
                let source = { uri: image.path };
                imageList.push(
                    <TouchableOpacity key={key} style={styles.uploadBtn}>
                        <Image source={source} style={styles.uploadImage} />
                    </TouchableOpacity>
                );
                this.setState({ imageArray: imageList, imageLength: key + 1 });
            });
            */
            // 上传多张图片，每次不超过5张
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                multiple: true
            }).then(image => {
                console.log(image);
                //多选：返回的image是数组
                if (image.length + length > 12) {
                    Alert.alert("大于12了");
                } else {
                    image.map((item, index) => {
                        let source = {
                            uri: item.path,
                            width: item.width,
                            height: item.height,
                            name: item.filename,
                            type: item.mime
                        };
                        imageList.push(source);
                    });
                    this.setState({
                        imageArray: imageList,
                        imageLength: length + image.length
                    });
                    console.log(imageList);
                }
            });
            //console.log(this.state.imageArray);
        }
    };

    publish = async () => {
        // 确认提交,提交的时候把imageArray上传,加上用户id字段

        let formData = new FormData();
        formData.append("image", this.state.imageArray);
        formData.append("description", String(data.description));
        let options = {};
    };

    render() {
        return (
            <ScrollView style={styles.container}>
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
                        style={styles.numCell}
                        placeholder="数量"
                        textContentType="telephoneNumber"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        onChangeText={text => {
                            this.numFormat(text);
                        }}
                        value={`${this.state.num}`}
                    />
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.increaseNum();
                            }}
                        >
                            <Image source={uparrow} style={styles.upArrow} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.decreaseNum();
                            }}
                        >
                            <Image
                                source={downarrow}
                                style={styles.downArrow}
                            />
                        </TouchableOpacity>
                    </View>
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
                <View style={styles.boxImage}>
                    <Text style={styles.imageCell}>*注：最多选择12张图片</Text>
                    <View style={styles.imageList}>
                        {this.state.imageArray.map((item, index) => {
                            {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.uploadBtn}
                                    >
                                        <Image
                                            source={item}
                                            style={styles.uploadImage}
                                        />
                                    </TouchableOpacity>
                                );
                            }
                        })}
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => {
                                this.uploadImage();
                            }}
                        >
                            <Image source={upload} style={styles.uploadAdd} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.commit}>
                    <Button
                        color="#fff"
                        title="确定创建"
                        onPress={() => {
                            this.publish();
                        }}
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#f5f5f5"
    },
    box: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    imageCell: {
        textAlign: "left",
        height: 50,
        lineHeight: 50,
        fontSize: 16,
        color: "#555",
        marginLeft: 10
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
    },
    numCell: {
        width: "66%",
        height: 50,
        margin: "auto",
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 18
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
    },
    upArrow: {
        width: 23,
        height: 25,
        borderColor: "#8a8a8a",
        borderWidth: 1,
        marginRight: 10
    },
    downArrow: {
        width: 23,
        height: 25,
        borderColor: "#8a8a8a",
        borderWidth: 1
    },
    boxImage: {
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    imageList: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    uploadBtn: {
        width: 70,
        height: 70,
        margin: 10,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center"
    },
    uploadAdd: {
        width: 50,
        height: 50
    },
    uploadImage: {
        width: 70,
        height: 70,
        margin: 10,
        borderRadius: 2
    },
    commit: {
        backgroundColor: "#e91e63",
        marginTop: 20,
        margin: 10,
        borderRadius: 2,
        padding: 5
    }
});

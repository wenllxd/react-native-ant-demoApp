import React, { Component } from "react";
import { View, StyleSheet, Text, Picker } from "react-native";

import jsonData from "../assets/data/area.json";

// 城市级联选择器组件
export default class AreaSelector extends Component {
    // 默认属性
    static defaultProps = {
        // 默认显示北京
        selectedProvince: "河北省",
        selectedCity: "秦皇岛市",
        selectedArea: "海港区"
    };

    constructor(props) {
        super(props);
        this.state = {
            province: [], // 省
            city: [], // 市
            area: [], // 区
            selectedProvince: this.props.selectedProvince, // 选中的省
            selectedCity: this.props.selectedCity, // 选中的市
            selectedArea: this.props.selectedArea, // 选中的地区
            selecedValue: ""
        };
    }

    componentDidMount() {
        // 初始加载数据
        let province = this._getProvince();
        let city = this._getProvinceCity(province[2]);
        let area = this._getProvinceCityArea(province[2], city[2]);

        this.setState({
            province: province,
            city: city,
            area: area,
            selectedProvince: province[2], // 默认河北省
            selectedCity: city[2], // 秦皇岛市
            selectedArea: area[2] // 海港区
        });
    }

    // 获取全国省:["省1","省2","省3"...]
    _getProvince = () => {
        let result = [];
        for (let code in jsonData) {
            result.push(jsonData[code].name);
        }
        return result;
    };

    // 获取各个省的市[["省1-城市1","省1-城市2","省1-城市3"],["省2-城市1","省2-城市2","省2-城市3"]...]
    _getProvinceCity = province => {
        let result = [];
        let cityData = [];
        for (let code in jsonData) {
            let temp = jsonData[code].name;
            if (temp == province) {
                cityData = jsonData[code].city;
                for (let i in cityData) {
                    result.push(cityData[i].name);
                }
                break;
            }
        }
        return result;
    };

    // 获取各个省市的市区[["省1-城市1-区1","省1-城市1-区2","省1-城市1-区3"...]...]
    _getProvinceCityArea = (province, city) => {
        let result = [];
        let cityData = [];
        for (let code in jsonData) {
            let tempProvince = jsonData[code].name;
            if (tempProvince == province) {
                cityData = jsonData[code].city;
                for (let i in cityData) {
                    //console.log("省" + tempProvince + "城市" + city);
                    let tempCity = cityData[i].name;
                    if (tempCity == city) {
                        //console.log(cityData[i].area);
                        result = cityData[i].area;
                        break;
                    }
                }
            }
        }
        return result;
    };

    _updateProvince = param => {
        let cityData = this._getProvinceCity(param);
        let defaultCity = cityData[0];

        let areaData = this._getProvinceCityArea(param, defaultCity);
        let defaultArea = areaData[0];
        let str = param + " " + defaultCity + " " + defaultArea;

        this.setState({
            selectedProvince: param,
            selectedCity: defaultCity,
            selectedArea: defaultArea,
            city: cityData,
            area: areaData,
            selectedValue: str
        });

        // 给父组件传值
        this.props.onChange(str);
    };

    _updateProvinceCity = param => {
        let areaData = this._getProvinceCityArea(
            this.state.selectedProvince,
            param
        );
        let defaultArea = areaData[0];
        // 最终选择的城市
        let str = this.state.selectedProvince + " " + param + " " + defaultArea;

        this.setState({
            selectedCity: param,
            selectedArea: defaultArea,
            area: areaData,
            selectedValue: str
        });
        // 给父组件传值
        this.props.onChange(str);
    };

    _updateProvinceCityArea = param => {
        let str =
            this.state.selectedProvince +
            " " +
            this.state.selectedCity +
            " " +
            param;
        this.setState({
            selectedArea: param,
            selectedValue: str
        });
        // 给父组件传值
        this.props.onChange(str);
    };

    _renderPicker = key => {
        return <Picker.Item key={key} label={key} value={key} />;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pickerViewContainer}>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.selectedProvince}
                        onValueChange={itemValue => {
                            this._updateProvince(itemValue);
                        }}
                    >
                        {this.state.province.map(key =>
                            this._renderPicker(key)
                        )}
                    </Picker>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.selectedCity}
                        onValueChange={itemValue => {
                            this._updateProvinceCity(itemValue);
                        }}
                    >
                        {this.state.city.map(key => this._renderPicker(key))}
                    </Picker>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.selectedArea}
                        onValueChange={itemValue => {
                            this._updateProvinceCityArea(itemValue);
                        }}
                    >
                        {this.state.area.map(key => this._renderPicker(key))}
                    </Picker>
                </View>
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
        backgroundColor: "#fff"
    },
    pickerViewContainer: {
        flex: 1,
        flexDirection: "row"
    }
});

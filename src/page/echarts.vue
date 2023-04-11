<template>
    <div id="echarts">
        <div class="theBreadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>Echarts</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="searchRoomForm">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="6">
                    <el-col :span="6">
                        <el-form-item label="机房编号">
                            <el-input v-model="form.roomId" placeholder="输入机房编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5.5">
                        <el-form-item label="开始时间">
                            <el-date-picker v-model="form.frontTime" type="datetime" placeholder="选择日期时间"
                                default-time="00:00:00" value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="结束时间">
                            <el-date-picker v-model="form.backTime" type="datetime" placeholder="选择日期时间"
                                default-time="00:00:00" value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询信息</el-button>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="1">
            <el-form-item>
              <el-button type="primary" @click="test">test</el-button>
            </el-form-item>
          </el-col> -->
                </el-row>
            </el-form>
        </div>

        <!-- echarts组件 -->

        <div class="Echarts">
            <div id="lineOfTemperature" style="width: 100%;height:300px;"></div>

            <div id="lineOfWet" style="width:  100%;height:300px;"></div>

            <div id="lineOfRsi" style="width:  100%;height:300px;"></div>
        </div>
    </div>
</template>
  
<script>
import { getRoomInfo } from '@/api/api.js'

export default {
    name: 'Echarts',
    data() {
        return {
            form: {
                roomId: '',
                frontTime: '',
                backTime: ''
            },
            theAirIdList: [],   // airId
            increaseNum: [],    // 自增
            // 单个air的数据
            theAirTemperatureData: [], 
            theAirWetData: [],
            theAirRsiData: [],
            // series数据
            seriesOfTemperature: [],    
            seriesOfWet: [],
            seriesOfRsi: [],
            // echarts对象
            chartOfTemperature: '',
            chartOfWet: '',
            chartOfRsi: '',
            jsonTest: { // 用于生成初始空白表格的数据
                "code": 666,
                "data": [
                    {
                        "averageTemperature": 0,
                        "averageWet": 0,
                        "averageRsi": 0,
                        "details": [
                            {
                                "amWet": 0,
                                "amTime": 0,
                                "amRsi": 0,
                                "amTemperature": 0
                            }
                        ],
                        "airId": "0000",
                        "recordCnt": 0
                    }
                ],
                "airCnt": 0
            },
        }
    },
    methods: {
        onSubmit() {// 查询接口
            console.log('submit!');
            // console.log(this.form);
            // 查询roomId的相关信息
            getRoomInfo(
                JSON.stringify(this.form)
            ).then(res => {
                this.jsonTest = res.data;
                this.updateTheData();
                this.myEcharts();
            });
        },
        updateTheData() {
            // 更新数据得到机房ID对应的区分折线图曲线所需的信息
            this.theAirIdList = []; // 空调ID
            for (let i = 0; i < this.jsonTest.airCnt; i++) {
                this.theAirIdList.push(this.jsonTest.data[i].airId);
            }
            // 好像json是默认有顺序的，先不管顺序尝试处理;这是一个嵌套的二维数组
            this.theAirTemperatureData = [];    // 温度数据
            for (let i = 0; i < this.jsonTest.airCnt; i++) {
                let theTemp = [];
                for (let j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
                    theTemp.push(this.jsonTest.data[i].details[j].amTemperature);
                }
                this.theAirTemperatureData.push(theTemp);
            }
            this.theAirWetData = [];    // 湿度数据
            for (let i = 0; i < this.jsonTest.airCnt; i++) {
                let theTemp = [];
                for (let j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
                    theTemp.push(this.jsonTest.data[i].details[j].amWet);
                }
                this.theAirWetData.push(theTemp);
            }
            this.theAirRsiData = [];    // 电平数据
            for (let i = 0; i < this.jsonTest.airCnt; i++) {
                let theTemp = [];
                for (let j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
                    theTemp.push(this.jsonTest.data[i].details[j].amRsi);
                }
                this.theAirRsiData.push(theTemp);
            }
            this.increaseNum = [];  // 选择一个自增数组作为X轴
            for (let k = 1; k < this.jsonTest.data[0].recordCnt + 1; k++) {
                this.increaseNum.push(k);
            }
            // 整理series
            for (let q = 0; q < this.jsonTest.airCnt; q++) {    // 温度数据
                this.seriesOfTemperature.push({
                    name: this.theAirIdList[q],
                    type: 'line',
                    data: this.theAirTemperatureData[q]
                });
            }
            for (let r = 0; r < this.jsonTest.airCnt; r++) {    // 湿度数据
                this.seriesOfWet.push({
                    name: this.theAirIdList[r],
                    type: 'line',
                    data: this.theAirWetData[r]
                });
            }
            for (let s = 0; s < this.jsonTest.airCnt; s++) {    // 电平数据
                this.seriesOfRsi.push({
                    name: this.theAirIdList[s],
                    type: 'line',
                    data: this.theAirRsiData[s]
                });
            }
        },
        chartsInit() {  // echarts对象初始化
            this.chartOfTemperature = this.$echarts.init(document.getElementById('lineOfTemperature'));
            this.chartOfWet = this.$echarts.init(document.getElementById('lineOfWet'));
            this.chartOfRsi = this.$echarts.init(document.getElementById('lineOfRsi'));
        },
        myEcharts() {
            // 温度折线图
            var option1 = {
                title: {
                    text: '温度'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.theAirIdList
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.increaseNum
                },
                yAxis: {
                    type: 'value',
                    max: 30.0,
                    min: 21.0,
                    interval: 3.0
                },
                series: this.seriesOfTemperature
            };
            this.chartOfTemperature.setOption(option1, true, false, false);
            // 湿度折线图
            var option2 = {
                title: {
                    text: '湿度'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.theAirIdList
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.increaseNum
                },
                yAxis: {
                    type: 'value',
                    max: 100.0,
                    min: 0.0,
                    interval: 20
                },
                series: this.seriesOfWet
            };
            this.chartOfWet.setOption(option2, true, false, false);

            // 电平折线图
            var option3 = {
                title: {
                    text: '电平'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.theAirIdList
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.increaseNum
                },
                yAxis: {
                    type: 'value',
                    max: 240.0,
                    min: 200.0,
                    interval: 10.0
                },
                series: this.seriesOfRsi
            };
            this.chartOfRsi.setOption(option3, true, false, false);
        }
    },
    mounted() {
        this.chartsInit();
        this.updateTheData();
        this.myEcharts();
    },
}
</script>
  
<style>
.align-center {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
}

.searchRoomForm {
    width: 100%;
    height: auto;
    margin-top: 30px;
}

.Echarts {
    margin-top: 20px;
}
</style>
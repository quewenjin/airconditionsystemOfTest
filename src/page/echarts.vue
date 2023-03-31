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
        <div class="EchartsTest">
            <div id="test" style="width: 500px;height:400px;"></div>
        </div>

        <div class="Echarts">
            <div id="lineOfTemperature" style="width: 100%;height:600px;"></div>

            <div id="lineOfWet" style="width:  100%;height:600px;"></div>

            <div id="lineOfRsi" style="width:  100%;height:600px;"></div>
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
            jsonTest: {
                "code": 200,
                "data": [
                    {
                        "averageTemperature": 25.272727272727273,
                        "averageWet": 29.099999999999998,
                        "averageRsi": 219.1,
                        "details": [
                            {
                                "amWet": 23.5,
                                "amTime": 1672502400000,
                                "amRsi": 213.5,
                                "amTemperature": 23.9
                            },
                            {
                                "amWet": 33.6,
                                "amTime": 1672502460000,
                                "amRsi": 223.6,
                                "amTemperature": 26.4
                            },
                            {
                                "amWet": 35.6,
                                "amTime": 1672502520000,
                                "amRsi": 225.6,
                                "amTemperature": 26.9
                            },
                            {
                                "amWet": 34.9,
                                "amTime": 1672502580000,
                                "amRsi": 224.9,
                                "amTemperature": 26.7
                            },
                            {
                                "amWet": 39.2,
                                "amTime": 1672502640000,
                                "amRsi": 229.2,
                                "amTemperature": 27.8
                            },
                            {
                                "amWet": 22.5,
                                "amTime": 1672502700000,
                                "amRsi": 212.5,
                                "amTemperature": 23.6
                            },
                            {
                                "amWet": 39.5,
                                "amTime": 1672502760000,
                                "amRsi": 229.5,
                                "amTemperature": 27.9
                            },
                            {
                                "amWet": 21.7,
                                "amTime": 1672502820000,
                                "amRsi": 211.7,
                                "amTemperature": 23.4
                            },
                            {
                                "amWet": 24.7,
                                "amTime": 1672502880000,
                                "amRsi": 214.7,
                                "amTemperature": 24.2
                            },
                            {
                                "amWet": 20.9,
                                "amTime": 1672502940000,
                                "amRsi": 210.9,
                                "amTemperature": 23.2
                            },
                            {
                                "amWet": 24.0,
                                "amTime": 1672503000000,
                                "amRsi": 214.0,
                                "amTemperature": 24.0
                            }
                        ],
                        "airId": "10001",
                        "recordCnt": 11
                    },
                    {
                        "averageTemperature": 24.763636363636362,
                        "averageWet": 27.05454545454546,
                        "averageRsi": 217.0545454545454,
                        "details": [
                            {
                                "amWet": 23.4,
                                "amTime": 1672502400000,
                                "amRsi": 213.4,
                                "amTemperature": 23.9
                            },
                            {
                                "amWet": 21.2,
                                "amTime": 1672502460000,
                                "amRsi": 211.2,
                                "amTemperature": 23.3
                            },
                            {
                                "amWet": 21.6,
                                "amTime": 1672502520000,
                                "amRsi": 211.6,
                                "amTemperature": 23.4
                            },
                            {
                                "amWet": 21.9,
                                "amTime": 1672502580000,
                                "amRsi": 211.9,
                                "amTemperature": 23.5
                            },
                            {
                                "amWet": 29.0,
                                "amTime": 1672502640000,
                                "amRsi": 219.0,
                                "amTemperature": 25.2
                            },
                            {
                                "amWet": 22.8,
                                "amTime": 1672502700000,
                                "amRsi": 212.8,
                                "amTemperature": 23.7
                            },
                            {
                                "amWet": 21.8,
                                "amTime": 1672502760000,
                                "amRsi": 211.8,
                                "amTemperature": 23.4
                            },
                            {
                                "amWet": 30.6,
                                "amTime": 1672502820000,
                                "amRsi": 220.6,
                                "amTemperature": 25.7
                            },
                            {
                                "amWet": 29.0,
                                "amTime": 1672502880000,
                                "amRsi": 219.0,
                                "amTemperature": 25.2
                            },
                            {
                                "amWet": 38.7,
                                "amTime": 1672502940000,
                                "amRsi": 228.7,
                                "amTemperature": 27.7
                            },
                            {
                                "amWet": 37.6,
                                "amTime": 1672503000000,
                                "amRsi": 227.6,
                                "amTemperature": 27.4
                            }
                        ],
                        "airId": "10002",
                        "recordCnt": 11
                    },
                    {
                        "averageTemperature": 26.5,
                        "averageWet": 33.96363636363637,
                        "averageRsi": 223.9636363636364,
                        "details": [
                            {
                                "amWet": 32.8,
                                "amTime": 1672502400000,
                                "amRsi": 222.8,
                                "amTemperature": 26.2
                            },
                            {
                                "amWet": 27.2,
                                "amTime": 1672502460000,
                                "amRsi": 217.2,
                                "amTemperature": 24.8
                            },
                            {
                                "amWet": 38.3,
                                "amTime": 1672502520000,
                                "amRsi": 228.3,
                                "amTemperature": 27.6
                            },
                            {
                                "amWet": 39.3,
                                "amTime": 1672502580000,
                                "amRsi": 229.3,
                                "amTemperature": 27.8
                            },
                            {
                                "amWet": 35.4,
                                "amTime": 1672502640000,
                                "amRsi": 225.4,
                                "amTemperature": 26.9
                            },
                            {
                                "amWet": 32.6,
                                "amTime": 1672502700000,
                                "amRsi": 222.6,
                                "amTemperature": 26.2
                            },
                            {
                                "amWet": 29.2,
                                "amTime": 1672502760000,
                                "amRsi": 219.2,
                                "amTemperature": 25.3
                            },
                            {
                                "amWet": 38.4,
                                "amTime": 1672502820000,
                                "amRsi": 228.4,
                                "amTemperature": 27.6
                            },
                            {
                                "amWet": 30.6,
                                "amTime": 1672502880000,
                                "amRsi": 220.6,
                                "amTemperature": 25.6
                            },
                            {
                                "amWet": 33.5,
                                "amTime": 1672502940000,
                                "amRsi": 223.5,
                                "amTemperature": 26.4
                            },
                            {
                                "amWet": 36.3,
                                "amTime": 1672503000000,
                                "amRsi": 226.3,
                                "amTemperature": 27.1
                            }
                        ],
                        "airId": "10003",
                        "recordCnt": 11
                    }
                ],
                "airCnt": 3
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
                console.log(res.data)
                // this.tableData = res.data.data
            });
        },
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('test'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            // 得到 机房ID 区分折线图曲线
            var theAirIdList = [];
            for (var i = 0; i < this.jsonTest.airCnt; i++) {
                theAirIdList.push(this.jsonTest.data[i].airId);
            }
            // 好像json是默认有顺序的，先不管顺序尝试处理
            var theAirTemperatureData = [];
            for (var i = 0; i < this.jsonTest.airCnt; i++) {
                var theTemp = [];
                for (var j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
                    theTemp.push(this.jsonTest.data[i].details[j].amTemperature);
                }
                theAirTemperatureData.push(theTemp);
            }
            console.log("theAirTemperatureData")
            console.log(theAirTemperatureData)
            // 温度折线图
            var chartOfTemperature = this.$echarts.init(document.getElementById('lineOfTemperature'));
            var option1 = {
                title: {
                    text: '温度'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                    data: theAirIdList
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: theAirIdList[0],
                        type: 'line',
                        stack: 'Total',
                        // data: [120, 132, 101, 134, 90, 230, 210]
                        data: theAirTemperatureData[0]
                    },
                    {
                        name: theAirIdList[1],
                        type: 'line',
                        // stack: 'Total',
                        // data: [22, 18, 19, 23, 29, 30, 31]
                        data: theAirTemperatureData[1]
                    },
                    {
                        name: theAirIdList[2],
                        type: 'line',
                        // stack: 'Total',
                        // data: [15, 23, 20, 15, 19, 33, 40]
                        data: theAirTemperatureData[2]
                    }
                ]
            };
            chartOfTemperature.setOption(option1);

            // 湿度折线图
            var chartOfWet = this.$echarts.init(document.getElementById('lineOfWet'));
            var option2 = {

            };
            chartOfWet.setOption(option2);

            // 电平折线图
            var chartOfRsi = this.$echarts.init(document.getElementById('lineOfRsi'));
            var option3 = {

            };
            chartOfRsi.setOption(option3);

        }
    },
    mounted() {
        this.myEcharts();
    }
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

.EchartsTest {
    margin-top: 60px;
}

.Echarts {
    margin-top: 60px;
}
</style>
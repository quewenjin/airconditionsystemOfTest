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
            theAirIdList: [],
            increaseNum: [],
            theAirTemperatureData: [],
            chartOfTemperature: '',
            chartOfWet: '',
            chartOfRsi: '',
            jsonTest: {
                "code": 200,
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
                // console.log(res.data)
                this.jsonTest = res.data;
                // console.log("jsonTest111");
                // console.log(this.jsonTest);
                // console.log("theAirIdList111");
                // console.log(this.theAirIdList);
                // console.log("increaseNum111");
                // console.log(this.increaseNum);
                // console.log("theAirTemperatureData111");
                // console.log(this.theAirTemperatureData);
            });
            this.updateTheData();
            this.myEcharts();
        },
        updateTheData() {
            // 得到 机房ID 区分折线图曲线
            this.theAirIdList = [];
            for (var i = 0; i < this.jsonTest.airCnt; i++) {
                this.theAirIdList.push(this.jsonTest.data[i].airId);
            }
            // 好像json是默认有顺序的，先不管顺序尝试处理;这是一个嵌套的二维数组
            this.theAirTemperatureData = [];
            for (var i = 0; i < this.jsonTest.airCnt; i++) {
                var theTemp = [];
                for (var j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
                    theTemp.push(this.jsonTest.data[i].details[j].amTemperature);
                }
                this.theAirTemperatureData.push(theTemp);
            }
            // 选择一个自增数组作为X轴
            this.increaseNum = [];
            for (var k = 1; k < this.jsonTest.data[0].recordCnt + 1; k++) {
                this.increaseNum.push(k);
            }
            // 打印
            // console.log("theAirIdList111");
            // console.log(this.theAirIdList);
            // console.log("increaseNum111");
            // console.log(this.increaseNum);
            // console.log("theAirTemperatureData111");
            // console.log(this.theAirTemperatureData);
        },
        chartsInit() {
            this.chartOfTemperature = this.$echarts.init(document.getElementById('lineOfTemperature'));
            this.chartOfWet = this.$echarts.init(document.getElementById('lineOfWet'));
            this.chartOfRsi = this.$echarts.init(document.getElementById('lineOfRsi'));
        },
        myEcharts() {
            var option1 = {
                title: {
                    text: '温度'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu', 'Fri', 'Sat', 'Sun']
                    data: this.increaseNum
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: this.theAirIdList[0],
                        type: 'line',
                        // stack: 'Total',
                        // data: [120, 132, 101, 134, 90, 230, 210]
                        data: this.theAirTemperatureData[0]
                    },
                    {
                        name: this.theAirIdList[1],
                        type: 'line',
                        // stack: 'Total',
                        // data: [22, 18, 19, 23, 29, 30, 31]
                        data: this.theAirTemperatureData[1]
                    },
                    {
                        name: this.theAirIdList[2],
                        type: 'line',
                        // stack: 'Total',
                        // data: [15, 23, 20, 15, 19, 33, 40]
                        data: this.theAirTemperatureData[2]
                    }
                ]
            };
            this.chartOfTemperature.setOption(option1, true, false, false);

            var option2 = {

            };
            this.chartOfWet.setOption(option2, true, false, false);

            var option3 = {

            };
            this.chartOfRsi.setOption(option3, true, false, false);
        }
    },
    mounted() {
        this.chartsInit();
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

.EchartsTest {
    margin-top: 60px;
}

.Echarts {
    margin-top: 60px;
}
</style>
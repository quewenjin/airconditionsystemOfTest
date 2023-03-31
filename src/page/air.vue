<template>
  <div id="air">
    <div class="theBreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>空调查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="buttonTest">
      <el-button type="primary" @click="test">查询信息</el-button>
    </div>

    <!-- 看看json用的 -->
    <div class="jsonTest">
      <div>
        <!-- <json-viewer :value="[jsonTest.data[jsonTest.data.length].airId]"></json-viewer>for(var p in packJson) -->
        <json-viewer :value="[jsonTest.data[0, jsonTest.airCnt - 1].airId]"></json-viewer>
      </div>
    </div>

  </div>
</template>
  
<script>
export default {
  name: 'Air',
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
    test() {
      var theAirIdList = [];
      for (var k = 0; k < this.jsonTest.airCnt; k++) {
        theAirIdList.push(this.jsonTest.data[k].airId);
      }
      console.log('theAirIdList')
      console.log(theAirIdList)

      var theAirData = [];
      for (var i = 0; i < this.jsonTest.airCnt; i++) {
        var theTemp = [];
        for (var j = 0; j < this.jsonTest.data[i].recordCnt; j++) {
          theTemp.push(this.jsonTest.data[i].details[j].amTemperature);
        }
        console.log(theTemp)
        theAirData.push(theTemp);
      }
      console.log('theAirData')
      console.log(theAirData)
    }
  },
}
</script>
  
<style>
.jsonTest {
  margin-top: 60px;
}

.buttonTest {
  margin-top: 60px;
}
</style>
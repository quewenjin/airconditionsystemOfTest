<template>
  <div id="room">

    <div class="theBreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>机房查询</el-breadcrumb-item>
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
              <el-date-picker v-model="form.frontTime" type="datetime" placeholder="选择日期时间" default-time="00:00:00"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="结束时间">
              <el-date-picker v-model="form.backTime" type="datetime" placeholder="选择日期时间" default-time="00:00:00"
                value-format="timestamp">
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

    <div>
      <!-- 62 -->
      <el-table :data="tableData" style="width: 86%">
        <el-table-column prop="airId" label="空调编号" width="240">
        </el-table-column>
        <el-table-column prop="averageTemperature" label="平均温度" width="240">
        </el-table-column>
        <el-table-column prop="averageWet" label="平均湿度" width="240">
        </el-table-column>
        <el-table-column prop="averageRsi" label="平均电平" width="240">
        </el-table-column>

        <el-table-column label="操作（未开发）" align:right width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详细信息</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>
  
<script>
import { getRoomInfo, userTest } from '@/api/api.js'

export default {
  name: 'Room',
  data() {
    return {
      form: {
        roomId: '',
        frontTime: '',
        backTime: ''
      },
      tableData: [{
        airId: '1001',
        averageTemperature: 25.2,
        averageWet: 29.1,
        averageRsi: 219.1
      }, {
        airId: '1002',
        averageTemperature: 25.2,
        averageWet: 29.1,
        averageRsi: 219.1
      }, {
        airId: '1003',
        averageTemperature: 25.2,
        averageWet: 29.1,
        averageRsi: 219.1
      }]
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
        this.tableData = res.data.data
      });
    },
    test() {// 测试用接口
      console.log("111")
      userTest({
      }).then(res => {
        console.log(res.data)
      });
      console.log("222")
    },
    // 接口方法样例
    onLoad() {
      // 调用api接口，并且提供了两个参数                
      apiAddress({
        type: 0,
        sort: 1
      }).then(res => {
        // 获取数据成功后的其他操作
      })
    }
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
</style>
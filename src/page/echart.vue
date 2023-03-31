<template>
    <div id="echart">
        <div class="theBreadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>Echart</el-breadcrumb-item>
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

    </div>
</template>
  
<script>
import { getRoomInfo } from '@/api/api.js'

export default {
    name: 'Echart',
    data() {
        return {
            form: {
                roomId: '',
                frontTime: '',
                backTime: ''
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
                this.tableData = res.data.data
            });
        }
    }
}
</script>
  
<style></style>
<style scoped>
    .col{
        border-radius: 10px;
        padding-top: 10px;
        padding-left: 10px;
        margin:20px;
    }
    .row{
        margin: 30px auto;
    }
    .bg{
        margin: 20px;
    }
</style>
<template>
    <div class="bg">
        <Row :gutter=40  class="row">
            <Col span="12">
                <div class="col">
                    <div><p>评教老师平均值</p></div>
                    <div>
                        <ve-histogram :data="chartData1" :extend="chartExtend" :mark-line="markLine" :mark-point="markPoint"></ve-histogram>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="col">
                    <div><p>评教老师成绩占比</p>
                    </div>
                    <div>
                        <ve-pie :data="chartData2"></ve-pie>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter=40 class="row">
            <Col>
                <div><p>单个教师不同课程成绩分析</p>
                    </div>
                <div class="col">
                    <Select v-model="teacher_name" style="width:200px" @on-change='select'>
                        <Option v-for="item in teacherList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </div>
                <div>
                    <ve-histogram :data="chartData3" :extend="chartExtend" :mark-line="markLine" :mark-point="markPoint" width=600px></ve-histogram>
                </div>
            </Col>
        </Row>
        <Row>
            <div class="col"><p>得分过低列表</p>
                    </div>
            <Col>
                <Table :columns="tableColumn" :data="tableData"></Table>
            </Col>
        </Row>
    </div>
</template>
<script>
import api from '../../fetch/api'
export default {
    data () {
        this.chartExtend = {
            series: {
                barWidth: 35
            }
        }
        this.markLine = {
            data: [
            {
                name: '平均线',
                type: 'average'
            }
            ]
        }
        this.markPoint = {
            data: [
            {
                name: '最大值',
                type: 'max'
            }
            ]
        }
        return {
            titles: [],
            chartData1: null,
            chartData2: null,
            chartData3: null,
            teacherList: null,
            teacher_name: '张三',
            tableData: [],
            tableColumn: [{title: '时间', key: 'year'}, {title: '课程名', key: 'course'}, {title: '教师', key: 'teacher'}, {title: '成绩', key: 'grade'},
            {title: '分数', key: 'score'}, {title: '备注', key: 'reason'}]
        }
    },
    methods: {
        getTeacherList () {
            api.getTeacherList()
            .then(res => {
                this.teacherList = res
            })
            .catch(error => {
                console.log(error);
            });
        },
        getInitData () {
            api.getSingleTeacherEvaluation(this.teacher_name)
                .then(res => {
                    this.chartData3 = res
                })
                .catch(error => {
                    console.log(error);
                });
            api.getTeachersEvaluationAvgScores()
                .then(res => {
                    this.chartData1 = res
                })
                .catch(error => {
                    console.log(error);
                });
            api.getTeacherEvaluationGradeDistributed()
                .then(res => {
                    this.chartData2 = res
                })
                .catch(error => {
                    console.log(error);
                });
            api.getTeacherEvaLowGradeList()
                .then(res => {
                    this.tableData = res
                    console.log(this.tableData)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        select (teacher) {
            api.getSingleTeacherEvaluation(teacher)
                .then(res => {
                    this.chartData3 = res
                })
                .catch(error => {
                    console.log(error);
                });
            }
    },
    created () {
        this.getTeacherList()
        this.getInitData()
    }
}
</script>

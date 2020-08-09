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
<layout>
    <div class="bg">
        <Row class="row">
            <Col>
                <div class="col">
                    <div><p>学院总体达成度分析</p>
                    </div>
                    <div>
                        <ve-histogram :data="chartData1" :extend="chartExtend" :mark-line="markLine"></ve-histogram>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="row">
            <Col>
                <div class="col">
                    <Select v-model="graduation_desc" style="width:200px" @on-change='getGraduationSingleTargetAnalysis'>
                        <Option v-for="item in graduationPoints" :value="item.desc" :key="item.id">{{ item.desc }}</Option>
                    </Select>
                </div>
                <div>
                    <Table :columns="tableColumn1" :data="tableData1" border></Table>
                </div>
            </Col>
        </Row>
        <Row class="row">
            <Col>
                <div >
                    <div class="col"><p>达成度过低学生列表</p>
                    </div>
                    <div>
                        <Table :columns="tableColumn2" :data="tableData2" border></Table>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</layout>
</template>
<script>
import api from '../../fetch/api'
export default {
    data () {
        this.chartExtend = {
            series: {
                barWidth: 35
            },
            yAxis: {
                max: 1
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
        return {
            graduationPoints: [
                {id: '1', desc: '工程知识'}, {id: '2', desc: '问题分析'}, {id: '3', desc: '设计/开发解决方案'}, {id: '4', desc: '研究'},
                {id: '5', desc: '使用现代工具'}, {id: '6', desc: '工程与社会'}, {id: '7', desc: '环境与可持续发展'}, {id: '8', desc: '职业规范'},
                {id: '9', desc: '个人与团队'}, {id: '10', desc: '沟通'}, {id: '11', desc: '项目管理'}, {id: '12', desc: '终身学习'}
            ],
            chartData1: {
               columns: ['目标', '达成度'],
               rows: [
                   {'目标': '工程知识', '达成度': 0.98},
                   {'目标': '问题分析', '达成度': 0.95},
                   {'目标': '设计/开发解决方案', '达成度': 0.84},
                   {'目标': '研究', '达成度': 0.75},
                   {'目标': '使用现代工具', '达成度': 0.88},
                   {'目标': '工程与社会', '达成度': 0.90},
                   {'目标': '环境与可持续发展', '达成度': 0.74},
                   {'目标': '职业规范', '达成度': 0.97},
                   {'目标': '个人与团队', '达成度': 0.72},
                   {'目标': '沟通', '达成度': 0.90},
                   {'目标': '项目管理', '达成度': 0.99},
                   {'目标': '终身学习', '达成度': 0.85}
               ]
            },
            graduation_desc: '使用现代工具',
            tableColumn1: [{title: '序号', key: 'id', width: 100}, {title: '指标点内容', key: 'desc'}, {title: '达成度', key: 'percent', width: 100}],
            tableData1: [
                {
                    id: '1',
                    desc: '1.1 具有扎实的数学、自然科学基础。',
                    percent: '78%'
                },
                {
                    id: '3',
                    desc: '1.2 掌握解决复杂软件工程问题所必需的计算科学基础知识。',
                    percent: '76%'
                },
                {
                    id: '3',
                    desc: '1.3 掌握解决复杂软件工程问题所必需的工程基础和软件工程专业知识。',
                    percent: '75%'
                }
            ],
            tableColumn2: [
                {title: '序号', key: 'id', width: 60},
                {title: '学号', key: 'student_number', width: 100},
                {title: '姓名', key: 'name', width: 100},
                {title: '指标点内容', key: 'desc'},
                {title: '达成度', key: 'percent', width: 100}
                ],
            tableData2: [
                {
                    id: '1',
                    student_number: '16301147',
                    name: '方赢',
                    desc: '1.1 具有扎实的数学、自然科学基础。',
                    percent: '12%'
                }
            ]
        }
    },
    methods: {
        getGraduationTargetList () {
            api.getGraduationTargetList()
            .then(res => {
                console(res)
                // this.graduationPoints = res
            })
            .catch(error => {
                console.log(error);
            });
        },
        getInitData () {
            var stuLevel = 2016
            api.getGraduationTargetAnalysisList(stuLevel)
            .then(res => {
                this.chartData1 = res
            })
            .catch(error => {
                console.log(error);
            });
            this.getGraduationSingleTargetAnalysis(this.graduation_desc)
            api.getGraduationTargetPointLowList()
                .then(res => {
                    this.tableData2 = res
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getGraduationSingleTargetAnalysis (targetDesc) {
            var targetId = 1
            for (var i = 0; i < this.graduationPoints.length; i++) {
                var item = this.graduationPoints[i]
                if (targetDesc === item['desc']) {
                    targetId = item['id']
                }
            }
            api.getGraduationSingleTargetAnalysis(targetId)
            .then(res => {
                this.tableData1 = res
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    created () {
        this.getGraduationTargetList()
        this.getInitData()
    }
}
</script>

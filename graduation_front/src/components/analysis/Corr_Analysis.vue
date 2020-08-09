<style scoped>
    .col{
        border-radius: 10px;
        padding-top: 10px;
        padding-right: 50px;
        margin-left:20px;
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
                    <div><p>{{ titles[0] }}</p></div>
                    <div>
                        <ve-histogram :data="chartData[0]" :settings="chartSetting_1"></ve-histogram>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="col">
                    <div><p>{{ titles[1] }}:{{pcc}}</p>
                    </div>
                    <div>
                        <ve-scatter :data="chartData[1]" :mark-point="markPoint"></ve-scatter>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter=40 class="row">
            <Col>
                <div class="col">
                    <div><p>课程间的关联程度</p><p>挖掘总数据项为：{{datasize}}项</p></div>
                    <div>
                        <Table :columns="tableColumn" :data="tableData"></Table>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import api from '../../fetch/api'
export default {
    data () {
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
            chartData: [],
            pcc: 0,
            chartSetting_1: {
                metrics: ['2015', '2016', '2017'],
                dimension: ['分布']
            },
            tableColumn: [
                {
                    title: '序号',
                    key: 'id'
                },
                {
                    title: '关联规则',
                    key: 'rule'
                },
                {
                    title: '支持度',
                    key: 'support'
                },
                {
                    title: '置信度',
                    key: 'confidence'
                }
            ],
            tableData: [
                {
                    id: '1',
                    rule: 'C语言课程与设计 -> 数据结构',
                    support: '57.33%',
                    confidence: '87.47%'
                },
                {
                    id: '2',
                    rule: 'C语言课程与设计 -> C语言程序设计综合实践',
                    support: '44.33%',
                    confidence: '75.47%'
                },
                {
                    id: '2',
                    rule: 'C语言课程与设计 -> C++',
                    support: '23.33%',
                    confidence: '69.47%'
                }
            ],
            datasize: 435
        }
    },
    methods: {
        getAnalysisInitData () {
            api.getAnalysisInitData()
            .then(res => {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i])
                    let tdata = res[i]
                    this.titles.push(tdata['title'])
                    this.chartData.push(tdata['data'])
                }
                this.pcc = res[1]['pcc']
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    created () {
        this.getAnalysisInitData()
    }
}
</script>

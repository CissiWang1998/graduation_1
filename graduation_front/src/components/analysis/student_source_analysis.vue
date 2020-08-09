<style scoped>
</style>
<template>
  <div>
    <div class="table">
      <ve-histogram :data="chartData" width="600px" :settings="chart_setting"></ve-histogram>
    </div>
    <div>
      <Table border :columns="cols" :data="yearData"></Table>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api'
export default {
  data () {
    return {
      chartData: {},
      yearData: [{key: '录取人数'}, {key: '平均高于重点线分值'}],
      cols: [{title: '', key: 'key'}]

    }
  },
  methods: {
      getStudentSourceData () {
          api.getStudentSource()
              .then(res => {
                  console.log(res)
                  this.chartData = res['chartData']
                  let yearData = res['yearData']
                  for (var i = 0; i < yearData.length; i++) {
                    var item = yearData[i]
                    var k = item['student_level']
                    this.cols.push({title: k, key: k})
                    this.yearData[0][k] = item['stu_count']
                    this.yearData[1][k] = item['diff']
                  }
              })
              .catch(error => {
                  console.log(error);
              });
      }
  },
  created () {
      this.getStudentSourceData()
  }
}
</script>

import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    console.log('错误的传参', 'fail');
    return Promise.reject(error);
});

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: param
        })
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

export default{
    /**
     * 获取数据列表
     */
    DataSchemaList () {
        return fetchGet(`/data/list`)
    },
    /**
     * 获取指定数据项的全部数据
     */
    getTableDataByName (name) {
        return fetchPost(`/data/detail`, {table_name: name})
    },
    /**
     * 更新数据
     */
    updateData (tableName, data) {
        console.log(tableName)
        console.log(JSON.stringify(data))
        return fetchPost(`/data/update`, {data: JSON.stringify(data), table_name: tableName})
    },
    /**
     * 批量导入文件
     */
    saveTableData (datalist, name) {
        console.log(name)
        console.log(JSON.stringify(datalist))
        return fetchPost(`/data/add`, {data: JSON.stringify(datalist), table_name: name})
    },
    /**
     * 获取数据分析页面初始数据
     */
    getAnalysisInitData () {
        return fetchGet(`/analysis/index`)
    },
    /**
     * 获取学生生源数据
     */
    getStudentSource () {
        return fetchGet(`/analysis/student_source`)
    },
    /**
     * 搜索结果
     */
    getSearchResult (index, value) {
        return fetchPost(`/search/`, {index: index, value: value})
    },
    /**
     * 查找用户N
     */
    getUpdateSearchResult (tableName, value) {
        return fetchPost(`/update/`, {table_name: tableName, value: value})
    },
    /**
     * 老师列表
     */
    getTeacherList () {
        return fetchGet(`/teacher/list`)
    },
    /**
     * 单个老师的个课程评分
     */
    getSingleTeacherEvaluation (teacher) {
        return fetchPost(`/evaluation/teacher/single`, {teacher: teacher})
    },
    /**
     * 老师们评教分数平均值
     */
    getTeachersEvaluationAvgScores () {
        return fetchGet(`evaluation/teacher/avg`)
    },
    /**
     * 老师们评价成绩优良等占比
     */
    getTeacherEvaluationGradeDistributed () {
        return fetchGet(`evaluation/teacher/distribute`)
    },
    /**
     * 低评分列表
     */
    getTeacherEvaLowGradeList () {
        return fetchGet(`evaluation/teacher/low_list`)
    },
    /**
     * 毕业要求目标列表
     */
    getGraduationTargetList () {
        return fetchGet(`analysis/graduation/target/list`)
    },
    /**
     * 毕业要求达成度分析总体
     */
    getGraduationTargetAnalysisList (stuLevel) {
        return fetchGet(`analysis/graduation/all`, {stu_level: stuLevel})
    },
    /**
     * 单个毕业要求目各指标达成度分析
     */
    getGraduationSingleTargetAnalysis (id) {
        console.log(id)
        return fetchGet(`analysis/graduation/target`, {target_id: id})
    },
    /**
     * 毕业要求指标点达成度过低列表
     */
    getGraduationTargetPointLowList () {
        return fetchGet(`analysis/graduation/target/low_list`)
    }

}

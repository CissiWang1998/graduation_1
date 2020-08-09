<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        float: left;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        float: left;
        width: 400px;
        margin: 0 auto;
        margin-left: 50px;
    }
    .upload{
        margin-top: 15px
    }
</style>
<template>
    <layout>
        <Header style="background: white;">
            <Menu mode="horizontal" theme="light" active-name="1">
                <div class="layout-logo">
                    <Select v-model="model8" clearable style="width:200px" placeholder="请选择导入数据项" @on-change="handleChange">
                        <Option v-for="item in dataList" :value="item.table_name" :key="item.table_name">{{ item.name }}</Option>
                    </Select>
                </div>
            </Menu>
        </Header>
        <layout>
            <strong :style="{margin: '10px'}">数据格式如下(仅支持xls,xlsx)</strong>
            <Table border :columns="columns1" :data="data1"></Table>
            <div class="upload">
                <div class="layout-nav">
                    <Upload :format="['xlsx','xls']" accept=".xlsx, .xls" :before-upload="onBefore" action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button>
                        <span v-if="file !== null" style="color:green;">{{ file.name }}</span>
                    </Upload>
                </div>
                <div class="layout-ensure">
                    <Button  v-bind:disabled="comfirm_button_dis" type="primary" @click="upload_file">确定上传</Button>
                </div>
            </div>
        </layout>
    </layout>
</template>
<script>
import api from '../../fetch/api'
import XLSX from 'xlsx'
export default {
    data () {
        return {
            file: null,
            loadingStatus: false,
            comfirm_button_dis: true,
            curr_table_name: '',
            dataList: [],
            curr_data: [],
            model8: '',
            columns1: [],
            data1: []
        }
    },
    methods: {
        onBefore (file) {
            this.comfirm_button_dis = false;
            this.file = file;
            this.readExcel(file)
            return false;
        },
        upload_file () {
            if (this.model8 === '') {
                this.$Message.info('请选择要上传的数据');
                return;
            }
            if (this.file === null) {
                this.$Message.info('请上传文件');
                return;
            }
            if (Object.keys(this.curr_data).length !== this.columns1.length) {
                this.$Message.info('文件列数不对');
                return;
            }
            this.loadingStatus = true
            api.saveTableData(this.data1, this.curr_table_name)
                .then(res => {
                    if (res.code === 400) { // 输入数据有问题
                        this.$Message.info(res.message)
                    }
                    this.$Message.success('Success')
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleChange (value) {
            api.getTableDataByName(value)
                .then(res => {
                    let value = {}
                    this.columns1 = []
                    this.data1 = []
                    for (var key in res[0]) {
                        this.columns1.push({'title': key, 'key': key, align: 'center'})
                        value[key] = 'xxx'
                    }
                    this.data1 = [value]
                    this.curr_data = res[0]
                    this.curr_table_name = value
                })
                .catch(error => {
                    console.log(error);
                });
        },
        readExcel (file) {
            if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
                return false;
            }
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                var that = this
                try {
                    const data = ev.target.result
                    const workbook = XLSX.read(data, {type: 'binary'})
                    const wsname = workbook.SheetNames[0]
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
                    let col = []
                    that.data1 = []
                    for (var k in ws[0]) {
                        col.push({'title': k, 'key': k})
                    }
                    for (var i = 0; i < ws.length; i++) {
                        let sheetData = {}
                        for (var key in ws[i]) {
                            sheetData[key] = ws[i][key]
                        }
                        that.data1.push(sheetData)
                    }
                    that.columns1 = col
                } catch (error) {
                    return false
                }
            }
            fileReader.readAsBinaryString(file)
        }
    },
    created () {
        api.DataSchemaList()
            .then(res => {
                this.dataList = res
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

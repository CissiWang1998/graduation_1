<style scoped>
.layout-logo{
    width: auto;
    height: 30px;
    float: left;
    position: relative;
    top: 15px;
    left:175px;
    background: #ffffff;
}
</style>
<template>
    <layout>
        <Layout>
            <List  item-layout="vertical" style="width: 300px">
                <ListItem  v-for="(value,key) in updateItem" :key="key">
                    <span>{{key}}:</span><Input v-model="updateItem[key]" size="large" :placeholder="updateItem[key]" />
                </ListItem >
            </List >
            <Button type="primary" @click="update()" style="width: 60px">提交</Button>
        </Layout>
    </layout>
</template>
<script>
import api from '../../fetch/api'
export default {
    data () {
        return {
            search_key: '',
            search_index: 'update_teacher',
            search_data: null,
            updateItem: null,
            table_name: null
        }
    },
    methods: {
        searchUser () {
            if (this.search_key === '' || this.search_index === '') {
                return;
            }
            let tableNamNe = this.search_index.slice(7)
            console.log(tableNamNe)
            api.getUpdateSearchResult(tableNamNe, this.search_key)
                .then(res => {
                    let arr = []
                    res.forEach(element => {
                        arr.push(element)
                    })
                    this.search_data = arr
                })
                .catch(error => {
                    console.log(error);
                });
        },
        select (item) {
            this.$router.replace({name: this.search_index, params: {item: item}})
        },
        generateData () {
            this.updateItem = this.$route.params.item
            this.table_name = this.$route.params.table_name
        },
        update () {
            api.updateData(this.table_name, this.updateItem)
                .then(res => {
                    this.$Modal.info({
                        title: 'User Info',
                        content: '更新成功'
                    })
                })
                .catch(error => {
                    console.log(error);
                });
            this.$router.replace('/saveOne')
        }
    },
    created () {
        this.generateData()
    },
    watch: {
        '$route': 'generateData'
    }
}
</script>

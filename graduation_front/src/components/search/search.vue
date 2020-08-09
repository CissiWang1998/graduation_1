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
        <Header style="background: white;">
            <div class="layout-logo">
                <Input v-model="search_key">
                    <Select v-model="search_index" slot="prepend" style="width: 80px">
                        <Option value="student_info">学生</Option>
                        <Option value="teacher_info">老师</Option>
                    </Select>
                    <Button slot="append" icon="ios-search" @click="search"></Button>
                </Input>
            </div>
        </header>
        <Layout>
            <Content :style="{ minHeight: '600px', background: '#fff'}">
                <router-view></router-view>
            </Content>
        </Layout>
    </layout>
</template>
<script>
export default {
    data () {
        return {
            search_key: '',
            search_index: 'teacher_info'
        }
    },
    methods: {
        search () {
            if (this.search_key === '' || this.search_index === '') {
                return;
            }
            this.$router.replace({name: 'searchResult', params: {search_key: this.search_key, search_index: this.search_index}})
        }
    }
}
</script>

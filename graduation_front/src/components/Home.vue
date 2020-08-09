<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 200px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            登录
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            注册
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout >
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="onSelect">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                数据查看
                            </template>
                            <MenuItem name="saveOne" >单项数据</MenuItem>
                            <MenuItem name="saveMany" >批量录入</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                数据分析
                            </template>
                            <MenuItem name="corr_analysis">数据分析</MenuItem>
                            <MenuItem name="student_source_analysis">生源统计</MenuItem>
                            <MenuItem name="course_evaluation">评教数据</MenuItem>
                            <MenuItem name="graduation_analysis">毕业要求达成度分析</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                内部搜索
                            </template>
                            <MenuItem name="search">数据查找</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content :style="{ minHeight: '600px', background: '#fff'}">
                        <router-view> </router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      age: 1
    }
  },
  methods: {
    onSelect (name) {
      this.$router.replace('/' + name)
    }
  }
}
</script>

<style scoped>
    .search_item {
        padding-top: 5px;
        padding-left: 10px;
    }
</style>
<template>
    <div>
        <List item-layout="vertical">
            <ListItem v-for="item in search_data" :key="item.name">
                <div @click="select(item)" class="search_item">
                <ListItemMeta  :title="item.name" />
                    <span>{{item.name}}</span>
                    <span>{{item.info}}</span>
                </div>
            </ListItem>
        </List>
        <Modal
            v-model="modal"
            title="详细信息">
            <ul>
                <li v-for="(key,value) in modal_dict" :key="key">
                    {{value}}:{{key}}
                </li>
            </ul>
        </Modal>
    </div>
</template>
<script>
import api from '../../fetch/api'
export default {
    data () {
        return {
            search_data: [],
            search_key: '',
            search_index: '',
            modal: false,
            modal_dict: null
        }
    },
    methods: {
        getSearchPara () {
            this.search_index = this.$route.params.search_index
            this.search_key = this.$route.params.search_key
            this.getSearchResult()
        },
        getSearchResult () {
            api.getSearchResult(this.search_index, this.search_key)
            .then(res => {
                let arr = []
                res.forEach(element => {
                    arr.push(element)
                })
                this.search_data = arr
                // this.search_data = res
            })
            .catch(error => {
                console.log(error);
            });
        },
        select (item) {
            this.modal_dict = item
            this.modal = true
        }
    },
    created () {
        this.getSearchPara()
    },
    watch: {
        '$route': 'getSearchPara'
    }
}
</script>

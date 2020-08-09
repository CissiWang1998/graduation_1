import Vue from 'vue'
import Router from 'vue-router'
import DataShow from '@/components/data/DataShow'
import DataList from '@/components/data/DataList'
import SaveMany from '@/components/data/SaveMany'
import CorrAnalysis from '@/components/analysis/Corr_Analysis'
import studentSourceAnalysis from '@/components/analysis/student_source_analysis'
import Search from '@/components/search/search'
import SearchResult from '@/components/search/searchResult'
import DataUpdate from '@/components/data/DataUpdate'
// import UpdateTeacher from '@/components/update/UpdateTeacher'
import CourseEvaluation from '@/components/analysis/CourseEvaluation'
import GraduationAnalysis from '@/components/analysis/Graduation_analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/saveOne',
      component: DataList,
      name: 'saveOne',
      children: [
        {
          path: '/show/:table_name',
          name: 'datashow',
          component: DataShow
        },
        {
          path: '/update/:table_name/:item',
          name: 'dataUpdate',
          component: DataUpdate
        }
      ]
    },
    {
      path: '/saveMany',
      component: SaveMany
    },
    {
      path: '/corr_analysis',
      component: CorrAnalysis
    },
    {
      path: '/course_evaluation',
      component: CourseEvaluation
    },
    {
      path: '/student_source_analysis',
      component: studentSourceAnalysis
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: '/result/:search_index/:search_key',
          name: 'searchResult',
          component: SearchResult
        }
      ]
    },
    {
      path: '/graduation_analysis',
      component: GraduationAnalysis
    }
  ]
})

/**
 * 重写路由的push方法
 */
const [routerPush, routerReplace] = [Router.prototype.push, Router.prototype.replace]
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Router.prototype.replace = function replace (location) {
  return routerReplace.call(this, location).catch(error => error)
}

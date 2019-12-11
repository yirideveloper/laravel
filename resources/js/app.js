import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { routes } from './routes'
import App from './views/App'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.silent = true

const router = new VueRouter({
    mode: 'history',
    routes,
});

const store = new Vuex.Store({
    state: {
        name: null,
        title: null,
        menu: [],
        header: {
            title: null,
            subtitle: null,
            color: null
        },
        categories: [],
        loading: true,
        category: {
            page: 1,
            last_page: null,
        },
        discussion: {
            page: 1,
            last_page: null,
        },
        alert: {
            title: null,
            text: null,
            color: null,
            show: false
        }
    },
    mutations: {
        setName(state, name) {
            state.name = name
        },
        setTitle(state, title) {
            state.title = title
        },
        setMenu(state, menu) {
            state.menu = menu
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setHeader(state, { title, subtitle, color }) {
            Vue.set(state.header, 'title', title)
            Vue.set(state.header, 'subtitle', subtitle)
            Vue.set(state.header, 'color', color)
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setCategoryPage(state, page) {
            if (page === undefined) {
                state.category.page = 1
            } else {
                state.category.page = page
            }
        },
        setCategoryLastPage(state, last_page) {
            state.category.last_page = last_page
        },
        setDiscussionPage(state, page) {
            if (page === undefined) {
                state.discussion.page = 1
            } else {
                state.discussion.page = page
            }
        },
        setDiscussionLastPage(state, last_page) {
            state.discussion.last_page = last_page
        },
        showAlert(state, { title, text, color }) {
            console.log('show alert', title, text, color);
            if (title !== undefined) {
                Vue.set(state.alert, 'title', title)
            }
            if (text !== undefined) {
                Vue.set(state.alert, 'text', text)
            }
            if (color !== undefined) {
                Vue.set(state.alert, 'color', color)
            }

            Vue.set(state.alert, 'show', true)
        },
        hideAlert(state) {
            Vue.set(state.alert, 'show', false)
        }
    },
    getters: {
        name: state => state.name,
        title: state => state.title,
        getMenu: state => state.menu,
        loading: state => state.loading,
        header: state => state.header,
        categories: state => state.categories,
        category: state => state.category,
        discussion: state => state.discussion,
        alert: state => state.alert
    }
})

window.ChatterEvents = new Vue();
const chatter_app = new Vue({
    el: '#chatter_app',
    components: { App },
    router,
    store
});
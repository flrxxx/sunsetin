import {createStore} from 'vuex'

export default createStore({
    state: {
        titlebar: {
            show:true,
            title:'',
            leftarrow:true,
            lefttext:'',
            righttext:'',
            lefthtml:'',
            righthtml:'',
            titlebarclass:'redgradient',
        },
        activityinfo: {}
    },
    mutations: {
        setTitlebar(state, obj) {
            state.titlebar = Object.assign(state.titlebar,obj)
        },
        saveActivity(state, obj) {
            state.activityinfo = obj;
        },
    },
    actions: {

    },
    modules: {}
})

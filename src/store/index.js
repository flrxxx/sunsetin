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
        activityinfo: {},
        matchinfo:{}
    },
    mutations: {
        setTitlebar(state, obj) {
            obj.lefttext = obj.lefttext ? obj.lefttext : '';
            obj.righthtml = obj.righthtml? obj.righthtml:'';
            obj.lefthtml = obj.lefthtml ? obj.lefthtml : '';
            obj.righttext = obj.righttext ? obj.righttext : '';
            state.titlebar = Object.assign(state.titlebar,obj);
        },
        saveActivity(state, obj) {
            state.activityinfo = JSON.parse(JSON.stringify(obj));
        },
        setmatchinfo(state,obj){
            state.matchinfo = JSON.parse(JSON.stringify(obj))
        }
    },
    actions: {

    },
    modules: {}
})

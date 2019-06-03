var state= {
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1
};
var actions = {

};
var mutations = {
    CITY_INFO(state,payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
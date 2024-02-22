/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2020-08-02 23:04:30
 */

import { createStore } from 'vuex';
import state from './State';
import mutations from './Mutations';
import actions from './Actions';
import getters from './Getters';

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store;
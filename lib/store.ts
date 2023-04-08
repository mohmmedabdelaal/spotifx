import {createStore,action} from 'easy-peasy'

const store = createStore({
    activeSongs: [],
    activeSong: null,
    ChangeActiveSongs: action((state,payload) =>{
    state.activeSongs = payload
    }),
    ChangeActiveSong: action((state,payload) =>{
        state.activeSong = payload
    })

})

export default store;
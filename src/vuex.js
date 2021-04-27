import Vue from 'vue';
import Vuex from 'vuex';
import api from "./services/api";

Vue.use(Vuex)

const store = new Vuex.Store ({
    state: {
        bpi: {USD:{}},
        moeda: 'USD',
        valorMoeda: [],
        valorBitcoin: 0,
        moedas: [],
    },
    mutations: {
        setApi(state,{bpi, moedas}) {
                state.bpi = bpi
                state.moedas = moedas
        },
        setMoeda(state,value) {
            state.moeda = value
        },
        setValorMoeda(state,value) {
            state.valorMoeda = value
        },

        calculateBitcoin: (state) => (state.valorBitcoin = (1 / state.bpi[state.moeda].rate_float * state.valorMoeda).toFixed(8)),

    },
    //actions para coisas assincronas
    actions: {
        loadApi: ({commit}) => {
                api.get('currentprice.json').then((Response => {
                    if (Response.status !== 200) return
                    commit('setApi',{
                        bpi: Response.data.bpi,
                        moedas: Object.keys(Response.data.bpi)
                    })
                }))
        }
    },
    getters: {
        valorAppBar: (state) => state.bpi[state.moeda].rate_float,
        bpi:state => state.bpi,
        moeda:state => state.moeda,
        valorMoeda:state => state.valorMoeda,
        valorBitcoin:state => state.valorBitcoin,
        moedas:state => state.moedas,

    }

})
export { store }
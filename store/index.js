import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imageCDN: 'http://oznt7lcps.bkt.clouddn.com/',
      homePageScroll: {
        'home': 0,
        'house': 0
      },
      authUser: null,
      user: null,
      money: 0,
      shoppingScroll: 0,
      products: [],
      focusProduct: {},
      payments: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore

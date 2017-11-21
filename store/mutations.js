export default {
  SET_USER: (state, user) => {
    state.user = user
  },
  
  SET_AUTHUSER: (state, authUser) => {
    state.authUser = authUser
  },
  
  ADD_PRODUCT: (state, item) => {
    if (state.carList.length !== 0) {
      let check = true;
      state.carList.forEach( (it, index) => {
        if (it._id == item._id) {
          state.carList[index].count += 1
          state.carCount ++
          check = false
        }
      })
      if (check) {
        state.carList.push(item)
        state.carCount ++
      }
    } else {
      state.carList.push(item)
      state.carCount ++
    }
    //console.log(state.carList)
  },
  
  DEL_PRODUCT: (state, index) => {
    state.carCount = state.carCount - state.carList[index].count
    state.carList.splice(index, 1)
  }
  
}
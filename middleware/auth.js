export default function ({ store, redirect }) {
  console.log(store.state.user.email)
  if (store.state.user.email !== '455255849@qq.com') {
    return redirect('/login')
  }
}

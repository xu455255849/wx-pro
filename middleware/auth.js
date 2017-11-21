export default function ({ store, redirect }) {
  if (store.state.user.email !== '455255849@qq.com') {
    return redirect('/login')
  }
}

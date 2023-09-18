import { Provider } from 'react-redux'
import { store } from '@/store/store'
import Layout from './layout'
import Login from '@/pages/login'

function App (): JSX.Element {
  return (
    <Provider store={store}>
      < Login />
    </Provider>
  )
}

export default App

import { useRoutes } from 'react-router-dom'
import AppRoutes from './routes'

function App (): React.ReactElement {
  return useRoutes(AppRoutes) as React.ReactElement
}

export default App

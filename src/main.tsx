import ReactDOM from 'react-dom'
import App from './demo'

const container = document.getElementById('dg-app')

if (container) {
  ReactDOM.render(<App />, container)
}
export default App

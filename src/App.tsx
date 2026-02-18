
import './App.scss';
import { RouterProvider } from 'react-router-dom'
import root from './router/root'
import { Toaster } from 'react-hot-toast'
function App() {


  return (
    <>
      <Toaster position="top-right"/>
      <RouterProvider router={root}/>
    </>
  )
}

export default App

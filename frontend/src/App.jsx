import { Routes, Route } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Home from './pages/ChatLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import ChatLayout from './pages/ChatLayout'

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Route>

      {/* App Pages with (Navbars) Private Route */}
      <Route element={<PrivateRoute />} >
          <Route path='/' element={<ChatLayout />} />
          <Route path='/chat/:conversationId' element={<ChatLayout />} />
      </Route>
    </Routes>
  )
  
}

export default App

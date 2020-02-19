import App from './App'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

export default routes

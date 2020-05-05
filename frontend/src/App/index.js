import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import './Style.css'
// DashBoard
import Dashboard from './pages/Dashboard'
// Store
import Store from './pages/Store/Store'
import Cart from './pages/Store/Cart'
// Login
import Login from './pages/Login/SignIn'
import SignOut from './pages/Login/SignOut'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00f0ff'
        },
        secondary: {
            main: '#00ff0f'
        }
    }
})

export default props => {
    const test = localStorage.getItem('current') ? true : false
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    {/* DashBoard */}
                    <Route path="/" component={test ? Dashboard : Login} exact />

                    {/* Store */}
                    <Route path="/store" component={Store} exact />
                    <Route path="/store/cart" component={Cart} exact />

                    {/* Login */}
                    <Route path="/login" component={Login} exact />
                    <Route path="/login/Cadastro" component={SignOut} exact />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}
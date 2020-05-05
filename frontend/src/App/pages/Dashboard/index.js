import React, { Component } from 'react'
import { Home, Storefront, Group, Dashboard, ExitToApp } from '@material-ui/icons'
import { Paper, Avatar, IconButton } from '@material-ui/core'
import Styles from './style.module.css'
import { fetchData, deleteItem } from '../../../api'
import Tables from '../../../components/Tables'
import { Modal } from '../../../components/Modal'

export default class Dash extends Component {
    state = {
        users: [],
        products: [],
        current: {},
        open: false
    }

    async componentDidMount() {
        const users = await fetchData('users')
        const products = await fetchData('products')
        const logado = JSON.parse(localStorage.getItem('current'))
        this.setState({
            users: users.data, products: products.data, logado
        })
    }

    openedit(id, type) {
        const current = this.state.users.filter(user => user.id === id)
        this.setState({ current: current[0], open: true, type: type })
    }
    opendelete(id, type) {
        const current = this.state.users.filter(user => user.id === id)
        this.setState({ current: current[0], open: true, type: type })
        this.componentDidMount()
    }
    handleClose(test) {
        test ? deleteItem(this.state.type, this.state.current.id) : console.log('Nada')
        this.setState({ open: false })
        this.componentDidMount()
    }
    signOut(){
        localStorage.removeItem('current')
        window.location.reload()
    }
    render() {
        return (
            <div className={Styles.container}>
                <div className={Styles.logo}>
                    <Dashboard />
                </div>
                <nav className={Styles.navbar}>
                    {this.state.logado === undefined ? <h1>Carregando...</h1> :
                        <>
                            <Avatar alt={this.state.logado.name} src={this.state.logado.img} />
                            <h4 style={{ marginLeft: 20 }}>{this.state.logado.name}</h4>
                            <IconButton
                            onClick={() => this.signOut()}>
                                <ExitToApp />
                            </IconButton>
                        </>
                    }
                </nav>
                        <aside className={Styles.menu}>
                            <ul>
                                <li>
                                    <a href="/">
                                        <Home />
                                    </a>
                                </li>
                                <li>
                                    <a href="/store">
                                        <Storefront />
                                    </a>
                                </li>
                                <li>
                                    <a href="/login">
                                        <Group />
                                    </a>
                                </li>
                            </ul>
                        </aside>
                        <main className={Styles.screen}>
                            <Paper className={`${Styles.users}, ${Styles.card}`} elevation={3}>
                                <h4>Usuários</h4>
                                {this.state.users.length}
                            </Paper>
                            <Paper className={`${Styles.products} ${Styles.card}`} elevation={3}>
                                <h4>Produtos</h4>
                                {this.state.products.length}
                            </Paper>
                            <Paper className={`${Styles.profile} ${Styles.card}`} elevation={3}>
                                <h4>{this.state.current.name}</h4>
                                <h4>{this.state.open}</h4>
                            </Paper>
                            <Paper className={`${Styles.tableUsers} ${Styles.card}`} elevation={3}>
                                <h4>Tabela de Usuários</h4>
                                <Tables arr={this.state.users}
                                    type="users"
                                    openedit={id => this.openedit(id, 'users')}
                                    opendelete={id => this.opendelete(id, 'users')} />
                            </Paper>
                            <Paper className={`${Styles.tableProducts} ${Styles.card}`} elevation={3}>
                                <h4>Tabela de Produtoss</h4>
                                <Tables arr={this.state.products}
                                    type="products"
                                    openedit={id => this.openedit(id, 'products')}
                                    opendelete={id => this.opendelete(id, 'products')} />
                            </Paper>
                        </main>
                        <Modal open={this.state.open} handleClose={test => this.handleClose(test)} />
            </div>
        )
    }
}
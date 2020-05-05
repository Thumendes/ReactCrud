import React, { useState, useEffect } from 'react'
import Styles from '../style.module.css'
import { TextField, Snackbar, Button } from '@material-ui/core'
import { Form } from '../../../../components/Form'
import { addItem, fetchData } from '../../../../api'

export default props => {
    // STATE
    const [dados, setDados] = useState({
        name: '',
        email: '',
        cep: '',
        password: '',
        errorEmail: false,
        errorSenha: false
    })
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState({ test: false, duration: 1500, message: '' })

    // DADOS
    const getData = async () => {
        const data = await fetchData('users')
        setUsers(data.data)
    }
    useEffect(() => {
        getData()
    }, [])

    // CADASTRAR
    const add = () => {
        const { name, email, cep, password } = dados
        const teste = users.filter(user => user.email === email)
        if (teste.length === 0 && (email.length > 5 && email.includes('@'))) {
            if (password.length >= 8) {
                addItem('users', { name, email, cep, password })
                setOpen({ ...open, test: true, message: `${name} cadastrado com sucesso!` })
                    setTimeout(() => {
                        window.location.href = '/'
                    }, open.duration)
            }
            else {
                setDados({ ...dados, errorSenha: true })
            }
        }
        else {
            setDados({ ...dados, errorEmail: true })
        }
    }

    // REDIRECIONAR

    return (
        <div className={Styles.container}>
            <div className={Styles.background}></div>
            <div className={Styles.formTela}>
                <Form operation={add} estilo={Styles} title="Fazer Cadastro">
                    <div className={Styles.form}>
                        <TextField
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="Nome"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className={Styles.form}>
                        <TextField
                            helperText={dados.errorEmail ? "Email inválido" : ""}
                            error={dados.errorEmail}
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="Email"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div className={Styles.form}>
                        <TextField
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="C.E.P"
                            name="cep"
                            type="number"
                        />
                    </div>
                    <div className={Styles.form}>
                        <TextField
                            helperText={dados.errorSenha ? "Senha inválida" : ""}
                            error={dados.errorSenha}
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="Senha"
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className={Styles.form}>
                        <Button onClick={() => window.location.href = '/'}
                            color="primary"
                            variant="contained"
                            size="small">Login</Button>
                    </div>
                </Form>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    color=""
                    open={open.test}
                    autoHideDuration={open.duration}
                    message={open.message}
                />
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import Styles from '../style.module.css'
import { TextField, Snackbar, Button } from '@material-ui/core'
import { Form } from '../../../../components/Form'
import { fetchData } from '../../../../api'
export default props => {
    // STATE
    const [dados, setDados] = useState({ email: '', senha: '', errorEmail: false, errorSenha: false })
    const [users, setUsers] = useState({})
    const [open, setOpen] = useState({ test: false, duration: 1500, message: '' })

    // DADOS
    const getData = async () => {
        const data = await fetchData('users')
        setUsers({ users: data.data })
    }
    useEffect(() => {
        getData()
    }, [])

    // LOGIN
    const login = () => {
        if (dados.email.length > 0) {
            if (dados.senha.length > 0) {
                const [suspect] = users.users.filter(user => user.email === dados.email)
                console.log(suspect && suspect.password)
                if (suspect && suspect.password === dados.senha) {
                    localStorage.setItem('current', JSON.stringify(suspect))
                    setOpen({ ...open, test: true, message: 'Login com sucesso!' })
                    setTimeout(() => {
                        window.location.reload()
                    }, open.duration)
                }
                else {
                    setOpen({ ...open, test: true, message: 'Usuário e senha incorretos!' })
                    setTimeout(() => {
                        setOpen({ ...open, test: false })
                    }, open.duration)
                }
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
            <div className={Styles.formTela}>
                <Form operation={login} estilo={Styles} title="Fazer Login">
                    <div className={Styles.form}>
                        <TextField
                            helperText={dados.errorEmail ? "Email inválido" : ""}
                            error={dados.errorEmail}
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="Email"
                            name="email"
                        />
                    </div>
                    <div className={Styles.form}>
                        <TextField
                            helperText={dados.errorSenha ? "Senha inválida" : ""}
                            error={dados.errorSenha}
                            onChange={event =>
                                setDados({ ...dados, [event.target.name]: event.target.value })}
                            label="Senha"
                            name="senha"
                            type="password"
                        />
                    </div>
                    <div className={Styles.form}>
                        <Button onClick={() => window.location.href = '/login/Cadastro'}
                            color="primary"
                            variant="contained"
                            size="small">Cadastrar</Button>
                    </div>
                </Form>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={open.test}
                    autoHideDuration={open.duration}
                    message={open.message}/>
            </div>
            <div className={Styles.background}></div>
        </div>
    )
}
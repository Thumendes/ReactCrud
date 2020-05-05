import React from 'react'
import { Button } from '@material-ui/core'

export const Form = props => {
    return (
        <div>
            <h1>{props.title}</h1>
            <div className="form">
                {props.children}

                <div className={props.estilo.form}>
                    <Button
                        size="small"
                        onClick={props.operation}
                        color="secondary"
                        variant="contained">
                        {props.title}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export const SignOutForm = props => {

}
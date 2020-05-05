import React from 'react'
import { Edit, Delete } from '@material-ui/icons'
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, IconButton , Avatar} from '@material-ui/core'

export default props => {
    const type = props.type
    const arr = props.arr
    const keys = arr.length > 0 ? Object.keys(arr[0]) : ''
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {keys.length > 0 ? keys.map(key => (
                            <TableCell key={key}>{key}</TableCell>
                        )) : <TableCell>Carregando...</TableCell>}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {arr.length > 0 ? arr.map((element, index) => (
                        <TableRow key={`${type}${index++}`}>
                            {keys.map(chave => (
                                <TableCell key={`${index}${chave}`}>{chave === 'img' ? <Avatar src={element[chave]} variant="rounded"/> : element[chave]}</TableCell>
                            ))}
                            <TableCell>
                                <IconButton
                                    id={element.id}
                                    key={`edit${element.id}`}
                                    style={{ color: '#0a0' }}
                                    onClick={e => props.openedit(element.id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    id={element.id}
                                    key={`delete${element.id}`}
                                    style={{ color: '#d00' }}
                                    onClick={e => props.opendelete(element.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                    ) :
                        <TableRow>
                            <TableCell>Carregando...</TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Api from "../Api";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',

    },
    table: {
        minWidth: 650
    },
    btnCheck: {
        color: 'blue',
        '&:hover': {
            color: 'green'
        }
    }

});

export default function SimpleTable() {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [hasReturnedSuccess, setHasReturnedSuccess] = useState(false);
    const [hasReturnedSuccessMessage, setHasReturnedSuccessMessage] = useState(
        "");
    const [hasReturnedError, setHasReturnedError] = useState(false);
    const [hasReturnedErrorMessage, setHasReturnedErrorMessage] = useState("");

    const handleCloseErrorModal = () => {
        setHasReturnedError(false);
    };
    const handleCloseSuccessModal = () => {
        setHasReturnedSuccess(false);
    };

    const DeleteCity = async () => {
        try {
            return Api.delete(
                "https://localhost:44364/v1/city/{id:int}"
            ).then(res => {
                setHasReturnedSuccessMessage(res.data.message);
                setHasReturnedSuccess(true);
            });
        } catch (error) {
            setHasReturnedErrorMessage(error.response.data.message);
            setHasReturnedError(true);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(
                'https://localhost:44364/v1/city'
            ).then(res => res.json());
            setData(response);

            return [data];
        };
        fetchUsers()
    }, []);

    return (
        <Container maxWidth="xl">
            <Paper className={classes.root}>
                <Typography variant="h6" id="tableTitle" style={{ color: "#050505" }}>
                    Lista de Empresas
				</Typography>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">IBGE</TableCell>
                            <TableCell align="center">UF</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Latitude</TableCell>
                            <TableCell align="center">Longitude</TableCell>
                            <TableCell align="center">Região</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, key) => (
                            <TableRow key={key}>
                                <TableCell align="center">{item.ibge}</TableCell>
                                <TableCell align="center">{item.uf}</TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.latitude}</TableCell>
                                <TableCell align="center">{item.longitude}</TableCell>
                                <TableCell align="center">{item.region}</TableCell>
                                <div className={classes.root}>
                                    <IconButton onClick={() => DeleteCity()}
                                        aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}

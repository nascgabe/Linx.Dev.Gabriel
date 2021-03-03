import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Botao from "../Button/send";
import CustomDialog from "../Alerts/dialog";
import List from "../List/city";
import Api from "../Api";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flex: 8,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    paper: {
        minHeight: 360,
        minWidth: 360,
        textAlign: "center",
        marginTop: "3%"
    },

    control: {
        padding: theme.spacing(1)
    },

    container: {
        display: "flex",
        flexWrap: "wrap"
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 251
    },

    dense: {
        marginTop: theme.spacing(2)
    },

    menu: {
        width: 200
    }
}));

const uf = [
    {
        value: 1,
        label: "Acre"
    },
    {
        value: 2,
        label: "Alagoas"
    },
    {
        value: 3,
        label: "Amapá"
    },
    {
        value: 4,
        label: "Amazonas"
    },
    {
        value: 5,
        label: "Bahia"
    },
    {
        value: 6,
        label: "Ceará"
    },
    {
        value: 7,
        label: "Espirito Santo"
    },
    {
        value: 8,
        label: "Goiás"
    },
    {
        value: 9,
        label: "Maranhão"
    },
    {
        value: 10,
        label: "Mato Grosso"
    },
    {
        value: 11,
        label: "Mato Grosso do Sul"
    },
    {
        value: 12,
        label: "Minas Gerais"
    },
    {
        value: 13,
        label: "Pará"
    },
    {
        value: 14,
        label: "Paraíba"
    },
    {
        value: 15,
        label: "Paraná"
    },
    {
        value: 16,
        label: "Pernambuco"
    },
    {
        value: 17,
        label: "Piauí"
    },
    {
        value: 18,
        label: "Rio de Janeiro"
    },
    {
        value: 19,
        label: "Rio Grande do Norte"
    },
    {
        value: 20,
        label: "Rio Grande do Sul"
    },
    {
        value: 21,
        label: "Rondonia"
    },
    {
        value: 22,
        label: "Roraima"
    },
    {
        value: 23,
        label: "Santa Catarina"
    },
    {
        value: 24,
        label: "São Paulo"
    },
    {
        value: 25,
        label: "Sergipe"
    },
    {
        value: 26,
        label: "Tocantins"
    },
    {
        value: 27,
        label: "Distrito Federal"
    },
];

export default function SpacingGrid() {
    document.title = "Cadastro de Cidades";
    const classes = useStyles();
    const [hasReturnedSuccess, setHasReturnedSuccess] = useState(false);
    const [hasReturnedSuccessMessage, setHasReturnedSuccessMessage] = useState(
        ""
    );
    const [hasReturnedError, setHasReturnedError] = useState(false);
    const [hasReturnedErrorMessage, setHasReturnedErrorMessage] = useState("");

    const handleCloseErrorModal = () => {
        setHasReturnedError(false);
    };
    const handleCloseSuccessModal = () => {
        setHasReturnedSuccess(false);
    };

    const CreateCity = async () => {
        try {
            return Api.post(
                "https://localhost:44364/v1/city",
                values
            ).then(res => {
                setHasReturnedSuccessMessage(res.data.message);
                setHasReturnedSuccess(true);
            });
        } catch (error) {
            setHasReturnedErrorMessage(error.response.data.message);
            setHasReturnedError(true);
        }
    };

    const [values, setValues] = useState({
        ibge: "",
        uf: 1,
        name: "",
        latitude: "",
        longitude: "",
        region: ""
    });
    const [erros] = useState({});

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const showErrorText = name => {
        let errorText = erros[name];
        if (errorText) return errorText[0];
    };

    return (
        <Container maxWidth="lg">
            {hasReturnedError && (
                <CustomDialog
                    open={"Oi"}
                    // onExited={() => {}}
                    title={"Algo deu errado!"}
                    //confirmLabel={handleCloseErrorModal}
                    onConfirm={handleCloseErrorModal}
                    onCancel={handleCloseErrorModal}
                >
                    {hasReturnedErrorMessage}
                </CustomDialog>
            )}
            {hasReturnedSuccess && (
                <CustomDialog
                    open={"Oi"}
                    // onExited={() => {}}
                    title={"Parabéns!"}
                    //confirmLabel={handleCloseErrorModal}
                    onConfirm={handleCloseSuccessModal}
                    onCancel={handleCloseSuccessModal}
                >
                    {hasReturnedSuccessMessage}
                </CustomDialog>
            )}

            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.root}>
                    <Paper className={classes.paper} style={{ flex: 1 }}>
                        <div>
                            <TextField
                                id="ibge"
                                label="IBGE"
                                error={erros.ibge !== undefined}
                                className={classes.textField}
                                value={values.ibge}
                                onChange={handleChange("ibge")}
                                margin="normal"
                                variant="outlined"
                                helperText={showErrorText("ibge")}
                                style={{ width: "70%" }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="uf"
                                select
                                label="UF"
                                error={erros.uf !== undefined}
                                className={classes.textField}
                                value={values.uf}
                                onChange={handleChange("uf")}
                                helperText={showErrorText("uf")}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu
                                    }
                                }}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "70%" }}
                            >
                                {uf.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                id="name"
                                label="Nome"
                                error={erros.name !== undefined}
                                className={classes.textField}
                                value={values.name}
                                onChange={handleChange("name")}
                                margin="normal"
                                variant="outlined"
                                helperText={showErrorText("name")}
                                style={{ width: "70%" }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="latitude"
                                label="Latitude"
                                error={erros.latitude !== undefined}
                                className={classes.textField}
                                value={values.latitude}
                                onChange={handleChange("latitude")}
                                margin="normal"
                                variant="outlined"
                                helperText={showErrorText("latitude")}
                                style={{ width: "70%" }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="longitude"
                                label="Longitude"
                                error={erros.longitude !== undefined}
                                className={classes.textField}
                                value={values.longitude}
                                onChange={handleChange("longitude")}
                                margin="normal"
                                variant="outlined"
                                helperText={showErrorText("longitude")}
                                style={{ width: "70%" }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="region"
                                label="Região"
                                error={erros.region !== undefined}
                                className={classes.textField}
                                value={values.region}
                                onChange={handleChange("region")}
                                margin="normal"
                                variant="outlined"
                                helperText={showErrorText("region")}
                                style={{ width: "70%" }}
                            />
                        </div>
                        <Botao
                            onClick={() => CreateCity()}
                            label="Cadastrar"
                            sendIcon={<SendIcon style={{ marginLeft: "10px" }}></SendIcon>}
                        ></Botao>
                    </Paper>
                    <div style={{ flex: 2 }} className={classes.paper}>
                        <List />
                    </div>
                </div>
            </form>
        </Container>
    );
}

import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Container, CssBaseline} from "@material-ui/core";
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({});

let refObject = React.createRef();
// window.a = refObject;
ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <Container maxWidth={'md'}>
                <App/>
            </Container>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

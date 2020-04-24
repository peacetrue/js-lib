import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lobby, {lobbyDefaults} from './lobby/Lobby';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@material-ui/core";
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({});

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <Container maxWidth={'xs'} style={{padding: '8'}}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <Typography variant={'h6'}> 童年小游戏 </Typography>
                    </Toolbar>
                </AppBar>
                <Lobby {...lobbyDefaults} />
                <footer style={{textAlign: 'center', margin: '16px 0'}}> © 2020 Peacetrue, Inc.</footer>
            </Container>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

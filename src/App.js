/*
    Using the Hamburger Menu from here
    https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

    Using style-components for the AuthorTable and AuthorForm
    from here: https://styled-components.com/docs/basics

*/


import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu, AuthorTable, AuthorForm } from './components';
import FocusLock from 'react-focus-lock';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";


function App() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

    useOnClickOutside(node, () => setOpen(false));

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                <div ref={node}>
                    <FocusLock disabled={!open}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                        <Menu open={open} setOpen={setOpen} id={menuId} />
                    </FocusLock>
                </div>



            </>
            <Router>
                <Switch>
                    <Route exact path="/loan-management">
                        <LoanManagement />
                    </Route>
                    <Route exact path="/member-management">
                        <LoanManagement />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/:id">
                        <AuthorManagement />
                    </Route>

                </Switch>

            </Router>
        </ThemeProvider>

    );


    function Home() {

        return (
            <div>
                <AuthorTable/>
            </div>
        );
    }
    function AuthorManagement() {
        let { id } = useParams();

        return (
            <div>
                <div>
                    <AuthorTable />
                </div>
                <div>
                    <AuthorForm author_id={id}/>
                </div>
            </div>

        );
    }

    function LoanManagement() {


        return (
            <div>
                Working on this feature
            </div>
        );
    }

    function MemberManagement() {


        return (
            <div>
                Working on this feature
            </div>
        );
    }
}



export default App;

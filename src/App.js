import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { client } from "./apollo";
import routes from "./routes";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Switch>
                            <Route path={routes.home} exact>
                                {isLoggedIn ? (
                                    <Layout>
                                        <Home />
                                    </Layout>
                                ) : <Login />}
                            </Route>
                            {!isLoggedIn ? (
                                <Route path={routes.signUp} exact>
                                    <SignUp />
                                </Route>
                            ) : null}
                            <Route path={`/users/:username`}>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </Route>
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

export default App;

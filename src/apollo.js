import { ApolloClient, HttpLink, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "dark-mode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = token => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};
export const logUserOut = history => {
    localStorage.removeItem(TOKEN);
    history.replace();
    window.location.reload();
    isLoggedInVar(false);
};


export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};
export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});
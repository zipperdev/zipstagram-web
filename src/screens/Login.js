import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { LogoImage, Notification } from "../components/shared";
import PageTitle from "../components/PageTitle";
import HeaderContainer from "../components/auth/HeaderContainer";
import AuthLayout from "../components/auth/AuthLayout";
import TopBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/SubmitButton";
import Input from "../components/auth/Input";
import routes from "../routes";

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            success
            token
            error
        }
    }
`;

function Login() {
    const location = useLocation();
    const history = useHistory();
    const { register, handleSubmit, formState, errors, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            email: location?.state?.email || "",
            password: location?.state?.password || ""
        }
    });
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: data => {
            const { login: { success, error, token } } = data;
            if (!success) {
                return setError("result", {
                    message: error
                });
            } else {
                return logUserIn(token, history);
            };
        }
    });
    const clearLoginError = () => {
        clearErrors("result");
    };
    const onSubmitValid = () => {
        if (loading) {
            return;
        } else {
            const { email, password } = getValues();
            login({
                variables: {
                    email,
                    password
                }
            });
        };
    };
    return (
        <AuthLayout>
            {location?.state?.message ? (
                <Notification>{location?.state?.message}</Notification>
            ) : null}
            <PageTitle title="Log In" />
            <TopBox>
                <HeaderContainer>
                    <LogoImage />
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input onChange={clearLoginError} errorMessage={errors?.email?.message} ref={register({
                        required: "Email address is required.",
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                            message: "Email address is invalid."
                        }
                    })} name="email" type="text" placeholder="Email" />
                    <Input onChange={clearLoginError} errorMessage={errors?.password?.message} ref={register({
                        required: "Password is required."
                    })} name="password" type="password" placeholder="Password" />
                    <Button errorResult={errors?.result?.message} type="submit" value={loading ? "Loading..." : "Log In"} disabled={!formState.isValid || loading} />
                </form>
            </TopBox>
            <BottomBox actionText="Don't have an acount?" link={routes.signUp} linkText="Sign Up" />
        </AuthLayout>
    );
};

export default Login;
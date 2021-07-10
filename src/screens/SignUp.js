import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { WeightText, LogoImage } from "../components/shared";
import PageTitle from "../components/PageTitle";
import HeaderContainer from "../components/auth/HeaderContainer";
import AuthLayout from "../components/auth/AuthLayout";
import TopBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/Button";
import Input from "../components/auth/Input";
import routes from "../routes";

const Subtitle = styled(WeightText)`
    margin-top: 10px;
    font-size: 13px;
    width: 220px;
    text-align: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            success
            error
        }
    }
`;

function SignUp() {
    const history = useHistory();
    const { register, handleSubmit, errors, formState, setError, getValues, clearErrors } = useForm({
        mode: "onChange"
    });
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted: data => {
            const { email, password } = getValues();
            const { createAccount: { success, error } } = data;
            if (!success) {
                return setError("result", {
                    message: error
                });
            } else {
                history.push(routes.home, { message: "Account created. Please log in.", email, password });
            };
        }
    });
    const clearLoginError = () => {
        clearErrors("result");
    };
    const onSubmitValid = data => {
        if (loading) {
            return;
        } else {
            const {
                firstName,
                lastName,
                username,
                email,
                password,
                confrimPassword
            } = data;
            if (password === confrimPassword) {
                createAccount({
                    variables: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password
                    }
                });
            };
        };
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign Up" />
            <TopBox>
                <HeaderContainer>
                    <LogoImage />
                    <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input onChange={clearLoginError} ref={register({
                        required: "First name is required.",
                        validate: currrentValue => currrentValue.length < 40
                    })} errorMessage={errors?.firstName?.type === "validate" ? "First name must be shorter than 40." : errors?.firstName?.message} name="firstName" type="text" placeholder="First Name" />
                    <Input onChange={clearLoginError} ref={register({
                        validate: currrentValue => currrentValue.length < 40
                    })} errorMessage={errors?.lastName?.type === "validate" ? "Last name must be shorter than 40." : errors?.lastName?.message} name="lastName" type="text" placeholder="Last Name" />
                    <Input onChange={clearLoginError} ref={register({
                        required: "Username is required.",
                        validate: currrentValue => currrentValue.length < 40
                    })} errorMessage={errors?.username?.type === "validate" ? "Username must be shorter than 40." : errors?.username?.message} name="username" type="text" placeholder="Username" />
                    <Input onChange={clearLoginError} ref={register({
                        required: "Email address is required.",
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                            message: "Email address is invalid."
                        }
                    })} errorMessage={errors?.email?.message} name="email" type="text" placeholder="Email" />
                    <Input onChange={clearLoginError} ref={register({
                        required: "Password is required.",
                        validate: currentValue => currentValue.length >= 8
                    })} errorMessage={errors?.password?.type === "validate" ? "Password must be longger than 7." : errors?.password?.message} name="password" type="password" placeholder="Password" />
                    <Input onChange={clearLoginError} ref={register({
                        required: "Password confrimation is required.",
                        validate: currrentValue => {
                            const { password } = getValues();
                            return currrentValue === password;
                        }
                    })} errorMessage={errors?.confrimPassword?.type === "validate" ? "Password confrimation doesn't match." : errors?.confrimPassword?.message} name="confrimPassword" type="password" placeholder="Password Confrim" />
                    <Button errorResult={errors?.result?.message} type="submit" disabled={!formState.isValid || loading}>{loading ? "Loading..." : "Sign Up"}</Button>
                </form>
            </TopBox>
            <BottomBox actionText="Already have an acount?" link={routes.home} linkText="Log In" />
        </AuthLayout>
    );
};

export default SignUp;
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function PageTitle({ title }) {
    return <Helmet><title>{title} | Zipstagram</title></Helmet>
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default PageTitle;
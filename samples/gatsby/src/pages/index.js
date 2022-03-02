/* eslint-disable no-use-before-define */
import React from "react";
import "@twicpics/components-sample/Sample.css";
import Sample from "@twicpics/components-sample/Sample.jsx";
import Menu from "../components/menu";

const IndexPage = () => (
    <main>
        <Menu></Menu>
        <Sample></Sample>
    </main>
);

export default IndexPage;

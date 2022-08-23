/* eslint-disable no-use-before-define */
import React from "react";
import "@twicpics/components-sample/Sample.css";
import Sample from "@twicpics/components-sample/Sample.jsx";
import MenuBar from "../components/menuBar";

const IndexPage = () => (
    <main>
        <MenuBar></MenuBar>
        <Sample></Sample>
    </main>
);

export default IndexPage;

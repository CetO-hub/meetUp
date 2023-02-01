import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import * as atatus from "atatus-spa";
atatus.config("9cfab6d35c2a42f888ebb75148b95963").install();
const root = document.getElementById("root");
render(<App />, root);

atatus.notify(new Error("Test Atatus Setup"));

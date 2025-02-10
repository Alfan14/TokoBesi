import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-react-inputs/styles/material.css";
import "@syncfusion/ej2-react-buttons/styles/material.css";

import "./login.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";
import useAuth from "../hooks/auth";

const Login = () => {
};
export default Login;
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-react-inputs/styles/material.css";
import "@syncfusion/ej2-react-buttons/styles/material.css";
import "./login.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import Toast from "../components/Toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";
import User from '../models/User';

const Signup= async (req, res) =>  {
  
};

export default Signup;
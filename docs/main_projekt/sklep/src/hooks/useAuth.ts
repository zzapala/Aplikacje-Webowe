import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import type {AuthContextType} from "../context/AuthContext";

const useAuth = (): AuthContextType => useContext(AuthContext);

export default useAuth;


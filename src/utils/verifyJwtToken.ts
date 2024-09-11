import { jwtDecode } from "jwt-decode";

const verifyJwtToken = (token: string) => {
    return jwtDecode(token)
};

export default verifyJwtToken;
import React from "react";
import SignInForm from "../../components/SignInForm";
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";
import { login, getProfileInfo } from "../../services/user.service"
import { useHistory } from "react-router-dom";

function Login(props) {
    const { dispatch } = React.useContext(AuthContext);
    const history = useHistory();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Card title="Login" bordered={false} style={{ width: 300 }}>
                <SignInForm
                    onFinish={(data) => {
                        console.log(data)
                        login(data.email, data.password)
                            .then(res => {
                                const token = res.message
                                getProfileInfo(token)
                                    .then(res => {
                                        dispatch({
                                            type: "LOGIN",
                                            payload: {
                                                user: res,
                                                token
                                            }
                                        })
                                        history.push("/home")
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                    onFinishFailed={() => { }}
                />
            </Card>
            <p>Non hai un account? <Link to="/signup">Registrati</Link></p>

        </div>
    )
}

export default Login
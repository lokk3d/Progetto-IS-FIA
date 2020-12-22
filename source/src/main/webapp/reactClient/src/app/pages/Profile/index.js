import React, { useState, useEffect } from "react";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button } from 'antd';
import ReviewCard from "../../components/ReviewCard";
import { AuthContext } from "../../../App";
import { getProfileInfo } from "../../services/user.service"

const { Title, Paragraph } = Typography;
function Profile(props) {

    const { dispatch, state } = React.useContext(AuthContext);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (state && state.token) {
            getProfileInfo(state.token)
                .then(res => setReviews(res.reviews))
        } else {
            //Ti riporto sul login
        }
    }, [state])

    const logOut = () => {
        dispatch({
            type: "LOGOUT"
        })
        window.location.href = "/home"

    }


    return (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined />}
                />
                <Title level={3} style={{ marginBottom: "0px" }}>{(state && state.user.email) || "test@test.com"}</Title>
                <Paragraph><b>{(state && state.user.username) || "Test"}</b></Paragraph>
            </div>

            <Title level={2}>Le mie recensioni</Title>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                {
                    reviews.map((review, index) =>
                        <ReviewCard
                            key={index}
                            title={review.spec.name}
                            subtitle={review.state}
                            camera={review.camera}
                            display={review.display}
                            performance={review.performance}
                            battery={review.battery}
                            description={review.text}
                        />)
                }

            </div>


            <Button type="primary" style={{ marginTop: "30px" }} onClick={() => { logOut() }}>Logout</Button>


        </div>
    )
}

export default Profile
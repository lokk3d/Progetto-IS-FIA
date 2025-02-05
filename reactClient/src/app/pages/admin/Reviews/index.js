import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from 'antd';
import { getPendingReviews } from "../../../services/review.service"
import ReviewCard from "../../../components/ReviewCard";
import { changeReviewStatus } from "../../../services/review.service"
import { AuthContext } from "../../../../App";

function Reviews(props) {

    const [data, setData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviewDetail, setReviewDetail] = useState()
    const { state } = React.useContext(AuthContext);


    useEffect(() => {
        loadPendingReviews()
    }, [])


    const loadPendingReviews = () => {
        setReviewDetail(undefined)
        getPendingReviews(state.token)
            .then(res => {
                const tempData = res.map(item => ({ ...item, title: item.spec.name + " | " + item.user.username }))
                setData(tempData)
            })
            .catch(err => {
                console.log(err)
                message.error(err.response.data.message)
            })
    }


    const renderReviewDetails = review => {
        setReviewDetail(review)
    }
    const handleCancel = () => {
        setReviewDetail(undefined)
    };

    useEffect(() => {
        setIsModalVisible(!!reviewDetail);
    }, [reviewDetail])

    const approveReview = review => setStatusReview(review, true)
    const rejectReview = review => setStatusReview(review, false)

    const setStatusReview = (review, newState) => {
        changeReviewStatus({ id: review.id, approved: newState }, state.token)
            .then(res => {
                console.log(res)
                message.success('Correctly updated review');
                loadPendingReviews()
            })
            .catch(err => {
                console.log(err)
                message.error(err.response.data.message)
            })
    }

    const columns = [
        {
            title: 'Reviews to be evaluated',
            dataIndex: 'title',
            key: 'title',
        }
    ];


    return (
        <div>
            <Table
                dataSource={data}
                columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { renderReviewDetails(record) },

                    };
                }}
            />
            <Modal title="Review details" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button onClick={() => { rejectReview(reviewDetail) }}>
                        Reject
                    </Button>,
                    <Button type="primary" onClick={() => { approveReview(reviewDetail) }}>
                        Approve
                    </Button>,
                ]}>
                {
                    reviewDetail && <ReviewCard
                        title={reviewDetail.user.email}
                        camera={reviewDetail.camera}
                        display={reviewDetail.display}
                        performance={reviewDetail.performance}
                        battery={reviewDetail.battery}
                        description={reviewDetail.text}
                    />
                }

            </Modal>

        </div>
    )
}

export default Reviews
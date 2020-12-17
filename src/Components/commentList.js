import React from 'react'
import Comment from './comment'

function CommentList(props) {

    return (

        <div className="ml-4 mt-3" style={{ width: "100%" }}>

            <h5 className="text-muted mb-5">
                <span className="badge badge-success pt-2 px-2 pb-1 mr-2" > {props.comments.length} </span>
                <h3 className="d-inline"> Review{props.comments.length <= 1 ? "" : "s"}</h3>
            </h5>

            {props.comments.length === 0 && !props.loading ? (
                <div className="comment-empty">
                    Be the first one to Review!
                </div>
            ) : null}

            {props.comments.map((comment, index) => (

                <Comment key={index} comment={comment} />
            ))}
        </div>
    )
}

export default CommentList
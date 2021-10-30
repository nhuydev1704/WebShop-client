import React from 'react';
import Rating from '../rating/Rating';
import moment from 'moment';
import { Avatar } from 'antd';

function CommentCard({ children, comment, reply }) {
    return (
        <div className={reply ? 'comment_card comment_card-reply' : 'comment_card comment_card-noreply'}>
            <div className="comment_card_row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                    <h3>{comment.username}</h3>
                    <div style={{ color: '#ccc' }}>
                        <span>{new Date(comment.createdAt).toLocaleString()}</span>

                        <span>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                </div>
                {comment.rating !== 0 && <Rating props={comment} />}
            </div>

            <p
                className="mar-left"
                style={{ textTransform: 'capitalize' }}
                dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>

            {children}
        </div>
    );
}

export default CommentCard;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CommentService from "../../api/comment-service";
import AddComment from "../addComment/addComment";
import Button from "../../style/Button.styled";
import Services from "../../style/Services.styled";
import { ServicesWrapper } from "../../pages/SinglePost/SinglePost.styled";
import { CommentStyled, ReplyComment } from "./Comment";

function Comments({
  _id,
  text,
  dateCreated,
  commentedBy,
  likes,
  allComments,
  postId,
  setAllComments,
}) {
  const { id } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [commentLikes, setCommentLikes] = useState(likes.length);

  useEffect(() => {
    if (likes.includes(id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id, likes]);

  const handleOnDelete = (commentId) => {
    CommentService.deleteComment(commentId).then(() => {
      CommentService.getAllComments(postId).then((res) => {
        setAllComments(res.data);
      });
    });
  };

  const handleOnLike = (commentId) => {
    CommentService.likeComment(commentId);
    if (isLiked) {
      setCommentLikes(commentLikes - 1);
    } else {
      setCommentLikes(commentLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const replyComments = useMemo(() => {
    return allComments.filter((comment) => comment.followedCommentID === _id);
  }, [allComments, _id]);

  return (
    <>
      {showEdit ? (
        <AddComment
          setShowEdit={setShowEdit}
          postId={postId}
          method={CommentService.editComment}
          commentId={_id}
          setAllComments={setAllComments}
        />
      ) : (
        <CommentStyled>
          <div className="comment-entry">
            <p className="comment-text">{text}</p>
          </div>
          <div className="comment-meta">
            <div className="comment-author">
              commented by {commentedBy || "anon"}
            </div>
            <div className="comment-date">commented at {dateCreated}</div>
          </div>
          <ServicesWrapper>
            <Button
              styled
              width="fit-content"
              type="button"
              onClick={() => isLoggedIn && handleOnLike(_id)}
            >
              {isLiked ? "Unlike" : "Like"} {commentLikes}
            </Button>
            <Services>
              {isLoggedIn && (
                <Button
                  type="button"
                  width="fit-content"
                  onClick={() => setShowReply(!showReply)}
                >
                  Reply
                </Button>
              )}
              {id === commentedBy && (
                <>
                  <Button
                    type="button"
                    width="fit-content"
                    onClick={() => setShowEdit(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    width="fit-content"
                    onClick={() => handleOnDelete(_id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Services>
          </ServicesWrapper>
          {showReply && (
            <AddComment
              followedCommentID={_id}
              postId={postId}
              setAllComments={setAllComments}
              setShowReply={setShowReply}
              method={CommentService.addComment}
              backgroundDark="backgroundDark"
            />
          )}
        </CommentStyled>
      )}

      <ReplyComment>
        {replyComments.map((comment) => {
          return (
            <Comments
              allComments={allComments}
              key={comment._id}
              {...comment}
              postId={postId}
              setAllComments={setAllComments}
            />
          );
        })}
      </ReplyComment>
    </>
  );
}

export default Comments;

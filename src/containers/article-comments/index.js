import CommentsRender from "../../components/comments-render";
import { useSelector } from "react-redux";
import storeSelector from "../../hooks/use-selector";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { sortCategory } from "../../utils/plural";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPrompt from "../../components/login-prompt";
import SendComment from "../../components/send-comment";
import CommentsTitle from "../../components/comments-title";
import commentsAction from "../../store-redux/comments/actions";

function ArticleComments() {
  const select = storeSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
    user: state.session.user,
  }));
  const params = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => ({
    comments: state.comments.comments,
  }));
  const [openCard, setOpenCard] = useState(false);

  const sendCommentWithArticleId = (comment, id) => {
    dispatch(commentsAction.sendComments(comment, id, "article", params.id));
  };

  const sendCommentWithParentId = (comment, id) => {
    dispatch(commentsAction.sendComments(comment, id, "comment", params.id));
  };

  const renders = {
    sendComment: useCallback((parentId) => (
      <SendComment
        openCard={openCard}
        setOpenCard={setOpenCard}
        sendComment={sendCommentWithParentId}
        parentId={parentId}
      />
    )),
    loginPrompt: useCallback(() => (
      <LoginPrompt cancel="Отмена" setOpenCard={setOpenCard} />
    )),
  };

  return (
    <div style={{ padding: "0px 40px 30px" }}>
      <CommentsTitle countComments={comments.comments.count} />
      <CommentsRender
        openCard={openCard}
        session={select.exists}
        setOpenCard={setOpenCard}
        comments={comments.comments.items}
        renderComponent={renders}
        user={select.user}
      />
      {!openCard &&
        (select.exists ? (
          <SendComment
            setOpenCard={setOpenCard}
            sendComment={sendCommentWithArticleId}
            parentId={params.id}
          />
        ) : (
          <LoginPrompt />
        ))}
    </div>
  );
}

export default ArticleComments;

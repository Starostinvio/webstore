import CommentsRender from "../../components/comments-render";

import { useSelector } from "react-redux";
import storeSelector from "../../hooks/use-selector";
import { useState, useEffect, useMemo, useRef } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { sortCategory } from "../../utils/plural";
import { Link } from "react-router-dom";
import LoginPrompt from "../../components/login-prompt";
import SendComment from "../../components/send-comment";

function ArticleComments() {
  const select = storeSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
  }));
  const comments = useSelector((state) => ({
    comments: state.comments.comments,
  }));
  const [openCard, setOpenCard] = useState(false);

  return (
    <div style={{ padding: "0px 40px" }}>
      <h2>Комментарии({comments.comments.count})</h2>
      <CommentsRender
        openCard={openCard}
        setOpenCard={setOpenCard}
        comments={comments.comments.items}
      >
        {select.exists && openCard ? (
          // <div>Форма для комментирования child</div>
          <SendComment openCard={openCard} setOpenCard={setOpenCard} />
        ) : (
          <LoginPrompt cancel="Отмена" setOpenCard={setOpenCard} />
        )}
      </CommentsRender>
      {!openCard &&
        (select.exists ? (
          // <div>Форма для комментирования main</div>
          <SendComment />
        ) : (
          <LoginPrompt />
        ))}
    </div>
  );
}

export default ArticleComments;

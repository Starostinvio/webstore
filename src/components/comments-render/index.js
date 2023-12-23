import "./style.css";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { sortCategory } from "../../utils/plural";
import treeToList from "../../utils/tree-to-list";

import { useParams } from "react-router-dom";
import listToTreeComment from "../../utils/sortComment";
import formatDateTime from "../../utils/formatDataTime";
import { render } from "react-dom";

function CommentsRender({
  openCard,
  setOpenCard,
  comments,
  renderComponent,
  session,
  user,
}) {
  const [commentId, setCommentId] = useState();
  const id = useParams();
  const [sortComment, setSortComment] = useState([]);

  const handlerOpenCard = (id) => {
    setOpenCard(true);
    setCommentId(id);
  };

  useEffect(() => {
    if (comments) {
      setSortComment([
        ...treeToList(listToTreeComment(comments, "_id", id), (item, level) => {
          return {
            _id: item._id,
            text: item.text,
            level: level,
            dateCreate: formatDateTime(item.dateCreate),
            name: item.author.profile.name,
          };
        }),
      ]);
    }
  }, [comments]);

  return (
    <>
      {sortComment?.map((item) => {
        return (
          <div key={item._id} className="CommentsRender">
            <div
              className="CommentsRender-box"
              style={{ paddingLeft: `${item.level * 30}px` }}
            >
              <div className="CommentsRender-title">
                <p
                  className="CommentsRender-title title"
                  style={{
                    color: item.name === user.profile?.name ? "#666666" : "",
                  }}
                >
                  {item.name}
                </p>
                <p className="CommentsRender-title date">{item.dateCreate}</p>
              </div>
              <p className="CommentsRender-text">{item.text}</p>

              <div
                className="CommentsRender-answer"
                onClick={() => handlerOpenCard(item._id)}
              >
                Ответить
              </div>
            </div>
            {openCard && item._id === commentId && (
              <div style={{ paddingLeft: `${item.level * 30}px` }}>
                {openCard && session
                  ? renderComponent.sendComment(commentId)
                  : renderComponent.loginPrompt()}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

CommentsRender.propTypes = {
  openCard: PropTypes.bool,
  setOpenCard: PropTypes.func,
  comments: PropTypes.array,
  renderComponent: PropTypes.object,
  session: PropTypes.bool,
  user: PropTypes.object,
};

export default CommentsRender;

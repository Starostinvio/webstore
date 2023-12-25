import "./style.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import treeToList from "../../utils/tree-to-list";
import { useParams } from "react-router-dom";
import listToTree from "../../utils/list-to-tree";
import formatDateTime from "../../utils/formatDataTime";

function CommentsRender({
  openCard,
  setOpenCard,
  comments,
  renderComponent,
  session,
  user,
}) {
  const [commentId, setCommentId] = useState();
  const [sortComment, setSortComment] = useState([]);
  const id = useParams();

  const handlerOpenCard = (id) => {
    setOpenCard(true);
    setCommentId(id);
  };

  useEffect(() => {
    if (comments) {
      setSortComment([
        ...treeToList(listToTree(comments, "_id", id), (item, level) => {
          return {
            _id: item._id,
            text: item.text,
            level: level,
            dateCreate: formatDateTime(item.dateCreate),
            name: item.author.profile
              ? item.author.profile.name
              : user.profile.name,
          };
        }),
      ]);
    }
  }, [comments]);

  function findLastChildId() {
    if (sortComment.length > 0) {
      const indexCommentId = sortComment.findIndex(
        (item) => item._id === commentId._id
      );

      let newArray = [];
      indexCommentId !== sortComment.length - 1
        ? (newArray = sortComment.slice(indexCommentId + 1))
        : newArray.push(commentId);

      const nextSiblingIndex = newArray.findIndex(
        (item) => item.level <= commentId.level
      );
      let lastChild;
      nextSiblingIndex === 0
        ? (lastChild = commentId)
        : (lastChild = newArray[nextSiblingIndex - 1]);

      return lastChild._id;
    }
  }

  return (
    <>
      {sortComment?.map((item) => {
        return (
          <div key={item._id} className="CommentsRender">
            <div
              className="CommentsRender-box"
              style={{
                paddingLeft: `${item.level >= 6 ? 5 * 30 : item.level * 30}px`,
              }}
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
                onClick={() => handlerOpenCard(item)}
              >
                Ответить
              </div>
            </div>

            {openCard && item._id === findLastChildId() && (
              <div
                style={{
                  paddingLeft: `${
                    commentId.level >= 5 ? 5 * 30 : (commentId.level + 1) * 30
                  }px`,
                }}
              >
                {openCard && session
                  ? renderComponent.sendComment(commentId._id)
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

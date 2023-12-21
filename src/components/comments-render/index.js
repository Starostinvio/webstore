import "./style.css";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect, useMemo } from "react";

import { sortCategory } from "../../utils/plural";
import treeToList from "../../utils/tree-to-list";

import { useParams } from "react-router-dom";
import listToTreeComment from "../../utils/sortComment";
import formatDateTime from "../../utils/formatDataTime";

function CommentsRender({ openCard, setOpenCard, comments, children }) {
  const [commentId, setCommentId] = useState();
  const id = useParams();
  const sortCommentsRef = useRef();
  const [comm, setComm] = useState([]);

  const handlerOpenCard = (id) => {
    setOpenCard(true);
    setCommentId(id);
  };

  useEffect(() => {
    if (comments) {
      console.log("HOW MATCH", comments);
      // console.log("SORTfUNC", sortCategory(comments, id));

      setComm([
        // { value: "", text: "Все" },
        ...treeToList(listToTreeComment(comments, "_id", id), (item, level) => {
          console.log("article commetns treeToList item", item, item._id);
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
      {comm?.map((item) => {
        return (
          <div key={item._id} className="CommentsRender">
            <div
              className="CommentsRender-box"
              style={{ paddingLeft: `${item.level * 30}px` }}
            >
              <div className="CommentsRender-title">
                <p className="CommentsRender-title title">{item.name}</p>
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
                {children}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default CommentsRender;

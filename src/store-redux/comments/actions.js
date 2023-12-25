const commentsAction = {
  commentsLoad: (id) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem("token");

      try {
        dispatch({ type: "comments/load-start" });

        const res = await services.api?.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({
          type: "comments/load",
          payload: { comments: res.data.result },
        });
      } catch (e) {
        console.log("Ощибка в comments", e);
      }
    };
  },
  sendComments: (text, id, type, articleId) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem("token");

      try {
        const res = await services.api?.request({
          url: `/api/v1/comments?lang=ru&fields=%2A`,
          method: "POST",
          headers: {
            "X-Token": token,
          },
          body: JSON.stringify({
            text: text,
            parent: { _id: id, _type: type },
          }),
        });

        if (res.status !== 200) {
          throw new Error("Send comment failed");
        }

        dispatch({
          type: "addComment",
          payload: res.data.result,
        });
      } catch (e) {
        console.log(e);
      }
    };
  },
};

export default commentsAction;

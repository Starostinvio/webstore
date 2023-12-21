import useSelector from "../../hooks/use-selector";

export default {
  // select: storeSelector((state) => ({
  //   waiting: state.session.waiting,
  //   errors: state.session.errors,
  //   token: state.session.token,
  // })),

  commentsLoad: (id) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({ type: "comments/load-start" });

        const res = await services.api?.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        console.log("!11 after res CommentsLoad res", res);
        dispatch({
          type: "comments/load",
          payload: { comments: res.data.result },
        });
      } catch (e) {
        console.log("Ощибка в comments", e);
      }
    };
  },
  sendComments: (token) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({ type: "comments/load-start" });

        const res = await services.api?.request({
          url: `/api/v1/comments?lang=ru&fields=%2A`,
          headers: {
            "X-Token":
              "c431a545fa0976a22822bc1c6d25137599b574b6693e579a6b1b5a066628fbc0",
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
  },
};

// 'http://example.front.ylab.io/api/v1/comments?lang=ru&fields=%2A' \
// -H 'accept: application/json' \
// -H 'X-Token: c431a545fa0976a22822bc1c6d25137599b574b6693e579a6b1b5a066628fbc0' \
// -H 'Content-Type: application/json' \
// -d {
// "text": "Очень важный комментарий 5346754",
// "parent": {"_id": "65817bed5c295a2ff2fcd180", "_type": "article"}

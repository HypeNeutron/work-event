import { memo } from "react";
import classes from "./CommentList.module.scss";

function CommentList({ items, isLoading }) {
  let data = "";

  if (isLoading) {
    data = <h2>Loading...</h2>;
  } else if (items) {
    data = items?.map((item) => (
      <li key={item._id}>
        <p>{item.comment}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
    ));
  }

  return <ul className={classes.commentsList}>{data}</ul>;
}

export default memo(CommentList);

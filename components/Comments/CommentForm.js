import { memo, useRef, useState } from "react";
import classes from "./CommentForm.module.scss";

function NewComment({ addComment, isSubmit }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const text = commentInputRef.current.value;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }
    addComment({
      email,
      name,
      text,
    });
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.form__controlGroup}>
        <div className={classes.form__control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.form__control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} required />
        </div>
      </div>
      <div className={classes.form__control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef} required />
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button type="submit" style={{ background: "white" }} disabled={isSubmit}>
        Submit
      </button>
    </form>
  );
}

export default memo(NewComment);

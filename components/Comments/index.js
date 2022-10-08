import { useEffect, useCallback, useState } from "react";
import getError from "../../utils/getError";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import classes from "./Comments.module.scss";
import { useNotificationContext } from "../../context/notification_context";

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const { show } = useNotificationContext();

  function toggleComments() {
    setShowComments((show) => !show);
  }

  const getComments = useCallback(
    async (adding) => {
      !adding ? setIsLoading(true) : setIsLoading(false);
      try {
        const resp = await fetch(`/api/comments/${eventId}`);
        if (!resp.ok) {
          return resp.json().then((data) => {
            throw new Error(data.message);
          });
        }
        const data = await resp.json();
        if (!data) {
          setIsLoading(false);
          return;
        }
        setComments(data.comments);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        show({
          title: "Error",
          message: getError(err),
          status: "error",
          hide: false,
        });
      }
    },
    [eventId, show]
  );

  useEffect(() => {
    if (showComments) {
      getComments();
    }
  }, [showComments, getComments]);

  const addComment = async (data) => {
    setIsSubmit(true);
    const fetOpt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(`/api/comments/${eventId}`, fetOpt);
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      const data = await res.json();
      if (data.invalid) {
        show({
          title: "Warning",
          message: data.message,
          status: "warning",
          hide: false,
        });
        setIsSubmit(false);
        return;
      }
      let adding = true;
      getComments(adding);
      setIsSubmit(false);
    } catch (err) {
      setIsSubmit(false);
      show({
        title: "Error",
        message: getError(err),
        status: "error",
        hide: false,
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleComments}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <>
          <CommentForm isSubmit={isSubmit} addComment={addComment} />
          <CommentList isLoading={isLoading} items={comments} />
        </>
      )}
    </section>
  );
}

export default Comments;

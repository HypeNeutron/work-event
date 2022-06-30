import { useRef, useState } from "react";
import classes from "./NewsletterRegistration.module.scss";
import { useNotificationContext } from "../../context/notification_context";

function NewsletterRegistration() {
  const { show } = useNotificationContext();

  const emailRef = useRef();
  const [isSubmit, setIsSubmit] = useState(false);

  const regisHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const email = await emailRef.current.value;
    if (!email || !email.includes("@")) {
      setIsSubmit(false);
      return;
    }

    show({
      title: "Signing up",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok || resp.status === 412) return resp.json();
        resp.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        if (data.success) {
          show({
            title: "Success",
            message: "Successfully registered for newsletter!",
            status: "success",
            hide: false,
          });
          emailRef.current.value = "";
          setIsSubmit(false);
          return;
        }
        show({
          title: "Warning",
          message: data.message,
          status: "warning",
          hide: false,
        });
        emailRef.current.value = "";
        setIsSubmit(false);
      })
      .catch((error) => {
        setIsSubmit(false);
        show({
          title: "Error",
          message: error.message,
          status: "error",
          hide: false,
        });
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={regisHandler}>
        <div className={classes.newsletter__formControl}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
            disabled={isSubmit}
            required
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

import classes from "./EventContent.module.scss";

export default function EventContent({ children }) {
  return <section className={classes.content}>{children}</section>;
}

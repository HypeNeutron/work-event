import classes from "./ErrorAlert.module.scss";

export default function ErrorAlert({ children }) {
  return <div className={classes.alert}>{children}</div>;
}

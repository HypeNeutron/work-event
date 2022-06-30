import classes from "./EventHeader.module.scss";

export default function EventHeader({ title }) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
    </header>
  );
}

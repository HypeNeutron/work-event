import classes from "./EventCardItem.module.scss";

export default function EventCardItem({ icon: Icon, children }) {
  return (
    <li className={classes.item}>
      <span className={classes.item__icon}>
        <Icon />
      </span>
      <span className={classes.item__content}>{children}</span>
    </li>
  );
}

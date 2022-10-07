import classes from "./EventList.module.scss";
import EventItems from "./EventItems";

export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItems item={item} key={item.id} />
      ))}
    </ul>
  );
}

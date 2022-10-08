import Image from "next/image";
import EventCardItem from "./EventCardItem";
import rgbDataURL from "../../../utils/rgbDataURL";
import { CalendarIcon, MapIcon } from "@heroicons/react/24/outline";
import classes from "./EventCard.module.scss";

export default function EventCard(props) {
  const { date, address, image, imageAlt } = props;

  const dateFormat = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address.replace(", ", "\n");

  return (
    <article className={classes.card}>
      <div className={classes.card__image}>
        <Image
          src={`/${image}`}
          width={530}
          height={530}
          alt={imageAlt}
          placeholder="blur"
          blurDataURL={rgbDataURL(255, 255, 255)}
        />
      </div>
      <ul className={classes.card__list}>
        <EventCardItem icon={CalendarIcon}>
          <time>{dateFormat}</time>
        </EventCardItem>
        <EventCardItem icon={MapIcon}>
          <address>{addressText}</address>
        </EventCardItem>
      </ul>
    </article>
  );
}

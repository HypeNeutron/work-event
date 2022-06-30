import classes from "./EventCard.module.scss";
import EventCardItem from "./EventCardItem";
import { CalendarIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import Image from "next/image";
import rgbDataURL from "../../../utils/rgbDataURL";

export default function EventCard(props) {
  const { date, address, image, imageAlt } = props;

  const dateFormat = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.card}>
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
        <EventCardItem icon={LocationMarkerIcon}>
          <address>{addressText}</address>
        </EventCardItem>
      </ul>
    </section>
  );
}

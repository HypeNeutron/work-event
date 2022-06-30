import classes from "./EventList.module.scss";
import Image from "next/image";
import Button from "../../Buttons/Button";
import rgbDataURL from "../../../utils/rgbDataURL";
import { CalendarIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/outline";

export default function EventItems({ item }) {
  const { title, image, date, location, id, imgAlt } = item;

  const formatDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatAddr = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image
        src={`/${image}`}
        placeholder="blur"
        blurDataURL={rgbDataURL(255, 255, 255)}
        alt={imgAlt}
        width={280}
        height={230}
      />
      <div className={classes.item__content}>
        <div className={classes.item__main}>
          <h2>{title}</h2>
          <div className={classes.item__date}>
            <CalendarIcon />
            <time>{formatDate}</time>
          </div>
          <div className={classes.item__address}>
            <LocationMarkerIcon />
            <address>{formatAddr}</address>
          </div>
        </div>
        <div className={classes.item__actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.item__icon}>
              <ArrowRightIcon width={20} />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

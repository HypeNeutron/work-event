import Link from "next/link";
import classes from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={classes.nav}>
      <div className={classes.nav__logo}>
        <Link href={`/`}>WorkEvents</Link>
      </div>
      <div className={classes.nav__navigation}>
        <ul>
          <li>
            <Link href={`/events`}>Browse All Events</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import Link from "next/link";
import classes from "./Button.module.scss";

export default function Button({ link, onClick, children }) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}

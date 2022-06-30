import Image from "next/image";
import image404 from "../public/image404.png";
import classes from "./404.module.scss";

export default function NotFoundPage() {
  return (
    <section className={classes.notFound}>
      <div className={classes.notFound__center}>
        <center>
          <Image
            src={image404}
            alt="404 Page Not Found"
            width="500vw"
            height="500vw"
          />
          <h1>This Page is Lost</h1>
        </center>
        <p>
          You told your friends you weren’t bringing your phone, to try and
          experience what travel was like back in the day. You bought a map and
          a bottle of water and carried your camera for the money shot. But the
          map was from 2005 and the landscape had changed. So here you are, in
          the middle of a large field, that the map continues to claim is a
          local grocer.
        </p>
      </div>
    </section>
  );
}

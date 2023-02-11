import { getFeaturedEvents } from "../api/firebaseApi";
import getError from "../utils/getError";
import Header from "../components/Events/Header";
import NewsLettersRegister from "../components/NewsLettersRegister";
import EventList from "../components/Events/EventList";

export default function HomePage({ event, err }) {
  if (err)
    return (
      <center>
        <br />
        <br />
        <h1>{getError(err)}</h1>
      </center>
    );
  return (
    <>
      <Header
        title="Work Event"
        desc="Explore New Events you can attendance free and paid every week!"
      />
      <NewsLettersRegister />
      <EventList items={event} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  if (featuredEvents instanceof Array) {
    return { props: { event: featuredEvents }, revalidate: 1800 };
  }
  return { props: { err: featuredEvents } };
}

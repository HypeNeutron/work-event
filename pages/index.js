import { getFeaturedEvents } from "../utils/api-util";
import Header from "../components/Events/Header";
import NewsletterRegistration from "../components/NewsLettersRegister/NewsletterRegistration";
import EventList from "../components/Events/EventList/";

export default function HomePage({ event, err }) {
  if (err)
    return (
      <center>
        <h1>{err}</h1>
      </center>
    );
  return (
    <div>
      <Header
        title="Work Event"
        desc="Explore New Events you can attendance free and paid every week!"
      />
      <NewsletterRegistration />
      <EventList items={event} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  if (featuredEvents instanceof Array) {
    return { props: { event: featuredEvents }, revalidate: 1800 };
  }
  return { props: { err: featuredEvents } };
}

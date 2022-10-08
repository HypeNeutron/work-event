import { getAllEvents } from "../../utils/api";

import getError from "../../utils/getError";
import EventList from "../../components/Events/EventList";
import EventSearchLayout from "../../components/Events/EventSearchLayout";
import Header from "../../components/Events/Header";

export default function allEventPage({ events, err }) {
  if (err)
    return (
      <>
        <Header title="All Event" desc="browse all work events" />
        <EventSearchLayout>
          <h1>{getError(err)}</h1>
        </EventSearchLayout>
      </>
    );

  return (
    <>
      <Header title="All Event" desc="browse all work events" />
      <EventSearchLayout>
        <EventList items={events} />
      </EventSearchLayout>
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  if (!events) {
    return {
      notFound: true,
    };
  }
  if (events instanceof Array) {
    return { props: { events }, revalidate: 45 };
  }
  return { props: { err: events } };
}

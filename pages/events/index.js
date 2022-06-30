import { getAllEvents } from "../../utils/api-util";
import EventList from "../../components/Events/EventList/EventList";
import SearchLayout from "../../components/Layouts/SearchLayout";
import Header from "../../components/Events/Header";

export default function allEventPage({ events }) {
  return (
    <>
      <Header title="All Event" desc="browse all work events" />
      <SearchLayout>
        <EventList items={events} />
      </SearchLayout>
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

  return {
    props: { events },
    revalidate: 45,
  };
}

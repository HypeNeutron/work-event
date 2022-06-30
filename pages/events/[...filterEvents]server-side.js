// import { useRouter } from "next/router";
import { getFilteredEvents } from "../../utils/api-util";
import EventList from "../../components/Events/EventList/EventList";
import SearchLayout from "../../components/Layouts/SearchLayout";
import Button from "../../components/Buttons/Button";
import TitleEvent from "../../components/Events/TitleEvent";
import ErrorAlert from "../../components/Events/ErrorAlert";

export default function FilterEvent({
  loading,
  filteredEvents,
  numYear,
  numMonth,
  notFound,
  invalid,
}) {
  let eventList;

  if (loading) {
    eventList = <p>Loading...</p>;
  } else if (invalid) {
    eventList = (
      <>
        <ErrorAlert>
          <p>Invalid Filter Please adjust your values..🔎</p>
        </ErrorAlert>
        <Button link="/events">Show all Event</Button>
      </>
    );
  } else if (notFound) {
    eventList = (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <Button link="/events">Show all Event</Button>
      </>
    );
  } else {
    const date = new Date(numYear, numMonth);

    eventList = (
      <>
        <div style={{ marginTop: "50px" }}>
          <TitleEvent date={date} />
          <Button link="/events">Show all Event</Button>
        </div>
        <EventList items={filteredEvents} />
      </>
    );
  }

  return (
    <SearchLayout>
      <center>{eventList}</center>
    </SearchLayout>
  );
}

export async function getServerSideProps({ params }) {
  const filterEvents = params.filterEvents;

  if (!filterEvents) {
    return { props: { loading: true } };
  }

  const numYear = +filterEvents[0];
  const numMonth = +filterEvents[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2022 ||
    numMonth < 0 ||
    numMonth > 12
  ) {
    return { props: { invalid: true } };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (filteredEvents.length === 0 || !filteredEvents) {
    return { props: { notFound: true } };
  }

  return {
    props: { filteredEvents, numYear, numMonth },
  };
}

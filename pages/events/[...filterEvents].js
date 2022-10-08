import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList";
import EventSearchLayout from "../../components/Events/EventSearchLayout";
import Button from "../../components/Buttons";
import TitleEvent from "../../components/Events/TitleEvent";
import ErrorAlert from "../../components/Events/ErrorAlert";
import Header from "../../components/Events/Header";

export default function FilterEvent() {
  const [allEvent, setAllEvent] = useState([]);
  const router = useRouter();

  const {
    query: { filterEvents },
  } = router;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_FIREBASE_DB_URI,
    fetcher
  );

  useEffect(() => {
    // get data from firebase on client and filter
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setAllEvent(events);
    }
  }, [data]);

  let pageHeadData = (
    <Header title="Filtered Events" desc="A list of filtered events." />
  );

  if (!data || !allEvent || !filterEvents) {
    return (
      <>
        {pageHeadData}
        <EventSearchLayout>
          <p>Loading...</p>
        </EventSearchLayout>
      </>
    );
  }

  const numYear = +filterEvents[0];
  const numMonth = +filterEvents[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2022 ||
    numMonth < 0 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <EventSearchLayout>
          <ErrorAlert>
            <p>Invalid Filter Please adjust your values..🔎</p>
          </ErrorAlert>
          <Button link="/events">Show all Event</Button>
        </EventSearchLayout>
      </>
    );
  }

  const filteredEvents = allEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth
    );
  });

  const currentSearch = { numYear, numMonth };

  if (filteredEvents.length === 0 || !filteredEvents) {
    return (
      <>
        {pageHeadData}
        <EventSearchLayout currentSearch={currentSearch}>
          <ErrorAlert>
            <p>No events found</p>
          </ErrorAlert>
          <Button link="/events">Show all Event</Button>
        </EventSearchLayout>
      </>
    );
  }

  const date = new Date(numYear, numMonth);

  return (
    <>
      <Header
        title="Filtered Events"
        desc={`All events in ${numMonth}/${numYear}`}
      />
      <EventSearchLayout currentSearch={currentSearch}>
        <div style={{ marginTop: "50px" }}>
          <TitleEvent date={date} />
          <Button link="/events">Show all Event</Button>
        </div>
        <EventList items={filteredEvents} />
      </EventSearchLayout>
    </>
  );
}

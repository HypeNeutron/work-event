import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import EventList from "../../components/Events/EventList/EventList";
import SearchLayout from "../../components/Layouts/SearchLayout";
import Button from "../../components/Buttons/Button";
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
    "https://nextjs-a5896-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
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
        <SearchLayout>
          <p>Loading...</p>
        </SearchLayout>
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
        <SearchLayout>
          <ErrorAlert>
            <p>Invalid Filter Please adjust your values..🔎</p>
          </ErrorAlert>
          <Button link="/events">Show all Event</Button>
        </SearchLayout>
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
        <SearchLayout currentSearch={currentSearch}>
          <ErrorAlert>
            <p>No events found</p>
          </ErrorAlert>
          <Button link="/events">Show all Event</Button>
        </SearchLayout>
      </>
    );
  }

  const date = new Date(numYear, numMonth);

  pageHeadData = (
    <Header
      title="Filtered Events"
      desc={`All events in ${numMonth}/${numYear}`}
    />
  );

  return (
    <>
      {pageHeadData}
      <SearchLayout currentSearch={currentSearch}>
        <div style={{ marginTop: "50px" }}>
          <TitleEvent date={date} />
          <Button link="/events">Show all Event</Button>
        </div>
        <EventList items={filteredEvents} />
      </SearchLayout>
    </>
  );
}

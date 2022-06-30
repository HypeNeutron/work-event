import { useRouter } from "next/router";
import EventSearch from "../Events/EventSearch";

export default function SearchLayout({ children }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <center>{children}</center>
    </>
  );
}

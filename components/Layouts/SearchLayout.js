import { useRouter } from "next/router";
import { memo } from "react";
import SearchEventForm from "../Events/SearchEventForm";

function SearchLayout({ children, currentSearch }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <SearchEventForm onSearch={findEventsHandler} search={currentSearch} />
      <center>{children}</center>
    </>
  );
}

export default memo(SearchLayout);

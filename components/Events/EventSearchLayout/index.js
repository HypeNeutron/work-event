import { memo } from "react";
import SearchEventForm from "./SearchEventForm";

function EventSearch({ children, currentSearch }) {
  return (
    <>
      <SearchEventForm search={currentSearch} />
      <center>{children}</center>
    </>
  );
}

export default memo(EventSearch);

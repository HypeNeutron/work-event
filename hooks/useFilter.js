import { useState, useEffect, useCallback } from "react";
import { getFilteredEvents } from "../utils/api-util";

const useFilter = (filterEvents, numYear, numMonth) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState([]);

  const fetchFilterEvents = useCallback(async () => {
    setIsLoading(true);

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2022 ||
      numMonth < 0 ||
      numMonth > 12
    ) {
      setIsLoading(false);
      setNotFound(false);
      setIsInvalid(true);
    }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    if (filteredEvents.length === 0 || !filteredEvents) {
      setIsLoading(false);
      setIsInvalid(false);
      setNotFound(true);
    } else {
      setIsLoading(false);
      setIsLoading(false);
      setNotFound(false);
      setData(filteredEvents);
    }
  }, [filterEvents]);

  useEffect(() => {
    fetchFilterEvents();
  }, [fetchFilterEvents]);

  return { data, isLoading, isInvalid, notFound };
};

export default useFilter;

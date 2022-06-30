export async function getAllEvents() {
  try {
    const res = await fetch(
      "https://nextjs-a5896-default-rtdb.firebaseio.com/events.json"
    );
    //# firebase return data as the obj!
    if (!res.ok) throw new Error();
    const data = await res.json();
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  } catch (error) {
    let err;
    if (error.toString().includes("Network Error")) {
      err = "Network Error please check your connection";
    } else {
      err = error.message;
    }
    return err;
  }
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  if (!(allEvents instanceof Array)) {
    return allEvents;
  }
  return allEvents.filter((e) => e.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents({ year, month }) {
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const matchFilter =
      eventDate.getFullYear() === year && eventDate.getMonth() === month;
    return matchFilter;
  });

  return filteredEvents;
}

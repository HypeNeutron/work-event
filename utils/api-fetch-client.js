import getError from "./getError";

export async function getAllEvents() {
  try {
    const res = await fetch(process.env.FIREBASE_BASE_URI);
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
  } catch (err) {
    return getError(err);
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

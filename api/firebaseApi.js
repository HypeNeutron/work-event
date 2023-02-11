import db from "../lib/firebaseConnect";
import { ref, onValue } from "firebase/database";

export async function getAllEvents() {
  const eventDBRef = ref(db, "events");
  let eventData = [];
  onValue(eventDBRef, async (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      eventData.push({ id: key, ...data[key] });
    }
  });
  return eventData;
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

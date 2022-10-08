import db from "./firebaseConnect";
import { ref, onValue } from "firebase/database";

export async function getAllEvents() {
  const eventDBRef = ref(db, "events");
  let eventData = [];
  onValue(eventDBRef, async (snapshot) => {
    const data = snapshot.val();
    const key = Object.keys(data);
    const values = Object.values(data);
    let numValues = values.length;
    const newData = await values.reduce((acc, item) => {
      if (numValues - 1 >= 0) {
        item.id = key[numValues - 1];
        acc.push(item);
        numValues -= 1;
      }
      return acc;
    }, []);

    eventData.push(...newData);
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

import { getEventById, getFeaturedEvents } from "../../utils/api-util";
import ErrorAlert from "../../components/Events/ErrorAlert";
import { useRouter } from "next/router";
import {
  EventHeader,
  EventContent,
  EventCard,
} from "../../components/Events/EventItemSinglePage";
import Header from "../../components/Events/Header";
import Comments from "../../components/Comments/Comments";

export default function EventDetailPage({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }

  if (!event) {
    return (
      <ErrorAlert>
        <h1>No even found</h1>
      </ErrorAlert>
    );
  }

  const { id, title, description, date, location, image, imageAlt } = event;

  return (
    <>
      <Header title={title} desc={description} />
      <EventHeader title={title} />
      <EventCard
        date={date}
        address={location}
        image={image}
        imageAlt={imageAlt}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={id} />
    </>
  );
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents(); //prefetch path in server just FeaturedEvents
  const paths = events.map((e) => ({ params: { eventId: e.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const event = await getEventById(params.eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: { event },
    revalidate: 30,
  };
}

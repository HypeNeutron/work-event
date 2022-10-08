import Layout from "../components/Layouts";
import "../styles/globals.css";
import Head from "next/head";
import { NotificationContextProvider } from "../context/notification_context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Head>
        <title>Work Events</title>
        <meta name="description" content="Work-Events" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;

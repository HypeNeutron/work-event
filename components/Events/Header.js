import Head from "next/head";

export default function Header({ title, desc }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
  );
}

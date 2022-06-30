export default function TitleEvent({ date }) {
  if (!date) return;

  const dateOpts = {
    month: "long",
    year: "numeric",
  };

  const dateFormat = date.toLocaleDateString("en-US", dateOpts);
  return <h2 style={{ marginBottom: "30px" }}>Event In {dateFormat || ""}</h2>;
}

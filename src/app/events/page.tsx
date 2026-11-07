import EventList from "@/component/EventList";


export default function Page() {
  const api = "http://localhost:8000/events"
  return <EventList api = {api} />;
}
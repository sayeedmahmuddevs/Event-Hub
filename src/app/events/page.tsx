import EventList from "@/component/EventList";


export default function Page() {

  
  const api = `${process.env.NEXT_PUBLIC_CLIENT_LINK}/events`
  return <EventList api = {api} />;
}
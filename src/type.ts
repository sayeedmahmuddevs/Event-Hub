export interface EventType {
  _id: string;
  userName: string;
  userId: string;
  title: string;
  type: "volunteer" | "conference" | "workshop" | "other" | "food donation" | "winter clothing" | "fundrasing" | "communitiy"
  eventDate: string;
  eventTime: string;
  location: string;
  thumbnail: string;
  description: string;
  createdDate: string;
}
export interface UserType {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  bio?: string;
  location?: string;
  phone?: string;
  profession?: string;
  website?: string;
  username?: string
}

export type JoinedEventType = {
  _id: string;
  eventId: string;
  userId: string;
  joinedAt: string;
};

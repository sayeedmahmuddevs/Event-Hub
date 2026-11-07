export interface EventType {
  _id: string;
  title: string;
  type: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

export interface UserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  number?: number | null | undefined;
  location?: string | null | undefined;
  profession: string | null | undefined;
  website : string | null | undefined
}

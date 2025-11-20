// types/booking.ts
export interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  approvedEngineers: Engineer[];
  status: string;
  totalPaid: number;
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  usedAmount: number;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Booking {
  _id: string;
  projectId: Project;
  userId: User;
  date: string;
  time: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpcomingBookingsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Booking[];
}

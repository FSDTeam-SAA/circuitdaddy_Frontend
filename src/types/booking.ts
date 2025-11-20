export interface MyBookingsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: BookingItem[];
}

export interface BookingItem {
  _id: string;
  projectId: Project;
  userId: UserInfo;
  date: string; // ISO string
  time?: string; // sometimes present
  link: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: UserInfo;
  engineers: UserInfo[];
  approvedEngineers: UserInfo[];
  status: string;
  totalPaid: number;
  ndaAgreement: string[];
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

export interface UserInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  status: string
  profileImage: string
  verified: boolean
  phone: string
  skills: string[]
  expertise: string[]
  walletBalance: number
  balance: number
  totalEarned: number
  completedProjectsCount: number
  totalRating: number
  location: string
  professionTitle: string
  ratingCount: number
  avgRating: number
  badge: string[]
  level: number
  createdAt: string
  updatedAt: string
  lastLogin: string
  otp: string
  otpExpiry: string
  __v: number
}

export interface UserProfileResponse {
  statusCode: number
  success: boolean
  message: string
  data: UserProfile
}



export interface ProfileUpdatePayload {
    firstName: string
    lastName: string
    // email: string
    phone: string
    address: string
    designation: string
}
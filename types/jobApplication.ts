export interface JobApplication {
  readonly id: number;
  readonly fullName: string;
  readonly email: string;
  readonly phone: string | null;
  readonly position: string;
  readonly resumePath: string;
  readonly coverLetter: string;
  readonly ipAddress: string | null;
  readonly createdAt: string;
}

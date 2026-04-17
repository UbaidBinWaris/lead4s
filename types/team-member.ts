export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly initials: string;
  readonly gradient: string;
  readonly linkedin: string | null;
  readonly twitter: string | null;
  readonly position: number;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TeamMemberInput {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly initials: string;
  readonly gradient: string;
  readonly linkedin?: string | null;
  readonly twitter?: string | null;
  readonly position?: number;
  readonly isActive?: boolean;
}

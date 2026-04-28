export type Member = {
  member_id: string;
  project_id: string;
  user_id: string;
  role: string;
  email: string;
  metadata: {
    sub: string;
    name: string;
    email: string;
    department: string;
    email_verified: boolean;
    phone_verified: boolean;
    avatar_url?: string;
    picture?: string;
    avatar?: string;
  };
};
export type Members = Member[];

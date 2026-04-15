export type RegisterResponse = {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: number;
  confirmation_sent_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    job_title: string;
    name: string;
    phone_verified: boolean;
    sub: string;
    department: string;
  };
  identities: [
    {
      identity_id: string;
      id: string;
      user_id: string;
      identity_data: {
        email: string;
        email_verified: boolean;
        job_title: string;
        name: string;
        phone_verified: boolean;
        sub: string;
      };
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
      email: string;
    },
  ];
  created_at: string;
  updated_at: string;
  is_anonymous: false;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    id: string;
    role: string;
    user_metadata: { department: string; name: string };
  };
};

export type ForgotPasswordResponse = Record<string, never>;

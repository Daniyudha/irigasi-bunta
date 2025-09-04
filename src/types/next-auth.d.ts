
import type { User as NextAuthUser, Session as NextAuthSession } from 'next-auth';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    role?: string;
  }

  interface Session extends NextAuthSession {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    role?: string;
  }
}
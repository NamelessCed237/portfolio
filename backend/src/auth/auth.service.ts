import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  /** Validate the single admin against env credentials and return a JWT. */
  login(email: string, password: string) {
    const adminEmail = process.env.ADMIN_EMAIL ?? '';
    const adminPassword = process.env.ADMIN_PASSWORD ?? '';

    const ok =
      adminEmail.length > 0 &&
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
      password === adminPassword;

    if (!ok) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const token = this.jwt.sign({ sub: 'admin', email: adminEmail });
    return { token, user: { email: adminEmail } };
  }
}

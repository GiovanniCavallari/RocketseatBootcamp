import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface RequestDto {
  email: string;
  password: string;
}

interface ResponseDto {
  user: User;
  token: string;
}

class AutheticateUserService {
  public async execute({ email, password }: RequestDto): Promise<ResponseDto> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Invalid email or password');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return { user, token };
  }
}

export default AutheticateUserService;

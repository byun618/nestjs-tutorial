import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const password = await argon.hash(dto.password)

      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
        },
      })

      delete user.password

      // return the saved user
      return user
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email already taken')
        }
      }

      throw err
    }
  }

  signin() {
    console.log('signin')

    return 'signin'
  }
}

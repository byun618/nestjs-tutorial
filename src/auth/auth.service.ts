import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const password = await argon.hash(
        dto.password,
      )

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
      if (
        err instanceof
        PrismaClientKnownRequestError
      ) {
        if (err.code === 'P2002') {
          throw new ForbiddenException(
            'Email already taken',
          )
        }
      }

      throw err
    }
  }

  async signin(dto: AuthDto) {
    //  find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })

    // id user does not exist throw an exception
    if (!user) {
      throw new ForbiddenException(
        'Invalid credentials',
      )
    }

    //  compare the password
    const isMatchedPassword = await argon.verify(
      user.password,
      dto.password,
    )

    //  if password incorrect throw an exception
    if (!isMatchedPassword) {
      throw new ForbiddenException(
        'Invalid credentials',
      )
    }

    // send back the user
    delete user.password

    return user
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup() {
    console.log('signup')

    return { message: 1 }
  }
 
  signin() {
    console.log('signin')

    return 'signin'
  }
}

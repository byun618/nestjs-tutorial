import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  signup() {
    console.log('signup')

    return { message: 1 }
  }

  signin() {
    console.log('signin')

    return 'signin'
  }
}

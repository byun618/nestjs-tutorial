import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    // 예를 /users/me에서 bookmark를 몇개 했는지까지 response하고 싶다면, service를 이용해서 ㄱ
    return user
  }
}

import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtGuard } from 'src/auth/guard'

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    // 예를 /users/me에서 bookmark를 몇개 했는지까지 response하고 싶다면, service를 이용해서 ㄱ
    return req.user
  }
}

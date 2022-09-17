import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const url = `mysql://${config.get(
      'DATABASE_USER',
    )}:${config.get(
      'DATABASE_PASSWORD',
    )}@${config.get(
      'DATABASE_HOST',
    )}/${config.get('DATABASE_NAME')}`

    super({
      datasources: {
        db: {
          url,
        },
      },
    })
  }
}

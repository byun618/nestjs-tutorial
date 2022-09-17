import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto'

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    })
  }

  getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    })
  }

  createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    return this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    })
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      })

    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found',
      )
    }

    // check if user owns the bookmark
    if (bookmark.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    })
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    // get the bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      })

    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found',
      )
    }

    // check if user owns the bookmark
    if (bookmark.userId !== userId) {
      throw new ForbiddenException('Not allowed')
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    })
  }
}

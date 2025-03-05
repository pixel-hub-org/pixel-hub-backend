import { Controller, Post, HttpCode, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/games')
@UseGuards(JwtAuthGuard)
export class CreateGamesController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@CurrentUser() user: UserPayload) {
    return user.sub
  }
}

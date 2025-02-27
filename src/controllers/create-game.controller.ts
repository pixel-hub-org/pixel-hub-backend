import { Controller, Post, HttpCode, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/games')
@UseGuards(JwtAuthGuard)
export class CreateGamesController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle() {
    return 'jogo salvo, confia'
  }
}

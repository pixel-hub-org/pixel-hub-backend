import { Controller, UseGuards, Get, Query } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/games')
@UseGuards(JwtAuthGuard)
export class FetchGamesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 1

    const games = await this.prisma.game.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return { games }
  }
}

import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  UsePipes,
  Body,
  // UnauthorizedException,
} from '@nestjs/common'
// import { CurrentUser } from '@/auth/current-user-decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
// import { UserPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createGameBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  categories: z.string().array(),
  imageUrl: z.string().array(),
  pixelHubInfo: z.any(), // desafio fazer tipagem como json.
})

type CreateGameBodySchema = z.infer<typeof createGameBodySchema>

@Controller('/games')
@UseGuards(JwtAuthGuard)
export class CreateGamesController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createGameBodySchema))
  async handle(
    @Body() body: CreateGameBodySchema,
    // @CurrentUser() user: UserPayload,
  ) {
    // const currentUser = await this.prisma.user.findUnique({
    //   where: { id: user.sub },
    // })

    // if (!currentUser) {
    //   throw new UnauthorizedException('User credentials do not match')
    // }

    const { name, description, categories, imageUrl, pixelHubInfo } = body

    const game = await this.prisma.game.create({
      data: {
        name,
        description,
        categories,
        imageUrl,
        pixelHubInfo,
      },
    })
    return game
    // await this.prisma.gameTeams.create({
    //   data: {
    //     userId: currentUser.id,
    //     gameId: game.id,
    //   },
    // })

    // return 'Salvei pah oce :)'
  }
}

import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Body,
  UsePipes,
} from '@nestjs/common'

import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createTeamBodySchema = z.object({
  logoUrl: z.string(),
  name: z.string(),
})

type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>

@Controller('/teams')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createTeamBodySchema))
export class CreateTeamsController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateTeamBodySchema) {
    await this.prisma.team.create({
      data: {
        logoUrl: body.logoUrl,
        name: body.name,
      },
    })
  }
}

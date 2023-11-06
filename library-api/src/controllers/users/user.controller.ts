import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlainUserPresenter } from 'library-api/src/controllers/users/user.presenter';
import { UserUseCases } from 'library-api/src/useCases';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: PlainUserPresenter, isArray: true })
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllPlain();

    return users.map(PlainUserPresenter.from);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: PlainUserPresenter })
  @ApiParam({ name: 'firstName', type: 'string' })
  @ApiParam({ name: 'lastName', type: 'string' })
  public async create(
    @Query() query: { firstName: string; lastName: string },
  ): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.create(
      query.firstName,
      query.lastName,
    );

    return PlainUserPresenter.from(user);
  }
}

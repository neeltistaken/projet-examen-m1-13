import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlainUserPresenter } from 'library-api/src/controllers/users/user.presenter';
import { UserId } from 'library-api/src/entities';
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

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204 })
  @ApiParam({ name: 'id', type: 'string' })
  public async delete(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.delete(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a user by its ID' })
  @ApiResponse({ status: 200, type: PlainUserPresenter })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string' })
  public async getById(@Param('id') id: UserId): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.getById(id);

    return PlainUserPresenter.from(user);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, type: PlainUserPresenter })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'firstName', type: 'string' })
  @ApiParam({ name: 'lastName', type: 'string' })
  public async update(
    @Param('id') id: UserId,
    @Query() query: { firstName: string; lastName: string },
  ): Promise<PlainUserPresenter> {
    const { firstName, lastName } = query;

    const user = await this.userUseCases.update(id, firstName, lastName);

    return PlainUserPresenter.from(user);
  }
}

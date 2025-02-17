import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';

import { User } from '../../../domain/entities/user';
import { CreateUserRequestDto } from '../../dtos/user/createUserRequestDto';
import { CreateUserResponseDto } from '../../dtos/user/createUserResponseDto';
import { CreateUserUseCaseInterface } from './createUserUseCaseInterface';
import { IdGeneratorInterface } from '../../../domain/utils/idGeneratorInterface';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) { }

  async execute(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    // Implement usecase logic
    const id = this.idGenerator.generate();
    const newuser = new User(id, requestDto.email);
    const createdUser = await this.userRepository.create(newuser);
    return {
      id: createdUser.Id,
      email: createdUser.email,
      isAvailable: createdUser.isAvailable,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    }
  }
}

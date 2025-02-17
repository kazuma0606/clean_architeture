import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';
import { FindUserByIdRequestDto } from '../../dtos/user/findUserByIdRequestDto';
import { FindUserByIdResponseDto } from '../../dtos/user/findUserByIdResponseDto';
import { FindUserByIdUseCaseInterface } from './findUserByIdUseCaseInterface';

export class FindUserByIdUseCase implements FindUserByIdUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) { }

  async execute(requestDto: FindUserByIdRequestDto): Promise<FindUserByIdResponseDto | null> {
    // Implement usecase logic
    const foundUser = await this.userRepository.findById(requestDto.id);
    if (!foundUser) {
      return null;
    }
    return {
      id: foundUser.Id,
      email: foundUser.email,
      isAvailable: foundUser.isAvailable,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt
    }
  }
}

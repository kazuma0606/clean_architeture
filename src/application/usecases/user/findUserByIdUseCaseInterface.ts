import { FindUserByIdRequestDto } from '../../dtos/user/findUserByIdRequestDto';
import { FindUserByIdResponseDto } from '../../dtos/user/findUserByIdResponseDto';

export interface FindUserByIdUseCaseInterface {
  execute(requestDto: FindUserByIdRequestDto): Promise<FindUserByIdResponseDto | null>;
}

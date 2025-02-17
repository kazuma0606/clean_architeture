import { Request, Response } from 'express';
import { CreateUserUseCaseInterface } from '../../application/usecases/user/createUserUseCaseInterface';
import { CreateUserRequestDto } from '../../application/dtos/user/createUserRequestDto'
import { FindUserByIdUseCaseInterface } from '../../application/usecases/user/findUserByIdUseCaseInterface';
import { FindUserByIdRequestDto } from '../../application/dtos/user/findUserByIdRequestDto';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCaseInterface,
    private readonly findUserByIdUseCase: FindUserByIdUseCaseInterface
    // Add other useCase propaties as needed
  ) { }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: CreateUserRequestDto = {
        email: req.body.email,
      }
      const user = await this.createUserUseCase.execute(requestDto);

      // Add response status code
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'ユーザーの登録に失敗しました' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: FindUserByIdRequestDto = {
        id: req.params.id,
      }
      const user = await this.findUserByIdUseCase.execute(requestDto);
      if (user) {
        res.status(200).json(user);
        return;
      } else {
        res.status(404).json({ error: "ユーザーが見つかりませんでした" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "ユーザーの検索に失敗しました" });
    }
  }
}

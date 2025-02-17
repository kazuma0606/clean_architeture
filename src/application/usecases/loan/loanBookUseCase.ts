import { LoanRepositoryInterface } from '../../../domain/repositories/loanRepositoryInterface';
import { Loan } from '../../../domain/entities/loan';
import { LoanBookRequestDto } from '../../dtos/loan/loanBookRequestDto';
import { LoanBookResponseDto } from '../../dtos/loan/loanBookResponseDto';
import { LoanBookUseCaseInterface } from './loanBookUseCaseInterface';
import { IdGeneratorInterface } from '../../../domain/utils/idGeneratorInterface';
import { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface';
import { TransactionManagerInterface } from '../../utils/transactionManegerInterface';

export class LoanBookUseCase implements LoanBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) { }

  async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const book = await this.bookRepository.findById(requestDto.bookId, ctx);
      if (!book) {
        throw new Error('書籍が存在しません');
      }
      book.loan();

      const loans = await this.loanRepository.findByUserId(requestDto.userId, ctx);
      if (loans.filter((loan) => loan.returnDate === null).length >= 5) {
        throw new Error('既に上限まで貸出しています');
      }

      await this.bookRepository.update(book, ctx);

      const newLoan = new Loan(
        this.idGenerator.generate(),
        requestDto.bookId,
        requestDto.userId,
        new Date(),
      );
      const createdLoan = await this.loanRepository.create(newLoan, ctx);

      return {
        id: createdLoan.id,
        bookId: createdLoan.bookId,
        userId: createdLoan.userId,
        loanDate: createdLoan.loanDate,
        dueDate: createdLoan.dueDate,
        createdAt: createdLoan.CreatedAt,
        updatedAt: createdLoan.UpdatedAt,
      }
    })

  }
}

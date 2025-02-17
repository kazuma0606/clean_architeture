import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import { PrismaClient } from '@prisma/client';
import { UUIDGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase';
import { bookRoutes } from './routers/bookRouter';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase';
import { PrismaUserRepository } from '../../adapter/repositories/prismauserRepositry';
import { CreateUserUseCase } from '../../application/usecases/user/createUserUseCase';
import { UserController } from '../../adapter/controllers/userController';
import { userRoutes } from './routers/userRouter';
import { FindUserByIdUseCase } from '../../application/usecases/user/findUserByIdUseCase';
import { PrismaLoanRepository } from '../../adapter/repositories/prismaloanRepositry';
import { LoanBookUseCase } from '../../application/usecases/loan/loanBookUseCase';
import { LoanController } from '../../adapter/controllers/loanController';
import { loanRoutes } from './routers/loanRouter';
import { PrismaTransactionManager } from '../../adapter/utils/prismaTransactionManager';
import { ReturnBookUseCase } from '../../application/usecases/loan/returnBookUseCase';

const app = express();

app.use(express.json());

const prisma = new PrismaClient();
const uuidgenerator = new UUIDGenerator();
const transactionManager = new PrismaTransactionManager(prisma);

// Book
const bookRepositry = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepositry, uuidgenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepositry);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

// User
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidgenerator);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserByIdUseCase);

//loan
const loanRepository = new PrismaLoanRepository(prisma);
const loanBookUseCase = new LoanBookUseCase(
    loanRepository,
    bookRepositry,
    uuidgenerator,
    transactionManager
);
const returnBookUseCase = new ReturnBookUseCase(
    loanRepository,
    bookRepositry,
    transactionManager
)
const loanController = new LoanController(loanBookUseCase, returnBookUseCase);

app.use('/books', bookRoutes(bookController));
app.use('/users', userRoutes(userController));
app.use('/loans', loanRoutes(loanController));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
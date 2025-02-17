import { v4 as uuidv4 } from 'uuid';
import { IdGeneratorInterface } from '../../domain/utils/idGeneratorInterface';

export class UUIDGenerator implements IdGeneratorInterface {
    generate(): string {
        return uuidv4();
    }
}
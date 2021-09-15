import {EntityRepository, Repository} from "typeorm";
import {BookEntity} from "../entities/book.entity";

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity>{
}

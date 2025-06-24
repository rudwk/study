import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  create() {
    return this.userRepository.save({name: 'test-title'});
  }

  findAll() {
    return this.userRepository.find();
  }
}

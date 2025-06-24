import { Version } from "@nestjs/common";
import { Column, CreateDateColumn, Generated, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class User {
  
  //고유 아이디
  @PrimaryGeneratedColumn('uuid')
  id: number;

  //이름
  @Column()
  name: string;

  //생성일자
  @CreateDateColumn()
  createDate: Date;

  //업데이트 일자
  @UpdateDateColumn()
  upDate: Date;

  // //업데이트 될 때마다 1씩 증가
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionid: string;
}

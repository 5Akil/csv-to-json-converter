import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  category: string;

  @Column({ type: 'varchar', length: 300 })
  image: string;

  @Column({type:'boolean' , default:false})
  exported:boolean

}
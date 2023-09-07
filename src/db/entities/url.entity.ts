import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Url {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public fullUrl: string;

  @Column()
  public shortUrl: string;
}

export default Url;

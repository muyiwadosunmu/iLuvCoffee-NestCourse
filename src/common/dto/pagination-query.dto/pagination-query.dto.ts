import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number) Commented because we;ve passed it globally in main.ts
  limit: number;

  @IsOptional()
  @IsOptional()
  //   @Type(() => Number)
  offset: number;
}

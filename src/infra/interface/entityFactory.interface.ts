import { AggregateRoot } from '@nestjs/cqrs';
import { SchemaAbstract } from '../abstract/schema.abstract';

export interface EntityFactory<
  TSchema extends SchemaAbstract,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}

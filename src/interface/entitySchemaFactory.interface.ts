import { AggregateRoot } from '@nestjs/cqrs';
import { SchemaAbstract } from 'src/abstract/schema.abstract';

export interface EntitySchemaFactory<
  TSchema extends SchemaAbstract,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}

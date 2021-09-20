import {
  FilterQuery,
  LeanDocument,
  Model,
  _AllowStringsForIds,
} from 'mongoose';

import { AggregateRoot } from '@nestjs/cqrs';
import { EntitySchemaFactory } from 'src/interface/entitySchemaFactory.interface';
import { NotFoundException } from '@nestjs/common';
import { SchemaAbstract } from './schema.abstract';

export abstract class RepositoryAbstract<
  TSchema extends SchemaAbstract,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly model: Model<TSchema>,
    protected readonly schemaFactory: EntitySchemaFactory<TSchema, TEntity>,
  ) {}

  public async find(filterQuery?: FilterQuery<TSchema>): Promise<TEntity[]> {
    return (await this.model.find(filterQuery, {}, { lean: true })).map(
      (document) => this.schemaFactory.createFromSchema(document),
    );
  }

  public async findOne(filterQuery?: FilterQuery<TSchema>): Promise<TEntity> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.schemaFactory.createFromSchema(document);
  }

  public async exists(filterQuery?: FilterQuery<TSchema>): Promise<boolean> {
    return await this.model.exists(filterQuery);
  }

  public async save(entity: TEntity, isNew: boolean = true): Promise<TEntity> {
    const document = await new this.model(this.schemaFactory.create(entity));
    document.isNew = isNew;
    document.save();
    return this.schemaFactory.createFromSchema(document);
  }

  public async deleteOne(filterQuery?: FilterQuery<TSchema>): Promise<void> {
    await this.model.deleteOne(filterQuery);
  }

  public async findOneAndReplace(
    filterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedDocument = await this.model.findOneAndReplace(
      filterQuery,
      this.schemaFactory.create(entity) as any as _AllowStringsForIds<
        LeanDocument<TSchema>
      >,
      {
        new: true,
        lean: true,
      },
    );

    if (!updatedDocument) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }
}

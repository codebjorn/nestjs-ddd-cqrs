export abstract class ResponseAbstract<TEntity> {
  constructor(protected data: TEntity | TEntity[]) {}

  protected transform() {
    if (Array.isArray(this.data)) {
      return { data: this.transformMany(this.data) };
    }

    return { data: this.transformOne(this.data) };
  }

  protected abstract transformOne(entity: TEntity): object;

  protected abstract transformMany(entities: TEntity[]): Array<object>;
}

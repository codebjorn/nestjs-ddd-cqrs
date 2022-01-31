export abstract class ResponseAbstract<TEntity> {
  constructor(protected data: TEntity | TEntity[]) {}

  protected transform() {
    if (Array.isArray(this.data)) {
      return { data: this.transformMany(this.data) };
    }

    return { data: this.transformOne(this.data) };
  }

  protected abstract transformOne(entity: TEntity): Record<string, unknown>;

  protected abstract transformMany(
    entities: TEntity[],
  ): Array<Record<string, unknown>>;
}

import { ObjectID } from 'bson';
import { Prop } from '@nestjs/mongoose';

export class SchemaAbstract {
  @Prop()
  readonly _id: ObjectID;
}

import { Prop, Schema } from '@nestjs/mongoose';

import { SchemaAbstract } from 'src/abstract/schema.abstract';

@Schema({ collection: 'users', timestamps: true })
export class UserSchema extends SchemaAbstract {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({type: String})
  role: any;
}

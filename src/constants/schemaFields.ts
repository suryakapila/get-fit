import { Prop } from '@nestjs/mongoose';

export class SchemaFields {
  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdById: string;

  @Prop()
  updatedById: string;
}

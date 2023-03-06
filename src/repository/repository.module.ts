import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { RolesSchema } from './models/roles.schema';
import { TripRepository } from './trip.repository';
import { TripSchema } from './models/trip.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Roles', schema: RolesSchema },
      { name: 'Trip', schema: TripSchema },
    ]),
  ],
  exports: [UserRepository, TripRepository],
  providers: [UserRepository, TripRepository],
})
export class RepositoryModule {}

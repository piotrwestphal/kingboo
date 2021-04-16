import { Module } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { FirestoreClient, FirestoreModule } from '@kb/firestore'
import { FirestoreTopHotelsRepository } from './firestore-top-hotels.repository'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { TopHotelsDocumentMapper } from './top-hotels-document.mapper'

@Module({
  imports: [
    FirestoreModule.register({ configClass: AppConfigService }),
  ],
  providers: [
    {
      provide: TopHotelsRepository,
      useFactory: (firestoreClient: FirestoreClient) => {
        const mapper = new TopHotelsDocumentMapper()
        return new FirestoreTopHotelsRepository(firestoreClient, mapper)
      },
      inject: [FirestoreClient],
    },
  ],
  exports: [TopHotelsRepository],
})
export class DbModule {
}

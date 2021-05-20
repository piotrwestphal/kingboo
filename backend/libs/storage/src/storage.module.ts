import { DynamicModule, Module } from '@nestjs/common';
import { StorageConfigService } from './storage-config.service'
import { StorageConfigType } from './storage-config.type'
import { FileRepository } from './file.repository'
import { createFileRepository, createGcpRepository } from '@kb/storage/create-repository'

@Module({})
export class StorageModule {
  static register<T extends StorageConfigService>({ configClass }: { configClass: StorageConfigType<T> }): DynamicModule {
    const fileRepositoryProvider = {
      provide: FileRepository,
      useFactory: (configService: T): FileRepository => {
        const env = configService.env
        return env === 'prod' || env === 'ci'
          ? createGcpRepository(configService.storageRemote, configService.logger)
          : createFileRepository(configService.storageLocal, configService.logger)
      },
      inject: [configClass],
    }
    return {
      module: StorageModule,
      providers: [
        fileRepositoryProvider,
      ],
      exports: [
        FileRepository,
      ]
    }
  }
}

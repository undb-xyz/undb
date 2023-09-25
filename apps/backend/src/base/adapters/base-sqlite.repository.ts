import { MikroORM, UseRequestContext } from '@mikro-orm/core'
import { Inject, Injectable } from '@nestjs/common'
import { Base, type BaseSpecification } from '@undb/core'
import { BaseSqliteRepository, EntityManager } from '@undb/sqlite'

export const BASE_REPOSITORY = Symbol('BASE_REPOSITORY')

export const InjectBaseRepository = () => Inject(BASE_REPOSITORY)

@Injectable()
export class NestBaseSqliteRepository extends BaseSqliteRepository {
  constructor(
    public readonly orm: MikroORM,
    em: EntityManager,
  ) {
    super(em)
  }

  @UseRequestContext()
  find(spec: BaseSpecification): Promise<Base[]> {
    return super.find(spec)
  }

  @UseRequestContext()
  insert(base: Base): Promise<void> {
    return super.insert(base)
  }
}
import type { EntityManager } from '@mikro-orm/better-sqlite'
import { MikroORM, UseRequestContext } from '@mikro-orm/core'
import { Inject, Injectable } from '@nestjs/common'
import type { ClsStore, IClsService } from '@undb/core'
import { Table, type ITableCache, type ITableSpec } from '@undb/core'
import { type IUnitOfWork } from '@undb/domain'
import { TableSqliteRepository } from '@undb/sqlite'
import { ClsService } from 'nestjs-cls'
import type { Option } from 'oxide.ts'
import { NestOutboxService } from '../../../../outbox/outbox.service.js'
import { InjectUnitOfWork } from '../../../../uow/uow.service.js'

export const TABLE_KV_CACHE = Symbol('TABLE_KV_CACHE')
export const InjectTableKVCache = () => Inject(TABLE_KV_CACHE)

export const TABLE_REPOSITORY = Symbol('TABLE_REPOSITORY')
export const InjectTableRepository = () => Inject(TABLE_REPOSITORY)

@Injectable()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class NestTableSqliteRepository extends TableSqliteRepository {
  constructor(
    @InjectUnitOfWork()
    protected readonly uow: IUnitOfWork<EntityManager>,
    @InjectTableKVCache()
    protected readonly cache: ITableCache,
    protected readonly orm: MikroORM,
    protected readonly cls: ClsService<ClsStore>,
    protected readonly outboxService: NestOutboxService,
  ) {
    super(uow, cache, cls as IClsService<ClsStore>, outboxService)
  }

  @UseRequestContext()
  async findOneById(id: string): Promise<Option<Table>> {
    return super.findOneById(id)
  }

  @UseRequestContext()
  async findOne(spec: ITableSpec): Promise<Option<Table>> {
    return super.findOne(spec)
  }

  @UseRequestContext()
  find(spec: ITableSpec): Promise<Table[]> {
    return super.find(spec)
  }

  @UseRequestContext()
  async insert(table: Table): Promise<void> {
    return super.insert(table)
  }

  @UseRequestContext()
  async updateOneById(id: string, spec: ITableSpec): Promise<void> {
    return super.updateOneById(id, spec)
  }

  @UseRequestContext()
  async deleteOneById(id: string): Promise<void> {
    return super.deleteOneById(id)
  }
}

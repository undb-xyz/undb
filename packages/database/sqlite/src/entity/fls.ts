import {
  Cascade,
  Embeddable,
  Embedded,
  Entity,
  JsonType,
  ManyToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core'
import type { ISubject } from '@undb/authz'
import { FLS as FLSDO, type FLSPolicyInterface, type IFLSAction } from '@undb/authz'
import { type IRootFilter } from '@undb/core'
import { BaseEntity } from './base.js'
import { Table } from './table.js'

@Embeddable()
export class FLSPolicy {
  constructor(policy: FLSPolicyInterface) {
    this.action = policy.action
    this.filter = policy.filter
  }

  @Property()
  action: IFLSAction

  @Property({ type: JsonType })
  filter: IRootFilter
}

@Entity({ tableName: 'undb_fls' })
export class FLS extends BaseEntity {
  constructor(table: Rel<Table>, fls: FLSDO) {
    super()
    this.id = fls.id.value
    this.table = table
    this.policy = new FLSPolicy(fls.policy)
    this.subjects = fls.subjects.subjects.map((s) => s.value)
  }

  @PrimaryKey()
  id: string

  @ManyToOne(() => Table, { cascade: [Cascade.ALL] })
  table: Rel<Table>

  @Embedded(() => FLSPolicy)
  policy: FLSPolicy

  @Property({ type: JsonType })
  subjects: ISubject[]
}

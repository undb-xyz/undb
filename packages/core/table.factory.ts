import { and } from '@egodb/domain'
import type { Result } from 'oxide.ts'
import { WithTableId, WithTableName, WithTableSchema } from './specifications/index.js'
import type { TableCompositeSpecificaiton } from './specifications/interface.js'
import { newTableSpec } from './specifications/specifications.js'
import type { IQueryTable } from './table.js'
import { Table } from './table.js'
import type { ICreateTableInput_internal } from './table.schema.js'
import type { ICreateTableSchemaInput } from './value-objects/index.js'
import { WithTableViews } from './view/index.js'

export class TableFactory {
  static create(...specs: TableCompositeSpecificaiton[]): Result<Table, string>
  static create(spec: TableCompositeSpecificaiton): Result<Table, string>
  static create(spec: TableCompositeSpecificaiton | TableCompositeSpecificaiton[]): Result<Table, string> {
    if (Array.isArray(spec)) {
      return and(...spec)
        .unwrap()
        .mutate(Table.empty())
    }

    const table = Table.empty()
    return spec.mutate(table).map(() => table)
  }

  static from(input: ICreateTableInput_internal) {
    const spec = newTableSpec(input)
    return this.create(spec)
  }

  static unsafeCreate(input: ICreateTableInput_internal) {
    const spec = WithTableName.unsafe(input.name)
      .and(WithTableId.fromString(input.id))
      .and(WithTableSchema.unsafeFrom(input.schema))
      .and(WithTableViews.from(input.views))

    return this.create(spec)
  }

  static fromQuery(q: IQueryTable): Table {
    const spec = WithTableName.fromString(q.name)
      .and(WithTableId.fromExistingString(q.id).unwrap())
      .and(WithTableSchema.unsafeFrom(q.schema as ICreateTableSchemaInput))
      .and(WithTableViews.from(q.views))

    return this.create(spec).unwrap()
  }
}

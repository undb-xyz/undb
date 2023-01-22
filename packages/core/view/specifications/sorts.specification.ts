import { isEmpty } from '@fxts/core'
import type { Result } from 'oxide.ts'
import { Ok } from 'oxide.ts'
import type { ITableSpecVisitor } from '../../specifications/interface'
import type { Table } from '../../table'
import type { Sorts } from '../sort'
import type { View } from '../view'
import { BaseViewSpecification } from './base-view-specification'

export class WithSorts extends BaseViewSpecification {
  constructor(public readonly sorts: Sorts | null, public readonly view: View) {
    super(view)
  }

  isSatisfiedBy(t: Table): boolean {
    if (!this.sorts) {
      return isEmpty(t.mustGetView(this.view.key.value).filter)
    }

    return t.mustGetView(this.view.key.value).sorts?.equals(this.sorts) ?? false
  }

  mutate(t: Table): Result<Table, string> {
    const view = t.mustGetView(this.view.key.value)
    view.sorts = this.sorts ?? undefined
    return Ok(t)
  }

  accept(v: ITableSpecVisitor): Result<void, string> {
    v.sortsEqual(this)
    return Ok(undefined)
  }
}

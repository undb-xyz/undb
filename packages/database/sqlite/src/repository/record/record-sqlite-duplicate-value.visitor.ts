/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EntityManager, Knex } from '@mikro-orm/better-sqlite'
import type {
  AttachmentField,
  AutoIncrementField,
  AverageField,
  BoolField,
  CollaboratorField,
  ColorField,
  CountField,
  CreatedAtField,
  CreatedByField,
  CurrencyField,
  DateField,
  DateRangeField,
  EmailField,
  Field,
  IFieldVisitor,
  IdField,
  LookupField,
  MultiSelectField,
  NumberField,
  ParentField,
  RatingField,
  ReferenceField,
  SelectField,
  StringField,
  SumField,
  TreeField,
  UpdatedAtField,
  UpdatedByField,
} from '@undb/core'
import { BaseEntityManager } from '../base-entity-manager.js'

export class RecordSqliteDuplicateValueVisitor extends BaseEntityManager implements IFieldVisitor {
  constructor(
    private readonly tableId: string,
    private readonly from: Field,
    em: EntityManager,
    private readonly qb: Knex.QueryBuilder,
    private readonly knex: Knex,
  ) {
    super(em)
  }

  id(field: IdField): void {
    throw new Error('Method not implemented.')
  }
  createdAt(field: CreatedAtField): void {
    throw new Error('Method not implemented.')
  }
  createdBy(field: CreatedByField): void {
    throw new Error('Method not implemented.')
  }
  updatedAt(field: UpdatedAtField): void {
    throw new Error('Method not implemented.')
  }
  updatedBy(field: UpdatedByField): void {
    throw new Error('Method not implemented.')
  }
  attachment(field: AttachmentField): void {
    throw new Error('Method not implemented.')
  }
  autoIncrement(field: AutoIncrementField): void {
    throw new Error('Method not implemented.')
  }
  string(field: StringField): void {
    // const query = this.qb.table(this.tableId).update(`'${field.id.value}' = '${this.from.id.value}'`).toQuery()

    this.addQueries(`UPDATE ${this.tableId} SET ${field.id.value} = ${this.from.id.value}`)
  }
  email(field: EmailField): void {
    throw new Error('Method not implemented.')
  }
  color(field: ColorField): void {
    throw new Error('Method not implemented.')
  }
  number(field: NumberField): void {
    throw new Error('Method not implemented.')
  }
  bool(field: BoolField): void {
    throw new Error('Method not implemented.')
  }
  date(field: DateField): void {
    throw new Error('Method not implemented.')
  }
  dateRange(field: DateRangeField): void {
    throw new Error('Method not implemented.')
  }
  select(field: SelectField): void {
    throw new Error('Method not implemented.')
  }
  multiSelect(field: MultiSelectField): void {
    throw new Error('Method not implemented.')
  }
  reference(field: ReferenceField): void {
    throw new Error('Method not implemented.')
  }
  tree(field: TreeField): void {
    throw new Error('Method not implemented.')
  }
  parent(field: ParentField): void {
    throw new Error('Method not implemented.')
  }
  rating(field: RatingField): void {
    throw new Error('Method not implemented.')
  }
  currency(field: CurrencyField): void {
    throw new Error('Method not implemented.')
  }
  count(field: CountField): void {
    throw new Error('Method not implemented.')
  }
  sum(field: SumField): void {
    throw new Error('Method not implemented.')
  }
  average(field: AverageField): void {
    throw new Error('Method not implemented.')
  }
  lookup(field: LookupField): void {
    throw new Error('Method not implemented.')
  }
  collaborator(field: CollaboratorField): void {
    throw new Error('Method not implemented.')
  }
}

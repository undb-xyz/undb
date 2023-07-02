import type { BoolFieldValue } from './bool-field-value.js'
import type { ColorFieldValue } from './color-field-value.js'
import type { CountFieldValue } from './count-field-value.js'
import type { CreatedAtFieldValue } from './created-at-field-value.js'
import type { CreatedByFieldValue } from './created-by-field-value.js'
import type { CurrencyFieldValue } from './currency-field-value.js'
import type { DateFieldValue } from './date-field-value.js'
import type { DateRangeFieldValue } from './date-range-field-value.js'
import type { AttachmentFieldValue } from './fields/attachment/attachment-field-value.js'
import type { AutoIncrementFieldValue } from './fields/auto-increment/auto-increment-field-value.js'
import type { AverageFieldValue } from './fields/average/average-field-value.js'
import type { CollaboratorFieldValue } from './fields/collaborator/collaborator-field-value.js'
import type { EmailFieldValue } from './fields/email/email-field-value.js'
import type { StringFieldValue } from './fields/string/string-field-value.js'
import type { UrlFieldValue } from './fields/url/url-field-value.js'
import type { IdFieldValue } from './id-field-value.js'
import type { JsonFieldValue } from './json-field-value.js'
import type { LookupFieldValue } from './lookup-field-value.js'
import type { MultiSelectFieldValue } from './multi-select-field-value.js'
import type { NumberFieldValue } from './number-field-value.js'
import type { ParentFieldValue } from './parent-field-value.js'
import type { RatingFieldValue } from './rating-field-value.js'
import type { ReferenceFieldValue } from './reference-field-value.js'
import type { SelectFieldValue } from './select-field-value.js'
import type { SumFieldValue } from './sum-field-value.js'
import type { TreeFieldValue } from './tree-field-value.js'
import type { UpdatedAtFieldValue } from './updated-at-field-value.js'
import type { UpdatedByFieldValue } from './updated-by-field-value.js'

export interface IFieldValueVisitor {
  id(value: IdFieldValue): void
  createdAt(value: CreatedAtFieldValue): void
  createdBy(value: CreatedByFieldValue): void
  updatedAt(value: UpdatedAtFieldValue): void
  updatedBy(value: UpdatedByFieldValue): void
  attachment(value: AttachmentFieldValue): void
  autoIncrement(value: AutoIncrementFieldValue): void
  string(value: StringFieldValue): void
  email(value: EmailFieldValue): void
  url(value: UrlFieldValue): void
  json(value: JsonFieldValue): void
  color(value: ColorFieldValue): void
  number(value: NumberFieldValue): void
  bool(value: BoolFieldValue): void
  date(value: DateFieldValue): void
  dateRange(value: DateRangeFieldValue): void
  select(value: SelectFieldValue): void
  multiSelect(value: MultiSelectFieldValue): void
  reference(value: ReferenceFieldValue): void
  tree(value: TreeFieldValue): void
  parent(value: ParentFieldValue): void
  rating(value: RatingFieldValue): void
  currency(value: CurrencyFieldValue): void
  count(value: CountFieldValue): void
  sum(value: SumFieldValue): void
  average(value: AverageFieldValue): void
  lookup(value: LookupFieldValue): void
  collaborator(value: CollaboratorFieldValue): void
}

import { ValueObject } from '@undb/domain'
import { merge } from 'lodash-es'
import { z } from 'zod'
import type { TableSchema } from '../value-objects'

export const formField = z.object({
  hidden: z.boolean().optional(),
  required: z.boolean(),
})

export type IFormField = z.infer<typeof formField>

export const formFields = z.record(z.string(), formField)

export type IFormFields = z.infer<typeof formFields>

export class FormFields extends ValueObject<Map<string, IFormField>> {
  public static readonly DEFAULT: IFormField = {
    hidden: false,
    required: false,
  }

  static default(schema: TableSchema) {
    const fields: IFormFields = {}

    for (const field of schema.fields) {
      fields[field.id.value] = FormFields.DEFAULT
    }

    return new this(new Map(Object.entries(fields)))
  }

  static from(schema: TableSchema, input?: IFormFields) {
    return input ? new this(new Map(Object.entries(input))) : this.default(schema)
  }

  static unsafeFrom(input: IFormFields) {
    return new this(new Map(Object.entries(input)))
  }

  public get value() {
    return this.props
  }

  public toJSON() {
    return Object.fromEntries(this.value)
  }

  *[Symbol.iterator]() {
    yield* Object.entries(this.toJSON)
  }

  public isRequired(fieldId: string) {
    return !!this.value.get(fieldId)?.required
  }

  public merge(visibility: Record<string, boolean>) {
    return new FormFields(merge(this.value, visibility))
  }
}
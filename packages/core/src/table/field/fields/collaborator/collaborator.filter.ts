import { z } from 'zod'
import { userIdSchema } from '../../../../user/value-objects/user-id.vo.js'
import { baseFilter } from '../../../filter/filter.base.js'
import { collaboratorFilterOperators } from '../../../filter/operators.js'
import { collaboratorFieldValue } from './collaborator-field.type.js'

export const collaboratorFilterValue = collaboratorFieldValue.or(userIdSchema)
export const collaboratorFilter = z
  .object({
    type: z.literal('collaborator'),
    operator: collaboratorFilterOperators,
    value: collaboratorFilterValue,
  })
  .merge(baseFilter)

export type ICollaboratorFilter = z.infer<typeof collaboratorFilter>
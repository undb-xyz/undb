import type { CompositeSpecification, ISpecVisitor } from '@undb/domain'
import type { RLS } from './rls.js'
import type { WithRLSId } from './specifications/rls-id.specification.js'
import type { WithRLSAction, WithRLSActionIn, WithRLSPolicy } from './specifications/rls-policy.specification.js'
import type { WithRLSTableId } from './specifications/rls-table-id.specification.js'
import type { WithRLSViewId } from './specifications/rls-view-id.specification.js'

export interface IRLSVisitor extends ISpecVisitor {
  withId(s: WithRLSId): void
  withTableId(s: WithRLSTableId): void
  withViewId(s: WithRLSViewId): void
  withRLSPolicy(s: WithRLSPolicy): void
  withRLSPolicyAction(s: WithRLSAction): void
  actionsIn(s: WithRLSActionIn): void
}

export type RLSSpecification = CompositeSpecification<RLS, IRLSVisitor>
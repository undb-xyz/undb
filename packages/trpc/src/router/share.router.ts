import {
  CreateShareCommand,
  GetShareQuery,
  createShareCommandInput,
  getShareQueryInput,
  getShareQueryOutput,
} from '@undb/cqrs'
import type { ICommandBus, IQueryBus } from '@undb/domain'
import { z } from 'zod'
import type { publicProcedure } from '../trpc.js'
import { router } from '../trpc.js'

export const createShareRouter =
  (procedure: typeof publicProcedure) => (commandBus: ICommandBus, queryBus: IQueryBus) =>
    router({
      get: procedure
        .input(getShareQueryInput)
        .output(getShareQueryOutput)
        .query(({ input }) => {
          const query = new GetShareQuery(input)
          return queryBus.execute(query)
        }),
      create: procedure
        .input(createShareCommandInput)
        .output(z.any())
        .mutation(({ input }) => {
          const cmd = new CreateShareCommand(input)
          return commandBus.execute(cmd)
        }),
    })

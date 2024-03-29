import { ITableRepository, RecordFactory, RecordUpdatedEvent } from '@undb/core'
import { IEventHandler } from '@undb/domain'
import { SearchTableService } from '../search-table.service.js'

export class SearchOnRecordUpdatedEventHandler implements IEventHandler<RecordUpdatedEvent, void> {
  constructor(
    private readonly repo: ITableRepository,
    private readonly searchTableService: SearchTableService,
  ) {}

  async handle(event: RecordUpdatedEvent): Promise<void> {
    const tableId = event.payload.tableId
    const table = (await this.repo.findOneById(tableId)).unwrap()

    const record = RecordFactory.fromQuery(event.meta.record, table.schema.toIdMap()).unwrap()
    await this.searchTableService.onRecordUpdated(table, record)
  }
}

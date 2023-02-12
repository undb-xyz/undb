import type { CommandProps } from '@egodb/domain'
import { Command } from '@egodb/domain'
import type { IUpdateOptionSchema } from '../../option/index.js'
import type { IUpdateOptionCommandInput } from './update-option.command.interface.js'

export class UpdateOptionCommand extends Command implements IUpdateOptionCommandInput {
  readonly tableId: string
  readonly fieldId: string
  readonly id: string
  readonly option: IUpdateOptionSchema

  constructor(props: CommandProps<IUpdateOptionCommandInput>) {
    super(props)
    this.tableId = props.tableId
    this.fieldId = props.fieldId
    this.id = props.id
    this.option = props.option
  }
}

import type { ICreateTableInput } from '@undb/cqrs'
import { createTableCommandInput } from '@undb/cqrs'
import { Drawer } from '@undb/ui'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { confirmModal } from '../../hooks'
import { CreateTableForm } from './create-table-form'
import { activeFieldAtom } from './create-table-form-schema.atom'
import { createTableFormDrawerOpened } from './drawer-opened.atom'
import { DEFAULT_TABLE_EMOJI } from '@undb/core'

export const CreateTableFormDrawer: React.FC = () => {
  const [opened, setOpened] = useAtom(createTableFormDrawerOpened)

  const defaultValues: ICreateTableInput = {
    name: '',
    emoji: DEFAULT_TABLE_EMOJI,
    schema: [],
  }

  const form = useForm<ICreateTableInput>({
    defaultValues,
    resolver: zodResolver(createTableCommandInput),
  })
  const resetActiveField = useResetAtom(activeFieldAtom)

  const reset = () => {
    resetActiveField()
    setOpened(false)
    form.clearErrors()
    form.reset()
  }
  const confirm = confirmModal({ onConfirm: reset })
  const { t } = useTranslation()

  return (
    <FormProvider {...form}>
      <Drawer
        target="body"
        opened={opened}
        withinPortal
        onClose={() => {
          if (form.formState.isDirty) {
            confirm()
          } else {
            reset()
          }
        }}
        title={t('Create New Table')}
        padding="xl"
        position="right"
        size={700}
        overlayProps={{ sx: { zIndex: 198 } }}
        styles={{
          header: { zIndex: 1000 },
          inner: { zIndex: 199 },
          body: {
            height: 'calc(100% - 80px)',
            overflow: 'scroll',
            paddingBottom: '80px',
          },
        }}
      >
        <CreateTableForm onCancel={reset} />
        <DevTool control={form.control} />
      </Drawer>
    </FormProvider>
  )
}
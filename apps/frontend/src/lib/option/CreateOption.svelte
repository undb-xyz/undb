<script lang="ts">
	import { createOptionOpen } from '$lib/store/modal'
	import { Button, Input, Modal, Toast } from 'flowbite-svelte'
	import OptionColorPicker from './OptionColorPicker.svelte'
	import { OptionColor, type createOptionSchema } from '@undb/core'
	import { superForm } from 'sveltekit-superforms/client'
	import type { Validation } from 'sveltekit-superforms/index'
	import { trpc } from '$lib/trpc/client'
	import { getField, getTable } from '$lib/store/table'
	import { slide } from 'svelte/transition'
	import { t } from '$lib/i18n'

	export let data: Validation<typeof createOptionSchema>

	const table = getTable()
	const field = getField()

	const createOption = trpc.table.field.select.createOption.mutation()

	const { form, enhance, reset } = superForm(data, {
		id: 'createOption',
		SPA: true,
		dataType: 'json',
		invalidateAll: true,
		applyAction: true,
		taintedMessage: null,
		async onUpdate(event) {
			if (!$field) return
			$createOption.mutate({
				tableId: $table.id.value,
				fieldId: $field?.id.value,
				option: event.form.data,
			})
		},
		onResult() {
			reset()
			$createOptionOpen = false
		},
	})

	$: if ($field?.type === 'select') {
		$form.color = $field.options.lastOption.into()?.color.next().toJSON() || OptionColor.defaultColor.toJSON()
	}
</script>

{#if $field?.type === 'select'}
	<Modal
		title={$t('Create New Option') ?? undefined}
		bind:open={$createOptionOpen}
		placement="top-center"
		class="w-full rounded-sm"
		size="sm"
		autoclose
	>
		<form id="createOption" class="flex gap-2 items-center" method="POST" use:enhance>
			<OptionColorPicker bind:value={$form.color.name} name={$form.name} />
			<Input class="rounded-none outline-none border-none" name="name" size="sm" type="text" bind:value={$form.name} />
		</form>

		<svelte:fragment slot="footer">
			<div class="w-full flex justify-end gap-4">
				<Button size="xs" color="alternative">{$t('Cancel', { ns: 'common' })}</Button>
				<Button size="xs" form="createOption">{$t('Confirm', { ns: 'common' })}</Button>
			</div>
		</svelte:fragment>
	</Modal>
{/if}

{#if $createOption.error}
	<Toast transition={slide} position="bottom-right" class="z-[99999] !bg-red-500 border-0 text-white font-semibold">
		<span class="inline-flex items-center gap-3">
			<i class="ti ti-exclamation-circle text-lg" />
			{$createOption.error.message}
		</span>
	</Toast>
{/if}
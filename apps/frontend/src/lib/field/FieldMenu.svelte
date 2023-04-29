<script lang="ts">
	import cx from 'classnames'
	import { invalidate } from '$app/navigation'
	import { page } from '$app/stores'
	import { currentFieldId, getField, getTable, getView } from '$lib/store/table'
	import { updateFieldOpen } from '$lib/store/modal'
	import { trpc } from '$lib/trpc/client'
	import type { ISortDirection } from '@undb/core'
	import { DropdownDivider, DropdownItem, Toast } from 'flowbite-svelte'
	import { noop } from 'lodash-es'
	import { slide } from 'svelte/transition'
	import { t } from '$lib/i18n'

	export let togglePin: (fieldId: string) => void = noop

	const table = getTable()
	const view = getView()
	const field = getField()
	$: pinned = !!$view.pinnedFields?.getPinnedPosition($field!.id.value)

	$: fieldDirection = $field ? $view.getFieldSort($field.id.value).into() : undefined

	const resetFieldSort = trpc.table.view.sort.resetFieldSort.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
			currentFieldId.set(undefined)
		},
	})
	const setFieldSort = trpc.table.view.sort.setFieldSort.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
			currentFieldId.set(undefined)
		},
	})

	async function sort(direction: ISortDirection) {
		if (!$field) return
		if (direction === fieldDirection) {
			$resetFieldSort.mutateAsync({
				tableId: $table.id.value,
				viewId: $view.id.value,
				fieldId: $field.id.value,
			})
		} else {
			$setFieldSort.mutateAsync({
				tableId: $table.id.value,
				viewId: $view.id.value,
				fieldId: $field.id.value,
				direction,
			})
		}
	}
</script>

<DropdownItem
	class="inline-flex items-center gap-2 text-xs text-gray-500 font-medium"
	on:click={() => updateFieldOpen.set(true)}
>
	<i class="ti ti-edit text-sm" />
	<span>{$t('Update Field')}</span>
</DropdownItem>

<DropdownDivider />

<DropdownItem
	class="inline-flex items-center gap-2 text-xs text-gray-500 font-medium"
	on:click={() => {
		if ($field) {
			togglePin($field.id.value)
		}
	}}
>
	{#if pinned}
		<i class="ti ti-pinned-off text-sm" />
		<span>{$t('Unset Pin Field')}</span>
	{:else}
		<i class="ti ti-pin text-sm" />
		<span>{$t('Pin Field')}</span>
	{/if}
</DropdownItem>

<DropdownDivider />

<DropdownItem
	class={cx(
		'inline-flex items-center gap-2 text-xs text-gray-500 font-medium',
		fieldDirection === 'asc' && 'bg-gray-100',
	)}
	on:click={() => sort('asc')}
>
	<i class="ti ti-sort-ascending-2 text-sm" />
	<span>
		{#if fieldDirection === 'asc'}
			{$t('Delete Sort Ascending')}
		{:else}
			{$t('Sort Ascending')}
		{/if}
	</span>
</DropdownItem>
<DropdownItem
	class={cx(
		'inline-flex items-center gap-2 text-xs text-gray-500 font-medium',
		fieldDirection === 'desc' && 'bg-gray-100',
	)}
	on:click={() => sort('desc')}
>
	<i class="ti ti-sort-descending-2 text-sm" />
	<span>
		{#if fieldDirection === 'desc'}
			{$t('Delete Sort Desending')}
		{:else}
			{$t('Sort Desending')}
		{/if}
	</span>
</DropdownItem>

{#if $resetFieldSort.error}
	<Toast transition={slide} position="bottom-right" class="z-[99999] !bg-red-500 border-0 text-white font-semibold">
		<span class="inline-flex items-center gap-3">
			<i class="ti ti-exclamation-circle text-lg" />
			{$resetFieldSort.error.message}
		</span>
	</Toast>
{/if}

{#if $setFieldSort.error}
	<Toast transition={slide} position="bottom-right" class="z-[99999] !bg-red-500 border-0 text-white font-semibold">
		<span class="inline-flex items-center gap-3">
			<i class="ti ti-exclamation-circle text-lg" />
			{$setFieldSort.error.message}
		</span>
	</Toast>
{/if}
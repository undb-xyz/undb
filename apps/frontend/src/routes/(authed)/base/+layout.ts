import { trpc } from '$lib/trpc/client'
import type { LayoutLoad } from './$types'

export const ssr = false
export const prerender = false

export const load: LayoutLoad = async () => {
	return {
		bases: trpc().base.list.utils.fetch({}),
	}
}

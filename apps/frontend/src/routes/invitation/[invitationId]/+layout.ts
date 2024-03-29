import { trpc } from '$lib/trpc/client'
import type { LayoutLoad } from './$types'

export const ssr = false
export const prerender = false

export const load: LayoutLoad = async ({ params }) => {
	const id = params.invitationId
	return {
		invitation: await trpc().invitation.get.utils.fetch({ id }),
	}
}

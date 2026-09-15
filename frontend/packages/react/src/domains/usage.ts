import {
  getAgentProfileUsageOptions,
  getAgentUsageOptions,
  getOrgUsageOptions,
  getProjectUsageOptions,
} from '@omnara/sdk/tanstack'
import { keepPreviousData, type Query, useQuery } from '@tanstack/react-query'

import { useOmnaraClient } from '../omnara-client'
import { generatedQueryKey } from './query-keys'

export function useOrgUsage(orgID: string) {
  const client = useOmnaraClient()
  return useQuery(getOrgUsageOptions({ path: { orgID }, client }))
}

export function useProjectUsage(orgID: string, projectID: string) {
  const client = useOmnaraClient()
  return useQuery(getProjectUsageOptions({ path: { orgID, projectID }, client }))
}

export function useAgentProfileUsage(orgID: string, projectID: string, agentProfileID: string) {
  const client = useOmnaraClient()
  return useQuery(
    getAgentProfileUsageOptions({ path: { orgID, projectID, agentProfileID }, client }),
  )
}

export function useAgentUsage(
  orgID: string,
  projectID: string,
  agentID: string,
  includeSubagents: boolean,
) {
  const client = useOmnaraClient()
  return useQuery({
    ...getAgentUsageOptions({
      path: { orgID, projectID, agentID },
      query: { include_subagents: includeSubagents },
      client,
    }),
    placeholderData: keepPreviousData,
  })
}

export function agentUsageQueryPredicate(orgID: string, projectID: string) {
  return (query: Query): boolean => {
    const key = generatedQueryKey(query)
    return (
      key?._id === 'getAgentUsage' && key.path?.orgID === orgID && key.path.projectID === projectID
    )
  }
}

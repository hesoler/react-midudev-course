import { fetchUsers } from '../services/users'
import { type User } from '../types.d'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useUsers = () => {
  interface Page {
    users: User[]
    previousCursor?: number
    nextCursor?: number
  }

  const {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery<Page, Error>(
    {
      queryKey: ['users'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 3000
    }
  )

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

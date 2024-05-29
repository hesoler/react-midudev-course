export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(`https://randomuser.me/api?results=100&seed=hesoler&page${pageParam}`)
    .then(async response => {
      if (!response.ok) throw new Error('Error en la petición')
      return await response.json()
    })
    .then((res) => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1
      return {
        users: res.results,
        nextCursor
      }
    })
}

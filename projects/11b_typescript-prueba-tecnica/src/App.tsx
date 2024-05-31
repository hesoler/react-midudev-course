import { useMemo, useState } from 'react'
import { SortBy, type User } from './types.d'
import { UsersList } from './componets/UsersList'
import './App.css'
import { useUsers } from './hooks/useUsers'
// import usersData from './data/users.json'

function App () {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  const toggleColors = () => { setShowColors(!showColors) }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    void refetch()
  }

  const handleChangeSort = (sort: SortBy) => { setSorting(sort) }

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter(user => user.email !== email)
    // setUsers(filteredUsers)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.trim().length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const sortProperty = compareProperties[sorting]
      return sortProperty(a).localeCompare(sortProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'Desordenar' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear
        </button>
        <input
          placeholder='Filtrar por país'
          onChange={evt => { setFilterCountry(evt.target.value) }}
        />
        <span>
          Total: {users.length}
        </span>
      </header>
      <main>
        {users.length > 0 &&
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />}

        {isLoading && <b>Cargando...</b>}

        {!isLoading && isError && <p>Ha habido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage && <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>}

        {!isLoading && !isError && !hasNextPage && <p>No hay más resultados</p>}
      </main>
    </div>
  )
}

export default App

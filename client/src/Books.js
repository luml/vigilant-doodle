import React from 'react';
import { gql, useQuery } from '@apollo/client'

export const booksListQuery = gql`
  query Query {
    books {
      title
      author
    }
  }
`

const Books = () => {
  const { loading, error, data } = useQuery(booksListQuery, {
    variables: { language: 'english' }
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <ul>
      {data.books.map((item) =>
      (
        <li key={item.title}>{item.author} {item.title}</li>
      )
      )}
    </ul>
  );
}

export default Books

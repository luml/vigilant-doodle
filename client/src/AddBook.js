import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define mutation
const ADD_BOOK = gql`
  # Increments a back-end counter and gets its resulting value
  mutation AddBook($title: String, $author: String) {
    addBook(title: $title, author: $author) {
        title
        author
    }
  }
`;

const AddBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
        variables: {
            title: title,
            author: author
        },
        optimisticResponse: {
            addBook: {
                title,
                author,
                __typeName: 'Book'
            },
        },
        update: (cache, { data: { addBook } }) => {
            cache.modify({
                fields: {
                    books(existingBooks = []) {
                        const newBookRef = cache.writeFragment({
                            data: addBook,
                            fragment: gql`
                                fragment NewBook on Book {
                                    title
                                    author
                                }
                            `
                        })
                        return [...existingBooks, newBookRef]
                    }
                }
            })
        }
    })

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <input
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                value={author}
                placeholder="Author"
                onChange={(e) => setAuthor(e.target.value)}
            />
            <button onClick={addBook}>Add Book</button>
        </div>
    )
}

export default AddBook

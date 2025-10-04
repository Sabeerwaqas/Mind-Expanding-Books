import React from "react"
import PropTypes from "prop-types"
import "../styles/sidebar.css"
import BookCard from "./bookcard"
import SortByDropdown, {
  FIELDS_TO_SORT_BY,
  compareFunctions,
} from "./sortByDropdown"

const Feed = ({ data, limit }) => {
  const [sortBy, setSortBy] = React.useState(FIELDS_TO_SORT_BY[0])

  const sortedBooks = React.useMemo(
    () => [...data.allBooksJson.edges].sort(compareFunctions[sortBy.value]),
    [data, sortBy]
  )

  return (
    <>
      <SortByDropdown sortBy={sortBy.label} onSortByItemClick={setSortBy} />
      {sortedBooks.map((x, index) => {
        const book = x.node
        if (!limit || index < limit) {
          if (!book.description || book.description.length < 10) {
            return null
          }
          return <BookCard book={book} key={book.id} />
        }
        return null
      })}
    </>
  )
}

Feed.propTypes = {
  data: PropTypes.shape({
    allBooksJson: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            author: PropTypes.string,
            year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image_url: PropTypes.string,
            description: PropTypes.string,
            rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            url: PropTypes.string,
            amazon_url: PropTypes.string,
          }),
        })
      ),
    }),
  }).isRequired,
  limit: PropTypes.number,
}

Feed.defaultProps = {
  limit: null,
}

export default Feed

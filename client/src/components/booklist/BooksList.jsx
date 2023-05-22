import React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import classes from "./styles.module.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  TablePagination,
} from "@mui/material";
import { BookApi } from "../../client/backendapi/book";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  const fetchBooks = async () => {
    const { books } = await BookApi.getAllBooks();
    console.log(books);
    setBooks(books);
  };
  useEffect(() => {
    fetchBooks().catch(console.error);
  }, [1]);

  return (
    <div>
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        <Typography variant="h5">Book List</Typography>
        
      </div>
      {books.length > 0 ? (
        <>
          <div className={classes.tableContainer}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">ISBN</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Available</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? books.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : books
                  ).map((book) => (
                    <TableRow key={book.isbn}>
                      <TableCell component="th" scope="row">
                        {book.name}
                      </TableCell>
                      <TableCell align="right">{book.isbn}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell align="right">{book.quantity}</TableCell>
                      <TableCell align="right">
                        {book.availableQuantity}
                      </TableCell>
                      <TableCell align="right">{`$${book.price}`}</TableCell>
                      <TableCell>
                        <div className={classes.actionsContainer}>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            size="small"
                            to={`/books/${book.isbn}`}
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              component="div"
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
            />
           
          </div>
        </>
      ) : (
        <Typography variant="h5">No books found!</Typography>
      )}

     
    </div>
  );
};

export default BooksList;

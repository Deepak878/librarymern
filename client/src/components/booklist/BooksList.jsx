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
import { useUser } from "../../context/userContext";
import { UserApi } from "../../client/backendapi/user";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeBookIsbn, setActiveBookIsbn] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isAdmin, user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = books.filter((item) =>{
    const loweredSearchTerm = searchTerm.toLowerCase();
return item.name.toLowerCase().includes(loweredSearchTerm) ||
item.category.toLowerCase().includes(loweredSearchTerm) ||
item.price.toString().includes(loweredSearchTerm) ||
item.isbn.toString().includes(loweredSearchTerm)
  }
   
    // item.name.toLowerCase().includes(searchTerm.toLowerCase())
    
  );


  const fetchBooks = async () => {
    const { books } = await BookApi.getAllBooks();
    console.log(books);
    setBooks(books);
  };
  const fetchUserBook = async () => {
    const { books } = await UserApi.getBorrowBook();
    setBorrowedBook(books);
  };

  const deleteBook = () => {
    console.log("delet");
    if (activeBookIsbn && books.length) {
      BookApi.deleteBook(activeBookIsbn).then(({ success }) => {
        fetchBooks().catch(console.error);
        setOpenModal(false);
        setActiveBookIsbn("");
      });
    }
  };
  useEffect(() => {
    fetchBooks().catch(console.error);
    fetchUserBook().catch(console.error);
  }, [user]);

  return (
    <div>

    
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        <Typography variant="h5">Book List</Typography>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      {books.length > 0 ? (
        <>
          <div className={classes.tableContainer}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">ISBN</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Available</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData.slice(
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
                          {isAdmin && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                size="small"
                                to={`/admin/books/${book.isbn}/edit`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                  setActiveBookIsbn(book.isbn);
                                  setOpenModal(true);
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
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
            />{" "}
            <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
              <Card className={classes.conf_modal}>
                <CardContent>
                  <h2>Are you sure?</h2>
                </CardContent>
                <CardActions className={classes.conf_modal_actions}>
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteBook}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </>
      ) : (
        <Typography variant="h5">No books found!</Typography>
      )}
      {user && !isAdmin && (
        <>
          <div className={`${classes.pageHeader} ${classes.mb2}`}>
            <Typography variant="h5">Borrowed Books</Typography>
          </div>
          {borrowedBook.length > 0 ? (
            <>
              {borrowedBook.map((book) => (
                <TableRow key={book.isbn}>
                  <TableCell component="th" scope="row">
                    {book.name}
                  </TableCell>
                  <TableCell align="right">{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
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
            </>
          ) : (
            <Typography variant="h5">No books issued!</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default BooksList;


import { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import { NotificationManager } from "react-notifications";
import { UserApi } from "../../client/backendapi/user";
import { useUser } from "../../context/userContext";

import classes from "./style.module.css";
import { BookApi } from "../../client/backendapi/book";

export const Book = () => {
  const { bookIsbn } = useParams();
  const { user, isAdmin } = useUser();
  console.log(isAdmin);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [openTab, setOpenTab] = useState(0);
  const [detail, setDetail] = useState("");

  const borrowBook = () => {
    if (book && user) {
      console.log(book.isbn, user._id);
      UserApi.borrowBook(book.isbn, user._id)
        .then(({ book, error }) => {
          if (error) {
            NotificationManager.error(error);
            console.log(error);
          } else {
            setBook(book);
          }
        })
        .catch(console.error);
    }
  };

  const returnBook = () => {
    if (book && user) {
      UserApi.returnBook(book.isbn, user._id)
        .then(({ book, error }) => {
          if (error) {
            NotificationManager.error(error);
          } else {
            setBook(book);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (bookIsbn) {
      BookApi.getBookByIsbn(bookIsbn)
        .then(({ book, error }) => {
          if (error) {
            NotificationManager.error(error);
            console.log(error);
          } else {
            console.log('hoko');
            setBook(book);
          }
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIsbn]);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  useEffect(() => {
    const fetchData = async () => {
      const res = await BookApi.getBookByIsbn(bookIsbn);
      setDetail(res);
    };

    fetchData();
  }, [bookIsbn]);
  return (
    <div>
      {/* <button onClick={detailBook()}>Fetch Data</button> */}

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ISBN : {detail.book?.isbn}
          </Typography>
          <Typography variant="h5" component="div">
            Name : {detail.book?.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Category : {detail.book?.category}
          </Typography>
          <Typography variant="body2">Price : {detail.book?.price}</Typography>
          <Typography variant="body2">
            Quantity : {detail.book?.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <div className={classes.btnContainer}>
        {isAdmin ? (
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to={`/admin/books/${bookIsbn}/edit`}
          >
            Edit Book
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={borrowBook}
              disabled={book && user && book.borrowedBy.includes(user._id)}
            >
              Borrow
            </Button>
            <Button
              variant="contained"
              onClick={returnBook}
              disabled={book && user && !book.borrowedBy.includes(user._id)}
            >
              Return
            </Button>
          </>
        )}
        <Button
          type="submit"
          variant="text"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

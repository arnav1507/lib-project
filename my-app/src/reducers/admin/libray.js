import {
  ACCEPET_REJECT_FAIL,
  ACCEPT_REJECT_REQUEST,
  ACCPETED_REJECTED,
  ADDED_BOOKS,
  ADD_BOOKS_FAILED,
  ADD_BOOKS_REQUEST,
  CREATE_LIBRARY_REQUEST,
  ISSUED_BOOK,
  ISSUE_BOOK_FAIL,
  ISSUE_BOOK_START,
  LIBRARY_CREATED,
  LIBRARY_CREATION_FAILED,
  LIBRARY_LOADED,
  LOADED_STUDENT,
  LOAD_LIBRARY_FAILED,
  LOAD_LIIBRARY_REQUEST,
  LOAD_STUDENT_FAIL,
  LOAD_STUDENT_REQUEST,
  RETURNED_BOOK,
  RETURN_BOOK_FAIL,
  RETURN_BOOK_REQUEST,
} from "../../constants/admin/library";
import {
  BOOK_FEED_FAIL,
  BOOK_FEED_LOADED,
  BOOK_FEED_REQUEST,
} from "../../constants/student/library";

let initialState = {
  loading: true,
  libraryInfo: null,
  students: [],
  studentInfo: {},
  books: [],
  feeds: {},
};

export const libraryRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIBRARY_REQUEST:
    case ADD_BOOKS_REQUEST:
    case LOAD_LIIBRARY_REQUEST:
    case ACCEPT_REJECT_REQUEST:
    case ISSUE_BOOK_START:
    case LOAD_STUDENT_REQUEST:
    case RETURN_BOOK_REQUEST:
      return { ...state, loading: true };
    case LIBRARY_CREATED:
    case LIBRARY_LOADED:
      return {
        ...state,
        loading: false,
        libraryInfo: action.payload.data[0],
      };
    case LIBRARY_CREATION_FAILED:
    case ADD_BOOKS_FAILED:
    case LOAD_LIBRARY_FAILED:
      return {
        ...state,
        loading: false,
        libraryInfo: null,
      };
    case ADDED_BOOKS:
      return {
        ...state,
        loading: false,
        books: action.payload.data,
      };
    case ISSUED_BOOK:
    case RETURNED_BOOK:
    case ISSUE_BOOK_FAIL:
    case ACCPETED_REJECTED:
    case ACCEPET_REJECT_FAIL:
    case LOAD_STUDENT_FAIL:
    case RETURN_BOOK_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOADED_STUDENT:
      return {
        ...state,
        loading: false,
        studentInfo: action.payload.data[0],
      };
    default:
      return state;
  }
};

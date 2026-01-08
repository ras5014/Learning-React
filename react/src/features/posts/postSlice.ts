import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../app/store";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId?: number;
};

type PostState = {
  items: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostState = {
  items: [],
  loading: false,
  error: null,
};

// Action Types
const POST_REQUEST = "posts/request";
const POST_SUCCESS = "posts/success";
const POST_FAILURE = "posts/failure";
const POST_CREATED = "posts/created";
const POST_UPDATED = "posts/updated";
const POST_DELETED = "posts/deleted";

// Action Creators
const postsRequest = () => ({ type: POST_REQUEST });

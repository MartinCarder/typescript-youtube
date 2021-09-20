import { combineReducers } from "redux";
import video from "./videoDetailsSlice";
import related from "./relatedSlice";

export default combineReducers({
  video,
  related,
});

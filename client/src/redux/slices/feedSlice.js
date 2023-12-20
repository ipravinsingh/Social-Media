import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
  try {
    // thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.get("/user/getFeedData");
    console.log("getFeedData", response);
    return response.result;
  } catch (e) {
    return Promise.reject(e);
  }
  // finally {
  //   thunkAPI.dispatch(setLoading(false));
  // }
});

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollow",
  async (body) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/follow", body);
      return response.result.user;
    } catch (e) {
      return Promise.reject(e);
    }
    //  finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
        // console.log(state.feedData)
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        // console.log("like post", post, index);
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id == user._id
        );
        if (index != -1) {
          state?.feedData.followings.splice(index, 1);
        } else {
          state?.feedData.followings.push(user);
        }
      });
  },
});

export default feedSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
  try {
    // thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.get("/user/getMyInfo");
    // console.log("api called data", response);
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
  // finally {
  //   thunkAPI.dispatch(setLoading(false));
  // }
});
export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      //   console.log("api called data", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      //   console.log(state.isLoading)
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
        console.log(state.myProfile);
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
          console.log(state.myProfile)
      });
  },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast } = appConfigSlice.actions;

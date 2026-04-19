import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stories?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Fetch stories failed' });
    }
  }
);

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/stories', storyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Post failed' });
    }
  }
);

export const reactToStory = createAsyncThunk(
  'stories/reactToStory',
  async (storyId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stories/${storyId}/react`);
      return { storyId, story: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Reaction failed' });
    }
  }
);

export const addReply = createAsyncThunk(
  'stories/addReply',
  async ({ storyId, replyData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stories/${storyId}/reply`, replyData);
      return { storyId, story: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Reply failed' });
    }
  }
);

export const deleteStory = createAsyncThunk(
  'stories/deleteStory',
  async (storyId, { rejectWithValue }) => {
    try {
      await api.delete(`/stories/${storyId}`);
      return storyId;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Delete failed' });
    }
  }
);

const storySlice = createSlice({
  name: 'stories',
  initialState: {
    posts: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
    composerOpen: false,
  },
  reducers: {
    setComposerOpen: (state, action) => {
      state.composerOpen = action.payload;
    },
    resetStories: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
    },
    // For socket updates
    addPostToFeed: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePostLive: (state, action) => {
      const idx = state.posts.findIndex(p => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
        state.hasMore = action.payload.length === 10;
        state.page += 1;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Create
      .addCase(createStory.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // React
      .addCase(reactToStory.fulfilled, (state, action) => {
        const idx = state.posts.findIndex(p => p._id === action.payload.storyId);
        if (idx !== -1) {
          state.posts[idx].beenThereCount = action.payload.story.beenThereCount;
        }
      })
      // Reply
      .addCase(addReply.fulfilled, (state, action) => {
        const idx = state.posts.findIndex(p => p._id === action.payload.storyId);
        if (idx !== -1) {
          state.posts[idx].replies = action.payload.story.replies;
        }
      })
      // Delete
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p._id !== action.payload);
      });
  },
});

export const { setComposerOpen, resetStories, addPostToFeed, updatePostLive } = storySlice.actions;
export default storySlice.reducer;

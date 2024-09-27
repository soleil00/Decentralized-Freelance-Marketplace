import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
//@ts-ignore
import { decentralized_backend } from 'declarations/decentralized_backend';
import { TrendingUpDown } from 'lucide-react';

export interface IBid {
     bidder : string;
    amount : number;
    proposal : string;
    timestamp : number;
}

export interface Job {
  id: number;
  title: string;
    description: string;
    category: string;
  budget: bigint;
  employer: string;
  skills: string[];
  datePosted: number;
    status: 'Open' | 'In Progress' | 'Closed';
    bids: IBid[];
}




interface JobsState {
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isLoading:boolean,
    isAdding: boolean,

}


const initialState: JobsState = {
  jobs: [],
  status: 'idle',
    error: null,
   isLoading:false,
    isAdding: false,
};


export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const response = await decentralized_backend.getAllJobs()
    console.log('here is your jobs : ', response)
  return response
});
export const getSingleJob = createAsyncThunk('jobs/fetchSingleJobs', async (id:number) => {
    const response = await decentralized_backend.getJob(id)
    console.log('here is the job u are looking for : ', response)
  return response
});

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (job: Omit<Job, 'id' | 'datePosted' | 'status' | 'bids'>) => {
    try {
        const response = await decentralized_backend.postJob(
      job.title,
      job.description,
      BigInt(job.budget),
       job.category,
      job.employer,
      job.skills
    );
    console.log('Here is your posted job:', response);
    return response;
    } catch (error : any) {
        console.log('There was an error', error)
    }
  }
);

export const getJobBids = createAsyncThunk(
  'jobs/bidOnJob',
  async ({ id }: { id: number }) => {

    const response = await decentralized_backend.getJobBids(id)
    return response.json();
  }
);

export const updateJobStatus = createAsyncThunk(
  'jobs/updateJobStatus',
  async ({ id, status }: { id: bigint; status: string }, { rejectWithValue }) => {
    try {
      const success = await decentralized_backend.updateJobStatus(id, status);
      if (success) {
        const updatedJob = await decentralized_backend.getJob(id);
        return updatedJob;
      } else {
        throw new Error('Failed to update job status');
      }
    } catch (error) {
      return rejectWithValue('Failed to update job status');
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id: number, { rejectWithValue }) => {
    try {
      const success = await decentralized_backend.deleteJob(id);
      if (success) {
        return id;
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      return rejectWithValue('Failed to delete job');
    }
  }
);


export const bidOnJob = createAsyncThunk(
  'jobs/bidOnJob',
  async ({ jobId, bid }: { jobId: bigint; bid: Omit<IBid, 'timestamp'> }, { rejectWithValue }) => {
    try {
      const success = await decentralized_backend.bidOnJob(jobId, bid.bidder, bid.amount, bid.proposal);
      if (success) {
        const updatedJob = await decentralized_backend.getJob(jobId);
        return updatedJob;
      } else {
        throw new Error('Failed to place bid');
      }
    } catch (error) {
      return rejectWithValue('Failed to place bid');
    }
  }
);

export const fetchJobBids = createAsyncThunk(
  'jobs/fetchJobBids',
  async (jobId: bigint, { rejectWithValue }) => {
    try {
      const bids = await decentralized_backend.getJobBids(jobId);
      return { jobId, bids };
    } catch (error) {
      return rejectWithValue('Failed to fetch job bids');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })

      .addCase(getSingleJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isLoading = false;
        const job = action.payload;
        const existingJobIndex = state.jobs.findIndex(j => j.id === job.id);
        if (existingJobIndex !== -1) {
          state.jobs[existingJobIndex] = job;
        } else {
          state.jobs.push(job);
        }
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch the job';
      })

      .addCase(postJob.pending, (state) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isAdding = false;
        state.jobs.push(action.payload);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.error.message || 'Failed to post the job';
      })

      .addCase(updateJobStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJobStatus.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isLoading = false;
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update job status';
      })

      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete the job';
      })

      .addCase(bidOnJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bidOnJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isLoading = false;
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(bidOnJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to place a bid on the job';
      })

      .addCase(fetchJobBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobBids.fulfilled, (state, action: PayloadAction<{ jobId: bigint; bids: IBid[] }>) => {
          state.isLoading = false;
          //@ts-ignore
        const job = state.jobs.find(j => j.id === action.payload.jobId);
        if (job) {
          job.bids = action.payload.bids;
        }
      })
      .addCase(fetchJobBids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch bids for the job';
      });
  },
});

export default jobsSlice.reducer;

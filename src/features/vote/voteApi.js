import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../utils/apiClient';

// voteTypeId:  1 = UpVote,  2 = DownVote
export const VOTE_UP = 1;
export const VOTE_DOWN = 2;

export const voteApi = createApi({
    reducerPath: 'voteApi',
    baseQuery,
    tagTypes: ['Vote', 'Post'],
    endpoints: (builder) => ({

        // ── GET /votes/user/{userId} ─────────────────────────────────────────────
        getVotesByUser: builder.query({
            query: (userId) => `/votes/user/${userId}?pageNumber=0&pageSize=100`,
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Vote', id })),
                    { type: 'Vote', id: 'LIST' }
                ] : [{ type: 'Vote', id: 'LIST' }],
        }),

        // ── GET /votes/{voteId} ─────────────────────────────────────────────────
        getVoteById: builder.query({
            query: (voteId) => `/votes/${voteId}`,
            providesTags: (result, error, voteId) => [{ type: 'Vote', id: voteId }],
        }),

        // ── POST /votes  { postId, voteType } ────────────────────────────────────
        createVote: builder.mutation({
            query: ({ postId, voteTypeId }) => ({
                url: '/votes',
                method: 'POST',
                // Assuming backend expects the string "UpVote" or "DownVote" based on previous logic
                body: {
                    postId,
                    voteType: voteTypeId === 1 ? "UpVote" : "DownVote"
                },
            }),
            // Refresh the post so the score updates immediately
            invalidatesTags: (result, error, { postId }) => [
                { type: 'Post', id: postId },
                { type: 'Post', id: 'LIST' },
                { type: 'Vote', id: 'LIST' },
            ],
        }),

        // ── PUT /votes/{voteId}  { postId, voteType } ────────────────────────────
        updateVote: builder.mutation({
            query: ({ voteId, postId, voteTypeId }) => ({
                url: `/votes/${voteId}`,
                method: 'PUT',
                body: {
                    postId,
                    voteType: voteTypeId === 1 ? "UpVote" : "DownVote"
                },
            }),
            invalidatesTags: (result, error, { voteId, postId }) => [
                { type: 'Vote', id: voteId },
                { type: 'Vote', id: 'LIST' },
                { type: 'Post', id: postId },
                { type: 'Post', id: 'LIST' },
            ],
        }),

        // ── DELETE /votes/{voteId} ───────────────────────────────────────────────
        deleteVote: builder.mutation({
            query: (voteId) => ({
                url: `/votes/${voteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, voteId) => [
                { type: 'Vote', id: voteId },
                { type: 'Vote', id: 'LIST' },
                { type: 'Post', id: 'LIST' },
            ],
        }),

    }),
});

export const {
    useGetVotesByUserQuery,
    useGetVoteByIdQuery,
    useCreateVoteMutation,
    useUpdateVoteMutation,
    useDeleteVoteMutation,
} = voteApi;

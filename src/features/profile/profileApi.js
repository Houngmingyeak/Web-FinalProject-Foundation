import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../utils/apiClient';

const API_BASE_URL = 'https://forum-istad-api.cheat.casa'; // ឬទាញពី .env

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/me',
      providesTags: ['Profile'],
      transformResponse: (response) => {
        if (response.profileImage) {
          // កែ URL រូបភាពឲ្យប្រើ domain ត្រឹមត្រូវ
          if (response.profileImage.includes('localhost:8070')) {
            response.profileImage = response.profileImage.replace('http://localhost:8070', API_BASE_URL);
          } else if (response.profileImage.startsWith('/')) {
            response.profileImage = `${API_BASE_URL}${response.profileImage}`;
          }
        }
        return response;
      },
    }),
    uploadProfileImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/users/upload-image',
          method: 'PUT',
          body: formData,
        };
      },
      transformResponse: (response) => {
        // កែ URL រូបភាពក្នុងការឆ្លើយតបពីការ Upload (បើមាន)
        if (response.profileImage) {
          if (response.profileImage.includes('localhost:8070')) {
            response.profileImage = response.profileImage.replace('http://localhost:8070', API_BASE_URL);
          } else if (response.profileImage.startsWith('/')) {
            response.profileImage = `${API_BASE_URL}${response.profileImage}`;
          }
        }
        return response;
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUploadProfileImageMutation } = profileApi;
/**
 * API Utility Functions
 * Handles all API calls for the feedback widget
 */

/**
 * Submit feedback comment
 */
export const submitComment = async (apiUrl, data) => {
  try {
    const response = await fetch(`${apiUrl}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to submit comment:', error);
    throw error;
  }
};

/**
 * Get comments for a specific page
 */
export const getComments = async (apiUrl, projectId, url) => {
  try {
    const response = await fetch(
      `${apiUrl}/comments?projectId=${projectId}&url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get comments:', error);
    throw error;
  }
};

/**
 * Upload file attachment
 */
export const uploadFile = async (apiUrl, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};

/**
 * Delete comment
 */
export const deleteComment = async (apiUrl, commentId) => {
  try {
    const response = await fetch(`${apiUrl}/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};

/**
 * Update comment
 */
export const updateComment = async (apiUrl, commentId, data) => {
  try {
    const response = await fetch(`${apiUrl}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update comment:', error);
    throw error;
  }
};

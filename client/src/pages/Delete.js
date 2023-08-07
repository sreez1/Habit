import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = ({ habitId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/habit/${habitId}`);
      // Call the onDelete function provided by the parent component to update the state after successful deletion
      onDelete(habitId);
    } catch (error) {
      console.error('Error deleting habit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default Delete;

import { useState } from 'react';
import './App.css'
import { createPost } from './api/post.api';
import toast from 'react-hot-toast';

// Normally we will make zod schema and infer types from that
type FormData = {
  title: string;
  body: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    body: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh
    setIsSubmitting(true);

    console.log(formData);

    // Send form data to API
    try {
      await createPost(formData);
      toast.success('Post created successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post.');
    }

    // Simulate form submission
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
  }

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="string" placeholder='Enter Title' onChange={(e) => setFormData(prevData => {
          return {
            ...prevData,
            title: e.target.value
          }
        })} /><br />
        <input type="string" placeholder='Enter Body' onChange={(e) => setFormData(prevData => {
          return {
            ...prevData,
            body: e.target.value
          }
        })} /><br />
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
    </div>
  )
}

export default App

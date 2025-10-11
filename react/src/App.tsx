/* To implement zod schema validations, we need to install two libraries
     - npm i zod
     - npm i @hookform/resolvers
   For forms handling, we will use react-hook-form
     - npm i react-hook-form 
*/
import './App.css'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema, type CreatePostInput } from './types/post.type'
import toast from 'react-hot-toast'
import { createPost } from './api/post.api'

function App() {
  // register is used inside <input> to register the input fields
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<CreatePostInput>({
    defaultValues: {
      title: '',
      body: ''
    },
    resolver: zodResolver(createPostSchema) // This will ensure that the form data is validated against the schema
  })

  const onSubmit: SubmitHandler<CreatePostInput> = async (data: CreatePostInput) => {
    try {
      await createPost(data);
      toast.success("Post created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
      // This is how you can set root errors (errors not related to specific fields)
      setError("root", { message: "Something went wrong! Please try again later." });
      // You can also set field-specific errors using setError('fieldName', { message: 'Error message' });
    }
  }

  return (
    <>
      <h1>React Hook Forms With ZOD Validation</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder='Enter Title' {...register('title')} />
          {/* This is how error messages are displayed (formState errors from react-hook-form)
                - ZOD handles validation and error messages
            */}
          {errors.title && <span>{errors.title.message}</span>}
          <br />
          <textarea placeholder='Enter Body' {...register('body')} />
          {errors.body && <span>{errors.body.message}</span>}
          <br />
          <button type='submit' disabled={isSubmitting}>Create Post</button>
          {/* For root errors */}
          {errors.root && <span>{errors.root.message}</span>}
        </form>
      </div>
    </>
  )
}

export default App

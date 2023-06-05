import React from 'react'
import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="blue_gradient">
          {type} Post 
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share.
      </p>

      <form action=""
      onSubmit={handleSubmit} 
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title{` `}
            <span className="font-normal">(Html , Css , Ruby , Al & Ds)</span>
          </span>
          <input value={post.title}
          onChange={(e) => setPost({...post, title: e.target.value})}
          placeholder="Write Your Title"
          required 
          className='form_input'
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea value={post.about}
          onChange={(e) => setPost({...post, about: e.target.value})}
          placeholder="Write your prompt here..."
          required 
          className='form_textarea'
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Link{` `}
          </span>
          <input value={post.link}
          onChange={(e) => setPost({...post, link: e.target.value})}
          placeholder="Add Your Source Link"
          required 
          className='form_input'
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            tag{` `}
            <span className="font-normal">(#webdevelopment, #html, #sources)</span>
          </span>
          <input value={post.tag}
          onChange={(e) => setPost({...post, tag: e.target.value})}
          placeholder="Write your tags"
          required 
          className='form_input'
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/" className='text-gray-500 text-sm'>
          Cancel
        </Link>
        <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
          {submitting ? `${type}...` : type}
        </button>
        </div>

      </form>
    </section>
  )
}

export default Form
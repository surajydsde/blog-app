import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreatePost = ()=>{
    const [form, setForm] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    const submit = async(e)=>{
        e.preventDefault();
        await API.post('/posts', form)
        navigate('/')
    }

    return (
            <form onSubmit={submit}>
      <h2>Create Post</h2>
      <input className="form-control mb-2" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="form-control mb-2" placeholder="Content" rows="5" onChange={e => setForm({ ...form, content: e.target.value })} />
      <button className="btn btn-success">Submit</button>
    </form>

    )
}

export default CreatePost
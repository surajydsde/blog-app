import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const EditPost = () => {

    const { id } = useParams();
        
    const [form, setForm] = useState({
        title: '',
        content: ''
    }) 

    const navigate = useNavigate();
    useEffect(()=>{
        API.get(`/posts/${id}`).then(res=> {
          setForm(res.data)
    })
        
    }, [id])

    const submit = async(e)=>{
        e.preventDefault();
        await API.put(`/posts/${id}`, form)
        navigate('/')
    }

  
    return (
      <div>
        <form onSubmit={submit}>
      <h2>Edit Post</h2>
      <input className="form-control mb-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="form-control mb-2" rows="5" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
      <button className="btn btn-primary">Update</button>
    </form>
    <div>
      <button className='btn btn-outline-primary mt-2' onClick={()=> navigate(-1)}>Go Back</button>;
    </div>
    </div>
  )
}

export default EditPost
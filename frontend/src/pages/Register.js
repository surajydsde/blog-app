import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = ()=>{
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })

    const navigate = useNavigate();

    const submit = async(e)=>{
        e.preventDefault();
        const res =  await API.post('/auth/register', form);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/')
    }

    return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input className="form-control mb-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="btn btn-primary">Register</button>
    </form>
    )
}

export default Register
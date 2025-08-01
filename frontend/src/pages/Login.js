import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const res = await API.post('/auth/login', form)
        localStorage.setItem('user', JSON.stringify(res.data))
        navigate('/')
    }

    return (
        <form onSubmit={submit}>
            <h2>Login</h2>
            <input className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button className="btn btn-primary">Login</button>
        </form>
    )
}


export default Login
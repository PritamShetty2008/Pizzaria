import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // refresh page to show username in navbar
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:400, margin:'40px auto'}}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div style={{marginBottom: 12}}>
          <input 
            placeholder="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            required 
            style={{width: '100%', padding: 8, marginTop: 8}}
          />
        </div>
        <div style={{marginBottom: 12}}>
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            required 
            style={{width: '100%', padding: 8, marginTop: 8}}
          />
        </div>
        <button type="submit" disabled={loading} style={{width: '100%', padding: 10, marginTop: 12}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
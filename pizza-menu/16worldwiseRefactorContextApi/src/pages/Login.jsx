import { useState, useEffect } from 'react'
import styles from "./Login.module.css";
import { Button, PageNav } from '../components/index'
import { useAuth } from '../context/FakeAuthContext';
import { useNavigate } from "react-router-dom";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      login(email, password);
    }
  };

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated)
      navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={handleLogin} type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

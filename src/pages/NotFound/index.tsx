import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import useUser from '../../hooks/useUser';

export default function NotFound() {
  const { loginUser, setIsAuth } = useUser()

  return (
    <div className="home__page">
      <Header
        title='404'
        loginUser={loginUser}
        setIsAuth={setIsAuth}
      />
      <main>
        <h2>Not Found</h2>
        <Link to={"/"}>Home</Link>
      </main>
    </div>
  );
}
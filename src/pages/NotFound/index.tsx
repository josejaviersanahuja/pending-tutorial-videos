import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import useUser from '../../hooks/useUser';

export default function NotFound() {
    const {loginUser} = useUser()
    
      return (
          <div className="home__page">
            <header>
              <Avatar user={loginUser}/>
              <h1>404</h1>
            </header>
            <main>
                <h2>Not Found</h2>
                <Link to={"/"}>Home</Link>
            </main> 
          </div>
        );
}
import LoginButtons from "./LoginButtons";

interface ILogin {

}

export default function Login({}:ILogin) {
  return (
    <div className="login__page">
      <header>
        <h1>Videos Aún Por Ver</h1>
      </header>
      <main>
        <h3>Únete con tu cuenta de google, facebook o twitter</h3>
        <LoginButtons />
      </main>
    </div>
  );
}

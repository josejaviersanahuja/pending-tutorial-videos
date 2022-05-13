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
        <h2>Únete con tu cuenta de google, facebook o github</h2>
        <LoginButtons />
      </main>
    </div>
  );
}

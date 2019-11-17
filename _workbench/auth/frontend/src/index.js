import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

function Signin() {
  return (
    <div className="App text-center">
      <form className="form-signin">
        <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputName" className="sr-only">Name</label>
        <input type="text" id="inputName" className="form-control" placeholder="Name" required="" autoFocus="" />
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
        <div className="checkbox mb-3">
          <label><input type="checkbox" value="remember-me" /> Remember me</label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  );
}

// function Login() {
//   return (
//     <div className="App text-center">
//       <form className="form-signin">
//         <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
//         <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
//         <label htmlFor="inputEmail" className="sr-only">Email address</label>
//         <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
//         <label htmlFor="inputPassword" className="sr-only">Password</label>
//         <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
//         <div className="checkbox mb-3">
//           <label><input type="checkbox" value="remember-me" /> Remember me</label>
//         </div>
//         <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
//       </form>
//     </div>
//   );
// }

ReactDOM.render(
<Signin />
, document.getElementById('root'));


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { selectUserData } from "../store/user/selectors";
import { toRegister } from "../store/user/slice";

export default function AppRegisterComponent() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { register } = useAuth();

  const handleOnRegister = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="form-signin w-100 m-auto">
      <form onSubmit={handleOnRegister}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="John"
            onChange={({ target }) =>
              dispatch(toRegister({ ...userData, first_name: target.value }))
            }
          />
          <label>First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Doe"
            onChange={({ target }) =>
              dispatch(toRegister({ ...userData, last_name: target.value }))
            }
          />
          <label>Last Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={({ target }) =>
              dispatch(toRegister({ ...userData, email: target.value }))
            }
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={({ target }) =>
              dispatch(toRegister({ ...userData, password: target.value }))
            }
          />
          <label>Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={({ target }) =>
              dispatch(
                toRegister({
                  ...userData,
                  password_confirmation: target.value,
                })
              )
            }
          />
          <label>Confirm Password</label>
        </div>
        <div className="checkbox mb-2">
          <label>
            <input
              type="checkbox"
              className="m-1"
              checked={userData.terms}
              onChange={(e) =>
                dispatch(
                  toRegister({
                    ...userData,
                    terms: e.target.checked ? true : false,
                  })
                )
              }
            />
            I Accept Terms & Conditions
          </label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

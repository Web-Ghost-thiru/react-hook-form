import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const HookForm = ({ toggleTheme, setToggleTheme }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      addresses: [{ address: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="container col-sm-8 col-md-6 col-xl-4">
      <h2 className={`text-center ${toggleTheme ? "text-white" : "text-dark"}`}>
        React Hook Form
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="needs-validation border border-2 p-5 bg-body-tertiary"
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text rounded-end-0" id="inputGroupPrepend">@</span>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group has-validation">
            <input
              type={togglePassword ? "text" : "password"}
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""} rounded-end-0`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <span
              className="input-group-text rounded-start-0"
              role="button"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {togglePassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </span>
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                value="male"
                {...register("gender", { required: "Gender is required" })}
              />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                value="female"
                {...register("gender", { required: "Gender is required" })}
              />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && <div className="text-danger">{errors.gender.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label me-2">Address</label>
          {fields.map((item, index) => (
            <div key={item.id} className="input-group mb-2">
             { console.log(fields)}
              <input
                type="text"
                className={`form-control ${errors?.addresses?.[index]?.address ? "is-invalid" : ""}`}
                {...register(`addresses.${index}.address`, { required: "Address is required" })}
                placeholder={`Address Line ${index + 1}`}
              />
              <button
                type="button"
                className="btn btn-danger rounded-end-1"
                onClick={() => remove(index)}
              >
                Remove
              </button>
              {errors?.addresses?.[index]?.address && (
                <div className="invalid-feedback">{errors.addresses[index].address.message}</div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => append({ address: "" })}
          >
            Add Address
          </button>
        </div>

        <div className="mb-3 form-check">
          <input
            className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
            type="checkbox"
            id="terms"
            {...register("terms", { required: "You must agree to the terms and conditions" })}
          />
          <label className="form-check-label" htmlFor="terms">I agree to the terms and conditions</label>
          {errors.terms && <div className="invalid-feedback">{errors.terms.message}</div>}
        </div>
        
        <div className="d-flex justify-content-between">
          <div>
            <button type="submit" className="btn btn-success me-2">Submit</button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                clearErrors();
                reset();
              }}
            >
              Reset
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn border border-1"
              onClick={() => setToggleTheme(!toggleTheme)}
            >
              {toggleTheme ? (
                <i className="bi bi-brightness-high-fill"></i>
              ) : (
                <i className="bi bi-moon-stars"></i>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HookForm;

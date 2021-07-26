import React from 'react'
import { useForm } from "react-hook-form";

export default function KeywordSearch() {
    const {
      register, 
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try{
          console.log(data)
        }catch(err){
          console.log(err)
        }
      };
    
    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="form">
                      
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="form">
                      
                      {/* First Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9
                        ">
                          <input
                          id="firstName"
                          className="form-control"
                          aria-invalid={errors.firstName ? "true" : "false"} 
                          {...register("firstName", {
                            required: "required",
                            pattern: {
                              value: /^[A-Za-z]+$/i ,
                              message: "first name required"
                            }
                          })}
                          type="text"/>
                          {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9">
                          <input 
                          id="lastName"
                          className="form-control"
                          aria-invalid={errors.lastName ? "true" : "false"}
                          {...register("lastName", {
                            required: "required",
                            pattern: {
                              value: /^[A-Za-z]+$/i ,
                              message: "last name required"
                            }
                          })}
                          type="text"/>
                          {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
                        </div>
                      </div>


                      {/* Email */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input
                            id="email"
                            className="form-control"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                              required: "required",
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter a valid email"
                              }
                            })}
                            type="email"
                            placeholder="example@mail.com"
                          />
                            {errors.email && <span role="alert">{errors.email.message}</span>}
                        </div>
                      </div>


                      {/* Password */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                          <input
                            id="password"
                            className="form-control"
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register("password", {
                              required: "required",
                              minLength: {
                                value: 5,
                                message: "min length is 5"
                              }
                            })}
                            type="password"
                            placeholder="password"
                          />
                          {errors.password && <span role="alert">{errors.password.message}</span>}
                        </div>
                      </div>

                    </div>
                    <div className="getForm">  
                      <button type="submit" className="btn">Sign Up</button>
                    </div>
                  </form>
                      


                      


                   

                    </div>
                    <div className="getForm">  
                      <button type="submit" className="btn">Sign Up</button>
                    </div>
                  </form>
        </div>
    )
}

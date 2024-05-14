import React, { useState } from 'react';
import { Await, Link } from 'react-router-dom';
import { Button, Text } from '../../../../components';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Eye, EyeOff, LockKeyhole, Mail, Phone, User2 } from 'lucide-react';
import { Input } from '../../../../components/input/input';

const Signup = ({ register, setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const email = form.email.value;
    const phone = form.phoneNumber.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    setLoading(true);
    if (password == confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/api/v0/user/register', {
          username: username,
          email: email,
          phone: phone,
          password: password,
        });

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Password did not matched');
    }
  };

  return (
    <section>
      <Toaster richColors />
      <div className="flex w-screen flex-col justify-center items-center lg:flex-row-reverse lg:h-screen">
        <div className="w-full lg:w-1/2 ">
          <img src="https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png" className="my-10 mx-auto" alt="" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-12 lg:mb-0 rounded-e-[45px] lg:shadow-2xl h-full">
          <form onSubmit={handleSubmit} className="mx-auto w-3/5 ">
            <Text variant="h4" className="text-primary mb-9">
              Sign Up
            </Text>
            {/* Username Start */}
            <div className="flex flex-col mb-4 relative">
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <Input
                name="username"
                variant="default"
                type="text"
                placeholder="Username"
                icon={User2}
              />
            </div>
            {/* Username end */}
            {/* Email Start */}
            <div className="flex flex-col mb-4 relative">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                variant="default"
                type={'email'}
                placeholder="Email"
                icon={Mail}
              />
            </div>
            {/* Email end */}
            {/* Phone Number Start */}
            <div className="flex flex-col mb-4 relative">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                name="phoneNumber"
                variant="default"
                type="text"
                placeholder="Phone Number"
                icon={Phone}
              />
            </div>
            {/* Phone Number end */}
            {/* Password Start */}
            <div className="flex mb-4  items-center ">
              <div className="flex flex-col w-full relative">
                <div>
                  <label htmlFor="password">Password</label>
                  <Input
                    name="password"
                    variant="default"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    icon={LockKeyhole}
                  />
                </div>
              </div>

              <div className="absolute right-16 md:right-36 lg:right-[830px] mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="flex items-center"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {/* Password end */}
            {/* Confirm Password Start */}
            <div className="flex mb-4  items-center  ">
              <div className="flex flex-col w-full relative">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  variant="default"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  icon={LockKeyhole}
                />
              </div>

              <div className="absolute right-16 md:right-36 lg:right-[830px] mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="flex items-center"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button variant="default" className="p-2 mt-10 w-full" type="submit" loading={loading}>
              Sign up
            </Button>
            <div className="flex items-center justify-center text-primary mt-2">
              Already have an account?{' '}
              <Link
                className="text-red-500"
                onClick={() => {
                  setRegister(!register);
                }}
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;


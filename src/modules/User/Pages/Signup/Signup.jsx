import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from '../../../../components';
import { Eye, EyeOff, LockKeyhole, Mail, Phone, User2 } from 'lucide-react';
import { Input } from '../../../../components/input/input';
import { registrationApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';
import { toast } from 'sonner';

const Signup = ({ register, setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const username = form.username.value;
    const email = form.email.value;
    const phone = form.phoneNumber.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const data = { username, email, phone, password };

    if (password === confirmPassword) {
      const res = await registrationApi(data);
      logs('handleSubmit: registrationApi res', [res], Style.function);

      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        // navigate('/auth');
        setRegister(false);
      } else {
        setLoading(false);
        toast.error(res.data.message);
      }
    } else {
      toast.error('Passwords did not match');
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center w-screen lg:flex-row-reverse lg:h-screen">
        <div className="w-full lg:w-1/2 ">
          <img src="https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png" className="mx-auto my-10" alt="" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-12 lg:mb-0 rounded-e-[45px] lg:shadow-2xl h-full">
          <form onSubmit={handleSubmit} className="w-3/5 mx-auto ">
            <Text variant="h4" className="text-primary mb-9">
              Sign Up
            </Text>

            <label htmlFor="username" className="relative flex flex-col mb-4">
              Username
              <Input
                name="username"
                variant="default"
                type="text"
                placeholder="Username"
                icon={User2}
                required
              />
            </label>

            <label htmlFor="email" className="relative flex flex-col mb-4">
              Email
              <Input
                name="email"
                variant="default"
                type="email"
                placeholder="Email"
                icon={Mail}
                required
              />
            </label>

            <label htmlFor="phoneNumber" className="relative flex flex-col mb-4">
              Phone Number
              <Input
                name="phoneNumber"
                variant="default"
                type="number"
                placeholder="Phone Number"
                icon={Phone}
                required
              />
            </label>

            <div className="flex items-center mb-4 ">
              <label htmlFor="password" className="relative flex flex-col w-full">
                Password
                <Input
                  name="password"
                  variant="default"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  icon={LockKeyhole}
                  required
                />
              </label>

              <button
                type="button "
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="flex items-center absolute right-16 md:right-36 lg:right-[830px] mt-6"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="flex items-center mb-4 ">
              <label htmlFor="confirmPassword" className="relative flex flex-col w-full">
                Confirm Password
                <Input
                  name="confirmPassword"
                  variant="default"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  icon={LockKeyhole}
                  required
                />
              </label>

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

            <Button variant="default" className="w-full p-2 mt-10" type="submit" loading={loading}>
              Sign up
            </Button>
            <div className="flex items-center justify-center mt-2 text-primary">
              Already have an account?{' '}
              <Link
                className="ml-2 font-bold text-red-500"
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from '../../../../components';
import { Mail, Phone, User2 } from 'lucide-react';
import { Input } from '../../../../components/input/input';
import { registrationApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';
import { toast } from 'sonner';
import { InputPassword } from '../../../../components/input/inputPassword';

const Signup = ({ register, setRegister }) => {
  const [loading, setLoading] = useState(false);

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
        setRegister(false);
      } else {
        setLoading(false);
        toast.error(res.data.message);
      }
    } else {
      setLoading(false);
      toast.error('Passwords did not match');
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center w-screen lg:flex-row-reverse lg:h-screen">
        <div className="w-full lg:w-1/2 ">
          <img
            src="https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png"
            className="mx-auto my-10"
            alt="logo"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-12 lg:mb-0 rounded-e-[45px] lg:shadow-2xl h-full">
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto lg:w-3/5 ">
            <Text variant="h4" className="text-primary mb-9">
              Sign Up
            </Text>
            <Input
              name="username"
              variant="default"
              type="text"
              placeholder="Username"
              label="User Name"
              icon={User2}
              required
            />
            <Input
              name="email"
              variant="default"
              type="email"
              placeholder="Email"
              label="Email"
              icon={Mail}
              required
            />
            <Input
              name="phoneNumber"
              variant="default"
              type="number"
              placeholder="Phone Number"
              label="Phone Number"
              icon={Phone}
              required
            />
            <InputPassword name="password" label="Password" placeholder="Password" required />
            <InputPassword
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              required
            />

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

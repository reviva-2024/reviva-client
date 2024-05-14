import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, User2 } from 'lucide-react';
import { CustomDialog, Button, Text } from '../../../../components';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Input } from '../../../../components/input/input';
import { useAuth } from '../../context/AuthContext';
import { loginApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';

const Signin = ({ register, setRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // signin
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe.checked;

    const data = { email, password, rememberMe };

    console.log('login data: ' + data);

    const res = await loginApi(data);
    logs('handleSubmit: loginApi res', [res], Style.function);

    if (res.status === 200) {
      setLoading(false);
      login(res.data);
      if (!rememberMe) {
        sessionStorage.setItem('token', res.data.token);
      } else {
        localStorage.setItem('token', res.data.token);
      }
      toast.success(res.data.message);
    } else {
      setLoading(false);
      return toast.error(res.data.message);
    }
  };

  const handleSendOTP = async () => {
    setIsOTPOpen(false);

    const email = document.getElementById('otpEmail').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      sessionStorage.setItem('email', email);
      setIsMainModalOpen(false);

      try {
        const response = await axios.put('http://localhost:5000/api/v0/user/sendForgotEmail', {
          email: email,
        });

        console.log(response.data);
        if (response.data.success) {
          // sessionStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      console.error('Invalid email');
    }
  };

  const verifyOtp = async () => {
    const otp = document.getElementById('otp').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password == confirmPassword) {
      try {
        const email = sessionStorage.getItem('email');

        const response = await axios.put(
          'http://localhost:5000/api/v0/user/verifyOtpAndForgotPassword',
          {
            email: email,
            otp: otp,
            password: password,
          }
        );

        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        sessionStorage.removeItem('email');
      }
    } else {
      toast.error('Password did not matched');
    }
  };

  return (
    <section>
      <Toaster richColors toastOptions={{ className: 'z-50' }} />
      <div className="flex flex-col items-center justify-center w-screen lg:flex-row lg:h-screen">
        <div className="content-center w-full lg:w-1/2">
          <img src="https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png" className="mx-auto my-10" alt="" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-12 lg:mb-0 rounded-s-[45px] lg:shadow-2xl h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center w-3/5 h-full mx-auto"
          >
            <Text variant="h4" className="text-primary mb-9">
              Sign In
            </Text>
            {/* email Start */}
            <div className="relative flex flex-col mb-4">
              <Input type="email" placeholder="Email" icon={User2} name="email" />
            </div>
            {/* email end */}
            {/* Password Start */}
            <div className="flex items-center mb-4 ">
              <div className="relative flex flex-col w-full">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  icon={LockKeyhole}
                />
              </div>

              <div className="absolute right-16 md:right-28 ">
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  checked={rememberMe}
                  onChange={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <label htmlFor="rememberMe" className=" font-lato text-primary">
                  Remember me
                </label>
              </div>

              {/* Main Dialog */}
              <CustomDialog
                triggerText="Forgot Password"
                triggerTextVariant={'link'}
                triggerTextStyle={'text-red-500'}
                isOpen={isMainModalOpen}
              >
                <LockKeyhole className="mx-auto my-5 text-primary" size={55} />
                <Text variant="subtitleBold" className="mx-auto mb-2 text-primary">
                  Change Password
                </Text>

                <Input id="otpEmail" type="email" placeholder="Enter Email" />

                <CustomDialog
                  triggerText="Get OTP via Email"
                  handleOnSubmit={handleSendOTP}
                  dialogCloseText="Verify"
                  isOpen={isOTPOpen}
                  dialogCloseAction={verifyOtp}
                >
                  {/* Content of OTP modal */}
                  <Text variant="subtitleBold" className="mx-auto mb-2 text-primary">
                    Change Password
                  </Text>
                  <Input id="otp" type="text" placeholder="Enter OTP" />
                  <Input id="newPassword" type="password" placeholder="New Password" />
                  <Input id="confirmPassword" type="password" placeholder="Confirm Password" />
                </CustomDialog>
              </CustomDialog>
              {/* OTP Dialog */}
            </div>

            <Button
              variant="default"
              className="p-2 mt-16 lg:mt-48"
              type="submit"
              loading={loading}
            >
              Sign In
            </Button>
            <div className="mx-auto mt-2 text-primary">
              Don&apos;t have an account?{' '}
              <Link
                className="text-red-500"
                onClick={() => {
                  setRegister(!register);
                }}
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;

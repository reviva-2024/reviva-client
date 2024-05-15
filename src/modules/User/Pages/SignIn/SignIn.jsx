import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, User2 } from 'lucide-react';
import { CustomDialog, Button, Text } from '../../../../components';
import axios from 'axios';
import { Input } from '../../../../components/input/input';
import { useAuth } from '../../context/AuthContext';
import { loginApi, sendForgetEmailApi, verifyOtpAndForgotPasswordApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';
import { InputPassword } from '../../../../components/input/inputPassword';
import { toast } from 'sonner';

const Signin = ({ register, setRegister }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

      const res = await sendForgetEmailApi({ email });
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } else {
      console.error('Invalid email');
    }
  };

  const verifyOtp = async () => {
    if (newPassword === confirmPassword) {
      const email = sessionStorage.getItem('email');
      const res = await verifyOtpAndForgotPasswordApi({
        email,
        otp,
        password: newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        sessionStorage.removeItem('email');
      } else {
        toast.error(res.data.message);
        sessionStorage.removeItem('email');
      }
    } else {
      toast.error('Password did not matched');
    }
  };

  return (
    <section>
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
            <Input
              name="email"
              type="email"
              placeholder="Email"
              icon={User2}
              label="Email"
              required
            />
            <InputPassword name="password" label="Password" placeholder="Password" required />

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
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(event) => {
                      setOtp(event.target.value);
                    }}
                  />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
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

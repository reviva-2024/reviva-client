import { ArrowLeft, LucideEdit2, Pen, LockKeyhole } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/input/input';
import { CustomDialog, Text } from '../../../../components';
import { changePasswordApi, profilePictureApi, sendForgetEmailApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { InputPassword } from '../../../../components/input/inputPassword';

const CurrentProfile = () => {
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatedPic, setUpdatedPic] = useState(null);

  const { user, setUser } = useAuth();
  const token = user.token;
  const email = user.data.email;
  const profilePicture = user.data.profilePicture;
  console.log('profilePicture from auth context', profilePicture);
  const username = user.data.username;
  const phone = user.data.phone;

  console.log('UseAuth:', useAuth());

  const fileInputRef = useRef(null);
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setUpdatedPic(URL.createObjectURL(file));
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    const res = await profilePictureApi(formData, token);
    logs('handleSubmit: profilePictureApi res', [res], Style.function);

    if (res.status === 200) {
      setUser(res.data);
      toast.success(res.data.message);
    } else {
      setLoading(false);
      return toast.error(res.data.message);
    }
  };

  const handleSendOTP = async () => {
    setIsOTPOpen(false);

    setIsMainModalOpen(false);
    const data = { email };
    const res = await sendForgetEmailApi(data, token);
    logs('handleSubmit: sendForgetEmailApi res', [res], Style.function);
    if (res.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const changePassword = async () => {
    if (newPassword === confirmPassword) {
      const data = { otp, oldPassword, newPassword };

      const res = await changePasswordApi(data, token);
      logs('handleSubmit: changePasswordApi res', [res], Style.function);
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } else {
      toast.error('Password does not match');
    }
  };
  //   console.log(user.data);

  return (
    <section className="w-full max-h-screen overflow-y-auto font-lato h-full mx-auto flex flex-col justify-center mb-10 items-center ms-20">
      <div className="left-3 top-6 absolute">
        <Link to={'/'}>
          <ArrowLeft className="text-primary border rounded-md" size="32" />
        </Link>
      </div>
      {/* profile picture upload start */}
      <form>
        <div className="mt-28 mb-5 relative">
          <img
            src={!updatedPic ? profilePicture : updatedPic || 'https://placehold.co/278x278'}
            alt="Profile Picture"
            className="md:w-[278px] md:h-[278px] w-[200px] h-[200px] rounded-md object-fit"
          />
          <LucideEdit2
            className="absolute right-0 bottom-2 border-accent border p-1 rounded-md bg-accent text-white cursor-pointer"
            size={36}
            onClick={handleEditClick}
          />
          <Input
            type="file"
            name="profilePicture"
            ref={fileInputRef}
            className="hidden pb-0"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
      </form>
      {/* profile picture upload end */}
      <div className="w-3/4 md:w-1/2 lg:w-1/3 mb-12 lg:mb-0  h-full">
        <form
          // onSubmit={handleSubmit}
          className="mx-auto w-full flex flex-col"
        >
          <Text className={'text-neutral-400'} variant="paragraphRegular">
            username
          </Text>
          <div className="flex justify-between">
            <Text className="mb-9"> {username}</Text>
            <Text className="mb-9 flex items-center text-neutral-400">
              <Link to={'/auth/update'}>Edit</Link>
              <Pen size={12} className="ms-2" />
            </Text>
          </div>
          <Text className={'text-neutral-400'} variant="paragraphRegular">
            email
          </Text>
          <Text className="mb-9">{email}</Text>
          <Text className={'text-neutral-400'} variant="paragraphRegular">
            phone
          </Text>
          <Text className="mb-9">{phone}</Text>
          {/* Main Dialog */}
          <CustomDialog
            triggerText="Change Password"
            triggerTextVariant={'outline'}
            triggerTextStyle={'text-primary'}
            handleOnSubmit={handleSendOTP}
            isOpen={isMainModalOpen}
          >
            <Text variant="subtitleBold" className="mx-auto mb-2 text-primary">
              Confirm OTP
            </Text>

            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              onChange={(event) => {
                setOtp(event.target.value);
              }}
            />

            <CustomDialog
              triggerText="Verify"
              dialogCloseText="Change Password"
              isOpen={isOTPOpen}
              dialogCloseAction={changePassword}
            >
              {/* Content of OTP modal */}
              <LockKeyhole className="mx-auto my-5 text-primary" size={55} />
              <Text variant="subtitleBold" className="mx-auto mb-2 text-primary">
                Change Password
              </Text>

              <InputPassword
                id="oldPassword"
                type="password"
                placeholder="Old Password"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
              <InputPassword
                id="newPassword"
                type="password"
                placeholder="New Password"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <InputPassword
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
        </form>
      </div>
    </section>
  );
};

export default CurrentProfile;


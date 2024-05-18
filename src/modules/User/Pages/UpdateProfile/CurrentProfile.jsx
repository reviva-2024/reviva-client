import { ArrowLeft, LockKeyhole, LucideEdit2, Mail, Pen, Phone, User2 } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/input/input';
import { Button, Text } from '../../../../components';
import { InputPassword } from '../../../../components/input/inputPassword';

const CurrentProfile = ({ user }) => {
  const userInfo = user.data;

  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  //   console.log(user.data);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sessionStorage.setItem('profilePicture', reader.result);
        window.location.reload();
      };
    }
  };

  return (
    <section className="w-full font-lato h-full mx-auto flex flex-col justify-center mb-10 items-center ">
      <div className="left-3 top-6 absolute">
        <Link to={'/'}>
          <ArrowLeft className="text-primary border rounded-md" size="32" />
        </Link>
      </div>
      {/* profile picture upload start */}
      <div className="mt-28 mb-5 relative">
        <img
          src={sessionStorage.getItem('profilePicture') || 'https://placehold.co/278x278'}
          alt="Profile Picture"
          className="w-[278px] h-[278px] rounded-md object-cover"
          onClick={handleEditClick} // Handle click on the image as well
        />
        <LucideEdit2
          className="absolute right-0 bottom-4 border-accent border p-1 rounded-md bg-accent text-white cursor-pointer"
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
      {/* profile picture upload end */}
      <div className="w-2/4 mb-12 lg:mb-0  h-full">
        <form
          // onSubmit={handleSubmit}
          className="mx-auto w-full flex flex-col"
        >
          <Text className={'text-neutral-400'}>username</Text>
          <div className="flex justify-between">
            <Text variant="subtitleBold" className="mb-9">
              {userInfo.username}
            </Text>
            <Text className="mb-9 flex items-center text-neutral-400">
              Edit
              <Pen size={12} className="ms-2" />
            </Text>
          </div>
          <Text className={'text-neutral-400'}>email</Text>
          <Text variant="subtitleBold" className="mb-9">
            {userInfo.email}
          </Text>

          <Text className={'text-neutral-400'}>phone</Text>
          <Text variant="subtitleBold" className="mb-9">
            {userInfo.phone}
          </Text>
          <div className="flex justify-between">
            <InputPassword label={'Password'} outerClassName={'text-neutral-400'} />
            <Text className="mb-9 flex items-center text-neutral-400">
              Edit
              <Pen size={12} className="ms-2" />
            </Text>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CurrentProfile;


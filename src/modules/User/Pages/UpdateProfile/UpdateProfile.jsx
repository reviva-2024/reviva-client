import { ArrowLeft, LucideEdit2, Mail, Phone, User2 } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components';

const UpdateProfile = () => {
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

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
      <div className="mt-28 mb-5 relative ">
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
          className="mx-auto w-full "
        >
          <Input name="userName" type="text" icon={User2} placeholder="Username" label="Username" />
          <Input name="Name" type="text" icon={User2} placeholder="Name" label="Name" />
          <Input name="email" type="email" placeholder="Email" icon={Mail} label="Email" />
          <Input
            name="phoneNumber"
            type="text"
            icon={Phone}
            placeholder="Phone Number"
            label="Phone Number"
          />

          <Button variant="default" className="w-full my-12" type="submit">
            Update Profile
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;


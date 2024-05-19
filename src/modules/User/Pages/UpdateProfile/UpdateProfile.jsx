import { ArrowLeft, LucideEdit2, Mail, Phone, User2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const UpdateProfile = () => {
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // const userInfo = user.data;
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // console.log(user.token);

    const formData = new FormData();
    formData.append('profilePicture', file);

    // console.log('File details:');
    // console.log('Name:', file.name);
    // console.log('Type:', file.type);
    // console.log('Size (bytes):', file.size);

    // console.log('file:', file);
    // console.log('formdata:', formData);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.put(
      'http://localhost:5000/api/v0/user/updateProfilePicture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response.data);

    // try {
    //   // Assuming the response contains the URL of the uploaded profile picture
    //   const profilePictureUrl = response.data.profilePictureUrl;

    //   // Update the profile picture in sessionStorage and refresh the component
    //   sessionStorage.setItem('profilePicture', profilePictureUrl);
    //   window.location.reload();
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // }
  };

  const handleTextForm = async (event) => {
    event.preventDefault();

    const data = { userName, phoneNumber };

    console.log('data:', data);

    try {
      const response = await axios.put('http://localhost:5000/api/v0/user/updateUserInfo', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      // console.log(response.data);
      toast.success('User information has been updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user information');
    }
  };

  return (
    <section className="w-full font-lato h-full mx-auto flex flex-col justify-center mb-10 items-center">
      <div className="left-3 top-6 absolute">
        <Link to={'/'}>
          <ArrowLeft className="text-primary border rounded-md" size="32" />
        </Link>
      </div>
      {/* profile picture upload start */}
      <form>
        <div className="mt-28 mb-5 relative">
          <img
            src={sessionStorage.getItem('profilePicture') || 'https://placehold.co/278x278'}
            alt="Profile Picture"
            className="w-[278px] h-[278px] rounded-md object-cover"
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
      <div className="w-2/4 mb-12 lg:mb-0 h-full">
        <form className="mx-auto w-full" onSubmit={handleTextForm}>
          <Input
            name="email"
            type="email"
            placeholder={'Email'}
            icon={Mail}
            label="Email"
            onChange={(event) => setUserName(event.target.value)}
            disabled
          />

          <Input name="userName" type="text" icon={User2} placeholder="Username" label="Username" />

          <Input
            name="phoneNumber"
            type="text"
            icon={Phone}
            placeholder="Phone Number"
            label="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
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


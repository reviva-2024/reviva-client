import { ArrowLeft, LucideEdit2 } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

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
        localStorage.setItem('profilePicture', reader.result);
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
          src={localStorage.getItem('profilePicture') || 'https://placehold.co/278x278'}
          alt="Profile Picture"
          className="w-[278px] h-[278px] rounded-md object-cover"
          onClick={handleEditClick} // Handle click on the image as well
        />
        <LucideEdit2
          className="absolute right-0 bottom-0 border-accent border p-1 rounded-md bg-accent text-white cursor-pointer"
          size={36}
          onClick={handleEditClick}
        />
        <input
          type="file"
          id="fileInput"
          name="profilePicture"
          ref={fileInputRef}
          className="hidden"
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
          {/* Username Start */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              id="username"
              className="p-2 ps-3 border border-neutral-300 font-lato rounded-lg focus:border-primary"
              type="text"
              placeholder="Username"
            />
            <div className="absolute  p-3 mt-7 right-0 flex items-center pointer-events-none">
              <img src="https://i.ibb.co/wp8FD4J/USER.png" alt="User icon" className="w-4" />
            </div>
          </div>
          {/* Username end */}
          {/* Username Start */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              id="name"
              className="p-2 ps-3 border border-neutral-300 font-lato rounded-lg focus:border-primary"
              type="text"
              placeholder="Name"
            />
            <div className="absolute  p-3 mt-7 right-0 flex items-center pointer-events-none">
              <img src="https://i.ibb.co/wp8FD4J/USER.png" alt="User icon" className="w-4" />
            </div>
          </div>
          {/* Username end */}
          {/* Email Start */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="p-2 ps-3 border border-neutral-300 font-lato rounded-lg focus:border-primary"
              type={'email'}
              placeholder="Email"
            />
            <div className="absolute  mt-6 p-3 right-0 flex items-center pointer-events-none">
              <img src="https://i.ibb.co/S5qKzF3/E-MAIL.png" alt="User icon" className="w-4" />
            </div>
          </div>
          {/* Email end */}
          {/* Phone Number Start */}
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              className="p-2 ps-3 border border-neutral-300 font-lato rounded-lg focus:border-primary"
              type="text"
              placeholder="Phone Number"
            />
            <div className="absolute mt-6 p-3 right-0 flex items-center pointer-events-none">
              <img src="https://i.ibb.co/n3jVbf1/PHONE.png" alt="User icon" className="w-4" />
            </div>
          </div>
          {/* Phone Number end */}
          <button
            type="submit"
            className="bg-primary w-full text-white p-2 my-10 rounded-lg font-lato "
          >
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;


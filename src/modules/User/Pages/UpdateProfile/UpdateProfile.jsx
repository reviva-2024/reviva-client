import { LucideEdit2, Mail, Phone, User2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { profilePictureApi, updateProfileApi } from '../../api/userService';
import { Style, logs } from '../../../../utils/logs';

const UpdateProfile = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(userName, phoneNumber);
  const { user, setUser } = useAuth();
  const token = user.token;
  const email = user.data.email;

  const handleTextForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = { username: userName, phone: phoneNumber };
    console.log('data from inside', data);

    const res = await updateProfileApi(data, token);
    logs('handleSubmit: updateProfileApi res', [res], Style.function);

    if (res.status === 200) {
      setLoading(false);
      setUser(res.data);
      toast.success(res.data.message);
    } else {
      setLoading(false);
      return toast.error(res.data.message);
    }
  };

  return (
    <section className="w-full font-lato h-full mx-auto flex flex-col justify-center mt-20 items-center max-h-screen overflow-y-auto ms-16">
      <div className="w-3/4 md:w-1/2 mb-12 lg:mb-0 h-full">
        <form className="mx-auto w-full" onSubmit={handleTextForm}>
          <Input
            name="email"
            type="email"
            placeholder={email || 'Email'}
            icon={Mail}
            label="Email"
            disabled
          />

          <Input
            name="userName"
            type="text"
            icon={User2}
            placeholder="Username"
            label="Username"
            onChange={(event) => setUserName(event.target.value)}
          />

          <Input
            name="phoneNumber"
            type="text"
            icon={Phone}
            placeholder="Phone Number"
            label="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />

          <Button variant="default" className="w-full my-12" type="submit" loading={loading}>
            Update Profile
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;


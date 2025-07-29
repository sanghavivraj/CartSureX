import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const EditProfileModal = ({ onClose, userDetails, fetchUserDetails }) => {
  const [data, setData] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    profilePic: userDetails?.profilePic || '',
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        profilePic: uploadImageCloudinary.url,
      }));
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfilePic = () => {
    setData((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.profilePic) {
      toast.error('Please upload a profile picture.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchUserDetails();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl max-h-[70vh] overflow-y-auto relative'>
        {/* Close Button */}
        <div className='absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
          <CgClose />
        </div>

        <h2 className='text-3xl font-bold mb-6'>Edit Profile</h2>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            placeholder='Enter your name'
            name='name'
            value={data.name}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={data.email}
            name='email'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='profilePic'>Profile Picture:</label>
          <label htmlFor='uploadProfilePicInput'>
            <div className='p-2 bg-slate-100 border rounded h-20 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Profile Picture</p>
                <input
                  type='file'
                  id='uploadProfilePicInput'
                  className='hidden'
                  onChange={handleUploadProfilePic}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.profilePic ? (
              <div className='relative group'>
                <img
                  src={data.profilePic}
                  alt="Profile"
                  width={80}
                  height={80}
                  className='bg-slate-100 border cursor-pointer'
                  onClick={() => {
                    setOpenFullScreenImage(true);
                    setFullScreenImage(data.profilePic);
                  }}
                />
                <div
                  className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                  onClick={handleDeleteProfilePic}
                >
                  <MdDelete />
                </div>
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload a profile picture</p>
            )}
          </div>

          <button
            type='submit'
            className='px-3 py-2 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 mt-4'
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default EditProfileModal;

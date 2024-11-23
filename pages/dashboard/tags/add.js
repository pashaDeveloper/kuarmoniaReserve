import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useAddTagMutation, useUpdateTagMutation } from "@/services/tag/tagApi";
import React, { useEffect,useState ,useMemo} from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { LiaRobotSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import {Plus , Minus} from "@/utils/SaveIcon"
const AddTag = ({ isOpen, onClose, onSuccess, tagToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const user = useSelector((state) => state?.auth);
  const [keynotes, setKeynotes] = useState([""]);

  const [addTag, { isLoading: isAdding, data: addData, error: addError }] =
    useAddTagMutation();
  const [
    updateTag,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateTagMutation();

  const defaultValues = useMemo(() => {
    return {
      id: user?._id,
    };
  }, [user]);


  useEffect(() => {
    if (tagToEdit) {
      setValue("title", tagToEdit.title);
      setValue("description", tagToEdit.description);
      setValue("robots", tagToEdit.robots);
      setKeynotes(tagToEdit.keywords)
      const initialSelectedOptions = tagToEdit.robots.map(robot => {
        const foundOption = robotOptions.find(option => option.value === robot.value);
        return foundOption ? { id: foundOption.id, value: foundOption.value, label: foundOption.label } : null;
      }).filter(Boolean); 
  
      setSelectedOptions(initialSelectedOptions);
      
    } else {
      reset();
      setSelectedOptions([]);
    }
  }, [tagToEdit, setValue, reset]);

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "tag" });
    }
    console.log("formData")

    if (data) {
      toast.success(data?.message, { id: "tag" });
      reset();
      if (onSuccess) {
        onSuccess();
      }
      if (onClose) {
        onClose();
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "Tag" });
    }
  }, [
    addData,
    updateData,
    addError,
    updateError,
    isAdding,
    isUpdating,
    reset,
    onClose,
    onSuccess,
  ]);

  const handleAddOrUpdateTag = (formData) => {
    try {
    
        formData = {
          ...formData,
          robots: selectedOptions.map(option => ({ id: option.id, value: option.value })),
          keynotes: JSON.stringify(keynotes),
          authorId:user?._id
        };
        console.lo
      
      if (tagToEdit) {
        updateTag({ id: tagToEdit._id, ...formData }).unwrap();
      } else {
        addTag(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش تگ: ", err);
    }
  };  
  
  const robotOptions = [
    { id: 1, value: 'index', label: 'Index', tooltip: 'اجازه می‌دهد موتورهای جستجو صفحه را ایندکس کنند' },
    { id: 2, value: 'noindex', label: 'Noindex', tooltip: 'از ایندکس کردن صفحه توسط موتورهای جستجو جلوگیری می‌کند' },
    { id: 3, value: 'follow', label: 'Follow', tooltip: 'اجازه می‌دهد موتورهای جستجو لینک‌های موجود در صفحه را دنبال کنند' },
    { id: 4, value: 'nofollow', label: 'Nofollow', tooltip: 'از دنبال کردن لینک‌های موجود در صفحه توسط موتورهای جستجو جلوگیری می‌کند' }
  ];

  const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };
  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };
 
  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };
  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    className="lg:w-1/3 md:w-1/2 w-full z-50"
  >
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
      onSubmit={handleSubmit(handleAddOrUpdateTag)}
    >
      <div className="flex gap-4 flex-col">
        <label htmlFor="title" className="flex flex-col gap-y-2">
          عنوان*
          <input
            type="text"
            name="title"
            id="title"
            maxLength={70}
            placeholder="عنوان تگ را تایپ کنید..."
            className="rounded"
            autoFocus
            {...register("title", { required: true })}
          />
        </label>

        <label htmlFor="description" className="flex flex-col gap-y-2">
          توضیحات*
          <textarea
            name="description"
            id="description"
            maxLength={160}
            placeholder="توضیحات تگ را تایپ کنید..."
            className="rounded h-32"
            {...register("description")}
          />
        </label>

 {/* keynotes */}
 <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          <label htmlFor="keynotes" className="w-full flex flex-col gap-y-4">
            <p className="text-sm flex flex-row justify-between items-center">
              کلمات کلیدی*
              <button
                type="button"
                className="p-0.5 border rounded-secondary bg-green-500 text-white"
                onClick={handleAddKeynote}
              >
                <Plus />
              </button>
            </p>

            {keynotes.map((keynote, index) => (
              <p key={index} className="flex flex-row gap-x-2 items-center">
                <input
                  type="text"
                  name="keynotes"
                  placeholder="Enter brand keynote"
                  className="flex-1"
                  value={keynote}
                  onChange={(event) =>
                    handleKeynoteChange(index, event.target.value)
                  }
                  required
                />
                {index !== 0 && (
                  <button
                    type="button"
                    className="p-0.5 border rounded-secondary bg-red-500 text-white"
                    onClick={() => handleRemoveKeynote(index)}
                  >
                    <Minus />
                  </button>
                )}
              </p>
            ))}
          </label>
        </div>

        {/* robots */}
        ربات‌ها*
        <MultiSelectDropdown
              options={robotOptions}
              selectedOptions={selectedOptions}
              handleChange={handleOptionsChange}
              className="w-full"
              name="tags"
              icon={<LiaRobotSolid size={24} />
              }
            />
  
          
        <Button type="submit" className="py-2 mt-4 mb-4">
          {tagToEdit ? "ویرایش کردن" : "ایجاد کردن"}
        </Button>
      </div>
    </form>
    </Modal>

  );
};


export default AddTag;

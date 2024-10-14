// Step4.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";

const Step4 = ({register,errors}) => {

  return (
    <>
      <div className=" flex-col items-center justify-between gap-12 gap-y-12 w-full">
      <label htmlFor="visibility" className="flex flex-col gap-y-2 w-full">دسترسی *
  <SearchableDropdown
    categoryOptions={[
      { id: 1, value: 'عمومی', description: 'عمومی' },
      { id: 2, value: 'خصوصی', description: 'خصوصی' }
    ]}

    register={register('visibility', { required: 'دسترسی الزامی است' })}
    errors={errors}
   
  />
   {errors.visibility && (
      <span className="text-red-500 text-sm">{errors.visibility.message}</span>
    )}
  </label>
     
  <label className="inline-flex items-center  cursor-pointer">
  ویژه بودن
                        <input
                          type="checkbox"
                          className="sr-only peer"
                           id="isFeatured"type="checkbox"
                         
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                            </div>


    </>
  );
};

export default Step4;

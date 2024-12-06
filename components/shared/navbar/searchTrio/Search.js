

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Tooltip from "../../tooltip/Tooltip";
import Modal from "../../modal/Modal";
import SearchFilter from "./SearchFilter";
import HighlightText from "../../highlightText/HighlightText";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip text="جستجو" txtColor="text-white">
        <button
          className="p-1.5 border border-primary/20 hover:border-primary rounded"
          onClick={openModal}
        >
          <BiSearch className="text-lg" />
        </button>
      </Tooltip>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <div className="flex flex-col gap-y-4 h-full">
          <p className="text-2xl drop-shadow">
            جستجوی <HighlightText>مطلب مورد نظر</HighlightText>
          </p>
          <SearchFilter setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </>
  );
};

export default Search;

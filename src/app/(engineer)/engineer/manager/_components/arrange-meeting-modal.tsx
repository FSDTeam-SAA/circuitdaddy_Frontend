import React from "react";
import { Project } from "../../project-management/_components/projects-table";
import { X } from "lucide-react";

interface PropsTypes {
  onClose: (value: boolean) => void;
  project: Project;
}

const ArrangeMeetingModal = ({ onClose, project }: PropsTypes) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => onClose(false)}
        className="absolute inset-0 bg-black/15 bg-opacity-50 backdrop-blur-sm"
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto p-8 scrollbar-hide">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-medium text-gray-800">Meeting Link</h4>
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrangeMeetingModal;

import React from 'react';
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const BlogCard = ({ watch, galleryPreview, post,  publishDate,
}) => {
  return (
    <div className="group flex flex-col gap-y-4 border rounded h-fit break-inside-avoid bg-white transition-color ease-linear delay-100 hover:border-primary relative shadow-lg overflow-hidden">
      <div className="relative w-full">
        
        <div
          className="bg-cover bg-center text-center overflow-hidden rounded-t"
          style={{
            minHeight: "300px",
            backgroundImage:
              galleryPreview.length > 0
                ? `url(${galleryPreview[0]})`
                : "url('https://via.placeholder.com/1150x500')",
          }}
          title="title"
        ></div>
      </div>

      <article className="flex flex-col gap-y-2.5 px-4 pb-4">
        <h2 className="text-lg line-clamp-1">
          {watch("title") ? (
            `${watch("title")}`
          ) : (
            <SkeletonText lines={1} />
          )}
        </h2>
        <div className="mt-auto flex flex-col gap-y-2.5">
          <p className="text-sm line-clamp-2">
            {watch("description") ? (
              `${watch("description")}`
            ) : (
              <SkeletonText lines={2} />
            )}
          </p>
          <p className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary px-2 py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
            
            <span className="text-red-500/50 group-hover:text-red-500">
              Not Available
            </span>
            <span className="absolute -right-1 bg-secondary rounded-secondary p-0.5 flex justify-center items-center transition-opacity ease-linear opacity-0 group-hover:opacity-100 border border-primary cursor-pointer sr-only">
              {/* Add your arrow icon here */}
            </span>
          </p>
        </div>
      </article>

  
        <span className="absolute px-2 py-0.5 text-xs top-2 left-2 border border-primary rounded-primary bg-secondary">
          adawdawd
        </span>
     
    </div>
  );
};

export default BlogCard;

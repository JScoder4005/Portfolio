import { projects } from '@/data';
import React from 'react';
import { PinContainer } from './ui/3d-pin';
import { FaLocationArrow } from 'react-icons/fa6';

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{' '}
        <span className="text-purple">recent projects</span>
      </h1>

      {/* Changed to horizontal scroll container */}
      <div className="relative mt-10  w-full">
        <div className="flex justify-start overflow-x-auto gap-8 pb-8 ">
          {projects.map(({ id, title, des, img, iconLists, link }) => (
            <div key={id} className="w-full max-w-sm snap-center">
              <PinContainer title={title} href={link}>
                <div className="flex flex-col h-full w-full space-y-4">
                  <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-[#13162d]">
                    <img
                      src="/bg.png"
                      alt="bg-img"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <img
                      src={img}
                      alt={title}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[90%] w-auto"
                    />
                  </div>

                  <div className="space-y-2 p-2">
                    <h1 className="font-bold text-lg md:text-xl truncate">
                      {title}
                    </h1>
                    <p className="text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
                      {des}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto p-2">
                    <div className="flex items-center">
                      {iconLists.map((icon, index) => (
                        <div
                          key={icon}
                          className="border border-white/[0.2] rounded-full bg-black w-8 h-8 md:w-10 md:h-10 flex justify-center items-center -ml-2 first:ml-0"
                        >
                          <img src={icon} alt={icon} className="p-2" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center group">
                      <p className="text-sm md:text-base text-purple">
                        Check Live Site
                      </p>
                      <FaLocationArrow className="ml-2 text-purple" />
                    </div>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>

        {/* Optional scroll indicators */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-l from-black/50 to-transparent" />
      </div>
    </div>
  );
};

export default RecentProjects;

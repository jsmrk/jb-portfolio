import { MyProjectsList, Technologies } from "./projectsData";
import { FaGithub } from "react-icons/fa";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

function ProjectsList() {
  return (
    <div className="mt-11 md:w-full md:grid md:grid-cols-3 gap-11 mx-auto drop-shadow-2xl shadow-white">
      {MyProjectsList.map((project) => (
        <div className="bg-white rounded-xl overflow-hidden text-black md:flex-row justify-start items-start md:mt-0 mt-11 ">
          <div className="hover:transition-transform hover:scale-110 duration-200 md:h-[150px] h-[350px] ">
            <img
              src={project.image}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="px-7 mt-3 pb-5 mb-0">
            <div className="font-bold text-xl ">{project.name}</div>
            <div className="font-bold text-sm line-clamp-1">
              {project.system}
            </div>
            <div className="text-sm mt-3 line-clamp-3">
              {project.description}
            </div>

            <div className="flex mt-4 mb-5 gap-3 ">
              {project.technologies.map((tech) => (
                <div
                  className="py-1 px-3 rounded-full text-[10px] uppercase"
                  style={{
                    backgroundColor: Technologies.find((t) => t.name === tech)
                      ?.color,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
            <div className="flex gap-3 items-end justify-end">
              <button className="flex gap-2 justify-center items-end bg-black rounded-xl text-white py-2 px-5 text-xs text-center hover:bg-primary-100 transition-all duration-300 ">
                <FaGithub className="size-4" />
                Github
              </button>
              <button className="flex gap-2 justify-center items-end bg-black rounded-xl text-white py-2 px-5 text-xs text-center hover:bg-primary-100 transition-all duration-300">
                <BsArrowUpRightCircleFill className="size-4" />
                Demo
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsList;

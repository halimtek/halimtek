"use client";

// Simple Inline SVGs for zero-dependency reliability
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500/80"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue-400 transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue-400 transition-colors"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
);

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-card group p-8 hover:-translate-y-3 transition-all duration-500 flex flex-col h-full shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <FolderIcon />
        <div className="flex gap-5 text-slate-500 dark:text-gray-400">
          <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" aria-label="Github"><GithubIcon /></a>
          <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" aria-label="Live Site"><ExternalIcon /></a>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
        {project.title}
      </h3>
      
      <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
        {project.desc}
      </p>
      
      <div className="flex flex-wrap gap-4 mt-auto border-t border-white/5 pt-6">
        {project.tags?.map((tag) => (
          <span key={tag} className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
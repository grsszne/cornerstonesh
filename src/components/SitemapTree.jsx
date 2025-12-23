"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderSimple, FolderOpen, File, ArrowRight } from '@phosphor-icons/react';

const TreeNode = ({ node, isLast, prefix = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = (e) => {
    if (isFolder) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    }
  };

  return (
    <div className="select-none font-mono text-sm leading-6">
      <div 
        className="flex items-center hover:bg-white/10 cursor-pointer transition-colors pr-4 group w-full"
        onClick={toggleOpen}
      >
        {/* Render Prefix Lines from Ancestors */}
        <div className="flex select-none text-white/30 whitespace-pre font-mono">
            {prefix.map((hasLine, i) => (
                <span key={i}>{hasLine ? '│   ' : '    '}</span>
            ))}
            <span>{isLast ? '└── ' : '├── '}</span>
        </div>

        {/* Icon */}
        <div className="text-white/60 mr-2">
            {isFolder ? (
                isOpen ? <FolderOpen size={16} weight="fill" /> : <FolderSimple size={16} weight="fill" />
            ) : (
                <File size={16} />
            )}
        </div>

        {/* Name / Link */}
        {node.path ? (
            <Link href={node.path} className="flex items-center gap-2 hover:text-cornerstone transition-colors">
                 <span>{node.name}</span>
                 <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-cornerstone" />
            </Link>
        ) : (
            <span className="text-white/80 font-bold">{node.name}</span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {node.children.map((child, index) => (
              <TreeNode 
                key={`${child.name}-${index}`} 
                node={child} 
                isLast={index === node.children.length - 1}
                prefix={[...prefix, !isLast]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SitemapTree({ tree }) {
  if (!tree) return null;

  // The root itself shouldn't really have a prefix, usually tree commands start with the root directory name
  // and then children branch off.
  // We can treat the 'tree' prop as the root folder.
  
  return (
    <div className="w-full text-white">
        {/* Render Root Node Manually to start tree */}
        <div className="mb-2 font-bold text-cornerstone text-lg flex items-center gap-2">
            <span>.</span>
        </div>
        
        {tree.children && tree.children.map((child, i) => (
             <TreeNode 
                key={i} 
                node={child} 
                isLast={i === tree.children.length - 1}
                prefix={[]} // Start with no prefix for top-level children
             />
        ))}
    </div>
  );
}

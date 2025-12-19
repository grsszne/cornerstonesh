'use client';

import Masonry from 'react-masonry-css';
import ExpandableModuleCard from './ExpandableModuleCard';

export default function ModuleMasonryGrid({ modules }) {
    const breakpointColumns = {
        default: 3,
        1024: 2,
        640: 1
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
            >
                {modules.map((module) => (
                    <ExpandableModuleCard key={module.id} module={module} />
                ))}
            </Masonry>

            <style jsx global>{`
                .masonry-grid {
                    display: flex;
                    margin-left: -24px;
                    width: auto;
                }

                .masonry-grid-column {
                    padding-left: 24px;
                    background-clip: padding-box;
                }

                .masonry-grid-column > div {
                    margin-bottom: 24px;
                    transition: margin-bottom 0.3s ease-in-out;
                }

                /* Smooth masonry reflow */
                .masonry-grid-column > * {
                    will-change: transform;
                }
            `}</style>
        </>
    );
}

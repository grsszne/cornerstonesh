'use client';

import Masonry from 'react-masonry-css';
import ExpandableModuleCard from './ExpandableModuleCard';
import FadeIn from './FadeIn';

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
                {modules.map((module, idx) => (
                    <FadeIn
                        key={module.id}
                        delay={idx * 0.1}
                        y={10}
                        scale={1}
                        blur={4}
                        duration={0.5}
                    >
                        <ExpandableModuleCard module={module} />
                    </FadeIn>
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
                }
            `}</style>
        </>
    );
}

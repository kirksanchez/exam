import React, { useRef, useCallback } from 'react';
import Launch from './Launch';

const LaunchList = ({ launches, loading, fetchMoreLaunches, hasMore }) => {
  const observer = useRef();
  const lastLaunchElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreLaunches();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMoreLaunches]
  );

  return (
    <div>
      {launches.map((launch, index) => (
        <Launch key={launch.id} launch={launch} />
      ))}
      {loading && <div className='loader'>Loading...</div>}
      <div ref={lastLaunchElementRef} className='end-of-list'>
        {!hasMore && !loading && 'You have reached the end of the list.'}
      </div>
    </div>
  );
};

export default LaunchList;

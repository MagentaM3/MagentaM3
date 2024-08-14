import { animated, useTransition } from '@react-spring/web';
import { useEffect, useState } from 'react';

import { TrackListImages } from '@/types/image';
import { trpc } from '@/utils/trpc';
import SortIterator from './SortIterator';
import './styles.css';

export const SortAnimation = () => {
  const [rows, set] = useState<TrackListImages>([]);
	const imageQuery = trpc.spotify.generateRandomImages.useQuery();
	let sortIterator: SortIterator;

  useEffect(() => {
		if (!imageQuery.data) return;
		sortIterator = new SortIterator(imageQuery.data);
		const t = setInterval(() => {
			if (sortIterator) {
				if (sortIterator.hasNext()) {
					set(sortIterator.next());
				} else {
					imageQuery.refetch();
				}
			}
		}, 700);
    return () => clearInterval(t)
  }, [imageQuery.data]);

  let width = 0
  const transitions = useTransition(
    rows.map(data => ({ ...data, x: (width += data.width) - data.width })),
    {
      key: (item: any) => item.name,
      from: { width: 0, opacity: 0 },
      leave: { width: 0, opacity: 0 },
      enter: ({ x, width }) => ({ x, width, opacity: 1 }),
      update: ({ x, width }) => ({ x, width }),
    }
  )

  return (
    <div className='list' style={{ width }}>
      {transitions((style, item, _, index) => (
        <animated.div className='card' style={{ zIndex: (imageQuery.data?.length ?? 0) - index, ...style }}>
          <div className='cell'>
            <img className='details' src={item.url} />
						<div className='mx-auto mt-1 w-fit'>{item.value}</div>
          </div>
        </animated.div>
      ))}
    </div>
  )
};
import { TrackListImages } from '@/types/image';

class SortIterator {
	index: number;
	list: TrackListImages[];

  constructor(data: TrackListImages) {
    this.list = createSortSteps(data);
    this.index = 0;
  }
 
  hasNext() {
    return this.index < this.list.length;
  }
 
  next() {
    return this.list[this.index++];
  }
}

// Bubble Sort
const createSortSteps = (data: TrackListImages) => {
	const res = [[...data]];

	const sortedData = [...data];
	let sorted = false;
	while (!sorted) {
		sorted = true;
		for (let i = 0; i < sortedData.length - 1; i += 1) {
			if (sortedData[i].value > sortedData[i + 1].value) {
				let temp = sortedData[i];
				sortedData[i] = sortedData[i + 1];
				sortedData[i + 1] = temp;
				res.push([...sortedData]);
				sorted = false;
			}
		}
	}
	return res;
}

export default SortIterator;
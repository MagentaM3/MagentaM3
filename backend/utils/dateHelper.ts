import { ReleaseDatePrecisionZ } from "../src/types/album";

export const convertToDateTimestamp = (date: string, precision: ReleaseDatePrecisionZ) => {
	switch (precision) {
		case 'year':
			return date + '-01-01';
		case 'month':
			return date + '-01';
		case 'day':
			return date;
	}
	return date;
}
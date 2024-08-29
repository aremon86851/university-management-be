import {
  IAcademicSemesterCode,
  IAcademicSemesterTitles,
  IMonths,
} from './academicSemester.interface';

export const academicSemesterMonth: IMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterTitlesMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const filterableFields = ['searchTerm', 'title', 'code', 'year'];

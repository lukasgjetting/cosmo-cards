const padWithZero = (number: number): string => (number > 9 ?
	number.toString() :
	`0${number}`
);

const formatDate = (date: Date): string => (
	`${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`
);

export default formatDate;

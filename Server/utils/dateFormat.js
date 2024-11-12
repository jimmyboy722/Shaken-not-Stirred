const createDateSuffix = (date) => {
  let todaysDate = date.toString();

  // SETTING THE CORRESPONDING SUFFIX
  let endChar = date.charAt(date.length - 1);

  if (endChar === "1" && date !== "11") {
    // TO RULE OUT THE 11TH OF THE MONTH
    date = `${date}st`;
  } else if (endChar === "2" && date !== "12") {
    // TO RULE OUT THE 12TH OF THE MONTH
    date = `${date}nd`;
  } else if (endChar === "3" && date !== "13") {
    // TO RULE OUT THE 13TH OF THE MONTH
    date = `${date}rd`;
  } else {
    date = `${date}th`; // BECAUSE ALL OTHERS WILL END IN 'TH'
  }
  return todaysDate;
};

module.exports = (
  timestamp,
  { lengthOfMonth = "abbrev", dateSuffix = true } = {}
) => {
  // CREATING THE MONTHS OBJECT
  //NAME PROVIDED IN EITHER ABBREVIATED OR FULL FORM DEPENDING ON THE VALUE OF THE LENGTHOFMONTH PARAMETER
  // USING TERNARY OPERATOR
  const months = {
    0: lengthOfMonth === "abbrev" ? "Jan" : "January",
    1: lengthOfMonth === "abbrev" ? "Feb" : "February",
    2: lengthOfMonth === "abbrev" ? "Mar" : "March",
    3: lengthOfMonth === "abbrev" ? "Apr" : "April",
    4: lengthOfMonth === "abbrev" ? "May" : "May",
    5: lengthOfMonth === "abbrev" ? "Jun" : "June",
    6: lengthOfMonth === "abbrev" ? "Jul" : "July",
    7: lengthOfMonth === "abbrev" ? "Aug" : "August",
    8: lengthOfMonth === "abbrev" ? "Sep" : "September",
    9: lengthOfMonth === "abbrev" ? "Oct" : "October",
    10: lengthOfMonth === "abbrev" ? "Nov" : "November",
    11: lengthOfMonth === "abbrev" ? "Dec" : "December",
  };

  // FORMATTING THE TIMESTAMP
  const dateObject = new Date(timestamp);
  const Month = months[dateObject.getMonth()];

  const dayOfMonth = dateSuffix
    ? createDateSuffix(dateObject.getDate())
    : dateObject.getDate();

  const Year = dateObject.getFullYear();
  let hour =
    dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() - 12)
      : dateObject.getHours();
  if (hour === 0) {
    // ZERO HOUR IS MIDNIGHT/12AM
    hour = 12;
  }
  const minutes =
    (dateObject.getMinutes() < 10 ? `0` : "") + dateObject.getMinutes();
  const dayOrNight = dateObject.getHours() >= 12 ? "PM" : "AM"; // TO DETERMINE THE TIME BETWEEN DAY AND NIGHT
  const formattedTimestamp = `${Month} ${dayOfMonth}, ${Year} at ${hour}:${minutes} ${dayOrNight}`;
  return formattedTimestamp;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const formatTime = (timestamp: string) => {
  // 莫名其妙慢了8小时，补上东八区的时差
  const offset = 8 * 60 * 60 * 1000;
  const offsetTimestamp = parseInt(timestamp, 10) + offset;
  const date = new Date(offsetTimestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const day = date.getDate();
  const Day = day < 10 ? `0${day}` : `${day}`;

  const hour = date.getHours();
  const Hour = hour < 10 ? `0${hour}` : `${hour}`;

  const min = date.getMinutes();
  const Min = min < 10 ? `0${min}` : `${min}`;

  const sec = date.getSeconds();
  const Sec = sec < 10 ? `0${sec}` : `${sec}`;

  const offsetNowTimestamp = new Date().getTime() + offset;
  const now = new Date(offsetNowTimestamp);

  if (year < now.getFullYear()) {
    // 去年
    return `${year}年${month}月${day}日`;
  } else if (
    year === now.getFullYear() &&
    month <= now.getMonth() + 1 &&
    day < now.getDate()
  ) {
    // 昨天以及之前
    return `${month}月${day}日`;
  } else {
    // 今日00:00之后
    return `${Hour}:${Min}`;
  }
};

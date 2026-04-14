import { helper } from '@ember/component/helper';

export default helper(function formatTime([time]: [Date]) {
  return time?.toLocaleTimeString();
});

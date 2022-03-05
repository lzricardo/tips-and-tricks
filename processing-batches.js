const push = (batch) => {
  console.log('sending batch => ', batch);
}

const aggregate = (callback, batchMaxSize, ms) => {
  let batch = [],
    timer = null  
  ;

  const setupTimer = () => {
    timer = setTimeout(() => {
      callback(batch)
    }, ms);
  }

  const resetFunctionMemorie = (notification) => {
    clearTimeout(timer);
    callback(batch);
    batch = [notification];
    setupTimer();
  }
  
  return function (notification) {
    if (batch.length < batchMaxSize) {
      batch.push(notification);
    } else {
      resetFunctionMemorie(notification);
    }
  }  
}

// Test
const sendNotification = aggregate(push, 250, 100);

Array.from(
  { length: 1500 }, 
  (v, k) => {
    const randomSecond = Math.floor((Math.random() * (5 - 0 + 1)) + 0);
    const ms = randomSecond * 1000;
    setTimeout(sendNotification, ms, (k+1));
  }
);

sendNotification(1501);
sendNotification(1502);
sendNotification(1503);
sendNotification(1504);
sendNotification(1505);
sendNotification(1506);
sendNotification(1507);

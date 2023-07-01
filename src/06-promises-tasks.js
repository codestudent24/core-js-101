/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => (answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => (answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPos) {
  const prom = new Promise((resolve, reject) => {
    if (typeof isPos === 'boolean') resolve(isPos);
    reject(new Error('Wrong parameter is passed! Ask her again.'));
  });
  return prom.then((val) => {
    if (val) return 'Hooray!!! She said "Yes"!';
    return 'Oh no, she said "No".';
  }).catch((error) => {
    throw new Error(error.message);
  });
  // console.log(response);
  //  response;
}

/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  const res = Promise.all(array).then((values) => values);
  return res;
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(arr) {
  const res = Promise.race(arr).then((v) => v);
  return res;
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
function chainPromises(array, action) {
  return new Promise((resolve, reject) => {
    let result = array[0];

    for (let i = 1; i < array.length; i += 1) {
      result = result
        .then((value) => array[i]
          .then((nextValue) => action(value, nextValue)))
        .catch(() => {});
    }

    result.then(resolve).catch(reject);
  });
  // throw new Error('Not implemented');
  /*
  return new Promise((resolve, reject) => {
    let result = array[0];
    let count = 1;

    function processPromise(index) {
      array[index]
        .then((value) => {
          result = action(result, value);
          //console.log(result)
          count += 1;
          if (count === array.length) {
            resolve(result);
          } else {
            processPromise(count);
          }
        })
        .catch(() => {
          count += 1;
          if (count === array.length) {
            resolve(result);
          } else {
            processPromise(count);
          }
        });
    }

    processPromise(1);
  }); */

  // return arr.reduce((acc, curr) => {
  //   const res = act (acc, curr.then(data => act(data)));
  //   console.log(res);
  //   return res;
  // })

  // return arr[0].then(data => {
  //   const aData = act(data);
  //   return arr[1].then(data2 => {
  //       const bData = act(aData, data2);
  //       return arr[2].then(data3 => {
  //         return act(bData, data3);
  //       });
  //   })
  // });
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};

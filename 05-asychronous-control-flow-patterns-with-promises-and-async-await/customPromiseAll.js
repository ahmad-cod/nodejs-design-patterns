
export async function customPromiseAll (promises) {
    // Create an array that stores the resolved promises
    // create a counter to keep track of the promises resolved
    // return a promise that will be resolved only after all promises have been resolved, and it rejects immediately
    // after a promise is rejected

    const results = []
    let count = 0

    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            promise
                .then(result => {
                    results.push(result)
                    count++

                    if (count === promises.length) {
                        resolve(results)
                    }
                })
                .catch(reject)
        }
    })
}

const promise1 = Promise.resolve(1);
const promise2 = Promise.reject("Error in promise2");
// const promise2 = Promise.resolve(new Promise((resolve, reject) => reject(`Error in promise 2`)))
const promise3 = Promise.resolve(3);

const promises = [promise1, promise2, promise3];

(async () => {
  try {
    const results = await customPromiseAll(promises);
    console.log(results); // This won't be reached due to promise2's rejection.
  } catch (error) {
    console.error(error); // Outputs: Error in promise2
  }
})();
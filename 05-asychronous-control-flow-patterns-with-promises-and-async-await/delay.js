function delay(milliseconds) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date())
        }, milliseconds);
    })
}

async function playingWithDelays () {
    
    console.log('Delaying...', new Date())
    const dateAfterOneSecond = await delay(0)
    console.log(dateAfterOneSecond)
    
    const dateAfterThreeSeconds = await delay(3000)
    console.log('after 3 secs', dateAfterThreeSeconds)

    return 'done'
}

// const result = await playingWithDelays()
// console.log(result)

// playingWithDelays()
//  .then(result => {
//  console.log(`After 4 seconds: ${result}`)
//  })

function delayErrors(milliseconds) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Error delayed for ${milliseconds}ms`))
        }, milliseconds);
    })
}

async function playingWithErrors(throwSyncError) {
    try {
        if (throwSyncError) {
            throw new Error(`Error is synchronous`)
        }
        await delayErrors(1000)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
    finally {
        console.log('done')
    }
}

playingWithErrors(20 === 2)
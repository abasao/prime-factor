export function myModule () {
    return {
        factorArray: [2, 3, 5, 7, 9, 11, 13, 17],
        isPrime (value) {
        return this.factorArray.includes(value, 1) //(value, from index)
        },
        findPrimes (value) {
            if (this.factorArray.indexOf(value) !== -1) {
                return [value]
            } else {
                for (let f of this.factorArray) {
                    if (value % f === 0) {
                        return [f, ...this.findPrimes(value / f)]
                    }
                }
            }
            return [value]
        },
        factorize (value) {
            return [...this.findPrimes(value)];
        },
        RNG (min = 1, max = 10) {
            return min + Math.floor(Math.random() * max)
        }
    }
}
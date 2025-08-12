export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop()
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: val });
    }

    get<T>(key: string) {
        if (!this.#cache.has(key)) {
            return undefined;
        }

        return this.#cache.get(key)?.val;
    }

    #reap() {
        console.log("REAP")
        for (let [key, value] of this.#cache) {
            if (value.createdAt < Date.now() - this.#interval) {
                console.log("DELETE")
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID);
            this.#reapIntervalID = undefined;
        }
    }
}

'use client'

// custom imports 
import { themeType } from "./types"
import { CookieNotFound, UnSecureContext } from "./errors";

// third part 
import { useState } from "react";

// theme utils 
export const getPropValue = (prop: string) => globalThis.window?.getComputedStyle(document.documentElement).getPropertyValue(prop)

export function getTheme(): themeType {
    return {
        bg: {
            primary: getPropValue('--bg-primary'),
            secondary: getPropValue('--bg-secondary')
        },
        font: {
            primary: getPropValue('--font-color-primary'),
            secondary: getPropValue('--font-color-secondary')
        }, 
        playground: {
            primary: getPropValue('--playground-bg-primary'),
            secondary: getPropValue('--playground-bg-secondary')
        }, 
    }
}

// state management utils
export function useCustomState<T>(initialState: any): [T, (newState: any) => any] {
    const [state, setState] = useState(initialState);
    const setCustomSate = (newState: any) => {
        setState((prevState: any) => ({...prevState, ...newState}))
    };
    
    return [state, setCustomSate];
}

export function constructUrl(url: string, args: Object) {
    if (!args) return url

    url += "?";
    for (const [arg, value] of Object.entries(args)) {
        url += `${arg}=${value}&`
    }

    return url
}

// local storage utils
export function addToLocalStorage(key: string, value: string) {
    // console.log(`[addToLocalStorage] >> adding ${key}...`)
    try {

        localStorage.setItem(key, value);
    } catch (error) {
        clearLocalStorage();
        localStorage.setItem(key, value);
    }
}

export function clearLocalStorage() {
    console.log(`[clearLocalStorage] >> clearing...`)
    const permanent: string[] = [];
    const n = localStorage.length;

    for (let i = 0; i < n; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (permanent.includes(key)) continue;
        localStorage.removeItem(key);
    }
}

// img utils
export function img2Base64(img: Blob, callback: (url: string) => void) {
    var reader = new FileReader();
    reader.onloadend = function() {
      if (typeof reader.result === 'string') return callback(reader.result)
    }
    reader.readAsDataURL(img);
}

// array utils 
export function get(a: any, key: string): any { 
    if (!a) return 
    return key.split('.').reduce((curr, key) => curr && curr[key], a)
}

export function equals<T>(a: any, b: any, keys: string[], bKeys?: string[], check = (a: boolean, b: boolean) => a && b, defaultValue = true): boolean {
    return keys.reduce((curr, key, i) => check(curr, (get(a, key) === get(b, (bKeys && bKeys[i]) || key))), defaultValue)
}

export function arrEquals<T>(A: any[], B: any[], keys: string[], bKeys?: string[], check = (a: boolean, b: boolean) => a && b, defaultValue = true): boolean {
    if (A.length !== B.length) return false
    return A.reduce((curr, a, i) => check(curr, equals(a, B[i], keys, bKeys)), defaultValue)
}

export function find<T>(A: any[], a: any, keys: string[], aKeys?: string[]): T | undefined {
    return A.find(Ai => equals(Ai, a, keys, aKeys))
}

export function findAll<T>(A: any[], a: any, keys: string[], aKeys?: string[], check = (eq: boolean) => eq): T[] {
    return A.filter(Ai => check(equals(Ai, a, keys, aKeys)))
}

/**
 * Filters an array based on the comparison of specified object properties.
 * 
 * @param A - The array to filter.
 * @param a - The object to compare each element against.
 * @param keys - The keys of the properties to compare.
 * @param aKeys - Optional. The keys of the object `a` to compare against `keys`.
 * @param check - A function to determine which elements to include based on the comparison result, defaults to `!eq`.
 * @returns A new array containing elements for which the `check` function returns true.
 */
export function filter<T>(A: any[], a: any | any[], keys: string[], aKeys?: string[], check = (eq: boolean) => !eq): T[] {
    return A.filter(Ai => {
        if (a instanceof Array) {
            return check(find(a, Ai, keys, aKeys) !== undefined)
        } return check(equals(Ai, a, keys, aKeys))
    }) as T[]
}

export function any<T>(A: T[], B: T[], keys: string[], check = (eq: boolean) => eq): boolean {
    return A.reduce((curr, a) => curr || B.reduce((curr, b) => curr || check(equals(a, b, keys)), false), false)
}

export function map<T>(A: T[], mapFn: (a: T) => any, defaultValue?: T): T[] {
    const B: T[] = []

    let a = defaultValue
    for (let i = 0; i < A.length; i++) {
        a = mapFn(A[i]) || a
        if (a) B.push(a)
    }
    return B

}

// object utils
export function filterObj<T>(A: any, removeKeys: string[] = [], setKeys: any = {}): T {
    const B: any = {...A}
    for (const key of removeKeys) delete B[key]

    for (const [key, value] of Object.entries(setKeys)) {
        B[key] = A[key] || value
    }

    return B as T
}

export function update<T>(A: any[], a: any | any[] | ((a: any) => boolean), keys: string[], updates: any, aKeys?: string[], check?: (a: boolean, b: boolean) => boolean, defaultValue?: boolean): T[] {
    return A.map(Ai => {
        let found = false
        if (a instanceof Array) {
            const ai = find(a, Ai, keys, aKeys)
            if (ai) { found = true }
        } else if (typeof a === "function") {
            if (a(Ai)) { found = true }
        } else if (a instanceof Object) {
            if (equals(Ai, a, keys, aKeys, check, defaultValue)) { found = true }
        } else {
            throw new Error("Invalid argument type")
        }

        if (found) {
            const Aii = {...Ai} 
            for (const [key, value] of Object.entries(updates)) {
                switch (typeof value) {
                    case "object":
                        Aii[key] = {...Aii[key], ...value}
                        break;
                    default:
                        Aii[key] = value
                }
            }
            return Aii
        } return Ai
    })
}

// authentication utils
export function getCookie(name: string): string {
    const value = "; " + document.cookie
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()!.split(";").shift()!
    
    try {
        throw new CookieNotFound(name)
    } catch (error) {
        console.error(error)
        return ""
    }
}

// misc utils
export function copyToClipboard(text: string): void {
    if (!navigator.clipboard) {
        try {
            throw new UnSecureContext()

        } catch (error) {
            console.error(error)
            return
        }
    } 
    navigator.clipboard.writeText(text)
}

export function defaultFetchHeaders(contentType = "application/json", {...headers}: HeadersInit = {}): HeadersInit {
    return {
        "Content-Type": contentType,
        "X-CSRFToken": getCookie("csrftoken"),
        ...headers
    }
}

export function elapsedTime(start: Date): string {
    const end = new Date()
    const diff = end.getTime() - start.getTime()

    const seconds = Math.floor(diff / 1000)
    const mins = Math.floor(seconds / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    let elapsed = ""
    if (days > 0) {
        elapsed += `${days} days`
    } else if (hours > 0) {
        elapsed += `${hours} hours`
    } else if (mins > 0) {
        elapsed += `${mins} minutes`
    } else {
        elapsed += `${seconds} seconds`
    }

    return elapsed
}
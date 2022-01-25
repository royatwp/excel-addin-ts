/// <reference types="custom-functions-runtime" />
/* global clearInterval, console, CustomFunctions, setInterval */

import HubHelper from '@/HubHelper';

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second;
}

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function wpshubfunction(first: number, second: number): number {

  // Put the token in here.
  let hub = new HubHelper('eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxZDhjZmVkLWNkYjctNGZjZC1hODJkLTVjNTRmMjZmMDFjMSJ9.eyJhdF9oYXNoIjoiLWk2YllkVFNzeXg0QWdpZVJPTXZIQSIsImF1ZCI6WyJ3cHMtaHViIl0sImF1dGhfdGltZSI6MTY0MzAwOTM1MiwiZW1haWwiOiJodWJhZG1pbkBleGFtcGxlLmNvbSIsImV4cCI6MTY0MzAxMjk2NywiZ3JvdXBzIjpbIjAyOWQ1NzA1LTA5MWMtNGUwYi04MjdmLWViM2I5YzQ0Y2IzZiIsIjNiY2JiYjJiLTdiZDUtNGQ0Ni1iZTY0LWUxZmIzOTJmMTQwZiJdLCJodWJfaWQiOiJmNjQ4YzIzYi04YWExLTQzNWYtYWI0ZC05Y2VkMTgyZjM1YmIiLCJpYXQiOjE2NDMwMDkzNjcsImlzcyI6Imh0dHBzOi8vZXhjZWwtdGVzdC53cHNpbnRlcm5hbC5jby51ayIsImp0aSI6ImMwOTk3ZGRmLWE4M2MtNDU1OS1iMDlhLWJlMjliOTc3NWM2OCIsIm5hbWUiOiJIdWIgQWRtaW5pc3RyYXRvciIsInN1YiI6Ikh1YkFkbWluaXN0cmF0b3IiLCJ1c2VyX25hbWUiOiJIdWJBZG1pbmlzdHJhdG9yIn0.UU8u3Qaffhbj83nTIrKSXjcDyTasPP5KT_PEVZyLs96J8_lNWnByjAHhrRsnuqANoCWQUlFbwFv58y8pNIMdXruosB_hcYgoAL6SIFwLbwQZ-O4Qaau-mTPKEUNObmMI4G4kVTg8livbMNV4L3VgMrXtGDPMIKBtDa0elsh9R_FWU2_XkC9THqJ--mj72za46gXX6ppmKl2yCIiP-gzOzUmkTIOdwokBwcsT3YrcaaeRmKYdUMVkDachaT0xGyF4cTu26qVVzVv0u0QtSjP-JKHdIWBGKNxfix0yPOD9McYrNjh264HbNwrBlgF9eNHFePYbKJLd0MDFSjlsEXDGKw');

  const testParams = {
    FirstString: 'Ham',  SecondString: 'Egg', ThirdString: 'Cheese'
  }

  hub.executeProgram('webteamtestprograms/web/multiparam', testParams)
    .then((resp) => {
      console.log('HelloWorld response', resp);
    })
    .catch((err) => {
      console.log('Error executing hub program:', err);
    })

  return first + second * 2;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}
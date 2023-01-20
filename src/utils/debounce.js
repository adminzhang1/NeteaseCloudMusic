export const debounce = (fun,delay) => {
  let timer = null;
  return function(){
    clearTimeout(timer)
    timer = setTimeout(() => {
      fun()
    }, delay);
  }
}
export function getUrlParams(params = []) {
   const url_string = window.location.href; //window.location.href
   const url = new URL(url_string);
   let paramsFound = {};

   params.map(p => (paramsFound[p] = url.searchParams.get(p)));
   return paramsFound;
}

export function getUrlParamsFromHash(params = []) {
   const url_string = window.location.href; //window.location.href
   const url = new URL(url_string);
   let paramsFound = {};
   url.hash
      .substring(1)
      .split('&')
      // eslint-disable-next-line array-callback-return
      .map(p => {
         const [key, value] = p.split('=');
         paramsFound[key] = value;
      });

   let paramsRequested = {};

   // eslint-disable-next-line array-callback-return
   params.map(p => {
      paramsRequested[p] = paramsFound[p];
   });

   return paramsRequested;
}

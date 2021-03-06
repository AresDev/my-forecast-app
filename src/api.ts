import {
    filter,
    from,
    lastValueFrom,
    map, switchMap,
    tap
} from "rxjs";

export interface Coordinates {
  x: number;
  y: number;
}

export function getForecast(location: Coordinates): Promise<any> {
  return lastValueFrom(
    from(
      fetch(
        `https://api.weather.gov/points/${location.y},${location.x}`
      )
    ).pipe(
      switchMap((response) => from(response.json())),
      switchMap(({ properties }) => from(fetch(properties.forecast))),
      switchMap((response) => from(response.json())),
      filter((result) => !!result),
      tap((result) => {
        console.dir(result);
      })
    )
  );
}

export function getGeocode(address: string): Promise<any> {
  const format = "json";
  const benchmark = 2020;
  return lastValueFrom(
    from(
      fetch(
        `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&format=${format}&benchmark=${benchmark}`
      )
    ).pipe(
      switchMap((response) => from(response.json())),
      map((response) => {
        console.log(response);
        return response.result;
      }),
      filter((result) => !!result),
      tap((result) => {
        console.dir(result);
      })
    )
  );
}

// export function getGeocodeByDetails(details: any): Observable<any> {
//   return of(
//     fetch(
//       `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${location.latitud},${location.longitude}`
//     )
//   ).pipe(
//     // map((response)=> response.to)
//     tap((result) => console.dir(result))
//   );
// }

export function fetchMatch() {
  return fetch(
    " https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
}

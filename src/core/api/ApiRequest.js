import AsyncStorage from "@react-native-async-storage/async-storage";

export async function ApiRequest(url, method, body) {

  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to LOGIN fetch data');
  }
}

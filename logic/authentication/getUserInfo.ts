import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserName = async (token): Promise<string> => {
  if (!token) {
    throw new Error('Missing token when trying to fetch user info');
  }

  try {
    const user = await AsyncStorage.getItem('@user');
    if (user) {
      const userJson = await JSON.parse(user)
      console.log('getUserName: retrieved user name from: ', userJson.name)
      return userJson.name
    }
  } catch (error) {
    throw new Error('getUserName: error getting user from async storage')
  }

  try {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json()
    await AsyncStorage.setItem('@user', JSON.stringify(user));
    console.log('getUserName: retrieved user name from: ', user.name)
    return user.name
  } catch (error) {
    throw new Error('getUserName: error fetching username with valid token')
  }
}
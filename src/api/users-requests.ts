import apiClient from './api';

export async function loadLessons() {
  const lessons = [];

  try {
    const responseData = (await apiClient.get('/lessons.json')).data;
    console.log('Data: ', responseData);

    for (const key in responseData) {
      lessons.push({
        id: key,
        ...responseData[key],
      })
    }

    return lessons;
  } catch (error) {
    return [];
  }
}

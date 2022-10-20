export async function parallelFetch(fetch, ...urls) {
  if (!urls.length) {
    throw Error('Must have atleast one url to fetch');
  }

  try {
    let promises = urls.map((url) => fetch(url));
    let resolved = await Promise.all(promises);
    const data = await Promise.all(resolved.map((r) => r.json()));

    return data;
  } catch (error) {
    throw Error(error);
  }
}
